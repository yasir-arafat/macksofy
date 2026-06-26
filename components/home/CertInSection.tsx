import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CertInHero } from "@/components/visuals/CertInBadge";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

export function CertInSection() {
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
      </Container>
    </section>
  );
}
