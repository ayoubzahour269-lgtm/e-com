import type { CopyPayload, Finding, LintResult, CopyField } from "./types.js";
import {
  DEFAULT_CAPS,
  PLATFORM_CAPS,
  PERSONAL_ATTRIBUTE_TOKENS,
  BODY_PART_ROOTS,
  KHALIJI_MARKERS,
  CLITIC_PREFIXES,
  CLAIM_RULES,
  REQUIRED_DISCLAIMERS,
} from "./lexicons.js";

/**
 * Longueur en unités UTF-16 (== ce que comptent les plateformes type Meta ; pour l'arabe BMP
 * c'est identique aux points de code, et ça évite de sous-compter les emoji hors-BMP).
 */
export function glyphLength(s: string): number {
  return s.trim().length;
}

function capFor(field: CopyField, platform: CopyPayload["platform"]): number {
  return PLATFORM_CAPS[platform]?.[field] ?? DEFAULT_CAPS[field];
}

const TOKEN_SPLIT = /[\s،.!؟…—\-_/()«»"']+/u;
const AR = "\\u0600-\\u06FF";

/** Normalise l'arabe : retire harakat (U+064B–0652) + tatweel (U+0640), unifie alef/hamza.
 *  Rend la détection robuste aux diacritiques (ex : شَعرك) et au tatweel (شعــرك). */
function normalizeAr(s: string): string {
  return s.replace(/[ً-ْـ]/g, "").replace(/[أإآ]/g, "ا");
}

// racine (partie du corps) + suffixe possessif 2e personne, sur texte normalisé, borné par un non-lettre arabe.
const ATTR_RE = new RegExp(
  `(?:${BODY_PART_ROOTS.map(normalizeAr).join("|")})(?:كنّ|كم|كن|كِ|كَ|كُ|ك)(?![${AR}])`,
  "gu"
);

export function lintCopy(payload: CopyPayload): LintResult {
  const findings: Finding[] = [];
  const entries = Object.entries(payload.fields) as [CopyField, string][];
  const verified = new Set(payload.verifiedClaims ?? []);
  // Seules les règles "molles" (chiffres/superlatifs) peuvent être blanchies par un fait vérifié.
  // Les interdits durs (garantie, promesse médicale) ne sont JAMAIS contournables.
  const BYPASSABLE = new Set(["FABRICATED_PROOF", "SUPERLATIVE", "MEDICAL_TREATMENT_WORD"]);

  for (const [field, raw] of entries) {
    if (!raw) continue;
    const text = raw.trim();
    const norm = normalizeAr(text);

    // 1) Caps caractères
    const cap = capFor(field, payload.platform);
    const len = glyphLength(text);
    if (len > cap) {
      findings.push({ code: "CAP_EXCEEDED", severity: "error", field,
        message: `${field} = ${len} car. (max ${cap} sur ${payload.platform}).`, meta: { len, cap, over: len - cap } });
    }

    // 2) Attributs personnels (2e personne) — sur texte normalisé (résiste aux harakat/tatweel).
    const seenAttr = new Set<string>();
    for (const m of norm.matchAll(ATTR_RE)) {
      if (seenAttr.has(m[0])) continue; seenAttr.add(m[0]);
      findings.push({ code: "PERSONAL_ATTRIBUTE", severity: "error", field, excerpt: m[0],
        message: `Attribut personnel « ${m[0]} » — reformuler en impersonnel (Meta l'interdit).` });
    }
    // Compléments multi-mots (ex : "فروة رأسك").
    for (const tok of PERSONAL_ATTRIBUTE_TOKENS) {
      const nt = normalizeAr(tok);
      if (nt.includes(" ") && norm.includes(nt) && !seenAttr.has(nt)) {
        seenAttr.add(nt);
        findings.push({ code: "PERSONAL_ATTRIBUTE", severity: "error", field, excerpt: tok,
          message: `Attribut personnel « ${tok} » — reformuler en impersonnel.` });
      }
    }

    // 3) Dialecte (si fusha requise) — normalisation + retrait des préfixes clitiques.
    if (payload.requireFusha) {
      const tokenSet = new Set<string>();
      for (const t of norm.split(TOKEN_SPLIT).filter(Boolean)) {
        tokenSet.add(t);
        for (const p of CLITIC_PREFIXES) if (t.startsWith(p) && t.length > p.length) tokenSet.add(t.slice(p.length));
      }
      for (const marker of KHALIJI_MARKERS) {
        if (tokenSet.has(normalizeAr(marker))) {
          findings.push({ code: "DIALECT", severity: "error", field, excerpt: marker,
            message: `Marqueur dialectal « ${marker} » — fusha requise.` });
        }
      }
    }

    // 4) Déclarations à risque — matchAll (toutes les occurrences), bypass RESTREINT aux règles molles.
    const seenClaim = new Set<string>();
    for (const rule of CLAIM_RULES) {
      const flags = rule.pattern.flags.includes("g") ? rule.pattern.flags : rule.pattern.flags + "g";
      const g = new RegExp(rule.pattern.source, flags);
      for (const m of text.matchAll(g)) {
        const excerpt = m[0];
        const key = `${rule.code}:${excerpt}`;
        if (seenClaim.has(key)) continue; seenClaim.add(key);
        if (BYPASSABLE.has(rule.code) && verified.has(excerpt)) continue; // fait réel autorisé (chiffres/superlatifs uniquement)
        findings.push({ code: rule.code, severity: rule.severity, field, excerpt, message: rule.message });
      }
    }
  }

  // 5) Disclaimer requis par l'angle (porté par le visuel — on le rappelle).
  if (payload.angle) {
    const req = REQUIRED_DISCLAIMERS[payload.angle];
    if (req) {
      const present = entries.some(([, v]) => v?.includes(req.token));
      if (!present) {
        findings.push({ code: "DISCLAIMER_REQUIRED", severity: "warn",
          message: `${req.message} (mention « ${req.token} » à intégrer au visuel).` });
      }
    }
  }

  const errors = findings.filter((f) => f.severity === "error").length;
  const warns = findings.filter((f) => f.severity === "warn").length;
  return { ok: errors === 0, findings, errors, warns };
}
