# BATCH STOP-SCROLL 01 — زيت المشاط الأحمر (Golfe)
### 5 concepts × 3 hooks · 9:16 · prêts à produire via Kie AI

> Méthode & règles : voir `METHODE-STOPSCROLL-KIE.md`. Pipeline : `../../tools/`.
> Prompts Kie en **anglais** (les modèles répondent mieux). Textes à l'écran en **arabe** (posés
> hors-IA). Réf bouteille obligatoire = `../bottle_straight.png`. Negative prompt commun = §NEG en bas.
> Offre verrouillée : **٣ قوارير × 250 مل · ١٣٩ ر.س ~~١٨٥~~ · الدفع عند الاستلام · توصيل ٢-٥ أيام**.
> Claims policy-safe : `يقلّل التساقط الملحوظ` (jamais `يوقف/يعالج`), avant/après = coiffure + `صورة توضيحية`.

Diversité (anti-Andromeda) : les 5 concepts sont **structurellement différents** (douleur · secret ·
transformation · ingrédient · témoignage). Ne pas lancer 10 skins d'un seul.

---

## C1 — « الطيحة » (la chute)  ·  angle DOULEUR (PAS)  ·  problem-aware
Le workhorse du COD. Montre la douleur (chute) sans la dire, puis le geste, puis le mieux.

| Temps | Visuel (recette Kie) | Audio (VO فصحى, verbatim) | Texte overlay |
|---|---|---|---|
| 0-2s **HOOK** | ECU peigne à grosses dents plein de cheveux au-dessus d'un lavabo blanc, main de femme, look photo tel. *(still S1, sans produit ; veo3 i2v : la main soulève le peigne, mèches qui tombent)* | *(silence + son ASMR)* | `شعرك يطيح بهالشكل؟` |
| 2-7s | Main verse 3-4 gouttes d'huile rouge translucide sur le cuir chevelu / une mèche *(still S2, **bouteille réelle compositée**)* | « وصفة أهلنا للشعر… رجعناها. » | `المشاط الأحمر — وصفة أهلنا` |
| 7-11s | Cheveux dark, denses, brillants qui ondulent (cadrage coiffure, pas de gros plan visage) *(still S3, veo3 i2v : léger sway)* | « زيتٌ خفيف يغذّي البصيلات ويقلّل التساقط الملحوظ. » | `٩٠ يوم · فرق واضح — صورة توضيحية` |
| 11-15s | 3 flacons réels sur surface neutre + panneau offre *(composite ×3)* | « عبوة ٣ قوارير، والدفع عند الاستلام. » | `٣ قوارير · ١٣٩ ر.س ~~١٨٥~~ · اطلبي الآن` |

**Recette Kie**
- **S1** `nano-banana-edit` (ou `nano-banana`), 9:16 : `Amateur smartphone photo, vertical, extreme close-up of a wide-tooth comb clogged with loose long dark hair strands, held over a white bathroom sink, a young woman's hand, plain natural bathroom light, slight phone-camera grain, realistic candid, empty darker area at top for a headline. No text, no logo, no watermark.`
- **S2** `nano-banana-edit` + réf bouteille : `Amateur smartphone photo, vertical, a young Gulf woman's hand pouring a few drops of THIN TRANSLUCENT RED hair oil (low viscosity, like a fine serum, not honey) onto her scalp through dark hair, the red-and-white bottle from the reference kept EXACTLY as-is, plain home bathroom, natural light, candid UGC, empty area top. No text, no logo.`
- **S3** `nano-banana-edit`, 9:16 : `Amateur smartphone photo, vertical, back/side view of long dark dense glossy healthy hair gently swaying, natural indoor golden light, realistic fibers, no plastic look, no face close-up, empty darker area bottom for headline. No text, no logo.` → veo3_fast i2v : `subtle natural hair sway, 8s, handheld phone feel, constant frame rate, no morphing`.
- **veo3** seulement sur S1 et S3. S2/S4 = still + push-in ffmpeg.

