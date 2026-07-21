---
template: "landing-asset-map"
type: "template"
fills_stage: "0→back-half (Creative Matrix production line — the landing-page media sub-pipeline)"
instantiates: "examples/<product-slug>/23-landing-asset-map.md"
filled_by_skills: ["35-landing-visual-director"]
downstream_skills: ["32-image-ad-director (shared master build)", "34-3d-render-director (packshot/turntable)",
                    "36-microvideo-director (LP loops)", "37-typography-compositor (any baked caption is FORBIDDEN — see §7)",
                    "38-upscale-finisher (per-slot export matrix + weight budget)",
                    "41-product-fidelity-checker (every product-bearing slot re-gated)", "27-quality-checker (LCP/CLS/legibility re-gate)"]
consumes: ["index.html (the LIVE landing page — audited slot-by-slot; NEVER guessed. Every row below is a real element that exists in the DOM today)",
           "31-format-router LP routing entries (per slot: family lp, route R1/R2/R3, model, tier draft→final, batch group, seed/reference lock, text_in_post:true, gates [41,27])",
           "products/<slug>/product-lock.yaml (vessel proportions, cap, liquid colour hex, label element hierarchy, do_not_alter list, fidelity_gate.ship_threshold, color_tolerance_deltaE — loaded GENERICALLY, never hardcoded)",
           "products/<slug>/reference-manifest.yaml (which real reference feeds which slot / angle / route; the canonical_reference cutout)",
           "config/kie-models.yaml (image + short-loop-video model catalog, reference_modes, relative credit tiers)",
           "config/platforms.yaml + config/studio.config.yaml (LCP/weight budgets, webp quality, mp4 crf, mobile fallback policy)",
           "knowledge/landing-page-media.md (hero/section craft, perf budget, LCP/CLS discipline, muted-autoplay-loop microvideo best practice, poster + mp4/webm fallback)",
           "knowledge/gulf-beauty-brand-norms.md (warm amber/copper palette, hands+hair+back-of-head framing default, anti-orientalist rules, modest styling)",
           "STUDIO-BIBLE.md §3 (offer, price 139/185 SAR, COD, brand palette #8E1B1E garnet / #C9A227 gold / #FAF6F1 cream, El Messiri + Tajawal, RTL), §4→product-lock, §5 (safe zones, sound-off), §7 (≥95 ship gate), §7bis (product ALWAYS reference-conditioned; label/text in post; 3D needs multiple angles), §8 (one-master→many-exports)"]
consumed_by_skills: ["37-typography-compositor (only for standalone overlay assets, NOT for baking text into LP media — LP copy is live HTML)",
                     "38-upscale-finisher (final webp/mp4 encode + weight check per slot)",
                     "41-product-fidelity-checker (every product-bearing slot regated against references/)",
                     "27-quality-checker (per-slot LCP/CLS/legibility/brand re-gate before integration)"]
based_on: "skills/35-landing-visual-director/SKILL.md (the LP-media enumerator + integration-wiring author) + knowledge/landing-page-media.md. Worked model = the live index.html for زيت المشاط الأحمر للشعر, loaded GENERICALLY from products/mechat-red-oil/product-lock.yaml + reference-manifest.yaml."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment. One row per REAL slot in the audited index.html — never invent a slot that is not in the DOM, never drop a slot that is."
---

# Landing Asset Map — {{PRODUCT_MARKETING_NAME_AR}} ({{PRODUCT_SLUG}})

> One table that binds **every media slot in the live `index.html`** to a **spec**
> (filename · dimensions · format · weight budget), a **reference-conditioned
> prompt** (or `keep-existing`), and the **exact integration wiring** (the
> `<img>` / `<video>` markup and any CSS/attribute changes) needed to swap the
> asset in without touching layout, RTL, palette, or Core Web Vitals.

## How to use this template

This is the **hand-off contract** between the studio and the landing page. The
`35-landing-visual-director` skill audits the *actual DOM* of `index.html`,
enumerates every `<img>`, `<video>`, `<source>` and CSS-background media node,
and fills one row per real slot below. The map is authoritative in three ways:

