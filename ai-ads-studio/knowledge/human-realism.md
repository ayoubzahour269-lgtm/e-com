# Human Realism — Anti-Uncanny Craft Reference

### Blink cadence, breathing, micro-expressions, smile onset/decay, gaze & saccades, hand/finger correctness, posture, skin texture — plus the pre-generation checklist and negative-prompt bank that suppress AI-face artifacts (mapped to UNBROKEN THREAD)

> **Knowledge base article — reference material, not a skill.** Dense, scannable, checklist-heavy
> craft reference for Stage 8's **17-human-realism-director** (the primary consumer — the render
> authority who turns this vocabulary into the flagship's locked eyes/hands/face/body spec) and its
> Stage 8 siblings **14-motion-director** (who times every micro-motion named here), **13-lighting-
> director** (who lights the catchlight and skin this document specs), **09-beauty-commercial-
> director** (who tastes the luminous-skin register), **16-hair-realism-director** (hand↔hair
> contact), **12-camera-director** (the lens/DoF that resolves pores and eyes), **21-cultural-
> expert-gulf** (the dignity floor every render obeys), and Stage 10–12
> (**23-product-consistency-guard**, **24-negative-prompt-builder**, **26-kie-prompt-builder**,
> **27-quality-checker**, **28-creative-scoring-engine**). Grounded in `STUDIO-BIBLE.md` §0
> (Realism is priority one — "it must look filmed, not generated"), §3 (product/audience — women
> ~22–45, warm-toned Gulf skin), §4 (product + hero-environment lock), §5 (culture/platform —
> modesty, calm confidence, 9:16), §6 (the flagship **UNBROKEN THREAD** — §6.1 beat sheet, §6.3
> overlays, §6.6 negatives), §7 (quality gates). **When this document and the Bible disagree, the
> Bible wins.** Nothing here invents a product claim, a lock detail, or new Arabic copy — every
> timing figure cited as "the flagship's" is quoted verbatim from **14-motion-director**'s human
> micro-motion timing chart (Output 3.5) and **17-human-realism-director**'s render specs (Outputs
> 3.4–3.8), never re-derived; this document teaches the **physiology and craft techniques those
> numbers are built from** and extends them into a reusable pre-generation checklist and
> negative-prompt bank the whole studio draws from for every future product.

**How this document relates to `17-human-realism-director`:** that skill is the **authoring
skill** — it reads this vocabulary (among its other inputs) and produces `human-realism.md`, the
locked per-beat human-render brief for the flagship. *This* document is the **craft reference
underneath it** — the physiology of a blink, a breath, a saccade, a genuine smile; the anatomy of
a hand; the optics of living skin — and the exact gear-free descriptive-prose phrasing that turns
each craft fact into a clause **26-kie-prompt-builder** can drop into the ONE Kie prompt. Use
`17-human-realism-director`'s `human-realism.md` for *what this ad's human already is*; use this
document for *why each render truth works, how to phrase it, and how to spec the next product's
human correctly*. Cross-ref `lighting-recipes.md` §3.2 (the beauty softbox and single catchlight
this document's eyes render inside) and `camera-movements.md` §3.1/§3.7 (the push-in and focus
pull that resolve the pores and eyes this document specs).

---

## 1. Scope & where this sits in the pipeline

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 8 | `17-human-realism-director` | The full physiological/anatomical grounding (§3–§10) behind its own zone library (Z1–Z7) and its anti-AI human checklist (Output 3.7); the phrasing banks (§3–§10) that seed its per-beat render language |
| 8 | `14-motion-director` | The blink/breath/saccade/smile **timing physiology** (§3, §4, §6, §7) that its human micro-motion chart (Output 3.5) is built from — the reason one blink, one breath, one built smile, offset and aperiodic, is the natural count |
| 8 | `13-lighting-director` | The catchlight and subsurface-scattering optics (§7, §10) its beauty softbox must render correctly |
| 7/9 | `09-beauty-commercial-director` | The pores-vs-plastic discipline (§10) that keeps "luminous realism" from tipping into airbrushed wax |
| 8 | `16-hair-realism-director` | The hand↔hair contact mechanics (§8) for the B3 glide and T3 sweep |
| 8 | `12-camera-director` | The macro/portrait DoF that must resolve pores, catchlights, and finger joints in focus, not smooth them away |
| 5/8 | `21-cultural-expert-gulf` | The dignity-floor cross-check (§2, §9) — aliveness must read as serene presence, never agitation or immodesty |
| 10 | `23-product-consistency-guard` | The grip-mechanics discipline (§8) that guarantees the hand never deforms the §4 bottle/cap/label/liquid |
| 10–11 | `24-negative-prompt-builder`, `26-kie-prompt-builder` | The **negative-prompt bank** (§12) and **phrasing formula** (§13) — gear-free descriptive prose and kill-list vocabulary ready to compile |
| 12 | `27-quality-checker`, `28-creative-scoring-engine` | The uncanny-tell taxonomy and pre-generation checklist (§11) as the naming convention for **Realism (human)** gate findings |

**Authority note:** every timed figure cited below as "the flagship's" (the 0.14 s blink, the
0.76 s breath, the 0.33 s smile build) is quoted from `14-motion-director` Output 3.5 and
`17-human-realism-director` Outputs 3.4–3.6 — this document does not set those numbers, it teaches
the physiology and craft vocabulary they are built from and shows how that vocabulary becomes
prompt prose, exactly as `lighting-recipes.md` does one layer up for light.

