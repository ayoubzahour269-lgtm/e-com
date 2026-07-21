# 3D Product-Render Craft — Photoreal CGI Look, Reference-Locked to the Real Bottle

> Reference knowledge for the `packshot`, `banner`, `lp-hero-image` and any
> "studio-render / 3D-look" family of the v2 creative matrix. Consumed primarily by
> the packshot/product-hero director, **33-banner-systems-designer** (rotating & hero
> banners), **19-oil-product-realism-director** (liquid optics), **13-lighting-director**
> (studio light), **43-physics-materials-realism-director** (glass/oil/plastic material
> response, caustics), and the prompt layer **26-kie-prompt-builder**; QC'd by
> **41-product-fidelity-checker** (fidelity) and **46-ai-tell-detector** (undetectability).
> Read alongside `knowledge/hair-oil-realism.md` (liquid/glass physics), `knowledge/
> lighting-recipes.md` (light vocabulary), `knowledge/undetectable-realism-doctrine.md`
> (anti-tell), and the **active** `products/<slug>/product-lock.yaml` (fidelity truth).
>
> **Authority order when docs disagree:** the active `product-lock.yaml` wins on *what
> the product is*; `gulf-beauty-brand-norms.md` wins on *market taste*; the Bible + V2
> addendum win on *policy*. This doc only teaches *how to make a composited packshot
> read as an expensive studio render* without ever redrawing the vessel.
>
> Three inherited laws this whole document obeys — no exception, ever:
>
> 1. **The product is reference-conditioned (routes R1/R2/R3), never text-to-image and
>    never text-to-3D.** We do NOT build a CAD/3D model of the bottle. The vessel
>    pixels come from the real photo; CGI craft styles only the *world, light and
>    contact* around it.
> 2. **Arabic label glyphs are photographic, ad/overlay Arabic is added in POST.** The
>    printed label is part of the product reference; headline/price/CTA are composited
>    by **37-typography-compositor**, never rendered inside the image model.
> 3. **One master → many exports.** One high-res studio-render master per concept; all
>    ratios and banner sizes are crop/recompose, and resolution comes from
>    **38-upscale-finisher**, not a fresh generation.

---

## 0. The paradox this doc resolves — CGI craft in a studio that never CGIs the product

A real product-viz pipeline (Blender/Cinema4D/Octane/Redshift/KeyShot) builds a 3D
model, assigns physically-based shaders, lights it with HDRI, and path-traces caustics
and reflections. **We do none of that to the bottle** — modelling the vessel from a
single front photo would *drift* the shape, invent facets, mangle the Arabic label, and
break the §7bis fidelity contract. That is exactly the failure the reference-lock exists
to prevent.

So why an entire render-craft doc? Because the *look* clients read as "expensive CGI
packshot" is not built in the geometry — it is built in **light, material response,
contact and background**, and every one of those is legally ours to author around a
locked product (`allowed_variation` in the lock: background, lighting, reflections,
contact shadows, caustics, condensation). This doc is the vocabulary for that authored
world, phrased so **26-kie-prompt-builder** can compile it into the descriptive prose a
reference-conditioned model reads.

**The operating rule:** *We simulate the render in the model's head, not in a renderer.*
We tell a bg-replace / relight / edit model to behave like Octane lit by a studio HDRI —
IOR-correct glass, absorbing translucent oil, soft-box key, ground caustics — while the
bottle itself stays the real cutout. The result photographs as CGI-grade studio product
work; the label stays pixel-true.

---

## 1. Scope & where this sits in the pipeline

