import Link from "next/link";
import { ArrowRight, MapPin, Globe2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { CITIES } from "@/content/cities";
import { COMBOS } from "@/content/combos";
import { getServiceBySlug } from "@/content/services";
import { SITE } from "@/lib/site";

// Combos grouped by city, ordered to follow the CITIES list. Drives the
// "service deep-dives by city" section below — giving every /locations/[city]/
// [service] page a shallow (depth-2 from home) inbound link from this indexed
// hub, which is the main lever against "Discovered – currently not indexed".
const COMBOS_BY_CITY = CITIES.map((c) => ({
  city: c,
  combos: COMBOS.filter((co) => co.citySlug === c.slug),
})).filter((g) => g.combos.length > 0);

export const metadata = buildMetadata({
  title:
    "Locations — Cybersecurity Services in Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Pune",
  description:
    "CERT-In empanelled cybersecurity delivered across India's metros — city pages for Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai and Pune.",
  path: "/locations",
  keywords: [
    "cybersecurity company India locations",
    "Macksofy locations India",
    "cybersecurity Mumbai Delhi Bengaluru Hyderabad Chennai Pune",
    "CERT-In auditor India city",
  ],
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Locations", url: "/locations" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${SITE.name} — Locations`,
            url: `${SITE.url}/locations`,
            itemListElement: CITIES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE.url}/locations/${c.slug}`,
              name: `Cybersecurity in ${c.name}`,
            })),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <GlowOrb className="bottom-0 right-1/3" color="purple" size={400} />
        <Container className="relative pt-12 pb-12 sm:pt-16">
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Cybersecurity across India + UAE</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Where we deliver{" "}
              <span className="gradient-text">cybersecurity engagements.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty">
              Macksofy is headquartered in Mumbai BKC, with a regional hub in
              Hyderabad HITEC City and engagements across every Indian metro
              and the UAE. Each city page below covers the local regulators,
              industries, services and a representative anonymised case study.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <CertInBadge size="sm" />
              <span className="font-mono text-xs text-fg-faint">
                CERT-In Empanelled · {CITIES.length} city pages · India + UAE
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/locations/${c.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
            >
              {c.primary && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-neon-cyan">
                  <Globe2 className="size-3" /> HQ
                </div>
              )}
              <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                <MapPin className="size-6" />
              </div>
              <div className="mt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                  {c.category}
                </div>
                <h2 className="mt-1 font-display text-2xl font-black text-fg group-hover:text-neon-cyan leading-tight">
                  {c.name}
                </h2>
                <div className="mt-1 text-xs text-fg-muted">{c.state}</div>
              </div>
              <p className="mt-4 text-sm text-fg-muted line-clamp-3 flex-1">
                {c.hero.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-fg-faint font-mono">
                  <span>{c.industries.length} industries</span>
                  <span>·</span>
                  <span>{c.topServices.length + c.topAudits.length} services + audits</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <section className="relative border-t border-white/5 bg-bg-2/40">
        <Container className="py-16">
          <div className="max-w-3xl">
            <Eyebrow>Service deep-dives by city</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl text-balance leading-tight">
              City + service pages
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Dedicated pages for each service in each city — local regulators,
              industries and engagement scope. Browse the full set below.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {COMBOS_BY_CITY.map(({ city, combos }) => (
              <div key={city.slug}>
                <Link
                  href={`/locations/${city.slug}`}
                  className="group inline-flex items-center gap-2 font-display text-lg font-black text-fg hover:text-neon-cyan"
                >
                  <MapPin className="size-4 text-neon-cyan" />
                  {city.name}
                  <ArrowRight className="size-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
                <ul className="mt-3 space-y-1.5 border-l border-white/10 pl-4">
                  {combos.map((co) => {
                    const s = getServiceBySlug(co.serviceSlug);
                    return (
                      <li key={co.serviceSlug}>
                        <Link
                          href={`/locations/${co.citySlug}/${co.serviceSlug}`}
                          className="text-sm text-fg-muted hover:text-neon-cyan transition-colors"
                        >
                          {s?.shortTitle ?? co.serviceSlug} in {city.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
