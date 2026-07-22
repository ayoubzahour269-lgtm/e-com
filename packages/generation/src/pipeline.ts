// Best-of-N + QC de fidélité — le mécanisme "tu ne valides pas chaque image".
// On génère N candidats, un CRITIQUE (modèle vision) les note contre la Character Sheet,
// on rejette+relance les ratés automatiquement, et on n'escalade à l'humain que sous le seuil.
import type { GenProvider, ImageGenRequest, GenResult } from "./provider.js";
import { CostLedger } from "./cost.js";

export interface FidelityVerdict {
  pass: boolean;
  score: number; // 0..1 — fidélité produit + qualité de composition
  reasons: string[];
}

/**
 * Juge de fidélité : compare un candidat à la/les référence(s) produit (Character Sheet).
 * Implémentation par défaut = un appel à un modèle vision (à binder : Claude vision ou
 * un modèle vision kie.ai). On la garde INJECTABLE pour rester swap-safe.
 */
export type FidelityCritic = (
  candidateUrl: string,
  referenceUrls: string[],
  intent: string
) => Promise<FidelityVerdict>;

export interface BestOfNOptions {
  provider: GenProvider;
  request: ImageGenRequest; // le prompt/scene à générer
  critic: FidelityCritic;
  referenceUrls: string[]; // Character Sheet + éventuelle scène
  intent: string; // ce que le plan attend (pour le critique)
  n?: number; // candidats par tour (défaut 4)
  passThreshold?: number; // score mini pour accepter sans humain (défaut 0.8)
  maxRounds?: number; // relances si aucun candidat ne passe (défaut 2)
  ledger?: CostLedger;
}

export interface Candidate {
  url: string;
  verdict: FidelityVerdict;
  taskId?: string;
}

export interface BestOfNResult {
  /** Meilleur candidat retenu (undefined → à escalader à l'humain). */
  best?: Candidate;
  needsHuman: boolean;
  candidates: Candidate[]; // tous, triés par score décroissant
  costCredits: number;
  rounds: number;
}

export async function generateBestOfN(opts: BestOfNOptions): Promise<BestOfNResult> {
  const n = opts.n ?? 4;
  const threshold = opts.passThreshold ?? 0.8;
  const maxRounds = opts.maxRounds ?? 2;

  const all: Candidate[] = [];
  let cost = 0;
  let rounds = 0;

  for (let r = 0; r < maxRounds; r++) {
    rounds = r + 1;

    // Génère N candidats en parallèle. allSettled → un candidat qui throw ne perd pas les autres (déjà payés).
    const settled = await Promise.allSettled(
      Array.from({ length: n }, () => opts.provider.generateImage(opts.request))
    );
    const gens: GenResult[] = settled.flatMap((s) => (s.status === "fulfilled" ? [s.value] : []));
    for (const g of gens) {
      cost += g.costCredits;
      opts.ledger?.record({ model: g.model, credits: g.costCredits, taskId: g.taskId, ok: g.ok });
    }

    // Note chaque candidat (fidélité vs Character Sheet). allSettled → un critic qui throw n'annule pas les verdicts.
    const urls = gens.filter((g) => g.ok).flatMap((g) => g.urls.map((u) => ({ u, id: g.taskId })));
    const judgedSettled = await Promise.allSettled(
      urls.map(async ({ u, id }) => ({
        url: u,
        taskId: id,
        verdict: await opts.critic(u, opts.referenceUrls, opts.intent),
      }))
    );
    const judged: Candidate[] = judgedSettled.flatMap((s) => (s.status === "fulfilled" ? [s.value] : []));
    all.push(...judged);

    // Un candidat passe le seuil → on s'arrête (best-of-N a réussi).
    if (judged.some((c) => c.verdict.pass && c.verdict.score >= threshold)) break;
  }

  all.sort((a, b) => b.verdict.score - a.verdict.score);
  const best = all[0];
  const accepted = best && best.verdict.pass && best.verdict.score >= threshold ? best : undefined;

  return {
    best: accepted,
    needsHuman: !accepted, // sous le seuil après relances → escalade humaine
    candidates: all,
    costCredits: cost,
    rounds,
  };
}
