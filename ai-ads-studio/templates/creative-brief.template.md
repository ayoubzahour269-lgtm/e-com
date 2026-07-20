---
template: "creative-brief"
type: "template"                        # this file is a fill-in skeleton, not a skill or a filled artifact
fills_stage: 1                          # PIPELINE.md Stage 1 — Intake & Brief
instantiates: "examples/<product-slug>/00-creative-brief.md"
filled_by_skills: ["00-orchestrator", "04-creative-director"]
consumes: ["<product> landing page", "config/brand/<product>.brand.yaml", "STUDIO-BIBLE.md §3", "STUDIO-BIBLE.md §4"]
consumed_by_skills: ["01-audience-analyzer", "02-consumer-psychology", "03-marketing-strategist",
                      "04-creative-director", "05-creative-concept-generator", "06-hook-generator",
                      "07-offer-optimizer", "09-beauty-commercial-director", "10-luxury-commercial-director",
                      "18-environment-realism-director", "20-arabic-copywriter", "21-cultural-expert-gulf",
                      "22-brand-guardian", "23-product-consistency-guard", "26-kie-prompt-builder"]
based_on: "STUDIO-BIBLE.md §2 (authoring conventions), §3 (product source of truth), §4 (product consistency lock); worked model = the flagship زيت المشاط الأحمر / Red Mechat Oil brief described in STUDIO-BIBLE.md §3–§4 and PIPELINE.md Stage 1"
status: "BLANK — fill-in skeleton. Replace every {{FIELD}} placeholder, delete every <!-- HOW TO FILL --> comment, and delete this status line before the artifact ships downstream."
---

# Creative Brief — {{PRODUCT_NAME_EN}}

## How to use this template

This is the **Stage-1 root artifact**. Every downstream skill in the 12-stage
pipeline — audience, psychology, strategy, concept, hook, storyboard, scene
direction, copy, consistency, and the final Kie prompt — treats this file as
**ground truth**. Nothing downstream may contradict it, and this file itself
may never contain a fact that is not traceable to the product's landing page
(LP) and its brand-lock YAML. If a fact isn't on the LP, it does not go in this
brief — flag it as an open question instead of inventing it.

**Fill order:** work top to bottom. Sections 1–4 are pure extraction (copy
exactly what the LP says, translate nothing, exaggerate nothing). Section 5
is the one section where you *synthesize* (the immutable product-lock digest,
written from real product photos, not the LP copy). Section 9 is a
self-check you run **last**, against everything you wrote above.

**The mechat flagship as the model.** The fully worked reference for this
template is the flagship product's own brief, described in `STUDIO-BIBLE.md`
§3 (زيت المشاط الأحمر الأصلي / *Zayt al-Mishāṭ al-Aḥmar* / "Original Red
Mechat Oil") and §4 (its immutable bottle/label lock). Study how concretely
that brief is written — an exact SKU, an exact price with its anchor, four
named ingredients with roles, four claims each capped with a "do not exceed"
ceiling, a bottle described in enough physical detail that a prompt-writer
five pipeline stages later never has to guess. Match that density and that
discipline for your product; do not copy its content.

**Placeholder convention:** `{{FIELD}}` = a blank you fill. `<!-- HOW TO FILL: … -->`
= a guidance comment explaining what belongs there and, where useful, what
*shape* a strong answer takes in the mechat reference — delete every comment
once the field is filled. A table row you don't need (e.g., a fifth
ingredient) should be deleted, not filled with "N/A" — this brief has exactly
as many claims/ingredients/trust elements as the product actually has.

---

## 1. Product identity

<!-- HOW TO FILL: Extract every field verbatim from the LP. Never translate an
Arabic name into English wording that isn't already the brand's own English
working name. The mechat reference keeps four distinct name fields (full
Arabic, transliteration, English gloss, short/everyday Arabic name) because
different downstream skills need different lengths — the hook generator wants
the short name, the brief needs the full name once for the record. -->

