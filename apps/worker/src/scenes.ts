// Direction artistique partagée (prompts scène + construction de CreativeSpec).
// Utilisé par le batch simple ET le best-of-N.
import { MECHAT_PALETTE, type CreativeSpec } from "@studio/render";
import type { ProductKit } from "@studio/core";
import type { ConceptResult } from "@studio/agents";

// IA-embed : le produit est FONDU dans la scène (reflets/ombres réels), pas plaqué.
// Préambule fidélité renforcé — préserver chaque lettre du label.
export const FIDELITY =
  "Integrate THIS EXACT bottle naturally into the scene with realistic reflections, contact shadow and matching light — it must look photographed in the scene, not pasted. Keep the product 100% identical to the reference: do not change its shape, the red white and gold label, the white screw cap, or the deep red oil color. Reproduce EVERY letter of the label text exactly, including the arabic wording, the '250 ml' and the '100% Natural' seal — do not alter, invent or garble any text on the label. Photorealistic premium product photography. ";

const NEG_TOP = " Leave elegant empty negative space in the TOP third for text.";

export const SCENE_PROMPTS: Record<string, string> = {
  heritage: FIDELITY + "Luxury Moroccan still-life: ivory silk fabric, scattered dried hibiscus petals and henna leaves, a carved wooden comb, warm golden-hour side light, soft shadows, polished marble surface, shallow depth of field." + NEG_TOP,
  offer: FIDELITY + "Clean premium studio: warm beige seamless backdrop, soft single-source light, gentle drop shadow, a few dried hibiscus petals, minimal and elegant." + NEG_TOP,
  outcome: FIDELITY + "Elegant beauty still-life: glossy silk ribbon swirl, floating soft gold particles, warm light, marble surface, minimal luxury." + NEG_TOP,
  claim: FIDELITY + "Editorial dark scene: deep garnet backdrop, a shaft of warm light, a few hibiscus petals, dramatic soft shadows, moody premium look." + NEG_TOP,
  pain: FIDELITY + "Warm intimate bathroom vanity scene: soft morning light, marble counter, a wooden comb, muted tones." + NEG_TOP,
  comparison: FIDELITY + "Clean neutral studio: soft grey-beige backdrop, even light, minimal, generous space." + NEG_TOP,
};

export function scenePromptFor(angle: string): string {
  return SCENE_PROMPTS[angle] ?? SCENE_PROMPTS.offer;
}

/** Construit la CreativeSpec de rendu à partir d'un concept + la scène choisie. */
export function buildSpec(r: ConceptResult, kit: ProductKit, scenePath: string): CreativeSpec {
  const meta = r.concept.copy.find((c) => c.platform === "meta");
  const title = meta?.headline ?? r.concept.hook;
  const kicker = r.concept.hook.length <= 30 && r.concept.hook !== title ? r.concept.hook : undefined;
  const angle = r.concept.angle;
  return {
    id: r.concept.id,
    format: "meta_4x5",
    template: "banner_top",
    lang: "ar",
    dir: "rtl",
    palette: MECHAT_PALETTE,
    titleFont: angle === "claim" || angle === "comparison" ? "reemKufi" : "amiri",
    scenePath,
    kicker,
    title,
    offer: { price: kit.offer.price, compareAt: kit.offer.compareAt, badge: kit.offer.badge },
    brandLine: kit.brand,
  };
}
