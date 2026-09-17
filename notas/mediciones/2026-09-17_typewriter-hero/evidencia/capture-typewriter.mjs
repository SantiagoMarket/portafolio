/**
 * Captura el H1 del hero en localhost:3005: samples del tipeo, reduced-motion y screenshots.
 * No toca producción. Requiere Chrome y el dev server en :3005.
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { createServer } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PAGE_URL = process.env.MEASURE_URL || "http://localhost:3005/?measure=typewriter";
const OUT = __dirname;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      server.close((err) => (err ? reject(err) : resolve(port)));
    });
    server.on("error", reject);
  });
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.ws.addEventListener("message", (event) => {
      const msg = JSON.parse(String(event.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }
}

const SAMPLE_EXPR = `(() => new Promise((resolve) => {
  const started = performance.now();
  const samples = [];
  const take = () => {
    const h1 = document.querySelector("h1");
    const hidden = h1 && h1.querySelector('[aria-hidden="true"]');
    const burg = hidden && hidden.querySelector('[style*="burg"]');
    const firstSpanText = hidden
      ? (hidden.childNodes[0] && hidden.childNodes[0].textContent) || ""
      : "";
    samples.push({
      t: Math.round(performance.now() - started),
      aria: h1 ? h1.getAttribute("aria-label") : null,
      visibleText: hidden ? hidden.innerText : null,
      visibleCollapsed: hidden ? hidden.innerText.replace(/\\s+/g, " | ") : null,
      line1Guess: firstSpanText,
      burgText: burg ? Array.from(burg.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join("") : null,
      caretCount: hidden ? hidden.querySelectorAll(".caret").length : 0,
      caretParent: (() => {
        const caret = hidden && hidden.querySelector(".caret");
        if (!caret || !caret.parentElement) return null;
        const style = caret.parentElement.getAttribute("style") || "";
        return style.includes("burg") ? "burg" : "plain";
      })(),
      innerHTML: hidden ? hidden.innerHTML : null,
    });
  };
  take();
  const id = setInterval(take, 40);
  setTimeout(() => {
    clearInterval(id);
    take();
    const unique = [];
    for (const sample of samples) {
      const prev = unique[unique.length - 1];
      if (!prev || prev.visibleCollapsed !== sample.visibleCollapsed || prev.aria !== sample.aria) {
        unique.push(sample);
      }
    }
    resolve({ sampleCount: samples.length, unique });
  }, 2500);
}))()`;

async function waitForDebugger(port, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch {
      /* retry */
    }
    await sleep(150);
  }
  throw new Error("Chrome debugger did not come up");
}

async function screenshot(cdp, sessionId, filename) {
  const result = await cdp.send("Page.captureScreenshot", { format: "png" }, sessionId);
  const file = path.join(OUT, filename);
  await writeFile(file, Buffer.from(result.data, "base64"));
  return file;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const port = await getFreePort();
  const profile = path.join(tmpdir(), `typewriter-hero-chrome-${port}`);
  const chrome = spawn(
    CHROME,
    [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1280,800",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const report = {
    pageUrl: PAGE_URL,
    chrome: CHROME,
    capturedAt: new Date().toISOString(),
    motion: null,
    reducedMotion: null,
  };

  try {
    const version = await waitForDebugger(port);
    const ws = new WebSocket(version.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve);
      ws.addEventListener("error", reject);
    });
    const cdp = new Cdp(ws);

    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });

    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    await cdp.send("Page.navigate", { url: PAGE_URL }, sessionId);
    await sleep(200);
    report.motion = await cdp.send(
      "Runtime.evaluate",
      { expression: SAMPLE_EXPR, awaitPromise: true, returnByValue: true },
      sessionId,
    );
    await screenshot(cdp, sessionId, "shot-end.png");

    const unique = report.motion?.result?.value?.unique ?? [];
    const mid = unique.find((s) => s.visibleCollapsed && s.visibleCollapsed !== " | " && !String(s.visibleCollapsed).includes("INTEGRATOR"));
    report.midSample = mid || unique[Math.min(2, unique.length - 1)] || null;

    await cdp.send(
      "Emulation.setEmulatedMedia",
      { features: [{ name: "prefers-reduced-motion", value: "reduce" }] },
      sessionId,
    );
    await cdp.send("Page.navigate", { url: `${PAGE_URL}&reduced=1` }, sessionId);
    await sleep(150);
    report.reducedMotion = await cdp.send(
      "Runtime.evaluate",
      { expression: SAMPLE_EXPR, awaitPromise: true, returnByValue: true },
      sessionId,
    );
    await screenshot(cdp, sessionId, "shot-reduced.png");

    await writeFile(path.join(OUT, "browser-samples.json"), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({
      uniqueMotion: (report.motion?.result?.value?.unique || []).map((s) => ({
        t: s.t,
        aria: s.aria,
        visible: s.visibleCollapsed,
        burgText: s.burgText,
        caretCount: s.caretCount,
        caretParent: s.caretParent,
      })),
      uniqueReduced: (report.reducedMotion?.result?.value?.unique || []).map((s) => ({
        t: s.t,
        aria: s.aria,
        visible: s.visibleCollapsed,
        burgText: s.burgText,
      })),
      files: ["browser-samples.json", "shot-end.png", "shot-reduced.png"],
    }, null, 2));

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
