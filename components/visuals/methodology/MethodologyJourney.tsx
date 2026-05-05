"use client";

import { motion } from "framer-motion";
import { Map, Flag } from "lucide-react";
import { ACCENT_TOKEN, type MethodologyAccent, type MethodologyPhase } from "./Methodology";

interface Props {
  phases: MethodologyPhase[];
  accent: MethodologyAccent;
  subjectLabel?: string;
}

/**
 * Style 4 — JOURNEY
 * Vertical zigzag path. Each phase is a station card alternating left/right
 * around a central animated vertical rail. Map/flag iconography for a
 * "field operations" feel.
 */
export function MethodologyJourney({ phases, accent, subjectLabel }: Props) {
  const tone = ACCENT_TOKEN[accent];

  return (
    <div className="relative">
      {/* Central rail */}
      <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-line z-0">
        <motion.div
          className={`absolute inset-x-0 top-0 ${tone.bg}`}
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, margin: "-40%" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ width: "1px" }}
        />
      </div>

      {/* Start flag */}
      <div className="relative z-10 flex lg:justify-center mb-8">
        <div className={`inline-flex items-center gap-2 rounded-full ${tone.bgSoft} ring-1 ${tone.ring} px-4 py-2 ml-2 lg:ml-0`}>
          <Map className={`size-4 ${tone.text}`} />
          <span className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
            {subjectLabel ? `${subjectLabel} · Start` : "Engagement starts"}
          </span>
        </div>
      </div>

      <ol className="relative z-10 space-y-10 lg:space-y-16">
        {phases.map((p, i) => {
          const right = i % 2 === 1;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                {/* LEFT side card */}
                <div
                  className={`${
                    right ? "lg:order-2 lg:text-left lg:pl-12" : "lg:order-1 lg:text-right lg:pr-12"
                  }`}
                >
                  <PhaseCard
                    phase={p}
                    index={i}
                    tone={tone}
                    align={right ? "left" : "right"}
                  />
                </div>

                {/* CENTER station marker */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <StationMarker index={i} tone={tone} />
                </div>

                {/* RIGHT side decoration */}
                <div className={`hidden lg:block ${right ? "lg:order-1" : "lg:order-2"}`}>
                  <DecorationStrip index={i} tone={tone} reverse={!right} />
                </div>
              </div>

              {/* Mobile marker */}
              <div className="lg:hidden absolute left-0 top-2">
                <StationMarker index={i} tone={tone} compact />
              </div>
              {/* Mobile content offset */}
              <div className="lg:hidden pl-20 -mt-2">
                <PhaseCard phase={p} index={i} tone={tone} align="left" mobile />
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* End flag */}
      <div className="relative z-10 flex lg:justify-center mt-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-2 ring-1 ring-line px-4 py-2 ml-2 lg:ml-0">
          <Flag className="size-4 text-fg-muted" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold text-fg-muted">
            Closure + retest
          </span>
        </div>
      </div>
    </div>
  );
}

function StationMarker({
  index,
  tone,
  compact,
}: {
  index: number;
  tone: (typeof ACCENT_TOKEN)[MethodologyAccent];
  compact?: boolean;
}) {
  return (
    <div className="relative">
      <div className={`absolute inset-0 rounded-full ${tone.bg} opacity-25 blur-md`} />
      <div
        className={`relative grid ${compact ? "size-12" : "size-16"} place-items-center rounded-full bg-bg ring-2 ${tone.ring} ${tone.glow}`}
      >
        <span className={`font-display ${compact ? "text-base" : "text-xl"} font-black ${tone.text}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function DecorationStrip({
  index,
  tone,
  reverse,
}: {
  index: number;
  tone: (typeof ACCENT_TOKEN)[MethodologyAccent];
  reverse: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${reverse ? "justify-end" : ""}`}>
      <div
        className={`h-px flex-1 ${
          reverse
            ? "bg-gradient-to-l from-transparent to-current"
            : "bg-gradient-to-r from-transparent to-current"
        } ${tone.text} opacity-40`}
      />
      <div className={`text-[10px] font-mono uppercase tracking-[0.22em] ${tone.text} opacity-70`}>
        Station {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  index,
  tone,
  align,
  mobile,
}: {
  phase: MethodologyPhase;
  index: number;
  tone: (typeof ACCENT_TOKEN)[MethodologyAccent];
  align: "left" | "right";
  mobile?: boolean;
}) {
  return (
    <div
      className={`inline-block rounded-2xl bg-bg-2/60 ring-1 ring-line p-5 max-w-md ${
        mobile ? "" : "shadow-xl shadow-black/20"
      }`}
    >
      <div
        className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text} ${
          align === "right" ? "lg:justify-end" : "justify-start"
        }`}
      >
        <span>Phase {String(index + 1).padStart(2, "0")}</span>
      </div>
      <h4
        className={`mt-2 font-display text-base font-bold text-fg leading-tight ${
          align === "right" ? "lg:text-right" : "text-left"
        }`}
      >
        {phase.phase}
      </h4>
      <ul
        className={`mt-3 space-y-1.5 text-sm text-fg-muted ${
          align === "right" ? "lg:text-right" : "text-left"
        }`}
      >
        {phase.activities.map((a) => (
          <li
            key={a}
            className={`flex gap-2 ${align === "right" ? "lg:flex-row-reverse" : ""}`}
          >
            <span className={`mt-1.5 size-1 shrink-0 rounded-full ${tone.bg}`} />
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
