import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  Cloud,
  Code2,
  Crosshair,
  Factory,
  FileBarChart,
  GitBranch,
  MapPin,
  MonitorPlay,
  Presentation,
  Radar,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { References } from "@/components/sections/References";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getCourseBySlug } from "@/content/courses";
import { getShortAnswer } from "@/content/shortAnswers";
import { SITE } from "@/lib/site";

// Dedicated B2B page. It replaces the generic course template at this URL
// (the [slug] route skips this slug), because a buyer scoping training for a
// team needs tracks, process and delivery — not a fee, EMI or placement block.
// Track content, SEO title and keywords still live in content/courses.ts, so
// the /training catalogue card and this page cannot drift apart.
const SLUG = "corporate-training";
const PATH = `/training/${SLUG}`;
const course = getCourseBySlug(SLUG)!;
const shortAnswer = getShortAnswer(`course:${SLUG}`);

/** Per-track icon plus the consulting service the track is drawn from. */
const TRACK_META: Record<string, { icon: LucideIcon; service?: { href: string; label: string } }> = {
  "Track A": { icon: Code2, service: { href: "/services/source-code-review", label: "Source code review" } },
  "Track B": { icon: GitBranch, service: { href: "/services/web-application-security", label: "Application security" } },
  "Track C": { icon: Radar, service: { href: "/services/managed-soc", label: "Managed SOC" } },
  "Track D": { icon: Presentation, service: { href: "/services/vciso", label: "vCISO" } },
  "Track E": { icon: Crosshair, service: { href: "/services/red-teaming", label: "Red teaming" } },
  "Track F": { icon: Cloud, service: { href: "/services/cloud-security", label: "Cloud security" } },
  "Track G": { icon: Factory, service: { href: "/services/iot-ot-security", label: "IoT / OT security" } },
};

const AWARENESS_TRACK = {
  module: "Track H · Security Awareness for All Staff",
  topics: [
    "Phishing, social engineering and how staff should report what they see",
    "A click-rate baseline from a phishing simulation, measured again after training",
    "The awareness-evidence pack auditors ask for under RBI, SEBI and ISO 27001",
  ],
};

const TRACKS = [
  ...course.curriculum.map((t) => ({
    module: t.module,
    topics: t.topics,
    ...TRACK_META[t.module.split(" · ")[0]],
  })),
  {
    ...AWARENESS_TRACK,
    icon: Users,
    service: { href: "/services/phishing-simulation", label: "Phishing simulation" },
  },
];

const PROCESS = [
  {
    icon: Users,
    title: "Discovery call",
    body: "We find out who is being trained, what they work on day to day, and what has to change: an audit finding, a new platform, a team that has just been hired.",
  },
  {
    icon: ClipboardCheck,
    title: "Needs assessment",
    body: "A short pre-assessment shows where the team actually stands, so the time goes on the gaps and not on things people already know.",
  },
  {
    icon: Building2,
    title: "Curriculum built for your stack",
    body: "We pick the tracks and then fit them to your languages, cloud accounts, SIEM and plant. Labs run in your environment or in the Macksofy cyber range.",
  },
  {
    icon: MonitorPlay,
    title: "Delivery",
    body: "On-site at your office or plant, or virtual for distributed teams. Hands-on labs make up most of each day. It is not a slide marathon.",
  },
  {
    icon: FileBarChart,
    title: "Post-assessment and handover",
    body: "We run the same assessment again so you can see the change, then hand over recordings, lab material and slides for internal reuse and audit evidence.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Crosshair,
    title: "Taught by working pen-testers",
    body: "The people who teach also run Macksofy's VAPT, red-team and audit engagements. The labs come from the kinds of issues we find on client systems.",
  },
  {
    icon: ShieldCheck,
    title: "CERT-In empanelled firm",
    body: "Training comes from the same team that audits regulated Indian organisations, so it lines up with what CERT-In, RBI and SEBI auditors expect to see.",
  },
  {
    icon: MapPin,
    title: "India and UAE delivery",
    body: "On-site in Mumbai, Pune, Bengaluru, Hyderabad and NCR, and across Dubai, Abu Dhabi and Sharjah. Virtual delivery covers everywhere else.",
  },
];

