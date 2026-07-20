---
name: ai-ads-studio
description: >-
  Produce a cinematic, high-converting luxury beauty/hair/skincare video ad
  (9:16, 8-15s) for Meta / TikTok / Snapchat targeting the Gulf (KSA, UAE, Oman,
  Egypt), ending in ONE optimized Kie AI (Veo3-class) generation prompt plus the
  full creative package (storyboard, shot list, Arabic VO + overlays, music &
  sound, quality score, A/B plan). Use when the user wants a beauty ad, a video
  ad, a Kie/Veo/Kling/Runway prompt, an "AI studio" run, ad concepts/hooks, or a
  commercial for a product with a landing page. Reasons fully before spending any
  video-generation credit.
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

- `ai-ads-studio/STUDIO-BIBLE.md` — the single source of truth (product facts,
  the immutable product/bottle lock, market/culture rules, the locked flagship
  creative, Arabic copy, negatives, quality gates, conventions).
- `ai-ads-studio/PIPELINE.md` — the 12-stage run you will execute.
- `ai-ads-studio/config/` — `studio.config.yaml`, `platforms.yaml`,
  `markets.yaml`, `model-adapters.yaml`, and the per-product `brand/*.brand.yaml`.

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
