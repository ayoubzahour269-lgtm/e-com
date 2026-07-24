#!/usr/bin/env python3
"""
arabic_text.py — poser un texte ARABE net (RTL) sur une image, SANS passer par l'IA
(l'IA déforme l'arabe — cf. doctrine). RTL/ligatures corrects si Pillow est compilé avec
libraqm (PIL.features.check('raqm') == True) ; sinon fallback best-effort (liaison imparfaite).
Doctrine : creative/docs/METHODE-STOPSCROLL-KIE.md §4.

Police : --font vers un .ttf arabe (Cairo/Tajawal/Amiri). Détection auto dans ~/.fonts.

Exemples :
  python tools/arabic_text.py --image out/s1.png --text "شعرك يطيح بهالشكل؟" --pos top --out out/s1_txt.png
  python tools/arabic_text.py --image out/s4.png --text "١٣٩ ر.س · الدفع عند الاستلام" --gold --out out/offer.png
"""
import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFilter, ImageFont, features
except ImportError:
    sys.exit("Manque Pillow : pip install pillow")

HOME = Path.home()
FONT_CANDIDATES = [
    HOME / ".fonts/cairo1.ttf",
    HOME / ".fonts/Cairo-Bold.ttf",
    HOME / ".fonts/Tajawal-Bold.ttf",
    HOME / ".fonts/Amiri-Bold.ttf",
    Path("/usr/share/fonts/truetype/cairo/Cairo-Bold.ttf"),
]


def find_font():
    for c in FONT_CANDIDATES:
        if Path(c).exists():
            return str(c)
    return None


def _draw_kwargs():
    """RTL + shaping arabe uniquement si raqm est dispo (sinon PIL lèverait)."""
    if features.check("raqm"):
        return {"direction": "rtl", "language": "ar"}
    return {}


def render(image_path, text, out_path, pos="bottom", size=None, color=(255, 255, 255),
           gold=False, font_path=None, margin_frac=0.08):
    img = Image.open(image_path).convert("RGBA")
    W, H = img.size
    if size is None:
        size = int(W * 0.075)  # ~7.5% de la largeur
    fp = font_path or find_font()
    if not fp:
        sys.exit("Aucune police arabe trouvée. Passe --font vers un .ttf (Cairo/Tajawal/Amiri).")
    font = ImageFont.truetype(fp, size)
    dkw = _draw_kwargs()

    bbox = ImageDraw.Draw(img).textbbox((0, 0), text, font=font, **dkw)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (W - tw) // 2 - bbox[0]
    if pos == "top":
        y = int(H * margin_frac) - bbox[1]
    elif pos == "center":
        y = (H - th) // 2 - bbox[1]
    else:
        y = int(H * (1 - margin_frac)) - th - bbox[1]

    # Bandeau de lisibilité (ombre douce derrière le texte)
    pad = int(size * 0.4)
    band = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(band).rectangle(
        [0, y + bbox[1] - pad, W, y + bbox[1] + th + pad], fill=(0, 0, 0, 90))
    img.alpha_composite(band.filter(ImageFilter.GaussianBlur(max(1, pad // 2))))

    draw = ImageDraw.Draw(img)
    draw.text((x + 2, y + 3), text, font=font, fill=(0, 0, 0, 180), **dkw)  # ombre portée

    if gold:
        mask = Image.new("L", (W, H), 0)
        ImageDraw.Draw(mask).text((x, y), text, font=font, fill=255, **dkw)
        grad = Image.new("RGBA", (W, H))
        top, bot = (245, 222, 140), (154, 117, 20)
        for row in range(H):
            t = row / H
            grad.paste((int(top[0] + (bot[0] - top[0]) * t),
                        int(top[1] + (bot[1] - top[1]) * t),
                        int(top[2] + (bot[2] - top[2]) * t), 255), (0, row, W, row + 1))
        img.paste(grad, (0, 0), mask)
    else:
        draw.text((x, y), text, font=font, fill=color, **dkw)

    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(out, quality=95)
    print(f"✓ {out}  (raqm={features.check('raqm')})")
    return out


def main():
    ap = argparse.ArgumentParser(description="Poser un texte arabe net (RTL) sur une image")
    ap.add_argument("--image", required=True)
    ap.add_argument("--text", required=True)
    ap.add_argument("--out", default="out/text.png")
    ap.add_argument("--pos", default="bottom", choices=["top", "center", "bottom"])
    ap.add_argument("--size", type=int, default=None)
    ap.add_argument("--gold", action="store_true", help="titre or dégradé")
    ap.add_argument("--font", default=None, help="chemin .ttf arabe")
    a = ap.parse_args()
    render(a.image, a.text, a.out, a.pos, a.size, gold=a.gold, font_path=a.font)


if __name__ == "__main__":
    main()
