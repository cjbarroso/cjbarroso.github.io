// Relay de solo lectura de los posts de Substack de cjbarroso.
// Un cron los baja y los guarda en KV; GET / devuelve la lista. La URL esta fija: no es un proxy abierto.
const ARCHIVE = "https://cjbarroso.substack.com/api/v1/archive?sort=new";
const PAGE = 12;
const UA = "cjbarroso.com writing updater (Cloudflare Worker)";

async function refresh(env) {
  const posts = [];
  for (let offset = 0; ; offset += PAGE) {
    const res = await fetch(`${ARCHIVE}&limit=${PAGE}&offset=${offset}`, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`Substack respondio ${res.status}`);
    const page = await res.json();
    for (const p of page) {
      posts.push({
        title: p.title,
        canonical_url: p.canonical_url,
        post_date: p.post_date,
        subtitle: p.subtitle,
        description: p.description,
      });
    }
    if (page.length < PAGE) break;
  }
  if (!posts.length) throw new Error("Substack no devolvio posts");
  // Si falla algo antes de este punto, KV conserva la ultima copia buena.
  await env.SUBSTACK.put("posts", JSON.stringify({ updated: new Date().toISOString(), posts }));
}

export default {
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(refresh(env));
  },

  async fetch(request, env) {
    if (request.method !== "GET") return new Response("Method not allowed", { status: 405 });
    let body = await env.SUBSTACK.get("posts");
    if (!body) {
      try {
        await refresh(env);
        body = await env.SUBSTACK.get("posts");
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err.message || err) }), {
          status: 502,
          headers: { "content-type": "application/json" },
        });
      }
    }
    return new Response(body, { headers: { "content-type": "application/json", "cache-control": "public, max-age=300" } });
  },
};