| Stage | Skill | Uses this doc for |
|---|---|---|
| — | packshot / product-hero director | The full studio-render recipe (§3–§7): shader brief, HDRI setup, caustics, alpha packshot spec, all reference-conditioned |
| 6 | `33-banner-systems-designer` | The 3D-look hero + the honest turntable/rotation caveat (§6) for animated banners; alpha-on-transparent packshots (§7) for responsive placements |
| 8 | `13-lighting-director` | The studio-lighting translation of set light into product light — softbox/HDRI ratios, gradient sweep, rim separation (§4) |
| 8 | `19-oil-product-realism-director` | The oil shader (§3.2) and glass shader (§3.1) as *render* language on top of its physics; caustics as the oil's signature (§5) |
| 8 | `43-physics-materials-realism-director` | Material-response correctness for glass/oil/plastic (§3), caustics/refraction physics (§5), the anti-CGI-tell material rules (§10) |
| 11 | `26-kie-prompt-builder` | The **phrasing formulas** (§8) — render terms → model prose, per route R1/R2/R3 |
| 12 | `41-product-fidelity-checker` | The reference-lock discipline (§9): why a "nicer render" that changed the shoulder/label is a hard fail |
| 12 | `46-ai-tell-detector` | The CGI-tell failure table (§10) as the naming convention for "looks rendered, not filmed" findings |
| 13 | `38-upscale-finisher` | Why the studio master is authored once and upscaled, never re-rendered (§0 law 3) |

**Authority note:** every physical value cited as "the product's" is quoted from the
active `product-lock.yaml` (for the flagship: cylindrical clear PET, warm brown-amber
oil `#B4652A→#3A1206`, white vertically-ribbed cap `#F4F2EF`, height:body-diameter
`2.35`, fill `0.88` with visible headspace, ΔE ≤ 3, ship threshold 95). This doc never
sets those numbers; it teaches how to light and seat that exact object.

---

## 2. The render mental model — three "virtual" stages mapped to R1/R2/R3

A KeyShot artist thinks in three passes: **model → shade/light → render/composite.**
Our pipeline keeps the model as a photograph and only owns the last two, and it does so
through the three fidelity routes. Pick the route first; the render craft is applied
*inside* it.

| Virtual render stage | Physical renderer does… | We do… | Route |
|---|---|---|---|
| Model | build geometry | **skip** — real cutout is the geometry | — |
| Shade + Light | assign PBR shaders, place HDRI/softboxes | brief the model to *relight* the real cutout with these materials & lights | R1 (default) |
| Re-pose beyond relight | rotate/re-angle the model | edit/inpaint conditioned on canonical, label region preserved | R2 |
| Turntable / animated hero | spin the model, render frames | animate an approved keyframe (micro-move only from one angle) | R3 |
| Render + composite | path-trace, comp AOVs, ground | bg-replace + contact shadow + caustics + reflection pass | R1/R2 |

- **R1 (PRODUCT-REAL / WORLD-AI) is the default for every studio packshot.** The real
  magenta-chroma cutout (`references/02-front-chroma-magenta.png`) is dropped in
  pixel-intact; the model generates only the studio world, relight and contact. Product
  fidelity is MAXIMUM by construction — you cannot drift pixels you did not regenerate.
- **R2** only when the shot genuinely needs the bottle re-angled or re-lit beyond what a
  composite can fake — and only on a reference-capable model (Flux Kontext, Nano-Banana,
  Seedream/SeedEdit, GPT-image edit; never a t2i-only model on the product region).
- **R3** for motion/rotation — see §6 for the honest one-angle limit.

Never let "it would render better in 3D" pull the product region out of a reference
route. A prettier render that is a different bottle is a rejected asset.

---

## 3. Material shaders — the vocabulary (glass · oil · plastic · label)

These are **material-response briefs**, not geometry. In R1 the model must *relight the
existing surfaces* to obey them; in R2 it may re-render the surface but must land on the
same appearance. Every value is anchored to the flagship lock — swap for the active
product's lock on any other product.

### 3.1 Clear PET wall (the "glass" shader)

The vessel is clear colourless PET, read as glass. Correct optical behaviour is what
separates a studio render from a plastic-looking AI blob.

| Property | Target (descriptive) | Why it reads real |
|---|---|---|
| Transmission | high; the oil colour reads *through* the wall | a solid/opaque wall is the #1 "AI plastic" tell |
| IOR | ~1.46 (PET) — a touch less bendy than crown glass (1.52) | governs how the far label edge and background refract at the bottle sides |
| Fresnel rim | bright grazing reflection at the left/right silhouette edges | the specular vertical "glass line" that says *round glass* |
| Roughness | near-0 on the wall (polished), micro-roughness only where handled | crisp reflections = premium; blurred = cheap |
| Thin-wall refraction | slight magnification/offset of the background seen through the body | flat "sticker on glass" look = fail |
| Edge caustic | faint bright refracted line inside the shoulder curve | the optical fingerprint of a real curved transparent wall |
| Dispersion | keep OFF / minimal | rainbow fringing reads as CGI toy, not cosmetic glass |

