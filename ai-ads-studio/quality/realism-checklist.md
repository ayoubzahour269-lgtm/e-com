# Realism QC Checklist — The Frame-by-Frame Pass/Fail Sheet

### The operator's checklist for **prime directive #1 (Realism)**. Run every keyframe and every generated clip against this before it advances a stage or spends a finishing credit. Organized by domain — **human · hair · skin · oil/product · environment · optics · physics · temporal** — each row is a binary the reviewer can defend out loud. This is the *auditable* companion to `knowledge/undetectable-realism-doctrine.md`: the doctrine explains **why**; this sheet is **what you tick**.

> **Quality / checklist artifact — not a skill.** Consumed by **27-quality-checker**,
> **28-creative-scoring-engine**, and the QC gate **46-ai-tell-detector**; armed by the realism
> directors **16 / 17 / 18 / 19** and the v2 specialists **42 / 43 / 44 / 45**; read in post by the
> editing department (**52-colorist**, **56-editorial-realism-pass**, **55-finishing-delivery**).
> It sits alongside `quality/scoring-rubric.md` (the weighted 0–100 score) and
> `products/<slug>/fidelity-checklist.md` (the *product identity* pass — a separate gate).
>
> **Grounding.** STUDIO-BIBLE §0 (Realism is priority ONE — "it must look filmed, not generated"),
> §3 (Gulf women ~22–45, warm-toned skin), §5 (modesty, 9:16, sound-on), §7 (ship threshold ≥ 95
> weighted, **NO axis < 90**). STUDIO-BIBLE-V2 §7bis (product is ALWAYS reference-conditioned —
> routes R1/R2/R3, never text-to-image) and §7ter.B (Undetectable Realism Engine). **When this sheet
> and the Bible disagree, the Bible wins.** This sheet invents no product claim, no lock detail, and
> no Arabic copy; product rows read the ACTIVE `products/<slug>/product-lock.yaml`. Arabic label / ad
> text is added in POST by **37-typography-compositor** — it must NEVER be model-generated, so any
> in-frame Arabic on a raw generation is an automatic REJECT (see §H, Text row).

---

## 0. How to run this sheet

1. **Scope.** Static asset → run domains that appear in frame (skip Temporal). Video → run **every**
   domain on the worst frame AND on the motion (Temporal is video-only and mandatory).
2. **Binary rule.** Every checkbox is PASS / FAIL / N-A. "Almost" = FAIL. If you have to argue for it,
   it fails. Write the timecode/region for every FAIL so the fix is addressable.
3. **Severity tags.** Each row carries a tag:
   - `[HARD]` — one FAIL hard-fails the whole asset regardless of score. Never ships. These are the
     "obviously AI" tells (melted hand, dead eyes, morphing label, floaty motion, gibberish text).
   - `[MAJOR]` — one FAIL caps the realism axis at **< 90** → below the Bible §7 gate → auto-improve.
   - `[MINOR]` — accumulates; **three MINOR FAILs in one domain** promote to one MAJOR.
4. **Scoring map.** Count per domain, then feed skill 46: `undetectability` sub-axis = weighted clean
   rate across the six tell families (Human/Bio 25 · Optical 22 · Physics 18 · Temporal 15 · Env 12 ·
   Text 8). **The worst single domain caps the axis** — a frame 96% clean overall still fails on one
   `[HARD]`. See §Scoring at the bottom.
5. **Regenerate scenes, never whole videos** (Bible §0). A localized FAIL → targeted re-roll or a post
   fix (grade/regrain/inpaint), not a fresh generation. Log which.
6. **Reference-conditioned check FIRST.** Before any realism row: confirm the product entered via
   R1/R2/R3 from the real reference, not t2i. If the vessel was hallucinated, STOP — this is a
   fidelity failure, kick to **41-product-fidelity-checker**; realism QC is moot on a fake bottle.

---

## A. HUMAN — "Is that a living person?" `[family A · weight 25%]`

The deepest, fastest-caught, least-forgiven tells. Owned by **17 / 44**. Warm-toned Gulf skin (Bible §3).

