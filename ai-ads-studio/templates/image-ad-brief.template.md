---
template: "image-ad-brief"
type: "template"                        # this file is a fill-in skeleton, not a skill or a filled artifact
fills_stage: "0→image-ad sub-pipeline"  # branches from Stage-0 Creative-Matrix Planning (STUDIO-BIBLE-V2 §6) into the static-image-ad line
instantiates: "examples/<product-slug>/20-image-ad-set.md  (one block per concept)"
filled_by_skills: ["30-creative-matrix-planner", "31-format-router", "32-image-ad-director"]
consumes: ["examples/<product-slug>/00-creative-brief.md", "products/<product-slug>/product-lock.yaml",
           "products/<product-slug>/reference-manifest.yaml", "products/<product-slug>/fidelity-checklist.md",
           "config/kie-models.yaml", "config/creative-matrix.yaml", "knowledge/gulf-beauty-brand-norms.md",
           "knowledge/static-ad-craft.md", "STUDIO-BIBLE.md §2 §3 §5", "STUDIO-BIBLE-V2.md §1 §5 §7bis"]
consumed_by_skills: ["24-negative-prompt-builder", "26-kie-prompt-builder", "37-typography-compositor",
                     "38-upscale-finisher", "41-product-fidelity-checker", "27-quality-checker",
                     "28-creative-scoring-engine", "29-cost-optimizer"]
based_on: "STUDIO-BIBLE.md §2 (authoring conventions), §3 (product truth), §4→products/mechat-red-oil/product-lock.yaml (identity), §5 (market/platform); STUDIO-BIBLE-V2.md §1 (creative matrix: image-ad row), §5 (10 credit policies), §7bis (reference-lock v2, routes R1/R2/R3, fidelity gate). Worked model = the flagship زيت المشاط الأحمر / Red Mechat Oil static-ad set."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment, and delete this status line before the brief ships to the prompt-builder."
---

# Image-Ad Brief — {{CONCEPT_NAME}}  ·  {{PRODUCT_NAME_EN}}

## How to use this template

This is the **single production unit** for one static image ad. One filled copy
= one master image the studio will generate, QC, and export. If the plan calls
for five static concepts, you fill five copies of this brief (usually collected
in `examples/<slug>/20-image-ad-set.md`). Nothing downstream — negative-prompt
builder, Kie prompt-builder, typography-compositor, fidelity-checker — may
invent a fact this brief does not carry, and this brief may never contradict the
Stage-1 creative-brief or the product-lock.

**Two rails you can never cross (STUDIO-BIBLE-V2 §5, §7bis):**
1. **The product is reference-conditioned, always.** The bottle region comes
   from a real photo in `products/<slug>/references/` via route **R1** or **R2**
   — never text-to-image, never "describe the bottle and hope." If Section 4
   names a text-only (t2i) model for a product-bearing ad, the brief is invalid.
2. **Arabic text is added in POST, never in-model.** Headline, CTA, price, and
   any label copy are typeset by `37-typography-compositor` (El Messiri display
   / Tajawal body, RTL). The image model generates *clean negative space* where
   that text will land (Section 6), and generates **no legible glyphs** at all.

**Fill order:** Sections 1→9 top to bottom. Section 9 (the fidelity + QC gate)
is filled/checked **last**, against everything above it. Delete every guidance
comment and every unused table row as you go — a row you don't need is deleted,
not filled with "N/A."

**The mechat flagship as the model.** The worked reference is the Red Mechat Oil
static set: a **cylindrical, tall/slim clear PET bottle**, white vertically
ribbed cap, warm **brown-amber-red** oil (never bright ruby), white wrap label
whose hero word is «المشاط» — reproduced *photographically from the reference*,
never redrawn. Study that discipline; do not copy its content into another
product.

---

## 1. Concept & angle

<!-- HOW TO FILL: One concept per brief. Pull the angle from the Stage-1 brief's
emotional spine (Pain → Heritage/Trust → Ritual → Transformation → Pride →
Action) and the audience/psychology work. A static ad wins on ONE idea read in
under a second — name it in a sentence, then the single feeling it must fire. -->

