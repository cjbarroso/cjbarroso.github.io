#!/usr/bin/env python3
"""Arma la lista de /writing/ juntando Substack (via relay en Cloudflare, con API/RSS de respaldo), Medium, Blogger y los posts de writing/manual.json.

Uso: python3 scripts/update_writing.py   (desde la raiz del repo)

Solo usa la libreria estandar. Reescribe lo que hay entre los marcadores
<!-- writing:start --> y <!-- writing:end --> en writing/index.html, es/writing/index.html y zh/writing/index.html.
Si un feed falla, usa lo ultimo que se bajo bien (writing/feeds.json).
Para sumar un post que no tiene feed (LinkedIn, Teracloud, otros), agregarlo a
writing/manual.json con title, url, date (AAAA-MM-DD) y source.
"""
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = [(ROOT / "writing" / "index.html", "en"), (ROOT / "es" / "writing" / "index.html", "es"),
         (ROOT / "zh" / "writing" / "index.html", "zh")]
MANUAL = ROOT / "writing" / "manual.json"
CACHE = ROOT / "writing" / "feeds.json"

FEEDS = [
    # Substack bloquea el RSS (403) desde los servidores de GitHub: se prueba primero su API.
    ("Substack", "https://cjbarroso.substack.com", "substack"),
    ("Medium", "https://medium.com/@carlosjosebarroso/feed", "rss"),
    ("Blogger", "https://accesibilia.blogspot.com/feeds/posts/default", "atom"),
]
MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
ATOM = "{http://www.w3.org/2005/Atom}"
SNIPPET = 180
# Worker de Cloudflare (worker/) que baja los posts de Substack y los sirve; URL publica, no es un secreto.
SUBSTACK_RELAY = "https://substack-relay.cjbarroso.workers.dev/"
RELAY_MAX_AGE = timedelta(hours=48)  # el cron corre cada 6 horas


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (cjbarroso.com writing updater)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def snippet(raw):
    text = html.unescape(re.sub(r"<[^>]+>", " ", raw or ""))
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= SNIPPET:
        return text
    return text[:SNIPPET].rsplit(" ", 1)[0].rstrip(".,;:") + "…"


def parse_rss(data, source):
    items = []
    for it in ET.fromstring(data).iter("item"):
        link = (it.findtext("link") or "").split("?")[0].strip()
        pub = it.findtext("pubDate")
        if not link or not pub:
            continue
        date = parsedate_to_datetime(pub).astimezone(timezone.utc).date().isoformat()
        items.append({"title": (it.findtext("title") or "").strip(), "url": link, "date": date,
                      "source": source, "summary": snippet(it.findtext("description"))})
    return items


def parse_atom(data, source):
    items = []
    for e in ET.fromstring(data).iter(ATOM + "entry"):
        link = next((l.get("href") for l in e.findall(ATOM + "link") if l.get("rel") == "alternate"), None)
        pub = e.findtext(ATOM + "published")
        if not link or not pub:
            continue
        body = e.findtext(ATOM + "summary") or e.findtext(ATOM + "content") or ""
        items.append({"title": (e.findtext(ATOM + "title") or "").strip(), "url": link, "date": pub[:10],
                      "source": source, "summary": snippet(body)})
    return items


def substack_items(posts, source):
    items = []
    for p in posts:
        if not p.get("canonical_url") or not p.get("post_date"):
            continue
        items.append({"title": (p.get("title") or "").strip(), "url": p["canonical_url"],
                      "date": p["post_date"][:10], "source": source,
                      "summary": snippet(p.get("subtitle") or p.get("description"))})
    return items


def parse_substack_api(base, source):
    """Pagina /api/v1/archive hasta que no haya mas posts.

    Substack devolvia una lista y paginaba con offset; ahora devuelve {"posts": [...], "nextCursor": ...}.
    Se aceptan los dos formatos.
    """
    posts, offset, cursor, page = [], 0, None, 12
    while True:
        # El formato nuevo rechaza offset (400): la primera pagina va sin paginacion y despues con cursor.
        query = f"&cursor={urllib.parse.quote(str(cursor))}" if cursor else (f"&offset={offset}" if offset else "")
        data = json.loads(fetch(f"{base}/api/v1/archive?sort=new&limit={page}{query}"))
        if isinstance(data, dict) and isinstance(data.get("posts"), list):
            posts += data["posts"]
            cursor = data.get("nextCursor")
            if not cursor or not data["posts"]:
                return substack_items(posts, source)
            continue
        if not isinstance(data, list):
            raise ValueError(f"respuesta inesperada de la API de Substack (tipo {type(data).__name__})")
        posts += data
        if len(data) < page:
            return substack_items(posts, source)
        offset += page


def fetch_relay(source, base):
    """Lee el relay de Cloudflare; si el cron del Worker lleva dias sin actualizarlo, prueba la API directa."""
    data = json.loads(fetch(SUBSTACK_RELAY))
    updated = datetime.fromisoformat(data["updated"].replace("Z", "+00:00"))
    age = datetime.now(timezone.utc) - updated
    if age > RELAY_MAX_AGE:
        warn(f"{source}: el relay de Cloudflare no se actualiza hace {age.days} dias ({data['updated']}); "
             "revisar el cron del Worker (worker/), la lista puede estar desactualizada")
        try:
            return parse_substack_api(base, source)
        except Exception as exc:  # noqa: BLE001 - si la API tambien falla, sirve lo del relay
            print(f"{source}: API directa fallo ({exc}), uso el relay viejo", file=sys.stderr)
    return substack_items(data["posts"], source)


