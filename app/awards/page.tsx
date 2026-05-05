import Image from "next/image";
import { Sparkles, Award as AwardIcon, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  AWARDS,
  AWARD_CATEGORIES,
  awardsByCategory,
  featuredAwards,
  type Award,
} from "@/content/awards";

export const metadata = buildMetadata({
  title: "Awards & Recognition — Macksofy Technologies",
  description:
    "Awards and recognitions for Macksofy Technologies — CSI Cyber Security Awards 2025, Google VRP recognition, EC-Council Circle of Excellence, Start-up of the Year and more.",
  path: "/awards",
  keywords: [
    "Macksofy awards",
    "CSI Cyber Security Award",
    "cybersecurity company awards India",
    "Google VRP India",
    "EC-Council recognition India",
  ],
});

export default function AwardsPage() {
  const featured = featuredAwards();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Awards", url: "/awards" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Macksofy Technologies — Awards & Recognition",
            numberOfItems: AWARDS.length,
            itemListElement: AWARDS.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${a.title} — ${a.body} (${a.year})`,
            })),
          },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <GlowOrb className="bottom-0 right-1/4" color="purple" size={400} />
        <Container className="relative pt-12 pb-20 sm:pt-16">
          <Breadcrumbs items={[{ name: "Awards", href: "/awards" }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Awards & Recognition · 2016–2025</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Recognized by{" "}
              <span className="gradient-text">India&rsquo;s industry, vendors and government.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty">
              From CSI&rsquo;s Cyber Security Awards 2025 (Women in Cybersecurity +
              Outstanding Training) to Google&rsquo;s Vulnerability Reward Program
              and EC-Council&rsquo;s Circle of Excellence — Macksofy is recognized
              for technical depth, instructional rigor and India-context impact.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CertInBadge size="md" />
              <span className="font-mono text-xs text-fg-faint">
                {AWARDS.length} awards · {Array.from(new Set(AWARDS.map(a => a.year))).length} years
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED SHOWCASE */}
      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Recent · 2025"
              title={
                <>
                  This year&rsquo;s flagship{" "}
                  <span className="gradient-text">recognitions.</span>
                </>
              }
              description="Two CSI Cyber Security Awards (2025) plus ongoing Google VRP recognition — anchoring our credibility with regulators, customers and the wider industry."
            />
          </FadeIn>
          <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => (
              <StaggerItem key={a.slug}>
                <FeaturedAwardCard award={a} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* ALL AWARDS BY CATEGORY */}
      <Container className="py-20 sm:py-24">
        {AWARD_CATEGORIES.map((cat, ci) => {
          const items = awardsByCategory(cat.key);
          if (items.length === 0) return null;
          return (
            <section key={cat.key} className="mb-20 last:mb-0">
              <FadeIn>
                <div className="flex flex-col items-start justify-between gap-4 mb-10 lg:flex-row lg:items-end">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan">
                      {String(ci + 1).padStart(2, "0")} / {String(AWARD_CATEGORIES.length).padStart(2, "0")} ·{" "}
                      {items.length} {items.length === 1 ? "award" : "awards"}
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                      {cat.key}
                    </h2>
                  </div>
                  <p className="max-w-md text-fg-muted text-pretty">{cat.description}</p>
                </div>
              </FadeIn>

              <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <StaggerItem key={a.slug}>
                    <AwardCard award={a} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </section>
          );
        })}
      </Container>

      <LeadCapture />
    </>
  );
}

function FeaturedAwardCard({ award }: { award: Award }) {
  return (
    <article className="group relative h-full">
      <div className="relative h-full rounded-2xl glass-strong overflow-hidden lift">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 via-neon-purple/10 to-neon-cyan/10 opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative aspect-[6/5] overflow-hidden bg-white">
          <Image
            src={award.image}
            alt={`${award.title} — ${award.body}`}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 400px"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="amber">
              <Sparkles className="size-3" /> Featured
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="cyan">
              <Calendar className="size-3" /> {award.year}
            </Badge>
          </div>
        </div>

        <div className="relative p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
            {award.body}
          </div>
          <h3 className="mt-2 font-display text-lg font-bold text-fg leading-tight text-balance">
            {award.title}
          </h3>
          {award.description && (
            <p className="mt-3 text-sm text-fg-muted leading-relaxed line-clamp-3">
              {award.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function AwardCard({ award }: { award: Award }) {
  return (
    <article className="group relative h-full">
      <div className="relative h-full flex flex-col rounded-2xl glass overflow-hidden hover:border-neon-cyan/40 transition-all hover:-translate-y-1">
        <div className="relative aspect-[6/5] overflow-hidden bg-white">
          <Image
            src={award.image}
            alt={`${award.title} — ${award.body}`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 350px"
            className="object-contain p-4"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="neutral">
              <Calendar className="size-3" /> {award.year}
            </Badge>
          </div>
          {award.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="amber">
                <Sparkles className="size-3" /> Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
            {award.body}
          </div>
          <h3 className="mt-2 font-display text-base font-bold text-fg leading-tight text-balance">
            {award.title}
          </h3>
          {award.description && (
            <p className="mt-3 text-sm text-fg-muted leading-relaxed line-clamp-3">
              {award.description}
            </p>
          )}
          <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-fg-faint">
            <AwardIcon className="size-3 text-neon-cyan" />
            {award.category}
          </div>
        </div>
      </div>
    </article>
  );
}
