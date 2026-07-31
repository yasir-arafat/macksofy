/**
 * nav-hover-probe.mjs — desktop header/mega-menu interaction cost (no npm deps).
 *
 * WHY THIS EXISTS, alongside scripts/cwv-measure.mjs:
 *
 * cwv-measure.mjs emulates a 390px Android. At that width the desktop nav is
 * `hidden lg:flex` and the mega menu never renders, so it is structurally
 * blind to the most-clicked component on the site. It will happily report
 * "no change" for a header fix that is worth 25%. This probe covers that gap.
 *
 * WHAT IT DRIVES — and the trap to avoid:
 *
 * It opens the first mega panel, then walks the mouse DOWN THROUGH ITS ROWS,
 * the way a visitor does on the way to the link they want, and finally clicks
 * one. Each row hover fires setActiveSlug in ListPreviewMegaMenu, which is the
 * re-render the memo boundaries in components/layout/Header.tsx exist to stop.
 *
 * An earlier version only swept ACROSS the nav items. Don't go back to that:
 * every nav item opens a different panel, so each one is a fresh MOUNT, and
 * memoisation does nothing for a mount. That version reported no improvement
 * from a change measured at -25% here. If this probe ever says "no change",
 * suspect the probe before the patch.
 *
 * WHAT IT REPORTS:
 *
 *   • ScriptDuration   — CDP counter delta across the walk. React render work.
 *   • RecalcStyle      — style recalculation, which framer-motion rows dominate.
 *   • Worst INP-ELIGIBLE — worst click/pointer/key event. INP counts only these;
 *                        a slow `mouseover` or `pointerout` inflates the raw
 *                        worst-event number without touching the graded metric,
 *                        so both are printed and only one of them matters.
 *
 * Numbers are medians over N runs. Treat the absolutes as throttled artefacts —
 * the before/after delta is the result, not the value.
 *
 * Usage:
 *   node scripts/nav-hover-probe.mjs [url] [--runs N] [--throttle N] [--rows N]
 *   node scripts/nav-hover-probe.mjs http://localhost:3000/ --runs 5
 *
 * Requires: a chromium/chrome binary on PATH (or CHROME_BIN) and the site
 * already served from a PRODUCTION build (npm run build && npm run start) —
 * dev-mode React renders twice and double-counts everything below.
 */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = argv.indexOf(name);
  return i === -1 ? dflt : Number(argv[i + 1]);
};
const URL_ = argv.find((a) => a.startsWith("http")) || "http://localhost:3000/";
const THROTTLE = flag("--throttle", 4);
const RUNS = flag("--runs", 5);
const MAX_ROWS = flag("--rows", 12);
const CHROME = process.env.CHROME_BIN || "chromium";
const PORT = 9800 + Math.floor(Math.random() * 400);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── minimal CDP client over the global WebSocket (Node 22+) ─────────── */
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (!msg.id || !this.pending.has(msg.id)) return;
      const { resolve, reject } = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
}

/* ── instrumentation injected before any page script runs ────────────── */
const PROBE = `
(() => {
  const S = (window.__p = { longTasks: [], events: [] });
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) S.longTasks.push({ start: e.startTime, dur: e.duration });
    }).observe({ type: 'longtask', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries())
        S.events.push({ name: e.name, dur: e.duration,
                        delay: e.processingStart - e.startTime,
                        proc: e.processingEnd - e.processingStart, start: e.startTime });
    }).observe({ type: 'event', durationThreshold: 16, buffered: true });
  } catch {}
})();
`;

const profile = mkdtempSync(join(tmpdir(), "navprobe-"));
const chrome = spawn(
  CHROME,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--no-first-run",
    "--disable-extensions",
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" }
);

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(300);
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) {
  chrome.kill();
  rmSync(profile, { recursive: true, force: true });
  throw new Error(`no debugging endpoint from "${CHROME}" — set CHROME_BIN?`);
}

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", rej, { once: true });
});
const cdp = new CDP(ws);

