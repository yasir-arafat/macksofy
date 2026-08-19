import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { MetroCoverage } from "@/components/home/MetroCoverage";
import { Testimonials } from "@/components/home/Testimonials";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { COURSES, getCourseBySlug } from "@/content/courses";
import { VENDOR_LOGOS } from "@/content/vendorLogos";
import { formatINR } from "@/lib/utils";
import { metroKeywords } from "@/lib/site";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getShortAnswer } from "@/content/shortAnswers";

// The old title was a city list ("Mumbai · Delhi · Bengaluru · ...") which
// clampTitle truncated to "Cybersecurity Training in Mumbai · Delhi" — a SERP
// line that matched none of the demand this page actually receives. GSC 90d to
// 2026-08-16: the HOMEPAGE absorbs 5,183 training impressions at 0.27% CTR while
// this hub gets 207, because the demand is plain language ("cyber security
// course", "ethical hacking institute near me") and this page spoke only in
// vendor certification codes. Title is `absoluteTitle` so the clamp cannot eat
// the tail again — see the 4 prior occurrences of that defect.
// Deliberately carries NO "CEH" and NO "Mumbai": /training/ceh owns
// `ceh training in mumbai` at 56% CTR and must not be competed with from here.
// NB: do NOT write the brand into this title and set `absoluteTitle`.
// clampTitle() strips a trailing " | Macksofy" on its FIRST line, and
// absoluteTitle then tells buildMetadata the brand is already present so it is
// never re-appended — the brand silently disappears from the SERP line. The
// core below is 49 chars, exactly TITLE_LIMIT_CORE, so the template appends the
// brand itself and the built <title> lands at the full 60.
export const metadata = buildMetadata({
  title: "Cyber Security & Ethical Hacking Courses in India",
  description:
    "21 cyber security and ethical hacking courses — CEH v13, OSCP, CHFI, SOC Analyst and CompTIA. Live online across India and the UAE, or classroom at our Mumbai BKC institute. Mentor until you pass.",
  path: "/training",
  keywords: [
    "cyber security course",
    "ethical hacking course",
    "hacking course",
    "cyber security courses in India",
    "ethical hacking institute",
    "cyber security classes in Mumbai",
    "ethical hacking bootcamp",
    "cyber security course for beginners",
    "cybersecurity training India",
    "cybersecurity training Mumbai",
    "ethical hacking training India",
    "CEH v13 training India",
    "OSCP training India",
    "OSCP coaching Mumbai",
    "OSEP training India",
    "SOC analyst training Mumbai",
    "ethical hacking training UAE",
    ...metroKeywords("cybersecurity training"),
    ...metroKeywords("ethical hacking course"),
    ...metroKeywords("OSCP training"),
    ...metroKeywords("CEH training"),
  ],
});

/**
 * The vocabulary bridge.
 *
 * Every heading on this page used to be a vendor certification code (CEH v13,
 * CHFI v11, OSCP / PEN-200 ...), while the search demand is plain language:
 * "cyber security course", "hacking course", "ethical hacking institute near
 * me". This table is the translation layer — a plain-language goal on the left,
 * the certification that actually serves it on the right.
 *
 * CLAIM DISCIPLINE: every slug below must exist in content/courses.ts. Queries
 * the homepage currently absorbs that map to NO Macksofy product — "python
 * ethical hacking course", "linux hacking course", "ot security training",
 * "cloud security training", "endpoint security course" — are deliberately NOT
 * answered here. Inventing a row for them would be inventing a product.
 */
const COURSE_ROUTES: { goal: string; why: string; slugs: string[] }[] = [
  {
    goal: "I am new to cyber security and want to learn ethical hacking",
    why: "Start with the vendor-neutral fundamentals, then the certification most Indian employers screen for.",
    slugs: ["ceh", "sec-100-cybercore"],
  },
  {
    goal: "I want to prove hands-on hacking skill in a real lab exam",
    why: "Practical, fully hands-on exams — no multiple choice.",
    slugs: ["ceh-practical", "cpent"],
  },
  {
    goal: "I want a penetration testing career",
    why: "The reference certification for offensive roles, plus the EC-Council professional track.",
    slugs: ["oscp", "cpent"],
  },
  {
    goal: "I want to specialise in web application testing",
    why: "Foundational web assessment first, then advanced white-box exploitation.",
    slugs: ["oswa", "oswe", "web-application-security"],
  },
  {
    goal: "I want to work in a SOC or blue team",
    why: "Detection and response tracks, from analyst fundamentals to defensive operations.",
    slugs: ["csa", "soc-analyst", "cysa-plus", "osda"],
  },
  {
    goal: "I want to do digital forensics and incident response",
    why: "Evidence handling, disk and memory forensics, and investigation reporting.",
    slugs: ["chfi"],
  },
  {
    goal: "I want to work in threat intelligence",
    why: "Collection, analysis and dissemination of actionable intelligence.",
    slugs: ["ctia"],
  },
  {
    goal: "I already test networks and want advanced red teaming",
    why: "Evasion, breaching defences and wireless attack specialisation.",
    slugs: ["osep", "oswp"],
  },
  {
    goal: "I want exploit development and reverse engineering",
    why: "Windows user-mode exploit development and macOS control bypasses.",
    slugs: ["osed", "osmr"],
  },
  {
    goal: "I need to get my platform team up to speed on cloud security",
    why: "AWS, Azure and GCP — identity, hardening, logging and cloud attack paths. Runs as a corporate engagement, not a public batch.",
    slugs: ["corporate-training"],
  },
  {
    goal: "I need to train my plant or engineering team on OT / ICS security",
    why: "IEC 62443, the Purdue model, IT-to-OT pivot paths and working safely around live PLCs. Corporate engagement, scoped to your plant.",
    slugs: ["corporate-training"],
  },
  {
    goal: "I need to train an entire team",
    why: "Scoped to your stack and threat model, delivered on-site or virtually.",
    slugs: ["corporate-training"],
  },
];

