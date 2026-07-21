---
template: "creative-matrix-plan"
type: "template"
fills_stage: "0 (Creative Matrix Planning) — the pipeline ENTRY GATE. No director runs, no format is routed, no Kie credit is spent until this document is filled AND approved."
instantiates: "examples/<product-slug>/00-asset-production-plan.md  (the Stage-0 plan-of-record)"
filled_by_skills: ["30-creative-matrix-planner"]
paired_with: ["31-format-router (turns each planned route into an exact model+settings row)", "templates/credit-budget.template.md (the itemised SURFACE-THE-BILL sibling — Section B/C of the budget expand block 30.3/30.4 here)"]
consumes: ["config/creative-matrix.yaml (plans.<objective>.assets = type × count × placements × note, plans.<objective>.priority, placements.* ratios + family, meta.default_mode balanced, meta.primary_ratio 9:16, meta.languages {vo: khaleeji-female, overlays: MSA})",
           "config/kie-models.yaml (cost_tiers draft=1 / iterate=3 / final=10 relative units; routing_matrix; reference_modes; meta.verify_live: true — price in RELATIVE units, never invented absolutes)",
           "config/studio.config.yaml cost_policy (target_generations_per_concept: 1, max_scene_rerolls: 2, max_generations_per_concept: 3, on_cap_exceeded: halt_for_human_review)",
           "products/<slug>/product-lock.yaml (reference_conditioning routes R1/R2/R3 + default_route, do_not_alter, fidelity_gate.ship_threshold — loaded GENERICALLY by slug, NEVER hardcoded to mechat)",
           "products/<slug>/reference-manifest.yaml (which real photo feeds which asset/angle/route; which reference slots are AWAITING_UPLOAD)",
           "knowledge/gulf-beauty-brand-norms.md (anti-stereotype model-presence policy: hands+hair+back-of-head default, tradition (B), warm amber/copper, home/majlis, no forced face reveal)",
           "index.html under audit (the offer, funnel temperature, existing media inventory, CTA, trust elements) + the campaign brief (objective, placements, market focus, credit envelope)",
           "STUDIO-BIBLE.md §0 (Realism > Conversion > Cost, strict order), §5 (market/platform rules), §7 (ship gate ≥ 95, no axis < 90); STUDIO-BIBLE-V2.md §1 (creative-matrix types), §5 (10 credit policies), §6 (shared-front / per-format-back split), §7bis (product always reference-conditioned)"]
consumed_by_skills: ["31-format-router (reads block 30.2 route + model-presence + reference assignments → exact model/settings)",
                     "29-cost-optimizer (reads block 30.3/30.4 as the spend envelope it meters generations against)",
                     "00-orchestrator (reads block 30.5 priority + dependency graph to schedule the back-half forks)",
                     "32–38 directors (inherit the per-asset model-presence + route + placement scope)"]
based_on: "STUDIO-BIBLE-V2.md §6 (Stage-0 insertion) + skill 30-creative-matrix-planner `produces` (eight ordered blocks 30.1–30.8). Worked model = a conversion campaign for زيت المشاط الأحمر (Red Mechat Hair Oil, slug mechat-red-oil, offer 3 × 250 ml = 750 ml, 139 SAR was 185, free shipping, COD), loaded GENERICALLY from products/mechat-red-oil/product-lock.yaml — the same skeleton plans any future product with zero re-parameterization."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment before this document is submitted for approval. One row per asset the objective plan (config/creative-matrix.yaml) authorises — do not invent assets the plan did not call for, do not silently drop a priority-1 asset. Credit numbers are RELATIVE kie-credit units (draft=1, iterate=3, final=10); re-verify live prices at kie.ai before any spend."
---

# Creative Matrix Plan — {{CAMPAIGN_NAME}} · {{PRODUCT_MARKETING_NAME_AR}}

> **This is the Stage-0 plan-of-record and the hard gate that opens the whole v2
> pipeline.** It answers one question before a single credit is burned: *given
> this landing page and this objective, what is the complete set of creative
> assets worth producing, on which placements, in what priority, and what will it
> cost in Kie credits?* Filled by **30-creative-matrix-planner**; nothing
> downstream — no router, no director, no generation — runs until the
> **Approval Gate (block 30.8)** is green.

