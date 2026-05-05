"use client";

import { motion } from "framer-motion";
import { PhoneCall, FileText, Receipt, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Discovery call",
    sla: "Within 4 business hours",
    desc: "30-min call with a senior consultant — we listen first, scope second.",
  },
  {
    icon: FileText,
    title: "Scope + NDA",
    sla: "Day 1–2",
    desc: "Mutual NDA, scope letter, asset inventory, rules of engagement.",
  },
  {
    icon: Receipt,
    title: "Fixed quote",
    sla: "Day 2–3",
    desc: "Fixed-price proposal with effort, timeline, deliverables and team.",
  },
  {
    icon: Rocket,
    title: "Kickoff",
    sla: "Day 5–7",
    desc: "Kickoff workshop, secure tooling provisioned, calendar shared.",
  },
];

export function NextSteps() {
  return (
    <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line p-6 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold inline-flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
        What happens next
      </div>
      <h3 className="mt-3 font-display text-xl sm:text-2xl font-black text-fg leading-tight">
        From enquiry to kickoff in a week.
      </h3>
      <ol className="mt-6 space-y-5 relative">
        <span
          aria-hidden
          className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan/40 via-neon-purple/30 to-transparent"
        />
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 + i * 0.08, duration: 0.35 }}
              className="relative flex gap-4"
            >
              <div className="relative grid size-9 shrink-0 place-items-center rounded-full bg-bg ring-1 ring-neon-cyan/40 text-neon-cyan z-10 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div className="font-display text-sm font-bold text-fg">
                    {s.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-cyan">
                    {s.sla}
                  </div>
                </div>
                <p className="mt-1 text-xs text-fg-muted leading-relaxed">{s.desc}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
