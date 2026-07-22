// ArtDirector — placement de texte scène-conscient. Détecte la TRAVÉE VERTICALE du produit
// (profil d'énergie de gradient par ligne) puis vérifie si la zone de texte d'un template
// la chevauche. C'est le garde-fou qui empêche d'imprimer un titre par-dessus le produit (image B).
import sharp from "sharp";

export interface Span { top: number; bottom: number } // bornes normalisées 0..1

export interface SceneAnalysis {
  productSpan: Span; // travée verticale occupée par le produit
  clearance: { top: number; bottom: number }; // espace libre au-dessus / en-dessous
  bandEnergy: { top: number; bottom: number }; // "occupation" moyenne des bandes (0 = vide, idéal pour texte)
  rowEnergy: number[]; // profil vertical (debug)
}

/** Zones de texte (bornes verticales normalisées) par template. */
export const TEXT_ZONES: Record<string, Span[]> = {
  editorial: [{ top: 0.52, bottom: 0.95 }], // bloc ancré en bas → recouvre le centre-bas
  hero_light: [
    { top: 0.03, bottom: 0.2 }, // titre en haut
    { top: 0.78, bottom: 0.97 }, // offre en bas
  ],
};

const OVERLAP_TOL = 0.12; // fraction de la zone de texte tolérée en chevauchement

function overlapFraction(zone: Span, span: Span): number {
  const lo = Math.max(zone.top, span.top);
  const hi = Math.min(zone.bottom, span.bottom);
  const inter = Math.max(0, hi - lo);
  const zoneH = Math.max(1e-6, zone.bottom - zone.top);
  return inter / zoneH;
}

export async function analyzeScene(imagePath: string): Promise<SceneAnalysis> {
  const { data, info } = await sharp(imagePath)
    .grayscale()
    .resize({ width: 64, fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const at = (x: number, y: number) => data[y * w + x] ?? 0;

  // Énergie de gradient par ligne (contours = produit/texte de label).
  const rowEnergy = new Array(h).fill(0);
  for (let y = 0; y < h - 1; y++) {
    let s = 0;
    for (let x = 0; x < w - 1; x++) s += Math.abs(at(x + 1, y) - at(x, y)) + Math.abs(at(x, y + 1) - at(x, y));
    rowEnergy[y] = s / w / 255;
  }
  const maxRow = Math.max(1e-6, ...rowEnergy);
  const thresh = 0.3 * maxRow; // lignes « occupées »

  let top = -1, bottom = -1;
  for (let y = 0; y < h; y++) {
    if (rowEnergy[y] >= thresh) { if (top < 0) top = y; bottom = y; }
  }
  if (top < 0) { top = 0; bottom = h - 1; } // rien détecté → tout occupé (prudence)

  const productSpan: Span = { top: top / h, bottom: (bottom + 1) / h };
  const clearance = { top: productSpan.top, bottom: 1 - productSpan.bottom };

  // Énergie moyenne des bandes haut/bas (0 = zone vide, idéale pour poser du texte).
  const band = (r0: number, r1: number) => {
    let s = 0, n = 0;
    for (let y = Math.max(0, r0); y < Math.min(h, r1); y++) { s += rowEnergy[y]; n++; }
    return n ? s / n : 0;
  };
  const topN = Math.round(h * 0.28), botN = Math.round(h * 0.28);
  const bandEnergy = { top: band(0, topN), bottom: band(h - botN, h) };

  return { productSpan, clearance, bandEnergy, rowEnergy };
}

export interface PlacementVerdict {
  template: string;
  collision: boolean;
  worstOverlap: number;
  detail: { zone: Span; overlap: number }[];
}

/** Évalue si les zones de texte d'un template entrent en collision avec le produit. */
export function evaluatePlacement(template: keyof typeof TEXT_ZONES, a: SceneAnalysis): PlacementVerdict {
  const zones = TEXT_ZONES[template] ?? [];
  const detail = zones.map((zone) => ({ zone, overlap: overlapFraction(zone, a.productSpan) }));
  const worstOverlap = detail.reduce((m, d) => Math.max(m, d.overlap), 0);
  return { template, collision: worstOverlap > OVERLAP_TOL, worstOverlap, detail };
}

/** Recommande le meilleur template (sans collision) pour une scène donnée. */
export function recommendTemplate(a: SceneAnalysis): { template: string; reason: string } {
  const editorial = evaluatePlacement("editorial", a);
  if (!editorial.collision) return { template: "editorial", reason: "espace libre en bas" };
  // Produit central/bas → basculer en hero_light (produit intact, texte haut+bas).
  const hero = evaluatePlacement("hero_light", a);
  if (!hero.collision) return { template: "hero_light", reason: "produit central → texte en zones réservées" };
  // Sinon, on met le titre là où il y a le plus d'air.
  return {
    template: "hero_light",
    reason: a.clearance.top >= a.clearance.bottom ? "titre en haut (plus d'air)" : "titre en bas (plus d'air)",
  };
}
