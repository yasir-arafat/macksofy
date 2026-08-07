import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { Counter } from "@/components/motion/Counter";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadCapture } from "@/components/home/LeadCapture";
import { ClientsMarquee } from "@/components/clients/ClientsMarquee";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  CLIENTS,
  CLIENT_CATEGORIES,
  clientsByCategory,
} from "@/content/clients";

export const metadata = buildMetadata({
  title: "Our Clients — Macksofy Technologies",
  description:
    "BFSI groups, RBI-regulated cooperative banks, universities, government bodies and fintechs trust Macksofy for CERT-In empanelled cybersecurity work.",
  path: "/clients",
  keywords: [
    "Macksofy clients",
    "cybersecurity company clients India",
    "CERT-In auditor clients",
    "BFSI cybersecurity clients Mumbai",
  ],
});

const STAT_BLOCKS = [
  { value: 250, suffix: "+", label: "Enterprise clients" },
  { value: 30, suffix: "+", label: "Co-op + RBI-regulated banks" },
  { value: 11, suffix: " yrs", label: "In business" },
  { value: 5, suffix: "", label: "Countries served" },
];

export default function ClientsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Clients", url: "/clients" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Macksofy Technologies — Client Roster",
            numberOfItems: CLIENTS.length,
            itemListElement: CLIENTS.slice(0, 30).map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
            })),
          },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <GlowOrb className="bottom-0 right-1/4" color="purple" size={400} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs items={[{ name: "Clients", href: "/clients" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Our Clients · India + UAE</Eyebrow>
              <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
                Trusted by{" "}
                <span className="gradient-text">India&rsquo;s most regulated industries.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                From listed BFSI multinationals and RBI-regulated cooperative banks
                to top universities, government departments and fast-growing
                fintechs — over 250 organizations rely on Macksofy for CERT-In
                empanelled audits, penetration testing and cybersecurity training.
              </p>
              <div className="mt-7">
                <CertInBadge size="md" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-4">
                {STAT_BLOCKS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl glass p-5 text-left"
                  >
                    <div className="font-display text-3xl font-black gradient-text leading-none">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MARQUEE STRIP */}
      <section className="py-12 border-y border-line bg-bg-1">
        <ClientsMarquee />
      </section>

      {/* CATEGORIES */}
      <Container className="py-20 sm:py-24">
        {CLIENT_CATEGORIES.map((cat, ci) => {
          const items = clientsByCategory(cat.key);
          if (items.length === 0) return null;
          return (
            <section key={cat.key} className="mb-20 last:mb-0">
              <FadeIn>
                <div className="flex flex-col items-start justify-between gap-4 mb-10 lg:flex-row lg:items-end">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan">
                      {String(ci + 1).padStart(2, "0")} / {String(CLIENT_CATEGORIES.length).padStart(2, "0")} ·{" "}
                      {items.length} client{items.length === 1 ? "" : "s"}
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                      {cat.key}
                    </h2>
                  </div>
                  <p className="max-w-md text-fg-muted text-pretty">{cat.description}</p>
                </div>
              </FadeIn>

              <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map((c) => (
                  <StaggerItem key={c.name}>
                    <ClientCard name={c.name} logo={c.logo} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </section>
          );
        })}
      </Container>

      <Testimonials />
      <LeadCapture />
    </>
  );
}

function ClientCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="group relative">
      <div className="relative aspect-[7/5] overflow-hidden rounded-xl bg-white ring-1 ring-line transition-all duration-300 hover:ring-neon-cyan/50 hover:shadow-[0_0_24px_rgba(0,229,255,0.25)] hover:-translate-y-0.5">
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 200px"
          className="object-contain p-3"
        />
      </div>
      <div className="mt-2 px-1 text-[11px] text-fg-muted leading-tight line-clamp-2 text-center">
        {name}
      </div>
    </div>
  );
}
