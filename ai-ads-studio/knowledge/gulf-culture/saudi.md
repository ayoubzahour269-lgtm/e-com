# Saudi Arabia (KSA) — Culture, Modesty & Localization Dossier

### The primary-market deep-dive for زيت المشاط الأحمر (Red Mechat Oil): aesthetics, modesty floor, wardrobe, interiors, taboos, dialect, seasonality, COD trust, and delivery — mapped to UNBROKEN THREAD

> **Knowledge base article — reference material, not a skill.** This is the narrative deep-dive
> that `config/markets.yaml`'s `markets.sa.culture_doc_ref` points to: the machine-readable market
> block gives the *data*, this document gives the *why* and the *texture* behind it — idiom,
> regional nuance, review-corpus tone, and taboo detail beyond what a YAML field can carry. Primary
> consumer: **21-cultural-expert-gulf** (Stage 9 cultural QA and BLOCK authority). Also consumed by
> **20-arabic-copywriter** (register/dialect), **03-marketing-strategist** and
> **07-offer-optimizer** (seasonality/COD framing), **09-beauty-commercial-director**,
> **17-human-realism-director**, **18-environment-realism-director** (wardrobe/interior direction),
> and **27-quality-checker** (Culture/Localization axis, Bible §7). Grounded in `STUDIO-BIBLE.md`
> §3 (product/audience/offer facts), §4 (product lock + hero-environment DNA), §5 (culture/market/
> platform rules), §6 (the flagship **UNBROKEN THREAD** — beats, overlays, VO, negatives), §7
> (quality gates), and `config/markets.yaml markets.sa` (the structured KSA block this document
> expands). **When this document and the Bible disagree, the Bible wins.** Nothing here invents a
> product claim, price, ingredient, founding story, or new Arabic overlay/VO line — every locked
> Arabic line quoted below is verbatim from Bible §6.3/§6.4; illustrative dialect vocabulary is
> labeled as such and is never a source for shipped copy.

---

## 1. Scope — why KSA is the reference market, not just "a" market

Saudi Arabia is the **primary market** (`markets.yaml meta.primary_market: "sa"`) and the market
the flagship creative was authored **for**, not adapted **to** (`markets.sa.mirrors_flagship:
true`). Every beat, overlay, and VO line in Bible §6 is the KSA cut by default. This dossier exists
to give every downstream skill the cultural texture that makes that cut *read right* to a woman in
Riyadh, Jeddah, or Dammam — not just technically compliant with the Bible's forbid list, but
genuinely resonant with how she sees herself, her home, and her heritage on screen.

