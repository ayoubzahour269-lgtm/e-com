import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox","--disable-dev-shm-usage"] });
const p = await b.newPage({ viewport: { width: 1180, height: 1000 }, deviceScaleFactor: 2 });
p.setDefaultTimeout(200000);
await p.goto("http://localhost:3100/review", { waitUntil: "networkidle", timeout: 30000 });
await p.locator("select").first().selectOption("pain");
await p.locator("select").nth(1).selectOption("2");
await p.screenshot({ path: "/home/user/e-com/apps/web/launch-before.png" });
console.log("launching generation (kie.ai, ~30-40s)…");
await p.getByRole("button", { name: /Générer/ }).click();
// attend la confirmation
await p.getByText(/candidats générés/).waitFor({ timeout: 200000 });
await p.waitForTimeout(2500); // laisse router.refresh + images charger
await p.screenshot({ path: "/home/user/e-com/apps/web/launch-after.png", fullPage: true });
await b.close();
console.log("done");
