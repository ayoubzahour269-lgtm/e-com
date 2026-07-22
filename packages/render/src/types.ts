// Contrats de données du moteur de rendu. Volontairement stricts :
// une CreativeSpec est validée avant génération (Zod ailleurs) — ici les types TS.

export type PlatformFormat = "meta_4x5" | "square_1x1" | "story_9x16";

export const FORMAT_SIZES: Record<PlatformFormat, { w: number; h: number }> = {
  meta_4x5: { w: 1080, h: 1350 },
  square_1x1: { w: 1080, h: 1080 },
  story_9x16: { w: 1080, h: 1920 },
};

/** Palette de marque (Product/Brand Kit). Ici : Mechat / زيت المشاط الأحمر. */
export interface BrandPalette {
  garnet: string; // fond / scrim
  gold: string; // titres, accents
  goldLight: string; // haut du dégradé or
  goldDark: string; // bas du dégradé or
  ink: string; // texte foncé
  paper: string; // texte clair / off-white
}

export interface OfferBlock {
  price: string; // ex "139 ر.س"
  compareAt?: string; // ex "185"
  badge?: string; // ex "الدفع عند الاستلام"
}

/**
 * Spécification d'une créative statique. Produite par l'ArtDirector à partir du copy.
 * `scene` = fond (image générée par kie.ai OU dégradé studio si absent).
 * Tout le TEXTE est rendu ici, hors-IA.
 */
export interface CreativeSpec {
  id: string;
  format: PlatformFormat;
  template: "editorial";
  lang: "ar";
  dir: "rtl";
  palette: BrandPalette;
  scenePath?: string; // fond photo/IA ; si absent → dégradé studio
  brandLine: string; // ligne de marque (ex زيت المشاط الأحمر)
  kicker?: string; // sur-titre court (latin luxe ou arabe)
  title: string; // titre principal (dégradé or)
  subtitle?: string; // bénéfice / primary court
  offer?: OfferBlock;
  titleFont?: "amiri" | "reemKufi"; // naskh classique vs kufi géométrique
}

export const MECHAT_PALETTE: BrandPalette = {
  garnet: "#6E1414",
  gold: "#C9A227",
  goldLight: "#F4E1A6",
  goldDark: "#9C7A1E",
  ink: "#1A0B0B",
  paper: "#F7F6F4",
};
