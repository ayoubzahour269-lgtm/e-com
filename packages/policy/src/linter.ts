import type { CopyPayload, Finding, LintResult, CopyField } from "./types.js";
import {
  DEFAULT_CAPS,
  PLATFORM_CAPS,
  PERSONAL_ATTRIBUTE_TOKENS,
  KHALIJI_MARKERS,
  CLAIM_RULES,
  REQUIRED_DISCLAIMERS,
} from "./lexicons.js";

/** Longueur en points de code (proche du comptage humain, RTL-safe). */
export function glyphLength(s: string): number {
  return [...s.trim()].length;
}

function capFor(field: CopyField, platform: CopyPayload["platform"]): number {
  return PLATFORM_CAPS[platform]?.[field] ?? DEFAULT_CAPS[field];
}

const TOKEN_SPLIT = /[\s،.!؟…—\-_/()«»"']+/u;

export function lintCopy(payload: CopyPayload): LintResult {
  const findings: Finding[] = [];
  const entries = Object.entries(payload.fields) as [CopyField, string][];

  for (const [field, raw] of entries) {
    if (!raw) continue;
    const text = raw.trim();

    // 1) Caps caractères
    const cap = capFor(field, payload.platform);
    const len = glyphLength(text);
    if (len > cap) {
      findings.push({
        code: "CAP_EXCEEDED",
        severity: "error",
        field,
        message: `${field} = ${len} car. (max ${cap} sur ${payload.platform}).`,
        meta: { len, cap, over: len - cap },
      });
    }

    // 2) Attributs personnels (2e personne)
    for (const tok of PERSONAL_ATTRIBUTE_TOKENS) {
      if (text.includes(tok)) {
        findings.push({
          code: "PERSONAL_ATTRIBUTE",
          severity: "error",
          field,
          excerpt: tok,
          message: `Attribut personnel « ${tok} » — reformuler en impersonnel (Meta l'interdit).`,
        });
      }
    }

    // 3) Dialecte (si fusha requise)
    if (payload.requireFusha) {
      const tokens = new Set(text.split(TOKEN_SPLIT));
      for (const m of KHALIJI_MARKERS) {
        if (tokens.has(m)) {
          findings.push({
            code: "DIALECT",
            severity: "error",
            field,
            excerpt: m,
            message: `Marqueur dialectal « ${m} » — fusha requise.`,
          });
        }
      }
    }

    // 4) Déclarations à risque
    for (const rule of CLAIM_RULES) {
      const match = text.match(rule.pattern);
      if (match) {
        findings.push({
          code: rule.code,
          severity: rule.severity,
          field,
          excerpt: match[0],
          message: rule.message,
        });
      }
    }
  }

  // 5) Disclaimer requis par l'angle (porté par le visuel — on le rappelle)
  if (payload.angle) {
    const req = REQUIRED_DISCLAIMERS[payload.angle];
    if (req) {
      const present = entries.some(([, v]) => v?.includes(req.token));
      if (!present) {
        findings.push({
          code: "DISCLAIMER_REQUIRED",
          severity: "warn",
          message: `${req.message} (mention « ${req.token} » à intégrer au visuel).`,
        });
      }
    }
  }

  const errors = findings.filter((f) => f.severity === "error").length;
  const warns = findings.filter((f) => f.severity === "warn").length;
  return { ok: errors === 0, findings, errors, warns };
}
