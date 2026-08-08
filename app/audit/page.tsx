import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Boxes,
  ScrollText,
  Cog,
  AlertOctagon,
  LifeBuoy,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInHero } from "@/components/visuals/CertInBadge";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { PillarRadial } from "@/components/visuals/audit/PillarRadial";
import { LeadCapture } from "@/components/home/LeadCapture";
import { MetroCoverage } from "@/components/home/MetroCoverage";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  AUDITS,
  AUDIT_CATEGORIES,
  auditsByCategory,
  getAuditBySlug,
  type AuditCategory,
} from "@/content/audits";
import { metroKeywords } from "@/lib/site";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";

export const metadata = buildMetadata({
  title:
    "Audit & Compliance in Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Pune — CERT-In · RBI · SEBI · ISO · SOC 2",
  description: `${AUDITS.length} audit and compliance services covering CERT-In, RBI, SEBI, IRDAI and DPDP, plus ISO 27001, SOC 2, NIST CSF, PCI-DSS, HIPAA and GDPR.`,
  path: "/audit",
  keywords: [
    "CERT-In audit India",
    "CERT-In empanelled auditor Mumbai",
    "RBI audit India",
    "SEBI CSCRF audit India",
    "ISO 27001 consulting India",
    "ISO 27017 27018 27701 42001 India",
    "SOC 2 India",
    "NIST CSF audit India",
    "PCI-DSS v4.0 India",
    "HIPAA HITRUST India",
    "GDPR DPDP audit India",
    "compliance audit UAE",
    ...metroKeywords("CERT-In audit"),
    ...metroKeywords("ISO 27001 consultant"),
    ...metroKeywords("SOC 2 consultant"),
    ...metroKeywords("compliance audit"),
  ],
});

const CATEGORY_META: Record<
  AuditCategory,
  {
    eyebrow: string;
    title: string;
    description: string;
    accent: "cyan" | "purple" | "amber" | "green";
  }
> = {
  Foundational: {
    eyebrow: "Start here",
    title: "Foundational engagements",
    description:
      "Cross-cutting audits that anchor every compliance program — comprehensive maturity reviews, multi-framework consolidations and risk quantification.",
    accent: "cyan",
  },
  "Indian Regulatory": {
    eyebrow: "RBI · SEBI · IRDAI · CERT-In · DPDP",
    title: "Indian regulatory audits",
    description:
      "Regulator-format audits accepted by RBI, SEBI, IRDAI, UIDAI and CERT-In on first read. CERT-In empanelment letters supplied with every engagement.",
    accent: "amber",
  },
  "GCC Regulatory": {
    eyebrow: "UAE · KSA · Dubai · Abu Dhabi · DESC · NESA",
    title: "UAE & GCC regulatory audits",
    description:
      "UAE Federal PDPL, NESA / UAE IA Standards, ADHICS, DESC ISR, SAMA CSF, CBUAE banking cyber and NCA ECC-2 — delivered with the same audit rigour Macksofy applies to RBI and SEBI work.",
    accent: "cyan",
  },
  "International Standard": {
    eyebrow: "ISO · SOC 2 · NIST",
    title: "International standards",
    description:
      "ISO/IEC 27001, 27017, 27018, 27701, 42001, SOC 2 Type 1+2 and NIST CSF 2.0 — implemented by ISO Lead Auditor / AI Auditor / SOC 2 readiness teams.",
    accent: "purple",
  },
  "Industry & Privacy": {
    eyebrow: "PCI · HIPAA · GDPR",
    title: "Industry & privacy",
    description:
      "Cards (PCI-DSS v4.0), healthcare (HIPAA + HITRUST) and EU privacy (GDPR + ISO 27701). Cross-jurisdiction programs that share evidence across regimes.",
    accent: "green",
  },
};

const ACCENT_DOT: Record<"cyan" | "purple" | "amber" | "green", string> = {
  cyan: "bg-neon-cyan",
  purple: "bg-neon-purple",
  amber: "bg-amber-300",
  green: "bg-emerald-400",
};

const ACCENT_TEXT: Record<"cyan" | "purple" | "amber" | "green", string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  amber: "text-amber-300",
  green: "text-emerald-300",
};

