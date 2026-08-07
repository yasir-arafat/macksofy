import Link from "next/link";
import {
  Newspaper,
  Calendar,
  ExternalLink,
  Video,
  Radio,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  PRESS_RELEASES,
  PRESS_OUTLETS,
  featuredPress,
  type PressRelease,
  type PressKind,
} from "@/content/press";

export const metadata = buildMetadata({
  title: "Press & Media — Macksofy Technologies",
  description:
    "Press coverage of Macksofy Technologies — Mid-day, ABP News, CNN News 18 and Entrepreneur — on cybersecurity, AI threats and digital forensics.",
  path: "/press",
  keywords: [
    "Macksofy press release",
    "Macksofy media coverage",
    "Macksofy news",
    "cybersecurity company India press",
    "Macksofy Mid-day feature",
  ],
});

const KIND_ICON: Record<PressKind, typeof Newspaper> = {
  article: Newspaper,
  video: Video,
  social: MessageSquare,
  broadcast: Radio,
};

const KIND_LABEL: Record<PressKind, string> = {
  article: "Article",
  video: "Video",
  social: "Social",
  broadcast: "Broadcast",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PressPage() {
  const featured = featuredPress();
  const sorted = [...PRESS_RELEASES].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  const oldestYear = new Date(sorted[sorted.length - 1].date).getFullYear();
  const newestYear = new Date(sorted[0].date).getFullYear();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Press", url: "/press" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Macksofy Technologies — Press & Media",
            numberOfItems: PRESS_RELEASES.length,
            itemListElement: PRESS_RELEASES.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: p.href,
              name: `${p.title} — ${p.outlet} (${formatDate(p.date)})`,
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
          <Breadcrumbs items={[{ name: "Press", href: "/press" }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Press &amp; Media · {oldestYear}–{newestYear}</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              In the{" "}
              <span className="gradient-text">news.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty">
              Coverage of Macksofy Technologies&rsquo; cybersecurity work across
              national press, broadcast television and trade publications — from
              AI-enabled crime trends to enterprise incident response.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-mono text-fg-faint">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-3 py-1">
                <Newspaper className="size-3 text-neon-cyan" />
                {PRESS_RELEASES.length} features
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-3 py-1">
                {PRESS_OUTLETS.length} outlets
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-3 py-1">
                {newestYear - oldestYear + 1} years
              </span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {PRESS_OUTLETS.map((o) => (
                <span
                  key={o}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted/80 px-2 py-1 rounded border border-line/60"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="py-20 bg-bg-1 border-y border-line">
          <Container>
            <FadeIn>
              <SectionTitle
                eyebrow="Featured coverage"
                title={
                  <>
                    Recent{" "}
                    <span className="gradient-text">headline features.</span>
                  </>
                }
                description="A look at our most prominent national-press appearances on cybersecurity threats, AI-enabled crime and the response playbook for Indian enterprises."
              />
            </FadeIn>
            <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
              {featured.map((p) => (
                <StaggerItem key={p.slug}>
                  <FeaturedPressCard press={p} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </Container>
        </section>
      )}

      {/* TIMELINE */}
      <Container className="py-20 sm:py-24">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-4 mb-10 lg:flex-row lg:items-end">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan">
                Archive · all coverage
              </span>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Every press feature, newest first.
              </h2>
            </div>
            <p className="max-w-md text-fg-muted text-pretty">
              Each card links directly to the original publication. External
              links open in a new tab.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <StaggerItem key={p.slug}>
              <PressCard press={p} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn>
          <div className="mt-16 rounded-2xl glass p-6 sm:p-8 text-center">
            <p className="text-sm text-fg-muted">
              For media enquiries, interview requests or expert commentary on
              cybersecurity incidents, contact{" "}
              <Link
                href="/contact"
                className="text-neon-cyan font-semibold hover:underline"
              >
                press@macksofy.com
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </Container>

      <LeadCapture />
    </>
  );
}

function FeaturedPressCard({ press }: { press: PressRelease }) {
  const Icon = KIND_ICON[press.kind];
  return (
    <a
      href={press.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
    >
      <article className="relative h-full rounded-2xl glass-strong overflow-hidden lift transition-all">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/15 via-neon-purple/10 to-neon-cyan/10 opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative p-8 flex flex-col h-full">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="amber">
              <Sparkles className="size-3" /> Featured
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted inline-flex items-center gap-1.5">
              <Icon className="size-3" /> {KIND_LABEL[press.kind]}
            </span>
          </div>

          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
            {press.outlet}
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-fg leading-tight text-balance">
            {press.title}
          </h3>
          <p className="mt-4 text-sm text-fg-muted leading-relaxed">
            {press.summary}
          </p>

          <div className="mt-auto pt-8 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-faint">
              <Calendar className="size-3 text-neon-cyan" />
              {formatDate(press.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-cyan group-hover:gap-2 transition-all">
              Read on {press.outlet}
              <ExternalLink className="size-3.5" />
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}

function PressCard({ press }: { press: PressRelease }) {
  const Icon = KIND_ICON[press.kind];
  return (
    <a
      href={press.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
    >
      <article className="relative h-full flex flex-col rounded-2xl glass overflow-hidden ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all hover:-translate-y-1 p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
            {press.outlet}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
            <Icon className="size-3" /> {KIND_LABEL[press.kind]}
          </span>
        </div>

        <h3 className="mt-3 font-display text-base font-bold text-fg leading-tight text-balance">
          {press.title}
        </h3>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed line-clamp-3">
          {press.summary}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="inline-flex items-center gap-1.5 text-fg-faint">
            <Calendar className="size-3 text-neon-cyan" />
            {formatDate(press.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-neon-cyan group-hover:gap-1.5 transition-all">
            Read <ExternalLink className="size-3" />
          </span>
        </div>
      </article>
    </a>
  );
}
