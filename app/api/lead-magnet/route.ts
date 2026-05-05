import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

const Schema = z.object({
  email: z.string().email(),
  magnet: z.string().min(1),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
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
  const { email, magnet } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Macksofy <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[lead-magnet] RESEND_API_KEY missing", { email, magnet });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  // Notify internal
  await resend.emails.send({
    from,
    to: [to],
    subject: `[Macksofy] Lead magnet download: ${magnet}`,
    html: `<p>New lead-magnet download.</p><p>Email: <b>${email}</b></p><p>Magnet: <b>${magnet}</b></p>`,
  });
  // Send the user the magnet
  await resend.emails.send({
    from,
    to: [email],
    subject: "Your Macksofy Cyber Resilience Guide",
    html: `
      <p>Thanks for downloading.</p>
      <p>Your guide is attached / linked here: <a href="${SITE.url}/downloads/cyber-resilience-guide-2026.pdf">Download PDF</a></p>
      <p>If you'd like a follow-up consultation with a Macksofy consultant, just reply to this email.</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
