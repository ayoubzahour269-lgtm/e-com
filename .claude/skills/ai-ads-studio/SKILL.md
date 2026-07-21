---
name: ai-ads-studio
description: >-
  Produce high-converting, indistinguishable-from-real beauty/hair/skincare ad
  creative AND landing-page media for the Gulf (KSA, UAE, Oman, Egypt) —
  multi-format: cinematic 9:16 video ads (8-15s), static image ads, multi-size
  banners, photoreal 3D/packshot renders, and landing-page images/microvideos —
  each ending in ONE optimized, reference-conditioned Kie AI prompt plus the full
  package (storyboard, shot list, Arabic VO + overlays, music & sound, quality
  score, A/B plan, credit plan). The real product photos are the fidelity truth
  (never redrawn). Use when the user wants a beauty/product ad, video/image/banner/
  3D creative, landing-page assets, a Kie/Veo/Kling/Flux/nano-banana prompt, an
  "AI studio" run, ad concepts/hooks, or media for a product with a landing page.
  Works for ANY product (drop its photos, run onboarding). Reasons and QCs fully
  before spending any generation credit.
---

# AI Ads Studio — Orchestrator Skill

You are running the **AI Ads Studio**: an in-repo framework (`ai-ads-studio/`)
for producing luxury beauty video ads that look filmed, convert hard, and cost
the fewest possible AI-generation credits. This skill is the **entry point** — it
tells you how to drive the framework end to end.

## Prime directives

1. **Realism first** — the output must look like a real $50k+ commercial, never AI.
2. **Conversion second** — every frame earns Scroll-Stop, Hook, Hold, CTR, CVR, ROAS.
3. **Cost third** — you (Claude) do ALL reasoning, scoring, and QA *before* any
   model call. Target **one** generation per approved concept. Regenerate scenes,
   never whole videos. **Never emit a generation prompt until the quality gate is
   green (score ≥ 95, no axis < 90).**

## Before anything, read these

- `ai-ads-studio/STUDIO-BIBLE.md` — the base source of truth (product facts,
  market/culture rules, the locked flagship creative, Arabic copy, negatives,
  quality gates, file conventions §2).
- `ai-ads-studio/STUDIO-BIBLE-V2.md` — the v2 architecture: the creative matrix
  (video/image/banner/3D + landing media), the product reference-lock (routes
  R1/R2/R3), the Kie credit engine, the undetectable-realism engine, the
  video-editing department, the generic product/brand guardian, and the
  multi-format pipeline.
- `ai-ads-studio/products/<slug>/` — the active product's fidelity truth:
  `product-lock.yaml` + `fidelity-checklist.md` + `reference-manifest.yaml` and
  the real photos in `references/`. The product is ALWAYS reference-conditioned,
  never redrawn from text. New product = drop photos, run skill `40`.
- `ai-ads-studio/knowledge/gulf-beauty-brand-norms.md` — researched, anti-stereotype
  Gulf model-presence & aesthetic norms (default: hands/hair/back-of-head, ritual/
  heritage, amber palette).
- `ai-ads-studio/PIPELINE.md` — the base run. For multi-format, start with skill
  `30` (creative-matrix-planner) → `31` (format-router) → the per-format directors.
- `ai-ads-studio/config/` — `studio.config.yaml`, `platforms.yaml`, `markets.yaml`,
  `model-adapters.yaml`, `kie-models.yaml` (credit engine), `creative-matrix.yaml`,
  and the per-product `brand/*.brand.yaml`.
- `ai-ads-studio/examples/mechat-red-oil/` — the full worked multi-format example
  (image + video + 3D + landing pack + credit plan). Mirror its depth.

## How to run (12 stages)

Work the pipeline in order, invoking the matching skill spec in
`ai-ads-studio/skills/NN-*/SKILL.md` and the relevant `knowledge/` docs at each
step. Produce the artifact for each stage before moving on.

1. **Intake & Brief** — If the product has a landing page, treat it as the ONLY
   source of truth: extract benefits, ingredients, audience, offer, price, CTA,
   trust, pains, desires, objections, social proof (never invent claims). Create
   or load `config/brand/<product>.brand.yaml`. → *creative brief*
