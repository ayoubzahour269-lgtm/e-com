# SPOT-SEEDANCE — pub Oman 15-20s depuis 3 planches storyboard (30 frames)

Pipeline Kie.ai **Seedance 2** (`bytedance/seedance-2-fast`) : 3 planches (5×2 cases) →
30 frames → 3 clips (5s/6s/6s) → assemblage `1080x1920@30`.

## Prérequis
- `secrets.env` à la racine avec `KIE_API_KEY=...` (jamais loggée).
- `ffmpeg` système.
- **Déposer les 3 planches** dans `apps/worker/assets/planches/` nommées `1.png`, `2.png`, `3.png`
  (jpg/jpeg/webp acceptés). Ordre imposé : planche 1 = frames 01-10, planche 2 = 11-20, planche 3 = 21-30.

## Commandes (lancer avec le proxy)
```
cd apps/worker
NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt pnpm spot-seedance <cmd>
```

| cmd | phase | crédits | rôle |
|-----|-------|---------|------|
| `slice` | A | 0 | découpe les 3 planches → `assets/frames/01..30.png` + `output/reports/contact_sheet.jpg` |
| `plan` | A | 0 | dry-run : payloads + `output/reports/generation_manifest.json` (aucune tâche envoyée) |
| `gen 1` / `gen 2` / `gen 3` | B | ~Seedance | lance un clip, télécharge `output/raw/clip_0n.mp4` |
| `assemble` | B | 0 | normalise + concat + hold packshot → `output/final/ad_oman_17s_1080x1920.mp4` |
| `contact <mp4>` | — | 0 | planche de contrôle extraite d'une vidéo |

## Ordre d'exécution
1. `slice` → **vérifier `contact_sheet.jpg`** (ordre + cadrage des 30 frames) avant de dépenser.
2. `plan` → relire les payloads/manifest.
3. `gen 1`, `gen 2`, `gen 3` → QA des bruts (`contact output/raw/clip_0n.mp4`).
4. `assemble` → livrable final + `final_contact_sheet.jpg`.

## Adaptation documentée (contrainte API)
Seedance limite à **9 images de référence** et les modes d'entrée sont **exclusifs**.
Chaque séquence a 10 frames → on pilote chaque clip en **`first_frame_url` + `last_frame_url`**
(bornes de la séquence) + le prompt qui décompose les 10 micro-actions. Sortie **720p** (max Seedance)
→ upscale propre **1080×1920** à l'assemblage. Ratio **9:16** natif.

## Verrou produit
Le flacon reste identique à la référence maître (bouchon blanc vissé, étiquette rouge/blanc,
liquide rouge ambré, proportions). Le plan final = **exactement 3 flacons**, sans femme ni main,
espace libre réservé au texte d'offre (ajouté en post).
