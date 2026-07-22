// Rendu HTML/CSS → PNG via Chromium (moteur de shaping HarfBuzz = arabe parfait).
// On rend une COUCHE TRANSPARENTE (scrim + texte) qui sera composée sur la scène.
import { chromium, type Browser } from "playwright-core";

const CHROME_PATH =
  process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

let browserPromise: Promise<Browser> | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = chromium
      .launch({
        executablePath: CHROME_PATH,
        args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
      })
      .catch((e) => {
        browserPromise = null; // n'empoisonne pas le cache : un prochain appel retentera le lancement
        throw e;
      });
  }
  return browserPromise;
}

export async function closeBrowser(): Promise<void> {
  if (browserPromise) {
    try {
      const b = await browserPromise;
      await b.close();
    } catch {
      /* lancement échoué : rien à fermer */
    }
    browserPromise = null;
  }
}

/**
 * Rend un document HTML complet en PNG.
 * @param transparent  true → fond omis (couche texte à composer). false → fond opaque.
 * @param scale        suréchantillonnage (2 = net). La sortie fait w*scale × h*scale.
 */
export async function renderHtmlToPng(
  html: string,
  width: number,
  height: number,
  { transparent = true, scale = 2 }: { transparent?: boolean; scale?: number } = {}
): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });
  try {
    await page.setContent(html, { waitUntil: "load" });
    // Attendre que TOUTES les @font-face soient prêtes (sinon fallback = arabe cassé),
    // mais borner à 10 s : un woff2 défaillant ne doit pas figer le rendu (font-display:block).
    await page.evaluate(async () => {
      const fonts = (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts;
      await Promise.race([fonts.ready, new Promise((r) => setTimeout(r, 10_000))]);
    });
    return await page.screenshot({ type: "png", omitBackground: transparent });
  } finally {
    await page.close();
  }
}
