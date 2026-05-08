import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  caseStudyCollectionSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CASE_STUDIES } from "@/content/caseStudies";

export const metadata = buildMetadata({
  title:
    "Cybersecurity Case Studies — Pentest, Red Team, DFIR, Cloud · India + UAE | Macksofy",
  description:
    "Anonymised long-form case studies from Macksofy's penetration testing, red team, DFIR and cloud-security engagements across BFSI, fintech, telecom, SaaS, healthcare and manufacturing in India and the UAE.",
  path: "/case-studies",
  keywords: [
    "cybersecurity case studies India",
    "penetration testing case studies",
    "red team case study",
    "DFIR case study India",
    "BFSI security case study",
    "fintech pentest case study",
    "ransomware case study India",
    "cloud security case study Bangalore",
    "Macksofy case studies",
  ],
});

const STATS = [
  { value: "200+", label: "Engagements / yr", icon: ShieldCheck },
  { value: "11+", label: "Years operating", icon: Award },
  { value: "100%", label: "Anonymised", icon: Sparkles },
];

export default function CaseStudiesIndexPage() {
  const sectors = Array.from(new Set(CASE_STUDIES.map((c) => c.sector)));
  const engagements = Array.from(new Set(CASE_STUDIES.map((c) => c.engagement)));

  return (
    <>
      <JsonLd
        data={[
          caseStudyCollectionSchema(CASE_STUDIES),
          breadcrumbSchema([{ name: "Case Studies", url: "/case-studies" }]),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <ParticleBackground density={70} className="absolute inset-0" />
        <GlowOrb className="-top-40 -left-32" color="cyan" size={520} />
        <GlowOrb
          className="-bottom-40 -right-32"
          color="purple"
          size={520}
          intensity="soft"
        />

        <Container className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <Breadcrumbs items={[{ name: "Case Studies", href: "/case-studies" }]} />

          <div className="mt-10 max-w-4xl">
            <Eyebrow>Anonymised · Long-form · Engagement-faithful</Eyebrow>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.02]">
              Real engagements,{" "}
              <span className="gradient-text">told straight.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted text-pretty">
              Curated case studies from Macksofy&rsquo;s pentest, red team, DFIR and
              cloud-security work across India and the UAE. Every client is
              anonymised; every finding, timeline and metric is taken from the
              real engagement record.
            </p>
          </div>

          {/* Stats strip */}
          <div className="mt-12 grid gap-3 sm:grid-cols-3 max-w-3xl">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl glass p-5 ring-1 ring-white/10"
                >
                  <Icon className="size-5 text-neon-cyan" />
                  <div className="mt-3 font-display text-3xl font-black gradient-text leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-xs font-mono uppercase tracking-[0.18em] text-fg-faint">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sector + engagement quick chips */}
          <div className="mt-10 flex flex-col gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-faint mb-2">
                Sectors covered
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sectors.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-fg-muted ring-1 ring-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-faint mb-2">
                Engagement types
              </div>
              <div className="flex flex-wrap gap-1.5">
                {engagements.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-fg-muted ring-1 ring-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionTitle
            eyebrow="All case studies"
            title={
              <>
                Filter by sector,{" "}
                <span className="gradient-text">engagement or region.</span>
              </>
            }
            description="Each card opens a long-form study — challenge, approach, findings, outcome and quantified metrics."
          />
          <div className="mt-12">
            <CaseStudyGrid />
          </div>
        </Container>
      </section>

      {/* WHY ANONYMISED */}
      <section className="py-20 bg-bg-1 border-y border-white/5">
        <Container size="narrow">
          <SectionTitle
            eyebrow="A note on anonymisation"
            eyebrowColor="amber"
            title={
              <>
                We don&rsquo;t <span className="gradient-text">name names.</span>
              </>
            }
            description="Every case study on this page is anonymised by design. Sector, region, scale and engagement are accurate; the client identity is not. If you'd like a reference call with a named client in your sector, we'll arrange one privately under NDA."
          />
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-neon-cyan hover:underline"
            >
              Request a reference call
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
