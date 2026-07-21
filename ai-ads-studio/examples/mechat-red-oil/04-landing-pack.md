# Flagship Landing-Page Media Pack — mechat-red-oil

> Professional media to upgrade the landing page (index.html) with the **correct, locked
> product**. The current /assets renders drifted (square bottle, wrong label, invented
> «الأحمر») — this pack **replaces** them. Every asset is route-R1 (real cutout → AI world)
> or R3 (short i2v loop), reference-locked, text in post. Perf-budgeted (webp/mp4, LCP/CLS).

## 1. Slot audit → asset map (skill 35)
| Slot in index.html | New asset | Route | Spec | Replaces |
|---|---|---|---|---|
| Hero visual | LP hero image (bottle + ritual, amber) | R1 | webp, 1600×2000, <180KB, LCP-priority | mechat-hero*.webp (drifted) |
| Hero background motion | oil-pour microvideo loop | R3 | mp4+webm, 1080×1350, 3–5s, <1.5MB, muted autoplay, poster | hero-video*.mp4 |
| Benefits section | 3 benefit images (length / density / shine) | R1 batch | webp, 1080×1080, <120KB each | — |
| Ingredients section | henna + hibiscus + oil flat-lay | R1 | webp, 1600×1000, <160KB | ingredients.webp |
| Ritual / how-to | hair-shine sweep microvideo (back-of-head) | R3 | mp4+webm, 3–4s loop, <1.2MB | — |
| Product / PDP | packshot (from 03-3d-render) + micro-rotation | R1/R3 | webp + mp4 loop | mechat-bottle*.webp |
| Trust / offer | 3-pack packshot on amber | R1 | webp, 1200×1200, <130KB | trio-bottles*.webp |

## 2. Section-image batch prompt (shared style → cheap)
```
Warm amber home-beauty still life, walnut wood surface, golden lamp light, red hibiscus and
henna powder, glossy amber-red hair oil, soft shadows, shallow depth, film grain, premium
heritage mood, NOT studio-white, NOT desert. [per image: focus on {long healthy dark hair
from behind / a thick dense section / a shining strand / henna+hibiscus flat-lay}].
```
Product appears via the real cutout where the bottle is shown (R1). Batch shares seed+style
so the whole page looks like one shoot.

## 3. Microvideo loops (R3, cheap/short)
- **Oil pour** (hero bg): amber oil streams into frame over the dark surface, 4s seamless
  loop, first=last frame. Model: hailuo/seedance draft → veo3-fast/kling final.
- **Hair-shine sweep** (ritual): light travels along a healthy strand, back-of-head, 3s loop.
Negative: cuts, morphing, bright ruby, face, jitter, changing bottle.

## 4. Integration (skill 35 output — wiring)
- Save under `/assets/lp/` e.g. `hero-mechat.webp`, `hero-oil-pour.mp4/.webm`,
  `benefit-length.webp` … Replace the drifted `src=`/`poster=` in index.html accordingly.
- `<video muted autoplay loop playsinline poster="…">` + mp4 & webm sources; lazy-load
  below-the-fold; set explicit width/height to avoid CLS; hero image `fetchpriority="high"`.
- Keep current palette (garnet #8E1B1E / cream / gold) + El Messiri/Tajawal RTL.

## 5. Fidelity + perf gate
Every product-bearing asset passes skill 41 (correct bottle). Perf: hero webp <180KB, LCP
image preloaded, microvideos <1.5MB & poster-backed, total added weight budgeted so mobile
stays fast.

## 6. Credit plan (BALANCED — relative)
| Group | Model | Tier | Rel. cost |
|---|---|---|---|
| Hero image (draft→final→upscale) | nano-banana→flux-kontext→upscale | mix | 14 |
| 4 section images (batch) | seedream/nano-banana | draft | 4 |
| Flat-lay | flux-kontext | final | 10 |
| 3-pack packshot | (reuse alpha from 03) | — | 0 |
| 2 microvideo loops | hailuo→kling | mix | 8 |
| **Total (relative)** | | | **≈ 36 units** |
Naive (regenerate per slot at final, text-in-model) ≈ 120+ → **~70% saved**, and the page
finally shows the **real** product.
