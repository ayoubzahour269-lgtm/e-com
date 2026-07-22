// Règles et lexiques — EN DONNÉES (éditables sans toucher au moteur).
// Sources : Meta Advertising Standards (attributs personnels, avant/après),
// et creative/docs/BRIEF-CREATIFS.md (fusha impersonnelle, صورة توضيحية, caps).
import type { CopyField, Platform, Angle } from "./types.js";

/** Caps par champ (défaut) — comptage en points de code. */
export const DEFAULT_CAPS: Record<CopyField, number> = {
  primary: 125,
  headline: 40,
  description: 30,
  caption: 150,
};

/** Overrides par plateforme (ex : Snap headline ≤ 34, TikTok caption ≤ 100). */
export const PLATFORM_CAPS: Partial<Record<Platform, Partial<Record<CopyField, number>>>> = {
  snap: { headline: 34, caption: 80 },
  tiktok: { caption: 100 },
  instagram: { caption: 125 },
};

/**
 * Attributs personnels à la 2e personne (interdits par Meta : « impliquer un attribut personnel »).
 * On bannit la racine + suffixe possessif « ك » (ex : شعرك = « tes cheveux »).
 * → reformuler en impersonnel (ex : « الشعر »).
 */
export const PERSONAL_ATTRIBUTE_TOKENS: string[] = [
  "شعرك", "شعركِ", "بشرتك", "بشرتكِ", "وزنك", "بطنك", "جسمك",
  "تساقط شعرك", "فروة رأسك", "رأسك", "مشكلتك",
];

/**
 * Racines de parties du corps / attributs personnels (NORMALISÉES : sans harakat/tatweel,
 * alef unifié). Le linter détecte racine + suffixe possessif (ك/كِ/كم) sur le texte normalisé,
 * ce qui résiste aux diacritiques (ex : شَعرك) et au tatweel (شعــرك).
 */
export const BODY_PART_ROOTS: string[] = [
  "شعر", "بشرت", "بشرة", "وجه", "عين", "عيون", "وزن", "بطن", "جسم", "راس",
  "اسنان", "صحت", "صحة", "رائحت", "رائحة", "حيات", "حياة", "فروت", "فروة", "مشكلت", "مشكلة",
];

/** Marqueurs de dialecte khaliji (interdits si fusha requise). */
export const KHALIJI_MARKERS: string[] = [
  "وش", "شلون", "كيفك", "ابغى", "ابي", "وايد",
  "زين", "كذا", "حقك", "حقتك", "تبين", "تبي", "ليش", "عشان", "يبيلك", "الحين",
];

/** Préfixes clitiques arabes à retirer avant de tester un marqueur dialectal (وعشان → عشان). */
export const CLITIC_PREFIXES: string[] = ["و", "ف", "ب", "ل", "ال", "وال", "بال", "فال"];

export interface ClaimRule {
  code: string;
  severity: "error" | "warn";
  pattern: RegExp;
  message: string;
}

/** Déclarations à risque : garanties, promesses médicales, superlatifs, preuve sociale chiffrée. */
export const CLAIM_RULES: ClaimRule[] = [
  { code: "GUARANTEE", severity: "error", pattern: /(مضمون|ضمان النتائج|نتيجة مضمونة|100%\s*نتيجة)/,
    message: "Garantie de résultat interdite (non substanciable)." },
  { code: "MEDICAL_CURE", severity: "error", pattern: /(يشفي|شفاء|يعالج نهائيًا|علاج نهائي|يوقف التساقط نهائيًا)/,
    message: "Promesse médicale/curative interdite." },
  { code: "MEDICAL_TREATMENT_WORD", severity: "warn", pattern: /علاج/,
    message: "« علاج » peut être lu comme allégation médicale — préférer « روتين/عناية » ou vérifier la policy." },
  { code: "SUPERLATIVE", severity: "warn", pattern: /(الأفضل|الأقوى|رقم\s*[1١]|الأول عالميًا)/,
    message: "Superlatif absolu à éviter (non prouvable)." },
  { code: "FABRICATED_PROOF", severity: "warn", pattern: /(آلاف|ملايين|مليون|[0-9٠-٩]+\s*٪|[0-9٠-٩]+\s*%|[0-9٠-٩]+\s*ألف)/,
    message: "Chiffre de preuve sociale — n'utiliser QUE si réel et vérifiable." },
];

/** Disclaimers requis selon l'angle. */
export const REQUIRED_DISCLAIMERS: Partial<Record<Angle, { token: string; message: string }>> = {
  before_after: {
    token: "صورة توضيحية",
    message: "Un visuel avant/après doit porter la mention « صورة توضيحية ».",
  },
};
