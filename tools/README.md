# tools/ — Pipeline de génération de créas Kie AI (multi-modèles)

Encode la doctrine de `../creative/docs/METHODE-STOPSCROLL-KIE.md`. Trois scripts :

| Script | Rôle |
|---|---|
| `kie_gen.py` | Appeler l'API Kie **multi-modèles** (images & vidéo via l'API unifiée + Veo), lister les modèles, crédits, upload de référence |
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

## Choisir le modèle (le point clé)
Kie = 300+ modèles derrière une seule API. `kie_gen.py` embarque un registry d'alias + `--model auto`
qui choisit le champion selon le type de créa et sa complexité :
```bash
python tools/kie_gen.py models          # imprime la matrice (image + vidéo) et les alias
```
Résumé : still produit fidèle → `nano-edit` · scène photoréaliste → `seedream`/`imagen4` ·
i2v simple → `seedance-fast` · i2v humain qualité → `kling`/`seedance` · cinéma+audio → `veo3` ·
texte latin net → `gpt-image`/`ideogram`. Tu peux aussi passer un **ID brut** (`--model bytedance/seedance-2`)
et des champs spécifiques via `--input-json '{...}'` (cf. `docs.kie.ai/market/<provider>/<model>`).

## Filtre logique/physique (pré-vol — anti-gaspillage de crédits)
`kie_gen.py` passe **chaque** prompt dans `prompt_lint.py` AVANT tout appel API. Si une règle dure est
violée (flacon fermé qui verse, huile-miel, texte arabe, produit sans référence…), la génération est
**annulée sans dépenser** (message + correctif proposé). `--force` pour outrepasser · `--strict` pour
traiter les avertissements comme des blocages.
```bash
python tools/prompt_lint.py --prompt "..." --kind image --ref   # tester un prompt à la main
```
Assembler une planche storyboard : `python tools/storyboard.py --frame "img::label" ... --out out/board.png`.

## Workflow (un plan de créa — ex. C1 · plan S2 de `BATCH-STOPSCROLL-01.md`)
```bash
# 1) Still UGC — --model auto met nano-edit dès qu'il y a une réf produit (génère-en 3-4, garde la meilleure)
python tools/kie_gen.py image --model auto --size 9:16 \
  --ref creative/bottle_straight.png \
  --prompt "Amateur smartphone photo, vertical, a young Gulf woman's hand pouring a few drops of thin translucent red hair oil onto her scalp, the red-and-white bottle from the reference kept exactly as-is, plain home bathroom, candid UGC, empty area top. No text, no logo." \
  --out out/c1_s2.png

# Scène SANS produit → modèle photoréaliste
python tools/kie_gen.py image --model seedream --prompt "..." --out out/scene.png

# 2) (au besoin) recompositer proprement la bouteille sur une scène SANS produit
python tools/composite.py --scene out/scene.png --out out/c1_s2.png

# 3) Animer — UN mouvement minimal (i2v). seedance-fast = simple/pas cher ; veo3 = cinéma+audio
python tools/kie_gen.py video --model seedance-fast \
  --ref out/c1_s2.png \
  --prompt "Subtle realistic handheld phone footage, 8s, the hand slowly tilts the bottle and a thin red oil drop forms; no morphing, no warped label, constant frame rate." \
  --out out/c1_s2.mp4
# variantes : --model kling (humain réaliste) · --model veo3 --audio (cinéma + foley/VO)

# 4) Poser le texte / hook arabe (hors-IA)
python tools/arabic_text.py --image out/c1_s2.png --text "المشاط الأحمر — وصفة أهلنا" --pos top --out out/c1_s2_txt.png
```
> Souvent le plus simple gagne : still (~4 cr) + push-in (ffmpeg) + texte + son, **sans** vidéo IA →
> moins cher et **moins « IA »**. Réserve `video` aux plans où le mouvement vend vraiment.

## Vérification
```bash
python tools/kie_gen.py models     # matrice de sélection (aucune clé requise)
python tools/kie_gen.py credit     # crédits restants
python -m py_compile tools/*.py    # sanity-check syntaxe (aucune clé requise)
python tools/kie_gen.py image --model seedream --prompt "test" --out out/test.png   # 1 vrai appel
```
Contrôle **à l'œil** chaque asset (flacon fidèle, huile fine translucide, zéro texte arabe déformé) —
checklist §4 de la méthode. Les sorties vont dans `out/` (gitignoré).
