# Oman — Culture, Modesty & Localization Dossier

### The delta-market deep-dive for زيت المشاط الأحمر (Red Mechat Oil): understated aesthetic, reserve, wardrobe, interiors, taboos, Omani dialect, seasonality, COD trust, and delivery — contrasted against KSA (the strictest read) and UAE (the cosmopolitan read)

> **Knowledge base article — reference material, not a skill.** This is the narrative deep-dive
> that `config/markets.yaml`'s `markets.om.culture_doc_ref` points to: the machine-readable market
> block gives the *data*, this document gives the *why* and the *texture* — idiom, regional nuance,
> taste calibration, and taboo detail beyond what a YAML field can carry. Primary consumer:
> **21-cultural-expert-gulf** (Stage 9 cultural QA and BLOCK authority). Also consumed by
> **20-arabic-copywriter** (register/dialect), **03-marketing-strategist** and
> **07-offer-optimizer** (seasonality/COD/currency framing), **09-beauty-commercial-director**,
> **17-human-realism-director**, **18-environment-realism-director** (wardrobe/interior direction),
> and **27-quality-checker** (Culture/Localization axis, Bible §7). Grounded in `STUDIO-BIBLE.md`
> §3 (product/audience/offer facts), §4 (product lock + hero-environment DNA), §5 (culture/market/
> platform rules), §6 (the flagship **UNBROKEN THREAD** — beats, overlays, VO, negatives), §7
> (quality gates), and `config/markets.yaml markets.om` (the structured Oman block this document
> expands). Read alongside `knowledge/gulf-culture/saudi.md` (the KSA reference dossier this file
> deltas from) and `markets.yaml markets.ae` (UAE data — no standalone UAE dossier is authored yet,
> so UAE contrast points below cite `markets.yaml ae` directly). **When this document and the Bible
> disagree, the Bible wins.** Nothing here invents a product claim, price, ingredient, founding
> story, or new Arabic overlay/VO line — every locked Arabic line quoted below is verbatim from
> Bible §6.3/§6.4; illustrative dialect vocabulary is labeled as such and is never a source for
> shipped copy. **No Omani rial price is stated anywhere in this document** — OMR is not a
> Bible-locked currency (only 139 SAR is, Bible §3); any Oman-market price routes to
> `07-offer-optimizer`, never fabricated here (`markets.yaml om.currency.price_policy`).

---

## 1. Scope — Oman as a delta from the KSA floor, not a separate standard

Oman is a **secondary market** (`markets.yaml meta.market_order: ["sa","ae","om","eg"]`, `om.primary:
false`). The flagship creative (Bible §6) was authored for KSA first; this dossier documents how the
**same locked beat sheet, overlays, and VO** land in Oman, and where the *texture* — wardrobe finish,
interior dressing, pacing of VO delivery, seasonal emphasis — shifts to feel authentically Omani
rather than a generic "Gulf" re-skin.