| Field | Value |
|-------|-------|
| **Full product name (Arabic)** | {{PRODUCT_NAME_AR_FULL}} |
| **Transliteration** | {{PRODUCT_NAME_TRANSLIT}} |
| **English gloss** | {{PRODUCT_NAME_EN_GLOSS}} |
| **Short/everyday name (Arabic)** | {{PRODUCT_NAME_AR_SHORT}} — used in overlays/VO after first use |
| **English working name** (internal only — never printed on-pack) | {{PRODUCT_NAME_EN}} |
| **Category** | {{PRODUCT_CATEGORY}} <!-- e.g. "hair-oil", "facial-serum" --> |
| **Origin / heritage story** | {{PRODUCT_ORIGIN}} <!-- e.g. "moroccan-heritage" --> |
| **SKU** | {{PRODUCT_SKU}} |
| **Primary market** | {{PRIMARY_MARKET}} <!-- ISO-style code, e.g. "sa" --> |
| **Secondary markets, ranked** | {{SECONDARY_MARKETS_RANKED}} |

**One-line positioning statement:**
> {{POSITIONING_ONE_LINE}}
<!-- HOW TO FILL: One sentence, LP-sourced, that a buyer could repeat. The
mechat reference reads as: 100% natural + heritage-recipe framing + the
modern-concentration angle + what the pack delivers (a full multi-month
treatment). Do not add a benefit here that isn't proven in Section 2. -->

**Heritage / trust frame (if the product has one):**
| Field | Arabic | Transliteration | English gloss |
|-------|--------|------------------|----------------|
| Heritage hook | {{HERITAGE_HOOK_AR}} | {{HERITAGE_HOOK_TRANSLIT}} | {{HERITAGE_HOOK_EN}} |
| Discovery-beat secret frame | {{SECRET_FRAME_AR}} | {{SECRET_FRAME_TRANSLIT}} | {{SECRET_FRAME_EN}} |

---

## 2. Claims — the functional benefits (cap this list to what the LP proves)

<!-- HOW TO FILL: One row per claim, no more than the LP substantiates. Each
claim needs a `max_strength` ceiling — the exact wording boundary downstream
copy may never cross (e.g. "say 'less shedding,' never 'zero loss'"). This
ceiling is what lets 05/06/20 write freely without a compliance review on
every line. The mechat brief locks exactly four claims, each with its own
ceiling and, where the LP states one, a results timeline. Do not invent a
timeline the LP doesn't state. -->

| # | Claim ID | Arabic | Translit | English | Max-strength ceiling (do not exceed) | Mechanism / cadence |
|---|----------|--------|----------|---------|----------------------------------------|-----------------------|
| 1 | {{CLAIM_1_ID}} | {{CLAIM_1_AR}} | {{CLAIM_1_TRANSLIT}} | {{CLAIM_1_EN}} | {{CLAIM_1_CEILING}} | {{CLAIM_1_MECHANISM}} |
| 2 | {{CLAIM_2_ID}} | {{CLAIM_2_AR}} | {{CLAIM_2_TRANSLIT}} | {{CLAIM_2_EN}} | {{CLAIM_2_CEILING}} | {{CLAIM_2_MECHANISM}} |
| 3 | {{CLAIM_3_ID}} | {{CLAIM_3_AR}} | {{CLAIM_3_TRANSLIT}} | {{CLAIM_3_EN}} | {{CLAIM_3_CEILING}} | {{CLAIM_3_MECHANISM}} |
| N | {{CLAIM_N_ID}} | {{CLAIM_N_AR}} | {{CLAIM_N_TRANSLIT}} | {{CLAIM_N_EN}} | {{CLAIM_N_CEILING}} | {{CLAIM_N_MECHANISM}} |

**Results timeline (only the timelines the LP actually states — this is the
only place any downstream skill may cite a timeline):**

| Result | Timeline as stated on the LP |
|--------|-------------------------------|
| {{TIMELINE_RESULT_1}} | {{TIMELINE_1}} |
| {{TIMELINE_RESULT_2}} | {{TIMELINE_2}} |

---

## 3. Ingredients / formulation — only what the LP names