Phrasing kit: *"clear polished PET, high light transmission, bright Fresnel specular at
the vertical silhouette edges, background subtly refracted and offset through the round
wall, crisp reflections, no rainbow dispersion."*

### 3.2 The oil (translucent absorbing liquid)

The signature material. The lock says warm reddish-brown amber (mahogany), a light-warm
neck grading to deep brown-red mass — **never bright ruby/garnet.**

| Property | Target | Anchor |
|---|---|---|
| Volume absorption gradient | thin backlit neck = warm amber → thick mass = deep brown-red | `oil_highlight #B4652A` → `oil_mid #7E2E14` → `oil_deep #3A1206` |
| Beer–Lambert depth | colour deepens with path length (glows at thin edges, darkens at core) | why a backlit bottle looks jewel-lit, not flat-tinted |
| Translucency | light-transmitting, lightly viscous, NOT opaque and NOT water-thin | lock: "translucent, lightly viscous, gentle internal transmission" |
| Meniscus | visible curved surface at the fill line, clean headspace above | lock: fill `0.88`, ~12% air gap — KEEP the gap |
| Internal caustic | warm light focused *inside* the liquid mass by the curved wall | the "lit from within" cue premium oils are shot for |
| Surface spec | one clean soft highlight on the meniscus, no foam/bubbles | bubbles/foam = agitated/cheap; still oil = luxury |
| Viscosity read | slow, honey-like if any motion; clings to the wall | matches hair-oil-realism.md pour law; fast/splashy = wrong fluid |

Hard colour gate: if the render pushes the oil to bright cranberry/ruby/garnet it is a
**hard fail** in `41-product-fidelity-checker` — a physics error (wrong absorption), not
a taste note. Backlight is what makes brown-amber *glow* without shifting hue; do not
recolour to fake glow.

### 3.3 White ribbed cap (plastic shader)

Cylindrical screw cap, flat top, semi-matte white `#F4F2EF`, fine **vertical** knurling.

- **Semi-matte, not glossy:** broad soft specular, low roughness contrast. A mirror-gloss
  cap reads as toy plastic; a dead-flat cap reads as clay. Aim between.
- **Subtle subsurface:** white cosmetic caps have a faint waxy translucency at edges —
  a hair of SSS keeps it from looking like painted metal.
- **Knurling micro-shadow:** the vertical ribs catch a thin rim of light on the key side
  and micro-shadow on the shade side — this vertical texture is a fidelity element (its
  *direction* and *pitch* are locked). Do not smooth it away and do not switch to
  horizontal ribs.
- **Neck band:** thin clear thread/neck band visible below the cap — keep it; erasing it
  is a silhouette change.

### 3.4 The label (matte wrap — reproduced, never re-shaded into a new look)

The label is a **printed BOPP/paper wrap**, matte white substrate. In render terms it is
a near-Lambertian surface with a faint sheen and a real curved-wrap gradient across the
cylinder. **Critically: the label is reproduced photographically, not re-typeset or
re-styled.** Render craft applies only to *how light falls on it*:

- Matte substrate: soft even falloff, no plasticky hotspot across the type.
- Wrap curvature: the panel bends with the cylinder; type compresses toward the silhouette
  edges — this is correct and must be preserved, not "flattened for legibility."
- Print elements are **locked**: red diagonal swoosh + gold pinstripe `#C7A233`, gold
  «100% natural / طبيعي» seal on the LEFT, red brand lockup «زيت / المشاط / للشعر»
  `#C41A1A`, the three benefit lines and «250 ml». **Never** paint «الأحمر» onto the
  label, never translate/restyle/move an element, never let a "nicer render" re-render
  the glyphs. If the model touches label text, the route was wrong — fall back to R1
  composite of the real label region, or composite the flat label asset in post.

