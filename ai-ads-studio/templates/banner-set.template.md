---
template: "banner-set"
type: "template"
fills_stage: "0→back-half (Creative Matrix production line — the banner sub-pipeline)"
instantiates: "examples/<product-slug>/21-banner-set.md"
filled_by_skills: ["33-banner-systems-designer"]
downstream_skills: ["37-typography-compositor", "38-upscale-finisher",
                    "41-product-fidelity-checker", "27-quality-checker"]
consumes: ["31-format-router banner routing entry (route: derive-from-master, reuses_master:<image-ad master id>, seed_lock, text_in_post:true, gates [41,27])",
           "APPROVED IMAGE MASTER + its layer stack (from 32-image-ad-director, the R1 build: real product cutout layer + separate background/plate layer + overlay-zone map)",
           "products/<slug>/product-lock.yaml (vessel proportions, do_not_alter list, oil colour, label element hierarchy, fidelity_gate.ship_threshold, color_tolerance_deltaE — loaded GENERICALLY, never hardcoded)",
           "products/<slug>/reference-manifest.yaml (which real cutout is the product layer)",
           "config/platforms.yaml (safe_zones per surface, cta_style, offer_lock, overlay_typeface El Messiri/Tajawal RTL)",
           "config/creative-matrix.yaml (placements.retargeting_banner size list, offer/CTA locks)",
           "knowledge/banner-systems.md (IAB weight budgets, safe zones, animation limits)",
           "knowledge/gulf-beauty-brand-norms.md (warm amber/copper palette, hands+hair+back-of-head default, no orientalist cliché)",
           "STUDIO-BIBLE.md §3 (offer, price 139/185 SAR, COD, brand palette + fonts), §4→product-lock, §5 (safe zones, sound-off legibility), §6.3 (locked Arabic overlay lines), §7 (≥95 ship gate), §7bis (product ALWAYS reference-conditioned; R1 = real product + AI world; label/text in post), §8 (one-master→many-exports)"]
consumed_by_skills: ["37-typography-compositor (per-zone Arabic typesetting)",
                     "38-upscale-finisher (per-size export matrix)",
                     "41-product-fidelity-checker (every crop re-gated on the product layer)",
                     "27-quality-checker (per-size legibility + brand + conversion re-gate)"]
based_on: "skills/33-banner-systems-designer/SKILL.md (the ONE MASTER → MANY EXPORTS enforcer for the display/retargeting family) + knowledge/banner-systems.md. Worked model = the flagship banner system for زيت المشاط الأحمر (UNBROKEN THREAD offer beat), loaded generically from products/mechat-red-oil/product-lock.yaml."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment. Rows/cards are one-per-size; do not add a size that is not in config/creative-matrix.yaml placements.retargeting_banner without a routing reason."
---

# Banner Set — {{CONCEPT_NAME_EN}} ({{CONCEPT_CODENAME}}) · {{PRODUCT_MARKETING_NAME_AR}}

## How to use this template

This template captures a **complete banner SYSTEM** derived from **one**
approved image master — never a set of independently generated images. The
governing law is the studio's canonical credit rule **ONE MASTER → MANY
EXPORTS** (V2 policy §4; Bible §8): the campaign already paid, once, for the
approved hero still; every size below is built by **crop / recompose off that
single master**, with Arabic copy added in **post** (never in-model), at **zero
additional generation credits**. If any size here would require a new
generation, you have mis-scoped the master — go back and re-plan the master's
resolution and bleed, do not re-generate per size.

Three hard inheritances from the Bible you may not override in a banner:

- **Product is reference-conditioned, always (§7bis).** The product layer is the
  real cutout from `products/<slug>/references/`, placed and *uniformly* scaled —
  never redrawn, restretched, or non-uniformly squeezed to fit a wide unit. If a
  size is too short/wide for the bottle at a legible size, recompose the scene
  around it; never distort the vessel.