/** Delivery formats, taken from the `format` field on content/courses.ts. */
const DELIVERY = [
  {
    title: "Classroom — Mumbai BKC",
    body: "Offline batches run at our Mumbai BKC institute. This is the option people mean when they search for a cyber security institute or classes near them.",
  },
  {
    title: "Live online — India & UAE",
    body: "Every course runs live and instructor-led over video, not pre-recorded. Learners join from across India and the UAE on the same batch.",
  },
  {
    title: "Corporate & on-site",
    body: "Customised engagements, typically two to ten days, delivered on-site or virtually for teams in India and the UAE.",
  },
];

const TRAINING_FAQS = [
  {
    q: "Which cyber security course should a beginner start with?",
    a: "CEH v13 is the usual starting point — it assumes no prior offensive-security experience and is the certification most Indian employers screen for. If you want a gentler on-ramp first, SEC-100 (OSCC) covers security essentials over ten weeks. From either one the common next step is OSCP for a penetration testing career, or CSA / the Macksofy SOC Analyst track for a defensive one.",
  },
  {
    q: "Do you run classroom cyber security classes in Mumbai?",
    a: "Yes. Offline batches run at our Mumbai BKC institute, and the same courses also run live online for learners elsewhere in India and the UAE. Course pages list which formats a given certification is offered in.",
  },
  {
    q: "Are these courses online or in person?",
    a: "Both. EC-Council and CompTIA courses are live instructor-led, online or offline at Mumbai BKC. Offensive Security tracks are hybrid — Macksofy mentorship alongside your own OffSec lab access — because the exam and labs are run by the vendor. Nothing is pre-recorded.",
  },
  {
    q: "How long does an ethical hacking course take?",
    a: "CEH v13 is 40 hours, delivered either as five intensive days or across eight weekends. CEH Practical is a 24-hour lab marathon over three days. Offensive Security tracks run longer because they include vendor lab time — OSCP is a 12-week bootcamp alongside 90 days of OffSec lab access and a 24-hour exam.",
  },
  {
    q: "Do I need programming experience or a degree to start?",
    a: "No degree is required. For CEH v13 you need comfort with networking fundamentals and a command line, not programming. Scripting helps considerably from OSCP onward, and is genuinely required for the exploit development tracks (OSED, OSMR). Each course page lists its own prerequisites.",
  },
  {
    q: "Do you offer OT / ICS or cloud security training?",
    a: "Both, but as customised corporate training rather than scheduled public batches — the syllabus depends on the plant or cloud environment being secured, so it is scoped on a discovery call. If you are an individual rather than a team, there is no public OT or cloud batch to join; the nearest scheduled certifications are CEH v13 for offensive fundamentals and CSA for defensive ones.",
  },
  {
    q: "Do you offer placement support after the course?",
    a: "Yes — placement support runs across India and UAE hiring partners, and every track is taught by working pen-testers and SOC engineers rather than career trainers. Mentoring continues until you pass the certification exam.",
  },
];

