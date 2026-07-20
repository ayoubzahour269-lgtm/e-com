# AI Ads Studio — PIPELINE (The 12-Stage End-to-End Run)

> This document specifies the **operational pipeline** that turns a product landing
> page plus one brand-lock file into **one quality-gated Kie generation prompt**
> and the 14-file creative package. It is the runbook the orchestrator (skill `00`)
> executes. Every fact, lock, offer, overlay, and creative beat here is inherited
> verbatim from [`STUDIO-BIBLE.md`](./STUDIO-BIBLE.md) — **when this file and the
> Bible ever disagree, the Bible wins.** No new product claim is ever introduced
> here; everything traces to Bible §3–§6.

The pipeline exists to honor the three non-negotiable priorities in strict order —
**Realism → Conversion → Cost discipline** (Bible §0). Claude performs **all**
reasoning, scoring, and QA *before* a single credit is spent. The default and
target outcome of a run is **one optimized prompt → one generation** for the
8-second primary cut. Scenes are regenerated; whole videos are not.

---

## 0. How to read this document

- **Stages** are numbered 1–12 and map 1:1 to the canonical pipeline in the Bible
  and README. Each stage lists **Goal · Skills · Inputs · Outputs · Gate/exit ·
  Failure & rollback**.
- **Artifacts** are the 14 numbered package files `00–13` produced under
  `examples/<product>/` (flagship: `examples/mechat-red-oil/`). Filenames are
  fixed and referenced throughout (e.g. `02-concepts-scored.md`,
  `03-hooks-scored.md` — the two names the Bible §8 pins by hand).
- **Skills** reason inside Claude and never call a video model (`model_cost: none`).
  Skill files themselves follow Bible §2: YAML frontmatter (`name`, `role`,
  `stage`, `consumes`, `produces`, `model_cost: none`) then the eight H2 sections
  **in order** — `Purpose · Inputs · Outputs · Rules · Reasoning Strategy ·
  Best Practices · Failure Conditions · Handoff`. This pipeline doc is a runbook,
  not a skill, so it uses the standard doc convention (H1 title, table/checklist
  density, agency voice).
- **The gate** is absolute: a run **may not emit a generation call** until the
  10-axis score is **≥ 95 weighted with no axis < 90** (Bible §7) **and** the
  Green-Light Checklist (§14) is 100% true.

### 0.1 The 14 artifacts (the package the pipeline fills)

| File | Artifact | Produced in stage(s) |
|-----:|----------|:--------------------:|
| `00-creative-brief.md` | Creative Brief (product facts, offer, palette, brand-lock digest) | 1 |
| `01-audience-psychology-strategy.md` | ICP · awareness · triggers · angle · offer framing · metric targets | 2–3 |
| `02-concepts-scored.md` | 20 concepts scored → **winner = UNBROKEN THREAD** | 4 |
| `03-hooks-scored.md` | 20 hooks scored → **winner = the Hook line** | 5 |
| `04-transition-set.md` | 30 transitions → the seamless continuous set | 6 |
| `05-storyboard-beat-sheet.md` | The continuous 8 s beat sheet | 7 |
| `06-scene-direction-pack.md` | Per-beat camera/light/motion/hair/human/env/oil | 8 |
| `07-arabic-overlays.md` | RTL on-screen overlays, legible sound-off | 9 |
| `08-arabic-voice-over.md` | Feminine MSA VO + Khaleeji-spoken variant | 9 |
| `09-consistency-negative-lock.md` | Brand DNA + product lock + master negatives | 10 |
| `10-music-sound-design.md` | Oud/qanun luxe score + sound-design spec | 8–9 |
| `11-compiled-kie-prompt.md` | **The ONE generation prompt** (8 s primary) | 11 |
| `12-quality-gate-scorecard.md` | 10-axis score (≥ 95, none < 90) with evidence | 12 |
| `13-cost-decision-memory-log.md` | Single-gen decision, regen policy, memory entry | 12 |

### 0.2 Data flow (one glance)

```
LANDING PAGE + BRAND LOCK
   │  (§3–§4 facts, §4 product lock)
 1 Intake&Brief ─ 00 ─────────────────────────────────────────► 00-creative-brief
 2 Audience&Psych ─ 01,02 ┐
 3 Strategy&Offer ─ 03,07 ┴──────────────────────────────────► 01-audience-…-strategy
 4 Concept Gen&Score ─ 05,28,04 ─────────────────────────────► 02-concepts-scored (WINNER)
 5 Hook Gen&Score ─ 06,28 ───────────────────────────────────► 03-hooks-scored (WINNER)
 6 Transition Design ─ 15 ───────────────────────────────────► 04-transition-set
 7 Storyboard ─ 08(+09,10,11) ───────────────────────────────► 05-storyboard-beat-sheet
 8 Scene Direction ─ 12,13,14,16,17,18,19 ───────────────────► 06-scene-direction-pack (+10 music)
 9 Copy&Localization ─ 20,21 ────────────────────────────────► 07-overlays, 08-voice-over (+10)
10 Consistency&Negatives ─ 22,23,24 ─────────────────────────► 09-consistency-negative-lock
11 Compile&Optimize ─ 25,26 ─────────────────────────────────► 11-compiled-kie-prompt (ONE)
12 Quality Gate&Cost ─ 27,28,29 ─────────────────────────────► 12-scorecard, 13-cost-memory
        │ all 10 axes green (≥95, none <90) AND green-light checklist 100%
        ▼
   ONE Kie prompt ─► single generation ─► 8 s primary cut + package
        └─ post-gen scene QA fails one beat → scene-only regen (never a full re-render)
```

