import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Building2,
  Globe2,
  MapPin,
  ArrowRight,
  BadgeCheck,
  Landmark,
  Target,
  Lock,
  Search,
  Crosshair,
  Activity,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInHero } from "@/components/visuals/CertInBadge";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { CaseStudyProof } from "@/components/case-studies/CaseStudyProof";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  breadcrumbSchema,
  faqSchema,
  SERVED_METROS_LIST,
} from "@/lib/schema";
import { buildMetadata, HQ_GEO } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PAGE_PATH = "/best-cybersecurity-company";
const LAST_REVIEWED = "2026-09-30";
const PAGE_DESCRIPTION =
  "Evaluate a CERT-In empanelled cybersecurity partner for VAPT, red teaming, managed SOC and regulatory audits using documented methods and engagement evidence.";

export const metadata = buildMetadata({
  title: "Why Choose Us for Cybersecurity Services",
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  geo: HQ_GEO,
  ogEyebrow: "EVIDENCE-LED SECURITY",
  ogTitle: "Why Choose Our Cybersecurity Team",
  ogKind: "macksofy",
  keywords: [
    "why choose a cybersecurity partner",
    "CERT-In empanelled security partner",
    "cybersecurity consulting partner India",
    "security assessment team Mumbai",
    "enterprise VAPT partner India",
    "regulatory cybersecurity audit partner",
  ],
});

// Verifiable buyer criteria, not self-awarded rankings.
const PILLARS = [
  {
    icon: FileCheck2,
    title: "Verify the designation",
    body:
      "Check the exact contracting entity on CERT-In's official list before procurement. The government directory, not a vendor badge, is the authoritative source.",
  },
  {
    icon: Building2,
    title: "Confirm who delivers",
    body:
      "Define the named delivery roles, manual testing depth, escalation path and reporting owner in the scope—not after testing starts.",
  },
  {
    icon: Target,
    title: "Inspect the method",
    body:
      "Match each asset type to a recognised testing guide, then require manual validation of business logic and authorisation boundaries beyond scanner output.",
  },
  {
    icon: BadgeCheck,
    title: "Review the deliverable",
    body:
      "Agree severity scoring, evidence quality, business context, remediation guidance, executive reporting and the closure-retest process before kickoff.",
  },
  {
    icon: Globe2,
    title: "Fit the operating context",
    body:
      "Map the work to the regulations, location and evidence expectations that actually apply instead of buying a generic compliance checklist.",
  },
  {
    icon: ShieldCheck,
    title: "Demand engagement proof",
    body:
      "Use detailed, anonymised case records to assess scope, approach, findings and remediation outcomes rather than relying on uncheckable superlatives.",
  },
] as const;

// ── Capabilities ─────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: Crosshair,
    title: "VAPT & Penetration Testing",
    body: "Network, web, mobile, API and cloud testing mapped to OWASP, PTES and NIST.",
    href: "/services/vapt",
  },
  {
    icon: Target,
    title: "Red Teaming",
    body: "Adversary-emulation aligned to MITRE ATT&CK that tests detection, not just controls.",
    href: "/services/red-teaming",
  },
  {
    icon: Activity,
    title: "Managed SOC",
    body: "24×7 monitoring, detection engineering and threat hunting on modern SIEM/XDR.",
    href: "/services/managed-soc",
  },
  {
    icon: Landmark,
    title: "CERT-In & Compliance Audits",
    body: "CERT-In, RBI CSF, SEBI CSCRF, IRDAI, ISO 27001, PCI DSS, DPDP Act and SOC 2.",
    href: "/audit/cert-in-empanelled-audit",
  },
  {
    icon: Search,
    title: "DFIR & Threat Intel",
    body: "Incident response, digital forensics, malware analysis and threat intelligence.",
    href: "/services/digital-forensics-incident-response",
  },
  {
    icon: Lock,
    title: "Cloud & App Security",
    body: "Cloud security reviews, IAM hardening and secure-SDLC for AWS, Azure and GCP.",
    href: "/services/cloud-security",
  },
] as const;

// ── Stats ────────────────────────────────────────────────────────────────
const STATS = [
  { value: `${SITE.stats.yearsInBusiness}+`, label: "Years securing businesses" },
  { value: `${SITE.stats.countriesServed}`, label: "Countries served" },
] as const;

const FRAMEWORKS = [
  "CERT-In",
  "RBI",
  "SEBI",
  "IRDAI",
  "UIDAI",
  "NPCI",
  "ISO 27001",
  "PCI DSS",
  "DPDP Act",
  "SOC 2",
];