export default function TrainingPage() {
  const sa = getShortAnswer("hub:training");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Training", url: "/training" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: COURSES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.macksofy.com/training/${c.slug}`,
              name: c.title,
            })),
          },
          faqSchema(TRAINING_FAQS),
        ]}
      />
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="purple" size={600} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs items={[{ name: "Training", href: "/training" }]} />
          <div className="mt-8 max-w-4xl">
            <Eyebrow color="purple">Authorized · EC-Council · CompTIA · Mile2</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Cyber security &amp; ethical hacking courses.{" "}
              <span className="gradient-text">Mentor until you pass.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty max-w-2xl">
              {COURSES.length} courses across 5 career tracks, designed by working
              pen-testers and SOC engineers. 100% practical labs, real-world tooling,
              and placement support across India + UAE hiring partners — live online,
              or in classroom at our Mumbai BKC institute.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/training/offsec"
                className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
              >
                View all OffSec certifications
                <ArrowRight className="size-4" />
              </Link>
              <span className="text-xs text-fg-faint font-mono uppercase tracking-wider">
                OSCP+ · OSEP · OSWE · OSWA · OSDA · OSED · OSMR
              </span>
            </div>
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

      {/* THE VOCABULARY BRIDGE — plain-language goal -> the certification that
          serves it. This is the section that lets this hub receive the generic
          "cyber security course" / "hacking course" demand the homepage has been
          absorbing at 0.27% CTR. Server-rendered, no client component, so every
          word is in the HTML Google parses. */}
      <section className="py-20 bg-bg-1">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Where to start"
              eyebrowColor="purple"
              title={<>Which cyber security course is <span className="gradient-text">right for you?</span></>}
              description="Tell us the outcome you want and we will point you at the certification that gets you there. Every course below is one we actually teach."
            />
          </FadeIn>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {COURSE_ROUTES.map((r) => (
              <div
                key={r.goal}
                className="flex h-full flex-col rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-purple/40 transition-all"
              >
                <h3 className="font-display text-lg font-bold text-fg">&ldquo;{r.goal}&rdquo;</h3>
                <p className="mt-2 text-sm text-fg-muted">{r.why}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.slugs.map((slug) => {
                    const c = getCourseBySlug(slug);
                    if (!c) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/training/${slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1.5 text-xs font-semibold text-neon-cyan hover:bg-neon-cyan/15 transition-colors"
                      >
                        {c.shortTitle}
                        <span className="text-fg-faint font-mono">{c.level}</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW TRAINING IS DELIVERED — serves the "near me" / "classes" /
          "institute" intent that had zero coverage anywhere on this page. */}
      <section className="py-20">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="How it runs"
              title={<>Classroom in Mumbai, or <span className="gradient-text">live online anywhere.</span></>}
            />
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {DELIVERY.map((d) => (
              <div key={d.title} className="rounded-2xl glass p-6">
                <h3 className="font-display text-lg font-bold text-fg">{d.title}</h3>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn>
            <SectionTitle eyebrow="All Courses" title={<>Pick the path that <span className="gradient-text">moves your career.</span></>} />
          </FadeIn>
          <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/training/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="cyan">{c.vendor}</Badge>
                        {c.popular && <Badge variant="amber">Popular</Badge>}
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                          {c.level}
                        </div>
                        <div className="rounded-md bg-bg/60 backdrop-blur px-2 py-1 font-mono text-[10px] font-bold text-neon-cyan">
                          {c.code}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-fg group-hover:text-neon-cyan line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-3">
                      {c.hero.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-fg-faint">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" /> {c.duration.split(" · ")[0]}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="size-3.5" /> {c.level}
                      </span>
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-2 pt-5">
                      <div>
                        {c.priceINR ? (
                          <>
                            {c.originalPriceINR && (
                              <span className="block text-xs text-fg-faint line-through">
                                {formatINR(c.originalPriceINR)}
                              </span>
                            )}
                            <span className="block font-display text-base font-bold text-fg">
                              {formatINR(c.priceINR)}
                              {c.discountPercent && (
                                <span className="ml-2 inline-flex rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white align-middle">
                                  {c.discountPercent}% OFF
                                </span>
                              )}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-fg-muted">Talk to us</span>
                        )}
                      </div>
                      <ArrowRight className="size-4 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* Authorized Partners */}
      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <div className="text-center mb-10">
            <Eyebrow color="amber">Authorized Partners</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              Real vouchers, official labs.{" "}
              <span className="gradient-text">No proxies.</span>
            </h2>
            <p className="mt-3 text-fg-muted max-w-2xl mx-auto text-pretty">
              Macksofy is an authorized partner / accredited training center for the
              certifications below — verified by each vendor.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {VENDOR_LOGOS.map((v) => (
              <div
                key={v.vendor}
                className="group relative rounded-2xl glass p-5 lift overflow-hidden"
              >
                <div className="relative aspect-[1024/699] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 240px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="mt-3 text-center">
                  <div className="font-display text-sm font-bold text-fg">
                    {v.label}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint mt-0.5">
                    {v.vendor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-1">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <Eyebrow color="cyan">Common questions</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
                Choosing a cyber security course in India.
              </h2>
            </FadeIn>
            <div className="mt-10">
              <FAQAccordion faqs={TRAINING_FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <MetroCoverage
        title={
          <>
            Training cohorts in{" "}
            <span className="gradient-text">every Indian metro.</span>
          </>
        }
        description="Weekend on-site cohorts at Macksofy BKC Mumbai · live online cohorts pan-India · corporate-batch delivery at your campus in Delhi, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Gurugram and the UAE."
      />
      <Testimonials />
      <LeadCapture />
    </>
  );
}
