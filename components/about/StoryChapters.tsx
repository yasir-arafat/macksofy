"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Building2,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface Chapter {
  era: string;
  year: string;
  icon: typeof Rocket;
  title: string;
  body: string;
  metric: { value: string; label: string };
  accent: "cyan" | "purple" | "amber" | "green";
}

const ACCENTS: Record<Chapter["accent"], { text: string; bg: string; ring: string; glow: string }> = {
  cyan: {
    text: "text-neon-cyan",
    bg: "bg-neon-cyan",
    ring: "ring-neon-cyan/40",
    glow: "shadow-[0_0_24px_-8px_rgba(0,229,255,0.5)]",
  },
  purple: {
    text: "text-neon-purple",
    bg: "bg-neon-purple",
    ring: "ring-neon-purple/40",
    glow: "shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)]",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-300",
    ring: "ring-amber-400/40",
    glow: "shadow-[0_0_24px_-8px_rgba(251,191,36,0.5)]",
  },
  green: {
    text: "text-emerald-300",
    bg: "bg-emerald-400",
    ring: "ring-emerald-400/40",
    glow: "shadow-[0_0_24px_-8px_rgba(74,222,128,0.5)]",
  },
};

const CHAPTERS: Chapter[] = [
  {
    era: "Chapter 01",
    year: "2014",
    icon: Rocket,
    title: "Eight students, one classroom in Mumbai.",
    body: "Macksofy began in 2014 with a single conviction: India needed cybersecurity training as rigorous as the work itself. The first batch had eight students. We taught them ethical hacking on borrowed routers and a single Kali laptop. By the end of the year we'd run four cohorts and quietly built the methodology that still anchors every Macksofy course today.",
    metric: { value: "8 → 200", label: "Students in year one" },
    accent: "cyan",
  },
  {
    era: "Chapter 02",
    year: "2017",
    icon: Building2,
    title: "From training to full-stack consulting.",
    body: "Three years in, our students were getting hired as pen-testers — and then asking us to consult on their first engagements. We listened. By 2017 we'd added VAPT, SOC engineering and red-team services as proper consulting practices, hired full-time OSCP/OSWE practitioners, and moved into the BKC office that's still our HQ. CERT-In empanelment followed shortly.",
    metric: { value: "30+", label: "RBI cooperative banks audited" },
    accent: "purple",
  },
  {
    era: "Chapter 03",
    year: "2021",
    icon: Globe2,
    title: "India + UAE delivery, training at scale.",
    body: "Pandemic-era cohorts pushed Macksofy training online — and global. We opened the Dubai engagement office to serve UAE BFSI and government, ran our first GCC engagements, and crossed 10,000 alumni. The training division earned EC-Council Circle of Excellence (twice) and became an authorised training centre for CompTIA and Mile2.",
    metric: { value: "5", label: "Countries served" },
    accent: "amber",
  },
  {
    era: "Chapter 04",
    year: "Today",
    icon: TrendingUp,
    title: "Four pillars, one cohesive practice.",
    body: "Today Macksofy delivers across four pillars — offensive security, defensive engineering, audit & compliance, and training — with alumni running SOCs, red teams and AppSec functions at HSBC, PwC, Verizon, Tata, Reliance, Maharashtra Police and beyond. Every report we ship is accepted by every Indian regulator on the first read.",
    metric: { value: "200+", label: "Engagements per year" },
    accent: "green",
  },
];

