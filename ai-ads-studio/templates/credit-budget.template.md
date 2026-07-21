---
template: "credit-budget"
type: "template"
fills_stage: "0 (Creative Matrix Planning) — the CREDIT GATE that must be APPROVED before any paid render"
instantiates: "examples/<product-slug>/25-kie-credit-plan.md"
filled_by_skills: ["30-creative-matrix-planner", "31-format-router", "29-cost-optimizer"]
downstream_skills: ["38-upscale-finisher", "27-quality-checker", "41-product-fidelity-checker"]
consumes: ["30-creative-matrix-planner ASSET PRODUCTION PLAN (which types, how many variants, per platform/placement, priority order)",
           "31-format-router routing table (per asset → model + reference_mode + cost_tier + seed/reference lock + text_in_post flag + gate list)",
           "config/kie-models.yaml (cost_tiers draft=1 / iterate=3 / final=10 relative units; routing_matrix; credit_policy; verify_live pricing flags)",
           "config/creative-matrix.yaml (default asset plan per objective × platform + landing-page pack)",
           "products/<slug>/product-lock.yaml (fidelity_gate.ship_threshold, color_tolerance_deltaE — loaded GENERICALLY, never hardcoded)",
           "knowledge/kie-credit-optimization.md (the 10 policies, worked credit-math, decision flowchart)",
           "STUDIO-BIBLE.md §7 (≥95 ship gate) + STUDIO-BIBLE-V2.md §5 (credit policy), §7bis (product always reference-conditioned → route ∈ {R1,R2,R3}, never t2i/t2v)"]
consumed_by_skills: ["38-upscale-finisher (executes the draft→final spend this budget authorizes)",
                     "27-quality-checker (QC ≥ 95 gate that must pass BEFORE the final-tier line item is spent)",
                     "41-product-fidelity-checker (fidelity gate that must pass BEFORE the final-tier line item is spent)"]
based_on: "STUDIO-BIBLE-V2.md §5 policy #10 SURFACE THE BILL + config/kie-models.yaml credit engine. Worked model = the campaign credit plan for زيت المشاط الأحمر (3-bottle pack, 139 SAR), loaded generically from products/mechat-red-oil/product-lock.yaml."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment. One line item per PLANNED asset from skill 30's plan; do not invent assets the plan did not authorize. Numbers are RELATIVE kie-credit units (draft=1, iterate=3, final=10) — re-verify live prices at kie.ai before spend."
---

# Campaign Credit Budget — {{CAMPAIGN_NAME}} · {{PRODUCT_MARKETING_NAME_AR}}

## How to use this template

This is the studio's **SURFACE THE BILL** gate (V2 policy #10). No paid render
runs until this document is filled and **explicitly approved**. Its job is to
make the entire campaign's spend legible *before* a single credit is burned:
every asset shows its **route** (R1/R2/R3), its **chosen model + cost tier**, a
**credit estimate**, and a **cheaper fallback** if the estimate is rejected. The
footer proves the **savings versus a naïve "generate everything at final tier,
Arabic-in-model, one-render-per-size" workflow** — which is the number that
justifies the whole draft→final / one-master-many-exports / text-in-post
discipline.

Costs are expressed in **relative kie-credit units** anchored to
`config/kie-models.yaml → cost_tiers`:

| tier | rel unit | meaning |
|------|:--------:|---------|
| `draft`   | **1**  | iterate / compose / QC-loop — cheapest, fastest, lower res |
| `iterate` | **3**  | near-final checks, mid res |
| `final`   | **10** | the ONE approved render (or upscale) after QC ≥ 95 |

<!-- HOW TO FILL: These ratios are order-of-magnitude, not invoices. kie.ai is an
aggregator and its per-call credit prices DRIFT (kie-models.yaml `verify_live:
true` on every price-sensitive field). Before approving spend, pull live pricing
and multiply the relative units by the current per-tier credit price. Record the
lookup timestamp in Section E so a stale plan is obvious. -->

**Four inheritances you may not override in a budget:**

- **Product is reference-conditioned, always (§7bis).** Every product-bearing
  line item's route MUST be **R1 / R2 / R3** and its model MUST be
  reference-capable (`i2i / edit / inpaint / bg-replace / i2v`). A `t2i` or `t2v`
  model on a product asset is a **hard planning error** — the router is forbidden
  from emitting it; if you see one here, reject the plan.
