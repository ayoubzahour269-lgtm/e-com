# Lighting Recipes — Named Setups, Prompt Phrasing & Contrast/Mood Craft
### (Soft Window Key · Beauty Dish/Softbox · Rim & Gold Kicker · Negative Fill · Practicals · Premium Bathroom Light · Luxury Bedroom Light · Golden-Hour Window — mapped to UNBROKEN THREAD)

> **Knowledge base article — reference material, not a skill.** Dense, scannable,
> checklist-heavy lighting-craft reference for Stage 8's **13-lighting-director** and its
> Stage 8 siblings (**12-camera-director**, **14-motion-director**, **15-transition-designer**,
> **16-hair-realism-director**, **17-human-realism-director**, **18-environment-realism-director**,
> **19-oil-product-realism-director**), Stage 7's co-authors (**09-beauty-commercial-director**,
> **10-luxury-commercial-director**), and Stage 11 (**25-prompt-optimizer**,
> **26-kie-prompt-builder**). Grounded in `STUDIO-BIBLE.md` §3 (palette, fonts, claims), §4
> (product + hero-environment lock — **soft directional window light with long gentle
> shadows** is the hero light DNA), §5 (culture/platform — 9:16, safe margins, sound-off
> legible), §6 (the flagship **UNBROKEN THREAD** — §6.1 beat sheet, §6.3 overlays, §6.5 sound,
> §6.6 negatives), §7 (quality gates). **When this document and the Bible disagree, the Bible
> wins.** Nothing here invents a product claim, a lock detail, or new Arabic copy — every
> colour-temperature band, contrast ratio, and beat mapping cited below as "the flagship's" is
> quoted from **13-lighting-director**'s own locked Outputs 3.2–3.8, never re-derived; this
> document teaches the **craft physics and prompt phrasing** behind those numbers and extends
> them with the reusable, named recipe vocabulary a director reaches for on any future beat.

**How this document relates to `13-lighting-director`:** that skill is the **authoring
skill** — it reads this vocabulary (among other inputs) and produces `lighting.md`, the
locked per-beat lighting brief for the flagship. *This* document is the **craft reference
underneath it** — the physics of hard vs. soft light, the named real-world lighting
techniques each recipe descends from, and the exact gear-free descriptive-prose phrasing
formulas that turn a recipe into a clause `26-kie-prompt-builder` can drop into the ONE Kie
prompt. Use `13-lighting-director`'s `lighting.md` for *what this ad's light already is*;
use this document for *why each recipe works, how to phrase it, and how to build the next
one correctly*. Cross-ref `cinematography-language.md` §4 (composition — light must respect
negative space and frame-within-frame) and `luxury-beauty-ad-language.md` §8 (shared agency
glossary — beauty light, kicker, negative fill, practical, rim light are defined there at the
one-line level; this document is the full craft treatment).

---

## 1. Scope & where this sits in the pipeline

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 8 | `13-lighting-director` | The full craft grounding (§3) behind its own seven-recipe library (Output 3.2); the contrast-ratio ladder (§4) and colour-temperature/golden-hour physics (§5) behind Outputs 3.4–3.5; the phrasing formula (§7) that seeds its per-beat lighting-card phrasing (Output 3.7) |
| 8 | `12-camera-director` | The direction-relative-to-camera vocabulary (§3) so blocking never crosses the key or throws a rig shadow into frame |
| 8 | `14-motion-director` | The light-as-transition timing hooks named in §3.3 and §6, timed against the §6.5 resolving swell |
| 8 | `15-transition-designer` | The rim/glint/bloom mechanics named in §3.3 and §3.8, behind the T1–T4 engines |
| 8 | `16-hair-realism-director` / `17-human-realism-director` / `18-environment-realism-director` / `19-oil-product-realism-director` | The per-recipe mood, kill-list, and set-motivation vocabulary (§3, §8) for hair sheen, skin luminosity, set dressing, and liquid exposure |
| 7/9 | `09-beauty-commercial-director`, `10-luxury-commercial-director` | The beauty-dish/softbox craft (§3.2) and restraint register (§8) that keep macro-beauty inside the studio's one-hero-glow discipline |
| 11 | `25-prompt-optimizer`, `26-kie-prompt-builder` | The **phrasing bank** (§3, §6) and **assembly formula** (§7) — gear-free descriptive prose ready to compile into the single natural-language paragraph a Veo-3-class model reads |
| 12 | `27-quality-checker`, `28-creative-scoring-engine` | The kill/anti-tell vocabulary (§3, §8) as the naming convention for **Realism** and **Luxury feel** gate findings |

**Authority note:** every colour-temperature band, contrast ratio, and beat assignment cited
below as "the flagship's" value is quoted from `13-lighting-director` Outputs 3.2–3.7 — this
document does not set those numbers, it teaches the physics and vocabulary they are built from
and shows how that vocabulary becomes prompt prose, exactly as `cinematography-language.md`
does one layer up for camera and lens.

**The gear-free discipline (inherited, not re-argued here):** `kie_veo3`'s prompt dialect is a
natural-language paragraph, rewarded by descriptive scene language, not camera-department
jargon (`cinematography-language.md` §9; `26-kie-prompt-builder` Rule R2). Every phrasing-bank
entry in this document is written as **descriptive prose describing the effect of light**, never
as gear specification ("softbox at 45°, 400 W") or a brand name-drop. Where a spec table below
names a real technique or instrument for craft grounding, treat it as the *reasoning layer*,
never as literal prompt text — the prose lines are what ship.

