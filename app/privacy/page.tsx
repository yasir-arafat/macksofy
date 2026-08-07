import { Cookie, ShieldCheck, LineChart, Megaphone, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy & Cookie Policy — Macksofy Technologies",
  description:
    "How Macksofy Technologies collects, uses and protects your data, plus every cookie category we use and how to change your preferences.",
  path: "/privacy",
  keywords: [
    "Macksofy privacy policy",
    "Macksofy cookie policy",
    "DPDP Act privacy notice",
    "cybersecurity company privacy India",
  ],
});

const CATEGORIES = [
  {
    icon: ShieldCheck,
    title: "Strictly necessary",
    locked: true,
    desc: "Session, security, CSRF and CDN-routing cookies. Required for the site to function. Cannot be disabled.",
    examples: [
      "Session identifier on /api/* endpoints (lifetime: session)",
      "Cloudflare Turnstile token on form submissions",
      "Anti-CSRF token on contact / lead-magnet forms",
    ],
  },
  {
    icon: Settings2,
    title: "Functional",
    desc: "Remembers your preferences so the site doesn't ask you the same thing twice.",
    examples: [
      "Cookie-consent decision (this banner): localStorage · 12 months",
      "Dismissed announcement-bar state: localStorage · session",
      "Last-visited blog filter: localStorage · 30 days",
    ],
  },
  {
    icon: LineChart,
    title: "Analytics",
    desc: "Aggregated, anonymised metrics so we can see which pages break, load slowly or get ignored. We do not store IP addresses long-term.",
    examples: [
      "Page-view and route-change events (anonymised)",
      "Core Web Vitals (LCP, FID, CLS) for performance",
      "Aggregated visitor counts by country / device",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Helps us measure which content actually brought you to Macksofy. Never sold to third parties. Off by default.",
    examples: [
      "UTM-parameter capture on first landing",
      "Conversion attribution for ads we run on LinkedIn / Google",
      "Form-submission attribution back to its source page",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[breadcrumbSchema([{ name: "Privacy", url: "/privacy" }])]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={50} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <Container className="relative pt-12 pb-16">
          <Breadcrumbs items={[{ name: "Privacy", href: "/privacy" }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Privacy &amp; cookies</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
              Your data,{" "}
              <span className="gradient-text">your call.</span>
            </h1>
            <p className="mt-5 text-lg text-fg-muted text-pretty leading-relaxed">
              Macksofy Technologies runs CERT-In empanelled cybersecurity
              engagements for a living, so we hold ourselves to the same
              privacy standards we audit our clients against. This page tells
              you exactly what we collect on macksofy.com, why, and how to
              change your mind.
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-fg-faint">
              Last reviewed · 11 May 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-bg-1 border-y border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Cookie categories</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Every cookie we set, <span className="gradient-text">grouped by purpose.</span>
            </h2>
            <p className="mt-3 text-fg-muted text-pretty">
              You can change your decision any time — clear your cookies for
              this site, or open your browser&rsquo;s dev tools and remove the
              <code className="font-mono text-xs text-amber-300 mx-1">macksofy-cookie-consent</code>
              entry from <code className="font-mono text-xs text-amber-300">localStorage</code>;
              the banner will reappear on your next visit.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl glass p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="grid size-11 place-items-center rounded-xl bg-neon-cyan/10 ring-1 ring-neon-cyan/40 text-neon-cyan">
                      <Icon className="size-5" />
                    </div>
                    {c.locked && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-400">
                        Always on
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-fg leading-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                    {c.desc}
                  </p>
                  <div className="mt-4 pt-4 border-t border-line/60">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint mb-2">
                      Examples
                    </div>
                    <ul className="space-y-1.5 text-[12.5px] text-fg-muted">
                      {c.examples.map((e) => (
                        <li key={e} className="flex gap-2">
                          <span className="text-neon-cyan/70 mt-0.5 shrink-0">▸</span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What we collect</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Beyond cookies.
            </h2>
            <div className="mt-6 space-y-5 text-fg-muted leading-relaxed">
              <p>
                <strong className="text-fg">Forms.</strong> When you fill our
                contact, lead-magnet or download forms, we collect the fields
                you submit (name, email, optional company / role / message)
                plus a Cloudflare Turnstile signal to confirm you&rsquo;re not
                a bot. Submissions are routed via Resend; we never sell or
                share them.
              </p>
              <p>
                <strong className="text-fg">Server logs.</strong> Standard web
                access logs (IP, user-agent, referrer, response time) are
                retained for 30 days for security and performance monitoring,
                then deleted. We do not enrich these with third-party
                identifiers.
              </p>
              <p>
                <strong className="text-fg">DPDP, GDPR, UAE PDPL.</strong> We
                treat every visitor as if both the DPDP Act 2023 (India) and
                the GDPR (EU) apply. You can request a copy, correction or
                deletion of any personal data we hold by emailing{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-neon-cyan font-semibold hover:underline"
                >
                  {SITE.email}
                </a>
                . We respond within 30 days.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-bg-1 border-t border-line">
        <Container>
          <div className="max-w-3xl rounded-2xl glass p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-11 place-items-center rounded-xl bg-neon-cyan/10 ring-1 ring-neon-cyan/40 text-neon-cyan shrink-0">
                <Cookie className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-fg">
                  Change your mind?
                </h3>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                  Clear cookies for macksofy.com in your browser, or delete the
                  {" "}<code className="font-mono text-xs text-amber-300">macksofy-cookie-consent</code>{" "}
                  key from localStorage. The consent banner will appear again on
                  your next visit so you can pick a new combination. If anything
                  here is unclear, email{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-neon-cyan font-semibold hover:underline"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
