import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ConversionPing } from "@/components/lp/ConversionPing";
import { SITE } from "@/lib/site";

const WHATSAPP = SITE.whatsappLink(
  "Hi Macksofy, I just enquired about CEH v13 training — looking forward to the callback."
);

export const metadata: Metadata = {
  title: "Thank you — CEH v13 enquiry received | Macksofy",
  description: "Your CEH v13 training enquiry has been received. A counsellor will call you shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg text-fg">
      {/* Fires the `generate_lead` conversion exactly once, on load. */}
      <ConversionPing />

      <div className="spotlight-cyan pointer-events-none absolute inset-0 opacity-50" />
      <Container size="narrow" className="relative py-20 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/40">
          <CheckCircle2 className="size-9 text-emerald-400" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tighter sm:text-4xl">
          Thank you — your enquiry is in.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-fg-muted">
          A CEH v13 counsellor will call you back within a few business hours with fees, the next
          batch dates and EMI options. Prefer to talk now?
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href={`tel:${SITE.phone}`} size="lg">
            <Phone className="size-4" /> {SITE.phoneDisplay}
          </LinkButton>
          <LinkButton href={WHATSAPP} variant="secondary" size="lg" target="_blank" rel="noopener">
            <MessageCircle className="size-4" /> WhatsApp us
          </LinkButton>
        </div>

        <p className="mt-10 text-sm text-fg-faint">
          <Link href="/training/ceh" className="underline hover:text-fg-muted">
            View the full CEH v13 course details
          </Link>
        </p>
      </Container>
    </div>
  );
}