def fetch_source(source, url, kind):
    if kind == "substack":
        # Substack bloquea a GitHub Actions: primero el relay (Cloudflare Worker), despues directo.
        attempts = [("relay", lambda: fetch_relay(source, url)),
                    ("API", lambda: parse_substack_api(url, source)),
                    ("RSS", lambda: parse_rss(fetch(url + "/feed"), source))]
        for i, (name, run) in enumerate(attempts):
            try:
                return run()
            except Exception as exc:  # noqa: BLE001 - se prueba la siguiente via antes de rendirse
                if i == len(attempts) - 1:
                    raise
                print(f"{source}: {name} fallo ({exc}), pruebo {attempts[i + 1][0]}", file=sys.stderr)
    data = fetch(url)
    return parse_rss(data, source) if kind == "rss" else parse_atom(data, source)


def warn(msg):
    print(msg, file=sys.stderr)
    if os.environ.get("GITHUB_ACTIONS"):
        print(f"::warning title=Writing::{msg}")  # aparece como aviso amarillo en el run


def load_json(path, default):
    try:
        return json.loads(path.read_text())
    except (OSError, ValueError):
        return default


def collect():
    cache = load_json(CACHE, {})
    items = []
    for source, url, kind in FEEDS:
        try:
            got = fetch_source(source, url, kind)
            if not got:
                raise ValueError("feed sin items")
            cache[source] = got
            print(f"{source}: {len(got)} posts")
        except Exception as exc:  # noqa: BLE001 - un feed caido no debe frenar el resto
            got = cache.get(source, [])
            warn(f"{source}: fallo ({exc}); uso {len(got)} posts de la ultima vez, la lista puede estar desactualizada")
        items += got
    CACHE.write_text(json.dumps(cache, indent=2, ensure_ascii=False) + "\n")
    manual = load_json(MANUAL, [])
    print(f"manual: {len(manual)} posts")
    for it in items + manual:
        it["title"] = TITLE_FIXES.get(it["title"], it["title"])
    return items + manual


# Titulos con errores en el feed de origen; se corrigen al mostrarlos.
TITLE_FIXES = {
    "Como bajamos 30% los costos de atención al cliente": "Cómo bajamos 30% los costos de atención al cliente",
    "Que es autokeras y por que es un paso en la dirección correcta":
        "Qué es AutoKeras y por qué es un paso en la dirección correcta",
    "The age of IA is here - and your infrastructure is not ready":
        "The age of AI is here, and your infrastructure is not ready",
}
ES_HINT = re.compile(r"[áéíóúñ¿¡]|\b(el|la|los|las|de|del|y|que|para|por|con|un|una|es|en)\b", re.I)


def is_spanish(it):
    """Heuristica simple: palabras o caracteres tipicos del espanol en titulo y bajada."""
    return bool(ES_HINT.search(it["title"] + " " + it.get("summary", "")))


def dedupe(items):
    seen, out = set(), []
    for it in sorted(items, key=lambda i: i["date"], reverse=True):
        key = re.sub(r"\W+", "", it["title"].lower())
        if key in seen or it["url"] in seen:
            continue
        seen.update({key, it["url"]})
        out.append(it)
    return out


def render(items, lang="en"):
    es, zh = lang == "es", lang == "zh"
    sources = sorted({i["source"] for i in items})
    chips = ['<button class="chip active" type="button" data-source="all">' + ("Todos" if es else "全部" if zh else "All") + '</button>']
    chips += [f'<button class="chip" type="button" data-source="{html.escape(s)}">{html.escape(s)}</button>' for s in sources]
    rows, year = [], None
    for it in items:
        y = it["date"][:4]
        if y != year:
            year = y
            rows.append(f'        <h3 class="year">{y}</h3>')
        d = datetime.strptime(it["date"], "%Y-%m-%d")
        when = (f"{d.day:02d} {MESES[d.month - 1]} {d.year}" if es
                else f"{d.year}年{d.month}月{d.day}日" if zh else d.strftime("%b %d, %Y"))
        summary = f'\n          <p>{html.escape(it["summary"])}</p>' if it.get("summary") else ""
        # Se marca el idioma solo cuando no coincide con el de la pagina (en zh no se marca).
        spanish = is_spanish(it)
        tag = (' · <span class="lang-tag" lang="es">ES</span>' if lang == "en" and spanish
               else ' · <span class="lang-tag" lang="en">EN</span>' if es and not spanish else "")
        rows.append(
            f'        <article class="post" data-source="{html.escape(it["source"])}">\n'
            f'          <div class="meta"><span class="src">{html.escape(it["source"])}</span> · {when}{tag}</div>\n'
            f'          <h4><a href="{html.escape(it["url"])}" rel="noopener">{html.escape(it["title"])}</a></h4>{summary}\n'
            f'        </article>')
    return ("\n        <div class=\"chips\" role=\"group\" aria-label=\"" + ("Filtrar por fuente" if es else "按来源筛选" if zh else "Filter by source") + "\">\n          "
            + "\n          ".join(chips) + "\n        </div>\n        <div class=\"posts\">\n"
            + "\n".join(rows) + "\n        </div>\n        ")


def main():
    items = dedupe(collect())
    # Se renderizan todas las paginas antes de escribir ninguna, para no dejar una actualizada y otra no.
    rendered = []
    for path, lang in PAGES:
        new, n = re.subn(r"(<!-- writing:start -->).*?(<!-- writing:end -->)",
                         lambda m: m.group(1) + render(items, lang) + m.group(2), path.read_text(), flags=re.S)
        if n != 1:
            sys.exit(f"No encontre los marcadores writing:start / writing:end en {path.relative_to(ROOT)}")
        rendered.append((path, new))
    for path, new in rendered:
        path.write_text(new)
        print(f"{path.relative_to(ROOT)}: {len(items)} posts")


if __name__ == "__main__":
    main()