**3 hooks à tester** (même corps) : (a) **peigne plein de cheveux** `شعرك يطيح بهالشكل؟` [douleur] · (b) **main+flacon près caméra** `السر اللي بنات الخليج يخبّونه` [curiosité] · (c) **mèche mouillée nouée** `بطّلي تربطين شعرك وهو مبلول` [contrarian].

**Copy**
- **Snap headline (≤34)** : `وصفة طبيعية تقلّل تساقط شعرك` *(~28)*
- **Meta primary (~125 vis.)** : `تلاحظين خصلات شعر أكثر في المشط كل يوم؟ زيت المشاط الأحمر — وصفة أهلنا الطبيعية (مشاط، كركديه، حنّاء، ليمون) تغذّي البصيلات وتقلّل التساقط الملحوظ. عبوة ٣ قوارير بـ١٣٩ ر.س بدل ١٨٥ — الدفع عند الاستلام.`
- **TikTok caption (≤100)** : `شعرك يطيح؟ جرّبي وصفة أهلنا 🌿 #العناية_بالشعر #تساقط_الشعر #السعودية`
- **CTA** : `اطلبي الآن — الدفع عند الاستلام`

**Cut 6 s (Snap/awareness)** : hook S1 (0-2) → S2 application (2-4) → offre S4 (4-6). Texte hook + prix seulement.

---

## C2 — « السر » (le secret)  ·  angle CURIOSITÉ / héritage  ·  unaware→problem-aware
Ouvre une boucle : *qu'est-ce que ce flacon rouge ?* Résolue en 3 s par les ingrédients + l'héritage.

| Temps | Visuel (recette Kie) | Audio (VO) | Texte overlay |
|---|---|---|---|
| 0-2s **HOOK** | Main tient le flacon rouge tout près de la caméra, le tourne lentement, fond maison flou *(still S1, **bouteille réelle**)* | « في زيتٍ… كانت جداتنا يخبّونه. » | `السر اللي بنات الخليج يخبّونه` |
| 2-6s | Nature morte : hibiscus séché + henné + citron + peigne en bois qui tombent autour d'un bol d'huile rouge *(still S2, sans produit ; veo3 i2v : pétales qui tombent lents)* | « مشاط، كركديه، حنّاء، ليمون — بس. » | `٤ مكونات طبيعية · بلا كيماويات` |
| 6-11s | Huile rouge fine qui enrobe une mèche dark brillante *(still S3, macro cheveux, sans produit)* | « يغذّي الجذور، ويعيد الكثافة واللمعان. » | `تغذية · كثافة · لمعان` |
| 11-15s | 3 flacons + offre | « ذهبكِ الأحمر بـ١٣٩ ريال — الدفع عند الاستلام. » | `٣ قوارير · ١٣٩ ر.س ~~١٨٥~~` |

**Recette Kie**
- **S1** `nano-banana-edit` + réf : `Amateur smartphone photo, vertical, a woman's hand holding the red-and-white hair-oil bottle from the reference (kept EXACTLY as-is) very close to the camera, slowly turning it, blurred warm home background, natural light, candid UGC, empty area top. No text, no logo.`
- **S2** `nano-banana-edit`, 9:16 : `Top-down amateur photo on a neutral cloth, dried red hibiscus flowers, henna powder, a sliced lemon, a hand-carved wooden comb, and a small brass bowl of THIN translucent red oil, warm natural light, realistic, empty area for headline. No text, no logo.` → veo3 i2v : `a few petals fall slowly, 8s, subtle, no morphing`.
- **S3** `nano-banana-edit`, macro : `Extreme macro, thin translucent red hair oil (fine serum, not honey) coating a lock of dark glossy hair, fibers visible, warm light, no product, no text.`

**3 hooks** : (a) flacon tourné près caméra `السر اللي بنات الخليج يخبّونه` [secret] · (b) `ليش شعر جداتنا كان أطول؟` [question] · (c) main qui ouvre le bouchon, goutte `شمّيها بس مرة` [sensoriel].

