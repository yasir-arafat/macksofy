import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, dynamicOgImagePath } from "@/lib/seo";
import type { BlogPost } from "@/content/blog";
import { POSTS, POSTS_PER_PAGE } from "@/content/blog";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { SITE } from "@/lib/site";

/** Topical featured image for a post, via the /api/og generator (relative). */
const postImage = (p: BlogPost) =>
  dynamicOgImagePath({ title: p.title, eyebrow: p.category, kind: "blog", topic: p.category });

interface PageProps {
  params: Promise<{ page: string }>;
}

const sortedPosts = () =>
  [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

const totalPages = () =>
  Math.max(1, Math.ceil(POSTS.length / POSTS_PER_PAGE));

export function generateStaticParams() {
  // Pages 2 .. N — page 1 is served by /blog/page.tsx
  const tp = totalPages();
  const out: { page: string }[] = [];
  for (let p = 2; p <= tp; p++) {
    out.push({ page: String(p) });
  }
  return out;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isFinite(n) || n < 2) return {};
  return buildMetadata({
    title: `Cybersecurity Blog · Page ${n} — Macksofy`,
    description: `More cybersecurity guides, certification comparisons and India career insights from Macksofy. Page ${n} of ${totalPages()}.`,
    path: `/blog/page/${n}`,
  });
}

export default async function BlogPagedIndex({ params }: PageProps) {
  const { page } = await params;
  const n = Number(page);
  const tp = totalPages();
  if (!Number.isFinite(n) || n < 2 || n > tp) notFound();

  const sorted = sortedPosts();
  const start = (n - 1) * POSTS_PER_PAGE;
  const pagePosts = sorted.slice(start, start + POSTS_PER_PAGE);

  // Build prev/next URLs. Page 2's prev is `/blog`, not `/blog/page/1`.
  const prevHref =
    n === 2 ? `${SITE.url}/blog` : `${SITE.url}/blog/page/${n - 1}`;
  const nextHref = n < tp ? `${SITE.url}/blog/page/${n + 1}` : null;

  return (
    <>
      {/* Pagination chain. React 19 hoists to head. */}
      <link rel="prev" href={prevHref} />
      {nextHref && <link rel="next" href={nextHref} />}
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Blog", url: "/blog" },
            { name: `Page ${n}`, url: `/blog/page/${n}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE.name} — Cybersecurity Blog · Page ${n}`,
            url: `${SITE.url}/blog/page/${n}`,
            blogPost: pagePosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.description,
              url: `${SITE.url}/blog/${p.slug}`,
              datePublished: p.date,
              keywords: p.keywords.join(", "),
              author: { "@type": "Organization", name: SITE.name },
            })),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={50} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={500} />
        <Container className="relative pt-12 pb-10 sm:pt-16">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: `Page ${n}`, href: `/blog/page/${n}` },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>
              Insights · Page {n} of {tp}
            </Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[0.95]">
              More cybersecurity{" "}
              <span className="gradient-text">deep dives.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty">
              Continuing the series — career guides, certification face-offs and
              practical India context from the Macksofy desks.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl glass hover:border-neon-cyan/40 hover:-translate-y-1 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={postImage(p)}
                alt={`${p.title} — ${p.category} · Macksofy`}
                width={1200}
                height={630}
                loading="lazy"
                className="aspect-[1200/630] w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{p.category}</Badge>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-fg group-hover:text-neon-cyan line-clamp-2 leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-fg-muted line-clamp-3 flex-1">
                  {p.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-fg-faint">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(p.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {p.readingTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan">
                    Read <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <BlogPagination current={n} totalPages={tp} />
      </Container>

      <LeadCapture />
    </>
  );
}
