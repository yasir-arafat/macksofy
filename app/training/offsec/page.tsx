import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Clock, ShieldCheck, Trophy, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { COURSES } from "@/content/courses";
import { SITE, metroKeywords } from "@/lib/site";
import { formatINR } from "@/lib/utils";

const OFFSEC_COURSES = COURSES.filter((c) => c.vendor === "OffSec");

const FOUNDATION = OFFSEC_COURSES.filter((c) => c.level === "Foundation");
const CORE = OFFSEC_COURSES.filter(
  (c) => c.level === "Intermediate" || c.slug === "oscp",
);
const ADVANCED = OFFSEC_COURSES.filter(
  (c) =>
    c.level === "Professional" &&
    c.slug !== "oscp" &&
    !["osmr"].includes(c.slug),
);
const ELITE = OFFSEC_COURSES.filter((c) =>
  ["osmr"].includes(c.slug),
);

const OFFSEC_FAQS = [
  {
    q: "Does Macksofy provide training for every Offensive Security certification?",
    a: "Yes — Macksofy runs hands-on exam-prep bootcamps that cover the full Offensive Security certification stack: PEN-200 / OSCP+, PEN-300 / OSEP, WEB-200 / OSWA, WEB-300 / OSWE, PEN-210 / OSWP, EXP-301 / OSED, EXP-312 / OSMR, SOC-200 / OSDA and SEC-100 / OSCC. Each bootcamp bundles official OffSec course enrolment with a structured 60–80 hour Macksofy mentor-led programme.",
  },
  {
    q: "Which Offensive Security certification should I take first in 2026?",
    a: "Career switchers / beginners: SEC-100 (OSCC) for foundations, then OSCP+ (PEN-200). Working pen-testers / CEH holders: jump straight to OSCP+. SOC analysts and defenders: OSCP+ first if you'll do red-team, otherwise SOC-200 (OSDA). Web-focused careers: OSWA → OSWE. Reverse engineers: OSED.",
  },
  {
    q: "What does a Macksofy Offensive Security bootcamp include?",
    a: "Each Macksofy OffSec bootcamp includes (a) official OffSec course enrolment + lab access, (b) a 60–80 hour Macksofy instructor-led bootcamp aligned to the current OffSec syllabus, (c) two full mock exams under timed conditions, (d) 1:1 weak-area reviews, and (e) mentor-until-pass support across first attempt and any retakes. Talk to our advisors for the current Indian pricing — EMI options across 3/6/12 months are available.",
  },
  {
    q: "What is OSCP+ and how is it different from the old OSCP?",
    a: "OSCP+ is OffSec's rebrand of the OSCP exam that took effect late 2024. The new format dropped the buffer-overflow box, expanded the Active Directory set (a full ~40-point AD chain), replaced bonus lab points with CPE-based 3-year recertification, and tightened reporting standards. All Macksofy OffSec bootcamps are aligned to the OSCP+ format.",
  },
  {
    q: "Are Offensive Security exams recognised in UAE / Dubai?",
    a: "Yes — OSCP, OSCP+, OSEP, OSWA, OSWE and OSDA are all explicitly listed by UAE banking regulators, ADGM- and DIFC-licensed entities and major UAE consulting firms. Macksofy delivers Offensive Security cohorts to clients in Dubai and Abu Dhabi via online + corporate-batch options.",
  },
  {
    q: "Can I attempt an Offensive Security exam without taking the course?",
    a: "Some certs (OSCP+, OSEP, OSWA, OSWE) require an OffSec course; others (OSWP) historically allowed standalone exams. Policies change — check the official OffSec page or ask Macksofy for the current 2026 stance per certification.",
  },
  {
    q: "Does Macksofy support remote / online OffSec training across India?",
    a: "Yes — live online cohorts pan-India for every Offensive Security cert, plus corporate-batch delivery on-site at client offices in Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Gurugram, Noida and Dubai.",
  },
  {
    q: "What is Macksofy's mentor-until-pass policy?",
    a: "Macksofy's mentor-until-pass policy means once you enrol in any of our Offensive Security bootcamps, our mentors continue to support you — through your first attempt and any retakes — at no additional cost until you clear the exam. Includes 1:1 weak-area reviews and exam-strategy sessions.",
  },
  {
    q: "What's the Offensive Security career path roadmap from beginner to expert?",
    a: "Stage 1 (foundation): SEC-100 (OSCC) — networking, Linux, Windows, scripting, web, AD, SecOps. Stage 2 (core): OSCP+ for offence, OSDA for defence, OSWA for web, OSWP for wireless. Stage 3 (advanced): OSEP for red team, OSWE for white-box web, OSED for exploit dev. Stage 4 (elite): OSMR for macOS specialisation.",
  },
];

export const metadata = buildMetadata({
  title:
    "Offensive Security Certifications Training in India 2026 | OSCP+ · OSEP · OSWE · OSWA · OSDA · OSED · OSMR | Macksofy",
  description:
    "Hands-on Offensive Security certification training in India 2026 by Macksofy. Mentor-led bootcamps for PEN-200 (OSCP+), PEN-300 (OSEP), WEB-200 (OSWA), WEB-300 (OSWE), PEN-210 (OSWP), SOC-200 (OSDA), EXP-301 (OSED), EXP-312 (OSMR) and SEC-100 (OSCC) across Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Chennai and Dubai. Mentor until you pass.",
  path: "/training/offsec",
  keywords: [
    "Offensive Security training India",
    "Offensive Security certification India",
    "OffSec certifications India",
    "OffSec training India",
    "OffSec courses India",
    "OSCP OSEP OSWE OSWA OSDA OSED OSMR training India",
    "OffSec certification path India",
    "OffSec roadmap 2026",
    "Offensive Security bootcamp India",
    "best Offensive Security training institute India",
    "Offensive Security exam prep India",
    "OffSec UAE Dubai",
    ...metroKeywords("Offensive Security training"),
    ...metroKeywords("OSCP bootcamp"),
  ],
});

