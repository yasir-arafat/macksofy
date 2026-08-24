"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Wrench, AlertTriangle, PlugZap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ATT&CK coverage before and after, plus what the coverage map records for
 * each technique.
 *
 * CLAIM DISCIPLINE: the 47% → 71% figure, the 18 techniques and the 14 rules
 * are the anonymised listed-bank engagement recorded in content/services.ts,
 * and are labelled as one engagement. No per-tactic breakdown is shown, because
 * we do not have a sourced one and inventing a plausible grid would be
 * fabricating evidence.
 */

const BEFORE = 47;
const AFTER = 71;

const OUTCOMES = [
  {
    icon: CheckCircle2,
    label: "Detected",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    desc: "Fired, reached the queue, and an analyst actioned it. Recorded with the rule that caught it.",
  },
  {
    icon: Wrench,
    label: "Missed, then tuned",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    desc: "Nothing fired. A rule was written with your analysts during the exercise and validated on replay.",
  },
  {
    icon: AlertTriangle,
    label: "Gap remaining",
    tone: "text-red-300 ring-red-400/40 bg-red-400/10",
    desc: "Needs telemetry you do not currently collect. Ranked in the hardening roadmap with what it would take.",
  },
];

function Bar({ label, value, delay, tone }: { label: string; value: number; delay: number; tone: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-dim">{label}</span>
        <span className="font-display text-lg font-black text-fg">{value}%</span>
      </div>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay }}
          className={`h-full ${tone}`}
        />
      </div>
    </div>
  );
}

export function CoverageDelta() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        ATT&amp;CK coverage delta · one anonymised engagement
      </div>

      <div className="mt-5 space-y-4">
        <Bar label="Before the exercise" value={BEFORE} delay={0} tone="bg-red-400/60" />
        <Bar label="At close" value={AFTER} delay={0.15} tone="bg-emerald-400/60" />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { v: `+${AFTER - BEFORE}`, k: "points of coverage" },
          { v: "18", k: "techniques tested" },
          { v: "14", k: "SIEM rules shipped" },
        ].map((m) => (
          <div key={m.k} className="rounded-xl bg-white/[0.02] p-3 text-center ring-1 ring-line/60">
            <div className="font-display text-xl font-black gradient-text leading-none">{m.v}</div>
            <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
              {m.k}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-fg-faint">
        Listed bank, five days on-site across AD, endpoint and the email gateway.
        Rules were written and validated inside the engagement window, not filed
        as recommendations for next quarter.
      </p>

      <div className="mt-6 border-t border-line/60 pt-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          What the map records per technique
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {OUTCOMES.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal as="div" y={8} delay={i * 0.08} duration={0.3}
                key={o.label}
                className="rounded-xl bg-white/[0.02] p-3.5 ring-1 ring-line/60"
              >
                <div className="flex items-center gap-2">
                  <div className={`grid size-8 shrink-0 place-items-center rounded-lg ring-1 ${o.tone}`}>
                    <Icon className="size-4" />
                  </div>
                  <span className="font-display text-[12.5px] font-bold text-fg">{o.label}</span>
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-fg-muted">{o.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex gap-2.5 rounded-lg bg-red-500/[0.08] px-3 py-2.5 ring-1 ring-red-400/25">
        <PlugZap className="mt-0.5 size-4 shrink-0 text-red-300" />
        <p className="text-[12px] leading-relaxed text-fg-muted">
          <span className="font-semibold text-red-300">The finding nobody scopes for · </span>
          on a separate fintech engagement the EDR detected the technique correctly
          and the alert never reached the SOC queue — a broken connector. A red team
          report would have recorded a miss. The purple loop found the pipeline.
        </p>
      </div>
    </div>
  );
}
