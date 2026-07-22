// Table de prix kie.ai (crédits) + registre de coût. Le budget est un PLAFOND, pas indicatif :
// on estime AVANT de générer et on refuse si le solde ne couvre pas le batch.
// (Prix source : creative/docs + docs/HANDOFF.md — ajustables sans toucher au code métier.)

export const CREDIT_COST: Record<string, number> = {
  "google/nano-banana": 4, // génération simple
  "google/nano-banana-edit": 4, // compositing fidèle (double référence)
  "nano-banana-pro": 18, // scène art-directée 2K
  veo3_fast: 60, // clip 8s
  veo3: 120, // clip 8s qualité
};

export function estimateCost(model: string, n = 1): number {
  const unit = CREDIT_COST[model];
  if (unit === undefined) {
    // Un modèle absent de la table serait facturé par kie mais compté 0 → fausserait un garde-fou budget.
    console.warn(`[cost] modèle inconnu "${model}" — estimé à 0, compléter CREDIT_COST.`);
    return 0;
  }
  return unit * n;
}

export interface LedgerEntry {
  ts: number;
  model: string;
  credits: number;
  taskId?: string;
  ok: boolean;
}

/** Registre en mémoire (à persister en DB au stade SaaS pour la marge par produit). */
export class CostLedger {
  private entries: LedgerEntry[] = [];
  constructor(private now: () => number = () => 0) {}

  record(e: Omit<LedgerEntry, "ts">): void {
    this.entries.push({ ...e, ts: this.now() });
  }
  total(): number {
    return this.entries.reduce((s, e) => s + e.credits, 0);
  }
  all(): readonly LedgerEntry[] {
    return this.entries;
  }
}
