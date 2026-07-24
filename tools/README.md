# tools/ — Pipeline de génération de créas Kie AI

Encode la doctrine de `../creative/docs/METHODE-STOPSCROLL-KIE.md`. Trois scripts :

| Script | Rôle |
|---|---|
| `kie_gen.py` | Appeler l'API Kie : images (`nano-banana-edit`), vidéo (`veo3_fast` i2v), crédits, upload réf |
| `composite.py` | Compositer la **vraie** bouteille (`../creative/bottle_straight.png`) dans une scène générée |
| `arabic_text.py` | Poser un **texte arabe** net (RTL) — jamais généré par l'IA |

## Installation
```bash
pip install requests pillow
# Texte arabe correct (RTL + ligatures) → Pillow avec libraqm :
#   Debian/Ubuntu : sudo apt-get install libraqm0
# Au moins une police arabe :
mkdir -p ~/.fonts && cp /chemin/Cairo-Bold.ttf ~/.fonts/   # ou Tajawal-Bold / Amiri-Bold
```

## Clé API
`KIE_API_KEY` via variable d'environnement, **ou** ligne `KIE_API_KEY=...` dans `../secrets.env`
(gitignoré). ⚠️ La clé qui a fuité doit d'abord être **révoquée + régénérée** sur kie.ai
(voir `../docs/HANDOFF.md`). Lance toutes les commandes **depuis la racine du repo**.

## Workflow (un plan de créa — ex. C1 · plan S2 de `BATCH-STOPSCROLL-01.md`)
```bash
# 1) Still UGC avec la vraie bouteille en référence (génère-en 3-4, garde la moins « IA »)
python tools/kie_gen.py image \
  --model google/nano-banana-edit --size 9:16 \
  --ref creative/bottle_straight.png \
  --prompt "Amateur smartphone photo, vertical, a young Gulf woman's hand pouring a few drops of thin translucent red hair oil onto her scalp, the red-and-white bottle from the reference kept exactly as-is, plain home bathroom, candid UGC, empty area top. No text, no logo." \
  --out out/c1_s2.png

# 2) (au besoin) recompositer proprement la bouteille sur une scène SANS produit
python tools/composite.py --scene out/scene_no_product.png --out out/c1_s2.png

# 3) Animer — UN mouvement minimal, image-to-video (réserver aux plans gagnants : ~60 cr)
python tools/kie_gen.py video --model veo3_fast \
  --ref out/c1_s2.png \
  --prompt "Subtle realistic handheld phone footage, 8s, the hand slowly tilts the bottle and a thin red oil drop forms; no morphing, no warped label, constant frame rate." \
  --out out/c1_s2.mp4

# 4) Poser le texte / hook arabe (hors-IA)
python tools/arabic_text.py --image out/c1_s2.png --text "المشاط الأحمر — وصفة أهلنا" --pos top --out out/c1_s2_txt.png
```
> Souvent le plus simple gagne : still nano-banana (4 cr) + push-in (ffmpeg) + texte + son, **sans**
> veo3 → moins cher et **moins « IA »**. Réserve `video` aux plans où le mouvement vend vraiment.

## Vérification
```bash
python tools/kie_gen.py credit     # crédits restants
python tools/kie_gen.py demo       # 1 image de test → out/demo.png
python -m py_compile tools/*.py    # sanity-check syntaxe (aucune clé requise)
```
Contrôle **à l'œil** chaque asset (flacon fidèle, huile fine translucide, zéro texte arabe déformé) —
checklist §4 de la méthode. Les sorties vont dans `out/` (gitignoré).