- [ ] **Eyes — catchlight** `[HARD]` One catchlight per real light source, same **shape** as that source
      (soft window = soft box, ring = ring). Zero catchlight = corpse; two random = two suns = fake.
- [ ] **Eyes — moisture & meniscus** `[MAJOR]` Wet tear-line meniscus along the lower lid, faint
      reflective film on the sclera. Bone-dry matte eye = fake.
- [ ] **Eyes — life & asymmetry** `[HARD]` No dead / glassy "thousand-yard stare"; pupils sized to the
      scene light; slight vergence and left/right asymmetry. Perfectly identical mirrored eyes = fake.
- [ ] **Eyes — micro-motion (video)** `[MAJOR]` Micro-saccades, irregular blink cadence (~ every 3–6 s,
      not metronomic), lids actually touch on blink. No blink in an 8 s clip = fake.
- [ ] **Hands — count & structure** `[HARD]` Exactly five fingers, correct joint count, right-length
      thumb, knuckle creases, real nails. Any extra / missing / merged / bent-wrong digit = instant reject.
- [ ] **Hands — contact & weight** `[MAJOR]` Where a hand holds the bottle or touches hair it
      **deforms** the surface (compression, cast contact shadow). Floating no-contact grip = fake.
- [ ] **Teeth (if visible)** `[MAJOR]` Individual, slightly non-uniform teeth; no single fused white bar,
      no impossible count. `[MINOR]` subtle translucency at the edges.
- [ ] **Face — asymmetry** `[MAJOR]` Real faces are asymmetric — brow, smile, ear height differ L/R.
      Over-symmetric "model-generator" face = fake.
- [ ] **Expression honesty (video)** `[MAJOR]` Micro-expressions and eye-mouth agreement (a real smile
      moves the eyes / orbicularis). Mouth-only smile with static eyes = uncanny.
- [ ] **Body — pose & balance** `[MAJOR]` Weight over a base of support, natural counterpose; no
      impossible joint angle, no boneless "rubber" limb.
- [ ] **Ears / neck / jewelry** `[MINOR]` Ears structurally consistent both sides; earrings/rings the
      same across cuts; no melting metal.
- [ ] **Modesty & culture** `[HARD, gate]` Meets Bible §5 / `gulf-beauty-brand-norms.md` — coverage,
      setting, styling read as aspirational Gulf, not a Western stock cliché. A modesty miss is a
      publish-blocker independent of realism.

## B. HAIR — "Is it grown, not molded?" `[family A/C · owned by 16]`

The hero surface for a hair-oil ad — the highest-scrutiny texture in frame.

- [ ] **Flyaways & frizz halo** `[HARD]` Individual stray strands and a soft backlit frizz halo at the
      crown/edges. Zero flyaways = helmet / wig = fake.
- [ ] **Strand resolution** `[MAJOR]` Hair resolves to **individual strands**, not painted sheets or
      merged plastic ribbons; parting shows scalp with real strand roots.
- [ ] **Traveling shine band** `[MAJOR]` The healthy-hair shine is a **soft band that moves with the
      curve** of the head (anisotropic), not a flat airbrushed gloss patch. This is the oil's on-screen proof.
- [ ] **Root-to-tip variation** `[MINOR]` Ends slightly lighter / more translucent / more separated than
      roots; no uniform mannequin colour top to bottom.
- [ ] **Follow-through (video)** `[MAJOR]` On any head turn / hand pass, hair has **inertia and lag** —
      it trails then settles, strands separate and recombine. Rigid one-piece motion = fake.
- [ ] **Oil-on-hair read (product-critical)** `[MAJOR]` Where oil is applied: slightly darker, heavier,
      more clumped-cohesive strands and a wetter specular — **not** a dry matte or a greasy plastic slab.
- [ ] **Scalp realism** `[MINOR]` At partings/roots: real scalp tone, faint follicle stipple, no bald
      plastic dome.

## C. SKIN — "Is it flesh, not wax?" `[family A · the #1 human tell]`

- [ ] **Pores & peach fuzz** `[HARD]` Visible pores and vellus (peach-fuzz) hair, densest at
      cheek/nose/jaw and rim-lit ear edge. Uniform poreless "airbrushed CGI" skin = the #1 reject.
