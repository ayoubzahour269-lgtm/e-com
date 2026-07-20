---
template: "concept"
type: "template"                         # fill-in skeleton for ONE concept card; duplicate this block per concept
fills_stage: 4                           # PIPELINE.md Stage 4 — Concept Generation & Scoring
instantiates: "examples/<product-slug>/02-concepts-scored.md (one card per concept, ≥20 cards required)"
filled_by_skills: ["05-creative-concept-generator"]
scored_by_skill: "28-creative-scoring-engine"
selected_by_skill: "04-creative-director"
consumes: ["00-creative-brief.md", "01-audience-psychology-strategy.md", "creative-direction.md (04)", "STUDIO-BIBLE.md §3 §4 §5 §6 §7 §8"]
consumed_by_skills: ["28-creative-scoring-engine", "04-creative-director", "06-hook-generator",
                      "08-storyboard-director", "15-transition-designer", "20-arabic-copywriter",
                      "21-cultural-expert-gulf", "22-brand-guardian", "23-product-consistency-guard",
                      "29-cost-optimizer"]
based_on: "skills/05-creative-concept-generator/SKILL.md Output 5.1 (the 16-field concept-card schema) and Output 5.3 (worked exemplar cards); scoring block designed as an 8-field condensation of the STUDIO-BIBLE.md §7 ten-axis rubric for fast concept-time triage — see §B below for the exact axis mapping. Worked model = the flagship UNBROKEN THREAD concept card (STUDIO-BIBLE.md §6)."
status: "BLANK — fill-in skeleton. Duplicate this whole file's card block once per concept (≥20 required, per STUDIO-BIBLE §2 authoring conventions and PIPELINE.md Stage 4). Replace every {{FIELD}}, delete every <!-- HOW TO FILL --> comment."
---

# Concept Card Template

## How to use this template

A **concept** is one distinct creative idea for the product — an archetype, an
opening device, a setting, a transition mechanic, and an emotional lever,
bundled into a card that a scoring engine can grade without guessing and that
a creative director can pick a winner from. The studio requires **at least 20
genuinely different concepts** per product run, spanning a real spread of
archetypes (luxury, routine, transformation, before/after, problem-solution,
UGC, influencer, heritage, ASMR, and so on) — never 20 rewordings of one idea.

**One file, many cards.** This template describes **one** card. To build a
real concept set, copy Section A (and its Section B scoring block) 20+ times
into the run's `concepts-scored.md`, renumbering the ID each time
(`C01`, `C02`, `C03`, …). Section C (the diversity-enforcement matrix) is
filled **once**, after all cards exist, by checking every card against every
other card.

**If you are onboarding a new product with a fully-worked flagship idea
already chosen** (the way `STUDIO-BIBLE.md` §6 fixes UNBROKEN THREAD for the
mechat flagship), that idea becomes `C01`, authored faithfully and seeded to
rank #1 — every other card is then a genuine alternative that stress-tests it,
not a strawman built to lose. If no idea is fixed yet, generate the full
spread first and let scoring find the winner honestly.

**Placeholder convention:** `{{FIELD}}` = a blank you fill; a bracket like
`{{Y_OR_N}}` means the field only accepts `Y` or `N`. `<!-- HOW TO FILL: … -->`
explains what belongs there and, where useful, the *shape* a strong answer
takes in the flagship reference — delete each comment once filled.

---

## Section A — The concept card (16 fields; every field is required)

<!-- HOW TO FILL: A blank field starves the scoring engine of evidence for at
least one of the ten Bible §7 axes — treat every row below as mandatory. Each
row states which axis (or axes) it feeds so you can see, before scoring even
runs, whether the card is thin somewhere. -->