**The governing rule (inherited from 21-cultural-expert-gulf's Rule 11, applied here):** KSA is read
as the strictest of the four markets; Oman may only *loosen a little within that floor*, never break
it (`markets.yaml shared.forbid_floor`). In practice Oman's `modesty_level` is recorded as **"high
(reserved/understated)"** against KSA's **"very-high"** — a small technical loosening in coverage
latitude — but Oman's **aesthetic** register is, if anything, *more* restrained than KSA's on the
axis of ornamentation and visual volume. Do not read "slightly lower modesty number" as "louder" or
"flashier." It means the opposite: less ornament, quieter color, more negative space, calmer pacing.

**Three-market snapshot (the comparison this whole document threads through):**

| Axis | 🇸🇦 KSA (strictest floor) | 🇦🇪 UAE (cosmopolitan) | 🇴🇲 Oman (reserved/understated) |
|---|---|---|---|
| `modesty_level` | very-high | high (cosmopolitan) | high (reserved/understated) |
| Visual register | restrained maximalism — one hero object, fully lit | polished-modern editorial — a touch more contemporary latitude | quiet luxury — the *most* pared-back of the three; subtlety over flash |
| Wardrobe base | abaya-adjacent, warm neutrals | abaya-adjacent OR contemporary modest drape | abaya-adjacent, **muted/earthy** neutrals, minimal sheen |
| Jewelry | minimal — thin gold, single ring | delicate gold, slightly more elevated finish | Omani silver accent or thin gold; the most restrained of the three |
| Spoken VO dialect | Khaleeji — Najdi/Hijazi register | Khaleeji — Emirati register | Khaleeji-adjacent, **calm/measured**, hype language avoided |
| Currency | SAR — the only Bible-locked price (139 SAR) | AED — routed to skill 07 | OMR — routed to skill 07; high-value, **3-decimal** |
| Delivery norm | 24–48 h major cities (Bible-locked) | same/next-day Dubai/Abu Dhabi/Sharjah (expectation) | 1–2 business days Muscat; 2–5 elsewhere (expectation) |

Sources: `markets.yaml sa`, `markets.yaml ae`, `markets.yaml om`; KSA detail cross-checked against
`knowledge/gulf-culture/saudi.md`.

**What this document does NOT do:** it does not re-state the four product claims, the ingredient
list, or the bottle/label lock — those live in Bible §3–§4 and are never re-litigated here. It does
not write new overlay or VO copy — that is 20-arabic-copywriter's craft, using this document only for
register and taste guidance. It does not state an Omani rial price for the product.

---

## 2. Aesthetic sensibility — "quiet luxury," the most pared-back read in the rollout

If KSA's winning grammar is a quiet boutique-hotel film and UAE's is a polished contemporary editorial,
Oman's is closer to a **private heritage residence at golden hour** — fewer objects in frame, longer
holds, less visual event per second than either of the other two markets.

| Aesthetic principle | What it looks like in frame | Why it lands here, and how it differs from KSA/UAE |
|---|---|---|
| **Restraint upon restraint** | Even fewer competing elements than the already-spare KSA grammar (§2 of `saudi.md`); one hero object, generous negative space, nothing decorative "just because" | Omani luxury taste (bespoke frankincense perfumery, hand-worked silver, plain unembellished dishdasha for men) signals status through material quality and craftsmanship, not visible abundance — the opposite instinct from UAE's more editorial, "more polish reads as more premium" register |
| **Muted, earthy palette over saturated jewel tone** | Warm cream, muted garnet (not KSA's bright garnet/deep-garnet pairing), soft brown, sage green, antique (matte, not shiny) gold (`markets.yaml om.wardrobe_palette.colors`) | Sage green — part of the Bible §3 core brand palette (`#4A6741`) but underused in the KSA/UAE wardrobe tables — reads naturally here, echoing Oman's mountain-and-wadi (valley) landscape rather than the desert-and-gold visual shorthand more associated with KSA/UAE |
| **Matte over sheen** | Matte natural-fiber drape, low-reflectance surfaces, "antique gold" finish rather than a bright polished gold accent (`markets.yaml om.wardrobe_palette.fabric`) | A glossy or high-shine finish reads as try-hard in this market; matte finish is itself the luxury signal |
| **Calm, unhurried pacing — even more than KSA** | Slow-motion holds, deliberate hand movement, real blink/breath (Bible §6.1 TRANSFORMATION beat) land *identically* in footage, but the Omani spoken-VO delivery (§8 below) should feel even more measured and unhurried than the Najdi-leaning KSA reading | `markets.yaml om.language.note`: "Omani register favors calm, measured phrasing; avoid hype — reserve reads as premium here" — this is the single clearest voice-direction delta in the four-market set |
| **Craft-forward texture** | Carved wood, hand-worked silver, woven natural fiber — texture that reads as *made*, not manufactured | Reinforces the "grandmothers' recipe" heritage-trust device (Bible §6) through a distinctly Omani material vocabulary rather than reusing KSA's brass/mashrabiya vocabulary wholesale |
| **Sound-off legibility as understatement, not just compliance** | Overlays alone carry the emotional arc (Bible §5) | Same platform-driven requirement as every market, but here it also matches the taste register: a film that says less, shows more |

**What to avoid aesthetically (taste, not just taboo):** anything that reads as tourist-brochure
"exotic Arabia" (staged camels, oversized ornamental khanjar props, folkloric costume dressing —
see §4 and §5), any UAE-style glossy contemporary-editorial polish transplanted wholesale, neon or
club lighting, cluttered maximalist backgrounds, and fast jump-cut MTV-style editing. None of these
trip the Bible §5 hard forbid list, but all of them read as off-register for this specific taste
culture. Full camera/lighting/motion craft specs live in `knowledge/cinematography-language.md`,
`knowledge/lighting-recipes.md`, and `knowledge/camera-movements.md` — this section states only the
**cultural read** that should shape those craft choices for an Oman-bound cut.

---

## 3. Modesty floor — high (reserved/understated); one notch inside the KSA ceiling

Oman's modesty level is **"high (reserved/understated)"** (`markets.yaml om.modesty_level`) —
technically one notch inside KSA's "very-high" ceiling, in the same band as UAE's "high
(cosmopolitan)" but with the opposite stylistic lean: UAE's headroom is spent on polish, Oman's is
spent on *nothing at all* — the frame stays even quieter than KSA's, not louder.

| Layer | Oman standard | Delta from KSA | Delta from UAE |
|---|---|---|---|
| **Skin exposure** | Face, hands, and hair only — identical floor | No change — this line never loosens in any of the four markets (Bible §5 `forbid_floor`) | No change |
| **Framing subject** | Hair is the hero — texture, movement, macro, silhouette, one tasteful over-the-shoulder reveal (Bible §5) | Identical | Identical |
| **Expression** | Calm confidence; soft micro-smile, real blink, real breath — never wide/toothy or coy | Identical, but the Omani "calm, measured" language note (§2, §8) argues for holding the beat a fraction longer and softer than even the KSA cut | Slightly more restrained than UAE's marginally more editorial energy |
| **Gesture** | Self-care, private, solo — no gesture performed "at" an implied audience | Identical | Identical |
| **Company in frame** | Woman-centered and private; no unrelated man and woman together in frame by default | Identical to KSA's strictest reading | UAE holds the same rule; Oman applies it with the same weight, not a looser one |
| **Jewelry/accessory** | Omani silver accent or thin gold — the **most** restrained of the three markets, not a looser one | KSA allows thin gold/single ring; Oman's silver-or-thin-gold register is, if anything, quieter | UAE explicitly allows "a slightly more elevated finish" — Oman is the opposite direction |
| **Before/after honesty** | The transformation happens inside the unbroken camera thread (Bible §6.1) — never split-screen, never a shaming before-shot | Identical | Identical |

**Read-test heuristic for Oman:** would this frame read as *considered and unhurried* to a woman
watching in Muscat, or in the interior town of **نزوى** (*Nizwā*, "Nizwa" — historically the seat of
Omani craftsmanship, its fort and silver souq a living reference for the "quiet luxury" register
above)? If a frame feels rushed, ornamented, or performative rather than calm and private, it fails
the Omani register even if it would clear the KSA and UAE floors on a strict taboo check alone —
taste, not just compliance, is the bar here.

**The hijab/styled-hair A/B pair is mandatory here exactly as in every market** (Bible §5, `markets.yaml
shared.modesty.always_ship_ab_pair`, `om.modest_alternative`). No market-specific relaxation of this
rule exists; Oman ships the same full-fidelity pair as KSA and UAE.

---

## 4. Wardrobe & the muted, earthy palette

The Oman wardrobe register is **abaya-adjacent in muted, earthy neutrals — understated, never loud**
(`markets.yaml om.wardrobe_palette`). It shares KSA's abaya-adjacent silhouette logic but shifts the
color and finish toward quiet.

| Element | Oman specification | Delta from KSA | Delta from UAE |
|---|---|---|---|
| **Silhouette** | Loose, flowing, abaya-adjacent drape — identical logic to KSA §4 (`saudi.md`) | No silhouette change | UAE additionally permits "contemporary modest drape" as an alternate; Oman stays in the abaya-adjacent register only |
| **Color palette** | Warm cream `#FAF6F1` · **muted** garnet `#8E1B1E` · soft brown `#6B564E` · sage green `#4A6741` · **antique** gold `#C9A227` (`markets.yaml om.wardrobe_palette.colors`) | KSA additionally uses a separate "deep garnet `#6E1214`" shade for depth/contrast; Oman keeps to one muted garnet, plus sage green (unused in the KSA wardrobe table) | UAE adds a "champagne-neutral" tone absent here; Oman's sage green has no UAE equivalent |
| **Fabric** | Matte, natural-fiber drape; **minimal sheen** — the strictest "no shine" instruction of the three markets | KSA allows matte crepe/silk/fine wool (silk can carry a soft natural sheen); Oman dials that down further | UAE explicitly allows silk/satin drape, "refined, editorial" — a directly opposite instinct from Oman's matte-only rule |
| **Jewelry** | Omani silver accent or thin gold; restrained, heritage-leaning (`markets.yaml om.wardrobe_palette.jewelry`) | KSA: thin gold, single ring | UAE: "delicate gold, a slightly more elevated finish" — Oman explicitly does not chase this elevation |
| **Nails/hands** | Natural, unpolished-or-neutral, warm-toned (inherits the shared modesty/model-direction rule, Bible §5) | Identical | Identical |
| **Hijab variant (A/B pair)** | A warm neutral scarf from the *muted* Oman palette (cream/soft-brown/sage), styled elegantly | Same construction as KSA's A/B pair, recolored to the Oman palette | Same construction as UAE's A/B pair, recolored to the Oman palette |

**Costume-drift warning specific to Oman:** avoid literal replication of historical Gulf face-covering
garments (the stiff traditional mask, in Arabic generally **البُرقع** — *al-burquʿ*, "the veil/mask,"
historically worn by older-generation women in parts of the Gulf including Oman) as a "traditional
Omani" wardrobe flourish. The Bible §5 modest hero-glam register calls for **contemporary** modest
elegance, not folkloric costuming — introducing a historical face-mask element would read as staged
ethnography, not a luxury beauty film, and risks trivializing a garment that carries real generational
and regional meaning. Keep wardrobe direction inside the abaya-adjacent, muted-palette register above;
route any drift toward "traditional costume" styling to `09-beauty-commercial-director` /
`17-human-realism-director` for correction.

**Male dress is out of scope by default.** Omani men's traditional dress (the plain white or pastel
**الدشداشة** — *ad-dishdāsha*, "the ankle-length robe" — with the embroidered **الكمّة** — *al-kumma*,
"the embroidered cap" — or the wound **المصر** — *al-miṣar*, "turban") is not relevant to the default
flagship read, which is solo, woman-centered, and private (Bible §5, §6). If a future brief
deliberately introduces a family-context beat, wardrobe direction for any male figure routes through
the same explicit-override process as the KSA gender-mixing rule (`saudi.md` §3) — it is never the
default.

**What to avoid in wardrobe:** any bright, saturated color outside the muted palette above, visible
sheen/shine fabric, statement jewelry (gold or silver), Western fast-fashion silhouettes, and — as
flagged above — literal historical face-covering garments used as a styling prop.

---

## 5. Interior style & set-dressing cues

The **hero set for product/offer beats is fixed and market-agnostic** — it mirrors Bible §4 exactly:
warm cream Moorish/mihrab arch, deep garnet drape, a single red hibiscus, a palm frond, a pale
stone/travertine podium, soft directional window light with long gentle shadows (`markets.yaml
om.interior_style.hero_set`). Do not re-interpret this set per market; it is locked, identically to
KSA and UAE.

For broader scenes (the RITUAL beat's more intimate interior, cutaways, etc.), the Oman register draws
on a distinct **understated Omani-heritage vocabulary**, different in material specifics from both
KSA's Najdi Gulf-luxury cues and UAE's contemporary Gulf-luxury cues:

| Element | Oman interior register | Delta from KSA | Delta from UAE |
|---|---|---|---|
| **Materials** | Carved wood, hand-worked silver, muted earth-tone textile, unlacquered natural stone | KSA: brass fixtures, carved wood, pale stone/travertine, fine textile drape | UAE: marble, brushed gold, floor-to-ceiling contemporary glazing |
| **Light source** | Soft, warm, low-key directional light; gentle shadows; a quiet mood (`markets.yaml om.interior_style.light`) | Same directional-warmth family as KSA's mashrabiya-filtered light, but without the lattice-pattern dappling as a signature cue | UAE explicitly briefs "bright warm luxe; clean" — a higher-key read than Oman's deliberately low-key mood |
| **Scent/mood cue (visual, never literal aroma)** | A **لبان** (*lubān*, "frankincense") mood — implied through soft haze, a resin/ember prop, or warm amber grading, never a literal burning censer as a religious prop (see §7) | No KSA equivalent — this is an Oman-specific heritage cue | No UAE equivalent |
| **Botanicals** | Muted, native-feeling greenery rather than KSA's date-palm/hibiscus accenting, though the hero set's own hibiscus and palm frond stay identical (they are product-lock elements, Bible §4, not market-varied) | KSA broader scenes lean on dates + hibiscus as accent botanicals | UAE broader scenes are architecture-led, botanicals are a minor accent only |
| **Craft/heritage accent** | Nizwa-adjacent craft cues: hand-thrown pottery, woven natural-fiber texture, a **مندوس** (*mandūs*, colloquially "mandoos" — the traditional Omani carved-wood dowry/wedding chest) used as a set-dressing silhouette only, never staged as an actual ritual prop with contents shown or narrated | No KSA equivalent | No UAE equivalent |
| **Scale and clutter** | Spacious, uncluttered, generously lit negative space — even more pared-back than KSA's already-spare instruction | KSA: "a crowded frame reads as a market stall, not a private luxury ritual" — Oman applies this even more strictly | UAE's editorial fullness (marble expanses, glazing) reads as spacious in a different, more architectural way |
| **National/heritage symbol handling** | The **الخنجر** (*al-khanjar*, "the curved ceremonial dagger") is Oman's most recognizable national symbol, traditionally a male ceremonial item worn with formal dress. It may appear as a respectful, incidental heritage/décor reference (e.g., a small silver motif echoed in set trim) but must never be staged as a prop handled by or presented to the female model, and never used decoratively in a way that trivializes its ceremonial status | No direct KSA equivalent (KSA's national-symbol caution is the flag/national emblem, `saudi.md` §6) | No direct UAE equivalent |

**What to avoid:** modern minimalist Scandinavian styling (reads as culturally generic here exactly as
it does in KSA), UAE-style glossy contemporary-editorial interiors transplanted wholesale, an actual
lit incense burner staged as a devotional or ritual object (see §7 — this is a taste caution here,
a hard forbid if it reads as religious-ritual staging), and turning the mandoos chest into a narrated
"reveal" prop (its silhouette is a set-dressing accent, not a story beat).

---

## 6. Taboos & hard forbids

Oman inherits the Bible's shared `forbid_floor` **in full** and adds market-specific tightening on top
(`markets.yaml om.taboos` — additive only, never a loosening).

**Shared floor (all four markets, Bible §5):**

- No alcohol cues (bottles, bars, toasting, wine-toned liquids read as alcohol).
- No immodesty / provocative framing / skin exposure beyond face-hands-hair.
- No religious imagery used as decoration (Qur'anic text, mosque staging, prayer as a prop).
- No fear-mongering about the body (disease-scare framing, shaming before-shots).
- No fake medical claims or cure language beyond the four Bible-locked benefits (Bible §3).
- No pork or non-halal cues.
- No romantic/dating framing or intimate free-mixing of unrelated men and women.
- No disrespect to national symbols, flags, or leadership.

**Oman-specific additive taboos (`markets.yaml om.taboos`):**

| # | Taboo | Why it matters here specifically |
|---|---|---|
| 1 | No ostentation or loud flash — Omani taste values restraint; "quiet luxury" only | This is a taste-and-taboo hybrid unique to Oman in the four-market set: a technically-modest frame that is simply too *loud* (bright saturated color, heavy gold, busy staging) reads as off-register even though it would clear no hard forbid |
| 2 | No disrespect to the Sultan, the flag, or national symbols | Oman's monarchy (Sultan Haitham bin Tariq Al Said, in office since January 2020) and national emblems carry the same respect-floor as KSA's leadership/flag rule, applied to Oman's own symbols specifically |
| 3 | Avoid overt religious framing; heritage cues stay aesthetic (Bible §5) | Identical instruction to the shared floor, restated at the market level because the frankincense/incense-mood cue (§5 above) sits close enough to devotional practice to need an explicit reminder |
| 4 | Keep exposure to face/hands/hair; understated wardrobe | Restates §3/§4 above as a hard floor, not a preference |

**Additional Oman-specific notes not yet itemized in `markets.yaml` (elaboration, not new rule,
matching the convention `saudi.md` §6 uses for its own additive detail):** Oman marks **يوم النهضة**
(*yawm an-nahḍa*, "Renaissance Day," 23 July — commemorating the start of the modern national
renaissance in 1970) as a date of genuine national significance distinct from the Bible-adjacent
"Oman National Day" window already carried in `markets.yaml om.seasonality` (18 November). This
document notes Renaissance Day here as a **national-sensitivity date to handle with care** — any
creative touching it must stay tasteful and non-political, mirroring the National Day handling
already specified — but it is **not currently a ranked commercial seasonality window** in the
`markets.yaml om` data, and no weight or angle should be assumed for it until added there.

---

## 7. Religious sensitivity — the shared floor, applied with Oman's own texture

Oman is a predominantly Muslim country (majority Ibadi, with substantial Sunni and Shia communities)
and observes the same five daily prayers and Friday communal prayer as the other three markets. The
Bible §5 religious-sensitivity floor applies here with full force and without any market-specific
loosening — Oman does not get a lighter religious-content standard than KSA or UAE.

| Check | Rule | Oman-specific texture |
|---|---|---|
| **The mihrab-arch hero set** | Exactly the KSA/UAE-shared rule (Bible §4, `saudi.md` §7): the "Moorish/mihrab" arch is an **architectural motif only** — no qibla-direction implication, no prayer rug, no minbar, no Qur'anic calligraphy, no adhan audio cue | Identical handling in Oman; the arch silhouette reads as decorative Moroccan-Andalusian design across the whole Gulf, Oman included — the gate does not loosen or tighten by market |
| **Frankincense/incense mood** | The **لبان** (*lubān*) mood cue (§5 above) must stay a warm-light, ambient, or resin-prop visual cue — never a lit censer staged as if mid-ritual, and never paired with prayer gesture or devotional framing | This is Oman's own version of the "architecture is not devotion" caution (`saudi.md` §7, `21-cultural-expert-gulf` Rule 8) — the risk vector here is a scent-culture cue drifting into ritual staging, rather than the arch motif itself |
| **Holy-site imagery** | Never depict, imply, or use as backdrop any mosque interior, minbar, prayer scene, or clergy figure | Same shared-floor rule as every market (Bible §5) |
| **Ramadan/Eid tone** | Seasonal cuts may reference the ritual/gifting *mood* of **رمضان** (*ramaḍān*) or **عيد الفطر** (*ʿīd al-fiṭr*, "the festival of breaking the fast") but must stay "spiritual-adjacent," never devotional decoration (`markets.yaml om.seasonality`) | Identical instruction to KSA/UAE; Ramadan is Oman's **highest**-weighted window too (§9 below) |
| **National Day / Renaissance Day sensitivity** | Tasteful, non-political, respectful of the Sultan and national symbols (§6 above) | Distinct from religious sensitivity but held to the same "handle with more care than a generic hook" standard |
| **Halal/finance framing** | The offer is inherently interest-free cash-on-delivery — **الدفع عند الاستلام** (*ad-dafʿ ʿind al-istilām*, "cash on delivery / payment on receipt," Bible §3). Never introduce installment or "buy now pay later" language that could read as **ربا** (*ribā*, "usury" — a hard religious-financial taboo) | Identical rule to every market |

**Practical implication:** because Oman's own "quiet luxury" aesthetic naturally pulls toward warm,
ambient, softly-lit staging, reviewers should apply *extra* scrutiny — not less — to any prop or
lighting choice that could be misread as devotional (a lit incense vessel, a softly-glowing niche) even
though the *intent* is purely atmospheric. The visual grammar that makes Oman's creative feel premium
is close enough to devotional visual grammar that this deserves a second look, the same way KSA's
mihrab-arch set does (`saudi.md` §7).

---

## 8. Dialect & language register — Omani Arabic, the Muscat/interior/Dhofar spread, and the MSA-lead rule

**The on-screen register is always elegant MSA (فصحى, *fuṣḥā*, "the eloquent/standard register") — no
exceptions, in every market, including Oman** (`markets.yaml shared.language.on_screen_register`;
Bible §5). Dialect is a **spoken-VO-only** option, offered for the TikTok/Snap variant, and never
appears as on-screen text — identical rule to KSA and UAE.

**Oman's spoken-dialect umbrella is recorded as broadly Khaleeji-adjacent** (`markets.yaml
om.language.spoken_dialect: "khaleeji"`), but Omani Arabic is linguistically more internally diverse
than either KSA's Najdi/Hijazi spread or UAE's Emirati register, because of the country's geography:

| Region | Dialect coloring | Register feel | Studio usage |
|---|---|---|---|
| **Muscat & the northern coast** | Closest to mainstream Gulf **خليجي** (*khalījī*, "Gulf") Arabic, broadly intelligible pan-Gulf | Cosmopolitan, capital-city register; the natural default for a premium pan-Gulf VO reading | **Default** for the Oman spoken-VO variant — most consistent with the studio's Khaleeji-VO convention used across KSA/UAE/Oman |
| **Interior towns (Nizwa, Bahla, and the Dakhiliyah region)** | A more traditional, measured Omani coloring, still Khaleeji-adjacent but with distinct local vocabulary and a slower, more deliberate cadence | Heritage-forward, unhurried — pairs naturally with the "calm, measured, avoid hype" instruction (`markets.yaml om.language.note`) | An available alternate reading when a brief specifically wants maximum heritage warmth |
| **Dhofar / Salalah (the south)** | **اللهجة الظفارية** (*al-lahja aẓ-ẓofāriyya*, "the Dhofari dialect") — meaningfully more distinct from mainstream Gulf Arabic than any KSA or UAE regional variant, shaped by the region's separate South-Arabian linguistic heritage | Distinctive enough that it risks reduced pan-Gulf intelligibility if used for on-screen or primary VO content | **Not used** for the studio's spoken-VO variant — Dhofar/Salalah is referenced only as a *visual* seasonal cue (the khareef monsoon, §9 below), never as a dialect source, to protect pan-market intelligibility |

`markets.yaml om.language.formality` states "MSA-lead" — in practice, the studio's optional Khaleeji
VO for Oman defaults to the **Muscat-coastal** coloring (broadly intelligible, cosmopolitan-capital
register) with the interior's more traditional cadence as an available alternate, exactly mirroring
how KSA defaults to Najdi with Hijazi as an alternate (`saudi.md` §8) — never a wholesale dialect swap
of the script, and Dhofari phrasing is never introduced into shipped copy.

**Hard rule, same weight as KSA/UAE:** dialect never appears as on-screen text; a Khaleeji VO line
belongs strictly to its own market's file (Bible §5, `21-cultural-expert-gulf` Rule 7). No
`forbid_in_saudi_cut`-style list exists for Oman in `markets.yaml` because Oman's spoken variant is
already Khaleeji-family and does not carry KSA's specific Darija/Egyptian-slang exclusion concern —
but the underlying discipline (never let this market's dialect bleed into another market's file) is
identical.

**The core delivery instruction that most distinguishes Oman from KSA and UAE:** *calm, measured
phrasing; avoid hype* (`markets.yaml om.language.note`). Where a Najdi-leaning KSA reading is formal
and warm and a Hijazi-leaning reading adds cosmopolitan warmth (`saudi.md` §8), the Omani reading
should feel the most unhurried and understated of the three — reserve itself is the premium signal,
not warmth or polish.

**Illustrative register vocabulary (reference only — never promoted to shipped copy without first
being locked into the Bible, matching the convention in `knowledge/beauty-hair-marketing.md` §6 and
`saudi.md` §8):** a Muscat-coastal spoken reading of the locked line **«اطلبي الآن — الدفع عند
الاستلام»** (*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — cash on delivery," Bible §6.3)
would carry the same words as the KSA/UAE readings, but with a noticeably slower pace and a softer,
more even intonation — closer to a considered statement than an invitation to act quickly. **The
written line itself never changes** — only the spoken pacing and color of the optional dialect VO
variant does, and only for TikTok/Snap, never for the on-screen overlay.

**Machine-translation discipline:** every line, in every register, must read as human-authored premium
Arabic — no literal English-syntax carryover, no awkward passive constructions (`markets.yaml
shared.language.forbid_machine_translation`). Every Arabic line in every downstream artifact carries a
Latin transliteration and an English gloss on first use (Bible §2).

**Numerals:** Western numerals (0–9) for all prices and CTAs (`markets.yaml om.numerals.preference:
"western"`) — identical to KSA and UAE. The one Oman-specific numeral note is currency-format, not
digit-system: **الريال العُماني** (*ar-riyāl al-ʿumānī*, "the Omani rial") subdivides into **بيسة**
(*baysa*, "baisa" — 1,000 baisa = 1 rial) and is conventionally displayed to **three decimal places**
(`markets.yaml om.currency.decimals: 3`), unlike SAR/AED/EGP's two-decimal display. This is a display
convention only — no OMR price is stated anywhere in this document (see §1).

---

## 9. Seasonality calendar — commercial windows ranked by weight

Windows below carry the exact dates and weights from `markets.yaml om.seasonality`; angles are
elaborated here with the reasoning behind each ranking and, where useful, contrasted against the KSA
calendar (`saudi.md` §9).

| Window | Arabic | When | Weight | Creative angle | Delta from KSA |
|---|---|---|---|---|---|
| **Ramadan** | رمضان (*ramaḍān*) | Annual moving lunar window; next ≈ 8 Feb 2027 (1448 AH), shifting ~11 days earlier each Gregorian year — verify by sighting | **Highest** | Calm post-iftar self-care ritual; heritage authenticity («وصفة الجدات», *waṣfat al-jaddāt*, "the grandmothers' recipe"); an **understated** nighttime cut — hold the pacing calmer than the KSA equivalent | Same top ranking as KSA, but the Oman angle explicitly leans "understated," matching §2's aesthetic instruction, where the KSA angle can carry slightly more heritage-warmth energy |
| **Eid al-Fitr** | عيد الفطر (*ʿīd al-fiṭr*) | ≈ 9 March 2027, the day after Ramadan ends | **High** | Quiet-elegant look for Eid; gifting the 3-pack | KSA frames this as "look-your-best for Eid"; Oman's framing is deliberately quieter ("quiet-elegant"), consistent with §2 |
| **Oman National Day** | العيد الوطني العُماني (*al-ʿīd al-waṭanī al-ʿumānī*) | 18 November (annual, fixed; 18–19 Nov holidays) | **High** | National warmth + heritage pride; understated, respectful; a strong retail moment | Structurally parallel to KSA's Saudi National Day (23 September) and Founding Day (22 February) — Oman's own national-symbol handling rules apply (§6, §7) |
| **White Friday** | الجمعة البيضاء (*al-jumʿa al-bayḍāʾ*) | November (the region's Black-Friday equivalent) | **Medium-high** | COD/e-commerce push; lead with the 3-pack value and free-shipping intent, framed with Omani restraint (not a hard-sell tone) | KSA ranks White Friday **High**; Oman ranks it a notch lower (**medium-high**) — still a genuine push window, but tonally softened per §2's restraint instruction |
| **Summer** | الصيف (*aṣ-ṣayf*) | June – August (heat/humidity on the coast); the **خريف ظفار** (*kharīf Ẓofār*, "the Dhofar khareef/monsoon," roughly June–September) brings seasonal greenery and heavy domestic tourism to Salalah in the same window | **Medium** | Humidity/sun hair-stress → nourish/repair angle; the Salalah khareef season adds an optional travel/self-care beat (visual reference only — never a dialect source, §8) | KSA's summer angle is "sun, chlorine, saltwater, AC-dryness" at **medium-high**; Oman's is ranked **medium** with the added, market-unique khareef-season travel texture |
| **Eid al-Adha** | عيد الأضحى (*ʿīd al-aḍḥā*) | Annual moving window, ≈ mid-May 2027 (10 Dhul-Hijjah) | **Medium** | Family-gathering grooming; heritage self-care reset | Same ranking and similar angle to KSA, without KSA's Hajj-season-specific framing (Bible §5's Hajj/holy-site caution still applies in full, §7 above) |
| **Back-to-School** | العودة إلى المدارس (*al-ʿawda ilā al-madāris*) | Late August – September | **Medium** | Mothers' post-summer routine reset — the audience explicitly includes mothers (Bible §3) | Same ranking and angle logic as KSA |

**Wedding Season is not currently a ranked window in the Oman data.** KSA, UAE, and Egypt all carry a
"Wedding Season" seasonality entry tied to the henna ingredient (**الحناء الطبيعية**, *al-ḥinnāʾ
aṭ-ṭabīʿiyya*, "natural henna," a locked Bible §3 ingredient); `markets.yaml om.seasonality` does not
yet include one. The henna-night creative connection remains valid **evergreen** brand messaging for
Oman (the ingredient fact does not change by market), but it should not be treated as a ranked,
weighted seasonal push here until `markets.yaml` is updated to add it.

**Peak posting/social windows (`markets.yaml om.weekend`):** Friday–Saturday weekend (Sunday–Thursday
work week, identical structure to KSA), weekday evenings as the general peak, Thursday–Friday evenings
peaking further, with late-night activity climbing during Ramadan — structurally identical to the KSA
pattern (`saudi.md` §9), just applied to Oman's own calendar above.

---

## 10. COD trust & buying behavior

Cash-on-delivery is the dominant, trusted payment mechanic in Oman, exactly as in KSA and UAE, but the
Oman market carries its own scale and service-touch characteristics (`markets.yaml om.cod_norms`).

| Behavior | Oman norm | Delta from KSA | Delta from UAE |
|---|---|---|---|
| **Payment default** | COD — **الدفع عند الاستلام** (*ad-dafʿ ʿind al-istilām*) — dominance recorded as **"high"** (`markets.yaml om.cod_norms.dominance`) | KSA records dominance as **"very-high"** (the Bible-locked default) | UAE records dominance as **"high"**, same band as Oman, with a note that card/digital penetration is comparatively higher |
| **Order volume / service model** | Smaller order volumes, **higher touch** per order (`markets.yaml om.cod_norms.confirmation`) | KSA's higher volume supports a more standardized confirmation-call flow | UAE's higher digital penetration shifts some volume off pure-COD flows |
| **Inspect-before-pay** | **فحص المنتج قبل الدفع** (*faḥṣ al-muntaj qabl al-dafʿ*, "inspecting the product before paying") carries from the shared offer structure (`markets.yaml shared.offer_structure.inspect_before_pay`) | Identical trust element, same wording | Identical trust element, same wording |
| **Confirmation call** | Phone confirmation before dispatch is standard, and — because of the smaller, higher-touch order profile — this human touchpoint is a genuinely meaningful trust signal, not a formality | Same mechanic, larger scale | Same mechanic, plus WhatsApp/digital alternates common in UAE |
| **Decision-maker & address** | The buyer is addressed in second person feminine throughout, exactly as in every market (Bible §6.3–§6.4 locked lines are never re-gendered) | Identical | Identical |
| **Proof mechanics** | The Bible's 4.8/5 rating and Riyadh/Jeddah/Dammam review-city references (Bible §3) are **KSA-specific** and must never be implied to be Oman reviews; do not invent Muscat/Nizwa/Salalah review quotes that do not exist in the Bible | KSA's three named cities are a Bible-locked fact for KSA only | Same caution applies to UAE — no city-specific review text exists outside the Bible's KSA citation |
| **Mobile-first consumption** | Vertical, sound-optional, scroll-driven discovery on Meta/TikTok/Snap (Bible §5 platform rules) | Identical | Identical |

**Review-corpus tone (pattern, not fabricated quotes):** the Bible states a rating and review-city
detail for KSA only; this document does not extend that specific proof point to Oman. Where an
Oman-bound artifact needs a tone reference for testimonial-style copy, use the same *pattern*
described in `saudi.md` §10 (felt-timeline emphasis, heritage/family framing, relief at the
COD/inspect-before-pay mechanic) **without** attaching it to a specific Omani city or inventing a
rating figure that is not in the Bible.

---

## 11. Delivery expectation

| Field | Oman value | Source |
|---|---|---|
| **Delivery window** | 1–2 business days in Muscat; 2–5 business days elsewhere (interior governorates and Dhofar/Salalah take longer) | `markets.yaml om.delivery_expectation.window` — a market **expectation**, not a Bible lock |
| **Coverage** | Muscat fastest; interior and Dhofar longer | `markets.yaml om.delivery_expectation.coverage` |
| **Shipping cost** | Free-shipping intent carries from the shared offer structure; confirm with fulfillment before stating on-screen | `markets.yaml om.delivery_expectation.shipping`, `shared.offer_structure.shipping_intent` |
| **Proof** | No Oman-specific rating/review-city figure exists in the Bible — do not fabricate one (§10 above) | — |
| **SKU** | Not Bible-locked for Oman — the Bible's `SA04050100M300` SKU is KSA-specific (Bible §3) | — |

**Only KSA carries a Bible-locked delivery figure** (Bible §3, `saudi.md` §11). Oman's 1–2/2–5 business
day figures are the studio's documented market **expectation**, not a locked promise — never state
them with the same certainty as the KSA figure, and never imply the KSA delivery window applies to
Oman or vice versa.

---

## 12. Localization notes — how Oman deltas from the KSA reference cut

Oman is **not** the reference cut (KSA is, Bible §6, `saudi.md` §12) — it is a documented **delta**.
This is the practical checklist for keeping any Oman-bound artifact correctly adapted rather than
either a blind copy of the KSA cut or an unmoored reinterpretation.

- **Reproduce Bible §6 verbatim where it is market-agnostic.** Do not re-translate the six locked
  overlays (§6.3) or the five VO lines (§6.4) for the Oman cut — the *words* were authored for KSA and
  ship unchanged; only the **optional spoken VO's pacing and color** may shift (§8 above).
- **Currency displays as OMR, 3-decimal, never stated as a specific price in this document or any
  knowledge doc.** The on-frame price for an Oman-targeted cut is set by `07-offer-optimizer`, never
  fabricated in config or knowledge material (`markets.yaml om.currency.price_policy`, §1 above).
- **Hero set stays identical to Bible §4** — the warm cream Moorish/mihrab arch, garnet drape, red
  hibiscus, palm frond, travertine podium, soft directional light. Market-agnostic by design, exactly
  as in KSA and UAE.
- **On-screen text is elegant MSA in western numerals.** The optional TikTok/Snap VO defaults to a
  Muscat-coastal Khaleeji reading, calm and measured, with the interior's more traditional cadence as
  an available alternate; Dhofari phrasing is never used for shipped VO (§8).
- **Lead emotion: hope + restored femininity; secondary: heritage trust** (Bible §6 emotional spine) —
  unchanged from KSA; Oman does not re-order the emotional arc, only its pacing and visual restraint.
- **Always ship the hijab/styled-hair A/B pair**, recolored to the Oman muted palette (§4 above) — this
  is checked on every run, identically to KSA and UAE, per `21-cultural-expert-gulf` Rule 5.
- **Dial the visual and vocal energy down from the KSA baseline, not up.** Where a hesitation in KSA
  resolves toward "more conservative," a hesitation in Oman resolves toward "quieter and calmer" — less
  color saturation, less ornament, slower VO pacing, more negative space. This is the single most
  actionable localization instruction in this document.
- **Treat frankincense/silver/Nizwa-craft cues as the market's own heritage vocabulary**, not a
  substitute for KSA's brass/mashrabiya vocabulary or UAE's marble/glass vocabulary — reusing another
  market's interior language wholesale under-serves the Oman-specific heritage-trust connection.
- **Never state or imply an Omani rial price.** Any numeric offer detail for Oman routes through
  `07-offer-optimizer`; this document and every other knowledge doc stay price-silent for Oman.

---

## 13. Consolidated Do/Don't — Oman vs KSA/UAE at a glance

| DO | DON'T | Section |
|---|---|---|
| Hold even more negative space and fewer competing objects than the KSA frame | Fill the frame with decorative "Arabia" flourishes (staged khanjar, folkloric costume) | §2, §4, §5 |
| Use the muted palette — cream, muted garnet, soft brown, sage green, antique gold | Reuse KSA's brighter garnet/deep-garnet pairing or UAE's glossy champagne-neutral wholesale | §2, §4 |
| Keep fabric matte with minimal sheen | Use silk/satin sheen the way the UAE wardrobe register explicitly allows | §4 |
| Ship the hijab/styled-hair A/B pair at full fidelity, recolored to the Oman palette | Treat the B-variant as a KSA copy-paste with the wrong palette | §3, §4, §12 |
| Reference frankincense, silver, and Nizwa craft cues as ambient heritage texture | Stage a lit incense vessel as if mid-ritual, or hand a khanjar to the model as a prop | §5, §7 |
| Keep the hero set identical to Bible §4, architecture-only | Add Qur'anic text, a prayer object, or qibla-direction staging to the arch | §5, §7 |
| Deliver the optional spoken VO calm, measured, unhurried | Deliver it with KSA's or UAE's relatively more energetic pacing | §2, §8 |
| Default the spoken-VO dialect to the Muscat-coastal Khaleeji reading | Introduce Dhofari phrasing into shipped copy | §8 |
| Rank Ramadan highest and White Friday medium-high, per the Oman seasonality table | Assume KSA's exact weights (White Friday High) transfer unchanged | §9 |
| Treat the henna/Wedding-Season angle as evergreen messaging only | Present it as a ranked, weighted seasonal push for Oman | §9 |
| State delivery as a market expectation (1–2 days Muscat / 2–5 elsewhere) | State it with Bible-lock certainty, or imply the KSA delivery window applies | §11 |
| Route any Oman price to `07-offer-optimizer`, 3-decimal OMR aware | State or imply a specific Omani rial price anywhere in this document or derived copy | §1, §8, §11, §12 |
| Handle National Day (18 Nov) and Renaissance Day (23 Jul) with the same respectful, non-political care as KSA's National/Founding Days | Use flag, Sultan, or national-emblem imagery as decorative filler | §6, §7 |

---

## 14. Quick-reference checklist (for any skill drafting an Oman-bound frame, line, or beat)

Before an Oman-targeted artifact ships to Stage 10 (Consistency & Negatives), confirm:

- [ ] Light is warm, low-key, and directional; the frame holds even more negative space than the KSA
      cut — no flat/cold studio look, and no UAE-style high-key polish transplanted wholesale.
- [ ] Wardrobe is abaya-adjacent, in the muted Oman palette (cream, muted garnet, soft brown, sage
      green, antique gold), matte finish, minimal sheen, no logos or loud print.
- [ ] Jewelry is Omani silver accent or thin gold only — the most restrained reading of the three
      markets, never elevated toward UAE's "more polish" instinct.
- [ ] Hair — not body — is the visual subject at every beat; framing is tasteful, never body-forward.
- [ ] No unrelated man and woman appear together in frame without an explicit, deliberately-briefed
      family-context override.
- [ ] The hijab/styled-hair A/B pair is specified at full fidelity, recolored to the Oman palette, not
      a KSA copy-paste.
- [ ] The mihrab-arch hero set carries no Qur'anic text, prayer object, qibla staging, or
      call-to-prayer audio.
- [ ] Any frankincense/incense-mood cue stays ambient (haze, resin prop, warm grading) — never a lit
      censer staged mid-ritual.
- [ ] The khanjar (if referenced at all) appears only as an incidental heritage-décor motif — never
      handled by or presented to the female model, never a narrated prop.
- [ ] No historical Gulf face-covering garment is introduced as a wardrobe "traditional Omani"
      flourish.
- [ ] Any Ramadan/Eid or National Day/Renaissance Day tie-in stays spiritual-adjacent or
      heritage-adjacent and non-political — never devotional decoration, never decorative misuse of
      national symbols.
- [ ] No financing/installment language that could read as ribā-adjacent; the offer stays exactly COD,
      inspect-before-pay, free-shipping intent, 3-pack (Bible §3 structure; no OMR figure stated).
- [ ] On-screen text is elegant MSA, western numerals — no Dhofari or other dialect phrasing on-screen.
- [ ] Any optional spoken VO defaults to the Muscat-coastal Khaleeji reading, calm and measured,
      never the KSA/UAE pacing transplanted unchanged.
- [ ] Every Arabic line used is quoted verbatim from Bible §6.3/§6.4, or is clearly labeled
      illustrative reference vocabulary and never promoted to shipped copy without first being locked
      into the Bible.
- [ ] Delivery language is stated as a market expectation (1–2 business days Muscat / 2–5 elsewhere),
      never with Bible-lock certainty and never implying the KSA window.
- [ ] No specific Omani rial price is stated anywhere in the artifact — numeric offer detail is routed
      to `07-offer-optimizer`.
- [ ] The overall frame passes the §3 read-test: does it feel calm, unhurried, and quietly considered —
      the most pared-back read of the three Gulf markets — rather than a louder KSA/UAE frame with the
      palette swapped?
