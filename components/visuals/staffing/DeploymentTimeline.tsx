"use client";

import { motion } from "framer-motion";
import { Zap, Hourglass } from "lucide-react";

/**
 * The gap this service exists to close.
 *
 * Both figures are from content/services.ts — 5 to 10 working days to deploy
 * from the bench, against a 60 to 120 day in-house hiring cycle in India and
 * the GCC. Step labels describe each path; no day-by-day breakdown is asserted
 * beyond the two endpoints the source states.
 */

const BENCH = [
  "Skill matrix, clearance and shift requirements taken",
  "Three to five candidates shortlisted from bench, with evaluation scorecards",
  "Your technical and culture interviews, inside the same week",
  "NDA, access provisioning, senior buddy assigned for the first 30 days",
];

const HIRING = [
  "Role approved, budget signed off, JD written",
  "Sourcing, screening and a technical panel that competes for calendar time",
  "Offer, negotiation, and a notice period of a month or more",
  "Onboarding and ramp before the first useful output",
];

export function DeploymentTimeline() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Time to a productive seat
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* bench */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-xl bg-emerald-400/[0.07] p-4 ring-1 ring-emerald-400/30"
        >
          <div className="flex items-center gap-2.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/40">
              <Zap className="size-[18px]" />
            </div>
            <div>
              <div className="font-display text-[13px] font-bold text-fg">From the bench</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300">
                5–10 working days
              </div>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "9%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="h-full bg-emerald-400/70"
            />
          </div>
          <ol className="mt-3 space-y-1.5">
            {BENCH.map((b, i) => (
              <li key={b} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
                <span className="mt-0.5 shrink-0 font-mono text-[10px] text-emerald-300/80">
                  {i + 1}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* hiring */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
        >
          <div className="flex items-center gap-2.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-400/10 text-red-300 ring-1 ring-red-400/40">
              <Hourglass className="size-[18px]" />
            </div>
            <div>
              <div className="font-display text-[13px] font-bold text-fg">Hiring in-house</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-red-300">
                60–120 days
              </div>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="h-full bg-red-400/60"
            />
          </div>
          <ol className="mt-3 space-y-1.5">
            {HIRING.map((h, i) => (
              <li key={h} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
                <span className="mt-0.5 shrink-0 font-mono text-[10px] text-red-300/70">
                  {i + 1}
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Bars are scaled to each other on the stated ranges. The comparison is not
        an argument against hiring — it is an argument for covering the gap while
        the hire happens, which is what contract-to-hire is designed for.
      </p>
    </div>
  );
}