**The governing rule for this document (inherited from 21-cultural-expert-gulf's Rule 11):** KSA
is read as the **strictest of the four markets**. What passes here passes everywhere else in the
Gulf rollout; the UAE, Oman, and Egypt dossiers document *deltas* from this floor, never a
separate standard. Treat every section below as the ceiling other markets loosen slightly from,
never the floor they tighten toward.

**What this document does NOT do:** it does not re-state the four product claims, the ingredient
list, or the bottle/label lock — those live in Bible §3–§4 and are never re-litigated here. It does
not write new overlay or VO copy — that is 20-arabic-copywriter's craft, using this document only
for register and taboo guidance.

---

## 2. Aesthetic sensibility — what "premium" reads as in KSA

Saudi luxury-beauty taste, especially for a heritage-positioned product like Mechat, rewards
**restraint over spectacle**. The winning visual grammar is closer to a quiet boutique-hotel film
than a high-energy Western beauty commercial:

| Aesthetic principle | What it looks like in frame | Why it lands here |
|---|---|---|
| **Restrained maximalism** | One hero object (the bottle, the flower, the strand) fully lit and centered; everything else recedes into soft shadow | Saudi luxury cues (bespoke abaya houses, high-end oud perfumery, heritage jewelry) sell through scarcity of gesture, not density of detail |
| **Warm, low-key directional light** | Soft window light, long gentle shadows, golden-hour warmth (Bible §4, §6.5) — never flat studio glare or cold blue light | Cold/clinical light reads as a pharmacy or a lab, undermining the "grandmothers' recipe" heritage-trust device (Bible §6) |
| **Macro tactile texture** | Comb teeth, oil viscosity, hair strand sheen, fabric weave — the camera lingers on *touch* | A heritage remedy sells on sensory credibility; texture is the visual proof-of-authenticity the audience can't get from a claim |
| **Arch-and-symmetry composition** | The Moorish/mihrab-arch hero set (Bible §4) framed centrally, product on-axis | Architectural symmetry reads as considered, established, "old money" rather than trend-chasing |
| **Single jewel-tone accent** | One red hibiscus, one garnet drape, against warm cream — never a busy multi-color palette | Matches the brand palette (Bible §3) and the broader Saudi luxury-retail convention of one saturated accent against neutral ground |
| **Unhurried pacing, even inside a fast cut** | Slow-motion falls, deliberate hand movement, a real blink and breath (Bible §6.1 TRANSFORMATION beat) — motion reads considered, not rushed | Rushed, hyperactive editing reads as low-trust/low-budget to this audience; calm confidence is itself a luxury signal (Bible §5 model direction) |
| **Sound-off legibility as a luxury cue, not just a platform requirement** | Overlays alone must carry the emotional arc (Bible §5) | A large share of KSA mobile viewing happens muted in shared/family settings; a film that "reads" silently feels considerate and premium, not just compliant |

**What to avoid aesthetically (taste, not just taboo):** neon or club lighting, visible Western
streetwear branding/logos, cluttered maximalist backgrounds, hard flash photography, overtly
"influencer selfie" framing, and fast jump-cut MTV-style editing. None of these are forbidden by
Bible §5's hard list, but all of them read as off-register for this audience and this product
positioning. Full camera/lighting/motion craft specs live in `knowledge/cinematography-language.md`,
`knowledge/lighting-recipes.md`, and `knowledge/camera-movements.md` — this section states only the
**cultural read** that should shape those craft choices for a KSA-bound cut.

---

## 3. Modesty floor — the strictest read in the four-market set

KSA's modesty level is **very-high** (`markets.yaml sa.modesty_level`) — the maximum restraint
point in the studio's four markets. This is not a single rule but a layered standard:

| Layer | KSA standard | Source |
|---|---|---|
| **Skin exposure** | Face, hands, and hair only; never shoulders/neckline/body beyond what abaya-adjacent wardrobe (§4 below) already covers | Bible §5 shared forbid_floor, tightened by `markets.yaml sa.taboos` |
| **Framing subject** | Hair is the hero — texture, movement, macro, silhouette, one tasteful over-the-shoulder reveal (Bible §5) | Bible §5, §6.1 TRANSFORMATION beat |
| **Expression** | Calm confidence; a soft micro-smile, a real blink, a real breath — never a wide/toothy smile, never a coy or flirtatious expression | Bible §5 model direction; `markets.yaml shared.modesty.model_direction` |
| **Gesture** | Self-care, private, solo — no gesture directed "at" an implied audience or camera in a performative/flirtatious way | 21-cultural-expert-gulf Output 4.3 |
| **Company in frame** | Woman-centered and private; **no unrelated man and woman together in frame** at any beat unless an explicit, deliberately-briefed family context overrides this (rare, and never the default) | `markets.yaml sa.taboos`; Bible §5 |
| **Jewelry/accessory** | Minimal — thin gold, a single ring; nothing that competes with the bottle or the hair for visual attention | `markets.yaml sa.wardrobe_palette.jewelry` |
| **Before/after honesty** | The transformation happens inside one continuous camera thread (Bible §6.1's "unbroken thread" device) — never a split-screen, never an exaggerated before-shot that shames the woman's real hair | `markets.yaml sa.taboos`; Bible §5 no-fear-mongering |

**The hijab/styled-hair A/B pair is not optional in this market.** A meaningful share of the KSA
audience wears **الحجاب** (*al-ḥijāb*, "the head covering"). The default hero cut keeps hair visible
per the standard hair-care-creative convention shown to women (Bible §5), but the modest hijab
alternative must be specified at the same fidelity, not improvised as an afterthought
(`markets.yaml sa.modest_alternative`; full A/B spec owned by 21-cultural-expert-gulf Output 4.5).

**Read-test heuristic for anyone reviewing a KSA-bound frame:** would this frame make a
conservative Riyadh grandmother — the same generation the product's heritage story ("وصفة الجدات,"
*waṣfat al-jaddāt*, "the grandmothers' recipe," Bible §3) is built to honor — feel respected rather
than uneasy? If the answer isn't a confident yes, the frame fails the floor regardless of how well
it might play in a more cosmopolitan market.

---

## 4. Wardrobe & the abaya-adjacent palette

The KSA wardrobe register is **abaya-adjacent** — **عباية** (*ʿabāya*, "the loose over-garment
traditionally worn over clothing") silhouette cues rendered in the brand's warm luxe palette, not a
literal street-wear abaya shoot (`markets.yaml sa.wardrobe_palette`).

| Element | KSA specification | Notes |
|---|---|---|
| **Silhouette** | Loose, flowing, abaya-adjacent drape; soft modest blouse as an alternative for tighter macro/ritual beats where only shoulders are implied | Never fitted, never a plunging neckline, never sleeveless |
| **Color palette** | Warm cream `#FAF6F1` · garnet red `#8E1B1E` · deep garnet `#6E1214` · gold `#C9A227` · soft brown `#6B564E` | Identical to the brand's core palette (Bible §3) — wardrobe should feel like it belongs to the same world as the bottle and set, not a separate costume choice |
| **Fabric** | Matte crepe, silk, or fine wool drape; light that flatters skin and hair, never a stiff or shiny synthetic sheen | No logos, no loud print — a busy pattern competes with the hero (hair/product) and reads as off-brand |
| **Jewelry** | Minimal — thin gold, a single ring | Anything louder (statement earrings, layered necklaces, a watch in frame) is a distraction flag, not a hard forbid — but should be corrected before ship |
| **Nails/hands** | Natural, unpolished-or-neutral, warm-toned | Reinforces the "no-makeup makeup" calm-confidence read (Bible §5) rather than a glammed-up manicure moment |
| **Hijab variant (A/B pair)** | A warm neutral scarf matching the wardrobe palette (cream/garnet/gold), styled elegantly, not a plain utilitarian wrap | The B-variant must feel as considered and premium as the A-variant — never a downgrade |

**What to avoid in wardrobe:** Western fast-fashion silhouettes, visible brand logos, cool-toned
fabrics (blues/greys) that fall outside the warm palette, anything sheer or body-fitted, and heavy
statement jewelry that competes with the product.

---

## 5. Interior style & set-dressing cues

The **hero set for product/offer beats is fixed and market-agnostic** — it mirrors Bible §4
exactly: warm cream Moorish/mihrab arch, deep garnet drape, a single red hibiscus, a palm frond, a
pale stone/travertine podium, soft directional window light with long gentle shadows
(`markets.yaml sa.interior_style.hero_set`). Do not re-interpret this set per market; it is locked.

For broader scenes (the RITUAL beat's more intimate interior, cutaways, etc.), the KSA register
draws on **Najdi Gulf-luxury with Moroccan-heritage cues**:

| Element | KSA interior register |
|---|---|
| **Materials** | Brass fixtures, carved wood detail, pale stone/travertine, fine textile drape |
| **Light source** | Mashrabiya-filtered window light (**مشربية**, *mashrabiyya*, "the latticed wooden window screen traditional to the region") — dappled, warm, directional |
| **Botanicals** | Dates and hibiscus as set-dressing accents, echoing the product's own red-hibiscus ingredient (Bible §3) |
| **Architectural motif** | Moroccan arch cues repeated in smaller set elements (a mirror frame, a doorway) to keep the hero set's language consistent throughout the film |
| **Scale and clutter** | Spacious, uncluttered, generously lit negative space — a crowded frame reads as a market stall, not a private luxury ritual |

**What to avoid:** modern minimalist Scandinavian styling (reads as culturally generic, disconnects
from the heritage story), overtly Western hotel-lobby styling, and any set dressing that
re-purposes the mihrab-arch motif as an actual devotional space (see §7 below — this is a hard
forbid, not a taste note).

---

## 6. Taboos & hard forbids

KSA inherits the Bible's shared forbid_floor **in full** and adds market-specific tightening on
top (`markets.yaml sa.taboos` — additive only, never a loosening).

**Shared floor (all four markets, Bible §5):**

- No alcohol cues (bottles, bars, toasting, wine-toned liquids read as alcohol).
- No immodesty / provocative framing / skin exposure beyond face-hands-hair.
- No religious imagery used as decoration (Qur'anic text, mosque staging, prayer as a prop).
- No fear-mongering about the body (disease-scare framing, shaming before-shots).
- No fake medical claims or cure language beyond the four Bible-locked benefits (Bible §3).
- No pork or non-halal cues.
- No romantic/dating framing or intimate free-mixing of unrelated men and women.
- No disrespect to national symbols, flags, or leadership.

**KSA-specific additive taboos (`markets.yaml sa.taboos`):**

| # | Taboo | Why it matters here specifically |
|---|---|---|
| 1 | No unrelated man and woman together in frame; keep the frame woman-centered and private | KSA's modesty norms around gender co-presence are the strictest of the four markets — this is the default read, not an edge case |
| 2 | No music or scene mood that conflicts with a modest, family-safe read | KSA audiences (and platform ad review for KSA-targeted delivery) apply the strictest content read in the rollout |
| 3 | No misuse of national symbols, the flag, or maps; heritage cues stay tasteful, never political | The product's heritage story is Moroccan, not Saudi — never conflate the two by inserting Saudi national iconography as set dressing |
| 4 | No exposed styling beyond hair/face/hands; wardrobe stays abaya-adjacent | Reinforces §3/§4 above as a hard floor, not a preference |
| 5 | No exaggerated before/after that shames the woman's real hair | Protects both the audience (no fear-based manipulation) and the brand (no implied-false claim, Bible §5) |

**Additional KSA-specific notes not yet itemized in `markets.yaml` (elaboration, not new rule):**
because Mecca and Medina — Islam's two holiest sites — are physically located in Saudi Arabia, any
depiction or implication of the Ka'aba, the Grand Mosque, pilgrimage (**الحج**, *al-ḥajj*, "the
Hajj pilgrimage," or **العمرة**, *al-ʿumra*, "the Umrah") imagery, or clergy figures as decorative
or incidental backdrop is a harder line here than the shared floor's general "no religious imagery
as decoration" already implies — treat any such element as an automatic BLOCK, not a judgment call
(see §7 for the related mihrab-arch handling rule).

---

## 7. Religious sensitivity — the higher-stakes layer

Saudi Arabia's national identity is inseparable from its role as home to Islam's two holiest
cities, and the population is predominantly Sunni Muslim observing the five daily prayers
(**الصلاة**, *aṣ-ṣalāh*, "the ritual prayer") and the Friday communal prayer (**صلاة الجمعة**,
*ṣalāt al-jumʿa*, "Friday prayer" — the reason Friday anchors the KSA weekend, `markets.yaml
sa.weekend`). This context raises the bar on religious-sensitivity handling above the shared floor:

| Check | Rule | Why KSA-specific |
|---|---|---|
| **The mihrab-arch hero set** | The Bible §4 hero set uses a "Moorish/**mihrab**" arch silhouette purely as an **architectural motif** — the horseshoe/keyhole arch form common to Moroccan-Andalusian design, used decoratively in luxury riads, hotels, and retail across the Gulf. It is **never** staged as a literal prayer niche: no qibla-direction implication, no prayer rug, no minbar, no Qur'anic calligraphy or verse fragments on any surface, no adhan/call-to-prayer audio cue | A literal **محراب** (*miḥrāb*, "prayer niche marking the direction of Mecca") is a functioning devotional element in KSA specifically — the country where that literal meaning is most immediately legible to viewers — so this distinction must be held more carefully here than anywhere else in the rollout (owned in full by 21-cultural-expert-gulf Output 4.4) |
| **Holy-site imagery** | Never depict, imply, or use as backdrop the Ka'aba, the Grand Mosque, Hajj/Umrah pilgrimage scenes, or clergy figures | These carry devotional weight specific to KSA's national religious role; using them as beauty-ad set dressing reads as exploitative regardless of intent |
| **Ramadan/Eid tone** | Seasonal cuts may reference the ritual/gifting *mood* of **رمضان** (*ramaḍān*) or **عيد الفطر** (*ʿīd al-fiṭr*, "the festival of breaking the fast") — the post-iftar self-care ritual, the gifting occasion — but must stay "spiritual-adjacent," never devotional decoration (`markets.yaml sa.seasonality`) | Ramadan is the highest-weight commercial window for this product in this market; getting the tone right (warm, ritual, family) versus wrong (devotional prop, religious text on screen) is a make-or-break distinction |
| **Halal/finance framing** | The offer is inherently interest-free cash-on-delivery — **الدفع عند الاستلام** (*ad-dafʿ ʿind al-istilām*, "cash on delivery / payment on receipt," Bible §3). Never introduce installment or "buy now pay later" language that could read as **ربا** (*ribā*, "usury" — a hard religious-financial taboo) | A financing-adjacent phrase that would be a minor copy nitpick elsewhere is a religious-sensitivity issue in this market |
| **National Founding Day / National Day** | **يوم التأسيس** (*yawm at-taʾsīs*, "Founding Day," 22 Feb) and **اليوم الوطني السعودي** (*al-yawm al-waṭanī as-saʿūdī*, "Saudi National Day," 23 Sep) tie-ins must stay tasteful and non-political; flag/symbol use must be respectful, never decorative filler (`markets.yaml sa.seasonality`) | Distinct from religious sensitivity but sits in the same "handle with more care than a generic seasonal hook" category |

**Practical implication for ad review and scheduling:** because devotional accuracy is scrutinized
more closely here than in the other three markets, any set element, prop, or overlay that a
reviewer in another market might wave through as "atmospheric" should get a second, KSA-specific
look before ship. This is also consistent with how Meta, TikTok, and Snapchat apply additional
regional ad-content review for KSA-targeted delivery — treat the Bible's forbid_floor as both a
cultural and a platform-compliance floor in this market.

---

## 8. Dialect & language register — Najdi, Hijazi, and the MSA-lead rule

**The on-screen register is always elegant MSA (فصحى, *fuṣḥā*, "the eloquent/standard register") —
no exceptions, in every market, including KSA** (`markets.yaml shared.language.on_screen_register`;
Bible §5). Dialect is a **spoken-VO-only** option, offered for the TikTok/Snap variant, and never
appears as on-screen text.

**KSA's spoken-dialect umbrella is broadly Khaleeji** (**خليجي**, *khalījī*, "Gulf") with two
internal regional colorings worth knowing, because Bible §3's three named review cities map almost
exactly onto them:

| Region | Bible-referenced city | Dialect coloring | Register feel |
|---|---|---|---|
| **Najd (central)** | Riyadh (الرياض) | **نجدي** (*najdī*, "Najdi") — the register most associated with formal/administrative Saudi Arabic, generally read as more reserved and traditional | Best default for a premium, heritage-forward VO; pairs naturally with the calm, unhurried pacing in §2 |
| **Hijaz (western/coastal)** | Jeddah (جدة) | **حجازي** (*ḥijāzī*, "Hijazi") — historically shaped by centuries of pilgrimage and trade traffic through Mecca/Medina/Jeddah; a touch warmer and more cosmopolitan in cadence while remaining fully within the same modesty and formality floor | A natural fit if the brief calls for a slightly warmer, more welcoming VO delivery without moving off-register |
| **Eastern Province (Gulf coast)** | Dammam (الدمام) | Closer to the broader Gulf-coast Khaleeji register shared with Bahrain/Qatar/Eastern Saudi trade-hub cities | Useful reference point if a cut needs to feel maximally "pan-Gulf" rather than centrally Saudi |

`markets.yaml sa.language.formality` states the KSA spoken dialect as **"Najdi/Hijazi register"** —
in practice, the studio's default optional Khaleeji VO leans Najdi for the primary KSA cut (formal,
warm, unhurried) with Hijazi warmth as an available alternate reading, never a wholesale dialect
swap of the script.

**Hard rule:** `markets.yaml sa.language.forbid_in_saudi_cut = ["Darija", "Egyptian slang"]`. Neither
Moroccan Darija (despite the product's Moroccan heritage story) nor Egyptian dialect may enter the
Saudi cut's VO or overlays at any register level — the heritage story is told through imagery and
MSA narration, never through a Moroccan-accented voice track (Bible §5, §6.4).

**Illustrative register vocabulary (reference only — never promoted to shipped copy without first
being locked into the Bible, matching the convention in `knowledge/beauty-hair-marketing.md` §6):**
a Najdi-leaning spoken VO reading of the locked line **«اطلبي الآن — الدفع عند الاستلام»**
(*uṭlubī al-ān — ad-dafʿ ʿind al-istilām*, "Order now — cash on delivery," Bible §6.3) would carry
slightly rounder vowel emphasis and a measured, unhurried pace; a Hijazi-leaning reading would carry
the same words with a marginally warmer, more inviting intonation. **The written line itself never
changes** — only the spoken color of the optional dialect VO variant does, and only for
TikTok/Snap, never for the on-screen overlay.

**Machine-translation discipline:** every line, in every register, must read as human-authored
premium Arabic — no literal English-syntax carryover, no awkward passive constructions
(`markets.yaml shared.language.forbid_machine_translation`). Every Arabic line in every downstream
artifact carries a Latin transliteration and an English gloss on first use (Bible §2).

**Numerals:** Western numerals (0–9) for all prices and CTAs, matching the locked overlay «139 ﷼
بدل 185» (Bible §6.3, `markets.yaml sa.numerals`) — this is the KSA digital/retail default and
should never be swapped for Eastern Arabic-Indic numerals (٠١٢…) in this market's cut.

---

## 9. Seasonality calendar — commercial windows ranked by weight

Windows below carry the exact dates and weights from `markets.yaml sa.seasonality`; angles are
elaborated here with the reasoning behind each ranking.

| Window | Arabic | When | Weight | Creative angle |
|---|---|---|---|---|
| **Ramadan** | رمضان (*ramaḍān*) | Annual moving lunar window; next ≈ 8 Feb 2027 (1448 AH), shifting ~11 days earlier each Gregorian year — verify by sighting | **Highest** | Post-iftar/suhoor self-care ritual; heritage and «وصفة الجدات» (*waṣfat al-jaddāt*, "the grandmothers' recipe") framing; gifting the 3-pack; a nighttime-calm cut matching the late-night social peak. Keep tone spiritual-adjacent — **never** religious-imagery-as-decoration (§7 above) |
| **Saudi National Day** | اليوم الوطني السعودي (*al-yawm al-waṭanī as-saʿūdī*) | 23 September, fixed | **High** | Big retail moment; patriotic warmth paired with the offer push; flag/symbol use stays respectful, never decorative filler |
| **Eid al-Fitr** | عيد الفطر (*ʿīd al-fiṭr*) | ≈ 9 March 2027, the day after Ramadan ends | **High** | Look-your-best-for-Eid framing; gifting; the density/shine payoff timed for family gatherings |
| **White Friday** | الجمعة البيضاء (*al-jumʿa al-bayḍāʾ*) | November (the region's Black-Friday equivalent) | **High** | Peak COD/e-commerce moment of the year; lead hard with the locked −25% pack value (139 ﷼ بدل 185) and free shipping |
| **Gulf Summer** | الصيف (*aṣ-ṣayf*) | June – August (extreme heat, heavy indoor season, family travel) | **Medium-high** | Sun, chlorine, saltwater, and AC-dryness hair-stress angle → the repair/nourish read; indoor self-care ritual timing |
| **Eid al-Adha** | عيد الأضحى (*ʿīd al-aḍḥā*) | Annual moving window, ≈ mid-May 2027 (10 Dhul-Hijjah) | **Medium** | Gifting + family-gathering grooming; Hajj-season self-care reset |
| **Saudi Founding Day** | يوم التأسيس (*yawm at-taʾsīs*) | 22 February, fixed | **Medium** | Heritage-and-authenticity tie-in (the Moroccan grandmothers' recipe pairs naturally with Saudi heritage pride); tasteful, non-political |
| **Back-to-School** | العودة إلى المدارس (*al-ʿawda ilā al-madāris*) | Mid-August – September | **Medium** | Mothers' self-reset after summer; routine restart — the audience explicitly includes mothers (Bible §3) |
| **Wedding Season** | موسم الأعراس (*mawsim al-aʿrās*) | October – March (cooler months) | **Medium** | Henna-night tie-in — the product's own **الحناء الطبيعية** (*al-ḥinnāʾ aṭ-ṭabīʿiyya*, "natural henna," Bible §3 ingredient) connects directly to bridal henna-night ritual; bridal density-and-shine framing |

**Peak posting/social windows (`markets.yaml sa.weekend`):** weekday evenings 20:00–24:00, with
Thursday–Friday evenings peaking (Friday–Saturday is the KSA weekend, anchored to Friday communal
prayer, §7); late-night activity climbs further during Ramadan. Schedule paid social delivery and
organic posting around these windows rather than a flat, market-agnostic schedule.

---

## 10. COD trust & buying behavior

Cash-on-delivery is not a checkout-page footnote in this market — it is a **headline trust
mechanic** and the Bible-locked default payment method (`markets.yaml sa.cod_norms.dominance:
"very-high"`; Bible §3).

| Behavior | KSA norm | Creative implication |
|---|---|---|
| **Payment default** | COD — **الدفع عند الاستلام** (*ad-dafʿ ʿind al-istilām*, "cash on delivery / payment on receipt") is the default and the only Bible-locked payment mechanic (Bible §3) | State COD plainly, on-screen and in VO, every time — never bury it in fine print, never pair it with manufactured urgency |
| **Inspect-before-pay** | **فحص المنتج قبل الدفع** (*faḥṣ al-muntaj qabl al-dafʿ*, "inspecting the product before paying") is a headline trust element, not a hidden policy (Bible §3) | This is a genuinely strong risk-reversal hook for a first-time buyer of an unfamiliar heritage brand — worth surfacing explicitly in offer-stage copy |
| **Confirmation call** | A phone confirmation call before dispatch is standard practice (`markets.yaml sa.cod_norms.confirmation`) | Sets buyer expectations correctly; the ad should not imply instant/automatic dispatch with no human touchpoint |
| **Refusal norm** | "Don't like it → don't pay" — she can refuse delivery at the door with no charge (`markets.yaml sa.cod_norms.refusal_norm`; Bible §3) | A genuine risk-reversal claim already true in the Bible — never needs dramatizing or exaggerating |
| **Support channel** | WhatsApp support is a named trust element (Bible §3) | Reflects the mobile-first, messaging-native way this audience prefers to resolve pre-purchase questions over email or a phone tree |
| **Decision-maker** | The buyer researching and ordering a hair-care product is overwhelmingly the woman herself; the confirmation call may occasionally be answered by a family member on her behalf for logistics, but the purchase decision and the emotional appeal are addressed to her directly | Keep every line of copy and every beat addressed to "her" in second person feminine (as the locked VO/overlays already do, Bible §6.3–§6.4) — never shift address to a generic household "you" |
| **Proof mechanics** | 4.8/5 rating; verified-purchase reviews specifically from Riyadh, Jeddah, and Dammam (Bible §3) | These three cities map to the three regional dialect zones in §8 — a useful anchor when a brief calls for city-specific social proof framing, without inventing quoted review text that doesn't exist |
| **Mobile-first consumption** | Vertical, sound-optional, scroll-driven discovery on Meta/TikTok/Snap (Bible §5 platform rules) | Reinforces why the hook window (0–3 s Meta, 0–2 s TikTok, 0–1.5 s Snap, Bible §5) must land the pain point immediately — there is no warm-up time in how this audience actually encounters the ad |

**Review-corpus tone (pattern, not fabricated quotes):** because the Bible states a 4.8/5 rating
and three named review cities without providing literal review text, this document describes the
*expected tone pattern* only — reviews in this category typically emphasize the felt discovery
timeline (softness/shine noticed immediately, less shedding around 3–5 weeks, density around 2–3
months, matching Bible §3's FAQ), a heritage/family framing (often referencing mothers or
daughters, Bible §3), and explicit relief at the COD/inspect-before-pay mechanic removing purchase
risk. **Never invent or quote a specific review as if real** — this pattern is for tone calibration
only, never a source of "real" testimonial copy.

---

## 11. Delivery expectation

| Field | KSA value | Source |
|---|---|---|
| **Delivery window** | 24–48 hours in major cities; 1–4 business days nationwide, after phone confirmation | Bible §3; `markets.yaml sa.delivery_expectation.window` — this is the **only** market with a Bible-locked delivery timeframe |
| **Coverage** | All KSA cities | Bible §3 |
| **Shipping cost** | Free | Bible §3 |
| **Proof** | 4.8/5 rating; verified-purchase reviews from Riyadh, Jeddah, Dammam | Bible §3 |
| **SKU** | `SA04050100M300` | Bible §3 |

Because this is the only market with a Bible-locked delivery figure, never state a faster or
vaguer delivery claim in KSA-bound copy than "24–48 h major cities / 1–4 business days nationwide."
UAE/Oman/Egypt delivery figures are market **expectations**, not Bible locks, and must never be
implied to apply to the KSA cut or vice versa.

---

## 12. Localization notes — how this market mirrors the flagship exactly

KSA is the **reference cut** (`markets.yaml sa.localization_notes`). This is the practical
checklist for keeping any KSA-bound artifact in exact alignment with Bible §6:

- **Reproduce Bible §6 verbatim.** Do not re-translate the six locked overlays (§6.3) or the five
  VO lines (§6.4) for the KSA cut — they were authored *for* this market, not translated *into* it.
- **Currency stays SAR, never restated in another currency.** On-frame price uses the classic Rial
  sign **﷼** (matching the locked overlay «139 ﷼ بدل 185», Bible §6.3); the newer SAR sign (U+20C1,
  approved Feb 2025) is optional once platform font support is universal, but the Bible's ﷼ is the
  default until then (`markets.yaml sa.currency`).
- **Hero set stays identical to Bible §4** — the warm cream Moorish/mihrab arch, garnet drape, red
  hibiscus, palm frond, travertine podium, soft directional light. This is market-agnostic by
  design, but KSA is where it is reviewed most strictly (§7 above).
- **On-screen text is elegant MSA in western numerals with the ﷼ sign.** The optional TikTok/Snap
  VO may lean Khaleeji — Najdi warmth as the default, Hijazi warmth as an available alternate
  (§8) — while overlays stay MSA throughout.
- **Lead emotion: hope + restored femininity; secondary: heritage trust** (Bible §6 emotional
  spine) — this ordering should not be inverted for the KSA cut; heritage trust supports the hope
  payoff, it does not lead it.
- **Always ship the hijab/styled-hair A/B pair** (§3 above) — this is checked on every run, not
  once, per 21-cultural-expert-gulf Rule 5.
- **Keep the read maximally modest.** Because KSA is the strictest of the four markets, any
  hesitation about whether a frame, gesture, or line "might be too much" should be resolved toward
  the more conservative choice here — the UAE/Oman/Egypt dossiers are where controlled loosening is
  documented, never this one.

---

## 13. Consolidated Do/Don't — the KSA floor at a glance

| DO | DON'T | Section |
|---|---|---|
| Light warm and directional, let shadows fall long and soft | Use flat studio glare or cold-toned light | §2 |
| Keep one hero object fully lit against a receding background | Fill the frame with competing detail | §2 |
| Show hair as texture/movement/macro/silhouette with one tasteful over-the-shoulder reveal | Frame the body as the subject | §3 |
| Ship the hijab/styled-hair A/B pair at full fidelity, every run | Treat the B-variant as an afterthought edit | §3 |
| Dress wardrobe in the locked warm-neutral palette, abaya-adjacent silhouette | Use cool tones, logos, loud print, or fitted/sheer fabric | §4 |
| Keep the hero set identical to Bible §4, architecture-only | Add Qur'anic text, a prayer object, or qibla-direction staging to the arch | §5, §7 |
| Treat the mihrab-arch motif as decorative Moroccan-Andalusian architecture | Read or stage it as a literal prayer niche | §7 |
| Never depict the Ka'aba, Grand Mosque, Hajj/Umrah imagery, or clergy as backdrop | Use any holy-site or devotional imagery as set dressing, however incidental | §6, §7 |
| Keep Ramadan/Eid tie-ins "spiritual-adjacent" — ritual, gifting, family warmth | Show prayer, Qur'an, or mosque imagery as a seasonal decoration | §7, §9 |
| State COD, inspect-before-pay, and the refusal norm plainly | Bury COD in fine print or pair it with manufactured urgency | §10 |
| Use the exact Bible §3 delivery window (24–48 h major cities / 1–4 business days nationwide) | Imply a faster or vaguer delivery claim | §11 |
| Keep on-screen text elegant MSA in western numerals with the ﷼ sign | Use Darija, Egyptian slang, or Eastern Arabic-Indic numerals on-screen | §8, §12 |
| Let the optional Khaleeji VO lean Najdi (default) or Hijazi (alternate) | Swap the written line itself for a dialect script | §8 |
| Address the buyer in second person feminine throughout | Shift address to a generic household "you" | §10 |

---

## 14. Quick-reference checklist (for any skill drafting a KSA-bound frame, line, or beat)

Before a KSA-targeted artifact ships to Stage 10 (Consistency & Negatives), confirm:

- [ ] Light is warm and directional; no flat/cold studio look.
- [ ] Wardrobe is abaya-adjacent, in the locked warm-neutral palette, no logos or loud print.
- [ ] Hair — not body — is the visual subject at every beat; framing is tasteful, never body-forward.
- [ ] No unrelated man and woman appear together in frame without an explicit, deliberately-briefed
      family-context override.
- [ ] The hijab/styled-hair A/B pair is specified at full fidelity, not an afterthought edit.
- [ ] The mihrab-arch hero set carries no Qur'anic text, prayer object, qibla staging, or
      call-to-prayer audio.
- [ ] No Ka'aba, Grand Mosque, Hajj/Umrah, or clergy imagery appears anywhere in frame, however
      incidental.
- [ ] Any Ramadan/Eid seasonal tie-in stays spiritual-adjacent (ritual, gifting, family warmth),
      never devotional decoration.
- [ ] No financing/installment language that could read as ribā-adjacent; the offer stays exactly
      COD, inspect-before-pay, free shipping, 139 SAR / 3-pack (Bible §3).
- [ ] On-screen text is elegant MSA, western numerals, the ﷼ currency sign — no Darija, no
      Egyptian slang, no Eastern Arabic-Indic numerals.
- [ ] Any optional spoken VO dialect (Najdi default / Hijazi alternate) changes only the spoken
      color, never the written line itself.
- [ ] Every Arabic line used is quoted verbatim from Bible §6.3/§6.4, or is clearly labeled
      illustrative reference vocabulary and never promoted to shipped copy without first being
      locked into the Bible.
- [ ] Delivery language matches the Bible-locked KSA window exactly (24–48 h major cities / 1–4
      business days nationwide) — never a market-generic claim.
- [ ] National-symbol or Founding Day/National Day tie-ins are tasteful and non-political, never
      decorative filler.
- [ ] The overall frame passes the §3 read-test: would a conservative Riyadh grandmother feel
      respected, not uneasy?
