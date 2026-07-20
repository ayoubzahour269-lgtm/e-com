---
template: "shot-list"
type: "template"
fills_stage: 8                          # PIPELINE.md Stage 8 — Scene Direction
instantiates: "examples/<product-slug>/06-scene-direction-pack.md"
filled_by_skills: ["12-camera-director", "13-lighting-director", "14-motion-director",
                    "16-hair-realism-director", "17-human-realism-director",
                    "18-environment-realism-director", "19-oil-product-realism-director"]
consumes: ["05-storyboard-beat-sheet.md (storyboard.template.md)", "11-cinematography-director grammar",
           "09/10-beauty/luxury-commercial-director grammar", "STUDIO-BIBLE.md §3 §4 §5 §6.1 §6.5 §6.6 §7"]
consumed_by_skills: ["20-arabic-copywriter", "21-cultural-expert-gulf", "22-brand-guardian",
                      "23-product-consistency-guard", "24-negative-prompt-builder",
                      "25-prompt-optimizer", "26-kie-prompt-builder", "27-quality-checker",
                      "28-creative-scoring-engine"]
based_on: "skills/12-camera-director/SKILL.md (the seven-move camera lexicon + master camera sheet + stabilization doctrine) synthesized with skills/13,14,16,17,18,19's per-beat realism direction into ONE per-shot production table, per PIPELINE.md Stage 8 (06-scene-direction-pack.md). Worked model = the flagship camera plan for UNBROKEN THREAD (STUDIO-BIBLE.md §6.1, per-beat camera/light/motion/hair/human/env/oil direction)."
status: "BLANK — fill-in skeleton. Replace every {{FIELD}} placeholder, delete every <!-- HOW TO FILL --> comment. Shot rows are illustrative (one per storyboard content beat, plus one per transition) — split a beat into more than one shot only if the beat genuinely needs coverage beyond a single continuous move."
---

# Shot List — {{CONCEPT_NAME_EN}} ({{CONCEPT_CODENAME}})

## How to use this template

The **storyboard** (storyboard.template.md) says *what happens and why*, beat
by beat. The **shot list** says *exactly how the camera, light, motion, and
every realism layer deliver it* — the production-technical breakdown a
prompt-writer (or a human DP) needs with nothing left to guess: shot size,
lens and aperture, exact camera move from a locked lexicon, shutter angle,
rig, focus behavior, speed/time-remap, and a full realism brief for hair,
human, environment, and product/oil in that specific frame. Where the
storyboard is one row per **beat**, the shot list is one row per **shot** —
usually a 1:1 match (one continuous move per beat) but you may split a beat
into more than one shot if real coverage requires it, or note that a
transition beat *is itself* the shot that stitches two beats together.

**Lock the camera lexicon before you fill a single row.** Pick a small,
named set of camera moves for this production (the flagship reference locks
seven: slow push, slow pull, orbit, slider/track, macro dive, focus pull,
tasteful whip) and use only moves from that set. An unlisted, ad-hoc move in
a single shot row is usually a sign the move is unmotivated — name it, or cut
it back to a near-locked frame.

**Motivated movement only.** For every shot, you must be able to state in one
sentence *why the camera moves* and *what stops it* (the governor). A move
with no stated motivation reads as AI wander, not craft.

**One slow-motion, if any.** If this production uses any time-remapped
slow-motion at all, reserve it for the single most emotive frame and keep
every other shot at real, honest time — stacking multiple slow-mo moments
reads as a music-video montage, not filmed footage, and works against the
Realism axis.

**Placeholder convention:** `{{FIELD}}` = a blank you fill. `<!-- HOW TO FILL: … -->`
explains what belongs there — delete each comment once filled.

---

## Section A — Camera-move lexicon for this production

<!-- HOW TO FILL: List only the moves you intend to use; delete unused rows,
add a new named move only if no existing one fits AND you can state its
motivation. -->

