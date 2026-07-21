# Undetectable Realism Doctrine — The Master Anti-AI-Tell Bible

### Every human, environmental, optical, physics, material, and temporal "AI tell" — what causes it, how to defeat it, and the detector gate that hard-fails anything that still reads as generated. The single principle: **add the RIGHT imperfections, remove the AI tells. Perfect is fake; imperfect is real.**

> **Knowledge base article — reference material, not a skill.** Dense, scannable, checklist-heavy.
> This is the doctrine layer under the **Undetectable Realism Engine** (STUDIO-BIBLE-V2 §7ter.B). It
> unifies the *realism* half of the studio: the render-craft skills **16-hair-realism-director**,
> **17-human-realism-director**, **18-environment-realism-director**, **19-oil-product-realism-
> director**, and the four v2 realism specialists **42-optical-camera-realism-director**,
> **43-physics-materials-realism-director**, **44-human-micro-realism-director**, **45-temporal-
> consistency-director** — plus the QC gate **46-ai-tell-detector** that scores the *undetectability*
> axis fed into **27-quality-checker** / **28-creative-scoring-engine**. It also arms **24-negative-
> prompt-builder** (the removal half) and **26-kie-prompt-builder** (the phrasing half), and is read
> in post by the editing department (**52-colorist**, **45**, **55-finishing-delivery**) because *the
> grade and the trim are where realism is finished, not just where clips are joined*.
>
> **Grounding.** STUDIO-BIBLE §0 (Realism is priority ONE — "it must look filmed, not generated"),
> §3 (audience: Gulf women ~22–45, warm-toned skin), §4 → `products/<slug>/product-lock.yaml` (the
> vessel/oil identity), §5 (modesty, 9:16, sound-on), §6 (the flagship **UNBROKEN THREAD**), §7
> (quality gates ≥95 / no axis <90). STUDIO-BIBLE-V2 §7bis (product is ALWAYS reference-conditioned —
> R1/R2/R3, never t2i) and §7ter.B (this engine). **When this doc and the Bible disagree, the Bible
> wins.** This doc invents no product claim, no lock detail, no Arabic copy. Product examples use the
> ACTIVE product lock (flagship = `products/mechat-red-oil/`); nothing here hardcodes a bottle a future
> product wouldn't have.

---

## 0. Why "undetectable" is a harder bar than "beautiful"

A gorgeous frame can still scream *AI* in the first 300 ms of a scroll — and in Gulf beauty feeds
saturated with generated content, "obviously AI" is now a **conversion killer**, not just an
aesthetic flaw. The viewer doesn't run a detector; their visual cortex does, pre-consciously, on
tells they can't name. Trust collapses, the thumb keeps moving, ROAS dies. So realism here is not
"looks nice" — it is **passes as a real filmed/photographed thing to a skeptical human and to an
automated detector.** That is a measurable, gate-able property, and this doc defines it.

**The paradox that governs everything below:** modern models fail realism by being *too clean, too
symmetric, too perfect, too still, too new.* Reality is asymmetric, worn, noisy, slightly out of
focus, imperfect, and always subtly moving. Therefore the craft is bidirectional:

> **ADD the right imperfections** (grain, asymmetry, wear, handheld micro-motion, dust, flyaways,
> pores, caustics, motion blur, chromatic fringing, meniscus, fingerprints on glass) **AND REMOVE
> the AI tells** (waxy skin, melted fingers, dead eyes, morphing labels, floaty motion, HDR halos,
> gibberish text, temporal drift). Neither half alone is enough. A clean image with no tells still
> reads fake if it has no grain and no DoF; a grainy image with six fingers is still busted.

Every render prompt therefore carries a **positive imperfection clause** (this doc §9) and a
**negative tell clause** (this doc §10 → `negative-prompt-library.md`). Skill 46 checks both were honored.

---

## 1. The tell taxonomy — six families, one gate

Every AI artifact falls into exactly one of six families. Each realism skill owns one or two; skill
46 hunts all six. Learn the map, then the catalog.

