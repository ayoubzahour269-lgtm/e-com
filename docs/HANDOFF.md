> 🔴 SECURITY: this repo was PUBLIC and these secrets leaked. The real token/key were
> REDACTED and MUST be rotated (Shopify Theme Access app + kie.ai dashboard). Keep secrets
> in an uncommitted store, never in git. Also make the repo private.

# HANDOFF COMPLET — Projet زيت المشاط الأحمر (Mechat Red Oil, KSA)
> Document de passation pour toute autre branche/session Claude. Contient TOUTES les connexions,
> méthodes, leçons et inventaires de la session d'origine. Lire ce fichier = être à jour.
> ⚠️ Contient des secrets (tokens). Repo privé uniquement. Ne jamais rendre ce repo public sans purger ce fichier.

---

## 1. CONNEXIONS

### 1.1 Shopify — Theme Access (méthode complète)
On ne se connecte PAS à l'Admin API classique. On passe par le **proxy Theme Kit Access** avec un token `shptka_` :

- **Boutique** : `dw0dwe-bp.myshopify.com`
- **Token Theme Access** : `shptka_REDACTED__ROTATE_THIS_TOKEN_NOW`
- **Base URL** : `https://theme-kit-access.shopifyapps.com/cli/admin/api/2024-10/`
- **Headers obligatoires sur CHAQUE requête** :
  - `X-Shopify-Access-Token: shptka_REDACTED__ROTATE_THIS_TOKEN_NOW`
  - `X-Shopify-Shop: dw0dwe-bp.myshopify.com`
- **Thèmes** : Horizon (LIVE) id `188180398382` · Development (CLI, vierge) id `188183183662`

**Helper** : `./scripts/shopify.sh check|themes|list|get|put|putbin|del` — lit les identifiants dans
`secrets.env` (gitignoré, copier depuis `secrets.env.example`), gère le `-g`, l'encodage base64 et
le retry/backoff sur les 503. Les curl ci-dessous restent la référence bas niveau.

**Lister les thèmes**
```bash
curl -s "https://theme-kit-access.shopifyapps.com/cli/admin/api/2024-10/themes.json" \
  -H "X-Shopify-Access-Token: shptka_REDACTED__ROTATE_THIS_TOKEN_NOW" \
  -H "X-Shopify-Shop: dw0dwe-bp.myshopify.com"
```
**Lire un asset**
```bash
curl -s -g "https://theme-kit-access.shopifyapps.com/cli/admin/api/2024-10/themes/188180398382/assets.json?asset[key]=templates/product.mechat.json" \
  -H "X-Shopify-Access-Token: ..." -H "X-Shopify-Shop: dw0dwe-bp.myshopify.com"
```
**Écrire un asset TEXTE** (liquid/json) — body `{"asset":{"key":"...","value":"<contenu>"}}` en PUT sur `themes/<id>/assets.json`.
**Écrire un asset BINAIRE** (webp/mp4) — body `{"asset":{"key":"assets/x.webp","attachment":"<base64>"}}` (base64 SANS retour ligne : `base64 -w0`).
**Supprimer** — DELETE avec `?asset[key]=...` et flag curl `-g` (sinon les crochets cassent).

**Limitations & pièges Shopify (appris à la dure)** :
- **Products API = BLOQUÉE** pour les tokens Theme Access (302 redirect). Toute modification produit (prix, SKU, images produit) = côté admin humain uniquement.
- **BUG CRITIQUE** : une section nommée `"order"` dans le `order[]` d'un template JSON **crashe le rendu** (page "Something went wrong") — collision avec l'array `order`. Toujours préfixer : `lp_order`.
- **Les pages d'erreur sont mises en cache par URL** (15–60+ min). Technique du **twin QA** : uploader le même template sous `templates/product.mechatN.json` et tester via `?view=mechatN` (URL fraîche = pas de cache). Supprimer les twins après. NB : le layout `landing.liquid` ne matche les palettes que pour les suffixes `mechat-landing/mechat/mechat2..8/mechat10` — utiliser un de ceux-là.
- Le CDN Shopify **ré-encode** les images (webp→jpeg parfois) : le hash change mais le visuel est identique. Vérifier le contenu par l'œil/API, pas par hash CDN. Propagation CDN : parfois quelques minutes.
- Throttle : des 503 temporaires arrivent après beaucoup de PUT — retry avec backoff.

