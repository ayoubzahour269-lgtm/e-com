import { z } from "zod";

// ————— Primitives —————
export const Platform = z.enum(["meta", "tiktok", "snap", "instagram", "youtube"]);
export const PlatformFormat = z.enum(["meta_4x5", "square_1x1", "story_9x16"]);
export const Angle = z.enum([
  "offer", "before_after", "claim", "outcome", "trust_cod", "comparison", "pain", "heritage",
]);
export const HookType = z.enum(["result_first", "curiosity", "identity", "pain", "value", "comparison"]);

export const BrandPalette = z.object({
  garnet: z.string(), gold: z.string(), goldLight: z.string(), goldDark: z.string(),
  bandRed: z.string().optional(), ink: z.string(), paper: z.string(),
});

export const OfferBlock = z.object({
  price: z.string(),
  compareAt: z.string().optional(),
  badge: z.string().optional(),
});

// ————— Product Kit (source de vérité produit, cf. templates/products/*.json) —————
export const ProductKit = z.object({
  id: z.string(),
  brand: z.string(),
  category: z.string(),
  market: z.string(),
  lang: z.literal("ar"),
  dir: z.literal("rtl"),
  canonical: z.object({
    masterDetoured: z.string(), // chemin du master produit détouré (référence VERROUILLÉE)
    characterSheet: z.string().optional(),
    shape: z.string().optional(),
    label: z.string().optional(),
    volume_ml: z.number().optional(),
  }),
  palette: BrandPalette,
  facts: z.object({
    ingredients: z.array(z.string()).default([]),
    claims: z.array(z.string()).default([]),
    pack: z.string().optional(),
    sku: z.string().optional(),
  }),
  offer: OfferBlock.extend({ twoPacks: z.string().optional() }),
  copyCaps: z.record(z.string(), z.number()).optional(),
  policy: z.object({ notes: z.string().optional(), avoidDialect: z.boolean().optional() }).optional(),
});
export type ProductKit = z.infer<typeof ProductKit>;

// ————— Brief (sortie de l'IntakeAgent : compréhension produit + marché) —————
export const Brief = z.object({
  productId: z.string(),
  persona: z.string(), // cible
  emotions: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  objections: z.array(z.string()).default([]),
  positioning: z.string().optional(),
  market: z.string(),
  lang: z.literal("ar"),
});
export type Brief = z.infer<typeof Brief>;

// ————— Concept (angle + hook + copy par plateforme) —————
export const CopySet = z.object({
  platform: Platform,
  primary: z.string().optional(),
  headline: z.string().optional(),
  description: z.string().optional(),
  caption: z.string().optional(),
});
export const Concept = z.object({
  id: z.string(),
  angle: Angle,
  hookType: HookType,
  hook: z.string(),
  rationale: z.string().optional(), // pourquoi cet angle pour cette cible
  copy: z.array(CopySet).default([]),
});
export type Concept = z.infer<typeof Concept>;

// ————— CreativeSpec (entrée du moteur de rendu) —————
export const CreativeSpec = z.object({
  id: z.string(),
  conceptId: z.string().optional(),
  format: PlatformFormat,
  template: z.enum(["editorial", "hero_light"]),
  lang: z.literal("ar"),
  dir: z.literal("rtl"),
  palette: BrandPalette,
  productMaster: z.string().optional(), // master détouré à composer
  scenePath: z.string().optional(), // scène plein cadre (mode editorial)
  titleFont: z.enum(["amiri", "reemKufi"]).optional(),
  kicker: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  offer: OfferBlock.optional(),
  brandLine: z.string(),
});
export type CreativeSpec = z.infer<typeof CreativeSpec>;
