/**
 * Shared security helpers for /api routes.
 *
 * - clientIp: extract client IP from common reverse-proxy headers (CF, HSP, NGINX).
 * - createRateLimiter: per-IP sliding window in-process limiter.
 * - verifyTurnstile: Cloudflare Turnstile siteverify (falls back to the always-pass
 *   test secret in dev so the form remains usable without keys).
 * - escapeHtml: minimal HTML entity escape for safe interpolation in outgoing email bodies.
 */

// Cloudflare Turnstile test secret that always validates — used in dev when
// no real secret is configured. Production hosts MUST set TURNSTILE_SECRET_KEY.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

/**
 * Sliding-window per-key (typically per-IP) rate limiter held in process memory.
 * For multi-instance deployments switch to Redis / Upstash; this is adequate for
 * the single-instance Hostinger / Vercel-Node deployments the marketing site uses.
 */
export function createRateLimiter(opts: {
  windowMs: number;
  max: number;
  maxKeysBeforeSweep?: number;
}) {
  const hits = new Map<string, number[]>();
  const sweepThreshold = opts.maxKeysBeforeSweep ?? 5000;

  return function rateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter(
      (t) => now - t < opts.windowMs
    );
    if (recent.length >= opts.max) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);

    // Opportunistic cleanup of stale keys to bound memory.
    if (hits.size > sweepThreshold) {
      for (const [k, v] of hits) {
        if (v.every((t) => now - t > opts.windowMs)) hits.delete(k);
      }
    }
    return false;
  };
}

export async function verifyTurnstile(
  token: string,
  ip: string,
  logTag = "turnstile"
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET;
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
