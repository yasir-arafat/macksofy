/**
 * Server environment guard.
 *
 * Fixes the "insecure default" class (CWE-1188): rather than silently falling
 * back to test/always-pass secrets in production, surface a clear, fail-fast
 * signal so a missing Vercel env var breaks loudly instead of quietly
 * disabling a security control.
 *
 * These helpers are intentionally dependency-free (no Zod at module load) so
 * they're safe to import from both Node and Edge runtimes.
 */

export const IS_PROD = process.env.NODE_ENV === "production";

/**
 * Returns the configured value, or — in production — null when it is missing.
 * In non-production it returns the provided dev fallback so local dev keeps
 * working without real keys. Callers MUST treat a null return as "fail closed".
 */
export function requiredInProd(
  name: string,
  devFallback?: string
): string | null {
  const v = process.env[name];
  if (v && v.length > 0) return v;
  if (IS_PROD) {
    // Loud, greppable signal in Vercel runtime logs. Do NOT fall back to a
    // test/insecure value in production.
    console.error(
      `[env] FATAL: required environment variable ${name} is missing in production — failing closed.`
    );
    return null;
  }
  return devFallback ?? null;
}
