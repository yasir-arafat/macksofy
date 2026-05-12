import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Target,
  Building2,
  Box,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { RiskMeter } from "@/components/visuals/RiskMeter";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES, getServiceBySlug } from "@/content/services";
import { Methodology } from "@/components/visuals/methodology/Methodology";
import { PricingTiers } from "@/components/PricingTiers";
import { TrustStrip } from "@/components/TrustStrip";
import { getServicePricing } from "@/content/pricing";
import { DownloadButton } from "@/components/DownloadButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BESPOKE_SLUGS = new Set([
  "vapt",
  "penetration-testing",
  "managed-soc",
  "web-application-security",
  "mobile-application-security",
  "cloud-security",
  "red-teaming",
  "digital-forensics-incident-response",
  "malware-analysis",
  "threat-intelligence",
]);

export function generateStaticParams() {
  return SERVICES.filter((s) => !BESPOKE_SLUGS.has(s.slug)).map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default async function ServiceDetail({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const Icon = service.icon;
  const related = SERVICES.filter(
    (s) => s.slug !== service.slug && s.category === service.category
  ).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-24">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <Icon className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
                  {service.title}
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={`/contact?interest=${encodeURIComponent(service.title)}`} size="lg" withArrow>
                  Request a quote
                </LinkButton>
                <LinkButton href="#methodology" variant="outline" size="lg">
                  See methodology
                </LinkButton>
              </div>
              <div className="mt-6">
                <DownloadButton
                  href="/sample-reports/pentest"
                  label="Download sample pentest report"
                  sub="CERT-In format · anonymised"
                />
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl glass-strong p-6 glow-blend">
                <Eyebrow color="purple">Engagement at a glance</Eyebrow>
                <ul className="mt-5 space-y-3 text-sm">
                  {[
                    ["Quote SLA", "48 hours"],
                    ["Typical engagement", "5–15 working days"],
                    ["Retest", "Free within 30 days"],
                    ["Reporting format", "CERT-In + ISO + SOC 2 ready"],
                    ["Team", "100% in-house · OSCP / OSWE / OSEP"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between gap-2 border-b border-line/60 pb-2">
                      <span className="text-fg-muted">{k}</span>
                      <span className="font-semibold text-fg text-right">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* REAL WORLD */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow>What this actually looks like</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                A {service.shortTitle} engagement, in plain language.
              </h2>
              <p className="mt-6 text-lg text-fg-muted text-pretty leading-relaxed">
                {service.realWorld}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl glass p-6">
                <Eyebrow color="amber">Business impact</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {service.businessImpact.map((b) => (
                    <li key={b} className="flex gap-3">
                      <CheckCircle2 className="size-5 text-neon-green shrink-0 mt-0.5" />
                      <span className="text-sm text-fg-muted leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <Eyebrow>Methodology</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Phased delivery — every step documented.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
            Interactive walkthrough of how we run a {service.shortTitle} engagement —
            tap a phase to expand its activities.
          </p>
          <div className="mt-10">
            <Methodology
              slug={service.slug}
              phases={service.methodology}
              subjectLabel={service.shortTitle}
            />
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Industry-standard <span className="gradient-text">+ custom</span>.
              </h2>
              <p className="mt-5 text-fg-muted">
                We use the same tooling top BFSI red teams operate — combined with
                Macksofy in-house extensions and proprietary scripts where commercial
                tools fall short.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* INDUSTRIES + DELIVERABLES */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Industries served</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black text-fg sm:text-3xl">
                <Building2 className="inline-block size-6 mr-2 text-neon-cyan" />
                Sectors we operate in
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {service.industriesServed.map((i) => (
                  <Badge key={i} variant="outline" className="justify-start">
                    {i}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <Eyebrow color="purple">Deliverables</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black text-fg sm:text-3xl">
                <Box className="inline-block size-6 mr-2 text-neon-purple" />
                What you get
              </h3>
              <ul className="mt-6 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="text-fg-muted">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      {service.caseStudies.length > 0 && (
        <section className="py-20 bg-bg-1">
          <Container>
            <Eyebrow color="amber">Case studies</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Anonymized engagement <span className="gradient-text">snapshots.</span>
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {service.caseStudies.map((cs, i) => (
                <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                  <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                  <h3 className="mt-4 font-display text-base font-bold text-fg leading-snug">
                    Scope · {cs.scope}
                  </h3>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                    <span className="text-neon-cyan font-semibold">Finding: </span>
                    {cs.finding}
                  </p>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                    <Target className="inline-block size-4 text-neon-cyan mr-1 -mt-0.5" />
                    {cs.impact}
                  </p>
                  <div className="mt-5 pt-5 border-t border-line/60">
                    <RiskMeter level={cs.severity} />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* PRICING */}
      <PricingTiers
        pkg={getServicePricing(service.slug, service.category)}
        contactInterest={service.title}
      />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Things people ask before signing.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-20 bg-bg-1">
          <Container>
            <Eyebrow color="purple">Related services</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
              Often paired with this engagement.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group rounded-2xl glass p-6 hover:border-neon-cyan/40 transition-all"
                  >
                    <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                      <RIcon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-fg group-hover:text-neon-cyan">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-2">{r.hero.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                      Learn more <ArrowRight className="size-4" />
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