| Move ID | Name | What it is | When to use it (its required motivation) |
|---------|------|------------|----------------------------------------------|
| M1 | {{MOVE_1_NAME}} <!-- e.g. slow push --> | {{MOVE_1_DESCRIPTION}} | {{MOVE_1_MOTIVATION}} |
| M2 | {{MOVE_2_NAME}} <!-- e.g. slow pull --> | {{MOVE_2_DESCRIPTION}} | {{MOVE_2_MOTIVATION}} |
| M3 | {{MOVE_3_NAME}} <!-- e.g. orbit --> | {{MOVE_3_DESCRIPTION}} | {{MOVE_3_MOTIVATION}} |
| M4 | {{MOVE_4_NAME}} <!-- e.g. slider / track --> | {{MOVE_4_DESCRIPTION}} | {{MOVE_4_MOTIVATION}} |
| M5 | {{MOVE_5_NAME}} <!-- e.g. macro dive --> | {{MOVE_5_DESCRIPTION}} | {{MOVE_5_MOTIVATION}} |
| M6 | {{MOVE_6_NAME}} <!-- e.g. focus pull --> | {{MOVE_6_DESCRIPTION}} | {{MOVE_6_MOTIVATION}} |
| M7 | {{MOVE_7_NAME}} <!-- e.g. tasteful whip --> | {{MOVE_7_DESCRIPTION}} | {{MOVE_7_MOTIVATION}} |

**Global technical floor for every shot:** shutter {{SHUTTER_ANGLE}} <!-- e.g.
180° (1/48 s at 24 fps), for natural motion blur --> · base frame rate
{{BASE_FPS}} fps · one deliberate slow-motion moment permitted at
{{SLOWMO_SHOT_ID}} (or "none," if this production stays real-time throughout)
· zoom policy: {{ZOOM_POLICY}} <!-- e.g. "physical moves only, never an
optical zoom-punch" -->.

---

## Section B — Master shot list (the scannable spine; one row per shot)

<!-- HOW TO FILL: Link every shot back to its storyboard beat/transition ID.
Keep the Move column restricted to Section A's lexicon. -->

| Shot | Linked beat | t (s) | Shot size | Move (§A) | Lens / DoF | Focus target | Speed / ramp | Rig / stabilization |
|------|--------------|-------|-----------|------------|-------------|----------------|----------------|-------------------------|
| S1 | {{S1_BEAT_ID}} | {{S1_T_RANGE}} | {{S1_SHOT_SIZE}} <!-- ECU/CU/MCU/MS/WS/OTS --> | {{S1_MOVE}} | {{S1_LENS_DOF}} | {{S1_FOCUS_TARGET}} | {{S1_SPEED}} | {{S1_RIG}} |
| S2 | {{S2_BEAT_ID}} | {{S2_T_RANGE}} | {{S2_SHOT_SIZE}} | {{S2_MOVE}} | {{S2_LENS_DOF}} | {{S2_FOCUS_TARGET}} | {{S2_SPEED}} | {{S2_RIG}} |
| S3 | {{S3_BEAT_ID}} | {{S3_T_RANGE}} | {{S3_SHOT_SIZE}} | {{S3_MOVE}} | {{S3_LENS_DOF}} | {{S3_FOCUS_TARGET}} | {{S3_SPEED}} | {{S3_RIG}} |
| S4 | {{S4_BEAT_ID}} | {{S4_T_RANGE}} | {{S4_SHOT_SIZE}} | {{S4_MOVE}} | {{S4_LENS_DOF}} | {{S4_FOCUS_TARGET}} | {{S4_SPEED}} | {{S4_RIG}} |
| S5 | {{S5_BEAT_ID}} | {{S5_T_RANGE}} | {{S5_SHOT_SIZE}} | {{S5_MOVE}} | {{S5_LENS_DOF}} | {{S5_FOCUS_TARGET}} | {{S5_SPEED}} | {{S5_RIG}} |
| S6 | {{S6_BEAT_ID}} | {{S6_T_RANGE}} | {{S6_SHOT_SIZE}} | {{S6_MOVE}} | {{S6_LENS_DOF}} | {{S6_FOCUS_TARGET}} | {{S6_SPEED}} | {{S6_RIG}} |
| S7 | {{S7_BEAT_ID}} | {{S7_T_RANGE}} | {{S7_SHOT_SIZE}} | {{S7_MOVE}} | {{S7_LENS_DOF}} | {{S7_FOCUS_TARGET}} | {{S7_SPEED}} | {{S7_RIG}} |
| S8 | {{S8_BEAT_ID}} | {{S8_T_RANGE}} | {{S8_SHOT_SIZE}} | {{S8_MOVE}} | {{S8_LENS_DOF}} | {{S8_FOCUS_TARGET}} | {{S8_SPEED}} | {{S8_RIG}} |
| S9 | {{S9_BEAT_ID}} | {{S9_T_RANGE}} | {{S9_SHOT_SIZE}} | {{S9_MOVE}} | {{S9_LENS_DOF}} | {{S9_FOCUS_TARGET}} | {{S9_SPEED}} | {{S9_RIG}} |