**Copy**
- **Snap headline (≤34)** : `سر شعر جداتنا في زيتٍ واحد` *(~25)*
- **Meta primary** : `قبل الشامبوهات، كان لجداتنا سرّ واحد: زيت المشاط الأحمر — مشاط، كركديه، حنّاء وليمون، بلا بارابين ولا سيليكون. يغذّي الجذور ويقلّل التساقط الملحوظ. ٣ قوارير بـ١٣٩ ر.س بدل ١٨٥ · الدفع عند الاستلام.`
- **TikTok caption (≤100)** : `سر جداتنا لشعر كثيف 🌺 وصفة طبيعية ١٠٠٪ #وصفات_الشعر #الخليج #العناية_بالشعر`
- **CTA** : `اطلبي الآن — الدفع عند الاستلام`

**Cut 6 s** : S1 hook (0-2) → S2 ingrédients (2-4) → offre (4-6).

---

## C3 — « ٩٠ يوم » (90 jours)  ·  angle RÉSULTAT / transformation  ·  solution-aware
Reveal satisfaisant, policy-safe (coiffure + `صورة توضيحية`). Le format « before/after » natif.

| Temps | Visuel (recette Kie) | Audio (VO) | Texte overlay |
|---|---|---|---|
| 0-2s **HOOK** | Même femme, split/transition : gauche cheveux ternes & fins → droite denses & brillants (cadrage arrière/coiffure) *(stills S1a/S1b)* | « ٩٠ يومًا… وشوفي الفرق. » | `٩٠ يوم بينك وبين شعرٍ ثاني` |
| 2-6s | Main applique l'huile rouge, mèche par mèche *(still S2, **bouteille réelle**)* | « قطراتٌ خفيفة، ٢-٣ مرات في الأسبوع. » | `الطريقة: ٢-٣ مرات أسبوعيًا` |
| 6-11s | Cheveux « après », mouvement lent, lumière chaude *(still S1b, veo3 i2v : sway)* | « كثافة، طول، ولمعان يرجع بالتدريج. » | `صورة توضيحية — مع الاستخدام المنتظم` |
| 11-15s | 3 flacons + offre | « عبوة ٣ قوارير = عناية ٩٠ يومًا كاملة. » | `٣ قوارير · ١٣٩ ر.س ~~١٨٥~~ · اطلبي الآن` |

**Recette Kie**
- **S1a/S1b** = **même femme, même cadrage** en 2 passes `nano-banana-edit` : S1a `...dull, thin, lackluster dark hair, back view...` ; S1b `...the SAME woman same framing, now fuller denser glossy dark hair...` (garder cohérence en réutilisant S1a comme réf pour S1b). Empty area top.
- **S2** `nano-banana-edit` + réf bouteille : application, huile fine translucide, UGC.
- Transition hook = wipe/split au montage (CapCut), pas un morph IA.

**3 hooks** : (a) split terne→brillant `٩٠ يوم بينك وبين شعرٍ ثاني` [résultat] · (b) `الفرق بعد ٣ شهور 👇` [curiosité] · (c) `شعري رجع مثل قبل` [témoignage].

**Copy**
- **Snap headline (≤34)** : `٩٠ يومًا لشعرٍ أكثف` *(~18)*
- **Meta primary** : `٩٠ يومًا من العناية المنتظمة بزيت المشاط الأحمر الطبيعي (مشاط، كركديه، حنّاء، ليمون). يغذّي البصيلات، يقلّل التساقط الملحوظ، ويعيد الكثافة واللمعان. عبوة ٣ قوارير = كورس كامل بـ١٣٩ ر.س بدل ١٨٥ · الدفع عند الاستلام. (صورة توضيحية)`
- **TikTok caption (≤100)** : `٩٠ يوم فرق واضح 🤍 وصفة طبيعية للشعر #تحدي_الشعر #العناية_بالشعر #السعودية`
- **CTA** : `اطلبي عرض ٩٠ يوم`

