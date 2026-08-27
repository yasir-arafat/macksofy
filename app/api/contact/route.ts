import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/site";
import {
  clientIp,
  createRateLimiter,
  verifyTurnstile,
  escapeHtml,
  isAllowedOrigin,
} from "@/lib/security";

const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  company: z.string().max(160).optional(),
  interest: z.string().min(1).max(160),
  message: z.string().min(10).max(4000),
  // Honeypot — accept any string here so the silent-trap logic runs in the handler.
  website: z.string().max(2048).optional(),
  // Cloudflare Turnstile token issued by the client widget.
  cfToken: z.string().min(10).max(2048),
});

/**
 * Captcha pre-gate. Only the Turnstile token is validated at this stage so the
 * human check can run BEFORE the full schema — see the ordering note in POST.
 */
const TokenOnly = z.object({ cfToken: z.string().min(10).max(2048) });

export const runtime = "nodejs";

// 5 submissions per 10 minutes per IP.
const rateLimited = createRateLimiter({
  windowMs: 10 * 60_000,
  max: 5,
  prefix: "contact",
});

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (await rateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions from this address. Please wait a few minutes and try again, or reach us on WhatsApp / phone.",
      },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  // Reject browser-initiated cross-origin POSTs (CWE-352). See isAllowedOrigin
  // for why an absent Origin is allowed through.
  if (!isAllowedOrigin(request)) {
    console.warn(
      "[contact] Blocked cross-origin POST from",
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

  // ── Captcha BEFORE full validation (schema-disclosure oracle fix) ─────
  // Validating the full schema first turned this route into an unauthenticated
  // schema oracle: an empty POST came back 422 with every field name, type and
  // length bound in `details`. Gating on Turnstile first means an unverified
  // caller can only ever observe 403 — the field map is never reachable without
  // solving the challenge. The token is shape-checked first so a malformed body
  // costs no outbound siteverify call, and the IP rate limiter above already
  // bounds how often this path can be driven at all.
  const gate = TokenOnly.safeParse(payload);
  if (!gate.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const ok = await verifyTurnstile(gate.data.cfToken, ip, "contact");
  if (!ok) {
    return NextResponse.json(
      {
        error:
          "Human verification failed. Please complete the challenge again and resubmit.",
      },
      { status: 403 }
    );
  }

  // Full validation runs only for verified humans. `details` is deliberately
  // NOT returned — the client form does its own field-level validation, and
  // nothing in the app consumes this payload.
  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot — silent reject for bots that filled it.
  if (data.website && data.website.length > 0) {
    console.info("[contact] Honeypot triggered from", ip);
    return NextResponse.json({
      ok: true,
      message: "Thanks — we'll be in touch shortly.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Macksofy Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY missing — submission only logged.",
      data
    );
    return NextResponse.json({
      ok: true,
      message:
        "Thanks! Your enquiry has been received. (Email delivery is not configured in this environment — set RESEND_API_KEY to enable.)",
    });
  }

  const resend = new Resend(apiKey);
  const subject = `[Macksofy] ${data.interest} · ${data.name}`;
  const html = `
    <h2 style="font-family:system-ui">${escapeHtml(data.interest)} enquiry</h2>
    <table style="font-family:system-ui;font-size:14px;border-collapse:collapse">
      <tr><td><b>Name</b></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td><b>Phone</b></td><td><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
      <tr><td><b>Company</b></td><td>${escapeHtml(data.company ?? "")}</td></tr>
      <tr><td><b>IP</b></td><td>${escapeHtml(ip)}</td></tr>
    </table>
    <h3 style="font-family:system-ui">Message</h3>
    <p style="font-family:system-ui;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    <hr/>
    <p style="font-family:system-ui;color:#666;font-size:12px">From ${SITE.url} · Verified by Cloudflare Turnstile</p>
  `;

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html,
    });
    if (result.error) {
      console.error("[contact] Resend error", result.error);
      return NextResponse.json(
        { error: "Email delivery failed" },
        { status: 502 }
      );
    }
    return NextResponse.json({
      ok: true,
      message: "Thanks! We'll be in touch within a few business hours.",
    });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
