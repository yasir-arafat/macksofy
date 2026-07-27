#!/usr/bin/env python3
"""
build-font-subsets.py — regenerate the self-hosted webfont subsets in app/fonts/.

Run this only when the glyph set or the weight range the site uses changes:

    python3 scripts/build-font-subsets.py

It needs network access (it pulls the upstream variable fonts from the
google/fonts repo) and `fonttools[woff]`:

    pip install 'fonttools[woff]'

The generated .woff2 files ARE COMMITTED — the Next build must never depend on
this script or on network access.

────────────────────────────────────────────────────────────────────────────
Why the site self-hosts instead of using next/font/google
────────────────────────────────────────────────────────────────────────────
next/font/google emits Google's per-script @font-face split (latin,
latin-ext, greek, cyrillic, vietnamese…) and the browser downloads whichever
unicode-ranges the page touches. A scan of all 296 prerendered pages found
exactly ONE character outside the `latin` range:

    U+20B9  ₹   (591 occurrences — course prices)

That single glyph pulled the latin-ext file for BOTH families on every page
that shows a price: ~34.5 KB of webfont to render a rupee sign. Everything
else the site uses beyond latin (→ ★ ▸ ≥ ─ and the flag emoji) is not in
latin-ext either, so it already falls back to a system font and is unaffected.

Two reductions, both of which need control Google's endpoint doesn't offer:

  1. ONE file per family covering latin + ₹ — no second request, no
     latin-ext, and the rupee sign now renders in the brand font everywhere.
  2. The variable weight axis is clipped to the range the site actually uses.
     Grepping the Tailwind utilities finds font-normal(400), font-medium(500),
     font-semibold(600), font-bold(700) and font-black(900, which clamps to
     each font's max). Nothing below 400 is used, so the masters and deltas
     for Thin/ExtraLight/Light are dead weight.

Rendering is intentionally UNCHANGED: the glyph set is Google's `latin`
unicode-range plus ₹, so every character that used a webfont before still
does, and every character that fell back to a system font still does.
"""

import io
import sys
import urllib.request
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    from fontTools import subset
except ImportError:
    sys.exit("fonttools missing — pip install 'fonttools[woff]'")

OUT_DIR = Path(__file__).resolve().parent.parent / "app" / "fonts"

# Google's `latin` unicode-range for these two families, verbatim, so the
# subset covers exactly what the browser used to fetch — plus the rupee sign.
LATIN_RANGE = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,"
    "U+2212,U+2215,U+FEFF,U+FFFD,"
    "U+20B9"  # ₹ — the one latin-ext glyph the site actually uses
)

FONTS = [
    {
        "name": "SpaceGrotesk",
        "url": "https://raw.githubusercontent.com/google/fonts/main/ofl/"
               "spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf",
        # Upstream axis is 300-700. The site never renders below 400.
        "wght": (400, 400, 700),
        "out": "SpaceGrotesk-subset.woff2",
    },
    {
        "name": "JetBrainsMono",
        "url": "https://raw.githubusercontent.com/google/fonts/main/ofl/"
               "jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
        # Upstream axis is 100-800. Headings use 700/800; labels 500-600.
        "wght": (400, 400, 800),
        "out": "JetBrainsMono-subset.woff2",
    },
]


def build(spec: dict) -> None:
    print(f"\n{spec['name']}")
    with urllib.request.urlopen(spec["url"], timeout=120) as r:
        raw = r.read()
    print(f"  upstream variable TTF     {len(raw):>8,} B")

    font = TTFont(io.BytesIO(raw))

    # ORDER MATTERS: subset first, then clip the axis. Clipping first makes
    # instancer drop gvar entries for glyphs whose deltas collapse, and the
    # subsetter then raises KeyError on those glyph names (fontTools 4.62).
    options = subset.Options()
    options.flavor = "woff2"
    options.with_zopfli = False
    # Keep the layout features text actually depends on (kerning, ligatures,
    # contextual alternates) and let the rest go.
    options.layout_features = ["kern", "liga", "clig", "calt", "ccmp", "locl", "rlig", "mark", "mkmk"]
    options.drop_tables += ["DSIG"]
    options.notdef_outline = True
    options.recalc_bounds = True
    # Retain the variable-font tables — this must stay a variable font.
    options.retain_gids = False

    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=subset.parse_unicodes(LATIN_RANGE))
    subsetter.subset(font)
    print(f"  glyphs kept               {len(font.getGlyphOrder()):>8,}")

    lo, default, hi = spec["wght"]
    font = instancer.instantiateVariableFont(
        font, {"wght": (lo, default, hi)}, inplace=False, updateFontNames=False
    )
    print(f"  wght axis clipped to      {lo}-{hi}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / spec["out"]
    font.flavor = "woff2"
    font.save(dest)
    print(f"  -> {dest.name:<32} {dest.stat().st_size:>8,} B")


if __name__ == "__main__":
    for spec in FONTS:
        build(spec)
    print("\nDone. Commit the .woff2 files in app/fonts/.")
