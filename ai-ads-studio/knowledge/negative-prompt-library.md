# Negative-Prompt Library — Anatomy · Product/Label · Text & Arabic · Temporal/Consistency · Render/Quality · Culture
### (The master §6.6 core, six categorized negative lists with the "why," ready-to-copy strings, the governing-tension cautions, and per-model syntax for Kie Veo3 · Kling · Runway Gen-3 · PixVerse — mapped to UNBROKEN THREAD)

> **Knowledge base article — reference material, not a skill.** Dense, scannable, ready-to-copy
> negative-prompt shelf for **`24-negative-prompt-builder`** (the compiler of record for every
> run — this library reproduces and extends its Output 24.2–24.5 tables as a standing,
> copy-paste-ready reference rather than a per-run compile) and its four realism/culture sources
> — **`16-hair-realism-director`, `17-human-realism-director`, `18-environment-realism-director`,
> `19-oil-product-realism-director`** (anatomy/product/render tokens), **`20-arabic-copywriter` /
> `21-cultural-expert-gulf`** (Text & Arabic / Culture tokens), **`22-brand-guardian` /
> `23-product-consistency-guard`** (product/label verification) — plus **`25-prompt-optimizer` /
> `26-kie-prompt-builder`** (who paste the compiled strings verbatim into a model's negative
> field) and **`27-quality-checker`** (who reads token coverage as Realism / Product-consistency /
> Culture-Localization / Technical-soundness axis evidence). Grounded in `STUDIO-BIBLE.md` §0
> (Realism ranks priority #1), §3 (product facts, claims, offer), §4 (the immutable product
> lock), §5 (culture/platform forbid floor), §6 (the flagship **UNBROKEN THREAD** — §6.1 beat
> sheet and its four named transitions, §6.6 the master negative core), §7 (the 10-axis quality
> gate). **When this document and the Bible disagree, the Bible wins.** Nothing below invents a
> product claim or a new lock detail — every token traces to Bible §4/§5/§6.1/§6.6,
> `config/brand/mechat-red-oil.brand.yaml`, `config/model-adapters.yaml`, `config/markets.yaml`,
> `config/studio.config.yaml`, `PIPELINE.md` §8–§10, or `skills/24-negative-prompt-builder/SKILL.md`'s
> own authored Output blocks.

**How this differs from skill 24:** `24-negative-prompt-builder` is the *reasoning* skill — it
runs once per creative pass, reads the live upstream locks (scene direction, Arabic copy,
cultural QA, brand DNA), and emits ONE compiled string for that specific run. This document is
the *standing shelf* those runs (and every realism/culture skill) pull from: the categorized
"why" behind each token, ready-to-paste category and full-master strings for fast manual use,
and a per-model syntax cheat sheet — static craft knowledge, not a per-run artifact. Recompile
per-run negatives from skill 24; reach for this document to understand or hand-author one.

---

## 1. How to use this library

1. **The master core (§2) is the floor — always included, every draw, every model, every
   re-roll.** Never remove a token from it; never reword it beyond the one permitted
   normalization (§2.1).
2. **The six categories (§3) add context-specific tokens on top of the floor.** Each category
   table gives Token → Why (the failure mode it suppresses) → Source (the Bible section, config
   field, or upstream skill that grounds it). Nothing is invented; if you can't cite it, don't
   ship it.
3. **Copy at whatever grain you need:** a single category string for a targeted re-roll (e.g. a
   scalp macro shot only needs Anatomy/Human + Render/Quality), or the full pre-assembled
   flagship string (§6) for a first-pass generation.
4. **Read the governing-tension table (§4) before adding any token near an intended in-camera
   device.** The flagship's four transitions (drop-morph, dive-into-pour, hair-wipe, light-bloom,
   Bible §6.1) and its own transformation arc sit close enough to the negative vocabulary that a
   literal-minded copy-paste can accidentally forbid the ad's best moments. A missing negative is
   a *risk*; a self-defeating negative is a *certainty* — check §4 first.
5. **Match the string to the model's field, not its paragraph (§5).** Every matrix model has a
   dedicated negative field or channel; negatives are never inlined into a positive prompt. The
   *content* is identical across `kie_veo3` / `kie_veo3_fast` / `kling` / `runway_gen3`; only
   `pixverse` needs the priority-trimmed subset (§5, §6.4).
6. **A stale string is a Stage 10 gate failure, not a minor drift.** Recompile whenever the scene
   direction, Arabic copy, cultural QA, or brand-DNA lock changes (PIPELINE.md §9–§10) — see §8.

---

## 2. Master negative-prompt core — Bible §6.6, verbatim

**Quoted exactly as written in `STUDIO-BIBLE.md` §6.6** (including its one stray character):

> `plastic/waxy skin, AI sheen, extra fingers, extra arms, malformed hands, warped face, uncanny
> eyes, dead stare, stiff mannequin motion, weird/forced smile, morphing bottle,
> changing/!warped label, altered logo, wrong Arabic, gibberish text, mismatched cap color,
> liquid color shift, floating objects, fake/detached shadows, flicker, frame jitter, temporal
> warping, oversaturation, HDR halos, CGI look, low-res hair, plastic hair, banding, watermark,
> subtitles burn-in.`