- [ ] **Subsurface scattering** `[MAJOR]` Warm translucency where light grazes thin tissue — ear rims,
      nostril wings, fingertips, tip of nose. Opaque flat plastic skin = fake.
- [ ] **Specular break-up** `[MAJOR]` Highlights follow real micro-geometry (T-zone oilier than
      cheeks); a broken, varied sheen — never one uniform plastic gloss over the whole face.
- [ ] **Real imperfection** `[MINOR]` At least some fine lines, faint redness, a mole/freckle, slight
      unevenness. Flawless retouched perfection reads generated. (Keep tasteful for beauty.)
- [ ] **Tone consistency** `[MINOR]` Warm Gulf undertone consistent across face/neck/hands/ears; no
      grey CGI cast, no mismatched face-vs-hands colour.
- [ ] **Contact & occlusion** `[MINOR]` Soft ambient-occlusion shadow in nose creases, under jaw,
      between fingers — not a flat evenly-lit mask.

## D. OIL / PRODUCT — "Does the liquid and the vessel obey matter?" `[family C · owned by 19; fidelity by 41]`

Product identity (colour hex, proportions, cap, do-not-alter list) is the **fidelity** gate
(`products/<slug>/fidelity-checklist.md`). This sheet checks the **physical realism** of how it renders.

- [ ] **Viscosity & flow** `[HARD]` The oil moves like oil — slow, cohesive, self-adhering ribbon;
      climbs and beads on necks/glass; does NOT splash or spray like water. Water-thin flow = fake.
- [ ] **Droplet shape** `[MAJOR]` Falling/hanging droplets are **oblate and elongated** (pear/teardrop),
      never perfect CGI spheres; a pendant drop necks before it releases.
- [ ] **Caustics & transmission** `[MAJOR]` Translucent oil **transmits and bends** light — warm caustics
      on the surface below, an amber internal glow, a bright thin backlit rim. Opaque paint-fill = fake.
- [ ] **Meniscus & headspace (in-bottle)** `[MAJOR]` Curved liquid meniscus at the wall + a visible air
      gap / headspace at the top (per lock fill level). A bottle filled flat to the brim = fake.
- [ ] **Vessel material** `[MAJOR]` Clear PET/glass **refracts**: real wall thickness at the rim, edge
      caustics, and the label/back wall seen slightly distorted **through** the liquid. A flat sticker
      on a shape with no refraction = fake.
- [ ] **Cap / closure** `[MINOR]` Per lock (e.g. matte ribbed cap): soft diffuse shading that reads the
      ribs with a faint specular on rib crests — not a smoothed glossy blob.
- [ ] **Surface wetting** `[MINOR]` Residue/sheen where oil has touched glass or skin — a real broken
      specular film, not a dry surface or a uniform gloss decal.
- [ ] **Colour truth** `[MAJOR → fidelity]` Oil colour matches the lock within tolerance (ΔE per
      fidelity-checklist). Wrong red/amber = kick to **41**, not a realism re-roll.
- [ ] **Label legibility & lock** `[HARD]` The real label stays the locked artwork — not morphed,
      warped, re-typeset, or re-language'd by the model. Hallucinated label text = reject to 41.

## E. ENVIRONMENT / SET — "A real place with history?" `[family D · owned by 18]`

- [ ] **Lived-in detail** `[MAJOR]` Surfaces have wear, dust, fingerprints, slight clutter, imperfect
      alignment. A spotless zero-history showroom set = fake "AI room".
- [ ] **Grounded objects** `[HARD]` Everything rests with a **contact shadow / ambient occlusion** at
      its base. Any object floating a hair above the surface = instant reject.
- [ ] **Consistent light logic** `[MAJOR]` All shadows agree on direction/softness with one motivated
      key; reflections match what's actually in the room. Mismatched multi-directional shadows = fake.
- [ ] **Straight lines stay straight** `[MAJOR]` Tile grout, shelf edges, window frames, mirror edges do
      not warp, bow, or wander. Warping architecture = a classic tell.
- [ ] **Reflections agree** `[MINOR]` Mirrors/glossy counters reflect the correct scene geometry and the
      subject in the right place; no ghost or missing reflection.
