# Cinematography Language — Shot Sizes, Angles, Composition, Lens Craft & AI-Prompt Phrasing

### The formal grammar of "how a frame is built" — shot sizes, camera angles, composition (thirds, negative space, symmetry), lens language, depth of field, frame rate & slow-motion aesthetics, and motion feel — plus the phrasing formulas that turn all of it into the ONE Kie prompt — mapped to UNBROKEN THREAD

> **Knowledge base article — reference material, not a skill.** Dense, scannable, checklist-heavy
> cinematography-craft reference for Stage 7–8 (**11-cinematography-director**,
> **12-camera-director**, **13-lighting-director**, **14-motion-director**), Stage 7's co-authors
> (**08-storyboard-director**, **09-beauty-commercial-director**, **10-luxury-commercial-director**),
> and Stage 11 (**25-prompt-optimizer**, **26-kie-prompt-builder** — the skill that turns this
> vocabulary into the single natural-language paragraph a video model reads). Grounded in
> `STUDIO-BIBLE.md` §3 (product/palette/fonts), §4 (product + hero-environment lock), §5
> (culture/modesty + platform — 9:16, 1080×1920+, 24–30 fps, safe margins top ~14% / bottom ~20%,
> hook windows Meta 0–3 s / TikTok 0–2 s / Snap 0–1.5 s), §6 (the flagship **UNBROKEN THREAD** —
> §6.1 beat sheet, §6.3 overlays, §6.6 negatives), §7 (quality gates). **When this document and
> the Bible disagree, the Bible wins.** Nothing here invents a product claim, a lock detail, a
> camera package, or new Arabic copy — every technical figure below (camera body, lens family,
> T-stop, fps, safe margins) is quoted from **11-cinematography-director** and
> **12-camera-director**'s own locked output, never re-derived; every Arabic line reused is quoted
> verbatim from Bible §6.3.

**How this document relates to `luxury-beauty-ad-language.md`:** that document names the
**house-derived shot vocabulary** (hero product shot, beauty pass, product orbit, pour shot) and
the **pacing discipline** of luxury beauty commercials. *This* document is one level underneath
it — the **formal cinematography grammar** every one of those shot types is built from (what size
is a "hero product shot" actually framed at, what angle, what composition rule, what lens, what
depth of field, what frame rate) and the **phrasing formulas** that turn that grammar into the one
prose paragraph `26-kie-prompt-builder` compiles. Use `luxury-beauty-ad-language.md` for *which*
shot to reach for and *why it reads luxury*; use this document for *how to specify it precisely*
and *how to phrase it for a video model*. The shared glossary lives in
`luxury-beauty-ad-language.md` §8; terms unique to this document are defined inline in their
tables, not repeated there.

---

## 1. Scope & where this sits in the pipeline

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 7 | `08-storyboard-director` | The shot-size and angle vocabulary (§2–3) that seeds the storyboard's per-beat `beat.camera` hints before 11/12 ratify them |
| 7 | `11-cinematography-director` | The lens-language and depth-of-field vocabulary (§5–6) it uses to write the master look brief's glass/DoF map; the frame-rate/slow-motion naming (§7) behind its cadence law |
| 8 | `12-camera-director` | The shot-size/angle/composition grammar (§2–4) it executes into exact moves; the motion-feel vocabulary (§8) behind its motivated-movement charter |
| 8 | `13-lighting-director` | The composition vocabulary (§4 — negative space, frame-within-frame) that its lighting shapes must respect |
| 8 | `14-motion-director` | The frame-rate/slow-motion and motion-feel vocabulary (§7–8) it times to the frame |
| 9 | `09-beauty-commercial-director`, `10-luxury-commercial-director` | The composition and lens language (§4–5) that keeps macro-beauty and orbit shots inside the studio's restraint discipline |
| 11 | `25-prompt-optimizer`, `26-kie-prompt-builder` | The **phrasing patterns** (§9) — the exact translation from technical spec (mm, T-stop, fps) to the descriptive prose a Veo-3-class model rewards |
| 12 | `27-quality-checker`, `28-creative-scoring-engine` | The shot-size/angle/composition/DoF/cadence vocabulary as the naming convention for **Realism** and **Video rhythm/retention** gate findings |

**Authority note:** every camera body, lens, T-stop, and cadence figure cited below as "the
flagship's" value is quoted from `11-cinematography-director` Outputs 3.2–3.7 and
`12-camera-director` Outputs 3.1–3.6 — this document does not set those numbers, it teaches the
vocabulary they are written in and shows how that vocabulary becomes prompt prose.

---

## 2. Shot-size taxonomy

The industry-standard ladder of framing sizes, defined by how much of the subject fills the
frame — not by camera distance (distance changes with focal length; size is about *frame
coverage*). This is the vocabulary a shot list or director's brief specifies before angle or lens
is even discussed.