---

## 2. Quality-of-light fundamentals

The physics every named recipe in §3 is built from. A director who understands these four
factors can correctly improvise a new beat's light without inventing a new recipe name.

| Factor | The physics | What it controls |
|---|---|---|
| **Source size relative to subject** | A light source's apparent angular size, as seen from the subject, determines softness — not the physical size of the fixture alone. A small source held far away and a large source held close can both be "hard" or "soft" | **Hard vs. soft quality.** A large-relative-to-subject source (a window, a bounced softbox) produces a soft, gradual transfer from light to shadow — the studio's default. A small-relative-to-subject source (a bare point) produces a hard, sharp-edged shadow — never used on skin/hair in this studio |
| **Distance & the inverse-square law** | Light intensity falls off with the square of the distance from the source (`intensity ∝ 1 ÷ distance²`) | **Falloff.** A source placed close to the subject dims rapidly across depth (dramatic, fast falloff — good for an intimate macro pool); a source placed far away (the "golden-hour window" register) dims gradually across the whole set (even, filmic falloff — good for the hero set) |
| **Specular vs. diffuse reflection** | A specular surface (glass, oil, wet skin, glossy hair) reflects a source as a small, sharp highlight; a diffuse surface (matte skin, matte cap, stone) scatters light broadly with no sharp highlight | **What each surface in this ad shows.** The garnet oil and eyes read specular (one clean catchlight/suspended highlight, never several competing ones); the matte white ribbed cap and the travertine podium read diffuse (soft, flat return, never a hot gloss point) |
| **Wrap** | How far around a curved subject (a cheek, a shoulder, a bottle) a soft source's light continues before falling into shadow | **The "expensive" tell.** A large, close, soft source wraps generously around a face or a bottle's curve, producing the gradual light-to-shadow transfer that reads as premium; a small/hard/far source wraps almost not at all, producing an abrupt cutoff that reads cheap or CGI |

**The governing rule this studio never breaks (13 Rule R2):** exactly **one** dominant source
(the key) per environment, at most **one** kicker, negative fill on the shadow side, and
motivated practicals as accent. Every recipe in §3 below is a role inside that one-key
discipline, never a second competing key.

---

## 3. The named lighting-recipe library — full craft treatment

Eight recipes: the studio's seven engineered instruments (`13-lighting-director` Output 3.2)
plus the natural-phenomenon reference every warm recipe in this ad ultimately emulates
(**golden-hour window**, §3.8). Each entry gives the craft definition, the spec, the
prompt-phrasing bank, and the kill list.

### 3.1 Soft window key *(the §4 hero-environment DNA)*

**Craft definition:** a single large, soft, directional source standing in for daylight through
a window or arch opening — the studio's default key and the literal Bible §4 hero light DNA:
*"soft directional window light with long gentle shadows."* Softness comes from the window
opening (and any diffusion across it) acting as one large source per §2's size-relative-to-
subject rule; direction comes from the sun/sky beyond it never being perfectly overhead.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Large, very soft, directional; long gentle shadows | Frame-left ¾ front, high-ish window angle | Warm daylight **~4300–4800 K** | 3:1 (hero set) up to 4:1 (Hook macro) | Warm, elegant, filmic, calm confidence | HOOK (0.0–1.2 s, with deep negative fill); DISCOVERY (1.6–3.0 s); OFFER + CTA (7.0–8.0 s) |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Hero-set establishing light | *"soft directional window light spills in from frame-left, casting long, gentle shadows across the warm stone"* |
| Macro/comb beat (Hook) | *"a single soft window light falls across the ivory comb, the rest of the frame melting into warm cream shadow"* |
| Product reveal (Discovery) | *"warm window light settles over the bottle as the hand lifts it, one soft highlight tracing the glass"* |
| Offer orbit | *"the same warm window light holds steady as the camera orbits, the bottles catching one clean edge of daylight"* |

**Kill / anti-tell:** flat multi-source even illumination; a second competing key; shadowless
faces or bottles; any cool/blue cast in the key (§6.6 core; 13 Output 3.8).

### 3.2 Beauty dish / softbox

**Craft definition:** two related large-source modifiers used for the face. A **softbox** is a
diffused rectangular or octagonal panel producing a very broad, even wraparound quality with
minimal specular character — the gentlest option. A **beauty dish** is a mid-size parabolic
reflector with a center deflector plate that bounces light back onto the dish before it reaches
the subject, producing slightly more contrast and a livelier catchlight/sparkle than a softbox
while remaining a soft, flattering source — the classic glamour-portrait instrument, typically
flown above and in front of the face (a **butterfly/Paramount** placement, §4) to cast a small,
symmetric shadow beneath the nose. The studio's shipped token is **beauty softbox**
(13 Output 3.2); beauty dish is a documented craft-adjacent variant for when a director wants a
touch more sparkle in the eye without crossing the one-key discipline — never introduced as a
second light.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Soft, wrapping, near-frontal; one clean catchlight (dish variant: slightly livelier sparkle) | Frontal, slightly above eyeline (butterfly/loop placement) | Warm **~4000–4500 K** | **2.5:1** | Luminous, real skin, lit-from-within | TRANSFORMATION (5.2–6.6 s) — the keeper portrait |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Softbox default (keeper) | *"a broad, wrapping key of warm light haloes her face as she turns, one clean soft catchlight in her eyes"* |
| Beauty-dish variant (extra sparkle) | *"warm light gathers close over her face, catching a small bright sparkle in her eyes as she meets camera"* |
| Combined with the gold kicker | *"soft frontal light wraps her skin while a warm gold edge separates her hair from the shadow behind"* |