| Field | Feeds §7 axis | Your entry |
|-------|----------------|------------|
| **ID** | — | {{CONCEPT_ID}} <!-- C01, C02, … — stable, referenced by scoring + selection --> |
| **Archetype** | Storytelling · Marketing | {{ARCHETYPE}} <!-- one of: luxury / routine / transformation / before-after / problem-solution / UGC / influencer / wedding / spa / mother / confidence / morning-ritual / night-ritual / premium-lifestyle / gift / doctor-scientific / minimalist / emotional / storytelling-arc / heritage / ASMR — or a named archetype you define --> |
| **Logline** | Marketing/Conversion · Storytelling | {{LOGLINE}} <!-- one sentence a buyer could repeat back to a friend --> |
| **Angle** | Marketing/Conversion | {{ANGLE}} <!-- which strategy-brief angle (A/B/C) this concept serves, from 03-marketing-strategist --> |
| **Awareness stage / segment** | Marketing/Conversion | {{AWARENESS_SEGMENT}} <!-- from 01-audience-analyzer's awareness map + segment table --> |
| **Emotional lever** | Storytelling · Marketing | {{EMOTIONAL_LEVER}} <!-- dominant + secondary trigger this concept detonates, from 02-consumer-psychology --> |
| **Hook (opening device)** | Hook strength | {{HOOK_DEVICE}} <!-- the EXACT opening image/action that stops the scroll — a specific filmable action, not a mood word --> |
| **Setting** | Luxury feel · Culture · Branding | {{SETTING}} <!-- the world the concept plays in; product beats should render the brief's hero-environment DNA --> |
| **Device / transition engine** | Video rhythm/retention · Realism | {{DEVICE_ENGINE}} <!-- the continuous mechanic that carries motion from beat to beat --> |
| **Product-lock beat** | Product consistency · Branding | {{PRODUCT_LOCK_BEAT}} <!-- how and when the exact product-lock (creative-brief.template.md §5) appears, label-to-camera --> |
| **Claims touched** | Marketing/Conversion (+ compliance) | {{CLAIMS_TOUCHED}} <!-- which of the brief's locked claims this concept dramatizes — never a claim not in the brief --> |
| **Arabic anchor (MSA, → 20)** | Culture/Localization · Branding | {{ARABIC_ANCHOR_AR}} ({{ARABIC_ANCHOR_TRANSLIT}}, "{{ARABIC_ANCHOR_GLOSS}}") <!-- the opening/CTA line INTENT in elegant MSA; final wording is 20-arabic-copywriter's call --> |
| **Platform · hook window** | Video rhythm/retention · Hook | {{PLATFORM_WINDOW}} <!-- e.g. Meta 0–3 s / TikTok 0–2 s / Snap 0–1.5 s primary fit --> |
| **Modesty variant** | Culture/Localization | {{MODESTY_VARIANT}} <!-- hair-visible default and/or documented modest/styled alternative --> |
| **Continuous-move?** | Realism · Technical | {{CONTINUOUS_MOVE_Y_N}} <!-- Y = one unbroken camera move (the realism edge); N = relies on a cut/split → documented Realism-axis penalty --> |
| **One-generation renderable?** | Technical (+ cost) | {{ONE_GEN_RENDERABLE_Y_N}} <!-- Y/N — can it ship in a single generation under the product lock + negatives, or does it need a multi-segment stitch? --> |
| **Predicted axis-lean (hint, NOT a score)** | guides scoring; never final | {{PREDICTED_AXIS_LEAN}} <!-- where you expect this concept to be strong/weak on the ten axes — a hint for 28, never a number you assign yourself --> |
| **Diversity keys** (hook-family / setting / device triple) | — | `{{DIVERSITY_KEY_HOOK}}` · `{{DIVERSITY_KEY_SETTING}}` · `{{DIVERSITY_KEY_DEVICE}}` <!-- the triple the dedupe check in Section C runs on; no two concepts in the set may share all three --> |

---

## Section B — The 8-field quick scorecard (concept-time self-triage)

<!-- HOW TO FILL: This is a condensed, 8-field version of the STUDIO-BIBLE.md
§7 ten-axis quality gate, built for fast triage AT CONCEPT-GENERATION TIME —
before the full craft package (camera, light, hair, human, environment, oil,
copy, consistency, negatives) exists to feed the formal 10-axis engine
(28-creative-scoring-engine). Use it to self-audit each card as you write it
and to give 04-creative-director a fast read across 20+ cards. It is NOT a
substitute for the Stage-4/5/12 formal gate (≥95 weighted, no axis <90,
STUDIO-BIBLE.md §7) — that gate is the only one with authority to green-light
a generation. Score each field 0–100; cite the evidence in one clause, don't
just assign a number. -->

**Axis-mapping (why 8, not 10):** two of the Bible's ten axes are combined
into single fields below because, at concept stage, they move together and
neither has enough independent evidence yet to score separately — *Luxury
feel* + *Branding* both describe the concept's premium register before any
craft direction exists; *Video rhythm/retention* + *Technical/prompt
soundness* both describe whether the concept is filmable as a single
continuous take before any camera/motion direction exists. All ten Bible axes
are still covered; two pairs are pre-merged for speed.

