# AI ADS STUDIO — STUDIO BIBLE (Single Source of Truth)

> This file is the **coordination keystone** of the AI Ads Studio framework.
> Every skill, template, knowledge doc, and example file is authored against the
> facts, locks, tone rules, and the flagship creative defined here. When two
> documents disagree, **this file wins**. When a new product is onboarded, a new
> brand-lock block is added under `config/brand/` and this Bible's flagship
> section is regenerated for that product — nothing else in the framework changes.

---

## 0. FRAMEWORK IDENTITY

**Name:** AI Ads Studio
**Purpose:** Produce cinematic, high-converting, indistinguishable-from-real
luxury beauty video ads for Meta / TikTok / Snapchat (KSA · UAE · Oman · Egypt),
while spending the **minimum** number of AI video-generation credits — ideally a
single generation per approved concept.

**Three non-negotiable priorities (in order):**
1. **Realism** — no visible AI artifacts. It must look filmed, not generated.
2. **Conversion** — every frame earns Scroll-Stop, Hook, Hold, CTR, CVR, ROAS.
3. **Cost discipline** — Claude does ALL reasoning, scoring, and QA *before* any
   model is called. One optimized prompt → one generation. Regenerate scenes,
   never whole videos.

**Operating principle:** _"Reason like a $500k creative agency, spend like a
startup. Never send a prompt to a video model until every quality gate is green."_

---

## 1. DIRECTORY MAP

```
ai-ads-studio/
├── STUDIO-BIBLE.md          ← you are here (source of truth)
├── README.md                ← what it is + quickstart
├── ARCHITECTURE.md          ← system design, data flow, extensibility
├── PIPELINE.md              ← the 12-stage end-to-end run
├── config/
│   ├── studio.config.yaml   ← global knobs, thresholds, defaults
│   ├── markets.yaml         ← KSA/UAE/Oman/Egypt culture + language
│   ├── platforms.yaml       ← Meta/TikTok/Snap specs, safe zones, hook windows
│   ├── model-adapters.yaml  ← Kie/Veo/Kling/Runway/PixVerse capability matrix
│   └── brand/
│       └── mechat-red-oil.brand.yaml  ← flagship product lock
├── skills/                  ← 30 modular skill specs (00–29)
├── knowledge/               ← knowledge base (ads, culture, craft, negatives)
│   └── gulf-culture/        ← saudi / uae / oman / egypt
├── templates/               ← fill-in artifacts (brief → ab-test)
├── prompt-builders/         ← the prompt compiler + negatives + dialect map
├── quality/                 ← scoring rubric + checklists
├── memory/                  ← creative memory + campaign memory
├── assets/                  ← asset conventions (points to repo /assets)
├── cache/                   ← prompt cache convention
└── examples/
    └── mechat-red-oil/      ← the fully worked flagship ad (00–13)
```

**Skill numbering (pipeline order):**
`00-orchestrator, 01-audience-analyzer, 02-consumer-psychology,
03-marketing-strategist, 04-creative-director, 05-creative-concept-generator,
06-hook-generator, 07-offer-optimizer, 08-storyboard-director,
09-beauty-commercial-director, 10-luxury-commercial-director,
11-cinematography-director, 12-camera-director, 13-lighting-director,
14-motion-director, 15-transition-designer, 16-hair-realism-director,
17-human-realism-director, 18-environment-realism-director,
19-oil-product-realism-director, 20-arabic-copywriter, 21-cultural-expert-gulf,
22-brand-guardian, 23-product-consistency-guard, 24-negative-prompt-builder,
25-prompt-optimizer, 26-kie-prompt-builder, 27-quality-checker,
28-creative-scoring-engine, 29-cost-optimizer.`

---

## 2. FILE-AUTHORING CONVENTIONS (apply to every generated file)