// ── FAQ (also emitted as FAQPage schema) ─────────────────────────────────
const FAQS = [
  {
    q: "Why should an enterprise consider this cybersecurity team?",
    a: "Buyers can evaluate the team against verifiable criteria: current CERT-In empanelment, documented testing methods, defined reporting and retest deliverables, relevant service depth, and detailed anonymised case studies. The right choice still depends on the buyer's scope, sector, timeline and evidence requirements.",
  },
  {
    q: "How should CERT-In empanelment be verified?",
    a: "Use CERT-In's official empanelment directory and match the legal entity shown there to the entity named in the proposal and contract. Empanelment is an important eligibility and competency signal, but buyers should still assess scope, assigned personnel, methodology, report format and retesting terms.",
  },
  {
    q: "Where is Macksofy located?",
    a: `Macksofy is headquartered at ${SITE.hq.street}, ${SITE.hq.locality}, ${SITE.hq.city} ${SITE.hq.postalCode}, with service delivery across all major Indian metros — ${SERVED_METROS_LIST.join(", ")} — and the UAE/GCC region.`,
  },
  {
    q: "What cybersecurity services does Macksofy provide?",
    a: "The services covered here include VAPT and penetration testing for network, web, mobile, API and cloud assets; red teaming; managed SOC and detection engineering; DFIR and threat intelligence; cloud and application security; and regulatory or standards-aligned security audits.",
  },
  {
    q: "Which industries does Macksofy work with?",
    a: "The published service and case-study library covers BFSI and fintech, healthcare, SaaS and technology, manufacturing and OT, insurance, energy and utilities, and government or public-sector environments.",
  },
  {
    q: "Does Macksofy serve clients outside Mumbai?",
    a: `Yes. The team is headquartered in Mumbai and publishes coverage for major Indian metros (${SERVED_METROS_LIST.join(", ")}), plus UAE and GCC engagements. Delivery mode and on-site requirements are confirmed during scoping.`,
  },
];

const WEB_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE.url}${PAGE_PATH}#webpage`,
  url: `${SITE.url}${PAGE_PATH}`,
  name: "Why Choose Us for Cybersecurity Services",
  description: PAGE_DESCRIPTION,
  isPartOf: { "@id": `${SITE.url}#website` },
  mainEntity: { "@id": `${SITE.url}#organization` },
  dateModified: LAST_REVIEWED,
  inLanguage: "en-IN",
};