**Unbroken-path proof (delete if this production intentionally cuts between
shots):** read the Move column top to bottom — the camera never teleports;
the object it is following at the end of one shot is the same object it opens
the next shot with.

---

## Section C — Per-shot detail cards (the deep spec; one card per shot)

<!-- HOW TO FILL: Duplicate this card once per row in Section B. Every card
must name a motivation and a governor for its move (why it moves, what stops
it), and must give a complete realism brief for every layer present in the
frame — leave a layer's fields as {{N/A — not in frame}} rather than deleting
the row, so downstream skills can confirm the layer was considered. -->

> **S1 · linked to {{S1_BEAT_ID}} — {{S1_T_RANGE}}**
> - **Shot size / framing:** {{S1_FRAMING}}
> - **Move + vector:** {{S1_MOVE_VECTOR}} <!-- from §A lexicon, plus direction/height --->
> - **Motivation (why it moves):** {{S1_MOTIVATION}}
> - **Governor (what stops it):** {{S1_GOVERNOR}}
> - **Lens / aperture / DoF:** {{S1_LENS_APERTURE_DOF}}
> - **Focus behavior:** {{S1_FOCUS_BEHAVIOR}} <!-- rack / follow / hold --->
> - **Shutter / frame rate:** {{S1_SHUTTER_FPS}}
> - **Speed / time-remap:** {{S1_SPEED_DETAIL}} <!-- real-time, or the exact slow-mo ramp in/out --->
> - **Rig / stabilization intent:** {{S1_RIG_DETAIL}}
> - **Subject & action:** {{S1_SUBJECT_ACTION}}
> - **Lighting (→ lighting director):** key direction {{S1_LIGHT_DIRECTION}} · quality {{S1_LIGHT_QUALITY}} · color temperature {{S1_LIGHT_COLORTEMP}} · shadow character {{S1_LIGHT_SHADOWS}}
> - **Hair direction (→ hair-realism director):** {{S1_HAIR_DIRECTION}}
> - **Human / model direction (→ human-realism director):** {{S1_HUMAN_DIRECTION}} <!-- skin, expression, wardrobe, anti-mannequin details if a face is on camera --->
> - **Environment / set direction (→ environment-realism director):** {{S1_ENV_DIRECTION}}
> - **Product / oil direction (→ product-realism director):** {{S1_PRODUCT_DIRECTION}} <!-- if the product/liquid is in frame, restate its lock verbatim; else {{N/A — not in frame}} --->
> - **Audio / SFX cue:** {{S1_AUDIO_CUE}}
> - **Transition IN / OUT:** {{S1_TRANSITION_IN}} / {{S1_TRANSITION_OUT}}
> - **Negative-prompt touch points (→ negative-prompt builder):** {{S1_NEGATIVES_TOUCH}} <!-- the specific tells this shot is most at risk of (e.g. "label warp under a fast push," "focus hunting," "jitter at 100mm macro") --->
> - **Reference-image slot:** {{S1_REFERENCE_IMAGE}} <!-- "none — single generation" unless this shot seeds/receives a multi-segment stitch seam --->
> - **Risk flags / notes:** {{S1_RISK_NOTES}}