- **Skills** (`skills/NN-name/SKILL.md`) begin with YAML frontmatter:
  ```yaml
  ---
  name: <kebab-name>
  role: <one-line role title>
  stage: <pipeline stage number(s)>
  consumes: [<upstream artifacts / skills>]
  produces: [<downstream artifacts>]
  model_cost: none   # skills reason in Claude; they never call a video model
  ---
  ```
  Then these H2 sections **in this order**: `Purpose` · `Inputs` · `Outputs` ·
  `Rules` · `Reasoning Strategy` · `Best Practices` · `Failure Conditions` ·
  `Handoff`. Write in second person imperative ("You do X"). Be concrete and
  production-grade. **No placeholders, no TODO, no "example only" hand-waving.**
- **Knowledge docs** are reference material: dense, scannable, checklist-heavy,
  with concrete numbers and named techniques. No fluff.
- **Every doc** uses `#` H1 title matching its purpose, short paragraphs, and
  bullet/table density over prose. Keep a professional agency voice.
- **Arabic** must be correct, elegant Modern Standard Arabic (فصحى) that reads
  premium across the Gulf. Every Arabic overlay/VO line carries a Latin
  transliteration and an English gloss in parentheses on first use.
- **Consistency:** all examples across all files reference the flagship product
  (§4) and the flagship creative (§6). Never invent new product claims.

---

## 3. PRODUCT SOURCE OF TRUTH (extracted from the landing page — never invent)

