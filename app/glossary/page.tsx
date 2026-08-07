import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, definedTermSetSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  GLOSSARY,
  GLOSSARY_CATEGORIES,
  glossaryByCategory,
  getGlossaryTerm,
} from "@/content/glossary";

export const metadata = buildMetadata({
  title: "Cybersecurity Glossary — VAPT, CERT-In, SOC & Compliance Terms",
  description:
    "Plain-language definitions of cybersecurity terms — VAPT, red team, SOC, SIEM, DFIR — plus India and GCC compliance: CERT-In, RBI CSF, SEBI CSCRF, DPDP.",
  path: "/glossary",
  keywords: [
    "cybersecurity glossary",
    "what is VAPT",
    "what is CERT-In",
    "what is SOC in cybersecurity",
    "RBI CSF meaning",
    "SEBI CSCRF meaning",
    "DPDP Act meaning",
    "cybersecurity terms India",
  ],
  ogKind: "product",
  ogTitle: "Cybersecurity Glossary",
  ogEyebrow: "Reference",
});

/** Stable anchor id for a category heading. */
const catId = (c: string) =>
  c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function GlossaryPage() {
  return (
    <>
      <JsonLd
        data={[
          definedTermSetSchema(GLOSSARY),
          breadcrumbSchema([{ name: "Glossary", url: "/glossary" }]),
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={50} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-14">
          <Breadcrumbs items={[{ name: "Glossary", href: "/glossary" }]} />
          <div className="mt-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
              <BookOpen className="size-3" /> Reference
            </div>
            <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
              Cybersecurity <span className="gradient-text">Glossary</span>
            </h1>
            <p className="mt-5 text-lg text-fg-muted text-pretty leading-relaxed">
              {GLOSSARY.length} plain-language definitions of the cybersecurity,
              testing, cloud, DFIR, and India &amp; GCC compliance terms Macksofy
              works with every day — each linked to the service or audit it
              relates to.
            </p>
          </div>

          {/* Category jump-nav */}
          <nav
            aria-label="Glossary categories"
            className="mt-8 flex flex-wrap gap-2"
          >
            {GLOSSARY_CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${catId(cat)}`}
                className="rounded-full border border-line bg-bg-2/40 px-3.5 py-1.5 text-xs font-semibold text-fg-muted hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors"
              >
                {cat}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* ─── TERMS BY CATEGORY ─── */}
      {GLOSSARY_CATEGORIES.map((cat, ci) => {
        const terms = glossaryByCategory(cat);
        if (terms.length === 0) return null;
        return (
          <section
            key={cat}
            id={catId(cat)}
            className={`scroll-mt-28 py-16 ${ci % 2 === 1 ? "bg-bg-1" : ""}`}
          >
            <Container>
              <Eyebrow color={ci % 2 === 0 ? "cyan" : "purple"}>{cat}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl text-balance leading-[1.1]">
                {cat}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {terms.map((t) => {
                  const related = (t.related ?? [])
                    .map(getGlossaryTerm)
                    .filter((x): x is NonNullable<typeof x> => Boolean(x));
                  return (
                    <article
                      key={t.slug}
                      id={t.slug}
                      className="scroll-mt-28 rounded-2xl glass p-5 sm:p-6"
                    >
                      <h3 className="font-display text-lg font-bold text-fg leading-snug">
                        {t.term}
                        {t.abbr && (
                          <span className="ml-2 align-middle font-mono text-[11px] font-medium uppercase tracking-wide text-fg-faint">
                            {t.abbr}
                          </span>
                        )}
                      </h3>
                      <p
                        data-speakable="definition"
                        className="mt-3 text-sm text-fg-muted leading-relaxed text-pretty"
                      >
                        {t.definition}
                      </p>

                      {(related.length > 0 || t.link) && (
                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/60 pt-4 text-xs">
                          {related.length > 0 && (
                            <span className="flex flex-wrap items-center gap-2 text-fg-faint">
                              Related:
                              {related.map((r) => (
                                <a
                                  key={r.slug}
                                  href={`#${r.slug}`}
                                  className="font-semibold text-fg-muted hover:text-neon-cyan transition-colors"
                                >
                                  {r.term}
                                </a>
                              ))}
                            </span>
                          )}
                          {t.link && (
                            <Link
                              href={t.link.href}
                              className="ml-auto inline-flex items-center gap-1 font-semibold text-neon-cyan hover:gap-2 transition-all"
                            >
                              {t.link.label}
                              <ArrowRight className="size-3.5" />
                            </Link>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </Container>
          </section>
        );
      })}

      {/* ─── CTA ─── */}
      <section className="py-16">
        <Container>
          <div className="rounded-2xl glass p-8 text-center">
            <Badge variant="cyan">CERT-In Empanelled</Badge>
            <h2 className="mt-4 font-display text-2xl font-black sm:text-3xl text-balance">
              Need one of these turned into an engagement?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-fg-muted leading-relaxed">
              From VAPT and red teaming to CERT-In, RBI, SEBI and DPDP audits —
              Macksofy delivers across India and the UAE.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <LinkButton href="/contact" withArrow>
                Talk to us
              </LinkButton>
              <LinkButton href="/services" variant="outline">
                Browse services
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
