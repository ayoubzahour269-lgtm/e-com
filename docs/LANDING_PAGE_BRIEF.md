# Brief conversion — Landing Bubble Mousse (KSA / COD)

## 1. Objectif business
Vendre le **lot de 3 flacons** de صبغة شعر رغوية نباتية BEIROU Bubble Mousse en **COD** sur le marché
saoudien, trafic payant Meta/TikTok. **CTA unique** : `اطلبي الآن — الدفع عند الاستلام`, qui scrolle
toujours vers le formulaire de commande intégré (jamais de redirection panier/checkout).

## 2. Audience et contexte
- Femmes 30–55 ans, KSA, arabe **فصحى** à l'écrit, mobile Android en priorité (≥ 80 % du trafic).
- Conscientes du problème (**الشيب** — cheveux gris/blancs) et déjà utilisatrices de colorations :
  trafic *solution-aware*. La page n'a pas à éduquer sur le besoin, elle doit lever les objections
  propres à la coloration maison : durée, odeur d'ammoniaque, agression du cuir chevelu, ratés.
- Attente culturelle : confirmation téléphonique avant expédition, paiement à la livraison.

## 3. Promesse et offre
- **Promesse** : couvrir le شيب de façon **égale et visible en 25 minutes**, à la maison, en
  s'utilisant **comme un shampoing**, avec une formule **végétale sans ammoniaque**.
- **Offre** : lot de 3 flacons 500 ml + **cadeau : زجاجة الزيت** (flacon applicateur à peigne).
- ⚠️ **Prix non fourni par le client** → les montants de la page sont des **placeholders éditables**
  dans les réglages de la section Shopify (voir §9).

## 4. Objections à traiter dans la page
| Objection | Où elle est traitée |
|---|---|
| « Ça va abîmer mes cheveux / mon cuir chevelu » | Bandeau confiance + section essences + FAQ |
| « Ça ne couvrira pas vraiment mes cheveux blancs » | Slider avant/après (interaction signature) + FAQ |
| « C'est compliqué, je vais rater » | Section « comme un shampoing », 3 étapes, 25 min |
| « L'odeur d'ammoniaque » | Badge خالٍ من الأمونيا, répété en bandeau et en FAQ |
| « Combien de temps ça tient » | Bénéfices + FAQ |
| « Je paie avant de recevoir ? » | Bandeau annonce, formulaire, FAQ, barre sticky |

## 5. Hiérarchie du message
H1 (couvrir le شيب en 25 min, comme un shampoing) → offre 3 flacons + cadeau → preuve visuelle
avant/après → mécanisme (essences végétales, sans ammoniaque) → simplicité d'usage → contenu du lot →
avis → formulaire COD → FAQ → dernier CTA.

## 6. Concept visuel — en une phrase
**Un herbier d'apothicaire** : page ivoire, macros botaniques sur lin, et une **mousse** qui sert de
matière conductrice — les sections ne se séparent pas par des traits mais par une **lisière de mousse**.

### Système de design
| | Choix | Raison |
|---|---|---|
| Fond | `--ivory #F3EFE4` / `--surface #FBF9F3` | Le fond ivoire des packshots fournisseur — cohérence pub → page |
| Vert profond | `--forest #17331F` | Bandes pleines, footer : la « feuille » du packaging poussée en profondeur |
| Vert marque | `--leaf #5B9B4A` | Repris du flacon, réservé aux accents végétaux |
| Or | `--brass #B98A2E` | La goutte dorée de l'étiquette — **réservé au CTA** et aux étoiles |
| Encre | `--ink #14120E` | Texte + la promesse « noir naturel » |
| Display | **Reem Kufi** 600/700 | Kufi géométrique : différencie franchement de la page Mechat (Amiri naskh) |
| Corps | **Tajawal** 400/500/700 | Sans-serif arabe très lisible sur petit Android |

**Rayon, ombre, rythme** : un seul rayon (`18px`), une seule ombre (`0 12px 30px rgba(20,18,14,.10)`),
une seule échelle typographique (ratio 1.25).

### Élément signature
La **lisière de mousse** (`.bm-foam`) : un séparateur SVG en bulles organiques, décliné en trois
variantes de la même géométrie, qui relie chaque section — la matière du produit devient la grammaire
de la page.

### Interaction signature
Le **révélateur de شيب** : un slider avant/après tiré à la main, dont la poignée est une bulle de
mousse. Il démontre le bénéfice n°1 au lieu de l'affirmer. Accessible au clavier (`input[type=range]`),
neutralisé proprement en `prefers-reduced-motion`.

## 7. Motion
Réserve maximale : révélations `opacity`+`translateY` (IntersectionObserver, une seule courbe), la
lisière de mousse qui monte de 8 px, hover CTA. Deux bulles flottantes dans le hero seulement.
`prefers-reduced-motion: reduce` → tout est neutralisé, contenu immédiatement visible.

## 8. Pas de 3D
Aucun modèle 3D n'existe et les visuels fournisseur sont en 360×360. Un faux 3D dégraderait la
fidélité produit (doctrine HANDOFF §3.1). À la place : **vrai flacon détouré** (`creative/bubble/bottle_cut.png`,
384×1072, extrait de la photo fournisseur) composité sur des décors générés **sans produit**.

## 9. Hypothèses et éléments manquants
1. **Prix placeholders** — `499 ر.س` barré `299 ر.س` pour le lot de 3. À corriger dans les réglages
   de section avant diffusion.
2. **Avis clients** — aucun avis réel fourni. La section avis est pilotée par les réglages et
   **reste masquée tant qu'ils sont vides** : aucun faux témoignage n'est écrit dans la page.
3. **Avant/après** — images générées, marquées **« صورة توضيحية »** en clair. À remplacer par de vraies
   photos client dès que disponibles.
4. **Résolution produit** — sources 360×360 ; le flacon est donc affiché à ≤ 320 px de large. Le
   remplacement par des visuels Higgsfield haute définition est prévu (`docs/PROMPTS-HIGGSFIELD.md`).
5. **Contenu du lot** — la page promet 3 flacons + le flacon applicateur offert, conformément aux
   visuels fournisseur. À confirmer avant diffusion (cf. `PRODUIT-bubble-mousse.md` §6.7).
6. **Claims** — « يعالج » et « يقلل التساقط » du brief source sont **écartés** (doctrine claims KSA) ;
   « يغطي الشيب تماماً » est remplacé par « تغطية متساوية وواضحة ».
