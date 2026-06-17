import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  MapPin,
  Building2,
  Compass,
  ShieldCheck,
  FileText,
  Award,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { TrustStrip } from "@/components/TrustStrip";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  cityLocalBusinessSchema,
  faqSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getCityBySlug } from "@/content/cities";
import { getServiceBySlug } from "@/content/services";
import { COMBO_PAIRS, getCombo } from "@/content/combos";
import { SITE } from "@/lib/site";
import { ComboStats } from "@/components/visuals/combo/ComboStats";
import { ComboTimeline } from "@/components/visuals/combo/ComboTimeline";

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export function generateStaticParams() {
  return COMBO_PAIRS;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { city, service } = await params;
  const combo = getCombo(city, service);
  const c = getCityBySlug(city);
  const s = getServiceBySlug(service);
  if (!combo || !c || !s) return {};
  return buildMetadata({
    title: combo.headline,
    description: combo.seoDescription,
    path: `/locations/${city}/${service}`,
    keywords: combo.keywords,
  });
}

const INDUSTRY_ICONS: LucideIcon[] = [
  Briefcase,
  Building2,
  ShieldCheck,
  Compass,
  Award,
  FileText,
];
const INDUSTRY_TONES = [
  "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10",
  "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
  "text-rose-300 ring-rose-400/40 bg-rose-400/10",
  "text-sky-300 ring-sky-400/40 bg-sky-400/10",
];