export default function BestCybersecurityCompanyPage() {
  return (
    <>
      {/* Organization + LocalBusiness are already emitted site-wide in the root
          layout (same @id); re-declaring them here produced duplicate #organization
          / #localbusiness graph nodes. Keep only the page-specific schema. */}
      <JsonLd
        data={[
          WEB_PAGE_SCHEMA,
          breadcrumbSchema([
            { name: "Why Choose Us for Cybersecurity Services", url: PAGE_PATH },
          ]),
          faqSchema(FAQS),
        ]}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 spotlight-cyan opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-25" />
        <GlowOrb className="-top-32 right-0 opacity-50" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <FadeIn className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="cert">
                  <FileCheck2 className="size-3.5" /> CERT-In Empanelled
                </Badge>
                <Badge variant="cyan">
                  <MapPin className="size-3.5" /> Mumbai HQ
                </Badge>
                <Badge variant="purple">Since {SITE.founded}</Badge>
              </div>
              <h1 className="mt-6 font-display text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-balance leading-[0.95]">
                Why enterprises choose our{" "}
                <span className="gradient-text">cybersecurity team</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-fg-muted text-pretty">
                Evaluate a <strong className="text-fg">CERT-In empanelled</strong> security
                partner using evidence you can inspect: official status, defined methodology,
                clear deliverables, relevant service depth and documented engagement outcomes.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-faint">
                <time dateTime={LAST_REVIEWED}>Last reviewed 30 September 2026</time>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact" size="lg" withArrow>
                  Talk to a security expert
                </LinkButton>
                <LinkButton href="/audit/cert-in-empanelled-audit" variant="secondary" size="lg">
                  Review audit scope
                </LinkButton>
              </div>
              <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl font-black gradient-text">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-fg-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
            <FadeIn className="lg:col-span-5" delay={0.15}>
              <CertInHero />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── SHORT ANSWER (AEO / AI Overview capture) ─────────────────── */}
      <section className="pb-6">
        <Container>
          <AnswerBox
            q="What should an enterprise verify before choosing a cybersecurity provider?"
            a="Verify any required government or industry designation at the official source; inspect the proposed methodology, assigned roles and sample deliverable; confirm remediation and retest terms; and review evidence from comparable engagements. Price and badges alone do not establish delivery fit."
          />
          <p className="mt-5 text-sm text-fg-muted">
            Comparing the wider market? Use the{" "}
            <Link
              href="/blog/cyber-security-companies-in-mumbai-india-2026"
              className="font-semibold text-neon-cyan underline-offset-4 hover:underline"
            >
              cybersecurity company comparison and buyer checklist
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* ── BUYER CRITERIA ────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <Container className="relative">
          <SectionTitle
            eyebrow="Why Macksofy"
            title={
              <>
                Evaluate the team on{" "}
                <span className="gradient-text">evidence, not rankings</span>
              </>
            }
            description="These are the checks procurement and security leaders can complete before they approve a scope or sign a contract."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05}>
                <GlassCard hover className="h-full p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-neon-cyan/10 ring-1 ring-neon-cyan/30">
                    <p.icon className="size-5 text-neon-cyan" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CERT-IN AUTHORITY ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 spotlight-cyan opacity-40" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <FadeIn className="lg:col-span-6">
              <Eyebrow>Official verification</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tighter sm:text-4xl lg:text-5xl text-balance leading-[1.0]">
                Check CERT-In status at the{" "}
                <span className="gradient-text">authoritative source</span>
              </h2>
              <p className="mt-6 text-lg text-fg-muted text-pretty">
                CERT-In publishes the official list of empanelled information security auditing
                organisations. Buyers should verify the legal entity there, then confirm that the
                proposed scope and deliverables meet the requirements of the applicable regulator,
                standard or contract. Empanelment does not replace engagement-level due diligence.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Match the legal entity in the proposal to the official directory",
                  "Write the applicable framework and report format into the scope",
                  "Confirm assigned roles, evidence handling and closure-retest terms",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-neon-cyan" />
                    <span className="text-sm text-fg-muted">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {FRAMEWORKS.map((r) => (
                  <Badge key={r} variant="outline">
                    {r}
                  </Badge>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton
                  href="https://www.cert-in.org.in/certEmpanelment.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  withArrow
                >
                  Verify on CERT-In
                </LinkButton>
                <LinkButton href="/audit/cert-in-empanelled-audit" withArrow>
                  Review the audit service
                </LinkButton>
              </div>
            </FadeIn>
            <FadeIn className="lg:col-span-6" delay={0.15}>
              <Eyebrow color="purple">Frameworks we cover</Eyebrow>
              <p className="mt-3 mb-6 text-fg-muted">
                Scope mapping is selected according to the buyer's actual sector and obligations.
              </p>
              <ComplianceMatrix />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <Container className="relative">
          <SectionTitle
            eyebrow="What we do"
            eyebrowColor="purple"
            title={
              <>
                Full-spectrum security, from offence to{" "}
                <span className="gradient-text">compliance</span>
              </>
            }
            description="A single accountable partner across the entire defensive lifecycle — test, monitor, respond and prove compliance."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.05}>
                <Link href={c.href} className="group block h-full">
                  <GlassCard hover className="h-full p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-neon-purple/10 ring-1 ring-neon-purple/30">
                        <c.icon className="size-5 text-neon-purple" />
                      </div>
                      <ArrowRight className="size-4 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-neon-cyan" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CaseStudyProof
        caseStudySlugs={[
          "listed-fintech-bola-jwt-pentest",
          "gcc-telecom-mobile-app-takeover",
          "listed-bank-red-team-edr-bypass",
        ]}
        eyebrow="Documented engagement evidence"
        heading="Inspect the work behind the claims."
        description="These anonymised records show the scope, approach, findings and reported outcomes for penetration testing, mobile security and red-team engagements."
      />

      {/* ── COVERAGE ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Coverage</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tighter sm:text-4xl text-balance">
              Mumbai roots, nationwide &amp;{" "}
              <span className="gradient-text">GCC reach</span>
            </h2>
            <p className="mt-5 text-lg text-fg-muted text-pretty">
              The published delivery footprint covers major Indian metros plus the UAE and wider
              GCC. On-site availability, data-location constraints and timelines are confirmed
              during scoping.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {SERVED_METROS_LIST.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg-muted"
              >
                <MapPin className="size-3.5 text-neon-cyan" />
                {m}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-4 py-2 text-sm font-medium text-neon-purple">
              <Globe2 className="size-3.5" />
              UAE &amp; GCC
            </span>
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/locations" variant="secondary" withArrow>
              See all locations
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <Container size="narrow" className="relative">
          <SectionTitle
            align="center"
            eyebrow="FAQ"
            eyebrowColor="purple"
            title="Questions buyers ask before choosing us"
            className="mx-auto"
          />
          <div className="mt-12">
            <FAQAccordion faqs={FAQS} />
          </div>
        </Container>
      </section>

      {/* ── LEAD CAPTURE ─────────────────────────────────────────────── */}
      <LeadCapture focus="services" />
    </>
  );
}
