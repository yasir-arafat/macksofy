import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/content/services";

export const metadata = buildMetadata({
  title: "Cybersecurity Services in India & UAE",
  description:
    "End-to-end offensive and defensive security services from CERT-In empanelled Macksofy. Pentest, VAPT, SOC, red team, DFIR, malware analysis, threat intel.",
  path: "/services",
  keywords: [
    "cybersecurity services India",
    "penetration testing services",
    "VAPT services Mumbai",
    "SOC services India",
    "red team services India",
    "cybersecurity Dubai",
  ],
});

export default function ServicesPage() {
  const offensive = SERVICES.filter((s) => s.category === "Offensive");
  const defensive = SERVICES.filter((s) => s.category === "Defensive");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Services", url: "/services" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.macksofy.com/services/${s.slug}`,
              name: s.title,
            })),
          },
        ]}
      />
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
          <div className="mt-8 max-w-4xl">
            <Eyebrow>9 Services · Offensive + Defensive</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Cybersecurity services that{" "}
              <span className="gradient-text">find what others miss.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty max-w-2xl">
              CERT-In empanelled. OSCP / OSWE / OSEP-certified. Trusted by India&rsquo;s
              largest BFSI, fintech and government clients since 2014. Reports your regulator
              and engineering team will both accept.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn>
            <SectionTitle eyebrow="Offensive Security" title={<>Find the gaps before <span className="gradient-text">attackers do.</span></>} />
          </FadeIn>
          <ServiceGrid services={offensive} />
        </Container>
      </section>

      <section className="py-20 bg-bg-1">
        <Container>
          <FadeIn>
            <SectionTitle eyebrow="Defensive Engineering" eyebrowColor="purple" title={<>Detect, respond, <span className="gradient-text">recover.</span></>} />
          </FadeIn>
          <ServiceGrid services={defensive} />
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}

function ServiceGrid({ services }: { services: typeof SERVICES }) {
  return (
    <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <StaggerItem key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 hover:border-neon-cyan/40 transition-all hover:-translate-y-1"
            >
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-neon-cyan/0 blur-2xl group-hover:bg-neon-cyan/20 transition-all" />
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-xl bg-bg-2 text-neon-cyan ring-1 ring-neon-cyan/30">
                  <Icon className="size-6" />
                </div>
                <ArrowUpRight className="size-5 text-fg-faint group-hover:text-neon-cyan group-hover:rotate-12 transition-all" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-fg group-hover:text-neon-cyan transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted line-clamp-3">
                {s.hero.description}
              </p>
              <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
                {s.industriesServed.slice(0, 3).map((i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-fg-faint"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerChildren>
  );
}
