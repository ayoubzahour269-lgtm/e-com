#!/usr/bin/env python3
"""Convertit les visuels générés + composités en assets webp prêts pour la landing.

Chaque asset est redimensionné à sa plus grande dimension d'affichage réelle
(cf. build-quality : ne jamais expédier la source), puis encodé en WebP.
Un grade doux commun donne à toute la page la même grammaire photographique.
"""
from PIL import Image, ImageEnhance
import os

GEN = 'creative/bubble/gen'
OUT = 'assets'

# slug source -> (nom de sortie, largeur max, qualité, grade photo ?)
JOBS = [
    ('hero-bg',     'bubble-hero-bg',      1000, 62, True),
    ('hair-before', 'bubble-ba-before',     760, 70, True),
    ('hair-after',  'bubble-ba-after',      760, 70, True),
    ('ing-ginseng', 'bubble-ing-ginseng',   320, 78, True),
    ('ing-saponin', 'bubble-ing-saponin',   320, 78, True),
    ('ing-foti',    'bubble-ing-foti',      320, 78, True),
    ('ing-sesame',  'bubble-ing-sesame',    320, 78, True),
    ('step-apply',  'bubble-step1',         720, 74, True),
    ('step-spread', 'bubble-step2',         720, 74, True),
    ('step-rinse',  'bubble-step3',         720, 74, True),
]

# Composités produit : APLATIS sur la couleur de fond de leur section.
# Le CDN Shopify ré-encode tout WebP à canal alpha en PNG (×9 en poids) ; sans alpha
# il sert du JPEG. D'où l'aplatissement, sur la couleur exacte du fond de section.
#   (nom, largeur max, qualité, fond RGB)
ALPHA = [
    ('bubble-pack3',  900, 82, (251, 249, 243)),   # --surface, carte du hero
    ('bubble-bottle', 600, 82, (243, 239, 228)),   # --ivory, section « محتويات العرض »
]


def grade(im):
    """Grade doux commun : saturation 0.94, contraste 0.98 — évite le look sur-saturé IA."""
    im = ImageEnhance.Color(im).enhance(0.94)
    return ImageEnhance.Contrast(im).enhance(0.98)


def fit(im, w):
    if im.width <= w:
        return im
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)


total = 0
for src, dst, w, q, do_grade in JOBS:
    p = f'{GEN}/{src}.png'
    if not os.path.exists(p):
        print(f'  MANQUANT {src} — sauté')
        continue
    im = fit(Image.open(p).convert('RGB'), w)
    if do_grade:
        im = grade(im)
    out = f'{OUT}/{dst}.webp'
    im.save(out, 'WEBP', quality=q, method=6)
    n = os.path.getsize(out); total += n
    print(f'{dst}.webp  {im.size}  {n // 1024} Ko')

for name, w, q, bg in ALPHA:
    p = f'{OUT}/{name}.png'
    if not os.path.exists(p):
        print(f'  MANQUANT {name}'); continue
    im = fit(Image.open(p).convert('RGBA'), w)
    flat = Image.new('RGB', im.size, bg)
    flat.paste(im, (0, 0), im)
    im = flat
    out = f'{OUT}/{name}.webp'
    im.save(out, 'WEBP', quality=q, method=6)
    n = os.path.getsize(out); total += n
    print(f'{name}.webp  {im.size}  {n // 1024} Ko')

print(f'--- total images : {total // 1024} Ko ---')