---

## 4. Studio HDRI lighting for product (the look that reads as "shot in a render studio")

Product-viz light is not scene light — it is controlled, soft, and built to describe
*form and material*. Translate a physical studio into model prose.

**Core three-light logic (product, not portrait):**

| Light | Placement | Job | Note for our bottle |
|---|---|---|---|
| Key (softbox) | 30–45° off-axis, high | main form + one clean wall highlight | large soft source = long gradient down the glass = premium |
| Fill | opposite, low intensity (key:fill ≈ 3:1 to 4:1 for luxury) | open shadow side just enough | too much fill = flat/catalogue; keep a shadow side for shape |
| Rim / kicker | ¾-back, warm | separate the vessel from background; light the oil from behind | this is the instrument that makes brown-amber oil *glow* (§3.2) |

**Gradient sweep background (the classic studio cyc):** a smooth dark-to-light vertical
or radial gradient behind the bottle — darker at edges, a soft pool of light behind/below
the product. This single cue signals "professional product studio" more than any prop.
For the flagship, warm-neutral or warm-charcoal sweep flatters the garnet oil; avoid
cool grey (fights the warm hue) unless the brand-norms brief calls for a cool editorial
look.

**HDRI vs softbox language:**

- Say **"studio HDRI environment, large soft key from upper-left, subtle warm rim from
  behind, controlled gradient sweep background"** for a clean, believable product light.
- Reserve **"single hard key, deep falloff"** for dramatic hero verticals — beautiful but
  less forgiving of any material error.
- **Reflection control:** a real product studio uses white/black flags and strip reflectors
  to draw clean vertical speculars on glass. Ask for *"vertical strip reflections on the
  glass edges, black flag on the far side for edge definition"* — this is what gives glass
  its shape.

**Named setups (pick by concept):**

1. **Clean e-com hero** — soft even HDRI, key:fill 3:1, light warm gradient sweep, one
   crisp wall highlight, soft contact shadow. Default for `packshot` and LP hero.
2. **Luxury low-key** — 5:1 ratio, warm rim doing most of the work, oil glowing from
   behind, deep background falloff. For premium video keyframes / dark editorial banners.
3. **Ingredient still-life** — softer, natural-adjacent light with a hair of practical
   warmth (as if a window + hibiscus/henna props); bridges studio-render and lifestyle.
4. **Caustic feature** — hard-ish warm key raking through the oil onto a glossy surface to
   throw a visible garnet caustic (§5); the render "wow" shot.

Every setup keeps light **motivated and consistent** with any contact/reflection (§5);
mismatched product light vs background light is an instant AI tell.

---

## 5. Caustics, contact shadows & reflections — the "it sits in the world" cues

These three passes are what a path-tracer spends its time on and what AI models most
often get wrong. Getting them right is the difference between a bottle *pasted onto* a
background and one *standing in* a scene.

- **Contact shadow (ambient occlusion):** a soft, darkening shadow where the base meets
  the surface, tightest and darkest right at the contact line, softening outward.
  - Fail: no contact shadow (floating), or a hard uniform drop-shadow with a gap (sticker
    look). The V2 anti-tell doctrine flags "floating object / mismatched shadow" hard.
  - The shadow **direction and softness must match the key light** (§4). One key from
    upper-left ⇒ one shadow to lower-right, same softness.
- **Caustics:** the bright refracted light patterns a transparent bottle + translucent
  oil throw onto the surface beneath — for garnet oil, a warm amber/red pool and focused
  hotspots near the base. This is the single most "expensive render" cue we can add, and
  it is fully ours to author (in `allowed_variation`).
  - Keep them **plausible and subtle**: a warm caustic pool that echoes the oil colour,
    one or two focused bright points, soft edges. Over-bright rainbow caustics read CGI.
  - Caustics must be **colour-consistent with the oil** — a garnet oil cannot throw a
    blue caustic. Consistency here is a physics check (`43`), not decoration.
