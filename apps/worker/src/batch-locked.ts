// Orchestrateur VERROUILLÉ (fidélité garantie) + best-of-N.
// Par concept : génère N scènes VIDES (art-directées, sans produit) → l'ArtDirector note
// l'espace de texte → garde la meilleure → compose le MASTER RÉEL (label impossible à halluciner)
// → typo. Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import { KieProvider, CostLedger } from "@studio/generation";
import { renderCreative, closeBrowser, composeLocked, analyzeScene, MECHAT_PALETTE, FORMAT_SIZES, type CreativeSpec } from "@studio/render";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

const EMPTY_SCENE: Record<string, string> = {
  heritage: "Luxury Moroccan still-life SCENE for a product ad: ivory silk fabric draped, scattered dried hibiscus petals and henna leaves, a carved wooden comb, polished white marble surface, warm golden-hour side light, soft shadows. Keep an empty clear flat area in the lower-center to place a product, and generous empty negative space across the TOP. NO bottle, no product, no packaging, no text.",
  offer: "Clean premium studio SCENE for a product ad: warm beige seamless backdrop, soft single-source light, gentle floor shadow, a few dried hibiscus petals on the surface. Keep an empty clear center to place a product and generous negative space at the TOP. NO bottle, no product, no text.",
  outcome: "Elegant beauty still-life SCENE: glossy cream silk ribbon swirl, floating soft gold particles, warm light, marble surface. Empty clear center for a product, negative space at the TOP. NO bottle, no product, no text.",
};

const N = Math.min(8, Math.max(1, Math.floor(Number(process.argv[3])) || 3)); // candidats par concept (borné)
const QUIET_MAX = 0.14; // énergie max de la bande haute pour un texte lisible (0 = vide)

function kieKey(): string {
  const m = readFileSync(join(REPO, "secrets.env"), "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent");
  return m[1];
}
async function dl(url: string, file: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} pour ${url}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function main() {
  const angleIds = (process.argv[2] || "heritage").split(",");
  const kit = loadProductKit(REPO);
  const master = join(REPO, kit.canonical.masterDetoured);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"], angleIds });
  const { w: W, h: H } = FORMAT_SIZES.meta_4x5;
  mkdirSync(OUT, { recursive: true });

  const kie = new KieProvider({ apiKey: kieKey() });
  const ledger = new CostLedger();
  console.log(`Solde : ${await kie.credits()} · best-of-${N} scènes vides + compositing verrouillé\n`);

  let accepted = 0, total = 0;
  for (const r of plan) {
    const angle = r.concept.angle;
    const prompt = EMPTY_SCENE[angle] ?? EMPTY_SCENE.offer;
    console.log(`■ ${angle} — génération de ${N} scènes vides…`);

    // best-of-N : génère N scènes, note la QUIÉTUDE de la bande haute (0=vide), garde la meilleure.
    const cands: { path: string; quietTop: number }[] = [];
    for (let i = 0; i < N; i++) {
      const gen = await kie.generateImage({ model: "google/nano-banana", prompt, aspectRatio: "3:4" });
      ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
      total++;
      if (!gen.ok || !gen.urls[0]) { console.log(`   candidat ${i + 1}: échec`); continue; }
      const p = await dl(gen.urls[0], join(OUT, `locked-scene-${angle}-${i}.png`));
      const a = await analyzeScene(p);
      const quietTop = a.bandEnergy.top; // plus bas = haut plus vide = meilleur pour le texte
      const ok = quietTop <= QUIET_MAX;
      if (ok) accepted++;
      cands.push({ path: p, quietTop });
      console.log(`   candidat ${i + 1}: énergie haut = ${(quietTop * 100).toFixed(1)}% ${ok ? "✓" : "✗ (trop chargé)"}`);
    }
    if (!cands.length) { console.log("   aucune scène — skip"); continue; }
    cands.sort((a, b) => a.quietTop - b.quietTop); // le plus vide d'abord
    const best = cands[0];
    console.log(`   → retenu : énergie haut ${(best.quietTop * 100).toFixed(1)}% (le plus vide des ${cands.length})`);

    // Compositing VERROUILLÉ : vrai master + ombre sur la scène gagnante.
    const composed = await composeLocked(best.path, master, W, H);
    const composedFile = join(OUT, `locked-bg-${angle}.png`);
    writeFileSync(composedFile, composed);

    const meta = r.concept.copy.find((c) => c.platform === "meta");
    const title = meta?.headline ?? r.concept.hook;
    const spec: CreativeSpec = {
      id: r.concept.id, format: "meta_4x5", template: "banner_top",
      lang: "ar", dir: "rtl", palette: MECHAT_PALETTE, titleFont: "amiri",
      scenePath: composedFile,
      kicker: r.concept.hook.length <= 30 && r.concept.hook !== title ? r.concept.hook : undefined,
      title, offer: { price: kit.offer.price, compareAt: kit.offer.compareAt, badge: kit.offer.badge },
      brandLine: kit.brand,
    };
    const png = await renderCreative(spec);
    writeFileSync(join(OUT, `LOCKED-${angle}-4x5.png`), png);
    console.log(`   ✓ créative verrouillée prête (label = pixels réels)\n`);
  }
  await closeBrowser();
  const rate = total ? Math.round((accepted / total) * 100) : 0;
  console.log(`Best-of-N : ${accepted}/${total} scènes ont un espace-texte suffisant (${rate}%).`);
  console.log(`Crédits dépensés : ${ledger.total()} → ${OUT}`);
}

main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
