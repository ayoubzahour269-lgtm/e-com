# Egypt Culture Dossier — Warm Cairene Expressiveness for Beauty Ads
### Aesthetics, modesty, wardrobe, interiors, taboos, dialect, seasonality, COD prevalence, buying behavior — contrasted with the Gulf at every axis

> **Knowledge base article — reference material, not a skill.** Dense, scannable, checklist-heavy
> market dossier for Stage 3 (**03-marketing-strategist**), Stage 4 (**04-creative-director**),
> Stage 7 (**07-offer-optimizer**), Stage 9 (**20-arabic-copywriter**, **21-cultural-expert-gulf**),
> and Stage 12 (**27-quality-checker**, Culture/Localization axis). Grounded in `STUDIO-BIBLE.md`
> §3 (product/offer facts — never re-litigated here), §4 (product lock + hero-environment DNA,
> market-agnostic), §5 (culture/market/platform rules — the modesty floor and forbid list), §6
> (the flagship **UNBROKEN THREAD** — §6.1 beat sheet, §6.3 overlays, §6.4 VO, §6.6 negatives), §7
> (quality gates), and `config/markets.yaml` → `markets.eg` (the machine-readable Egypt block this
> document explains, deepens, and never contradicts). **When this document disagrees with the
> Bible or with `markets.yaml`, they win — this file is the deep dossier `markets.yaml` points to
> (`eg.culture_doc_ref`), not a competing source.** Nothing here invents a product claim, a lock
> detail, an offer term, a price, or new Arabic copy for the locked flagship; every Arabic string
> quoted from the Bible is reused verbatim and every new Arabic term introduced here carries a
> Latin transliteration and an English gloss on first use (Bible §2).

---

## 1. Scope & where this sits in the pipeline

This dossier is the **deep-dive layer** beneath `config/markets.yaml` → `markets.eg`. That file
carries the structured *data* (modesty level, wardrobe palette, interior style, taboos, language,
numerals, seasonality, COD norms, delivery expectation) in a lean, machine-readable block; this
document carries the *why*, the *idiom*, the *contrast logic against the Gulf reference markets*,
and the concrete creative guidance a director or copywriter needs to actually execute an
Egypt-targeted cut. Read `markets.yaml eg` first for the facts; read this for how to apply them.

**Consumed by:**

| Stage | Skill | Uses this doc for |
|---|---|---|
| 3 | `03-marketing-strategist` | Egypt's seasonality calendar (§9) → angle and flight-timing selection; the price-sensitivity and cash-economy reality (§2, §10) that shapes offer framing |
| 4 | `04-creative-director` | The expressive-warmth aesthetic register (§3), wardrobe styling grammar (§5), and Cairene/Mediterranean interior vocabulary (§6) that differentiate an Egypt cut from the KSA reference cut without breaking the Bible §5 floor |
| 7 | `07-offer-optimizer` | EGP pricing/COD framing (§11) and the volatility caveat (§2) so the localized offer reads native, not converted |
| 9 | `20-arabic-copywriter` | The Egyptian (مصري, *miṣrī*, "Egyptian") register texture for optional spoken VO (§8) — overlays stay MSA per the Bible; this never re-authors the locked flagship overlays/VO |
| 9 | `21-cultural-expert-gulf` | The additive taboo catalog (§7) — sectarian sensitivity, political content, medical-claims skepticism — and the wardrobe/interior specifics beyond `markets.yaml`'s summary rows |
| 12 | `27-quality-checker` | Culture/Localization axis diagnostic detail (§4, §7) when scoring an Egypt-targeted cut |

**Reference market:** KSA is the Bible's primary and strictest market (`markets.yaml sa`, "what
passes here passes everywhere"). Every section below states the Egypt position **and** the Gulf
(KSA, with UAE noted where it forms a useful middle ground) delta, so a reader never has to
cross-reference three documents to see what actually changes.

---

## 2. Egypt at a glance — the demographic & economic reality behind the tone

Before any aesthetic decision, get the market reality right, because it changes both *how* the ad
should feel and *how hard* the offer needs to work.