- [ ] **Depth & scale** `[MINOR]` Believable perspective and object scale; no giant/tiny prop, no
      impossible room depth.
- [ ] **Cultural setting** `[MINOR, gate-linked]` Props/architecture read authentically Gulf-premium
      (per `gulf-beauty-brand-norms.md`), not a generic Western or stereotyped "Orientalist" set.

## F. OPTICS / CAMERA — "Was this shot through a lens?" `[family B · owned by 42/13 · the biggest single tell]`

Clinical digital perfection is the loudest AI signal. The frame must carry **camera evidence**.

- [ ] **Depth of field** `[HARD]` A real focal plane: something is sharp, the rest falls off with
      **smooth, oblong bokeh**. All-in-focus flatness = "no lens" = fake. Set the plane (label / eyes /
      meniscus) deliberately.
- [ ] **Motion blur (video)** `[HARD]` Moving subjects and fast pans carry motion blur consistent with a
      real shutter (~180°). Crisp-frozen fast motion = video-game / AI tell.
- [ ] **Sensor grain / noise** `[MAJOR]` A fine, natural luminance grain — especially in shadows. A
      perfectly noiseless "plastic clean" image reads generated. Add/keep grain; never fully denoise.
- [ ] **Highlight roll-off** `[MAJOR]` Filmic shoulder — highlights roll and bloom, they don't clip to
      flat digital white with a hard HDR halo. Clipped haloed speculars = fake.
- [ ] **Lens character** `[MINOR]` Slight vignette, a touch of chromatic aberration at high-contrast
      edges, faint corner softness. Zero optical character = clinical/fake.
- [ ] **Handheld micro-shake (video)** `[MINOR]` Even "locked" shots breathe with tiny handheld
      micro-motion / focus micro-hunt. Robotic dead-still perfection = fake (unless a true tripod look).
- [ ] **Rolling shutter (fast pan, video)** `[MINOR]` On whip pans, a faint natural skew — not a
      perfectly rigid pan. `[MINOR]` lens breathing on rack focus.
- [ ] **Exposure believability** `[MINOR]` One coherent exposure; no impossible simultaneously-perfect
      highlights and shadows screaming tonemapped-HDR.

## G. PHYSICS / MATERIALS — "Does matter behave?" `[family C · owned by 43]`

- [ ] **Gravity & weight** `[HARD]` Everything has weight and falls/hangs/drapes correctly; fabric folds
      under gravity, hair hangs down, liquid pools at the bottom. Floaty weightless motion = reject.
- [ ] **Inertia & follow-through (video)** `[MAJOR]` Starts/stops have acceleration and settle; nothing
      teleports to a stop. Cloth and hair lag then catch up.
- [ ] **Material response** `[MAJOR]` Glass refracts, metal has sharp environment reflections, matte
      plastic diffuses, fabric has weave and soft shadow, skin subsurface-scatters — each material reads
      as *itself*, not one uniform "CGI shader".
- [ ] **Contact shadows** `[MAJOR]` Every contact point casts a soft occlusion shadow; grip deforms;
      pour disturbs the surface it lands on. No contact shadow = floating = fake.
- [ ] **Fluid dynamics (product)** `[MAJOR]` Oil pour has a coherent stream that necks and breaks into
      oblate drops, forms a small crater/ripple, self-levels slowly. Ties to §D viscosity.
- [ ] **No impossible physics** `[HARD]` No objects passing through each other, no self-intersecting
      limbs/props, no liquid defying gravity, no balance that couldn't stand.
- [ ] **Cloth & drape** `[MINOR]` Garments fold, wrinkle, and move with believable weight and stiffness
      for the fabric; no rigid "sculpted" cloth, no jelly cloth.

## H. TEMPORAL — "Is it stable over time?" `[family E · video only · owned by 45/56]`

Run across the whole clip, not one frame. A perfect keyframe can still crawl in motion.

- [ ] **Identity stability** `[HARD]` The face/hair/product **do not drift or morph** frame-to-frame —
      same person, same bottle, same label throughout. Any identity morph = reject.
- [ ] **No flicker / boil** `[MAJOR]` Textures (skin, hair, fabric) don't shimmer, crawl, or "boil"
      between frames; lighting is temporally stable (no strobing exposure).
