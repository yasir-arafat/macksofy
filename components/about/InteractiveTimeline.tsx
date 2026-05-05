"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Globe2,
  Award,
  Users,
  Cpu,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  headline: string;
  description: string;
  highlights: string[];
  metric: { value: string; label: string };
  icon: React.ComponentType<{ className?: string }>;
  accent: "cyan" | "blue" | "purple" | "pink" | "amber" | "green";
}

const MILESTONES: Milestone[] = [
  {
    year: "2014",
    headline: "Founded in Bandra Kurla Complex, Mumbai",
    description:
      "Started with eight students in a single classroom. The conviction: India needed cybersecurity training as rigorous as the work itself — taught by working pen-testers, not academics.",
    highlights: [
      "Founder-led, fully Mumbai-rooted",
      "First batch of CEH students cleared on first attempt",
      "Initial focus: ethical hacking + network security training",
    ],
    metric: { value: "8", label: "First-batch students" },
    icon: Rocket,
    accent: "cyan",
  },
  {
    year: "2016",
    headline: "EC-Council Accredited Training Center",
    description:
      "Officially became an EC-Council ATC — and trained the Maharashtra Police Cyber Cell on CHFI digital forensics. The first government-grade engagement that anchored Macksofy's credibility.",
    highlights: [
      "EC-Council ATC accreditation granted",
      "CHFI training delivered to Maharashtra Police Cyber Cell",
      "First Intel India recognition",
    ],
    metric: { value: "1,500+", label: "Professionals trained" },
    icon: Award,
    accent: "amber",
  },
  {
    year: "2018",
    headline: "Service delivery expands across India + UAE",
    description:
      "Crossed from training-only into full cybersecurity consulting. First Big-4 advisory engagement. Opened service delivery into the UAE for BFSI and government clients in Dubai and Abu Dhabi.",
    highlights: [
      "Started VAPT and red-team engagements",
      "First UAE engagements (Dubai, Abu Dhabi)",
      "Tata Group, Reliance and HSBC join client roster",
    ],
    metric: { value: "5,000+", label: "Professionals trained" },
    icon: Globe2,
    accent: "blue",
  },
  {
    year: "2020",
    headline: "CERT-In Empanelled · Information Security Auditor",
    description:
      "Empanelled by the Indian Computer Emergency Response Team under MeitY. The credential that lets us deliver regulator-format audits accepted by SEBI, RBI, UIDAI and IRDAI without rework.",
    highlights: [
      "CERT-In Empanelment granted",
      "First RBI System Audit Report engagements",
      "PCI-DSS practice launched",
    ],
    metric: { value: "30+", label: "Regulated audits/year" },
    icon: ShieldCheck,
    accent: "green",
  },
  {
    year: "2022",
    headline: "OffSec Authorized Training Partner",
    description:
      "Became an OffSec Authorized Training Partner — bringing OSCP, OSEP, OSWE and SOC-200 to Indian and UAE learners with mentor support that continues until they pass. Launched the Macksofy SOC Analyst career track.",
    highlights: [
      "OffSec Authorized Training Partner status",
      "Macksofy SOC Analyst career track launched",
      "ISO 27001 Lead Auditor team formalized",
    ],
    metric: { value: "12,000+", label: "Total alumni" },
    icon: Cpu,
    accent: "purple",
  },
  {
    year: "2024",
    headline: "20,000+ alumni · 500+ pen-tests delivered",
    description:
      "Crossed 20,000 cybersecurity professionals trained and 500 penetration tests delivered. Internally certified to ISO 27001:2022. Service delivery active across 5 countries.",
    highlights: [
      "20,000+ alumni network",
      "Internal ISO 27001:2022 certification",
      "5-country service delivery footprint",
    ],
    metric: { value: "20,000+", label: "Total alumni" },
    icon: Users,
    accent: "pink",
  },
  {
    year: "2025",
    headline: "CSI Cyber Security Awards × 2 · Google VRP Recognition",
    description:
      "Recognized at the CSI Cyber Security Awards 2025 for both Women in Cybersecurity and Outstanding Cyber Security Training/Awareness Initiative. Continued recognition under Google's Vulnerability Reward Program.",
    highlights: [
      "CSI Women in Cyber Security Award 2025",
      "CSI Outstanding Training Initiative 2025",
      "Google VRP Hall of Fame (Open Redirect class)",
    ],
    metric: { value: "9", label: "Industry awards to date" },
    icon: Sparkles,
    accent: "cyan",
  },
];

const accentMap = {
  cyan: { text: "text-neon-cyan", bg: "bg-neon-cyan", border: "border-neon-cyan", ring: "ring-neon-cyan", glow: "shadow-[0_0_50px_rgba(0,229,255,0.4)]" },
  blue: { text: "text-neon-blue", bg: "bg-neon-blue", border: "border-neon-blue", ring: "ring-neon-blue", glow: "shadow-[0_0_50px_rgba(77,124,255,0.4)]" },
  purple: { text: "text-neon-purple", bg: "bg-neon-purple", border: "border-neon-purple", ring: "ring-neon-purple", glow: "shadow-[0_0_50px_rgba(168,85,247,0.4)]" },
  pink: { text: "text-neon-pink", bg: "bg-neon-pink", border: "border-neon-pink", ring: "ring-neon-pink", glow: "shadow-[0_0_50px_rgba(236,72,153,0.4)]" },
  amber: { text: "text-amber-300", bg: "bg-amber-300", border: "border-amber-300", ring: "ring-amber-300", glow: "shadow-[0_0_50px_rgba(252,211,77,0.4)]" },
  green: { text: "text-neon-green", bg: "bg-neon-green", border: "border-neon-green", ring: "ring-neon-green", glow: "shadow-[0_0_50px_rgba(0,255,157,0.4)]" },
} as const;

