# AI Ads Studio — Architecture & Roadmap

> Agence créative encodée : comprend un produit à partir de ses images, en déduit
> stratégie / angles / copy conformes aux plateformes, produit des créatives fidèles
> (flacon exact + typographie arabe parfaite), exporte aux specs de chaque réseau avec
> un plan de test — et, à terme, **apprend des vrais résultats d'ads**.

## Décisions verrouillées
- **Cible** : outil **interne d'abord** (opérations Mechat + futurs produits), architecturé propre → SaaS ensuite.
- **Format #1** : **statics art-directés** (pipeline le plus fiable/rentable).
- **Autonomie** : **deux modes** — autopilote (volume) + édition avancée (hero creatives).
- **Moteurs** : **kie.ai comme agrégateur primaire** (~343 modèles) derrière une **interface d'adaptateur** swap-safe.

## Thèse produit (le moat)
La génération se commoditise (tout le monde surcouche Veo/Kling/Seedance). Le moat = **(1)** le
**jugement stratégique encodé** (angles, testing discipline, policy-safety, spécialisation MENA/COD —
déjà documenté dans `creative/docs/`) et **(2)** la **boucle de performance fermée** (réinjecter les
résultats Meta/TikTok pour apprendre quels angles/hooks gagnent par vertical). Wedge géographique :
**le AI Ads Studio pour le e-commerce MENA & COD**, marché mal servi par les outils occidentaux
(arabe déformé en génération, fusha vs dialecte, COD/EasySell).

## Architecture retenue : **monolithe modulaire + pipeline en DAG déterministe**
Rejeté : microservices (sur-ingénierie pour l'interne) et framework 100% agentique (non-déterminisme
là où la prod doit être fiable). Retenu : un déployable modulaire, coutures nettes pour extraire des
services plus tard. Le pipeline créatif est un **graphe d'états explicite** ; les **agents = appels LLM
à des nœuds précis** (stratégie/copy/DA) ; les **étapes de production = outils déterministes** (gen,
composite, typo, export). Génération dans un **worker** sur **queue durable** (jobs de plusieurs minutes,
reprenables). Multi-tenancy = simple couture (`tenant_id`), dormante aujourd'hui.

## Boucle créative
1. **Intake & compréhension** — vision extrait les attributs produit (+ URL Shopify / faits) → **Product Brief** + **Character Sheet** (source de vérité produit).
2. **Stratégie** ⛳️*CP1* — angles (taxonomie Andromeda) → hooks → copy par plateforme (caps caractères) → **linter policy**.
3. **Direction artistique** ⛳️*CP2* — scène (prompt art-directé, **zone de copy réservée**) + layout template + zones de texte → `CreativeSpec`.
4. **Production** ⛳️*CP3 (éditeur)* — scène (`nano-banana-pro`) → **compositing flacon** (`nano-banana-edit` double-réf) → **couche typo hors-IA (Chromium)** → composition (Sharp) → formats.
5. **Assemblage & export** — specs exactes (4:5 / 1:1 / 9:16), nomenclature, **plan de test auto**, **estimateur de coût crédits**.
6. **Boucle de perf** *(phase 4)* — métriques → `Learner` → enrichit la bibliothèque d'angles gagnants.

## Arborescence (monorepo pnpm)
```
apps/            web (Next.js, UI deux modes + éditeur)  ·  worker (exécution du DAG)
packages/
  core/          domaine : types, schémas Zod, state-machine du pipeline
  agents/        Strategist · HookWriter · Copywriter · ArtDirector · IntakeAgent · Learner + prompts
  generation/    adaptateurs (kie.ai primaire) + model router + cost ledger + best-of-N + QC   ✅ scaffolé
  render/        moteur typo+compositing (templates HTML/CSS → Chromium → Sharp)               ✅ opérationnel
  policy/        linter conformité, caps caractères, listes de claims (par marché/langue)
  brandkit/      Product/Brand Kit + constructeur de Character Sheet
  db/            schéma, migrations Drizzle, repositories
templates/       layouts statics, grammaires de plans (vidéo), prompts — EN DONNÉES (éditables sans redeploy)
```
**Principe** : la *méthode* (angles, layouts, grammaires, prompts, caps, règles policy) vit en **données
versionnées** dans `templates/`, pas en dur → on affine l'agence sans toucher au code.