**The gear-free discipline (inherited, not re-argued here):** `kie_veo3`'s prompt dialect is a
natural-language paragraph, rewarded by descriptive scene language, not physiology-department
jargon (`cinematography-language.md` §9; `26-kie-prompt-builder` Rule R2). Every phrasing-bank
entry below is written as **descriptive prose describing what the render shows**, never as a
clinical/anatomical spec sheet ("orbicularis oculi contracts at 40 ms"). Where a table names a
physiological mechanism for craft grounding, treat it as the *reasoning layer*, never as literal
prompt text — the prose lines are what ship.

---

## 2. Why the human betrays a generation first — the uncanny valley in beauty-ad video

The Bible's first priority is **Realism — no visible AI artifacts; it must look filmed, not
generated** (§0). Of every surface a video model renders, the **human face, eyes, and hands**
fail first and worst, for three structural reasons every director on this pipeline should
internalize:

1. **Humans are the one subject every viewer is a lifelong expert in.** A viewer forgives a soft
   background, an imperfect shadow, or a slightly-off wood grain — they have no innate calibration
   for those surfaces. Every viewer, however, has processed millions of real faces and hands since
   infancy; the visual system is exquisitely tuned to detect the smallest anatomical or temporal
   error in a person, even when it cannot name what's wrong. This is the classic **uncanny valley**
   effect: as a rendered human approaches — but does not reach — full realism, perceived
   familiarity does not rise smoothly; it **drops sharply** into a "off"/eerie zone right before
   the top of the curve, then rises again only at true photorealism. A luxury beauty ad that stops
   short of that final climb reads worse than a stylized illustration would.
2. **The failure modes concentrate in a few small, information-dense zones.** The eyes carry
   emotional truth in a few square centimeters (pupil, catchlight, lid mechanics); the mouth
   carries the smile's genuineness in the relationship between two muscle groups; the hands carry
   twenty-seven bones and multiple joints per side in a small, frequently-occluded, frequently
   moving region. Small regions with high anatomical density are exactly where a frame-by-frame
   generative model is statistically most likely to drift, fuse, or miscount — which is why §3–§9
   below treat eyes and hands as the two deepest fights.
3. **Stillness is itself an artifact.** A real person is never perfectly static between deliberate
   actions — there is always a small blink, a breath, a postural micro-adjustment happening
   somewhere. A generated human that holds one expression, one gaze, one posture for a full beat
   reads as a **frozen mask** or a **mannequin**, even if every individual frame is anatomically
   correct. Aliveness is a *temporal* property, not just a *spatial* one — this is why §4 and §5
   (breath and micro-expression) matter as much as §7 and §8 (eyes and hands).

**The six-tell taxonomy this document (and `17-human-realism-director`) organizes around:**

| # | Uncanny tell | What the eye catches | Craft section that defeats it |
|---|--------------|------------------------|-------------------------------|
| U1 | **Dead eyes** | No blink, no/mismatched catchlight, a laser-locked stare | §3 Blink · §7 Gaze |
| U2 | **Wax skin** | Poreless, plastic, an oily "AI sheen" with no subsurface glow | §10 Skin |
| U3 | **Forced smile** | Symmetric snap-on grin; mouth smiles, eyes don't | §6 Smile |
| U4 | **Broken hands** | Wrong finger count, fused/spawning digits, a floating claw grip | §8 Hands |
| U5 | **Mannequin body** | No breath, square-frozen shoulders, a static held pose | §4 Breath · §9 Posture |
| U6 | **Warped/frozen features** | Melting features, or a face that never micro-adjusts between beats | §5 Micro-expressions |

**The governing reconciliation (R1, inherited from `17-human-realism-director`):** every render
truth below serves **"filmed, not generated."** A feature rendered *prettier* but *flawless,
still, symmetric, or dead* has **failed** Realism, not upgraded it. **Luminous but imperfect, calm
but alive, refined but real** is the resolution this whole document argues for — never smooth away
the pore, the blink, the asymmetry, or the breath in service of a "cleaner" frame.

---

## 3. Blink cadence & mechanics

The single highest-leverage anti-AI cue in a human-present beat. A face can be lit perfectly,
skin can glow correctly, and one missing or malformed blink still reads the whole shot as
generated.

**Physiology (real-world grounding):**

| Property | Real-world figure | Studio target |
|---|---|---|
| **Rate at rest** | A relaxed adult blinks roughly **15–20 times per minute** (about once every 3–4 seconds); rate drops during focused visual tasks and rises with dryness, glare, or nervous tension | The flagship keeper window is **1.4 s** (5.20–6.66 s) — physiologically, **exactly one** blink is the natural count for that span (14-motion-director Rule R3) |
| **Closure duration** | A spontaneous blink's active closure phase runs **~100–160 ms** (~3–4 frames at 24 fps); the wider full close-reopen cycle cited in vision-science literature can extend toward ~300–400 ms including the slower reopening tail | The flagship's locked blink is **~0.14 s (~3–4 frames)** — at the brisk, "settling" end of the natural range, appropriate for a blink that resolves *after* a gaze arrival rather than a slow, sleepy one |
| **Mechanism** | The **orbicularis oculi** contracts to close the lid; the **levator palpebrae superioris** relaxes then re-engages to reopen it — a smooth muscular roll, not a shutter-snap | Render as a **lid roll**: the upper lid does the vast majority of the travel, the lower lid barely rises, and the lashes move *with* the lid as one continuous surface |
| **Coverage** | At the bottom of a full blink the lid **fully covers the cornea** for a brief instant (~1 frame at 24 fps) | Never a half-close/droop; the corneal cover must be complete even if brief |

**AI failure modes this section defeats:**

- **Zero blinks** — the single most common and most damning tell; an unblinking gaze reads as
  embalmed even when every other feature is correct (§6.6 `dead stare`).