- **Text is added in post (§5.3).** No line item pays a model to render Arabic.
  Headline / offer / CTA / price are `typography-compositor` (37) or
  `motion-graphics-compositor` (54) layers at **zero generation credits**. This
  is the single biggest regeneration-killer in the savings column.
- **One master → many exports (§5.4).** Every ratio, banner size and placement is
  a **crop / recompose** off ONE paid master, not a new generation. If a size
  needs its own generation line, the master was mis-scoped — fix the master, do
  not add a line.
- **Draft→final gating (§5.5).** You iterate at tier `draft`; you spend tier
  `final` **once**, and only **after** QC ≥ 95 (27) and fidelity pass (41). No
  line item may spend `final` before both gates are green.

**Placeholder convention:** `{{FIELD}}` = a blank you fill.
`<!-- HOW TO FILL: … -->` explains what belongs there — delete each comment once
filled.

---

## Section A — Budget header & envelope

| Field | Value |
|-------|-------|
| Campaign name | {{CAMPAIGN_NAME}} |
| Product (slug) | {{PRODUCT_SLUG}} |
| Marketing name (AR) | {{PRODUCT_MARKETING_NAME_AR}} |
| Objective | {{OBJECTIVE}} <!-- awareness / consideration / retargeting / conversion --> |
| Platforms / placements | {{PLATFORMS}} <!-- e.g. Meta 9:16 + 4:5 · TikTok · Snap · LP pack --> |
| Owner cost mode | {{COST_MODE}} <!-- balanced (default) / economy / premium — from kie-models.yaml meta.default_mode --> |
| Approved credit envelope | {{ENVELOPE_UNITS}} rel units ≈ {{ENVELOPE_CREDITS}} kie-credits |
| Live-price lookup timestamp | {{PRICE_LOOKUP_TS}} <!-- when kie.ai pricing was last verified --> |
| Fidelity ship threshold | {{FIDELITY_THRESHOLD}} <!-- from product-lock.yaml fidelity_gate.ship_threshold --> |
| QC ship gate | ≥ 95 (Bible §7) |
| Plan authored by | 30-creative-matrix-planner + 31-format-router + 29-cost-optimizer |
| Approval status | ☐ DRAFT ☐ APPROVED ☐ REJECTED — {{APPROVER}} / {{DATE}} |

<!-- HOW TO FILL: The envelope is the ceiling the owner pre-approved. If the
Section C total EXCEEDS it, you MUST cut variants or downgrade tiers (Section D
fallbacks) until total ≤ envelope, or escalate for a bigger envelope. A plan
whose total exceeds the envelope is NOT approvable as-is. -->

---

## Section B — Per-asset line items (the bill, itemised)

<!-- HOW TO FILL: ONE row per PLANNED asset from skill 30's ASSET PRODUCTION
PLAN — no more, no fewer. Columns:
  • Asset id/name — matches the plan (e.g. HERO-VID-01, IMG-AD-A, BANNER-MASTER).
  • Family — ad | lp.
  • Route — R1 (product-real/world-ai) | R2 (reference-edit) | R3 (i2v from
    approved keyframe). MUST be non-empty for any product-bearing asset.
  • Draft model @tier — the cheap iterate model + its cost_tier unit (usually 1).
  • Final model @tier — the ONE final-tier model + unit (image final ≈ 10,
    upscale ≈ 1, video final veo3 ≈ high). Put "—" if the asset is a crop/export
    off another master (no own final spend).
  • Iters — expected DRAFT iterations to reach QC≥95 (be honest; this is where
    real credits go — 3–6 typical for a hero, 1–2 for a batch section image).
  • Est units — (draft_unit × iters) + final_unit  [+ upscale_unit if separate].
  • Gates — the gates that must pass before the final line spends (41 fidelity,
    27 QC, plus 46 ai-tell for video). -->

