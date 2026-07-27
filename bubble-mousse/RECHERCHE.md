# Notes de recherche — landing page Bubble Mousse

Ce que six recherches ont établi, et ce qui a été appliqué à `landing-v3.html`.
Les chiffres non sourcés ont été volontairement écartés : la section « folklore » à la fin
liste ceux qui circulent partout sans source primaire vérifiable.

---

## 1. Ce qui a changé la page

| Constat | Source | Application |
|---|---|---|
| Frais surprises = **40 %** des abandons de panier, cause n°1 | Baymard, méta-analyse de 50 études (2006-2025) | Livraison gratuite affichée dans le héro, la barre fixe, la pile d'inclus et le récapitulatif ; ligne « pas de frais ni de taxe supplémentaire » |
| Livraison lente = **20 %** des abandons, et en COD le délai fait passer le RTO de **22 % (<2 j) à 35 % (>5 j)** | Baymard ; Shipway ShipNotes FY25 | Délai 2–5 jours remonté à côté du CTA principal |
| Les interventions sur **le prix et l'offre** ont un effet **~127 % supérieur** aux interventions de design | Wharton, méta-analyse de 2 732 tests A/B sur 252 entreprises | L'offre est le premier bloc lisible après le titre |
| `backdrop-filter` = premier poste de saccade sur GPU Mali/Adreno d'entrée de gamme (rendu multi-passes par frame) | web.dev, chromium.org | Coupé sous 4 cœurs / 4 Go, fond opaque à la place |
| `content-visibility: auto` → **plus de 50 %** de coût de rendu en moins | web.dev | Appliqué aux 8 sections sous la ligne de flottaison |
| Les gagnants Awwwards scorent **8,0-9,2** en animation mais **5,8-7,0** en accessibilité | Grille de notation Awwwards | C'est l'écart qu'on exploite : accessibilité traitée au même niveau que le mouvement |
| Palette primée = deux couleurs, un noir **chaud** (jamais `#000`), un blanc cassé chaud, **un** accent saturé | Relevé de 11 Sites of the Day | Palette déjà conforme : `#0A0E0B` / `#F4F1E9` / or `#D9AC55` |
| Display à caractère + néo-grotesque en corps + **mono pour les libellés** | Typewolf, appariements réels de 10 sites retenus | Tajawal + IBM Plex Sans Arabic + IBM Plex Mono |

## 2. Deux erreurs corrigées dans le code

**Le tracking négatif ne se transpose pas à l'arabe.** La règle des titres primés
(`letter-spacing: -0.02em` à `-0.05em`) est une règle **latine**. L'arabe est une écriture
cursive dont les lettres se lient : resserrer le tracking écrase ces liaisons. Remis à
`normal` sur tous les titres arabes, conservé uniquement sur le wordmark latin.

**`aria-label` est ignoré sur les rôles génériques.** En découpant les titres mot à mot pour
l'animation, la correction usuelle (libellé sur le parent, mots en `aria-hidden`) ne
fonctionne que sur `h1`-`h6`, `a`, `button`. Sur un `<p>`, `aria-label` n'est pas honoré et
le texte disparaît entièrement de l'arbre d'accessibilité. Les éléments non nommables
reçoivent donc un doublon `.sr-only`. Vérifié par instantané de l'arbre d'accessibilité.

## 3. Points de vigilance pour la mise en production Shopify

- **Le poids.** La version artefact inline polices et images en base64 (~750 Ko) parce que la
  CSP y interdit toute ressource externe. En production, servir des fichiers réels :
  `srcset` + `sizes`, `loading="lazy"` partout sauf l'image LCP, `fetchpriority="high"` sur
  celle-ci. Le base64 gonfle de ~33 % et bloque le rendu.
- **Vitesse et conversion.** 1 s → 3,05 % de conversion, 2 s → 1,68 %, 3 s → 1,12 %
  (Portent, 5,6 M de sessions — corrélationnel, pas causal, mais l'ordre de grandeur tient).
- **Longueur de copie.** Unbounce (41 000 pages, 464 M de visiteurs) : mots difficiles
  −24,3 %, temps de lecture −19,4 %, nombre de mots −18,6 % de conversion. La page gagnerait
  à être resserrée si les tests le confirment.
- **Le COD recule dans le Golfe.** Checkout.com mesure la préférence COD à **20 %** en 2023
  (contre 41 % en 2020), et jusqu'à **10 %** en Arabie saoudite, aux Émirats et au Koweït.
  Les « 70-80 % de COD en MENA » viennent d'infographies de 2016-2019. À vérifier sur les
  données réelles de la boutique avant d'exclure le prépaiement.
- **Trois leviers RTO validés sur données transactionnelles** (RTO passé de 39 % à 21 %,
  410 M d'expéditions) : incitation au prépaiement, routage transporteur par code postal,
  vérification d'adresse avant expédition.

## 4. Folklore — chiffres à ne pas reprendre

Ces chiffres circulent partout sans source primaire vérifiable :

- « Amazon : 100 ms = −1 % de ventes » — billet de blog personnel de 2006 sur un test interne
  d'avant 2002, jamais publié ni reproduit.
- « Akamai : 100 ms = −7 % de conversion » — page source disparue, aucune méthodologie publique.
- « 53 % des visites mobiles abandonnées au-delà de 3 s » — URL Think with Google morte.
- « +270 % de conversion avec 5 avis » (Spiegel) — étude observationnelle sur la probabilité
  d'achat relative, ni causale ni un test A/B.
- « Lire sur mobile est deux fois plus difficile » — invalidé par NN/g eux-mêmes en 2016.
- « Multi-étapes = +300 % » — auto-déclaré par l'éditeur qui vend le produit multi-étapes.
- Toutes les règles chiffrées sur le nombre de champs de formulaire attribuées à Baymard.
- Compte à rebours, rareté artificielle, compteurs « X personnes regardent » : **aucune étude
  avec méthodologie publiée ne démontre un effet net positif.** Rien de tout cela n'est sur
  la page, et rien ne doit y être ajouté.

## 5. Ce que la recherche n'a pas pu établir

Aucune donnée fiable n'a été trouvée sur : les benchmarks de conversion du secteur
beauté/cosmétique, l'effet isolé du champ téléphone, multi-étapes contre une seule étape à
contenu constant, les positions de libellés, et l'effet net d'un popup mobile sur le chiffre
d'affaires. Ces sujets sont dominés par la citation circulaire.
