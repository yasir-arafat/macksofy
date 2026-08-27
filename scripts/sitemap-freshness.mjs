#!/usr/bin/env node
/**
 * Guard for SITE.contentRevision — the sitemap's <lastmod> baseline.
 *
 * WHY THIS EXISTS
 * `contentRevision` is a hand-maintained date. Every page without its own
 * `updated` field inherits it as <lastmod>, which on this site is ~76% of the
 * sitemap. In August 2026 it sat three months stale while the SSR sweep rewrote
 * the visible body copy of nearly every page, so the sitemap asserted
 * "unchanged since 2026-05-31" about 204 URLs that had just changed a lot.
 *
 * On a domain where crawl demand is the binding constraint (GSC showed 25 of
 * 267 URLs indexed and 34 of 35 sampled URLs never crawled at all), an
 * inaccurate <lastmod> is the one crawl-scheduling signal we control and were
 * getting wrong. Google only honours <lastmod> while it stays consistently
 * accurate.
 *
 * WHAT IT CHECKS
 * Compares contentRevision against the newest git commit that touched a
 * content-bearing path. If real content shipped after the marker was last
 * bumped, the sitemap is lying and this exits non-zero.
 *
 * Usage:  npm run sitemap:freshness           (check)
 *         npm run sitemap:freshness -- --live (also profile the live sitemap)
 */
// execFileSync (argv array, no shell) rather than execSync: nothing here is
// user-supplied, but a shell buys us nothing and would misparse a path
// containing a space.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Paths whose changes are visible to a READER (and therefore to Googlebot).
//
// ⚠️ Scope this narrowly and keep it that way. A first cut used bare `app`,
// which made a security-headers commit (no copy changed) trip the guard. A
// guard that cries wolf is worse than none here: it trains you to bump
// contentRevision on every deploy, which is exactly the "every URL changes on
// every deploy" state that destroys <lastmod> credibility and that the stable
// constant exists to prevent. Machine-readable routes (app/api, route.ts,
// sitemap.ts, robots.ts) and chrome/metadata (app/layout.tsx) are excluded by
// matching only page files.
const CONTENT_PATHS = [
  "content",
  "components",
  ":(glob)app/**/page.tsx",
  ":(glob)app/**/page.mdx",
  "lib/schema.ts",
  "lib/seo.ts",
];

const site = readFileSync(path.join(ROOT, "lib/site.ts"), "utf8");
const m = site.match(/contentRevision:\s*"(\d{4}-\d{2}-\d{2})"/);
if (!m) {
  console.error("FAIL: could not find contentRevision in lib/site.ts");
  process.exit(2);
}
const revision = m[1];

let lastContentCommit, lastContentDate, subject;
try {
  const out = execFileSync(
    "git",
    ["log", "-1", "--format=%cI%x00%h%x00%s", "--", ...CONTENT_PATHS],
    { cwd: ROOT, encoding: "utf8" }
  ).trim();
  [lastContentDate, lastContentCommit, subject] = out.split("\0");
} catch {
  console.error("FAIL: git log failed (not a repo / no history?)");
  process.exit(2);
}

const revDate = new Date(`${revision}T23:59:59Z`); // generous: whole day counts
const contentDate = new Date(lastContentDate);
const staleDays = Math.floor((contentDate - revDate) / 86400000);

console.log(`contentRevision      : ${revision}`);
console.log(`last content commit  : ${lastContentDate.slice(0, 10)}  ${lastContentCommit}  ${subject}`);

if (process.argv.includes("--live")) {
  const xml = execFileSync(
    "curl",
    ["-sS", "--max-time", "30", "https://www.macksofy.com/sitemap.xml"],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  const lastmods = [...xml.matchAll(/<lastmod>([^<]{10})/g)].map((x) => x[1]);
  const counts = new Map();
  for (const d of lastmods) counts.set(d, (counts.get(d) ?? 0) + 1);
  const total = lastmods.length;
  const top = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(`\nlive sitemap         : ${total} URLs, ${counts.size} distinct lastmod values`);
  for (const [d, n] of top) {
    console.log(`  ${d}  ${String(n).padStart(4)}  (${((n / total) * 100).toFixed(0)}%)`);
  }
}

if (staleDays > 0) {
  console.error(
    `\nFAIL: content shipped ${staleDays} day(s) AFTER contentRevision was last bumped.\n` +
      `      The sitemap is advertising a <lastmod> older than the content it describes.\n` +
      `      Bump SITE.contentRevision to ${lastContentDate.slice(0, 10)} (or later) and redeploy.`
  );
  process.exit(1);
}

console.log(`\nOK: contentRevision is current (no content commits after it).`);
