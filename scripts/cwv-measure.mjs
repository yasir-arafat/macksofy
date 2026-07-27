/**
 * cwv-measure.mjs — headless mobile Core Web Vitals probe (no npm deps).
 *
 * Emulates a mid-range Android (390x844, DPR 2.6, 4x CPU throttle, Slow-4G)
 * against a locally running production build, then reports:
 *
 *   • LCP           — time + the actual LCP element (so you stop guessing)
 *   • TBT           — total blocking time from long tasks after FCP
 *   • INP-ish       — worst interaction latency, driven by real CDP taps
 *   • JS bytes      — script transfer weight (parse/exec is the INP tax)
 *   • rAF churn     — frames still doing main-thread work when the page is idle
 *
 * Usage:
 *   node scripts/cwv-measure.mjs [url ...]
 *   node scripts/cwv-measure.mjs http://localhost:3000/ http://localhost:3000/blog/foo
 *
 * Requires: a chromium/chrome binary on PATH and the site already served
 * (npm run build && npm start).
 */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_BIN ||
  ["google-chrome", "chromium", "chromium-browser"].find(Boolean) ||
  "chromium";

const PORT = 9222 + Math.floor(Math.random() * 500);
const URLS = process.argv.slice(2);
if (URLS.length === 0) URLS.push("http://localhost:3000/");

/* ── minimal CDP client over the global WebSocket (Node 22+) ─────────── */
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      } else if (msg.method) {
        (this.listeners.get(msg.method) || []).forEach((fn) => fn(msg.params));
      }
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  on(method, fn) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(fn);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withTimeout(p, ms, label) {
  let t;
  const timeout = new Promise((_, rej) => {
    t = setTimeout(() => rej(new Error(`timeout: ${label}`)), ms);
  });
  try {
    return await Promise.race([p, timeout]);
  } finally {
    clearTimeout(t);
  }
}

/* ── instrumentation injected before any page script runs ────────────── */
const PROBE = `
(() => {
  const S = (window.__cwv = {
    lcp: 0, lcpEl: '', fcp: 0, longTasks: [], events: [], rafBusy: 0,
    cls: 0, clsSources: [],
  });
  const desc = (el) => {
    if (!el) return '(none)';
    const tag = el.tagName ? el.tagName.toLowerCase() : '?';
    const id = el.id ? '#' + el.id : '';
    const cls = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : '';
    const txt = (el.textContent || '').trim().slice(0, 60);
    return tag + id + cls + (txt ? ' :: "' + txt + '"' : '');
  };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        S.lcp = e.startTime;
        S.lcpEl = desc(e.element) + (e.url ? ' [url ' + e.url + ']' : '');
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') S.fcp = e.startTime;
    }).observe({ type: 'paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) S.longTasks.push({ start: e.startTime, dur: e.duration });
    }).observe({ type: 'longtask', buffered: true });
  } catch {}
  // CLS: sum of the largest session window, per the web-vitals definition.
  try {
    let cur = 0, curStart = 0, curPrev = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        if (e.hadRecentInput) continue;             // user-driven shifts don't count
        if (cur && (e.startTime - curPrev > 1000 || e.startTime - curStart > 5000)) cur = 0, curStart = e.startTime;
        if (!cur) curStart = e.startTime;
        cur += e.value; curPrev = e.startTime;
        if (cur > S.cls) {
          S.cls = cur;
          S.clsSources = (e.sources || []).slice(0, 3).map((s) => desc(s.node));
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        S.events.push({ name: e.name, dur: e.duration, delay: e.processingStart - e.startTime,
                        proc: e.processingEnd - e.processingStart, start: e.startTime });
      }
    }).observe({ type: 'event', durationThreshold: 16, buffered: true });
  } catch {}

  // Sample how much main-thread work happens per frame while "idle": if the
  // page keeps animating on the main thread, rAF callbacks keep firing late.
  S.startRafSample = () => {
    S.rafFrames = 0; S.rafLate = 0;
    let last = performance.now();
    const tick = (t) => {
      const gap = t - last; last = t;
      S.rafFrames++;
      if (gap > 20) S.rafLate++;          // dropped/stretched frame
      if (S.rafFrames < 180) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
})();
`;

