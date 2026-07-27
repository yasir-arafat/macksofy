import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CertInHero } from "@/components/visuals/CertInBadge";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";
import { AUDITS } from "@/content/audits";

// Curated deep-links surfaced from the homepage into the /audit subtree.
// The homepage is the site's most-crawled page; before this the section
// only linked the CERT-In authority page + the /audit hub, so Googlebot
// had no direct homepage path to the individual framework pages (a factor
// in their "Discovered – currently not indexed" status). Slugs are matched
// against AUDITS so a rename silently drops rather than 404s.
const HOME_AUDIT_SLUGS = [
  "cert-in-empanelled-audit",
  "iso-27001",
  "soc-2",
  "rbi-csf",
  "sebi-cscrf",
  "pci-dss",
  "dpdp-act",
  "hipaa",
  "gdpr",
  "nist-csf",
  "uae-pdpl",
  "sama-csf",
];

export function CertInSection() {
  const homeAudits = HOME_AUDIT_SLUGS.map((slug) =>
    AUDITS.find((a) => a.slug === slug)
  ).filter((a): a is (typeof AUDITS)[number] => Boolean(a));

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 spotlight-cyan opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 items-center mb-16">
          <FadeIn className="lg:col-span-7">
            <Eyebrow>The Authority</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-balance leading-[0.95]">
              The audit your regulator
              <br />
              will accept on the{" "}
              <span className="gradient-text">first read.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-fg-muted text-pretty">
              Macksofy is empanelled by the Indian Computer Emergency Response Team
              (CERT-In) under the Ministry of Electronics and Information Technology.
              Our reports are accepted by SEBI, RBI, UIDAI, IRDAI and every major
              Indian regulator without rework.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/audit/cert-in-empanelled-audit"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-6 h-12 font-semibold text-white shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)] transition-shadow"
              >
                <FileCheck2 className="size-4" />
                See our CERT-In authority page
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-5 text-sm text-fg-muted">
              Want the full picture?{" "}
              <Link
                href="/best-cybersecurity-company"
                className="font-semibold text-neon-cyan hover:text-fg transition-colors"
              >
                Why Macksofy is rated among the best cybersecurity companies in Mumbai &amp; India
                <ArrowRight className="ml-1 inline size-3.5" />
              </Link>
            </p>
          </FadeIn>
          <FadeIn className="lg:col-span-5" delay={0.15}>
            <CertInHero />
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <Eyebrow color="purple">Frameworks we cover</Eyebrow>
          <p className="mt-3 mb-8 max-w-3xl text-lg text-fg-muted">
            Macksofy maps controls across Indian and global frameworks in a single
            engagement — saving you months of redundant audit cycles.
          </p>
          <ComplianceMatrix />
        </FadeIn>

        {/* Deep links into the /audit subtree — crawlable framework chips */}
        <FadeIn delay={0.15}>
          <div className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <Eyebrow color="amber">Popular frameworks</Eyebrow>
              <Link
                href="/audit"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan hover:text-fg transition-colors"
              >
                All {AUDITS.length} audit &amp; compliance frameworks
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {homeAudits.map((a) => (
                <Link
                  key={a.slug}
                  href={`/audit/${a.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full glass px-4 h-9 text-sm font-medium text-fg-muted hover:text-neon-cyan ring-1 ring-transparent hover:ring-neon-cyan/40 transition-[color,background-color,border-color,box-shadow]"
                >
                  {a.shortTitle}
                  <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neon-cyan" />
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
