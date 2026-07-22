// Le pipeline créatif = graphe d'états EXPLICITE et déterministe (pas d'agents qui « décident »).
// Les agents LLM interviennent à des nœuds précis ; la production est faite d'outils déterministes.

export const STAGES = [
  "intake", // images + faits → Brief + Character Sheet
  "strategy", // angles + hooks + copy + policy-lint          ⛳ Checkpoint 1
  "art_direction", // scène + layout + zones de texte          ⛳ Checkpoint 2
  "production", // scène → composite → typo → composition
  "review", // éditeur / QC                                     ⛳ Checkpoint 3
  "export", // specs plateforme + plan de test + coût
  "learning", // (phase 4) ingestion perf → bibliothèque d'angles
] as const;

export type Stage = (typeof STAGES)[number];

/** Points de contrôle éditables par l'humain (mode copilote). */
export const CHECKPOINTS: Partial<Record<Stage, string>> = {
  strategy: "Valider/éditer angles + copy",
  art_direction: "Valider/éditer le storyboard/scène",
  review: "Valider/éditer la créative rendue",
};

export type JobStatus = "queued" | "running" | "needs_human" | "done" | "failed";

export interface StageResult<T = unknown> {
  stage: Stage;
  status: JobStatus;
  output?: T;
  costCredits?: number;
  notes?: string[];
}
