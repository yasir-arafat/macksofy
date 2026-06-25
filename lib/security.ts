/**
 * Shared security helpers for /api routes.
 *
 * - clientIp: extract the client IP from the TRUSTED reverse-proxy header
 *   (platform-set), not the spoofable first X-Forwarded-For hop.
 * - createRateLimiter: durable per-key limiter. Uses Upstash Redis (REST) when
 *   configured so the limit holds across serverless instances; falls back to an
 *   in-process sliding window for local dev / single-instance hosts.
 * - verifyTurnstile: Cloudflare Turnstile siteverify. Fails CLOSED in
 *   production when no secret is configured (never silently accepts the
 *   always-pass test secret in prod).
 * - escapeHtml: minimal HTML entity escape for safe interpolation in outgoing
 *   email bodies.
 */

import { IS_PROD } from "./env";

// Cloudflare Turnstile test secret that always validates — used ONLY in dev
// when no real secret is configured. Production fails closed instead (see
// verifyTurnstile). Production hosts MUST set TURNSTILE_SECRET_KEY.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

/**
 * Extract the client IP from reverse-proxy headers.
 *
 * SECURITY (CWE-290/CWE-348): the FIRST `X-Forwarded-For` value is fully
 * client-controlled and trivially spoofed to rotate rate-limit buckets. On a
 * trusted platform (Vercel/Cloudflare/NGINX) the *platform* sets `x-real-ip`
 * (and appends the true client as the LAST hop of XFF). We trust those, not the
 * attacker-supplied first hop.
 */
export function clientIp(request: Request): string {
  // Platform-set, not client-spoofable on Vercel / CF / properly-configured NGINX.
  const real =
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip");
  if (real) return real.trim();

  // Fallback: take the LAST hop appended by the trusted proxy, not the
  // client-supplied first entry.
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const parts = fwd.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}

// ── Durable rate limiting via Upstash Redis (REST) ──────────────────────────
// We call the Upstash REST API directly with fetch (no SDK) to avoid adding a
// dependency to the supply chain. Configured via:
//   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const UPSTASH_ENABLED = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

/**
 * Fixed-window counter in Redis via a single pipelined round trip:
 *   INCR key                    → current hit count in this window
 *   EXPIRE key <ttl> NX         → set TTL only on the first hit of the window
 * Returns the post-increment count, or null if Redis is unreachable (caller
 * then falls back to the in-memory limiter so the route stays available).
 */
async function redisIncr(key: string, ttlSeconds: number): Promise<number | null> {
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(ttlSeconds), "NX"],
      ]),
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) {
      console.warn("[ratelimit] Upstash HTTP", res.status);
      return null;
    }
    // Pipeline returns an array of { result } objects, in command order.
    const data = (await res.json()) as Array<{ result?: number; error?: string }>;
    const count = data?.[0]?.result;
    return typeof count === "number" ? count : null;
  } catch (err) {
    console.warn("[ratelimit] Upstash error — falling back to in-memory", err);
    return null;
  }
}

/**
 * Returns an async limiter `(key) => Promise<boolean>` (true = throttled).
 *
 * Prefers Upstash (durable, multi-instance-correct) and degrades to an
 * in-process sliding window when Upstash isn't configured or is unreachable.
 */
export function createRateLimiter(opts: {
  windowMs: number;
  max: number;
  maxKeysBeforeSweep?: number;
  /** Namespace so different routes don't share buckets in Redis. */
  prefix?: string;
}) {
  const hits = new Map<string, number[]>();
  const sweepThreshold = opts.maxKeysBeforeSweep ?? 5000;
  const prefix = opts.prefix ?? "rl";
  const ttlSeconds = Math.ceil(opts.windowMs / 1000);

  function inMemory(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < opts.windowMs);
    if (recent.length >= opts.max) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > sweepThreshold) {
      for (const [k, v] of hits) {
        if (v.every((t) => now - t > opts.windowMs)) hits.delete(k);
      }
    }
    return false;
  }

  return async function rateLimited(key: string): Promise<boolean> {
    if (UPSTASH_ENABLED) {
      const count = await redisIncr(`${prefix}:${key}`, ttlSeconds);
      if (count !== null) return count > opts.max;
      // Redis unreachable → fail safe to the local limiter (still some defence).
    }
    return inMemory(key);
  };
}

export async function verifyTurnstile(
  token: string,
  ip: string,
  logTag = "turnstile"
): Promise<boolean> {
  const configured = process.env.TURNSTILE_SECRET_KEY;

  // SECURITY (CWE-1188): never fall back to the always-pass test secret in
  // production. A missing key must DISABLE the form (fail closed), not silently
  // bypass human verification.
  let secret: string;
  if (configured && configured.length > 0) {
    secret = configured;
  } else if (IS_PROD) {
    console.error(
      `[${logTag}] TURNSTILE_SECRET_KEY missing in production — rejecting submission (fail closed).`
    );
    return false;
  } else {
    secret = TURNSTILE_TEST_SECRET; // dev convenience only
  }

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (ip && ip !== "unknown") body.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) {
      console.warn(`[${logTag}] Turnstile siteverify HTTP`, res.status);
      return false;
    }
    const data: {
      success: boolean;
      "error-codes"?: string[];
    } = await res.json();
    if (!data.success) {
      console.warn(`[${logTag}] Turnstile rejected:`, data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.warn(`[${logTag}] Turnstile verification error`, err);
    return false;
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