| Size (abbr.) | Definition | Typical subject coverage | Beauty-commercial use | Flagship beat |
|---|---|---|---|---|
| **Extreme close-up (ECU)** | Fills the frame with a single small detail | A pore, a droplet, a strand, an eye | Product macro, texture proof, the pain image | HOOK comb/strand (0.0–1.2 s); the pour macro (3.0–3.4 s) |
| **Close-up (CU)** | Frames a face from chin to forehead, or an object filling most of frame | A face, a held product | The emotional read; the label-legible product hero | DISCOVERY label settle (1.6–3.0 s) |
| **Medium close-up (MCU)** | Frames roughly chest/shoulders to top of head | Head + shoulders | Portrait beats where hands or gesture still read | TRANSFORMATION turn (5.2–6.6 s) |
| **Medium shot (MS)** | Frames roughly waist to head | Torso + head, gesture space | Ritual/application beats where hand-to-hair contact must read | RITUAL fingertip/glide (3.4–4.8 s), wide framing option |
| **Medium long shot (MLS)** | Frames roughly knee to head | Full gesture + some set | Rarely used in an 8 s vertical cut — the runtime has no spare beat for it | Not used in the primary 8 s cut |
| **Long shot / wide shot (LS)** | Subject is small in a full environment | The whole set with the subject inside it | Establishing context — the flagship's 8 s runtime never spends a beat on this (matches `luxury-beauty-ad-language.md` §2 "wide establishing shot: not used") | Not used |
| **Extreme wide shot (EWS)** | Subject is a small element in a vast frame | Landscape/architecture scale | Not a beauty-commercial size at all in a direct-response vertical cut | Not used |
| **Macro / insert** | Not a distance-based size but a **magnification** register — the lens renders the subject at or near life-size (1:1) or larger, isolating it from any spatial context | A droplet, a strand, a pore, a comb tooth | The studio's core intimacy device; distinct from ECU because the DoF collapse is total, not just tight framing | HOOK, T1, T2, RITUAL — the four macro-registered beats of the flagship |

**The vertical-format correction (9:16):** every size above assumes a 16:9 framing reference;
in the studio's mandatory **9:16** vertical format (Bible §5), a size that would read as MS in
landscape reads tighter in portrait because there is less horizontal room to spread a subject —
size names still describe *frame coverage of the subject*, but a director writing for 9:16
should default one size tighter than landscape instinct suggests (an MCU landscape habit often
needs to be specified and shot as a CU in 9:16 to avoid excess headroom on either side).