**Product:** زيت المشاط الأحمر الأصلي — *Zayt al-Mishāṭ al-Aḥmar* ("Original Red
Mechat Oil"), a traditional Moroccan herbal hair oil.

**Positioning:** 100% natural, authentic Moroccan "grandmothers' recipe"
(وصفة الجدات) at a modern concentration. Free of parabens and silicone.

**Functional benefits (verbatim intent from LP — do not exceed these claims):**
1. **Stops hair loss from the first weeks** — strengthens & anchors follicles;
   less shedding in the comb and on the pillow.
2. **Stimulates new hair growth** — Moroccan herbs activate scalp circulation,
   waking dormant follicles.
3. **Noticeable density & length** — with regular use 2–3×/week.
4. **Shine & softness from first use** — coats the strand, silky, non-greasy.

**Ingredients (only these four):**
- **المشاط / قشور الجوز** — *al-Mishāṭ* (walnut husk) — the traditional secret to
  strengthen roots & stop shedding.
- **الكركديه الأحمر** — red hibiscus — antioxidants, stimulates growth, warm tone.
- **الحناء الطبيعية** — natural henna — coats & protects the strand, adds density
  & shine.
- **زيوت نباتية مغذية** — nourishing plant oils — hydrate scalp, nourish root→tip.

**Emotional benefits:** confidence, restored femininity, hope, self-care ritual,
heritage/authenticity trust, identity.

**Target audience:** Women, ~22–45, in **Saudi Arabia (primary)**, then UAE, Oman,
Egypt. Concerned with shedding, thinning, visible scalp gaps; have tried many
oils without result; value natural/heritage remedies. Mothers included (reviews
reference daughters).

**Offer & price:** **Pack of 3 bottles (3 × 250 ml = 750 ml)** = full ~3-month
treatment. **139 SAR** (was **185 SAR**, −25%). **Free shipping.** **Cash on
delivery (الدفع عند الاستلام).** Delivery to all KSA cities, 24–48h / 1–4 business
days after phone confirmation. SKU `SA04050100M300`.

**CTA:** «اطلبي الآن — الدفع عند الاستلام» (Order now — Cash on delivery).

**Trust elements:** COD; inspect-before-pay (فحص المنتج قبل الدفع); 100% natural;
free delivery; 4.8/5 rating; verified-purchase reviews (Riyadh, Jeddah, Dammam);
WhatsApp support; "don't like it → don't pay" guarantee.

**Pain points:** hair falling with every comb stroke; gaps appearing; wasted
money on oils that did nothing; roots not receiving nourishment.

**Objections (handled in FAQ):** How soon results? (softness/shine first use;
less shedding 3–5 weeks; density 2–3 months) · Suits all hair types? (yes; dry,
oily, colored, treated) · Does it dye hair red? (no — warm reflections only on
light hair with heavy use) · Delivery & payment? (COD, inspect first) · Don't
like it? (refuse delivery, no charge).

**Brand palette (from LP tokens — the visual DNA):**
- Garnet red `#8E1B1E` (brand/CTA) · deep garnet `#6E1214`
- Warm cream `#FAF6F1` · surface white `#FFFFFF`
- Dark warm brown ink `#2A1A16` · soft brown `#6B564E`
- Gold `#C9A227` · sage green `#4A6741`
- Fonts: **El Messiri** (display/headlines) · **Tajawal** (body). RTL Arabic.
- Mood: warm, luxe, Moroccan-heritage-meets-Gulf, natural, feminine, premium.

---

## 4. PRODUCT CONSISTENCY LOCK (from the real product photos — must never change)

The bottle is the hero and its identity is **immutable** across every frame and
every regeneration. Describe it in prompts exactly as:

- **Vessel:** a clear/transparent rounded-rectangular PET bottle (~250 ml), with
  soft rounded shoulders and a short neck. Squarish body, not a tall cylinder.
- **Cap:** a **matte white ribbed screw cap**, flat top. Never gold, never black.
- **Liquid:** **translucent deep garnet / ruby-red oil** — jewel-like, clear (not
  opaque), warm highlights. This exact red never shifts to orange, brown, or pink.
- **Label:** a **white rounded-square front label** with a **red top band/ribbon**.
  On it, in garnet-red Arabic type: **«زيت المشاط»** (المشاط largest) with
  **«الأحمر للشعر»** beneath, and three tiny tagline lines
  («نعومة وديمومة · تغذية للشعر · تقوية وتطويل الشعر»). A small **gold circular
  "100% Natural / طبيعي 100%" seal** sits at the label's upper corner.
- **Never:** change the logo, wording, label layout, cap color, proportions, or
  the liquid color. No extra text, no English brand name, no redesign.

**Hero environment DNA (matches the LP hero image):** warm cream **Moorish/mihrab
arch**, deep garnet drape behind, a single **red hibiscus flower**, a **palm
frond**, a pale **stone/travertine podium**, soft directional window light with
long gentle shadows. This is the signature set for product hero + offer beats.

---

## 5. MARKET, CULTURE & PLATFORM RULES (condensed — full detail in knowledge/)

**Cultural (Gulf-first):**
- Elegant, modest, aspirational. Beauty shown with restraint and taste.
- Hair is the hero; show it as luxurious texture, movement, macro, silhouette,
  and a tasteful over-the-shoulder reveal. Model: refined, natural, warm-toned
  skin, minimal "no-makeup" makeup, calm confidence — never provocative.
- Wardrobe: elegant neutral drape / soft modest blouse / abaya-adjacent tones in
  cream, garnet, gold. Interiors: premium, warm, Gulf-luxury with Moroccan
  heritage cues (arches, brass, mashrabiya light, dates/hibiscus botanicals).
- Provide a **hijab/styled-hair A/B pair** so the buyer can choose; default hero
  keeps hair visible (standard for hair-care creative shown to women) with an
  elegant modest alternative documented.
- Language: elegant MSA (فصحى) reads premium and pan-Gulf; a Khaleeji-leaning
  spoken VO variant is offered for TikTok/Snap. Avoid Darija/Egyptian slang in
  the primary Saudi cut. No awkward machine translation, ever.
- Respect: no alcohol cues, no immodesty, no religious imagery as decoration, no
  fear-mongering about the body, no fake medical claims.

**Platform (9:16, sound-on-first design):**
- **Meta (Reels/Stories):** hook window 0–3 s; keep key content inside center
  safe zone; text legible muted; 8–15 s; CTA sticker + on-frame CTA.
- **TikTok:** 0–2 s pattern interrupt; native/authentic energy even when luxe;
  captions on; trend-aware sound; strong 2-second "reason to stay."
- **Snapchat:** 0–1.5 s stop; vertical full-bleed; fast payoff; Swipe-Up/CTA
  affordance; brand + offer legible in the first and last second.
- All cuts: **9:16, 1080×1920+, 24–30 fps**, safe margins top ~14% / bottom ~20%
  for UI. Design **sound-on** but **legible sound-off** (overlays carry the story).

---

## 6. THE FLAGSHIP CREATIVE (locked winner — every example file elaborates THIS)

**Concept name:** **«القطرة التي تُعيد الحياة» — "The Drop That Brings Hair Back to
Life"** (internal codename: **UNBROKEN THREAD**).

**Why it wins (summary):** It fuses the audience's most visceral pain (a strand
falling with every comb stroke) with instant heritage trust (grandmothers'
recipe) and a sensory transformation — delivered as **one unbroken cinematic
movement** where the **oil drop and the hair strand are the transition engines**.
Before/after happens *inside a single camera move*, not a split screen, which
reads as real footage and is almost impossible to scroll past. It maximizes
Scroll-Stop (macro pain hook), Hold (continuous motion + curiosity), and CVR
(clear COD offer). Full scoring lives in `examples/.../02` and `/12`.

