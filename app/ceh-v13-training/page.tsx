import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Cpu,
  FlaskConical,
  GraduationCap,
  Building2,
  Globe2,
  Target,
  Layers,
  BookOpen,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { References } from "@/components/sections/References";

import { CehCurriculum } from "@/components/ceh/CehCurriculum";
import { CehAiWorkflow, CehJourney } from "@/components/ceh/CehAiWorkflow";

import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { SHORT_ANSWERS } from "@/content/shortAnswers";
import {
  CEH_FAQS,
  COURSE_FACTS,
  TOC,
  AUDIENCES,
  V12_VS_V13,
  CERT_COMPARISON,
  CAREER_ROLES,
  PRACTITIONER_NOTES,
} from "@/content/cehV13";

const PATH = "/ceh-v13-training";
const ENQUIRE = `/contact?interest=${encodeURIComponent("CEH v13 Training")}`;

export const metadata = buildMetadata({
  // absoluteTitle: the title is 58 chars, inside the 60-char hard budget but
  // over the 49 left once " | Macksofy" is reserved. Without this flag
  // clampTitle drops the trailing "| Certified Ethical Hacker Course" segment
  // WHOLESALE (the c83eea3 defect) and ships a 36-char title, throwing away
  // the exact-match secondary keyword. Same treatment already applied to the
  // 45 combo titles and 44 blog posts.
  title: "CEH v13 Training in India | Certified Ethical Hacker Course",
  absoluteTitle: true,
  description:
    "Live instructor-led CEH v13 training in India from an EC-Council Accredited Training Center — 20 modules, 221 hands-on labs and the 312-50 exam.",
  path: PATH,
  ogEyebrow: "EC-COUNCIL ATC",
  ogTitle: "CEH v13 Training in India",
  ogKind: "macksofy",
  keywords: [
    "CEH v13 training",
    "CEH v13 training India",
    "CEH v13 course",
    "CEH certification training India",
    "Certified Ethical Hacker training",
    "Certified Ethical Hacker course India",
    "CEH training India",
    "CEH course India",
    "CEH online training India",
    "CEH v13 online training",
    "CEH v13 with AI",
    "CEH AI training",
    "ethical hacking certification India",
    "ethical hacking course India",
    "ethical hacking course with certificate",
  ],
});

const sa = SHORT_ANSWERS["page:ceh-v13-training"];

const TRUST = [
  { icon: FileCheck2, label: "EC-Council Accredited Training Center" },
  { icon: ShieldCheck, label: "CERT-In empanelled auditor" },
  { icon: Building2, label: "Mumbai BKC, since 2014" },
  { icon: Globe2, label: "Live online across India" },
];

const WHY = [
  {
    icon: Target,
    title: "Taught by working consultants",
    body: "The people teaching module 14 spend the rest of the week testing real web applications. Techniques arrive with the context of where they actually work, where they fail, and what a client asks next.",
  },
  {
    icon: FileCheck2,
    title: "EC-Council Accredited Training Center",
    body: "Official EC-Council courseware, lab access through our ATC status, and the 312-50 exam voucher included in the programme fee.",
  },
  {
    icon: ShieldCheck,
    title: "A security firm, not only a training company",
    body: "Macksofy is a CERT-In empanelled information security auditing organisation delivering VAPT, red teaming and compliance audits. Training is taught out of that practice.",
  },
  {
    icon: FlaskConical,
    title: "Lab-first delivery",
    body: "Sessions are built around doing the technique in an isolated authorised environment, not watching it. Slides are the smaller half of the 40 hours.",
  },
  {
    icon: Users,
    title: "Mentor support until you sit the exam",
    body: "Weak-area reviews and doubt-clearing continue after the taught hours, so preparation does not stop when the cohort ends.",
  },
  {
    icon: Layers,
    title: "A route onward, not a dead end",
    body: "CEH is the breadth layer. We will tell you honestly whether CEH Practical, a SOC track or a hands-on penetration-testing path is the right next step for your goal.",
  },
];

const LAB_DOMAINS = [
  "Reconnaissance and OSINT",
  "Network scanning and enumeration",
  "Vulnerability analysis",
  "System hacking and privilege escalation",
  "Malware behaviour",
  "Sniffing and traffic analysis",
  "Social engineering",
  "Web servers and web applications",
  "SQL injection",
  "Wireless networks",
  "Mobile platforms",
  "IoT and OT",
  "Cloud environments",
  "Cryptography",
];

