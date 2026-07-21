# Flagship Worked Example — زيت المشاط للشعر (mechat-red-oil)

A full, end-to-end run of the AI Ads Studio v2 engine on the real product — the concrete
"test on the current product" deliverable. Everything is locked to the real photos
(`../../products/mechat-red-oil/`), grounded in researched Gulf norms, reference-conditioned
(the product is never redrawn from text), Arabic in post, and credit-optimized.

## Files
- **`00-brief-and-concept.md`** — audience, insight, the researched Gulf lane, and the
  LOCKED concept «لمسة جدّتي» (Grandmother's Touch); why it beat 20 alternatives.
- **`01-image-ad.md`** — worked static ad: route-R1 Kie prompt, negatives, Arabic overlays,
  fidelity/quality gates, exports, credit plan, and the 2-click kie.ai walkthrough.
- **`02-video-ad.md`** — 8s 9:16 continuous video ad (route-R3 i2v from the keyframe):
  storyboard, shot list, Khaleeji VO + MSA overlays, music & sound, the motion prompt,
  quality score, credit plan, A/B plan.
- **`03-3d-render.md`** — photoreal packshot + face-on micro-rotation "3D" hero (single-
  front-reference-safe), fidelity gate, credits.
- **`04-landing-pack.md`** — landing-page media pack that **replaces the drifted renders**
  with the correct product: slot audit → asset map → prompts → integration wiring → perf.
- **`05-credit-plan.md`** — consolidated campaign credit budget (~70–75% saved vs naive)
  + spend gates + cheaper fallback ladder.

## The 10 classic deliverables — where they live
1. Why the concept → `00` · 2. Storyboard → `02` · 3. Shot list → `02` · 4. Arabic VO →
`02` · 5. Arabic overlays → `01`,`02` · 6. Music direction → `02` · 7. Sound design → `02`
· 8. Final Kie prompt → `01` (image), `02` (video), `03` (3D) · 9. Quality score → `02`
(+ gates in each) · 10. A/B plan → `02`. Plus multi-format (image/3D/banner/landing) and
the campaign credit plan → `05`.

## To actually generate
Save the two real photos into `../../products/mechat-red-oil/references/`
(`01-front-white.png`, `02-front-chroma-magenta.png`), then follow each file's kie.ai
steps. Reproduce this structure for any new product by dropping its photos and running
skill 40.