**Emotional spine:** Pain → Heritage/Trust → Ritual/Self-care → Transformation →
Pride → Action. Primary trigger: **hope + restored femininity**; secondary:
**heritage trust**.

### 6.1 Beat sheet — PRIMARY 8 s cut (one single generation, Veo-3-class)

| t (s) | Beat | Action | Transition OUT |
|------|------|--------|----------------|
| 0.0–1.2 | **HOOK / Pain** | Extreme macro on an ivory wide-tooth comb; a single long dark hair strand slips off the teeth and falls in slow-mo against soft cream light. Quiet, intimate, elegant (not ugly). | Falling strand meets a **garnet oil drop** falling from above — ripple **match/liquid morph** |
| 1.2–1.6 | *transition* | Camera follows the drop down into a garnet oil surface; ripple wipes the frame. | Rise out of the oil surface |
| 1.6–3.0 | **DISCOVERY / Trust** | Pull up from the oil to reveal the **Mechat bottle** in warm arch light (hero set §4). An elegant warm-skinned hand enters, lifts the bottle, label to camera. | She tilts it; a **ribbon of red oil pours** — camera **dives into the pour** (macro) |
| 3.0–3.4 | *transition* | Screen fills with translucent garnet oil + gold highlights. | Emerge from oil onto scalp |
| 3.4–4.8 | **RITUAL / Sensory** | Macro: fingertips massage oil into the roots/scalp, then glide down a section of dark healthy hair; strands catch light. | **Hand sweeps hair across lens** — moving hair = natural wipe |
| 4.8–5.2 | *transition* | Motion-blur of strands fills frame. | Emerge from hair onto the woman |
| 5.2–6.6 | **TRANSFORMATION** | Natural over-the-shoulder turn to camera; hair now visibly **denser, longer, luminous**, healthy movement & shine; soft authentic micro-smile, a real blink, a breath. | A **golden highlight travels her hair → blooms into a soft light flare** |
| 6.6–7.0 | *transition* | Light bloom fills frame, recedes onto product. | Reveal product |
| 7.0–8.0 | **OFFER + CTA** | Camera **orbits** the single bottle; mid-orbit, **two more bottles rise** into place (the 3-pack) in the hero set; price + CTA resolve. | End on crisp hero pack |

### 6.2 Extended 13 s "director's cut" (2 stitched segments; optional)
Segment A = beats HOOK→TRANSFORMATION (0–8.5 s). Segment B = TRANSFORMATION hold
+ OFFER + CTA (8.5–13 s) with a longer orbit and a 1.5 s CTA hold. Use only when
budget allows a 2-generation stitch; otherwise ship the 8 s primary.

### 6.3 Locked Arabic overlays (on-screen, RTL, short, legible sound-off)

| Beat | Arabic overlay | Translit | English gloss |
|------|----------------|----------|---------------|
| Hook | **كل تمشيطة… وشعرك ينقص؟** | *kull tamshīṭa… wa-shaʿruki yanquṣ?* | Every comb stroke… and your hair keeps thinning? |
| Discovery | **سرّ جداتنا: زيت المشاط الأحمر** | *sirru jaddātinā: zayt al-mishāṭ al-aḥmar* | Our grandmothers' secret: Red Mechat Oil |
| Ritual | **تغذية تصل إلى الجذور** | *taghdhiya taṣil ilā al-judhūr* | Nourishment that reaches the roots |
| Transformation | **كثافة وطول… وشعر يتكلّم عنكِ** | *kathāfa wa-ṭūl… wa-shaʿr yatakallam ʿanki* | Density and length… hair that speaks for you |
| Offer | **باك 3 قنينات — 139 ﷼ بدل 185 · شحن مجاني** | *bāk 3 qanānāt — 139 riyāl badal 185 · shaḥn majjānī* | 3-bottle pack — 139 SAR instead of 185 · Free shipping |
| CTA | **اطلبي الآن — الدفع عند الاستلام** | *uṭlubī al-ān — ad-dafʿ ʿind al-istilām* | Order now — Cash on delivery |

