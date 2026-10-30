#!/usr/bin/env python3
"""Agrega ?v=<hash> a las referencias a /assets/css/*.css y /assets/js/*.js de todas las paginas.

Uso: python3 scripts/version_assets.py   (desde la raiz del repo, despues de tocar el CSS o el JS)

GitHub Pages deja los assets en cache hasta 4 horas, asi que un cambio de CSS/JS puede verse
con el HTML nuevo y el estilo viejo. El hash cambia solo cuando cambia el archivo, por lo que
el navegador y la CDN piden la version nueva. Solo usa la libreria estandar.
"""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REF = re.compile(r'(/assets/(?:css|js)/[\w.-]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(?=")')
SKIP = {"node_modules", "_design", "worker", ".git"}


def digest(rel):
    return hashlib.sha256((ROOT / rel.lstrip("/")).read_bytes()).hexdigest()[:8]


def main():
    changed = 0
    for page in ROOT.rglob("*.html"):
        if SKIP & set(page.relative_to(ROOT).parts):
            continue
        text = page.read_text()
        new = REF.sub(lambda m: f"{m.group(1)}?v={digest(m.group(1))}", text)
        if new != text:
            page.write_text(new)
            changed += 1
    print(f"{changed} paginas actualizadas")


if __name__ == "__main__":
    main()
