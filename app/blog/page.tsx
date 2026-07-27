import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
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
import { POSTS, POST_CATEGORIES, POSTS_PER_PAGE } from "@/content/blog";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { SITE } from "@/lib/site";

/** Topical featured image for a post, via the /api/og generator (relative). */
const postImage = (p: BlogPost) =>
  dynamicOgImagePath({ title: p.title, eyebrow: p.category, kind: "blog", topic: p.category });

export const metadata = buildMetadata({
  title: "Cybersecurity Blog & Career Guides — Macksofy",
  description:
    "In-depth guides on penetration testing certifications, Active Directory attacks, blue-team analysis, AI security and India BFSI cybersecurity. Written by CERT-In empanelled consultants.",
  path: "/blog",
  keywords: [
    "cybersecurity blog India",
    "OSCP CRTP CRTO blog",
    "Active Directory pentest blog",
    "MCP security blog",
    "SOC analyst blog India",
    "Macksofy cybersecurity guides",
  ],
});

export default function BlogIndexPage() {
  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const totalPages = Math.max(1, Math.ceil(sorted.length / POSTS_PER_PAGE));
  const pagePosts = sorted.slice(0, POSTS_PER_PAGE);
  const featured = pagePosts[0];
  const rest = pagePosts.slice(1);

  return (
    <>
      {/* Pagination chain — rel="next" points at the next page so
          Bing crawls efficiently and browsers can prefetch. No "prev"
          on page 1 because there isn't one. React 19 hoists to head. */}
      {totalPages > 1 && (
        <link rel="next" href={`${SITE.url}/blog/page/2`} />
      )}
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Blog", url: "/blog" }]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE.name} — Cybersecurity Blog`,
            url: `${SITE.url}/blog`,
            description:
              "Original guides on offensive security, blue-team operations, certifications and India regulatory cybersecurity by Macksofy consultants.",
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
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <GlowOrb className="bottom-0 right-1/3" color="purple" size={400} />
        <Container className="relative pt-12 pb-16 sm:pt-16">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Insights · Updated weekly</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
                Cybersecurity insights{" "}
                <span className="gradient-text">from the trenches.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                Hands-on guides on offensive security, blue-team operations,
                certifications and India regulatory cybersecurity — written by
                Macksofy consultants who run the engagements.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="rounded-2xl glass p-5 w-full max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-black gradient-text leading-none">
                      {POSTS.length}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint mt-1">
                      Long-form guides
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {POST_CATEGORIES.map((c) => (
                    <Badge key={c} variant="neutral">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      <Container className="pb-12">
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-2xl glass overflow-hidden ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
        >
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={postImage(featured)}
                alt={`${featured.title} — ${featured.category} · Macksofy`}
                width={1200}
                height={630}
                fetchPriority="high"
                className="h-full w-full object-cover min-h-[240px]"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="cyan">Featured</Badge>
                <Badge variant="purple">{featured.category}</Badge>
              </div>
              <h2 className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-fg group-hover:text-neon-cyan transition-colors leading-tight text-balance">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-fg-muted text-pretty">
                {featured.description}
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs text-fg-faint">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(featured.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" /> {featured.readingTime}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan">
                Read article <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </Link>
      </Container>

      {/* GRID */}
      <Container className="pb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
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
        <BlogPagination current={1} totalPages={totalPages} />
      </Container>

      <LeadCapture />
    </>
  );
}
