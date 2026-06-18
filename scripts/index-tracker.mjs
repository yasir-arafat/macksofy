#!/usr/bin/env node
// Indexing tracker — heuristic "is this URL in Google's index?" checker.
//
// Watches a stable set of URLs (default: the /locations/<city>/<service>
// combo pages — the deep pages most at risk of "Discovered – currently not
// indexed") and records a dated snapshot of each one's apparent index status
// so you can watch the trend over weeks.
//
// HOW IT DECIDES (heuristic — read the caveat):
//   For each URL it runs a Google `site:<url>` query and inspects the HTML:
//     indexed      → the exact URL appears in the results
//     not_indexed  → Google returned results but the URL is absent / "did not
//                     match any documents"
//     unknown      → Google blocked the request (CAPTCHA / 429 / "unusual
//                     traffic"). NOT counted as not-indexed.
//
// ⚠️  CAVEAT: Google blocks automated SERP scraping, especially from
//     datacenter IPs. Expect many `unknown` results when run from a server.
//     For authoritative data use the GSC URL Inspection API. This heuristic
//     is a cheap directional signal, not ground truth.
//
// Usage:
//   node scripts/index-tracker.mjs                 # check watched combos
//   node scripts/index-tracker.mjs --all           # check ALL sitemap-full URLs
//   node scripts/index-tracker.mjs --refresh       # rebuild the watch list
//   node scripts/index-tracker.mjs --delay=12000   # ms between queries (jittered)
//   node scripts/index-tracker.mjs --limit=20      # only check first N (testing)
//
// Snapshots: scripts/index-snapshots/<YYYY-MM-DD>.json  (+ latest.json)

import { writeFile, readFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE_URL = "https://www.macksofy.com";
const HERE = dirname(fileURLToPath(import.meta.url));
const SNAP_DIR = join(HERE, "index-snapshots");
const WATCH_FILE = join(HERE, "index-watch.json");

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, def) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : def;
};

const DELAY = Number(opt("delay", 9000));
const LIMIT = Number(opt("limit", 0)) || Infinity;
const CHECK_ALL = flag("all");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (ms) => ms + Math.floor((Math.random() - 0.5) * ms * 0.6);
const today = () => new Date().toISOString().slice(0, 10);

async function fetchSitemapUrls(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Failed to fetch ${url} — status ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(SITE_URL));
}

