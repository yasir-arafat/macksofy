import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getPersonAuthors } from "@/content/authors";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Our Security Experts — Macksofy Team",
  description:
    "The certified security consultants behind Macksofy Technologies — CERT-In empanelled auditors, OSCP/OSEP red teamers, and DFIR responders.",
  path: "/team",
  ogKind: "macksofy",
  ogTitle: "Our Security Experts",
  ogEyebrow: "Team",
});

export default function TeamPage() {
  const people = getPersonAuthors();
  // Dormant until real experts are added: no named people -> 404 rather than a
  // thin, indexable placeholder. The moment a Person entry lands in
  // content/authors.ts, this hub renders and (via the sitemap/nav guards) is
  // promoted. See content/authors.ts for the intake block.
  if (people.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Team", url: "/team" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE.url}/team#list`,
            name: "Macksofy Security Experts",
            itemListElement: people.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE.url}/team/${p.slug}`,
              name: p.name,
            })),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={45} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <Container className="relative pt-10 pb-14">
          <Breadcrumbs items={[{ name: "Team", href: "/team" }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Team</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl text-balance leading-[1.05]">
              Our <span className="gradient-text">security experts</span>
            </h1>
            <p className="mt-5 text-lg text-fg-muted text-pretty leading-relaxed">
              The certified consultants behind Macksofy — CERT-In empanelled
              auditors, OSCP/OSEP red teamers, DFIR responders, and compliance
              specialists.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p) => (
              <Link
                key={p.slug}
                href={`/team/${p.slug}`}
                className="group rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
              >
                {p.image && (
                  <Image
                    src={p.image}
                    alt={`${p.name}, ${p.jobTitle ?? p.role}`}
                    width={96}
                    height={96}
                    className="size-20 rounded-2xl ring-1 ring-line object-cover"
                  />
                )}
                <h2 className="mt-4 font-display text-lg font-bold text-fg group-hover:text-neon-cyan">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm text-fg-muted">{p.jobTitle ?? p.role}</p>
                {p.credentials && p.credentials.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.credentials.slice(0, 4).map((c) => (
                      <Badge key={c} variant="outline">
                        {c}
                      </Badge>
                    ))}
                  </div>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan">
                  View profile <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
