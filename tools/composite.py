#!/usr/bin/env python3
"""
composite.py — compositer la VRAIE bouteille (creative/bottle_straight.png) dans une scène
générée SANS produit. Ajoute ombre de contact + reflet court + réchauffement chaud, pour que
le produit reste FIDÈLE (étiquette/proportions) au lieu d'être redessiné par l'IA.
Doctrine : docs/HANDOFF.md §3.1 · creative/docs/METHODE-STOPSCROLL-KIE.md §3.

Exemples :
  python tools/composite.py --scene out/scene.png --out out/c.png
  python tools/composite.py --scene out/scene.png --pack3 --y 0.88 --out out/pack.png
"""
import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageChops, ImageDraw, ImageFilter
except ImportError:
    sys.exit("Manque Pillow : pip install pillow")

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_BOTTLE = REPO_ROOT / "creative" / "bottle_straight.png"


def warm(img, r=1.03, b=0.985):
    """Léger réchauffement (rouge×r, bleu×b) pour fondre le produit dans une lumière chaude."""
    img = img.convert("RGBA")
    rC, gC, bC, aC = img.split()
    rC = rC.point(lambda v: min(255, int(v * r)))
    bC = bC.point(lambda v: int(v * b))
    return Image.merge("RGBA", (rC, gC, bC, aC))


def place_bottle(scene, bottle, x_frac=0.5, baseline_frac=0.9, scale_frac=0.5):
    """Place `bottle` (RGBA) sur `scene` (RGBA), centrée en x_frac, pied à baseline_frac.
    scale_frac = hauteur bouteille / hauteur scène. Ajoute ombre de contact + reflet court."""
    W, H = scene.size
    target_h = max(1, int(H * scale_frac))
    ratio = target_h / bottle.height
    b = warm(bottle.resize((max(1, int(bottle.width * ratio)), target_h), Image.LANCZOS))
    bw, bh = b.size
    cx = int(W * x_frac)
    foot_y = int(H * baseline_frac)
    x, y = cx - bw // 2, foot_y - bh

    # Ombre de contact : ellipse sombre floutée sous le pied
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).ellipse(
        [cx - int(bw * 0.45), foot_y - int(bh * 0.05),
         cx + int(bw * 0.45), foot_y + int(bh * 0.05)], fill=(0, 0, 0, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(3, bh // 40)))
    scene.alpha_composite(shadow)

    # Reflet court (~14% de la hauteur), miroir vertical + dégradé d'opacité
    refl_h = max(1, int(bh * 0.14))
    refl = b.crop((0, bh - refl_h, bw, bh)).transpose(Image.FLIP_TOP_BOTTOM)
    grad = Image.new("L", (1, refl_h))
    grad.putdata([int(70 * (1 - row / refl_h)) for row in range(refl_h)])
    grad = grad.resize((bw, refl_h))
    refl.putalpha(ImageChops.multiply(grad, refl.getchannel("A")))
    scene.alpha_composite(refl, (x, foot_y))

    # Bouteille
    scene.alpha_composite(b, (x, y))
    return scene


def main():
    ap = argparse.ArgumentParser(description="Compositer la vraie bouteille dans une scène générée")
    ap.add_argument("--scene", required=True)
    ap.add_argument("--bottle", default=str(DEFAULT_BOTTLE))
    ap.add_argument("--out", default="out/composite.png")
    ap.add_argument("--x", type=float, default=0.5, help="position horizontale du centre (0-1)")
    ap.add_argument("--y", type=float, default=0.9, help="baseline / pied de la bouteille (0-1)")
    ap.add_argument("--scale", type=float, default=0.5, help="hauteur bouteille / hauteur scène")
    ap.add_argument("--pack3", action="store_true", help="poser 3 bouteilles alignées (pack)")
    a = ap.parse_args()

    scene = Image.open(a.scene).convert("RGBA")
    bottle = Image.open(a.bottle).convert("RGBA")

    if a.pack3:
        for xf in (0.26, 0.50, 0.74):
            place_bottle(scene, bottle, xf, a.y, min(a.scale, 0.42))
    else:
        place_bottle(scene, bottle, a.x, a.y, a.scale)

    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    scene.convert("RGB").save(out, quality=95)
    print(f"✓ {out}")


if __name__ == "__main__":
    main()
