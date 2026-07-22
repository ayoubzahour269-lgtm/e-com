// API publique du moteur de rendu déterministe.
import { buildFontFaceCss } from "./fonts.js";
import { renderHtmlToPng, closeBrowser } from "./browser.js";
import { editorialHtml } from "./templates/editorial.js";
import { heroLightHtml } from "./templates/heroLight.js";
import { bannerTopHtml } from "./templates/bannerTop.js";
import { composeCreative } from "./compose.js";
import { FORMAT_SIZES, type CreativeSpec } from "./types.js";

export * from "./types.js";
export * from "./artdirector.js";
export { composeLocked } from "./lockedCompose.js";
export { renderBeforeAfter, type BeforeAfterSpec } from "./beforeAfter.js";
export { closeBrowser };

const SCALE = 2; // suréchantillonnage → texte arabe net

/**
 * Rend une CreativeSpec en PNG final (aux specs de la plateforme).
 * TEXTE 100% déterministe ; SCÈNE = photo/IA fournie ou dégradé studio.
 */
export async function renderCreative(spec: CreativeSpec): Promise<Buffer> {
  const size = FORMAT_SIZES[spec.format];
  const fontCss = buildFontFaceCss();
  const isHero = spec.template === "hero_light";
  const html =
    spec.template === "hero_light"
      ? heroLightHtml(spec, size, fontCss)
      : spec.template === "banner_top"
        ? bannerTopHtml(spec, size, fontCss)
        : editorialHtml(spec, size, fontCss);

  // Couche transparente (texte + voiles) rendue par Chromium à SCALE×.
  const layerPng = await renderHtmlToPng(html, size.w, size.h, {
    transparent: true,
    scale: SCALE,
  });

  return composeCreative({
    layerPng,
    size,
    scale: SCALE,
    // Mode hero : le produit détouré est posé sur fond studio (jamais recouvert).
    // Mode editorial : la scène est en plein cadre.
    productMasterPath: isHero ? spec.scenePath : undefined,
    scenePath: isHero ? undefined : spec.scenePath,
    bgTheme: isHero ? "cream" : "garnet",
    palette: spec.palette,
  });
}
