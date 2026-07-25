import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  BookOpen,
  Award,
  Users,
  Briefcase,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, courseProductSchema, courseSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { COURSES, getCourseBySlug } from "@/content/courses";
import { pickRelatedCourses } from "@/lib/related";
import { vendorLogo } from "@/content/vendorLogos";
import { SITE } from "@/lib/site";
import { formatINR } from "@/lib/utils";
import { Outcomes } from "@/components/visuals/outcomes/Outcomes";
import { Curriculum } from "@/components/visuals/curriculum/Curriculum";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { References } from "@/components/sections/References";
import { getShortAnswer } from "@/content/shortAnswers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const c = getCourseBySlug(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.seoTitle,
    description: c.seoDescription,
    path: `/training/${c.slug}`,
    keywords: c.keywords,
    ogKind: "training",
    ogTitle: c.code,
    ogEyebrow: "Macksofy Training",
  });
}

export default async function CourseDetail({ params }: PageProps) {
  const { slug } = await params;
  const c = getCourseBySlug(slug);
  if (!c) notFound();
  const sa = getShortAnswer(`course:${slug}`);
  const related = pickRelatedCourses(c, COURSES, 3);

  return (
    <>
      <JsonLd
        data={[
          courseSchema(c),
          courseProductSchema(c),
          breadcrumbSchema([
            { name: "Training", url: "/training" },
            { name: c.shortTitle, url: `/training/${c.slug}` },
          ]),
          faqSchema(c.faqs),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 right-1/4" color="purple" size={500} />
        <GlowOrb className="-bottom-20 left-1/4" color="cyan" size={400} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Training", href: "/training" },
              { name: c.shortTitle, href: `/training/${c.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              {/* Course thumbnail */}
              <div className="relative aspect-[3/2] mb-8 overflow-hidden rounded-2xl glass bg-bg">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 700px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-bg/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                  {(() => {
                    const v = vendorLogo(c.vendor);
                    return v ? (
                      <div className="flex items-center gap-2 rounded-lg bg-bg/70 backdrop-blur px-2.5 py-1.5 ring-1 ring-line">
                        <div className="relative size-7 rounded bg-white overflow-hidden">
                          <Image
                            src={v.src}
                            alt={v.label}
                            fill
                            sizes="32px"
                            className="object-contain p-0.5"
                          />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-fg">
                          {v.label}
                        </span>
                      </div>
                    ) : (
                      <span className="rounded-lg bg-bg/70 backdrop-blur px-2.5 py-1.5 ring-1 ring-line font-mono text-[10px] uppercase tracking-wider text-neon-cyan">
                        {c.vendor}
                      </span>
                    );
                  })()}
                  <div className="rounded-md bg-bg/70 backdrop-blur px-2 py-1 font-mono text-[10px] font-bold text-neon-cyan">
                    {c.code}
                  </div>
                </div>
              </div>

              <Eyebrow color="purple">{c.hero.eyebrow}</Eyebrow>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="cyan">{c.code}</Badge>
                <Badge variant="outline">{c.level}</Badge>
                {c.popular && <Badge variant="amber">Popular</Badge>}
              </div>
              <h1 className="mt-5 font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
                {c.title}
              </h1>
              <p className="mt-3 text-2xl font-display font-bold gradient-text">
                {c.hero.tagline}
              </p>
              <p className="mt-5 max-w-2xl text-lg text-fg-muted text-pretty">
                {c.hero.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted">
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-neon-cyan" /> {c.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="size-4 text-neon-cyan" /> {c.curriculum.length} modules
                </span>
                <span className="inline-flex items-center gap-2">
                  <Award className="size-4 text-neon-cyan" /> {c.format}
                </span>
              </div>
            </div>

            {/* Sticky enquiry card */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="rounded-2xl glass-strong p-6 glow-blend">
                <Eyebrow>Reserve your seat</Eyebrow>
                <p className="mt-3 font-display text-lg font-bold text-fg">
                  {c.shortTitle} · Next batch
                </p>

                {c.priceINR && (
                  <div className="mt-5">
                    {c.originalPriceINR && c.discountPercent && (
                      <div className="flex flex-wrap items-baseline gap-3 mb-1">
                        <span className="text-fg-faint line-through text-sm">
                          {formatINR(c.originalPriceINR)}
                        </span>
                        <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                          {c.discountPercent}% OFF
                        </span>
                      </div>
                    )}
                    <div className="font-display text-4xl font-black gradient-text leading-none">
                      {formatINR(c.priceINR)}
                    </div>
                    {c.originalPriceINR && (
                      <div className="mt-1 text-xs text-fg-muted">
                        Save {formatINR(c.originalPriceINR - c.priceINR)}
                      </div>
                    )}
                    {c.priceNote && (
                      <p className="mt-3 rounded-md border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs text-amber-200">
                        {c.priceNote}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 grid gap-2.5">
                  <LinkButton
                    href={`/contact?interest=${encodeURIComponent(c.shortTitle + " Training")}`}
                    withArrow
                    className="w-full"
                  >
                    Enroll now
                  </LinkButton>
                  <a
                    href={SITE.whatsappLink(`Hi, I'd like info about the ${c.shortTitle} course.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                  <Link
                    href={`/training/${c.slug}/brochure?print=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${c.shortTitle} brochure as PDF`}
                    className="flex items-center justify-center gap-2 rounded-full border border-line bg-bg-2 px-5 py-2.5 text-sm font-semibold text-fg-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors"
                  >
                    Download brochure (PDF)
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  {[
                    ["EMI", "3 / 6 / 12 months"],
                    ["Format", c.format.includes("Online") ? "Online + Mumbai" : c.format],
                    ["Mentor", "Until you pass"],
                    ["Vouchers", c.priceNote ? "Extra" : "Included"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-md bg-white/5 p-2">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                        {k}
                      </div>
                      <div className="text-fg mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* SHORT ANSWER (AEO/GEO) */}
      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      {/* OUTCOMES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>What you&rsquo;ll be able to do</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Outcomes — concrete, measurable.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
            Every capability you walk away with, mapped to the cybersecurity
            domains and the career roles they unlock in India + UAE.
          </p>
          <div className="mt-10">
            <Outcomes
              slug={c.slug}
              outcomes={c.outcomes}
              careerRoles={c.careerRoles}
              duration={c.duration}
              courseShortTitle={c.shortTitle}
            />
          </div>
        </Container>
      </section>

      {/* CURRICULUM */}
      <section className="py-20">
        <Container>
          <Eyebrow color="purple">Curriculum</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            {c.curriculum.length} modules.{" "}
            {c.duration.split(" · ")[1] ?? c.duration}.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
            Search modules and topics, and switch between Split and Track views to
            see how every module flows into the next.
          </p>
          <div className="mt-10">
            <Curriculum
              slug={c.slug}
              modules={c.curriculum}
              courseShortTitle={c.shortTitle}
              duration={c.duration}
            />
          </div>
        </Container>
      </section>

      {/* TOOLS */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Tools you&rsquo;ll operate</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
                The same toolkit our consultants{" "}
                <span className="gradient-text">use on real engagements.</span>
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                Not academic exercises. The tools below are exactly what Macksofy
                consultants run on paying client engagements every week — so the muscle
                memory you build in class carries straight into your first job.
              </p>
            </div>
            <div className="lg:col-span-7 rounded-2xl glass p-6">
              <ToolStack tools={c.toolsCovered.map((t) => ({ name: t }))} title="Tooling stack" />
            </div>
          </div>
        </Container>
      </section>

      {/* CAREERS */}
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Career outcomes</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
            What roles open up after you complete this.
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead className="bg-bg-2 text-fg-muted">
                <tr>
                  <th className="text-left p-4 font-mono text-xs uppercase tracking-wider">Role</th>
                  <th className="text-left p-4 font-mono text-xs uppercase tracking-wider">Salary band</th>
                  <th className="text-left p-4 font-mono text-xs uppercase tracking-wider">Experience</th>
                </tr>
              </thead>
              <tbody>
                {c.careerRoles.map((r) => (
                  <tr key={r.role} className="border-t border-line">
                    <td className="p-4 text-fg font-semibold">
                      <Briefcase className="inline-block size-4 text-neon-cyan mr-2 -mt-0.5" />
                      {r.role}
                    </td>
                    <td className="p-4 text-fg gradient-text font-bold">{r.salaryINR}</td>
                    <td className="p-4 text-fg-muted">{r.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* PLACEMENT */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow color="green">Placement support</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
                We don&rsquo;t promise jobs.{" "}
                <span className="gradient-text">We open doors.</span>
              </h2>
              <p className="mt-5 text-fg-muted">{c.placement.summary}</p>
            </div>
            <ul className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {c.placement.points.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl glass p-4">
                  <Users className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      {c.testimonials.length > 0 && (
        <section className="py-20">
          <Container>
            <Eyebrow color="purple">Alumni voices</Eyebrow>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {c.testimonials.map((t, i) => (
                <div key={i} className="rounded-2xl glass p-6">
                  <p className="font-display text-lg text-fg leading-relaxed text-balance">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 text-sm">
                    <span className="font-bold text-fg">{t.name}</span>
                    <span className="text-fg-muted"> · {t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              Things students ask before enrolling.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={c.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-20">
          <Container>
            <Eyebrow color="purple">Other career tracks</Eyebrow>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/training/${r.slug}`}
                  className="group flex flex-col rounded-2xl glass overflow-hidden hover:border-neon-cyan/40 transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width:768px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <Badge variant="cyan">{r.code}</Badge>
                    <h3 className="mt-3 font-display text-base font-bold text-fg group-hover:text-neon-cyan line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-2">
                      {r.hero.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <References pageKey={`course:${c.slug}`} />

      <LeadCapture />
    </>
  );
}