export function InteractiveTimeline() {
  const [active, setActive] = useState(MILESTONES.length - 1); // start on the most recent
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const current = MILESTONES[active];
  const accent = accentMap[current.accent];
  const Icon = current.icon;

  const goto = (i: number) => {
    setActive(((i % MILESTONES.length) + MILESTONES.length) % MILESTONES.length);
    requestAnimationFrame(() => scrollYearIntoView(i));
  };

  const scrollYearIntoView = (i: number) => {
    const el = railRef.current?.querySelector<HTMLElement>(`[data-year-idx="${i}"]`);
    if (el && railRef.current) {
      const r = el.getBoundingClientRect();
      const c = railRef.current.getBoundingClientRect();
      const offset = el.offsetLeft - c.width / 2 + r.width / 2;
      railRef.current.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollYearIntoView(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full">
      {/* YEAR RAIL */}
      <div className="relative mb-8">
        <div
          ref={railRef}
          className="relative overflow-x-auto scrollbar-thin pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative flex items-end gap-0 min-w-max px-2 mx-auto">
            {/* connector */}
            <div className="absolute left-0 right-0 bottom-3 h-px bg-line" aria-hidden />
            <div
              className={cn("absolute left-0 bottom-3 h-px transition-all duration-500", accent.bg)}
              style={{ width: `${((active + 0.5) / MILESTONES.length) * 100}%` }}
              aria-hidden
            />

            {MILESTONES.map((m, i) => {
              const isActive = i === active;
              const a = accentMap[m.accent];
              return (
                <button
                  key={m.year}
                  data-year-idx={i}
                  onClick={() => goto(i)}
                  className={cn(
                    "relative flex flex-col items-center px-6 sm:px-10 group focus-visible:outline-none",
                    "transition-all"
                  )}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${m.year} — ${m.headline}`}
                >
                  <span
                    className={cn(
                      "font-display font-black transition-all leading-none",
                      isActive
                        ? cn("text-3xl sm:text-4xl", a.text)
                        : "text-xl text-fg-faint group-hover:text-fg-muted"
                    )}
                  >
                    {m.year}
                  </span>
                  <span
                    className={cn(
                      "mt-3 size-3 rounded-full ring-4 transition-all",
                      isActive
                        ? cn("ring-bg", a.bg, a.glow, "scale-125")
                        : "bg-bg ring-line group-hover:ring-line-strong"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div className="relative rounded-3xl glass-strong overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500",
            current.accent === "cyan" && "from-neon-cyan/20 to-transparent",
            current.accent === "blue" && "from-neon-blue/20 to-transparent",
            current.accent === "purple" && "from-neon-purple/20 to-transparent",
            current.accent === "pink" && "from-neon-pink/20 to-transparent",
            current.accent === "amber" && "from-amber-300/20 to-transparent",
            current.accent === "green" && "from-neon-green/20 to-transparent"
          )}
          aria-hidden
        />
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-10 lg:grid-cols-12 p-8 sm:p-10 lg:p-12"
          >
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={cn(
                    "grid size-14 place-items-center rounded-2xl bg-bg-2 ring-2",
                    accent.ring,
                    accent.glow
                  )}
                >
                  <Icon className={cn("size-7", accent.text)} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                    Year
                  </div>
                  <div className={cn("font-display text-3xl font-black leading-none", accent.text)}>
                    {current.year}
                  </div>
                </div>
              </div>
              <h3 className="font-display text-2xl font-black text-fg sm:text-3xl text-balance leading-tight">
                {current.headline}
              </h3>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                {current.description}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className={cn("rounded-2xl border p-5 bg-bg/40", "border-line/60")}>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                  Headline metric
                </div>
                <div className={cn("mt-2 font-display text-4xl font-black leading-none", accent.text)}>
                  {current.metric.value}
                </div>
                <div className="mt-1 text-sm text-fg-muted">{current.metric.label}</div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint mb-3">
                  Year highlights
                </div>
                <ul className="space-y-2">
                  {current.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", accent.bg)} />
                      <span className="text-fg-muted leading-relaxed">{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => goto(active - 1)}
          aria-label="Previous milestone"
          className="grid size-10 place-items-center rounded-full glass hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="font-mono text-xs text-fg-faint">
          {String(active + 1).padStart(2, "0")}{" "}
          <span className="text-fg-muted/50">/</span>{" "}
          {String(MILESTONES.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => goto(active + 1)}
          aria-label="Next milestone"
          className="grid size-10 place-items-center rounded-full glass hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
