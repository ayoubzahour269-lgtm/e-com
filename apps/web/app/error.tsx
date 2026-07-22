"use client";
// Error boundary global : dégradation gracieuse si un loader (Product Kit/angles) échoue.
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-xl font-bold text-goldlight">Une erreur est survenue</h1>
      <p className="mt-2 text-sm text-white/60">{error?.message || "Erreur inconnue"}</p>
      <button onClick={reset} className="mt-5 rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink">
        Réessayer
      </button>
    </main>
  );
}
