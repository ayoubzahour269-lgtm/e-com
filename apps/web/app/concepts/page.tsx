import path from "node:path";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";
import ConceptEditor, { type ConceptSeed } from "./ConceptEditor";

export const dynamic = "force-dynamic";
const REPO = path.join(process.cwd(), "..", "..");

export default function Page() {
  const kit = loadProductKit(REPO);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"] });
  const seeds: ConceptSeed[] = plan.map((r) => {
    const m = r.concept.copy.find((c) => c.platform === "meta");
    return {
      id: r.concept.id,
      angle: r.concept.angle,
      hook: r.concept.hook,
      primary: m?.primary ?? "",
      headline: m?.headline ?? "",
      description: m?.description ?? "",
    };
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-goldlight">Checkpoint · Copy</h1>
          <p className="mt-1 text-sm text-white/60">Édite le copy de chaque concept — le linter policy vérifie en direct.</p>
        </div>
        <nav className="flex gap-4 text-sm">
          <a href="/" className="text-gold hover:underline">Dashboard</a>
          <a href="/review" className="text-gold hover:underline">Revue best-of-N</a>
        </nav>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {seeds.map((s) => <ConceptEditor key={s.id} seed={s} />)}
      </div>
    </main>
  );
}