async function runOnce() {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const send = (m, p) => cdp.send(m, p, sessionId);
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
    return r.result.value;
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Performance.enable");
  // 1440x900 is above the `lg` breakpoint, so the desktop nav is laid out.
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });
  await send("Page.addScriptToEvaluateOnNewDocument", { source: PROBE });
  await send("Page.navigate", { url: URL_ });
  await sleep(7000); // load + hydrate + settle before touching anything

  const items = await evaluate(`(() => {
    const nav = document.querySelector('header nav');
    if (!nav) return [];
    return [...nav.querySelectorAll('a')].map(a => {
      const r = a.getBoundingClientRect();
      return { label: a.textContent.trim().slice(0,24),
               x: Math.round(r.left+r.width/2), y: Math.round(r.top+r.height/2) };
    }).filter(i => i.x > 0 && i.y > 0);
  })()`);
  if (!items.length) {
    await cdp.send("Target.closeTarget", { targetId });
    return { error: "no desktop nav items found (viewport below the lg breakpoint?)" };
  }

  // Counters are cumulative, so snapshot immediately before the walk.
  const before = await send("Performance.getMetrics");
  const pick = (m, n) => (m.metrics.find((x) => x.name === n)?.value ?? 0) * 1000; // s -> ms
  const t0 = await evaluate("performance.now()");

  // Open the first mega panel.
  const first = items[0];
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: first.x, y: first.y, button: "none" });
  await sleep(650); // panel opens + rows stagger in

  // `.menu-surface` is the panel shell in components/layout/Header.tsx. If that
  // class is ever renamed, this probe goes quiet rather than failing loudly —
  // check `rows walked` in the output before trusting a flat result.
  const rows = await evaluate(`(() => {
    const panel = document.querySelector('header .menu-surface');
    if (!panel) return [];
    return [...panel.querySelectorAll('a[href]')].map(a => {
      const r = a.getBoundingClientRect();
      return { x: Math.round(r.left+r.width/2), y: Math.round(r.top+r.height/2), w: r.width, h: r.height };
    }).filter(r => r.w > 4 && r.h > 4 && r.y > 0 && r.y < 900);
  })()`);

  const walk = rows.slice(0, MAX_ROWS);
  for (const r of walk) {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: r.x, y: r.y, button: "none" });
    await sleep(90); // long enough for the hover to land a render
  }

  // Then a real click on a row in the open panel — the interaction INP grades.
  const row = walk[0] ?? null;
  let clicked = false;
  if (row) {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: row.x, y: row.y, button: "none" });
    await sleep(80);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: row.x, y: row.y, button: "left", clickCount: 1 });
    await sleep(40);
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: row.x, y: row.y, button: "left", clickCount: 1 });
    clicked = true;
    await sleep(700); // let the soft navigation settle so its work is counted
  }

  const after = await send("Performance.getMetrics");
  const s = await evaluate(
    "window.__p ? {longTasks: window.__p.longTasks, events: window.__p.events} : null"
  );

  const lt = (s?.longTasks ?? []).filter((t) => t.start >= t0);
  const ev = (s?.events ?? []).filter((e) => e.start >= t0);
  const worst = ev.reduce((a, e) => (e.dur > (a?.dur ?? 0) ? e : a), null);
  // INP counts click/tap/keyboard only. Everything else is context, not score.
  const INP_EVENTS = new Set(["click", "pointerdown", "pointerup", "keydown", "keyup"]);
  const worstInp = ev
    .filter((e) => INP_EVENTS.has(e.name))
    .reduce((a, e) => (e.dur > (a?.dur ?? 0) ? e : a), null);

  await cdp.send("Target.closeTarget", { targetId });
  return {
    navItems: items.length,
    rowsWalked: walk.length,
    clicked,
    worst,
    worstInp,
    script: pick(after, "ScriptDuration") - pick(before, "ScriptDuration"),
    layout: pick(after, "LayoutDuration") - pick(before, "LayoutDuration"),
    recalc: pick(after, "RecalcStyleDuration") - pick(before, "RecalcStyleDuration"),
    task: pick(after, "TaskDuration") - pick(before, "TaskDuration"),
    longTaskCount: lt.length,
    longTaskTotal: lt.reduce((a, t) => a + t.dur, 0),
  };
}

const runs = [];
try {
  for (let i = 0; i < RUNS; i++) runs.push(await runOnce());
} finally {
  ws.close();
  chrome.kill();
  await sleep(400);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch {
    /* profile cleanup is best-effort; never let it swallow the results */
  }
}

const ok = runs.filter((r) => !r.error);
if (!ok.length) {
  console.log("all runs failed: " + runs.map((r) => r.error).join("; "));
  process.exit(1);
}
if (ok.length < runs.length) {
  console.log(`note: ${runs.length - ok.length}/${runs.length} runs failed and are excluded`);
}

const med = (xs) => {
  const a = [...xs].sort((p, q) => p - q);
  return a[Math.floor(a.length / 2)];
};
const f = (n) => `${n.toFixed(1)} ms`;
const list = (xs) => xs.map((x) => x.toFixed(0)).join(", ");

console.log("\n" + "═".repeat(70));
console.log(`nav row walk · ${URL_} · ${THROTTLE}x CPU · ${ok.length} runs · medians`);
console.log("═".repeat(70));
console.log(
  `  nav items ${ok[0].navItems} · rows walked ${ok[0].rowsWalked} · clicked ${ok[0].clicked}`
);
if (!ok[0].rowsWalked)
  console.log("  ⚠ zero rows walked — panel not found; results below are meaningless");
console.log(`  ScriptDuration     ${f(med(ok.map((r) => r.script)))}   [${list(ok.map((r) => r.script))}]`);
console.log(`  RecalcStyle        ${f(med(ok.map((r) => r.recalc)))}`);
console.log(`  Layout             ${f(med(ok.map((r) => r.layout)))}`);
console.log(`  TaskDuration       ${f(med(ok.map((r) => r.task)))}`);
console.log(
  `  Long tasks         ${med(ok.map((r) => r.longTaskCount))} totalling ${f(med(ok.map((r) => r.longTaskTotal)))}`
);

const anyWorst = ok.map((r) => r.worst?.dur ?? 0).filter(Boolean);
console.log(
  anyWorst.length
    ? `  Worst event (any)  ${f(med(anyWorst))}   [${list(anyWorst)}]   ` +
        `names: ${[...new Set(ok.map((r) => r.worst?.name).filter(Boolean))].join("/")}   ← not INP`
    : "  Worst event (any)  (none over the 16ms threshold)"
);
const inps = ok.map((r) => r.worstInp?.dur ?? 0).filter(Boolean);
console.log(
  inps.length
    ? `  Worst INP-ELIGIBLE ${f(med(inps))}   [${list(inps)}]   ` +
        `names: ${[...new Set(ok.map((r) => r.worstInp?.name).filter(Boolean))].join("/")}   ← this one`
    : "  Worst INP-ELIGIBLE (no click/key events over the 16ms threshold)"
);
console.log("");
