# ▶️ RUN THIS — Turnkey generation kit (زيت المشاط للشعر)

Follow top to bottom on **kie.ai**. Everything is copy-paste. You upload ONE photo of your
product when asked — the models only build the world around it, they never redraw the
bottle. Arabic text is added AFTER, in a template (never typed into the model).

**What you need:** a kie.ai account with credits, and your real product photo — ideally the
**magenta / cut-out** version (clean background = perfect for compositing). White-background
photo also works.

**Global negative prompt** (paste into the "negative" field every time):
```
square bottle, round-wrong bottle, bright ruby or cranberry liquid, relabeled bottle,
changed arabic text, «الأحمر» on label, gibberish text, extra text, watermark, logo,
second different bottle, face, exposed styled-hair model, extra fingers, deformed hands,
waxy plastic skin, over-smooth CGI, sterile studio white, desert, camel, tent, souk,
cool blue tone, floating objects, no shadow
```

---

## STEP 1 — The hero image (do this first; everything reuses it)
**Model:** `nano-banana` (image edit / background-replace) → later the winner goes through
`flux-kontext` for the final. **Aspect:** 9:16. **Seed:** 4050 (so results are repeatable).
1. Open nano-banana → **upload your product photo** as the subject/reference.
2. Paste this prompt:
```
Photograph, vertical 9:16, of a warm home hair-care ritual on a dark walnut wood vanity,
golden-hour window light plus a soft warm lamp from the left. A woman's hands (only hands
and forearms, no face, natural skin with real pores) gently hold a thick section of long
dark wavy hair in the upper-left, a few drops of glossy amber-red hair oil catching the
light. Fresh red hibiscus flowers and a small brass dish of henna powder rest lower-left.
Place the uploaded product bottle standing upright front-right on the wood, in sharp focus,
about 38% of frame height, grounded with a soft contact shadow and a faint warm reflection;
relight it to match the golden lamp — do NOT change the bottle, cap, oil color, label, seal
or any text. Shallow depth of field, real 50mm lens bokeh, fine film grain, cozy authentic
premium heritage mood, a real Saudi home at dusk, not a studio. Keep the top and bottom of
the frame darker and uncluttered.
```
3. Paste the global negative. Generate **3 drafts**.
4. Pick the best one where the bottle looks exactly like your real product. Run that one
   once through **flux-kontext** (same prompt) for a clean final, then **upscale**.
✅ This is your **master**. Keep it — Steps 2, 4, 5 reuse it.

## STEP 2 — The video ad (8s) — from the master, no re-drawing the bottle
**Model:** `kling` or `veo3` (image-to-video). **Start frame:** your Step-1 master.
```
Animate this photo as ONE continuous 8-second handheld shot in a warm Saudi home at dusk.
Start on amber-red oil dripping from fingertips onto a thick dark hair section (no face),
drift down as the hands massage the oil along the length (hibiscus & henna soft in front),
then the camera glides right and settles on the bottle with a gentle rack-focus bringing
the label into crisp focus and a warm lamp glint, tilts up a shining strand, and eases back
to rest on the bottle beside three identical bottles. Natural handheld micro-shake, shallow
depth of field, real bokeh, motion blur, fine film grain, warm light from the left, soft
real shadows. Keep the bottle, cap, oil, label and all text EXACTLY as in the start frame.
Real human hands, five fingers. Slow, intimate, premium, filmed — not CGI.
```
Negative (add to global): `cuts, morphing bottle, changing label, warping text, jitter, strobing, flicker, sped-up`.
One final render. (Music/VO/text added after — see Step 6.)

## STEP 3 — 3D packshot + gentle rotation
**Packshot** — `flux-kontext`, upload product photo:
```
Studio product photo of the bottle on a seamless deep-amber gradient backdrop, premium
e-commerce packshot. Soft key light upper-left, rim light right, clean soft shadow and a
subtle reflection beneath. Crisp label, glossy PET, warm glowing amber oil, small specular
on the white ribbed cap. Relight only — do not change the product, label, or text.
```
**Rotation** — `kling` (start frame = the packshot):
```
Rotate the bottle very slightly, about ±12 degrees left-right and back, like a slow
turntable, front label always facing camera; soft light sweeps the glossy surface; seamless
loop. Do NOT reveal the back or sides; do NOT change the product.
```
*(Full 360° needs back/side photos — send them later and it unlocks.)*

## STEP 4 — Banners — zero generation
Take your Step-1 master (and the alpha packshot from Step 3) and **crop / recompose** to:
1:1 1080², 4:5 1080×1350, 9:16 1080×1920, plus IAB 300×250 / 728×90 / 160×600. No new
Kie calls. Add the Arabic in Step 6.

## STEP 5 — Landing-page media
Regenerate the page visuals with the REAL product (your current page uses old wrong renders).
- **Hero image:** reuse Step-1 master (or a cleaner variant).
- **Section images (×4):** nano-banana, same warm style, focus each on {length / density /
  shine / henna+hibiscus flat-lay}. Batch with seed 4050.
- **Oil-pour loop (hero bg):** kling/veo3-fast, 4s seamless: "amber oil streams into frame
  over a dark surface, seamless loop." Save as mp4 **and** webm, add a poster image.
Then replace the old `src=`/`poster=` in `index.html` with the new files under `/assets/lp/`.

## STEP 6 — Add the Arabic (after generation, in Canva / any editor — never in the model)
Fonts: **El Messiri** (headlines) + **Tajawal** (text), right-to-left.
- Headline: «سرّ شعر جدّاتنا… في زجاجة واحدة»
- Offer: «٣ زجاجات بـ ١٣٩ ريال — بدل ١٨٥»  (١٣٩ in gold, strike ١٨٥)
- CTA button (garnet #8E1B1E, cream text): «اطلبي الآن · الدفع عند الاستلام»
- Video VO (record or AI-voice, Khaleeji female) — the 5 lines in `02-video-ad.md §3`.

---

## Order & budget
1 → 3 → 4 → 2 → 5. Total ≈ **82 relative credit-units** for the whole campaign (~70–75%
cheaper than regenerating everything), because the hero look is paid **once** and reused.

## The golden rule
Before you keep any output: does the bottle match your real product exactly (shape, brown-
amber oil, red-swoosh label «زيت المشاط للشعر», gold seal on the left, «250 ml», NO «الأحمر»
on the label)? If not → regenerate with the same photo + seed. That check is your only job;
everything else is decided for you.