<!-- Repeat the S1 card pattern above for S2, S3, … through the last row in
Section B. Do not compress multiple shots into one card — each shot gets its
own full spec, even when several fields repeat verbatim from its neighbor. -->

---

## Section D — Continuity cross-check (against the storyboard's continuity ledger)

<!-- HOW TO FILL: Confirm every state variable the storyboard tracks (light
direction, color temperature, camera vector, subject/hair state, product
presence, eyeline) is honored shot-by-shot here, at the technical level. Flag
any shot where the technical spec would break the storyboard's continuity
promise. -->

| Boundary | Outgoing shot's exit state | Incoming shot's entry state | Match? |
|----------|--------------------------------|-----------------------------------|:---:|
| {{BOUNDARY_1}} | {{BOUNDARY_1_EXIT}} | {{BOUNDARY_1_ENTRY}} | {{BOUNDARY_1_MATCH_Y_N}} |
| {{BOUNDARY_2}} | {{BOUNDARY_2_EXIT}} | {{BOUNDARY_2_ENTRY}} | {{BOUNDARY_2_MATCH_Y_N}} |
| {{BOUNDARY_N}} | {{BOUNDARY_N_EXIT}} | {{BOUNDARY_N_ENTRY}} | {{BOUNDARY_N_MATCH_Y_N}} |

Any `N` above must be resolved (re-vector the shot, or explicitly disclose the
cut in the storyboard) before this shot list is handed to the prompt
compiler.

---

## Section E — Production notes

| Field | Value |
|-------|-------|
| Single continuous take, or multi-shot coverage? | {{PRODUCTION_STRATEGY}} |
| If multi-shot: how shots stitch (seam technique) | {{STITCH_TECHNIQUE}} |
| Number of generations this shot list implies | {{GENERATIONS_IMPLIED}} <!-- should be 1 unless an extended/multi-segment cut is explicitly approved --> |
| Fallback plan if a shot fails post-generation QA | {{FALLBACK_PLAN}} <!-- e.g. "surgical re-roll of the single failing shot with its cached locked descriptors, never a full re-render" --> |
| Anti-drift / anti-jitter tells to watch globally | {{GLOBAL_ANTI_DRIFT_TELLS}} |

---

## Definition of done

- [ ] Every shot in Section B links to a real storyboard beat/transition ID.
- [ ] Every shot uses only a move from the Section A lexicon, with a stated
      motivation and governor (Section C).
- [ ] Every shot's realism fields (hair/human/environment/product) are either
      filled or explicitly marked not-in-frame — none silently blank.
- [ ] Any slow-motion is used at most once across the whole shot list, and
      every other shot is honestly real-time.
- [ ] The continuity cross-check (Section D) shows no unresolved mismatch.
- [ ] `Generations implied` (Section E) is 1 unless an extended cut is
      explicitly approved elsewhere in the pipeline.
- [ ] Every negative-prompt touch point is a specific, named risk — not a
      generic "avoid AI artifacts" placeholder.
- [ ] All `{{FIELD}}` placeholders replaced; all `<!-- HOW TO FILL -->`
      comments deleted.

## Handoff

| Consumer | Reads |
|----------|-------|
| 20-arabic-copywriter / 21-cultural-expert-gulf | Section C subject/human direction (wardrobe, modesty framing) |
| 22-brand-guardian | Section C lighting + product-direction fields (palette/tone fidelity) |
| 23-product-consistency-guard | Every `Product / oil direction` field in Section C |
| 24-negative-prompt-builder | Every `Negative-prompt touch points` field in Section C + Section E global tells |
| 25-prompt-optimizer / 26-kie-prompt-builder | The whole file — this is the shot-level detail the compiled prompt's paragraph and JSON render |
| 27-quality-checker | Section D (continuity cross-check) as its pre-flight reference for post-gen inspection |
| 28-creative-scoring-engine | Whole file, as the deep-dive evidence for Realism and Video rhythm/retention |