- **Texture-pop blink** — the eye simply disappears and reappears (an opacity cross-fade) instead
  of an anatomical lid roll; reads as a glitch, not a blink.
- **Half-blink / lazy droop** — the lid never reaches full corneal coverage.
- **Asynchronous double-eye blink** — the two eyes close/open on visibly different frames.
- **Nervous flurry** — three or more blinks in a short window reads anxious/glitchy, the opposite
  failure of the dead stare but equally unnatural for a calm, confident register (§5 dignity floor).

**Placement craft:** a blink that fires **during** a head turn or a smile build reads mechanical —
real people rarely blink mid-motion. The natural placement is **just after** a gaze settles on a
new fixation point (a "settling" blink), which is exactly why the flagship places its one blink at
6.06–6.20 s — a beat *after* the gaze arrival at ~5.98 s, never mid-turn (§7 below explains the
blink–saccade coupling this craft rule descends from).

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| The settling blink (keeper) | *"a soft, natural blink rolls closed and opens again just after her gaze settles on camera"* |
| General living-eye cue | *"her eyes hold a natural rhythm, blinking gently and unhurried, never fixed or staring"* |
| Anti-tell framing (positive form) | *"one soft blink, unforced, at ease — not a stare, not a flutter"* |

---

## 4. Breathing & the living body

The second of the three cues (with the blink and the built smile) that most separates a filmed
woman from a mannequin.

**Physiology (real-world grounding):**

| Property | Real-world figure | Studio target |
|---|---|---|
| **Rate at rest** | An adult at rest breathes roughly **12–20 times per minute**; a full inhale-exhale cycle spans roughly **3–5 seconds** | On camera you rarely need a full cycle — a single **visible inhale-and-ease** is sufficient proof of a living body within a short beat |
| **Visible motion** | The chest and shoulder line rise a few centimeters during inhale and ease back on exhale/settle; the motion is more visible through soft drape than through a fitted, structured fabric | The flagship's wardrobe (an elegant neutral drape / soft modest blouse, §5) is chosen partly *because* it reads breath clearly |
| **Character** | A natural breath has slight organic irregularity in speed and depth — it is not a metronomic pump | Avoid a breath that reads mechanically regular; the rise should ease, not snap, into its settle |

