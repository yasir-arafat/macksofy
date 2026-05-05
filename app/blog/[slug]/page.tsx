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
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { POSTS, getPostBySlug } from "@/content/blog";
import { BlogContent, BlogToc } from "@/components/blog/BlogContent";
import { BlogHeroVisual } from "@/components/blog/BlogHero";
import { SITE } from "@/lib/site";

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
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            keywords: p.keywords.join(", "),
            articleSection: p.category,
            inLanguage: "en-IN",
            author: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
            },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              logo: {
                "@type": "ImageObject",
                url: `${SITE.url}/logo.png`,
              },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          },
          ...(p.faqs ? [faqSchema(p.faqs)] : []),
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
                  <User className="size-4 text-neon-cyan" /> {p.author}
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
              <BlogHeroVisual kind={p.heroKind} slug={p.slug} />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3 hidden lg:block">
            <BlogToc blocks={p.blocks} />
          </aside>
          <article className="lg:col-span-9 max-w-3xl mx-auto lg:mx-0 prose-article">
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
                  className="group rounded-2xl glass p-5 hover:border-neon-cyan/40 transition-all flex flex-col"
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

      <LeadCapture />
    </>
  );
}
