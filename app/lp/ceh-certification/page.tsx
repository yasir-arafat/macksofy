import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  CheckCircle2,
  Award,
  FlaskConical,
  Users,
  Briefcase,
  Clock,
  MapPin,
  GraduationCap,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ClientsMarquee } from "@/components/clients/ClientsMarquee";
import { LeadForm } from "@/components/lp/LeadForm";
import { LiteYouTube } from "@/components/lp/LiteYouTube";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

const PRICE = formatINR(50000);
// EC-Council's official CEH overview video ("Becoming an Ethical Hacker | CEH").
const CEH_VIDEO_ID = "a0pL7v6QVAk";

const ACCREDITATIONS = [
  { src: "/partners/ec-council.jpg", alt: "EC-Council Accredited Training Center" },
  { src: "/partners/cert-in.png", alt: "CERT-In Empanelled Auditor" },
  { src: "/partners/comptia.jpg", alt: "CompTIA Authorized Partner" },
  { src: "/partners/iso-27001.webp", alt: "ISO 27001 Certified" },
  // No OffSec logo here: Macksofy is not an OffSec partner or authorised
  // training centre, and a vendor mark inside a list named ACCREDITATIONS
  // reads as accreditation whatever the alt text says. OffSec credentials
  // are referenced in copy only, as "Offensive Security exam-prep bootcamps".
  { src: "/partners/startup-india.png", alt: "Startup India Recognized" },
];

const INCLUDED = [
  "Official EC-Council CEH v13 e-courseware & iLabs access",
  "One CEH v13 (312-50) exam voucher included in the fee",
  "40 hours live training + recorded sessions for revision",
  "Capstone mock exam under real, timed conditions",
  "Certificate of completion + mentor support until you clear CEH",
  "Placement support — resume, mock interviews & hiring intros",
];
const WHATSAPP = SITE.whatsappLink(
  "Hi Macksofy, I'd like details on the CEH v13 training — fees, batch dates and syllabus."
);

// Built through buildMetadata like every other route, so this page cannot drift
// out of the title/description budgets or lose its canonical + hreflang. The
// title is self-contained (`absoluteTitle`) because the /lp layout sets a
// pass-through template; at 60 chars it keeps every substantive word of the
// original, dropping only the redundant "| Macksofy" suffix. `noIndex: "follow"`
// preserves the paid-LP setting — out of the index, still passing link equity.
const lpMetadata = buildMetadata({
  title: "CEH v13 Training in Mumbai — Certified Ethical Hacker Course",
  absoluteTitle: true,
  description:
    "EC-Council Accredited CEH v13 training in Mumbai and live-online — 40 hours of labs, official courseware, exam voucher and mentor-led prep. ₹50,000.",
  path: "/lp/ceh-certification",
  noIndex: "follow",
  geo: null,
});

export const metadata: Metadata = {
  ...lpMetadata,
  // Bespoke share copy — shorter and more direct than the SERP description.
  openGraph: {
    ...lpMetadata.openGraph,
    title: "CEH v13 Training — Certified Ethical Hacker | Macksofy",
    description:
      "Hands-on, EC-Council Accredited CEH v13 training. Official courseware + exam voucher + placement support. ₹50,000 all-inclusive.",
  },
};

const HERO_BULLETS = [
  "40 hours of live, instructor-led, 100% hands-on training",
  "Official EC-Council courseware + one CEH v13 (312-50) exam voucher",
  "Real attack labs — Nmap, Burp Suite, Metasploit, Wireshark & more",
  "Mentor-led exam prep that continues until you clear the exam",
  "Resume, mock interviews & introductions to our hiring network",
];

const WHY = [
  {
    icon: Award,
    title: "EC-Council Accredited Training Center",
    body: "Official curriculum, courseware and exam voucher — delivered by EC-Council–certified instructors.",
  },
  {
    icon: FlaskConical,
    title: "100% practical labs",
    body: "Every module is hands-on on real targets — recon, web exploitation, privilege escalation and AI-driven offense (new in v13).",
  },
  {
    icon: GraduationCap,
    title: "Mentor-led until you clear it",
    body: "A capstone mock exam under timed conditions, plus mentor support that runs right up to your CEH attempt.",
  },
  {
    icon: Briefcase,
    title: "Placement support",
    body: "1:1 resume & LinkedIn rewrite, mock interviews, and direct introductions to 80+ hiring partners across India & UAE.",
  },
];

