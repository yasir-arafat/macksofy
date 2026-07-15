import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Scale,
  Target,
  Briefcase,
  FileBadge,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { TrustStrip } from "@/components/TrustStrip";
import { WhereWeDeliver } from "@/components/sections/WhereWeDeliver";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { INDUSTRIES, getIndustryBySlug } from "@/content/industries";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { pickRelatedIndustries } from "@/lib/related";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const i = getIndustryBySlug(slug);
  if (!i) return {};
  return buildMetadata({
    title: i.seoTitle,
    description: i.seoDescription,
    path: `/industries/${i.slug}`,
    keywords: i.keywords,
    ogKind: "industry",
    ogTitle: i.shortName,
    ogEyebrow: "Vertical",
  });
}

export default async function IndustryDetail({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  const Icon = industry.icon;
  const sa = getShortAnswer(`industry:${slug}`);

  const services = industry.topServices
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));
  const audits = industry.topAudits
    .map((a) => AUDITS.find((x) => x.slug === a))
    .filter((a): a is (typeof AUDITS)[number] => Boolean(a));
  const relatedIndustries = pickRelatedIndustries(industry, INDUSTRIES, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", url: "/industries" },
            { name: industry.shortName, url: `/industries/${industry.slug}` },
          ]),
          faqSchema(industry.faqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.shortName} Cybersecurity Services`,
            description: industry.hero.description,
            provider: { "@id": `${SITE.url}#organization` },
            serviceType: "Cybersecurity Consulting",
            audience: {
              "@type": "BusinessAudience",
              audienceType: industry.name,
            },
            url: `${SITE.url}/industries/${industry.slug}`,
          },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Industries", href: "/industries" },
              { name: industry.shortName, href: `/industries/${industry.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{industry.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <Icon className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
                  {industry.hero.headline}
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                {industry.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(industry.shortName + " engagement")}`}
                  size="lg"
                  withArrow
                >
                  Book a scoping call
                </LinkButton>
                <LinkButton href="#regulators" variant="outline" size="lg">
                  See regulatory coverage
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl glass-strong p-6">
                <Eyebrow color="purple">Vertical outcomes</Eyebrow>
                <ul className="mt-5 space-y-3 text-sm">
                  {industry.outcomes.slice(0, 5).map((o) => (
                    <li
                      key={o}
                      className="flex gap-2 text-fg-muted leading-relaxed border-b border-line/60 pb-2"
                    >
                      <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

      {/* CONTEXT */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>Sector context</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Why {industry.shortName} cybersecurity{" "}
            <span className="gradient-text">isn&apos;t generic.</span>
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {industry.context.map((p, i) => (
              <p
                key={i}
                className="text-fg-muted text-pretty leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* REGULATORS */}
      <section id="regulators" className="py-20">
        <Container>
          <Eyebrow color="purple">Regulatory coverage</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Frameworks Macksofy already maps to.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted">
            Every engagement&apos;s controls matrix tracks against these frameworks
            so the same evidence covers multiple regulator submissions.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {industry.regulators.map((r) => (
              <li
                key={r}
                className="flex gap-3 rounded-xl glass p-4 text-sm text-fg-muted leading-relaxed"
              >
                <Scale className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* TOP SERVICES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>Services we deliver into {industry.shortName}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            The Macksofy engagement shape for{" "}
            <span className="gradient-text">{industry.shortName}.</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-2xl glass p-5 hover:border-neon-cyan/40 transition-all flex flex-col"
                >
                  <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                    <SIcon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-fg group-hover:text-neon-cyan">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-3 flex-1">
                    {s.hero.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Explore service <ArrowRight className="size-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* TOP AUDITS */}
      {audits.length > 0 && (
        <section className="py-20">
          <Container>
            <Eyebrow color="amber">Audits scoped for this vertical</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Submission-ready evidence packs.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {audits.map((a) => (
                <Link
                  key={a.slug}
                  href={`/audit/${a.slug}`}
                  className="group rounded-2xl glass p-5 hover:border-neon-purple/40 transition-all flex flex-col"
                >
                  <Badge variant="purple" className="self-start">
                    <FileBadge className="size-3" /> {a.category}
                  </Badge>
                  <h3 className="mt-4 font-display font-bold text-fg group-hover:text-neon-purple">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-3 flex-1">
                    {a.hero.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-purple">
                    See audit <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CASE STUDY */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="cyan">
            <Briefcase className="inline-block size-3 -mt-0.5 mr-1" />
            Anonymised engagement snapshot
          </Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What a {industry.shortName} engagement actually delivers.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl glass-strong p-6 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-fg-faint font-mono">
                  Client profile
                </div>
                <p className="mt-2 text-fg-muted leading-relaxed">
                  {industry.caseStudy.profile}
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-fg-faint font-mono">
                  Scope
                </div>
                <p className="mt-2 text-fg-muted leading-relaxed">
                  {industry.caseStudy.scope}
                </p>
              </div>
            </div>
            <div className="rounded-2xl glass p-6 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-neon-cyan font-mono">
                  <Target className="inline-block size-3 mr-1 -mt-0.5" />
                  Finding
                </div>
                <p className="mt-2 text-fg-muted leading-relaxed">
                  {industry.caseStudy.finding}
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-neon-green font-mono">
                  Outcome
                </div>
                <p className="mt-2 text-fg-muted leading-relaxed">
                  {industry.caseStudy.outcome}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Things {industry.shortName} buyers ask first.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={industry.faqs} />
            </div>
          </div>
        </Container>
      </section>

      <WhereWeDeliver
        subject={`${industry.shortName} cybersecurity`}
        subjectShort={industry.shortName}
      />

      {relatedIndustries.length > 0 && (
        <section className="py-20">
          <Container>
            <Eyebrow color="purple">Other verticals we serve</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl text-balance">
              Cross-sector cybersecurity coverage.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {relatedIndustries.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/industries/${r.slug}`}
                    className="group rounded-2xl glass p-6 hover:border-neon-cyan/40 transition-all"
                  >
                    <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                      <RIcon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-fg group-hover:text-neon-cyan">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-2">
                      {r.hero.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                      Explore vertical <ArrowRight className="size-4" />
                    </span>
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