const FAQS = [
  {
    q: "What is a typical corporate training engagement size?",
    a: "Anything from a 2-day secure-coding workshop for 10–20 developers to a multi-month programme across several teams. Most engagements run 2–10 days of delivery. We scope it on a discovery call.",
  },
  {
    q: "How is corporate cybersecurity training priced?",
    a: "Per engagement, after scoping. The price depends on headcount, which tracks you pick, the number of days, and whether delivery is on-site or virtual. You get a fixed-price proposal before anything is booked. There are no per-seat surprises after that.",
  },
  {
    q: "Can the training use our own environment?",
    a: "Yes. Labs can run against your own applications, cloud accounts or SIEM, in a non-production setup we agree with you, or in the Macksofy cyber range if you would rather keep production out of it.",
  },
  {
    q: "Do you run security awareness training for all staff?",
    a: "Yes, as a corporate track for the whole workforce rather than a public batch. It pairs with our phishing simulation programme, which gives a click-rate baseline and the awareness evidence that RBI, SEBI and ISO 27001 auditors usually ask for.",
  },
  {
    q: "Can training be aligned to ISO 27001, SOC 2 or regulator requirements?",
    a: "Yes. We can structure the programme and its attendance and assessment records so they serve as evidence for ISO 27001 awareness and training controls, SOC 2, and Indian and UAE regulator expectations (CERT-In, RBI, SEBI, NESA, DESC).",
  },
  {
    q: "Do you run cloud security training?",
    a: "Yes. Track F covers AWS, Azure and GCP: identity and access misconfiguration, storage and key-management hardening, cloud-native logging and CSPM triage, and cloud attack paths walked in a lab tenant. It is scoped to the platforms you actually run.",
  },
  {
    q: "Do you run OT / ICS security training?",
    a: "Yes, as a customised engagement. Track G covers IEC 62443 zones and conduits, the Purdue model, IT-to-OT pivot paths, Modbus and DNP3 protocol awareness, and how to work safely around PLCs, HMIs and historians. The syllabus depends on your plant, so it is scoped on a discovery call.",
  },
  {
    q: "Do you deliver corporate training in the UAE?",
    a: "Yes. We work with regional partners in Dubai and deliver on-site across the UAE, as well as virtually.",
  },
  {
    q: "I want training for myself, not my company. Where do I look?",
    a: "Corporate engagements are for teams. For individual certification courses such as CEH, see the Macksofy training catalogue.",
  },
];

export const metadata = buildMetadata({
  title: course.seoTitle,
  absoluteTitle: course.seoTitleAbsolute,
  description: course.seoDescription,
  path: PATH,
  keywords: course.keywords,
  ogKind: "training",
  ogTitle: "Corporate Training",
  ogEyebrow: "Macksofy Training",
});