export default function CehV13TrainingPage() {
  return (
    <>
      {/*
        SCHEMA NOTE — deliberately NO Course node here.
        /training/ceh already carries Course + Product schema for CEH v13 with
        the ₹50,000 offer, and it is the site's best-converting page (56% CTR
        on "ceh training in mumbai"). Emitting a second Course entity for the
        same certification at a different URL would ask Google to choose
        between them for exactly the transactional queries that page already
        wins. This page therefore emits BreadcrumbList + FAQPage only, matches
        visible content exactly, and links enrolment traffic to /training/ceh.
        No Review or AggregateRating anywhere: there is no verified review data
        to represent, and inventing it is a structured-data policy violation.
      */}
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Training", url: `${SITE.url}/training` },
            { name: "CEH v13 Training", url: `${SITE.url}${PATH}` },
          ]),
          faqSchema(CEH_FAQS, { answerBox: Boolean(sa) }),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <GlowOrb className="pointer-events-none absolute -top-40 right-0 opacity-40" />
        <Container className="relative pt-12 pb-16 sm:pt-16 sm:pb-20">
          <Breadcrumbs
            items={[
              { name: "Training", href: "/training" },
              { name: "CEH v13 Training", href: PATH },
            ]}
          />

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <Eyebrow color="purple">
                EC-Council Accredited Training Center · India
              </Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tighter text-balance sm:text-5xl lg:text-6xl">
                CEH v13 Training in India
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted text-pretty">
                Master ethical hacking on EC-Council&rsquo;s AI-powered
                Certified Ethical Hacker v13 — 20 modules, 221 hands-on labs and
                the 312-50 exam, taught live by consultants who run real
                security assessments the rest of the week.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={ENQUIRE} withArrow data-analytics="ceh_enquiry_click">
                  Enquire about CEH v13 training
                </LinkButton>
                <LinkButton
                  href="/training/ceh"
                  variant="ghost"
                  data-analytics="ceh_course_details_click"
                >
                  Course details &amp; fees
                </LinkButton>
              </div>

              <ul className="mt-9 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-center gap-2.5 text-sm text-fg-muted">
                    <t.icon aria-hidden="true" className="size-4 shrink-0 text-neon-cyan" />
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick facts — sticky on desktop, inline on mobile. CSS only. */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <GlassCard className="p-6">
                <h2 className="font-display text-lg font-bold">Course at a glance</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  {COURSE_FACTS.map((f) => (
                    <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-3">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                        {f.label}
                      </dt>
                      <dd className="text-fg text-pretty">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <LinkButton
                  href={ENQUIRE}
                  className="mt-6 w-full"
                  withArrow
                  data-analytics="ceh_batch_enquiry"
                >
                  Check upcoming batches
                </LinkButton>
              </GlassCard>
            </aside>
          </div>
        </Container>
      </section>

      {/*
        No <main> wrapper here: components/layout/Shell.tsx already renders
        <main id="main"> around every page, and a nested <main> is invalid
        HTML (one per document). Sections sit directly inside the shell's main.
      */}
      <>
        {/* ── Answer box + table of contents ─────────────────────────── */}
        <section className="border-b border-line py-14">
          <Container>
            {sa && <AnswerBox q={sa.q} a={sa.a} />}

            <nav aria-label="On this page" className="mt-12">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                On this page
              </h2>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="text-sm text-fg-muted underline-offset-4 hover:text-neon-cyan hover:underline"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </section>

        {/* ── What is CEH v13 ────────────────────────────────────────── */}
        <section id="what-is-ceh-v13" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="The certification"
              title="What is CEH v13?"
              description="Certified Ethical Hacker is EC-Council's foundational offensive-security certification. Version 13 keeps the 20-module structure and adds AI-assisted working across it."
            />
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="space-y-4 text-fg-muted leading-relaxed">
                <p className="text-pretty">
                  An ethical hacker attacks systems with the owner&rsquo;s
                  permission in order to find weaknesses before someone
                  malicious does. CEH is the certification that formalises that
                  work into a repeatable method: reconnaissance, scanning,
                  gaining access, maintaining access and covering tracks — the
                  five phases every module maps back to.
                </p>
                <p className="text-pretty">
                  CEH v13 covers twenty modules, from footprinting through web
                  applications, SQL injection, wireless, mobile, IoT and OT,
                  cloud and cryptography. EC-Council publishes 221 hands-on
                  labs, 550 attack techniques and exposure to more than 4,000
                  hacking and security tools across the programme. The
                  distinguishing feature of v13 is that AI is threaded through
                  the existing modules as an assistive skill — there is no
                  separate AI module.
                </p>
                <p className="text-pretty">
                  It is a breadth certification, and that is its value. It gives
                  you the vocabulary and the map of the whole attack surface.
                  Depth on any one part of it — the kind{" "}
                  <Link href="/blog/oscp-vs-ceh-india-2026" className="text-neon-cyan underline-offset-4 hover:underline">
                    OSCP demands
                  </Link>{" "}
                  — comes afterwards.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  { icon: Layers, k: "20", v: "modules, in a fixed order" },
                  { icon: FlaskConical, k: "221", v: "hands-on labs" },
                  { icon: Target, k: "550", v: "attack techniques covered" },
                  { icon: BookOpen, k: "4,000+", v: "tools introduced" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl border border-line bg-bg-1 p-5">
                    <s.icon aria-hidden="true" className="size-5 text-neon-cyan" />
                    <div className="mt-3 font-display text-3xl font-black">{s.k}</div>
                    <div className="mt-1 text-sm text-fg-muted">{s.v}</div>
                  </div>
                ))}
                <p className="text-xs text-fg-faint sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  Figures published by EC-Council for CEH v13.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── What's new ─────────────────────────────────────────────── */}
        <section id="whats-new" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="v12 → v13"
              title="What changed in CEH v13"
              description="Only the differences EC-Council itself positions. The module count and exam format did not change."
            />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[46rem] border-collapse text-sm">
                <caption className="sr-only">
                  Comparison of CEH v12 and CEH v13 across curriculum, labs and exam format
                </caption>
                <thead>
                  <tr className="bg-bg-1 text-left">
                    <th scope="col" className="px-5 py-3 font-semibold">Area</th>
                    <th scope="col" className="px-5 py-3 font-semibold">CEH v12</th>
                    <th scope="col" className="px-5 py-3 font-semibold text-neon-cyan">CEH v13</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {V12_VS_V13.map((r) => (
                    <tr key={r.area}>
                      <th scope="row" className="px-5 py-4 text-left align-top font-medium text-fg">{r.area}</th>
                      <td className="px-5 py-4 align-top text-fg-muted">{r.v12}</td>
                      <td className="px-5 py-4 align-top text-fg-muted">{r.v13}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* ── CEH + AI ───────────────────────────────────────────────── */}
        <section id="ceh-and-ai" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="AI-powered ethical hacking"
              eyebrowColor="purple"
              title="Where AI actually helps an ethical hacker"
              description="AI in CEH v13 is an assistive layer over an authorised testing workflow. It compresses the slow, high-volume steps so the tester spends their time on judgement."
            />
            <CehAiWorkflow />
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
              <Cpu aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-400" />
              <p className="text-sm leading-relaxed text-fg-muted text-pretty">
                <strong className="text-fg">AI does not hack systems on its own here.</strong>{" "}
                Every step above happens inside an engagement someone has
                authorised in writing, against a scope someone agreed, with a
                human accountable for what is run and what is reported. The
                skill CEH v13 is teaching is directing the tool — and knowing
                when its output is wrong.
              </p>
            </div>
          </Container>
        </section>

        {/* ── Curriculum ─────────────────────────────────────────────── */}
        <section id="curriculum" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Curriculum"
              title="All 20 CEH v13 modules"
              description="EC-Council's module list in its official order, with what each one covers and what you practise in the lab."
            />
            <CehCurriculum />
            <p className="mt-6 text-sm text-fg-muted">
              Want the syllabus in more depth, with exam weighting and cost?
              Read our{" "}
              <Link
                href="/blog/ceh-v13-ai-training-india-2026"
                className="text-neon-cyan underline-offset-4 hover:underline"
              >
                full CEH v13 syllabus guide
              </Link>
              .
            </p>
          </Container>
        </section>

        {/* ── Labs ───────────────────────────────────────────────────── */}
        <section id="labs" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Hands-on"
              title="What you actually do in the labs"
              description="221 labs across the programme. Every one runs in an isolated, authorised training environment — never against systems you do not own or have written permission to test."
            />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {LAB_DOMAINS.map((d) => (
                <li key={d}>
                  <Badge>{d}</Badge>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ── Learning journey ───────────────────────────────────────── */}
        <section id="journey" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="How the programme runs"
              title="From first module to working the job"
            />
            <CehJourney />
          </Container>
        </section>

        {/* ── Who should attend ──────────────────────────────────────── */}
        <section id="who-should-attend" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Audience"
              title="Who CEH v13 is for"
              description="What each kind of learner gets out of the same 40 hours."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {AUDIENCES.map((a) => (
                <div key={a.who} className="rounded-xl border border-line bg-bg-1 p-5">
                  <h3 className="font-semibold text-fg">{a.who}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">{a.gain}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Prerequisites ──────────────────────────────────────────── */}
        <section id="prerequisites" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Before you start"
              title="Prerequisites — and the honest version"
              description="There is a difference between what you need to follow the course and what EC-Council requires to sit the exam."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg-1 p-6">
                <h3 className="font-display text-lg font-bold">To follow the training</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
                  {[
                    "TCP/IP fundamentals — ports, protocols, the three-way handshake",
                    "Subnetting and basic routing concepts",
                    "DNS resolution and HTTP request/response structure",
                    "Basic Linux: filesystem, permissions, processes, reading logs",
                    "Comfort with a command line — no programming required",
                  ].map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-neon-cyan" />
                      <span className="text-pretty">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-bg-1 p-6">
                <h3 className="font-display text-lg font-bold">To sit the exam</h3>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted text-pretty">
                  EC-Council sets its own eligibility route for the 312-50 exam,
                  and attending official training through an Accredited Training
                  Center is the standard path. Eligibility rules are EC-Council&rsquo;s
                  to set and they revise them — we confirm the current
                  requirement for your situation at enrolment rather than
                  publishing a rule here that may age.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted text-pretty">
                  If you have no security background at all, plan a couple of
                  weeks on networking and Linux first. That preparation changes
                  the experience of the course more than anything else you can do.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Exam ───────────────────────────────────────────────────── */}
        <section id="exam" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Certification"
              title="The CEH exam, and what comes after"
            />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[40rem] border-collapse text-sm">
                <caption className="sr-only">CEH v13 examination details</caption>
                <tbody className="divide-y divide-line">
                  {[
                    ["Awarding body", "EC-Council"],
                    ["Knowledge exam", "CEH (312-50)"],
                    ["Format", "125 multiple-choice questions"],
                    ["Duration", "4 hours"],
                    ["Pass mark", "Calibrated per exam form — EC-Council does not publish a single fixed pass percentage across all versions"],
                    ["Practical exam", "CEH Practical — 20 challenges over 6 hours, sat separately"],
                    ["CEH Master", "Awarded on holding both the knowledge certification and CEH Practical"],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row" className="w-56 bg-bg-1 px-5 py-3.5 text-left align-top font-medium text-fg">{k}</th>
                      <td className="px-5 py-3.5 align-top text-fg-muted text-pretty">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm text-fg-muted text-pretty">
              Considering the hands-on exam as well? See{" "}
              <Link href="/training/ceh-practical" className="text-neon-cyan underline-offset-4 hover:underline">
                CEH Practical training
              </Link>
              . Exam mechanics are EC-Council&rsquo;s and can change — we confirm
              current details at enrolment.
            </p>
          </Container>
        </section>

        {/* ── Training across India ──────────────────────────────────── */}
        <section id="training-in-india" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Delivery"
              title="CEH v13 training across India"
              description="One national cohort, delivered live online — plus classroom delivery at our Mumbai facility."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg-1 p-6">
                <Globe2 aria-hidden="true" className="size-5 text-neon-cyan" />
                <h3 className="mt-3 font-display text-lg font-bold">Live online, nationwide</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted text-pretty">
                  Instructor-led sessions delivered live — not recordings — with
                  the same lab access, doubt-clearing and mentor support
                  wherever you are. Learners join from Delhi, Bengaluru,
                  Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Gurugram and
                  Noida alongside Mumbai. Weekend cohorts exist for people in
                  full-time work.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-bg-1 p-6">
                <Building2 aria-hidden="true" className="size-5 text-neon-cyan" />
                <h3 className="mt-3 font-display text-lg font-bold">Classroom — Mumbai</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted text-pretty">
                  In-person delivery runs at our Bandra Kurla Complex facility
                  in Mumbai. That is our only classroom location — we would
                  rather say so than imply centres we do not operate. Corporate
                  cohorts can be delivered on-site at your offices anywhere in
                  India by arrangement.
                </p>
                <Link
                  href="/training/ceh"
                  className="mt-4 inline-block text-sm text-neon-cyan underline-offset-4 hover:underline"
                >
                  CEH training in Mumbai — dates and fees
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Why Macksofy ───────────────────────────────────────────── */}
        <section id="why-macksofy" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Why train here"
              title="Why learn CEH v13 with Macksofy"
              description="Macksofy Technologies has run cybersecurity engagements out of Mumbai since 2014. The training division teaches from that work."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {WHY.map((w) => (
                <FadeIn key={w.title}>
                  <div className="h-full rounded-xl border border-line bg-bg-1 p-6">
                    <w.icon aria-hidden="true" className="size-5 text-neon-cyan" />
                    <h3 className="mt-3 font-semibold text-fg">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">{w.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <p className="mt-6 text-sm text-fg-muted text-pretty">
              More on the consulting side of the business:{" "}
              <Link href="/services/vapt" className="text-neon-cyan underline-offset-4 hover:underline">VAPT</Link>,{" "}
              <Link href="/audit/cert-in-empanelled-audit" className="text-neon-cyan underline-offset-4 hover:underline">CERT-In empanelled audits</Link>{" "}
              and{" "}
              <Link href="/best-cybersecurity-company" className="text-neon-cyan underline-offset-4 hover:underline">how we work</Link>.
            </p>
          </Container>
        </section>

        {/* ── Practitioner notes (information gain) ──────────────────── */}
        <section id="practitioner-notes" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="From our assessment team"
              eyebrowColor="amber"
              title="What our testers tell CEH candidates"
              description="Editorial guidance from the Macksofy assessment practice — the things that change outcomes, which no certification brochure covers."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {PRACTITIONER_NOTES.map((n) => (
                <article key={n.title} className="rounded-xl border border-line bg-bg-1 p-6">
                  <h3 className="font-display text-lg font-bold text-fg">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">{n.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Comparison ─────────────────────────────────────────────── */}
        <section id="comparison" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="Choosing"
              title="CEH v13 vs other security certifications"
              description="Each of these is the right answer for a different person. None of them is a competitor to be talked down."
            />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[54rem] border-collapse text-sm">
                <caption className="sr-only">
                  CEH v13 compared with Security+, eJPT, PenTest+ and OSCP
                </caption>
                <thead>
                  <tr className="bg-bg-1 text-left">
                    <th scope="col" className="px-5 py-3 font-semibold">Certification</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Built for</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Depth</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Exam</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Where it fits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {CERT_COMPARISON.map((c) => (
                    <tr key={c.cert} className={c.cert.startsWith("CEH") ? "bg-neon-cyan/[0.04]" : undefined}>
                      <th scope="row" className="px-5 py-4 text-left align-top font-medium text-fg">{c.cert}</th>
                      <td className="px-5 py-4 align-top text-fg-muted">{c.learner}</td>
                      <td className="px-5 py-4 align-top text-fg-muted">{c.depth}</td>
                      <td className="px-5 py-4 align-top text-fg-muted">{c.exam}</td>
                      <td className="px-5 py-4 align-top text-fg-muted text-pretty">{c.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* ── Careers ────────────────────────────────────────────────── */}
        <section id="careers" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="After the exam"
              title="Roles CEH v13 opens up"
              description="CEH is most often used as a screening credential for these roles. We do not publish salary figures or placement percentages we cannot substantiate."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CAREER_ROLES.map((r) => (
                <div key={r.role} className="rounded-xl border border-line bg-bg-1 p-5">
                  <GraduationCap aria-hidden="true" className="size-5 text-neon-cyan" />
                  <h3 className="mt-3 font-semibold text-fg">{r.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">{r.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section id="faq" className="scroll-mt-24 border-b border-line py-16">
          <Container>
            <SectionTitle
              eyebrow="FAQs"
              title="CEH v13 questions, answered"
            />
            <div className="mt-8">
              <FAQAccordion faqs={CEH_FAQS} />
            </div>
            <References pageKey="page:ceh-v13-training" />
          </Container>
        </section>

        {/* ── Enquiry ────────────────────────────────────────────────── */}
        <section id="enquire" className="scroll-mt-24">
          <LeadCapture />
        </section>
      </>

      {/*
        Mobile CTA bar. Fixed, CSS-only, hidden from lg upward where the
        sticky "Course at a glance" panel already carries the CTA. The
        spacer below reserves its height so it never covers page content
        and never causes a layout shift.
      */}
      <div aria-hidden="true" className="h-16 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-0/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-fg">CEH v13 Training</p>
            <p className="truncate text-xs text-fg-faint">EC-Council ATC · live online</p>
          </div>
          <LinkButton href={ENQUIRE} size="sm" data-analytics="ceh_enquiry_click">
            Enquire
          </LinkButton>
        </div>
      </div>
    </>
  );
}
