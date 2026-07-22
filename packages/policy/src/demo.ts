// Démo du linter — cas réels/synthétiques tirés de creative/docs/BRIEF-CREATIFS.md.
import { lintCopy, type CopyPayload } from "./index.js";

const cases: { name: string; payload: CopyPayload }[] = [
  {
    name: "✅ Offre conforme (fusha, impersonnel)",
    payload: {
      platform: "meta", angle: "offer", lang: "ar", requireFusha: true,
      fields: {
        primary: "علاج ٣ أشهر كامل لشعرٍ أكثف وأطول — ٣ قوارير بخصم 25%. الدفع عند الاستلام.",
        headline: "عبوة ٣ قوارير — 139 ر.س بدل 185",
        description: "الدفع عند الاستلام",
      },
    },
  },
  {
    name: "❌ Attribut personnel (2e personne)",
    payload: {
      platform: "meta", angle: "pain", lang: "ar", requireFusha: true,
      fields: { primary: "شعرك المتساقط ليس قدرًا — غذّي الجذور من العمق." },
    },
  },
  {
    name: "⚠️ Avant/après SANS mention صورة توضيحية",
    payload: {
      platform: "meta", angle: "before_after", lang: "ar", requireFusha: true,
      fields: { primary: "تسعون يومًا من الانتظام تصنع الفرق: جذور تتغذّى ولمعان يظهر.", headline: "الفرق يبدأ من الجذور" },
    },
  },
  {
    name: "❌ Snap headline trop long (>34)",
    payload: {
      platform: "snap", angle: "offer", lang: "ar", requireFusha: true,
      fields: { headline: "عبوة ثلاث قوارير من زيت المشاط الأحمر بخصم خاص لفترة محدودة" },
    },
  },
  {
    name: "❌ Dialecte khaliji + garantie",
    payload: {
      platform: "tiktok", angle: "claim", lang: "ar", requireFusha: true,
      fields: { caption: "وش تنتظرين؟ نتيجة مضمونة 100% وايد حلوة للشعر" },
    },
  },
];

let failures = 0;
for (const c of cases) {
  const r = lintCopy(c.payload);
  console.log(`\n${c.name}  →  ${r.ok ? "OK" : `${r.errors} erreur(s)`}${r.warns ? `, ${r.warns} avert.` : ""}`);
  for (const f of r.findings) {
    const tag = f.severity === "error" ? "  ✗" : "  ~";
    console.log(`${tag} [${f.code}]${f.field ? ` (${f.field})` : ""} ${f.message}${f.excerpt ? `  « ${f.excerpt} »` : ""}`);
  }
  if (!r.ok) failures++;
}
console.log(`\n${cases.length} cas · ${failures} bloqués par le linter (attendu : les cas ❌).`);
