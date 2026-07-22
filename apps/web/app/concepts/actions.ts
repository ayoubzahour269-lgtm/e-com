"use server";
// Checkpoint copilote : relint le copy édité en direct (fonction pure, 0 crédit).
import { lintCopy, DEFAULT_CAPS, PLATFORM_CAPS, type CopyPayload } from "@studio/policy";

export async function lintCopyAction(payload: CopyPayload) {
  const res = lintCopy(payload);
  // Caps effectifs pour l'affichage des compteurs.
  const caps: Record<string, number> = { ...DEFAULT_CAPS, ...(PLATFORM_CAPS[payload.platform] || {}) };
  return { ...res, caps };
}