const STAGE_INTRO = {
  foundation: {
    eyebrow: "Stage 1 · Foundation",
    title: "Career switchers + beginners start here.",
    description:
      "SEC-100 (OSCC) is OffSec's foundation cert — networking, Linux, Windows, scripting, web, AD, SecOps, crypto. The natural starting point if you don't already have 2+ years of IT or development experience.",
  },
  core: {
    eyebrow: "Stage 2 · Core",
    title: "Pick the practitioner cert that maps to your role.",
    description:
      "OSCP+ for offence-focused careers, OSDA for blue-team / detection, OSWA for web specialisation, OSWP for wireless. Each ends in a hands-on practical exam — not multiple choice.",
  },
  advanced: {
    eyebrow: "Stage 3 · Advanced",
    title: "Level up to elite roles.",
    description:
      "OSEP for red-team operators, OSWE for white-box AppSec, OSED for exploit developers. These pay 30–60% more than the core certs.",
  },
  elite: {
    eyebrow: "Stage 4 · Elite",
    title: "The top of the OffSec stack.",
    description:
      "OSMR for macOS specialisation — fewer than a thousand holders globally.",
  },
} as const;

function CourseCard({
  c,
}: {
  c: (typeof OFFSEC_COURSES)[number];
}) {
  return (
    <Link
      href={`/training/${c.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-center gap-2">
            <Badge variant="cyan">OffSec</Badge>
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
              <span className="block font-display text-base font-bold text-fg">
                {formatINR(c.priceINR)}
                {c.discountPercent && (
                  <span className="ml-2 inline-flex rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white align-middle">
                    {c.discountPercent}% OFF
                  </span>
                )}
              </span>
            ) : (
              <span className="text-sm text-fg-muted">Talk to us</span>
            )}
          </div>
          <ArrowRight className="size-4 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}

function StageSection({
  stage,
  courses,
}: {
  stage: keyof typeof STAGE_INTRO;
  courses: (typeof OFFSEC_COURSES)[number][];
}) {
  const intro = STAGE_INTRO[stage];
  if (courses.length === 0) return null;
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={intro.eyebrow}
            title={intro.title}
            description={intro.description}
          />
        </FadeIn>
        <StaggerChildren className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <StaggerItem key={c.slug}>
              <CourseCard c={c} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

export default function OffSecHubPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Training", url: "/training" },
            { name: "OffSec", url: "/training/offsec" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "OffSec Certifications offered by Macksofy India",
            itemListElement: OFFSEC_COURSES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE.url}/training/${c.slug}`,
              name: c.title,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "@id": `${SITE.url}#offsec-bootcamp`,
            name: `${SITE.name} — Offensive Security Exam Prep`,
            url: `${SITE.url}/training/offsec`,
            parentOrganization: { "@id": `${SITE.url}#organization` },
            description:
              "Hands-on bootcamps preparing learners for the full Offensive Security certification stack — OSCP+, OSEP, OSWA, OSWE, OSWP, OSDA, OSED, OSMR and OSCC — across India and the UAE.",
          },
          faqSchema(OFFSEC_FAQS),
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs
            items={[
              { name: "Training", href: "/training" },
              { name: "OffSec", href: "/training/offsec" },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <Eyebrow color="cyan">Offensive Security Exam-Prep Bootcamps</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Every Offensive Security certification.{" "}
              <span className="gradient-text">Mentor until you pass.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty max-w-2xl">
              Macksofy runs hands-on bootcamps for the full Offensive Security
              certification stack — from the SEC-100 / OSCC foundation through
              OSCP+, OSEP, OSWE, OSWA and OSDA, up to the elite OSED, OSMR and
              OSMR. Each cohort bundles official OffSec course enrolment with
              a 60–80 hour Macksofy instructor-led programme and mentor-until-pass
              support, delivered across India and the UAE.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="cyan">PEN-200 / OSCP+</Badge>
              <Badge variant="cyan">PEN-300 / OSEP</Badge>
              <Badge variant="cyan">WEB-200 / OSWA</Badge>
              <Badge variant="cyan">WEB-300 / OSWE</Badge>
              <Badge variant="cyan">PEN-210 / OSWP</Badge>
              <Badge variant="cyan">SOC-200 / OSDA</Badge>
              <Badge variant="cyan">EXP-301 / OSED</Badge>
              <Badge variant="cyan">EXP-312 / OSMR</Badge>
              <Badge variant="cyan">SEC-100 / OSCC</Badge>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "OffSec certs delivered", value: "10 / 10", icon: Trophy },
              { label: "Mentor until pass", value: "Yes", icon: ShieldCheck },
              { label: "EMI options", value: "3 · 6 · 12 mo", icon: Award },
              { label: "Cities served", value: "13 · India + UAE", icon: Users },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl glass p-5">
                <Icon className="size-5 text-neon-cyan" />
                <div className="mt-3 font-display text-2xl font-black text-fg">
                  {value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <StageSection stage="foundation" courses={FOUNDATION} />
      <StageSection stage="core" courses={CORE} />
      <StageSection stage="advanced" courses={ADVANCED} />
      <StageSection stage="elite" courses={ELITE} />

      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Eyebrow color="cyan">FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              Everything you wanted to ask about OffSec in 2026.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={OFFSEC_FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