### 1.2 kie.ai (génération images/vidéos)
- **Clé API** : `REDACTED__ROTATE_THIS_KIE_KEY_NOW`
- **Crédits** : vérifier via `GET https://api.kie.ai/api/v1/chat/credit` (Bearer). (~460 restants fin de session ; recharges déjà faites 2×.)
- **Images (jobs)** : `POST https://api.kie.ai/api/v1/jobs/createTask` body `{"model":"...","input":{"prompt":"...","image_urls":[...],"output_format":"png","image_size":"9:16"}}` → poll `GET .../api/v1/jobs/recordInfo?taskId=...` (state: waiting/success/fail ; URL résultat dans `resultJson`).
  - `google/nano-banana` (4 cr) — génération simple
  - `google/nano-banana-edit` (4 cr) — **LE modèle fidélité produit** : édition/compositing avec image(s) référence(s) (accepte plusieurs image_urls)
  - `nano-banana-pro` (18 cr, SANS préfixe google/) — qualité art-directed 2K. ⚠️ Il IGNORE souvent la référence produit → ne jamais lui confier la bouteille.
  - `image_size` acceptés : `1:1, 3:4, 9:16, 16:9` … (`1:2` REFUSÉ)
- **Vidéos (veo)** : `POST https://api.kie.ai/api/v1/veo/generate` body `{"prompt":"...","model":"veo3_fast","aspectRatio":"9:16","imageUrls":["..."]}` → poll `GET .../api/v1/veo/record-info?taskId=...` (successFlag 0=pending 1=ok ; URL dans response.resultUrls[0]).
  - `veo3_fast` ~60 cr/clip 8s · `veo3` (qualité) plus cher. Sortie 720×1280 24fps **AVEC AUDIO généré** (foley!) — l'exploiter au montage.
- **Upload de fichiers** (pour donner une référence) : `POST https://kieai.redpandaai.co/api/file-stream-upload` (Bearer, multipart `file=@x.png`, `uploadPath=user-uploads`) → `data.downloadUrl`.
- **Helper** : `./scripts/kie.sh credit|upload|image|video|job|vjob` — lit `KIE_API_KEY` dans `secrets.env`
  (gitignoré), crée le job et poll jusqu'au résultat (affiche l'URL finale sur stdout, le `taskId` sur stderr).

### 1.3 GitHub / Git
- Repo : `ayoubzahour269-lgtm/e-com` · Branche de travail : `claude/landing-page-videos-animations-4f7v6f`
- Push : `git push -u origin <branche>` (remote local proxifié). PAS de `gh` CLI en session remote — utiliser les outils MCP GitHub.
- Ce document + les assets clés sont DANS le repo → toute session qui clone la branche a tout.

