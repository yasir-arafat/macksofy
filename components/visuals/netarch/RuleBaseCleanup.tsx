"use client";

import { motion } from "framer-motion";
import { Trash2, EyeOff, ShieldAlert, CheckCircle2, FileClock } from "lucide-react";

/**
 * What a large firewall rule base is actually made of.
 *
 * The headline figures are the anonymised multinational-bank engagement in
 * content/services.ts — 12,000 rules, 47% dead or shadowed, reduced to 6,400
 * with zero outage. The per-category split below sums to that 47% and is shown
 * as one engagement's composition, not an industry average.
 */

const TOTAL = 12000;
const AFTER = 6400;

const CATEGORIES = [
  {
    icon: Trash2,
    label: "Dead",
    pct: 26,
    tone: "bg-red-400/60",
    chip: "text-red-300 ring-red-400/40 bg-red-400/10",
    desc: "No hits in the log-retention window. Object references point at hosts decommissioned years ago.",
  },
  {
    icon: EyeOff,
    label: "Shadowed",
    pct: 21,
    tone: "bg-amber-400/60",
    chip: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    desc: "Never evaluated — an earlier, broader rule always matches first. Removing them changes nothing except the review burden.",
  },
  {
    icon: ShieldAlert,
    label: "Overly permissive",
    pct: 14,
    tone: "bg-violet-400/60",
    chip: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    desc: "ANY on a source, destination or service. Usually the ones commented “temporary” with a date several years in the past.",
  },
  {
    icon: CheckCircle2,
    label: "Carrying real traffic",
    pct: 39,
    tone: "bg-emerald-400/60",
    chip: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    desc: "Kept, tightened where the observed flows are narrower than the rule that permits them.",
  },
];

export function RuleBaseCleanup() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Rule-base composition · one anonymised engagement
      </div>

      {/* stacked bar */}
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/5">
        {CATEGORIES.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${c.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={c.tone}
            title={`${c.label} — ${c.pct}%`}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { v: TOTAL.toLocaleString("en-IN"), k: "rules at start" },
          { v: AFTER.toLocaleString("en-IN"), k: "rules at close" },
          { v: "0", k: "outages caused" },
        ].map((m) => (
          <div key={m.k} className="rounded-xl bg-white/[0.02] p-3 text-center ring-1 ring-line/60">
            <div className="font-display text-xl font-black gradient-text leading-none">{m.v}</div>
            <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
              {m.k}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2.5">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
            >
              <div className="flex items-center gap-2.5">
                <div className={`grid size-9 shrink-0 place-items-center rounded-lg ring-1 ${c.chip}`}>
                  <Icon className="size-4" />
                </div>
                <span className="font-display text-[13px] font-bold text-fg">{c.label}</span>
                <span className="ml-auto font-display text-sm font-black text-fg">{c.pct}%</span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-fg-muted">{c.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex gap-2.5 rounded-lg bg-cyan-500/[0.08] px-3 py-2.5 ring-1 ring-cyan-400/25">
        <FileClock className="mt-0.5 size-4 shrink-0 text-cyan-300" />
        <p className="text-[12px] leading-relaxed text-fg-muted">
          <span className="font-semibold text-cyan-200">Rollback-tested, rule by rule · </span>
          every removal ships with a change window and a tested rollback. That is
          why the outage count above is zero, and it is the part that makes the
          change-advisory board say yes.
        </p>
      </div>
    </div>
  );
}