1. **No orphan generations.** Every asset the studio renders for the LP must
   trace to a row here — a slot with a real filename and real integration point.
   If there is no slot, there is no render (V2 §5.1: reason/plan before spend).
2. **No silent layout breakage.** Each row carries the *current* intrinsic
   `width`/`height`, `loading`, and container so the replacement is a drop-in.
   Changing an image's aspect ratio without updating `width`/`height` causes a
   **CLS regression** — the map forces you to declare the new ratio and the CSS
   consequence before integration.
3. **One master → many exports (Bible §8).** Slots that show the *same* hero
   product still share ONE generated master; each LP slot is a **crop/recompose
   export**, not an independent generation. The `Reuses master` column makes the
   sharing explicit so the credit engine bills the master once.

Three hard inheritances you may **not** override in an LP asset:

- **Product is reference-conditioned, always (§7bis).** Any slot whose subject is
  the bottle uses route **R1** (real cutout + AI world), **R2** (reference edit),
  or **R3** (image→video from an approved keyframe). Never text-to-image the
  vessel. The product region is the real cutout from `products/<slug>/references/`.
- **LP copy is LIVE HTML, not baked pixels (§7bis, V2 §5.3).** Headlines, offer,
  price, CTA, Arabic body — all live in `index.html` as selectable, RTL,
  El-Messiri/Tajawal text. **Never** bake Arabic (or any) text into an LP image or
  video. This guarantees correct فصحى, keeps the page translatable/SEO-legible,
  and kills the #1 cause of image regenerations. `37-typography-compositor` is
  used here ONLY for standalone overlay assets (e.g. an offer badge PNG), never to
  letter an LP background.
- **Performance budget is a ship gate (§7).** Every slot has a weight budget; the
  hero image is the **LCP element** and must stay within its budget at the encode
  step (`38-upscale-finisher`). Blow the budget → the slot fails QC and does not
  integrate.

**Placeholder convention:** `{{FIELD}}` = a blank you fill.
`<!-- HOW TO FILL: … -->` explains what belongs there — delete each comment once
filled.

---

## Section A — Audit summary (the LP as it exists today)

<!-- HOW TO FILL: Summarise the audit of the LIVE index.html. Counts must match
Section C exactly. "Palette / fonts / dir" are read from the page's own tokens —
you REPRODUCE them, you do not restyle the page. -->

| Field | Value |
|-------|-------|
| Landing file audited | {{LP_FILE}} <!-- e.g. index.html (repo root) --> |
| Audit date / commit | {{AUDIT_REF}} |
| Total media slots found | {{SLOT_COUNT}} <!-- images + videos + CSS-bg; must equal Section C row count --> |
| — of which product-bearing (need R1/R2/R3 + fidelity gate 41) | {{PRODUCT_SLOT_COUNT}} |
| — of which video / microvideo loops | {{VIDEO_SLOT_COUNT}} |
| Distinct masters required (after §8 sharing) | {{MASTER_COUNT}} <!-- far fewer than slot count — that is the point --> |
| Page direction / palette / fonts (reproduce, do NOT restyle) | {{PAGE_STYLE}} <!-- e.g. dir=rtl · garnet #8E1B1E / gold #C9A227 / cream #FAF6F1 · El Messiri + Tajawal --> |
| Asset directory (all filenames resolve here) | {{ASSET_DIR}} <!-- e.g. assets/ --> |
| Perf targets (from knowledge/landing-page-media.md) | {{PERF_TARGETS}} <!-- e.g. LCP < 2.5s mobile 4G · CLS < 0.1 · hero webp ≤ 120KB · section webp ≤ 90KB · loop mp4 ≤ 1.2MB --> |

---

## Section B — Master registry (what actually gets generated)

<!-- HOW TO FILL: List the SMALL set of masters that back MANY slots. Bible §8:
the hero packshot master, the ingredient/section look master, the before→after
pair, and any loop keyframe. Each LP slot in Section C then points back here via
"Reuses master". If two slots list different masters but show the same product
look, you have over-generated — consolidate. -->

