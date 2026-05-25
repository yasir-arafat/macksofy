import { SITE } from "./site";

const HOST = new URL(SITE.url).host;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10000;

function getKey(): string {
  const key = process.env.INDEXNOW_KEY;
  if (!key) throw new Error("INDEXNOW_KEY env var is not set");
  return key;
}

function keyLocation(key: string): string {
  return `${SITE.url.replace(/\/$/, "")}/${key}.txt`;
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submittedCount: number;
  message?: string;
};

export async function submitUrls(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: true, status: 200, submittedCount: 0, message: "no URLs" };
  }
  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`IndexNow caps requests at ${MAX_URLS_PER_REQUEST} URLs; got ${urls.length}`);
  }
  const key = getKey();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: keyLocation(key),
      urlList: urls,
    }),
  });
  return {
    ok: res.ok,
    status: res.status,
    submittedCount: urls.length,
    message: res.ok ? undefined : await res.text().catch(() => undefined),
  };
}

export async function submitUrl(url: string): Promise<IndexNowResult> {
  return submitUrls([url]);
}
