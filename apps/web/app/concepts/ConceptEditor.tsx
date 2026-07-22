"use client";
import { useState } from "react";
import { lintCopyAction } from "./actions";

export interface ConceptSeed {
  id: string;
  angle: string;
  hook: string;
  primary: string;
  headline: string;
  description: string;
}

const CAPS: Record<string, number> = { primary: 125, headline: 40, description: 30 };
const VERIFIED = ["25%", "100%", "علاج"];

export default function ConceptEditor({ seed }: { seed: ConceptSeed }) {
  const [f, setF] = useState({ primary: seed.primary, headline: seed.headline, description: seed.description });
  const [findings, setFindings] = useState<any[] | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  function set(k: keyof typeof f, v: string) { setF((s) => ({ ...s, [k]: v })); setFindings(null); setOk(null); }

  async function verify() {
    setBusy(true);
    const res = await lintCopyAction({
      platform: "meta", angle: seed.angle as any, lang: "ar", requireFusha: true,
      verifiedClaims: VERIFIED, fields: f,
    });
    setFindings(res.findings); setOk(res.ok); setBusy(false);
  }

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded bg-garnet px-2 py-0.5 text-xs font-bold text-goldlight">{seed.angle}</span>
        {ok !== null && (
          <span className={ok ? "text-xs text-emerald-400" : "text-xs text-amber-400"}>
            {ok ? "✓ conforme" : "⚠ à corriger"}
          </span>
        )}
      </div>

      {(["headline", "primary", "description"] as const).map((k) => {
        const len = [...f[k]].length;
        const over = len > CAPS[k];
        return (
          <label key={k} className="mb-3 block">
            <span className="flex items-center justify-between text-[11px] uppercase tracking-wider text-white/40">
              {k}
              <span className={over ? "text-red-400" : "text-white/40"}>{len}/{CAPS[k]}</span>
            </span>
            <textarea
              dir="rtl" rows={k === "primary" ? 3 : 1} value={f[k]}
              onChange={(e) => set(k, e.target.value)}
              className={`mt-1 w-full resize-none rounded-lg border bg-black/40 px-3 py-2 text-sm text-paper ${over ? "border-red-500/60" : "border-white/15"}`}
            />
          </label>
        );
      })}

      <div className="flex items-center gap-3">
        <button onClick={verify} disabled={busy}
          className="rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-ink disabled:opacity-40">
          {busy ? "Vérification…" : "Vérifier la conformité"}
        </button>
      </div>

      {findings && findings.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs">
          {findings.map((x, i) => (
            <li key={i} className={x.severity === "error" ? "text-red-400" : "text-amber-400"}>
              {x.severity === "error" ? "✗" : "~"} [{x.code}]{x.field ? ` ${x.field}` : ""} {x.message}
            </li>
          ))}
        </ul>
      )}
      {findings && findings.length === 0 && <p className="mt-3 text-xs text-emerald-400">Aucun problème détecté.</p>}
    </article>
  );
}
