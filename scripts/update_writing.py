#!/usr/bin/env python3
"""Arma la lista de /writing/ juntando Medium, Blogger, Substack y los posts de writing/manual.json.

Uso: python3 scripts/update_writing.py   (desde la raiz del repo)

Solo usa la libreria estandar. Reescribe lo que hay entre los marcadores
<!-- writing:start --> y <!-- writing:end --> en writing/index.html.
Si un feed falla, usa lo ultimo que se bajo bien (writing/feeds.json).
Para sumar un post que no tiene feed (LinkedIn, Teracloud, otros), agregarlo a
writing/manual.json con title, url, date (AAAA-MM-DD) y source.
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "writing" / "index.html"
MANUAL = ROOT / "writing" / "manual.json"
CACHE = ROOT / "writing" / "feeds.json"

FEEDS = [
    ("Substack", "https://cjbarroso.substack.com/feed", "rss"),
    ("Medium", "https://medium.com/@carlosjosebarroso/feed", "rss"),
    ("Blogger", "https://accesibilia.blogspot.com/feeds/posts/default", "atom"),
]
ATOM = "{http://www.w3.org/2005/Atom}"
SNIPPET = 180


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
            data = fetch(url)
            got = parse_rss(data, source) if kind == "rss" else parse_atom(data, source)
            if not got:
                raise ValueError("feed sin items")
            cache[source] = got
            print(f"{source}: {len(got)} posts")
        except Exception as exc:  # noqa: BLE001 - un feed caido no debe frenar el resto
            got = cache.get(source, [])
            print(f"{source}: fallo ({exc}), uso {len(got)} posts de la ultima vez", file=sys.stderr)
        items += got
    CACHE.write_text(json.dumps(cache, indent=2, ensure_ascii=False) + "\n")
    manual = load_json(MANUAL, [])
    print(f"manual: {len(manual)} posts")
    return items + manual


def dedupe(items):
    seen, out = set(), []
    for it in sorted(items, key=lambda i: i["date"], reverse=True):
        key = re.sub(r"\W+", "", it["title"].lower())
        if key in seen or it["url"] in seen:
            continue
        seen.update({key, it["url"]})
        out.append(it)
    return out


def render(items):
    sources = sorted({i["source"] for i in items})
    chips = ['<button class="chip active" type="button" data-source="all">All</button>']
    chips += [f'<button class="chip" type="button" data-source="{html.escape(s)}">{html.escape(s)}</button>' for s in sources]
    rows, year = [], None
    for it in items:
        y = it["date"][:4]
        if y != year:
            year = y
            rows.append(f'        <h3 class="year">{y}</h3>')
        when = datetime.strptime(it["date"], "%Y-%m-%d").strftime("%b %d, %Y")
        summary = f'\n          <p>{html.escape(it["summary"])}</p>' if it.get("summary") else ""
        rows.append(
            f'        <article class="post" data-source="{html.escape(it["source"])}">\n'
            f'          <div class="meta"><span class="src">{html.escape(it["source"])}</span> · {when}</div>\n'
            f'          <h4><a href="{html.escape(it["url"])}" rel="noopener">{html.escape(it["title"])}</a></h4>{summary}\n'
            f'        </article>')
    return ("\n        <div class=\"chips\" role=\"group\" aria-label=\"Filter by source\">\n          "
            + "\n          ".join(chips) + "\n        </div>\n        <div class=\"posts\">\n"
            + "\n".join(rows) + "\n        </div>\n        ")


def main():
    items = dedupe(collect())
    page = PAGE.read_text()
    new, n = re.subn(r"(<!-- writing:start -->).*?(<!-- writing:end -->)",
                     lambda m: m.group(1) + render(items) + m.group(2), page, flags=re.S)
    if n != 1:
        sys.exit("No encontre los marcadores writing:start / writing:end en writing/index.html")
    PAGE.write_text(new)
    print(f"writing/index.html: {len(items)} posts")


if __name__ == "__main__":
    main()