| # | Family | The question the viewer's brain asks | Owning skill(s) | Detector weight |
|---|--------|--------------------------------------|-----------------|-----------------|
| A | **Human / biological** | "Is that a *living person*?" | 17, 44, 16 (hair) | 25% |
| B | **Optical / camera** | "Was this shot through a *lens*?" | 42, 13 (light) | 22% |
| C | **Physics / materials** | "Does matter *behave*?" | 43, 19 (oil), 16 (hair dyn) | 18% |
| D | **Environment / set** | "Is this a *real place with history*?" | 18 | 12% |
| E | **Temporal** (video only) | "Is it *stable over time*?" | 45, 56 (edit) | 15% |
| F | **Text / semantic** | "Do the *symbols* mean anything?" | 37, 24, 26 | 8% |

Weights are the default `undetectability` sub-axis composition inside skill 46; the *worst single
family* also imposes a hard cap (see §11). A frame can be 95% clean overall and still hard-fail on
one melted hand.

---

## 2. FAMILY A — Human & biological tells (the deepest, most-punished)

Humans are evolved face/hand specialists; these tells are caught fastest and forgiven least. Owned by
**17-human-realism-director** + **44-human-micro-realism-director**, with hair by **16**.

### 2.1 Skin — the #1 human tell
| Tell | Why the model does it | Defeat |
|---|---|---|
| **Waxy / plastic / "airbrushed CGI" skin** | Denoising over-smooths high-freq texture; training bias to beauty-retouched imagery | Force **visible pores, peach fuzz (vellus hair), fine lines, subsurface scattering** at the ear/nostril/fingertip; add micro-specular break-up, not a uniform sheen |
| **Uniform poreless matte** | Same | Vary texture by zone: oilier T-zone sheen, matte cheeks, translucent under-eye |
| **Doll-blush / airbrushed cheeks** | Beauty-filter training | Real, slightly uneven flush; a little redness at nose/knuckles/elbows |
| **No blemish, no asymmetry, zero wear** | Perfection bias | Add ONE or two believable imperfections: a tiny mole, faint under-eye shadow, a single stray brow hair, a freckle cluster |
| **Plastic sheen on every highlight** | HDR/clarity over-processing | Filmic highlight roll-off (§4.3); specular that follows skin's real micro-geometry |

**Gulf-specific:** warm-toned / olive / deep skin must keep its **melanin-correct sheen and
undertone** — never the pink-lit European default the model reverts to. Subsurface scattering reads
warmer (amber, not pink) at the ear and fingertip. Do NOT lighten or de-saturate skin to "premium."

### 2.2 Eyes — the second-fastest catch
- **Dead / glassy / "thousand-yard" stare** → real eyes have **micro-saccades** (tiny darts),
  moisture, and a **catchlight** matched to the actual key/window. One catchlight per light source,
  same shape as the source. No catchlight = corpse; two random catchlights = two suns = fake.
- **Perfect matched irises / mirror-symmetric eyes** → real eyes are subtly asymmetric; iris pattern
  differs L/R; slight vergence. Add **micro-asymmetry**.
- **Pupils that don't respond / wrong size for the light** → size pupils to the lit environment.
- **Over-white sclera, no vessels** → faint vascularity, slightly warm/creamy sclera, a real lower
  waterline. **Wet meniscus** along the lid.
