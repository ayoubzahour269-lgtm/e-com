# Hair & Oil Realism — Physics-for-Prompting Reference
### (Strand Structure & Anisotropic Shine · Volume/Flow · Oil Viscosity & Pour · Droplet Surface Tension · Jewel-Red Translucency · Macro Reflections · AI Failure Modes & Fixes — mapped to UNBROKEN THREAD)

> **Knowledge base article — reference material, not a skill.** Dense, scannable,
> checklist-heavy physics-for-prompting reference primarily for Stage 8's
> **16-hair-realism-director** and **19-oil-product-realism-director**, and secondarily for
> their Stage-8 co-authors (**12-camera-director**, **13-lighting-director**,
> **14-motion-director**, **15-transition-designer**, **17-human-realism-director**,
> **18-environment-realism-director**), Stage 10 (**22-brand-guardian**,
> **23-product-consistency-guard**), and Stage 11 (**25-prompt-optimizer**,
> **26-kie-prompt-builder**). Grounded in `STUDIO-BIBLE.md` §3 (claims 1–4, the four
> ingredients, the "does not dye hair red" FAQ), §4 (the immutable bottle/cap/liquid/label
> lock and hero-environment DNA), §5 (culture — hair-as-hero, restraint), §6 (the flagship
> **UNBROKEN THREAD** — §6.1 beat sheet, §6.3 overlays, §6.4 VO, §6.6 negatives), §7 (quality
> gates). **When this document and the Bible disagree, the Bible wins.** Nothing here invents
> a product claim, a lock detail, or new Arabic copy — every locked value cited below as "the
> flagship's" is quoted from **16-hair-realism-director**'s and **19-oil-product-realism-
> director**'s own Outputs, never re-derived; this document teaches the **real-world physics
> and optics underneath those Outputs** so a director can reason correctly about any new
> beat, not just recite the locked numbers.

**How this document relates to `16-hair-realism-director`:** that skill is the **authoring
skill** — it reads this physics vocabulary (among other inputs) and produces
`hair-realism.md`, the locked per-beat hair brief for the flagship. *This* document is the
**craft-physics reference underneath it** — the fiber optics of why hair shine reads as a
moving band, the biology of root-to-tip colour depth, the mechanics of strand weight — turned
into the exact descriptive-prose phrasing `26-kie-prompt-builder` can drop into the ONE Kie
prompt. Use 16's `hair-realism.md` for *what this ad's hair already is*; use this document for
*why each cue works and how to build the next one correctly*.

**How this document relates to `19-oil-product-realism-director`:** the same relationship, one
layer down, for the liquid and the bottle — the fluid dynamics of why a poured ribbon coils,
the optics of why translucent garnet glows at thin edges and reads darker at its core, the
surface-tension mechanics of a falling drop. Use 19's `oil-realism.md` for *what this ad's oil
already is*; use this document for *the physics that makes the cue correct*.

---

## 1. Scope & where this sits in the pipeline

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 8 | `16-hair-realism-director` | The fiber-optics grounding (§2–§4) behind its own hair-material spec (Output 16.2), the anisotropic shine-ribbon model (Output 16.2 B), and the root-to-tip flow law (Output 16.5) |
| 8 | `19-oil-product-realism-director` | The fluid-dynamics grounding (§5–§8) behind its own oil-material spec (Output 19.2), the pour/ribbon and drop/ripple laws (Output 19.5), and the macro-reflection recipe (Output 19.2 D) |
| 8 | `12-camera-director` | Why macro scale (100 mm, very shallow DoF) is required to resolve strand-level and droplet-level detail (§2.1, §6, §7) |
| 8 | `13-lighting-director` | Why the ¾-back gold kicker is the physical instrument that *creates* the shine-ribbon and the oil's macro reflections (§3, §8) |
| 8 | `14-motion-director` | The weight/inertia/secondary-motion physics (§2.4) and the fluid-acceleration physics (§5–§6) it times into curves |
| 8 | `15-transition-designer` | The ripple-decay and pour-continuity physics (§6) behind the T1/T2 transition engines, and the hair-sweep mass physics (§2.4) behind T3 |
| 8 | `17-human-realism-director` / `18-environment-realism-director` | The hair-skin boundary and set-reflection physics that keep the hand/set consistent with §2–§8 |
| 10 | `22-brand-guardian` / `23-product-consistency-guard` | The colour-lock physics (§7) — why a red/orange shift is a physics error, not just a brand error |
| 11 | `25-prompt-optimizer`, `26-kie-prompt-builder` | The **phrasing formulas** (§3, §6–§8) — gear-free descriptive prose ready to compile into the single natural-language paragraph a Veo-3-class model reads |
| 12 | `27-quality-checker`, `28-creative-scoring-engine` | The failure-mode tables (§9) as the naming convention for **Realism** and **Product consistency** gate findings |

**Authority note:** every locked spec cited below as "the flagship's" value — the hair colour
lock, the oil viscosity class, the vessel/cap/liquid/label geometry — is quoted from
`16-hair-realism-director` Output 16.2 or `19-oil-product-realism-director` Output 19.2/19.3.
This document does not set those numbers; it teaches the physics they are built from, exactly
as `lighting-recipes.md` and `camera-movements.md` do one layer up for light and camera.

**The gear-free discipline (inherited, not re-argued here):** `kie_veo3`'s prompt dialect is a
natural-language paragraph, rewarded by descriptive scene language, not scientific jargon
(`cinematography-language.md` §9; `26-kie-prompt-builder` Rule R2). Every physics concept below
exists to be **translated into a plain descriptive clause** — never dropped into the compiled
prompt as a technical term. Where this document names a real optical or fluid phenomenon
(anisotropic reflection, Fresnel, Rayleigh–Plateau), treat it as the *reasoning layer*; the
"Ready-to-paste" lines are what ship.

---

## 2. Hair-strand physics fundamentals

The physical facts of real hair a director reasons from before writing a single cue.

### 2.1 Fiber structure & scale