## Stack
TypeScript end-to-end · Next.js · worker BullMQ/Redis · Postgres+Drizzle · S3/R2 (content-addressed) ·
**rendu = Chromium headless (HarfBuzz) → Sharp** · LLM = Claude · Zod. Fournisseur = kie.ai via adaptateur typé.

## Fiabilité sans babysitting (human-**on**-the-loop)
- **Déterministe par construction** (~100%) : typographie arabe, layout/cadrage, copy+caps, policy, export.
- **Probabiliste dompté** (scène + compositing) : **best-of-N** + **critiques auto** (vision compare le
  candidat à la Character Sheet) → rejet+relance automatiques ; **seuil de confiance** → n'escalade que
  les ~10% incertains. Character Sheet **validée une fois par produit**, réutilisée ensuite.

## Roadmap
| Phase | Livrable | Contenu |
|---|---|---|
| **0 — Fondations & spikes** | Socle + 2 risques dé-risqués | Monorepo, adaptateur kie.ai + cost ledger, **Spike A typo arabe** ✅, **Spike B compositing+QC** (code prêt, run en attente de clé). |
| **1 — MVP statics** | Reproduire les statics Mechat auto | Intake + Character Sheet + Brief ; agents stratégie + linter ; 5 layouts ; scène→composite→typo→export ; autopilote + éditeur ; plan de test ; estimateur coût. |
| **2 — Brand kits & scale** | Multi-produits | Product Kits, bibliothèque d'angles versionnée, + layouts/langues, cache/dédup. |
| **3 — Vidéo** | Héros puis narratif | veo3 héros, puis film 15s (character sheet → grammaire de plans → gen → montage → VO). |
| **4 — Boucle de perf** | Le vrai moat | Métriques manuelles → API Meta/TikTok → `Learner`. |
| **5 — SaaS-ready** | Ouverture | Auth, tenancy, billing/crédits, quotas, avatars UGC, white-label. |

## État réel (mis à jour)
Le studio est **fonctionnel de bout en bout** pour les statics, avec UI de pilotage.

**Packages (tous typecheck OK, poussés) :**
- `core` — schémas Zod (ProductKit, Concept, CreativeSpec) + pipeline.
- `policy` — linter conformité déterministe (caps, attributs personnels, dialecte, claims, disclaimers).
- `agents` — cerveau Andromeda (angles/hooks/copy) depuis `templates/angles.json` + Product Kit ; LLM branchable.
- `generation` — adaptateur kie.ai (jobs/veo/upload, backoff, guards) + cost ledger + best-of-N + FidelityCritic.
- `render` — typo arabe déterministe (Chromium) + compositing (Sharp) + ArtDirector (placement/collision) +
  templates (editorial, hero_light, banner_top) + compositing verrouillé (fallback fidélité).

**Apps :**
- `apps/worker` — orchestrateur : `batch` (IA-embed, défaut), `bon`/`finalize` (best-of-N + critique),
  `batch-locked` (fallback verrouillé). Jobs async (fichiers `out/jobs/<id>.json`).
- `apps/web` — UI Next.js RTL : **dashboard** (concepts + pipeline + galerie + téléchargements),
  **/concepts** (checkpoint copy éditable, linter en direct), **/review** (best-of-N : lancer génération
  async avec barre de progression → choisir le gagnant → finaliser). Le critique de fidélité = humain
  aujourd'hui (interface `FidelityCritic` prête pour un modèle vision).

**Fidélité (fermée) :** IA-embed par défaut (produit *fondu* dans la scène, prompt fidélité renforcé) ;
best-of-N + critique pour écarter les dérives ; mode verrouillé (re-collage des pixels réels) en fallback.

**Décisions produit verrouillées :** produit canonique = `creative/bottle_straight.png` (bouteille ronde).

**Hardening :** revue adversariale multi-agents → 7 correctifs de robustesse (kie.ts, worker, finalize).

**Reste :** checkpoint storyboard/DA éditable, export multi-format (9:16 story), vidéo (Phase 3),
boucle de perf (Phase 4), passage SaaS (auth/tenancy/billing).
