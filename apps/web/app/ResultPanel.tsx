"use client";
import { useState, useRef, useEffect } from "react";
import { generateResultAsync, getJob } from "./review/actions";

// Panneau "Plan résultat" (avant/après apparié) — génère depuis le Product Kit.
export default function ResultPanel() {
  const [busy, setBusy] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  async function gen() {
    setBusy(true); setMsg(null);
    const res = await generateResultAsync();
    if (!res.ok) { setBusy(false); setMsg(res.error); return; }
    let a = 0;
    timerRef.current = setInterval(async () => {
      a++;
      const j = await getJob(res.jobId);
      if (j.status === "done") {
        if (timerRef.current) clearInterval(timerRef.current);
        setBusy(false); setImg(`/api/studio-image?f=${j.file || "RESULT-matched-4x5.png"}&t=${Date.now()}`);
      } else if (j.status === "failed") {
        if (timerRef.current) clearInterval(timerRef.current);
        setBusy(false); setMsg(`Erreur : ${j.error || "échec"}`);
      } else if (a >= 120) {
        if (timerRef.current) clearInterval(timerRef.current);
        setBusy(false); setMsg("Délai dépassé.");
      }
    }, 3000);
  }

  return (
    <section className="mb-14 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold/70">Plan résultat — avant/après</h2>
          <p className="mt-1 text-xs text-white/50">Transformation appariée (même scène, seuls les cheveux changent). ~4 crédits.</p>
        </div>
        <button onClick={gen} disabled={busy}
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink disabled:opacity-40">
          {busy ? "Génération…" : "Générer le plan résultat"}
        </button>
      </div>
      {msg && <p className="mt-3 text-sm text-amber-400">{msg}</p>}
      {img && (
        <div className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="avant/après" className="w-72 rounded-xl border border-gold/40" />
          <a href={img} download="RESULT-before-after.png" className="mt-2 inline-block text-xs font-semibold text-gold hover:underline">↓ Télécharger</a>
        </div>
      )}
    </section>
  );
}