---

## 1. Stage 1 — Intake & Brief

| Field | Detail |
|-------|--------|
| **Goal** | Convert the raw landing page and brand-lock YAML into a single, non-inventive **creative brief** that every downstream stage treats as ground truth for product facts, offer, palette, and the immutable product lock. |
| **Skills** | `00-orchestrator` (drives the run, mounts inputs), `04-creative-director` (sets the north-star taste and one-line big idea seed). |
| **Inputs** | `config/intake/mechat-red-oil/landing-page.(html\|md)`; `config/brand/mechat-red-oil.brand.yaml`; `config/studio.config.yaml` (thresholds/defaults); `config/markets.yaml`, `config/platforms.yaml` (referenced, not yet applied). |
| **Outputs** | `00-creative-brief.md` — product name **زيت المشاط الأحمر الأصلي** (*Zayt al-Mishāṭ al-Aḥmar*, "Original Red Mechat Oil"); the four benefits and four ingredients verbatim; offer **3 × 250 ml = 750 ml, 139 SAR (was 185, −25%), free shipping, cash on delivery** — **الدفع عند الاستلام** (*ad-dafʿ ʿind al-istilām*, "cash on delivery"); SKU `SA04050100M300`; palette + fonts (El Messiri / Tajawal, RTL); the §4 product-lock digest. |
| **Gate / exit** | Brief contains every §3 fact and the §4 lock, states the offer exactly, and introduces **zero** claims not present on the landing page. A claim-provenance line ties each benefit back to the LP. |
| **Failure & rollback** | Any invented/exaggerated claim (e.g. a medical or timeline claim beyond "less shedding 3–5 weeks; density 2–3 months") → **reject the brief**, re-extract from the LP only, and flag the offending line. Missing lock field → halt; the run cannot proceed without a complete §4 lock. |

---

## 2. Stage 2 — Audience & Psychology