Applied to **every draw and every re-roll, always** (Bible §6.6, §9; `config/studio.config.yaml
negatives.apply_to_every_draw: true`). It is a stable cached sub-string, reused byte-identical
across every beat and every model (`studio.config.yaml cached_descriptors: master_negatives_core`).

### 2.1 The one permitted normalization

`24-negative-prompt-builder` (Output 24.2) already identified and fixed the Bible's one evident
stray character — `changing/!warped label` — rendering it **`changing/warped label`**. This is
consistent with `config/studio.config.yaml`'s own §6.6 summary comment, which already writes
"changing/warped label" with no `!`. Every other token is quoted **exactly** as the Bible wrote
it, including compound tokens other files paraphrase for brevity (`weird/forced smile` and
`low-res hair, plastic hair` stay as written — not summarized to "forced smile" / "low-res/plastic
hair"). **Production-ready normalized string** (use this one when pasting into a model field):

> `plastic/waxy skin, AI sheen, extra fingers, extra arms, malformed hands, warped face, uncanny
> eyes, dead stare, stiff mannequin motion, weird/forced smile, morphing bottle, changing/warped
> label, altered logo, wrong Arabic, gibberish text, mismatched cap color, liquid color shift,
> floating objects, fake/detached shadows, flicker, frame jitter, temporal warping,
> oversaturation, HDR halos, CGI look, low-res hair, plastic hair, banding, watermark, subtitles
> burn-in.`

### 2.2 The 30 tokens, sorted into the six categories

| # | §6.6 token | Category |
|---|---|---|
| 1 | plastic/waxy skin | Anatomy/Human |
| 2 | AI sheen | Anatomy/Human |
| 3 | extra fingers | Anatomy/Human |
| 4 | extra arms | Anatomy/Human |
| 5 | malformed hands | Anatomy/Human |
| 6 | warped face | Anatomy/Human |
| 7 | uncanny eyes | Anatomy/Human |
| 8 | dead stare | Anatomy/Human |
| 9 | stiff mannequin motion | Anatomy/Human |
| 10 | weird/forced smile | Anatomy/Human |
| 11 | low-res hair | Anatomy/Human |
| 12 | plastic hair | Anatomy/Human |
| 13 | morphing bottle | Product/Label *(cross-listed → Temporal/Consistency)* |
| 14 | changing/warped label *(normalized)* | Product/Label *(cross-listed → Temporal/Consistency)* |
| 15 | altered logo | Product/Label *(cross-listed → Temporal/Consistency)* |
| 16 | mismatched cap color | Product/Label *(cross-listed → Temporal/Consistency)* |
| 17 | liquid color shift | Product/Label *(cross-listed → Temporal/Consistency)* |
| 18 | wrong Arabic | Text & Arabic |
| 19 | gibberish text | Text & Arabic |
| 20 | subtitles burn-in | Text & Arabic |
| 21 | flicker | Temporal/Consistency |
| 22 | frame jitter | Temporal/Consistency |
| 23 | temporal warping | Temporal/Consistency |
| 24 | floating objects | Render/Quality |
| 25 | fake/detached shadows | Render/Quality |
| 26 | oversaturation | Render/Quality |
| 27 | HDR halos | Render/Quality |
| 28 | CGI look | Render/Quality |
| 29 | banding | Render/Quality |
| 30 | watermark | Render/Quality |

**Culture carries zero §6.6 tokens.** The master anti-artifact core guards *generation*
failures; cultural risk is a *content* question governed entirely by Bible §5 and
`config/markets.yaml shared.forbid_floor` — see §3.6.

---

## 3. The six categories — negatives + why

Each category below lists its §6.6 base (from §2.2), its extended/instantiated tokens with a
cited "why," and a ready-to-copy comma string. Extended tokens never introduce a new *kind* of
failure the base token didn't already name — they make the base token concrete enough for a
video model's negative-field matcher to act on.

### 3.1 Anatomy / Human — protects Realism, priority #1 (Bible §0)

The single highest-risk artifact surface in the whole cut: this category is the literal subject
of the RITUAL beat's macro fingertip-massage close-up and the TRANSFORMATION beat's
over-the-shoulder turn with "a real blink and breath" (Bible §6.1; PIPELINE.md §8).

**Base tokens (12, §6.6):**

| Token | Why |
|---|---|
| plastic/waxy skin | The single most common AI "tell" — over-smoothed, pore-less skin reads as rendered, not filmed |
| AI sheen | A uniform, unnatural gloss/glow no practical light source would produce |
| extra fingers | The classic hand-generation failure; catastrophic at the RITUAL beat's macro fingertip framing |
| extra arms | A duplicate limb — a gross anatomical failure with no forgiving read |
| malformed hands | Fused/twisted/wrong-jointed hands — guards the bottle-lifting hand (DISCOVERY) and massaging fingertips (RITUAL) |
| warped face | Asymmetric or geometry-broken features — breaks the TRANSFORMATION beat's close turn to camera |
| uncanny eyes | Dead, mismatched, or unnaturally reflective eyes — kills the "real blink and breath" mandate (PIPELINE.md §8) |
| dead stare | A frozen, emotionless gaze — the opposite of the model's "calm confidence" (Bible §5) |
| stiff mannequin motion | Robotic, physically implausible motion — breaks the "one unbroken cinematic movement" premise (Bible §6) |
| weird/forced smile | An asymmetric or unmotivated smile — the beat sheet calls for a "soft authentic micro-smile" |
| low-res hair | Blurry, texture-less hair — hair is the hero of the ad (Bible §5); it cannot ship soft |
| plastic hair | Helmet-like, clumped, CG-looking hair with no strand separation |

**Extended (instantiated) tokens** — grounds: `16-hair-realism-director`'s strand-separation
mandate, `17-human-realism-director`'s natural-hands/living-eyes mandate (PIPELINE.md §8):

| Token | Instantiates | Why |
|---|---|---|
| six-fingered hand, fused or webbed fingers, extra knuckle | malformed hands, extra fingers | Names the literal render failure so the negative field has a concrete match, not an abstract label |
| asymmetric or misaligned eyes, unnatural eye reflections, frozen unblinking gaze | uncanny eyes, dead stare | Protects the exact "real blink and breath" guardrail PIPELINE.md §8 assigns to `17` for the TRANSFORMATION beat |
| robotic or floating head turn, unnatural neck bend | stiff mannequin motion | Names the specific failure risk on the over-the-shoulder turn (Bible §6.1) |
| doll-like pore-less skin, over-smoothed skin texture, beauty-filter cast | plastic/waxy skin, AI sheen | Protects `17`'s "warm-toned no-makeup skin" mandate — the model must render texture, not a filter |
| clumped or helmet-like hair, strands merging into a single mass, hair clipping through fabric or shoulder | low-res hair, plastic hair | Protects `16`'s strand-separation mandate at the RITUAL glide-down and the TRANSFORMATION shoulder turn |
| teeth artifacts, misaligned jaw on smile | weird/forced smile | Names the common jaw/teeth-geometry failure on a closed or half-open smile |

**Ready to copy (Anatomy/Human, full category):**

> `plastic or waxy skin, AI sheen, extra fingers, six-fingered or fused or webbed fingers, extra
> knuckle, extra arms, malformed hands, warped or asymmetric face, uncanny eyes, asymmetric or
> misaligned eyes, unnatural eye reflections, dead stare, frozen unblinking gaze, stiff mannequin
> motion, robotic or floating head turn, unnatural neck bend, weird or forced smile, teeth
> artifacts, misaligned jaw on smile, doll-like pore-less skin, over-smoothed skin texture,
> beauty-filter cast, low-res hair, plastic hair, clumped or helmet-like hair, strands merging
> into a single mass, hair clipping through fabric or shoulder.`

### 3.2 Product / Label — protects the Bible §4 hard lock

The most-enforced axis in the studio; cross-checked field-for-field against
`config/brand/mechat-red-oil.brand.yaml product_lock`. Guards the bottle through every beat it
appears in: DISCOVERY (lift, label to camera), RITUAL (implied), OFFER + CTA (orbit + the
one-to-three-bottle pack reveal).

**Base tokens (5, §6.6, cross-listed with 3.4 Temporal/Consistency):** morphing bottle,
changing/warped label, altered logo, mismatched cap color, liquid color shift.

**Extended tokens** — grounds: `brand.yaml product_lock.immutables`, field-for-field:

| Token | Guards field | Why |
|---|---|---|
| gold or black cap, glossy cap finish | `cap.forbidden_colors` | The cap is matte white only — brand.yaml names gold and black as the two explicit forbidden colors (Bible §4) |
| tall cylindrical bottle shape, frosted or opaque glass | `vessel.shape` / `material` | The vessel is clear, rounded-rectangular, squarish — never a tall cylinder, never frosted (Bible §4) |
| opaque liquid, liquid turning orange, liquid turning brown, liquid turning pink | `liquid.never_shifts_to` | The exact three forbidden drift directions the Bible names — this garnet red never shifts (Bible §4) |
| extra label text, redesigned label layout, relocated or resized seal, English brand name printed on the bottle | `label.immutables` | The label's wording, hierarchy, and the gold «طبيعي 100%» (*ṭabīʿī 100%*, "100% Natural") seal position are locked field-for-field; no English brand name ever appears (Bible §4) |
| duplicated or missing bottle in the pack reveal | Bible §6.1 OFFER beat | Protects the exact one-bottle-to-three-bottle orbit choreography — not two, not four bottles |

**Ready to copy (Product/Label, full category):**

> `morphing bottle, changing or warped label, altered logo, mismatched cap color, gold or black
> cap, glossy cap finish, tall cylindrical bottle shape, frosted or opaque glass, opaque liquid,
> liquid color shift, liquid turning orange, liquid turning brown, liquid turning pink, extra
> label text, redesigned label layout, relocated or resized seal, English brand name on bottle,
> duplicated or missing bottle in the pack reveal.`

### 3.3 Text & Arabic — protects §6.6's `wrong Arabic, gibberish text, subtitles burn-in`

No matrix model reliably typesets legible Arabic RTL script
(`config/model-adapters.yaml text_in_frame_reliability: "low"` on every model). The studio's real
defense is architectural, not just a negative: every overlay (Bible §6.3) and VO line (Bible
§6.4) is composited **in post** in El Messiri / Tajawal, RTL, never left to the model
(`model-adapters.yaml studio_requirements.onscreen_text_authoring`).

**Base tokens (3, §6.6):** wrong Arabic, gibberish text, subtitles burn-in.

**Generation-side suppression — the single highest-leverage token in this category** (because the
overlays are post-composited, the best defense is stopping the model from attempting on-screen
text at all):

> `no on-screen text rendered by the model, no signage or background text with legible
> characters, no watermark, no subtitle burn-in.`

**Extended kill-list** — protects the post-typesetting QA gate (PIPELINE.md §9: *"Arabic is
correct, elegant فصحى [fuṣḥā, formal/Modern Standard Arabic]… no Darija/Egyptian slang in the
Saudi primary cut… overlays sit inside the safe margins"*):

| Token | Why |
|---|---|
| mistranslated or paraphrased overlay text | The six overlays (Bible §6.3) are locked lines, not a paraphrase target |
| wrong Arabic diacritics | Diacritic errors change meaning or read as illiterate on premium creative |
| incorrect gender agreement | The CTA and every VO line address a woman in the feminine imperative («اطلبي», *uṭlubī*, "order [f.]") — a masculine slip is a jarring localization failure |
| reversed or mirrored Arabic digits | A rendering failure specific to RTL scripts mixed with numerals (the price, «139») |
| Latin characters mixed into Arabic script | Breaks legibility and reads as a machine-translation artifact |
| broken letter-joining, disconnected Arabic glyphs, isolated-form letters used mid-word | Arabic script is cursive and contextual; broken joining is an instant "fake Arabic" tell |
| dialect wording burned into an on-screen overlay | Overlays are locked elegant MSA only, never dialect (Bible §5) |
| Egyptian-slang or Darija VO in the KSA primary cut | Direct PIPELINE.md §9 gate rule — the primary Saudi cut stays in clean MSA |
| overlay text inside the top-~14% / bottom-~20% safe zone | UI/platform chrome occludes text placed there (Bible §5) |
| low-contrast overlay text | Fails "legible sound-off," the design mandate for every cut (Bible §5) |
| overlay overlapping the model's face or eyeline at the keeper frame | A basic legibility and taste failure on a beauty close-up |
| duplicated or extra Arabic text not present in the locked line | Any text beyond the six locked overlays (Bible §6.3) is unauthorized |
| wrong currency glyph | The locked offer overlay uses **﷼** (U+FDFC), never "SAR" spelled out or a generic "$" (Bible §6.3, `cta.offer_overlay_ar`) |
| non-western numerals in a price/CTA context | The studio's numeral convention for price/CTA is western digits (0–9), not Eastern Arabic-Indic numerals |
| machine-translated cadence, calque phrasing | Protects "no awkward machine translation, ever" (Bible §5) |
| missing transliteration or gloss on a newly introduced Arabic line | Every new Arabic line needs a Latin transliteration + English gloss on first use (Bible §2) — a documentation-side negative, not a render-side one, but tracked here for completeness |

**Typography cross-ref** (font system is closed-set, Bible §3): `Latin-only sans substituted for
Arabic overlay type, a third font, a decorative or script face.`

**Reference — what the kill-list protects (not a negative; the positive target):** the six locked
§6.3 overlays, e.g. Hook «كل تمشيطة… وشعرك ينقص؟» (*kull tamshīṭa… wa-shaʿruki yanquṣ?*, "Every
comb stroke… and your hair keeps thinning?") and CTA «اطلبي الآن — الدفع عند الاستلام» (*uṭlubī
al-ān — ad-dafʿ ʿind al-istilām*, "Order now — Cash on delivery"). Every token above exists to
keep these exact six lines from drifting.

**Ready to copy (Text & Arabic, full category):**

> `wrong Arabic, gibberish text, subtitles burn-in, no on-screen text rendered by the model, no
> signage or background text with legible characters, watermark, mistranslated or paraphrased
> overlay text, wrong Arabic diacritics, incorrect gender agreement, reversed or mirrored Arabic
> digits, Latin characters mixed into Arabic script, broken letter-joining, disconnected Arabic
> glyphs, isolated-form letters mid-word, dialect wording in an overlay, Egyptian-slang or Darija
> VO in the Saudi cut, overlay text inside the top-14%-or-bottom-20% safe zone, low-contrast
> overlay text, overlay overlapping the face or eyeline, duplicated or extra Arabic text, wrong
> currency glyph, non-western numerals in a price context, machine-translated cadence, calque
> phrasing, Latin-only font substituted for Arabic, decorative or script font.`

### 3.4 Temporal / Consistency — protects the "one unbroken take" read

The flagship's entire competitive edge is that before/after happens *inside one continuous
camera move*, not a cut or a split screen (Bible §6). This category also protects the
deterministic prompt cache (`config/studio.config.yaml cached_descriptors:
master_negatives_core` — byte-identical across every beat and re-roll).

**Base tokens (3, §6.6):** flicker, frame jitter, temporal warping — **plus the 5 product-lock
tokens cross-listed from §3.2**, because a bottle that changes cap color or label mid-cut is
*both* a product-identity failure and a cross-frame-consistency failure.

**Extended tokens:**

| Token | Why |
|---|---|
| character identity drift across beats (face shape, skin tone, or apparent age shifting beat-to-beat) | Scoped to **unintended** drift only — never to the intentional hair-density/length change that IS the TRANSFORMATION beat's payoff (Bible §6.1). See §4, this is the single easiest self-defeating negative to write |
| wardrobe color or fabric drift between beats | The modest wardrobe (cream/garnet/gold, Bible §5) must read as one continuous outfit across the whole 8 s move |
| unmotivated lighting or color-temperature jump between beats | Protects `13-lighting-director`'s continuous warm-directional grade (PIPELINE.md §8) — the light source never resets |
| continuity break at a transition seam | Protects the four named in-camera devices (drop-morph, dive-into-pour, hair-wipe, light-bloom, Bible §6.1) from reading as edited cuts instead of one camera move |
| seed or framing drift on a re-roll | Protects the deterministic surgical-re-roll requirement — a re-rolled beat must reproduce identical framing/lock (`model-adapters.yaml supports_seed: true` on every matrix model) |

**Ready to copy (Temporal/Consistency, full category):**

> `flicker, frame jitter, temporal warping, morphing bottle, changing or warped label, altered
> logo, mismatched cap color, liquid color shift, unintended character identity drift across
> beats, wardrobe color or fabric drift between beats, unmotivated lighting or
> color-temperature jump between beats, continuity break at a transition seam, seed or framing
> drift on a re-roll.`

### 3.5 Render / Quality — protects Bible §5's technical floor + §6.6's generic anti-artifact tokens

**Base tokens (7, §6.6):** floating objects, fake/detached shadows, oversaturation, HDR halos,
CGI look, banding, watermark.

**Extended tokens:**

| Token | Why |
|---|---|
| unnatural or blown highlight bloom | Instantiates HDR halos, **scoped to exclude** the intentional golden light-bloom that closes TRANSFORMATION and opens OFFER (Bible §6.1) — see §4 |
| compression artifacts, macro-blocking | Generic delivery-quality failures that read as low-budget, breaking the Luxury-feel gate axis (Bible §7) |
| letterboxing or pillarboxing | The format is 9:16 full-bleed, always, no exceptions (Bible §5) |
| resolution below 1080×1920, frame rate outside the 24–30 fps band | Mandatory whenever the target model's `resolution.meets_floor` is false/conditional (`runway_gen3`; PixVerse's fast tiers) — the studio's format floor never bends per-model (Bible §5) |
| off-palette accent color in a flat graphic element | The frame's only two saturated jewel notes are garnet and gold (Bible §3); a third loud color is a brand violation as much as a render defect |
| unnatural or CGI-looking liquid physics on the oil drop, pour, or ripple | Protects `19-oil-product-realism-director`'s photoreal mandate — the garnet oil drop/pour/ripple is the transition **engine** of the whole concept (Bible §6.1) and cannot look simulated |

**Ready to copy (Render/Quality, full category):**

> `floating objects, fake or detached shadows, oversaturation, HDR halos, unnatural or blown
> highlight bloom, CGI look, banding, watermark, compression artifacts, macro-blocking,
> letterboxing or pillarboxing, resolution below 1080x1920, frame rate outside 24-30 fps,
> off-palette accent color, unnatural or CGI-looking liquid physics on the oil drop pour or
> ripple.`

### 3.6 Culture — protects Bible §5's forbid floor (§6.6 carries none of these tokens)

Sourced entirely from Bible §5 and `config/markets.yaml shared.forbid_floor`, the studio's
authoritative, more granular restatement (8 items vs. the Bible's 5-item summary — per-market
`taboos` may only *add* to this floor, never remove from it).

**Base tokens (8, Bible §5 / markets.yaml forbid_floor):**

| Token | Why |
|---|---|
| alcohol cues (bottles, bars, toasting, wine tones read as alcohol) | Hard Gulf cultural forbid, every market |
| immodesty / provocative framing / skin exposure beyond face, hands, or hair | The ad is elegant, modest, aspirational — restraint over exposure (Bible §5) |
| religious imagery used as decoration (Qur'anic text, mosque, prayer as prop) | The Moorish/mihrab arch is an architectural motif, never a devotional prop (Bible §4) |
| fear-mongering about the body (disease scare, before-shots that shame) | The pain hook stays visceral but tasteful, never medicalized or shaming |
| fake medical claims / cure language beyond the four locked benefits | Only the four Bible-locked claims (stops shedding, stimulates growth, density & length with regular use, shine & softness from first use, Bible §3) may ever be implied |
| pork or non-halal cues | Gulf culture floor |
| romantic/dating framing or intimate free-mixing of unrelated men & women | Gulf modesty floor — the ad is a solo woman ritual, always |
| disrespect to national symbols, flags, or leadership | Regional law/etiquette floor |

**Extended tokens:**

| Token | Why |
|---|---|
| exposed skin beyond face, hands, or hair | Instantiates the immodesty forbid to a literal render-time check |
| unrelated man or ambiguous second person in frame | Instantiates the free-mixing forbid |
| Qur'anic calligraphy, prayer rug, minbar, qibla-direction staging, call-to-prayer audio cue | Protects the mihrab-arch hero set's status as architecture-only (Bible §4) |
| national symbol or flag misuse | Instantiates the national-symbol forbid |
| interest-bearing financing language | Protects the COD/inspect-before-pay framing (Bible §3) from any usury-adjacent slip — the offer is cash on delivery, never installment/interest language |
| countdown timer, "offer ends today" language, or a scarcity graphic | Manufactured urgency reads as fear-mongering-adjacent pressure — not part of the locked offer framing (Bible §3, §6.3) |
| exaggerated before/after that shames the woman's real hair | Direct quote of the KSA-specific taboo add in `markets.yaml` — protects the fear-mongering forbid from a literal split-screen shame frame |

**Ready to copy (Culture, full category):**

> `alcohol cues, immodesty, exposed skin beyond face hands or hair, provocative framing,
> religious imagery as decoration, Quranic calligraphy, prayer rug, minbar, qibla-direction
> staging, call-to-prayer audio cue, fear-mongering, exaggerated before-after that shames real
> hair, fake medical claims, cure language, pork or non-halal cues, romantic or dating framing,
> unrelated man in frame, disrespect to national symbols or flags, national symbol misuse,
> interest-bearing financing language, countdown timer, offer-ends-today language, scarcity
> graphic.`

---

## 4. Governing-tension cautions — never suppress an intended device

The Bible's own negative core (§6.6) and its own beat sheet (§6.1) sit close enough that a
literal-minded copy-paste can accidentally forbid the ad's best moments. Hold this table before
adding **any** token that echoes one of the flagship's four named transitions or its
transformation arc. This is `24-negative-prompt-builder`'s own governing-tension check, restated
here as a standing caution because it applies every time this library is used, not just inside a
skill-24 run.

| # | Near-miss negative | What it must suppress | What it must NOT suppress | Resolution |
|---|---|---|---|---|
| 1 | `morphing bottle` | The bottle's physical identity changing shape, proportion, or geometry mid-shot | The **oil-drop liquid match-morph** at 1.2–1.6 s — the transition *engine* of the entire concept (Bible §6.1) | The token names the *bottle*, not the *liquid* — scope it to the vessel object only |
| 2 | `HDR halos` / `unnatural blown highlight bloom` | Blown, artificial, over-processed highlight clipping | The **golden light-bloom** closing TRANSFORMATION and opening OFFER (Bible §6.1) | Worded "**unnatural**/blown," not "no bloom" — the one designed bloom is a controlled, motivated highlight |
| 3 | `character identity drift across beats` | Unintended per-frame drift — skin tone flicker, wardrobe color jump, face shape sliding | The **entire premise of the ad**: hair visibly becoming denser, longer, and more luminous from RITUAL to TRANSFORMATION (Bible §6.1) | Scope explicitly to *unintended* drift (face/skin tone/age), never to the intentional hair-density/length payoff |
| 4 | `temporal warping` | Glitchy, non-physical time distortion | The deliberate **slow-motion** on the falling strand and the oil pour (Bible §6.1; motion-director speed ramps) | The token forbids *warping*, not *ramping* — a controlled speed change is not warping |

**Rule of thumb:** a missing negative is a probabilistic risk; a self-defeating negative is a
guaranteed failure discovered only after a wasted generation credit (Bible §0 priority #3, cost
discipline). When in doubt, scope the wording narrower — never drop the token outright.

---

## 5. Per-model negative-field notes — Veo3 (Kie) vs Kling vs Runway Gen-3 vs PixVerse

The compiled **content** from §3 is identical across every model in the matrix. Only the
**container** and, for one model, the **length** change (`config/model-adapters.yaml
prompt_dialect.negatives`).

| Model | Studio role | Negative field / container | Positive prompt style (context) | Content vs. master | Special notes |
|---|---|---|---|---|---|
| **`kie_veo3`** (Veo 3 via Kie AI) — **PRIMARY** | primary, single-generation flagship target | Dedicated `negative_prompt` field | Natural-language cinematic paragraph | Full compiled string, no trim | Never inline negatives into the positive paragraph — this is a Failure Condition, not a style choice |
| **`kie_veo3_fast`** | fallback-1 / draft-only pre-viz | Same field, same dialect family as `kie_veo3` | Same paragraph style, slightly simplified | Full compiled string, no trim | A promoted draft carries the negative content unmodified into the paid `kie_veo3` master |
| **`kling`** (Kuaishou) | fallback-2 / segment-renderer (best stitch seam via start+end frame conditioning) | Kling's own dedicated negative field | Structured fields (subject/action, camera, motion strength) | Full compiled string, no trim | The positive prompt is structured, but the negative field still takes a flat comma-clause list — do not structure the negatives |
| **`runway_gen3`** (Alpha/Turbo) | fallback-3 / segment-renderer | Runway's negative/**exclude** channel | Structured, camera-first ("[camera movement]: [scene]. [details].") | Full compiled string, no trim, **plus a mandatory addendum** | `runway_gen3.resolution.meets_floor = false` → append `resolution below 1080x1920, upscale softness artifacts` (§3.5 already carries the base tokens; this is the model-specific top-up) |
| **`pixverse`** | fallback-4 / draft-only | Keyword-style negative field, effectively token-budget-constrained | Keyword + template selection | **Priority-trimmed subset only** (§6.4) | Never promote a PixVerse render to a shipped master, regardless of how clean the draft looks — it never clears the realism floor (`model-adapters.yaml gate_axes_best: []`) |

**Priority-trim rule** (for any model whose negative field has an effective length ceiling —
today, only `pixverse`): when the full compiled string does not fit, drop entire categories from
the bottom of this fixed order, never truncate mid-category:

1. **Anatomy/Human** — never dropped (protects Realism, priority #1)
2. **Product/Label** — never dropped (protects the Bible §4 hard lock)
3. **Culture** — never dropped (protects the Bible §5 forbid floor, an independent BLOCK gate)
4. **Text & Arabic** — keep the generation-side suppression tokens (`no on-screen text rendered
   by the model…`) always; the fine-grained kill-list may trim first in this category since the
   primary defense is post-compositing, not the generation negative
5. **Temporal/Consistency** — trim next; the product-lock cross-listed tokens stay (already
   protected under rank 2)
6. **Render/Quality** — trim first/most; the most generic category and partially redundant with
   choosing a higher-fidelity model in the first place

---

## 6. Ready-to-copy compiled strings

Assembled in a fixed, readable order — Anatomy/Human → Product/Label → Text & Arabic →
Temporal/Consistency → Render/Quality → Culture — matching this document's own §3 sequence.
Negative-prompt fields are order-insensitive, so this sequencing is a documentation convenience,
not a technical requirement.

### 6.1 Master core only (Bible §6.6, normalized — §2.1)

Use when a model or context needs the anti-artifact floor with **no** flagship-specific
extensions (e.g. onboarding a new product per the brand-lock clone-and-edit process):

> `plastic/waxy skin, AI sheen, extra fingers, extra arms, malformed hands, warped face, uncanny
> eyes, dead stare, stiff mannequin motion, weird/forced smile, morphing bottle, changing/warped
> label, altered logo, wrong Arabic, gibberish text, mismatched cap color, liquid color shift,
> floating objects, fake/detached shadows, flicker, frame jitter, temporal warping,
> oversaturation, HDR halos, CGI look, low-res hair, plastic hair, banding, watermark, subtitles
> burn-in.`

### 6.2 Full flagship string — `kie_veo3` primary target, no trim

The production string for the 8 s UNBROKEN THREAD primary cut. Paste verbatim into Kie's
`negative_prompt` field:

> `plastic or waxy skin, AI sheen, extra fingers, six-fingered or fused or webbed fingers, extra
> knuckle, extra arms, malformed hands, warped or asymmetric face, uncanny eyes, asymmetric or
> misaligned eyes, unnatural eye reflections, dead stare, frozen unblinking gaze, stiff mannequin
> motion, robotic or floating head turn, unnatural neck bend, weird or forced smile, teeth
> artifacts, misaligned jaw on smile, doll-like pore-less skin, over-smoothed skin texture,
> beauty-filter cast, low-res hair, plastic hair, clumped or helmet-like hair, strands merging
> into a single mass, hair clipping through fabric or shoulder, morphing bottle, changing or
> warped label, altered logo, mismatched cap color, gold or black cap, glossy cap finish, tall
> cylindrical bottle shape, frosted or opaque glass, opaque liquid, liquid color shift, liquid
> turning orange, liquid turning brown, liquid turning pink, extra label text, redesigned label
> layout, relocated or resized seal, English brand name on bottle, duplicated or missing bottle
> in the pack reveal, wrong Arabic, gibberish text, subtitles burn-in, no on-screen text rendered
> by the model, no signage or background text with legible characters, mistranslated or
> paraphrased overlay text, wrong Arabic diacritics, incorrect gender agreement, reversed or
> mirrored Arabic digits, Latin characters mixed into Arabic script, broken letter-joining,
> disconnected Arabic glyphs, isolated-form letters mid-word, dialect wording in an overlay,
> Egyptian-slang or Darija VO in the Saudi cut, overlay text inside the top-14%-or-bottom-20%
> safe zone, low-contrast overlay text, overlay overlapping the face or eyeline, duplicated or
> extra Arabic text, wrong currency glyph, non-western numerals in a price context,
> machine-translated cadence, calque phrasing, Latin-only font substituted for Arabic,
> decorative or script font, flicker, frame jitter, temporal warping, unintended character
> identity drift across beats, wardrobe color or fabric drift between beats, unmotivated lighting
> or color-temperature jump between beats, continuity break at a transition seam, seed or framing
> drift on a re-roll, floating objects, fake or detached shadows, oversaturation, HDR halos,
> unnatural or blown highlight bloom, CGI look, banding, watermark, compression artifacts,
> macro-blocking, letterboxing or pillarboxing, off-palette accent color, unnatural or
> CGI-looking liquid physics on the oil drop pour or ripple, alcohol cues, immodesty, exposed
> skin beyond face hands or hair, religious imagery as decoration, qibla-direction staging,
> fear-mongering, exaggerated before-after that shames real hair, fake medical claims, romantic
> or dating framing, unrelated man in frame, national symbol misuse, interest-bearing financing
> language, countdown timer or scarcity graphic.`

### 6.3 Fallback — `kie_veo3_fast` / `kling` / `runway_gen3`

Identical content to §6.2, placed in each model's own negative/exclude field (§5) — no token
added, none dropped.

**`runway_gen3` mandatory addendum** (append; required because `resolution.meets_floor = false`):

> `resolution below 1080x1920, upscale softness artifacts.`

### 6.4 Draft-only — `pixverse` (priority-trimmed subset, §5's trim rule applied)

Never a shipped master — label every use of this string as draft-only pre-viz:

> `malformed hands, six fingers, warped face, uncanny eyes, plastic or waxy skin, stiff mannequin
> motion, morphing bottle, changing or warped label, altered logo, gold or black cap, liquid
> color shift, alcohol cues, immodesty, religious imagery as decoration, fear-mongering, fake
> medical claims, wrong Arabic, gibberish text, no on-screen text rendered by the model,
> watermark, flicker, CGI look, low-res hair, plastic hair, resolution below 1080x1920.`

---

## 7. Quality-gate cross-reference (Bible §7)

How this library's six categories evidence the 10 scoring axes (ship threshold ≥ 95 weighted, no
axis < 90; Bible §7):

| Bible §7 axis | Evidenced by | How |
|---|---|---|
| **Realism** | §3.1 Anatomy/Human, §3.5 Render/Quality (liquid/hair physics) | Direct token coverage — the two categories that most directly suppress "generated, not filmed" tells |
| **Marketing/Conversion** | §3.2 Product/Label, §3.3 Text & Arabic (offer/CTA accuracy) | The product and offer must render exactly as the thing being sold, with the exact locked CTA |
| **Luxury feel** | §3.5 Render/Quality, §3.1 Anatomy/Human | Banding, compression, off-palette color, and skin/hair quality all read as "cheap" if violated |
| **Storytelling** | §3.4 Temporal/Consistency + §4 governing-tension table | The unbroken-take read and the transformation arc are the story; a naive negative can silently erase both |
| **Branding** | §3.2 Product/Label, §3.3 Text & Arabic typography cross-ref | Palette, font, logo, and label integrity all route through these two categories |
| **Culture/Localization** | §3.6 Culture, §3.3 Text & Arabic (dialect/slang tokens) | The forbid floor and the MSA-only / no-Darija rule are this library's culture defense |
| **Product consistency** | §3.2 Product/Label + its §3.4 cross-listed tokens | The single hardest lock in the studio; double-covered by design |
| **Video rhythm/retention** | §3.4 Temporal/Consistency | Flicker/jitter/warping directly break pacing and the continuous-move read |
| **Hook strength** | §3.1 Anatomy/Human (indirect) | The HOOK beat's macro comb-and-falling-strand shot cannot look synthetic in its first 1.2 s |
| **Technical/prompt soundness** | §3.5 Render/Quality + §5 per-model syntax table | Format-floor tokens plus correct per-model field placement (never inlined into the positive prompt) |

---

## 8. Maintenance & recompile rules

- **Recompile, never append, whenever an upstream lock changes:** a new scene-direction guardrail
  (Stage 8), a corrected Arabic line (Stage 9), a cultural-QA finding, or a brand-DNA update
  (Stage 10) each mean the affected category is rebuilt from its current source — not patched
  with one extra token bolted onto a stale string (PIPELINE.md §10).
- **A stale compiled string is a Stage 10 gate failure.** `26-kie-prompt-builder` places the
  `kie_veo3` string (§6.2) verbatim into the compiled prompt's negative field at Stage 11 — a
  string generated before the last upstream lock update reaches the model unchanged and is a
  Major finding at the gate.
- **Every token here traces to Bible §4/§5/§6.1/§6.6, a config file, or `PIPELINE.md` §8–§10.**
  No entry in this library is a "known AI failure mode" added without citation — the same
  no-fabrication discipline the Bible holds every authored file to (Bible §2).
- **This library never introduces a new product claim.** It only names what must **not** appear;
  it is bound by the same claim discipline as every other file that touches the flagship (Bible
  §3 — the four locked claims: stops hair loss from the first weeks, stimulates new hair growth,
  noticeable density & length with regular use 2–3×/week, shine & softness from first use).
- **A flat comma-clause list, always.** Nested punctuation, semicolons, or sentence-style
  negatives risk confusing a model's negative-field parser — one clause per token,
  comma-separated, no exceptions, across every string in this document.
- **Onboarding a new product** (Bible §0, brand-lock clone-and-edit process): §2 (the master
  core) and §5 (per-model notes) carry over unchanged; §3.2 (Product/Label) and §3.6 (Culture, if
  the new product changes market) are rebuilt against the new `brand.yaml`; §3.1/§3.4/§3.5 carry
  over as generic craft knowledge; nothing else in the framework changes.