| Property | The physics | What it means for prompting |
|---|---|---|
| **Strand diameter** | A single human hair fibre is roughly **50–100 micrometres** across — thinner than the resolving power of most casual video, which is exactly why hair reads as "detail" rather than "surface" | At true macro scale (the HOOK's single strand, the RITUAL's coated section) the model must be told to resolve **individual filaments**, not a texture — "individually resolved strands" is a resolution instruction, not a beauty adjective |
| **Strand count** | A human scalp carries roughly **90,000–150,000** strands (the exact count varies with natural colour — finer, more numerous strands for light hair; thicker, fewer for red) | Density in the frame is a **count-and-clustering** problem, not a "make it fuller" problem — real hair reads as many separate fibres clustering into sections, never a single inflated mass |
| **Cross-section** | Each strand is an elongated cylinder with a layered structure: an outer **cuticle** of overlapping translucent scales, an inner **cortex** carrying the pigment, and (in thicker strands) a central **medulla** | The cuticle's overlapping-scale structure is *why* hair shine behaves differently from a flat surface's shine — see §2.2 |
| **Growth direction** | Every strand emerges from a follicle at a consistent local angle, giving a section a **directional grain** — like the nap of velvet | A prompt that doesn't state a flow direction lets the model default to a random or radial tangle; direction must always be named ("flowing from the part downward") |

### 2.2 The anisotropic highlight model — why real hair shine is a *band*, not a *dot*

This is the single most important optical fact behind the shine-ribbon (16 Output 16.2 B) and
the plastic/wig failure mode (§9.1 row 2).

**The physics.** A flat, smooth surface (glass, painted plastic, a mirror) reflects light
**isotropically** around its surface normal — the highlight is a round, roughly point-shaped
hotspot that stays fixed relative to the surface as the light or camera moves slightly. A hair
strand is not a flat surface — it is a **thin cylinder**, and light striking a curved cylindrical
surface reflects specularly in a narrow cone that runs **around the fibre's circumference but
along its length**. Across a *section* of many parallel strands, that per-fibre reflection cone
sums into one continuous **elongated band of light running across the grain of the hair**,
oriented **perpendicular to the strand direction** — the shine-ribbon.

**The double-highlight detail (real hair, one layer deeper).** Because the cuticle is
translucent, a small amount of light does not reflect off the surface at all — it enters the
fibre, travels a short distance through the pigmented cortex, and exits again. This creates a
**second, dimmer, slightly warmer-toned highlight**, subtly offset from the primary band, often
toward the tip. This is why real hair shine looks *layered* — one crisp cool-white primary band,
one soft warm secondary glow beneath it — rather than a single flat gloss.

**Why this makes "shiny hair" the wrong instruction.** A prompt that just says "shiny, glossy
hair" gives the model no cylindrical-fibre logic to work from, so it defaults to the easiest
interpretation: a flat isotropic gloss laid over the whole hair mass — the **uniform mirror
sheet / patent-leather** tell. The fix is always to name the band's **shape and behaviour**, not
just its brightness.

**Ready-to-paste phrasing (grounded in the physics above):**

| Use case | Ready descriptive phrase |
|---|---|
| Establishing the shine-ribbon | *"one soft, moving band of warm light crosses the grain of her hair, brighter where the strands catch the light directly and fading gently at its edges"* |
| The layered/double-highlight detail | *"a soft warm glow lingers just beneath the brightest line of light, as if the light is passing a little way into the strand before it escapes"* |
| Macro single-strand (HOOK) | *"a single faint line of light travels the length of the falling strand as it catches the window light"* |

**Kill / anti-tell:** a flat gloss sheet with no directional band; a round point-highlight (the
isotropic-surface tell, correct for glass/eyes but wrong for hair); a highlight that doesn't move
when the hair moves (§9.1 row 2; Bible §6.6 `plastic hair`).

### 2.3 Root-to-tip colour depth — the biology behind the gradient

| Zone | The physics/biology | What it means for prompting |
|---|---|---|
| **Root** | Newly grown hair is the least weathered — minimal UV exposure, minimal mechanical/product wear — so pigment reads at its **truest, darkest, most saturated** | State the root as the **darkest** point explicitly; a flat-toned render usually skips this and paints the whole strand one value |
| **Mid-length** | Moderate weathering; this is where the anisotropic shine-ribbon (§2.2) is most visible against a still-rich base tone | This is the shine-ribbon's home zone — band **over** mid-tone, not over the root or the tip |
| **Tip** | The oldest hair on the strand has absorbed the most cumulative UV and mechanical wear, which subtly lightens and warms its appearance even with zero artificial colour treatment | State tips as **slightly warmer/lighter**, never bleached — this is a *depth* cue, not a colour-treatment cue |

This root→mid→tip gradient is what makes hair read as **three-dimensional and grown**, rather
than a flat colour swatch. A single flat brown is the `flat single-tone hair, dimensionless hair`
tell (Bible §6.6-adjacent; 16 Output 16.8).

### 2.4 Weight, mass & secondary motion

**The physics.** A hair strand behaves, mechanically, like a **thin flexible cantilever** —
imagine a diving board, not a rigid rod. When its base (the scalp) moves, the strand does not
move instantly and uniformly with it: the base moves first, and the motion propagates down the
strand's length with a **lag**, an **overshoot**, and a **settle**, the same way a whip's tip
snaps after the handle has already stopped. This is **secondary motion** — motion the strand
carries *because of its own mass*, distinct from the primary motion of the head or hand causing
it.

| Motion phase | The physics | Where it appears in the flagship |
|---|---|---|
| **Lead** | The base (scalp/root) moves first | The turn begins at the shoulders/head |
| **Lag** | The tip trails behind the base, arriving later | TRANSFORMATION — the ends of the hair are still catching up as the face settles |
| **Overshoot** | The strand's own momentum carries it slightly past the base's final position before gravity/air resistance pull it back | A visible small "extra" swing after the head stops turning |
| **Settle** | Oscillation decays and the strand comes to rest under gravity | The final beat of the TRANSFORMATION hold |
| **Air-drift** | A single unweighted strand falling in still air catches subtle air resistance, drifting and rotating slightly rather than falling in a perfectly straight line | The HOOK's falling strand |