const LEARN = [
  "Footprinting, reconnaissance & OSINT",
  "Network scanning, enumeration & vulnerability analysis",
  "System hacking & privilege escalation (Linux + Windows)",
  "OWASP Top 10 web & API exploitation with Burp Suite",
  "SQL injection, sniffing & session hijacking",
  "Wireless, mobile, IoT/OT & cloud attacks",
  "Malware threats, social engineering & evasion",
  "AI-assisted recon, prompt injection & LLM attacks (v13)",
];

const ROLES = [
  { role: "SOC Analyst (L1 / L2)", salary: "₹4–7 LPA", exp: "0–2 yrs" },
  { role: "Junior Penetration Tester", salary: "₹6–10 LPA", exp: "1–3 yrs" },
  { role: "Vulnerability Analyst", salary: "₹6–9 LPA", exp: "1–2 yrs" },
  { role: "Cybersecurity Consultant", salary: "₹8–12 LPA", exp: "2–4 yrs" },
];

const FAQS = [
  {
    q: "Is Macksofy an authorized CEH v13 provider?",
    a: "Yes — Macksofy Technologies is an EC-Council Accredited Training Center (ATC). You receive official EC-Council courseware, lab access throughout the programme, and one CEH v13 (312-50) exam voucher.",
  },
  {
    q: "What is the CEH v13 fee?",
    a: `${PRICE} all-inclusive — training, official EC-Council courseware, lab access, exam voucher and our placement support. EMI options are available.`,
  },
  {
    q: "Can I take the course online?",
    a: "Yes. Every batch runs live online with on-camera trainer interaction, and at our Mumbai BKC center. Session recordings are available for revision.",
  },
  {
    q: "Do I need prior experience?",
    a: "No prior hacking experience is required — we cover the basics. A working knowledge of TCP/IP and comfort with the Linux and Windows command lines helps.",
  },
  {
    q: "Do you guarantee a job?",
    a: "No honest training company can guarantee placement, and we don't. What we do provide is structured placement support — resume help, mock interviews and direct introductions to our hiring network.",
  },
];

const STATS = [
  { value: `${SITE.stats.yearsInBusiness}+ yrs`, label: "Training cyber talent" },
  { value: `${(SITE.stats.learnersTrained / 1000).toFixed(0)}k+`, label: "Learners trained" },
  { value: "80+", label: "Hiring partners" },
  { value: "EC-Council", label: "Accredited Training Center" },
];

