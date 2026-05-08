import { ScrollText, ListChecks, Sparkles, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  ResourceGrid,
  type BrochureEntry,
} from "@/components/resources/ResourceGrid";
import { RESOURCES } from "@/content/resources";
import { COURSES } from "@/content/courses";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title:
    "Cybersecurity Resources — Whitepapers, Checklists, Cheat Sheets, Brochures | Macksofy",
  description:
    "Free downloadable cybersecurity resources from Macksofy: whitepapers (CSCRF, ransomware, OT/IT, mobile BFSI), single-page checklists (CERT-In, RBI CSF, BOLA, JWT, M365) and 22 course brochures. CERT-In empanelled.",
  path: "/resources",
  keywords: [
    "cybersecurity whitepaper India",
    "CERT-In checklist",
    "SEBI CSCRF whitepaper",
    "RBI cyber security framework checklist",
    "mobile app security BFSI India",
    "ransomware whitepaper India",
    "cybersecurity resources India",
    "Macksofy resources",
  ],
});

const STATS = [
  { value: `${RESOURCES.filter((r) => r.type === "Whitepaper").length}`, label: "Whitepapers", icon: ScrollText },
  { value: `${RESOURCES.filter((r) => r.type === "Checklist").length}`, label: "Checklists", icon: ListChecks },
  { value: `${RESOURCES.filter((r) => r.type === "Cheat Sheet").length}`, label: "Cheat Sheets", icon: Sparkles },
  { value: `${COURSES.length}`, label: "Course Brochures", icon: FileText },
];

export default function ResourcesIndexPage() {
  const brochures: BrochureEntry[] = COURSES.map((c) => ({
    slug: `brochure-${c.slug}`,
    title: `${c.title} — Brochure`,
    subtitle: `Curriculum, outcomes, prerequisites, fees and placement support for ${c.shortTitle}. ${c.duration}.`,
    href: `/training/${c.slug}/brochure`,
    pageCount: "Course brochure",
    topics: [c.vendor, c.level, "Training"],
  }));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/resources#list`,
    name: "Macksofy Cybersecurity Resources",
    description:
      "Free cybersecurity whitepapers, checklists, cheat sheets and course brochures from CERT-In empanelled Macksofy.",
    itemListElement: [
      ...RESOURCES.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}/resources/${r.slug}`,
        name: r.title,
      })),
      ...COURSES.map((c, i) => ({
        "@type": "ListItem",
        position: RESOURCES.length + i + 1,
        url: `${SITE.url}/training/${c.slug}/brochure`,
        name: `${c.title} — Brochure`,
      })),
    ],
  };

  return (
    <>
      <JsonLd
        data={[
          collectionSchema,
          breadcrumbSchema([{ name: "Resources", url: "/resources" }]),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <ParticleBackground density={70} className="absolute inset-0" />
        <GlowOrb className="-top-40 -left-32" color="cyan" size={520} />
        <GlowOrb
          className="-bottom-40 -right-32"
          color="purple"
          size={520}
          intensity="soft"
        />

        <Container className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <Breadcrumbs items={[{ name: "Resources", href: "/resources" }]} />

          <div className="mt-10 max-w-4xl">
            <Eyebrow>Free · Practitioner-grade · India + UAE context</Eyebrow>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.02]">
              Cybersecurity playbooks,{" "}
              <span className="gradient-text">straight from the field.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted text-pretty">
              Whitepapers, single-page checklists and cheat sheets pulled
              straight from Macksofy&rsquo;s real engagement playbooks — plus
              every course brochure in one place. No email gates, no fluff.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl glass p-5 ring-1 ring-white/10"
                >
                  <Icon className="size-5 text-neon-cyan" />
                  <div className="mt-3 font-display text-3xl font-black gradient-text leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-xs font-mono uppercase tracking-[0.18em] text-fg-faint">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionTitle
            eyebrow="All resources"
            title={
              <>
                Filter by type,{" "}
                <span className="gradient-text">topic or sector.</span>
              </>
            }
            description="Whitepapers and checklists open print-ready pages — hit Print / Save as PDF for an offline copy. Brochures live alongside their training course."
          />
          <div className="mt-12">
            <ResourceGrid brochures={brochures} />
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
