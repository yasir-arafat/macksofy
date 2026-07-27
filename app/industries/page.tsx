import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { INDUSTRIES } from "@/content/industries";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title:
    "Industries Macksofy Serves — BFSI · Healthcare · SaaS · Manufacturing · Government",
  description:
    "Sector-specific cybersecurity programmes from Macksofy — CERT-In empanelled audits, VAPT and managed SOC tuned to RBI / SEBI / IRDAI for BFSI, ADHICS / HIPAA for healthcare, SOC 2 + ISO 27001 for SaaS, IEC 62443 for manufacturing and CERT-In / NCIIPC for government.",
  path: "/industries",
  keywords: [
    "industry cybersecurity India",
    "BFSI cybersecurity",
    "healthcare cybersecurity India UAE",
    "SaaS fintech cybersecurity",
    "manufacturing OT cybersecurity",
    "government cybersecurity India",
    "vertical-specific cybersecurity",
  ],
  ogKind: "industry",
  ogTitle: "Industries Macksofy Serves",
  ogEyebrow: "Verticals",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Industries", url: "/industries" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE.url}/industries#list`,
            name: "Industries Macksofy Serves",
            itemListElement: INDUSTRIES.map((i, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `${SITE.url}/industries/${i.slug}`,
              name: i.name,
            })),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={60} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs items={[{ name: "Industries", href: "/industries" }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Industries · Verticals · Sector-specific cyber programmes</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
              The vertical decides{" "}
              <span className="gradient-text">half the work.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty">
              A BFSI VAPT looks nothing like a hospital VAPT. SaaS SOC 2 evidence
              looks nothing like a CERT-In submission. Government bidding works
              nothing like enterprise procurement. Macksofy&apos;s vertical practices
              are staffed by people who&apos;ve done the work before — regulator-
              aware reporting, sector-tuned methodology, evidence in the format
              your specific audience reads.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-bg-1">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i) => {
              const Icon = i.icon;
              return (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="group rounded-2xl glass p-6 flex flex-col ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-black text-fg group-hover:text-neon-cyan">
                    {i.name}
                  </h2>
                  <p className="mt-3 text-sm text-fg-muted text-pretty flex-1">
                    {i.hero.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Explore {i.shortName} <ArrowRight className="size-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
