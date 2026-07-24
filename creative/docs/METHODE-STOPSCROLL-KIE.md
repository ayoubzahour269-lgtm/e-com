# MÉTHODE — Créas stop-scroller avec Kie AI
### زيت المشاط الأحمر · marché Golfe · Snap / Meta / TikTok · 9:16

> Objectif : produire des vidéos **simples** qui **arrêtent le scroll dans les 2 premières secondes**
> et ne ressemblent **pas** à une pub. Ce doc est la méthode ; les créas prêtes à produire sont dans
> `BATCH-STOPSCROLL-01.md` ; le pipeline de génération est dans `../../tools/`.

---

## 0. Le constat (pourquoi les vidéos précédentes n'étaient pas regardées)
Les créas d'avant visaient un **spot cinématique de luxe** (macro slow-mo, style Byredo/ARRI,
« رحلة القطرة »). En paid social ça échoue pour 3 raisons :
1. **Trop léché → le cerveau détecte « pub » → scroll.** Le feed récompense le natif « filmé au tel ».
2. **Le macro cinématique IA = uncanny.** C'est là que veo3 a l'air le plus faux → méfiance → scroll.
3. **Hook abstrait, sans tension, sans humain.** Pas de curiosité ni de douleur dans les 2 s.

**Règle n°1 : on ne fabrique pas un beau film. On fabrique un moment natif, simple, qui accroche.**

---

## 1. Le pipeline en 3 blocs — avec le BON modèle à chaque fois
Un stop-scroller se fabrique en 3 temps ; à chaque temps on choisit le **meilleur modèle Kie** selon la
complexité. **Kie = 300+ modèles derrière une seule API** — ne PAS tout faire avec veo3 + nano-banana.

| Bloc | Rôle | Modèle par défaut | Quand monter en gamme |
|---|---|---|---|
| **A. Image** | Still réaliste (scène + produit) | `nano-banana-edit` (réf produit) · `seedream` (scène) | `imagen4`/`seedream` si photoréalisme critique |
| **B. Mouvement** | UN petit mouvement crédible (i2v) | `seedance-fast` ou `veo3-fast` | `kling`/`seedance` (humain) · `veo3` (cinéma+audio) |
| **C. Montage** | Hook texte + son + coupes + end-card | *(CapCut / ffmpeg, hors Kie)* | — |

### 1.1 Matrice de sélection — le cœur : bon modèle = bon résultat
**Image** (API `jobs/createTask`) :
| Besoin | Champion | Fallback |
|---|---|---|
| Still produit **fidèle** (réf bouteille) | `nano-banana-edit` | `seedream` (i2i) |
| Scène UGC **photoréaliste** (peau/cheveux) | `seedream` · `imagen4` | `nano-banana` |
| Ingrédients / nature morte luxe | `seedream` · `imagen4` | `flux` |
| Poster / texte latin net | `gpt-image` · `ideogram` | — |
| Upscale HD | Topaz · Recraft | — |

**Vidéo** (par complexité) :
| Besoin | Champion | Fallback | Coût |
|---|---|---|---|
| i2v **simple/subtil** (main, flacon, cheveux) | `seedance-fast` | `veo3-fast` | $ |
| i2v **réaliste qualité** (humain/cheveux) | `kling` · `seedance` | Veo 3.1 | $$ |
| **Cinéma + audio natif** (foley/VO) | `veo3` | `kling` | $$$ |
| **Multi-shot** ~15 s | `kling` | `seedance` | $$ |

> Le pipeline `../../tools/kie_gen.py` connaît ces alias (`python tools/kie_gen.py models`) et
> `--model auto` choisit le champion selon le contexte. IDs exacts : `docs.kie.ai/market/<provider>/<model>`.

**Workflow credit-smart (économise tes crédits) :**
1. Génère **3-4 variantes** du still (`--model auto`, ~4 cr) → garde la **moins-IA**.
2. Composite dessus **ta vraie bouteille** détourée (`../bottle_straight.png`) — voir §3.
3. **Seulement sur le still gagnant**, lance **1** clip i2v (`seedance-fast`/`veo3-fast`, mouvement minimal).
   → Souvent, un simple **push-in (Ken Burns)** + texte + son suffit : **0 crédit vidéo**, et ça a l'air
   **moins faux** qu'une vidéo IA. Réserve les modèles vidéo aux plans où le mouvement vend vraiment.

---