**Kill / anti-tell:** dead or multiple catchlights; poreless "beauty-filter" doll skin; a hard
bare-bulb hot-spot instead of a broad wrap (§6.6 `plastic/waxy skin`; 13 Output 3.8).

### 3.3 Rim & gold kicker

**Craft definition:** a **kicker** (or rim/edge light) strikes the subject from behind or the
side, opposite the key, catching the edge of hair, a shoulder, or a bottle's silhouette and
separating it from the background — the classic three-point-lighting "separation" instrument.
In this studio it is always warm gold, and it does double duty: it builds the **shine-ribbon**
(the moving specular band that proves the shine claim on hair, §4 hero-beat vocabulary) and, at
its marquee moment, it *is* the light-as-transition engine — the kicker that travels the hair
and blooms into the T4 flare.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Crisp-but-soft edge light; the only "hot" note in the frame | Three-quarter **back**, opposite the key | Warm gold **~3000–3200 K** | Rim-dominant (not a fill ratio) | Separation, warmth, the "expensive edge" | T1 glint (1.2–1.6 s); T3 hair-sweep (4.8–5.2 s); TRANSFORMATION (5.2–6.6 s); T4 bloom (6.6–7.0 s); OFFER glass edge (7.0–8.0 s) |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Hair separation (Transformation) | *"a warm gold light rims the edge of her hair, separating it softly from the shadow behind her"* |
| Motion-lit sweep (T3) | *"as the hair sweeps across the lens it catches a warm gold edge, a glossy lit line riding the motion"* |
| Product edge (Offer) | *"a thin warm gold edge traces the curve of the glass as the camera orbits, defining the bottle against the soft field"* |
| The marquee bloom (T4) | *"the gold light traveling her hair gathers and blooms into a soft, warm flare that fills the frame"* |

**Kill / anti-tell:** a hard star-flare or anamorphic streak; more than one flare in the ad; an
unmotivated glint with no traceable source (§6.6 core; 13 Output 3.6 "kill" column).

### 3.4 Negative fill

**Craft definition:** a **subtractive** technique — a dark surface (a black flag, floppy, or
duvetyne-covered card) placed on the shadow side to *absorb* ambient bounce that would otherwise
softly fill the shadow, deepening it back into the "long gentle shadow" the hero DNA calls for.
Negative fill adds no light of its own; it removes light that would otherwise be there, which is
why it is the single most effective tool against the flat, shadowless "AI sheen" tell — a face or
bottle lit with a soft key but no negative fill drifts toward an artificially even, dimensionless
look, because ambient bounce off floors, walls, and the frame's own bright field fills in shadow
detail that should stay dark.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Subtractive — absence of light on the shadow side | Shadow side, opposite the key | n/a (removes light, adds no colour) | Deepens whatever ratio the key sets (2.5:1 → 4:1 across the ad) | Dimension, sculpt, the anti-flat tell | HOOK (deep negative fill); TRANSFORMATION (soft negative fill alongside the softbox) |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Macro/product (Hook) | *"the shadow side falls away into deep, soft darkness, giving the comb and the falling strand real dimension"* |
| Portrait (Transformation) | *"her shadow side falls into a gentle, natural falloff, keeping the light from wrapping her face flat"* |
| General sculpting cue | *"light and shadow trade off cleanly across the frame, nothing washed flat or evenly lit"* |

**Kill / anti-tell:** shadowless, waxy, dimensionless faces or bottles; flat multi-source even
illumination — this is the exact tell negative fill exists to defeat (§6.6 `plastic/waxy skin,
AI sheen`; 13 Output 3.1 "filmed-light truths").

### 3.5 Practicals

**Craft definition:** small, **in-frame or implied-in-frame** glowing sources — a brass lamp, an
oud-lamp, an arch lantern, a candle-warm accent — that ground a scene as a real, lived-in
interior rather than a rig-lit stage. A **practical** is any light source that appears (or is
strongly implied) to exist physically within the world of the shot, as distinct from an
off-camera rig light with no in-world source; every rig light in this studio is required to be
*motivated* by one, whether or not the practical itself is fully in frame (the classic
cinematography discipline of "motivated light," `luxury-beauty-ad-language.md` §8).

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Small, glowing, in-frame accents | Motivated within the set, background/edge | Warm **~2700–3200 K** | Accent only, never the key ratio | Grounded, lived-in, luxe interior | DISCOVERY (arch ambience); OFFER + CTA (arch practicals) |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Hero-set ambience | *"a warm brass lamp glows softly in the background, its light pooling low and golden near the arch"* |
| Depth accent | *"a small warm light glimmers deep in the frame, grounding the space without competing with the bottle"* |
| Garnet-drape motivation | *"the deep garnet drape catches a faint warm glow from a lamp just out of frame"* |

