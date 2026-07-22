import fs from "node:fs";
import path from "node:path";
import { loadAngles } from "@studio/agents";
import ReviewClient, { type Run } from "./ReviewClient";

export const dynamic = "force-dynamic";
const REPO = path.join(process.cwd(), "..", "..");
const OUT = path.join(process.cwd(), "..", "worker", "out");

function loadRuns(): Run[] {
  try {
    return fs
      .readdirSync(OUT)
      .filter((f) => /^bon-[\w-]+\.json$/.test(f))
      .map((f) => {
        const m = JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8"));
        return { angle: String(m.angle), candidates: (m.candidates || []).map((c: string) => path.basename(c)) };
      })
      .filter((r) => r.candidates.length > 0);
  } catch {
    return [];
  }
}

function loadAngleIds(): string[] {
  try {
    return loadAngles(REPO).angles.map((a: { id: string }) => a.id);
  } catch {
    return ["heritage", "offer", "outcome"];
  }
}

export default function Page() {
  return <ReviewClient runs={loadRuns()} angles={loadAngleIds()} />;
}
