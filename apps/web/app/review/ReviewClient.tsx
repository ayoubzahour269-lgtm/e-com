"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { finalizeWinner, launchBatchAsync, getJob } from "./actions";

export interface Run {
  angle: string;
  candidates: string[]; // noms de fichiers (bon-<angle>-<i>.png)
}

export default function ReviewClient({ runs, angles }: { runs: Run[]; angles: string[] }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-goldlight">Revue best-of-N</h1>
          <p className="mt-1 text-sm text-white/60">Génère des candidats, choisis le meilleur, on finalise.</p>
        </div>
        <a href="/" className="text-sm text-gold hover:underline">← Dashboard</a>
      </header>

      <LaunchPanel angles={angles} />

      {runs.length === 0 ? (
        <p className="mt-8 text-sm text-white/40">Aucun run — lance une génération ci-dessus.</p>
      ) : (
        <div className="mt-10 space-y-12">
          {runs.map((r) => <RunBlock key={r.angle} run={r} />)}
        </div>
      )}
    </main>
  );
}

function LaunchPanel({ angles }: { angles: string[] }) {
  const router = useRouter();
  const [angle, setAngle] = useState(angles[0] ?? "heritage");
  const [n, setN] = useState(3);
  const [busy, setBusy] = useState(false);
  const [prog, setProg] = useState<{ done: number; total: number } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function launch() {
    setBusy(true); setMsg(null); setProg({ done: 0, total: n });
    const res = await launchBatchAsync(angle, n);
    if (!res.ok) { setBusy(false); setProg(null); setMsg(`Erreur : ${res.error}`); return; }
    // Polling non bloquant de l'avancement du job.
    const timer = setInterval(async () => {
      const j = await getJob(res.jobId);
      if (j.status === "running") setProg({ done: j.done ?? 0, total: j.total ?? n });
      else if (j.status === "done") {
        clearInterval(timer); setBusy(false); setProg(null);
        setMsg(`✓ ${(j.candidates || []).length} candidats générés`); router.refresh();
      } else if (j.status === "failed") {
        clearInterval(timer); setBusy(false); setProg(null); setMsg(`Erreur : ${j.error}`);
      }
    }, 3000);
  }

  const pct = prog && prog.total ? Math.round((prog.done / prog.total) * 100) : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs text-white/60">
          Angle
          <select value={angle} onChange={(e) => setAngle(e.target.value)} disabled={busy}
            className="mt-1 block rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-paper">
            {angles.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label className="text-xs text-white/60">
          Candidats
          <select value={n} onChange={(e) => setN(Number(e.target.value))} disabled={busy}
            className="mt-1 block rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-paper">
            {[2, 3, 4].map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
        <button onClick={launch} disabled={busy}
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink disabled:opacity-40">
          {busy ? "Génération…" : `Générer (~${n * 4} crédits)`}
        </button>
        {msg && <span className="text-sm text-emerald-400">{msg}</span>}
      </div>
      {prog && (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 text-xs text-white/50">{prog.done}/{prog.total} candidats · génération kie.ai…</p>
        </div>
      )}
    </div>
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
