# Pack de prompts Higgsfield — Bubble Mousse

À utiliser directement sur la plateforme Higgsfield, avec **ta photo produit en référence**
(`creative/bubble/ref/ref04-d429d42d.jpg` — flacon + coffret sur fond blanc).

---

## 0. Réglages communs

| | |
|---|---|
| **Images produit** | Nano Banana Pro (4K, accepte les références) ou Marketing Studio Image |
| **Images sans produit** | Nano Banana Pro |
| **Vidéo avec produit** | **Seedance 2.0** — c'est le modèle qui tient l'identité grâce aux références multiples |
| **Vidéo sans produit** | Seedance 2.0 ou Kling 3.0 |
| **Audio** | coupé partout (la page est muette) |

**La ligne de garde — à coller à la fin de CHAQUE prompt qui montre le produit :**

> Keep the product exactly as in the reference image: same bottle shape, same green colour, same cap,
> same label artwork and layout, same carton box design. Do not redraw, restyle, translate or invent
> any text on the label or the box. No added text, no lettering, no watermark, no logo overlay.

**La grammaire photo — à coller à la fin de CHAQUE prompt, produit ou pas :**

> Soft diffused natural daylight from the left, warm ivory background, shallow depth of field,
> fine film grain, muted botanical green and warm gold palette, calm and premium, photorealistic.

Sans ces deux blocs répétés partout, tu obtiens douze images qui ne vont pas ensemble — c'est le
défaut n°1 des pages dropshipping.

---

## 1. Images produit — référence OBLIGATOIRE

### 1.1 Héros — le lot de 3 · ratio 4:5 · 4K
> Three identical bottles of the referenced green hair dye foam standing on a warm ivory linen
> surface, the centre bottle slightly forward, the two others half a step back and symmetrical.
> A few fresh mint leaves and one white jasmine flower lie far behind, thrown out of focus.
> Delicate contact shadows under each bottle, a short soft reflection on the surface.
> Editorial premium product photography.
> + ligne de garde + grammaire photo

### 1.2 Packshot solo · ratio 3:4 · 4K
> One bottle of the referenced green hair dye foam standing alone on a warm ivory stone surface,
> three-quarter front view, centred. One single soft contact shadow, a short reflection under the
> base. Clean premium packshot, no props, nothing else in frame.
> + ligne de garde + grammaire photo

### 1.3 Ce que la cliente reçoit · ratio 4:5 · 4K
> The referenced green carton box standing upright beside its bottle on warm ivory linen, and next to
> them a clear plastic applicator bottle with a blue comb-shaped nozzle lying flat. Overhead
> three-quarter view, arranged like a considered flat lay with generous empty space.
> + ligne de garde + grammaire photo

### 1.4 Macro matière · ratio 1:1 · 4K
> Extreme macro of the green bottle's shoulder and cap, only a fragment of the bottle in frame,
> the plastic surface catching a soft highlight, everything else falling out of focus.
> + ligne de garde + grammaire photo

---

## 2. Images sans produit — aucune référence

### 2.1 La paire avant / après · ratio 3:4 · 4K
Génère l'**avant**, puis génère l'**après en mode édition à partir de l'image « avant »**.
Séparément, tu obtiendras deux femmes différentes et la démonstration ne vaudra plus rien.

**Avant :**
> Close-up back view of a woman's head, straight centre parting, heavy grey regrowth: a wide band of
> silver-white and steel-grey hair along the parting and the roots, salt-and-pepper contrast against
> the darker lengths. Realistic individual strands, plain warm ivory studio background.
> + grammaire photo

