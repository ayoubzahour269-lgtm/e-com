# Prompts Sifu Yik adaptés — زيت المشاط الأحمر (huile capillaire, KSA)

Ce fichier prend les **formats viraux de Sifu Yik** (grille 6×6, vidéo transformation, ASMR Seedance 2.0, storyboard, First Frame → Image-to-Video) et les **réécrit pour ton produit**, en respectant la doctrine créa du `docs/HANDOFF.md`.

## Règles produit non négociables (rappel HANDOFF)

1. **Ne JAMAIS générer ni animer la bouteille par IA** — elle se déforme. On génère des **décors SANS produit**, puis on **composite le vrai cutout** `creative/bottle_straight.png` (ou `hero_pack.png` pour le pack ×3). Pour un « First Frame » avec produit, la 1ʳᵉ frame est un **packshot composité**, pas une bouteille inventée.
2. **Fallback intégration** : `google/nano-banana-edit` (kie.ai) avec **double référence** (scène générée + `bottle_straight.png`). Toujours vérifier à l'œil.
3. **Huile = fine, translucide, rouge grenat, fluide** → toujours écrire `thin, light, translucent garnet-red, low viscosity like a fine serum, NOT thick, NOT honey, NOT syrup`.
4. **Texte arabe = JAMAIS généré par IA** (PIL + Cairo + raqm, RTL). Dans les prompts image, écrire *"leave a clean empty area for Arabic text added in post"*.
5. **Palette** ivoire/crème + accents grenat/or, saturation ~0.87, pas de fonds noirs continus. Grade : `eq=saturation=0.88:brightness=0.03:contrast=0.97:gamma=1.06`.
6. **Claims policy-safe** (فصحى) : `يقلّل التساقط الملحوظ`, `يمنح كثافة ولمعان`, `يغذّي فروة الرأس` — **jamais** `يوقف / يعالج / يشفي`. Avant/après = coiffure + mention `صورة توضيحية`.
7. **Format** : 9:16 · 1080×1920 · durée 12–19 s · une seule prise (transitions par mouvement caméra / fondu-flou / light-leak + whoosh).
8. **Marché** KSA · **COD** `الدفع عند الاستلام` · offre **3 bouteilles 139 ر.س** (barré 185) · 2 packs 259.

Pipeline kie.ai (voir HANDOFF §1.2) : image `POST /api/v1/jobs/createTask` (`google/nano-banana-edit`, `image_size:"9:16"`), vidéo `POST /api/v1/veo/generate` (`veo3_fast`, `aspectRatio:"9:16"`, `imageUrls:[firstFrame]`).

---

# PARTIE A — Prompts vidéo (adaptés des formats viraux)

## Concept 1 — « رحلة القطرة » (ASMR versement) · adapté de #315 ASMR Seedance 2.0

