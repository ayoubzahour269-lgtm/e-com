---
template: "storyboard"
type: "template"
fills_stage: 7                          # PIPELINE.md Stage 7 — Storyboard
instantiates: "examples/<product-slug>/05-storyboard-beat-sheet.md"
filled_by_skills: ["08-storyboard-director"]
co_authored_with: ["09-beauty-commercial-director", "10-luxury-commercial-director", "11-cinematography-director"]
consumes: ["creative-direction.md (04)", "the winning concept card (05, concept.template.md)",
           "the winning hook (06)", "the selected transition set (15)",
           "STUDIO-BIBLE.md §3 §4 §5 §6 §7"]
consumed_by_skills: ["12-camera-director", "13-lighting-director", "14-motion-director",
                      "15-transition-designer", "16-hair-realism-director", "17-human-realism-director",
                      "18-environment-realism-director", "19-oil-product-realism-director",
                      "20-arabic-copywriter", "21-cultural-expert-gulf", "23-product-consistency-guard",
                      "24-negative-prompt-builder", "26-kie-prompt-builder", "28-creative-scoring-engine"]
based_on: "skills/08-storyboard-director/SKILL.md Outputs 3.1–3.7 (master beat sheet, per-beat director cards, transition-engine ledger, continuity ledger, overlay/VO placement map, extended-cut structure, hand-off manifest); worked model = the flagship UNBROKEN THREAD beat sheet (STUDIO-BIBLE.md §6.1)"
status: "BLANK — fill-in skeleton. Replace every {{FIELD}} placeholder, delete every <!-- HOW TO FILL --> comment. The number of content-beat rows below is illustrative (5); add or remove rows to fit the concept, but keep total duration inside the target cut length."
---

# Storyboard — {{CONCEPT_NAME_EN}} ({{CONCEPT_CODENAME}})

## How to use this template

A storyboard renders the winning **concept** and **hook** as a single,
continuous, **beat-by-beat** structure — the blueprint every scene-direction
skill (camera, light, motion, hair, human, environment, oil) and the final
prompt compiler build from. If the beat sheet is wrong, the generation is
wrong, no matter how good the craft direction underneath it is.