**Sizing rule for this studio:** the flagship never uses anything wider than an MCU (§2 table);
the entire 8 s cut lives in **macro → ECU → CU → MCU**, which is itself a luxury-craft signal
(`luxury-beauty-ad-language.md` §3 "low cut count, high shot duration" — the corollary is *tight,
intimate sizes*, never a wide establishing beat the runtime can't afford).

---

## 3. Camera angle vocabulary

Angle is the vertical relationship between the camera and the subject's eyeline — a separate
axis from size. Angle carries **power and dignity** connotations before it carries anything else,
which is why Bible §5's modesty/respect floor and `12-camera-director` Rule R8 both treat angle
as a cultural constraint, not just an aesthetic one.

| Angle | Definition | Emotional/power read | Studio status | Flagship use |
|---|---|---|---|---|
| **Eye-level** | Camera sits at the subject's eye height | Equal, respectful, intimate, honest | **Default and mandatory** for any beat with the model in frame (12 R8) | TRANSFORMATION (5.2–6.6 s) — explicit eye-level over-the-shoulder arc to eye contact |
| **High angle (looking down)** | Camera is above eye height, tilted down | Diminishes, pities, or infantilizes the subject | **Banned on the model** (Bible §5 dignity floor; 12 R8 Failure Condition) | Never used |
| **Low angle (looking up)** | Camera is below eye height, tilted up | Empowers or monumentalizes the subject — can read as aggressive/unnatural if overused | Not used in the flagship; reserved as a documented option only for a hero product beat, never the model's face | Not used |
| **Overhead / bird's-eye** | Camera looks straight down | Clinical, map-like, or voyeuristic depending on context | Not used — no beat calls for it and it would read clinical against the warm intimacy thesis | Not used |
| **Point-of-view (POV)** | Frame represents what a character sees | Subjective immersion | Not used — the flagship is always observational, never claims to be "her eyes" | Not used |
| **Over-the-shoulder (OTS)** | Camera positioned behind/beside a subject as a second subject or reveal is seen past them | Discovery, intimacy, "felt not presented" | Core device of the keeper beat | TRANSFORMATION (5.2–6.6 s) — the natural over-the-shoulder turn to camera (`luxury-beauty-ad-language.md` §2 "over-the-shoulder reveal") |
| **Dutch / canted angle** | Camera rotated off the horizontal axis | Unease, disorientation, stylized tension | **Banned** — reads as a horror/thriller device, has no place in a warm luxury register, and is an explicit `12-camera-director` anti-drift tell ("dutch/tilt for no reason") | Never used |
| **Product-level macro angle** | Camera height matched to the product/detail itself, neither above nor below | Neutral, respectful of the object, lets material read honestly | Default for every macro/product beat | HOOK (comb at product level); DISCOVERY/OFFER (bottle at near-eye-level, square to label) |

**Angle discipline for product beats:** the bottle is never shot from a steep angle that would
keystone (distort) the rectangular label — DISCOVERY and OFFER hold **near-eye-level, square to
the label** specifically so **«زيت المشاط»** (*zayt al-mishāṭ*, "Mechat Oil") reads undistorted
(§4 lock; `12-camera-director` R6). A tilted or steep-angle product shot is a product-consistency
risk, not just a compositional preference.

---

## 4. Composition grammar

How elements are arranged inside the frame. Composition is the layer most responsible for a shot
reading "luxury" versus "amateur" independent of subject matter — the same bottle, framed with
discipline versus framed carelessly, reads as two different price points.

| Principle | Definition | Why it matters for luxury beauty | Flagship application |
|---|---|---|---|
| **Rule of thirds** | The frame is divided into a 3×3 grid; placing the subject/eyeline/horizon on a grid line or intersection creates more dynamic balance than dead-centering | Prevents a static, snapshot feel; guides the eye to the intended point of interest | Her eyes land near the upper-third intersection at TRANSFORMATION (5.2–6.6 s) so the frame breathes above and around her rather than boxing her centrally |
| **Negative space** | Deliberately empty or low-detail area around the subject | The single strongest "expensive" signal in luxury composition — confidence needs no clutter (`luxury-beauty-ad-language.md` §6, §7) | The cream mihrab arch field around the bottle at DISCOVERY; the soft warm falloff around the falling strand at HOOK — the product/detail occupies a **minority** of the frame in both |
| **Symmetry & balance** | The frame's visual weight is mirrored or evenly distributed around a central axis | Signals order, ritual, heritage-craft precision — the register of an arch, a temple, a formal product presentation | The bottle centered under the **Moorish/mihrab arch** at DISCOVERY (§4 hero-environment DNA) — architectural symmetry framing an asymmetric human gesture (the hand entering from one side) so the frame stays alive, not static |
| **Frame-within-frame** | An element inside the shot (an arch, a doorway, a drape) creates a secondary border around the subject | Directs attention, adds depth, borrows the elegance of the architectural element itself | The mihrab arch literally frames the bottle reveal at DISCOVERY — the hero-set arch *is* the frame-within-frame device (§4) |
| **Leading lines** | Lines within the frame (an edge, a fold, a light shaft, a strand) draw the eye toward the subject | Moves the eye deliberately rather than letting it wander | The comb's teeth converge toward the single falling strand at HOOK; the drape's fold lines and the arch's curve lead the eye to the bottle at DISCOVERY |
| **Headroom / lookroom** | The space above a subject's head (headroom) and in the direction they face or move (lookroom/lead room) | Too little headroom crops uncomfortably; too little lookroom feels claustrophobic and traps the subject against the frame edge | At TRANSFORMATION, her eyeline toward camera is given generous lookroom as she turns; headroom stays inside the top ~14% safe margin (§5) so no overlay collides with her |
| **Foreground framing** | A soft, out-of-focus foreground element partially occupies the frame edge, adding depth | Creates a three-dimensional, "real lens" read versus a flat graphic-card look | A soft blur of the drape or hibiscus in extreme foreground at DISCOVERY, reinforcing the large-format shallow-DoF bokeh (§6) |
| **The rule-of-thirds exception: centered symmetry for product hero** | Luxury product photography intentionally *breaks* thirds for dead-center symmetry on the hero object at its resolve beat | Centering signals "this is the one thing that matters, undistracted" — an intentional, not accidental, choice | The 3-pack resolve at OFFER + CTA (7.0–8.0 s) centers the pack in the frame at the orbit's stop, breaking from the off-center DoF-led framing used everywhere else — the single deliberate exception |

**The safe-zone composition overlay (platform floor, Bible §5):** every composition choice above
must also satisfy the platform-mandatory clear zones — **top ~14% / bottom ~20%** of the 1080×1920
frame stay free of essential subject/action so on-screen UI and the locked Arabic overlays never
collide with it. This is not a creative choice but a **hard floor**: a beautifully composed frame
that places her eyes or the product label inside the bottom 20% is a Technical/prompt-soundness
failure regardless of how well it satisfies thirds or symmetry.

**Composition and the locked overlays (cross-ref Bible §6.3):** each beat's composition must leave
clearance for its overlay line — e.g., the HOOK frame's lower-safe zone stays clear for
**«كل تمشيطة… وشعرك ينقص؟»** (*kull tamshīṭa… wa-shaʿruki yanquṣ?*, "Every comb stroke… and your
hair keeps thinning?"), and the TRANSFORMATION frame's lower-safe zone stays clear for
**«كثافة وطول… وشعر يتكلّم عنكِ»** (*kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki*, "Density and
length… hair that speaks for you"). Composition and copy placement are one decision, not two
(`12-camera-director` Output 3.3, "overlay clearance").

---

## 5. Lens language

The vocabulary of glass — how a lens family renders a subject, independent of the DoF it produces
(§6 covers DoF specifically). Lens character is a *flavor*, not just a focal-length number.

**Focal-length families and their emotional/technical read:**

| Focal range | Family name | Perspective character | Typical use | Flagship lens (per `11-cinematography-director` 3.3) |
|---|---|---|---|---|
| **~85–105 mm macro** | Macro-beauty | Extreme magnification, near-zero spatial distortion, isolates a detail from all context | Droplets, strands, pores, product texture | ~100 mm macro for HOOK, T1, T2, RITUAL |
| **~50–85 mm** | Portrait / short telephoto | Flattering compression — features read true-to-life, background compresses and softens | The human face, the "keeper" reveal | ~50–85 mm for TRANSFORMATION (portrait framing) |
| **~35–50 mm** | Standard / "normal" | Renders perspective close to natural human vision — neither compressed nor expanded | Product hero shots, scene-establishing beats within a tight cut | ~35–50 mm for DISCOVERY reveal and OFFER orbit |
| **~24–35 mm (wide)** | Wide-angle | Expands perspective, exaggerates near/far relationships — can distort a face or a bottle held close | Not used on this flagship — a wide lens near the face or the label risks exactly the distortion the §4 lock forbids | Not used |

**Lens-character vocabulary (the qualitative layer beyond focal length):**

| Term | What it specifies | Flagship pairing |
|---|---|---|
| **Warm, organic rendering** | The lens/body combination favors natural skin tones and gentle micro-contrast over clinical sharpness | ARRI Alexa 35 body (11 Output 3.2) — cited as the flagship's *one* primary signature |
| **Flattering glass** | A lens family known for gentle, complimentary rendering of skin and hair, without harsh edge sharpening | Cooke S7/i — cited for DISCOVERY, RITUAL, TRANSFORMATION, OFFER (11 Output 3.3) |
| **Jewel-macro glass** | A dedicated macro lens rendering liquid/texture with suspended highlights and true material depth | Macro-beauty family — cited for the four macro-registered beats |
| **Character alternative** | A documented but non-competing lens option for a single beat, offered as philosophy, never a second prompt token | Leica (Summilux-C/Thalia character) — documented alternative for the TRANSFORMATION portrait only (11 Output 3.3) — never cited alongside Cooke in the same compiled prompt |
| **Clean/neutral glass** | A lens character with minimal personality, used where legibility beats character | Zeiss Supreme Prime thinking, rendered *through* the Alexa/Cooke look — informs OFFER's clean product legibility without adding a second signature |

**Distortion control (the lens-side product-lock guard):** a wide lens held close to a face
produces facial distortion (nose enlargement, ear recession); a wide lens held close to a
rectangular label produces perspective keystoning. Neither is acceptable on this flagship — the
lens family table above is deliberately built from **50 mm and longer** for every beat with a
face or a label in frame, precisely to avoid both failure modes (cross-ref §3's angle discipline,
which solves the *vertical* version of the same problem; lens choice solves the *focal* version).

**Coherence rule (do not violate when writing or reasoning about lenses):** the studio cites
**one** primary camera-body signature (Alexa 35) for the entire continuous take; lens *families*
may vary beat to beat (macro ⇄ Cooke S7/i ⇄ clean-product) but always **within** that one body and
one grade — never as a second competing body/lens token in the same compiled prompt
(`11-cinematography-director` Rule R2). Naming multiple lens *characters* as alternatives is
correct craft documentation; citing more than one as a live prompt token is a Failure Condition.

---

## 6. Depth of field

The zone of a frame that reads acceptably sharp. DoF is a function of aperture (T-stop), focal
length, sensor/format size, and subject distance — and it is one of the single strongest
"filmed versus generated" tells this studio fights for (`11-cinematography-director` Output 3.1).

**The DoF fundamentals (named factors, for reasoning about any new beat):**

| Factor | Effect on DoF | Studio default |
|---|---|---|
| **Aperture (T-stop)** | Wider aperture (lower T-number) = shallower DoF | T2.0–T2.8 on portrait/human beats; ~T4 on macro beats (macro DoF is inherently razor-thin regardless of stop) |
| **Focal length** | Longer focal length = shallower DoF at the same distance/stop | The 50–85 mm portrait range is chosen partly *for* its natural DoF falloff on a face |
| **Sensor/format size** | Larger format = shallower DoF at equivalent framing | Large-format / full-frame rendering (matching Alexa 35/Venice 2) for a gentle, cinematic falloff — never a small-sensor "everything sharp" phone look |
| **Subject-to-camera distance** | Closer subject = shallower DoF | Macro beats (HOOK, pour, ritual) push this to the extreme — the working distance is centimeters |

**Shallow vs. deep — when each is correct:**

| DoF choice | When to specify it | Flagship beats |
|---|---|---|
| **Ultra-shallow (macro-thin)** | An intimate detail must be the *only* legible thing in frame | HOOK strand, the T1/T2 drop/pour dive, RITUAL fingertip macro |
| **Shallow, motivated** | A hero (face, product) needs to separate cleanly from its environment while the environment still registers as a real place | TRANSFORMATION portrait (her eyes sharp, the interior soft-warm); DISCOVERY (label sharp, arch soft) |
| **Moderate / label-sharp** | Legibility of text or fine detail is load-bearing across a wider plane (all three bottles in a pack) | OFFER + CTA orbit — DoF holds the whole label plane sharp across all three bottles at the resolve, not just the center bottle |
| **Deep / "everything sharp"** | Never specified in this studio's work | Reads as a phone/UGC or CGI "clinical" look — an explicit Failure Condition (11 Output 3.4) |

**Bokeh-quality vocabulary (the out-of-focus character, not just "blurry"):**

| Term | Specifies | Kill (the fake/AI tell) |
|---|---|---|
| **Soft, round, warm bokeh** | Out-of-focus highlights render as gentle round discs with warm color bleed | Onion-ring bokeh, doubled/duplicated bokeh edges — a classic AI-generation tell |
| **Creamy falloff** | The transition from sharp to soft is smooth and continuous | A hard, aliased edge on the focus plane; the background snapping into two discrete sharp/blurry layers |
| **Motivated blur** | The blur exists because a real large-format lens produces it at that stop/distance | "Blur for its own sake" that hugs the subject's outline like a cutout — a fake CGI-matte tell |

**Focus technique vocabulary:**

| Term | Definition | Flagship use |
|---|---|---|
| **Rack focus** | A directed shift of the sharp plane from one subject/depth to another within a single continuous shot | DISCOVERY: rack from the rising bottle silhouette to the settled label (12 Output 3.3) |
| **Follow focus** | The focal plane tracks a moving subject to keep it continuously sharp | RITUAL: focus follows the fingertips and the oil line along the part-line |
| **Focus hold** | The focal plane is locked once the hero is found, deliberately not moved again | TRANSFORMATION: focus lands on her eyes and holds through the breathing beat |
| **Focus breathing (avoid)** | An unwanted, undirected drift of apparent field-of-view as focus shifts | Explicitly forbidden on any hold — a Failure Condition (`12-camera-director` R7) |
| **Focus hunting (avoid)** | Focus visibly searches back and forth before settling | Explicitly forbidden everywhere — reads as a software/AI artifact, never a directed choice |

**Claim-inflation guard (cross-ref `11-cinematography-director` Rule R9):** DoF and lens choice
show density, length, and shine as *believable with regular use* (Bible §3, Claim 3's 2–3×/week
condition) — never an impossibly glossy, hyper-sharp "CGI pop" on the hair that would visually
overstate a claim the Bible itself conditions. A lens choice is never used to imply more than the
product claims.

---

## 7. Frame rate & slow-motion aesthetics

Cadence — how many frames per second are captured and at what relationship to playback speed — is
one of the loudest realism/artifice signals in any video, generated or filmed.

**Frame-rate connotation table (named industry standards):**

| Frame rate | Connotation | Studio status |
|---|---|---|
| **24 fps** | The traditional cinema/film cadence; slightly weighted, natural-feeling motion with real motion blur — reads as "shot on film," premium, filmic | **The studio's mastered cadence** (Bible §5, `11-cinematography-director` Output 3.5) |
| **25/30 fps** | Broadcast-video-adjacent cadence; smoother than 24, still reads as "video" more than "film" if not graded carefully | Acceptable *delivery* band ceiling (24–30 fps, Bible §5) but 24 fps is the preferred mastering cadence |
| **48–60 fps (native capture, native playback)** | The "soap opera effect" — motion this smooth reads as live broadcast/sports/phone video, not cinema | **Never** used as a delivery cadence — this is one of the loudest AI-generation tells and an explicit negative (§6.6 "flicker," 11's "soap-opera 60 fps interpolation") |
| **Frame interpolation (motion-smoothing)** | Software-generated in-between frames that create artificial smoothness | **Banned outright** — the single most common "this looks AI-generated" tell in consumer perception, and explicitly named in the master negative core |

**Overcranking — the named technique behind slow-motion (for correct terminology in any brief):**
*Overcranking* means capturing at a higher frame rate than the playback frame rate, so each
real-time second contains more captured frames, which stretch across more playback time when
played back at the standard rate — the action appears slowed. The **slow factor** is
`capture_fps ÷ playback_fps`. A capture at 48 fps played back at 24 fps yields a 2× slow-down
(50% speed) — precisely the flagship's specified "~50%" ramp on the falling strand (11 Output 3.5,
12 Output 3.5). *Undercranking* is the inverse (fast-motion) and is not used anywhere in this
studio's flagship or negatives set.

**Shutter-angle vocabulary (the motion-blur formula):** shutter angle describes how much of each
frame's exposure time is "open" relative to the frame rate. The cinema-standard **180° shutter**
means the exposure time equals half the frame duration: `shutter_speed = 1 ÷ (2 × fps)`. At the
studio's 24 fps this is **1/48 s** — the exact figure `12-camera-director` specifies for every
beat (Output 3.3, 3.8). A narrower shutter angle (shorter exposure) produces a crisper, more
strobe-like motion — explicitly avoided; a wider shutter (longer exposure) produces smeary,
over-blurred motion — also avoided. 180° is the default because it is what "looks like a real
camera" to a human eye.

**The studio's slow-motion law (named, not improvised per-run):**

| Rule | Statement | Source |
|---|---|---|
| **Rationed, not blanket** | Slow-motion is reserved for exactly **one** emotionally loaded beat per cut, never applied throughout | `luxury-beauty-ad-language.md` §3; matches every reference house's discipline |
| **The flagship's one slow-mo** | The falling hair strand at HOOK (0.0–1.2 s), ramping to ~50% and back to real-time across T1 | Bible §6.1; `11-cinematography-director` Output 3.5; `12-camera-director` Output 3.5 |
| **Mandatory real-time humanity** | The blink and the breath at TRANSFORMATION (5.2–6.6 s) play at natural human speed — never slowed | Same sources; slowing a blink/breath reads as an uncanny float, a top realism failure |
| **A second slow-mo is a veto** | Any additional slowed beat turns filmed footage into a "music-video montage" read | `12-camera-director` Rule R4, Failure Conditions |

**Speed-ramp vocabulary (the transition between real-time and slow-mo):** an **ease-in ramp**
gradually decelerates footage time into slow-motion (rather than snapping into it); an **ease-out
ramp** gradually accelerates back to real-time. Both ramps in this studio are confined **inside**
a single beat or its immediately adjacent ≤0.4 s transition beat — a ramp is never allowed to
straddle a beat boundary in a way that breaks momentum-carry (`12-camera-director` Output 3.5).
This is distinct from **move-velocity easing** (§8) — time-remap changes how fast footage *plays*;
move-velocity easing changes how fast the *camera* travels, and the two are shaped independently.

---

## 8. Motion feel

The qualitative layer of how a move *feels* to a viewer, sitting one level above `12-camera-
director`'s exact move specs (push/pull/orbit/slider/dive/rack/whip) and `14-motion-director`'s
frame-level timing. This is the vocabulary for describing *character* of motion, not its
mechanics.

| Term | What it describes | Reads as | Studio use |
|---|---|---|---|
| **Locked-off** | The camera does not move at all | Stillness, restraint, letting the subject carry the frame | Near-locked at HOOK — "so slow it is nearly a locked-off macro" (12 Output 3.3) |
| **Motion-control (MoCo)** | A move executed by a programmable, perfectly repeatable rig | Flawless, dead-smooth, "expensive" precision | Default rig for macro/product beats — DISCOVERY hold, RITUAL slider, OFFER orbit |
| **Operated** | A move executed by a human operator (gimbal/Steadicam), carrying a faint, organic imperfection | A trace of human life; paradoxically *more* believable than perfect on a face | The **one** deliberate exception — TRANSFORMATION (5.2–6.6 s), where a perfectly mechanical arc on a face would read as CGI (12 R5) |
| **Ease-in / ease-out (move-velocity S-curve)** | The camera's *travel speed* accelerates and decelerates smoothly rather than starting/stopping at constant velocity | Filmic, weighted, "a person operated this" | Every single move in the flagship (12 Output 3.5) — constant-velocity movement is the "robot tell" |
| **Momentum-carry** | The camera's velocity vector at the end of one beat matches the vector opening the next | An unbroken, continuous take rather than nine stitched shots | The core discipline across all four flagship transition seams (12 Output 3.4) |
| **Governor** | The specific story reason a move *stops* (a settle frame, a locked hero frame, a focus target) | Purposeful movement rather than drift | Every flagship move names one (12 Output 3.7) — a move without a governor is "drift," an explicit veto |
| **Weight / follow-through** | Motion (of hair, fabric, a hand) has physical mass and continues slightly past its driving force before settling | Natural physics rather than floaty/weightless CGI motion | Hair "moving with real weight and shine" at TRANSFORMATION; the settle after the hair-sweep whip |
| **Motivated movement** | Any camera move that exists because something in the story requires it (a falling object to follow, a reveal, a gesture to track, a face to meet, a hero to orbit) | Purposeful, directed cinema | The organizing principle of every flagship move (12 Rule R2) |
| **Unmotivated float / drift (avoid)** | Camera movement with no story reason, added only for "energy" | Amateur/AI-wander tell | Explicit veto — routed to `24-negative-prompt-builder` |

**The distinction this section exists to protect:** §7 (frame rate) governs *time* — how fast
footage plays back. This section governs *feel* — the qualitative character of the camera's own
travel, independent of playback speed. A move can be real-time (§7) and still read as robotic
(§8 failure) if it lacks ease-curves and a trace of operated life; conversely a move can be
correctly eased and motivated (§8 success) but still fail if it's the studio's second slow-motion
(§7 failure). Both layers must pass independently.

---

## 9. Phrasing patterns for AI video-generation prompts

This is the section that turns §2–8's vocabulary into the literal sentence `26-kie-prompt-builder`
writes. **The single most important craft rule here:** the studio's technical reasoning (mm,
T-stop, fps, shutter angle) happens in `11-cinematography-director` and `12-camera-director`'s
own artifacts and in the structured JSON intermediate representation (IR) — but the **natural-
language paragraph** that actually goes to a Veo-3-class model translates every technical spec
into **descriptive, sensory prose**, because `kie_veo3`'s prompt dialect is rewarded by continuous
cinematic language, not by camera-department jargon (`model-adapters.yaml
kie_veo3.prompt_dialect.form`; 26 Rule R2).

**The technical-to-descriptive translation table (the core compiling skill):**

| Technical spec (11/12 reasoning, JSON IR) | Descriptive prose (what actually goes in the paragraph) |
|---|---|
| `~100mm macro · ~T4 · ultra-shallow DoF` | *"extreme macro… the strand is sharp, the world melts into soft cream light"* |
| `M2 slow pull, ease-out to a held hero frame` | *"the camera rises up out of the oil to reveal… "* (the reveal verb carries the pull; "rises" implies the move without naming it) |
| `~50–85mm portrait, T2.0–2.8, eyes sharp` | *"a natural over-the-shoulder turn as she turns to camera"* (the framing is implied by "over-the-shoulder," the sharpness by nothing needing to be said — prose trusts the model's own beauty-portrait training) |
| `Time-remap to ~50%, 180° shutter` | *"falls in gentle slow motion — quiet, intimate, and elegant"* |
| `M3 orbit, motion-control, label plane sharp` | *"the camera slowly orbits the single hero bottle… mid-orbit two more identical bottles rise smoothly into place"* |
| `ARRI Alexa 35, warm Kodak-print grade` | Not named as a body/stock at all in the shipped paragraph — its *effect* (warm color, natural skin, graceful highlights) is described through the scene's actual light and texture, never through a camera-brand token |

**Why this translation matters:** a prompt that reads *"shot on 100mm macro lens at T4 with 180°
shutter"* asks a language-conditioned video model to parse camera-department shorthand it was not
necessarily trained to weight heavily; a prompt that reads *"an extreme macro of an ivory
wide-tooth comb held in soft warm cream light, a single strand slipping from the teeth and falling
in gentle slow motion"* gives the model a vivid, concrete scene to render. **Technical specs stay
in the JSON IR** (where they serve as the studio's own internal consistency checks and the
structured fallback dialects for `kling`/`runway_gen3`) — **descriptive prose is what ships** in
the primary `kie_veo3` paragraph.

**The sentence-formula for one beat (assemble in this order, then smooth into prose):**

1. **Shot size / register** (§2) — what's filling the frame (macro, close, medium)
2. **Subject + action** — the concrete noun and verb, never an abstraction ("a strand slipping
   from the teeth," not "hair loss is depicted")
3. **Light quality** (tie-in, owned by 13) — warm/soft/directional, matching §4 hero-environment DNA
4. **Angle/composition cue, if load-bearing** (§3–4) — "over-the-shoulder," "square to the label,"
   only stated when it disambiguates the shot, never as jargon
5. **Motion verb carrying the move** (§8) — "rises," "dives," "orbits," "sweeps" — the verb *is*
   the camera direction; no separate clause naming the rig
6. **Cadence cue, only when it's the flagship's one slow-mo** (§7) — "in gentle slow motion,"
   stated plainly, never as a frame-rate number
7. **Continuity phrase** — a clause connecting to what came before/after, protecting the
   one-continuous-take read (e.g., "as the camera follows the drop down into…")

**Worked example (HOOK → T1, assembled from the formula above):**
> *"…opens on an extreme macro of an ivory wide-tooth comb held in soft warm cream light; a
> single long, dark, healthy hair strand slips from the teeth and falls in gentle slow motion —
> quiet, intimate, and elegant, never distressing or ugly. At the one-second mark the falling
> strand meets a translucent deep-garnet oil drop falling from above; the two liquids ripple
> together in one seamless match-morph, and the camera follows the drop down into a garnet oil
> surface as the ripple wipes the frame."*

This is the studio's own shipped language (`26-kie-prompt-builder` Output 26.2) — it is reproduced
here as the worked proof of the formula, not as new copy to author. Every future beat's prose
should be built the same way: size → subject/action → light → motion verb → cadence (only if
earned) → continuity.

**Phrase bank — reusable descriptive fragments by category (craft vocabulary, not new claims):**

| Category | Reusable phrasing pattern | Draws from |
|---|---|---|
| **Macro/insert** | *"an extreme macro of [subject], [material] catching the light"* | §2, §6 (macro DoF) |
| **Reveal (slow pull)** | *"the camera rises/pulls back to reveal [subject], [environment detail]"* | §8 motivated movement |
| **Product hero, square-on** | *"[product], label held to camera, [light quality]"* | §3 angle discipline, §4 symmetry |
| **Orbit** | *"the camera slowly orbits [subject]; mid-orbit, [event] happens"* | §8 momentum, §2 CU/MCU register |
| **Macro dive (transition)** | *"the camera dives into [material], the screen filling with [texture/color]"* | §6 ultra-shallow DoF, §8 macro dive |
| **Sweep/wipe (transition)** | *"[subject] sweeps across the lens, motion-blurred, clearing into [next subject]"* | §7 natural motion blur, §8 momentum-carry |
| **Turn-to-camera (keeper)** | *"a natural over-the-shoulder turn as [subject] turns to camera, [micro-detail: a real blink, a breath]"* | §3 OTS, §7 mandatory real-time humanity |
| **Slow-motion (rationed)** | *"falls/pours in gentle slow motion"* — used **once** per cut | §7 slow-motion law |
| **Light bloom (transition)** | *"a [light-source] highlight blooms into a soft flare that recedes onto [next subject]"* | §4 leading lines, §6 controlled bloom |
| **Negative space / restraint** | *"[subject] set against [environment], [light quality]"* — let the environment's own sparseness do the work; never add a decorative modifier | §4 negative space |

**Phrasing anti-patterns (never write these into the compiled paragraph):**

| Anti-pattern | Why it fails | Correct alternative |
|---|---|---|
| Bulleted or numbered shot list inside the prose (*"Shot 1: macro. Shot 2: reveal."*) | `kie_veo3.prompt_style` is `natural-language-paragraph`; a list reads as instructions to cut between shots, undermining the one-take read | Flowing prose with continuity clauses ("as," "then," "meanwhile") |
| Bare technical tokens (*"50mm f/2.8, 24fps, 180° shutter"*) inside the prose | Camera-department shorthand a language model was not trained to weight as strongly as descriptive scene language | Translate every spec into its descriptive effect (§9 translation table) |
| Camera-brand/lens-brand name-drops inside the prose (*"shot on an ARRI Alexa 35"*) | The **body signature is a reasoning tool** for 11/12 to keep one coherent look internally — Kie-class models render scene description, not brand metadata, and citing a brand token adds nothing the descriptive language doesn't already carry | Describe the *effect* (warm color, natural skin, graceful highlight rolloff), never the gear |
| Negative-phrased positives (*"a face that is not distorted, hands that are not malformed"*) | Describing a flaw to negate it still seeds the concept in the model's attention; that job belongs to the dedicated `negative_prompt` field, never the positive paragraph | State only what should exist ("photoreal skin texture, natural hands with five fingers") — the failure-avoidance clause is 24's, not 26's job (26 Rule R5) |
| Vague size/angle language (*"a nice shot of the bottle"*) | Gives the model nothing concrete to render; the whole point of §2–4's vocabulary is precision | Name the size, the light, the composition concretely, every time |
| Stacking more than one camera-body/lens-character reference in one clause | Fractures the one-look coherence rule (§5) even in prose form | One described "look" per continuous paragraph — vary only the *subject* being described, never the implied optical world |
| Claim-inflating adjectives on the hair/skin (*"miraculously thick," "instantly cured"*) | Crosses from cinematography into a medical/absolute claim the Bible never makes (Bible §3; `luxury-beauty-ad-language.md`/beauty-hair-marketing.md claims-discipline layer) | Describe what the lens/light *shows* — "visibly denser, longer, and more luminous" — never what it "proves" or "cures" |

---

## 10. Do / Don't table

The consolidated cinematography-language gate — pairing the studio's code against its generic or
AI-tell opposite, with the flagship's own evidence.

| DO (this document's grammar) | DON'T (the generic/AI-tell opposite) | Flagship evidence |
|---|---|---|
| Precise shot-size vocabulary (macro/ECU/CU/MCU) matched to the beat's intimacy need | Vague "close shot," inconsistent sizing across beats | §2 — every flagship beat sits in macro→MCU, never wider |
| Eye-level, dignity-respecting angles on the model | High angle looking down; Dutch/canted tilt | §3 — TRANSFORMATION explicitly eye-level |
| Deliberate negative space, symmetry, or frame-within-frame composition | A frame filled edge-to-edge to "prove" the product matters | §4 — cream arch field, mihrab frame-within-frame |
| Lens family matched to subject (macro for texture, portrait glass for the face, clean glass for product) | One generic lens/DoF treatment applied to every beat | §5 — macro-beauty ⇄ Cooke S7/i ⇄ clean-product, one signature |
| Shallow, motivated DoF with warm round bokeh | Onion-ring/doubled bokeh; clinical deep focus | §6 — large-format falloff, label-sharp product beats |
| Honest 24 fps cadence, one rationed slow-motion, real-time humanity | 60 fps interpolation smoothness; slow-mo applied throughout | §7 — one slow-mo (HOOK), real-time blink/breath (TRANSFORMATION) |
| Ease-curved, motivated, momentum-carried camera movement | Constant-velocity robotic moves; unmotivated drift/float | §8 — every move eased, every seam momentum-matched |
| Prose that translates technical spec into descriptive, sensory language | Bare jargon tokens or camera-brand name-drops inside the prompt | §9 — the technical-to-descriptive translation table |
| Positive-only description of what should exist | Negative-phrased positives seeding the flaw they try to negate | §9 — negatives belong in the dedicated field (26 R5) |
| One optical "look" described per continuous paragraph | Multiple competing camera/lens references in one clause | §5, §9 — one coherent optical world per prompt |

---

## 11. Quick-reference checklist

Before any beat's shot spec is handed to `12-camera-director` or compiled by
`26-kie-prompt-builder`, confirm:

- [ ] The shot size is named precisely from the §2 ladder (macro/ECU/CU/MCU) — never "close" or
      "wide" without qualification.
- [ ] The camera angle is eye-level (or product-level for macro/product beats) — never a high
      angle on the model, never Dutch/canted, never overhead.
- [ ] The composition states its governing principle (negative space, symmetry, frame-within-
      frame, thirds) and leaves the platform-mandatory top ~14% / bottom ~20% safe margins clear.
- [ ] The lens family matches the subject (macro-beauty for texture/liquid, portrait glass for
      the face, clean/neutral glass for the product) and stays inside the one cited body signature.
- [ ] The DoF intent is stated (ultra-shallow macro, shallow-motivated portrait, or moderate
      label-sharp product) with the correct sharp plane named (strand, eyes, label).
- [ ] Slow-motion, if used at all, is the studio's **one** rationed instance (the falling strand)
      — every other beat, especially any beat with a face, is real-time.
- [ ] The movement has a stated motivation and a stated governor (§8) — no unmotivated drift.
- [ ] Every move is described with an ease-curve character (rises, settles, decelerates) — never
      constant-velocity language.
- [ ] The compiled prose translates every technical spec into descriptive language — no bare mm/
      T-stop/fps tokens, no camera-brand name-drops, inside the positive paragraph.
- [ ] No negative-phrased positive ("not distorted," "without extra fingers") appears in the
      positive prose — that vocabulary belongs only in the dedicated negative-prompt field.
- [ ] Nothing in the phrasing implies a claim beyond Bible §3's four locked claims, and no Arabic
      line is re-authored — locked §6.3 overlays are cited, never rewritten.