### 1.4 EasySell (COD) — configuration côté admin (à faire par le user, pas API)
- Formulaire : Form display → Embedded → Custom selector → **`#easysell-form-here`** (l'ancre existe dans `shopify/sections/landing-order.liquid`, avec fallback /cart/add auto si EasySell absent).
- Offre quantité à configurer : 2 packs = 259 ر.س.

### 1.5 Landing page live
- URL : `https://dw0dwe-bp.myshopify.com/products/عرض-3-زيت-المشاط-الأحمر-طبيعي-100?view=mechat`
- L'URL produit SANS ?view redirige automatiquement : snippet dans `layout/theme.liquid` du thème Horizon, keyé sur SKU `SA04050100M300` (backup original : `shopify/backup/theme.liquid.orig`).
- Template contenu : `shopify/templates/product.mechat-landing.json` (identique sur le thème sous 2 clés : `product.mechat-landing.json` ET `product.mechat.json`).

---

## 2. FAITS PRODUIT / BUSINESS (verrouillés — ne pas réinventer)
- Produit : **زيت المشاط الأحمر** — pack **3 × 250 ml** (cure 90 jours). SKU fournisseur `SA04050100M300`.
- Économie : coût 80 ر.س · min vente 110 · max 185. **Prix retenu : 139 ر.س, compare-at 185 (−25%)**. Offre 2 packs = 259.
- Marché : **KSA** (COD via EasySell, livraison 2–5 j, confirmation téléphonique).
- Ingrédients : مشاط · كركديه · حنّاء · ليمون — طبيعي 100%, بلا بارابين ولا سيليكون.
- Langue : **فصحى** (PAS de khaliji dans les textes écrits ; le khaliji est toléré en VO d'ads si testé).
- Claims policy-safe : « يقلّل التساقط الملحوظ » (jamais يوقف/يعالج), formulations impersonnelles, avant/après = coiffure + mention « صورة توضيحية ».
- Vraie bouteille : courte et LARGE, PET transparent, huile rouge grenat, capuchon blanc strié, étiquette blanche à bande rouge ondulée « زيت المشاط للشعر », sceau doré « 100% Natural طبيعي », citron, « 250 ml », 3 lignes bénéfices.
- Reviews de la page : photos RÉELLES d'unboxing du client (mechat-ugc1/2/3.webp) ; textes démo à remplacer par de vrais avis.

---

## 3. DOCTRINE CRÉA — les leçons durcies par l'expérience (LE plus important)

### 3.1 Fidélité produit (règle d'or absolue)
1. **NE JAMAIS générer ni animer le produit par IA.** Tout modèle (même pro, même avec référence/character sheet) redessine l'étiquette et fausse les proportions ; veo3 la déforme frame à frame.
2. **Méthode garantie** : détourer la vraie bouteille depuis la photo produit (rembg + alpha matting, upscale ×3 avant détourage) → `creative/bottle_straight.png` (déjà redressée : le détourage brut penchait de 5° !). Compositer ce cutout (ombre de contact elliptique floutée + reflet court 12–15% + réchauffement r×1.03/b×0.985) dans des DÉCORS générés SANS produit. Pack de 3 = même cutout ×3, même baseline, espacement régulier (0.26/0.50/0.74).
3. Le produit ne « bouge » que par mouvement caméra en post : zoompan push-in + light-sweep (streak.png), duplication animée frame par frame en PIL.
4. `google/nano-banana-edit` avec double référence (scène + packshot) est le fallback acceptable pour intégrer la bouteille dans une scène déjà générée — vérifier le résultat à l'œil systématiquement.

### 3.2 Réalisme matière
- **L'huile est FINE, translucide, rouge, fluide** — prompts : « thin, light, translucent red, low viscosity like a fine serum, NOT thick, NOT honey, NOT syrup ». Sans ça, les modèles font du miel.
- Cheveux : brins individuels, no plastic look ; visages animés = risque uncanny → les minimiser/faire courts, jamais de gros plan long.
- Anti-AI-look photos UGC : nano-banana-edit + dégradation smartphone PIL (rotation ±1.6°, WB chaud, contraste 0.93, noirs relevés, bruit σ5.5, double JPEG q74, WebP q72 640px).

### 3.3 Texte arabe
- **JAMAIS de texte arabe généré par IA** (il se déforme). PIL + libraqm (`features.check('raqm')`→True) + fonts Cairo (`~/.fonts/cairo1..3.ttf`) + `direction='rtl', language='ar'`. Titres or = dégradé via masque texte + ombre floutée. Fallback : rendu HTML + screenshot Chromium.
- Texte latin fin (« MASHAT · HIBISCUS ») peut être généré en scène (style Byredo, derrière l'objet, léger flou) — ça marche.

### 3.4 Grammaire pub (validée par itérations user)
- Structure DR : hook ≤2 s (payoff/problème/pattern interrupt, PAS de logo) → mécanisme → transformation → (beat humain court) → offre 3 bouteilles + prix barré + COD. 12–19 s.
- Diversité Andromeda : concepts structurellement différents, jamais >60% de similarité entre ads actives.
- **Transitions** : jamais de coupes sèches ni fondus passifs. Le film doit être UNE prise continue : transitions par mouvement caméra (push/pull/orbit), fondu-flou `xfade=hblur`, match-cuts d'objets, light-leak balayant + whoosh sonore synchronisé, poussière d'or continue (gold_dust.png défilant en blend screen 0.10–0.14). Le concept gagnant : « رحلة داخل الخصلة » (caméra qui entre DANS la fibre qui guérit = moment signature).
- **Palette** : claire et reposante (ivoire/crème + accents grenat/or), saturation ~0.86–0.88, PAS de fonds noirs-grenat continus (fatigue), PAS de courbes agressives (virage magenta vécu). Grade doux : `eq=saturation=0.88:brightness=0.03:contrast=0.97:gamma=1.06`.
- Méthode Byredo (spot luxe) : character sheet produit multi-angles → monde d'ingrédients en macros + héros produit dans UNE seule lumière → texte 3D derrière les objets. Doc : `creative/docs/METHODE-LUXE-BYREDO.md`.
- Voix off : فصحى féminine chaude 0.94×, scripts prêts dans les briefs. Musique néo-orientale -14 LUFS (à poser en post, pas générable ici). veo3 fournit du foley natif — le garder avec afade.

### 3.5 Recettes ffmpeg (binaire : `/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2` via `pip install imageio-ffmpeg`)
- Still → plan caméra : `scale=1188:2112,zoompan=z='1+0.06*on/D':d=D:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30` + overlay streak x=`-400+1480*(t/dur)`.
- Enchaînement invisible : `xfade=transition=hblur:duration=0.4-0.7` + `acrossfade`. Flash marqué : `fadewhite`. Directionnel : `slideup/smoothup`.
- Poussière d'or : image 1080×2600 défilante `crop=1080:1920:0:'(t/15)*680'` + `blend=all_mode=screen:all_opacity=0.10` — ⚠️ TOUJOURS `-shortest`/`-t DUR` avec `-loop 1` (sinon vidéo de 2 min).
- Whoosh synthétique : numpy (bruit filtré + sweep 250→3000 Hz, enveloppe sin^1.3) → amix weights `1 0.8`.
- Duplication produit : frames PIL (pivot par squeeze horizontal sin, spread eased p²(3-2p), overshoot 1+0.10sin, bloom + particules radiales) → `-framerate 30 -i f%03d.png`.
- QA vidéo : extraire frames `-ss T -frames:v 1` et VÉRIFIER À L'ŒIL chaque étape (règle : « décrire ce qui a réellement été rendu, pas ce qu'on a demandé »).
- Playwright/Chromium (`/opt/pw-browsers/chromium`, --no-sandbox) ne décode PAS le H.264 → frames via ffmpeg uniquement. Snapshot local de la page : télécharger les assets (`/cdn/...` ET `//cdn.shopify.com/...`, déséchapper `&amp;`) et réécrire les URLs.

---

## 4. INVENTAIRE DES ASSETS

### 4.1 Dans CE repo (branche `claude/landing-page-videos-animations-4f7v6f`)
- `shopify/` : templates + sections landing (préfixe lp*/lpx, palette par suffixe de template), layout, backup theme.liquid.
- `assets/` : tous les webp/mp4 de la landing (miroir des clés `assets/mechat-*` du thème Horizon).
- `creative/` (ajouté par ce handoff) : bottle_straight.png (cutout redressé — LE master produit), sheet.png (character sheet), hero_pack_light.png, packs & briefs (BRIEF-CREATIFS, MASTER-BRIEF-v2, REALISATION-CINEMA-v3, HISTOIRE-RITUEL, 4-SCENARIOS-15S, PROMPTS-SCENES, METHODE-LUXE-BYREDO), vidéos finales sélectionnées (V14 trio A/B, V16, V17, V20, V21, V24), statics premium.
- Le média-book fournisseur (Drive « mashat ») : `https://drive.google.com/drive/folders/1225AONs8KhDBMdnuBz1-PvUh6ypNv-6_?usp=sharing` (public). Contient packshots fidèles, lifestyle, pub 15s khaliji, landing v3 de référence.

### 4.2 Sur le thème Horizon (clés assets/)
`mechat-hero-luxe.webp, mechat-hero-video2.mp4, mechat-pack-podium.webp, mechat-flatlay.webp, mechat-shine2.webp, mechat-pour-real.webp, mechat-ba-before/after.webp (paire alignée avant/après), mechat-ugc1/2/3.webp (VRAIES photos client), mechat-oil-macro/ritual(+video)/reveal(+video)/hair-dull/hair-result/ingredients.webp` etc.

### 4.3 Éphémère (scratchpad — PERDU à la fin de session, tout l'important a été copié dans creative/)

---

## 5. CE QUI RESTE À FAIRE (côté user / autre branche)
1. EasySell : selector `#easysell-form-here` + offre 2 packs 259.
2. Remplacer les avis démo par de vrais avis.
3. Poser VO فصحى + musique sur les vidéos (scripts et directions dans les briefs).
4. Lancer les tests A/B (plans dans BRIEF-CREATIFS §test et MASTER-BRIEF §13) : Pixel+CAPI d'abord, ≥1000 impressions/variante, hook rate ≥30–35%, kill CTR <0.6%.
5. Itérer les créas sur les métriques réelles (renvoyer hook rate/CTR/CPA à Claude).
