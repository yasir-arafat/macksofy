import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, dynamicOgImagePath } from "@/lib/seo";
import { POSTS, type BlogPost } from "@/content/blog";
import { TOPIC_HUBS, getTopicHubBySlug } from "@/content/topicHubs";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOPIC_HUBS.map((hub) => ({ slug: hub.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const hub = getTopicHubBySlug(slug);
  if (!hub) return {};
  return buildMetadata({
    title: hub.seoTitle,
    absoluteTitle: true,
    description: hub.description,
    path: `/blog/category/${hub.slug}`,
    keywords: hub.keywords,
    ogKind: "blog",
    ogTitle: hub.title,
    ogEyebrow: "Topic Hub",
  });
}

const postImage = (post: BlogPost) =>
  dynamicOgImagePath({
    title: post.title,
    eyebrow: post.category,
    kind: "blog",
    topic: post.category,
  });

export default async function TopicHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getTopicHubBySlug(slug);
  if (!hub) notFound();

  const posts = hub.postSlugs
    .map((postSlug) => POSTS.find((post) => post.slug === postSlug))
    .filter((post): post is BlogPost => Boolean(post));
  const [featured, ...remaining] = posts;
  const pageUrl = `${SITE.url}/blog/category/${hub.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Blog", url: "/blog" },
            { name: hub.name, url: `/blog/category/${hub.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${pageUrl}#collection`,
            name: hub.title,
            description: hub.description,
            url: pageUrl,
            inLanguage: "en-IN",
            isPartOf: { "@id": `${SITE.url}#website` },
            about: hub.keywords.map((name) => ({ "@type": "Thing", name })),
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: posts.length,
              itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: post.title,
                url: `${SITE.url}/blog/${post.slug}`,
              })),
            },
          },
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={55} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={560} />
        <GlowOrb className="bottom-0 right-1/4" color="purple" size={360} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-24">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: hub.name, href: `/blog/category/${hub.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Topic hub · {posts.length} guides</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.02]">
                {hub.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-fg-muted text-pretty leading-relaxed">
                {hub.description}
              </p>
            </div>
            <div className="lg:col-span-4">
              <Link
                href={hub.primaryService.href}
                className="group block rounded-2xl glass-strong p-6 ring-1 ring-neon-cyan/30 hover:ring-neon-cyan/60 transition-colors"
              >
                <Eyebrow color="purple">Commercial service</Eyebrow>
                <h2 className="mt-3 font-display text-xl font-bold text-fg group-hover:text-neon-cyan">
                  {hub.primaryService.label}
                </h2>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                  {hub.primaryService.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                  View service <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 border-y border-line bg-bg-1">
        <Container>
          <AnswerBox q={hub.answerQuestion} a={hub.answer} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5 text-fg-muted leading-relaxed text-pretty">
              <Eyebrow>How to use this hub</Eyebrow>
              {hub.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="lg:col-span-5 rounded-2xl glass p-6">
              <Eyebrow color="amber">What you can decide</Eyebrow>
              <ul className="mt-5 space-y-3">
                {hub.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm text-fg-muted leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-cyan" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {featured && (
        <section className="pb-20">
          <Container>
            <Eyebrow color="purple">Start here</Eyebrow>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-6 grid overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 transition-colors lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={postImage(featured)}
                  alt={featured.title}
                  width={1200}
                  height={630}
                  className="h-full min-h-[260px] w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-7">
                <Badge variant="cyan" className="self-start">Buyer guide</Badge>
                <h2 className="mt-4 font-display text-2xl font-black text-fg group-hover:text-neon-cyan sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-fg-muted leading-relaxed">
                  {featured.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan">
                  Read the guide <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      <section className="py-20 bg-bg-1">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Learning path</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black text-fg sm:text-4xl">
                Continue through the topic.
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-sm text-fg-faint sm:flex">
              <BookOpen className="size-4" /> {remaining.length} more guides
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remaining.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={postImage(post)}
                  alt={post.title}
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="aspect-[1200/630] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <Badge variant="purple" className="self-start">{post.category}</Badge>
                  <h3 className="mt-3 font-display text-lg font-bold text-fg group-hover:text-neon-cyan line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-fg-muted line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-fg-faint">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {post.readingTime}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-neon-cyan">
                      Read <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Eyebrow color="purple">Explore another topic</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {TOPIC_HUBS.filter((other) => other.slug !== hub.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/blog/category/${other.slug}`}
                className="rounded-full border border-line bg-bg-2 px-4 py-2 text-sm font-semibold text-fg-muted hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