> ✅ **Produit et livré** : `creative/videos/C1-rihlat-alqatra-mechat.mp4` (10 s, 9:16, 1080×1920, audio). Pipeline réel : first frame `google/nano-banana` → `veo3_fast` (8 s + foley) → finition ffmpeg (grade doux, upscale 1080p, poussière d'or, hook arabe PIL, carton offre depuis `hero_pack.png`, transition hblur). Poster : `creative/statics/C1-rihlat-alqatra-poster.jpg`. ⚠️ Piège rencontré et corrigé : le blend `screen` de la poussière d'or entre un flux yuv et rgb → **virage magenta** ; fix = forcer `format=gbrp` sur les deux flux avant `blend`, puis `format=yuv420p`.


**Angle** : satisfaction sensorielle + naturel de la texture. **Hook (≤2 s)** : `شوفي وش كيصير للشعرة لما توصلها القطرة الحمراء 🩸`

**First Frame Image Prompt** (décor + main, SANS bouteille — la bouteille est compositée en post, ou fournir `bottle_straight.png` en 2ᵉ référence à nano-banana-edit) :
```
Cinematic top-down macro shot on a warm ivory marble surface with soft morning light and gentle golden bokeh. A woman's elegant hand (Middle-Eastern skin tone, natural short nails, one thin gold ring) hovers holding a glass dropper filled with thin translucent garnet-red hair oil, a single bright red droplet forming at the tip. Beside the hand, scattered natural ingredients: dried hibiscus petals, henna leaves, a cut lemon, a few strands of dark glossy hair. Cream and garnet color palette, high detail, appetizing serum-like sheen. Leave the lower third as clean empty ivory space for Arabic text added in post. NO text, NO bottle in frame.
```
**Image-to-Video Prompt** (format Sifu Yik) :
```
Theme: A satisfying ASMR ritual — a single drop of fine red hair oil falls and spreads through a dark hair strand, restoring its shine.
Visuals: Warm ivory marble, golden morning light, thin translucent garnet-red oil (low viscosity like a fine serum, NOT honey), dried hibiscus, henna leaf, cut lemon, one glossy dark hair strand.
Camera: Continuous macro, slow push-in from the dropper down to the hair strand, no cuts, subtle rack focus.
Style: Photorealistic 8K, cinematic ASMR, soft natural light, cream & garnet palette, saturation ~0.87, calm luxury.
Action + Sound Design:
- A red droplet swells at the dropper tip and detaches — soft high-pitched droplet chime + gentle ambient hum
- The drop lands on the dark hair strand and spreads, the strand instantly turning smooth and reflective — delicate wet spreading ASMR + faint silky friction
- Camera glides ALONG the strand as the shine travels its full length — soft airy whoosh
- Pull back slightly to reveal petals and lemon around the glowing strand — warm settling tone, no talking
```
**Production** : générer le clip 8 s sans bouteille → au montage, incruster `bottle_straight.png` en bas droite (ombre de contact + light-sweep `streak.png`), overlay gold_dust screen 0.10, texte arabe PIL. Enchaîner sur le packshot offre.

---

## Concept 2 — « من الخفيف إلى الكثيف » (transformation) · adapté de #421 Porcelain-to-Ink

**Angle** : transformation / preuve visuelle (le cœur DR). **Hook** : `٩٠ يوم… وهذا الفرق 👇🏻`

**First Frame Image Prompt** :
```
Split-continuous editorial beauty shot, 9:16. A Middle-Eastern woman seen from behind and side, tasteful and modest, long dark hair. Left side of her hair looks dull, dry, thin and lifeless under cool flat light. Warm ivory studio background with soft garnet gradient. Photorealistic, high fashion editorial, cream & garnet palette. Face mostly turned away / not in close-up. Leave clean empty margins for Arabic text in post. NO product, NO text.
```
**Image-to-Video Prompt** :
```
Style: Hollywood haute-couture beauty, 8K, photorealistic, editorial, fluid rendering.
Duration: 15 seconds.
Scene: A warm ivory studio with a soft garnet-and-gold gradient, floating golden dust.
[00:00–00:05] Shot 1 — The dull strand
Camera: Slow orbit around the back of a modest Middle-Eastern woman with long dark hair.
Action/VFX: Her hair reads dry, thin and matte on the left. Thin translucent red oil (fine serum, NOT syrup) begins to flow down individual strands like glowing red threads.
[00:05–00:10] Shot 2 — The healing travels
Camera: Rack focus into an extreme macro that travels INSIDE a single fiber (signature "journey inside the strand" moment).
Action/VFX: As the red oil passes, the cuticle closes, the fiber turns smooth, dense and reflective; dryness dissolves into soft golden light. Individual strands, no plastic look.
[00:10–00:15] Shot 3 — The reveal
Camera: Pull back out of the fiber into a wide slow-motion hair flip.
Action/VFX: The full head of hair is now thick, glossy and alive, catching warm light; golden dust swirls. Continuous take, no hard cuts.
Sound Design: soft silky friction + gentle rising neo-oriental swell + a single warm chime on the reveal. No talking.
```
**Production** : la bouteille n'apparaît PAS dans la transformation (fidélité) ; elle arrive en carton final composité. Mention `صورة توضيحية` sur l'écran avant/après. Grade doux, pas de virage magenta.

---

## Concept 3 — « العالم داخل القطرة » (surréaliste / échelle) · adapté de #610 Giant Sword (First Frame → Image-to-Video)

**Angle** : wow / stop-scroll + storytelling ingrédients. **Hook** : `وش داخل هالقطرة الحمراء؟ 🌺🍋`

**First Frame Image Prompt** :
```
Surreal macro world, 9:16. A giant translucent garnet-red droplet of hair oil suspended in mid-air over a warm ivory landscape, glowing from within. Inside and around the droplet float oversized natural ingredients like a tiny world: giant hibiscus flowers, henna leaves, a huge cut lemon, all softly lit. Cinematic CGI, epic scale, bright natural light, cream & garnet & gold palette, photorealistic, dreamy. Foreground clean ivory ground for Arabic text in post. NO bottle, NO text.
```
**Image-to-Video Prompt** :
```
Theme: A single giant red hair-oil droplet is a whole living world of natural ingredients, then gently descends toward a woman's hair.
Visuals: Ivory dreamscape, a colossal translucent garnet-red droplet (fine, light, NOT thick), giant floating hibiscus flowers, henna leaves, a huge lemon, drifting golden dust.
Camera: Slow cinematic orbit around the giant droplet, then a smooth continuous descent following it downward, no cuts.
Style: Photorealistic surreal CGI, epic monumental scale, warm natural daylight, cream/garnet/gold, saturation ~0.87.
Action + Sound Design:
- The giant droplet slowly rotates, ingredients drifting inside it — deep soft resonant hum + faint sparkle
- Ingredients dissolve into shimmering red essence that concentrates into the droplet — gentle magical shimmer
- The droplet descends and softly touches a wave of dark glossy hair below, which lights up with shine — soft silky spread + warm whoosh
- Pull back to reveal calm radiant hair, golden dust settling — warm settling chord, no talking
```
**Production** : purement génératif (aucun produit) → carton final packshot ×3 composité + prix + COD.

---

## Concept 4 — « الطقس اليومي » (UGC natif) · adapté du format ASMR Mukbang → routine authentique

**Angle** : preuve sociale / native (bypass ad-skip). **Hook** : `الروتين اللي غيّر شعري خلال شهرين 🧴`

**First Frame Image Prompt** (style téléphone, PAS studio) :
```
Authentic UGC selfie-style vertical shot, shot-on-phone look, slightly imperfect. A modest Middle-Eastern woman (hijab optional / seen applying to lengths, face soft-focus or partly out of frame) in a cozy warm-lit bathroom with beige tiles, morning light. She holds a dropper of thin translucent garnet-red hair oil over her palm. Natural skin, real texture, no studio polish, warm cream tones. Leave top and bottom clear for Arabic captions in post. NO on-image text, NO fake brand.
```
**Image-to-Video Prompt** :
```
Theme: A real, casual morning hair-care routine — a woman applies a few drops of red oil to her lengths and massages her scalp.
Visuals: Warm home bathroom, beige tiles, morning light, phone-camera realism, thin garnet-red oil (fine serum), natural hands.
Camera: Handheld selfie-style, small natural movements, one continuous take, occasional soft focus.
Style: Native UGC, authentic, warm, un-polished, cream palette, sound-on.
Action + Sound Design:
- She squeezes a few red drops onto her fingertips — soft dropper squeeze + ambient room tone
- She massages her scalp and glides the oil down her lengths — gentle scalp-massage ASMR + light fabric rustle
- She flips her hair, which looks soft and shiny — airy hair swoosh
- She smiles briefly toward the camera (short, no long face close-up) — warm ambient, ready for Arabic voiceover in post
```
**Production** : garder l'esthétique brute (dégradation smartphone PIL si généré). Voix off فصحى chaude ou sous-titres. Bouteille réelle tenue en main = si générée, remplacer par cutout composité au montage.

---

## Concept 5 — Storyboard 15 s « سرّ الجمال » · adapté de #601 Toy Story (feuille storyboard)

**Angle** : mini-film premium héritage. Sert de **plan de tournage** pour assembler un spot 15 s cohérent (5 plans × 3 s). À rendre plan par plan en 9:16 puis monter en une prise continue (xfade hblur + gold dust + whoosh).

```
Create a professional 5-panel film storyboard sheet, 9:16, warm ivory/cream paper, thin garnet grid borders.
HEADER: PROJECT: "سرّ الجمال الأحمر" (render Arabic in post) / STYLE: warm cinematic beauty, cream & garnet & gold / TONE: EMOTIONAL–LUXE / DURATION: 15 SEC / RATIO: 9:16.
LOG LINE: a woman rediscovers dense, shining hair through a natural red oil ritual.
PANELS (each: numbered tab, "3.0 SEC", rendered still in warm cinematic beauty style, consistent Middle-Eastern woman with long dark hair, NO product drawn — leave space for composited bottle):
01 — WS establishing: ivory dressing room, morning light, woman with dull hair, pensive. SHOT: WS.
02 — CU macro: thin translucent garnet-red oil drops onto dark strands (fine serum, not honey). SHOT: ECU.
03 — INSIDE-THE-STRAND macro: cuticle closing, fiber turning smooth and dense, golden light. SHOT: MACRO.
04 — MS: slow-motion hair flip, hair now thick and glossy, golden dust. SHOT: MS.
05 — Product beat: clean ivory podium with empty reserved area (bottle composited in post), warm gold rim light. SHOT: product CU.
Consistent character, consistent warm palette across all panels, cinematic lighting.
```

---

# PARTIE B — Prompts IMAGE (statics / catalogue)

## Concept 6 — Grille diversité KSA · adapté de « 6x6 grid (36 modèles) »

Génération **Gemini Pro** ou `nano-banana-edit` (uploader `bottle_straight.png` comme *reference product item*). Idéal pour prouver « pour tous les types de cheveux » côté golfe.

```
6x6 grid layout. UGC beauty photography. Use the reference product (a bottle of red hair oil) held or placed near all 36 women. Every cell must feature a completely unique woman — no two look similar.
Maximize diversity relevant to the Gulf/MENA market:
Age: teens, 20s, 30s, 40s, 50s, 60s, 70s, elderly with grey hair.
Hair: thick, thin, fine, curly, coily, wavy, straight, long, short, greying, hijab and head-wraps (several cells), henna-tinted, dry, damaged, healthy glossy.
Skin tones: full MENA/Gulf/North-African/East-African spectrum, light to deep.
Features: freckles, moles, birthmarks, natural real skin, glasses.
Each cell: different pose (applying oil to scalp, hair flip, holding the bottle, smiling, mirror), different camera angle (overhead, three-quarter, tight crop, profile), varied warm home / studio / natural environments.
Warm cinematic lighting, cream & garnet palette, sharp product detail, modest and respectful styling. The result should feel like the most authentic, inclusive Gulf hair-care campaign — real women, real hair.
```
> 3×3 = 9 (tests rapides), 4×4 = 16 (posts sociaux), 6×6 = 36 (campagne). Astuce : "UGC photography style" + "sharp product detail".

## Concept 7 — Posters IA · adapté de « 20 AI Poster Image Prompts »

Décor génératif SANS bouteille → compositer packshot + texte PIL.
```
Luxury minimalist beauty poster, 9:16, warm ivory background with soft garnet gradient and floating golden dust. Center-left: an empty elegant ivory podium reserved for a product (composited in post). Around it, artfully arranged real ingredients: dried hibiscus flowers, henna leaves, a halved lemon, glossy dark hair swirl. Thin translucent garnet-red oil ribbon flowing gracefully (fine serum, NOT thick). Soft directional gold rim light, Byredo-style, high-end editorial. Large clean upper area reserved for Arabic headline added in post. NO bottle, NO text.
```

---

# PARTIE C — Copy arabe (فصحى, policy-safe) par angle

Limites : Meta primary ~125 car. visibles · headline ≤40 · description ≤30 | TikTok texte ≤100 | Snapchat headline ≤34.

### Angle 1 — Transformation / preuve (Concept 2, 5)
```
Primary (Meta): زيت المشاط الأحمر — تركيبة طبيعية ١٠٠٪ بالمشاط والكركديه والحنّاء والليمون، تغذّي فروة رأسكِ وتمنح شعركِ كثافة ولمعان خلال ٩٠ يوم. (118)
Headline: كثافة ولمعان خلال ٩٠ يوم (24)
Description: طبيعي ١٠٠٪ · بلا بارابين (20)
TikTok: ٩٠ يوم كافية… شوفي الفرق بنفسكِ 🌺 (36)
Snapchat headline: شعر أكثف خلال ٩٠ يوم (20)
```
### Angle 2 — Naturel / ingrédients (Concept 1, 3)
```
Primary: مشاط · كركديه · حنّاء · ليمون — أربعة مكوّنات طبيعية في قطرة حمراء واحدة، بلا بارابين ولا سيليكون. يقلّل التساقط الملحوظ ويغذّي الجذور. (124)
Headline: قوّة أربع أعشاب طبيعية (21)
Description: بلا بارابين ولا سيليكون (23)
TikTok: وش داخل القطرة الحمراء؟ ٤ أعشاب بس 🌺🍋 (37)
Snapchat headline: طبيعي ١٠٠٪ للشعر (16)
```
### Angle 3 — Anti-chute (Concept 4)
```
Primary: تساقط شعركِ صار يقلقك؟ زيت المشاط الأحمر يغذّي الفروة ويقلّل التساقط الملحوظ مع الاستعمال المنتظم. الدفع عند الاستلام. (117)
Headline: يقلّل التساقط الملحوظ (19)
Description: الدفع عند الاستلام (17)
TikTok: الروتين اللي وقّف قلقي من التساقط 🧴 (35)
Snapchat headline: قلّلي التساقط الملحوظ (20)
```
### Offre (carton final commun)
```
Primary: عرض خاص: ٣ عبوات ٢٥٠ مل (كورة ٩٠ يوم) بـ ١٣٩ ر.س بدل ١٨٥ ر.س — الدفع عند الاستلام، توصيل ٢–٥ أيام داخل المملكة. (123)
Headline: ٣ عبوات بـ ١٣٩ ر.س فقط (22)
Description: توصيل + دفع عند الاستلام (23)
TikTok: ٣ عبوات ١٣٩ ر.س · دفع عند الاستلام 🚚 (38)
Snapchat headline: ٣ عبوات ١٣٩ ر.س (15)
```

---

# PARTIE D — Plan de test (diversité Andromeda : concepts structurellement différents)

| # | Concept (structure) | Angle | Format | Plateforme | Métrique décisive |
|---|---|---|---|---|---|
| 1 | ASMR versement (C1) | Sensoriel/naturel | Vidéo 8–12 s | TikTok + Reels | Hook rate ≥30 % |
| 2 | Transformation 90 j (C2) | Preuve/transformation | Vidéo 15 s | Meta + TikTok | Hold rate / ThruPlay |
| 3 | Monde dans la goutte (C3) | Wow/stop-scroll | Vidéo 12 s | TikTok + Snap | Hook rate |
| 4 | UGC routine (C4) | Preuve sociale native | Vidéo 15 s | Meta + TikTok | CTR |
| 5 | Grille diversité (C6) | « pour tous les cheveux » | Static | Meta | CTR |

Règle : **1 variable par test**, 3 hooks alternatifs par concept vidéo, ne juger qu'après ~1 000 impressions. Doubler sur le concept gagnant avec de nouveaux hooks, garder 1 wildcard par batch.

> ⚠️ Tous ces prompts génèrent des **décors** ; la bouteille finale vient **toujours** du cutout réel `creative/bottle_straight.png` composité en post (fidélité produit). Avant/après = coiffure + `صورة توضيحية`.