2. **Audience & Psychology** — skills `01`, `02`. → ICP, awareness stages, the
   dominant emotional trigger.
3. **Strategy & Offer** — skills `03`, `07`. → angle, funnel role, offer/CTA
   framing, metric targets.
4. **Concepts** — skill `05` generates ≥ 20 diverse concepts; skill `28` scores
   them on the 8 axes; skill `04` picks the winner. Discard the rest.
5. **Hooks** — skill `06` generates ≥ 20 hooks; skill `28` scores; pick the
   strongest first-2-seconds.
6. **Transitions** — skill `15` invents ≥ 30 transitions, then selects the
   seamless, motivated set so the ad is ONE continuous movement.
7. **Storyboard** — skill `08` (with `09`, `10`, `11`) builds the continuous
   beat sheet.
8. **Scene direction** — skills `12` (camera), `13` (lighting), `14` (motion),
   `16` (hair), `17` (human), `18` (environment), `19` (oil/product).
9. **Copy & localization** — skill `20` writes Arabic overlays + VO; skill `21`
   runs the Gulf cultural QA (and the hijab/styled A/B guidance).
10. **Consistency & negatives** — skills `22` (brand), `23` (product lock),
    `24` (negatives).
11. **Prompt compile** — skills `25` + `26` compile ONE Kie prompt using
    `prompt-builders/`. Match the target model's dialect via
    `config/model-adapters.yaml` + `prompt-builders/model-dialect-map.md`.
12. **Quality gate & cost** — skill `27` scores on the 10-axis rubric
    (`quality/scoring-rubric.md`) and runs the realism/brand/culture/consistency
    checklists; skill `29` confirms the single-generation/cost decision. If
    score < 95 → auto-improve and re-score; **do not generate**. Only when the
    gate is PASS do you emit the generation call. After render: QA it; regenerate
    only failing scenes; log the run to `memory/`.

## Multi-format run (v2)

For anything beyond a single video, run Stage 0 first: skill `30` studies the landing
page + objective and outputs the asset plan + **credit budget** (per `creative-matrix.yaml`);
skill `31` routes each asset to the right Kie model (`kie-models.yaml`) and **enforces
reference-conditioning** for every product-bearing asset (R1 real-cutout→world / R2 edit /
R3 image-to-video — never text-to-image of the product). The front half (intake→audience→
strategy→concept→product-lock→culture→negatives→QC) is shared; the back half is per-format:
image `32`, banner `33`, 3D `34`, landing `35`, microvideo `36`, typography `37`, upscale
`38`. Video adds the editing dept (`50`–`56`) and the undetectable-realism engine (`42`–`46`)
with the AI-tell gate. Product fidelity is auto-verified by skill `41` (no manual checking);
Arabic is added in post (`37`/`54`), never in-model. Nothing is generated until fidelity,
undetectability, culture, and overall quality all pass ≥95.

## Deliverables (always return these)

1. Why the concept was selected · 2. Storyboard · 3. Shot list · 4. Voice-over
(Arabic) · 5. Arabic overlays · 6. Music direction · 7. Sound design · 8. The
final Kie AI prompt · 9. Quality score · 10. A/B testing plan.

The fully worked reference lives in `ai-ads-studio/examples/mechat-red-oil/`
(files `00`–`13`) for the flagship product, **زيت المشاط الأحمر** (Red Mechat
Moroccan hair oil). Mirror that structure and depth for any new product.

## Hard rules

- Never change the product lock (vessel, matte-white ribbed cap, translucent
  garnet liquid, exact label + gold "100% Natural" seal, proportions). Anchor
  identity with reference images from the repo `/assets` folder.
- Arabic must be correct, elegant MSA (فصحى); provide a Khaleeji spoken VO
  variant for TikTok/Snap. No mistranslation, ever.
- Respect Gulf modesty and cultural norms; no fake urgency; no medical overreach
  beyond the landing-page claims.
- Always apply the master negative prompt (Bible §6.6) and the model-specific
  additions.
- Prefer a single 8-second generation; offer the 13–15s two-segment cut only
  when budget allows.
