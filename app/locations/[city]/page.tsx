import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  Briefcase,
  CheckCircle2,
  Navigation,
  Globe2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { TrustStrip } from "@/components/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { CITIES, getCityBySlug } from "@/content/cities";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { SITE, metroKeywords } from "@/lib/site";

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) return {};
  return buildMetadata({
    title: `Cybersecurity Company in ${c.name} 2026 — VAPT · Audit · Training | Macksofy`,
    description: c.seoDescription,
    path: `/locations/${c.slug}`,
    keywords: [
      `cybersecurity ${c.name}`,
      `cybersecurity company ${c.name}`,
      `VAPT ${c.name}`,
      `pen testing ${c.name}`,
      `CERT-In auditor ${c.name}`,
      `ISO 27001 consultant ${c.name}`,
      `OSCP training ${c.name}`,
      `ethical hacking ${c.name}`,
      ...c.extraKeywords,
      ...metroKeywords("cybersecurity").slice(0, 12),
    ],
  });
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) notFound();

  const cityServices = c.topServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));
  const cityAudits = c.topAudits
    .map((slug) => AUDITS.find((a) => a.slug === slug))
    .filter((a): a is (typeof AUDITS)[number] => Boolean(a));

  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    c.mapQuery ?? c.name
  )}&z=12&output=embed`;
  const otherCities = CITIES.filter((x) => x.slug !== c.slug).slice(0, 5);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Locations", url: "/locations" },
            { name: c.name, url: `/locations/${c.slug}` },
          ]),
          faqSchema(c.faqs),
          {
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": `${SITE.url}/locations/${c.slug}#localbusiness`,
            name: `Macksofy Technologies — ${c.name}`,
            url: `${SITE.url}/locations/${c.slug}`,
            telephone: SITE.phone,
            email: SITE.email,
            priceRange: "₹₹₹",
            address: {
              "@type": "PostalAddress",
              addressLocality: c.name,
              addressRegion: c.state,
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: c.geo.lat,
              longitude: c.geo.lng,
            },
            areaServed: { "@type": "City", name: c.name },
            parentOrganization: { "@id": `${SITE.url}#organization` },
            sameAs: Object.values(SITE.social),
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Cybersecurity Services in ${c.name}`,
            description: c.seoDescription,
            provider: { "@id": `${SITE.url}#organization` },
            areaServed: { "@type": "City", name: c.name },
            serviceType: "Cybersecurity Consulting",
            url: `${SITE.url}/locations/${c.slug}`,
          },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={600} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={500} />
        <Container className="relative pt-12 pb-16 sm:pt-16 sm:pb-20">
          <Breadcrumbs
            items={[
              { name: "Locations", href: "/locations" },
              { name: c.name, href: `/locations/${c.slug}` },
            ]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{c.hero.eyebrow}</Eyebrow>
              <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
                {c.hero.headline.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gradient-text">
                  {c.hero.headline.split(" ").slice(-1).join(" ")}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                {c.hero.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/contact?interest=${encodeURIComponent(`Cybersecurity in ${c.name}`)}#enquiry`}
                  className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple h-12 px-6 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)] transition-shadow"
                >
                  Get a {c.name} quote
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-neon-cyan h-12 px-5 text-sm font-bold text-neon-cyan hover:bg-neon-cyan hover:text-bg transition-colors"
                >
                  <Phone className="size-4" /> {SITE.phoneDisplay}
                </a>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <CertInBadge size="sm" />
                <span className="font-mono text-xs text-fg-faint">
                  {c.category} · {c.state} · India + UAE delivery
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-3">
                {c.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl glass p-4">
                    <div className="font-display text-2xl font-black gradient-text leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CITY CONTEXT */}
      <section className="py-16 bg-bg-1 border-y border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">{c.name} cybersecurity context</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Why {c.name}{" "}
                <span className="gradient-text">needs purpose-built security.</span>
              </h2>
              <div className="mt-6 rounded-2xl glass p-5">
                <div className="flex items-start gap-3 mb-3">
                  <Building2 className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display text-sm font-bold text-fg leading-tight">
                      Active regulators
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                      {c.name} regulatory landscape
                    </div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {c.regulators.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-xs text-fg-muted leading-relaxed"
                    >
                      <CheckCircle2 className="size-3.5 text-neon-cyan shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              {c.cityContext.map((p, i) => (
                <p
                  key={i}
                  className="text-fg-muted leading-relaxed text-pretty text-[17px]"
                >
                  {p}
                </p>
              ))}
              <div className="pt-4 border-t border-line/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-purple font-bold mb-3">
                  Industries we serve in {c.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.industries.map((ind) => (
                    <Badge key={ind} variant="neutral">
                      <Briefcase className="size-3" /> {ind}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES + AUDITS */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What we deliver in {c.name}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Top services and audits for{" "}
              <span className="gradient-text">{c.name} clients.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              The engagements {c.name} buyers ask about most. Each links to its
              full methodology, deliverables and indicative pricing.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold mb-4">
                Top services in {c.name}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {cityServices.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-3 rounded-xl bg-bg-2/50 ring-1 ring-line p-4 hover:ring-neon-cyan/40 transition-all"
                      >
                        <div className="grid size-10 place-items-center rounded-lg bg-bg ring-1 ring-neon-cyan/30 text-neon-cyan shrink-0">
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-sm font-bold text-fg group-hover:text-neon-cyan leading-tight">
                            {s.shortTitle}
                          </div>
                          <div className="mt-1 text-xs text-fg-muted line-clamp-2 leading-snug">
                            {s.hero.tagline}
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-fg-faint group-hover:text-neon-cyan opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all mt-3 shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-purple font-semibold mb-4">
                Top audits in {c.name}
              </div>
              <ul className="grid gap-2.5">
                {cityAudits.map((a) => {
                  const Icon = a.icon;
                  return (
                    <li key={a.slug}>
                      <Link
                        href={`/audit/${a.slug}`}
                        className="group flex items-center gap-3 rounded-xl bg-bg-2/40 ring-1 ring-line px-4 py-3 hover:ring-neon-purple/40 transition-all"
                      >
                        <div className="grid size-8 place-items-center rounded-lg bg-neon-purple/10 ring-1 ring-neon-purple/30 text-neon-purple shrink-0">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-sm font-bold text-fg group-hover:text-neon-purple leading-tight">
                            {a.shortTitle}
                          </div>
                        </div>
                        <ArrowRight className="size-3.5 text-fg-faint group-hover:text-neon-purple shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CASE STUDY */}
      <section className="py-16 bg-bg-1 border-y border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow color="amber">{c.name} case study</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Anonymised{" "}
                <span className="gradient-text">{c.name} engagement.</span>
              </h2>
              <p className="mt-4 text-fg-muted text-pretty">
                A representative slice of the work we&rsquo;ve shipped for{" "}
                {c.name} clients. Full case briefs available under NDA.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-gradient-to-br from-neon-cyan/[0.07] to-neon-purple/[0.07] ring-1 ring-line p-7 sm:p-8 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 size-56 rounded-full bg-neon-cyan/10 blur-3xl pointer-events-none"
                />
                <div className="relative">
                  <Badge variant="cyan" className="self-start">
                    {c.caseStudy.industry}
                  </Badge>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
                    Scope
                  </div>
                  <p className="mt-2 font-display text-lg sm:text-xl font-bold text-fg leading-snug">
                    {c.caseStudy.scope}
                  </p>
                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300 font-bold">
                    Outcome
                  </div>
                  <p className="mt-2 text-fg leading-relaxed">
                    {c.caseStudy.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* DELIVERY + MAP */}
      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>How we deliver in {c.name}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Mumbai-anchored,{" "}
                <span className="gradient-text">{c.name}-onsite.</span>
              </h2>
              <p className="mt-4 text-fg-muted leading-relaxed text-pretty">
                {c.delivery}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-bg-2/50 ring-1 ring-line p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    HQ
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-fg">
                    Mumbai BKC
                  </div>
                </div>
                <div className="rounded-xl bg-bg-2/50 ring-1 ring-line p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    Onsite in {c.name}
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-neon-cyan">
                    Available
                  </div>
                </div>
                <div className="rounded-xl bg-bg-2/50 ring-1 ring-line p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    Empanelment
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-fg">
                    CERT-In · MeitY
                  </div>
                </div>
                <div className="rounded-xl bg-bg-2/50 ring-1 ring-line p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    Languages
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-fg">
                    EN · HI · MR
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-line">
                <iframe
                  src={mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title={`${c.name} delivery area map`}
                  className="absolute inset-0 size-full"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-bg/85 ring-1 ring-line backdrop-blur-md px-3 py-1.5 text-xs font-mono pointer-events-none">
                  <MapPin className="size-3.5 text-neon-cyan" />
                  <span className="font-semibold text-fg">{c.name}</span>
                  <span className="text-fg-faint">
                    · {c.geo.lat.toFixed(3)}, {c.geo.lng.toFixed(3)}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${c.geo.lat},${c.geo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-neon-cyan/20 ring-1 ring-neon-cyan/40 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
                  >
                    <Navigation className="size-3.5" /> Get directions
                  </a>
                  <a
                    href={`mailto:${SITE.email}?subject=Cybersecurity engagement in ${c.name}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-bg-2/90 ring-1 ring-line backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-fg hover:text-neon-cyan transition-colors"
                  >
                    <Mail className="size-3.5" /> Email us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip eyebrow={`What ${c.name} clients say`} />

      {/* FAQ */}
      <section className="py-16 bg-bg-1 border-y border-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Eyebrow color="purple">{c.name} FAQs</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-tight">
              Things {c.name} buyers ask first.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={c.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* OTHER CITIES */}
      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <Eyebrow>Other locations</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-balance">
                We deliver across India + UAE.
              </h2>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan hover:gap-2 transition-all"
            >
              All locations <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otherCities.map((x) => (
              <Link
                key={x.slug}
                href={`/locations/${x.slug}`}
                className="group flex items-center gap-3 rounded-xl bg-bg-2/40 ring-1 ring-line p-3.5 hover:ring-neon-cyan/40 transition-all"
              >
                <Globe2 className="size-4 text-neon-cyan shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-bold text-fg group-hover:text-neon-cyan leading-tight">
                    {x.name}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                    {x.state}
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-fg-faint group-hover:text-neon-cyan shrink-0" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
