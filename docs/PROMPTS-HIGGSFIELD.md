# Prompts Higgsfield — médias Bubble Mousse

Les visuels actuellement en ligne viennent de kie.ai à partir de sources fournisseur **360×360**.
Ils tiennent, mais ils sont le point faible de la page. Ce document sert à les remplacer par des
médias haute définition générés sur Higgsfield avec **tes images de référence produit**.

---

## 0. Les cinq règles à ne pas casser

1. **Le flacon ne se dessine pas.** Attache toujours la photo produit en référence et exige
   explicitement la conservation de l'étiquette. Tout modèle qui « invente » l'étiquette est à jeter :
   c'est ce qui tue la confiance sur une page COD.
2. **Aucun texte dans l'image.** Les modèles déforment l'arabe. Tout le texte de la page est du HTML.
   Termine chaque prompt par `no text, no lettering, no watermark, no logo overlay`.
3. **Une seule grammaire photographique** pour toute la page, sinon on retombe sur le look
   « template dropshipping » : lumière du jour douce venant de la gauche, fond ivoire chaud,
   profondeur de champ courte, grain fin, palette vert botanique + or.
4. **Le produit est vert, les cheveux sont noirs, le fond est ivoire.** Pas de fond noir, pas de néon,
   pas de bleu.
5. **Rien de médical.** Pas de cuir chevelu en gros plan « avant/après clinique », pas de simulation
   de repousse. On montre la couleur, pas un traitement.

**Références à fournir à Higgsfield** — elles sont dans le repo, dossier `creative/bubble/ref/` :

| Fichier | Ce qu'il montre | À utiliser pour |
|---|---|---|
| `ref01-9ea90da3.jpg` | Flacon seul sur fond blanc | Référence produit principale (packshots) |
| `ref04-d429d42d.jpg` | Flacon + coffret carton | Scènes avec la boîte |
| `ref05-88553e5c.jpg` | Lot de 3 flacons | Visuel d'offre |
| `ref07-5eecf08d.jpg` | Flacon + zajajat zayt (cadeau) | Visuel « ce que tu reçois » |
| `creative/bubble/bottle_cut.png` | Flacon détouré, fond transparent | Compositing / start frame vidéo |

---

## 1. Images — remplacer les assets existants

Pour chacune : génère en **2K minimum**, télécharge, puis suis le §3 pour l'intégration.

### 1.1 `bubble-pack3` — visuel héros (le plus important)
- **Remplace** : `assets/bubble-pack3.webp` · **Ratio** : 4:5 · **Références** : `ref05` + `ref01`

> Three identical green plastic bottles of hair dye foam standing on a warm ivory linen surface,
> arranged with the centre bottle slightly forward. Keep the bottles exactly as in the reference
> images: same green colour, same cap shape, same label artwork, same proportions — do not redraw
> or restyle the label. Soft diffused daylight from the left, delicate contact shadows, a few fresh
> mint and jasmine leaves scattered far in the background and out of focus. Editorial premium
> product photography, shallow depth of field, fine film grain. No text, no lettering, no watermark.

### 1.2 `bubble-bottle` — flacon seul, section « محتويات العرض »
- **Remplace** : `assets/bubble-bottle.webp` · **Ratio** : 3:4 · **Référence** : `ref01`

> One green hair dye foam bottle standing on a warm ivory stone surface, three-quarter front view,
> identical to the reference: same cap, same label artwork, same proportions. Soft daylight from the
> left, single soft contact shadow, short reflection under the base. Clean premium packshot,
> ivory background, no props. No text, no lettering, no watermark.

