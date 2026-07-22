import path from "node:path";
import fs from "node:fs";
import { loadProductKit, loadAngles, planConcepts } from "@studio/agents";

export const dynamic = "force-dynamic";

const REPO = path.join(process.cwd(), "..", "..");

function creativesList(): { f: string; v: number }[] {
  const dir = path.join(process.cwd(), "public", "creatives");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".png"))
      .sort()
      // v = mtime → cache-busting : une créative re-finalisée (même nom) n'est pas servie depuis le cache.
      .map((f) => ({ f, v: Math.round(fs.statSync(path.join(dir, f)).mtimeMs) }));
  } catch {
    return [];
  }
}

export default function Page() {
  const kit = loadProductKit(REPO);
  const plan = planConcepts(kit, loadAngles(REPO), { platforms: ["meta"] });
  const creatives = creativesList();
  const cleanCount = plan.filter((r) => r.clean).length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* En-tête */}
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-goldlight">AI Ads Studio</h1>
          <p className="mt-1 text-sm text-white/60">
            Agence créative encodée · produit : <span className="text-gold">{kit.brand}</span> · marché {kit.market}
          </p>
          <nav className="mt-2 flex gap-4 text-sm font-semibold">
            <a href="/concepts" className="text-gold hover:underline">Checkpoint copy →</a>
            <a href="/review" className="text-gold hover:underline">Revue best-of-N →</a>
          </nav>
        </div>
        <div className="flex gap-3 text-center text-xs">
          <Stat label="Concepts" value={String(plan.length)} />
          <Stat label="Conformes" value={`${cleanCount}/${plan.length}`} />
          <Stat label="Créatives" value={String(creatives.length)} />
        </div>
      </header>

      {/* Pipeline */}
      <section className="mb-12">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold/70">Pipeline</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {["Intake", "Stratégie ⛳", "Direction artistique ⛳", "Production", "Revue ⛳", "Export"].map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/80">{s}</span>
          ))}
        </div>
      </section>

      {/* Concepts (le cerveau) */}
      <section className="mb-14">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold/70">Concepts — cerveau Andromeda</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plan.map((r) => {
            const meta = r.concept.copy.find((c) => c.platform === "meta");
            return (
              <article key={r.concept.id} className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded bg-garnet px-2 py-0.5 text-xs font-bold text-goldlight">{r.concept.angle}</span>
                  <span className={r.clean ? "text-xs text-emerald-400" : "text-xs text-amber-400"}>
                    {r.clean ? "✓ conforme" : "⚠ à revoir"}
                  </span>
                </div>
                <p className="mb-1 text-base font-bold text-paper">{r.concept.hook}</p>
                {meta?.primary && <p className="text-sm leading-relaxed text-white/60">{meta.primary}</p>}
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
                  <span>hook · {r.concept.hookType}</span>
                  <span>template · {r.recommendTemplate}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Galerie de créatives */}
      <section>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold/70">Créatives produites</h2>
        {creatives.length === 0 ? (
          <p className="text-sm text-white/40">Aucune créative — lance un batch (<code className="text-gold">pnpm batch</code>).</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {creatives.map(({ f, v }) => (
              <figure key={f} className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/creatives/${f}?v=${v}`} alt={f} className="aspect-[4/5] w-full object-cover" />
                <figcaption className="flex items-center justify-between gap-2 px-2 py-1.5 text-[11px] text-white/40">
                  <span className="truncate">{f.replace(/\.png$/, "")}</span>
                  <a href={`/creatives/${f}?v=${v}`} download aria-label={`Télécharger ${f}`} className="shrink-0 font-semibold text-gold hover:underline">↓</a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/30">
        AI Ads Studio · fidélité produit verrouillée · typo arabe déterministe · policy-safe
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
      <div className="text-lg font-extrabold text-goldlight">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
}