## 2. Le système « hook en 2 secondes »
Le hook = **1ʳᵉ image + gros texte** (posé au montage, pas par l'IA). Une seule idée. 4 familles qui
marchent pour ce produit — teste **3 hooks de familles différentes** sur le même corps de vidéo :

| Famille | Ce qu'on montre en frame 1 | Exemple de texte AR |
|---|---|---|
| **Problème / pattern interrupt** | Peigne/brosse plein de cheveux, oreiller, mèche qui casse | `شعرك يطيح بهالشكل؟` |
| **Question / secret (curiosité)** | Main tenant le flacon rouge près caméra | `السر اللي بنات الخليج يخبّونه` |
| **Reveal satisfaisant** | Cheveux ternes → brillants (cadrage coiffure) | `٩٠ يوم… شوفي الفرق` |
| **Testimonial natif** | Femme réaliste tenant le flacon (ne parle pas, le texte porte) | `جرّبته آخر شي بعد ما يئست` |

Règles hook : **pas de logo** au début, **produit visible tôt** (surtout Snap), payoff/tension
immédiate, texte **court et gros**, sûr côté policy (`يقلّل التساقط الملحوظ`, jamais `يوقف/يعالج`).

---

## 3. Règle produit (fidélité = zéro négociation)
Reprise de `../../docs/HANDOFF.md §3` — c'est ce qui a résolu « Kie = flacon déformé » :
1. **Ne JAMAIS générer ni animer le flacon par IA** (l'étiquette et les proportions se cassent).
2. Détourer la **vraie** bouteille → `../bottle_straight.png` → la **compositer** dans une scène
   générée **SANS produit** (ombre de contact floutée + reflet court 12-15% + réchauffement r×1.03).
   Pack de 3 = même cutout ×3, même baseline. → `../../tools/composite.py`.
3. Le flacon ne « bouge » que par **caméra** (push-in + light-sweep), jamais par morphing IA.
4. Fallback : `nano-banana-edit` avec **double référence** (scène + packshot) pour intégrer la
   bouteille — **vérifier le résultat à l'œil** systématiquement.

---

## 4. Réalisme matière & anti-AI-look
- **Huile** : « thin, light, translucent red, low viscosity like a fine serum — NOT thick, NOT honey,
  NOT syrup ». Sinon les modèles rendent du miel.
- **Visages** : les minimiser (de profil, partiels, de dos, mains) — un visage animé long = risque
  uncanny. Pour un « testimonial », une femme **qui ne parle pas** + texte à l'écran passe très bien.
- **Look UGC** : demander une **photo smartphone amateur** (léger grain, lumière naturelle, cadrage
  imparfait) plutôt que « editorial 50mm cinematic ». C'est contre-intuitif mais **ça performe**.
- **Texte arabe** : **JAMAIS généré par l'IA** (il se déforme). Posé au montage (CapCut) ou via
  `../../tools/arabic_text.py` (PIL + libraqm, RTL).

---

## 5. Prompt templates réutilisables (copier-coller dans Kie)

### 5.1 Still UGC — `nano-banana-edit` (avec réf bouteille), `image_size: 9:16`
```
Amateur smartphone photo, vertical 9:16, [SCÈNE : ex. a young Gulf woman's hand pouring a few drops
of thin translucent red hair oil onto her scalp, dark hair, plain modern bathroom], the red-and-white
hair-oil bottle from the reference image kept EXACTLY as-is (same short wide shape, same label),
natural indoor lighting, slight phone-camera grain, realistic, casual, candid, NOT staged,
shallow but imperfect focus. No text, no logo, no watermark, no captions.
```
> Passe `../bottle_straight.png` (uploadée) en `image_urls`. Garde une **zone vide** en haut ou en bas
> pour le texte. Génère 3-4 variantes, garde la plus crédible.

### 5.2 Micro-vidéo — `veo3_fast` (image-to-video), `aspectRatio: 9:16`
```
Subtle realistic handheld phone footage, 8s. [UN SEUL MOUVEMENT : ex. the hand slowly tilts the
bottle and a thin translucent red oil drop forms and falls / the woman's long dark hair sways gently /
slow natural push-in]. Natural indoor light, candid UGC feel, steady constant frame rate, fluid
frame-to-frame, no morphing, no warping of the bottle or label, no text, no captions.
```
> `imageUrls` = ton still gagnant (composité). **Un** mouvement, pas trois.

### 5.3 Negative prompt (obligatoire — repris de MASTER-BRIEF §11)
```
AI look, plastic skin, waxy skin, extra fingers, deformed hands, face distortion, mannequin effect,
bottle distortion, warped or changing label, wrong logo, gibberish Arabic, morphing product, honey
texture, thick syrup oil, frizzy CGI hair, floating objects, fake shadows, robotic motion, flicker,
frame inconsistency, oversaturation, magenta cast, watermark, captions, on-screen text.
```

---

## 6. Specs plateforme (rappel express)
Toutes : **9:16, 1080×1920, sound-on + sous-titres**, produit tôt, une idée, CTA + prix + COD.

| | Snapchat | TikTok | Meta (Reels/Feed) |
|---|---|---|---|
| Décision | **~2 s** | ~2-3 s | ~3 s (feed = survit en muet via texte) |
| Durées | 6 s (awareness) + 12-15 s (conv.) | 9-21 s | 6-15 s |
| Headline | **≤34 car.** | caption ≤100 car. | primary ~125 car. avant « … » |
| Safe zones | haut ~150 px / bas ~150-300 px | idem + droite (boutons) | garder le texte au centre |
| Aesthétique | selfie/UGC, offre tôt | UGC natif, son tendance | UGC ≥ studio aussi |

---

## 7. Workflow bout-en-bout (checklist de prod)
1. Choisir 1 concept dans `BATCH-STOPSCROLL-01.md` + ses 3 hooks.
2. `nano-banana-edit` × 3-4 → garder la moins-IA (`tools/kie_gen.py --image`).
3. Compositer la vraie bouteille (`tools/composite.py`).
4. Mouvement : `veo3_fast` i2v **ou** push-in ffmpeg (si le mouvement n'apporte rien).
5. Poser le **texte arabe** (CapCut ou `tools/arabic_text.py`) — hook gros en frame 1.
6. Son : voix-off فصحى/khaliji **ou** son tendance Snap/TikTok + sous-titres.
7. End-card : `٣ قوارير · ١٣٩ ر.س ~~١٨٥~~ · الدفع عند الاستلام`.
8. Exporter **2 cuts** : 6 s + 12-15 s. Contrôle **sur téléphone**, muet ET son.
9. **Checklist anti-AI** (§4) avant lancement.

## 8. Test (simple)
4-5 concepts × 3 hooks · budget égal · 48-72 h · ≥1000 impressions/variante · **1 variable/test**.
KPIs : **hook rate ≥30-35 %** (juge le hook) · hold rate (le corps) · CTR (l'offre).
**Kill** hook rate <25 % ou CTR <0,6 %. Scale le gagnant avec **3 hooks frais** (similarité <60 %).
