// Valide que le Product Kit sur disque respecte le schéma (contrat de données).
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ProductKit } from "./schema.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const raw = JSON.parse(readFileSync(join(REPO, "templates/products/mechat.json"), "utf8"));

const parsed = ProductKit.safeParse(raw);
if (!parsed.success) {
  console.error("❌ Product Kit invalide:\n", parsed.error.format());
  process.exit(1);
}
console.log(`✅ Product Kit « ${parsed.data.id} » valide.`);
console.log(`   Master verrouillé : ${parsed.data.canonical.masterDetoured}`);
console.log(`   Offre : ${parsed.data.offer.price} (barré ${parsed.data.offer.compareAt ?? "—"})`);
