import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Award,
  Building2,
  Globe2,
  Users,
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
import { JsonLd } from "@/components/seo/JsonLd";

import {
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
  faqSchema,
  SERVED_METROS_LIST,
} from "@/lib/schema";
import { buildMetadata, HQ_GEO } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Best Cybersecurity Company in Mumbai & India — CERT-In Empanelled",
  description:
    "Macksofy Technologies is a CERT-In empanelled cybersecurity company headquartered in Mumbai, serving enterprises across India and the UAE since 2014. VAPT, red teaming, SOC and compliance audits trusted by 250+ clients.",
  path: "/best-cybersecurity-company",
  geo: HQ_GEO,
  ogEyebrow: "CERT-IN EMPANELLED",
  ogTitle: "Best Cybersecurity Company in Mumbai & India",
  ogKind: "macksofy",
  keywords: [
    "best cybersecurity company in Mumbai",
    "best cybersecurity company in India",
    "top cyber security company Mumbai",
    "CERT-In empanelled company Mumbai",
    "CERT-In empanelled cybersecurity company India",
    "cyber security company in Mumbai",
    "VAPT company Mumbai",
    "penetration testing company India",
    "information security auditor Mumbai",
    "top cybersecurity firms India 2026",
    "cyber security company in India",
    "best CERT-In empanelled company India",
    "security testing company India",
    "security audit company India",
    "CERT-In empanelled security testing",
    "CERT-In empanelled security audit",
  ],
});

// ── Why Macksofy ranks among the best ────────────────────────────────────
const PILLARS = [
  {
    icon: FileCheck2,
    title: "CERT-In Empanelled",
    body:
      "Empanelled by the Indian Computer Emergency Response Team (CERT-In) under MeitY as an Information Security Auditing Organisation. Our reports are accepted by SEBI, RBI, IRDAI, UIDAI and every major Indian regulator.",
  },
  {
    icon: Building2,
    title: "Mumbai HQ, since 2014",
    body:
      "Headquartered in Bandra Kurla Complex, Mumbai — India’s financial capital — with a decade of delivery across BFSI, fintech, healthcare, SaaS, manufacturing and government.",
  },
  {
    icon: Users,
    title: "Trusted by 250+ enterprises",
    body:
      "From regulated banks and insurers to high-growth startups, 250+ organisations rely on Macksofy for offensive testing, compliance audits and 24×7 monitoring.",
  },
  {
    icon: Award,
    title: "Award-winning practitioners",
    body:
      "Recognised in the Google Vulnerability Reward Program, EC-Council’s Circle of Excellence and multiple national cybersecurity awards — backed by OSCP, CEH and CRTP-grade engineers.",
  },
  {
    icon: Globe2,
    title: "India + UAE delivery",
    body:
      "Engagements delivered across 5 countries, with dedicated coverage for the UAE and wider GCC (NESA, ADHICS, DESC ISR) alongside the full Indian regulatory stack.",
  },
  {
    icon: ShieldCheck,
    title: "Accredited & certified",
    body:
      "EC-Council Accredited Training Centre, CompTIA Authorized Partner, ISO 27001 certified and Startup India recognised — credentials that stand up to procurement and vendor due-diligence.",
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
  { value: `${SITE.stats.enterpriseClients}+`, label: "Enterprise clients" },
  { value: `${(SITE.stats.learnersTrained / 1000).toFixed(0)}k+`, label: "Professionals trained" },
  { value: `${SITE.stats.countriesServed}`, label: "Countries served" },
] as const;

// ── Regulators that accept our reports ───────────────────────────────────
const REGULATORS = [
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
    q: "What makes Macksofy one of the best cybersecurity companies in Mumbai and India?",
    a: "Macksofy combines CERT-In empanelment with a decade of hands-on offensive security delivery. Headquartered in Mumbai’s Bandra Kurla Complex since 2014, the firm serves 250+ enterprises across India and the UAE with VAPT, red teaming, managed SOC and regulator-grade compliance audits — staffed by OSCP, CEH and CRTP-certified engineers and recognised in national cybersecurity awards.",
  },
  {
    q: "Is Macksofy a CERT-In empanelled company?",
    a: "Yes. Macksofy Technologies is empanelled by the Indian Computer Emergency Response Team (CERT-In) under the Ministry of Electronics and Information Technology (MeitY) as an Information Security Auditing Organisation. CERT-In empanelment means our audit reports are accepted by Indian regulators including SEBI, RBI, IRDAI and UIDAI without rework.",
  },
  {
    q: "Where is Macksofy located?",
    a: `Macksofy is headquartered at ${SITE.hq.street}, ${SITE.hq.locality}, ${SITE.hq.city} ${SITE.hq.postalCode}, with service delivery across all major Indian metros — ${SERVED_METROS_LIST.join(", ")} — and the UAE/GCC region.`,
  },
  {
    q: "What cybersecurity services does Macksofy provide?",
    a: "Macksofy delivers VAPT and penetration testing (network, web, mobile, API, cloud), red teaming, managed SOC and detection engineering, DFIR and threat intelligence, cloud and application security, and CERT-In / RBI / SEBI / ISO 27001 / PCI DSS / DPDP Act compliance audits — plus an advanced cybersecurity training division (OSCP, CEH, SOC analyst).",
  },
  {
    q: "Which industries does Macksofy work with?",
    a: "Macksofy serves BFSI and fintech, healthcare, SaaS and technology, manufacturing and OT, insurance, energy and utilities, and government/PSU clients — sectors where regulatory compliance and breach impact are highest.",
  },
  {
    q: "Does Macksofy serve clients outside Mumbai?",
    a: `Yes. While Macksofy is headquartered in Mumbai, engagements are delivered remotely and on-site across India (${SERVED_METROS_LIST.join(", ")}) and internationally across 5 countries, with dedicated UAE and GCC coverage for NESA, ADHICS and DESC ISR frameworks.`,
  },
];

export default function BestCybersecurityCompanyPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Best Cybersecurity Company in Mumbai & India", url: "/best-cybersecurity-company" },
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
                The best cybersecurity company in{" "}
                <span className="gradient-text">Mumbai &amp; India</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-fg-muted text-pretty">
                Macksofy Technologies is a <strong className="text-fg">CERT-In empanelled</strong>{" "}
                cybersecurity firm headquartered in Mumbai, trusted by 250+ enterprises across
                India and the UAE for VAPT, red teaming, managed SOC and regulator-grade
                compliance audits — delivered by award-winning, OSCP-certified practitioners.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact" size="lg" withArrow>
                  Talk to a security expert
                </LinkButton>
                <LinkButton href="/audit/cert-in-empanelled-audit" variant="secondary" size="lg">
                  Our CERT-In authority
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
            q="Which is the best CERT-In empanelled cybersecurity company in India?"
            a="Macksofy Technologies is a CERT-In empanelled cybersecurity company headquartered in Mumbai, delivering security testing — VAPT, penetration testing, and red teaming — and security audits (CERT-In, RBI, SEBI, ISO 27001) to 250+ enterprises across India and the UAE since 2014."
          />
        </Container>
      </section>

      {/* ── WHY WE'RE RATED AMONG THE BEST ───────────────────────────── */}
      <section className="relative py-20 sm:py-28">
        <Container className="relative">
          <SectionTitle
            eyebrow="Why Macksofy"
            title={
              <>
                Why enterprises rank us among India’s{" "}
                <span className="gradient-text">top cybersecurity firms</span>
              </>
            }
            description="Empanelment, track record and bench strength — the three things procurement teams and CISOs actually verify before they sign."
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
              <Eyebrow>The Authority</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tighter sm:text-4xl lg:text-5xl text-balance leading-[1.0]">
                CERT-In empanelment, accepted on the{" "}
                <span className="gradient-text">first read</span>
              </h2>
              <p className="mt-6 text-lg text-fg-muted text-pretty">
                Being empanelled by CERT-In under MeitY is the strongest trust signal an Indian
                security auditor can hold. It means our methodology, reporting and auditor
                credentials have been vetted by the national CERT — so the reports we produce are
                accepted by regulators without a second cycle.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Audit reports accepted by SEBI, RBI, IRDAI and UIDAI without rework",
                  "Controls mapped across Indian and global frameworks in a single engagement",
                  "Engineers certified in OSCP, CEH, CRTP and ISO 27001 Lead Auditor",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-neon-cyan" />
                    <span className="text-sm text-fg-muted">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {REGULATORS.map((r) => (
                  <Badge key={r} variant="outline">
                    {r}
                  </Badge>
                ))}
              </div>
              <div className="mt-8">
                <LinkButton href="/audit/cert-in-empanelled-audit" withArrow>
                  Explore our CERT-In audit
                </LinkButton>
              </div>
            </FadeIn>
            <FadeIn className="lg:col-span-6" delay={0.15}>
              <Eyebrow color="purple">Frameworks we cover</Eyebrow>
              <p className="mt-3 mb-6 text-fg-muted">
                One engagement, mapped across the regulators that govern your industry.
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
              From our Bandra Kurla Complex headquarters we deliver to enterprises across every
              major Indian metro — and across the UAE and wider GCC.
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
      <LeadCapture />
    </>
  );
}