**Why this matters for the model.** A model given no weight/timing cue defaults to one of two
wrong extremes: **rigid** (hair moves as one stiff unit locked to the head — the "mannequin"
tell) or **rubbery** (hair overshoots wildly with no decay — the "gummy jiggle" tell). Both are
physically wrong for the same reason: neither respects that mass causes lag *and* that friction
and gravity cause the lag to decay. Always cite both halves — the lag **and** the settle.

**Ready-to-paste phrasing:** *"as she turns, her hair follows a beat behind her shoulders, the
ends trailing and settling naturally into place rather than snapping instantly with her
movement."*

---

## 3. Shine vs plastic — the sheen spectrum, made operational

Every hair render sits somewhere on a one-dimensional spectrum between two failure cliffs, with
the correct answer in the centre. This table is the fast, checklist-form version of §2.2's
physics.

| Sheen register | What produces it | Visual signature | Ship? |
|---|---|---|---|
| **Matte / dead** | No specular cue given at all | Flat, chalky, no light response — reads unwashed or dry-brittle | ✗ contradicts §3 claim 4 (shine & softness) |
| **Luxe-real (the target)** | One anisotropic band, mid-length, graceful rolloff, layered secondary glow (§2.2) | Silk-with-strands — light response that moves *with* the hair and *across* the grain | ✓ **SHIP** |
| **Uniform mirror gloss** | A flat "shiny/glossy" cue with no directional-band instruction | The whole mass reflects evenly — patent-leather, wig-shop sheen | ✗ the #1 plastic tell (16 Rule R1/R3) |
| **Blown-white hotspot** | A specular cue with no rolloff/exposure ceiling | A clipped white patch with a hard clean edge, no gradual falloff | ✗ reads as a lighting-rig error, not skin/hair |

**The rolloff rule (the difference between "premium" and "plastic" at the pixel level):** a real
highlight's brightness **falls off gradually** from its peak — a soft transfer, not a hard edge.
A CGI/AI-default highlight tends to clip at a hard boundary because nothing told it to taper.
Always pair a shine cue with a rolloff cue: *"a soft band of light … fading gently at its
edges"* — never *"a bright highlight"* alone.

**One band per lit section, never several.** Real directional lighting (the studio's one-key
discipline, `lighting-recipes.md` §2) produces **one** shine-ribbon per light source per visible
hair section. Multiple competing hot bands across the same head read as multiple uncoordinated
light sources — an "AI sheen" tell as much as a lighting error.

---

## 4. Volume, density & flow craft

**Volume is a silhouette property; density is a per-area count property — they are not the same
instruction.**

| Concept | What it controls | How to state it | Anti-tell |
|---|---|---|---|
| **Volume** | The overall silhouette — crown lift, how far the hair stands away from the scalp | "natural crown lift, healthy body and fall" | Flat helmet silhouette (too little) or an inflated CGI bouffant (too much) |
| **Density** | How many strands appear per unit area of visible scalp/section — closes or reveals scalp gaps | "fuller sections, the part staying real, scalp gaps closing" | Uniform "mane" with no visible part (over-dense, reads fake) or visible thin patches in the "after" state (under-dense, contradicts the claim) |
| **Flow** | The consistency of strand direction within a section (§2.1) | "flowing directionally from the part" | Chaotic omnidirectional tangle — no section reads as one coherent gesture |

**Why density and volume must be specified separately.** A model told only "more voluminous
hair" often inflates the *silhouette* (adds apparent bulk) without adding *visible strand count*
at the scalp — producing a puffy mass that still shows thin roots underneath, which reads as
fake fullness. The flagship's claim-3 payoff (**noticeable density & length**) is a **count**
claim, so the cue must target the **root area and the part**, not just the outer silhouette.

**The part is the credibility anchor.** A visible, believable **part line** — where the scalp
shows through in a thin, natural line and strands fall away from it in both directions — is the
single strongest "this grew from a head" cue. A "full" head of hair with no visible part reads
as a wig cap or a helmet regardless of how much shine or movement is added.

---

## 5. Oil physics fundamentals

### 5.1 Viscosity classes & a concrete reference table

**Viscosity** is a fluid's internal resistance to flow — informally, "how thick it feels."
It is measured in **centipoise (cP)**; the table below gives general, widely cited reference
points for craft grounding (not brand-specific measurements):