## How to use this template

Fill the **eight ordered blocks (30.1 → 30.8)** in order — each feeds the next.
Blocks 30.1–30.2 are the *plan* (study + asset list). Blocks 30.3–30.4 are the
*budget* (itemised via `templates/credit-budget.template.md`, rolled up here).
Blocks 30.5–30.7 are the *build logic* (sequence, pipeline split, de-scope
ladder). Block 30.8 is the *gate* (sign-off). Keep the whole document to one
screen-scroll per block: tables over prose.

**Five inheritances you may not override in a plan** (reject the plan if any is
violated):

- **Priority order is fixed — Realism → Conversion → Cost** (Bible §0). You never
  plan a cheaper asset that cannot clear realism, and never inflate the plan past
  what conversion needs. Cost is the *third* lever, not the first.
- **Product is reference-conditioned, always** (§7bis). Every product-bearing
  asset carries a route ∈ **{R1, R2, R3}** — never text-to-image of the product.
  A blank route or a `t2i`/`t2v` route on a product asset is a **hard planning
  error**.
- **Arabic is added in POST** (§5 policy 3). Label glyphs are reproduced
  *photographically* through reference-conditioning; overlay / CTA / price copy is
  typeset by **37-typography-compositor**. You plan **zero** in-model text.
- **One master → many exports** (§5 policy 4). Every ratio, banner size and
  placement is a crop / recompose off ONE paid master. If a size needs its own
  generation, the master was mis-scoped — fix the master, don't add a line.
- **Product-agnostic** (§7ter). You load the ACTIVE
  `products/<slug>/product-lock.yaml` + `reference-manifest.yaml` by slug. The
  mechat worked values below are illustrative of the loaded product, not wired in.

**Placeholder convention:** `{{FIELD}}` = a blank you fill.
`<!-- HOW TO FILL: … -->` explains what belongs there — delete each once filled.

---

## Block 30.1 — Landing-page + objective study digest