export function StoryChapters() {
  return (
    <section className="relative py-24 sm:py-28 bg-bg-1 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-purple font-semibold">
            <span className="size-1.5 rounded-full bg-neon-purple animate-pulse" />
            Our story · 2014 → today
          </span>
          <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl text-balance leading-[1.05]">
            Four chapters.{" "}
            <span className="gradient-text">One uninterrupted streak.</span>
          </h2>
          <p className="mt-4 text-fg-muted text-pretty">
            Founder-led, vendor-true and Mumbai-rooted since day one. Here&rsquo;s
            how Macksofy went from eight students in 2014 to a multi-discipline
            firm trusted by India&rsquo;s most regulated industries.
          </p>
        </div>

        {/* Spine */}
        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-line"
          />
          <motion.span
            aria-hidden
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-emerald-400"
          />

          <ol className="relative space-y-12 lg:space-y-20">
            {CHAPTERS.map((c, i) => {
              const right = i % 2 === 1;
              const tone = ACCENTS[c.accent];
              const Icon = c.icon;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                  className="relative"
                >
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
                    {/* Left or right card */}
                    <div className={right ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12 lg:text-right"}>
                      <ChapterCard chapter={c} alignRight={!right} />
                    </div>

                    {/* Spine marker */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-2">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full ${tone.bg} opacity-30 blur-md`} />
                        <div
                          className={`relative grid size-14 place-items-center rounded-full bg-bg ring-2 ${tone.ring} ${tone.glow}`}
                        >
                          <Icon className={`size-5 ${tone.text}`} />
                        </div>
                      </div>
                    </div>

                    {/* Empty side (for visual balance) */}
                    <div className={`hidden lg:block ${right ? "lg:order-1" : "lg:order-2"}`} />
                  </div>

                  {/* Mobile spine marker */}
                  <div className="lg:hidden absolute left-0 top-0">
                    <div
                      className={`grid size-12 place-items-center rounded-full bg-bg ring-2 ${tone.ring} ${tone.glow}`}
                    >
                      <Icon className={`size-4 ${tone.text}`} />
                    </div>
                  </div>
                  <div className="lg:hidden mt-3 pl-16 -mt-2">
                    <ChapterCard chapter={c} alignRight={false} mobile />
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function ChapterCard({
  chapter,
  alignRight,
  mobile,
}: {
  chapter: Chapter;
  alignRight: boolean;
  mobile?: boolean;
}) {
  const tone = ACCENTS[chapter.accent];
  if (mobile) {
    // Mobile cards always render left-aligned
    return (
      <div className="rounded-2xl bg-bg-2/60 ring-1 ring-line p-5">
        <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className={`${tone.text} font-bold`}>{chapter.era}</span>
          <span className="text-fg-faint">·</span>
          <span className="text-fg-faint">{chapter.year}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-black text-fg leading-tight">
          {chapter.title}
        </h3>
        <p className="mt-3 text-sm text-fg-muted leading-relaxed">{chapter.body}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-bg-1/60 ring-1 ring-line/60 px-3 py-1 text-[11px]">
          <span className={`font-display text-base font-black ${tone.text} leading-none`}>
            {chapter.metric.value}
          </span>
          <span className="text-fg-muted font-mono text-[10px] uppercase tracking-wider">
            {chapter.metric.label}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-bg-2/60 ring-1 ring-line p-6 lg:p-7">
      <div
        className={`flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] ${
          alignRight ? "lg:justify-end" : ""
        }`}
      >
        <span className={`${tone.text} font-bold`}>{chapter.era}</span>
        <span className="text-fg-faint">·</span>
        <span className="text-fg-faint">{chapter.year}</span>
      </div>
      <h3
        className={`mt-3 font-display text-2xl lg:text-3xl font-black text-fg leading-tight ${
          alignRight ? "lg:text-right" : ""
        }`}
      >
        {chapter.title}
      </h3>
      <p
        className={`mt-4 text-fg-muted leading-relaxed ${
          alignRight ? "lg:text-right" : ""
        }`}
      >
        {chapter.body}
      </p>
      <div className={`mt-5 ${alignRight ? "lg:flex lg:justify-end" : ""}`}>
        <div className="inline-flex items-center gap-2.5 rounded-full bg-bg-1/60 ring-1 ring-line/60 px-3.5 py-1.5">
          <span className={`font-display text-lg font-black ${tone.text} leading-none tabular-nums`}>
            {chapter.metric.value}
          </span>
          <span className="text-fg-muted font-mono text-[10px] uppercase tracking-wider">
            {chapter.metric.label}
          </span>
        </div>
      </div>
    </div>
  );
}
