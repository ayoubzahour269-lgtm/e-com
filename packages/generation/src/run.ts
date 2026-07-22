// Runner CLI de la couche génération. Charge secrets.env, instancie KieProvider.
// Usage :
//   tsx src/run.ts credits
//   tsx src/run.ts upload <path>
//   tsx src/run.ts scene "<prompt>" [aspect]              (nano-banana-pro, 18cr)
//   tsx src/run.ts edit  "<prompt>" <ref1> [ref2...] [aspect]  (nano-banana-edit, 4cr)
// Proxy : lancer avec NODE_USE_ENV_PROXY=1 et NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { KieProvider } from "./kie.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..");
const OUT = join(HERE, "..", "out");

function loadEnv(): Record<string, string> {
  const p = join(REPO, "secrets.env");
  if (!existsSync(p)) throw new Error("secrets.env introuvable.");
  const env: Record<string, string> = {};
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trimStart().startsWith("#")) env[m[1]] = m[2];
  }
  return env;
}

async function saveUrls(urls: string[], tag: string): Promise<string[]> {
  mkdirSync(OUT, { recursive: true });
  const saved: string[] = [];
  for (let i = 0; i < urls.length; i++) {
    const res = await fetch(urls[i]);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = urls[i].split(".").pop()?.split("?")[0]?.slice(0, 4) || "png";
    const file = join(OUT, `${tag}-${i}.${ext}`);
    writeFileSync(file, buf);
    saved.push(file);
  }
  return saved;
}

async function main() {
  const env = loadEnv();
  const apiKey = env.KIE_API_KEY;
  if (!apiKey) throw new Error("KIE_API_KEY manquant dans secrets.env");
  const kie = new KieProvider({ apiKey });
  const [cmd, ...args] = process.argv.slice(2);

  if (cmd === "credits") {
    console.log("Solde crédits kie.ai :", await kie.credits());
    return;
  }
  if (cmd === "upload") {
    const url = await kie.uploadFile(join(REPO, args[0]));
    console.log("URL:", url);
    return;
  }
  if (cmd === "scene") {
    const [prompt, aspect] = args;
    const r = await kie.generateImage({
      model: "nano-banana-pro", prompt, aspectRatio: (aspect as any) || "3:4",
    });
    console.log(JSON.stringify({ ok: r.ok, cost: r.costCredits, urls: r.urls, error: r.error }, null, 2));
    if (r.ok) console.log("Saved:", await saveUrls(r.urls, "scene"));
    return;
  }
  if (cmd === "edit") {
    const aspect = ["1:1", "3:4", "9:16", "16:9"].includes(args.at(-1) || "") ? args.pop() : "3:4";
    const [prompt, ...refs] = args;
    const imageUrls = refs.map((r) => (r.startsWith("http") ? r : r)); // refs = URLs déjà uploadées
    const r = await kie.generateImage({
      model: "google/nano-banana-edit", prompt, imageUrls, aspectRatio: aspect as any,
    });
    console.log(JSON.stringify({ ok: r.ok, cost: r.costCredits, urls: r.urls, error: r.error }, null, 2));
    if (r.ok) console.log("Saved:", await saveUrls(r.urls, "edit"));
    return;
  }
  console.log("Commandes : credits | upload <path> | scene \"<prompt>\" [aspect] | edit \"<prompt>\" <refURL...> [aspect]");
}

main().catch((e) => { console.error("ÉCHEC:", e.message || e); process.exit(1); });