- **Text is added in post (§7bis, V2 §5.3).** No Arabic is baked into the master
  by any image model. Every headline / offer / CTA / price is a typography layer
  handed to **37-typography-compositor**. This guarantees correct فصحى and kills
  the #1 cause of banner regenerations.
- **The offer is locked (§3).** Price, discount, COD, free-shipping and the CTA
  line are fixed strings — copy them verbatim, do not paraphrase, do not localize
  the numerals into Arabic-Indic unless the platform block says so.

**Placeholder convention:** `{{FIELD}}` = a blank you fill.
`<!-- HOW TO FILL: … -->` explains what belongs there — delete each comment once
filled.

---

## Section A — Master spec (the single source every size derives from)

<!-- HOW TO FILL: Point at the ONE approved master. The master must be built
"generous": higher resolution than the largest export, product deliberately
OFF-CENTRE with clean extendable background on at least two sides, and delivered
as a LAYER STACK (product cutout, background/plate, reserved overlay zones) so
crops can re-anchor without a re-generation. -->

| Field | Value |
|-------|-------|
| Source master id | {{MASTER_ID}} <!-- the 32-image-ad-director / hero-keyframe master this system reuses --> |
| Master route (must be R1/R2/R3) | {{MASTER_ROUTE}} <!-- e.g. R1 PRODUCT-REAL / WORLD-AI — real bottle cutout, AI background --> |
| Master native resolution | {{MASTER_RES}} <!-- must exceed the largest export's long edge with headroom, e.g. 2160×2160 for 1080 units --> |
| Seed / reference lock | {{SEED_LOCK}} <!-- fixed seed + product reference used across the whole set for one bottle identity --> |
| Product layer source | {{PRODUCT_LAYER_REF}} <!-- which real cutout from reference-manifest.yaml is the product layer --> |
| Background / plate layer | {{BG_LAYER}} <!-- the AI-generated world, separable + extendable behind the product --> |
| Extendable-background sides | {{EXTEND_SIDES}} <!-- which sides have clean bleed to extend for tall/wide units, e.g. top+left --> |
| Off-centre anchor | {{PRODUCT_ANCHOR}} <!-- where the bottle sits in the master so crops keep it in frame, e.g. lower-right third --> |
| Reserved overlay zones (from master's overlay-zone map) | {{OVERLAY_ZONES_SUMMARY}} <!-- the negative-space regions kept clear for headline/offer/CTA --> |

**Layer-stack contract:** the master MUST arrive as separable layers, never a
flat baked frame. A flat master cannot be recomposed for a 728×90 leaderboard
without cutting the bottle in half. If the master is flat, reject it back to the
image-ad director before proceeding.

---

## Section B — Size matrix (one row per export size)

<!-- HOW TO FILL: One row per size in config/creative-matrix.yaml
placements.retargeting_banner. Keep the three geometry families visible: the
near-square FEED group (straight crop keeps the hero), the TALL group (vertical
recompose), and the SHORT/WIDE strips (bottle small, type-led). "Method" is only
ever crop or recompose — NEVER regenerate. -->

| # | Size (px) | Aspect | Unit name | Surface / network | Method | Text tier (§E) | Min product-label height | Export format (§H) |
|---|-----------|--------|-----------|-------------------|--------|----------------|---------------------------|--------------------|
| 1 | 1080 × 1080 | 1:1 | Feed square | {{U1_SURFACE}} | crop | {{U1_TIER}} | {{U1_MINLABEL}} | {{U1_FORMAT}} |
| 2 | 1080 × 1350 | 4:5 | Feed portrait | {{U2_SURFACE}} | crop | {{U2_TIER}} | {{U2_MINLABEL}} | {{U2_FORMAT}} |
| 3 | 1080 × 1920 | 9:16 | Story / vertical | {{U3_SURFACE}} | recompose | {{U3_TIER}} | {{U3_MINLABEL}} | {{U3_FORMAT}} |
| 4 | 300 × 250 | 6:5 | Medium Rectangle | {{U4_SURFACE}} | crop | {{U4_TIER}} | {{U4_MINLABEL}} | {{U4_FORMAT}} |
| 5 | 728 × 90 | ~8:1 | Leaderboard | {{U5_SURFACE}} | recompose | {{U5_TIER}} | {{U5_MINLABEL}} | {{U5_FORMAT}} |
| 6 | 160 × 600 | ~4:15 | Wide Skyscraper | {{U6_SURFACE}} | recompose | {{U6_TIER}} | {{U6_MINLABEL}} | {{U6_FORMAT}} |
| 7 | 320 × 50 | 6.4:1 | Mobile Leaderboard | {{U7_SURFACE}} | recompose | {{U7_TIER}} | {{U7_MINLABEL}} | {{U7_FORMAT}} |

<!-- HOW TO FILL: Delete any row whose size is not in this campaign's plan; add a
row only if the router requested a size beyond the standard seven. -->

**Uniform-scale rule:** the product layer's scale factor may differ *between*
sizes, but within any one size the bottle is scaled **uniformly** (same X and Y).
Any non-uniform scale = automatic fidelity fail (§J).

---

## Section C — Per-size crop / recompose blueprints (one card per row)

<!-- HOW TO FILL: Duplicate this card once per size in Section B. Give the exact
crop window (or recompose plan), the product layer's position + uniform scale,
where the background is extended from, and the reserved overlay zones IN PIXELS
for that canvas. All values reference the SAME master pixels — zero credits. -->

> **#1 · 1080 × 1080 (Feed square) — method: crop**
> - **Crop window on master:** {{U1_CROP_WINDOW}} <!-- x,y,w,h in master px --> 
> - **Product layer position + uniform scale:** {{U1_PRODUCT_XY_SCALE}}
> - **Background extension source:** {{U1_BG_EXTEND}} <!-- "none — crop only" or which bleed side is stretched -->
> - **Reserved overlay zones (px):** headline {{U1_ZONE_HEAD}} · offer {{U1_ZONE_OFFER}} · CTA {{U1_ZONE_CTA}} · brand/trust {{U1_ZONE_BRAND}}
> - **Focal anchor / eye path:** {{U1_FOCAL}}
> - **Legibility fallback if type collides with product:** {{U1_FALLBACK}}

> **#3 · 1080 × 1920 (Story / vertical) — method: recompose**
> - **Recompose plan:** {{U3_RECOMPOSE_PLAN}} <!-- extend BG upward, drop product to lower third, stack type above -->
> - **Product layer position + uniform scale:** {{U3_PRODUCT_XY_SCALE}}
> - **Background extension source:** {{U3_BG_EXTEND}}
> - **Story safe zones honored (§D):** {{U3_SAFEZONE_NOTE}}
> - **Reserved overlay zones (px):** headline {{U3_ZONE_HEAD}} · offer {{U3_ZONE_OFFER}} · CTA {{U3_ZONE_CTA}} · brand/trust {{U3_ZONE_BRAND}}

> **#5 · 728 × 90 (Leaderboard) — method: recompose**
> - **Recompose plan:** {{U5_RECOMPOSE_PLAN}} <!-- bottle anchored to one end, type flows across the strip -->
> - **Product layer position + uniform scale (label still legible):** {{U5_PRODUCT_XY_SCALE}}
> - **Type-led layout note:** {{U5_TYPE_LAYOUT}} <!-- in a thin strip, one line only + CTA chip -->
> - **Reserved overlay zones (px):** message {{U5_ZONE_MSG}} · CTA chip {{U5_ZONE_CTA}}

<!-- Repeat this card pattern for EVERY size in Section B (#2 4:5, #4 300×250,
#6 160×600, #7 320×50). Do not compress multiple sizes into one card. -->

---

## Section D — Safe zones per surface

<!-- HOW TO FILL: Pull the surface safe-zone intent from config/platforms.yaml +
Bible §5 (top ~14% / bottom ~20% for platform UI on 9:16). IAB units have no
platform chrome but need internal padding so type never kisses the edge. -->

| Surface family | Top inset | Bottom inset | Side inset | Reason |
|----------------|-----------|--------------|------------|--------|
| Story / 9:16 social | {{SZ_STORY_TOP}} | {{SZ_STORY_BOT}} | {{SZ_STORY_SIDE}} | platform UI (profile top, CTA/nav bottom) |
| Feed 1:1 / 4:5 | {{SZ_FEED_TOP}} | {{SZ_FEED_BOT}} | {{SZ_FEED_SIDE}} | caption/like-bar crop, thumb overlap |
| IAB display (300×250, 728×90, 160×600, 320×50) | {{SZ_IAB_TOP}} | {{SZ_IAB_BOT}} | {{SZ_IAB_SIDE}} | internal padding + 1px border for light-bg placements |

**Universal rule:** the **product label** and the **CTA** must both sit fully
inside the safe zone on every size — a cropped label reads as broken, a cropped
CTA loses the click.

---

## Section E — Text hierarchy system (added in post by 37-typography-compositor)

<!-- HOW TO FILL: Map the five overlay tiers to the LOCKED Arabic lines (Bible
§6.3). Not every size shows every tier — the matrix in Section B "Text tier"
column says which tiers appear where. El Messiri for display/headline, Tajawal
for body/legal. RTL. Price/SKU numerals handled LTR. -->

| Tier | Role | Arabic line (locked, §6.3) | Translit | English gloss | Typeface | Shows on |
|------|------|-----------------------------|----------|---------------|----------|----------|
| L1 | Hook / headline | {{L1_AR}} <!-- e.g. سرّ جداتنا: زيت المشاط الأحمر --> | {{L1_TR}} | {{L1_EN}} | El Messiri | {{L1_ON}} |
| L2 | Benefit | {{L2_AR}} <!-- e.g. كثافة وطول… وشعر يتكلّم عنكِ --> | {{L2_TR}} | {{L2_EN}} | El Messiri | {{L2_ON}} |
| L3 | Offer | {{L3_AR}} <!-- باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني --> | {{L3_TR}} | {{L3_EN}} | Tajawal | {{L3_ON}} |
| L4 | CTA (button label) | {{L4_AR}} <!-- اطلبي الآن — الدفع عند الاستلام --> | {{L4_TR}} | {{L4_EN}} | El Messiri | {{L4_ON}} |
| L5 | Brand / trust | {{L5_AR}} <!-- brand mark + 4.8/5 · فحص قبل الدفع --> | {{L5_TR}} | {{L5_EN}} | Tajawal | {{L5_ON}} |

**Per-size type sizing (handed to 37):** {{TYPE_SIZING_NOTE}} <!-- minimum legible
cap height per canvas; the 320×50 strip may carry ONLY L1-or-L3 + L4, never all
five. Contrast floor: WCAG-legible against the plate at the smallest size. -->

**Numeral policy:** price/SKU {{NUMERAL_POLICY}} <!-- e.g. Western Arabic numerals
"139" LTR inside the RTL line, currency ﷼ per platform block. -->

---

## Section F — CTA button spec

<!-- HOW TO FILL: One garnet CTA button spec reused at every size (scaled, not
restyled). Pull colours from the brand palette (§3): garnet #8E1B1E fill, cream
#FAF6F1 text. Must clear the contrast + min-height floor even on 320×50. -->

| Field | Value |
|-------|-------|
| Label (L4) | {{CTA_LABEL}} |
| Fill colour | {{CTA_FILL}} <!-- garnet #8E1B1E --> |
| Text colour | {{CTA_TEXT_COLOR}} <!-- cream #FAF6F1 --> |
| Corner radius | {{CTA_RADIUS}} |
| Min height (largest → smallest unit) | {{CTA_MINHEIGHT}} |
| Padding | {{CTA_PADDING}} |
| Contrast ratio vs plate | {{CTA_CONTRAST}} <!-- must pass legibility floor --> |
| Affordance | {{CTA_AFFORDANCE}} <!-- subtle depth/edge so it reads as tappable --> |

---

## Section G — Overlay-zone → typography handoff packet (to 37)

<!-- HOW TO FILL: For each size, restate the reserved overlay zones in pixels and
which text tiers land there, so 37 can typeset without touching the imagery.
This is the contract that keeps text OUT of the image model. -->

| Size | Zone (px) | Tier(s) placed | Alignment (RTL) | Notes |
|------|-----------|----------------|------------------|-------|
| 1080² | {{G1_ZONE}} | {{G1_TIERS}} | {{G1_ALIGN}} | {{G1_NOTES}} |
| 1080×1920 | {{G3_ZONE}} | {{G3_TIERS}} | {{G3_ALIGN}} | {{G3_NOTES}} |
| 300×250 | {{G4_ZONE}} | {{G4_TIERS}} | {{G4_ALIGN}} | {{G4_NOTES}} |
| 320×50 | {{G7_ZONE}} | {{G7_TIERS}} | {{G7_ALIGN}} | {{G7_NOTES}} |

<!-- Add rows for 1080×1350, 728×90, 160×600 to complete the packet. -->

---

## Section H — Export matrix (to 38-upscale-finisher)

<!-- HOW TO FILL: One row per delivered file. Filenames follow the studio asset
convention. Weight budgets come from knowledge/banner-systems.md (IAB initial-load
limits). Static banners here; if an animated variant is requested it must respect
the IAB animation cap (≤ 15 s, ≤ 3 loops, then rest on the CTA/offer frame). -->

| File | Size (px) | Format / quality | Weight budget | Upscale from master? | Animated? |
|------|-----------|------------------|---------------|----------------------|-----------|
| {{H1_FILE}} <!-- <slug>-banner-1x1.webp --> | 1080×1080 | {{H1_FMT}} | {{H1_WEIGHT}} | {{H1_UPSCALE}} | no |
| {{H2_FILE}} | 1080×1350 | {{H2_FMT}} | {{H2_WEIGHT}} | {{H2_UPSCALE}} | no |
| {{H3_FILE}} | 1080×1920 | {{H3_FMT}} | {{H3_WEIGHT}} | {{H3_UPSCALE}} | no |
| {{H4_FILE}} | 300×250 | {{H4_FMT}} | {{H4_WEIGHT}} | {{H4_UPSCALE}} | {{H4_ANIM}} |
| {{H5_FILE}} | 728×90 | {{H5_FMT}} | {{H5_WEIGHT}} | {{H5_UPSCALE}} | {{H5_ANIM}} |
| {{H6_FILE}} | 160×600 | {{H6_FMT}} | {{H6_WEIGHT}} | {{H6_UPSCALE}} | {{H6_ANIM}} |
| {{H7_FILE}} | 320×50 | {{H7_FMT}} | {{H7_WEIGHT}} | {{H7_UPSCALE}} | {{H7_ANIM}} |

**Upscale policy (§V2 policy 9):** upscale from the ONE master, never regenerate
for resolution. At most ONE final-tier upscale of the master feeds all sizes.

---

## Section I — Zero-regen credit ledger

<!-- HOW TO FILL: Prove the system spent ZERO generation credits beyond the one
already-paid master. Contrast against the naive "generate each size" cost so the
saving is visible on the campaign credit plan (25-kie-credit-plan). -->

| Line | Generation credits |
|------|--------------------|
| Master (already paid, counted upstream) | {{LEDGER_MASTER}} <!-- 0 here — belongs to the image-ad/hero budget --> |
| 7 banner sizes via crop/recompose | 0 |
| Typography (37, post) | 0 (compositor, not a model) |
| Final upscale of master (38) | {{LEDGER_UPSCALE}} <!-- one final-tier op, if any --> |
| **This banner system total** | **{{LEDGER_TOTAL}}** |
| Naive per-size regeneration would have cost | {{LEDGER_NAIVE}} <!-- 7 × final image gen — the number this system avoids --> |

---

## Section J — Fidelity & gate manifest (41 + 27, per size)

<!-- HOW TO FILL: Every size is re-gated. The product layer is checked against
references/ on the fidelity checklist (label, cap, seal, proportions, colour ΔE),
and each crop is checked for legibility + brand + conversion. Fidelity is a HARD
gate: no size ships if it fails. -->

| Size | 41 fidelity (label/cap/seal/proportions/ΔE) | 27 legibility+brand+conversion | Ship? |
|------|----------------------------------------------|----------------------------------|:-----:|
| 1080² | {{J1_FIDELITY}} | {{J1_QC}} | {{J1_SHIP}} |
| 1080×1350 | {{J2_FIDELITY}} | {{J2_QC}} | {{J2_SHIP}} |
| 1080×1920 | {{J3_FIDELITY}} | {{J3_QC}} | {{J3_SHIP}} |
| 300×250 | {{J4_FIDELITY}} | {{J4_QC}} | {{J4_SHIP}} |
| 728×90 | {{J5_FIDELITY}} | {{J5_QC}} | {{J5_SHIP}} |
| 160×600 | {{J6_FIDELITY}} | {{J6_QC}} | {{J6_SHIP}} |
| 320×50 | {{J7_FIDELITY}} | {{J7_QC}} | {{J7_SHIP}} |

**Ship threshold:** fidelity ≥ product-lock `fidelity_gate.ship_threshold` AND
quality ≥ 95 weighted with no axis < 90 (Bible §7). Any fail → recompose that one
size (re-anchor the crop, resize type) — **never regenerate the master.**

---

## Definition of done

- [ ] Every size traces to the SAME approved master (Section A) — zero new
      generations (Section I total is 0 + at most one upscale).
- [ ] The master arrived as a separable LAYER STACK; no flat baked frame.
- [ ] Every size uses only `crop` or `recompose`; the product layer is scaled
      **uniformly** on every size (no distortion).
- [ ] No Arabic is baked into the imagery — all text is a typography layer in the
      handoff packet to 37 (Section G).
- [ ] Offer strings (price 139/185 SAR, COD, free shipping, CTA) are verbatim
      from Bible §3 / §6.3 — not paraphrased.
- [ ] Product label AND CTA sit fully inside the safe zone on every size (§D).
- [ ] The 320×50 strip carries at most two text tiers + CTA, still legible.
- [ ] Every size passes 41 (fidelity) AND 27 (legibility/brand/conversion) in §J.
- [ ] Export matrix (§H) names every file, format, and weight budget; weights are
      within the IAB / platform initial-load limits.
- [ ] All `{{FIELD}}` placeholders replaced; all `<!-- HOW TO FILL -->` comments
      deleted.

## Handoff

| Consumer | Reads |
|----------|-------|
| 37-typography-compositor | Section E (locked lines + tiers) + Section G (per-size overlay zones in px) — typesets Arabic in post |
| 38-upscale-finisher | Section H (export matrix, formats, weights) + Section I upscale line — one final upscale of the master, all sizes derived |
| 41-product-fidelity-checker | Section A product layer + Section J fidelity column — re-gates the bottle on every crop |
| 27-quality-checker | Section D safe zones + Section J QC column — re-gates legibility, brand, conversion per size |
| 29-cost-optimizer / 25-kie-credit-plan | Section I zero-regen ledger — folds the saving into the campaign credit budget |
