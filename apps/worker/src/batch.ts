// Orchestrateur end-to-end. Product Kit → concepts (Andromeda) → pour chaque concept :
// scène FIDÈLE (kie.ai, produit exact composité) → ArtDirector → typo déterministe → créative finie.
// Émet aussi le plan de test. Lancer avec NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import { KieProvider, CostLedger } from "@studio/generation";
import { renderCreative, closeBrowser, analyzeScene, evaluatePlacement, MECHAT_PALETTE, type CreativeSpec } from "@studio/render";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

// Direction artistique par angle (préambule fidélité + scène + espace négatif en haut).
const FIDELITY = "Place THIS EXACT bottle, completely unchanged — do not alter its shape, the red white and gold label, the arabic text on the label, the white screw cap, or the deep red oil color. Keep the product 100% identical to the reference. Photorealistic premium product photography. ";
const NEG_TOP = " Leave elegant empty negative space in the TOP third for text.";
const SCENE_PROMPTS: Record<string, string> = {
  heritage: FIDELITY + "Luxury Moroccan still-life: ivory silk fabric, scattered dried hibiscus petals and henna leaves, a carved wooden comb, warm golden-hour side light, soft shadows, polished marble surface, shallow depth of field." + NEG_TOP,
  offer: FIDELITY + "Clean premium studio: warm beige seamless backdrop, soft single-source light, gentle drop shadow, a few dried hibiscus petals, minimal and elegant." + NEG_TOP,
  outcome: FIDELITY + "Elegant beauty still-life: glossy silk ribbon swirl, floating soft gold particles, warm light, marble surface, minimal luxury." + NEG_TOP,
};

function loadKieKey(): string {
  const p = join(REPO, "secrets.env");
  const m = readFileSync(p, "utf8").match(/KIE_API_KEY\s*=\s*(\S+)/);
  if (!m) throw new Error("KIE_API_KEY absent de secrets.env");
  return m[1];
}
async function download(url: string, file: string): Promise<string> {
  const res = await fetch(url);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function main() {
  const angleIds = (process.argv[2] || "heritage,offer").split(",");
  const kit = loadProductKit(REPO);
  const lib = loadAngles(REPO);
  const plan = planConcepts(kit, lib, { platforms: ["meta"], angleIds });
  mkdirSync(OUT, { recursive: true });

  const kie = new KieProvider({ apiKey: loadKieKey() });
  const ledger = new CostLedger();
  console.log(`Solde crédits : ${await kie.credits()}`);
  const masterUrl = await kie.uploadFile(join(REPO, kit.canonical.masterDetoured));
  console.log(`Master uploadé. Batch de ${plan.length} concepts : ${angleIds.join(", ")}\n`);

  const delivered: { angle: string; file: string; template: string; format: string }[] = [];

  for (const r of plan) {
    const angle = r.concept.angle;
    const scenePrompt = SCENE_PROMPTS[angle] ?? SCENE_PROMPTS.offer;
    process.stdout.write(`■ ${angle} — génération scène… `);
    const gen = await kie.generateImage({
      model: "google/nano-banana-edit", prompt: scenePrompt, imageUrls: [masterUrl], aspectRatio: "3:4",
    });
    ledger.record({ model: gen.model, credits: gen.costCredits, taskId: gen.taskId, ok: gen.ok });
    if (!gen.ok || !gen.urls[0]) { console.log(`échec (${gen.error})`); continue; }
    const scenePath = await download(gen.urls[0], join(OUT, `scene-${angle}.png`));

    // ArtDirector : confirme le placement (bascule si collision).
    const a = await analyzeScene(scenePath);
    let template = r.recommendTemplate as CreativeSpec["template"];
    if (template === "editorial" && evaluatePlacement("editorial", a).collision) template = "banner_top";

    const meta = r.concept.copy.find((c) => c.platform === "meta");
    const title = meta?.headline ?? r.concept.hook;
    // Kicker court seulement s'il diffère du titre (évite la répétition).
    const kicker = r.concept.hook.length <= 30 && r.concept.hook !== title ? r.concept.hook : undefined;
    const spec: CreativeSpec = {
      id: r.concept.id,
      format: "meta_4x5",
      template,
      lang: "ar", dir: "rtl",
      palette: MECHAT_PALETTE,
      titleFont: angle === "claim" || angle === "comparison" ? "reemKufi" : "amiri",
      scenePath,
      kicker,
      title,
      offer: { price: kit.offer.price, compareAt: kit.offer.compareAt, badge: kit.offer.badge },
      brandLine: kit.brand,
    };
    const png = await renderCreative(spec);
    const file = join(OUT, `CREATIVE-${angle}-4x5.png`);
    writeFileSync(file, png);
    delivered.push({ angle, file, template, format: "meta_4x5" });
    console.log(`✓ scène ${gen.costCredits}cr · template ${template} · créative prête`);
  }
  await closeBrowser();

  // Plan de test (1 variable/test — diversité Andromeda).
  console.log(`\n— Plan de test —`);
  delivered.forEach((d, i) =>
    console.log(`  ${i + 1}. ${d.angle.padEnd(12)} Meta 4:5 · variable: ANGLE · métrique: CTR ≥1% / CPA`)
  );
  console.log(`\nCrédits dépensés ce batch : ${ledger.total()} · Livrées : ${delivered.length}/${plan.length} → ${OUT}`);
}

main().catch((e) => { console.error("ÉCHEC:", e); process.exit(1); });
