#!/usr/bin/env node
// Submit the production sitemap's URLs to IndexNow (Bing/Yandex/Seznam/Naver).
// Usage: INDEXNOW_KEY=... node scripts/indexnow-submit.mjs [sitemapUrl]

const SITE_URL = "https://www.macksofy.com";
const SITEMAP_URL = process.argv[2] || `${SITE_URL}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10000;

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error("ERROR: INDEXNOW_KEY env var is not set");
  process.exit(1);
}

const host = new URL(SITE_URL).host;
const keyLocation = `${SITE_URL}/${key}.txt`;

async function verifyKeyFile() {
  const res = await fetch(keyLocation);
  if (!res.ok) {
    throw new Error(`Key file not reachable at ${keyLocation} — status ${res.status}`);
  }
  const body = (await res.text()).trim();
  if (body !== key) {
    throw new Error(`Key file content does not match INDEXNOW_KEY (got "${body.slice(0, 16)}…")`);
  }
}

async function fetchSitemapUrls(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url} — status ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return urls.filter((u) => u.startsWith(SITE_URL));
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function submit(batch) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
  });
  const text = await res.text().catch(() => "");
  return { status: res.status, ok: res.ok, body: text };
}

(async () => {
  console.log(`→ Verifying key file at ${keyLocation}`);
  await verifyKeyFile();
  console.log(`✓ Key file reachable and matches`);

  console.log(`→ Fetching sitemap ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls(SITEMAP_URL);
  console.log(`✓ ${urls.length} URLs extracted`);

  const batches = chunk(urls, MAX_URLS_PER_REQUEST);
  for (const [i, batch] of batches.entries()) {
    console.log(`→ Submitting batch ${i + 1}/${batches.length} (${batch.length} URLs)`);
    const result = await submit(batch);
    const verdict = result.ok ? "✓" : "✗";
    console.log(`  ${verdict} status=${result.status} ${result.body ? "body=" + result.body.slice(0, 200) : ""}`);
    if (!result.ok) process.exitCode = 1;
  }
  console.log("done");
})().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