const PILLAR_VISUAL: Record<string, { icon: LucideIcon; tint: string }> = {
  "Asset & data inventory": { icon: Boxes, tint: "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10" },
  "Governance & policy": { icon: ScrollText, tint: "text-violet-300 ring-violet-400/40 bg-violet-400/10" },
  "Technical control posture": { icon: Cog, tint: "text-amber-300 ring-amber-400/40 bg-amber-400/10" },
  "Threat & vulnerability mgmt": { icon: AlertOctagon, tint: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10" },
  "Incident & response readiness": { icon: LifeBuoy, tint: "text-rose-300 ring-rose-400/40 bg-rose-400/10" },
  "Maturity roadmap": { icon: TrendingUp, tint: "text-sky-300 ring-sky-400/40 bg-sky-400/10" },
};

export default function AuditPage() {
  const cyberAudit = getAuditBySlug("cybersecurity-audit");
  const cyberPillars = cyberAudit?.pillars ?? [];

  const sa = getShortAnswer("hub:audit");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Audit", url: "/audit" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: AUDITS.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.macksofy.com/audit/${a.slug}`,
              name: a.title,
            })),
          },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <Container className="relative pt-12 pb-16 sm:pt-16">
          <Breadcrumbs items={[{ name: "Audit", href: "/audit" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>The Authority · CERT-In Empanelled</Eyebrow>
              <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
                Audits your regulator{" "}
                <span className="gradient-text">accepts on the first read.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-fg-muted text-pretty">
                Macksofy is empanelled by the Indian Computer Emergency Response Team
                (CERT-In) under MeitY. Our reports satisfy RBI, SEBI, IRDAI, UIDAI,
                payment system operators and global certification bodies — across
                {" "}<strong className="text-fg">{AUDITS.length} compliance frameworks</strong>.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#catalog"
                  className="inline-flex items-center gap-2 rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-5 h-11 text-sm font-bold text-neon-cyan hover:bg-neon-cyan/25 transition-colors"
                >
                  Browse all {AUDITS.length} audits
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact?interest=Cybersecurity%20Audit"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-2/40 px-5 h-11 text-sm font-bold text-fg-muted hover:text-fg hover:border-neon-cyan/40 transition-colors"
                >
                  <Search className="size-4" /> Find my framework
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <CertInHero />
            </div>
          </div>
        </Container>
      </section>

      {/* SHORT ANSWER (AEO/GEO) */}
      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      {/* CATEGORY OVERVIEW STRIP */}
      <Container className="pb-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIT_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const items = auditsByCategory(cat);
            return (
              <Link
                key={cat}
                href={`#cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                className="group rounded-2xl glass p-5 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
              >
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-semibold">
                  <span
                    className={`size-1.5 rounded-full animate-pulse ${ACCENT_DOT[meta.accent]}`}
                  />
                  <span className={ACCENT_TEXT[meta.accent]}>{cat}</span>
                </div>
                <div className="mt-3 font-display text-base font-bold text-fg group-hover:text-neon-cyan transition-colors">
                  {items.length}{" "}
                  <span className="text-fg-muted font-medium">engagements</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {items.slice(0, 4).map((a) => (
                    <span
                      key={a.slug}
                      className="text-[10px] font-mono uppercase tracking-wider text-fg-faint"
                    >
                      {a.shortTitle}
                    </span>
                  ))}
                  {items.length > 4 && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-fg-faint">
                      +{items.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* CYBERSECURITY-AUDIT PILLARS — foundational engagement showcase */}
      {cyberPillars.length > 0 && (
        <section
          id="cybersecurity-audit-pillars"
          className="py-20 bg-bg-1 border-y border-line scroll-mt-28"
        >
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
                <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
                Start here · The foundational audit
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-balance leading-[1.05]">
                Six pillars. <span className="gradient-text">One full picture.</span>
              </h2>
              <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                Every regulator-specific audit on this page sits on top of the
                same scaffold — a generalist Macksofy cybersecurity audit. These
                are the six workstreams it always covers, regardless of which
                regulator or certification body you ultimately answer to.
              </p>
            </div>

            <div className="mt-12 rounded-2xl bg-bg-2/30 ring-1 ring-line p-6 sm:p-8">
              <PillarRadial pillars={cyberPillars} />
            </div>

            <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cyberPillars.map((p, i) => {
                const visual = PILLAR_VISUAL[p.title];
                const Icon = visual?.icon ?? ShieldCheck;
                const tint =
                  visual?.tint ??
                  "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10";
                return (
                  <StaggerItem key={p.title}>
                    <Link
                      href="/audit/cybersecurity-audit"
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-5 ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid size-11 place-items-center rounded-xl ring-1 ${tint}`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                          Pillar {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold text-fg group-hover:text-neon-cyan leading-tight">
                        {p.title}
                      </h3>
                      {p.blurb && (
                        <p className="mt-2 text-[13px] text-fg-muted leading-relaxed line-clamp-2">
                          {p.blurb}
                        </p>
                      )}
                      <ul className="mt-3 space-y-1 text-[12px] text-fg-muted/90">
                        {p.points.slice(0, 3).map((pt) => (
                          <li key={pt} className="flex gap-1.5">
                            <span className="text-neon-cyan/70 mt-0.5 shrink-0">▸</span>
                            <span className="line-clamp-1">{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan">
                        Read pillar detail <ArrowRight className="size-3.5" />
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            <FadeIn>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-bg-2/40 ring-1 ring-line p-5 sm:p-6">
                <div>
                  <div className="font-display text-base font-bold text-fg">
                    Want the full cybersecurity audit?
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">
                    Deep-dive page with engagement timeline, deliverables, case
                    studies and the radial breakdown above.
                  </p>
                </div>
                <Link
                  href="/audit/cybersecurity-audit"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-5 h-10 text-sm font-bold text-neon-cyan hover:bg-neon-cyan/25 transition-colors"
                >
                  View cybersecurity audit
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* CATALOG — by category */}
      <section id="catalog" className="py-12 sm:py-16 scroll-mt-28">
        <Container>
          {AUDIT_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const items = auditsByCategory(cat);
            if (items.length === 0) return null;
            const id = `cat-${cat.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <section
                key={cat}
                id={id}
                className="mb-20 last:mb-0 scroll-mt-28"
              >
                <FadeIn>
                  <div className="flex items-end justify-between gap-6 flex-wrap">
                    <div className="max-w-2xl">
                      <span
                        className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-semibold ${ACCENT_TEXT[meta.accent]}`}
                      >
                        <span
                          className={`size-1.5 rounded-full animate-pulse ${ACCENT_DOT[meta.accent]}`}
                        />
                        {meta.eyebrow}
                      </span>
                      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-fg text-balance leading-[1.1]">
                        {meta.title}
                      </h2>
                      <p className="mt-3 text-fg-muted text-pretty">
                        {meta.description}
                      </p>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                      {String(items.length).padStart(2, "0")} engagements
                    </div>
                  </div>
                </FadeIn>

                <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => {
                    const Icon = a.icon;
                    return (
                      <StaggerItem key={a.slug}>
                        <Link
                          href={`/audit/${a.slug}`}
                          className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
                        >
                          {a.authority && (
                            <div className="absolute top-3 right-3">
                              <Badge variant="cert">
                                <ShieldCheck className="size-3" />
                                Authority
                              </Badge>
                            </div>
                          )}
                          <div
                            className={`grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-cyan/30 ${ACCENT_TEXT[meta.accent]}`}
                          >
                            <Icon className="size-6" />
                          </div>
                          <div className="mt-5">
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
                              {a.hero.eyebrow}
                            </div>
                            <h3 className="mt-1.5 font-display text-lg font-bold text-fg group-hover:text-neon-cyan leading-tight">
                              {a.title}
                            </h3>
                          </div>
                          <p className="mt-3 text-sm text-fg-muted line-clamp-3 leading-relaxed">
                            {a.hero.tagline}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1">
                            {a.frameworks.slice(0, 3).map((f) => (
                              <span
                                key={f}
                                className="rounded-full bg-white/[0.04] ring-1 ring-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fg-dim"
                              >
                                {f.split("(")[0].split("·")[0].split("—")[0].trim().slice(0, 28)}
                              </span>
                            ))}
                          </div>
                          <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                            Read engagement <ArrowRight className="size-4" />
                          </span>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </StaggerChildren>
              </section>
            );
          })}
        </Container>
      </section>

      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Frameworks at a glance</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-balance leading-[1.05]">
              One engagement,{" "}
              <span className="gradient-text">many regulations.</span>
            </h2>
            <p className="mt-4 text-fg-muted">
              Most of our clients are dual-regulated — RBI + PCI for fintechs,
              IRDAI + DPDP for insurers, SOC 2 + ISO 27001 for SaaS, GDPR + DPDP
              for multinationals. We map controls across regimes once and produce
              evidence for all of them.
            </p>
          </div>
          <div className="mt-12">
            <ComplianceMatrix />
          </div>
        </Container>
      </section>

      <MetroCoverage
        title={
          <>
            Regulator-format audits across{" "}
            <span className="gradient-text">India + UAE.</span>
          </>
        }
        description="Macksofy CERT-In empanelled auditors travel from Mumbai BKC to RBI-regulated banks, SEBI-regulated brokers, IRDAI-regulated insurers and government bodies in every Indian metro."
      />

      <LeadCapture />
    </>
  );
}
