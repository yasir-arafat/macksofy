"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Compass,
  Layers,
  FileText,
  ShieldCheck,
  Clock,
  Zap,
  Award,
  Target,
  type LucideIcon,
} from "lucide-react";
import { PillarRadial } from "./PillarRadial";
import { Reveal } from "@/components/motion/Reveal";

export interface AuditPillar {
  title: string;
  blurb?: string;
  points: string[];
}

interface Phase {
  phase: string;
  activities: string[];
}

interface Props {
  shortTitle: string;
  pillars?: AuditPillar[];
  fallbackFrameworks?: string[];
  fallbackDeliverables?: string[];
  phases: Phase[];
  authority?: boolean;
}

const PILLAR_ICONS: LucideIcon[] = [
  ShieldCheck,
  Layers,
  Compass,
  FileText,
  Award,
  Target,
];

const PILLAR_ACCENTS = [
  "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10",
  "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
  "text-rose-300 ring-rose-400/40 bg-rose-400/10",
  "text-sky-300 ring-sky-400/40 bg-sky-400/10",
];

/* ---------- Animated count-up ---------- */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString("en-IN")}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, rounded, to]);

  return <span ref={ref}>{display}</span>;
}

/* ---------- Synthesise pillars from frameworks when none provided ---------- */
function pillarsFromFrameworks(frameworks: string[]): AuditPillar[] {
  if (!frameworks || frameworks.length === 0) return [];
  // Bucket frameworks into 2-4 pillars of ~3 items each
  const buckets: AuditPillar[] = [];
  const chunk = Math.max(2, Math.ceil(frameworks.length / 3));
  const groupTitles = [
    "Core control areas",
    "Supplementary controls",
    "Reporting & evidence",
  ];
  for (let i = 0; i < frameworks.length; i += chunk) {
    const slice = frameworks.slice(i, i + chunk);
    buckets.push({
      title: groupTitles[buckets.length] ?? "Additional controls",
      points: slice,
    });
  }
  return buckets;
}

export function AuditDeepDive({
  shortTitle,
  pillars,
  fallbackFrameworks,
  fallbackDeliverables,
  phases,
  authority,
}: Props) {
  const pillarsToRender =
    pillars && pillars.length > 0
      ? pillars
      : pillarsFromFrameworks(fallbackFrameworks ?? []);

  // Engagement-level stats inferred from existing data
  const stats = [
    { value: phases.length, label: "Methodology phases", icon: Compass, suffix: "" },
    {
      value: phases.reduce((s, p) => s + p.activities.length, 0),
      label: "Documented activities",
      icon: Layers,
      suffix: "",
    },
    {
      value: fallbackDeliverables?.length ?? 0,
      label: "Auditor-ready deliverables",
      icon: FileText,
      suffix: "",
    },
    {
      value: authority ? 12 : 30,
      label: authority ? "Years CERT-In empanelment" : "Day retest window",
      icon: authority ? Award : Clock,
      suffix: authority ? "+ yrs" : " day",
    },
  ];

  return (
    <>
      {/* AT A GLANCE — animated counters */}
      <section className="py-16 sm:py-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
              <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
              At a glance
            </div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The shape of a {shortTitle}{" "}
              <span className="gradient-text">engagement.</span>
            </h2>
            <p className="mt-3 text-fg-muted text-pretty leading-relaxed">
              Every number below is grounded in how Macksofy actually runs the
              engagement — not aspirational marketing copy.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="div" y={14} delay={i * 0.06} duration={0.4}
                  key={s.label}
                  className="relative rounded-2xl glass p-5 sm:p-6 overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute -top-12 -right-12 size-32 rounded-full bg-neon-cyan/10 blur-2xl"
                  />
                  <div className="relative flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-neon-cyan/10 ring-1 ring-neon-cyan/30 text-neon-cyan">
                      <Icon className="size-5" />
                    </div>
                    <Zap className="size-3 text-fg-faint ml-auto opacity-50" />
                  </div>
                  <div className="relative mt-5 font-display text-4xl font-black gradient-text leading-none tabular-nums">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                    {s.label}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLARS — what the audit covers */}
      {pillarsToRender.length > 0 && (
        <section className="py-20 bg-bg-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-300 font-bold">
                <span className="size-1.5 rounded-full bg-violet-300 animate-pulse" />
                Audit pillars
              </div>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                What we actually <span className="gradient-text">examine.</span>
              </h2>
              <p className="mt-3 text-fg-muted text-pretty leading-relaxed">
                Each pillar is a distinct workstream inside the engagement —
                scoped, evidenced, and signed off independently before the audit
                pack is assembled.
              </p>
            </div>

            {/* Radial coverage infographic */}
            <div className="mt-12 rounded-2xl bg-bg-2/30 ring-1 ring-line p-6 sm:p-8">
              <PillarRadial pillars={pillarsToRender} />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pillarsToRender.map((p, i) => {
                const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
                const accent = PILLAR_ACCENTS[i % PILLAR_ACCENTS.length];
                return (
                  <Reveal as="div" y={16} delay={i * 0.05} duration={0.45} margin="-40px"
                    key={p.title}
                    whileHover={{ y: -4 }}
                    className="group relative rounded-2xl glass p-6 h-full flex flex-col overflow-hidden transition-all ring-1 ring-transparent hover:ring-neon-cyan/40"
                  >
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="relative flex items-center gap-3 mb-4">
                      <div
                        className={`grid size-11 place-items-center rounded-xl ring-1 ${accent} transition-transform group-hover:scale-110`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                        Pillar {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative font-display text-base font-bold text-fg leading-tight">
                      {p.title}
                    </div>
                    {p.blurb && (
                      <p className="relative mt-2 text-[13px] text-fg-muted leading-relaxed">
                        {p.blurb}
                      </p>
                    )}
                    <ul className="relative mt-4 space-y-1.5 text-[12.5px] text-fg-muted">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TIMELINE — engagement at a glance */}
      {phases.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300 font-bold">
                <span className="size-1.5 rounded-full bg-amber-300 animate-pulse" />
                Engagement timeline
              </div>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                From kick-off to{" "}
                <span className="gradient-text">regulator-ready report.</span>
              </h2>
              <p className="mt-3 text-fg-muted text-pretty leading-relaxed">
                The horizontal flow below shows the typical week-by-week shape
                of a {shortTitle} engagement. Click any station for detail in
                the methodology section above.
              </p>
            </div>

            <div className="relative mt-14 overflow-x-auto pb-2">
              <div
                className="relative min-w-[640px] sm:min-w-0"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))`,
                  columnGap: "0.75rem",
                }}
              >
                {/* Continuous gradient track behind nodes */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-neon-cyan via-violet-300 to-emerald-300"
                />
                {phases.map((p, i) => {
                  const accent = PILLAR_ACCENTS[i % PILLAR_ACCENTS.length];
                  return (
                    <Reveal as="div" y={10} delay={0.2 + i * 0.08} duration={0.45} margin="-40px"
                      key={p.phase}
                      className="relative flex flex-col items-center text-center"
                    >
                      <div
                        className={`grid size-10 place-items-center rounded-full ring-2 bg-bg-2 ${accent}`}
                      >
                        <span className="font-mono text-[11px] font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                        Week {i + 1}
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-fg leading-tight max-w-[18ch] line-clamp-2">
                        {p.phase.replace(/^\d+\s*[·.\-]\s*/, "")}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