**Cut 6 s** : split hook (0-2) → application (2-4) → offre (4-6).

---

## C4 — « اقرئي المكونات » (lis les ingrédients)  ·  angle US-VS-THEM / contrarian  ·  solution-aware
Casse une croyance : *ton huile actuelle est pleine de silicone*. Transparence = confiance.

| Temps | Visuel (recette Kie) | Audio (VO) | Texte overlay |
|---|---|---|---|
| 0-2s **HOOK** | Main retourne une bouteille d'huile générique et pointe la liste d'ingrédients illisible *(still S1, bouteille **générique** neutre, sans marque)* | « اقلبي زيتك… واقرئي المكونات. » | `اقرئي مكوّنات زيتك الحين` |
| 2-6s | Coupe : le flacon rouge à côté, 4 ingrédients naturels posés autour *(still S2, **bouteille réelle** + hibiscus/henné/citron)* | « سيليكون وعطور؟ أو أربع مكونات طبيعية؟ » | `نحن: مشاط · كركديه · حنّاء · ليمون` |
| 6-11s | Huile rouge fine sur mèche brillante *(still S3, macro sans produit)* | « بلا بارابين، بلا سيليكون — يغذّي فعلاً. » | `بلا بارابين ولا سيليكون` |
| 11-15s | 3 flacons + offre | « جرّبي الطبيعي — الدفع عند الاستلام. » | `٣ قوارير · ١٣٩ ر.س ~~١٨٥~~` |

**Recette Kie**
- **S1** `nano-banana`, 9:16 : `Amateur smartphone photo, a hand turning a plain generic unbranded plastic oil bottle to show a long fine-print ingredient list, neutral bathroom shelf, natural light, realistic, no readable brand, no logo, no text overlay.`
- **S2** `nano-banana-edit` + réf : `The red-and-white hair-oil bottle from the reference (kept EXACTLY as-is) standing beside dried red hibiscus, henna powder and a lemon on a neutral surface, warm natural light, amateur photo, empty area top. No text, no logo.`
- **S3** macro huile-cheveux, sans produit.
- ⚠️ Ne pas nommer/montrer une **marque concurrente réelle** (policy + IP). Bouteille « générique » anonyme.

**3 hooks** : (a) retourne la bouteille générique `اقرئي مكوّنات زيتك الحين` [contrarian] · (b) `ليش زيتك ما يعطي نتيجة؟` [question] · (c) `الفرق بين زيت كيماوي وزيت طبيعي` [us-vs-them].

**Copy**
- **Snap headline (≤34)** : `٤ مكونات طبيعية — بس` *(~17)*
- **Meta primary** : `أغلب زيوت الشعر = سيليكون وعطور تلمّع مؤقتًا بلا تغذية. زيت المشاط الأحمر = ٤ مكونات طبيعية فقط (مشاط، كركديه، حنّاء، ليمون)، بلا بارابين ولا سيليكون، يغذّي الجذور ويقلّل التساقط الملحوظ. ٣ قوارير بـ١٣٩ ر.س · الدفع عند الاستلام.`
- **TikTok caption (≤100)** : `اقرئي مكونات زيتك 👀 طبيعي ١٠٠٪ #العناية_بالشعر #طبيعي #السعودية`
- **CTA** : `اطلبي الطبيعي الآن`

**Cut 6 s** : hook retournement (0-2) → 4 ingrédients (2-4) → offre (4-6).

---

## C5 — « بعد ما يئست » (après avoir désespéré)  ·  angle TÉMOIGNAGE (Star-Story-Solution)  ·  problem/product-aware
Le plus « humain ». Femme réaliste **qui ne parle pas** (le texte + la VO portent) → zéro lip-sync IA.

