import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  caseStudySchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/content/caseStudies";
import { cn } from "@/lib/utils";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.seoTitle,
    description: cs.seoDescription,
    path: `/case-studies/${cs.slug}`,
    keywords: cs.keywords,
    type: "article",
    publishedTime: `${cs.year}-01-01`,
    modifiedTime: `${cs.year}-12-31`,
  });
}

const ACCENT_TEXT: Record<string, string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  amber: "text-amber-300",
  pink: "text-pink-300",
  green: "text-emerald-300",
  red: "text-red-300",
};

const ACCENT_RING: Record<string, string> = {
  cyan: "ring-neon-cyan/30",
  purple: "ring-neon-purple/30",
  amber: "ring-amber-400/30",
  pink: "ring-pink-400/30",
  green: "ring-emerald-400/30",
  red: "ring-red-400/30",
};

const SEVERITY_BADGE: Record<"critical" | "high" | "medium", "red" | "amber" | "purple"> = {
  critical: "red",
  high: "amber",
  medium: "purple",
};

const SEVERITY_LABEL: Record<"critical" | "high" | "medium", string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
};

export default async function CaseStudyDetail({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();
  const Icon = cs.icon;

  const related = CASE_STUDIES.filter(
    (c) =>
      c.slug !== cs.slug &&
      (c.sector === cs.sector || c.engagement === cs.engagement)
  ).slice(0, 3);

  const sa = getShortAnswer(`case-study:${cs.slug}`);

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema(cs, { answerBox: Boolean(sa) }),
          breadcrumbSchema([
            { name: "Case Studies", url: "/case-studies" },
            { name: cs.headline, url: `/case-studies/${cs.slug}` },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <ParticleBackground density={60} className="absolute inset-0" />
        <GlowOrb className="-top-40 -left-32" color="cyan" size={500} />
        <GlowOrb
          className="-bottom-40 -right-32"
          color="purple"
          size={500}
          intensity="soft"
        />

        <Container className="relative pt-16 pb-20 lg:pt-20 lg:pb-24">
          <Breadcrumbs
            items={[
              { name: "Case Studies", href: "/case-studies" },
              { name: cs.clientType, href: `/case-studies/${cs.slug}` },
            ]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1",
                    ACCENT_RING[cs.accent],
                    ACCENT_TEXT[cs.accent]
                  )}
                >
                  <Icon className="size-7" />
                </div>
                <div>
                  <Eyebrow>
                    {cs.sector} · {cs.engagement}
                  </Eyebrow>
                  <div className="mt-1 text-xs font-mono text-fg-faint uppercase tracking-[0.18em]">
                    {cs.region} · {cs.size} · {cs.year}
                  </div>
                </div>
              </div>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-balance">
                {cs.headline}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-fg-muted text-pretty max-w-2xl">
                {cs.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-1.5">
                {cs.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <LinkButton href="/contact" withArrow>
                  Talk to a senior consultant
                </LinkButton>
                <LinkButton
                  href={`/services/${cs.serviceSlug}`}
                  variant="secondary"
                >
                  See the {cs.engagement} service
                </LinkButton>
              </div>
            </div>

            {/* Engagement card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl glass p-6 ring-1 ring-white/10">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-faint">
                  Engagement summary
                </div>
                <dl className="mt-4 space-y-4 text-sm">
                  <Row label="Client" value={cs.clientType} />
                  <Row label="Sector" value={cs.sector} />
                  <Row label="Region" value={cs.region} />
                  <Row label="Engagement" value={cs.engagement} />
                  <Row label="Year" value={cs.year} />
                  <Row label="Duration" value={cs.duration} />
                </dl>
              </div>
            </div>
          </div>

          {/* Metric strip */}
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className={cn(
                  "rounded-2xl glass p-5 ring-1",
                  ACCENT_RING[cs.accent]
                )}
              >
                <div
                  className={cn(
                    "font-display text-3xl sm:text-4xl font-black leading-none",
                    ACCENT_TEXT[cs.accent]
                  )}
                >
                  {m.value}
                </div>
                <div className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-fg-faint">
                  {m.label}
                </div>
                {m.sub && (
                  <div className="mt-1 text-xs text-fg-muted">{m.sub}</div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SHORT ANSWER (AEO/GEO) */}
      {sa && (
        <section className="py-8">
          <Container size="narrow">
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      {/* CHALLENGE */}
      <section className="py-20 lg:py-24">
        <Container size="narrow">
          <Eyebrow>The challenge</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance">
            What the client was up against.
          </h2>
          <div className="mt-10 space-y-8">
            {cs.challenge.map((c) => (
              <div key={c.title}>
                <h3 className="font-display text-xl font-bold text-fg">
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-fg-muted text-pretty">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* APPROACH */}
      <section className="py-20 bg-bg-1 border-y border-white/5">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Approach</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance">
              How we ran the engagement, phase by phase.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cs.approach.map((p, i) => (
              <div
                key={p.phase}
                className="rounded-2xl glass p-6 ring-1 ring-white/10 hover:ring-neon-purple/40 transition"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-neon-purple">
                  Phase {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-fg leading-tight">
                  {p.phase}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-neon-purple" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FINDINGS */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Findings</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance">
              What we surfaced — severity, title, real-world impact.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {cs.findings.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl glass p-6 ring-1 ring-white/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <Badge variant={SEVERITY_BADGE[f.severity]}>
                        <ShieldAlert className="size-3" />
                        {SEVERITY_LABEL[f.severity]}
                      </Badge>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-fg leading-tight">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">
                      {f.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* OUTCOME */}
      <section className="py-20 bg-bg-1 border-y border-white/5">
        <Container size="narrow">
          <Eyebrow>Outcome</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance">
            What changed for the client.
          </h2>
          <div className="mt-10 space-y-8">
            {cs.outcome.map((o) => (
              <div key={o.title}>
                <h3 className="font-display text-xl font-bold text-fg">
                  {o.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-fg-muted text-pretty">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* QUOTE */}
      <section className="py-20 lg:py-24">
        <Container size="narrow">
          <div className="rounded-3xl glass p-8 sm:p-12 ring-1 ring-white/10 relative overflow-hidden">
            <Quote className="absolute -top-4 -left-4 size-32 text-neon-cyan/10" />
            <div className="relative">
              <blockquote className="font-display text-2xl sm:text-3xl font-bold text-fg leading-snug text-balance">
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <div className="mt-6 text-sm font-mono uppercase tracking-[0.18em] text-fg-faint">
                — {cs.quote.author}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-20 bg-bg-1 border-y border-white/5">
          <Container>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div className="max-w-2xl">
                <Eyebrow>Related case studies</Eyebrow>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance">
                  More work in the same space.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:underline"
              >
                All case studies
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/case-studies/${r.slug}`}
                    className="group rounded-2xl glass p-6 ring-1 ring-white/10 hover:ring-neon-cyan/40 transition flex flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "grid size-11 place-items-center rounded-xl bg-bg-2 ring-1",
                          ACCENT_RING[r.accent],
                          ACCENT_TEXT[r.accent]
                        )}
                      >
                        <RIcon className="size-5" />
                      </div>
                      <ArrowUpRight className="size-4 text-fg-faint group-hover:rotate-12 group-hover:text-fg transition" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <Badge variant="cyan">{r.sector}</Badge>
                      <Badge variant="purple">{r.engagement}</Badge>
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold text-fg leading-tight line-clamp-3">
                      {r.headline}
                    </h3>
                    <div className="mt-auto pt-5 text-xs font-mono text-fg-faint">
                      {r.clientType} · {r.year}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <LeadCapture />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-fg-faint font-mono text-[10px] uppercase tracking-[0.2em] pt-0.5">
        {label}
      </dt>
      <dd className="font-semibold text-fg text-right">{value}</dd>
    </div>
  );
}