### 1.3 `bubble-ba-before` / `bubble-ba-after` — la paire du révélateur
C'est l'interaction signature de la page : les deux images **doivent être le même cadrage**.
- **Ratio** : 3:4 · **Aucune référence produit** (le produit n'apparaît pas)

**Avant** :
> Close-up back view of a woman's head, straight centre parting, heavy grey regrowth: a wide band of
> silver-white and steel-grey hair along the parting and the roots, salt-and-pepper contrast against
> darker lengths. Realistic individual strands, plain warm ivory studio background, soft daylight from
> the left. Photorealistic beauty photography. No text, no watermark.

**Après** — génère-la **en mode édition à partir de l'image « avant »**, jamais séparément :
> Keep the exact same woman, identical hairstyle, identical parting, identical camera angle, identical
> framing, identical lighting and identical background as the reference image. Change only the hair
> colour: all grey and white hair becomes uniform deep natural black, glossy and healthy with soft
> silky shine. Change nothing else. Photorealistic. No text, no watermark.

⚠️ Tant que ce sont des images générées, la mention **« صورة توضيحية »** doit rester sous le slider.
Elle ne disparaît que le jour où tu as de vraies photos client.

### 1.4 `bubble-step1` / `step2` / `step3` — les trois étapes
- **Ratio** : 3:4 · **Aucune référence produit** · Même femme et même salle de bain sur les trois :
  génère l'étape 1, puis les étapes 2 et 3 **en édition depuis l'étape 1**.

1. > Close-up of a woman's hands massaging thick white foam into her own long dark hair at the scalp,
   > ivory bathroom light, natural skin, realistic hands with five fingers, calm gesture, soft daylight.
   > Photorealistic. No text, no watermark.
2. > Same woman, same bathroom, same lighting as the reference. Her hands now spread the white foam
   > evenly through the mid-lengths of her hair. Photorealistic. No text, no watermark.
3. > Same woman, same bathroom, same lighting as the reference. Long glossy black wet hair under clear
   > running water, water droplets, deep black shine. Photorealistic. No text, no watermark.

### 1.5 Les quatre essences
- **Ratio** : 1:1 · Même lumière et même fond ivoire sur les quatre.

| Asset | Prompt |
|---|---|
| `bubble-ing-ginseng` | One whole dried ginseng root with fine rootlets, pale beige, sculptural, macro top-down on warm ivory stone, single soft shadow. No text. |
| `bubble-ing-saponin` | A small heap of dried soapberry fruits and soap nut shells, amber translucent skins, macro top-down on warm ivory stone, single soft shadow. No text. |
| `bubble-ing-foti` | Several flat dried fo-ti (polygonum multiflorum) root slices in a row, visible wood grain, dark reddish brown, macro top-down on warm ivory stone. No text. |
| `bubble-ing-sesame` | A small pile of black sesame seeds, matte black grains, macro top-down on warm ivory stone, single soft shadow. No text. |

---

## 2. Vidéos — ce que la page n'a pas encore

La landing est entièrement statique aujourd'hui. Trois vidéos, par ordre de rendement :

### 2.1 Boucle héros (la plus rentable) — 6–8 s, 4:5 ou 9:16, muette
Elle remplacerait l'image `bubble-pack3` par une `<video autoplay muted loop playsinline poster>`.
Start frame : `creative/bubble/bottle_cut.png` ou `ref05`.

> Slow cinematic push-in on three green hair dye foam bottles standing on ivory linen. The bottles stay
> perfectly still and unchanged — same label, same green, same shape as the reference. Only the camera
> moves, a gentle 8-second dolly forward with a soft light sweep passing across the bottles. Mint
> leaves out of focus in the background drift almost imperceptibly. Premium beauty commercial,
> ivory palette, soft daylight. No text, no logo animation.

⚠️ Vérifie image par image que l'étiquette ne « respire » pas. Si elle se déforme, garde l'image fixe
et fabrique le mouvement en post (zoompan + light sweep) — c'est ce que dit la doctrine HANDOFF §3.1.

### 2.2 Démonstration de la mousse — 5–8 s, 3:4
> Extreme macro of dense white cosmetic foam being pressed and spreading slowly between two fingers,
> silky airy lather, tiny iridescent bubbles, warm ivory background, soft daylight from the left.
> Slow motion, premium beauty commercial. No text, no product container visible.

### 2.3 Révélation de la couleur — 6–8 s, 3:4
> Close-up back view of a woman's head with a centre parting. The camera slowly orbits ten degrees
> around her while the hair colour transitions smoothly from grey-white roots to uniform deep natural
> black, glossy and healthy. Single continuous take, no cuts, warm ivory background, soft daylight.
> Photorealistic. No text, no watermark.

⚠️ Cette vidéo est une **démonstration illustrative**, pas une preuve. Elle doit porter la mention
« صورة توضيحية » incrustée en HTML au-dessus, comme le slider.

---

## 3. Intégration — que faire des fichiers reçus

```bash
cd ~/e-com
# 1. déposer les originaux dans creative/bubble/gen/ sous le même slug qu'aujourd'hui
#    (hero-bg, hair-before, hair-after, ing-*, step-*) puis :
python3 creative/bubble/process.py     # redimensionne, grade, encode en webp

# 2. recomposer les visuels produit si tu as un nouveau détourage
python3 creative/bubble/compose.py

# 3. envoyer sur le thème
./scripts/shopify.sh putbin 188180398382 "assets/bubble-pack3.webp" assets/bubble-pack3.webp
```

**Deux pièges mesurés sur cette boutique** :
- Le CDN Shopify **ré-encode tout WebP à canal alpha en PNG** — un visuel produit transparent passe de
  33 Ko à 756 Ko. C'est pour ça que `process.py` aplatit `bubble-pack3` sur `#FBF9F3` et
  `bubble-bottle` sur `#F3EFE4` : sans alpha, le CDN sert du JPEG.
- Le HTML de la page est **mis en cache 15–60 min** par URL. Après un remplacement d'asset, teste avec
  `?view=bubble-landing&cb=123` (paramètre bidon) pour voir la version fraîche.

Pour une vidéo, il faut aussi éditer `bubble.html` (remplacer le `<img>` du hero par une `<video>` avec
`poster`), puis relancer `python3 creative/bubble/port_to_shopify.py`.
