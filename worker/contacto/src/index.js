// Recibe el formulario de contacto del sitio y lo reenvia a Telegram.
// Defensas: origen permitido, Turnstile, honeypot, validacion de tamanos,
// limite por IP y tope global diario.

const MAX_BODY = 8 * 1024;
const MSG_MIN = 10, MSG_MAX = 2000, CONTACT_MIN = 3, CONTACT_MAX = 200;

function json(body, status, origin) {
  const headers = { "content-type": "application/json", "cache-control": "no-store" };
  if (origin) {
    headers["access-control-allow-origin"] = origin;
    headers["vary"] = "origin";
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function clean(s) {
  // texto plano: sin caracteres de control, espacios compactados
  return String(s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

async function sha(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function bump(kv, key, ttl) {
  const n = parseInt((await kv.get(key)) || "0", 10) + 1;
  await kv.put(key, String(n), { expirationTtl: ttl });
  return n;
}

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
    const origin = request.headers.get("origin");
    const okOrigin = origin && allowed.includes(origin) ? origin : null;

    if (request.method === "OPTIONS") {
      if (!okOrigin) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": okOrigin,
          "access-control-allow-methods": "POST",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
          vary: "origin",
        },
      });
    }
    if (request.method !== "POST") return json({ error: "method" }, 405, okOrigin);
    if (!okOrigin) return json({ error: "origin" }, 403, null);

    const len = parseInt(request.headers.get("content-length") || "0", 10);
    if (len > MAX_BODY) return json({ error: "too_large" }, 413, okOrigin);

    let data;
    try {
      const raw = await request.text();
      if (raw.length > MAX_BODY) return json({ error: "too_large" }, 413, okOrigin);
      data = JSON.parse(raw);
    } catch {
      return json({ error: "bad_request" }, 400, okOrigin);
    }
    if (!data || typeof data !== "object") return json({ error: "bad_request" }, 400, okOrigin);

    // honeypot: simulamos exito para no darle pistas al bot
    if (data.website) return json({ ok: true }, 200, okOrigin);

    const message = clean(data.message ?? "");
    const contact = clean(data.contact ?? "");
    const lang = ["en", "es", "zh"].includes(data.lang) ? data.lang : "en";
    if (message.length < MSG_MIN || message.length > MSG_MAX) return json({ error: "message" }, 400, okOrigin);
    if (contact.length < CONTACT_MIN || contact.length > CONTACT_MAX) return json({ error: "contact" }, 400, okOrigin);

    const ip = request.headers.get("cf-connecting-ip") || "";

    // Turnstile
    const form = new FormData();
    form.append("secret", env.TURNSTILE_SECRET);
    form.append("response", String(data.token || ""));
    if (ip) form.append("remoteip", ip);
    const ts = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form })
      .then((r) => r.json())
      .catch(() => ({ success: false }));
    if (!ts.success) return json({ error: "captcha" }, 403, okOrigin);

    // Limites: por IP (hash, no se guarda la IP) y global diario
    const day = new Date().toISOString().slice(0, 10);
    const ipKey = "ip:" + (await sha(ip + day + (env.TELEGRAM_CHAT_ID || ""))) ;
    if ((await bump(env.CONTACTO, ipKey, 3600)) > parseInt(env.IP_LIMIT, 10)) return json({ error: "rate" }, 429, okOrigin);
    if ((await bump(env.CONTACTO, "day:" + day, 90000)) > parseInt(env.DAILY_LIMIT, 10)) return json({ error: "busy" }, 429, okOrigin);

    const country = (request.cf && request.cf.country) || "??";
    const text = `Mensaje desde cjbarroso.com\n\nContacto: ${contact}\nIdioma: ${lang} · País: ${country}\n\n${message}`;
    const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    }).catch(() => null);
    if (!tg || !tg.ok) return json({ error: "upstream" }, 502, okOrigin);

    return json({ ok: true }, 200, okOrigin);
  },
};