<!-- HOW TO FILL: One row per named ingredient/active. Mark exactly one as
`is_signature: true` if the product is named after it (mechat: the walnut-husk
ingredient gives the product its name — "المشاط" — and downstream copy is
warned never to translate it as a generic word). If there is no signature
ingredient, delete that column note. -->

| # | Ingredient ID | Arabic | Translit | English | Role / benefit it delivers | Signature? |
|---|----------------|--------|----------|---------|------------------------------|:---:|
| 1 | {{ING_1_ID}} | {{ING_1_AR}} | {{ING_1_TRANSLIT}} | {{ING_1_EN}} | {{ING_1_ROLE}} | {{ING_1_SIGNATURE}} |
| 2 | {{ING_2_ID}} | {{ING_2_AR}} | {{ING_2_TRANSLIT}} | {{ING_2_EN}} | {{ING_2_ROLE}} | {{ING_2_SIGNATURE}} |
| N | {{ING_N_ID}} | {{ING_N_AR}} | {{ING_N_TRANSLIT}} | {{ING_N_EN}} | {{ING_N_ROLE}} | {{ING_N_SIGNATURE}} |

**Formulation facts:** free-from list {{FORMULATION_FREE_FROM}} · natural
percentage {{FORMULATION_NATURAL_PCT}} · concentration note {{FORMULATION_CONCENTRATION_NOTE}}

---

## 4. Audience, offer, trust, objections

### 4.1 Audience snapshot (the full ICP is built at Stage 2 — this is only the LP-stated frame)

| Field | Value |
|-------|-------|
| Gender | {{AUDIENCE_GENDER}} |
| Age range | {{AUDIENCE_AGE_MIN}}–{{AUDIENCE_AGE_MAX}} |
| Psychographics (bulleted, LP-sourced) | {{AUDIENCE_PSYCHOGRAPHICS}} |
| Emotional benefits / drivers | {{AUDIENCE_EMOTIONAL_DRIVERS}} |
| Primary emotional trigger | {{AUDIENCE_PRIMARY_TRIGGER}} |
| Secondary emotional trigger | {{AUDIENCE_SECONDARY_TRIGGER}} |

### 4.2 Offer & price (the numbers this brief locks for the primary market — never invent a price for a secondary market; route it to 07-offer-optimizer instead)

| Field | Value |
|-------|-------|
| Pack contents | {{PACK_CONTENTS}} <!-- e.g. "3 bottles × 250 ml = 750 ml, ~3-month treatment" --> |
| Price (primary market currency) | {{PRICE}} {{CURRENCY}} |
| Anchor / was-price | {{WAS_PRICE}} {{CURRENCY}} ({{DISCOUNT_PCT}}% off) |
| Currency symbol on-frame | {{CURRENCY_SYMBOL_ONFRAME}} |
| Free shipping? | {{FREE_SHIPPING}} |
| Payment method | {{PAYMENT_METHOD}} <!-- e.g. cash on delivery --> |
| Delivery coverage / ETA | {{DELIVERY_COVERAGE}} / {{DELIVERY_ETA}} |
| SKU | {{PRODUCT_SKU}} |

**CTA (locked wording, feminine/masculine imperative as the market dictates):**
| Arabic | Transliteration | English gloss |
|--------|------------------|----------------|
| {{CTA_AR}} | {{CTA_TRANSLIT}} | {{CTA_EN}} |

### 4.3 Trust elements (list every proof point the LP offers)

| ID | English | Arabic (if on-frame) |
|----|---------|------------------------|
| {{TRUST_1_ID}} | {{TRUST_1_EN}} | {{TRUST_1_AR}} |
| {{TRUST_2_ID}} | {{TRUST_2_EN}} | {{TRUST_2_AR}} |
| {{TRUST_N_ID}} | {{TRUST_N_EN}} | {{TRUST_N_AR}} |

### 4.4 Pain points (mark the one that is the primary hook candidate)

