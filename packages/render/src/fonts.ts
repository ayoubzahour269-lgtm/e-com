// Chargement des polices arabes OFL (bundlées via @fontsource) et injection en @font-face
// avec data: URLs — garantit un rendu identique partout, sans dépendre du fontconfig système
// (l'environnement n'a AUCUNE police arabe installée : on s'auto-suffit).
import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

interface FontFace {
  family: string; // nom CSS
  weight: string; // "400" | "700" | "400 800" (variable)
  file: string; // chemin absolu woff2
}

/** Résout le dossier `files/` d'un paquet @fontsource. */
function fontsourceFilesDir(pkg: string): string {
  const pkgJson = require.resolve(`${pkg}/package.json`);
  return join(dirname(pkgJson), "files");
}

/** Sélectionne un woff2 (subset arabic de préférence) pour une famille + poids donnés. */
function pickWoff2(dir: string, opts: { weight?: string; variable?: boolean }): string | null {
  const files = readdirSync(dir).filter((f) => f.endsWith(".woff2"));
  const arabic = files.filter((f) => f.includes("-arabic-"));
  const pool = arabic.length ? arabic : files;
  const normal = pool.filter((f) => f.includes("-normal"));
  const candidates = normal.length ? normal : pool;
  if (opts.variable) {
    const v = candidates.find((f) => f.includes("-wght-"));
    return v ? join(dir, v) : (candidates[0] ? join(dir, candidates[0]) : null);
  }
  const w = candidates.find((f) => f.includes(`-${opts.weight}-`));
  return w ? join(dir, w) : (candidates[0] ? join(dir, candidates[0]) : null);
}

function face(family: string, cssFamily: string, weight: string, variable = false): FontFace | null {
  try {
    const dir = fontsourceFilesDir(family);
    const file = pickWoff2(dir, { weight, variable });
    return file ? { family: cssFamily, weight, file } : null;
  } catch {
    return null;
  }
}

/** Construit le bloc CSS @font-face (data: URLs) pour les 3 familles de la marque. */
export function buildFontFaceCss(): string {
  const faces: (FontFace | null)[] = [
    // Amiri — naskh classique, luxe/patrimoine → titres
    face("@fontsource/amiri", "Amiri", "400"),
    face("@fontsource/amiri", "Amiri", "700"),
    // Reem Kufi — kufi géométrique, luxe moderne → sur-titres/alt titre (variable)
    face("@fontsource/reem-kufi", "Reem Kufi", "400 700", true),
    // Tajawal — sans moderne → bénéfices, offre, UI
    face("@fontsource/tajawal", "Tajawal", "400"),
    face("@fontsource/tajawal", "Tajawal", "500"),
    face("@fontsource/tajawal", "Tajawal", "700"),
    face("@fontsource/tajawal", "Tajawal", "800"),
  ];

  const loaded = faces.filter((f): f is FontFace => !!f);
  if (loaded.length === 0) {
    throw new Error(
      "Aucune police @fontsource résolue. Lance `pnpm install` dans packages/render."
    );
  }

  return loaded
    .map((f) => {
      const b64 = readFileSync(f.file).toString("base64");
      const isRange = f.weight.includes(" ");
      return `@font-face{
  font-family:'${f.family}';
  font-style:normal;
  font-weight:${f.weight};
  font-display:block;
  src:url(data:font/woff2;base64,${b64}) format('woff2');
}`;
    })
    .join("\n");
}
