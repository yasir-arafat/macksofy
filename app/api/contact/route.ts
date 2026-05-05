import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

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

export const runtime = "nodejs";

// Cloudflare Turnstile test secret that always validates — used in dev when no
// real secret is configured. Set TURNSTILE_SECRET_KEY in .env.local to enforce.
const TURNSTILE_SECRET =
  process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";

// In-memory per-IP rate limit. Persists for the lifetime of the Node process.
// 5 submissions per 10 minutes per IP. Switch to Redis / Upstash for multi-instance deployments.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT = 5;
const ipHits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (v.every((t) => now - t > RATE_WINDOW_MS)) ipHits.delete(k);
    }
  }
  return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  try {
    const body = new URLSearchParams();
    body.append("secret", TURNSTILE_SECRET);
    body.append("response", token);
    if (ip && ip !== "unknown") body.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) {
      console.warn("[contact] Turnstile siteverify HTTP", res.status);
      return false;
    }
    const data: {
      success: boolean;
      "error-codes"?: string[];
    } = await res.json();
    if (!data.success) {
      console.warn("[contact] Turnstile rejected:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.warn("[contact] Turnstile verification error", err);
    return false;
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions from this address. Please wait a few minutes and try again, or reach us on WhatsApp / phone.",
      },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
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

  // Captcha — verify with Cloudflare.
  const ok = await verifyTurnstile(data.cfToken, ip);
  if (!ok) {
    return NextResponse.json(
      {
        error:
          "Human verification failed. Please complete the challenge again and resubmit.",
      },
      { status: 403 }
    );
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