| Field | Detail |
|-------|--------|
| **Goal** | Build the ICP, awareness-stage map, and the emotional-trigger / objection model for the target market so the creative speaks to a real buyer, not a demographic. |
| **Skills** | `01-audience-analyzer` (ICP + awareness + buying context), `02-consumer-psychology` (triggers, objections, decision drivers → creative levers). |
| **Inputs** | `00-creative-brief.md`; `config/markets.yaml`; `knowledge/gulf-culture/` (saudi primary, then uae/oman/egypt). |
| **Outputs** | The audience + psychology half of `01-audience-psychology-strategy.md`: ICP = **women ~22–45, KSA primary** then UAE/Oman/Egypt, concerned with shedding, thinning, visible scalp gaps, having tried many oils without result, valuing natural/heritage remedies (mothers included). Awareness ladder (problem-aware → solution-aware → product-aware). Trigger map: primary **hope + restored femininity**, secondary **heritage trust**; supporting triggers confidence, self-care ritual, identity. Objection ledger mirrored from the LP FAQ (how soon results? all hair types? does it dye red? delivery & payment? don't like it?). |
| **Gate / exit** | ICP complete and market-ranked; every LP pain point and objection is mapped to a creative lever; primary/secondary triggers named and justified. |
| **Failure & rollback** | ICP drifts off the §3 audience, or a trigger implies a claim the product can't make → rollback to Stage 1, re-anchor on the brief. Unmapped objection → loop within Stage 2 until the ledger is complete. |

---

## 3. Stage 3 — Strategy & Offer

| Field | Detail |
|-------|--------|
| **Goal** | Choose the winning **angle**, fix the funnel position, frame the **offer/CTA** for maximum CVR, and set the **metric targets** the creative is accountable to. |
| **Skills** | `03-marketing-strategist` (angle, funnel, KPI targets), `07-offer-optimizer` (price anchor, guarantee, CTA framing). |
| **Inputs** | `00-creative-brief.md`; the audience/psychology half of `01-…-strategy.md`. |
| **Outputs** | Completes `01-audience-psychology-strategy.md`: the chosen angle = **pain-of-shedding → grandmothers' heritage cure → sensory transformation**; funnel = cold/ToF pain-led acquisition. Offer framing anchors **139 SAR against the 185 SAR was-price (−25%)**, the **3-bottle = ~3-month treatment** value story, **free shipping**, and de-risking via **cash on delivery** and inspect-before-pay — **فحص المنتج قبل الدفع** (*faḥṣ al-muntaj qabl ad-dafʿ*, "inspect the product before payment"), plus the 4.8/5 rating and "don't like it → don't pay" guarantee. CTA fixed to **«اطلبي الآن — الدفع عند الاستلام»** (*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on delivery"). Metric targets are declared per the funnel's accountable ladder — **Scroll-Stop → Hook → Hold → CTR → CVR → ROAS** — with per-platform hook windows (Meta 0–3 s, TikTok 0–2 s, Snapchat 0–1.5 s); concrete numeric KPI thresholds are campaign-set and recorded in `memory/` (campaign memory), never invented in the creative package. |
| **Gate / exit** | One angle selected with rationale; offer stated exactly to §3; CTA locked; the metric ladder and each platform's hook window are declared and consistent with §5. |
| **Failure & rollback** | Angle not supported by the trigger map → return to Stage 2. Offer misquoted (wrong price, pack size, or payment) → hard reject; the offer is a §3 fact, not a creative choice. |

---

## 4. Stage 4 — Concept Generation & Scoring

| Field | Detail |
|-------|--------|
| **Goal** | Generate **20 distinct concepts**, score them on the 10-axis rubric, and select the winning big idea. |
| **Skills** | `05-creative-concept-generator` (20 concepts), `28-creative-scoring-engine` (10-axis scoring), `04-creative-director` (taste veto + final approval). |
| **Inputs** | `00-creative-brief.md`; `01-audience-psychology-strategy.md`; `quality/scoring-rubric.md`. |
| **Outputs** | `02-concepts-scored.md`: 20 titled concepts, each scored 0–100 on all ten axes, ranked. The **#1 winner is «القطرة التي تُعيد الحياة»** (*al-qaṭra allatī tuʿīd al-ḥayāt*, "The Drop That Brings Hair Back to Life"), codename **UNBROKEN THREAD** — the Bible §6 locked flagship: before/after happens *inside one continuous camera move* with the **oil drop and hair strand as transition engines**, never a split screen. Emotional spine recorded: **Pain → Heritage/Trust → Ritual/Self-care → Transformation → Pride → Action**. |
| **Gate / exit** | Exactly 20 scored concepts; the winner clears the **≥ 95 weighted, no axis < 90** bar on its concept-level score; `04-creative-director` signs the taste approval; per Bible §8 the ranked-#1 concept **is** the §6 winner (a run that ranks anything else #1 for the flagship is a consistency defect). |
| **Failure & rollback** | Fewer than 20, or the field is derivative/off-brief → regenerate the deficient concepts. Winner below threshold → `28` returns axis-level notes, `05` auto-improves, re-score. **No model is called at this stage** — scoring is free. |

---

## 5. Stage 5 — Hook Generation & Scoring

| Field | Detail |
|-------|--------|
| **Goal** | Generate **20 scroll-stopping 0–3 s hooks** for the winning concept, score them, and lock the opening line. |
| **Skills** | `06-hook-generator` (20 hooks), `28-creative-scoring-engine` (score, hook-strength weighted). |
| **Inputs** | `02-concepts-scored.md` (winner); `01-…-strategy.md`; `00-creative-brief.md`. |
| **Outputs** | `03-hooks-scored.md`: 20 scored hooks ranked by scroll-stop + hook strength. The **#1 hook is the §6.3 Hook line — «كل تمشيطة… وشعرك ينقص؟»** (*kull tamshīṭa… wa-shaʿruki yanquṣ?*, "Every comb stroke… and your hair keeps thinning?") — realized visually as the extreme macro of a single dark strand slipping off an ivory wide-tooth comb in slow motion. |
| **Gate / exit** | 20 scored hooks; winner fits the 0–3 s window and the pain-first spine; per Bible §8 the ranked-#1 hook **is** the §6.3 line for the flagship. |
| **Failure & rollback** | Hook implies a claim outside §3, is not legible sound-off, or exceeds the platform hook window → drop and regenerate. Winner mismatched to the concept's opening beat → re-score against the concept, not in isolation. |

---

## 6. Stage 6 — Transition Design

| Field | Detail |
|-------|--------|
| **Goal** | Design **30 seamless in-camera transitions** and select the **continuous set** that makes the whole ad read as one unbroken take — the mechanical heart of UNBROKEN THREAD. |
| **Skills** | `15-transition-designer`. |
| **Inputs** | `02-concepts-scored.md` (winner + emotional spine); `03-hooks-scored.md`. |
| **Outputs** | `04-transition-set.md`: 30 candidate transitions → the selected continuous chain that matches Bible §6.1: falling **strand → falling garnet oil drop** (ripple/liquid match-morph) → **rise out of the oil surface** → **dive into the oil pour** → **emerge onto scalp** → **hair sweeps across lens** (moving hair = natural wipe) → **golden highlight travels the hair → blooms into a light flare** → recede onto the product. The **oil drop and the hair strand are the transition engines**; every cut is in-camera and continuous. |
| **Gate / exit** | The set forms one gapless continuous move; **no split-screen, no hard jump cut**; each transition's IN/OUT frames are physically plausible (match on liquid, hair, or light — never a dissolve that betrays generation). |
| **Failure & rollback** | Any transition that only works as an edit (not in-camera), or that breaks continuity, is rejected and replaced from the 30-candidate pool. If no plausible continuous chain exists, return to Stage 4 — the concept, not the transition, is at fault. |

---

## 7. Stage 7 — Storyboard

| Field | Detail |
|-------|--------|
| **Goal** | Compile the winning concept, hook, and transitions into **one continuous beat sheet** timed to the 8-second primary cut. |
| **Skills** | `08-storyboard-director` (lead), advised by `09-beauty-commercial-director`, `10-luxury-commercial-director`, `11-cinematography-director`. |
| **Inputs** | `02-concepts-scored.md`, `03-hooks-scored.md`, `04-transition-set.md`, `00`/`01`. |
| **Outputs** | `05-storyboard-beat-sheet.md` rendering the §6.1 beats exactly: **HOOK/Pain 0.0–1.2 s** (comb + falling strand) → *transition 1.2–1.6* → **DISCOVERY/Trust 1.6–3.0** (bottle in the arch light, hand lifts it, label to camera, oil pours) → *transition 3.0–3.4* → **RITUAL/Sensory 3.4–4.8** (fingertips massage oil into roots, glide down a section) → *transition 4.8–5.2* → **TRANSFORMATION 5.2–6.6** (over-the-shoulder turn; denser, longer, luminous hair; real blink and breath) → *transition 6.6–7.0* → **OFFER + CTA 7.0–8.0** (orbit the bottle; two more bottles rise into the 3-pack; price + CTA resolve in the hero set). The optional **13 s director's cut** (Segment A HOOK→TRANSFORMATION, Segment B TRANSFORMATION hold + OFFER + CTA) is annotated as a 2-generation stitch used **only when budget allows** — otherwise the 8 s primary ships. |
| **Gate / exit** | Beats and timings sum to 8.0 s and match §6.1; the emotional spine is intact; every beat inherits a transition from Stage 6; the hero-set beats use the §4 environment DNA. |
| **Failure & rollback** | Timing overrun, dropped beat, or a beat that contradicts §6.1 → re-time within Stage 7. A concept-level continuity break surfaced here → rollback to Stage 6 (transitions) or Stage 4 (concept). |

---

## 8. Stage 8 — Scene Direction

| Field | Detail |
|-------|--------|
| **Goal** | For **every beat**, specify camera, lighting, motion, hair, human, environment, and oil/liquid direction to a photoreal, filmable standard — the realism backbone (Priority 1). |
| **Skills** | `12-camera-director`, `13-lighting-director`, `14-motion-director`, `16-hair-realism-director`, `17-human-realism-director`, `18-environment-realism-director`, `19-oil-product-realism-director`. |
| **Inputs** | `05-storyboard-beat-sheet.md`; `00`/`01`; the §4 hero-set DNA. |
| **Outputs** | `06-scene-direction-pack.md`: per-beat lens/framing/move (`12`); light, shadow, colour temperature — warm directional window light with long gentle shadows (`13`); subject/camera motion, speed ramps, slow-mo on the falling strand and the pour (`14`); photoreal hair — strand separation, texture, movement, shine, no plastic/low-res hair (`16`); photoreal human — natural hands (five fingers), living eyes, a real blink and breath, warm-toned "no-makeup" skin, calm confidence, modest wardrobe in cream/garnet/gold (`17`); photoreal set/props — Moorish arch, garnet drape, single red hibiscus, palm frond, travertine podium, believable light behaviour (`18`); photoreal oil — the garnet drop, ripple, ribbon pour, glass caustics, translucent jewel-red that never shifts (`19`). This stage also seeds `10-music-sound-design.md` (beat-synced sound-design cues). |
| **Gate / exit** | Every beat has all seven direction layers filled; each layer states the realism guardrail it enforces; the hero-set beats match §4 DNA exactly; no direction implies an artifact on the §6.6 negative list. |
| **Failure & rollback** | A beat missing a layer, or direction that risks an uncanny result (waxy skin, stiff motion, morphing glass) → the responsible realism director rewrites that layer. Systemic realism risk in a beat → return to Stage 7 to re-block the beat. |

---

## 9. Stage 9 — Copy & Localization

| Field | Detail |
|-------|--------|
| **Goal** | Write the **Arabic on-screen overlays** and **voice-over** in elegant MSA, add a Khaleeji-spoken VO variant, and pass cultural QA for KSA/UAE/Oman/Egypt. |
| **Skills** | `20-arabic-copywriter` (overlays + VO), `21-cultural-expert-gulf` (modesty, dialect, taboo, localization QA). |
| **Inputs** | `05-storyboard-beat-sheet.md`, `06-scene-direction-pack.md`, `00-creative-brief.md`, `config/markets.yaml`, `knowledge/gulf-culture/`. |
| **Outputs** | `07-arabic-overlays.md` — the six locked §6.3 overlays, RTL, short, legible sound-off, in El Messiri/Tajawal: Hook **«كل تمشيطة… وشعرك ينقص؟»**; Discovery **«سرّ جداتنا: زيت المشاط الأحمر»** (*sirru jaddātinā: zayt al-mishāṭ al-aḥmar*, "Our grandmothers' secret: Red Mechat Oil"); Ritual **«تغذية تصل إلى الجذور»** (*taghdhiya taṣil ilā al-judhūr*, "Nourishment that reaches the roots"); Transformation **«كثافة وطول… وشعر يتكلّم عنكِ»** (*kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki*, "Density and length… hair that speaks for you"); Offer **«باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني»** (*bāk 3 qanānāt — 139 riyāl badal 185 · shaḥn majjānī*, "3-bottle pack — 139 SAR instead of 185 · Free shipping"); CTA **«اطلبي الآن — الدفع عند الاستلام»**. `08-arabic-voice-over.md` — the feminine, warm, intimate MSA VO L1–L5 from §6.4 (for the 8 s primary: **L1 + L2/L3 compressed + L5**; full five lines for the 13 s cut) plus a documented Khaleeji-spoken variant. Cultural sign-off feeds back into `10-music-sound-design.md`. |
| **Gate / exit** | Arabic is correct, elegant فصحى (no machine-translation artifacts, no Darija/Egyptian slang in the Saudi primary cut); every line legible sound-off; cultural QA passes (modest, aspirational, no alcohol/immodesty/religious-decoration/fear-mongering/fake-medical cues); overlays sit inside the safe margins (top ~14% / bottom ~20%). |
| **Failure & rollback** | Any awkward or incorrect Arabic → rewrite via `20`. Any cultural violation flagged by `21` → block and rewrite; a run cannot pass Stage 9 with an unresolved cultural flag. |

---

## 10. Stage 10 — Consistency & Negatives

| Field | Detail |
|-------|--------|
| **Goal** | Lock brand DNA and the immutable product identity across every frame, and compile the negative prompt that suppresses AI artifacts. |
| **Skills** | `22-brand-guardian` (palette/type/tone/DNA), `23-product-consistency-guard` (bottle/label/cap/liquid lock), `24-negative-prompt-builder` (master + scene negatives). |
| **Inputs** | `06-scene-direction-pack.md`, `05`, `07`, `08`, `10`, the §4 lock, `prompt-builders/`. |
| **Outputs** | `09-consistency-negative-lock.md`: the brand DNA lock (garnet `#8E1B1E` / deep garnet `#6E1214` / cream `#FAF6F1` / white `#FFFFFF` / brown ink `#2A1A16` / soft brown `#6B564E` / gold `#C9A227` / sage `#4A6741`; El Messiri + Tajawal; warm Moroccan-heritage-meets-Gulf mood) and the **product lock verbatim from §4** — clear rounded-rectangular PET ~250 ml, matte **white ribbed screw cap** (never gold, never black), **translucent deep garnet/ruby-red oil** (never orange/brown/pink), white rounded-square label with red top band reading **«زيت المشاط»** largest / **«الأحمر للشعر»** (*al-aḥmar lish-shaʿr*, "the red, for hair") beneath / three taglines **«نعومة وديمومة»** (*nuʿūma wa-daymūma*, "softness and lasting-ness") · **«تغذية للشعر»** (*taghdhiya lish-shaʿr*, "nourishment for hair") · **«تقوية وتطويل الشعر»** (*taqwiya wa-taṭwīl ash-shaʿr*, "strengthening and lengthening the hair"), and the gold circular **«طبيعي 100%»** (*ṭabīʿī 100%*, "100% Natural") seal in the upper corner. The **master negative core** from §6.6 is embedded and always applied: *plastic/waxy skin, AI sheen, extra fingers/arms, malformed hands, warped face, uncanny/dead eyes, stiff mannequin motion, forced smile, morphing bottle, warped/altered label or logo, wrong/gibberish Arabic, mismatched cap colour, liquid colour shift, floating objects, fake/detached shadows, flicker, frame jitter, temporal warping, oversaturation, HDR halos, CGI look, low-res/plastic hair, banding, watermark, subtitles burn-in.* |
| **Gate / exit** | The product lock matches §4 field-for-field (vessel, cap, liquid, label wording/layout, seal); no brand-off colour or font; the negative prompt contains the full §6.6 core plus any scene-specific additions; nothing in the direction pack contradicts a lock. |
| **Failure & rollback** | A single lock mismatch (e.g. a gold cap, an opaque or orange liquid, altered label text, an English brand name) → hard block; correct the offending direction in Stage 8 and re-verify. Missing negative → recompile before proceeding. |

---

## 11. Stage 11 — Prompt Compile & Optimize

| Field | Detail |
|-------|--------|
| **Goal** | Fuse the entire package into **exactly one** model-ready generation prompt for the 8 s primary cut, optimized for adherence and within the model's length ceiling. |
| **Skills** | `26-kie-prompt-builder` (compiles the single Kie / Veo-3-class prompt from the adapter), `25-prompt-optimizer` (compress, structure, fit length, maximize adherence). |
| **Inputs** | `05-storyboard-beat-sheet.md`, `06-scene-direction-pack.md`, `07-arabic-overlays.md`, `08-arabic-voice-over.md`, `09-consistency-negative-lock.md`, `10-music-sound-design.md`, `config/model-adapters.yaml` (Kie default). |
| **Outputs** | `11-compiled-kie-prompt.md`: **one** structured prompt encoding the continuous 8 s beat sheet, per-beat camera/light/motion/hair/human/env/oil direction, the §4 product lock, the RTL overlays and VO cues, music/sound, format (9:16, 1080×1920+, 24–30 fps, safe margins top ~14% / bottom ~20%), and the §6.6 negative block. |
| **Gate / exit** | **Exactly one prompt** (not a shot-by-shot list of separate generations); within the adapter's prompt-length ceiling; every lock, overlay, VO cue, and negative present; the prompt renders the §6.1 beats as one continuous take. |
| **Failure & rollback** | Prompt overruns the length ceiling → `25` compresses without dropping a lock or a negative. Prompt implies more than one generation for the primary cut → recompile as one. Any lock/negative silently dropped in compression → rebuild. |

---

## 12. Stage 12 — Quality Gate & Cost Decision

| Field | Detail |
|-------|--------|
| **Goal** | Score the compiled prompt on all 10 axes, run the Green-Light Checklist, make the single-generation cost decision, **then and only then generate once**, run post-gen scene QA, and log to memory. |
| **Skills** | `27-quality-checker` (pre- and post-gen QA vs. `quality/` checklists), `28-creative-scoring-engine` (final 10-axis score), `29-cost-optimizer` (single-gen vs. stitch, scene-regen policy). |
| **Inputs** | `11-compiled-kie-prompt.md` + the full package; `quality/scoring-rubric.md`; `config/model-adapters.yaml`; `config/studio.config.yaml`. |
| **Outputs** | `12-quality-gate-scorecard.md` — the 10-axis score (**Realism · Marketing/Conversion · Luxury feel · Storytelling · Branding · Culture/Localization · Product consistency · Video rhythm/retention · Hook strength · Technical/prompt soundness**) with per-axis evidence, requiring **≥ 95 weighted and no axis < 90**. `13-cost-decision-memory-log.md` — the single-generation decision, the scene-regen policy, and the entry written to `memory/` (creative + campaign memory). Post-gen, `27` runs **scene QA** on the delivered 8 s cut. |
| **Gate / exit** | **Pre-gen:** score ≥ 95, no axis < 90, and the Green-Light Checklist (§14) is 100% true → emit **one** Kie call. **Below threshold → auto-improve the responsible upstream artifact, re-score, never generate.** **Post-gen:** scene QA passes → ship; else enter the cost-control loop (§13). |
| **Failure & rollback** | Pre-gen shortfall → route the failing axis to its owning stage (e.g. Product consistency → Stage 10; Hook strength → Stage 5), fix, re-score at zero credit cost. Post-gen scene defect → §13 decides scene regen vs. justified full re-run. |

---

## 13. The cost-control loop (Priority 3 — spend like a startup)

Cost discipline is a hard rule, not a preference: **Claude does all reasoning,
scoring, and QA before any credit is spent; one optimized prompt yields one
generation; scenes are regenerated, whole videos are not.** The loop below is the
decision machine `29-cost-optimizer` runs with `27-quality-checker`.

### 13.1 Four cost states

| State | Trigger | Credits | Action |
|-------|---------|:------:|--------|
| **A — Prompt repair (no gen)** | Pre-gen score < 95, or any axis < 90, or the Green-Light Checklist is not 100% true. | **0** | Route the failing axis/check to its owning stage, auto-improve that artifact, re-score. Loop until green. **Never generate a failing prompt.** |
| **B — Stop & ship** | Score ≥ 95, no axis < 90, checklist 100%, **and** post-gen scene QA passes on all beats. | **1** (already spent) | Finalize the 8 s primary cut, write `12`/`13`, log to `memory/`. Done. |
| **C — Scene-only regeneration** | Post-gen scene QA fails on **one** (or a small, isolated set of) beat(s) — e.g. a hand artifact in RITUAL, a micro-flicker in a transition — **while the product lock, continuity engine, and the rest of the video are intact and salvageable.** | **+1 targeted** | Regenerate **only that segment** via the model's scene/segment mode, restitch into the continuous take, re-run scene QA on the patched beat and its two transition boundaries. **Never re-render the whole video.** |
| **D — Full re-run (justified only)** | The result is unsalvageable by scene regen: the **§4 product lock is broken globally** (wrong cap colour, opaque/colour-shifted liquid, altered label/logo across the video), the **wrong winning concept/hook** was shipped, the **continuity engine fails across ≥ 2 beats** (the "one unbroken take" reads as edited), or a systemic realism collapse (uncanny human/hair throughout). | **full re-gen** | Requires `29-cost-optimizer` sign-off **and** `04-creative-director` approval, plus a root-cause note identifying which stage let the defect through (so the pre-gen gate is tightened). Then rebuild from the failing stage, re-gate, generate once. |

### 13.2 When to STOP

Stop the moment State **B** is reached — do not "polish" with extra generations.
Additional credits past a passing scene QA violate Priority 3. If a stakeholder
wants a variant (e.g. the hijab/styled-hair A/B alternative or the Khaleeji VO),
that is a **new, separately-budgeted** package decision recorded in `13`, not an
uncounted re-gen of the approved cut.

### 13.3 The 13 s director's cut

The extended 13 s cut is a **2-generation stitch** (Segment A HOOK→
TRANSFORMATION 0–8.5 s, Segment B TRANSFORMATION hold + OFFER + CTA 8.5–13 s) and
is produced **only when budget explicitly allows** the second generation. Default
policy ships the **8 s primary as one generation**; `29` records the stitch
decision and its cost in `13`.

### 13.4 Regeneration budget guardrail

Scene regens are cheap but not free. If a single package needs **more than a small
handful** of scene regens, or a second full re-run, `29` escalates to State D
review — repeated scene failures usually mean an upstream (Stage 8/10) defect the
pre-gen gate should have caught, not a generation-luck problem. Fix the gate, not
the symptom.

---

## 14. Green-Light Checklist (must be 100% true before the Kie call)

The orchestrator (`00`) is **forbidden from emitting a generation call** unless
**every** box below is checked. This is a superset of the numeric gate: the score
must pass **and** each concrete lock must hold. A single unchecked box halts the
run in cost State A (zero credits).

**Scoring & taste**
- [ ] 10-axis score **≥ 95 weighted**, with **no single axis < 90** (`12-quality-gate-scorecard.md`).
- [ ] `04-creative-director` taste approval on record for the winning concept and look.

**Concept / hook consistency (Bible §8)**
- [ ] `02-concepts-scored.md` ranks **UNBROKEN THREAD** (**«القطرة التي تُعيد الحياة»**) #1.
- [ ] `03-hooks-scored.md` ranks the **Hook line** (**«كل تمشيطة… وشعرك ينقص؟»**) #1.
- [ ] The beat sheet renders the §6.1 beats and timings, summing to **8.0 s**, as one continuous take.

**Product lock (Bible §4 — field-for-field)**
- [ ] Vessel = clear rounded-rectangular PET ~250 ml, rounded shoulders, short neck, squarish body.
- [ ] Cap = **matte white ribbed screw cap, flat top** — **not gold, not black**.
- [ ] Liquid = **translucent deep garnet/ruby-red**, jewel-like, clear — **never orange, brown, or pink**.
- [ ] Label = white rounded-square, red top band, **«زيت المشاط»** largest / **«الأحمر للشعر»** beneath / three taglines / gold **«طبيعي 100%»** seal upper corner — **no altered wording, layout, or English brand name**.
- [ ] Hero-set beats use the §4 DNA (Moorish arch, garnet drape, single red hibiscus, palm frond, travertine podium, soft directional window light).

**Brand DNA**
- [ ] Palette limited to the eight §3 tokens; fonts El Messiri (display) + Tajawal (body), RTL.

**Copy & culture**
- [ ] All six overlays present, correct elegant MSA, legible sound-off, inside safe margins.
- [ ] VO matches §6.4 (8 s primary = L1 + L2/L3 compressed + L5); Khaleeji variant documented.
- [ ] `21-cultural-expert-gulf` cultural QA **PASS** — no immodesty, alcohol, religious-decoration, fear-mongering, or fake-medical cues; no machine-translation/slang in the Saudi cut.

**Offer accuracy (Bible §3 — no deviation)**
- [ ] Offer reads **3 × 250 ml = 750 ml · 139 SAR (was 185, −25%) · free shipping · cash on delivery**; CTA = **«اطلبي الآن — الدفع عند الاستلام»**; SKU `SA04050100M300`.
- [ ] **Zero** claims beyond the four §3 benefits and the LP timelines (softness/shine first use; less shedding 3–5 weeks; density 2–3 months).

**Continuity & realism**
- [ ] Continuous in-camera transitions only (drop + hair as engines); **no split-screen, no jump cut, no dissolve** that betrays generation.
- [ ] Every beat carries all seven direction layers (camera/light/motion/hair/human/env/oil) with realism guardrails stated.

**Negatives & format**
- [ ] The full §6.6 master negative core is embedded in the compiled prompt, plus any scene-specific negatives.
- [ ] Format = 9:16, 1080×1920+, 24–30 fps; sound-on designed, sound-off legible.

**Compile & cost**
- [ ] `11-compiled-kie-prompt.md` is **exactly one** prompt within the adapter's length ceiling, with every lock/overlay/VO/negative intact.
- [ ] `29-cost-optimizer` records the **single-generation** decision (8 s primary) in `13`; any stitch/variant is separately budgeted.

> If all boxes are checked and the score gate is green, `00` emits **one** Kie
> generation call. Otherwise it stays in State A and improves the responsible
> artifact — **it does not generate.**

---

## 15. Worked trace — the flagship mechat run (all 12 stages, files 00–13)

The reference run of **UNBROKEN THREAD** for **زيت المشاط الأحمر الأصلي**, one to
two lines per stage, citing the artifact each stage writes under
`examples/mechat-red-oil/`.

1. **Intake & Brief** → `00-creative-brief.md`. Extracts the four benefits, four
   ingredients (**المشاط/قشور الجوز** *al-mishāṭ / qushūr al-jawz*, "walnut husk";
   **الكركديه الأحمر** *al-karkadēh al-aḥmar*, "red hibiscus"; **الحناء الطبيعية**
   *al-ḥinnāʾ aṭ-ṭabīʿiyya*, "natural henna"; **زيوت نباتية مغذية** *zuyūt nabātiyya
   mughadhdhiya*, "nourishing plant oils"), the 139 SAR / 3-pack / COD offer, the
   palette, and the §4 product lock — no invented claims.
2. **Audience & Psychology** → opens `01-audience-psychology-strategy.md`. ICP =
   women 22–45, KSA-first; triggers hope + restored femininity (primary), heritage
   trust (secondary); the LP objection ledger mapped to levers.
3. **Strategy & Offer** → completes `01-audience-psychology-strategy.md`. Angle =
   pain → grandmothers' recipe (**وصفة الجدات** *waṣfat al-jaddāt*, "grandmothers'
   recipe") → sensory transformation; offer anchored 139 vs 185, COD/inspect-first;
   CTA and the Scroll-Stop→ROAS metric ladder locked.
4. **Concept Generation & Scoring** → `02-concepts-scored.md`. 20 concepts scored;
   **#1 = «القطرة التي تُعيد الحياة» / UNBROKEN THREAD** — before/after inside one
   continuous move, drop + strand as engines; `04` approves.
5. **Hook Generation & Scoring** → `03-hooks-scored.md`. 20 hooks scored; **#1 =
   «كل تمشيطة… وشعرك ينقص؟»** — the slow-mo strand slipping off the ivory comb.
6. **Transition Design** → `04-transition-set.md`. 30 transitions → the continuous
   chain (strand→drop ripple → oil dive → scalp → hair-wipe → highlight-bloom),
   fully in-camera, no split screen.
7. **Storyboard** → `05-storyboard-beat-sheet.md`. The §6.1 8 s beat sheet
   HOOK→DISCOVERY→RITUAL→TRANSFORMATION→OFFER, timings summing to 8.0 s, with the
   13 s director's cut annotated as an optional 2-gen stitch.
8. **Scene Direction** → `06-scene-direction-pack.md` (and seeds
   `10-music-sound-design.md`). Per-beat camera/light/motion and the realism
   directors' guardrails on hair, human, environment, and the garnet oil; hero-set
   beats on §4 DNA.
9. **Copy & Localization** → `07-arabic-overlays.md` + `08-arabic-voice-over.md`.
   The six locked RTL overlays and the L1/L2–L3/L5 MSA VO for the 8 s cut, Khaleeji
   variant documented; `21` returns a cultural **PASS**.
10. **Consistency & Negatives** → `09-consistency-negative-lock.md`. Brand palette/
    type lock, the §4 product lock verified field-for-field (white ribbed cap,
    jewel-red liquid, exact label wording + gold **«طبيعي 100%»** seal), and the
    full §6.6 negative core embedded.
11. **Prompt Compile & Optimize** → `11-compiled-kie-prompt.md`. `26` + `25`
    compile **one** Kie prompt for the 8 s primary — continuous beats, all seven
    direction layers, locks, overlays, VO cues, 9:16/1080×1920+/24–30 fps, and the
    negative block — inside the adapter length ceiling.
12. **Quality Gate & Cost Decision** → `12-quality-gate-scorecard.md` +
    `13-cost-decision-memory-log.md`. 10-axis score **≥ 95, no axis < 90**;
    Green-Light Checklist 100%; `29` records the **single-generation** decision →
    `00` emits **one** Kie call; post-gen scene QA passes; the entry is written to
    `memory/`. Ship.

---

*AI Ads Studio — reason like a $500k creative agency, spend like a startup. Never
send a prompt to a video model until every quality gate is green.*
