import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/site";
import {
  clientIp,
  createRateLimiter,
  escapeHtml,
  isAllowedOrigin,
} from "@/lib/security";

/**
 * Allowlist of magnet slugs the frontend is permitted to request. Any other
 * value is rejected at the schema layer — closes the HTML-injection vector
 * that existed when the field was a free-form string interpolated into the
 * outgoing email body.
 */
const MAGNET_SLUGS = [
  "cyber-resilience-guide-2026",
  "footer-threat-intel-digest",
] as const;

const Schema = z.object({
  email: z.string().email().max(200),
  magnet: z.enum(MAGNET_SLUGS),
  // Honeypot — accept any string here so the silent-trap logic runs below.
  website: z.string().max(2048).optional(),
});

export const runtime = "nodejs";

// 3 submissions per 10 minutes per IP — tighter than the contact form
// because there's no captcha and no human-side urgency.
const rateLimited = createRateLimiter({
  windowMs: 10 * 60_000,
  max: 3,
  prefix: "lead-magnet",
});

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (await rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please retry in a few minutes." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  // Reject browser-initiated cross-origin POSTs (CWE-352). This route has no
  // captcha, so the origin check is the only cross-site control in front of it.
  if (!isAllowedOrigin(request)) {
    console.warn(
      "[lead-magnet] Blocked cross-origin POST from",
      request.headers.get("origin")
    );
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }
  const { email, magnet, website } = parsed.data;

  // Honeypot — silent reject for bots that filled it.
  if (website && website.length > 0) {
    console.info("[lead-magnet] Honeypot triggered from", ip);
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Macksofy <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[lead-magnet] RESEND_API_KEY missing", { email, magnet });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  // Internal notification only. We deliberately do NOT send a confirmation
  // email back to the submitted address — that turned the endpoint into an
  // email-amplification vector (attacker submits arbitrary recipients +
  // gets a Macksofy-branded email sent to them). If we re-enable user-facing
  // delivery later, gate it on Cloudflare Turnstile like the contact form.
  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      subject: `[Macksofy] Lead magnet download: ${escapeHtml(magnet)}`,
      html: `
        <p style="font-family:system-ui">New lead-magnet download.</p>
        <table style="font-family:system-ui;font-size:14px;border-collapse:collapse">
          <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><b>Magnet</b></td><td>${escapeHtml(magnet)}</td></tr>
          <tr><td><b>IP</b></td><td>${escapeHtml(ip)}</td></tr>
        </table>
        <p style="font-family:system-ui;color:#666;font-size:12px">From ${SITE.url}</p>
      `,
    });
    if (result.error) {
      console.error("[lead-magnet] Resend error", result.error);
      // Still return OK to the client — internal failure shouldn't expose
      // delivery internals or block the user's UI flow.
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[lead-magnet] Unexpected error", err);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