| # | Scoring field | Maps to Bible §7 axis(es) | Score (0–100) | One-line evidence |
|---|----------------|------------------------------|:---:|---------------------|
| 1 | **Hook strength** — will the first frame stop the scroll before any word is read? | Hook strength | {{SCORE_1_HOOK}} | {{EVIDENCE_1_HOOK}} |
| 2 | **Realism / filmability** — does the device read as something a camera could actually capture? | Realism | {{SCORE_2_REALISM}} | {{EVIDENCE_2_REALISM}} |
| 3 | **Product consistency & lock fit** — does the product-lock beat land the exact product identity, unforced? | Product consistency | {{SCORE_3_PRODUCT}} | {{EVIDENCE_3_PRODUCT}} |
| 4 | **Storytelling / emotional arc** — is there a clean spine from pain (or curiosity) to payoff? | Storytelling | {{SCORE_4_STORY}} | {{EVIDENCE_4_STORY}} |
| 5 | **Luxury feel & branding** — does the register read premium and match the brand's palette/tone? | Luxury feel + Branding | {{SCORE_5_LUXURY_BRAND}} | {{EVIDENCE_5_LUXURY_BRAND}} |
| 6 | **Culture & modesty fit** — does it hold the market's modesty/culture floor with no fear-mongering? | Culture/Localization | {{SCORE_6_CULTURE}} | {{EVIDENCE_6_CULTURE}} |
| 7 | **Marketing / conversion potential** — does it dramatize a real claim and route cleanly to the offer/CTA? | Marketing/Conversion | {{SCORE_7_MARKETING}} | {{EVIDENCE_7_MARKETING}} |
| 8 | **Rhythm & one-generation feasibility** — does it hold together as continuous motion inside a single generation's length ceiling? | Video rhythm/retention + Technical/prompt soundness | {{SCORE_8_RHYTHM_FEASIBILITY}} | {{EVIDENCE_8_RHYTHM_FEASIBILITY}} |

**Quick-read total (average of the 8 fields, display only):** {{QUICK_READ_TOTAL}}
<!-- This average is a triage signal only. It is NOT the Bible §7 weighted
total (which uses ten axes at fixed, non-equal weights — Realism and Product
consistency and Hook strength are weighted far higher than Branding or
Technical soundness, per STUDIO-BIBLE.md §7 / skills/28-creative-scoring-engine).
Never present this average as if it were a pass/fail gate verdict. -->

**Any field scoring below 70?** {{LOW_SCORE_FLAG}} — if yes, name the concrete
fix or mark the concept a *documented weaker alternative* rather than
silently shipping a padded card: {{LOW_SCORE_NOTE}}

---

## Section C — Diversity-enforcement entry (fill once the full set exists)

<!-- HOW TO FILL: After all 20+ cards are written, confirm no two concepts
share the same {hook-family, setting, device} triple from Section A's
Diversity keys row. List any near-collision and how you resolved it (merge or
regenerate). -->

- **Set size:** {{SET_SIZE}} concepts (≥20 required)
- **Archetype coverage:** {{ARCHETYPE_COVERAGE_NOTE}}
- **Dedupe check result:** {{DEDUPE_CHECK_RESULT}} <!-- "no two cards share a full triple" or list the collision found and its fix -->
- **Awareness / segment / platform spread:** {{SPREAD_NOTE}}
- **Realism-edge honesty:** {{REALISM_EDGE_NOTE}} <!-- which cards are continuous-move Y vs N, listed plainly -->

---

## Definition of done (per card)

- [ ] All 16 Section-A fields filled — no blank field.
- [ ] All 8 Section-B scores filled with a one-line evidence citation each —
      no bare number.
- [ ] Claims touched (Section A) trace only to claims in the creative brief;
      no invented claim.
- [ ] The product-lock beat renders the brief's exact product-lock description;
      no redesign, no recolor.
- [ ] Every Arabic string carries transliteration + English gloss.
- [ ] `Continuous-move?` and `One-generation-renderable?` are answered
      honestly — a concept that needs a cut is marked `N`, not smoothed over.
- [ ] `Predicted axis-lean` is a hint, not a final score; no field in Section
      A or B asserts a Stage-4/12 gate verdict.
- [ ] All `{{FIELD}}` placeholders replaced; all `<!-- HOW TO FILL -->`
      comments deleted.

## Handoff

| Consumer | Reads |
|----------|-------|
| 28-creative-scoring-engine | Whole card — ingests Section A as Path-B evidence for the formal ten-axis Stage-4 score (Section B is a triage aid, not its input of record) |
| 04-creative-director | Whole set — applies the taste rubric on top of 28's scores to arbitrate the winner |
| 06-hook-generator | Winner's `Hook (opening device)` + Angle + platform window |
| 08-storyboard-director | Winner's full card (device/engine, product-lock beat, claims touched) |
| 15-transition-designer | Winner's `Device / transition engine` |
| 20-arabic-copywriter / 21-cultural-expert-gulf | `Arabic anchor` + `Modesty variant` across the set |
| 23-product-consistency-guard | `Product-lock beat` of every card |
| 29-cost-optimizer | `One-generation-renderable?` flags across the set |
