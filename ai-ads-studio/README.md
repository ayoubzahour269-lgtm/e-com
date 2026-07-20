# AI Ads Studio

**Cinematic, indistinguishable-from-real luxury beauty video ads — engineered by
Claude, generated in a single AI pass.**

AI Ads Studio is a production framework for building 9:16 sound-on video ads for
**Meta · TikTok · Snapchat** across **Saudi Arabia (primary) · UAE · Oman ·
Egypt**. It turns a product landing page into one optimized, quality-gated
video-generation prompt plus a complete creative package — brief, audience,
concept, hook, storyboard, scene direction, Arabic copy, brand + product lock,
and cost decision — all reasoned in Claude *before* a single generation credit is
spent.

The flagship product is **زيت المشاط الأحمر الأصلي** — *Zayt al-Mishāṭ al-Aḥmar*
("Original Red Mechat Oil"), a 100% natural traditional Moroccan herbal hair oil
sold as a **3-bottle pack (3 × 250 ml = 750 ml) at 139 SAR** (was 185 SAR, −25%),
free shipping, cash on delivery. The locked flagship creative is
**«القطرة التي تُعيد الحياة»** — *al-qaṭra allatī tuʿīd al-ḥayāt* ("The Drop That
Brings Hair Back to Life", internal codename **UNBROKEN THREAD**).

> The single source of truth for every fact, lock, and creative in this framework
> is [`STUDIO-BIBLE.md`](./STUDIO-BIBLE.md). This README summarizes it and shows
> how to run the studio. When any file disagrees with the Bible, **the Bible
> wins**.

---

## The promise

Every ad that leaves this studio must be **indistinguishable from real footage**,
**built to convert**, and **produced at the minimum possible AI cost** — ideally
**one generation per approved concept**. Claude does all of the reasoning,
scoring, and quality assurance up front; the video model is called only once,
only after every gate is green, and only scenes (never whole videos) are
regenerated when a fix is needed.

## Three non-negotiable priorities (in strict order)

| # | Priority | What it means in practice |
|---|----------|---------------------------|
| 1 | **Realism** | No visible AI artifacts. It must look **filmed, not generated** — photoreal skin, hands, eyes, hair, oil, glass, light, and shadow. Realism outranks everything; a beautiful concept that betrays the AI is rejected. |
| 2 | **Conversion** | Every frame earns **Scroll-Stop → Hook → Hold → CTR → CVR → ROAS**. Pain-first hook, heritage trust, sensory payoff, clear COD offer. |
| 3 | **Cost discipline** | Claude reasons, scores, and QA-gates *before* any model runs. **One optimized prompt → one generation.** Regenerate scenes, never whole videos. |

> **Operating principle:** *"Reason like a $500k creative agency, spend like a
> startup. Never send a prompt to a video model until every quality gate is
> green."*

---

## Quickstart — run a NEW product through the studio

Onboarding a new product changes **only two inputs** (the landing page and one
brand-lock file). Nothing in the pipeline, skills, or quality gates changes.

### 1. Drop the landing page

Place the source landing page (URL export or HTML/screenshots) into intake. This
is the **only** source of product facts, claims, offer, and palette — the studio
never invents claims beyond what the page states.

```
config/intake/<product>/landing-page.(html|md|url)
```

### 2. Add a brand-lock YAML

Author one lock file that pins the immutable product identity — vessel, cap,
liquid, label, palette, fonts, offer, market, and never-change rules. Mirror the
flagship at [`config/brand/mechat-red-oil.brand.yaml`](./config/brand/):

```
config/brand/<product>.brand.yaml
```

```yaml
product:
  name_ar: "زيت المشاط الأحمر الأصلي"        # Zayt al-Mishāṭ al-Aḥmar (Original Red Mechat Oil)
  category: hair-oil
  vessel: "clear rounded-rectangular PET ~250 ml, rounded shoulders, short neck, squarish body"
  cap: "matte white ribbed screw cap, flat top"        # never gold, never black
  liquid: "translucent deep garnet / ruby-red oil, jewel-like, clear (not opaque)"
  label: "white rounded-square front label, red top band; «زيت المشاط» largest, «الأحمر للشعر» beneath; gold 100% Natural seal upper corner"
palette: ["#8E1B1E", "#6E1214", "#FAF6F1", "#FFFFFF", "#2A1A16", "#6B564E", "#C9A227", "#4A6741"]
fonts:   { display: "El Messiri", body: "Tajawal", direction: rtl }
offer:   { pack: "3 × 250 ml = 750 ml", price_sar: 139, was_sar: 185, shipping: free, payment: cod, sku: "SA04050100M300" }
markets: [KSA, UAE, Oman, Egypt]        # KSA primary
```

### 3. Regenerate the flagship section of the Bible

Per the Bible's onboarding rule, the flagship creative section is regenerated for
the new product from its brand lock. Everything else in the framework stays
untouched.

### 4. Run the orchestrator (the 12-stage pipeline)

The orchestrator (skill `00`) drives all 12 stages, routing each artifact between
skills and blocking at the quality gate.

```
run: skills/00-orchestrator
  --brand   config/brand/<product>.brand.yaml
  --intake  config/intake/<product>/landing-page
  --markets config/markets.yaml
  --platforms config/platforms.yaml
  --model   config/model-adapters.yaml   # Kie by default
```

### 5. Gate, then generate once

The run **cannot call a model** until the 10-axis score is **≥ 95 weighted with
no axis < 90**. Below threshold, the studio auto-improves and re-scores — it never
generates a failing prompt. On green, it emits **one** Kie prompt for the 8-second
primary cut and generates once.

### 6. Collect deliverables

You receive **ONE compiled Kie prompt** plus the full **14-file creative package**
(see [What you get](#what-you-get)) under
`examples/<product>/` — the same shape as the worked flagship.

---

## Pipeline at a glance

Twelve stages, upstream reasoning → downstream compile → single gated generation.

```
  LANDING PAGE + BRAND LOCK
        │
  ┌─────▼──────────────────────────────────────────────────────────────┐
  │ 1 Intake & Brief ....... 00,04  → creative brief from LP + brand lock │
  │ 2 Audience & Psychology  01,02  → ICP · awareness stages · triggers   │
  │ 3 Strategy & Offer ..... 03,07  → angle · funnel · offer/CTA · metrics│
  │ 4 Concept Gen & Score .. 05,28,04 → 20 concepts → score → winner      │
  │ 5 Hook Gen & Score ..... 06,28  → 20 hooks → score → winner           │
  │ 6 Transition Design .... 15     → 30 ideas → seamless continuous set  │
  │ 7 Storyboard ........... 08+09,10,11 → continuous beat sheet          │
  │ 8 Scene Direction ...... 12-14,16-19 → camera/light/motion/hair/…     │
  │ 9 Copy & Localization .. 20,21  → Arabic overlays + VO + cultural QA  │
  │ 10 Consistency & Negs .. 22,23,24 → brand + product lock + negatives  │
  │ 11 Compile & Optimize .. 25,26  → ONE Kie prompt                      │
  │ 12 Quality Gate & Cost . 27,28,29 → score ≥95 → single gen → memory   │
  └─────┬──────────────────────────────────────────────────────────────┘
        │  (all 10 axes green: ≥95 weighted, none <90)
        ▼
   ONE Kie prompt ──► single generation ──► 8 s primary cut + package
        │
        └─ scene-only regeneration if a beat fails post-gen QA (never a full re-render)
```

| Stage | Name | Skills | Output |
|------:|------|--------|--------|
| 1 | Intake & Brief | 00, 04 | Creative brief from landing page + brand lock |
| 2 | Audience & Psychology | 01, 02 | ICP, awareness stages, emotional triggers |
| 3 | Strategy & Offer | 03, 07 | Angle, funnel, offer/CTA framing, metric targets |
| 4 | Concept Generation & Scoring | 05, 28, 04 | 20 concepts → scored → **winner** |
| 5 | Hook Generation & Scoring | 06, 28 | 20 hooks → scored → **winner** |
| 6 | Transition Design | 15 | 30 ideas → seamless continuous set |
| 7 | Storyboard | 08 (+09, 10, 11) | Continuous beat sheet |
| 8 | Scene Direction | 12, 13, 14, 16, 17, 18, 19 | Camera/light/motion/hair/human/env/oil per beat |
| 9 | Copy & Localization | 20, 21 | Arabic overlays + VO + cultural QA |
| 10 | Consistency & Negatives | 22, 23, 24 | Brand + product lock + negative prompt |
| 11 | Prompt Compile & Optimize | 25, 26 | **ONE Kie prompt** |
| 12 | Quality Gate & Cost Decision | 27, 28, 29 | Score ≥ 95 → single generation → memory log |

---

## Directory map

Mirrors Bible §1 exactly.

```
ai-ads-studio/
├── STUDIO-BIBLE.md          ← source of truth (product facts, locks, flagship)
├── README.md                ← what it is + quickstart (this file)
├── ARCHITECTURE.md          ← system design, data flow, extensibility
├── PIPELINE.md              ← the 12-stage end-to-end run
├── config/
│   ├── studio.config.yaml   ← global knobs, thresholds, defaults
│   ├── markets.yaml         ← KSA/UAE/Oman/Egypt culture + language
│   ├── platforms.yaml       ← Meta/TikTok/Snap specs, safe zones, hook windows
│   ├── model-adapters.yaml  ← Kie/Veo/Kling/Runway/PixVerse capability matrix
│   └── brand/
│       └── mechat-red-oil.brand.yaml  ← flagship product lock
├── skills/                  ← 30 modular skill specs (00–29)
├── knowledge/               ← knowledge base (ads, culture, craft, negatives)
│   └── gulf-culture/        ← saudi / uae / oman / egypt
├── templates/               ← fill-in artifacts (brief → ab-test)
├── prompt-builders/         ← the prompt compiler + negatives + dialect map
├── quality/                 ← scoring rubric + checklists
├── memory/                  ← creative memory + campaign memory
├── assets/                  ← asset conventions (points to repo /assets)
├── cache/                   ← prompt cache convention
└── examples/
    └── mechat-red-oil/      ← the fully worked flagship ad (00–13)
```

---

## The 30 skills

Every skill reasons **inside Claude** and never calls a video model
(`model_cost: none`). Numbering is pipeline order.

| # | Skill | One-line role |
|--:|-------|---------------|
| 00 | orchestrator | Runs the 12-stage pipeline end to end; routes artifacts and enforces every gate. |
| 01 | audience-analyzer | Builds the ICP, awareness stages, and buying context for the target market. |
| 02 | consumer-psychology | Maps emotional triggers, objections, and decision drivers to creative levers. |
| 03 | marketing-strategist | Sets the angle, funnel position, offer framing, and metric targets. |
| 04 | creative-director | Owns the big idea, tone, and taste; approves the winning concept and look. |
| 05 | creative-concept-generator | Generates 20 distinct concepts for scoring and selection. |
| 06 | hook-generator | Generates 20 scroll-stopping 0–3 s hooks for scoring. |
| 07 | offer-optimizer | Frames offer, price anchor, guarantee, and CTA for maximum CVR. |
| 08 | storyboard-director | Turns the winning concept into one continuous beat sheet. |
| 09 | beauty-commercial-director | Applies beauty-commercial craft — skin, hair, sensory macro. |
| 10 | luxury-commercial-director | Applies luxury restraint, pacing, and premium finish. |
| 11 | cinematography-director | Sets the overall visual language, lens, and grade. |
| 12 | camera-director | Specifies camera moves, framing, and lens per beat. |
| 13 | lighting-director | Designs light, shadow, and color temperature per beat. |
| 14 | motion-director | Directs subject and camera motion, speed ramps, and slow-mo. |
| 15 | transition-designer | Designs 30 seamless in-camera transitions; selects the continuous set. |
| 16 | hair-realism-director | Guarantees photoreal hair — strand, texture, movement, shine. |
| 17 | human-realism-director | Guarantees photoreal humans — hands, eyes, blink, micro-expression. |
| 18 | environment-realism-director | Guarantees photoreal set, props, and light behavior. |
| 19 | oil-product-realism-director | Guarantees photoreal oil and liquid — drops, pours, ribbons, glass. |
| 20 | arabic-copywriter | Writes elegant MSA overlays and voice-over; supplies a Khaleeji variant. |
| 21 | cultural-expert-gulf | QA's cultural fit, modesty, and localization for KSA/UAE/Oman/Egypt. |
| 22 | brand-guardian | Enforces palette, type, tone, and brand DNA across every frame. |
| 23 | product-consistency-guard | Locks bottle/label/cap/liquid identity across every regeneration. |
| 24 | negative-prompt-builder | Compiles the master and scene-specific negative prompt. |
| 25 | prompt-optimizer | Compresses and structures the prompt for maximum model adherence. |
| 26 | kie-prompt-builder | Compiles the single Kie / Veo-3-class generation prompt. |
| 27 | quality-checker | Runs pre- and post-generation QA against the checklist. |
| 28 | creative-scoring-engine | Scores concepts, hooks, and prompts on the 10-axis rubric. |
| 29 | cost-optimizer | Enforces single-generation policy and scene-only regeneration. |

---

## What you get

Each ad ships as a **14-file creative package** (`examples/<product>/00–13`) that
rolls up into the **10 client-facing final-output items**. One package = one
approved concept = one generation.

### The 14 deliverables

| File | Deliverable | Stage(s) | Key content |
|-----:|-------------|:--------:|-------------|
| 00 | Creative Brief | 1 | Product facts, offer, palette, brand-lock digest from the LP |
| 01 | Audience, Psychology & Strategy | 2–3 | ICP (women 22–45, KSA-first), awareness stages, triggers, angle, offer framing, metric targets |
| 02 | Concepts Scored | 4 | 20 concepts scored → **winner = UNBROKEN THREAD** |
| 03 | Hooks Scored | 5 | 20 hooks scored → **winner = the Hook line** |
| 04 | Transition Set | 6 | 30 transitions → the seamless continuous set (drop + hair as engines) |
| 05 | Storyboard / Beat Sheet | 7 | The continuous 8 s beat sheet (Hook→Discovery→Ritual→Transformation→Offer) |
| 06 | Scene Direction Pack | 8 | Per-beat camera, lighting, motion, hair, human, environment, oil direction |
| 07 | Arabic On-Screen Overlays | 9 | RTL overlays, legible sound-off, per beat |
| 08 | Arabic Voice-Over | 9 | Feminine warm MSA VO + Khaleeji-spoken variant |
| 09 | Consistency & Negative Lock | 10 | Brand DNA + product lock + master negative prompt |
| 10 | Music & Sound Design | 8–9 | Oud/qanun luxe score + intimate sound design spec |
| 11 | Compiled Kie Prompt | 11 | **The ONE generation prompt** for the 8 s primary cut |
| 12 | Quality Gate Scorecard | 12 | 10-axis score (≥ 95, none < 90) with evidence |
| 13 | Cost Decision & Memory Log | 12 | Single-gen decision, regeneration policy, entry to creative memory |

### The 10 final-output items → package map

| # | Final output the client asked for | Delivered by files |
|--:|-----------------------------------|--------------------|
| 1 | Creative brief + brand lock | 00 |
| 2 | Audience / ICP + psychology + strategy | 01 |
| 3 | Winning concept (scored, from 20) | 02 |
| 4 | Winning hook (scored, from 20) | 03 |
| 5 | Continuous storyboard / beat sheet + transitions | 04, 05 |
| 6 | Full scene direction (camera/light/motion/hair/human/env/oil) | 06 |
| 7 | Arabic overlays + voice-over + music (localized, cultural QA) | 07, 08, 10 |
| 8 | Consistency + negatives lock | 09 |
| 9 | The ONE compiled Kie prompt | 11 |
| 10 | Quality scorecard + cost decision + memory log | 12, 13 |

### Also included per package

- **Platform cuts:** 9:16, 1080×1920+, 24–30 fps, safe margins top ~14% /
  bottom ~20%, designed sound-on but fully legible sound-off — tuned to each
  platform's hook window (Meta 0–3 s · TikTok 0–2 s · Snapchat 0–1.5 s).
- **A/B pairs:** a hair-visible default hero and an elegant modest / styled-hair
  alternative; MSA VO and a Khaleeji-spoken VO variant.
- **Optional 13 s director's cut:** a 2-segment stitch (Segment A HOOK→
  TRANSFORMATION, Segment B TRANSFORMATION hold + OFFER + CTA) — used **only**
  when budget allows a 2-generation stitch; otherwise ship the 8 s primary.

---

## The flagship reference — `examples/mechat-red-oil/`

The fully worked reference lives at
[`examples/mechat-red-oil/`](./examples/mechat-red-oil/) (files 00–13). It renders
the locked winner **UNBROKEN THREAD** end to end and is the pattern every new
product package copies. Its `02-concepts-scored` #1 concept, its `03-hooks-scored`
#1 hook, and its single Kie prompt all elaborate Bible §3–§6 without
contradiction.

### Locked creative spine (do not alter without regenerating from the brand lock)

- **Emotional spine:** Pain → Heritage/Trust → Ritual/Self-care → Transformation →
  Pride → Action. Primary trigger **hope + restored femininity**; secondary
  **heritage trust**.
- **The transition engine:** a **falling hair strand** meets a **falling garnet
  oil drop**; before/after happens *inside one continuous camera move*, never a
  split screen — which reads as real footage and is almost impossible to scroll
  past.

### Locked Arabic overlays (RTL, short, legible sound-off)

| Beat | Overlay | Transliteration | English gloss |
|------|---------|-----------------|---------------|
| Hook | كل تمشيطة… وشعرك ينقص؟ | *kull tamshīṭa… wa-shaʿruki yanquṣ?* | Every comb stroke… and your hair keeps thinning? |
| Discovery | سرّ جداتنا: زيت المشاط الأحمر | *sirru jaddātinā: zayt al-mishāṭ al-aḥmar* | Our grandmothers' secret: Red Mechat Oil |
| Ritual | تغذية تصل إلى الجذور | *taghdhiya taṣil ilā al-judhūr* | Nourishment that reaches the roots |
| Transformation | كثافة وطول… وشعر يتكلّم عنكِ | *kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki* | Density and length… hair that speaks for you |
| Offer | باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني | *bāk 3 qanānāt — 139 riyāl badal 185 · shaḥn majjānī* | 3-bottle pack — 139 SAR instead of 185 · Free shipping |
| CTA | اطلبي الآن — الدفع عند الاستلام | *uṭlubī al-ān — ad-dafʿ ʿind al-istilām* | Order now — Cash on delivery |

### Product consistency lock (immutable across every frame and regeneration)

- **Vessel:** clear/transparent rounded-rectangular PET bottle (~250 ml), soft
  rounded shoulders, short neck, squarish body — not a tall cylinder.
- **Cap:** matte white ribbed screw cap, flat top. **Never gold, never black.**
- **Liquid:** translucent deep garnet / ruby-red oil — jewel-like, clear (not
  opaque), warm highlights. This red **never** shifts to orange, brown, or pink.
- **Label:** white rounded-square front label with a red top band; garnet Arabic
  type **«زيت المشاط»** (المشاط largest) with **«الأحمر للشعر»** beneath and three
  tiny tagline lines (نعومة وديمومة · تغذية للشعر · تقوية وتطويل الشعر); a small
  gold circular **«طبيعي 100%»** (*ṭabīʿī 100%*, "100% Natural") seal in the upper
  corner.
- **Hero set DNA:** warm cream Moorish/mihrab arch, deep garnet drape, a single
  red hibiscus flower, a palm frond, a pale stone/travertine podium, soft
  directional window light with long gentle shadows.

### Product facts (identical to the Bible — never exceed these claims)

- **Ingredients (only these four):** *al-Mishāṭ* / walnut husk (قشور الجوز — the
  traditional secret to strengthen roots and stop shedding), red hibiscus
  (الكركديه الأحمر), natural henna (الحناء الطبيعية), nourishing plant oils
  (زيوت نباتية مغذية).
- **Benefits:** stops hair loss from the first weeks · stimulates new growth ·
  noticeable density & length with use 2–3×/week · shine & softness from first
  use.
- **Offer:** 3-bottle pack (3 × 250 ml = 750 ml, ~3-month treatment) — **139 SAR**
  (was 185 SAR, −25%) · free shipping · **cash on delivery**
  (الدفع عند الاستلام) · inspect-before-pay · SKU `SA04050100M300` · delivery to
  all KSA cities in 24–48 h / 1–4 business days after phone confirmation ·
  4.8/5 rating.
- **Free of** parabens and silicone. 100% natural "grandmothers' recipe"
  (وصفة الجدات).

---

## Extending the studio

The framework is built to grow along three axes without touching the pipeline or
the quality gates.

### New product categories

1. Add `config/brand/<product>.brand.yaml` with the new vessel, label, liquid,
   palette, offer, and never-change rules.
2. Drop the product's landing page into `config/intake/<product>/`.
3. Regenerate the Bible flagship section for the product.
4. Run the orchestrator. The realism directors (16–19) generalize:
   `oil-product-realism` becomes the material specialist for the new hero
   (cream, serum, powder, glass) via the brand lock — no code changes, just the
   material description in the lock.

### New markets

1. Extend `config/markets.yaml` and add a `knowledge/gulf-culture/<market>/`
   dossier (etiquette, modesty, dialect, taboos, buying behavior).
2. `21-cultural-expert-gulf` and `20-arabic-copywriter` localize copy and VO;
   keep the primary cut in elegant MSA (فصحى — reads premium and pan-Gulf) and
   offer a market-specific spoken variant. Never ship machine translation.
3. Update `config/platforms.yaml` only if a market introduces a new placement or
   safe-zone rule.

### New video models (Veo · Kling · Runway · PixVerse)

1. Add the model's row to `config/model-adapters.yaml` (max duration, resolution,
   fps, motion strength, prompt-length ceiling, negative-prompt support,
   image-to-video, stitching).
2. `26-kie-prompt-builder` reads the adapter and recompiles the same locked beat
   sheet into that model's prompt grammar; `25-prompt-optimizer` re-fits length
   and structure. The concept, hooks, storyboard, copy, locks, and negatives are
   model-agnostic and carry over unchanged.
3. `29-cost-optimizer` re-derives the single-generation vs. stitch decision from
   the new model's cost and duration limits.

---

## Quality gate (a run may not call a model until all pass)

Score **10 axes 0–100**; ship threshold **≥ 95 weighted, with no axis < 90**:

`Realism · Marketing/Conversion · Luxury feel · Storytelling · Branding ·
Culture/Localization · Product consistency · Video rhythm/retention · Hook
strength · Technical/prompt soundness.`

Below threshold → **auto-improve and re-score; never generate.** The full rubric
is in [`quality/scoring-rubric.md`](./quality/). The master negative-prompt core
(anti-artifact) is always applied — see Bible §6.6 and
[`prompt-builders/`](./prompt-builders/).

---

## Authoring conventions (for anyone extending the framework)

Follow Bible §2 exactly. Every **skill** (`skills/NN-name/SKILL.md`) opens with
this frontmatter and then carries eight H2 sections **in this order**:

```yaml
---
name: <kebab-name>
role: <one-line role title>
stage: <pipeline stage number(s)>
consumes: [<upstream artifacts / skills>]
produces: [<downstream artifacts>]
model_cost: none   # skills reason in Claude; they never call a video model
---
```

`Purpose` · `Inputs` · `Outputs` · `Rules` · `Reasoning Strategy` ·
`Best Practices` · `Failure Conditions` · `Handoff`. Write in second-person
imperative, production-grade, no placeholders. Knowledge docs are dense and
checklist-heavy. **All examples reference the flagship product and creative — never
invent new product claims.** Any Arabic overlay or VO line carries a Latin
transliteration and an English gloss on first use.

---

*AI Ads Studio — reason like a $500k creative agency, spend like a startup.*
