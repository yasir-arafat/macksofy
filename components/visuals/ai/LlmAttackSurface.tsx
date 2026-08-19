"use client";

import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  ShieldCheck,
  Cpu,
  Layers,
  Wrench,
  GraduationCap,
  Package,
  type LucideIcon,
} from "lucide-react";

/**
 * The seven layers of a production LLM system, and what gets tested at each.
 *
 * OWASP LLM Top 10 identifiers are the 2025 list. MITRE ATLAS tactic names are
 * ATLAS's own. Both are cited as published — nothing here is a Macksofy metric.
 */

interface Layer {
  icon: LucideIcon;
  name: string;
  sub: string;
  owasp: string[];
  atlas: string;
  tests: string[];
  accent: string;
  bar: string;
}

const LAYERS: Layer[] = [
  {
    icon: MonitorSmartphone,
    name: "Client & prompt surface",
    sub: "Chat UI, API, system prompt",
    owasp: ["LLM01", "LLM07"],
    atlas: "Initial Access",
    tests: ["System-prompt extraction", "Jailbreak sweep", "Output-format hijack"],
    accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
    bar: "from-sky-400/70",
  },
  {
    icon: ShieldCheck,
    name: "Guardrails",
    sub: "Input filters, output validators",
    owasp: ["LLM05", "LLM09"],
    atlas: "Defense Evasion",
    tests: ["Classifier bypass", "Encoding + multi-turn evasion", "PII/secret leak checks"],
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    bar: "from-emerald-400/70",
  },
  {
    icon: Cpu,
    name: "Model",
    sub: "Hosted or self-served weights",
    owasp: ["LLM01", "LLM10"],
    atlas: "ML Model Access",
    tests: ["Refusal-boundary probing", "Membership inference", "Cost-amplification"],
    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    bar: "from-violet-400/70",
  },
  {
    icon: Layers,
    name: "RAG & vector store",
    sub: "Embeddings, index, retrieval",
    owasp: ["LLM08", "LLM02"],
    atlas: "Collection",
    tests: ["Corpus poisoning", "Cross-tenant retrieval", "Embedding-space adversarials"],
    accent: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    bar: "from-cyan-400/70",
  },
  {
    icon: Wrench,
    name: "Agent & tools",
    sub: "Function calls, MCP servers",
    owasp: ["LLM06"],
    atlas: "Execution",
    tests: ["Confused-deputy tool calls", "Schema fuzzing", "Sandbox escape"],
    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    bar: "from-amber-400/70",
  },
  {
    icon: GraduationCap,
    name: "Training & fine-tune",
    sub: "Corpora, RLHF, eval sets",
    owasp: ["LLM04", "LLM02"],
    atlas: "ML Attack Staging",
    tests: ["Poisoning vectors", "Model inversion", "PII recall from corpus"],
    accent: "text-pink-300 ring-pink-400/40 bg-pink-400/10",
    bar: "from-pink-400/70",
  },
  {
    icon: Package,
    name: "Supply chain",
    sub: "Weights, embeddings, plugins",
    owasp: ["LLM03"],
    atlas: "Resource Development",
    tests: ["Weight provenance", "Embedding-model trust", "Dependency + plugin review"],
    accent: "text-orange-300 ring-orange-400/40 bg-orange-400/10",
    bar: "from-orange-400/70",
  },
];

export function LlmAttackSurface() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          AI attack surface · seven layers
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          OWASP LLM Top 10 (2025) · MITRE ATLAS
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {LAYERS.map((l, i) => {
          const Icon = l.icon;
          return (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="relative overflow-hidden rounded-xl bg-white/[0.02] ring-1 ring-line/60"
            >
              <div
                aria-hidden
                className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${l.bar} to-transparent`}
              />
              <div className="grid gap-3 p-4 pl-5 sm:grid-cols-12 sm:items-center">
                <div className="flex items-center gap-3 sm:col-span-4">
                  <div className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${l.accent}`}>
                    <Icon className="size-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-[13px] font-bold leading-tight text-fg">
                      {l.name}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                      {l.sub}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:col-span-3">
                  {l.owasp.map((o) => (
                    <span
                      key={o}
                      className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-wider text-fg-muted ring-1 ring-white/10"
                    >
                      {o}
                    </span>
                  ))}
                  <span className="font-mono text-[10px] tracking-wider text-fg-faint">
                    {l.atlas}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:col-span-5">
                  {l.tests.map((t) => (
                    <li key={t} className="flex items-center gap-1.5 text-[11.5px] text-fg-muted">
                      <span className="text-violet-300/60">▸</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        A scope that stops at the chat box tests one of these seven layers. The
        findings that matter — tenancy, tool authorisation, corpus trust — live
        below it.
      </p>
    </div>
  );
}
