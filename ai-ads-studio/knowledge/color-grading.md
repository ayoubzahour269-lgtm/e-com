# Color Grading — Warm Premium Palette, Skin Tone & Grade-Protected Garnet
### (Filmic print emulation · garnet/gold saturation law · contrast & tonal curve · skin rendering · mood grade-states · LUT-like descriptors & ready-to-paste prompt phrasing — mapped to UNBROKEN THREAD)

> **Knowledge base article — reference material, not a skill.** Dense, scannable,
> checklist-heavy color-craft reference for **11-cinematography-director** (who authors the
> grade intent, Output 3.6) and its in-frame partner **13-lighting-director** (who builds the
> contrast the grade expects), the four realism directors **16-hair-realism-director,
> 17-human-realism-director, 18-environment-realism-director, 19-oil-product-realism-director**
> (who render color inside their own domain under the one grade), **22-brand-guardian /
> 23-product-consistency-guard** (who verify the palette and the garnet lock), and the compilers
> **25-prompt-optimizer / 26-kie-prompt-builder** (who turn the grade vocabulary into the ONE Kie
> prompt's color language). Grounded in `STUDIO-BIBLE.md` §0 (Realism as the first priority),
> §3 (palette hex codes + fonts), §4 (product + hero-environment lock — the garnet liquid, the
> matte white cap, the label), §5 (culture/platform — sound-off legibility, safe margins), §6
> (the flagship **UNBROKEN THREAD** — §6.1 beat sheet, §6.3 overlays, §6.6 negatives), §7
> (quality gates). **When this document and the Bible disagree, the Bible wins.** Nothing here
> invents a product claim, a lock detail, a new palette value, or new Arabic copy — every grade
> figure below (contrast ratios, colour-temperature bands, the print-emulation character) is
> quoted from `11-cinematography-director` Output 3.6 and `13-lighting-director` Output 3.4/3.5,
> never re-derived; this document teaches the vocabulary those outputs are written in and shows
> how it becomes prompt prose.

**How this document relates to `cinematography-language.md` and `camera-movements.md`:** those
two documents cover the *optical* grammar — shot sizes, lenses, depth of field, and physical
camera movement. This document is the third leg of the studio's Stage 7–8 craft shelf — the
**color/grade** vocabulary — sitting one level under `11-cinematography-director`'s Output 3.6
(the grade intent) and `13-lighting-director`'s Output 3.4 (the contrast-ratio numeric spine).
Use `cinematography-language.md` and `camera-movements.md` for *how the frame is built and how
it moves*; use this document for *what color and tone the frame renders* and *how to phrase that
for a video model*. Nothing here duplicates the lens/DoF/fps material owned by those two
documents — it cross-references, never restates, their technical spine.

---

## 1. Scope & where this sits in the pipeline

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 7 | `11-cinematography-director` | The palette-saturation hierarchy and grade-state vocabulary (§3, §7) it writes into its Output 3.6 grade-intent block — the DP's colour brief for the whole take |
| 8 | `13-lighting-director` | The contrast-ratio numeric spine (§4) it partners against when shaping in-frame light — 13 *builds* the contrast this document's grade *expects* |
| 8 | `16-hair-realism-director` | The gold-shine-ribbon saturation law (§3, §5) — how the kicker's warm gold renders as a jewel note under a restrained grade, never a plastic sheen |
| 8 | `17-human-realism-director` | The skin-tone rendering law (§5) — warm, natural, subsurface warmth, no plastic "beauty-filter" cast |
| 8 | `18-environment-realism-director` | The palette hierarchy (§3) — which hero-set elements (cream arch, garnet drape, hibiscus) stay a jewel note vs desaturate warm into the ambient field |
| 8 | `19-oil-product-realism-director` | The garnet grade-protection law (§6) — the exact failure modes (orange/brown/pink drift) and how exposure and grade jointly guard the translucent ruby |
| 10 | `22-brand-guardian` / `23-product-consistency-guard` | The palette-lock hex table (§3) and the garnet protection law (§6) as a verification checklist against the render |
| 11 | `25-prompt-optimizer` / `26-kie-prompt-builder` | The phrasing-translation table (§8) and the five ready-to-paste mood grade-states (§7) — the exact descriptive prose that ships in the compiled paragraph |
| 12 | `27-quality-checker` / `28-creative-scoring-engine` | The Do/Don't gate (§10) and the consolidated negatives (§11) as the naming convention for **Realism** and **Luxury feel** findings |

**Authority note:** every contrast ratio, colour-temperature band, and grade descriptor cited
below as "the flagship's" value is quoted from `11-cinematography-director` Output 3.6/3.7 and
`13-lighting-director` Output 3.4/3.5 — this document does not set those numbers, it teaches the
vocabulary they are written in and shows how that vocabulary becomes prompt prose.

---

## 2. The grading philosophy — one grade, warm filmic, restrained

**The north star (11's thesis, cited verbatim in intent):** *shoot it like a filmed luxury
beauty spot, not a rendered clip* — every optical and colour choice subtracts the "generated"
tell and adds the "footage" truth. The grade's job inside that thesis is narrow and absolute:
**warm premium, natural skin, no oversaturation** (Bible §0/§3/§6.6). Design in a filmic print
character; deliver in **Rec.709** for social (11 Output 3.6).

**The single-grade discipline (do not violate):** the studio names its flagship's colour
treatment **the Mechat Warm Print Grade** — ONE grade for the entire continuous take, exactly as
it cites ONE camera-body signature (ARRI Alexa 35). Section 7 below documents five **mood
grade-states**, but they are not five different LUTs stacked into one prompt — they are the one
grade's exposure/contrast/saturation-intensity inflection from beat to beat, the same way
`13-lighting-director` varies contrast ratio (4:1 → 3:1 → 2.5:1 → 3:1) inside one warm,
frame-left-¾ lighting environment. Citing more than one named grade as a live prompt token
fractures the one-look coherence rule and is a Failure Condition (cross-ref
`11-cinematography-director` Rule R2).

**Three reconciliations the grade enforces across the whole take:**

1. **Restraint ↔ richness** — one warm print character carries five moods through contrast and
   exposure alone, never through competing colour treatments (§7).
2. **Grade ↔ product-lock** — the grade flatters everything it touches but **never** shifts the
   translucent garnet liquid (no orange/brown/pink), glosses the matte white ribbed cap, or blows
   the label/gold seal to illegibility (Bible §4; route to `19-oil-product-realism-director` /
   `23-product-consistency-guard`).
3. **Cinematic ↔ modest & legible** — the grade is luxe and filmic but stays modest (Bible §5)
   and **sound-off legible**; it never darkens or desaturates a frame so far that the El Messiri
   garnet-on-cream overlay loses contrast against the cream field.

---

## 3. The palette lock & saturation hierarchy

The Bible's brand palette (§3) is not a UI moodboard — it is the **grade's colour law**. Two of
its eight tokens are the only jewel-saturated notes the frame is allowed; the rest live
desaturated-warm as the ambient field they glow against.

| Token | Hex | Saturation role in the GRADE | Where it appears on screen | UI-only vs. frame-grade token |
|---|---|---|---|---|
| **Garnet red** | `#8E1B1E` | **Jewel-saturated** — the CTA/brand red; the label's Arabic type and the top ribbon band | Label type, CTA text, top ribbon | Frame-grade token — must render inside footage |
| **Deep garnet** | `#6E1214` | **Jewel-saturated** — the drape and the oil's darker register | Hero-set drape, garnet shadow depth in the liquid | Frame-grade token |
| **Warm cream** | `#FAF6F1` | **Desaturated-warm ambient field** — the light the whole take glows against | Arch field, overlay background field, negative space | Frame-grade token |
| **Surface white** | `#FFFFFF` | n/a to the frame — pure white never appears as a graded on-screen colour | Landing-page/UI backgrounds only | **UI-only** — not a frame-grade token |
| **Dark warm brown ink** | `#2A1A16` | **Desaturated-warm** — shadow toe / deep interior tone | Deepest shadow register, interior depth | Frame-grade token |
| **Soft brown** | `#6B564E` | **Desaturated-warm** — mid-tone skin/wood/set warmth | Skin mid-tones, wood/travertine warmth | Frame-grade token |
| **Gold** | `#C9A227` | **Jewel-saturated** — the *only* other saturated note besides garnet | Kicker highlight, gold-in-liquid sparkle, «طبيعي 100%» seal, shine-ribbon | Frame-grade token |
| **Sage green** | `#4A6741` | **Desaturated-warm** — a rare, muted accent, never a saturated jewel | Occasional botanical accent (never dominant) | Frame-grade token, minor use |

**The rule this table exists to protect (11 Output 3.6):** *garnet and gold are the only
saturated notes; cream, brown, and sage sit desaturated-warm.* Any third colour reading as
"loud" in the frame — a saturated green, a vivid blue, a candy pink — is an out-of-palette cast
and a grading failure, not a stylistic variant. The eye must land on exactly two jewels: the
**ruby oil / garnet type** and the **gold kicker / seal / sparkle** — everything else is the
warm field they glow against.

---

## 4. Contrast & tonal curve — the numeric spine

**The overall character (11 Output 3.6):** a warm filmic **print emulation** — think
Kodak-2383-like colour science — a gentle S-curve, a warm shadow toe, and a graceful highlight
rolloff. This is the opposite of clinical digital neutrality or HDR crunch.

**Contrast ratio (key-side : fill-side luminance) is the grade's in-frame partner, owned by
`13-lighting-director` (Output 3.4) and reproduced here as the grading reference:**

| Ratio | ≈ Stops | Register | Beat |
|---|---|---|---|
| **2:1** | ~1 | Softest, most flattering beauty light | Softbox base of the Transformation portrait |
| **2.5:1** | ~1.3 | Luminous beauty with just enough shape | Transformation keeper (gold kicker for separation) |
| **3:1** | ~1.6 | Open, warm, "expensive daylight interior" | Discovery and Offer hero-set beats |
| **3.5:1** | ~1.8 | Intimate, tactile, sculpted-but-soft | Ritual scalp/roots macro |
| **4:1** | ~2 | Elegant drama — the deepest this ad goes | Hook / Pain |
| **>4:1** | >2 | **Forbidden** — reads harsh, theatrical, not luxe-beauty | never |

**Highlight and shadow discipline (the "filmed, not generated" tell, 11 Output 3.6):**

- **Highlights roll, they never clip.** The window key, the gold shine-ribbon, and the T4 light
  bloom stay inside the sensor's shoulder. No blown/clipped whites, no HDR halo around hair or
  glass — an explicit §6.6 negative.
- **Shadows lift warm, they never crush.** A faint film toe keeps shadow detail and a warm tint —
  never a crushed digital black, never banding in the warm garnet-to-cream gradient.
- **Medium, gentle contrast overall** — the S-curve is soft, not punchy; punch reads as
  "video," softness reads as "print."

**Corollary — the sound-off legibility floor (Bible §5, 11 Rule R7):** the grade must always
keep enough luminance separation that the El Messiri **garnet-on-cream** overlay type reads
**muted** against the frame. The overlay **«كثافة وطول… وشعر يتكلّم عنكِ»** (*kathāfa wa-ṭūl…
wa-shaʿr yatakallam ʿanki*, "Density and length… hair that speaks for you," Bible §6.3,
Transformation beat) and the offer overlay **«باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني»** (*bāk
3 qanānāt — 139 riyāl badal 185 · shaḥn majjānī*, "3-bottle pack — 139 SAR instead of 185 · Free
shipping," Bible §6.3) must sit on a bright, separated field. A grade graded so dark, warm, or
low-contrast that either overlay disappears sound-off is a look failure, not a mood choice.

---

## 5. Skin-tone rendering law

Skin is the grade's most consequential surface — it is on screen for the entire
TRANSFORMATION beat (Bible §6.1, 5.2–6.6 s) and is the single hardest color target to get
"filmed" versus "AI-plastic."

| Rule | Target (do) | Kill (don't — flag to 24) |
|---|---|---|
| **Warmth register** | Warm, natural, Gulf-appropriate — the same warm band the whole grade lives in (Bible §5 "warm-toned skin") | Orange/oversaturated skin (a self-tan look); cool/blue or grey lifeless skin |
| **Subsurface truth** | Preserve **subsurface warmth** — a real, faint red-warm glow under the surface that reads as living tissue | Flat, opaque, "painted-on" skin with no subsurface read |
| **Texture** | Real pore-level texture stays visible under the warm grade — the grade colours the skin, it does not erase its texture | Plastic "beauty-filter" smoothing — a top AI tell |
| **Flush** | A healthy, natural flush (cheeks, warmth at the turn) | A "mask" — even, textureless, uniformly flushed skin |
| **Cast discipline** | Skin never carries a colour cast that leaves the §3 palette | A garnet-drape red tint bleeding onto skin from bounce light — a colour error, not warmth (cross-ref `13-lighting-director` Rule R5) |
| **Cultural register** | Refined, natural, "no-makeup" makeup, calm confidence (Bible §5) | Glossy, over-lit, theatrical skin that reads staged rather than filmed |

**The luminous-realism target (owned by `09-beauty-commercial-director`, rendered here through
the grade):** skin should look **lit from within**, not filtered — a single clean catchlight, a
warm flush, real micro-texture, all sitting inside the grade's gentle S-curve rather than fighting
it with a separate "beauty pass."

---

## 6. The garnet liquid — grade-protected (the product-lock intersection)

The §4 product lock states the oil is **translucent deep garnet / ruby-red — jewel-like, clear
(not opaque), with warm highlights** — and that "this exact red never shifts to orange, brown,
or pink." The grade is the layer most likely to break this lock if handled carelessly, because a
warm grade pushed too far tips garnet toward orange, and a bright key blown past its rolloff tips
it toward pink.

| Failure vector | What causes it | Visual result | Corrective grade note |
|---|---|---|---|
| **Over-warm push** | Grade's warm shadow toe pushed too far into the garnet's own hue | Liquid reads **orange**, loses its ruby identity | Hold the garnet's hue at deep red; let *cream and skin* carry the extra warmth, not the liquid itself |
| **Overexposed key** | Backlight/rim on the pour blown past the highlight rolloff | Liquid reads **pink**, loses translucency and depth | Expose so gold-in-liquid highlights read *inside* a translucent ruby, never blown to a pastel |
| **Underexposed key** | Insufficient backlight through the pour | Liquid sinks to **brown/black**, reads opaque | Backlight/rim the pour so it stays clear-not-opaque (§4) with visible internal gold sparkle |
| **Desaturation drift** | A restrained grade applied without protecting the garnet as an exception | Liquid loses its **jewel** status and reads muddy | Garnet and gold are the frame's *only* saturated notes (§3) — the grade must never flatten them to match the ambient desaturated field |

**The rule:** grade-protect the garnet like it is the logo, not a colour choice. The exposure and
grade decisions on the bottle, the drop, and the pour route through
`19-oil-product-realism-director` and `23-product-consistency-guard` — a shifted liquid is a
product-consistency reject regardless of how "cinematic" the grade otherwise looks.

---

## 7. Named grade-states per mood (the LUT-like descriptors)

**What a "grade-state" is (and is not):** each row below is a **mood inflection of the one
Mechat Warm Print Grade** — described the way a colourist would describe a scene-by-scene grading
pass on a single timeline, not five separate LUTs. Never cite more than one grade-state as a
competing token in the same compiled paragraph (§2). Each state maps 1:1 to a Bible §6.1 beat and
inherits that beat's contrast ratio (§4) and colour-temperature band (cross-ref
`13-lighting-director` Output 3.5: window/arch key ~4300–4800 K, beauty softbox ~4000–4500 K,
gold kicker ~3000–3200 K, warm practicals ~2700–3200 K — the whole take lives in a warm band
**≈2700–4800 K and never crosses cool**).

| Beat (§6.1) | Grade-state name | Saturation feel | Contrast | Highlight character | Shadow character | One-line descriptor |
|---|---|---|---|---|---|---|
| **HOOK / Pain** (0.0–1.2 s) | **Tender Macro Warmth** | Near-monochrome cream field; the strand and comb tooth carry the only micro-detail | 4:1 — the deepest the ad goes, still soft | Gentle, almost no specular — a quiet, elegant highlight on the comb tooth | Long, soft, gentle — never harsh or clinical | Intimate, hushed, warm cream — pain shown with restraint, not ugliness |
| **DISCOVERY / Trust** (1.6–3.0 s) | **Sunlit Arch Gold** | Cream field opens; gold seal and garnet label become the frame's first real jewel notes | 3:1 — open, warm, "expensive daylight interior" | Graceful rolloff across the arch and bottle; the gold seal catches a clean highlight | Long gentle arch shadows (§4 hero light DNA), warm not crushed | Warm Moorish-arch daylight, the bottle's ruby and gold announcing themselves against a soft cream field |
| **RITUAL / Sensory** (3.4–4.8 s) | **Intimate Tactile Warmth** | Warm neutral skin and oiled-strand glisten; garnet stays a quiet undertone, not yet the hero jewel | 3.5:1 — sculpted-but-soft | A discreet specular glisten on the freshly-oiled root and strand | Soft, close, warm — dimension without drama | A close, tactile warmth — the nourishment claim made visible in a soft glisten, never greasy-looking |
| **TRANSFORMATION** *(keeper)* (5.2–6.6 s) | **Luminous Lit-from-Within** | The gold shine-ribbon becomes the frame's brightest jewel; skin stays warm and natural, never oversaturated | 2.5:1 — the softest, most luminous state in the ad | The shine-ribbon rolls gracefully to a controlled bloom (never a hard flare/halo) | Soft negative-fill shadow side for real dimension, warm not crushed | A luminous, lit-from-within glow — real skin, real hair shine, the emotional peak rendered warm and believable, never glossy-CGI |
| **OFFER + CTA** (7.0–8.0 s) | **Clean Hero Legibility** | Garnet and gold return to full clarity for label/price legibility; cream field stays desaturated-warm around them | 3:1 — clean, legible | A defined rim highlight on the glass edge and the gold seal | Soft, open, no drama — legibility over mood | A clean, jewel-clear hero grade — the label, the gold seal, and the price overlay all read at a glance, sound-off |

**Continuity proof (do not violate):** read the *Contrast* column top to bottom — it moves in one
smooth curve, **4:1 → 3:1 → 3.5:1 → 2.5:1 → 3:1**, with no jump-cut in exposure between beats.
Read the *Saturation feel* column — garnet and gold *intensify* toward the frame's jewel status
exactly where the story needs them (Discovery reveal, Transformation shine, Offer legibility) and
recede into the ambient cream/brown field everywhere else. This is one grade breathing across five
moods, not five grades stitched together.

---

## 8. Prompt phrasing patterns — from grade spec to descriptive prose

`kie_veo3`'s prompt dialect rewards continuous, sensory, cinematic language — never bare
technical tokens (cross-ref `cinematography-language.md` §9, the same discipline applied here to
colour). **Hex codes, LUT names, and colourist jargon never appear literally in the compiled
paragraph** — they are reasoning tools for Claude and the studio's internal consistency checks
(§3–§7 above); the shipped prose translates every one of them into what the model should *see*.

**The technical-to-descriptive translation table:**

| Technical grade spec (this document's reasoning) | Descriptive prose (what actually ships in the paragraph) |
|---|---|
| `Warm filmic print emulation (Kodak-2383-like), gentle S-curve` | *"a warm, filmic colour palette with gentle, print-like depth — never a flat digital sheen"* |
| `Garnet #8E1B1E / gold #C9A227 the only saturated notes; cream/brown/sage desaturated-warm` | *"restrained, warm colour where only the deep garnet oil and the soft gold light hold real richness, everything else glowing a gentle desaturated cream and warm brown"* |
| `Contrast ~4:1, hook beat, shadow toe lifted` | *"soft, elegant contrast — quiet shadow, no harshness"* |
| `Highlights roll off gracefully, no clipping` | *"highlights melt softly at their edges, never blown out or harsh"* |
| `Garnet liquid grade-protected — clear, jewel-like, warm gold highlights inside` | *"the oil glows a deep, clear ruby red, gold light suspended inside it, never orange, never brown, never pink"* |
| `Skin: warm, natural, subsurface warmth, no plastic smoothing` | *"her skin glows with real warmth and texture, lit from within, never airbrushed or artificial"* |
| `T4 controlled filmic bloom, no HDR halo` | *"a soft golden light gently blooms and recedes — warm, filmic, never a harsh flare"* |
| `Overlay legibility floor — luminance separation maintained` | *(not stated in the visual paragraph at all — this is a compile-time check 26/27 run against the frame, never a phrase the model needs)* |

**The sentence-formula for grade language inside a beat (assemble in this order):**

1. **Ambient field first** — name the warm, desaturated-warm cream/brown tone the scene glows
   against.
2. **The jewel note, named precisely** — garnet ruby, gold light — never a generic "colourful."
3. **Contrast character** — "soft," "elegant," "luminous," matched to the beat's grade-state (§7).
4. **Highlight/shadow behaviour, only when load-bearing** — "highlights roll softly," "long gentle
   shadows" — stated plainly, never as a stop number.
5. **Skin/product colour-lock phrase, when a face or the bottle is in frame** — the exact
   protective language from §5/§6.

**Worked example (Discovery, assembled from the formula above):**
> *"…a warm Moorish-arch light, soft and golden, wraps a cream stone field in gentle daylight;
> the bottle's deep garnet oil glows a clear, jewel-like ruby, catching a small gold highlight
> as the light finds it, while a tiny gold seal on the label glows warm against the crisp white
> and red print — nothing overexposed, nothing oversaturated, just a soft, filmic warmth
> settling over the whole frame."*

**Phrasing anti-patterns (never write these into the compiled paragraph):**

| Anti-pattern | Why it fails | Correct alternative |
|---|---|---|
| Hex codes or LUT/preset names in the prose (*"grade to #8E1B1E," "apply a Kodak-2383 LUT"*) | A video model was not trained to parse colourist shorthand as scene description | Describe the *effect* — "a deep garnet jewel tone," "a warm filmic glow" |
| Bare numeric contrast/exposure tokens (*"4:1 contrast ratio, highlights at 90 IRE"*) | Camera/grading department jargon, not descriptive scene language | "soft, elegant shadow," "highlights that roll off gently" |
| Naming more than one grade-state as competing tokens in one clause | Fractures the one-grade coherence rule (§2) even in prose form | One warm print character described per continuous paragraph; only the *mood intensity* shifts |
| Vague colour language (*"nice warm colors"*) | Gives the model nothing concrete; the whole point of §3–§7's vocabulary is precision | Name the jewel note, the ambient field, and the contrast character explicitly, every time |
| Claim-inflating adjectives tied to colour (*"miraculously glossy," "impossibly vibrant hair"*) | Crosses from grading craft into a claim the Bible never makes (Bible §3; cross-ref `beauty-hair-marketing.md` claims-discipline layer) | Describe what the grade *shows* — "warm, natural shine" — never what it "proves" |

---

## 9. Delivery, legibility & the technical floor

- **Colour space & delivery:** design in a filmic print character; **deliver in Rec.709** for
  social (11 Output 3.6). Format is **9:16, 1080×1920+, 24–30 fps** with a **24 fps** cadence
  priority (Bible §5; full cadence law owned by `cinematography-language.md` §7 and
  `camera-movements.md` — not restated here).
- **Safe margins:** the grade must never crush or blow the frame in the platform-mandatory clear
  zones — **top ~14% / bottom ~20%** — where on-screen overlays and UI sit (Bible §5).
- **Sound-off legibility test (the grade's hard floor, §4 above):** before any beat ships, confirm
  the El Messiri garnet-on-cream overlay is readable **muted**, with no sound. This is the same
  discipline that protects the HOOK overlay **«كل تمشيطة… وشعرك ينقص؟»** (*kull tamshīṭa…
  wa-shaʿruki yanquṣ?*, "Every comb stroke… and your hair keeps thinning?," Bible §6.3) even at
  the ad's deepest 4:1 contrast state — a beautifully graded frame that hides its own overlay is a
  Technical/prompt-soundness failure, not a mood success.
- **The gold seal legibility check:** the label's gold **«طبيعي 100%»** (*ṭabīʿī miʾa bi-l-miʾa*,
  "100% natural," Bible §4) seal must stay legible under every grade-state that shows the bottle
  (Discovery, Offer) — it is a trust element, not decoration, and a grade that flattens it to
  illegibility undermines the Branding gate axis.

---

## 10. Do / Don't — the grading gate

| DO (this document's grammar) | DON'T (the generic/AI-tell opposite) | Flagship evidence |
|---|---|---|
| One warm filmic print grade for the whole take, moods made through exposure/contrast, not competing LUTs | Multiple named grades/LUTs cited as separate tokens in one prompt | §2, §7 — five grade-states, one grade family |
| Garnet and gold as the *only* saturated jewel notes; everything else desaturated-warm | Global oversaturation; every colour reading equally "loud" | §3 — the two-jewel palette hierarchy |
| Gentle S-curve, warm shadow toe, graceful highlight rolloff | HDR crunch, clinical digital neutrality, "video" flatness | §4 — the print-emulation character |
| Contrast held inside 2:1 → 4:1, moving in a smooth curve across beats | Any beat past 4:1; abrupt exposure jump-cuts between beats | §4, §7 — the 4:1→3:1→3.5:1→2.5:1→3:1 curve |
| Warm, natural, textured skin with subsurface warmth | Orange self-tan skin, cool/grey lifeless skin, plastic beauty-filter smoothing | §5 — the skin-tone rendering law |
| Garnet liquid grade-protected — clear jewel ruby, gold-in-liquid highlights | Liquid shifting to orange, brown, or pink under grade/exposure error | §6 — the garnet failure-vector table |
| Descriptive, sensory prose that ships the *effect* of every grade spec | Hex codes, LUT names, stop numbers, or IRE values inside the positive paragraph | §8 — the translation table |
| A grade that keeps the sound-off garnet-on-cream overlay legible in every beat | A frame graded so dark/warm/low-contrast the overlay disappears | §9 — the legibility floor |

---

## 11. Consolidated grading negatives (→ 24-negative-prompt-builder)

The Bible §6.6 master core already bans `oversaturation, HDR halos, CGI look` at the framework
level. The list below aggregates the **grade-specific** subset of `11-cinematography-director`
Output 3.8 and `13-lighting-director` Output 3.8 for one-stop grading reference — it is not a new
source of truth; every token here is quoted from those two outputs, never re-authored:

`HDR halos, blown/clipped highlights, oversaturation, teal-orange grade, neon colour, cool/blue
cast, green fluorescent cast, colour cast off-palette, crushed digital blacks, banding in warm
gradients, light bloom banding, chromatic-aberration fringing, liquid colour shift
(garnet→orange/brown/pink), overexposed/pink oil, underexposed/brown oil, illegible/blown label,
glossy specular on matte white cap, red tint on skin, plastic/waxy skin from over-lighting,
beauty-filter smoothing, overlay lost in shadow.`

**Do not extend this list independently.** New grading tells discovered during a run are raised
to `11-cinematography-director` or `13-lighting-director` first (their outputs are the actual
source `24` reads); this document is refreshed to mirror them, never the other way around.

---

## 12. Quick-reference checklist

Before any beat's grade language is handed to `26-kie-prompt-builder`, confirm:

- [ ] Only **one** named grade family (the Mechat Warm Print Grade) is implied anywhere in the
      compiled paragraph — moods vary by exposure/contrast/saturation intensity, never by a second
      competing LUT or grade token.
- [ ] Garnet `#8E1B1E`/`#6E1214` and gold `#C9A227` are the *only* colours described as
      saturated/jewel-like; cream, brown, and sage are described as a soft, desaturated-warm field.
- [ ] The beat's contrast character matches its §4/§7 grade-state (4:1 Hook → 3:1 Discovery →
      3.5:1 Ritual → 2.5:1 Transformation → 3:1 Offer) with no exposure jump between beats.
- [ ] Highlights are described as rolling off gently; shadows are described as lifted and warm —
      never as clipped, crushed, or banded.
- [ ] Any beat with skin describes it as warm, natural, and textured with real subsurface warmth —
      never orange, cool/grey, or plastic-smooth.
- [ ] Any beat with the bottle or the pour describes the oil as a clear, translucent ruby with
      gold-in-liquid highlights — never orange, brown, or pink; the matte white cap stays flat and
      unglossed.
- [ ] No hex code, LUT/preset name, contrast-ratio number, or IRE/stop value appears literally in
      the positive prose — every spec is translated into its descriptive effect (§8).
- [ ] The overlay for that beat (if any) is checked for sound-off legibility against the described
      grade — no overlay is left on a frame graded too dark, warm, or low-contrast to read it.
- [ ] Nothing in the phrasing implies a claim beyond Bible §3's four locked claims, and no Arabic
      overlay line is re-authored — locked §6.3 lines and the §4 gold-seal wording are cited, never
      rewritten.