| Asset id | Fam | Route | Draft model @tier | Final model @tier | Iters | Est units | Gates |
|----------|:---:|:-----:|-------------------|-------------------|:-----:|:---------:|-------|
| {{HERO_VID_ID}} | ad | R3 | {{nano-banana @1 (keyframe)}} | {{veo3 @final (i2v)}} | {{4}} | {{EST}} | 41 · 27 · 46 |
| {{IMG_AD_A_ID}} | ad | R1 | {{nano-banana @1 (bg-replace)}} | {{flux-kontext @final}} + upscale @1 | {{3}} | {{EST}} | 41 · 27 |
| {{IMG_AD_B_ID}} | ad | R1 | {{seedream @1}} | {{flux-kontext @final}} | {{2}} | {{EST}} | 41 · 27 |
| {{BANNER_MASTER_ID}} | ad | R1 | {{nano-banana @1}} | {{flux-kontext @final}} | {{2}} | {{EST}} | 41 · 27 |
| {{BANNER_SIZE_×N}} | ad | crop | — (recompose off master) | — | 0 | **0** | 27 (legibility) |
| {{RENDER_3D_ID}} | ad | R1 | {{nano-banana @1}} | {{flux-kontext @edit final}} + upscale @1 | {{3}} | {{EST}} | 41 · 27 |
| {{LP_HERO_ID}} | lp | R1 | {{nano-banana @1}} | {{flux-kontext @final}} | {{2}} | {{EST}} | 41 · 27 |
| {{LP_SECTION_×N}} | lp | R1-batch | {{seedream @1 (shared style)}} | {{seedream @iterate best-of}} | {{1}} | {{EST}} | 41 · 27 |
| {{LP_MICROVIDEO_×N}} | lp | R3 | {{hailuo/seedance @1}} | {{kling/veo3-fast @iterate}} | {{2}} | {{EST}} | 45 · 27 |
| {{LP_3D_BANNER_ID}} | lp | R3 | {{keyframe @1}} | {{kling start+end @iterate}} | {{2}} | {{EST}} | 41 · 45 |

<!-- HOW TO FILL: Add/remove rows to match the plan exactly. The two rows shown as
"crop"/"batch"/"0" are the credit-discipline payoff — banner SIZES cost 0 (they
crop off BANNER_MASTER), and LP section images share one batch style. If your
banner sizes or LP sections each carry their own final-tier cost, you have
violated one-master-many-exports / batch-shared-scene — re-route before pricing.
Product assets (every row except pure-plate backgrounds) MUST show an R1/R2/R3
route; a blank or t2i/t2v route is an automatic reject. -->

---

## Section C — Totals & tier rollup

| Rollup | Units | ≈ kie-credits |
|--------|:-----:|:-------------:|
| Draft/iterate spend (all iterations) | {{DRAFT_UNITS}} | {{DRAFT_CREDITS}} |
| Final-tier spend (approved renders only) | {{FINAL_UNITS}} | {{FINAL_CREDITS}} |
| Upscale/finish spend | {{UPSCALE_UNITS}} | {{UPSCALE_CREDITS}} |
| Post / text overlay (37, 54) | **0** (no generation) | **0** |
| Crop/recompose exports | **0** (one-master-many-exports) | **0** |
| **CAMPAIGN TOTAL** | **{{TOTAL_UNITS}}** | **{{TOTAL_CREDITS}}** |
| Envelope (Section A) | {{ENVELOPE_UNITS}} | {{ENVELOPE_CREDITS}} |
| Headroom (envelope − total) | {{HEADROOM_UNITS}} | {{HEADROOM_CREDITS}} |

<!-- HOW TO FILL: TOTAL_UNITS = sum of Section B "Est units". If Headroom is
negative, the plan is over budget — go to Section D and downgrade tiers / drop
variants until Headroom ≥ 0, then re-total. Show your arithmetic; the approver
verifies the sum. -->

---

## Section D — Per-asset cheaper fallback (what we cut if rejected)