**Après** (référence = l'image « avant ») :
> Keep the exact same woman, identical hairstyle, identical parting, identical camera angle,
> identical framing, identical lighting and identical background as the reference image.
> Change only the hair colour: all grey and white hair becomes uniform deep natural black, glossy and
> healthy with a soft silky shine. Change nothing else. Photorealistic, no text, no watermark.

### 2.2 Les trois étapes · ratio 3:4 · 4K
Même principe : génère l'étape 1, puis les étapes 2 et 3 **en édition depuis l'étape 1**, sinon la
salle de bain et la femme changent d'une image à l'autre.

1. > Close-up of a woman's hands massaging thick white foam into her own long dark hair at the scalp,
   > ivory bathroom, natural skin, realistic hands with five fingers, calm unhurried gesture.
   > + grammaire photo
2. > Same woman, same bathroom, same lighting as the reference. Her hands now spread the white foam
   > evenly through the mid-lengths of her hair.
3. > Same woman, same bathroom, same lighting as the reference. Long glossy black wet hair under clear
   > running water, water droplets caught in the light, deep black shine.

### 2.3 Mousse · ratio 1:1 · 4K
> Extreme macro of dense soft white cosmetic foam, silky airy lather, tiny iridescent bubbles catching
> the light, spreading slowly. No product container in frame.
> + grammaire photo

### 2.4 Les quatre essences · ratio 1:1 · 2K
Préfixe commun : *Macro top-down still life on a warm ivory stone surface, single soft shadow,
botanical apothecary mood, photorealistic, no text, no logo, no packaging —*

| Essence | Suite du prompt |
|---|---|
| Ginseng | one whole dried ginseng root with fine rootlets, pale beige, sculptural. |
| Saponin | a small heap of dried soapberry fruits and soap nut shells, amber translucent skins. |
| Fo-ti | several flat dried fo-ti root slices in a row, visible wood grain, dark reddish brown, clearly flat discs. |
| Sésame noir | a small pile of black sesame seeds, matte black grains, tiny scale. |

---

## 3. Vidéos

Toutes **muettes**, 1080p, `generate_audio: off`. Attache la photo produit en référence pour les
deux premières.

### 3.1 Le film héros — 12–15 s · 9:16 · Seedance 2.0
C'est LA vidéo qui change la page. Une seule prise continue, aucune coupe.

> A single continuous 15-second shot. Three identical bottles of the referenced green hair dye foam
> stand still on warm ivory linen. The camera performs one slow uninterrupted dolly push-in towards
> them, drifting a few degrees to the right as it approaches, while a soft light sweep travels across
> the bottles from left to right. Mint leaves far in the background drift almost imperceptibly.
> The bottles themselves never move, never rotate and never change. One continuous take, no cuts,
> no transitions, no text on screen. Premium beauty commercial, ivory and green palette, soft daylight.
> + ligne de garde

⚠️ **Regarde le résultat image par image avant de le garder.** Si l'étiquette « respire », ondule ou
change entre deux instants, jette la prise et relance. Une étiquette qui bouge, c'est le signal
« produit pas fiable » pour la cliente — c'est pire que pas de vidéo du tout.

### 3.2 Rotation produit — 8 s · 1:1 · Seedance 2.0
> A single continuous 8-second shot. One bottle of the referenced green hair dye foam stands on warm
> ivory stone. The camera orbits slowly around it by about thirty degrees, staying at the same height,
> revealing the side of the bottle. The bottle stays perfectly still on its base. Soft daylight,
> single soft shadow travelling with the camera. One continuous take, no cuts, no text.
> + ligne de garde

### 3.3 Macro mousse — 6–8 s · 3:4 · aucune référence
> Extreme macro, slow motion. Dense white cosmetic foam is pressed and spreads slowly between two
> fingers, silky airy lather, tiny iridescent bubbles bursting. Warm ivory background, soft daylight
> from the left. One continuous take, no cuts, no text, no product container in frame.

### 3.4 Révélation de la couleur — 8 s · 3:4 · aucune référence
> A single continuous 8-second shot. Close-up back view of a woman's head with a centre parting.
> The camera slowly orbits ten degrees around her while the hair colour transitions smoothly from
> grey-white roots to uniform deep natural black, glossy and healthy. One continuous take, no cuts,
> warm ivory background, soft daylight. Photorealistic, no text, no watermark.

⚠️ Vidéo **illustrative**, pas une preuve. Elle garde la mention « صورة توضيحية » à l'écran, comme
le slider avant/après de la page.

---

## 4. Ce que tu me renvoies

Dépose les fichiers dans `creative/bubble/gen/` avec ces noms exacts, et je les intègre :

| Fichier attendu | Contenu |
|---|---|
| `pack3.png` | 1.1 le lot de 3 |
| `bottle.png` | 1.2 packshot solo |
| `kit.png` | 1.3 ce que la cliente reçoit |
| `hair-before.png` / `hair-after.png` | 2.1 la paire |
| `step-apply.png` / `step-spread.png` / `step-rinse.png` | 2.2 les étapes |
| `foam.png` | 2.3 mousse |
| `ing-ginseng.png` · `ing-saponin.png` · `ing-foti.png` · `ing-sesame.png` | 2.4 essences |
| `hero-film.mp4` | 3.1 le film |
| `bottle-spin.mp4` · `foam-macro.mp4` · `color-reveal.mp4` | 3.2 · 3.3 · 3.4 |

Puis :

```bash
cd ~/e-com
python3 creative/bubble/process.py     # redimensionne, grade, encode en webp
./scripts/shopify.sh putbin 188180398382 "assets/bubble-pack3.webp" assets/bubble-pack3.webp
```

**Deux pièges mesurés sur cette boutique** :
- Le CDN Shopify **ré-encode tout WebP à canal alpha en PNG** — un visuel produit transparent passe
  de 33 Ko à 756 Ko. `process.py` aplatit donc les visuels produit sur la couleur de leur section.
- Le HTML de la page est **mis en cache 15–60 min** par URL. Après un remplacement d'asset, teste
  avec `?view=bubble-landing&cb=123` pour voir la version fraîche.

Les vidéos demanderont en plus une modification de `bubble.html` (remplacer les `<img>` concernés par
des `<video muted playsinline loop poster>`), puis `python3 creative/bubble/port_to_shopify.py`.
