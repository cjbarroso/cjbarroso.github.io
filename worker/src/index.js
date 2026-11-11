// Relay de solo lectura de los posts de Substack de cjbarroso.
// Un cron los baja y los guarda en KV; GET / devuelve la lista. La URL esta fija: no es un proxy abierto.
const ARCHIVE = "https://cjbarroso.substack.com/api/v1/archive?sort=new";
const PAGE = 12;
const UA = "cjbarroso.com writing updater (Cloudflare Worker)";

async function refresh(env) {
  const posts = [];
  // Substack devolvia una lista paginada con offset; ahora devuelve { posts, nextCursor }. Se aceptan los dos.
  let offset = 0;
  let cursor = null;
  for (;;) {
    // El formato nuevo rechaza offset (400): la primera pagina va sin paginacion y despues con cursor.
    const q = cursor ? `&cursor=${encodeURIComponent(cursor)}` : offset ? `&offset=${offset}` : "";
    const res = await fetch(`${ARCHIVE}&limit=${PAGE}${q}`, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`Substack respondio ${res.status}`);
    const data = await res.json();
    const page = Array.isArray(data) ? data : data && Array.isArray(data.posts) ? data.posts : null;
    if (!page) throw new Error("respuesta inesperada de la API de Substack");
    for (const p of page) {
      posts.push({
        title: p.title,
        canonical_url: p.canonical_url,
        post_date: p.post_date,
        subtitle: p.subtitle,
        description: p.description,
      });
    }
    if (Array.isArray(data)) {
      if (page.length < PAGE) break;
      offset += PAGE;
    } else {
      cursor = data.nextCursor;
      if (!cursor || !page.length) break;
    }
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
