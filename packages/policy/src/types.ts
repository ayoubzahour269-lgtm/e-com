// Contrats du linter de conformité. Un "Finding" est déterministe et traçable
// (même entrée → même sortie), pour qu'un copy ne parte JAMAIS en ads sans être vérifié.

export type Severity = "error" | "warn";

export type Platform = "meta" | "tiktok" | "snap" | "instagram" | "youtube";

export type CopyField = "primary" | "headline" | "description" | "caption";

export type Angle =
  | "offer"
  | "before_after"
  | "claim"
  | "outcome"
  | "trust_cod"
  | "comparison"
  | "pain"
  | "heritage";

export interface CopyPayload {
  platform: Platform;
  angle?: Angle;
  lang: "ar";
  requireFusha?: boolean; // interdit le dialecte (khaliji) si true
  verifiedClaims?: string[]; // faits RÉELS vérifiés (ex "25%", "علاج") → non signalés
  fields: Partial<Record<CopyField, string>>;
}

export interface Finding {
  code: string; // ex "CAP_EXCEEDED", "PERSONAL_ATTRIBUTE"
  severity: Severity;
  field?: CopyField;
  message: string;
  excerpt?: string; // extrait fautif
  meta?: Record<string, unknown>;
}

export interface LintResult {
  ok: boolean; // true si aucun "error"
  findings: Finding[];
  errors: number;
  warns: number;
}