export default async function CityServiceComboPage({ params }: PageProps) {
  const { city, service } = await params;
  const combo = getCombo(city, service);
  const c = getCityBySlug(city);
  const s = getServiceBySlug(service);
  if (!combo || !c || !s) notFound();
  const ServiceIcon = s.icon;
  // "An Abu Dhabi…" / "An Ahmedabad…" but "A UAE…" (sounds like "you") — A/E/I/O only.
  const cityArticle = /^[AEIO]/.test(c.name) ? "An" : "A";

  const siblingsInCity = COMBO_PAIRS.filter(
    (p) => p.city === city && p.service !== service
  ).slice(0, 4);
  const siblingsInService = COMBO_PAIRS.filter(
    (p) => p.service === service && p.city !== city
  ).slice(0, 4);

  const pageUrl = `${SITE.url}/locations/${city}/${service}`;
  const wantsTimeline = (combo.methodology?.length ?? 0) > 0;
  const wantsStats = (combo.stats?.length ?? 0) > 0;
  const wantsIndustries = (combo.industries?.length ?? 0) > 0;
  const wantsDeliverables = (combo.deliverables?.length ?? 0) > 0;
  const wantsCaseStudy = !!combo.caseStudy;
  const wantsFaqs = (combo.faqs?.length ?? 0) > 0;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Locations", url: "/locations" },
            { name: c.name, url: `/locations/${c.slug}` },
            { name: s.shortTitle, url: `/locations/${c.slug}/${s.slug}` },
          ]),
          cityLocalBusinessSchema(c),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${pageUrl}#service`,
            name: combo.headline,
            description: combo.seoDescription,
            provider: { "@id": `${SITE.url}#organization` },
            areaServed: { "@type": "City", name: c.name },
            serviceType: s.title,
            url: pageUrl,
          },
          ...(wantsFaqs ? [faqSchema(combo.faqs!)] : []),
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={50} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-16">
          <Breadcrumbs
            items={[
              { name: "Locations", href: "/locations" },
              { name: c.name, href: `/locations/${c.slug}` },
              { name: s.shortTitle, href: `/locations/${c.slug}/${s.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
                <MapPin className="size-3" /> {c.name} · {s.shortTitle}
              </div>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <div className="grid size-12 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                  <ServiceIcon className="size-6" />
                </div>
                <Badge variant="cyan">CERT-In Empanelled</Badge>
                <Badge variant="outline">{c.name}</Badge>
              </div>
              <h1 className="mt-5 font-display text-4xl font-black sm:text-5xl lg:text-[3.2rem] text-balance leading-[1.05]">
                {combo.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {combo.lead}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(`${s.shortTitle} ${c.name}`)}`}
                  size="lg"
                  withArrow
                >
                  Request a quote
                </LinkButton>
                <LinkButton href={`/services/${s.slug}`} variant="outline" size="lg">
                  See full {s.shortTitle} service
                </LinkButton>
              </div>
            </div>

            {/* Buyer concerns sidebar */}
            <aside className="lg:col-span-5">
              <div className="rounded-2xl glass p-6">
                <Eyebrow color="amber">What {c.name} buyers ask us</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {combo.buyerConcerns.map((b) => (
                    <li key={b} className="flex gap-3 text-sm">
                      <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span className="text-fg-muted leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ─── ANIMATED STATS STRIP ─── */}
      {wantsStats && (
        <section className="py-12 sm:py-16 border-t border-line">
          <Container>
            <ComboStats stats={combo.stats!} />
          </Container>
        </section>
      )}

      {/* ─── BODY DEEP-DIVE ─── */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <FadeIn>
                <Eyebrow>{s.shortTitle} in {c.name}</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                  How a Macksofy <span className="gradient-text">{s.shortTitle.toLowerCase()}</span> engagement runs in {c.name}.
                </h2>
              </FadeIn>
              <div className="mt-6 space-y-5 text-fg-muted leading-relaxed text-pretty">
                {combo.body.map((para, i) => (
                  <FadeIn key={i} delay={Math.min(i * 0.04, 0.2)}>
                    <p>{para}</p>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Differentiators rail */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-bg-2/40 ring-1 ring-line p-6 lg:sticky lg:top-24">
                <Eyebrow color="purple">Why Macksofy in {c.name}</Eyebrow>
                <ul className="mt-5 space-y-4 text-sm">
                  {combo.differentiators.map((d, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-neon-cyan/10 ring-1 ring-neon-cyan/40 text-neon-cyan font-mono text-[10px] font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="text-fg-muted leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-line/60">
                  <Link
                    href={`/locations/${c.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan hover:gap-2 transition-all"
                  >
                    More services in {c.name}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ─── METHODOLOGY HORIZONTAL TIMELINE ─── */}
      {wantsTimeline && (
        <section className="py-20">
          <Container>
            <FadeIn>
              <div className="grid items-end gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <Eyebrow color="amber">Engagement workflow</Eyebrow>
                  <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                    Five phases. <span className="gradient-text">{c.name} timeline.</span>
                  </h2>
                </div>
                <p className="text-fg-muted text-pretty leading-relaxed lg:col-span-5 lg:pb-1">
                  Every Macksofy {s.shortTitle.toLowerCase()} engagement in {c.name} runs
                  through the same phased protocol — adapted to {c.name}-specific
                  procurement, regulator and delivery realities.
                </p>
              </div>
            </FadeIn>
            <div className="mt-12">
              <ComboTimeline phases={combo.methodology!} />
            </div>
          </Container>
        </section>
      )}

      {/* ─── INDUSTRY VERTICALS ─── */}
      {wantsIndustries && (
        <section className="py-20 bg-bg-1">
          <Container>
            <div className="max-w-3xl">
              <FadeIn>
                <Eyebrow color="purple">Industries served</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                  Which {c.name} verticals we deliver <span className="gradient-text">{s.shortTitle}</span> for.
                </h2>
              </FadeIn>
            </div>
            <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {combo.industries!.map((ind, i) => {
                const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length];
                const tone = INDUSTRY_TONES[i % INDUSTRY_TONES.length];
                return (
                  <StaggerItem key={ind.name}>
                    <div className="group h-full rounded-2xl glass p-5 hover:border-neon-cyan/40 transition-all lift">
                      <div className={`grid size-11 place-items-center rounded-xl ring-1 ${tone} mb-4`}>
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-fg leading-tight">
                        {ind.name}
                      </h3>
                      <p className="mt-2 text-[13px] text-fg-muted leading-relaxed">
                        {ind.blurb}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </Container>
        </section>
      )}

      {/* ─── DELIVERABLES ─── */}
      {wantsDeliverables && (
        <section className="py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <FadeIn>
                  <Eyebrow>What ships</Eyebrow>
                  <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                    The {c.name} <span className="gradient-text">deliverable pack</span>.
                  </h2>
                  <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                    Every {c.name} {s.shortTitle.toLowerCase()} engagement closes with the
                    pack below — regulator-ready evidence, technical detail and
                    board-readable summaries.
                  </p>
                </FadeIn>
              </div>
              <ul className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
                {combo.deliverables!.map((d, i) => (
                  <FadeIn key={d} delay={Math.min(i * 0.04, 0.2)}>
                    <li className="flex gap-3 rounded-xl glass p-4">
                      <CheckCircle2 className="size-5 text-neon-green shrink-0 mt-0.5" />
                      <span className="text-sm text-fg-muted leading-relaxed">{d}</span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* ─── CASE STUDY ─── */}
      {wantsCaseStudy && (
        <section className="py-20 bg-bg-1">
          <Container>
            <div className="max-w-4xl">
              <FadeIn>
                <Eyebrow color="amber">Recent {c.name} engagement</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                  {cityArticle} {c.name} <span className="gradient-text">{s.shortTitle.toLowerCase()}</span> case study.
                </h2>
              </FadeIn>
              <div className="mt-10 rounded-2xl glass p-6 sm:p-8 lift">
                <Badge variant="cyan">{combo.caseStudy!.industry}</Badge>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint mb-2">
                      Scope
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {combo.caseStudy!.scope}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-green mb-2">
                      Outcome
                    </div>
                    <p className="text-sm text-fg leading-relaxed">
                      {combo.caseStudy!.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <TrustStrip />

      {/* ─── FAQ ─── */}
      {wantsFaqs && (
        <section className="py-20">
          <Container>
            <div className="max-w-3xl">
              <FadeIn>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                  Questions {c.name} buyers ask <span className="gradient-text">before signing</span>.
                </h2>
              </FadeIn>
              <div className="mt-10">
                <FAQAccordion faqs={combo.faqs!} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ─── INTERNAL LINK GRID — sibling combos ─── */}
      {(siblingsInCity.length > 0 || siblingsInService.length > 0) && (
        <section className="py-20 bg-bg-1">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              {siblingsInCity.length > 0 && (
                <div>
                  <Eyebrow>More services in {c.name}</Eyebrow>
                  <h3 className="mt-3 font-display text-2xl font-bold text-fg">
                    Other Macksofy engagements in {c.name}.
                  </h3>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {siblingsInCity.map((p) => {
                      const sib = getServiceBySlug(p.service);
                      if (!sib) return null;
                      const SibIcon = sib.icon;
                      return (
                        <li key={`${p.city}-${p.service}`}>
                          <Link
                            href={`/locations/${p.city}/${p.service}`}
                            className="group flex items-center gap-3 rounded-xl glass p-3 hover:border-neon-cyan/40 transition-all"
                          >
                            <div className="grid size-8 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                              <SibIcon className="size-4" />
                            </div>
                            <span className="text-sm font-semibold text-fg group-hover:text-neon-cyan">
                              {sib.shortTitle} in {c.name}
                            </span>
                            <ArrowRight className="ml-auto size-3.5 text-fg-faint group-hover:text-neon-cyan" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {siblingsInService.length > 0 && (
                <div>
                  <Eyebrow color="purple">{s.shortTitle} in other cities</Eyebrow>
                  <h3 className="mt-3 font-display text-2xl font-bold text-fg">
                    Same engagement, other Macksofy metros.
                  </h3>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {siblingsInService.map((p) => {
                      const sibCity = getCityBySlug(p.city);
                      if (!sibCity) return null;
                      return (
                        <li key={`${p.city}-${p.service}`}>
                          <Link
                            href={`/locations/${p.city}/${p.service}`}
                            className="group flex items-center gap-3 rounded-xl glass p-3 hover:border-neon-cyan/40 transition-all"
                          >
                            <div className="grid size-8 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                              <Building2 className="size-4" />
                            </div>
                            <span className="text-sm font-semibold text-fg group-hover:text-neon-cyan">
                              {s.shortTitle} in {sibCity.name}
                            </span>
                            <ArrowRight className="ml-auto size-3.5 text-fg-faint group-hover:text-neon-cyan" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      <LeadCapture />
    </>
  );
}