| Field | Value |
|-------|-------|
| **Concept name** | {{CONCEPT_NAME}} |
| **Internal codename** | {{CODENAME}} |
| **Family / type** | image-ad (static, paid social) — STUDIO-BIBLE-V2 §1 |
| **Funnel objective** | {{OBJECTIVE}} <!-- awareness / consideration / retargeting / conversion --> |
| **Placements this master serves** | {{PLACEMENTS}} <!-- e.g. Meta feed 4:5, Reels/Stories 9:16, Snap 9:16 — one master → many exports (§5.4) --> |
| **Primary emotion** | {{PRIMARY_EMOTION}} <!-- hope + restored femininity / heritage trust / self-care ritual --> |
| **Angle in one line** | {{ANGLE_ONE_LINE}} |

**Scroll-stop promise (the 1-second read):**
> {{SCROLL_STOP_PROMISE}}
<!-- HOW TO FILL: What the thumb registers before reading a word. For the mechat
"discovery" concept it is: a jewel-lit real bottle in a warm Moorish arch, one
hibiscus, one honest ribbon of oil — luxury + heritage in a glance. Sensory and
concrete, never a slogan. -->

**Ad message hierarchy (what the eye reads, in order):**
1. {{READ_1}} <!-- the hero: product or the hair result -->
2. {{READ_2}} <!-- the benefit/headline zone -->
3. {{READ_3}} <!-- the offer/CTA + trust (COD) -->

---

## 2. Route & reference lock  (STUDIO-BIBLE-V2 §7bis — the #1 constraint)

<!-- HOW TO FILL: Pick R1 or R2 for the product region (R3 is video-only — not
valid here). R1 is the DEFAULT and the cheapest: keep the real packshot pixel-
intact, AI generates only the world around it. R2 when the product must be re-
posed/re-lit inside a generated scene. NEVER text-to-image the product. Name the
exact reference file from reference-manifest.yaml and the exact model from
kie-models.yaml whose reference_modes support your route. -->

| Field | Value |
|-------|-------|
| **Product route** | {{ROUTE}} <!-- R1 = product-real / world-ai (default) · R2 = reference-conditioned edit --> |
| **Why this route** | {{ROUTE_RATIONALE}} <!-- R1 if the packshot pose works as-is; R2 if hand-hold / new angle / relight needed --> |
| **Canonical product reference** | {{REFERENCE_FILE}} <!-- e.g. products/mechat-red-oil/references/01-front-white.png --> |
| **Reference-manifest entry** | {{MANIFEST_KEY}} <!-- the reference-manifest.yaml key that maps this asset → this ref/angle/route --> |
| **Label handling** | {{LABEL_HANDLING}} <!-- preserve label region via edit/inpaint, OR composite the flat label asset in post. Label glyphs are reproduced photographically — NEVER re-typeset. --> |
| **Seed / identity lock** | {{SEED}} <!-- fixed seed reused across the whole set for one consistent bottle (§5.6) --> |
| **Forbidden references** | {{FORBIDDEN_REFS}} <!-- drifted /assets renders listed under reference-manifest `forbidden` — never feed these --> |

**Reference-conditioning statement (must be literally true of the emitted prompt):**
> The product pixels originate from `{{REFERENCE_FILE}}`. The model {{ROUTE_VERB}}
> ( R1 → *replaces the background / relights around* · R2 → *edits the scene while
> preserving* ) the product region. No part of the bottle, cap, liquid colour,
> label artwork, or the gold «طبيعي» seal is generated from a text description.

---

## 3. Layout archetype  (STUDIO-BIBLE-V2 §2 / skill 32)

<!-- HOW TO FILL: Choose ONE of the three archetypes skill 32 defines. Each has
a different focal hierarchy and a different overlay-zone map (Section 6). Fill
only the block for the archetype you picked; delete the other two. -->

**Archetype chosen:** {{ARCHETYPE}}
<!-- product-hero  |  benefit-demonstration  |  social-proof -->