<!-- HOW TO FILL: For EVERY costed row in Section B, name the ONE cheaper fallback
route and its saving, ranked so the approver can trim top-down until the total
fits. Fallbacks follow the policy ladder, cheapest lever first:
  1. text-in-post already assumed (no lever left there — it's baseline).
  2. final image model → cheaper final (flux-kontext → seedream/nano-banana final).
  3. video final veo3 → veo3-fast or kling (biggest single saving in the campaign).
  4. hero video → static image ad only (drop the video line entirely).
  5. N variants → N-1 (drop the lowest-priority A/B arm).
  6. final render → upscale of an approved draft (skip a fresh final gen).
Never let a fallback break fidelity: it may change the SCENE model, never abandon
the R1/R2/R3 reference route (that would forfeit product fidelity to save credits
— forbidden). -->

| Asset id | Primary (units) | Fallback route | Fallback (units) | Saving | Quality trade-off |
|----------|:---------------:|----------------|:----------------:|:------:|-------------------|
| {{HERO_VID_ID}} | {{U}} | veo3 → veo3-fast i2v | {{U}} | {{Δ}} | slightly less fidelity/physics; still filmed-grade |
| {{IMG_AD_A_ID}} | {{U}} | flux-kontext → seedream final | {{U}} | {{Δ}} | marginally softer edit control on scene |
| {{RENDER_3D_ID}} | {{U}} | fresh final → upscale approved draft | {{U}} | {{Δ}} | no re-render; detail from upscaler not new gen |
| {{LP_MICROVIDEO_×N}} | {{U}} | kling → hailuo/seedance | {{U}} | {{Δ}} | looser motion; fine for ambient loop |
| {{variant arms}} | {{U}} | drop lowest-priority A/B arm | {{U}} | {{Δ}} | one fewer test cell |
| {{HERO_VID_ID}} (nuclear) | {{U}} | drop video → static IMG-AD only | {{U}} | {{Δ}} | loses motion hook; keeps a shippable ad |

---

## Section E — Savings vs the naïve workflow (why this discipline pays)

<!-- HOW TO FILL: The naïve baseline is what an undisciplined operator would spend:
every asset generated at FINAL tier from scratch, Arabic baked in-model (so ~40%
regenerate for broken RTL text), every banner size and every ratio generated
independently, video generated direct t2v (product reinvented → more discards).
Compute both columns in the SAME relative units so the delta is apples-to-apples,
then state the % saved. This is the headline number the plan is judged on. -->

| Cost driver | Naïve baseline (units) | This plan (units) | Saved | Policy that saved it |
|-------------|:----------------------:|:-----------------:|:-----:|----------------------|
| Iterate at final tier vs draft | {{N}} | {{P}} | {{Δ}} | §5.5 draft→final gating |
| Arabic-in-model regenerations | {{N}} | 0 | {{Δ}} | §5.3 text-in-post |
| Per-size banner generations | {{N}} | 0 | {{Δ}} | §5.4 one-master-many-exports |
| Per-ratio ad generations | {{N}} | 0 | {{Δ}} | §5.4 one-master-many-exports |
| LP section images (per-image gen) | {{N}} | {{P}} | {{Δ}} | §5.7 batch shared-scene |
| Video: t2v discards vs i2v keyframe | {{N}} | {{P}} | {{Δ}} | §5.2 image-first + §7bis R3 |
| Fresh final vs upscale for res | {{N}} | {{P}} | {{Δ}} | §5.9 upscale-not-regenerate |
| **TOTALS** | **{{NAIVE_TOTAL}}** | **{{PLAN_TOTAL}}** | **{{SAVED_TOTAL}}** | — |

> **Savings headline:** this plan spends **{{PLAN_TOTAL}}** vs a naïve
> **{{NAIVE_TOTAL}}** — a **{{SAVED_PCT}}%** reduction — while every product asset
> stays reference-locked (R1/R2/R3) and every Arabic string stays post-composited
> for guaranteed-correct فصحى.

---

## Section F — Approval gate (must be green before ANY paid render)

<!-- HOW TO FILL: This is the hard stop. Tick each precondition. If any is
unchecked, DO NOT spend. The order matters: the plan is approved as a whole, then
each FINAL-tier line item is unlocked individually only after ITS 41+27 (+46 for
video) gates pass at production time. Approving the budget is NOT approving a
final spend that hasn't passed QC yet. -->

- [ ] Every product-bearing line item has a valid **R1/R2/R3** route and a
      reference-capable model (no `t2i`/`t2v` on the product). — router check
- [ ] **Section C total ≤ envelope** (Headroom ≥ 0), or a bigger envelope is
      approved by {{APPROVER}}.
- [ ] Every costed row has a **named cheaper fallback** (Section D).
- [ ] **Savings vs naïve** computed and ≥ the studio floor (Section E).
- [ ] **No Arabic** is priced into any generation line (text is 37/54, cost 0).
- [ ] Banner sizes / ad ratios cost **0** (crop off a master), not per-size gens.
- [ ] Live kie.ai pricing verified at **{{PRICE_LOOKUP_TS}}** and applied.
- [ ] Draft→final understood: **final tier spends once per asset, only after
      QC ≥ 95 (27) and fidelity ≥ {{FIDELITY_THRESHOLD}} (41)**.
- [ ] Owner approval recorded: **{{APPROVER}} / {{DATE}}** → status APPROVED.

**Handoff:** on APPROVED, this budget authorizes `38-upscale-finisher` to execute
the draft→final spend per line item, each still individually gated by
`27-quality-checker` (≥95) and `41-product-fidelity-checker` (≥ threshold), plus
`46-ai-tell-detector` on any video line. Any mid-production overrun (extra
iterations beyond the "Iters" estimate) is logged back here and re-approved before
it is spent — the bill never silently grows past the envelope.