| Substance | Approx. viscosity (cP, room temperature) | Pour behaviour |
|---|---|---|
| Water | ~1 cP | Splashes, breaks into droplets almost immediately, near-instant response to gravity |
| Light cosmetic/carrier oil (the flagship's register) | **~50–100 cP** | Flows as a **continuous ribbon**, coils gently under gravity, holds a stable stream shape over a short fall |
| Honey (room temperature) | ~2,000–10,000 cP | Falls as a thick, slow-moving rope; barely coils, resists breaking |

**Where the flagship sits and why.** Red Mechat Oil is described in the Bible as **jewel-like,
clear (not opaque)** liquid oil — visually and physically, this locks its behaviour to the
**light-to-medium cosmetic-oil band**, distinctly heavier than water (never a watery splash) and
distinctly lighter than honey (never a frozen static rope). Every pour, drop, and fill cue must
sit inside this band; drifting either direction produces one of §9.2's oil failure modes.

### 5.2 Newtonian flow behaviour — laminar vs turbulent

A liquid in the flagship's viscosity band, poured gently (not forced or agitated), flows in a
**laminar** regime — smooth, continuous, parallel-layered flow with no chaotic mixing. This is
what makes a pour read as **one coherent ribbon** rather than a **turbulent** splash (chaotic,
broken, foaming — the register of water hitting a hard surface at speed).

| Flow regime | What it looks like | When it's correct | When it's a tell |
|---|---|---|---|
| **Laminar** | A smooth, continuous, glassy-surfaced ribbon or sheet | Always — every pour/fill/coat beat in the flagship | n/a — this is the target |
| **Turbulent** | Foaming, splashing, chaotic breakup | Never, in this ad's restrained luxury register | A "watery splash" always signals the viscosity cue was missing or too low |

### 5.3 Gravity acceleration & the coiling effect

**The physics.** When a moderately viscous liquid falls from a height under gravity, it
accelerates, and its own falling speed **outpaces** the rate at which more liquid can arrive from
the source above it. The excess length has to go somewhere, and — because the stream resists
stretching thin (viscosity) while also resisting a sharp bend (surface tension) — it buckles into
a gentle, rotating **coil**, the same phenomenon visible when honey or syrup is poured onto a
plate from a height (a well-studied real fluid-dynamics effect sometimes called **liquid rope
coiling**). It is most visible in the last few centimetres before the stream meets a surface.

**Why this is the tell that separates "filmed" from "simulated."** A perfectly straight, rigid
pour reads as a CGI primitive (a cylinder asset) because real fluid physics essentially never
produces one — some coil or sway is almost always present. Absence of any coil is itself an
anti-realism signal, not a neutral choice.

**Ready-to-paste phrasing:** *"a continuous ribbon of oil falls from the bottle's neck, gently
coiling and swaying as it nears the surface below, never a rigid straight stream."*

---

## 6. Droplet surface tension & formation physics

**Surface tension** is the property that makes a liquid's surface behave like a stretched elastic
membrane, minimizing its own surface area. It governs three distinct, physically sequential
moments the flagship's HOOK→T1 beat depends on:

### 6.1 Formation — the neck

As a drop gathers at a source (a fingertip, a bottle lip, the underside of a falling ribbon), it
does not simply detach — surface tension holds it connected by a thinning **neck** that
elongates until it can no longer support the drop's weight, at which point it pinches off. This
neck-then-pinch sequence (a version of the classic **Rayleigh–Plateau** instability that governs
how liquid streams break into drops) is the single strongest visual proof of a real, physically
behaving liquid, because it is very difficult to fake convincingly — a model told only "a drop
falls" skips straight to an already-detached sphere, which is the #1 droplet tell (§9.2 row 6).

### 6.2 Shape — the teardrop, not the sphere

**Common misconception this document exists to correct:** a falling raindrop is *not* actually
shaped like the cartoon teardrop once it's airborne and small — but a **freshly detaching** drop,
in the instant of separation and for a brief moment after, genuinely does carry an elongated,
tapered leading edge and a rounded trailing bulb, because it is still relaxing out of the necked
shape surface tension held it in. This is exactly the moment the flagship's HOOK→T1 beat renders
— **the drop at and just after separation**, not a drop that has been falling for a long
distance. The teardrop cue is physically correct for this specific moment.

### 6.3 Impact & the ripple's decay

When the drop meets the oil surface, real fluid dynamics produces **concentric rings** that
radiate outward from the impact point. Two things happen simultaneously and must both be stated:

- **Amplitude decays** — each successive ring is shorter/shallower than the last, because energy
  dissipates as the wave travels and as viscosity damps the motion.
- **Spacing widens** — the rings spread further apart from each other as they travel outward.

A ripple that repeats identically, or loops back on itself, violates simple energy conservation —
it reads as a **looped video-texture asset**, one of the fastest tells in a generated water/liquid
surface (Bible §6.6 `temporal warping`).

**Entry force matters too.** A drop entering a liquid surface **gently** (low relative velocity,
consistent with a short fall from a comb to a still surface) produces a soft, contained ripple. A
**violent** entry produces a splash crown and spray droplets — dramatic, but wrong for the HOOK's
"quiet, intimate, elegant" register (Bible §6.1).

**Ready-to-paste phrasing:** *"the drop meets the surface with a soft, quiet kiss rather than a
splash, sending a gentle ring of ripples outward that fade and widen naturally, never repeating."*

---

## 7. Jewel-red translucency — the light-transmission physics behind the garnet look

This is the physics that separates a **jewel-like oil** from an **opaque red liquid** — the
single most important optical distinction for the flagship's product, since the Bible locks the
oil as "translucent deep garnet / ruby-red oil — jewel-like, clear (not opaque)" (§4) and
explicitly forbids it from ever reading orange, brown, or pink.

**The physics, simplified for prompting.** A translucent coloured liquid absorbs light as it
passes through — and the amount absorbed depends on how much liquid the light has to travel
through (its **path length**). This general relationship (formally, the **Beer–Lambert law** of
light absorption) has two consequences a director can state directly, without ever citing the
physics term:

| Where light travels a **short** path through the liquid | Where light travels a **long** path through the liquid |
|---|---|
| Very little is absorbed — the liquid reads **bright, almost glowing**, close to the pure garnet hue at its most saturated-but-luminous | Much more is absorbed — the liquid reads **darker, denser, more saturated toward black-garnet** at its thickest point |
| This happens at **thin edges**: the rim of a falling ribbon, the tapered tip of a drop, the outer curve of the bottle where the liquid is shallow | This happens at the **core**: the centre of a full drop, the thick body of liquid inside the bottle, the deepest part of a pool |

**The single sentence this produces:** *"the oil glows brighter and more translucent at its thin
edges and reads as a deeper, denser garnet at its thickest point"* — this one clause is the most
reliable way to make a rendered liquid look like it is genuinely transmitting light rather than
simply being painted a flat colour.

**Why an opaque red is a physics failure, not just a brand failure.** A liquid with no
visible brightness gradient between thin and thick regions is optically behaving like an
**opaque, matte pigment** (like painted plastic or a label mock-up), not a translucent liquid —
this is exactly the `liquid color shift` / opaque-paint tell (Bible §6.6; 19 Output 19.10). The
fix is never "make it more red" — it's "make the transmission gradient visible."

**Subsurface glow (backlighting).** When light comes from behind or through the liquid (the T2
oil-fill beat, a backlit pour), translucent liquids show an internal glow — the light appears to
originate *inside* the body of the liquid, not just reflect off its surface. This is the
"suspended highlight" effect the flagship's oil relies on for its most luxe macro moments.

**The forbidden hue drift, physically explained:**

| Drift | What physically causes a render to drift this way | Why it's wrong here |
|---|---|---|
| **→ Orange** | Warm-grading the whole frame (correct for skin/light, per `lighting-recipes.md` §5's warm-band law) can simultaneously desaturate a garnet liquid's blue/violet undertone, pushing its hue warmer | The Bible locks garnet, never orange (§4) |
| **→ Brown** | Under-exposure or excessive absorption modelling reads as the liquid going "muddy"/desaturated | Under-lit garnet reads dead, not premium |
| **→ Pink** | Over-exposure clips the liquid's highlight, washing out the saturated core and leaving only a pale, diluted-looking tint | Clipped highlights are also a rolloff failure (§3) — the two errors often co-occur |

---

## 8. Macro reflections — specular behaviour on liquid & glass

**The physics: Fresnel reflectance.** Every transparent or translucent surface (glass, liquid,
wet skin, oil) reflects *more* light back to the viewer at a **grazing angle** (where the
sightline nearly skims the surface) than it does when viewed **straight-on** (where the surface
is closer to perpendicular to the sightline). This is the **Fresnel effect** — informally, "edges
of curved transparent things are more reflective/whiter than their centres."

**What this produces on the flagship's bottle and oil:**

| Region | Viewing geometry | What should appear |
|---|---|---|
| The **edge/curve** of the bottle glass, the edge of a pouring ribbon | Grazing angle relative to camera | Brighter, more reflective — a thin bright rim |
| The **centre** of the bottle, straight through the liquid | Near-perpendicular to camera | Translucency dominates — you see *into* the liquid (§7), not a reflection *off* it |

A render that reflects uniformly everywhere (a flat, even gloss across the whole bottle and
liquid) has ignored Fresnel behaviour entirely and reads as a **CGI glass shader** rather than
photographed glass — one of the clearest "candy-glass" tells (§9.2 row 1).

**Why "one or two highlights," never a wrapped environment map.** Real macro photography of
glass/liquid under a single soft key light (the studio's one-key discipline) produces **one or
two soft, directional specular passes** — not a crisp mirror image of the whole surrounding set.
A render that shows a sharp, legible reflection of the arch, the drape, and the light source all
at once inside the bottle is over-rendering — that level of clarity only comes from a raytraced
"perfect mirror" shader, not from a photographed translucent object under soft light.

**The rolloff rule applies here too (§3).** Every specular pass on glass or liquid must fade
gracefully from its peak, never clip to a hard-edged blown-white patch.

**Ready-to-paste phrasing:** *"a thin bright edge traces the curve of the glass and the falling
ribbon where the light grazes them, while the body of the bottle stays soft and translucent, one
gentle highlight catching the light, never a hard mirror shine."*

---

## 9. Common AI failure modes & the exact fixes

The payload of this document: every recurring hair/oil AI tell, its physical root cause (from
§2–§8), and the exact positive cue and negative token that fixes it. Cross-reference `16-hair-
realism-director` Output 16.8 and `19-oil-product-realism-director` Output 19.10 for the full
negative-prompt lists these summarize.

### 9.1 Hair failure modes

| # | Failure mode | Physical root cause (why the model does this) | Visual symptom | Positive fix cue | Negative token |
|---|---|---|---|---|---|
| 1 | **Wig / helmet merge** | No per-strand instruction given; the model defaults to rendering hair as one solid volumetric mass rather than a filament collection (§2.1) | A single glossy blob with no visible part or individual filaments | *"individually resolved strands, a real visible part"* | `wig look, helmet hair, merged/melted hair mass` |
| 2 | **Uniform mirror gloss / patent-leather sheen** | "Shiny" cited with no anisotropic-band or rolloff instruction (§2.2, §3) | A flat, even shine across the whole head instead of one moving band | *"one soft travelling anisotropic band of light with a graceful fade at its edges"* | `uniform mirror gloss, patent-leather sheen, blown-white highlight clip` |
| 3 | **Zero-flyaway "glued" perfection** | Generative models default toward idealized, symmetric outputs absent an explicit imperfection cue | A hard, planted hairline with no loose strands | *"a few natural flyaways and soft baby hairs at the part"* | `planted/glued hairline, doll hair, over-smoothed hair` |
| 4 | **Frizz halo (the opposite cliff)** | Over-correcting with "textured/voluminous" tokens with no "groomed" counter-cue | A chaotic tangle or halo of stray strands | *"predominantly smooth, healthy hair with only a handful of flyaways"* | `frizz halo, flyaway halo` |
| 5 | **Stiff mannequin motion / frozen strands** | No weight/inertia cue given; motion defaults to rigid-body (locked to the head) (§2.4) | Hair moves as one unit with zero lag on a turn or fall | *"hair follows a beat behind the movement, trailing and settling naturally"* | `mannequin-stiff hair, frozen strands, physics-defying floating hair` |
| 6 | **Rubbery over-jiggle** | Overcorrecting §2.4's lag with no settle/decay cue | Hair swings past its resting point repeatedly with no damping | *"the movement settles naturally, easing to rest"* | `rubber/gummy hair jiggle` |
| 7 | **Colour shift to red/orange (garnet bleed)** | Warm frame-grading plus proximity to the garnet set/liquid pushes dark-brown hair toward a red/auburn cast | Hair reads auburn or henna-tinted instead of dark brown with gold sheen | *"deep espresso dark-brown hair with warm amber-gold reflections, never red or orange"* | `hair colour shift to red/orange, henna-dyed red hair` |
| 8 | **Flat single-tone hair** | No root-to-tip gradient cue given (§2.3) | The whole strand reads one flat colour with no depth | *"darkest at the roots, warm reflective through the mid-length, slightly warmer at the tips"* | `flat single-tone hair, dimensionless hair` |
| 9 | **Greasy clumped ropes when oiled** | "Oily/wet" cited with no "individually defined / non-greasy" counter-cue at the RITUAL beat | Oiled strands merge into wet spikes or ropes instead of staying separate | *"oil-coated but silky and non-greasy, strands stay individually defined"* | `greasy clumped hair, wet oily ropes, oily spikes` |
| 10 | **Wig-swap across the transformation** | No same-hair continuity anchor between the "before" and "after" states; the model re-derives hair independently at each described moment | Colour, texture, or part differ before vs. after the turn | *"the same hair — identical colour, texture, and part — now visibly fuller, longer, and more luminous"* | `wig-swap between shots, hair morphing between frames` |
| 11 | **Low-res / mushy macro hair** | Macro strand detail at true fibre scale (§2.1) exceeds the model's default confidence, so it renders a soft blurred mass instead | Strand detail reads mushy, indistinct at extreme close-up | *"filmed macro hair detail, crisp individual filaments, cuticle-level sheen"* | `low-res hair, blurry hair` |

### 9.2 Oil / product failure modes

| # | Failure mode | Physical root cause (why the model does this) | Visual symptom | Positive fix cue | Negative token |
|---|---|---|---|---|---|
| 1 | **CGI fluid-sim / candy-glass look** | No viscosity class specified (§5.1); the model defaults to a generic, over-clean "liquid" shader look | Rubbery, uniform-gloss, artificial-looking fluid | *"a light-to-medium viscosity cosmetic oil, real oil-weight fluid motion"* | `CGI fluid simulation look, candy-glass gloss, plastic-looking liquid` |
| 2 | **Watery splash pour** | Viscosity under-specified; the model's most common training liquid is water, so it defaults to water-like turbulent behaviour (§5.1, §5.2) | The pour splashes and breaks apart instead of flowing as a ribbon | *"a continuous laminar ribbon, gently coiling as it falls"* | `watery splash pour, choppy disconnected pour stream` |
| 3 | **Rigid rope / frozen drip** | Overcorrecting viscosity upward with no "sway/coil" cue (§5.3) | The pour looks like a solid stick that doesn't move naturally | *"consistent diameter with a slight taper, natural sway"* | `rigid straight rope pour, honey-thick frozen drip` |
| 4 | **Opaque paint-red liquid** | Colour cited without a transmission/translucency cue (§7) | The liquid reads as flat matte red, like painted plastic or a label mock-up | *"translucent deep garnet oil, light glowing through it, brighter at thin edges"* | `opaque paint-red liquid, matte non-translucent oil` |
| 5 | **Colour drift to orange/brown/pink** | Warm-grading, under-exposure, or highlight-clipping shifts the garnet hue (§7) | The liquid's hue reads off-brand | *"a warm garnet core, never orange, brown, or pink"* | `orange oil, brown oil, pink oil, liquid color shift` |
| 6 | **Perfect spherical drop** | "A drop falls" with no formation/neck cue defaults to the simplest primitive shape — a sphere (§6.1–§6.2) | The falling drop looks like a CGI ball, not an organic liquid form | *"a teardrop-shaped drop with a visible surface-tension neck at the instant of release"* | `perfectly spherical drop, rigid/frozen drop` |
| 7 | **Violent splash / crown-spray entry** | No "gentle" qualifier on the impact; the model defaults to a dramatic splash for visual interest (§6.3) | The drop's entry breaks the HOOK's quiet, intimate register | *"a soft, quiet kiss entry, not a splash"* | `violent splash crown-spray` |
| 8 | **Looping / repeating ripple** | The model reuses a generated water-surface texture cycle rather than a single decaying event (§6.3) | The ripple pattern visibly repeats or resets | *"a ripple that fades and widens naturally, never repeating"* | `looping ripple, repeating ripple pattern, flat static painted ripple` |
| 9 | **Blown-white highlight hotspot** | No rolloff/Fresnel cue given; a hard specular clips to pure white (§3, §8) | An overexposed white patch on the liquid or glass with a hard edge | *"a soft directional highlight with a graceful fade, never a blown-white hotspot"* | `blown-white highlight hotspot, uniform 360-degree glass-shader reflection` |
| 10 | **Morphing bottle / warped label** | No fixed-identity anchor across a continuous shot; the model redraws the object per frame instead of holding one identity | The bottle shape drifts or the label text warps mid-shot | *"one unchanging bottle — identical shape, cap, liquid colour, and label in every frame"* | `morphing bottle, changing/!warped label, altered logo` |
| 11 | **Floating / hovering bottles (OFFER rise)** | The literal "rise into place" beat language (Bible §6.1) given with no landing/contact cue | The two arriving bottles hang in mid-air with no ground contact | *"the bottles arrive and settle onto the podium, each casting a matching contact shadow"* | `hovering/levitating bottle, bottle with no ground shadow` |

---

## 10. Per-beat physics application (UNBROKEN THREAD, §6.1)

Which physics section governs each hair-or-oil-bearing beat, tied to the locked overlay/VO
language it must remain consistent with.

| Beat (§6.1) | t (s) | Governing physics | Locked language it must honour |
|---|---|---|---|
| **HOOK / Pain** | 0.0–1.2 | §2.4 (air-drift on the falling strand), §2.2 (single-strand shine-ribbon) | Overlay: **«كل تمشيطة… وشعرك ينقص؟»** (*kull tamshīṭa… wa-shaʿruki yanquṣ?*, "Every comb stroke… and your hair keeps thinning?") |
| *T1 · drop↔strand* | 1.2–1.6 | §6.1–§6.3 (neck formation, teardrop shape, gentle-kiss entry, decaying ripple) | Bible §6: *"the oil drop and the hair strand are the transition engines"* |
| **DISCOVERY / Trust** | 1.6–3.0 | §5.1–§5.3 (viscosity, laminar flow, coiling pour), §7–§8 (translucency, Fresnel reflections on the bottle) | Overlay: **«سرّ جداتنا: زيت المشاط الأحمر»** (*sirru jaddātinā: zayt al-mishāṭ al-aḥmar*, "Our grandmothers' secret: Red Mechat Oil") |
| *T2 · dive into pour* | 3.0–3.4 | §7 (subsurface/backlit glow) | Full-frame translucent garnet + gold highlights (Bible §6.1) |
| **RITUAL / Sensory** | 3.4–4.8 | §2.3–§2.4 (hair state), Output-level RITUAL interface: oil film stays a **thin sheening layer**, never a puddle, never clumping strands | Overlay: **«تغذية تصل إلى الجذور»** (*taghdhiya taṣil ilā al-judhūr*, "Nourishment that reaches the roots"); §3 claim 4 verbatim — *"coats the strand, silky, non-greasy"* |
| *T3 · hair-sweep* | 4.8–5.2 | §2.4 (strand-path motion blur under mass and velocity) | The natural wipe mechanism (Bible §6.1) |
| **TRANSFORMATION** | 5.2–6.6 | §2.2–§2.4 in full (shine-ribbon travels the length, weighted turn, root-to-tip depth) | Overlay: **«كثافة وطول… وشعر يتكلّم عنكِ»** (*kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki*, "Density and length… hair that speaks for you"); VO L4: *«فيتوقف التساقط… وينمو شعرٌ أكثف، أطول، وأكثر لمعانًا»* (*fa-yatawaqqaf at-tasāquṭ… wa-yanmū shaʿr akthaf, aṭwal, wa-akthar lumʿānan*, "So the shedding stops… and hair grows thicker, longer, and shinier") |
| *T4 · highlight→bloom* | 6.6–7.0 | §2.2 (the shine-ribbon travels root→tip, then hands to the light-bloom) | Golden highlight travelling the hair (Bible §6.1) |
| **OFFER + CTA** | 7.0–8.0 | §5.1 (identical liquid/vessel across all three bottles), §6.1 resolution table (grounded, staggered, shadowed arrival) | Overlay: **«باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني»** (*bāk 3 qanānāt — 139 riyāl badal 185 · shaḥn majjānī*, "3-bottle pack — 139 SAR instead of 185 · Free shipping") |

**The four ingredients, cited only as colour/texture context (never as new visual claims):**
**المشاط / قشور الجوز** (*al-Mishāṭ*, walnut husk — roots), **الكركديه الأحمر** (*al-karkadīh
al-aḥmar*, red hibiscus — warm tone), **الحناء الطبيعية** (*al-ḥinnāʾ al-ṭabīʿiyya*, natural
henna — coats & protects the strand, adds density & shine), **زيوت نباتية مغذية** (*zuyūt
nabātiyya mughadhdhiya*, nourishing plant oils — root-to-tip hydration) — Bible §3. These
motivate the garnet-and-gold warmth of the whole hair/oil palette; they never license a colour
claim beyond the §4 lock (no visible dye/tint on the hair, per the §3 FAQ).

---

## 11. Do / Don't table

| DO (physically correct) | DON'T (the AI-default failure) | Physics section |
|---|---|---|
| One moving anisotropic shine-band per lit hair section, with graceful rolloff | A flat, uniform gloss sheet across the whole head | §2.2, §3 |
| Individually resolved strands clustering into sections around a real part | A single merged, glossy hair mass | §2.1, §4 |
| Root darkest → mid warm-reflective → tip slightly warmer | One flat, single-tone colour top to bottom | §2.3 |
| Weighted motion with lag, overshoot, and a settle | Rigid mannequin-locked motion, or unchecked rubbery jiggle | §2.4 |
| A visible, believable part with density read as strand count | An inflated silhouette with no visible scalp/part structure | §4 |
| Light-to-medium oil viscosity: continuous ribbon, gentle coil under gravity | Watery splash (too thin) or a rigid frozen rope (too thick) | §5.1–§5.3 |
| A drop with a formation neck, teardrop shape, and gentle-kiss entry | A pre-formed perfect sphere entering with a violent splash | §6.1–§6.3 |
| A ripple that decays in amplitude and widens in spacing, never repeating | A looping or flat, static-painted ripple texture | §6.3 |
| The oil glowing brighter/thinner at edges, denser/darker at its thick core | A flat, opaque, evenly-coloured "painted" liquid | §7 |
| One or two soft, Fresnel-true specular passes with graceful rolloff | A uniform 360° mirror reflection or a blown-white hotspot | §8 |
| The same hair — colour, texture, part — before and after, only fuller/longer/shinier | A wig-swap: different texture or colour between "before" and "after" | §2.3, §9.1 row 10 |
| The oil as a thin, silky, non-greasy sheen on the RITUAL strand | Pooling, dripping, or clumped greasy ropes | §5.1, §9.1 row 9 |
| Bottles that arrive, decelerate, and settle with a matching contact shadow | Bottles that hover, float, or snap into place with no ground contact | §9.2 row 11 |

---

## 12. Glossary of optics & fluid-dynamics vocabulary

Alphabetical; general craft/physics knowledge, not flagship-specific invention.

- **Anisotropic reflection** — reflection whose brightness depends on the *direction* light
  strikes a surface's grain, not just the angle of incidence; the physical cause of hair's
  moving shine-band, as opposed to an isotropic surface's fixed round highlight (§2.2).
- **Beer–Lambert law** — the general relationship between light absorption and the distance
  light travels through an absorbing medium; the basis for why a translucent liquid reads
  brighter at thin edges and darker at its thick core (§7).
- **Capillary neck** — the thinning connective column of liquid that forms between a detaching
  drop and its source, produced by surface tension resisting immediate separation (§6.1).
- **Cortex** — the pigmented inner layer of a hair fibre, beneath the cuticle, responsible for
  the strand's base colour (§2.1).
- **Cuticle** — the outer layer of overlapping translucent scales on a hair fibre; its curved,
  layered structure is what produces both the primary specular reflection and the secondary
  subsurface glow (§2.1–§2.2).
- **Fresnel effect** — the increase in a transparent/translucent surface's reflectivity at
  grazing viewing angles relative to near-perpendicular angles; governs where glass and liquid
  show bright edges vs. see-through centres (§8).
- **Laminar flow** — smooth, continuous, non-chaotic fluid flow in parallel layers, as opposed to
  turbulent flow; the correct register for every pour in this studio (§5.2).
- **Lead-and-lag** — the secondary-motion pattern where a moving object's base moves first (lead)
  and its extremity trails behind (lag) before settling; governs hair-strand movement physics
  (§2.4).
- **Liquid rope coiling** — the real fluid-dynamics phenomenon where a falling stream of
  moderately viscous liquid buckles into a rotating coil near its landing point, because its
  falling speed outpaces the supply rate from above (§5.3).
- **Medulla** — the innermost core of a thicker hair fibre, present in some but not all strands
  (§2.1).
- **Rayleigh–Plateau instability** — the physical principle governing why a falling liquid
  stream or a detaching drop's neck breaks the way it does, driven by surface tension minimizing
  surface area (§6.1).
- **Rolloff** — the gradual fade of a highlight's brightness from its peak to its surroundings,
  as opposed to a hard-edged clip; the key control separating a premium specular from a plastic
  or blown-out one (§3, §8; shared vocabulary with `lighting-recipes.md`).
- **Secondary motion** — motion an object exhibits purely because of its own mass and elasticity,
  after and in response to a primary motion applied to its base (§2.4).
- **Subsurface glow** — the appearance of internal luminosity in a translucent material when
  light enters, scatters briefly beneath the surface, and exits — the physical basis of the
  garnet oil's "suspended highlight" look (§7).
- **Surface tension** — the property causing a liquid's surface to behave like a stretched
  elastic membrane, minimizing surface area; governs droplet formation, the pinch-off neck, and
  ripple mechanics (§6).
- **Translucency** — the property of allowing light to pass through a material while still
  scattering/absorbing some of it, as opposed to full transparency (glass) or opacity (paint);
  the correct register for the flagship's oil (§7).
- **Turbulent flow** — chaotic, mixing, non-parallel fluid flow, typically produced by high
  velocity or impact; the incorrect register for this ad's restrained pours (§5.2).
- **Viscosity** — a fluid's internal resistance to flow, informally "thickness"; measured in
  centipoise (cP); the single most important number for correctly specifying pour behaviour
  (§5.1).

---

## 13. Quick-reference checklist

Before any hair-or-oil-bearing beat is handed to `12-camera-director`, `13/14/15`, or compiled
by `26-kie-prompt-builder`, confirm:

- [ ] Hair is described as **individually resolved strands** clustering around a real, visible
      part — never a merged mass (§2.1, §4).
- [ ] The shine cue names **one moving anisotropic band with graceful rolloff** — never "shiny"
      alone, never a uniform gloss sheet (§2.2, §3).
- [ ] Hair colour states the **root→mid→tip gradient** — darkest at the root, warm through the
      mid, slightly warmer at the tip — and explicitly excludes red/orange (§2.3, Rule R5 in 16).
- [ ] Any moving hair carries a **weight cue** — lag, overshoot, settle — never rigid, never
      rubbery (§2.4).
- [ ] The oil's **viscosity class** is stated as light-to-medium cosmetic oil — never watery,
      never honey-thick (§5.1).
- [ ] Every pour is described as a **continuous laminar ribbon with a gentle coil** — never a
      splash, never a rigid rope (§5.2–§5.3).
- [ ] Every drop cites a **formation neck** and a **teardrop shape at release**, entering with a
      **gentle kiss**, never a pre-formed sphere or a violent splash (§6.1–§6.3).
- [ ] Every ripple **decays in amplitude and widens in spacing**, and never loops or repeats
      (§6.3).
- [ ] The oil's colour is stated with a **transmission gradient** — glowing thin edges, denser
      dark core — never a flat opaque red, and never drifting orange/brown/pink (§7).
- [ ] Reflections on glass/liquid are **one or two soft Fresnel-true passes with rolloff** —
      never a uniform mirror wrap, never a blown-white hotspot (§8).
- [ ] The hair's before/after states share **identical colour, texture, and part** — only
      density/length/luminosity change (§2.3, §9.1 row 10).
- [ ] The RITUAL oil film is a **thin, silky, non-greasy sheen** on hair that stays individually
      defined — never pooling, dripping, or clumping into ropes (§9.1 row 9, §9.2).
- [ ] Any bottle motion (the OFFER rise) **arrives, decelerates, and settles with a matching
      contact shadow** — never hovers (§9.2 row 11).
- [ ] Every Arabic line cited for context is quoted verbatim from the Bible with transliteration
      and English gloss on first use — never re-authored.

---

## Source & authority

Grounded entirely in `STUDIO-BIBLE.md` §3 (claims 1–4, the four ingredients, the "does not dye
hair red" FAQ), §4 (the immutable bottle/cap/liquid/label lock and hero-environment DNA), §5
(culture/platform rules), §6/§6.1/§6.3/§6.4/§6.6 (the flagship beat sheet, overlays, VO, and
negatives), and §7 (quality gates), and in the fully-specified per-ad execution in
`skills/16-hair-realism-director/SKILL.md` (the hair-material spec, the root-to-tip flow law, the
frizz-control-vs-plasticity checklist) and `skills/19-oil-product-realism-director/SKILL.md` (the
oil-material spec, the pour/ribbon and drop/ripple laws, the macro-reflection recipe, the
product-hero framing lock). Where a future product's hair or liquid physics needs a phenomenon
not yet covered here, add it to this document first — with its physical grounding and its
ready-to-paste phrasing — before any skill is allowed to invent a cue ad hoc.