### 3a. If `product-hero`
| Field | Value |
|-------|-------|
| Hero subject | the real bottle, jewel-lit, dominant |
| Environment | {{ENVIRONMENT}} <!-- e.g. warm cream Moorish/mihrab arch, garnet drape, one red hibiscus, palm frond, stone podium (mechat hero-set DNA) --> |
| Camera feel | {{CAMERA}} <!-- macro / three-quarter packshot, shallow DOF, real bokeh --> |
| Negative-space side | {{NEG_SPACE_SIDE}} <!-- which third stays clean for the Arabic headline --> |

### 3b. If `benefit-demonstration`
| Field | Value |
|-------|-------|
| Demonstration | {{DEMO}} <!-- oil ribbon / macro on healthy hair / fingertips at the root — proves ONE claim from the brief, never exceeds its ceiling --> |
| Product presence | {{PRODUCT_PRESENCE}} <!-- bottle in-frame (reference-locked) or implied by its oil --> |
| Model policy | {{MODEL_POLICY}} <!-- if a person appears: refined warm-toned skin, modest, calm; hijab/styled A-B pair per §5 --> |

### 3c. If `social-proof`
| Field | Value |
|-------|-------|
| Proof device | {{PROOF_DEVICE}} <!-- 4.8/5 rating, verified-purchase quote, "grandmothers' recipe" trust frame — all as POST overlays, not in-model glyphs --> |
| Visual bed | {{VISUAL_BED}} <!-- product + warm heritage set as the calm backdrop for the proof card --> |
| Trust cues | {{TRUST_CUES}} <!-- COD / inspect-before-pay / free shipping — text lives in post overlay zones --> |

---

## 4. Model + credit route  (config/kie-models.yaml — the credit engine, §5)

<!-- HOW TO FILL: The format-router (skill 31) fills this. Image-first + draft→
final gating (§5.2, §5.5): iterate on a cheap DRAFT-tier reference-capable model
until QC ≥ 95, then ONE final-tier render or ONE upscale (§5.9). The chosen
model's reference_modes MUST include your route's mode (R1→bg-replace, R2→
i2i/edit/inpaint). A t2i-only model for the product is FORBIDDEN. -->

| Stage | Model (kie-models.yaml id) | cost_tier | reference_mode used | Purpose |
|-------|---------------------------|-----------|---------------------|---------|
| Draft / iterate | {{DRAFT_MODEL}} | draft | {{DRAFT_MODE}} <!-- bg-replace / i2i / edit / inpaint --> | cheap keyframe lock, QC to ≥95 |
| Final render | {{FINAL_MODEL}} | final | {{FINAL_MODE}} | one final-tier render of the approved draft |
| Upscale (if used) | {{UPSCALE_MODEL}} | draft | upscale | resolution only — never regenerate (§5.9) |

| Field | Value |
|-------|-------|
| **Cheaper fallback route** | {{FALLBACK_ROUTE}} <!-- every asset carries one cheaper fallback model/route (§5.10) --> |
| **Est. credits — this master** | {{CREDIT_EST}} <!-- relative estimate; verify current pricing at kie.ai before spend --> |
| **Exports from this one master** | {{EXPORT_MATRIX}} <!-- ratios/sizes are crop/recompose of the master, NOT new gens (§5.4): e.g. 1:1, 4:5, 9:16 webp --> |
| **Spend gate** | No final-tier credit is spent until Section 9 fidelity + QC gates are GREEN (§5.5, §5.10). |

---

## 5. Prompt skeleton (reference-conditioned form)

<!-- HOW TO FILL: This is NOT the final prompt — 26-kie-prompt-builder compiles
it. You provide the reference-conditioned skeleton: base image + edit/scene
instruction, split into product (locked) vs world (generated). Describe ONLY the
world in words. Describe the product with a pointer to the reference, never with
adjectives a model would redraw. Include realism cues (real lens, DOF, grain,
contact shadows) per the undetectable-realism doctrine. NO Arabic text in-model. -->

**Base image (locked):** `{{REFERENCE_FILE}}` — product region preserved.

**World / scene instruction (generated around the product):**
> {{SCENE_INSTRUCTION}}
<!-- Environment, light direction & quality, palette (warm cream / garnet / gold
per the brand palette), props, mood. For the mechat set: soft directional window
light, long gentle shadows, Moorish arch, hibiscus, stone podium. -->