export default function CehLandingPage() {
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      {/* ---- Minimal top bar (logo + click-to-call) ---- */}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Macksofy Technologies — Home" className="flex items-center gap-2.5">
            <Image
              src="/macksofywhite.png"
              alt="Macksofy Technologies"
              width={160}
              height={50}
              // Nav logo — never the LCP (the hero H1 text is). Not `priority`
              // and not `eager` (both preload it in Next 16); default lazy still
              // fetches an in-viewport image promptly, minus the wasteful preload.
              className="h-8 w-auto sm:h-9"
            />
            <span className="hidden align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint sm:inline">
              Training
            </span>
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 px-4 py-2 text-sm font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-bg"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
            <span className="sm:hidden">Call now</span>
          </a>
        </Container>
      </header>

      {/* ---- Hero + lead form ---- */}
      <section className="relative overflow-hidden">
        <div className="spotlight-cyan pointer-events-none absolute inset-0 opacity-60" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
        <GlowOrb color="cyan" size={520} intensity="soft" className="-left-40 -top-32" />
        <GlowOrb color="purple" size={480} intensity="soft" className="-right-32 top-20" />
        <Container className="relative grid gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          {/* Left: pitch */}
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-line bg-bg-1/70 px-3 py-1.5">
              <Image
                src="/partners/ec-council.jpg"
                alt="EC-Council"
                width={88}
                height={28}
                className="h-5 w-auto rounded bg-white px-1"
              />
              <span className="text-xs font-semibold text-fg-muted">Accredited Training Center</span>
            </div>
            <Eyebrow>EC-Council Accredited Training Center</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tighter text-balance sm:text-5xl">
              Certified Ethical Hacker{" "}
              <span className="gradient-text">(CEH v13)</span> Training in Mumbai
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted text-pretty">
              The world&apos;s most recognised ethical-hacking certification — taught the way it
              should be: live, instructor-led and 100% hands-on, online or at our Mumbai BKC
              center. Mentor support runs until you clear the exam.
            </p>

            <ul className="mt-7 space-y-3">
              {HERO_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-fg">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-neon-cyan" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Badge variant="cert">
                <Award className="size-3.5" /> {PRICE} all-inclusive
              </Badge>
              <Badge variant="cyan">
                <Clock className="size-3.5" /> 5 days or 8 weekends
              </Badge>
              <Badge variant="green">
                <ShieldCheck className="size-3.5" /> CERT-In empanelled firm
              </Badge>
              <Badge variant="purple">
                <MapPin className="size-3.5" /> Online + Mumbai (BKC)
              </Badge>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="#enquiry" size="lg">
                Book a free counselling call
              </LinkButton>
              <LinkButton
                href={WHATSAPP}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener"
              >
                <MessageCircle className="size-4" /> WhatsApp us
              </LinkButton>
            </div>
          </div>

          {/* Right: lead form */}
          <div id="enquiry" className="scroll-mt-24">
            <div className="glass-strong rounded-2xl border border-line p-6 shadow-2xl sm:p-7">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Get fees, batch dates &amp; syllabus
              </h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Tell us where to reach you — a CEH counsellor will call you back today.
              </p>
              <div className="mt-5">
                <LeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Accreditations ---- */}
      <section className="border-t border-line bg-bg-1/30 py-9">
        <Container>
          <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-fg-faint">
            Accredited, empanelled &amp; authorized by industry bodies
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {ACCREDITATIONS.map((a) => (
              <div
                key={a.src}
                className="flex h-14 items-center justify-center rounded-xl bg-white px-5 shadow-sm"
                title={a.alt}
              >
                <div className="relative h-8 w-24">
                  <Image src={a.src} alt={a.alt} fill sizes="96px" className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Trust stats ---- */}
      <section className="border-y border-line bg-bg-1/40">
        <Container className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-fg sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-fg-muted">{s.label}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* ---- Video ---- */}
      <section className="relative overflow-hidden border-b border-line py-14">
        <GlowOrb color="purple" size={460} intensity="soft" className="-right-40 top-0" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow color="purple">Watch · 2 min</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tighter sm:text-4xl">
              What does a Certified Ethical Hacker actually do?
            </h2>
            <p className="mt-4 text-fg-muted">
              A quick overview of the CEH certification from EC-Council — the credential employers
              ask for by name. Then we make it real with 40 hours of hands-on labs.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Globally recognised, ANSI-accredited certification",
                "Maps directly to SOC, VAPT and red-team job roles",
                "v13 adds AI-driven offense across every attack phase",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-neon-purple" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <LinkButton href="#enquiry" size="lg">
                Talk to a CEH counsellor
              </LinkButton>
            </div>
          </div>
          <LiteYouTube id={CEH_VIDEO_ID} title="Becoming an Ethical Hacker | CEH | EC-Council" />
        </Container>
      </section>

      {/* ---- Why Macksofy ---- */}
      <section className="py-14">
        <Container>
          <Eyebrow color="purple">Why train with Macksofy</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tighter sm:text-4xl">
            Built to make you job-ready, not just exam-ready
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass lift rounded-2xl border border-line p-6">
                <Icon className="size-7 text-neon-cyan" />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Inside the program (image + what's included) ---- */}
      <section className="border-t border-line py-14">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-neon-cyan/20 to-neon-purple/20 blur-2xl" />
            <Image
              src="/courses/CEH.jpg"
              alt="Macksofy CEH v13 training cohort"
              width={900}
              height={650}
              className="relative w-full rounded-2xl border border-line object-cover shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 rounded-xl border border-line bg-bg/80 px-4 py-2 backdrop-blur">
              <div className="font-display text-lg font-bold">{PRICE}</div>
              <div className="text-[11px] text-fg-muted">all-inclusive · EMI available</div>
            </div>
          </div>
          <div>
            <Eyebrow color="green">What&apos;s included</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tighter sm:text-4xl">
              Everything you need to certify — in one fee
            </h2>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-neon-green" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ---- What you'll learn ---- */}
      <section className="border-t border-line py-14">
        <Container>
          <Eyebrow>Hands-on curriculum</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tighter sm:text-4xl">
            20 modules. Every one of them practical.
          </h2>
          <p className="mt-4 max-w-2xl text-fg-muted">
            Aligned to the official EC-Council CEH v13 syllabus — including the new AI-driven
            offense modules — and rehearsed in our labs before you ever sit the exam.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {LEARN.map((l) => (
              <div
                key={l}
                className="flex items-start gap-3 rounded-xl border border-line bg-bg-1/40 px-4 py-3 text-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-green" />
                <span>{l}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Client trust marquee ---- */}
      <section className="border-t border-line bg-bg-1/40 py-12">
        <Container className="mb-7">
          <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-fg-faint">
            Our consultants secure 250+ enterprises across India &amp; UAE
          </p>
        </Container>
        <ClientsMarquee />
      </section>

      {/* ---- Career outcomes ---- */}
      <section className="border-t border-line py-14">
        <Container>
          <div className="flex items-center gap-3">
            <Users className="size-6 text-neon-purple" />
            <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">
              Where CEH can take you
            </h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-1/60 text-fg-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Indicative salary*</th>
                  <th className="px-5 py-3 font-semibold">Experience</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r, i) => (
                  <tr key={r.role} className={i % 2 ? "bg-bg-1/20" : ""}>
                    <td className="px-5 py-3 font-medium">{r.role}</td>
                    <td className="px-5 py-3 text-neon-cyan">{r.salary}</td>
                    <td className="px-5 py-3 text-fg-muted">{r.exp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-fg-faint">
            *Indicative India market ranges that vary by role, employer, city and experience. Not a
            guarantee of salary or placement.
          </p>
        </Container>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="border-t border-line py-14">
        <Container>
          <Eyebrow color="amber">From our learners</Eyebrow>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {[
              {
                quote:
                  "Macksofy's labs were the difference — I'd already faced everything before exam day. Cleared CEH v13 on my first attempt.",
                name: "Rohan M.",
                role: "SOC Analyst, BFSI",
              },
              {
                quote:
                  "Came in with zero security background. A few weeks later I was running Burp Suite and Metasploit confidently.",
                name: "Priya S.",
                role: "Cybersecurity Engineer",
              },
            ].map((t) => (
              <figure key={t.name} className="glass rounded-2xl border border-line p-6">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-fg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-fg-muted"> · {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- FAQ ---- */}
      <section className="border-t border-line py-14">
        <Container size="narrow">
          <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-bg-1/40 px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-neon-cyan transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="border-t border-line py-16">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to start your CEH v13?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Talk to a CEH counsellor today about fees, the next batch dates and EMI options.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <LinkButton href="#enquiry" size="lg">
              Get a callback
            </LinkButton>
            <LinkButton href={`tel:${SITE.phone}`} variant="outline" size="lg">
              <Phone className="size-4" /> {SITE.phoneDisplay}
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* ---- Minimal footer (business identity + privacy) ---- */}
      <footer className="border-t border-line bg-bg-1/50 py-10 text-sm text-fg-muted">
        <Container className="grid gap-6 sm:grid-cols-2">
          <div>
            <Image
              src="/macksofywhite.png"
              alt="Macksofy Technologies"
              width={150}
              height={47}
              className="mb-3 h-8 w-auto"
            />
            <div className="font-display text-base font-bold text-fg">{SITE.legalName}</div>
            <p className="mt-2 leading-relaxed">
              {SITE.hq.street}, {SITE.hq.locality}, {SITE.hq.city} {SITE.hq.postalCode},{" "}
              {SITE.hq.region}, India
            </p>
            <p className="mt-2">
              <a href={`tel:${SITE.phone}`} className="hover:text-fg">
                {SITE.phoneDisplay}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${SITE.email}`} className="hover:text-fg">
                {SITE.email}
              </a>
            </p>
          </div>
          <div className="sm:text-right">
            <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              <Link href="/privacy" className="hover:text-fg">
                Privacy Policy
              </Link>
              <Link href="/training/ceh" className="hover:text-fg">
                Full course details
              </Link>
              <Link href="/contact" className="hover:text-fg">
                Contact
              </Link>
            </div>
            <p className="mt-4 text-xs text-fg-faint">
              © {new Date().getFullYear()} {SITE.legalName}. CEH and Certified Ethical Hacker are
              trademarks of EC-Council. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