| Temps | Visuel (recette Kie) | Audio (VO/narration off) | Texte overlay |
|---|---|---|---|
| 0-2s **HOOK** | Femme du Golfe, air las, assise chez elle, tient le flacon rouge, regarde caméra sans parler *(still S1, **bouteille réelle**, visage naturel de profil léger)* | « جرّبتُ كل شيء لشعري… بلا فائدة. » | `جرّبت كل شي… هذا آخر أمل` |
| 2-7s | Elle applique l'huile, geste calme du soir *(still S2, application, **bouteille réelle**)* | « إلى أن رجعتُ لوصفة أمي — زيت المشاط. » | `المشاط الأحمر — وصفة أمي` |
| 7-11s | Cheveux brillants, elle passe la main, léger sourire *(still S3, coiffure, veo3 i2v : main dans les cheveux, lent)* | « بعد أسابيع… التساقط قلّ واللمعان رجع. » | `التساقط قلّ · اللمعان رجع` |
| 11-15s | 3 flacons + offre, ambiance maison | « والأحلى؟ تدفعين عند الاستلام. » | `٣ قوارير · ١٣٩ ر.س ~~١٨٥~~ · الدفع عند الاستلام` |

**Recette Kie**
- **S1** `nano-banana-edit` + réf : `Amateur smartphone photo, vertical, a tired-looking Gulf woman (25-40) sitting at home in soft evening light, holding the red-and-white hair-oil bottle from the reference (kept EXACTLY as-is), three-quarter/side view, natural imperfect skin, candid UGC, NOT staged, empty darker area bottom for headline. No text, no logo.` (visage **partiel** — pas de gros plan frontal long).
- **S2** application, réf bouteille, huile fine translucide.
- **S3** `nano-banana-edit` : `...same woman, side view, running her hand through glossy healthy dark hair, soft smile, home light, candid...` → veo3 i2v : `slow hand-through-hair motion, 8s, no face morphing, constant frame rate`.
- ⚠️ Persona = actrice/UGC IA → **ne pas la présenter comme une cliente réelle nommée** (honnêteté). Ton « histoire », pas « faux avis ».

**3 hooks** : (a) femme lasse + flacon `جرّبت كل شي… هذا آخر أمل` [témoignage] · (b) `ما كنت مصدقة لين جربته` [social proof] · (c) `أمي كانت على حق` [émotion/héritage].

**Copy**
- **Snap headline (≤34)** : `رجعت لوصفة أمي… وفرقت` *(~20)*
- **Meta primary** : `بعد ما جرّبتُ كل المنتجات بلا نتيجة، رجعتُ لوصفة أمي: زيت المشاط الأحمر الطبيعي (مشاط، كركديه، حنّاء، ليمون). خلال أسابيع، صار التساقط أقل والشعر أكثف ولمعانًا. ٣ قوارير بـ١٣٩ ر.س بدل ١٨٥ · الدفع عند الاستلام — تفحصين الطلب قبل ما تدفعين.`
- **TikTok caption (≤100)** : `رجعت لوصفة أمي وشعري تغير 🤍 #تجربتي #العناية_بالشعر #السعودية`
- **CTA** : `اطلبي الآن — ادفعي عند الاستلام`

**Cut 6 s** : hook femme+flacon (0-2) → application (2-4) → offre (4-6).

---

## NEG — Negative prompt commun (à coller sur chaque génération)
```
AI look, plastic skin, waxy skin, extra fingers, deformed hands, face distortion, mannequin effect,
bottle distortion, warped or changing label, wrong logo, gibberish Arabic, morphing product, honey
texture, thick syrup oil, frizzy CGI hair, floating objects, fake shadows, robotic motion, flicker,
frame inconsistency, oversaturation, magenta cast, watermark, captions, on-screen text.
```

## Priorité de test (Snap-first)
Lance dans l'ordre : **C1 (douleur)** + **C5 (témoignage)** d'abord (les 2 plus « scroll-stoppers »
en COD), puis **C2 (secret)**, puis **C3 / C4**. 3 hooks/concept, budget égal, 48-72 h,
≥1000 impressions/variante, **hook rate ≥30 %** = on garde, **<25 % ou CTR <0,6 %** = on kill.