**Realism cues (filmed-not-AI — STUDIO-BIBLE-V2 §7ter.B):**
- {{REALISM_CUES}} <!-- shallow DOF + real bokeh, correct contact shadow & reflection under the bottle, subtle sensor grain, filmic highlight roll-off on the glass, no clinical over-clean plastic look -->

**Explicitly generate as EMPTY / clean (for post text):**
- {{CLEAN_ZONES}} <!-- the negative-space region(s) named in Section 6 stay smooth & uncluttered so overlaid Arabic reads with contrast -->

---

## 6. Overlay-zone map  (hand-off to 37-typography-compositor)

<!-- HOW TO FILL: The image model leaves these zones CLEAN; the typography-
compositor lays correct RTL Arabic into them in post. Give each zone a position
(as fractions of the master frame), what text it will hold, font, and the
contrast plan. Respect platform safe zones (STUDIO-BIBLE §5): top ~14% / bottom
~20% kept clear of UI for 9:16; center-safe for Meta. Price/number is LTR inside
RTL. No text is baked into the image — this map is the contract for post. -->

| Zone | Position (x,y,w,h as 0–1) | Holds | Font | Contrast / legibility plan |
|------|--------------------------|-------|------|-----------------------------|
| **Headline** | {{HL_BOX}} | {{HL_TEXT_AR}} <!-- El Messiri, RTL --> | El Messiri (display) | {{HL_CONTRAST}} <!-- dark garnet on cream neg-space / soft scrim --> |
| **Sub / benefit** | {{SUB_BOX}} | {{SUB_TEXT_AR}} | Tajawal (body) | {{SUB_CONTRAST}} |
| **Offer / price** | {{PRICE_BOX}} | {{PRICE_TEXT}} <!-- e.g. ١٣٩ ر.س was ١٨٥ — LTR numerals inside RTL --> | Tajawal | {{PRICE_CONTRAST}} |
| **CTA** | {{CTA_BOX}} | {{CTA_TEXT_AR}} <!-- «اطلبي الآن — الدفع عند الاستلام» --> | El Messiri / Tajawal | {{CTA_CONTRAST}} <!-- garnet #8E1B1E button, cream text --> |
| **Trust strip** | {{TRUST_BOX}} | {{TRUST_TEXT}} <!-- free shipping · COD · 4.8/5 --> | Tajawal | {{TRUST_CONTRAST}} |
| **Logo / seal** | {{LOGO_BOX}} | {{LOGO_ASSET}} <!-- brand mark asset, post-composited --> | — | — |

**Safe-zone confirmation:** {{SAFE_ZONE_NOTE}}
<!-- Confirm the headline & CTA sit inside the platform-safe center; nothing
critical in the top ~14% / bottom ~20% UI band for 9:16 exports. -->

---

## 7. Negatives  (hand-off to 24-negative-prompt-builder)

<!-- HOW TO FILL: Seed the negative-prompt builder with this concept's specific
risks on top of the studio-standard negative bank. Split into three buckets:
product-fidelity tells, AI/realism tells, and culture/brand tells. Be concrete
about THIS product's known drift modes (from product-lock do_not_alter). -->

**Product-fidelity negatives (from product-lock `do_not_alter`):**
- {{PROD_NEG}} <!-- mechat e.g.: square/rounded-rectangular bottle, gold or black cap, bright ruby/cranberry liquid, ribbed/faceted body, invented «الأحمر» on the label, moved/duplicated seal, English brand text, extra label text -->

**AI / realism negatives (undetectable-realism doctrine):**
- {{AI_NEG}} <!-- waxy plastic skin, over-symmetry, dead glassy eyes, extra/melting fingers, helmet hair / no flyaways, floaty weightless props, mismatched shadow/reflection, warped straight lines, over-clean set, gibberish text, no grain, no DOF -->

**Culture / brand negatives (gulf-beauty-brand-norms.md):**
- {{CULTURE_NEG}} <!-- immodesty, provocative posing, alcohol cues, religious imagery as décor, fear-mongering about the body, fake-medical framing, garish non-brand colours, machine-translation Arabic -->

---

## 8. Cultural & brand check  (gulf-beauty-brand-norms.md + 22-brand-guardian)