// Build / load the stable watch list. We persist it so week-over-week trends
// compare the same URL set even as the sitemap evolves. --refresh rebuilds it.
async function getWatchList() {
  if (!flag("refresh") && existsSync(WATCH_FILE)) {
    return JSON.parse(await readFile(WATCH_FILE, "utf8"));
  }
  const all = await fetchSitemapUrls(`${SITE_URL}/sitemap-full.xml`);
  const combos = all.filter((u) =>
    /\/locations\/[^/]+\/[^/]+$/.test(u.replace(SITE_URL, ""))
  );
  const list = CHECK_ALL ? all : combos;
  await writeFile(WATCH_FILE, JSON.stringify(list, null, 2));
  console.log(`✓ watch list written: ${list.length} URLs → ${WATCH_FILE}`);
  return list;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function classify(html, url) {
  const lower = html.toLowerCase();

  // 1. Hard blocks / consent walls → unknown (never "not indexed").
  for (const m of [
    "/sorry/",
    "unusual traffic",
    "our systems have detected",
    "recaptcha",
    "captcha",
    "before you continue",
    "consent.google",
  ]) {
    if (lower.includes(m)) return "unknown";
  }

  // 2. Explicit "no results" pages are a trustworthy negative.
  if (
    lower.includes("did not match any documents") ||
    lower.includes("no results found") ||
    lower.includes(" - did not match")
  ) {
    return "not_indexed";
  }

  // 3. We can only read a SERVER-RENDERED results container. A JS-gated shell
  //    (Google's "enablejs" page served to datacenter IPs) has no #rso/#search
  //    region — we cannot see results, so it's inconclusive, NOT not-indexed.
  const hasResults =
    lower.includes('id="rso"') ||
    lower.includes('id="search"') ||
    lower.includes('id="center_col"');
  if (!hasResults) return "unknown";

  // 4. Real SERP: count it indexed ONLY if the URL appears in an actual result
  //    link/cite — explicitly excluding the query reflection
  //    (href="/search?q=site:...") that echoes the URL back regardless.
  const path = url.slice(SITE_URL.length);
  const directHref =
    html.includes(`href="${url}"`) ||
    html.includes(`href="${url}/"`) ||
    html.includes(`href="${url}?`);
  const redirectHref =
    html.includes(`/url?q=${url}`) ||
    html.includes(`/url?q=${encodeURIComponent(url)}`);
  // Breadcrumb cite: "www.macksofy.com › locations › <city> › <service>".
  const segs = path.split("/").filter(Boolean).map(escapeRe);
  const citeLike =
    segs.length > 0 &&
    new RegExp(`macksofy\\.com[^<]{0,40}${segs.join("[^<]{0,15}")}`, "i").test(html);

  return directHref || redirectHref || citeLike ? "indexed" : "not_indexed";
}

async function checkOne(url) {
  const q = encodeURIComponent(`site:${url}`);
  const endpoint = `https://www.google.com/search?q=${q}&num=10&hl=en&gl=in`;
  try {
    const res = await fetch(endpoint, {
      headers: { "User-Agent": UA, "Accept-Language": "en-IN,en;q=0.9" },
    });
    if (res.status === 429) return "unknown";
    const html = await res.text();
    return classify(html, url);
  } catch {
    return "unknown";
  }
}

async function loadPrevSnapshot() {
  if (!existsSync(SNAP_DIR)) return null;
  const files = (await readdir(SNAP_DIR))
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();
  const prevName = files.filter((f) => f !== `${today()}.json`).pop();
  if (!prevName) return null;
  const data = JSON.parse(await readFile(join(SNAP_DIR, prevName), "utf8"));
  return { name: prevName, map: new Map(data.results.map((r) => [r.url, r.status])) };
}

(async () => {
  const list = (await getWatchList()).slice(0, LIMIT);
  console.log(`→ Checking ${list.length} URLs (delay ~${DELAY}ms, jittered)`);
  console.log(`⚠️  Heuristic — 'unknown' means Google blocked the query, not 'not indexed'.\n`);

  const results = [];
  const counts = { indexed: 0, not_indexed: 0, unknown: 0 };
  for (const [i, url] of list.entries()) {
    const status = await checkOne(url);
    counts[status]++;
    results.push({ url, status, checkedAt: new Date().toISOString() });
    const icon = { indexed: "✓", not_indexed: "✗", unknown: "?" }[status];
    console.log(`  ${icon} [${i + 1}/${list.length}] ${status.padEnd(11)} ${url}`);
    if (i < list.length - 1) await sleep(jitter(DELAY));
  }

  await mkdir(SNAP_DIR, { recursive: true });
  const snapshot = { date: today(), site: SITE_URL, counts, results };
  await writeFile(join(SNAP_DIR, `${today()}.json`), JSON.stringify(snapshot, null, 2));
  await writeFile(join(SNAP_DIR, "latest.json"), JSON.stringify(snapshot, null, 2));

  // Trend vs previous snapshot
  const prev = await loadPrevSnapshot();
  console.log(`\n── Summary (${today()}) ──`);
  console.log(`  indexed:     ${counts.indexed}`);
  console.log(`  not_indexed: ${counts.not_indexed}`);
  console.log(`  unknown:     ${counts.unknown}  (blocked / inconclusive)`);
  if (counts.unknown >= list.length * 0.8) {
    console.log(
      `\n⚠️  Most checks were inconclusive — this IP is getting Google's\n` +
        `   JS-gated/consent page instead of readable results. Run from a\n` +
        `   residential IP, or switch to the GSC URL Inspection API for\n` +
        `   authoritative data. Snapshot still saved for the record.`
    );
  }
  if (prev) {
    const newlyIndexed = results.filter(
      (r) => r.status === "indexed" && prev.map.get(r.url) && prev.map.get(r.url) !== "indexed"
    );
    const lost = results.filter(
      (r) => r.status === "not_indexed" && prev.map.get(r.url) === "indexed"
    );
    console.log(`\n── Change vs ${prev.name} ──`);
    console.log(`  newly indexed: ${newlyIndexed.length}`);
    newlyIndexed.forEach((r) => console.log(`    + ${r.url}`));
    console.log(`  dropped:       ${lost.length}`);
    lost.forEach((r) => console.log(`    - ${r.url}`));
  } else {
    console.log(`\n(baseline snapshot — run again later to see change)`);
  }
  console.log(`\n✓ snapshot saved → scripts/index-snapshots/${today()}.json`);
})().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