async function measure(cdp, sessionId, url) {
  const send = (m, p) => cdp.send(m, p, sessionId);
  const evaluate = async (expr, awaitPromise = false) => {
    const r = await send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise,
    });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " :: " + expr.slice(0, 80));
    return r.result.value;
  };

  await send("Network.clearBrowserCache");
  await send("Network.clearBrowserCookies");

  // Mid-range Android profile.
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390, height: 844, deviceScaleFactor: 2.625, mobile: true,
  });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: "cellular4g",
  });
  await send("Emulation.setUserAgentOverride", {
    userAgent:
      "Mozilla/5.0 (Linux; Android 12; moto g(50)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
  });

  // Byte accounting per resource type.
  //
  // The listeners are registered per measure() call and never removed, so they
  // MUST ignore anything that isn't this page's request — otherwise the first
  // URL's counters keep accumulating while later URLs load, and its totals come
  // back inflated by every subsequent page (this silently doubled the reported
  // font weight). `seen` is per-call, so an unknown requestId means the event
  // belongs to a different measurement.
  const bytes = { script: 0, stylesheet: 0, image: 0, font: 0, document: 0, other: 0 };
  const seen = new Map();
  let accounting = true;
  cdp.on("Network.responseReceived", (p) => {
    if (!accounting) return;
    seen.set(p.requestId, p.type);
  });
  cdp.on("Network.loadingFinished", (p) => {
    if (!accounting || !seen.has(p.requestId)) return;
    const t = (seen.get(p.requestId) || "Other").toLowerCase();
    const key = t in bytes ? t : "other";
    bytes[key] += p.encodedDataLength || 0;
  });

  await send("Page.addScriptToEvaluateOnNewDocument", { source: PROBE });
  await send("Page.navigate", { url });

  // Let the page load + settle.
  await sleep(9000);

  // Sample frame health while nominally idle (catches forever-running rAF/JS animation).
  await evaluate("window.__cwv.startRafSample()");
  await sleep(3200);

  const idle = await evaluate(
    "({frames: window.__cwv.rafFrames, late: window.__cwv.rafLate})"
  );

  // ── drive real interactions and capture their latency ──────────────
  const targets = await evaluate(`(() => {
    const pick = (sel) => { const e = document.querySelector(sel); if (!e) return null;
      const r = e.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return null;
      return { sel, x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2) }; };
    const out = [];
    for (const sel of ['button[aria-label="Open menu"]', 'button[aria-expanded]', 'a[href="/contact"]']) {
      const t = pick(sel); if (t) out.push(t);
    }
    return out;
  })()`);

  for (const t of targets) {
    if (t.y < 0 || t.y > 844) continue;
    const base = { x: t.x, y: t.y, radiusX: 12, radiusY: 12, force: 1 };
    await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [base] });
    await sleep(60);
    await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await sleep(1400);
    // Reset any drawer/overlay the tap opened.
    await evaluate(`(() => { const b = document.querySelector('button[aria-label="Close menu"]'); if (b) b.click(); })()`);
    await sleep(500);
  }
  await sleep(600);

  const s = await evaluate(
    "({lcp: window.__cwv.lcp, lcpEl: window.__cwv.lcpEl, fcp: window.__cwv.fcp, longTasks: window.__cwv.longTasks, events: window.__cwv.events, cls: window.__cwv.cls, clsSources: window.__cwv.clsSources})"
  );

  accounting = false; // stop this page's counters before the next URL loads

  const fcp = s.fcp || 0;
  const tbt = s.longTasks
    .filter((t) => t.start >= fcp)
    .reduce((a, t) => a + Math.max(0, t.dur - 50), 0);
  const worst = s.events.reduce((a, e) => (e.dur > (a?.dur ?? 0) ? e : a), null);

  return {
    url,
    cls: s.cls,
    clsSources: s.clsSources,
    lcp: s.lcp,
    lcpEl: s.lcpEl,
    fcp,
    tbt,
    longTaskCount: s.longTasks.length,
    longTaskMax: s.longTasks.reduce((a, t) => Math.max(a, t.dur), 0),
    worstEvent: worst,
    events: s.events.sort((a, b) => b.dur - a.dur).slice(0, 5),
    idleFrames: idle,
    bytes,
  };
}

/* ── main ────────────────────────────────────────────────────────────── */
const profile = mkdtempSync(join(tmpdir(), "cwv-"));
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] }
);
chrome.stderr.on("data", () => {});

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(300);
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) {
  chrome.kill();
  rmSync(profile, { recursive: true, force: true });
  throw new Error("chromium did not expose a debugging endpoint");
}

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", rej, { once: true });
});
const cdp = new CDP(ws);

const results = [];
try {
  for (const url of URLS) {
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Network.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    try {
      results.push(await withTimeout(measure(cdp, sessionId, url), 90_000, url));
    } catch (e) {
      results.push({ url, error: String(e) });
    }
    await cdp.send("Target.closeTarget", { targetId });
  }
} finally {
  ws.close();
  chrome.kill();
  await sleep(500);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch {
    /* profile dir cleanup is best-effort; never let it swallow the results */
  }
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const ms = (n) => `${Math.round(n)} ms`;

for (const r of results) {
  console.log("\n" + "═".repeat(72));
  console.log(r.url);
  console.log("═".repeat(72));
  if (r.error) {
    console.log("  ERROR:", r.error);
    continue;
  }
  console.log(`  FCP                ${ms(r.fcp)}`);
  console.log(`  LCP                ${ms(r.lcp)}   ${r.lcp <= 2500 ? "PASS" : "FAIL (>2.5s)"}`);
  console.log(`  LCP element        ${r.lcpEl}`);
  console.log(
    `  CLS                ${r.cls.toFixed(4)}   ${r.cls <= 0.1 ? "PASS" : "FAIL (>0.1)"}` +
      (r.clsSources?.length ? `   shifted: ${r.clsSources.join(" | ")}` : "")
  );
  console.log(`  TBT (post-FCP)     ${ms(r.tbt)}`);
  console.log(`  Long tasks         ${r.longTaskCount} (max ${ms(r.longTaskMax)})`);
  if (r.worstEvent)
    console.log(
      `  Worst interaction  ${ms(r.worstEvent.dur)}  [${r.worstEvent.name}]  ` +
        `delay ${ms(r.worstEvent.delay)} / processing ${ms(r.worstEvent.proc)}   ` +
        (r.worstEvent.dur <= 200 ? "PASS" : "FAIL (>200ms)")
    );
  else console.log("  Worst interaction  (no interaction events captured)");
  console.log(
    `  Idle frame health  ${r.idleFrames.late}/${r.idleFrames.frames} frames stretched >20ms ` +
      `(lower = quieter main thread)`
  );
  console.log(
    `  Transfer           js ${kb(r.bytes.script)} · css ${kb(r.bytes.stylesheet)} · ` +
      `img ${kb(r.bytes.image)} · font ${kb(r.bytes.font)} · doc ${kb(r.bytes.document)}`
  );
}
console.log("");