**Kill / anti-tell:** floating, sourceless glows; a light with no traceable in-world origin; any
practical colour that leaves the warm register into cool or green (§6.6 `floating objects`; 13
Output 3.5 "temperature continuity rule").

### 3.6 Premium bathroom light

**Craft definition:** a soft top-light combined with a gentle low frontal vanity fill — the
intimate, close-quarters register used for a scalp/roots/application beat. The top-light
component gives a soft, discreet specular "glisten" appropriate to a freshly-oiled strand
without reading as a harsh overhead fixture; the vanity fill keeps the lower face and hands
readable at close range.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Soft top + gentle vanity fill; a clean, discreet specular | Soft toplight + low frontal fill | Warm neutral **~3800–4300 K** | **3.5:1** | Intimate, tactile, close, sensory | RITUAL (3.4–4.8 s) |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Scalp/roots macro | *"soft overhead light falls gently across her fingertips at the roots, a faint warm glisten catching the freshly-oiled strand"* |
| Hair-glide macro | *"a low, warm vanity glow lights the section of hair as her hand glides down its length"* |
| Overall mood | *"the light stays close and intimate, warm and soft, never harsh or clinical"* |

**Kill / anti-tell:** a hard overhead fixture look (clinical, harsh); a specular that reads as a
wet/greasy sheen rather than the claimed "silky, non-greasy" finish — route the liquid's own
sheen to `19-oil-product-realism-director` (Bible §3 Claim 4; 13 Rule R4).

### 3.7 Premium / luxury bedroom light

**Craft definition:** a calm, airy combination of soft window wrap plus a warm practical accent
behind the subject — the environment for the keeper transformation beat. This recipe is the
"room" the beauty softbox and gold kicker (§3.2, §3.3) sit inside; it supplies the ambient warmth
and depth so the portrait light doesn't read as a bare studio setup floating in void.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Soft window wrap + warm practical accent; airy, calm | Window ¾ front + warm lamp accent behind | Warm **~4000–4500 K** | 2.5:1 (with the softbox key) | Calm, expensive, morning-luxe | TRANSFORMATION (5.2–6.6 s) |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Environment base | *"morning window light drifts softly through the room, a warm lamp glowing low behind her"* |
| Combined with softbox + kicker | *"the airy morning light wraps the room while a warm key softens her face and a gold edge separates her hair"* |
| Calm/luxe register | *"the space feels calm and expensive, nothing harsh, nothing rushed"* |

