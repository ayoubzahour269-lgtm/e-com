"use client";
import { useState } from "react";
import { finalizeWinner } from "./actions";

export interface Run {
  angle: string;
  candidates: string[]; // noms de fichiers (bon-<angle>-<i>.png)
}

export default function ReviewClient({ runs }: { runs: Run[] }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-goldlight">Revue best-of-N</h1>
          <p className="mt-1 text-sm text-white/60">Le critique de fidélité : choisis le meilleur candidat, on finalise.</p>
        </div>
        <a href="/" className="text-sm text-gold hover:underline">← Dashboard</a>
      </header>
      {runs.length === 0 ? (
        <p className="text-sm text-white/40">
          Aucun run best-of-N. Lance <code className="text-gold">pnpm bon &lt;angle&gt; 3</code> puis recharge.
        </p>
      ) : (
        <div className="space-y-12">
          {runs.map((r) => <RunBlock key={r.angle} run={r} />)}
        </div>
      )}
    </main>
  );
}

function RunBlock({ run }: { run: Run }) {
  const [sel, setSel] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function go() {
    if (sel === null) return;
    setBusy(true); setErr(null); setDone(null);
    const res = await finalizeWinner(run.angle, sel);
    setBusy(false);
    if (res.ok && res.file) setDone(`/creatives/${res.file}?t=${Date.now()}`);
    else setErr(res.error || "échec");
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gold/70">
          Angle · {run.angle} — {run.candidates.length} candidats
        </h2>
        <button
          onClick={go}
          disabled={sel === null || busy}
          className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink disabled:opacity-30"
        >
          {busy ? "Rendu en cours…" : sel === null ? "Choisis un gagnant" : `Finaliser [${sel}]`}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {run.candidates.map((f, i) => (
          <button
            key={f}
            onClick={() => setSel(i)}
            className={`overflow-hidden rounded-xl border-2 bg-black/20 transition ${
              sel === i ? "border-gold ring-2 ring-gold" : "border-white/10 hover:border-white/30"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/studio-image?f=${f}`} alt={f} className="aspect-[3/4] w-full object-cover" />
            <div className="flex items-center justify-between px-2 py-1.5 text-[11px]">
              <span className="text-white/50">candidat [{i}]</span>
              {sel === i && <span className="font-bold text-gold">✓ gagnant</span>}
            </div>
          </button>
        ))}
      </div>

      {err && <p className="mt-3 text-sm text-amber-400">Erreur : {err}</p>}
      {done && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-emerald-400">✓ Créative finie (typo déterministe appliquée) :</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={done} alt="finale" className="w-72 rounded-xl border border-gold/40" />
        </div>
      )}
    </section>
  );
}