| ID | English | Arabic | Primary-hook candidate? |
|----|---------|--------|:---:|
| {{PAIN_1_ID}} | {{PAIN_1_EN}} | {{PAIN_1_AR}} | {{PAIN_1_IS_PRIMARY}} |
| {{PAIN_2_ID}} | {{PAIN_2_EN}} | {{PAIN_2_AR}} | {{PAIN_2_IS_PRIMARY}} |

### 4.5 Objections / FAQ ledger (every objection the LP answers, verbatim)

| Objection | LP-stated answer (do not soften or strengthen it) |
|-----------|------------------------------------------------------|
| {{OBJECTION_1}} | {{OBJECTION_1_ANSWER}} |
| {{OBJECTION_2}} | {{OBJECTION_2_ANSWER}} |
| {{OBJECTION_N}} | {{OBJECTION_N_ANSWER}} |

---

## 5. Product consistency lock — the immutable physical identity (from real product photos)

<!-- HOW TO FILL: This is the single hardest lock in the whole framework
(mirrors STUDIO-BIBLE.md §4). Write it from actual product photography, not
marketing copy — the LP's hero image and pack shots, not its adjectives. Every
line here becomes a byte-identical cached string quoted in every storyboard
beat, every scene-direction card, and the final Kie prompt. Vague language
here ("a nice bottle") is a Stage-10/11 failure five stages downstream — be as
literal as if you were describing evidence in a lineup. -->

| Element | Description | Never / forbidden |
|---------|-------------|---------------------|
| **Vessel** | {{VESSEL_DESCRIPTION}} <!-- material, shape, shoulders, neck, volume --> | {{VESSEL_FORBIDDEN}} |
| **Cap** | {{CAP_DESCRIPTION}} | {{CAP_FORBIDDEN}} <!-- e.g. "never gold, never black" --> |
| **Liquid / contents** | {{LIQUID_DESCRIPTION}} <!-- color, clarity, highlights --> | {{LIQUID_FORBIDDEN}} <!-- exact colors it must never shift toward --> |
| **Label** | {{LABEL_DESCRIPTION}} <!-- shape, band, hierarchy of on-label text, seal --> | {{LABEL_FORBIDDEN}} |

**Label text, verbatim (every line that appears on the physical label):**
| Line | Arabic | Transliteration | English gloss |
|------|--------|------------------|----------------|
| Primary wordmark | {{LABEL_LINE_1_AR}} | {{LABEL_LINE_1_TRANSLIT}} | {{LABEL_LINE_1_EN}} |
| Secondary line | {{LABEL_LINE_2_AR}} | {{LABEL_LINE_2_TRANSLIT}} | {{LABEL_LINE_2_EN}} |
| Tagline(s) | {{LABEL_TAGLINES_AR}} | — | — |
| Seal text | {{LABEL_SEAL_AR}} | {{LABEL_SEAL_TRANSLIT}} | {{LABEL_SEAL_EN}} |

**Immutables (the hard "never change" list — copy this list into every
downstream consistency check, do not paraphrase it):**
- [ ] do NOT change the logo or brand mark
- [ ] do NOT change any label wording
- [ ] do NOT change the label layout (hierarchy, band, seal placement)
- [ ] do NOT change the cap color
- [ ] do NOT change bottle proportions
- [ ] do NOT change the liquid color
- [ ] do NOT add extra text of any kind
- [ ] do NOT add a foreign-language brand name not on the real pack
- [ ] do NOT redesign, restyle, or "improve" the packaging
- [ ] {{ADDITIONAL_IMMUTABLE_IF_ANY}}

**Hero environment DNA** (the signature staging for product-hero and offer
beats — describe it as concretely as the lock above; leave blank and mark
`{{NO_HERO_SET_YET}}` only if the studio has not yet designed one for this
product):

| Element | Description |
|---------|-------------|
| Backdrop / architectural cue | {{HERO_BACKDROP}} |
| Drape / color field | {{HERO_DRAPE}} |
| Signature botanical / prop | {{HERO_PROP}} |
| Surface the product stands on | {{HERO_SURFACE}} |
| Light quality | {{HERO_LIGHT}} |
| Mood (2–4 words) | {{HERO_MOOD}} |

---

## 6. Brand visual DNA

