/**
 * first-load-js.mjs — deterministic per-page client JS weight.
 *
 * The transfer figures in scripts/cwv-measure.mjs include App Router link
 * prefetching, which varies run to run and swamps the signal. This instead
 * reads the prerendered HTML in .next/server/app, collects every
 * /_next/static/**.js the document boots with, and sums their on-disk bytes —
 * so before/after comparisons are exact and reproducible.
 *
 * Usage:
 *   node scripts/first-load-js.mjs                       # a default sample
 *   node scripts/first-load-js.mjs index blog/some-slug  # specific pages
 */

import { readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP = ".next/server/app";

const pages = process.argv.slice(2);
const targets = pages.length
  ? pages
  : [
      "index",
      "blog/best-laptops-cybersecurity-students-india-2026",
      "about",
      "contact",
    ];

const sizeOf = (urlPath) => {
  // "/_next/static/chunks/x.js" -> ".next/static/chunks/x.js"
  const rel = urlPath.replace(/^\/_next\//, "");
  const p = join(".next", rel);
  try {
    return statSync(p).size;
  } catch {
    return 0;
  }
};

console.log("");
console.log("Deterministic first-load JS (uncompressed, from prerendered HTML)");
console.log("─".repeat(72));

const perFile = new Map();

for (const t of targets) {
  const file = join(APP, `${t}.html`);
  if (!existsSync(file)) {
    console.log(`${t.padEnd(46)} (no prerendered HTML)`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const srcs = new Set(
    [...html.matchAll(/["'](\/_next\/static\/[^"']+?\.js)["']/g)].map((m) => m[1])
  );
  let total = 0;
  for (const s of srcs) {
    const bytes = sizeOf(s);
    total += bytes;
    perFile.set(s, bytes);
  }
  console.log(
    `${t.padEnd(46)} ${(total / 1024).toFixed(0).padStart(6)} KB  (${srcs.size} chunks)`
  );
}

console.log("");
console.log("Largest individual chunks referenced above:");
[...perFile.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .forEach(([f, b]) =>
    console.log(`  ${(b / 1024).toFixed(0).padStart(6)} KB  ${f}`)
  );
console.log("");