### 6.4 Locked Arabic voice-over (feminine, warm, intimate, elegant MSA)

- **L1 (hook):** «شعركِ يتساقط… والسبب جذورٌ لا تصلها التغذية.»
  *(Your hair is falling… because the roots aren't getting nourishment.)*
- **L2 (discovery):** «سرٌّ عاد من جديد — زيت المشاط الأحمر، وصفةٌ مغربيةٌ أصيلة.»
  *(A secret returns — Red Mechat Oil, an authentic Moroccan recipe.)*
- **L3 (ritual):** «كركديه، وحنّاء، وأعشابٌ تغذّي فروة رأسكِ من العمق.»
  *(Hibiscus, henna, and herbs that nourish your scalp deeply.)*
- **L4 (transformation):** «فيتوقف التساقط… وينمو شعرٌ أكثف، أطول، وأكثر لمعانًا.»
  *(So the shedding stops… and hair grows thicker, longer, and shinier.)*
- **L5 (offer/CTA):** «باك ثلاث قنينات بـ139 ريالًا فقط — والدفع عند الاستلام. اطلبيه اليوم.»
  *(A 3-bottle pack for only 139 SAR — cash on delivery. Order it today.)*

For the 8 s primary, use **L1 + L2/L3 compressed + L5**. Full 5-line VO is for the
13 s cut. A Khaleeji-spoken variant is documented in the example VO file.

### 6.5 Music & sound (summary; full spec in example /10)
- **Music:** minimal luxe — a warm oud/qanun motif over soft sub-bass and airy
  pads; a single resolving swell on the transformation; graceful, modern, not
  busy. ~70–85 BPM feel, emotional not hype.
- **Sound design:** intimate breath on the hook; delicate glassy tone for the
  falling strand; a soft "tick" as the oil drop lands + water-like ripple; silky
  hair-movement whoosh; low bottle-glass clink on the pack reveal; a clean
  resolving chime under the CTA. Sound-on delight, sound-off fully legible.

### 6.6 Master negative-prompt core (always applied)
`plastic/waxy skin, AI sheen, extra fingers, extra arms, malformed hands, warped
face, uncanny eyes, dead stare, stiff mannequin motion, weird/forced smile,
morphing bottle, changing/!warped label, altered logo, wrong Arabic, gibberish
text, mismatched cap color, liquid color shift, floating objects, fake/detached
shadows, flicker, frame jitter, temporal warping, oversaturation, HDR halos, CGI
look, low-res hair, plastic hair, banding, watermark, subtitles burn-in.`

---

## 7. QUALITY GATES (a run may NOT call a model until all pass)

Score 10 axes 0–100; **ship threshold = ≥ 95 weighted, with NO axis < 90**:
Realism · Marketing/Conversion · Luxury feel · Storytelling · Branding ·
Culture/Localization · Product consistency · Video rhythm/retention · Hook
strength · Technical/prompt soundness. Below threshold → **auto-improve and
re-score; never generate.** Full rubric in `quality/scoring-rubric.md`.

---

## 8. HOW EXAMPLE FILES MUST ALIGN

`examples/mechat-red-oil/` files 00–13 all elaborate §3–§6 **without
contradiction**. The concept ranked #1 in `02-concepts-scored.md` is the §6
winner. The #1 hook in `03-hooks-scored.md` is the §6.3 Hook line. The storyboard,
shot list, VO, overlays, music, and the single Kie prompt all render the §6.1
beat sheet with the §4 product lock and §6.6 negatives. The Kie prompt is ONE
generation for the 8 s primary cut.