| Token | Hex / value | Usage note |
|-------|-------------|------------|
| Primary / CTA color | {{PALETTE_PRIMARY_HEX}} | {{PALETTE_PRIMARY_NOTE}} |
| Secondary / deep accent | {{PALETTE_SECONDARY_HEX}} | {{PALETTE_SECONDARY_NOTE}} |
| Background / surface | {{PALETTE_BG_HEX}} | {{PALETTE_BG_NOTE}} |
| Ink / text color | {{PALETTE_INK_HEX}} | {{PALETTE_INK_NOTE}} |
| Accent color(s) | {{PALETTE_ACCENT_HEX_LIST}} | {{PALETTE_ACCENT_NOTE}} |
| Display font | {{FONT_DISPLAY}} |
| Body font | {{FONT_BODY}} |
| Text direction | {{TEXT_DIRECTION}} <!-- "rtl" if Arabic-primary --> |

---

## 7. Platform & market scope for this run

| Field | Value |
|-------|-------|
| Target platforms | {{TARGET_PLATFORMS}} <!-- e.g. Meta / TikTok / Snapchat --> |
| Primary language / register | {{PRIMARY_LANGUAGE}} <!-- e.g. elegant MSA --> |
| Spoken-VO variant (if any) | {{SPOKEN_VO_VARIANT}} |
| Modesty / culture floor to apply | {{CULTURE_FLOOR_REF}} <!-- pointer to the market config, not a restated policy --> |

---

## 8. Claim-provenance line (the Stage-1 gate requirement)

<!-- HOW TO FILL: One sentence per claim in Section 2, tying it to where on the
LP it came from. This line is what lets 00-orchestrator and 04-creative-director
certify "zero invented claims" without re-reading the LP themselves. -->

> {{CLAIM_PROVENANCE_STATEMENT}}
> <!-- e.g. "Claims 1–N above are extracted verbatim from the LP's benefits
> section and FAQ; the results timeline is extracted verbatim from the FAQ;
> no claim, ingredient, or price in this brief appears nowhere on the LP." -->

---

## 9. Definition of done (self-check before handoff — do not skip)

- [ ] Every claim in Section 2 traces to the LP; none exceeds what the LP states.
- [ ] The results timeline (if any) is the LP's own timeline, not a faster one.
- [ ] Every ingredient in Section 3 is named on the LP; none invented.
- [ ] The offer in Section 4.2 is stated exactly (pack size, price, anchor,
      discount, shipping, payment) — this is a fact, not a creative choice.
- [ ] Section 5 (the product lock) is written from real photography and is
      concrete enough that a prompt-writer never has to guess a color, a cap
      material, or a label line.
- [ ] Every Arabic string in this brief carries a transliteration and an
      English gloss on first use.
- [ ] The claim-provenance line (Section 8) is filled and true.
- [ ] All `{{FIELD}}` placeholders are replaced; all `<!-- HOW TO FILL -->`
      comments are deleted; this template's frontmatter `status` line is deleted.

## Handoff

| Consumer | Reads |
|----------|-------|
| 01-audience-analyzer | §4.1, §4.4, §4.5 |
| 02-consumer-psychology | §4.1 (triggers), §4.4, §4.5 |
| 03-marketing-strategist / 07-offer-optimizer | §4.2, §4.5 |
| 04-creative-director | Whole brief (synthesizes the ONE big idea) |
| 05-creative-concept-generator / 06-hook-generator | §1–§5 (facts every concept/hook must render) |
| 09/10-beauty/luxury-commercial-director, 18-environment-realism-director | §5 (hero environment DNA), §6 |
| 20-arabic-copywriter / 21-cultural-expert-gulf | §1, §2, §4.2 CTA, §7 |
| 22-brand-guardian | §6 |
| 23-product-consistency-guard, 26-kie-prompt-builder | §5 (the product-lock digest, quoted byte-identical downstream) |

If any downstream skill finds a fact here that conflicts with the LP or the
brand-lock YAML, it is routed back to **00-orchestrator** for a brief
correction — never silently reconciled further down the pipeline.