| Fact | Detail | Creative implication |
|---|---|---|
| **Population scale** | Egypt is the most populous country in the Arab world by a wide margin — over 105 million people, concentrated overwhelmingly along the Nile Valley, the Nile Delta, and the Cairo–Giza–Alexandria urban corridor | The single largest addressable Arabic-speaking audience of the four markets (Bible §3 rollout order: KSA → UAE → Oman → Egypt) — scale rewards a broad, warm, pan-Egyptian register over a narrow regional one |
| **Two population centers** | **Greater Cairo** (the megacity spanning Cairo, Giza, Qalyubia — one of the largest urban agglomerations in the Middle East/Africa) and **Alexandria** (the Mediterranean coastal second city) anchor commerce, media, and fastest logistics (`markets.yaml eg.delivery_expectation.coverage`) | Cairo/Alexandria are the default creative and delivery reference points; Upper Egypt (**الصعيد**, *aṣ-Ṣaʿīd*, "Upper Egypt" — the Nile Valley south of Cairo) and remote governorates are reached with the same offer but a slower fulfillment promise (§12) and, culturally, a somewhat more traditional register than the Cairo default — treat Cairene/Delta as the studio's default Egypt register unless a brief explicitly calls for a Ṣaʿīdi-coded variant |
| **Cash economy, low card penetration** | A large majority of retail e-commerce transacts in cash; digital-wallet and card checkout adoption trail the Gulf markets by a wide margin | This is the single biggest structural driver of §11 below — COD is not a preference here, it is close to the *only* workable payment mechanic for a first-time buyer of an unfamiliar product (`markets.yaml eg.cod_norms.dominance: "very-high"`) |
| **Currency volatility (the price-sensitivity anchor)** | The Egyptian pound (**جنيه مصري**, *junayh miṣrī*, "Egyptian pound," EGP; on-frame symbol **ج.م**) has undergone several large devaluations since the November 2016 float, with further sharp adjustments during the 2022–2023 economic crisis; inflation has run high in the years since | This is *why* Egypt is meaningfully more price-sensitive than the Gulf markets, independent of anything the studio does creatively — a woman evaluating a 3-bottle pack is doing so against a currency that has lost significant purchasing power in recent memory, so the −25% pack-value framing (Bible §3's "3-pack = the complete course; single bottle is a trial, the pack is the result," `markets.yaml shared.offer_structure.framing`) and the free-shipping/COD trust stack must work *harder* here than anywhere else in the rollout |
| **Never fabricate an EGP price** | EGP pricing is explicitly **not** Bible-locked and is explicitly volatile (`markets.yaml eg.currency.price_policy`: "EGP is volatile — never convert 139 SAR in config") | This document, like `markets.yaml`, states the offer **structure** only — 3-pack, free shipping, COD, inspect-before-pay — and routes every actual EGP number to `07-offer-optimizer`. No file in this framework, including this one, should ever print a specific converted EGP figure |
| **Media dominance** | Egyptian cinema, television drama (**مسلسلات**, *musalsalāt*, "TV drama serials"), and music have been the most widely distributed and understood Arabic-language media across the entire Arab world for decades | This is the structural reason the Egyptian dialect is described as "pan-Arab familiar and warm" in `markets.yaml eg.language.note` — it is arguably the single most broadly *understood* spoken Arabic dialect outside its home market, which matters for §8 below |

---

## 3. Aesthetic register — expressive Cairene warmth vs. Gulf restraint

| Axis | KSA (reference cut, strictest) | UAE (cosmopolitan Gulf luxe) | Egypt (this dossier) |
|---|---|---|---|
| **Overall mood** | Heritage-forward, warm, Najdi-luxury restraint | Cosmopolitan, editorial-clean, polished-luxe | **Warm, expressive, lived-in, relatable** — the Bible's own hero set (Moroccan arch, hibiscus, travertine) reads here as an admired, evocative *outside* heritage brought into a domestically warm frame, rather than an at-home luxury-retail vocabulary (as it does in UAE) or a Najdi-restraint vocabulary (as it does in KSA) |
| **Governing feel** | "Quiet boutique-hotel film" | "International DTC beauty benchmark" | "A warm, honest, close-up family moment" — think a well-shot Cairo apartment at golden hour rather than a five-star hotel suite; premium still, but the premium reads through **warmth and sincerity**, not through spectacle or polish alone |
| **Facial/expressive latitude** | Calm confidence, a soft *micro*-smile only, never a wide/toothy smile | Same restrained expression range as KSA (Bible §5's TRANSFORMATION-beat direction is market-agnostic) | The same modesty *floor* on gesture and framing applies (§4 below), but the expressive **range within it is wider** — a fuller, warmer, more genuine smile is authentic and welcome here, where a KSA cut deliberately holds back to a micro-smile. `markets.yaml eg.modesty_level: "moderate-high"` names this explicitly as "more expressive/relaxed than the Gulf" |
| **Pacing** | Warm, unhurried | Unhurried with a crisper cut-to-CTA | Warm and unhurried, closer to KSA's pacing than UAE's, but with more *vocal* warmth expected in VO delivery (§8) — the continuous-camera realism and beat timings (Bible §6.1) do not change; what changes is the emotional temperature of performance within them |
| **Production-polish benchmark** | Warm, intimate | Editorial-clean, high international benchmark | Warm and honest over glossy — an over-polished, hyper-produced look can read as *disconnected* from the audience's lived reality here, which cuts against trust in a market that (§7, §10) is explicitly skeptical of over-promising. The Bible §6 continuous-camera realism device (never CGI-slick, Bible §6.6) is the right instinct for every market, but Egypt rewards it the most directly |
| **Reference points** | Riyadh five-star hospitality, Najdi majlis architecture | Dubai/Abu Dhabi five-star hospitality, international luxury retail | Cairene warmth: golden Nile-corniche light, historic Islamic-Cairo architectural detail (Khan el-Khalili-adjacent brasswork, mashrabiya-screened courtyard houses), a home-ritual intimacy rather than a hospitality-suite polish |

**Governing rule (identical to every market):** the aesthetic *floor* — modesty, the product lock,
the negative-prompt core (Bible §6.6) — is identical in Egypt to every other market. What changes
is **expressive range and emotional register**, never the boundaries. A useful shorthand: KSA is
the quietest register in the rollout, UAE is the most polished, and **Egypt is the warmest** —
each occupies a distinct, legitimate creative lane inside the same unbroken floor.

**What to avoid aesthetically (taste, not just taboo):** hyper-glossy "international stock beauty
ad" polish that reads disconnected from lived reality; anything that looks like a Gulf-luxury-hotel
set transplanted wholesale without the Cairene warmth this section calls for; flat, cold, or
clinical lighting (§6); and — the opposite failure mode — anything *so* expressive it tips into the
"provocative/immodest" zone the floor forbids (§4). The target is warmth, not looseness.

---

## 4. Modesty floor & expressive latitude

The Bible §5 modesty floor — "elegant, modest, aspirational... beauty shown with restraint and
taste... never provocative" — is a **hard floor that does not move between markets**
(`markets.yaml shared.forbid_floor`, `shared.modesty`). What moves is how much *expressive/
relaxed* latitude is available **within** that floor.

| Modesty dimension | KSA | UAE | Egypt (`markets.yaml eg.modesty_level: "moderate-high"`) |
|---|---|---|---|
| **Modesty level label** | `very-high` | `high (cosmopolitan)` | **`moderate-high`** — the most relaxed of the three documented markets, still firmly modest |
| **Skin exposure** | Face, hands, hair only | Face, hands, hair only | **Identical** — face, hands, hair only; `markets.yaml eg.taboos` states this explicitly as "expressive ≠ immodest — keep exposure to face/hands/hair, tasteful framing." No market in this rollout loosens skin exposure past this line |
| **Silhouette** | Abaya-adjacent only | Abaya-adjacent or contemporary modest drape | Modest **everyday-elegant blouse or drape** (`markets.yaml eg.wardrobe_palette.base`) — "a touch warmer & more relatable than Gulf abaya"; never an abaya-coded silhouette by default, but still fully covering below the shoulder line and never fitted/sheer |
| **Expression** | Calm, soft micro-smile only, never coy/wide | Same restrained range as KSA | Wider genuine warmth is authentic and welcome (§3) — a real, open smile reads correctly here where it would read as over-performed in the KSA cut. Still never coy, flirtatious, or performed "at" the camera in a knowing way |
| **Gesture** | Self-care, private, solo | Same as KSA | Same — self-care and private in tone, but delivered with more animated, expressive hand and body language during VO-adjacent beats (a slightly fuller gesture vocabulary than the Gulf's more contained movement) |
| **Company in frame** | No unrelated man and woman together in frame (hard additive taboo) | No explicit additive taboo on record; treated as moot for the flagship's solo-ritual beat sheet | No explicit additive taboo on record either — the flagship's beat sheet is a private solo ritual in Egypt exactly as in every market (Bible §6.1); any family/gathering cutdown briefed later should still route through `21-cultural-expert-gulf` before assuming extra latitude |
| **Jewelry** | Minimal — thin gold, single ring | Delicate gold, slightly more elevated finish | **Warm gold, "a slightly more expressive, everyday finish"** (`markets.yaml eg.wardrobe_palette.jewelry`) — a look that reads as genuinely worn day-to-day rather than a single showcase piece, still never competing with the bottle or the hair for attention (Bible §6.1 frame hierarchy is market-agnostic) |
| **Before/after honesty** | Unbroken-thread device only; never split-screen or shaming | Same | Same — Bible §5's no-fear-mongering rule and the "unbroken thread" continuous-camera device (Bible §6) are identical in every market; Egypt's audience skepticism toward over-promising (§7, §10) makes this discipline *more* commercially important here, not less |

**Read-test heuristic for anyone reviewing an Egypt-bound frame:** would this frame feel warm,
sincere, and relatable to a woman watching on her phone in a Cairo or Alexandria apartment — proud
of the product, never made to feel judged for how her hair looks now, and never made to feel the ad
is "performing" luxury at her? If a frame reads as cold, clinical, or over-polished rather than
warm and modest, it has drifted toward the wrong register for this market, even if it technically
clears the shared floor.

**The hijab/styled-hair A/B pair is not optional in this market either.** Egypt has a large
population of women who wear **الحجاب** (*al-ḥijāb*, "the head covering"), alongside a population
that does not, and both readings are common and unremarkable in everyday Egyptian public life. The
default hero cut keeps hair visible (Bible §5's standard hair-care-creative convention), with the
modest hijab alternative specified at the same production fidelity, exactly as in every other
market (`markets.yaml eg.modest_alternative`).

---

## 5. Wardrobe palette & styling grammar

| Element | KSA (`markets.yaml sa.wardrobe_palette`) | Egypt (`markets.yaml eg.wardrobe_palette`) | Styling note |
|---|---|---|---|
| **Base silhouette** | عباية (*ʿabāya*, "the loose over-garment") in warm neutrals | **Modest everyday-elegant blouse or drape** — "a touch warmer & more relatable than Gulf abaya" | The default Egypt wardrobe reads as aspirational-but-attainable everyday elegance — a beautifully cut modest blouse or a soft draped top — rather than the more formal abaya-coded silhouette the Gulf cuts default to |
| **Color palette** | Warm cream `#FAF6F1` · garnet red `#8E1B1E` · deep garnet `#6E1214` · gold `#C9A227` · soft brown `#6B564E` | Warm cream `#FAF6F1` · garnet red `#8E1B1E` · gold `#C9A227` · **terracotta-warm** · soft brown `#6B564E` (`markets.yaml eg.wardrobe_palette.colors`) | Egypt swaps in a **terracotta-warm** tone in place of the Gulf's deep garnet as the fifth accent — a shade drawn from Cairene sun-baked architecture and desert-adjacent earth tones, staying inside the brand's warm cream/garnet/gold DNA (Bible §3) while reading distinctly local |
| **Fabric** | Matte crepe, silk, fine wool drape; no logos, no loud print | **Cotton/silk drape; approachable premium; still no immodest cut** (`markets.yaml eg.wardrobe_palette.fabric`) | Cotton is the meaningful addition here — it reads as tactile, breathable, and relatable rather than formal-occasion fabric, matching the "approachable premium" register this market rewards over a purely luxury-retail fabric vocabulary |
| **Jewelry** | Minimal — thin gold, single ring | Warm gold; "a slightly more expressive, everyday finish is authentic here" | A woman's actual daily gold — a bit more visible than the Gulf's deliberately minimal styling — reads as sincere rather than distracting in this market, provided it never upstages the bottle or hair in a hero shot |
| **Hair covering default** | Hair-visible default hero; hijab/styled-hair A/B always shipped | Identical — hair-visible default; hijab/styled-hair A/B always shipped (`markets.yaml eg.modest_alternative`) | No change: the Bible §5 mandatory A/B pair is universal, not market-specific |
| **No-logo rule** | Absolute — no visible brand logos on wardrobe | Absolute — same | No exception in any market |

**Checklist for `04-creative-director` / `09-beauty-commercial-director` briefing an Egypt wardrobe
pull:**
- [ ] Silhouette is a modest everyday-elegant blouse or drape — not an abaya-coded formal silhouette
      by default (that is the Gulf register, not Egypt's)
- [ ] Palette stays inside the five Egypt tones above; terracotta-warm replaces deep garnet as the
      fifth accent, not an addition on top of it
- [ ] Fabric may include cotton (unlike the Gulf's matte-crepe/silk/wool-only default) alongside silk
- [ ] Jewelry reads as genuinely worn daily gold, not a single showcase statement piece — and never
      competes with the bottle or the hair for attention
- [ ] No visible logos, wordmarks, or brand hardware, exactly as in every market
- [ ] Both A (hair-visible) and B (hijab) variants are pulled and briefed at full production fidelity

---

## 6. Interior style & environment vocabulary

The Bible §4 hero set — warm cream Moorish/mihrab arch, deep garnet drape, single red hibiscus,
palm frond, pale stone/travertine podium, soft directional window light — is explicitly
**market-agnostic** and ships identically to every market
(`markets.yaml eg.interior_style.hero_set`: "same brand hero set for product/offer beats — market-
agnostic"). In Egypt it reads as an admired, evocative *outside* heritage brought warmly into a
domestic frame — closer to how a Moroccan riad motif might feel featured inside a well-appointed
Cairo home than a native local vocabulary (contrast: it reads as *already native* in UAE, §3). This
dossier's Egypt-specific vocabulary governs the **broader scenes** around that hero set, not the
hero set itself.

| Environment element | KSA broader-scene vocabulary | Egypt broader-scene vocabulary (`markets.yaml eg.interior_style.broader_scenes`) | Contrast note |
|---|---|---|---|
| **Architectural register** | Najdi Gulf-luxury: brass, مشربية (*mashrabiyya*, a carved wood/lattice screen), dates & hibiscus botanicals, Moroccan arch cues | **Warm Cairene/Mediterranean** — مشربية screens, brass, warm terracotta, Islamic-Cairo geometric detail, Nile-warm light | Egypt's own architectural heritage — historic Islamic-Cairo woodwork, geometric tile and lattice detail (the visual language of Cairo's old-city courtyard houses and covered markets) — pairs naturally with the same mashrabiya-screen vocabulary the Gulf uses, because both draw from a shared broader Islamic-architectural tradition; the terracotta and Nile-light tones are what make it read distinctly Egyptian rather than generically Gulf |
| **Light quality** | Soft directional window light; warm; long gentle shadows | **"Warm golden light; lived-in warmth; soft directional, never harsh"** (`markets.yaml eg.interior_style.light`) | The keyword here is *lived-in* — Egypt's broader-scene light should read as a real, warmly-lit home interior at golden hour (evoking the Nile-corniche sunset glow Cairo and Alexandria are both known for) rather than a curated hospitality-suite light rig |
| **Botanical accents** | Dates, red hibiscus, palm frond | Red hibiscus and palm frond carry over (shared with the hero set); terracotta vessels and warm-toned florals extend the palette | Keep botanicals warm and modest in scale — an overly staged floral arrangement reads as imported-luxury rather than lived-in warmth |
| **Seasonal prop vocabulary (Ramadan-specific, see §9)** | — | **فانوس** (*fānūs*, "the traditional Ramadan lantern") is an authentically Egyptian seasonal set-dressing element, iconic to Cairo street and home decor during Ramadan | A فانوس placed softly in a Ramadan-window cutdown's broader scene (never in the locked hero set itself) is a genuinely native, non-devotional seasonal cue — decorative folk tradition, not religious iconography — and reads immediately and warmly as "Egyptian Ramadan" to this audience specifically |
| **Landmark avoidance (hard rule, every market)** | No Kingdom Tower / national-monument backdrops | **No Pyramids of Giza, no Sphinx, no Nile-corniche skyline shot used as an establishing "Egypt tourism" postcard** | Using an identifiable landmark collapses the ad into stock-footage cliché — a known cheap-ad tell (`knowledge/luxury-beauty-ad-language.md`) — and is unnecessary: the brand's own hero set plus the warm Cairene broader-scene vocabulary above is a stronger, product-specific visual signature than any landmark shot |

**What to avoid:** cold, minimalist, or "international hotel lobby" interior styling that erases
the Cairene warmth this section calls for; any devotional staging of the mihrab-arch motif (the
same rule as every market — see §7); and cluttered, market-stall-dense backgrounds that undercut
the calm, considered self-care-ritual mood the flagship beat sheet depends on (Bible §6.1).

---

## 7. Taboos & sensitivities (additive to the Bible §5 floor)

Per-market taboos **add** to `markets.yaml shared.forbid_floor`; they never remove from it
(`markets.yaml routing.hard_rules`). The floor itself — no alcohol cues, no immodesty, no
religious imagery as decoration, no fear-mongering about the body, no fake medical claims, no
pork/non-halal cues, no romantic/dating framing or intimate unrelated-gender free-mixing, no
disrespect to national symbols/flags/leadership — applies in Egypt exactly as it does everywhere
else.

**Egypt-specific additive taboos (`markets.yaml eg.taboos`, expanded):**

| Taboo | Why it matters here specifically | Practical direction |
|---|---|---|
| **Avoid sectarian/religious sensitivity (Muslim–Christian); keep it universal & warm** | Egypt has a significant Christian (predominantly Coptic Orthodox) population alongside its Muslim majority, and the two communities' shared national and cultural life is a point of pride the audience is sensitive about seeing handled well — or clumsily — in advertising | This is *tighter* than the shared floor's general "no religious imagery as decoration," because it is not only about avoiding devotional staging (that rule applies everywhere) but about never letting any prop, set element, or seasonal reference read as favoring or excluding either community. The Bible's own beat sheet and hero set already clear this cleanly — a private self-care ritual with a Moroccan-heritage product carries no sectarian marker at all — so the practical direction is simply: do not introduce one. No crosses, no Islamic calligraphy beyond the market-agnostic architectural motif already cleared in §6, no seasonal tie-in that references one community's holiday without equal, careful treatment of the other's |
| **No political content or national-symbol misuse** | Same category as every market's floor item, but worth naming explicitly given how visible political and national-symbol content is in Egyptian public and broadcast media generally | Keep any national-moment creative warm and generic rather than reaching for flag graphics, government imagery, or any political figure or symbol — the product's story is heritage and self-care, never civic or political messaging |
| **No fake medical/cure claims — Egyptian audiences are skeptical of over-promising** | Egypt's beauty and hair-care retail market (both formal e-commerce and informal social-media sales) carries a well-known volume of miracle-cure oil advertising with exaggerated claims; audiences here have seen this pattern before and are correspondingly more skeptical of hype language than a Gulf audience newer to a given product category might be | Never exceed the Bible §3 four locked claims or the Bible §3 result timelines (softness/shine from first use; less shedding ~3–5 weeks; density ~2–3 months) in any Egypt-bound copy. If anything, this market rewards **understatement and honest proof framing** more than any other — lean into the heritage-authenticity and ingredient-transparency angle (Bible §3's four named ingredients) rather than a louder-claims strategy |
| **Expressive ≠ immodest — keep exposure to face/hands/hair, tasteful framing** | The single most common failure mode when a director over-reads "warmer/more expressive" (§3, §4) as license for more skin or looser framing | Enforce the §4 modesty table literally — "expressive" in this brief means facial warmth, gesture range, and wardrobe relatability, never exposure latitude. The skin-exposure line is identical to KSA and UAE with zero movement |

---

## 8. Dialect & language register

**On-screen text is elegant MSA — فصحى (*fuṣḥā*, "the eloquent/standard register") — in every
market, with no exception** (`markets.yaml shared.language.on_screen_register`). This is identical
in Egypt to every Gulf market. The only place dialect enters is the **optional spoken VO** for
TikTok/Snap cutdowns (Bible §5, `markets.yaml shared.platform_vo_policy.tiktok_snap_alt_vo`:
"market spoken dialect (khaleeji or egyptian)").

| Register layer | Gulf markets (KSA/UAE) | Egypt (`markets.yaml eg.language`) | Note |
|---|---|---|---|
| **On-screen overlays** | MSA, western numerals, `139 ﷼` (KSA) / AED (UAE) | MSA, western numerals, EGP price routed via `07-offer-optimizer` | Never re-translate the locked overlays (Bible §6.3) into dialect for any market — the overlay text is Bible-locked and market-agnostic in wording; only the price/currency token localizes |
| **Primary VO** | MSA (Bible §6.4) | **MSA — identical five-line structure** | The primary cut's VO is the same script in every market, Egypt included; localization is the optional dialect layer below, never a rewrite of the primary VO |
| **Optional spoken VO dialect** | خليجي (*khalījī*, "Gulf") — Najdi/Hijazi (KSA) or Emirati (UAE) register | **مصري** (*miṣrī*, "Egyptian") — `markets.yaml eg.language.spoken_dialect: "egyptian"` | The Egyptian dialect option is described in `markets.yaml eg.language.note` as "pan-Arab familiar and warm" — it is understood essentially everywhere in the Arab world (§2), which makes it a uniquely low-risk dialect choice for a TikTok/Snap VO, but it is used **only** for the Egypt-market cutdown, never for the Saudi cut (`markets.yaml eg.language.forbid_in_saudi_cut: ["Egyptian slang"]`) |

**A note on which Egyptian coloring is the default:** "Egyptian dialect" in Arab media
overwhelmingly means the **Cairene/Delta** register — this is the dialect exported for decades
through Egyptian film, television, and music (§2) and the one this framework's spoken VO defaults
to. **الصعيدي** (*aṣ-Ṣaʿīdī*, "Ṣaʿīdi," the Upper-Egyptian regional coloring) carries a more
traditional, rural texture and is a distinct, deliberately-briefed variant only — never the default,
mirroring how the KSA dossier treats Najdi as default with Hijazi as an available alternate register
rather than a wholesale rewrite.

**Illustrative Egyptian-dialect spoken-VO texture (reference only — never applied to the on-screen
overlay, never a replacement for the locked MSA line, and never used in the Saudi cut):** Cairene
Egyptian Arabic differs from MSA in several recognizable, well-documented ways relevant to voice
direction — a present/habitual **بـ** (*bi-*) verb prefix, negation commonly built with **مش**
(*mish*, "not") or a **ما...ش** circumfix, and the classical **ج** (*jīm*) consonant realized as a
hard "g" sound (the single most recognizable marker of Cairene speech to any Arabic listener). So
the Bible's L1 hook line —

- **MSA (Bible §6.4, locked, on-screen and primary VO):**
  «شعركِ يتساقط… والسبب جذورٌ لا تصلها التغذية.»
  *shaʿruki yatasāqaṭ… wa-s-sababu judhūrun lā taṣiluhā at-taghdhiya*
  ("Your hair is falling… because the roots aren't getting nourishment.")

- **Illustrative Cairene-Egyptian spoken-VO texture (optional TikTok/Snap layer only, Egypt market
  only, never overlay, never a replacement for the locked MSA line above):**
  «شعرِك بيتساقط... والسبب إن الجذور مش واصلها التغذية.»
  *shaʿrik biyitsāʾaṭ… wi-s-sabab inn il-gudūr mish waṣlaha t-taghdhiya*
  (same gloss: "Your hair is falling… because the roots aren't getting nourishment.")

Similarly, the locked CTA's spoken color (never the written line, which ships unchanged) may lean
on the everyday Cairene word for "now" — **دلوقتي** (*dilwaʾti*, "now") — in place of MSA's **الآن**
(*al-ān*) purely as a voice-direction texture note for a talent reading the line aloud, never as a
substitute for the on-screen CTA text «اطلبي الآن — الدفع عند الاستلام» (Bible §6.3).

This is a **texture note for voice direction only**, not a re-lock of Bible copy — the actual
production VO line must still be authored/approved by `20-arabic-copywriter` with
`21-cultural-expert-gulf` sign-off, and should be performed by a native Cairene-Egyptian voice
talent who produces this register naturally rather than an actor forcing it artificially, which
reads as inauthentic instantly to a native-Egyptian ear — exactly the same discipline the UAE
dossier applies to its Emirati *kaskasa* texture note.

**Machine-translation discipline:** every line, in every register, must read as human-authored
premium Arabic — no literal English-syntax carryover, no awkward passive constructions
(`markets.yaml shared.language.forbid_machine_translation`). Every Arabic line in every downstream
artifact carries a Latin transliteration and an English gloss on first use (Bible §2).

**Numerals:** Western numerals (0–9) for all prices and CTAs, mirroring the studio-wide default
(`markets.yaml eg.numerals.preference: "western"`) even though Eastern Arabic-Indic numerals
(٠١٢٣٤٥٦٧٨٩ — الأرقام الهندية, *al-arqām al-hindiyya*, "the Indian numerals") remain genuinely
common in Egyptian print and everyday tradition, more so than in the Gulf's increasingly
western-numeral-only digital retail default. `markets.yaml eg.numerals.rationale` states the
audience is comfortable with **either** system — the studio keeps western numerals on-frame purely
for pan-market consistency with the Bible-locked KSA overlay («139 ﷼ بدل 185»), not because Eastern
Arabic-Indic numerals would read wrong here.

---

## 9. Seasonality calendar & commercial windows

`markets.yaml eg.seasonality` carries the core list; this section elaborates the reasoning and adds
the weekend/social-timing context.

| Window | Arabic | When | Weight | Angle | Gulf equivalent? |
|---|---|---|---|---|---|
| **رمضان** (*ramaḍān*) | رمضان | Annual moving lunar window; next ≈ 8 Feb 2027 (1448 AH), shifts ~11 days earlier yearly | **Highest** | "Egypt's biggest media & commerce moment" (`markets.yaml eg.seasonality`) — post-iftar family/self-care ritual, heritage-recipe warmth, a nighttime-calm cut; the فانوس (*fānūs*, "Ramadan lantern," §6) is an authentic Egyptian seasonal set-dressing cue for a broader-scene cutaway | Same window, same top ranking in every market — but Egypt's note flags that Ramadan TV/social viewership "peaks hard" here specifically, historically the region's single most concentrated media-attention season |
| **عيد الفطر** (*ʿīd al-fiṭr*, "festival of breaking the fast") | عيد الفطر | ≈ 9 Mar 2027 | High | Look-your-best for Eid visits; gifting the 3-pack; density & shine payoff timed for family gatherings | Identical framing and weight in KSA/UAE |
| **عيد الأضحى** (*ʿīd al-aḍḥā*, "festival of sacrifice") | عيد الأضحى | ≈ mid-May 2027 | Medium | Family-gathering grooming; self-care reset | Identical in the Gulf markets |
| **العودة إلى المدارس** (*al-ʿawda ilā al-madāris*, "back to school") | العودة إلى المدارس | September – early October (Egyptian school-year start) | **Medium-high** | Mothers' post-summer routine reset — the audience explicitly includes mothers (Bible §3, reviews referencing daughters) — framed with a **budget-conscious** lens given the price-sensitivity reality (§2, §10) | KSA/UAE run the same angle at "medium" weight, mid-August–September timing; Egypt weighs it slightly higher and shifts the window a few weeks later to match the local school calendar, and explicitly leans budget-conscious rather than purely aspirational |
| **الصيف** (*aṣ-ṣayf*, "summer") / **North Coast season** | الصيف | June – August (heat; the **Sahel**/North-Coast sun-and-sea season) | **Medium-high** | Sun/saltwater/chlorine hair-damage → repair-and-nourish angle; post-beach recovery ritual | Shares the same core hair-stress angle as the Gulf's Summer window, localized to Egypt's specific North-Coast beach-season culture rather than indoor-AC framing |
| **الجمعة البيضاء** (*al-jumʿa al-bayḍāʾ*, "White Friday") | الجمعة البيضاء | November | High | Major COD/e-commerce moment; lead with pack value & free-shipping intent — and, distinctly for Egypt, an explicitly **price-sensitive framing** given the currency reality (§2) | Identical pan-Gulf retail event, but Egypt's note calls out price-sensitive framing specifically, where the Gulf markets can lead more purely on value-versus-luxury positioning |
| **موسم الأفراح** (*mawsim al-afrāḥ*, "wedding season" — the Egyptian phrasing, distinct from the Gulf's موسم الأعراس) | موسم الأفراح | Summer-heavy, plus year-round | Medium | Henna-night tie-in — **الحناء** (*al-ḥinnāʾ*, "henna," a Bible-locked ingredient, §3) — bridal density & shine framing | Same ingredient-driven bridal angle as the Gulf markets, with a distinctly Egyptian name for the season and a less tightly seasonal (more year-round) window than the Gulf's October–March cooler-months concentration |

**Weekend & peak social windows (`markets.yaml eg.weekend`):** the Egyptian weekend is
**Friday–Saturday** (work week Sunday–Thursday) — matching KSA's weekend structure and *differing*
from the UAE's Saturday–Sunday weekend — though some banks and private-sector employers observe
Friday-only. Peak social-media activity runs **evenings 21:00–01:00**, with **Thursday–Friday**
peaking, and late-night activity climbing further during Ramadan — schedule paid social delivery
and organic posting around this window rather than a flat, market-agnostic schedule.

---

## 10. Buying behavior & purchase psychology

| Dimension | Gulf markets (KSA/UAE) | Egypt |
|---|---|---|
| **Price sensitivity** | KSA: value-conscious, −25% pack framing is a primary lever. UAE: less acutely price-sensitive, higher average household income | **Highest price sensitivity of the four-market rollout.** The EGP volatility and inflation context (§2) means the pack-value framing («3-pack = the complete course; single bottle is a trial, the pack is the result,» Bible §3) and the free-shipping promise are not just nice-to-have trust signals here — they are close to load-bearing for the purchase decision. Never present the offer without the value comparison front and center |
| **Skepticism toward claims** | Moderate — audiences newer to the specific product category are more receptive to a confident claims framing within the Bible §3 floor | **Elevated skepticism**, explicitly named in `markets.yaml eg.taboos` — a market saturated with over-promising hair-oil advertising has trained this audience to discount hype. The winning posture is **honest, ingredient-transparent, understated** — lean on the four named ingredients (Bible §3: المشاط/walnut husk, الكركديه الأحمر/red hibiscus, الحناء الطبيعية/natural henna, زيوت نباتية مغذية/nourishing plant oils) and the heritage-recipe story as *proof*, rather than louder claims language |
| **Trust signals that convert** | COD + inspect-before-pay as the primary mechanic (KSA); COD-led with card/digital co-presented (UAE) | COD + inspect-before-pay remain central (§11), but given the skepticism above, **transparent proof mechanics matter more here than in the Gulf** — genuine reviews, the ingredient list, and the heritage story do more conversion work than a purely emotional appeal alone would. Never fabricate a specific review quote or a review-corpus city that the Bible does not name (Bible §3 names Riyadh/Jeddah/Dammam for KSA only — do not invent an Egyptian equivalent without a real corpus) |
| **Competitive exposure** | Moderate (KSA) to high (UAE) exposure to international beauty-DTC advertising | High exposure to a *domestic* volume of similar hair-oil and heritage-remedy advertising specifically — the differentiator here is not "does this look premium enough," it's "does this look honest enough to be different from the noise" |
| **Heritage-authenticity appeal** | Reads as domestically authentic (KSA) or exotic-admired/nostalgic-familiar depending on segment (UAE) | Reads as **nostalgic-familiar and warmly relatable** — a Moroccan grandmothers'-recipe heritage story (Bible §3's «وصفة الجدات», *waṣfat al-jaddāt*) resonates naturally with an Egyptian audience's own strong home-remedy and grandmother-wisdom cultural tradition around hair and beauty care, without needing any market-specific rewrite |
| **Channel behavior** | Meta/TikTok/Snapchat all strong across the Gulf; WhatsApp central for support/confirmation | Meta/TikTok/Snapchat all strong; WhatsApp equally central — and, distinctly, the **phone confirmation call carries more commercial weight** here than anywhere else in the rollout (§11) because of the higher COD-refusal risk this market's cash-economy reality creates |
| **Decision driver** | Solving a visible, felt problem with a trusted heritage remedy at a fair, de-risked price | Same core driver, with price fairness and honest proof weighted even more heavily than in the Gulf — the emotional hook (Bible §6's pain → heritage → transformation spine) still carries the film, but the **offer and trust stack have to close harder** given the elevated skepticism and price sensitivity |

---

## 11. COD norms & buying behavior deep dive

Cash-on-delivery is not a checkout-page footnote in Egypt — it is close to the **only workable
default** given the cash-economy reality named in §2, and it carries meaningfully higher
operational stakes than in the Gulf.

| Payment dimension | KSA (`markets.yaml sa.cod_norms`) | UAE (`markets.yaml ae.cod_norms`) | Egypt (`markets.yaml eg.cod_norms`) |
|---|---|---|---|
| **COD dominance** | Very high — the Bible-locked default and primary trust mechanic | High, but card/digital penetration is meaningfully higher — COD is co-presented, not the only path | **"Very-high — COD is overwhelmingly dominant (cash economy, low card penetration); COD is essential."** Of the three documented markets, Egypt is the one where COD is least optional — there is no meaningful "lead with COD, offer card too" latitude the way there is in UAE |
| **Confirmation call** | Standard practice | Common and expected, less operationally critical | **"CRITICAL"** (`markets.yaml eg.cod_norms.confirmation`) — explicitly named as more important here than in any other market. The call must confirm both intent and delivery address before dispatch |
| **Refusal/return risk** | Not flagged as an elevated risk | Not flagged as an elevated risk | **Explicitly elevated** — `markets.yaml eg.cod_norms.risk_note`: "higher COD refusal risk → a clear, honest offer & confirmation call protect margin; never over-promise" — this directly reinforces §7 and §10's over-promising discipline: an Egyptian buyer who feels an ad oversold the product is measurably more likely to refuse the package at the door, which has real margin consequences in a way it does not in the Gulf's lower-refusal-risk markets |
| **Inspect-before-pay** | Headline trust element | Carries over identically | Carries over identically — **فحص المنتج قبل الدفع** (*faḥṣ al-muntaj qabl al-dafʿ*, "inspecting the product before paying," Bible §3) is genuinely reassuring here, precisely because the audience's elevated skepticism (§10) makes a concrete risk-reversal mechanic more persuasive than an abstract trust claim would be |
| **Creative implication** | The locked flagship CTA ships as-is | Same CTA ships as-is; landing/checkout surfaces card alongside COD | The same locked CTA («اطلبي الآن — الدفع عند الاستلام», Bible §6.3) ships as-is — wording never changes per market — but the **offer copy and confirmation-flow messaging** behind it (owned by `07-offer-optimizer` and fulfillment) should be unambiguous and free of any manufactured urgency, because urgency-driven over-claiming is exactly what elevates refusal risk in this specific market |

**The single clearest operational takeaway for this market:** honest, restrained claims framing is
not just a cultural-fit preference in Egypt — per `markets.yaml eg.cod_norms.risk_note`, it is
directly connected to protecting COD conversion margin. Nowhere else in the four-market rollout is
the link between creative tone and fulfillment economics this explicit.

---

## 12. Delivery expectation

`markets.yaml eg.delivery_expectation` gives the summary; Egypt's delivery infrastructure is
meaningfully more regionally uneven than the Gulf markets', which is worth detailing for
offer-copy and customer-expectation-setting purposes.

| Region | Typical delivery window | Note |
|---|---|---|
| **Greater Cairo (Cairo, Giza, Qalyubia)** | 2–5 business days | Fastest and densest logistics network in the country (`markets.yaml eg.delivery_expectation.coverage`: "Cairo & Alexandria fastest") |
| **Alexandria & the Nile Delta** | 2–5 business days | Second-fastest network; the Delta's dense population corridor supports comparable fulfillment speed to Greater Cairo |
| **Upper Egypt / الصعيد (aṣ-Ṣaʿīd)** | Up to ~1 week | Slower logistics reach into the Nile Valley south of Cairo; set expectations accordingly in any copy that states a delivery timeframe |
| **Remote/frontier governorates** | Up to ~1 week or slightly more | Lowest logistics density; confirm any specific on-frame delivery-speed claim with fulfillment before it ships |

**Framing rule:** the Bible only Bible-locks a delivery promise for KSA (24–48 h major cities, 1–4
business days nationwide, Bible §3 — this exact number is never applied to Egypt copy). Egypt's
delivery-window claims are **market expectations, not Bible-locked promises**
(`markets.yaml eg.delivery_expectation.note`: "expectations are market norms, not a Bible-locked
promise (only KSA times are locked)") — never borrow the KSA number for an Egypt cut, and never
state a faster claim than "2–5 business days Cairo/Alexandria/Delta; up to ~a week Upper Egypt &
remote governorates" without fulfillment sign-off.

---

## 13. Consolidated Do/Don't — the Egypt register at a glance

| DO | DON'T | Section |
|---|---|---|
| Let facial and gestural warmth run fuller and more genuine than the Gulf's restrained micro-smile | Read "expressive" as license for more skin or looser framing — the exposure floor never moves | §3, §4 |
| Style wardrobe as modest everyday-elegant blouse/drape, in the locked warm palette with terracotta-warm as the fifth accent | Default to an abaya-coded silhouette — that is the Gulf register, not Egypt's | §5 |
| Light broader scenes as warm, lived-in, golden-hour Cairene/Mediterranean | Shoot a cold, minimalist, "international hotel lobby" interior | §6 |
| Use a soft فانوس (Ramadan lantern) as an authentic seasonal broader-scene prop during the Ramadan window | Add any devotional imagery — cross, Islamic calligraphy beyond the cleared architectural motif, or any faith-specific marker | §6, §7 |
| Keep every claim inside the Bible §3 four-claim floor, leaning on ingredient transparency and heritage-recipe honesty | Use hype language or exceed the locked result timelines — this audience is specifically trained to discount over-promising | §7, §10 |
| Ship the optional TikTok/Snap VO in Cairene/Delta Egyptian, voiced by a native talent | Force an actor into an artificial dialect performance, or let Egyptian dialect bleed into the KSA cut | §8 |
| Frame the White Friday/Back-to-School windows with explicit price-sensitive, value-forward copy | Lead purely on aspirational luxury positioning without the value comparison front and center | §9, §10 |
| Route every EGP figure through `07-offer-optimizer`; state offer structure only in creative briefs | Fabricate or convert a specific EGP price anywhere in this document, a brief, or copy | §2, §11 |
| Make the confirmation-call and inspect-before-pay mechanics explicit and reassuring | Pair the offer with manufactured urgency — this measurably raises COD refusal risk in this specific market | §11 |
| Use the exact Egypt delivery-region table (§12) when a delivery claim is needed | Borrow the KSA-locked 24–48 h figure, or state a faster/vaguer claim than fulfillment has confirmed | §12 |

---

## 14. Quick-reference checklist (for Stage 10 — Consistency & Negatives)

Before an Egypt-targeted artifact ships to Stage 10, confirm:

- [ ] Facial/gestural warmth reads fuller and more genuine than the KSA reference cut, while skin
      exposure stays strictly face/hands/hair — no loosening of the exposure floor.
- [ ] Wardrobe is a modest everyday-elegant blouse or drape in the Egypt five-tone palette
      (terracotta-warm as the fifth accent), cotton or silk, no logos.
- [ ] Broader-scene lighting and set dressing read as warm, lived-in Cairene/Mediterranean — never
      cold, clinical, or generic-international.
- [ ] Any Ramadan-window broader scene may use a فانوس as an authentic, non-devotional seasonal
      prop; no cross, no faith-specific marker of any kind appears anywhere in frame.
- [ ] No political content, national-symbol misuse, or sectarian-coded element anywhere in frame.
- [ ] Every claim traces to the Bible §3 four-claim floor and the exact result timelines — no
      hype language, no exceeded promise.
- [ ] The hijab/styled-hair A/B pair is specified at full fidelity, exactly as in every market.
- [ ] On-screen text is elegant MSA, western numerals — no Egyptian dialect or slang on-screen, and
      no Egyptian dialect of any kind in a KSA-targeted deliverable.
- [ ] Any optional Cairene-Egyptian spoken VO is voiced by a native talent and changes only the
      spoken color, never the written overlay or the primary MSA VO script.
- [ ] Every Arabic line used is quoted verbatim from Bible §6.3/§6.4, or is clearly labeled
      illustrative reference vocabulary and never promoted to shipped copy without first being
      locked into the Bible.
- [ ] No specific EGP price appears anywhere in the artifact — pricing is routed to
      `07-offer-optimizer`, offer structure only (3-pack, free shipping, COD) in creative briefs.
- [ ] Delivery language matches the Egypt region table (§12) exactly — never the KSA-locked figure,
      never a claim faster than fulfillment has confirmed.
- [ ] Offer/CTA copy is free of manufactured urgency, given this market's explicit COD-refusal-risk
      sensitivity to over-promising (§11).
- [ ] The overall frame passes the §4 read-test: would it feel warm, sincere, and relatable to a
      woman watching on her phone in Cairo or Alexandria — never cold, never over-polished, never
      judgmental of her current hair?

---

## 15. Gulf ⇄ Egypt master contrast table

A single-glance summary of every axis above, using KSA as the strict-reference anchor.

| Dimension | KSA (reference/strictest) | UAE (cosmopolitan middle ground) | Egypt (this dossier) |
|---|---|---|---|
| Modesty level | Very high | High (cosmopolitan) | **Moderate-high (most relaxed of the three)** |
| Wardrobe silhouette | Abaya-adjacent only | Abaya-adjacent or contemporary modest drape | **Modest everyday-elegant blouse/drape** |
| Fabric latitude | Matte only | Satin permitted | **Cotton and silk (approachable premium)** |
| Fifth palette accent | — (deep garnet is core) | Champagne-neutral | **Terracotta-warm** |
| Facial/expressive range | Calm, micro-smile only | Same as KSA | **Wider — fuller, genuine warmth welcome** |
| Interior register | Najdi Gulf-luxury, brass/mashrabiya | Contemporary Gulf luxe, marble/glazing | **Warm Cairene/Mediterranean — mashrabiya, terracotta, Islamic-Cairo detail, Nile-warm light** |
| Production-polish bar | Warm, intimate | Editorial-clean, high benchmark | **Warm and honest over glossy — over-polish reads disconnected here** |
| On-screen language | MSA | MSA (identical) | **MSA (identical)** |
| Spoken VO dialect option | Khaleeji (Najdi/Hijazi) | Khaleeji (Emirati) | **Egyptian (مصري) — Cairene/Delta default** |
| Weekend | Friday–Saturday | Saturday–Sunday | **Friday–Saturday (matches KSA)** |
| National/religious sensitivity focus | Holy-site imagery, mihrab-arch literalism | Same floor, no additive strictness beyond shared | **Sectarian (Muslim–Christian) balance, political-content avoidance** |
| Price sensitivity | Value-conscious | Least price-sensitive of the three | **Highest — EGP volatility drives explicit value-forward framing** |
| Claims skepticism | Moderate | Moderate | **Elevated — audience actively discounts over-promising** |
| Payment default | COD-locked, primary trust mechanic | COD-led, card/digital co-presented | **COD near-exclusive; confirmation call explicitly "CRITICAL"** |
| COD refusal risk | Not flagged as elevated | Not flagged as elevated | **Explicitly elevated — tied directly to over-promising discipline** |
| Delivery window | 24–48 h major cities / 1–4 days nationwide (Bible-locked) | Same/next-day Dubai-Abu Dhabi-Sharjah / 1–3 days Northern Emirates | **2–5 business days Cairo/Alexandria/Delta / up to ~1 week Upper Egypt & remote (market expectation)** |
| Addressable population scale | Near-full population is Arabic-fluent | Narrower slice of a larger, diverse population | **Largest single addressable population in the four-market rollout (105M+)** |
| Landmark/tourism imagery to avoid | Kingdom Tower/national monuments | Burj Khalifa/Palm Jumeirah/skyline | **Pyramids of Giza/Sphinx/Nile-corniche postcard shots** |
| Currency | SAR — the only Bible-locked price | AED — routed via skill 07, never fabricated | **EGP — routed via skill 07, never fabricated; explicitly volatile** |

---

## 16. Applied to the flagship: UNBROKEN THREAD, Egypt cut

Concretely, what changes when `00-orchestrator` routes the locked flagship (Bible §6) through an
Egypt targeting pass:

| Element | Stays identical to the KSA reference cut | Adapts for Egypt |
|---|---|---|
| Beat sheet (§6.1) | Entirely unchanged — same 8 s continuous camera move, same beats, same timings | — |
| Product lock (§4) | Bottle, cap, label, liquid color — unchanged, always | — |
| Hero set | Mihrab arch, garnet drape, hibiscus, palm frond, travertine podium — unchanged | Reads as an admired outside heritage brought warmly into a domestic frame (§3, §6) rather than a locally-native luxury vocabulary |
| On-screen overlays (§6.3) | Wording unchanged | Price token localizes to EGP via skill 07; delivered with the same MSA register |
| Primary VO (§6.4) | Wording unchanged | Performance direction leans toward the wider expressive/warmer emotional range described in §3–§4 |
| Optional TikTok/Snap VO | Structure unchanged | Uses Cairene-Egyptian (مصري) texture (§8) instead of Khaleeji, voiced by a native Egyptian talent |
| Wardrobe | Modesty floor unchanged | Modest everyday-elegant blouse/drape replaces the abaya-adjacent default; terracotta-warm joins the palette (§5) |
| Broader-scene environment | Modesty and negative-prompt core unchanged | Warm Cairene/Mediterranean vocabulary instead of Najdi/Gulf-luxe vocabulary; a فانوس is an available authentic Ramadan-window prop (§6, §9) |
| Claims/offer copy | The four-claim floor and result timelines unchanged | Framing skews explicitly value-forward and understated, given this market's price sensitivity and claims skepticism (§10) |
| CTA | «اطلبي الآن — الدفع عند الاستلام» — wording unchanged | Confirmation-call and inspect-before-pay messaging is emphasized more heavily than in the Gulf, given the elevated COD-refusal-risk context (§11) |
| A/B pair | Both variants ship, full fidelity | — |
| Negative-prompt core (Bible §6.6) | Applied verbatim | — |

**Net takeaway:** the Egypt cut, like the UAE cut, is not a re-shoot or a re-write — it is the same
locked creative with a precisely scoped set of localization deltas: price token, wardrobe/interior
warmth register, optional VO dialect, seasonality flight timing, and — distinctly for this market —
a meaningfully more value-forward, understated claims posture driven by real price-sensitivity and
skepticism dynamics that do not carry the same weight in the Gulf. This is exactly the "one primary
cut, documented per-market deltas" model the Bible and `markets.yaml` both specify (Bible §8,
`markets.yaml routing.hard_rules`).

---

## 17. References

| Reference | What it owns |
|---|---|
| `STUDIO-BIBLE.md` §3–§7 | Product/offer facts, product lock, culture/platform floor, the flagship creative, quality gates — the supreme source of truth |
| `config/markets.yaml` → `markets.eg` | The machine-readable Egypt data block this dossier explains and deepens |
| `config/markets.yaml` → `markets.sa` | The KSA reference block used for every contrast in this document |
| `knowledge/gulf-culture/saudi.md` | The KSA-side deep dossier (companion document) |
| `knowledge/gulf-culture/uae.md` | The UAE-side deep dossier (companion document, cited throughout for the three-way contrast) |
| `skills/21-cultural-expert-gulf/SKILL.md` | The cultural QA gate that consumes this dossier as an optional deep-dive input |
| `skills/20-arabic-copywriter/SKILL.md` | The overlay/VO authoring skill this dossier's dialect notes (§8) feed |
| `skills/07-offer-optimizer/SKILL.md` | Owner of all non-KSA price localization — this dossier never fabricates an EGP number |
| `knowledge/luxury-beauty-ad-language.md` | The craft vocabulary (shot grammar, pacing) referenced in §3's polish-benchmark discussion |