**The core discipline this template enforces:** every "Transition OUT" must
be a **physical hand-off** (something falling, diving, sweeping, blooming —
an object that is *already in the frame* carrying you into the next beat),
never a plain cut. This is what lets an ad read as one continuous piece of
filmed footage instead of an edited sequence, which is the single biggest
lever on the Realism axis available to a storyboard (STUDIO-BIBLE.md §0
priority #1). If your concept's strategy does not require a fully unbroken
take (some concepts legitimately use a hard cut — a testimonial cut, a
memory-flashback), say so explicitly in Section D rather than forcing a fake
continuous transition; an honest cut, disclosed, scores better than a
disguised one.

**The flagship as the model, not the content.** `STUDIO-BIBLE.md` §6.1 works
this exact structure for the mechat flagship: five content beats (Hook →
Discovery → Ritual → Transformation → Offer/CTA) totaling 6.4 s, stitched by
four ≤0.4 s transition beats totaling 1.6 s, for an 8.0 s primary cut, with
the oil-drop-and-hair-strand device carrying every seam. Study its rigor —
exact per-beat timing that sums exactly to the target duration, ten fields
specified per content beat, a continuity ledger proving the take reads as one
move — and reproduce that rigor for your own concept's beats, engines, and
emotional spine. Do not copy its beats or its Arabic lines.

**Placeholder convention:** `{{FIELD}}` = a blank you fill. `<!-- HOW TO FILL: … -->`
explains what belongs there — delete each comment once filled. Duplicate the
content-beat and transition-beat row/card patterns as many times as your
concept's spine requires.

---

## Section A — Header

| Field | Value |
|-------|-------|
| Concept (Arabic / translit / gloss) | {{CONCEPT_NAME_AR}} / {{CONCEPT_NAME_TRANSLIT}} / {{CONCEPT_NAME_EN}} |
| Codename | {{CONCEPT_CODENAME}} |
| Product | {{PRODUCT_NAME_EN}} |
| Winning hook | {{WINNING_HOOK_SUMMARY}} <!-- one line — full spec lives in the hook artifact --> |
| Target cut duration | {{TARGET_DURATION_SECONDS}} s |
| Aspect ratio / resolution / fps | {{ASPECT_RATIO}} / {{RESOLUTION}} / {{FPS}} |
| Safe margins | top {{SAFE_MARGIN_TOP_PCT}}% / bottom {{SAFE_MARGIN_BOTTOM_PCT}}% |
| Primary platforms + hook windows | {{PLATFORM_HOOK_WINDOWS}} |
| Emotional spine | {{EMOTIONAL_SPINE}} <!-- e.g. Pain → Trust → Ritual → Transformation → Pride → Action --> |
| Single-continuous-take strategy? | {{CONTINUOUS_TAKE_Y_N}} <!-- if N, name where the cut(s) are and why in Section D --> |

---

## Section B — Master beat sheet (the scannable spine; durations must sum to the target duration exactly)

<!-- HOW TO FILL: Alternate content beats (B1, B2, …) and transition beats
(T1, T2, …) — a transition beat sits between every pair of content beats. Add
or remove rows to fit your concept; keep every duration honest and the column
total exact. -->

| # | t (s) | Beat name | Objective | Emotion | Camera move (→ camera director) | Lens | Transition OUT (→ transition designer) |
|---|-------|-----------|-----------|---------|-----------------------------------|------|-------------------------------------------|
| B1 | {{B1_T_START}}–{{B1_T_END}} | **{{B1_NAME}}** | {{B1_OBJECTIVE}} | {{B1_EMOTION}} | {{B1_CAMERA_MOVE}} | {{B1_LENS}} | {{B1_TRANSITION_OUT}} |
| T1 | {{T1_T_START}}–{{T1_T_END}} | *transition* | {{T1_OBJECTIVE}} | {{T1_EMOTION}} | {{T1_CAMERA_MOVE}} | {{T1_LENS}} | {{T1_TRANSITION_OUT}} |
| B2 | {{B2_T_START}}–{{B2_T_END}} | **{{B2_NAME}}** | {{B2_OBJECTIVE}} | {{B2_EMOTION}} | {{B2_CAMERA_MOVE}} | {{B2_LENS}} | {{B2_TRANSITION_OUT}} |
| T2 | {{T2_T_START}}–{{T2_T_END}} | *transition* | {{T2_OBJECTIVE}} | {{T2_EMOTION}} | {{T2_CAMERA_MOVE}} | {{T2_LENS}} | {{T2_TRANSITION_OUT}} |
| B3 | {{B3_T_START}}–{{B3_T_END}} | **{{B3_NAME}}** | {{B3_OBJECTIVE}} | {{B3_EMOTION}} | {{B3_CAMERA_MOVE}} | {{B3_LENS}} | {{B3_TRANSITION_OUT}} |
| T3 | {{T3_T_START}}–{{T3_T_END}} | *transition* | {{T3_OBJECTIVE}} | {{T3_EMOTION}} | {{T3_CAMERA_MOVE}} | {{T3_LENS}} | {{T3_TRANSITION_OUT}} |
| B4 | {{B4_T_START}}–{{B4_T_END}} | **{{B4_NAME}}** *(the keeper — the ONE unforgettable moment)* | {{B4_OBJECTIVE}} | {{B4_EMOTION}} | {{B4_CAMERA_MOVE}} | {{B4_LENS}} | {{B4_TRANSITION_OUT}} |
| T4 | {{T4_T_START}}–{{T4_T_END}} | *transition* | {{T4_OBJECTIVE}} | {{T4_EMOTION}} | {{T4_CAMERA_MOVE}} | {{T4_LENS}} | {{T4_TRANSITION_OUT}} |
| B5 | {{B5_T_START}}–{{B5_T_END}} | **{{B5_NAME}}** | {{B5_OBJECTIVE}} | {{B5_EMOTION}} | {{B5_CAMERA_MOVE}} | {{B5_LENS}} | {{B5_TRANSITION_OUT}} |

**Duration check:** content beats sum to {{CONTENT_BEATS_TOTAL}} s; transition
beats sum to {{TRANSITION_BEATS_TOTAL}} s; grand total = {{GRAND_TOTAL}} s —
must equal {{TARGET_DURATION_SECONDS}} s exactly.

**One-move proof (delete this line if the concept intentionally uses a cut,
and explain the cut in Section D instead):** read the Transition-OUT column
top to bottom — each one is a **physical hand-off**, never a plain cut. The
camera never teleports; it is one path from {{SPINE_START_OBJECT}} to
{{SPINE_END_OBJECT}}.

---

## Section C — Per-beat director cards (the deep spec; one card per content beat)

<!-- HOW TO FILL: Ten fields per content beat, at storyboard altitude — enough
that the camera/light/motion/hair/human/environment/oil directors know exactly
what happens and why, without you directing HOW they deliver it. Duplicate
this card pattern for every content beat (B1…Bn) you listed in Section B. -->

> **{{B1_NAME}} — {{B1_T_START}}–{{B1_T_END}} s**
> - **Objective:** {{B1_CARD_OBJECTIVE}}
> - **Emotion:** {{B1_CARD_EMOTION}}
> - **Duration:** {{B1_CARD_DURATION}} s
> - **Camera move (→ camera director):** {{B1_CARD_CAMERA}}
> - **Lens:** {{B1_CARD_LENS}}
> - **Lighting (→ lighting director):** {{B1_CARD_LIGHTING}}
> - **Environment (→ environment director):** {{B1_CARD_ENVIRONMENT}}
> - **Character / subject action (→ human/hair/oil directors):** {{B1_CARD_ACTION}}
> - **Overlay (→ copywriter):** {{B1_CARD_OVERLAY_AR}} ({{B1_CARD_OVERLAY_TRANSLIT}}, "{{B1_CARD_OVERLAY_GLOSS}}")
> - **Transition OUT (→ transition designer):** {{B1_CARD_TRANSITION_OUT}}

> **{{B2_NAME}} — {{B2_T_START}}–{{B2_T_END}} s**
> - **Objective:** {{B2_CARD_OBJECTIVE}}
> - **Emotion:** {{B2_CARD_EMOTION}}
> - **Duration:** {{B2_CARD_DURATION}} s
> - **Camera move:** {{B2_CARD_CAMERA}}
> - **Lens:** {{B2_CARD_LENS}}
> - **Lighting:** {{B2_CARD_LIGHTING}}
> - **Environment:** {{B2_CARD_ENVIRONMENT}}
> - **Character / subject action:** {{B2_CARD_ACTION}}
> - **Product beat? (→ product-consistency guard)** {{B2_CARD_PRODUCT_LOCK_NOTE}} <!-- if the product appears in this beat, restate the product-lock digest verbatim here, do not paraphrase it -->
> - **Overlay:** {{B2_CARD_OVERLAY_AR}} ({{B2_CARD_OVERLAY_TRANSLIT}}, "{{B2_CARD_OVERLAY_GLOSS}}")
> - **Transition OUT:** {{B2_CARD_TRANSITION_OUT}}

> **{{B3_NAME}} — {{B3_T_START}}–{{B3_T_END}} s**
> - **Objective:** {{B3_CARD_OBJECTIVE}}
> - **Emotion:** {{B3_CARD_EMOTION}}
> - **Duration:** {{B3_CARD_DURATION}} s
> - **Camera move:** {{B3_CARD_CAMERA}}
> - **Lens:** {{B3_CARD_LENS}}
> - **Lighting:** {{B3_CARD_LIGHTING}}
> - **Environment:** {{B3_CARD_ENVIRONMENT}}
> - **Character / subject action:** {{B3_CARD_ACTION}}
> - **Overlay:** {{B3_CARD_OVERLAY_AR}} ({{B3_CARD_OVERLAY_TRANSLIT}}, "{{B3_CARD_OVERLAY_GLOSS}}")
> - **Transition OUT:** {{B3_CARD_TRANSITION_OUT}}

> **{{B4_NAME}} — {{B4_T_START}}–{{B4_T_END}} s** *(the keeper — protect this beat's budget; exactly one unforgettable moment per cut)*
> - **Objective:** {{B4_CARD_OBJECTIVE}}
> - **Emotion:** {{B4_CARD_EMOTION}}
> - **Duration:** {{B4_CARD_DURATION}} s
> - **Camera move:** {{B4_CARD_CAMERA}}
> - **Lens:** {{B4_CARD_LENS}}
> - **Lighting:** {{B4_CARD_LIGHTING}}
> - **Environment:** {{B4_CARD_ENVIRONMENT}}
> - **Character / subject action:** {{B4_CARD_ACTION}} <!-- include the anti-mannequin details: a real micro-smile, one real blink, one real breath, per STUDIO-BIBLE.md §6.6 negatives --->
> - **Overlay:** {{B4_CARD_OVERLAY_AR}} ({{B4_CARD_OVERLAY_TRANSLIT}}, "{{B4_CARD_OVERLAY_GLOSS}}")
> - **Transition OUT:** {{B4_CARD_TRANSITION_OUT}}

> **{{B5_NAME}} — {{B5_T_START}}–{{B5_T_END}} s**
> - **Objective:** {{B5_CARD_OBJECTIVE}} <!-- typically: convert — resolve pack/price/CTA --->
> - **Emotion:** {{B5_CARD_EMOTION}}
> - **Duration:** {{B5_CARD_DURATION}} s
> - **Camera move:** {{B5_CARD_CAMERA}}
> - **Lens:** {{B5_CARD_LENS}}
> - **Lighting:** {{B5_CARD_LIGHTING}}
> - **Environment:** {{B5_CARD_ENVIRONMENT}}
> - **Character / subject action:** {{B5_CARD_ACTION}}
> - **Product beat? (→ product-consistency guard):** {{B5_CARD_PRODUCT_LOCK_NOTE}}
> - **Overlay:** {{B5_CARD_OVERLAY_AR}} ({{B5_CARD_OVERLAY_TRANSLIT}}, "{{B5_CARD_OVERLAY_GLOSS}}") → **CTA:** {{B5_CARD_CTA_AR}} ({{B5_CARD_CTA_TRANSLIT}}, "{{B5_CARD_CTA_GLOSS}}")
> - **Transition OUT:** {{B5_CARD_TRANSITION_OUT}} <!-- typically: end on the crisp hero frame, brand + offer legible --->

---

## Section D — Transition-engine ledger (each transition beat, ≤0.4 s each)

<!-- HOW TO FILL: Each transition is an ENGINE — a physical object or motion
that carries momentum across the boundary so the cut is invisible. The
outgoing subject of beat N must be the same object that opens beat N+1. If a
boundary genuinely needs a hard cut (a legitimate creative choice for some
concepts — a testimonial, a time-jump), say so explicitly here instead of
inventing a fake continuous engine; a disclosed cut costs less than a
disguised one that reads as a seam under inspection. -->

| ID | t (s) | Engine | Carries (beat N → beat N+1) | In → Out (the physical hand-off) | Motion vector | Cut, disclosed? |
|----|-------|--------|-------------------------------|--------------------------------------|----------------|:---:|
| T1 | {{T1_T_START}}–{{T1_T_END}} | {{T1_ENGINE}} | {{T1_CARRIES}} | {{T1_IN_OUT}} | {{T1_MOTION_VECTOR}} | {{T1_IS_CUT}} |
| T2 | {{T2_T_START}}–{{T2_T_END}} | {{T2_ENGINE}} | {{T2_CARRIES}} | {{T2_IN_OUT}} | {{T2_MOTION_VECTOR}} | {{T2_IS_CUT}} |
| T3 | {{T3_T_START}}–{{T3_T_END}} | {{T3_ENGINE}} | {{T3_CARRIES}} | {{T3_IN_OUT}} | {{T3_MOTION_VECTOR}} | {{T3_IS_CUT}} |
| T4 | {{T4_T_START}}–{{T4_T_END}} | {{T4_ENGINE}} | {{T4_CARRIES}} | {{T4_IN_OUT}} | {{T4_MOTION_VECTOR}} | {{T4_IS_CUT}} |

---

## Section E — Continuity ledger (state across every boundary)

<!-- HOW TO FILL: Track these state variables at every beat boundary. If the
take is meant to read as one continuous shot, every row must change smoothly
and monotonically — no snapping light direction, no color-temperature jump,
no camera teleport. This table is your evidence for the Realism and Video
rhythm/retention axes. -->

| State variable | {{B1_NAME}} | {{B2_NAME}} | {{B3_NAME}} | {{B4_NAME}} | {{B5_NAME}} | Continuity rule |
|-----------------|:---:|:---:|:---:|:---:|:---:|------------------|
| Key-light direction | {{LEDGER_LIGHT_B1}} | {{LEDGER_LIGHT_B2}} | {{LEDGER_LIGHT_B3}} | {{LEDGER_LIGHT_B4}} | {{LEDGER_LIGHT_B5}} | {{LEDGER_LIGHT_RULE}} |
| Color temperature | {{LEDGER_COLORTEMP_B1}} | {{LEDGER_COLORTEMP_B2}} | {{LEDGER_COLORTEMP_B3}} | {{LEDGER_COLORTEMP_B4}} | {{LEDGER_COLORTEMP_B5}} | {{LEDGER_COLORTEMP_RULE}} |
| Camera vector | {{LEDGER_CAMVECTOR_B1}} | {{LEDGER_CAMVECTOR_B2}} | {{LEDGER_CAMVECTOR_B3}} | {{LEDGER_CAMVECTOR_B4}} | {{LEDGER_CAMVECTOR_B5}} | {{LEDGER_CAMVECTOR_RULE}} |
| Subject / hair state | {{LEDGER_SUBJECT_B1}} | {{LEDGER_SUBJECT_B2}} | {{LEDGER_SUBJECT_B3}} | {{LEDGER_SUBJECT_B4}} | {{LEDGER_SUBJECT_B5}} | {{LEDGER_SUBJECT_RULE}} |
| Product presence | {{LEDGER_PRODUCT_B1}} | {{LEDGER_PRODUCT_B2}} | {{LEDGER_PRODUCT_B3}} | {{LEDGER_PRODUCT_B4}} | {{LEDGER_PRODUCT_B5}} | {{LEDGER_PRODUCT_RULE}} |
| Eyeline / subject focus | {{LEDGER_EYELINE_B1}} | {{LEDGER_EYELINE_B2}} | {{LEDGER_EYELINE_B3}} | {{LEDGER_EYELINE_B4}} | {{LEDGER_EYELINE_B5}} | {{LEDGER_EYELINE_RULE}} |

**The single mandated state change:** {{MANDATED_STATE_CHANGE}} <!-- e.g.
"hair goes from thin to restored across exactly one boundary" — name which
boundary carries the concept's one "after" reveal, and confirm nothing earlier
hints at it -->.

---

## Section F — Overlay & VO placement map

<!-- HOW TO FILL: You PLACE the copy on the timeline; you do not write final
wording here (that belongs to the Arabic copywriter). One overlay per content
beat, held long enough to read muted, inside the safe margins. -->

| Beat | On-screen overlay | VO line for this cut | SFX |
|------|----------------------|--------------------------|-----|
| {{B1_NAME}} | {{B1_OVERLAY_PLACEMENT}} | {{B1_VO_PLACEMENT}} | {{B1_SFX}} |
| {{B2_NAME}} | {{B2_OVERLAY_PLACEMENT}} | {{B2_VO_PLACEMENT}} | {{B2_SFX}} |
| {{B3_NAME}} | {{B3_OVERLAY_PLACEMENT}} | {{B3_VO_PLACEMENT}} | {{B3_SFX}} |
| {{B4_NAME}} | {{B4_OVERLAY_PLACEMENT}} | {{B4_VO_PLACEMENT}} | {{B4_SFX}} <!-- typically where the music's resolving swell lands --> |
| {{B5_NAME}} | {{B5_OVERLAY_PLACEMENT}} | {{B5_VO_PLACEMENT}} | {{B5_SFX}} |

---

## Section G — Extended cut structure (optional, budget-gated — delete this section if not applicable)

<!-- HOW TO FILL: Only fill this if the studio has approved a longer,
multi-segment stitch. Default is always the single-generation primary cut
above; do not fill this section speculatively. -->

| Segment | t (s) | Contents | VO | Renderer / seam notes |
|---------|-------|----------|-----|--------------------------|
| A | {{SEGMENT_A_RANGE}} | {{SEGMENT_A_CONTENTS}} | {{SEGMENT_A_VO}} | {{SEGMENT_A_NOTES}} |
| B | {{SEGMENT_B_RANGE}} | {{SEGMENT_B_CONTENTS}} | {{SEGMENT_B_VO}} | {{SEGMENT_B_NOTES}} |

**Stitch point:** {{STITCH_POINT}} — the seam must match on light direction,
color temperature, and the object carrying the hand-off, or the two-segment
cut must not ship (fall back to the single primary cut).
**Cost note:** an extended cut is a multi-generation spend; it requires
explicit cost-optimizer approval before it is authored, not after.

---

## Section H — Per-beat hand-off manifest (fill one block per content beat; shown here for one beat as the schema)

- `beat.id`: {{HANDOFF_BEAT_ID}} · `beat.window`: {{HANDOFF_BEAT_WINDOW}} · `beat.role`: {{HANDOFF_BEAT_ROLE}}
- `beat.objective` / `beat.emotion`: {{HANDOFF_OBJECTIVE}} / {{HANDOFF_EMOTION}}
- `beat.camera` (→ camera director): {{HANDOFF_CAMERA}}
- `beat.light` (→ lighting director): {{HANDOFF_LIGHT}}
- `beat.motion` (→ motion director): {{HANDOFF_MOTION}}
- `beat.transition_out` (→ transition designer): {{HANDOFF_TRANSITION_OUT}}
- `beat.hair` (→ hair-realism director): {{HANDOFF_HAIR}}
- `beat.human` (→ human-realism director): {{HANDOFF_HUMAN}}
- `beat.env` (→ environment-realism director): {{HANDOFF_ENV}}
- `beat.oil_or_product` (→ product-realism director): {{HANDOFF_PRODUCT_REALISM}}
- `beat.overlay` / `beat.vo` (→ copywriter): {{HANDOFF_OVERLAY}} / {{HANDOFF_VO}}
- `beat.negatives_touch` (→ negative-prompt builder): {{HANDOFF_NEGATIVES_TOUCH}}

---

## Definition of done

- [ ] Beat durations sum exactly to the target cut length (Section B).
- [ ] Every content beat has all ten director-card fields filled (Section C).
- [ ] Every transition either carries a genuine physical engine or is
      explicitly disclosed as a cut, with a reason (Section D).
- [ ] The continuity ledger (Section E) has no unexplained jump in light
      direction, color temperature, or camera vector, if the cut is meant to
      read as continuous.
- [ ] Exactly one "keeper" beat carries the emotional payoff — no competing
      second climax.
- [ ] Every overlay/VO line in Section F is a placement, not a rewrite — final
      wording belongs to the copywriter.
- [ ] Every Arabic string carries transliteration + English gloss.
- [ ] Section G is either fully filled (extended cut, approved) or deleted
      entirely (default single-cut run) — never partially filled.
- [ ] All `{{FIELD}}` placeholders replaced; all `<!-- HOW TO FILL -->`
      comments deleted.

## Handoff

| Consumer | Reads |
|----------|-------|
| 12-camera-director | Section B camera-move column + Section C camera fields + Section D motion vectors |
| 13-lighting-director | Section C lighting fields + Section E light/color-temp ledger |
| 14-motion-director | Section D (timing of each ≤0.4 s transition) + Section H |
| 15-transition-designer | Section D (the full engine ledger) |
| 16/17/18/19 realism directors | Section C character/environment/product-realism fields + Section H |
| 20-arabic-copywriter | Section F (placement map) |
| 21-cultural-expert-gulf | Section C (character action, wardrobe) + Section F |
| 23-product-consistency-guard | Every product-lock note in Section C |
| 24-negative-prompt-builder | Section H `beat.negatives_touch` per beat |
| 26-kie-prompt-builder | The whole file — this is the skeleton the compiled prompt renders verbatim |
| 28-creative-scoring-engine | Whole file, as the deep-dive evidence for Storytelling and Video rhythm/retention |