export default function CorporateTrainingPage() {
  // No testimonial block: course testimonials are illustrative, not consented
  // quotes (see content/courses.ts), so they are not shown here as a real CISO.

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Training", url: "/training" },
            { name: course.shortTitle, url: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE.url}${PATH}#service`,
            name: course.title,
            serviceType: "Corporate cybersecurity training",
            description: course.hero.description,
            url: `${SITE.url}${PATH}`,
            provider: { "@id": `${SITE.url}#organization` },
            areaServed: [
              { "@type": "Country", name: "India" },
              { "@type": "Country", name: "United Arab Emirates" },
            ],
            audience: {
              "@type": "BusinessAudience",
              audienceType: course.whoIsItFor.join("; "),
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Corporate training tracks",
              itemListElement: TRACKS.map((t) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: t.module.split(" · ")[1] ?? t.module,
                  description: t.topics.join("; "),
                  provider: { "@id": `${SITE.url}#organization` },
                },
              })),
            },
          },
          faqSchema(FAQS, { answerBox: Boolean(shortAnswer) }),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={60} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="purple" size={600} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-24">
          <Breadcrumbs
            items={[
              { name: "Training", href: "/training" },
              { name: course.shortTitle, href: PATH },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <Eyebrow color="purple">{course.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Corporate cybersecurity training,{" "}
              <span className="gradient-text">built around your stack.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty max-w-2xl">
              {course.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#enquire" size="lg">
                Scope a programme <ArrowRight className="size-4" />
              </LinkButton>
              <LinkButton href="#tracks" variant="outline" size="lg">
                See the tracks
              </LinkButton>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Training tracks", value: String(TRACKS.length), icon: ClipboardCheck },
              { label: "Typical delivery", value: "2–10 days", icon: MonitorPlay },
              { label: "Format", value: "On-site · virtual", icon: Building2 },
              { label: "Delivery regions", value: "India + UAE", icon: MapPin },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl glass p-5">
                <Icon className="size-5 text-neon-purple" />
                <div className="mt-3 font-display text-2xl font-black text-fg">{value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {shortAnswer && (
        <section className="pb-12">
          <Container>
            <AnswerBox q={shortAnswer.q} a={shortAnswer.a} detail={shortAnswer.detail} />
          </Container>
        </section>
      )}

      {/* WHO IT'S FOR */}
      <section className="py-16 bg-bg-1 border-y border-line">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Who it's for"
              title="Teams that already work in production."
              description="Every programme starts from what the team does now and what has to change, not from a fixed syllabus."
            />
          </FadeIn>
          <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {course.whoIsItFor.map((w) => (
              <StaggerItem key={w}>
                <div className="flex h-full items-start gap-3 rounded-2xl glass p-5">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-neon-cyan" />
                  <span className="text-fg">{w}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* TRACKS */}
      <section id="tracks" className="py-20 scroll-mt-24">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Training tracks"
              title="Which training tracks can you choose? Each one fits your environment."
              description="Most engagements combine two or three tracks. Each one draws on a Macksofy consulting practice, so the labs reflect what we find on client systems."
            />
          </FadeIn>
          <StaggerChildren className="mt-10 grid gap-5 md:grid-cols-2">
            {TRACKS.map((t) => {
              const [label, name] = t.module.split(" · ");
              const Icon = t.icon ?? ShieldCheck;
              return (
                <StaggerItem key={t.module}>
                  <article className="flex h-full flex-col rounded-2xl glass p-6">
                    <div className="flex items-center gap-3">
                      <Icon className="size-6 text-neon-cyan" />
                      <Badge variant="outline">{label}</Badge>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-fg">{name ?? label}</h3>
                    <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                      {t.topics.map((topic) => (
                        <li key={topic} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-cyan" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    {t.service && (
                      <Link
                        href={t.service.href}
                        className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-neon-cyan hover:underline"
                      >
                        Related service: {t.service.label} <ArrowRight className="size-3.5" />
                      </Link>
                    )}
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="How an engagement runs"
              title="How does a corporate training engagement run?"
              description="The pre- and post-assessments are what make this more than a workshop: you see how far the team moved, and you have evidence for the audit."
            />
          </FadeIn>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="rounded-2xl glass p-5">
                <div className="flex items-center justify-between">
                  <p.icon className="size-5 text-neon-purple" />
                  <span className="font-mono text-xs text-fg-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY MACKSOFY */}
      <section className="py-20">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Why a consulting firm"
              title="Trained by the people who test systems like yours."
            />
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="rounded-2xl glass p-6">
                <d.icon className="size-6 text-neon-cyan" />
                <h3 className="mt-4 font-display text-lg font-bold text-fg">{d.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm text-fg-muted">
            Training for yourself rather than a team? Individual certification
            courses are in the{" "}
            <Link href="/training" className="text-neon-cyan hover:underline">
              training catalogue
            </Link>
            , including{" "}
            <Link href="/training/ceh" className="text-neon-cyan hover:underline">
              CEH v13
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Eyebrow color="cyan">FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              What do buyers ask before booking corporate training?
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <div className="pt-10">
        <References pageKey={`course:${SLUG}`} />
      </div>

      <div id="enquire" className="scroll-mt-24">
        <LeadCapture interest="Corporate Training" />
      </div>
    </>
  );
}
