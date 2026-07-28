#!/usr/bin/env python3
"""Compose les visuels produit de la landing Bubble Mousse.

Règle doctrine (HANDOFF §3.1) : le flacon n'est JAMAIS généré par IA.
On part du vrai flacon détouré (bottle_cut.png) et on le composite :
ombre de contact elliptique floutée + reflet court, lot de 3 = même cutout ×3
sur une baseline commune avec un espacement régulier.
"""
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = 'creative/bubble/bottle_cut.png'
OUT = 'assets'
os.makedirs(OUT, exist_ok=True)


def contact_shadow(canvas, cx, baseline, w, opacity=90, blur=18):
    """Ombre de contact elliptique sous le flacon."""
    sh = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(sh)
    rx, ry = int(w * 0.52), max(6, int(w * 0.11))
    d.ellipse([cx - rx, baseline - ry, cx + rx, baseline + ry], fill=(24, 30, 20, opacity))
    canvas.alpha_composite(sh.filter(ImageFilter.GaussianBlur(blur)))


def reflection(bottle, height_ratio=0.14, opacity=52):
    """Reflet court sous le flacon (miroir vertical dégradé)."""
    h = int(bottle.height * height_ratio)
    ref = bottle.transpose(Image.FLIP_TOP_BOTTOM).crop((0, 0, bottle.width, h))
    fade = Image.new('L', ref.size)
    fd = ImageDraw.Draw(fade)
    for y in range(h):
        fd.line([(0, y), (ref.width, y)], fill=int(opacity * (1 - y / h)))
    a = ref.getchannel('A').point(lambda v: v)
    ref.putalpha(Image.composite(fade, Image.new('L', ref.size, 0), a))
    return ref.filter(ImageFilter.GaussianBlur(1.4))


def single(target_h=1100, pad=90):
    b = Image.open(SRC).convert('RGBA')
    s = target_h / b.height
    b = b.resize((max(1, int(b.width * s)), target_h), Image.LANCZOS)
    ref = reflection(b)
    W = b.width + pad * 2
    H = target_h + pad + ref.height + 30
    c = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    baseline = pad + target_h
    contact_shadow(c, W // 2, baseline, b.width)
    c.alpha_composite(b, (pad, pad))
    c.alpha_composite(ref, (pad, baseline + 2))
    c.save(f'{OUT}/bubble-bottle.png')
    print('bubble-bottle.png', c.size)


def pack3(target_h=1000, pad=110):
    """Lot de 3 : espacement régulier 0.26 / 0.50 / 0.74, le flacon central devant."""
    b = Image.open(SRC).convert('RGBA')
    s = target_h / b.height
    front = b.resize((max(1, int(b.width * s)), target_h), Image.LANCZOS)
    side_h = int(target_h * 0.90)
    side = b.resize((max(1, int(b.width * side_h / b.height)), side_h), Image.LANCZOS)

    W = int(front.width * 2.45) + pad * 2
    baseline = pad + target_h
    H = baseline + int(target_h * 0.16) + 40
    c = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    inner = W - pad * 2
    xs = [pad + int(inner * r) for r in (0.26, 0.50, 0.74)]

    # arrière-plan : les deux flacons latéraux, très légèrement assombris
    for cx in (xs[0], xs[2]):
        contact_shadow(c, cx, baseline, side.width, opacity=70, blur=20)
    for cx in (xs[0], xs[2]):
        dim = Image.new('RGBA', side.size, (12, 22, 14, 26))
        s2 = side.copy()
        s2.alpha_composite(Image.composite(dim, Image.new('RGBA', side.size, (0, 0, 0, 0)),
                                           side.getchannel('A')))
        c.alpha_composite(s2, (cx - side.width // 2, baseline - side_h))

    # flacon central devant
    contact_shadow(c, xs[1], baseline, front.width, opacity=105, blur=16)
    c.alpha_composite(front, (xs[1] - front.width // 2, pad))

    ref = reflection(front, height_ratio=0.12, opacity=46)
    c.alpha_composite(ref, (xs[1] - ref.width // 2, baseline + 2))
    c.save(f'{OUT}/bubble-pack3.png')
    print('bubble-pack3.png', c.size)


if __name__ == '__main__':
    single()
    pack3()
