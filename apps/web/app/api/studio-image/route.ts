// Sert les images de sortie du studio (candidats best-of-N) depuis apps/worker/out.
import { NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";
const OUT = path.join(process.cwd(), "..", "worker", "out");

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("f") || "";
  if (!/^[\w.-]+\.png$/.test(name)) return new Response("bad request", { status: 400 });
  const p = path.join(OUT, name);
  if (!p.startsWith(OUT) || !fs.existsSync(p)) return new Response("not found", { status: 404 });
  const buf = fs.readFileSync(p);
  return new Response(buf, {
    headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
  });
}