- **Frozen or metronome blink** → blink cadence is irregular, ~1 every 3–6 s, with a fast close /
  slower open; a real blink is asymmetric in speed. (See `human-realism.md` for the flagship's timing.)

### 2.3 Hands, fingers, teeth — the "count it" tells (owned by 44)
- **Extra / missing / fused / bending-wrong fingers; two-jointed thumbs; melting knuckles** → the
  single most-mocked AI tell. **Count = 5. Knuckles crease. Nails have a lunula and a real free
  edge, slightly uneven.** For the hero *hands-on-hair / oil-on-scalp* beats (our category default,
  per `gulf-beauty-brand-norms.md`) this is existential — hands are on screen constantly.
- **Uniform, too-white, fused "denture" teeth** → teeth are non-uniform, slightly translucent at the
  edge, a shade off pure white, with visible individual separation; a real smile shows asymmetric gum.
- **Rubber / boneless wrists, impossible finger contact** → hand must *press into* hair/scalp with
  real contact deformation, not hover.

### 2.4 Movement, expression, weight (video) — owned by 44 + 14-motion-director
- **Mannequin stillness / metronome loops / floaty weightlessness** → add **breathing** (chest/
  shoulder rise), weight shifts, a real blink and micro-swallow, hair settling under gravity.
- **Uncanny "forced" or symmetric smile** → genuine smiles are **asymmetric**, start at the eyes
  (orbicularis), have onset→peak→decay, and crinkle. A symmetric instant grin is the uncanny valley.
- **Perfect symmetry of face/pose** → **deliberate asymmetry** everywhere: head tilt, one shoulder
  lower, uneven part in the hair, weight on one hip.
- **Micro-expression absence** → a flicker of a real emotion (a breath before a smile) sells "alive."

### 2.5 Hair — owned by 16-hair-realism-director (a human tell AND a physics tell)
- **Helmet hair / no flyaways / plastic-strand "wig"** → add **flyaways, frizz halo, individual
  stray strands, split-light translucency at the ends**. Zero flyaways = wig.
- **Strands that merge into sheets / clumped low-res mass** → resolve individual strands; hair is
  thousands of semi-transparent fibers, not a painted volume.
- **Impossible shine band / uniform gloss** → shine is a **broken, traveling highlight** that follows
  the cuticle, brightest where hair curves to the light, not a plastic stripe.
- **Hair that doesn't move with the head / no secondary motion** → follow-through, inertia, settling.
- **Category note:** our default framing is **hands + hair + back-of-head, no face** (norms doc §2).
  That is *good news for realism* — it removes the hardest tell (the full face) while keeping the hero
  (hair texture, oil sheen, ritual). Lean into it. When a face IS shown (optional UAE cut), §2.1–2.4
  apply at full strictness.

---

## 3. FAMILY B — Optical & camera tells (the biggest *silent* tell)

Most "I can't say why but it looks AI" reactions are **optical**. The image was never focused by a
lens or sampled by a sensor, so it lacks the physics of real imaging. Owned by **42-optical-camera-
realism-director** with **13-lighting-director**. This family is *undervalued* — get it right and even
a slightly imperfect subject passes; get it wrong and a perfect subject still fails.

### 3.1 Depth of field & bokeh — the master optical cue
- **Everything sharp / no focal plane ("infinite DoF")** → the #1 optical tell. Real lenses resolve
  ONE focal plane. **Set a plane** (e.g. the label / the eyes / the oil meniscus) and let the rest
  fall off. For beauty macro: shallow DoF, ~f/2–f/2.8 look.
- **CGI / uniform / "donut" bokeh** → real bokeh is **soft, slightly cat-eyed toward the edges**,
  with gentle specular highlights (bokeh balls) that bloom on out-of-focus points — the drape's
  gold thread, a backlit oil droplet. Not clinical circular disks.
- **Focus that doesn't fall off with distance** → gradient of sharpness front→back.

### 3.2 Grain, noise & sensor signature — "no grain = no camera"
- **Zero noise / plastic-clean digital** → add **fine luminance grain / sensor noise**, denser in
  shadows. Even bright commercial footage has a grain floor. *A completely noiseless image is
  physically impossible from a real sensor* — its absence is a dead giveaway.
- **Uniform grain across the frame** → grain lives more in shadow/midtone, less in clipped highlight.
- Post note: **52-colorist** adds a **matched film-grain / print-stock emulation** pass — a primary
  "filmed-not-AI" lever. Grain must be consistent frame-to-frame (see §6 temporal), not boiling.

### 3.3 Lens artifacts that betray "a real lens was here"
- **No chromatic aberration** → add subtle **CA / color fringing** at high-contrast edges (bottle
  rim against bright drape, backlit hair edge). Overdo = cheap; absent = CGI. Tiny is the target.
- **No vignette** → gentle corner falloff, as real fast glass has.
- **No lens breathing / no focus breathing** (video) → focal length subtly shifts as focus racks.
- **Perfect geometric rectilinear world** → real wide glass has mild barrel distortion; straight
  edges bow slightly near frame edges. (Balance against §5 "warping straight lines" — the AI-warp is
  *irregular and wobbling*; real distortion is *smooth and symmetric*.)
- **Clinical, flare-free contrast** → a controlled **veiling glare / gentle bloom** off the key,
  a hair of flare when a highlight clips. Filmic, not HDR halo.

### 3.4 Exposure & highlight behavior
- **Digital hard-clip / HDR "everything visible" look** → real film/sensor has **highlight roll-off**
  (shoulder) and gentle shadow toe. Let speculars bloom and roll, don't clip flat. Let some shadows
  go genuinely dark — "everything lifted and visible" is an HDR-fake tell.
- **Flat, even, sourceless illumination** → light must have a **direction and a single dominant
  motivated source** (the §4 window/mihrab light), with falloff, wrap, and one shadow family.

### 3.5 Camera body & motion (video) — owned by 42 + 14
- **Perfectly locked / robotic gimbal glide / impossible moves** → add **handheld micro-shake**,
  breathing sway, a tiny weight to starts/stops. Even a "locked" tripod shot has micro-drift.
- **No motion blur on fast movement** → moving hair, a falling strand, an orbiting bottle MUST carry
  **motion blur** proportional to speed. Crisp-frozen fast motion = video-game tell.
- **No rolling-shutter on fast pan** → a subtle skew/jello on a whip is *real* CMOS behavior (use
  sparingly, only on genuinely fast moves).
- **Speed-ramps with no blur, teleporting subjects** → motion must be continuous and inertial.

---

## 4. FAMILY C — Physics & materials tells (matter must obey laws)

Owned by **43-physics-materials-realism-director**, with **19-oil-product-realism-director** for the
oil and **16** for hair dynamics. The viewer feels *wrongness* when weight, flow, and light-transport
don't match the material.

### 4.1 Gravity, weight, inertia
- **Floating / weightless objects, no ground contact** → every object needs a **contact shadow +
  contact reflection** anchoring it to its surface. A bottle with no grounding shadow floats.
- **Hair/cloth with no drape or follow-through** → cloth folds under gravity, hair falls and settles,
  a poured ribbon accelerates. Motion has **ease-in/out from inertia**, never linear teleport.
- **Impossible balance / poses that would topple** → weight over the base of support.

### 4.2 The oil — our hero material (see `hair-oil-realism.md` + active product-lock `liquid:`)
The oil is on screen in nearly every beat (drop, pour, ripple, scalp, strand). Its physics is a
signature. Reference the ACTIVE product lock for color — the flagship's is a **warm reddish-brown /
mahogany amber, translucent, lightly viscous** (NOT bright ruby/garnet — that was a drifted-render
error the lock explicitly corrects).
- **Water-thin flow when it should be viscous** → oil pours as a **slow, cohesive, slightly
  self-adhering ribbon**, necks and beads, doesn't splash like water. Match viscosity to a real
  hair oil.
- **No caustics / no internal light transmission** → translucent oil **transmits and bends light** —
  warm caustics on the surface below, an amber glow through the mass, a bright thin backlit rim at
  the neck fading to deep brown in the body (the lock's gradient).
- **Wrong surface tension** → a real drop is a **flattened oblate**, not a perfect sphere; it beads
  on skin, wets and darkens hair, leaves a sheen trail.
- **Meniscus & headspace** → inside the bottle: a curved meniscus, a visible ~12% air gap
  (per lock `fill_level_fraction`), gentle sloshing inertia when moved. A liquid filled flat to the
  cap with no meniscus is fake.
- **No sub-surface sheen on oiled hair** → oiled strands darken, clump slightly, and gain a wet,
  broken specular — not a dry matte.

### 4.3 Material response — each surface has a light-transport fingerprint
| Material | Right | Tell to kill |
|---|---|---|
| **Clear PET / glass bottle** | refraction, edge caustics, the label seen *through* the far wall slightly distorted, real thickness at the rim | flat sticker-on-a-shape, no refraction |
| **Matte white ribbed cap** (per lock) | soft diffuse shading that reads the fine vertical ribs; a subtle specular on rib crests | glossy plastic sheen, smoothed-away ribbing |
| **Skin** | subsurface scattering, oily/matte zones, fine specular break-up | uniform waxy sheen |
| **Fabric (drape/abaya-adjacent)** | woven micro-texture, gravity folds, fiber sheen | plastic shrink-wrap cloth |
| **Metal / gold seal** | anisotropic glints, real reflections of the environment | painted-on flat gold |
| **Botanicals (henna, hibiscus, herbs)** | real, imperfect organic texture — per norms doc "not CGI-clean" | plastic/waxy CGI props |

### 4.4 Shadows & reflections (also a physics tell, straddles Family D)
- **Missing / detached / floating shadows** → every object casts a **connected, direction-consistent**
  shadow from the ONE motivated light.
- **Shadows in the wrong direction / multiple contradictory shadows** → single coherent light family.
- **Reflections that don't match the scene** (in the bottle, in eyes, on the podium) → reflections
  must contain the actual environment (the garnet drape, the window, the hand). Mismatched = fake.

---

## 5. FAMILY D — Environment & set tells (real places have history)

Owned by **18-environment-realism-director**. AI sets look **too new, too clean, too staged, too
symmetric** — a showroom nobody ever lived in. Our category *specifically* wants a lived-in home /
majlis, not a clinical studio (norms doc §3: "home > studio").
- **Impossibly clean, brand-new, dust-free surfaces** → add **wear, patina, a fingerprint on the
  glass, a faint water ring on the podium, a little dust in a light shaft, slight unevenness**.
- **Over-symmetric, perfectly-arranged "showroom" composition** → real rooms are asymmetric and
  slightly cluttered; props sit at natural, imperfect angles.
- **Repeating/tiling textures, cloned foliage, wallpaper seams** → break repetition; vary every
  instance of a botanical or tile.
- **Warping straight lines / bending architecture / melting geometry** → the mihrab arch, shelf
  edges, and window frames must be **straight and structurally sound** (distinguish from the *smooth*
  lens distortion of §3.3 — AI-warp *wobbles and is irregular*).
- **Background object-impermanence / physically-impossible layout** → the room must be a coherent 3D
  space that could exist; no doors to nowhere, no objects merging into walls.
- **Sourceless / flat ambient light with no window motivation** → motivate with the §4 warm window /
  mashrabiya light and let it fall off naturally across the set.
- **Orientalist cliché backdrops** (desert/camel/tent/souk) are BANNED by norms doc §4 — not a
  realism tell but a market tell; heritage = home & family, not landscape tourism.

---

## 6. FAMILY E — Temporal tells (video only — where AI still fails hardest)

Owned by **45-temporal-consistency-director** and finished by the edit department
(**56-continuity-match-cut-editor**, **52-colorist**). A frame can be perfect; the *sequence* betrays
AI. This is why the studio's default is **ONE keyframe → image-to-video (route R3)**, animating the
scene, never re-drawing the product frame-by-frame (V2 §7bis).
- **Identity drift** → face, hair length/part, label text, eye color subtly *change* over the clip.
  Lock identity via keyframe conditioning + seed; skill 45 flags drift frame-to-frame.
- **Flicker / boiling** → grain, texture, and lighting *shimmer* between frames. Grain must be a
  *consistent* overlay, textures stable; skill 52 unifies with a single grade + regrain.
- **Texture crawl / morphing** → skin pores, fabric weave, hair strands *swim*. Kill with stable
  reference conditioning and shorter generations.
- **Object-impermanence / background pop** → objects appear/vanish/teleport between frames; a
  background element flickers into existence. Hard-fail.
- **Warping / rubber-sheet motion** → straight edges wobble as things move; the bottle "breathes."
  For product, this is caught by **41-product-fidelity-checker** too (label must not warp).
- **Temporal seams at cuts** → in a multi-clip ad meant to read as ONE unbroken movement (the
  flagship's whole thesis), motion vectors, light, and grade must match across the cut — owned by 56.
- **Loop stutter** (LP microvideos, skill 36) → first and last frame must match seamlessly; a visible
  jump on loop is a tell.
- **The trim fix:** many temporal tells live in the first/last few frames of a generation. Skill 50/55
  **trims drift frames** and stabilizes — post is where temporal realism is *finished*.

---

## 7. FAMILY F — Text & semantic tells

Owned by **37-typography-compositor**, **24**, **26**. Models cannot spell — especially Arabic (RTL,
cursive joins). This is *why the studio never generates text in-model.*
- **Gibberish / melted / mirrored Arabic** → **NEVER let the model render Arabic.** All ad Arabic
  (headline, CTA, price) is **added in POST** by the typography-compositor (El Messiri display /
  Tajawal text), guaranteeing correct فصحى and killing the #1 cause of image regenerations.
- **The label text on the bottle** is a special case: it is **part of the product**, reproduced
  **photographically via reference-conditioning** (R1/R2), NOT re-typeset by a model, and NEVER
  altered (per lock `do_not_alter` + skill 41). The label is not "text to generate" — it's "pixels to
  preserve."
- **Nonsense sub-logos, fake watermarks, invented brand marks, subtitle burn-in** → negative-prompt
  them out; the model must not hallucinate UI, captions, or marks.
- **Wrong numerals / broken price glyphs** → prices/numbers set in post with correct LTR handling
  inside RTL layout.

---

## 8. Product-specific realism — the reference-conditioned imperative

The product is the one thing the studio **must not "make realistic" by describing it** — it is
reproduced from the real photos (V2 §7bis, routes R1/R2/R3). But its *integration* into a realistic
scene is a realism problem this doc owns:
- **Relight the real packshot to match the scene's light** (R1 bg-replace) — a pasted product lit
  differently from its environment is an instant composite tell. Contact shadow + environment
  reflection in the glass must be generated to match.
- **Ground it** — contact shadow, a faint reflection on the podium, correct scale.
- **Preserve the label region absolutely** — inpaint/edit that never touches the label, or composite
  the real flat label in post. Skill 41 hard-fails any label/color/cap/seal drift.
- **Oil color fidelity** — ΔE against the lock's sampled oil hexes; the warm brown-amber-red never
  shifts to ruby, orange, or pink under a scene's grade.
- **Honesty on rotation** — a turntable/3D banner needs multiple real angles or it drifts; with only a
  front photo, restrict to a small label-face micro-move and FLAG for more angles (V2 §7bis.1).

---

## 9. The "ADD THE RIGHT IMPERFECTIONS" library (positive clauses)

Drop the relevant clauses into the ONE Kie prompt (via **26**). These are the *presence* half of the
doctrine — every product-hero prompt should carry a curated subset, matched to the beat.

**Optical (almost always include):** shallow depth of field, soft natural bokeh, fine film grain,
subtle chromatic aberration at high-contrast edges, gentle lens vignette, filmic highlight roll-off,
motivated single-source lighting with real falloff, a hair of veiling glare, natural motion blur on
movement, handheld micro-shake (video).

**Human / hair:** visible skin pores and peach fuzz, subsurface scattering, subtle skin-tone
unevenness and warmth, one or two natural imperfections (a mole/freckle), asymmetric features and
pose, wet eye meniscus and a single motivated catchlight, micro-saccades, irregular natural blink,
breathing and weight shift, hair flyaways and frizz halo, individually-resolved strands, a broken
traveling shine, natural follow-through on hair movement.

**Physics / materials:** contact shadows and grounding reflections, viscous cohesive oil flow,
oblate (not spherical) droplets, warm oil caustics and internal light transmission, visible meniscus
and headspace air-gap, refraction through clear PET, soft diffuse shading reading the cap's vertical
ribs, woven fabric micro-texture with gravity folds, organic imperfect botanical texture.

**Environment:** lived-in warm home/majlis, gentle wear and patina, a little dust in the light shaft,
imperfect natural prop placement, structurally-straight architecture, asymmetric composition.

**Grade (post, skill 52):** warm amber/copper film emulation matched to the oil, print-stock grain,
gentle contrast with real shadow density, skin-tone-accurate, no HDR halo.

> **Calibration:** imperfections are *subtle*. Overcooked grain, heavy CA, obvious shake, or grime on
> a *luxury* beauty product reads cheap and breaks the premium register (§5 luxury feel gate). The
> target is "expensive filmed commercial," not "found footage." Tune to *just enough* to pass as real
> while staying luxe.

---

## 10. The "REMOVE THE AI TELLS" negative bank (feeds skill 24 → `negative-prompt-library.md`)

The *removal* half. This is the master anti-tell negative core, aligned with STUDIO-BIBLE §6.6 and
expanded per family. **26** always compiles a beat-matched subset.

```
# Human
plastic/waxy/airbrushed skin, poreless CGI skin, uniform sheen, doll blush,
extra fingers, missing fingers, fused/melting fingers, six fingers, extra limbs,
malformed/rubbery hands, bending-wrong joints, uniform denture teeth, merged teeth,
dead/glassy eyes, thousand-yard stare, no catchlight, mismatched double catchlights,
over-symmetric face, forced/frozen smile, uncanny expression, mannequin stillness,
metronome blink, wax figure, doll, mask-like face
# Hair
helmet hair, plastic wig, no flyaways, merged hair sheets, painted hair, low-res hair,
uniform gloss stripe, hair not moving with head, clumped low-detail mass
# Optical
everything in focus, infinite depth of field, no bokeh, CGI donut bokeh, no grain,
no noise, clinical digital clean, no chromatic aberration, no vignette, HDR halo,
oversaturation, hard-clipped highlights, flat sourceless lighting, no motion blur,
frozen fast motion, robotic locked camera, video-game render, CGI look, 3D render look
# Physics / materials
floating objects, weightless motion, no contact shadow, detached/floating shadow,
water-thin oil, splashing oil, perfect spherical droplet, no caustics, no refraction,
flat sticker label, glossy smoothed cap, plastic cloth, painted flat gold, CGI-clean props,
liquid filled flat with no meniscus, impossible balance
# Environment
too clean, brand-new showroom, dust-free perfection, over-symmetric staging,
tiling/repeating textures, cloned foliage, warping straight lines, bending architecture,
melting geometry, impossible layout, desert/camel/tent/souk backdrop
# Temporal (video)
identity drift, face morphing, changing label, flicker, boiling texture, texture crawl,
object impermanence, background pop, temporal warping, rubber-sheet motion, jitter,
loop stutter, drift frames
# Product (also enforced by skill 41)
morphing bottle, warped/changed label, altered logo, added «الأحمر» on label,
wrong cap color, ribbing smoothed away, square/squat bottle, ruby/orange/pink oil,
moved/missing gold seal, invented text on label
# Text / semantic
gibberish text, melted/mirrored Arabic, wrong Arabic, in-image generated text,
fake watermark, subtitle burn-in, invented sub-logo, broken numerals
```

---

## 11. The DETECTOR CHECKLIST — skill 46's hard gate

**46-ai-tell-detector** runs this on every generated/edited asset (image frame or sampled video
frames) BEFORE any final-tier spend and AFTER every render. It scores each family 0–100, composes the
`undetectability` axis (§1 weights), and applies hard caps. **This checklist IS the gate.** Answer
each item PASS / FAIL / N/A with a one-line reason; any FAIL routes back to regenerate (draft tier —
never iterate at final cost).

**A · Human (weight 25%) — cap: any melted-hand or dead-eye FAIL caps whole asset ≤ 60**
- [ ] Skin has real pores/peach fuzz/subsurface, not waxy uniform sheen
- [ ] Skin tone keeps warm Gulf undertone (not pink-shifted / de-saturated)
- [ ] Finger count = 5 per hand; knuckles/nails correct; no fusing/bending
- [ ] Eyes have a single matched catchlight, moisture, asymmetry; not dead/glassy
- [ ] Teeth non-uniform (if visible); smile asymmetric/genuine, not frozen
- [ ] (video) Breathing, weight, irregular blink, micro-motion present — not mannequin
- [ ] Hair has flyaways/frizz halo, resolved strands, broken traveling shine — not a wig

**B · Optical (22%) — cap: no-DoF OR no-grain FAIL caps ≤ 70**
- [ ] A clear focal plane exists; DoF falls off; bokeh soft/natural (not donut/CGI)
- [ ] Fine grain/sensor noise present (denser in shadow); NOT plastic-clean
- [ ] Subtle chromatic aberration + vignette present; not clinical
- [ ] Filmic highlight roll-off; no HDR halo / hard clip / oversaturation
- [ ] (video) Motion blur on movement; handheld micro-motion; not robotic/frozen
- [ ] One motivated light direction with real falloff; not flat/sourceless

**C · Physics / materials (18%)**
- [ ] Every object has a connected, direction-consistent contact shadow (nothing floats)
- [ ] Oil is viscous/cohesive, oblate droplets, caustics + internal transmission; correct color (ΔE ok)
- [ ] Bottle interior shows meniscus + headspace air-gap; clear PET refracts; label seen through far wall
- [ ] Cap reads matte with visible vertical ribs; not glossy-smoothed
- [ ] Reflections (glass/eyes/podium) contain the actual scene; not mismatched
- [ ] Fabric/botanicals have real organic/woven texture; not plastic CGI

**D · Environment (12%)**
- [ ] Set reads lived-in/home with subtle wear; not a dust-free showroom
- [ ] Composition asymmetric/natural; props at imperfect angles
- [ ] Straight lines straight; no warping/melting architecture; coherent 3D space
- [ ] No tiling/cloned textures; no banned orientalist backdrop

**E · Temporal (15%, video only) — cap: identity drift OR label morph = hard FAIL**
- [ ] No face/hair/label/eye identity drift across the clip
- [ ] No flicker/boiling/texture-crawl; grain stable frame-to-frame
- [ ] No object-impermanence / background pop / warping
- [ ] Cuts match motion+light+grade (reads as one movement); loops seamless

**F · Text / semantic (8%)**
- [ ] NO model-generated text anywhere (Arabic added only in post)
- [ ] Product label preserved exactly (photographic, unaltered) — cross-checked by skill 41
- [ ] No gibberish text, fake watermark, subtitle burn-in, invented logo/numerals

**Composite verdict:**
- Weighted `undetectability` ≥ 90 AND no hard-cap FAIL → **PASS** → proceed to fidelity gate (41) → final spend.
- Any hard-cap FAIL, or weighted < 90 → **REJECT** → return to the owning director with the failing
  items → regenerate at draft tier → re-run. Never spend final credits on a failing asset.
- "Obviously AI at a glance" (the 300 ms scroll test) → automatic hard FAIL regardless of score.

---

## 12. How the doctrine maps to the skills (one glance)

| Skill | Family owned | This doc feeds it… |
|---|---|---|
| **16-hair-realism-director** | A (hair) + C (hair dyn) | flyaways/strand/shine/follow-through clauses (§2.5, §9) |
| **17-human-realism-director** | A | skin/eyes/expression baseline (§2.1–2.4) |
| **18-environment-realism-director** | D | lived-in/wear/no-showroom clauses (§5) |
| **19-oil-product-realism-director** | C (oil) | viscosity/caustics/meniscus/color (§4.2) |
| **42-optical-camera-realism-director** | B | the whole optical library (§3, §9) — the biggest silent tell |
| **43-physics-materials-realism-director** | C | gravity/materials/shadows (§4) |
| **44-human-micro-realism-director** | A | micro-detail: hands/teeth/pores/saccades/asymmetry (§2) |
| **45-temporal-consistency-director** | E | anti-drift/flicker/morph (§6) |
| **46-ai-tell-detector** | ALL | §11 checklist = its gate; §1 weights = its axis |
| **24-negative-prompt-builder** | ALL | the §10 removal bank |
| **26-kie-prompt-builder** | ALL | phrases §9 positives + §10 negatives into the ONE prompt |
| **52-colorist / 55 / 56 (post)** | B, E | grain/grade unification, drift-frame trim, cut-matching |
| **41-product-fidelity-checker** | (product) | label/cap/color/seal fidelity, complements §8 & §11-F |

---

## 13. Failure conditions & non-negotiables

- **Do NOT** trade realism for "prettiness." A retouched, poreless, HDR "beautiful" frame FAILS §11.
- **Do NOT** let the model render ANY Arabic or alter the label — post + reference-conditioning only.
- **Do NOT** overcook imperfections into "found footage" grime on a luxury product (§9 calibration).
- **Do NOT** spend final-tier credits before §11 PASS **and** skill 41 fidelity PASS.
- **Do NOT** ship an asset with any hard-cap FAIL (melted hand, dead eyes, no DoF, no grain, identity
  drift, label morph) — regardless of overall score.
- **Do NOT** hardcode the mechat bottle — read the ACTIVE `products/<slug>/product-lock.yaml` for all
  vessel/oil/label specifics; this doctrine is product-agnostic by construction.
- **When this doc and the Bible / active product-lock disagree, they win.**

**Handoff:** the realism directors (16–19, 42–45) author their per-beat specs from this doctrine; **26**
compiles them into the single Kie prompt with matched §9 positives and §10 negatives; **46** gates
with §11; **41** gates product fidelity; the post department (52/55/56) finishes the temporal/optical
realism in the grade and the cut. Only a green §11 + green 41 unlocks final-tier spend. Realism is not
a look you add at the end — it is a contract enforced at every stage, and *the absence of tells is as
load-bearing as the presence of craft.*