- **Reflections:** on a glossy set surface (marble, glass shelf, water film) the bottle
  casts a **vertically-flipped, foreshortened, fading** reflection — brightest at the
  contact line, fading with distance, softened by any surface roughness.
  - Fail: a perfect mirror-clone reflection (too sharp/too complete), or a reflection lit
    differently from the object. Reflection must show the *same* label side and *same*
    lighting as the bottle.
  - The reflection is also a **fidelity surface**: if it shows a label that differs from
    the real one, the composite drifted — reject.

**Consistency contract:** key light, contact shadow, caustic and reflection are one
lighting solution. If any two disagree in direction, softness or colour temperature, the
brain reads "composite / AI" instantly, even when it cannot say why.

---

## 6. Turntable · 360° · animated hero rotation — the honest caveat

A rotating "3D render" banner or a turntable hero is a frequent ask. Be honest about what
one front reference can and cannot do — this is a §7bis rule, not a preference.

- **Full 360° / true turntable needs MULTIPLE real angles** in `products/<slug>/
  references/` (front, back, cap, label-macro, profile). With those, R3 can animate a
  believable rotation because every face is grounded in a real photo.
- **With only a front photo (the flagship's current state):** a full spin **will drift** —
  the model *invents* the back and sides, mangling the label and shape. Do NOT do it.
  Restrict to one of:
  1. **Label-face-on micro-move (R3):** a slow ~5–12° oscillation / gentle parallax that
     never turns the label away from camera; light, caustics and rim animate around a
     product that stays face-on. Reads as a premium "living packshot," stays fidelity-safe.
  2. **Camera-orbit illusion, product static:** animate the *background/light* orbiting a
     locked front bottle (relight sweep, moving caustic, drifting rim) — motion without
     rotating the vessel.
  3. **Parallax dolly-in / rack focus** on the static packshot — depth without rotation.
- **Always FLAG the unlock:** if the brief wants a real 360°, the packshot director must
  emit a note: *"Full rotation requires back/profile/cap reference photos — supply them
  to unlock; until then limited to label-face-on micro-move."* Never silently fake it.

**Micro-move spec (safe default):** 3–5s seamless loop, ≤12° yaw oscillation, ease-in/out,
label never crosses the silhouette, rim + caustic animate, seed + reference locked across
frames for identity stability. Cheap/fast video tier per the credit policy — never an 8s
hero render for a loop.

---

## 7. Alpha packshots & clean cutouts (transparent-background deliverable)

Banners, LP modules and 3-pack composites need the product on **transparent alpha**, not
baked onto a background. Craft rules for a clean, composite-ready packshot:

- **Source the alpha from the real cutout,** not a re-generated bottle. The magenta-chroma
  reference (`references/02-front-chroma-magenta.png`) exists precisely so R1 can key a
  clean edge. Key on magenta, refine matte, output straight or premultiplied alpha as the
  compositor needs.
- **Edge quality is everything:** glass silhouettes have a bright Fresnel rim (§3.1) — the
  matte must keep a hair of that rim, not chop it flat. A hard aliased cut or a magenta
  fringe on a glass edge is the classic bad-cutout tell.
- **Keep a bakeable contact shadow / ground occlusion as a SEPARATE layer** (or none), so
  the compositor can place the bottle on any surface with a matching shadow. Never bake a
  drop-shadow into the alpha of the bottle itself.
- **3-pack / grouping:** a multi-pack is **three identical canonical bottles** (per the
  lock) — duplicate the *same* real cutout, re-light each consistently, vary only depth/
  overlap. Never generate a "variant" label for the second and third bottle.
- **Resolution:** author the master large, deliver the alpha at master res, and let
  **38-upscale-finisher** handle any further scale — do not re-generate for size.
- **Colour management:** deliver in the master's colour space; the garnet oil must survive
  the round-trip within ΔE ≤ 3. Check the oil hue *after* alpha export, not before.

---

## 8. Translating render terms into model prose (phrasing formulas per route)

**26-kie-prompt-builder** cannot send "OctaneRender, IOR 1.46, GI 512 samples" — the model
does not run a renderer. Convert gear/renderer nouns into **descriptive optical prose**
plus the correct route mechanics.

**R1 (bg-replace + relight) formula:**

> `[real product cutout as base image]` + *edit instruction:* "Place this exact bottle,
> unchanged, into a studio product scene. Studio HDRI lighting: large soft key from upper
> left, warm rim from behind lighting the oil so it glows, controlled warm gradient sweep
> background. Clear polished glass with bright Fresnel edge speculars; translucent
> brown-amber oil (never ruby), lit from behind, visible meniscus and headspace. Soft
> contact shadow to lower-right, a subtle warm caustic pool echoing the oil colour, a
> faint fading reflection on the surface. Do not alter the bottle, cap, label, or any
> printed text." + negatives (§10).

**R2 (reference edit / re-pose) formula:** identical material/light prose, but the base is
the canonical white reference and the instruction re-angles the vessel while **explicitly
preserving the label region**: "…re-light and re-angle slightly, keep the label, cap, and
all printed Arabic exactly as in the reference." Only on a reference-capable model.

**R3 (image-to-video) formula:** animate an approved keyframe; motion prose describes the
*world and light* moving (rim sweep, caustic drift, ≤12° micro-yaw), never "rotate the
bottle 360°." Seed + reference locked.

**Term-translation cheatsheet:**

| Renderer term | Model prose |
|---|---|
| High IOR / refraction | "background subtly refracted and offset through the round glass" |
| Fresnel | "bright specular line along the vertical glass edges" |
| Volume absorption / Beer–Lambert | "oil glows amber where thin at the neck, deepens to brown-red in the mass" |
| SSS on cap | "faint waxy translucency at the white cap edges" |
| HDRI key | "large soft studio key from upper-left" |
| Caustics | "warm garnet caustic pool and focused highlights on the surface below" |
| AO / contact shadow | "soft grounded contact shadow where the base meets the surface" |
| Gradient cyc | "smooth dark-to-light studio gradient background" |
| Turntable | (avoid) → "slow label-face-on micro-move, world lighting animating around it" |

Keep prose **gear-free and sensory** — describe the *result*, not the software. The model
paints what it can *see* in words, not what a render node computes.

---

## 9. Reference-lock discipline — how render craft must NOT drift the bottle

Render polish is the most seductive way to *accidentally* violate fidelity, because a
"better looking" bottle feels like progress. It is not. The lock is the ground truth; the
render serves it.

**Non-negotiable, from the active lock's `do_not_alter`:**

- Cylindrical tall/slim vessel (`2.35` height:diameter) — **never** square, squat or
  faceted "to look more premium."
- White **vertically**-ribbed screw cap — ribs' direction and pitch are locked.
- Clear PET wall with visible fill-line and headspace air-gap — do not top-up the fill to
  look fuller, do not opaque the wall.
- Oil = warm reddish-brown amber — **never** re-graded to ruby/garnet for "richness."
- Label: white bg, red swoosh + gold pinstripe, gold seal on the **left**, red «زيت /
  المشاط / للشعر» lockup with **no «الأحمر»**, the three benefit lines + «250 ml», exact
  printed glyphs, exact size hierarchy and positions.

**Render-specific traps to refuse:**

- "Cleaner CGI plastic look" that turns the glass opaque or the cap into gloss toy plastic.
- Relight that blows out or recolours the label (hotspot across the type, warm cast
  shifting «المشاط» off its locked red).
- A reflection or caustic that shows a *different* label side/text than the front.
- Re-rendering the vessel in R2 when R1 composite would have kept it pixel-true — always
  prefer the higher-fidelity route that satisfies the shot.
- Fuller fill / removed air-gap / removed neck band — all silhouette or spec changes.

**The gate:** `41-product-fidelity-checker` scores every render against the lock;
`ship_threshold` 95, `color_tolerance_deltaE` 3, and any hard-fail item (wrong vessel
shape, altered label / «الأحمر» painted on, seal moved off the left, ruby oil) is an
instant reject regardless of how "good" the render looks. Beauty never buys a fidelity
exception.

---

## 10. Failure modes & fixes — the CGI/AI tell table

`46-ai-tell-detector` rejects renders that read as "CGI, not filmed." The premium bar is
photoreal *studio product photography*, not obvious 3D. Common tells and the fix:

| Tell (reject) | Cause | Fix |
|---|---|---|
| Plastic/opaque glass | no transmission / no refraction | §3.1 — high transmission, Fresnel edges, refracted background |
| Bottle floats / gap under it | missing/hard drop-shadow | §5 — soft grounded contact shadow matching key direction |
| Ruby/garnet oil | wrong absorption / over-saturation | §3.2 — brown-amber, backlit glow not recolour; hard-fail |
| Flat sticker label | no wrap curvature, hotspot on type | §3.4 — matte substrate, curved wrap, even soft falloff |
| Toy-gloss or clay cap | roughness wrong, no SSS | §3.3 — semi-matte, faint SSS, knurling micro-shadow |
| Rainbow fringing / dispersion | dispersion on | §3.1 — dispersion off/minimal |
| Mirror-perfect reflection | too sharp/complete, wrong light | §5 — foreshortened, fading, same lighting & label |
| Blue/mismatched caustic | caustic colour ≠ oil | §5 — caustic echoes oil hue, subtle |
| Over-clean, dead render | no grain, no micro-imperfection, no dust | add subtle grain, a fingerprint/dust hint per undetectable-realism doctrine |
| Drifted shape/label on rotation | full 360° from one angle | §6 — micro-move only; flag for more reference angles |
| Waxy/CGI highlight on everything | uniform over-gloss | vary roughness per material; matte label, semi-matte cap, polished glass |
| Two light directions | product vs background lit differently | §4/§5 — one motivated lighting solution across all passes |

**Doctrine reminder (from `undetectable-realism-doctrine.md`):** photoreal ≠ perfect. A
studio product shot still has grain, a hair of dust, one asymmetric highlight, real
optical falloff. A flawless, clinically clean render *is* the tell. Add the right small
imperfections; remove the CGI artifacts.

---

## 11. Pre-flight checklist (run before spending a final-tier credit on a packshot)

- [ ] Route chosen and product region is reference-conditioned (R1 default; R2/R3 only
      with justification and a reference-capable model). No t2i on the product.
- [ ] Base is the **real cutout** (R1) or canonical reference (R2), not an `/assets`
      render (all drifted — forbidden as identity source).
- [ ] Glass: transmission + Fresnel edges + refracted background specified; not opaque.
- [ ] Oil: brown-amber gradient, backlit glow, meniscus + headspace kept; NOT ruby.
- [ ] Cap: white semi-matte, vertical knurling, neck band present.
- [ ] Label: untouched — no restyle, no «الأحمر», seal on left, exact glyphs; ad Arabic
      reserved for POST (37-typography-compositor), not drawn in-model.
- [ ] Lighting: one motivated studio solution (key/fill/rim + gradient sweep); ratio fits
      the concept (3:1 e-com, 5:1 luxury).
- [ ] Contact shadow, caustic and reflection all present, subtle, and colour/direction-
      consistent with the key light.
- [ ] Rotation/turntable: micro-move only if single front reference; unlock flagged if a
      full 360° was requested.
- [ ] Alpha packshot (if needed) keyed from the real cutout, clean glass-rim matte,
      contact shadow on a separate layer.
- [ ] Grain / micro-imperfection added; no clinical over-clean CGI look.
- [ ] One master authored; ratios are crops, resolution comes from upscale — no re-gen.
- [ ] Passes `41-product-fidelity-checker` (≥95, ΔE ≤ 3, no hard-fail) and reads as
      *filmed studio product*, not obvious CGI, for `46-ai-tell-detector`.

---

*Related knowledge:* `hair-oil-realism.md` (liquid/glass/oil physics underneath the
shaders), `lighting-recipes.md` (studio-light vocabulary), `undetectable-realism-
doctrine.md` (anti-tell), `static-ad-craft.md` & `banner-systems.md` (where packshots are
placed), `kie-credit-optimization.md` (image-first, one-master, upscale-don't-regenerate).
*Fidelity truth is always the active* `products/<slug>/product-lock.yaml` *— this doc is
product-agnostic; the flagship values are quoted only as worked examples.*