| Master id | What it is | Route | Model (from kie-models.yaml) | Tier | Seed / reference lock | Feeds slots (§C #) |
|-----------|-----------|-------|------------------------------|------|-----------------------|--------------------|
| {{M1_ID}} | {{M1_DESC}} <!-- e.g. hero packshot, real bottle + AI amber-lit world --> | {{M1_ROUTE}} | {{M1_MODEL}} | {{M1_TIER}} | {{M1_SEEDLOCK}} | {{M1_SLOTS}} |
| {{M2_ID}} | {{M2_DESC}} <!-- e.g. ingredient macro / natural-herbs look master --> | {{M2_ROUTE}} | {{M2_MODEL}} | {{M2_TIER}} | {{M2_SEEDLOCK}} | {{M2_SLOTS}} |
| {{M3_ID}} | {{M3_DESC}} <!-- e.g. before→after hair pair (same model/lighting) --> | {{M3_ROUTE}} | {{M3_MODEL}} | {{M3_TIER}} | {{M3_SEEDLOCK}} | {{M3_SLOTS}} |
| {{M4_ID}} | {{M4_DESC}} <!-- e.g. oil-pour / shine loop keyframe (R3 source) --> | {{M4_ROUTE}} | {{M4_MODEL}} | {{M4_TIER}} | {{M4_SEEDLOCK}} | {{M4_SLOTS}} |

---

## Section C — Slot map (one row per REAL element in index.html)

<!-- HOW TO FILL: One row per media node found in the live DOM. The seed rows
below are the ACTUAL slots in the current mechat index.html (line numbers noted
for the auditor). For a different product, re-audit and replace the rows — but the
COLUMN contract never changes. "Decision" is keep-existing | regen | new.
Dimensions are the element's CURRENT intrinsic width×height — a replacement MUST
match (or the CSS/width/height attrs MUST be updated in the wiring, §D). -->

| # | Section (DOM) | Node | Current filename | Dims (w×h) | Fmt | Product-bearing? | Route | Reuses master | Decision | New filename |
|---|---------------|------|------------------|-----------|-----|------------------|-------|---------------|----------|--------------|
| 1 | hero / hero-media (bg video) | `<video><source>` + `poster` | hero-video.mp4 (poster oil-macro.webp) | full-bleed / 1080×1920 target | mp4 loop | {{S1_PROD}} | {{S1_ROUTE}} | {{S1_MASTER}} | {{S1_DECISION}} | {{S1_NEWFILE}} |
| 2 | hero / hero-copy | `<img class="hero-shot">` (LCP) | hero-product-fixed.webp | 896×1152 | webp | yes | {{S2_ROUTE}} | {{S2_MASTER}} | {{S2_DECISION}} | {{S2_NEWFILE}} |
| 3 | benefits / b-media | `<img>` | oil-macro.webp | 1200×685 | webp | {{S3_PROD}} | {{S3_ROUTE}} | {{S3_MASTER}} | {{S3_DECISION}} | {{S3_NEWFILE}} |
| 4 | benefits / b-media | `<img>` | ingredients.webp | 900×900 | webp | {{S4_PROD}} | {{S4_ROUTE}} | {{S4_MASTER}} | {{S4_DECISION}} | {{S4_NEWFILE}} |
| 5 | benefits / b-media | `<img>` | hair-result.webp | 800×1096 | webp | {{S5_PROD}} | {{S5_ROUTE}} | {{S5_MASTER}} | {{S5_DECISION}} | {{S5_NEWFILE}} |
| 6 | benefits / b-media | `<img>` | hand-bottle-fixed.webp | 800×1028 | webp | yes | {{S6_ROUTE}} | {{S6_MASTER}} | {{S6_DECISION}} | {{S6_NEWFILE}} |
| 7 | vbanner (bg video) | `<video><source>` + `poster` | hair-video.mp4 (poster hair-result.webp) | full-bleed loop | mp4 loop | {{S7_PROD}} | {{S7_ROUTE}} | {{S7_MASTER}} | {{S7_DECISION}} | {{S7_NEWFILE}} |
| 8 | ingredients / rv | `<img class="rv">` | ingredients.webp | 900×900 | webp | {{S8_PROD}} | {{S8_ROUTE}} | {{S8_MASTER}} | {{S8_DECISION}} | {{S8_NEWFILE}} |
| 9 | offer / offer-media | `<img>` | trio-bottles-fixed.webp | 900×1157 | webp | yes | {{S9_ROUTE}} | {{S9_MASTER}} | {{S9_DECISION}} | {{S9_NEWFILE}} |
| 10 | final (decorative) | `<img aria-hidden>` | hair-result.webp | intrinsic / decorative | webp | {{S10_PROD}} | {{S10_ROUTE}} | {{S10_MASTER}} | {{S10_DECISION}} | {{S10_NEWFILE}} |

<!-- HOW TO FILL: If the audit finds a slot not listed above (a new section, a
CSS background-image, an added review photo), ADD a row — do not silently skip.
If a listed slot no longer exists in the DOM, DELETE its row. The map must be a
1:1 mirror of the live page. -->

**Decorative-image rule:** a slot marked `aria-hidden` / empty `alt` (e.g. #10)
is decorative — it may reuse an existing master at low priority and must never
carry meaning that a screen-reader user would miss. Do not upgrade it to a
product-hero render; keep it cheap.

---

## Section D — Per-slot spec + prompt + integration wiring (one card per row)

<!-- HOW TO FILL: Duplicate this card once per Section C row. This is the buildable
unit: the target spec, the reference-conditioned prompt (or keep-existing), and the
EXACT markup that lands in index.html. Prompts are ALWAYS base-image + edit / keyframe
+ motion — never a standalone text description of the bottle (§7bis). -->

> ### Slot #{{N}} — {{SLOT_LABEL}}  ·  {{DOM_SECTION}}
>
> **Purpose on page:** {{SLOT_PURPOSE}} <!-- what this media has to communicate in context -->
> **Decision:** {{SLOT_DECISION}} <!-- keep-existing | regenerate | new -->
>
> **Target spec**
> | Field | Value |
> |-------|-------|
> | Output filename | {{SLOT_OUTFILE}} <!-- resolves under ASSET_DIR; version-bump, don't overwrite a live file mid-review --> |
> | Dimensions (w×h) | {{SLOT_DIMS}} <!-- MUST match current intrinsic or trigger a wiring change in this card --> |
> | Format + encode | {{SLOT_ENCODE}} <!-- webp q78 / mp4 h264 crf23 + webm vp9 / png-alpha --> |
> | Weight budget | {{SLOT_WEIGHT}} <!-- hard cap from §A perf targets; LCP hero is tightest --> |
> | Loading strategy | {{SLOT_LOADING}} <!-- hero: eager + fetchpriority=high · below-fold: loading=lazy · video: preload=metadata|none --> |
> | Color space / palette | {{SLOT_PALETTE}} <!-- sRGB; reproduce page palette; oil colour per product-lock liquid hex --> |
>
> **Reference-conditioned prompt** (route {{SLOT_ROUTE}})
> - **Base / reference image:** {{SLOT_BASE_REF}} <!-- the real cutout or approved keyframe from reference-manifest.yaml; for keep-existing write "n/a" -->
> - **Edit / scene instruction (R1/R2) or motion (R3):** {{SLOT_PROMPT}} <!-- e.g. "Preserve the bottle pixels exactly; replace background with a warm cream-and-amber marble surface, soft window key light from upper-left, natural contact shadow + faint reflection; shallow DoF." NO Arabic, NO baked text, NO redrawing the label. -->
> - **Do-not-alter (from product-lock do_not_alter):** {{SLOT_DONOTALTER}} <!-- cylindrical tall/slim vessel · white ribbed cap · label «زيت المشاط للشعر» (never «الأحمر») · gold seal left · fill line + air gap -->
> - **Negatives:** {{SLOT_NEGATIVES}} <!-- square/squat bottle · extra text on label · warped label · plastic-looking oil · orientalist props (per gulf-beauty-brand-norms) -->
> - **Fidelity gate (41):** ΔE ≤ {{SLOT_DELTAE}} vs canonical_reference · ship ≥ {{SLOT_SHIP}} <!-- from product-lock fidelity_gate -->
>
> **Integration wiring** (drop-in for index.html)
> - **Replaces node at:** {{SLOT_DOM_ANCHOR}} <!-- e.g. header.hero .hero-copy > img.hero-shot -->
> - **Markup:**
>   ```html
>   {{SLOT_MARKUP}}
>   ```
>   <!-- HOW TO FILL for an IMAGE: keep width/height attrs = the new intrinsic
>        dims (prevents CLS), keep alt in Arabic (SEO/a11y), keep loading + class.
>        e.g.
>        <img class="hero-shot" src="assets/{{SLOT_OUTFILE}}"
>             alt="{{SLOT_ALT_AR}}" width="896" height="1152"
>             fetchpriority="high" decoding="async"> -->
>   <!-- HOW TO FILL for a VIDEO loop: muted autoplay loop playsinline, a poster
>        webp (first frame) for instant LCP, mp4 + webm sources, preload per §A.
>        e.g.
>        <video autoplay muted loop playsinline preload="metadata"
>               poster="assets/{{SLOT_POSTER}}">
>          <source src="assets/{{SLOT_OUTFILE}}.webm" type="video/webm">
>          <source src="assets/{{SLOT_OUTFILE}}.mp4"  type="video/mp4">
>        </video> -->
> - **CSS / attribute changes required:** {{SLOT_CSS_CHANGE}} <!-- "none — same aspect ratio" OR the exact rule to update if the ratio changed (e.g. .b-media aspect-ratio: 900/900 → 4/5) -->
> - **RTL / a11y note:** {{SLOT_RTL_A11Y}} <!-- alt text stays Arabic; decorative slots keep alt="" aria-hidden; no text in the pixels -->
> - **Reuses master:** {{SLOT_REUSE}} <!-- §B master id, or "own generation" — reuse is the default for product-hero slots -->

<!-- Repeat the card above for slots #1 … #{{SLOT_COUNT}}. -->

---

## Section E — Microvideo / loop slots (LP motion only)

<!-- HOW TO FILL: For each video slot (hero bg, vbanner, any ambient loop), fill
the loop contract. LP motion = 3–5s seamless loops on the FAST/cheap tier from an
approved keyframe (route R3), NOT an 8s hero render (V2 §5.8). First and last
frame MUST match for a jump-free loop. Always ship a poster webp + mp4 + webm. -->

| Slot # | Loop idea | Source keyframe (§B) | Length | Loop-match (first=last?) | Tier | Poster webp | mp4 crf | webm | Mobile fallback |
|--------|-----------|----------------------|--------|--------------------------|------|-------------|---------|------|-----------------|
| {{V1_SLOT}} | {{V1_IDEA}} <!-- e.g. slow oil pour / bottle micro-rotate --> | {{V1_KEY}} | {{V1_LEN}} | {{V1_MATCH}} | {{V1_TIER}} | {{V1_POSTER}} | {{V1_CRF}} | {{V1_WEBM}} | {{V1_FALLBACK}} <!-- e.g. show poster only < 768px --> |
| {{V2_SLOT}} | {{V2_IDEA}} | {{V2_KEY}} | {{V2_LEN}} | {{V2_MATCH}} | {{V2_TIER}} | {{V2_POSTER}} | {{V2_CRF}} | {{V2_WEBM}} | {{V2_FALLBACK}} |

**Loop rules:** muted + `autoplay` + `loop` + `playsinline` (iOS needs `muted`
+ `playsinline` to autoplay). Never autoplay with sound. Poster carries the LCP
so the section paints instantly; the video hydrates behind it. If a product
appears in the loop it is still route R3 from a real-product keyframe — the bottle
is never redrawn frame-by-frame (§7bis, 3D caveat: front-only reference ⇒ restrict
to a small label-face-on micro-move, flag that more angles unlock full rotation).

---

## Section F — Credit ledger for this LP pack

<!-- HOW TO FILL: Sum the masters (Section B), not the slots (Section C) — that is
where the savings live. Show naive cost (one generation per slot) vs actual
(masters + crops/exports + a few loops), and the fallback route per master. Verify
current Kie pricing at kie.ai before spend (V2 §3) — store tiers, not invented
prices. -->

| Line | Route | Tier | Est. credits (relative) | Cheaper fallback | Fidelity/QC gate |
|------|-------|------|-------------------------|------------------|------------------|
| {{MASTER_COUNT}} product/section masters | {{L_ROUTES}} | draft→1 final each | {{L_MASTERS_CR}} | {{L_MASTER_FB}} | 41 + 27 before final |
| {{VIDEO_SLOT_COUNT}} LP loops (R3, fast) | R3 image→video | fast | {{L_LOOPS_CR}} | {{L_LOOP_FB}} <!-- poster-only, no video --> | loop-match + 27 |
| Crops / recompose exports (all other slots) | derive-from-master | n/a | **0 (no gen)** | — | 41 per crop |
| **Total (actual)** | | | {{L_TOTAL_CR}} | | ≥95 ship gate |
| Naive (1 gen / slot) for contrast | | | {{L_NAIVE_CR}} | | — |
| **Savings** | | | {{L_SAVINGS}} | | — |

---

## Section G — Ship checklist (gate before touching index.html)

<!-- HOW TO FILL: Every box must be checked before a single asset is written into
the live page. This is the 27-quality-checker + 41-product-fidelity-checker gate. -->

- [ ] Every Section C slot maps 1:1 to a real node in the LIVE `index.html` (no orphans, no gaps).
- [ ] Every product-bearing slot uses route R1/R2/R3 — **zero** text-to-image of the bottle.
- [ ] **No baked text** in any LP image or video — all copy stays live HTML (RTL, El Messiri/Tajawal).
- [ ] Fidelity gate 41 passed on every product slot (label «زيت المشاط للشعر», never «الأحمر»; cylindrical vessel; ribbed white cap; gold seal left; ΔE ≤ tolerance).
- [ ] Each replacement's `width`/`height` matches the new intrinsic dims — **CLS-safe** (or CSS change declared in §D).
- [ ] Hero (LCP) slot within weight budget; `fetchpriority="high"`; below-fold slots `loading="lazy"`.
- [ ] Every loop: poster + mp4 + webm, muted autoplay loop playsinline, first=last frame, mobile fallback set.
- [ ] Arabic `alt` text preserved/updated on meaningful images; decorative slots keep `alt="" aria-hidden`.
- [ ] Palette + fonts reproduced, page NOT restyled; RTL intact.
- [ ] Credit ledger (§F) approved; masters counted once; total ≤ planned budget.
- [ ] Filenames version-bumped (no overwriting a live asset mid-review); paths resolve under `{{ASSET_DIR}}`.

---

## Handoff

- **To `38-upscale-finisher`:** encode each approved master to the per-slot format
  + weight budget in §D; produce every crop/recompose export listed in §C at zero
  new generations.
- **To `41-product-fidelity-checker`:** regate every product-bearing slot AND every
  crop against `products/<slug>/references/` — a crop can still clip or distort the
  label.
- **To `27-quality-checker`:** run the §G ship checklist as the final LP gate (LCP,
  CLS, legibility, brand, RTL) before any file lands in `index.html`.
- **To the integrator:** apply each §D markup block verbatim; make only the CSS
  changes each card declares; commit with the version-bumped filenames.
- **Back to `30-creative-matrix-planner`:** report actual vs planned credits (§F)
  into campaign memory so the next product's LP plan is sharper.
