import { notFound } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import type { Metadata } from "next";
import { PrintLayout } from "@/components/print/PrintLayout";
import { ResourceContent } from "@/components/resources/ResourceContent";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getShortAnswer } from "@/content/shortAnswers";
import { RESOURCES, getResourceBySlug } from "@/content/resources";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { pickAuditsForResource } from "@/lib/related";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const r = getResourceBySlug(slug);
  if (!r) return {};
  return buildMetadata({
    title: r.seoTitle,
    description: r.seoDescription,
    path: `/resources/${r.slug}`,
    keywords: r.keywords,
    type: "article",
    publishedTime: `${r.publishedYear}-01-01`,
  });
}

function articleSchema(
  r: ReturnType<typeof getResourceBySlug>,
  hasAnswerBox: boolean,
) {
  if (!r) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/resources/${r.slug}#article`,
    headline: r.title,
    description: r.summary,
    url: `${SITE.url}/resources/${r.slug}`,
    image: `${SITE.url}${SITE.ogImage}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE.url}#website` },
    publisher: { "@id": `${SITE.url}#organization` },
    author: { "@id": `${SITE.url}#organization` },
    datePublished: `${r.publishedYear}-01-01`,
    // Mirrors the blog convention (dateModified: updated ?? published) — falls
    // back to the publication date when a resource has never been revised, so
    // the value stays truthful rather than absent.
    dateModified: r.updated ?? `${r.publishedYear}-01-01`,
    keywords: r.keywords.join(", "),
    about: r.topics.map((t) => ({ "@type": "Thing", name: t })),
    articleSection: r.type,
    // speakable: same rule as the blog's BlogPosting node — claim a selector
    // only where the markup really exists. "h1" is always rendered by
    // PrintLayout's cover page; the AnswerBox hook is claimed only when this
    // resource has a `resource:` entry in shortAnswers.ts. A selector that
    // matches nothing is a dead promise (see 9a8881f).
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        "h1",
        ...(hasAnswerBox ? ["[data-speakable='answer']"] : []),
      ],
    },
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const r = getResourceBySlug(slug);
  if (!r) notFound();
  if (!r.blocks) notFound();

  const shortAnswer = getShortAnswer(`resource:${r.slug}`);
  const schema = articleSchema(r, Boolean(shortAnswer));
  const related = r.relatedServiceSlugs
    ?.map((s) => SERVICES.find((sv) => sv.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s)) ?? [];
  const relatedAudits = pickAuditsForResource(r, AUDITS, 2);

  return (
    <>
      <JsonLd
        data={[
          ...(schema ? [schema] : []),
          breadcrumbSchema([
            { name: "Resources", url: "/resources" },
            { name: r.title, url: `/resources/${r.slug}` },
          ]),
        ]}
      />
      <PrintLayout
        eyebrow={`${r.type} · ${r.publishedYear}`}
        title={r.title}
        subtitle={r.subtitle}
        refNo={r.refNo}
        backHref="/resources"
        classification="Public · Free to share"
      >
        {/* Short answer — the extractable 40–60-word answer to the document's
            core query, above the prose intro so AI/voice extractors hit it
            first. tone="print" because PrintLayout is a light document; the
            default screen tone would be white-on-white here. Hidden from the
            printed PDF, which opens on its own cover page and intro. */}
        {shortAnswer && (
          <section className="print-section mb-10 not-prose print:hidden">
            <AnswerBox q={shortAnswer.q} a={shortAnswer.a} tone="print" />
          </section>
        )}

        {/* Intro */}
        {r.intro && (
          <section className="print-section mb-10 not-prose">
            <p className="text-lg leading-relaxed text-slate-700">{r.intro}</p>
          </section>
        )}

        {/* Designed PDF download — only for resources with a branded PDF edition */}
        {r.pdfHref && (
          <section className="print-section mb-10 not-prose print:hidden">
            <a
              href={r.pdfHref}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              <Download className="size-4" />
              Download the PDF — {r.pageCount}
            </a>
          </section>
        )}

        {/* Body blocks */}
        <section className="print-section">
          <ResourceContent blocks={r.blocks} />
        </section>

        {/* Related services + audits */}
        {(related.length > 0 || relatedAudits.length > 0) && (
          <section className="print-section mt-14 not-prose print:break-inside-avoid">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Engage Macksofy
              </div>
              <div className="mt-2 font-display text-xl font-bold text-slate-900">
                Need this in production, not on paper?
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Macksofy offers full-service engagements that map directly to
                this resource. Common starting points:
              </p>
              <ul className="mt-4 space-y-2">
                {related.map((s) => (
                  <li key={s.slug} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-700" />
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm font-semibold text-slate-900 hover:underline"
                    >
                      {s.title} →
                    </Link>
                  </li>
                ))}
                {relatedAudits.map((a) => (
                  <li key={a.slug} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-700" />
                    <Link
                      href={`/audit/${a.slug}`}
                      className="text-sm font-semibold text-slate-900 hover:underline"
                    >
                      {a.title} audit →
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-sm text-slate-600">
                Or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-slate-900 hover:underline"
                >
                  talk to a senior consultant
                </Link>{" "}
                — fixed-price proposal in 48 hours.
              </div>
            </div>
          </section>
        )}
      </PrintLayout>
    </>
  );
}
