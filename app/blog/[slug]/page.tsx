import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { References } from "@/components/sections/References";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getShortAnswer } from "@/content/shortAnswers";
import { buildMetadata } from "@/lib/seo";
import { POSTS, getPostBySlug } from "@/content/blog";
import type { BlogBlock } from "@/content/blog";
import { getAuthor, authorSchema } from "@/content/authors";
import { SERVICES } from "@/content/services";
import { BlogContent, BlogToc } from "@/components/blog/BlogContent";
import { SITE } from "@/lib/site";
import { dynamicOgImage, dynamicOgImagePath } from "@/lib/seo";

/**
 * Word count from a post's blocks — used in BlogPosting schema's
 * `wordCount` field. Google references it for read-time signals; AI
 * search engines use it to gauge depth before deciding to cite.
 */
function postWordCount(blocks: BlogBlock[]): number {
  let words = 0;
  for (const b of blocks) {
    if ("text" in b && typeof b.text === "string") {
      words += b.text.trim().split(/\s+/).filter(Boolean).length;
    }
    if ("rows" in b && Array.isArray((b as { rows: string[][] }).rows)) {
      for (const row of (b as { rows: string[][] }).rows) {
        for (const cell of row) {
          words += cell.trim().split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }
  return words;
}

/** Pull the first lead block as the article body excerpt for schema. */
function postExcerpt(blocks: BlogBlock[]): string {
  const lead = blocks.find((b) => b.type === "lead") as
    | Extract<BlogBlock, { type: "lead" }>
    | undefined;
  return lead?.text ?? "";
}

/**
 * Pick up to 3 services to surface as "related" on a blog post.
 * Heuristic: case-insensitive substring match between any of the
 * post's tags / keywords and service shortTitle. If nothing matches,
 * fall back to the universal-intent set (VAPT, Pentest, MSSP) which
 * fits most cybersecurity-blog readers. Server-side, no allocation
 * per-render at scale — runs once per post during SSG.
 */
function pickRelatedServices(tags: string[], keywords: string[]) {
  const haystack = [...tags, ...keywords].map((s) => s.toLowerCase());
  const scored = SERVICES.map((s) => {
    const needle = s.shortTitle.toLowerCase();
    const matches = haystack.filter(
      (h) => h.includes(needle) || needle.includes(h.split(" ")[0])
    ).length;
    return { service: s, matches };
  })
    .filter((r) => r.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 3)
    .map((r) => r.service);
  if (scored.length >= 2) return scored;
  const defaults = ["vapt", "penetration-testing", "managed-soc"];
  return defaults
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    keywords: p.keywords,
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
    authors: [p.author],
    ogKind: "blog",
    ogTitle: p.title,
    ogEyebrow: p.category,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) notFound();
  const related = POSTS.filter((r) => r.slug !== p.slug)
    .filter((r) => r.category === p.category || r.tags.some((t) => p.tags.includes(t)))
    .slice(0, 3);
  const fallbackRelated = POSTS.filter((r) => r.slug !== p.slug).slice(0, 3);
  const finalRelated = related.length > 0 ? related : fallbackRelated;
  const url = `${SITE.url}/blog/${p.slug}`;
  const author = getAuthor(p.author);
  const relatedServices = pickRelatedServices(p.tags, p.keywords);
  const wordCount = postWordCount(p.blocks);
  const excerpt = postExcerpt(p.blocks);
  const shortAnswer = getShortAnswer(`blog:${p.slug}`);
  const postOgImage = dynamicOgImage({
    title: p.title,
    eyebrow: p.category,
    kind: "blog",
    topic: p.category,
  });
  // Same image, relative path — rendered as the on-page featured hero.
  const heroImage = dynamicOgImagePath({
    title: p.title,
    eyebrow: p.category,
    kind: "blog",
    topic: p.category,
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Blog", url: "/blog" },
            { name: p.title, url: `/blog/${p.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: p.title,
            description: p.description,
            // `image` as an array satisfies Google's Article rich-result
            // requirement (≥1 image, ideally with aspect ratios for
            // 16x9 / 4x3 / 1x1). The dynamic OG image is 1200x630
            // (16x9-ish) — single entry is OK, Google fills missing
            // aspect ratios from this one if needed.
            image: [postOgImage],
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            keywords: p.keywords.join(", "),
            articleSection: p.category,
            wordCount,
            ...(excerpt && { articleBody: excerpt }),
            isAccessibleForFree: true,
            inLanguage: "en-IN",
            author: authorSchema(author),
            // reviewedBy — E-E-A-T signal when a post is reviewed by a second
            // credentialed author. Only emitted when a real reviewer is set.
            ...(p.reviewer && p.reviewer !== p.author
              ? { reviewedBy: authorSchema(getAuthor(p.reviewer)) }
              : {}),
            publisher: {
              "@type": "Organization",
              "@id": `${SITE.url}#organization`,
              name: SITE.name,
              url: SITE.url,
              logo: {
                "@type": "ImageObject",
                url: `${SITE.url}/logo.png`,
              },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            isPartOf: { "@id": `${SITE.url}#website` },
            about: p.tags.map((t) => ({ "@type": "Thing", name: t })),
            // speakable: marks parts of the page that voice assistants
            // (Google Assistant, Bing voice) are licensed to read aloud
            // and AI summarisers prefer when extracting a one-line
            // takeaway. CSS-selector form — Google's recommended shape.
            // AnswerBox only renders when this post has a shortAnswers entry
            // (10 of 49 posts), so claim its selector only when it is really
            // in the DOM — a selector that matches nothing is a dead promise.
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [
                "h1",
                "[data-speakable='lead']",
                ...(shortAnswer ? ["[data-speakable='answer']"] : []),
                "article h2",
              ],
            },
          },
          ...(p.faqs
            ? [faqSchema(p.faqs, { answerBox: Boolean(shortAnswer) })]
            : []),
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={45} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={500} />
        <Container className="relative pt-10 pb-10 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: p.title, href: `/blog/${p.slug}` },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-7">
              {p.heroEyebrow && <Eyebrow>{p.heroEyebrow}</Eyebrow>}
              <h1 className="mt-5 font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
                {p.title}
              </h1>
              <p className="mt-5 text-lg text-fg-muted text-pretty">
                {p.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="cyan">
                    <Tag className="size-3" /> {t}
                  </Badge>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-faint">
                <span className="inline-flex items-center gap-2">
                  <User className="size-4 text-neon-cyan" />{" "}
                  {author.type === "person" ? (
                    <Link
                      href={`/team/${author.slug}`}
                      className="font-medium hover:text-neon-cyan transition-colors"
                    >
                      {p.author}
                    </Link>
                  ) : (
                    p.author
                  )}
                  {p.authorRole && (
                    <span className="text-fg-faint/70">· {p.authorRole}</span>
                  )}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4 text-neon-cyan" />
                  {new Date(p.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-neon-cyan" /> {p.readingTime}
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              {/* LCP: on mobile this two-column grid stacks, so the featured
                  card sits BELOW the fold — the measured LCP element is the
                  <h1> above. It was nevertheless marked fetchPriority="high",
                  which told the browser to race a 1200x630 PNG from the
                  /api/og Satori endpoint against the CSS and font needed to
                  paint that h1. On a mobile connection that is bandwidth
                  stolen directly from LCP.
                  Now lazy at default priority: it loads after the
                  above-the-fold work on mobile, and is still fetched promptly
                  on desktop where it IS in the initial viewport.
                  Deliberately a plain <img> rather than next/image — Vercel's
                  optimizer does not transform Function-sourced images, so the
                  optimizer hop returns a byte-identical PNG with weaker
                  caching than this endpoint's own 1-year immutable header.
                  See the note in app/api/og/route.tsx before trying again.
                  width/height reserve the aspect box, so nothing shifts
                  (CLS unchanged). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${p.title} — ${p.category} · Macksofy`}
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-2xl border border-line shadow-2xl shadow-black/40"
              />
            </div>
          </div>
        </Container>
      </section>

      {shortAnswer && (
        <Container className="pt-2">
          <div className="max-w-3xl lg:ml-[25%]">
            <AnswerBox q={shortAnswer.q} a={shortAnswer.a} />
          </div>
        </Container>
      )}

      <Container className="py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3 hidden lg:block">
            <BlogToc blocks={p.blocks} />
          </aside>
          <article className="lg:col-span-9 min-w-0 w-full max-w-3xl mx-auto lg:mx-0 prose-article">
            <BlogContent blocks={p.blocks} />
          </article>
        </div>
      </Container>

      {p.faqs && p.faqs.length > 0 && (
        <section className="py-16 bg-bg-1">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black text-fg sm:text-4xl text-balance">
                Quick answers.
              </h2>
              <div className="mt-10">
                <FAQAccordion faqs={p.faqs} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {finalRelated.length > 0 && (
        <section className="py-16">
          <Container>
            <Eyebrow color="purple">Read next</Eyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-fg">
              Related articles
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {finalRelated.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl glass p-5 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all flex flex-col"
                >
                  <Badge variant="purple" className="self-start">{r.category}</Badge>
                  <h3 className="mt-4 font-display font-bold text-fg group-hover:text-neon-cyan line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-3 flex-1">
                    {r.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Read article <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="py-16 bg-bg-1">
          <Container>
            <Eyebrow color="cyan">Macksofy delivers</Eyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-fg">
              Need help putting this into practice?
            </h2>
            <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
              These Macksofy engagements line up with the topics in this post —
              fixed-price proposals within 48 hours, CERT-In format reports.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-2xl glass p-5 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all flex flex-col"
                >
                  <Badge variant="cyan" className="self-start">
                    {s.category}
                  </Badge>
                  <h3 className="mt-4 font-display font-bold text-fg group-hover:text-neon-cyan">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-3 flex-1">
                    {s.hero.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Explore service <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <References pageKey={`blog:${p.slug}`} />

      <LeadCapture />
    </>
  );
}
