#!/usr/bin/env node
/**
 * Render the Cyber Resilience Guide route to the committed static PDF.
 *
 * Drives system Chromium over the DevTools Protocol using Node's built-in
 * WebSocket (Node >= 22) — no puppeteer/playwright dependency. Produces a
 * clean A4 PDF with a branded running footer + real "Page X of Y" markers,
 * and without Chrome's default header/footer (which leaks the localhost URL
 * and a timestamp into a client-facing deliverable).
 *
 * Usage: the dev or prod server must be serving the route first, then:
 *   node scripts/generate-guide-pdf.mjs
 *   GUIDE_URL=https://macksofy.com/guides/cyber-resilience-2026 node scripts/generate-guide-pdf.mjs
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const URL =
  process.env.GUIDE_URL || "http://localhost:3000/guides/cyber-resilience-2026";
const OUT = process.env.OUT || "public/cyber-resilience-guide-2026.pdf";
const PORT = Number(process.env.CDP_PORT || 9876);
const BIN = process.env.CHROME_BIN || "chromium";

const chrome = spawn(
  BIN,
  [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--user-data-dir=/tmp/chrome-guide-pdf",
    "--remote-allow-origins=*",
    `--remote-debugging-port=${PORT}`,
    URL,
  ],
  { stdio: ["ignore", "ignore", "inherit"] },
);

// Connect to the *page* target (not the browser target) so Page.* commands work.
async function pageEndpoint() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find(
        (t) => t.type === "page" && t.webSocketDebuggerUrl,
      );
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(200);
  }
  throw new Error("Chromium page target never came up");
}

// The header/footer templates double as the page's top/bottom MARGIN: each is a
// full white strip that fills its reserved margin band. This is deliberate —
// Chrome leaves the margin region transparent (renders dark in viewers), so the
// strips paint it white while also carrying the running footer + page numbers.
const HEADER = `<div style="width:100%;height:100%;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>`;

const FOOTER = `
<div style="width:100%;height:100%;margin:0;box-sizing:border-box;background:#fff;
            -webkit-print-color-adjust:exact;print-color-adjust:exact;
            font-family:Arial,Helvetica,sans-serif;font-size:7px;color:#64748b;
            display:flex;align-items:center;justify-content:space-between;padding:0 14mm;">
  <span style="font-weight:bold;color:#0f172a;letter-spacing:.06em;white-space:nowrap;">MACKSOFY&nbsp;TECHNOLOGIES</span>
  <span style="white-space:nowrap;">MKS-BOARD-GUIDE-2026</span>
  <span style="white-space:nowrap;">Page&nbsp;<span class="pageNumber"></span>&nbsp;of&nbsp;<span class="totalPages"></span></span>
</div>`;

async function main() {
  const wsUrl = await pageEndpoint();
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", rej, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) reject(new Error(m.error.message));
      else resolve(m.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });

  await send("Page.enable");
  // Chrome launched straight at the URL, so it may already be loaded; give
  // fonts + client hydration (the .print-mode class) time to settle.
  await sleep(2000);

  const { data } = await send("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: false,
    paperWidth: 8.27, // A4
    paperHeight: 11.69,
    // Left/right = 0 (side margins come from the article's 14mm padding so they
    // stay identical on every page). Top/bottom reserve the white header/footer
    // strips that paint those bands white + carry the page numbers.
    marginTop: 0.55,
    marginBottom: 0.62,
    marginLeft: 0,
    marginRight: 0,
    displayHeaderFooter: true,
    headerTemplate: HEADER,
    footerTemplate: FOOTER,
  });

  const buf = Buffer.from(data, "base64");
  writeFileSync(OUT, buf);
  console.log(`Wrote ${OUT} (${buf.length} bytes)`);
  ws.close();
  chrome.kill();
  // Chromium child + WS can keep the event loop alive; exit deterministically.
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  chrome.kill();
  process.exit(1);
});