- [ ] **Object permanence** `[HARD]` Objects don't pop in/out, spawn, vanish, or swap; background
      elements persist and stay put. Popping props = reject.
- [ ] **Coherent motion path** `[MAJOR]` Movement follows one continuous believable trajectory; no
      teleport jumps, no rubber-banding, no reversed physics mid-move.
- [ ] **Hair/cloth temporal continuity** `[MAJOR]` Strands and folds evolve continuously — they don't
      re-shuffle randomly each frame. Ties to §B follow-through.
- [ ] **Background stability** `[MINOR]` Background geometry/patterns don't wander, warp, or breathe;
      straight lines stay straight *over time*, not just per frame.
- [ ] **Grade/grain continuity (post)** `[MINOR]` Colour grade and grain are consistent across the cut
      and across scene joins; no shot-to-shot tone jump, no grain that appears/disappears.
- [ ] **Text (semantic) — CRITICAL RULE** `[HARD]` A **raw generation must contain NO Arabic ad/label
      copy** — all Arabic is added in POST by **37-typography-compositor**. Any model-generated Arabic
      (or gibberish pseudo-text) in-frame is an automatic REJECT. Post-added Arabic is checked separately
      by the typography pass (correct فصحى, RTL, kerning, safe-zone), not here.

---

## Scoring — turning ticks into the gate decision

1. **Per-domain clean rate** = passed rows ÷ applicable rows in that domain.
2. **Promotions:** 3× `[MINOR]` FAIL in one domain → 1 `[MAJOR]`. Any `[MAJOR]` FAIL → that domain caps
   at < 90. Any `[HARD]` FAIL → whole-asset **REJECT** (no score can rescue it).
3. **Undetectability sub-axis** (fed to skill 46 → 27/28) = weighted mean of the six family clean rates:
   `Human/Bio 25% · Optical 22% · Physics 18% · Temporal 15% · Environment 12% · Text 8%`. The
   **worst single family also imposes a hard cap** — you cannot average away one melted hand.
4. **Ship gate (Bible §7):** overall weighted score **≥ 95 with NO axis < 90**. A single `[MAJOR]`
   anywhere pushes the realism axis under 90 → below gate → **auto-improve, don't ship**.
5. **Route the fix, log it:**
   - Localized artifact (one drop, one strand region, one edge) → **inpaint / targeted re-roll / regrain**
     in post; don't burn a full generation (Bible §0 cost discipline).
   - Systemic tell (waxy skin everywhere, no DoF, floaty motion) → fix the **prompt** (imperfection
     clause via 44/42/43 + negative clause via 24) and re-roll the scene.
   - Product identity FAIL (colour/label/proportion) → **41-product-fidelity-checker**, not realism.
   - Modesty/culture FAIL → publish-blocker; kick to **21-cultural-expert-gulf** / brand guardian.

## Reviewer's fast triage (the 12-second pre-scan before the full sheet)

If any of these scream on first look, stop and REJECT before ticking rows — they are the universal
"obviously AI" set and every one maps to a `[HARD]` above:

1. Waxy poreless skin. 2. Dead/glassy eyes or no catchlight. 3. A bad hand (extra/melted/merged
fingers). 4. Helmet hair with zero flyaways. 5. Everything in focus / no depth of field. 6. Floaty
weightless or teleporting motion. 7. A floating object with no contact shadow. 8. Warping straight
lines / bending architecture. 9. Morphed or re-typeset product label. 10. Any model-generated Arabic
or gibberish text in a raw frame. 11. Perfect noiseless plastic-clean image (no grain, no motion
blur). 12. Water-thin splashy "oil". Pass the 12-second scan first, then earn the score on the full sheet.

---

*Companion docs:* `knowledge/undetectable-realism-doctrine.md` (the why + full tell catalog),
`knowledge/hair-oil-realism.md`, `knowledge/human-realism.md`, `knowledge/negative-prompt-library.md`
(the removal half), `quality/scoring-rubric.md` (the weighted 10-axis score),
`products/<slug>/fidelity-checklist.md` (product identity gate). When any disagree, **the STUDIO-BIBLE wins.**