**Kill / anti-tell:** a bare, unmotivated portrait light with no sense of place; a cool-toned
"clinical morning" cast instead of warm daylight (§6.6 core; 13 Output 3.5 "temperature
continuity rule").

### 3.8 Golden-hour window

**Craft definition:** the **natural-light phenomenon** this studio's engineered "soft window
key" (§3.1) exists to emulate, given its own full craft treatment here because "golden hour" is
also a widely recognized cinematic register worth invoking directly in prompt language. Physically:
when the sun sits low near the horizon (a shallow solar elevation angle, roughly 5–20°), its light
travels a longer path through the atmosphere; Rayleigh scattering removes more of the shorter
(blue) wavelengths along that longer path, leaving the transmitted light warmer — the true
golden-hour sun disc runs roughly **~3000–4000 K**, warmer than midday daylight (~5600 K). The low
angle also produces long, low-raking shadows, and increased atmospheric haze near the horizon
enlarges the effective size of the source, softening shadow edges more than a high midday sun
would. **Why the studio's engineered key sits slightly higher** (~4300–4800 K, §3.1) **than true
golden hour** (~3000–4000 K): pushing all the way down to true golden-hour warmth risks the
red-tint-on-skin failure mode and softens the muted, sound-off legibility of the garnet-on-cream
overlays (13 Rule R5, R7) — the studio borrows golden hour's *quality and shadow character*
while holding colour temperature at the warm-but-controlled end of the band.

| Quality | Direction (rel. camera) | Colour temp | Contrast register | Mood | Flagship beat(s) |
|---|---|---|---|---|---|
| Large, soft, low-angle natural source; long, soft-edged shadows | Low, raking, frame-left ¾ (matches the mihrab window's implied sun angle) | True golden hour **~3000–4000 K**; studio's controlled hero key **~4300–4800 K** | 3:1 (hero set) up to 4:1 (macro) | Warm, cinematic, "shot at the golden hour" | The hero-set register underlying DISCOVERY (1.6–3.0 s) and OFFER + CTA (7.0–8.0 s); the natural-light justification for HOOK's window-lit macro |

**Prompt-phrasing bank:**

| Use case | Ready descriptive phrase |
|---|---|
| Hero-set golden-hour register | *"the low warm sun spills through the mihrab window, casting long, soft amber shadows across the stone podium"* |
| Product reveal in golden light | *"golden late-afternoon light settles over the bottle, warm and low, the shadow behind it stretching long and soft"* |
| Establishing warmth | *"the whole scene sits in warm, golden, late-day light — soft, low, and unhurried"* |

**Kill / anti-tell:** a flat midday overhead sun (short, hard shadows — the opposite register);
an artificially over-orange "gel wash" that pushes past the warm band into an unnatural cast; any
shadow that looks harsh or short rather than long and soft (§6.6 `oversaturation`; 13 Rule R5's
warm-band ceiling).

---

## 4. Contrast-ratio ladder & mood craft

Contrast ratio = key-side luminance to fill-side (shadow-side) luminance. The industry expresses
it two ways — a ratio (`4:1`) and its stop-equivalent (`log₂(ratio)`) — because "two stops of
difference" is how a cinematographer reasons about exposure while "4:1" is how a gaffer reasons
about instrument power. This studio's numbers are locked in `13-lighting-director` Output 3.4;
this table adds the named portrait-lighting patterns each register descends from, as general
craft grounding for reasoning about any new beat.

| Ratio | ≈ Stops | Named pattern it resembles | Register | Where in UNBROKEN THREAD |
|---|---|---|---|---|
| **2:1** | ~1 | **Butterfly / Paramount lighting** — key placed high and centered in front of the face, casting a small symmetric shadow under the nose; the classic glamour-portrait pattern, very soft and flattering | Softest, most flattering beauty light | Softbox base of the TRANSFORMATION portrait |
| **2.5:1** | ~1.3 | **Loop lighting** (soft variant) — key placed slightly off-axis, casting a small loop-shaped shadow beside the nose; more dimension than Butterfly while still reading as luxury-beauty-soft | Luminous beauty with just enough shape | TRANSFORMATION keeper (with the gold kicker for separation) |
| **3:1** | ~1.6 | **Loop lighting** (fuller) / open daylight-interior register | Open, warm, "expensive daylight interior" | DISCOVERY and OFFER + CTA hero-set beats |
| **3.5:1** | ~1.8 | Between Loop and **Rembrandt** — enough shadow to feel tactile without a defined triangle | Intimate, tactile, sculpted-but-soft | RITUAL scalp/roots macro |
| **4:1** | ~2 | **Soft Rembrandt-adjacent** shaping, capped before the pattern's classic dramatic triangle fully forms | Elegant drama — the deepest this ad goes | HOOK / Pain (intimate, never harsh) |
| **>4:1 (including full Rembrandt, Split lighting)** | >2 | **Rembrandt** (defined triangle, high drama) and **Split lighting** (half the face in shadow) — both are legitimate portrait techniques elsewhere, but read as harsh, theatrical, or noir-adjacent | **Forbidden in this studio** — flag any beat that drifts past 4:1 to `24-negative-prompt-builder` | *never used* |

**Mood-scaling principle:** as ratio climbs, mood shifts from *flattering/luminous* (2:1–2.5:1)
toward *elegant/dramatic* (3.5:1–4:1) — the studio uses this climb intentionally, opening on the
Hook's deepest ratio (4:1, tension/pain) and resolving through the hero-set's open 3:1 register
into the Transformation's soft 2.5:1 glow, exactly the emotional arc Bible §6 names: **Pain →
Heritage/Trust → Ritual/Self-care → Transformation → Pride → Action.** Ratio is not just
technical — it is the lighting department's contribution to that arc.

---

## 5. Colour-temperature craft & the warm-band discipline

**Reference points on the Kelvin scale** (lower K = warmer/redder, higher K = cooler/bluer —
general industry-standard figures, cited for craft grounding, not brand-specific):

| Source | Typical colour temperature |
|---|---|
| Candlelight / oud-lamp practical | ~1900–2200 K |
| Warm tungsten / household lamp | ~2700–3200 K |
| True golden-hour sun (low elevation) | ~3000–4000 K |
| Studio's engineered warm key (soft window key, §3.1) | ~4300–4800 K |
| Midday daylight | ~5600 K |
| Overcast sky | ~6500–7500 K |
| Open shade | ~7500–9000 K |

**The studio's warm-band law (13 Rule R5):** every source in this ad lives inside
**~2700–4800 K** — from the warmest practicals to the coolest hero key — and colour temperature
may drift *within* that band but **never crosses into cool** (no 5600 K+ daylight-neutral key, no
blue, no green fluorescent spill). This is a deliberate, narrower band than a real mixed-lighting
interior would show, chosen because:

1. **Palette lock (Bible §3):** garnet `#8E1B1E` and gold `#C9A227` are the only saturated notes
   the frame is allowed; a cool or neutral light source desaturates the warm cream `#FAF6F1`
   field and fights the palette.
2. **Skin-tone protection (13 Rule R5):** the garnet drape's bounce must stay a *subtle* warm
   fill, never a red tint on skin — holding the whole rig in one warm band keeps that bounce
   additive rather than a colour-correction problem.
3. **Continuity ("one sun," 13 Rule R1):** a single warm band across nine beats and four
   transitions is what makes eight seconds of separately reasoned light read as **one continuous
   take, on one set, under one motivated source** — the single biggest lever this document has
   over the Realism gate axis.

**Golden-hour drift, explained (cross-ref §3.8):** true physical golden hour drifts warmer as
the sun approaches the horizon (curving down toward ~3000 K and briefly toward candlelight
warmth at the very last minutes). The studio's soft window key intentionally does **not** chase
that full drift — it holds at the controlled ~4300–4800 K end specifically so the last-second
CTA overlay and the mid-ad Arabic overlays stay legible on a muted scroll (Bible §5 sound-off
floor; 13 Rule R7). Treat golden-hour phrasing (§3.8) as the *register* to invoke for mood and
shadow character; treat the locked ~4300–4800 K band (§3.1) as the *engineered ceiling* that
protects legibility and skin tone.

**Why this is not a theoretical concern — the two overlays it protects (Bible §6.3):** the
TRANSFORMATION beat (2.5:1, §4) must still hold enough field brightness under
**«كثافة وطول… وشعر يتكلّم عنكِ»** (*kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki*, "Density and
length… hair that speaks for you") for the muted garnet-on-cream type to read; the OFFER + CTA
beat (3:1, §4) must hold the same under
**«باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني»** (*bāk 3 qanānāt — 139 riyāl badal 185 · shaḥn
majjānī*, "3-bottle pack — 139 SAR instead of 185 · Free shipping"). A golden-hour key pushed too
warm and too low-contrast drops exactly the field brightness these two lines need — the reason
§3.8's engineered ceiling exists is these two overlays, not an abstract rule.

---

## 6. Per-beat compiled phrasing bridge

The single table that ties every named recipe (§3) to its exact flagship beat, contrast register
(§4), and a ready descriptive phrase — the same information `13-lighting-director` Output 3.7
carries as a lighting card, expressed here as compiled prompt language for `26-kie-prompt-
builder` to draw on directly.

| Beat (Bible §6.1) | t (s) | Recipe(s) (§3) | Ratio (§4) | Compiled phrase |
|---|---|---|---|---|
| **HOOK / Pain** | 0.0–1.2 | Soft window key + negative fill (§3.1, §3.4) | 4:1 | *"a single soft window light falls across the ivory comb, the shadow side melting into deep, gentle darkness"* |
| *T1 drop↔strand* | 1.2–1.6 | Rim & gold kicker, glint (§3.3) | → filling garnet | *"a warm gold glint rides the ripple as the drop lands, connecting strand to oil in one soft flash of light"* |
| **DISCOVERY / Trust** | 1.6–3.0 | Golden-hour window + soft window key + practicals (§3.8, §3.1, §3.5) | 3:1 | *"warm golden light spills through the arch as her hand lifts the bottle, a brass lamp glowing softly behind"* |
| *T2 dive into pour* | 3.0–3.4 | Rim & gold kicker (backlit, §3.3) | high-key gold | *"the screen fills with translucent garnet oil, a warm gold sparkle suspended inside it as it catches the light"* |
| **RITUAL / Sensory** | 3.4–4.8 | Premium bathroom light (§3.6) | 3.5:1 | *"soft overhead light falls gently over her fingertips at the roots, a faint warm glisten on the freshly-oiled strand"* |
| *T3 hair-sweep wipe* | 4.8–5.2 | Rim & gold kicker (§3.3) | rim-dominant | *"the sweeping hair catches a warm gold edge as it crosses the lens, a glossy lit line riding the motion"* |
| **TRANSFORMATION** | 5.2–6.6 | Premium/luxury bedroom light + beauty softbox + gold kicker + negative fill (§3.7, §3.2, §3.3, §3.4) | 2.5:1 | *"morning light wraps the room as she turns, a broad soft key haloing her face, a warm gold edge separating her hair from the shadow"* |
| *T4 light-bloom recede* | 6.6–7.0 | Rim & gold kicker → bloom (§3.3) | bloom, no halo | *"the gold light traveling her hair gathers and blooms into a soft warm flare, then recedes gently onto the bottle"* |
| **OFFER + CTA** | 7.0–8.0 | Golden-hour window + soft window key + rim + practicals (§3.8, §3.1, §3.3, §3.5) | 3:1 | *"the same warm golden light holds steady as the camera orbits the bottle, a thin gold edge tracing the glass, a lamp glowing softly behind"* |

---

## 7. Phrasing formula & assembly pattern

**The sentence-formula for one beat's light (assemble in this order, then smooth into prose):**

1. **Name the register, not the gear** — "soft window light," "warm golden light," "a broad soft
   key," never "softbox," "beauty dish," "kicker" as a bare noun in the shipped sentence (those
   are §3's *reasoning* names, not prompt tokens).
2. **State direction only when load-bearing** — "from frame-left," "behind her," "spilling
   through the arch" — stated when it disambiguates the shot, never as jargon.
3. **State the effect, not the instrument** — describe what the light *does* to the subject
   ("casting long, gentle shadows," "a faint warm glisten," "one clean catchlight"), never the
   rig that produces it.
4. **Name the mood word** — warm, soft, intimate, luminous, golden, calm — one or two adjectives
   that carry the beat's register from §4's ladder.
5. **Close on continuity, if it's a transition beat** — a clause connecting to what came before
   ("as the drop lands," "as she turns") so the light reads as one continuous event, not a cut.

**Worked example (TRANSFORMATION, assembled from the formula above):**
> *"…morning light drifts softly through the room as she turns toward camera; a broad, warm key
> wraps her face with one clean catchlight in her eyes, while a warm gold edge separates her hair
> from the soft shadow behind her, the light traveling with her as the shine ribbon rides the
> length of her hair."*

This mirrors the studio's own compiled-language discipline (`cinematography-language.md` §9) —
size/subject/action from the camera side, light quality and effect from this document's side,
fused into one sentence, never a jargon list.

**Anti-patterns (never write these into the compiled paragraph):**

| Anti-pattern | Why it fails | Correct alternative |
|---|---|---|
| Bare gear tokens (*"beauty dish, 45°, warm gel"*) | `kie_veo3`'s dialect rewards descriptive scene language, not lighting-department shorthand | Translate to effect: *"a broad, wrapping key haloes her face"* |
| Kelvin numbers inside the prose (*"lit at 4300 K"*) | A language-conditioned video model has no numeric colour-temperature training signal | Translate to a warmth word: *"warm daylight," "golden light"* |
| Naming the ratio (*"a 3:1 contrast ratio"*) | Same problem — a technical spec, not a scene description | Describe the shadow itself: *"long, gentle shadows," "soft, deep shadow on one side"* |
| Negative-phrased positives (*"a shadow that isn't fake or detached"*) | Seeds the flaw it tries to negate; that job belongs to the dedicated negative-prompt field | State only what should exist; route the flaw-avoidance clause to `24-negative-prompt-builder` |
| Stacking two light "looks" in one clause | Fractures the one-key, one-environment discipline (§3 fundamentals) | One coherent light description per beat, varying only the accent named |

---

## 8. Do / Don't table

| DO (this document's craft) | DON'T (the generic/AI-tell opposite) | Flagship evidence |
|---|---|---|
| One large, soft, motivated key per environment (§2, §3.1) | Flat, multi-source, shadowless "beauty-filter" light | Soft window key across HOOK/DISCOVERY/OFFER, one dominant frame-left source |
| Negative fill sculpting real shadow (§3.4) | Ambient bounce filling every shadow into flatness | Deep negative fill at HOOK; gentle negative fill at TRANSFORMATION |
| A single warm gold kicker doing double duty (rim + transition, §3.3) | Multiple competing rims/flares | One kicker, evolving into the one T4 bloom, never a second flare |
| Warm, in-palette practicals with a visible or implied source (§3.5) | Floating, sourceless glows | Brass/oud-lamp practicals at DISCOVERY and OFFER |
| Contrast held inside 2:1→4:1, climbing and resolving with the emotional arc (§4) | A flat ratio throughout, or a beat that spikes past 4:1 into theatrical drama | HOOK 4:1 → DISCOVERY 3:1 → RITUAL 3.5:1 → TRANSFORMATION 2.5:1 → OFFER 3:1 |
| One warm colour-temperature band, ~2700–4800 K, never crossing cool (§5) | Mixed cool/warm sources; a neutral-daylight or blue-tinted key | Every recipe in §3 sits inside the band |
| Golden-hour *quality* (long soft shadows, warm register) borrowed for mood, held at a controlled K for legibility (§3.8, §5) | Full uncontrolled golden-hour drift that tints skin red or dims overlay contrast | The studio's ~4300–4800 K hero key vs. true ~3000–4000 K golden hour |
| Descriptive, gear-free prose for every phrase (§7) | Bare technical tokens, Kelvin numbers, ratio numbers, or brand/gear name-drops in the paragraph | The §6 compiled phrasing bridge |
| Highlights roll off, shadows lift warm, the §4 garnet stays exposure-sacred (13 Output 3.4) | Clipped highlights, crushed blacks, a garnet that blows pink or sinks brown | Backlit garnet pour, T2 (3.0–3.4 s) |

---

## 9. Glossary of gaffer & lighting vocabulary

Alphabetical; general craft knowledge, not flagship-specific invention. Cross-ref
`luxury-beauty-ad-language.md` §8 for the shared one-line agency glossary — entries here go one
level deeper into the physics or technique.

- **Beauty dish** — a mid-size parabolic reflector with a center deflector plate that bounces
  light back onto the dish before it reaches the subject; softer than a bare bulb, slightly more
  contrasty/specular than a softbox, prized for a lively catchlight (§3.2).
- **Bounce** — light redirected off a reflective surface (a card, a wall, the set itself) rather
  than aimed directly; a common source of the ambient fill negative fill exists to control.
  This studio's garnet drape produces a subtle warm bounce (§5).
- **Butterfly / Paramount lighting** — a key placed high and centered in front of the face,
  casting a small, symmetric shadow beneath the nose; the classic soft glamour-portrait pattern,
  typically ~2:1 (§4).
- **Catchlight** — a small reflected highlight visible in an eye or on glass/liquid; a realism
  and liveliness cue when traced to a real motivated source, a cheap "ring-light tell" when it
  isn't (see Ring light, below).
- **Contrast ratio** — the luminance relationship between the key (bright) side and the fill
  (shadow) side of a subject, expressed as a ratio (e.g. 3:1) or its stop-equivalent (§4).
- **Falloff** — how quickly light dims across distance or across a curved surface; governed by
  the inverse-square law for distance, and by source size for wrap (§2).
- **Fill light** — any light (or bounce) that raises the shadow side's exposure; this studio
  favors *removing* excess fill (negative fill) over adding a second fill source.
- **Flag / floppy** — an opaque panel (often black duvetyne on a frame) placed to block light or
  bounce from reaching part of a subject — the physical tool behind negative fill (§3.4).
- **Golden hour** — the period shortly after sunrise or before sunset when the sun's low
  elevation produces warm (~3000–4000 K), long-shadowed, softer-edged natural light (§3.8, §5).
- **Hard light** — light from a source that is small relative to the subject, producing a sharp,
  well-defined shadow edge; avoided on skin, hair, and the product glass in this studio (§2).
- **Inverse-square law** — the physical rule that light intensity falls off with the square of
  distance from the source (§2); governs falloff across a set.
- **Kicker** — a light striking the subject from behind or the side, opposite the key, separating
  it from the background; this studio's kicker is always warm gold (§3.3).
- **Key light** — the single dominant source establishing a beat's primary direction, quality,
  and colour temperature; this studio permits exactly one key per environment (§2, §3.1).
- **Loop lighting** — a key placed slightly off-axis from Butterfly, casting a small loop-shaped
  shadow beside the nose; more dimension than Butterfly, typically ~2.5:1–3:1 (§4).
- **Motivated light** — any light source in the frame that can be traced to a plausible in-world
  origin (a window, a lamp); the opposite of an unexplained, floating rig light (§3.5, §6.6).
- **Negative fill** — a subtractive technique: placing a dark surface to absorb ambient bounce and
  deepen a shadow, rather than adding a light (§3.4).
- **Practical** — a light source that appears, or is strongly implied, to exist physically within
  the scene (a lamp, a window, a candle), as opposed to an off-camera rig light with no in-world
  source (§3.5).
- **Rembrandt lighting** — a key placed at roughly 45° to the subject, producing a small, defined
  triangle of light on the shadow-side cheek; a higher-drama pattern, typically 4:1–8:1 — the
  studio caps just before this pattern's classic triangle fully forms (§4).
- **Rim light** — light striking a subject from behind or the side, creating a bright edge that
  separates it from the background; synonymous with kicker in this document's usage (§3.3).
- **Ring light** — a circular light mounted around the lens axis, producing a distinctive circular
  catchlight and near-shadowless frontal illumination; a recognizable amateur/social-video tell,
  never used in this studio (contrast with the single, off-axis catchlight of §3.2).
- **Soft light** — light from a source that is large relative to the subject, producing a
  gradual, soft-edged shadow transfer; the studio's default quality for nearly every recipe (§2).
- **Specular highlight** — a small, bright, mirror-like reflection of a light source on a glossy
  surface (skin, glass, liquid); one clean specular reads as controlled lighting, several
  competing speculars read as over-lit (§2).
- **Split lighting** — a key placed directly to the side, lighting exactly half the face and
  leaving the other half in full shadow; a high-drama, high-ratio pattern (well past 4:1), never
  used in this studio (§4).
- **Suspended highlight** — a point of light that appears to sit *inside* a translucent liquid's
  body rather than only on its surface, signaling depth; the garnet oil's signature highlight
  (§3.3 T2, `luxury-beauty-ad-language.md` §4).
- **Three-point lighting** — the foundational key/fill/rim structure (here: key + negative fill
  + kicker) every beat's rig is built from (§2, §3).
- **Warm band** — this studio's locked colour-temperature range, ~2700–4800 K, inside which every
  source must sit; never crossed into cool/blue (§5).
- **Wrap** — how far a soft source's light continues around a curved surface before falling into
  shadow; large, close, soft sources wrap generously and read as premium (§2).

---

## 10. Quick-reference checklist

Before any beat's lighting is handed to `12-camera-director`, `16/17/18/19`, or compiled by
`26-kie-prompt-builder`, confirm:

- [ ] Exactly one dominant key is named for the beat, drawn from §3's library — never a flat,
      multi-source wash.
- [ ] If negative fill is called for, it is stated as a *subtraction* ("shadow falls away into
      deep, soft darkness"), never as a second light source.
- [ ] The kicker, if used, is warm gold, opposite the key, and — where it is a transition beat —
      its light-mechanic (glint, sweep-rim, or the T4 bloom) is named with an owner (14/15).
- [ ] Any practical named has a plausible in-world source (a lamp, a window, an arch) — never a
      floating, sourceless glow.
- [ ] The beat's contrast ratio sits inside 2:1→4:1 (§4) and is consistent with its position in
      the emotional arc (deepest at HOOK, softest at TRANSFORMATION).
- [ ] The colour temperature described stays inside the warm ~2700–4800 K band — no cool, no
      blue, no green cast, no red tint on skin from the garnet bounce.
- [ ] If golden-hour phrasing is used, it borrows the *quality* (long soft shadows, warm
      register) without drifting the described colour past the studio's controlled key band.
- [ ] The garnet oil's exposure is described so it reads translucent ruby with a suspended
      highlight — never pink (overexposed) or brown (underexposed).
- [ ] The matte white ribbed cap is described with a soft, flat return — never a hot specular
      gloss that would recolour it.
- [ ] Every overlay beat's light keeps enough separation that the muted, sound-off Arabic overlay
      would still read against its field.
- [ ] The compiled phrase describes the light's **effect**, never its **gear** — no Kelvin
      numbers, no ratio numbers, no instrument or brand names, no negative-phrased positives.
- [ ] Any Arabic line quoted for context (product name, overlay, or the gold seal wording) is
      cited from the Bible verbatim, with transliteration and English gloss on first use — never
      re-authored.