<!-- HOW TO FILL: A fast pre-flight against the market norms. Anti-stereotype:
elegant, modest, aspirational, restrained — never a caricature. Palette and
fonts stay inside the brand DNA. If a person appears, provide the modest A/B. -->

| Check | Pass? | Note |
|-------|-------|------|
| Modest, tasteful, non-provocative | {{CHK_MODEST}} | {{NOTE_MODEST}} |
| Warm-toned, refined, natural model (if any) + hijab/styled A-B | {{CHK_MODEL}} | {{NOTE_MODEL}} |
| Palette inside brand DNA (cream / garnet / gold / brown ink) | {{CHK_PALETTE}} | {{NOTE_PALETTE}} |
| No stereotype / caricature (anti-stereotype norms) | {{CHK_STEREOTYPE}} | {{NOTE_STEREOTYPE}} |
| Claims within Section-2 ceilings (no over-promise) | {{CHK_CLAIMS}} | {{NOTE_CLAIMS}} |
| Arabic elegant MSA, correct, premium (post overlays) | {{CHK_ARABIC}} | {{NOTE_ARABIC}} |

---

## 9. Fidelity + QC gate  (fill LAST — hard gate before any final spend)

<!-- HOW TO FILL: This is the automatic gate (skills 41 + 27 + 28). It runs on
the generated master against products/<slug>/fidelity-checklist.md and the QC
rubric. NOTHING ships and no final-tier credit is spent unless every hard axis
is GREEN. The user never verifies fidelity by hand — record the gate result
here. Re-generate on a fail; never patch a fidelity fail by hand. -->

**Fidelity axes (product-fidelity-checker, skill 41 — HARD, no ship on fail):**
| Axis | Threshold | Result |
|------|-----------|--------|
| Vessel shape & proportions match reference | exact | {{FID_SHAPE}} |
| Cap type/colour (white, vertically ribbed) | exact | {{FID_CAP}} |
| Liquid colour (brown-amber-red, translucent) | ΔE ≤ 3 vs sampled | {{FID_LIQUID}} |
| Label artwork, lockup «المشاط», benefits, 250 ml | exact, no invented glyphs | {{FID_LABEL}} |
| Gold «طبيعي / 100% natural» seal present & placed | exact | {{FID_SEAL}} |
| No «الأحمر» painted on the physical label | absent | {{FID_NO_AHMAR}} |

**Realism / undetectability axis (skill 46 → 27):**
| Axis | Threshold | Result |
|------|-----------|--------|
| "Obviously AI" tell scan | zero hard tells | {{QC_AI_TELL}} |
| Contact shadow & reflection physically correct | pass | {{QC_SHADOW}} |
| Real optics (DOF, grain, roll-off), not clinical | pass | {{QC_OPTICS}} |

**Conversion / craft axis (creative-scoring-engine, skill 28):**
| Axis | Threshold | Result |
|------|-----------|--------|
| Scroll-stop strength | ≥ 8/10 | {{QC_SCROLLSTOP}} |
| Overlay legibility sound-off / in-feed | pass | {{QC_LEGIBILITY}} |
| Overall QC score | **≥ 95** | {{QC_SCORE}} |

**GATE DECISION:** {{GATE_DECISION}}
<!-- GREEN = all hard axes pass, QC ≥ 95 → release the master to 38-upscale-
finisher for final render + exports. RED = one hard axis failed → back to the
draft-tier model, do NOT spend final-tier credit. -->

---

## Handoff

On a GREEN gate, this brief hands off:
- **→ 26-kie-prompt-builder** — compile the Section-5 reference-conditioned
  skeleton into the final Kie prompt for `{{FINAL_MODEL}}`.
- **→ 24-negative-prompt-builder** — merge the Section-7 negatives with the bank.
- **→ 37-typography-compositor** — lay the Section-6 overlay zones (Arabic RTL,
  El Messiri / Tajawal) in post; no text was ever generated in-model.
- **→ 38-upscale-finisher** — one final render + the Section-4 export matrix
  (one master → many exports; ratios are crops, not new generations).
- **→ 41 / 27 / 28** — re-run the Section-9 gate on every render, automatically.

> Delete this line and the `status:` frontmatter line once the brief is filled.
