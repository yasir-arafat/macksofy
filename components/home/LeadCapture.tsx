import { Container } from "@/components/ui/Container";
import { ContactFormLazy } from "@/components/forms/ContactFormLazy";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { ShieldCheck, Users, Award, Globe } from "lucide-react";

const TRUST = [
  { icon: ShieldCheck, label: "CERT-In Empanelled" },
  { icon: Award, label: "EC-Council ATC · CompTIA Authorized" },
  { icon: Users, label: "Thousands of professionals trained" },
  { icon: Globe, label: "India + UAE engagements" },
];

export function LeadCapture() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 spotlight-blend opacity-60" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>Talk to us</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tighter sm:text-5xl text-balance leading-[1.05]">
              Get a fixed-price proposal in{" "}
              <span className="gradient-text">48 hours.</span>
            </h2>
            <p className="mt-5 text-fg-muted text-pretty text-lg">
              Tell us about your security need — pentest, audit, training or a wider
              engagement. A senior consultant will reply within a few business hours.
            </p>
            <div className="mt-8">
              <CertInBadge size="md" />
            </div>
            <ul className="mt-8 space-y-3">
              {TRUST.map((t) => (
                <li key={t.label} className="flex items-center gap-3 text-sm text-fg-muted">
                  <t.icon className="size-4 text-neon-cyan" />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-strong p-6 sm:p-8 glow-blend">
              <ContactFormLazy />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