<!-- HOW TO FILL: You STUDY index.html and the brief; you never re-invent a
product claim from them (claims come from product-lock + the LP verbatim). Record
funnel temperature (cold reels traffic vs warm retargeting), the live offer, the
CTA, existing on-page media (so the LP pack only produces what's missing/wrong),
and the trust elements you can echo into ad creative. Note any DRIFTED existing
media (e.g. wrong-shape renders) that this plan must REPLACE, not reuse. -->

| Field | Value |
|-------|-------|
| Campaign name | {{CAMPAIGN_NAME}} |
| Product (slug) | {{PRODUCT_SLUG}} <!-- e.g. mechat-red-oil --> |
| Marketing name (AR) | {{PRODUCT_MARKETING_NAME_AR}} <!-- ad/LP copy name, e.g. زيت المشاط الأحمر --> |
| On-label name (AR) | {{ON_LABEL_NAME_AR}} <!-- what is PHYSICALLY printed; never paint extra words on the bottle --> |
| Objective | {{OBJECTIVE}} <!-- awareness / consideration / conversion / retargeting / landing_page_pack --> |
| Funnel temperature | {{TEMPERATURE}} <!-- cold / warm / hot — sets hook aggressiveness + which assets matter --> |
| Live offer | {{OFFER}} <!-- e.g. 3 × 250 ml = 750 ml · 139 SAR (was 185) · free shipping · COD --> |
| Primary CTA | {{CTA}} <!-- the action the ad drives to; echoes the LP button --> |
| Market focus | {{MARKETS}} <!-- SA primary · AE · OM · EG (from creative-matrix.yaml meta.markets) --> |
| Existing LP media inventory | {{MEDIA_INVENTORY}} <!-- hero, section images, badges, bg video — what exists --> |
| Drifted media to REPLACE | {{DRIFTED_MEDIA}} <!-- wrong-shape / invented-label assets this plan supersedes; else "none" --> |
| Reference readiness | {{REF_READINESS}} <!-- canonical present? which slots AWAITING_UPLOAD (caps what R3/3D can plan) --> |
| Credit envelope (ceiling) | {{ENVELOPE_UNITS}} rel units <!-- pre-approved cap; block 30.4 total must fit --> |

---

## Block 30.2 — The Asset Production Plan (the deliverable list)

<!-- HOW TO FILL: ONE row per asset the objective's plan in config/creative-matrix.yaml
authorises (plans.<objective>.assets). Do NOT invent assets; do NOT drop a
priority-1 asset. Columns:
  • Asset id — stable handle used everywhere downstream (HERO-VID-01, IMG-AD-A…).
  • Type — from V2 §1 (hero-video-ad, image-ad, banner, 3d-render, lp-hero-image,
    lp-section-image, lp-3d-banner, lp-microvideo).
  • Fam — ad | lp.
  • Count — A/B variant count (scale to BALANCED mode + envelope; honesty over ambition).
  • Placements / ratios — from placements.* (9:16 primary; 4:5 feed; 1:1 square; banner size set).
  • Route — R1 (product-real / world-AI, DEFAULT) | R2 (reference edit/inpaint) |
    R3 (i2v from an approved keyframe). MUST be non-empty for every product row.
  • Model-presence — the anti-stereotype mode inherited from gulf-beauty-brand-norms:
    hands / hair / back-of-head / no-face default; tradition (B); flag any face-forward
    exception with a reason.
  • Text-in-post — always YES for any Arabic (headline/CTA/price) → 37-typography-compositor.
  • Pri — priority rank (1 = ship first). Mirrors plans.<objective>.priority. -->

| Asset id | Type | Fam | Count | Placements / ratios | Route | Model-presence | Text-in-post | Pri |
|----------|------|:---:|:-----:|---------------------|:-----:|----------------|:------------:|:---:|
| {{HERO_VID_01}} | hero-video-ad | ad | {{1}} | {{9:16 · Meta Reels/TikTok/Snap · 8s}} | R3 | {{hands+hair, no face}} | YES | 1 |
| {{IMG_AD_A}} | image-ad | ad | {{1}} | {{4:5 · Meta Feed · 1:1 · IG}} | R1 | {{product-hero, no model}} | YES | {{2}} |
| {{IMG_AD_B}} | image-ad | ad | {{1}} | {{4:5 · Meta Feed}} | R1 | {{benefit-demo, hair only}} | YES | {{2}} |
| {{IMG_AD_C}} | image-ad | ad | {{1}} | {{1:1 · IG}} | R1 | {{social-proof / majlis}} | YES | {{3}} |
| {{BANNER_MASTER}} | banner | ad | {{1}} | {{master → 1:1 · 9:16 · 300×250 · 728×90 · 160×600 · 320×50}} | R1 | {{product-hero}} | YES | {{3}} |
| {{RENDER_3D_01}} | 3d-render | ad | {{1}} | {{1:1 · 4:5 packshot + scene}} | R1 | {{n/a — packshot}} | YES | {{4}} |
| {{LP_HERO}} | lp-hero-image | lp | {{1}} | {{16:9 · 9:16 mobile}} | R1 | {{product-hero}} | n/a (LP text is HTML) | {{2}} |
| {{LP_SECTION_×N}} | lp-section-image | lp | {{4}} | {{benefits · ingredients · ritual · trust}} | R1-batch | {{hair / macro / home}} | n/a | {{4}} |
| {{LP_MICROVID_×N}} | lp-microvideo | lp | {{2}} | {{4s loop · oil pour · hair shine}} | R3 | {{macro, no face}} | n/a | {{5}} |
| {{LP_3D_BANNER}} | lp-3d-banner | lp | {{1}} | {{face-on micro-rotation hero}} | R3 | {{n/a — packshot}} | n/a | {{5}} |

<!-- HOW TO FILL: If reference-manifest shows only a front photo (no back/profile),
DOWNGRADE any full-rotation 3d/3d-banner to a small label-face-on micro-move (R3)
and FLAG it in block 30.7 "reference gaps" — full turntable stays blocked until
more angles upload. Never plan a full 360° from a single-angle reference. -->

---

## Block 30.3 — Per-asset credit budget (build recipe + primary route + fallback)

<!-- HOW TO FILL: Expand each block-30.2 row into a costed line. This is the
itemised SURFACE-THE-BILL layer — for the full column set (draft/final model @tier,
gates 41·27·46, exports at 0) instantiate templates/credit-budget.template.md and
reference it here; the summary below is the planner's rollup of that bill.
Numbers = relative kie-credit units (draft=1, iterate=3, final=10). "Exports" rows
(banner sizes, extra ratios) cost 0 — they crop off a master. Every product line
shows a cheaper FALLBACK that changes the SCENE model but NEVER abandons the
R1/R2/R3 reference route (forfeiting fidelity to save credits is forbidden). -->

| Asset id | Route | Build recipe (draft → final) | Primary est (units) | Cheaper fallback | Fallback est | Trade-off |
|----------|:-----:|------------------------------|:-------------------:|------------------|:------------:|-----------|
| {{HERO_VID_01}} | R3 | {{keyframe @1 ×4 iters → veo3 i2v @final}} | {{EST}} | veo3 → veo3-fast i2v | {{EST}} | slightly less physics; still filmed-grade |
| {{IMG_AD_A}} | R1 | {{bg-replace @1 ×3 → flux-kontext @final + upscale @1}} | {{EST}} | flux-kontext → seedream final | {{EST}} | marginally softer scene control |
| {{IMG_AD_B}} | R1 | {{seedream @1 ×2 → flux-kontext @final}} | {{EST}} | drop to upscale of best draft | {{EST}} | no fresh final gen |
| {{BANNER_MASTER}} | R1 | {{nano-banana @1 ×2 → flux-kontext @final}}; all sizes crop @0 | {{EST}} | reuse IMG_AD_A master (no new gen) | {{0}} | banner rides an existing master |
| {{RENDER_3D_01}} | R1 | {{nano-banana @1 ×3 → flux-kontext edit @final + upscale @1}} | {{EST}} | fresh final → upscale approved draft | {{EST}} | detail from upscaler, not new gen |
| {{LP_HERO}} | R1 | {{nano-banana @1 ×2 → flux-kontext @final}} | {{EST}} | reuse RENDER_3D scene master | {{EST}} | one less hero look |
| {{LP_SECTION_×N}} | R1-batch | {{seedream @1 batch, shared style → best-of @iterate}} | {{EST}} | fewer sections (4 → 3) | {{EST}} | one fewer LP section |
| {{LP_MICROVID_×N}} | R3 | {{keyframe @1 → kling/veo3-fast @iterate loop}} | {{EST}} | kling → hailuo/seedance | {{EST}} | looser motion; fine for ambient loop |
| {{LP_3D_BANNER}} | R3 | {{keyframe @1 → kling start+end @iterate}} | {{EST}} | drop to static LP_HERO | {{EST}} | loses micro-motion; keeps hero still |

---

## Block 30.4 — Total campaign budget rollup + savings headline

| Rollup | Units | ≈ kie-credits |
|--------|:-----:|:-------------:|
| Draft / iterate spend (all iterations) | {{DRAFT_UNITS}} | {{DRAFT_CREDITS}} |
| Final-tier spend (approved renders only) | {{FINAL_UNITS}} | {{FINAL_CREDITS}} |
| Upscale / finish spend | {{UPSCALE_UNITS}} | {{UPSCALE_CREDITS}} |
| Post / text overlay (37) | **0** (no generation) | **0** |
| Crop / recompose exports (banner sizes, ratios) | **0** (one-master-many-exports) | **0** |
| **CAMPAIGN TOTAL** | **{{TOTAL_UNITS}}** | **{{TOTAL_CREDITS}}** |
| Envelope (block 30.1) | {{ENVELOPE_UNITS}} | {{ENVELOPE_CREDITS}} |
| Headroom (envelope − total) | {{HEADROOM_UNITS}} | {{HEADROOM_CREDITS}} |

> **Savings headline:** this plan spends **{{TOTAL_UNITS}}** vs a naïve
> **{{NAIVE_UNITS}}** (everything at final tier, Arabic baked in-model → ~40 %
> RTL regenerations, every size/ratio generated fresh, video generated direct
> t2v) — a **{{SAVED_PCT}}%** reduction — while every product asset stays
> reference-locked (R1/R2/R3) and every Arabic string stays post-composited for
> guaranteed-correct فصحى / Khaleeji VO.

<!-- HOW TO FILL: If Headroom is NEGATIVE the plan is NOT approvable as-is — go to
the de-scope ladder (30.7) and cut top-down until Headroom ≥ 0, or escalate for a
bigger envelope. Show the arithmetic; the approver verifies the sum. Also confirm
per-concept caps from studio.config.yaml (max_generations_per_concept: 3,
max_scene_rerolls: 2) are respected — a hero at >3 total gens halts for review. -->

---

## Block 30.5 — Build sequence + dependency graph

<!-- HOW TO FILL: Order the build so shared masters are produced ONCE and reused.
The golden dependency: ONE approved image master (usually the packshot / hero
scene) feeds the banner size system AND the hero-video keyframe. Never schedule a
banner or a hero-video before its parent master is approved. Priority (block 30.2
"Pri") sets the order; dependencies override priority when a child needs a parent
first. -->

```
Stage 0  APPROVE THIS PLAN (block 30.8) ─┐
                                         ▼
1. {{RENDER_3D_01 / IMG_AD_A}}  ← the ONE master (packshot + hero scene)   [Pri 1–2]
       │  approved master (fidelity 41 ≥ threshold, QC 27 ≥ 95)
       ├─► 2. {{BANNER_MASTER}} sizes  → crop/recompose  @0 credits        [Pri 3]
       ├─► 3. {{HERO_VID_01}} keyframe → veo3 i2v (R3)                      [Pri 1]
       └─► 4. {{LP_HERO}} / {{LP_SECTION_×N}} batch (shared style)          [Pri 2–4]
5. {{LP_MICROVID_×N}} / {{LP_3D_BANNER}}  ← from an approved keyframe (R3)   [Pri 5]
6. 37-typography-compositor overlays Arabic on every ad/banner  @0 credits
```

| Dependency | Parent (must approve first) | Children (ride the master) |
|-----------|------------------------------|-----------------------------|
| Master → exports | {{MASTER_ASSET_ID}} | {{BANNER sizes · ad ratios}} |
| Master → keyframe | {{MASTER_ASSET_ID}} | {{HERO_VID_01 · LP_MICROVID · LP_3D_BANNER}} |
| Batch style | {{LP_SECTION seed/style token}} | {{LP_SECTION_×N}} |

---

## Block 30.6 — Shared-front-half / per-format-back-half split

<!-- HOW TO FILL: State plainly which reasoning runs ONCE for the whole plan and
which forks per asset. This is what makes the plan cheap: the expensive strategic
reasoning is amortised across every asset; only the format-specific back half is
duplicated. Do not re-run the shared front half per asset. -->

| Half | Runs | Stages |
|------|------|--------|
| **Shared front half** (once for the whole plan) | 1× | 01-audience → 02-psychology → 03-strategy → 04/05 concept → brand-lock (22) + product-lock → 21 cultural QA (Gulf) → 24 negatives → 27/28 QC gate |
| **Per-format back half** (forks per asset) | per asset | director (32–38) → 26 prompt-compile → 31 model route → 41 product-fidelity gate + 27 quality gate (≥95) → 29 credit decision → 00-orchestrator fires the generation |

> The front half establishes audience, angle, offer framing, cultural safety and
> negatives ONCE; every asset in block 30.2 inherits it. Only the director +
> prompt-compile + route + gates are paid per format.

---

## Block 30.7 — De-scope ladder (what we cut if the budget is capped)

<!-- HOW TO FILL: Rank the cuts top-down so the approver can trim until Headroom ≥ 0
WITHOUT touching realism or fidelity. Cut the cheapest-signal / lowest-priority
first; protect the priority-1 hero and any asset the objective cannot ship
without. A fallback may change the SCENE model or drop a variant; it may NEVER
abandon the R1/R2/R3 reference route or bake Arabic into the model. Also list any
REFERENCE GAP that forces a de-scope (e.g. single-angle photo blocks full 3D
rotation) — that's a capability cap, not a budget choice. -->

| Rank | Cut | Units saved | Impact | Protected? |
|:----:|-----|:-----------:|--------|:----------:|
| 1 | {{drop lowest-Pri LP microvideo variant}} | {{Δ}} | one fewer ambient loop | LP still complete |
| 2 | {{final image model → cheaper final (flux-kontext → seedream)}} | {{Δ}} | marginally softer scene | fidelity route intact |
| 3 | {{N image-ad variants → N−1 (drop lowest-Pri A/B arm)}} | {{Δ}} | one fewer test cell | hero + winner kept |
| 4 | {{hero video veo3 → veo3-fast}} | {{Δ}} | slightly less physics | still filmed-grade |
| 5 (nuclear) | {{drop hero-video → static image-ad only}} | {{Δ}} | loses motion hook | keeps a shippable ad |

**Reference gaps forcing a de-scope:** {{REF_GAPS}} <!-- e.g. "only front photo →
lp-3d-banner limited to label-face-on micro-move; full turntable BLOCKED until
back/profile/cap-macro upload"; else "none — canonical set complete". -->

---

## Block 30.8 — APPROVAL GATE (must be green before ANY paid render)

<!-- HOW TO FILL: The hard stop. Tick every precondition. If any is unchecked, DO
NOT proceed to routing or production. Approving THIS plan authorises the build
SEQUENCE and the ENVELOPE; each FINAL-tier line item is still unlocked
individually at production time only after ITS 41 (fidelity) + 27 (QC ≥ 95)
[+ 46 ai-tell for video] gates pass. Approving the plan is NOT approving a final
spend that hasn't passed QC. -->

- [ ] Every product-bearing asset (block 30.2) has a valid **R1/R2/R3** route —
      no blank, no `t2i`/`t2v` on the product.
- [ ] **No Arabic** is priced into any generation line — all copy is
      37-typography-compositor at 0 credits.
- [ ] Banner sizes / ad ratios cost **0** (crop off ONE approved master), not
      per-size generations.
- [ ] **Block 30.4 total ≤ envelope** (Headroom ≥ 0), or a bigger envelope is
      approved by {{APPROVER}}.
- [ ] Per-concept caps respected (studio.config.yaml:
      max_generations_per_concept ≤ 3, max_scene_rerolls ≤ 2).
- [ ] Every costed row has a **named cheaper fallback** (block 30.3) that keeps
      the reference route.
- [ ] **Savings vs naïve** computed and ≥ the studio floor (block 30.4).
- [ ] Reference readiness confirmed; any gap de-scoped, not ignored (block 30.7).
- [ ] Live kie.ai pricing verified at **{{PRICE_LOOKUP_TS}}** and applied to the
      relative units.
- [ ] Draft→final understood: **final tier spends once per asset, only after
      QC ≥ 95 (27) and fidelity ≥ {{FIDELITY_THRESHOLD}} (41)**.

**Gate token:** `PLAN-{{CAMPAIGN_SLUG}}-{{DATE}}` · Status:
☐ DRAFT ☐ APPROVED ☐ REJECTED — {{APPROVER}} / {{DATE}}

**Handoff:** on **APPROVED**, this plan-of-record is written to `memory/` (campaign
history + future-run priors) and released to **31-format-router** (block 30.2
routes → exact models/settings), **29-cost-optimizer** (block 30.3/30.4 → the
metered spend envelope) and **00-orchestrator** (block 30.5 → the scheduled
back-half forks). Any mid-production overrun beyond the block-30.3 iteration
estimate is logged back here and re-approved before it is spent — the plan never
silently grows past the envelope.