**Flagship mapping (14-motion-director Output 3.5):** the keeper's breath runs **6.12–6.88 s
(~0.76 s, ~18 frames)** — a subtle chest/shoulder rise then ease, overlapping the blink and the
smile build on **different start frames** (see §5's layered-offset principle). It does not need to
show a full 3–5 s respiratory cycle; the single visible inhale is the render target.

**AI failure modes this section defeats:**

- **Breathless statue** — a torso that never moves for the full hold; reads as embalmed even with
  a perfect blink and smile elsewhere (§6.6 `stiff mannequin motion`).
- **Metronomic breath** — a rise-and-fall so regular it reads as a looping animation cycle rather
  than a live, slightly irregular human rhythm.
- **Breath synchronized with the blink or smile** — see §5; real micro-motions never share a start
  frame.

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| The keeper's breath | *"her shoulders rise with a gentle breath and ease back, the drape moving softly with her"* |
| General living-body cue | *"a quiet breath moves through her, proof of a body at rest, never held still or frozen"* |

---

## 5. Micro-expressions & facial life between the beats

A face that holds one static expression between its "big" deliberate actions (the turn, the
blink, the smile) reads as a **frozen mask**, no matter how anatomically correct each individual
frame is (uncanny tell U6, §2). This is a *temporal* realism cue, and it is cheap to specify.

**The craft vocabulary — small, involuntary facial adjustments:**

| Micro-adjustment | What it looks like | Where it belongs |
|---|---|---|
| **Brow flick/settle** | A subtle raise or ease of the brows, independent of the smile | Between the gaze arrival and the smile build |
| **Lip micro-adjustment** | A tiny resettling of the resting mouth shape, not a smile | During any extended hold |
| **Cheek settle** | A faint muscular ease around the cheek after a held expression | Immediately after the smile's apex |
| **Micro-saccades** | Tiny involuntary eye movements during a "held" gaze (see §7) | Throughout any gaze hold |

**The layered-offset discipline (the studio's core anti-robot rule, inherited from
`14-motion-director` Rule R2):** real human micro-motions are **asynchronous and aperiodic** —
the turn, the gaze arrival, the blink, the breath, and the smile build each **start on a
different frame** and overlap loosely; **no two share a start frame**, and nothing repeats on a
fixed period. The flagship keeper spends its eight-frame-offset chart precisely this way: turn
5.32, gaze ~5.98, blink 6.06, breath 6.12, smile 6.22 — five distinct onsets across a 0.9 s span,
never bundled onto one frame. A version where the blink, breath, and smile all fire together is an
automatic robotic veto, because synchronized motion is a signature of a looping/templated
animation, not a living person.

**AI failure modes this section defeats:**

- **Frozen mask** — one static expression held through the entire beat between deliberate actions.
- **Synchronized micro-motion** — blink + breath + smile bundled onto the same frame; the "eight
  offset start frames, none synchronized" discipline exists specifically to prevent this.
- **Over-animated twitchiness** — the opposite failure: too much independent motion reads nervous
  or glitchy rather than calm and alive. One or two small adjustments per second is enough.

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| General aliveness between beats | *"small, natural shifts move through her expression — nothing held perfectly still"* |
| Offset-motion framing | *"her turn, her gaze, her breath and her smile each settle in their own moment, never all at once"* |

---

## 6. Natural smile onset, apex & decay

The mouth is the third major betrayal zone, and the fastest way to make a warm woman read fake.

**The three-phase curve — every genuine expression moves through it, never skips it:**

| Phase | What happens | AI failure if skipped |
|---|---|---|
| **Onset** | The expression builds gradually from neutral toward its peak | A **snap-on** expression that appears fully formed in a single frame — the loudest "forced smile" tell (§6.6 `weird/forced smile`) |
| **Apex** | A brief hold at or near peak intensity | An apex that is either absent (the expression flickers through) or unnaturally rigid/plateaued |
| **Decay/offset** | The expression eases back toward neutral or a resting soft state | An expression that **vanishes instantly** rather than releasing — as jarring as the missing onset |

**The Duchenne marker — what separates a genuine smile from a posed/social one:**

A genuine ("Duchenne") smile engages **two muscle groups together**, in a specific order:

1. **Orbicularis oculi** (the muscle ringing the eye) contracts first, producing a soft **eye
   crease** — the gentle crow's-feet lift that makes the eyes visibly "smile" before the mouth
   does.
2. **Zygomaticus major** (the cheek-to-mouth-corner muscle) lifts the corners of the mouth,
   typically producing a soft **nasolabial fold** (the crease running from nose to mouth corner).

A **posed or fake** smile, by contrast, is dominated by the zygomaticus alone — the mouth lifts,
the eyes stay comparatively flat — and tends to snap toward its peak faster and more symmetrically
than a spontaneous one.

**Timing & symmetry craft:**

| Property | Render target | The tell it defeats |
|---|---|---|
| **Order** | Eyes crease **1–2 frames before** the mouth begins to lift | A mouth-only smile with dead eyes (U3) |
| **Asymmetry** | One mouth corner **leads by a frame or two**, then the smile settles toward even | A perfectly symmetric grin that **snaps on** uniformly (U3) |
| **Build duration** | A soft, gradual build — the flagship's keeper builds over **~0.33 s (~8 frames, 6.22–6.55 s)** | An instant full-width smile appearing in one frame |
| **Teeth (if shown)** | Natural, faintly irregular, warm-white | A perfect "veneer wall" reads synthetic (U3) |
| **Restraint (§5 dignity floor)** | A **soft** micro-smile of quiet pride, not a wide toothy beam | An over-broad, un-modest grin reads both fake and culturally off-register |

**Flagship mapping:** the keeper's face must *earn* the transformation overlay **«كثافة وطول…
وشعر يتكلّم عنكِ»** (*kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki*, "Density and length… hair that
speaks for you," Bible §6.3) — the smile is the visible proof of the emotional payoff (pride,
restored confidence), which is exactly why it must read as **genuine** (Duchenne, asymmetric,
built) rather than performed.

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| The keeper's smile build | *"a soft smile builds slowly, her eyes creasing first with quiet warmth before the corners of her mouth lift"* |
| Restraint framing | *"a gentle, modest smile of quiet pride — not a wide grin, just a soft, genuine warmth"* |

---

## 7. Gaze, eye contact & saccades

The eyes carry the emotional truth of the whole shot in a few square centimeters. This is where
the studio spends its deepest craft effort (17-human-realism-director calls it "~80% of the
uncanny fight").

**Physiology (real-world grounding):**

| Concept | Definition | Render implication |
|---|---|---|
| **Fixation** | The eye holds relatively still on a point of interest for roughly **200–600 ms** between jumps | A held gaze is a *fixation*, not a frozen state — it still contains micro-saccades (below) |
| **Saccade** | A fast, ballistic jump between fixation points, lasting roughly **20–200 ms** depending on distance — too fast for the visual system to perceive detail *during* the jump itself | A gaze arrival (e.g. the keeper's turn-to-camera) is a saccade landing on a new fixation, not a smooth analog pan |
| **Micro-saccades** | Tiny, involuntary eye movements (a few arcminutes) that occur even during a steady fixation, several times per second | **Critical realism cue**: an eye "holding" a gaze is never perfectly still; render a subtle, continuous liveliness in a held stare, never a frozen marble |
| **Binocular convergence** | Both visual axes intersect at the actual fixation distance; at close range (a lens 30–60 cm away) the eyes converge slightly rather than pointing perfectly parallel | A face looking at a near lens needs both eyes aimed at **the same near point** — parallel or divergent gaze at close range is a strong, common AI tell ("wall-eye")|
| **Blink–gaze coupling** | In natural behavior, blinks frequently cluster around a shift in visual attention — people commonly blink just after their gaze lands on something new | Grounds the flagship's placement rule: the one blink lands **after** the gaze arrives (§3), never mid-saccade |

**The eyeline law (continuity, from `08-storyboard-director`):** in the flagship, the model's eyes
meet the lens **only** at the B4 keeper beat (5.2–6.6 s) — off-lens/downcast through B2 (hand on
the bottle) and B3 (fingertips on the scalp/hair). This is not an arbitrary rule: reserving direct
eye contact for the emotional payoff beat is a general craft principle — **the eyes always need a
motivated reason to look where they look**, the same discipline `lighting-recipes.md` applies to
"motivated light." A gaze that meets camera too early flattens the reveal's power; a gaze that
never arrives wastes the keeper entirely.

**Catchlight & wetline (co-owned with the lighting recipe, `lighting-recipes.md` §3.2):**

- **One** clean specular catchlight, in the **same relative position in both eyes**, sourced from
  the single beauty-softbox key. Zero catchlights reads as dead/glassy; multiple or mismatched
  catchlights reads as multi-source over-lighting.
- A faint **wetline** (tear-film moisture along the lower lid) is the single cue that separates a
  living, wet eye from a dry, doll-like marble.
- **Round, matched pupils** — never oval/warped, never mismatched in size between the two eyes.

**AI failure modes this section defeats:**

- **Wall-eye / cross-eye** — divergent convergence; the two eyes point at visibly different targets.
- **Frozen laser-lock** — a gaze that arrives instantly and holds with zero micro-saccade life.
- **Premature or missing eyeline** — eyes meeting camera before the continuity ledger allows, or
  never arriving at the payoff beat at all.
- **No catchlight / mismatched catchlight** — the "dead glassy eyes" tell.

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Gaze arrival (keeper) | *"her gaze arrives softly on the lens as she turns, settling with a small, living stillness"* |
| Held gaze | *"her eyes hold steady but never freeze, a faint natural liveliness in the stare"* |
| Catchlight cue | *"a single soft catchlight glimmers in each eye, matched and clean"* |
| Off-lens gaze (B2/B3) | *"her eyes stay low, focused on her hands, never drifting to camera"* |

---

## 8. Hands & finger correctness

The second-deepest fight. This ad places a hand on the hero product (§4 bottle lift) and on the
scalp/hair (the ritual massage and the hair-sweep transition) — both are high-scrutiny, high-motion
contact zones where AI generation fails most often.

**Anatomy craft (the vocabulary a director specs against):**

| Structure | Fact | Render implication |
|---|---|---|
| **Digit count** | Five digits per hand: one thumb + four fingers | **Held constant through every frame**, including mid-motion — the AI failure is a finger that spawns, fuses, or vanishes *during* a fast move, not just in a static pose |
| **Phalanges (finger bones)** | Each of the four fingers has **three** segments (proximal, middle, distal); the thumb has **two** (proximal, distal) | Fingers bend only at their joints, with correct segment proportions — not a smooth "rubber hose" curl |
| **Joints** | MCP (knuckle, at the hand), PIP (middle), DIP (near the tip) for fingers; two joints for the thumb | Knuckles crease visibly on a bend; joints never hyperextend or bend backwards |
| **Length order** | Middle finger longest, index and ring roughly similar, pinky shortest; thumb set lower and opposed | Uniform "sausage" fingers of equal length is a common failure signature |
| **Nails** | One natural nail per digit | Melted, doubled, or missing nails — or a nail count that doesn't match the finger count — is an easy-to-spot tell |
| **Surface detail** | Knuckle creases, subtle tendon relief on the back of the hand, faint veins | A smooth, textureless hand reads as a "plastic mitten" (skin failure U2 applied to the hand) |

**Grip & contact mechanics — the craft that separates a "held" object from a "floating" one:**

A believable grip shows **contact deformation**: the finger pads visibly flatten slightly where
they press against a rigid surface (glass, PET plastic), the thumb opposes across the object's
body, and the wrist sits at a natural angle. A hand that hovers near an object without this subtle
give — a "floating claw" — is as uncanny as a missing finger, because the eye reads weightlessness
as wrongness even when finger count is correct.

**Product-lock discipline (co-owned with `23-product-consistency-guard`):** where the hand
contacts the hero product, the grip must **never deform the §4 lock** — the clear rounded-
rectangular ~250 ml PET bottle body, the **matte white ribbed screw cap** (never gold or black),
the **«زيت المشاط»** (*zayt al-mishāṭ*, "Mechat oil") label, or the **translucent deep garnet oil**
inside it. The hand serves the product; the product never bends, squashes, or re-scales to fit the
pose.

**AI failure taxonomy:**

| Failure | What it looks like |
|---|---|
| **Count error** | Six-plus fingers, four-or-fewer, or a finger that appears/disappears mid-motion |
| **Topology error** | Fused digits, a "spawning" finger growing out of another, backwards/hyperextended joints |
| **Proportion error** | Uniform sausage-length fingers, a giant or tiny hand relative to the object it holds |
| **Contact error** | A floating claw grip with no visible contact deformation; or the inverse — a grip that deforms the held object instead of molding to it |
| **Extra limb** | A third arm or a disembodied second hand entering frame |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Weighted product grip | *"her fingers wrap the bottle with a natural, weighted grip, the pads gently pressing against the glass as she lifts it"* |
| Scalp massage contact | *"her oiled fingertips press in small, organic circles at the roots, the scalp giving slightly under a gentle touch"* |
| Hair-sweep contact | *"her fingers slide through the section of hair as it sweeps past, the strands parting naturally between them"* |

---

## 9. Posture, shoulders & body language

The body's stillness or life reads even when the face is out of frame or in profile.

**Craft targets:**

| Zone | Render target | Failure it defeats |
|---|---|---|
| **Neck (on a turn)** | A natural arc through the turn, with a soft relief along the neck's side muscle line; the head sits on the neck at a comfortable angle | An "owl-neck" over-rotation, or a neck that pivots as a rigid single unit with the head |
| **Shoulders** | Relaxed and level, carried naturally, with a soft collarbone line under the drape | Perfectly square, symmetric, mannequin-stiff shoulders |
| **Weight & carriage** | Settled, calm, with natural asymmetric ease — a real body has weight | A too-perfectly-centered, statically posed stance that reads like a stock 3D rig |

**The calm-alive reconciliation (§5 dignity floor, cross-checked by `21-cultural-expert-gulf`):**
aliveness (a breath, a micro-adjustment, a soft gaze life) must read as **serene presence**, never
agitation, fidgeting, or anything approaching provocative. The studio's target is a woman who is
**calm and confident** — alive, not restless.

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| The turn | *"she turns naturally over her shoulder, her neck arcing softly, her shoulders relaxed and level"* |
| Settled posture | *"she carries herself with calm, settled ease — poised, not stiff"* |

---

## 10. Skin texture — pores vs plastic

The skin is where "luminous beauty" and "AI wax" are separated by a handful of specific, namable
cues.

**The optics of living skin:**

| Property | Physics | Render implication |
|---|---|---|
| **Subsurface scattering** | Skin is translucent; light penetrates a few millimeters and scatters internally before exiting, most visibly at thin tissue (ear edges, nose tip, cheek) when backlit or rim-lit | This is the source of skin's characteristic **glow** — a purely opaque/diffuse render (light bouncing straight off the surface with no internal scatter) reads as **painted or waxy**, not living |
| **Pore density & distribution** | Pores are finer and denser across the T-zone (forehead, nose, chin) and less prominent on the cheeks; every real face shows some visible texture at macro/portrait distance | Visible pores are a **realism cue, not a flaw** — a face rendered fully poreless at close range is one of the fastest "beauty filter" tells |
| **Vellus hair** | Fine, near-invisible "peach fuzz" covers most facial skin; it catches a rim/kicker light as a soft, hazy edge | A rim-lit face with **no** vellus catchlight reads subtly synthetic even when pores are present |
| **Flush & micro-imperfection** | Real skin carries a natural, uneven warm flush (cheeks, nose) and small individual marks (a faint mole, slight asymmetry, a little under-eye softness) | **Perfection is the tell.** A face airbrushed to total uniformity, however "flattering," reads as generated |
| **Specular control** | A single controlled specular highlight (from the one softbox key) reads as intentional lighting; a broad, uniform oily sheen across the whole face reads as an "AI sheen" artifact | Keep highlights localized and motivated by the lighting recipe (`lighting-recipes.md` §3.2), never a blanket gloss |

**The luminous-realism resolution (co-owned with `09-beauty-commercial-director`):** the studio's
target is **dew with pores, glow without wax** — flatter the skin with warmth and light, but never
at the cost of texture, flush, or micro-imperfection. This is the same beauty-perfection-vs-human-
truth tension named in §2 and resolved the same way every time: luminous *and* real, never one at
the expense of the other.

**AI failure modes this section defeats:**

- **Poreless "beauty filter" skin** — smooth, uniform, no visible texture at any distance.
- **Uniform oily AI sheen** — a broad, unmotivated specular gloss across the whole face rather than
  one controlled highlight.
- **Over-smoothing that erases transitions** — a hairline, jaw edge, or eyebrow that blurs into the
  skin because fine detail was smoothed away along with texture.
- **Waxy uniform color** — skin with no micro-variation in tone, reading as a single flat material
  rather than living tissue.

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| General skin truth | *"her skin is warm and luminous, fine natural texture and a soft flush visible at close range"* |
| Rim-lit macro | *"a warm edge light catches the fine down along her cheek, her skin glowing softly from within"* |
| Anti-wax framing (positive form) | *"skin that looks alive and lit, never smoothed to a flawless sheen"* |

---

## 11. The pre-generation anti-AI human checklist

**Run this before any generation is authorized (Bible §7 gate).** It is zone-by-zone, pass/fail;
**any single FAIL blocks the generation** — rewrite the render language and re-run. This is the
general, reusable version of the gate `17-human-realism-director` fills in for the flagship
(Output 3.7); use it as-is for any future product's human-present beat.

**Eyes & gaze**
- ☐ Exactly **one** blink in the hold window (never zero, never a flurry), placed **after** the
  gaze settles, not mid-motion (§3)
- ☐ **One** clean, matched catchlight in both eyes; no zero-catchlight glassy stare, no mismatched
  multiples (§7)
- ☐ Correct binocular convergence at the lens distance — no wall-eye, no divergent gaze (§7)
- ☐ Micro-saccade liveliness during any held gaze — never a frozen, statue-still eyeball (§7)
- ☐ Gaze meets camera only where continuity allows; off-lens elsewhere (§7)

**Skin**
- ☐ Visible pores and fine texture at close/macro range — no airbrushed poreless "filter" look (§10)
- ☐ A natural flush and at least one micro-imperfection — not uniform perfection (§10)
- ☐ A single controlled specular highlight, not a broad oily sheen (§10)

**Mouth & smile**
- ☐ Eyes crease **before** the mouth begins to lift (Duchenne order) (§6)
- ☐ Asymmetric onset that **builds** over a fraction of a second — never a symmetric instant snap (§6)
- ☐ A restrained, modest register — not a wide toothy beam (§6, §9)

**Hands & fingers**
- ☐ Exactly **five** digits per visible hand, held constant through every frame including motion (§8)
- ☐ Correct joint count and bend direction; no fused, spawning, or backwards-bending digits (§8)
- ☐ One nail per digit; hand proportional to what it holds; one forearm per hand (§8)
- ☐ Visible contact deformation on any grip — no floating claw — and **no deformation of the
  product** it holds (§8)

**Body & breath**
- ☐ A visible, gentle breath somewhere in any extended hold — never a motionless torso (§4)
- ☐ Natural neck arc and relaxed, level shoulders on any turn — no owl-neck, no square-mannequin
  posture (§9)

**Temporal & dignity**
- ☐ At least one small facial micro-adjustment during any extended hold — never a frozen mask (§5)
- ☐ No two major micro-motions (blink, breath, smile) share a single start frame — layered and
  offset, never synchronized (§5)
- ☐ Features are stable frame to frame — no melting, warping, or drifting jaw/ear/eye (§2)
- ☐ The render reads refined, calm, modest, dignified — never provocative or agitated (§9)

**Master verdict:** ☐ ALL PASS → clear for generation · ☐ ANY FAIL → rewrite the render language
and re-run; never generate on a failing human (Bible §0, §7).

---

## 12. Negative-prompt bank that suppresses AI-face artifacts

Organized by zone, extending the Bible §6.6 master negative-prompt core (`plastic/waxy skin, AI
sheen, extra fingers, extra arms, malformed hands, warped face, uncanny eyes, dead stare, stiff
mannequin motion, weird/forced smile`) — never replacing it. Route the full bank to
`24-negative-prompt-builder`; `26-kie-prompt-builder` compiles the relevant subset per beat.

| Zone | Negatives |
|---|---|
| **Eyes & gaze** | `uncanny eyes, dead stare, dead glassy eyes, no catchlight, missing catchlight, multiple/mismatched catchlights, no blink, unblinking gaze, half-blink, texture-pop blink, nervous blink flurry, cross-eyed, wall-eyed, divergent gaze, drifting eye, warped/oval pupil, mismatched pupils, dry matte eyes, frozen eyeballs, laser-locked stare` |
| **Skin** | `plastic/waxy skin, AI sheen, airbrushed poreless skin, over-smoothed face, uniform oily gloss, waxy uniform skin tone, plastic mitten hands` |
| **Mouth & smile** | `weird/forced smile, symmetric snapped-on smile, mouth-only smile with dead eyes, instant full-width smile, veneer-wall AI teeth, over-broad grin` |
| **Hands & fingers** | `extra fingers, six fingers, missing fingers, fused fingers, spawning finger, backwards/hyperextended joints, rubber/boneless fingers, sausage fingers, claw grip, floating non-contact hand, giant/tiny hand, melted/doubled/missing nails, nail count mismatched with fingers, extra arm, third arm, disembodied hand, hand deforming held object` |
| **Body & breath** | `stiff mannequin motion, robotic/mechanical movement, breathless motionless torso, square/hunched shoulders, owl-neck over-rotation, impossibly still body` |
| **Temporal & global** | `warped face, melting features, drifting/morphing face across frames, frozen mask face, synchronized micro-motion, metronomic/periodic motion, constant-velocity movement, provocative/immodest pose, temporal warping, flicker, frame jitter` |

---

## 13. Phrasing formula & assembly pattern

**The sentence-formula for one beat's human render (assemble in this order, then smooth into
prose):**

1. **Name the action, not the mechanism** — "her gaze settles softly," never "the orbicularis
   oculi engages" (those are §3–§10's *reasoning* vocabulary, not prompt tokens).
2. **State the render truth as an observable effect** — "a soft blink," "one clean catchlight," "a
   gentle breath" — what the camera would actually see, not the physiology behind it.
3. **Name the texture/imperfection explicitly when it matters** — "fine natural texture," "a small
   natural mark" — because omitting it invites the model toward its default smoothed output.
4. **Close on continuity, where relevant** — a clause connecting to what came before ("as she
   turns," "just after her gaze lands") so the render reads as one continuous, living moment.
5. **Never phrase a target as a negation** — describe only what should exist ("a soft, natural
   blink"), never "a blink that isn't robotic"; route flaw-avoidance language to the dedicated
   negative-prompt field (§12).

**Worked example (the keeper, TRANSFORMATION beat, assembled from the formula above):**
> *"…she turns toward camera, her neck arcing naturally and her shoulders settling relaxed and
> level; her gaze arrives softly on the lens with a small, living stillness, one clean catchlight
> glimmering in each eye; a soft blink rolls closed and opens just after her gaze lands; her
> shoulders rise with a quiet breath and ease back; and a gentle smile builds slowly, her eyes
> creasing first with warmth before the corners of her mouth lift — her skin luminous with fine
> natural texture, alive and unhurried, never posed."*

This mirrors the studio's own compiled-language discipline (`cinematography-language.md` §9;
`lighting-recipes.md` §7) — observable human truth fused into one flowing sentence, never a
clinical checklist dumped into the prompt.

**Anti-patterns (never write these into the compiled paragraph):**

| Anti-pattern | Why it fails | Correct alternative |
|---|---|---|
| Anatomical/clinical jargon (*"orbicularis oculi engagement at frame 8"*) | A language-conditioned video model responds to scene description, not physiology terminology | Translate to effect: *"her eyes crease into a soft smile"* |
| Frame-number literals in the prose (*"blinks at 6.06s"*) | Timing belongs to the motion chart (14), not the render description | Translate to sequence: *"just after her gaze settles"* |
| Negative-phrased positives (*"eyes that aren't dead or glassy"*) | Seeds the exact flaw it tries to negate; that job belongs to §12's dedicated field | State only the positive target; route the flaw to the negative-prompt field |
| Over-specifying perfection (*"flawless, poreless glowing skin"*) | Directly seeds the U2 wax-skin failure mode | Specify texture explicitly: *"fine natural texture, a soft flush, warm and alive"* |
| Stacking every zone into one run-on clause | Fractures readability and buries the load-bearing cues | One flowing sentence per beat, sequenced logically (eyes → blink → breath → smile → skin) |

---

## 14. Do / Don't table

| DO (this document's craft) | DON'T (the generic/AI-tell opposite) | Flagship evidence |
|---|---|---|
| Exactly one blink, placed after a gaze settles (§3) | Zero blinks (dead stare) or a nervous flurry | Keeper blink at 6.06–6.20 s, just after gaze arrival ~5.98 s |
| A visible, single gentle breath in any extended hold (§4) | A breathless, motionless torso | Keeper breath 6.12–6.88 s, ~1–2 cm shoulder rise |
| Layered, offset, aperiodic micro-motion — nothing synchronized (§5) | Blink + breath + smile firing on one frame | Five distinct onsets across a 0.9 s span, no shared start frame |
| A Duchenne, asymmetric, gradually-built smile (§6) | A symmetric grin snapping on in one frame | Keeper smile builds 6.22–6.55 s, eyes crease first |
| Correct convergence, one matched catchlight, micro-saccade life in a held gaze (§7) | Wall-eye divergence, zero/mismatched catchlights, a frozen laser-lock | Keeper gaze arrives softly, holds with life, single softbox catchlight |
| Exactly five digits, correct joints, visible contact deformation on any grip (§8) | Extra/fused/spawning fingers, a floating claw, a deformed product | B2 weighted bottle grip that never bends the §4 label |
| Natural neck arc, relaxed level shoulders, settled weight (§9) | Owl-neck over-rotation, square-mannequin shoulders | Keeper's over-the-shoulder turn |
| Visible pores, flush, and at least one micro-imperfection (§10) | Airbrushed poreless "beauty filter" skin | Luminous-realism skin thesis, co-owned with 09 |
| Gear-free, observable-effect prose for every phrase (§13) | Clinical/anatomical jargon or frame-number literals in the shipped prompt | The §13 compiled worked example |
| Positive-only phrasing, flaw-avoidance routed to the negative field (§12–§13) | Negative-phrased positives in the descriptive prose | The anti-pattern table (§13) |

---

## 15. Glossary

Alphabetical; general craft/physiology knowledge, not flagship-specific invention.

- **Aperiodic** — not repeating on a fixed cycle; the property real micro-motions have and looped
  animation lacks (§5).
- **Binocular convergence** — both eyes' visual axes intersecting at the actual point of regard;
  necessary for a believable gaze at close range (§7).
- **Contact deformation** — the subtle give of a finger pad or grip surface where it presses
  against a held object; the cue that separates a "held" object from a "floating" one (§8).
- **Duchenne smile** — a genuine smile marked by combined orbicularis oculi (eye) and zygomaticus
  major (mouth) engagement, as distinct from a posed/social smile driven by the mouth alone (§6).
- **Fixation** — a period where the eye holds relatively still on a point of interest, roughly
  200–600 ms, between saccades (§7).
- **Layered offset** — this studio's core anti-robot timing discipline: every micro-motion (turn,
  gaze, blink, breath, smile) starts on a different frame and overlaps loosely, never synchronized
  (§5; `14-motion-director` Rule R2).
- **Levator palpebrae superioris** — the muscle that raises the upper eyelid; relaxes during a
  blink's closure and re-engages to reopen it (§3).
- **Micro-saccade** — a tiny, involuntary eye movement occurring even during a steady fixation;
  the cue that keeps a "held" gaze from reading as a frozen marble (§7).
- **Nasolabial fold** — the crease running from the side of the nose to the corner of the mouth,
  visible during a genuine smile as the zygomaticus lifts (§6).
- **Orbicularis oculi** — the sphincter-like muscle ringing the eye; its contraction produces both
  a blink's closure and a genuine smile's eye-crease (§3, §6).
- **Saccade** — a fast, ballistic eye movement between two fixation points, roughly 20–200 ms
  (§7).
- **Subsurface scattering** — the optical phenomenon where light penetrates translucent tissue
  (skin) a short distance and scatters internally before exiting, producing living skin's
  characteristic inner glow; absent in a purely diffuse/opaque render (§10).
- **Uncanny valley** — the effect where a rendered human's perceived familiarity drops sharply as
  realism approaches — but does not reach — true photorealism, before rising again only at full
  realism (§2).
- **Vellus hair** — fine, near-invisible facial "peach fuzz" that catches rim/kicker light as a
  soft, hazy edge; its absence under a strong edge light is a subtle realism tell (§10).
- **Wetline** — the faint tear-film moisture along the lower eyelid and inner corner; the cue that
  reads an eye as a wet, living sphere rather than a dry, matte marble (§7).
- **Zygomaticus major** — the muscle running from the cheekbone to the mouth corner; its
  contraction lifts the corners of the mouth during a smile (§6).

---

## 16. Quick-reference checklist

Before any human-present beat is handed to `12-camera-director`, `13-lighting-director`,
`14-motion-director`, or compiled by `26-kie-prompt-builder`, confirm:

- [ ] Exactly one blink is specified for any extended hold, placed after a gaze settles, never
      mid-motion, never zero, never a flurry.
- [ ] A visible, single gentle breath is specified for any extended hold — a torso is never
      described as motionless.
- [ ] The blink, breath, gaze arrival, and any smile are each given **different** onset points —
      none are bundled onto a single synchronized moment.
- [ ] Any smile is specified as building gradually, eyes creasing before the mouth, asymmetric
      onset — never an instant symmetric grin.
- [ ] Any held gaze is described with life (a small natural liveliness), never as frozen or
      laser-locked; convergence at the correct distance is implied by "meets the lens," not
      "stares straight ahead."
- [ ] Skin is described with explicit texture cues (fine texture, a soft flush, a small natural
      mark) — never described only as "flawless" or "glowing" with no texture qualifier.
- [ ] Any hand is specified with a natural grip that visibly contacts and holds — never a
      description that could render as a floating or non-contacting hand.
- [ ] Where a hand touches the hero product, the language protects the §4 lock explicitly (the
      grip serves the product; the product does not bend to the hand).
- [ ] Posture is described as settled and relaxed, with a natural neck/shoulder line — never
      "perfectly straight," "symmetric," or "still" without a life qualifier.
- [ ] Every flaw-avoidance instinct is routed to the negative-prompt field (§12), never phrased as
      a negation inside the descriptive prose (§13).
- [ ] Any Arabic line quoted for context (an overlay, the product name) is cited from the Bible
      verbatim, with transliteration and English gloss on first use — never re-authored.
