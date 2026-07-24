# STORYBOARD — « طقس المشاط » (le rituel Mashat) · concept C1 douleur→solution
### 15 s · 9:16 · Golfe · COD — continuité verrouillée, physique respectée

> Preuve visuelle : `out/storyboard_board.png` (assemblée via `tools/storyboard.py`).
> Méthode : `METHODE-STOPSCROLL-KIE.md §3B`. Réf produit : `../bottle_straight.png`.

## Continuité verrouillée (ne change JAMAIS d'un plan à l'autre)
- **Personnage** : même femme du Golfe (~30 ans), foulard beige, peau naturelle.
- **Décor** : même salle de bain carrelée blanche, miroir, lumière chaude du soir.
- **Produit** : le vrai flacon rouge-blanc (réf `bottle_straight.png`).
- **Image-ancre** : `out/sb_anchor.png` — générée EN PREMIER, puis **référencée dans tous les plans**.

## Plans
| # | Temps | Plan | Action / logique | Physique | Image | Réf | Mouvement (i2v) |
|---|---|---|---|---|---|---|---|
| 1 | 0-2s | MCU visage + peigne | Elle regarde, inquiète, un peigne plein de cheveux | cheveux réalistes dans le peigne | `nano-edit` | ancre | léger (mèches qui tombent) — `kling`/`seedance` |
| 2 | 2-5s | MCU elle tient le flacon | Elle prend le flacon, va l'ouvrir | — | `nano-edit` | ancre + flacon | push-in sur still (0 crédit) |
| 3 | 5-9s | **MACRO** cuir chevelu | Gouttes rouges qui tombent sur la raie | **gouttes rondes, gravité, huile fine** | `nano-edit` | flacon | i2v gouttes — `kling`/`seedance` (qualité) |
| 4 | 9-12s | Massage (mains) | Elle masse le cuir chevelu | mains cohérentes | `nano-edit` | ancre | i2v léger |
| 5 | 12-15s | Résultat + offre | Cheveux brillants + sourire → 3 flacons + prix | — | `nano-edit` + `composite --pack3` | ancre + flacon | push-in |

## Génération (ordre exact)
1. **Ancre** : `kie_gen.py image --model nano-edit --ref creative/bottle_straight.png --prompt "<femme + salle de bain + flacon>" --out out/sb_anchor.png`.
2. **Chaque plan** : `--ref out/sb_anchor.png` (+ `--ref creative/bottle_straight.png` si le flacon est visible).
3. **Plan physique (3)** : MACRO serré **sans visage**, une seule action → physique correcte
   (voir prompt « SB3b » dans l'historique : *small round droplets, thin oil, gravity, NOT a string, NOT honey*).
4. **Planche** : `tools/storyboard.py --frame "out/sb1.png::HOOK" --frame ... --out out/storyboard_board.png`.

## Mouvement & montage
- i2v **uniquement** sur plans 1, 3, 4, avec un modèle **qualité** (`kling`/`seedance`, pas *fast*), et
  sur des plans **sans le flacon étiqueté** (sinon il se déforme). Plans 2 & 5 = **push-in ffmpeg** sur le
  still (0 crédit) — souvent suffisant et plus « vrai » qu'une vidéo IA.
- Hooks arabes posés **au montage** (CapCut / `arabic_text.py`) : plan 1 `شعرك يطيح بهالشكل؟` ·
  plan 5 `٣ قوارير · ١٣٩ ر.س · الدفع عند الاستلام`.
- Cuts : **6 s** (plans 1→3→5) et **15 s** (complet).

## Coût indicatif
5 stills `nano-edit` (~20 cr) + 2-3 i2v qualité (~150-180 cr/pièce) ⇒ **~350-500 cr** pour la pub montée.
