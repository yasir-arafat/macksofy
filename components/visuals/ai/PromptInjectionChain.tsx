"use client";

import { motion } from "framer-motion";
import {
  FileWarning,
  Search,
  Brain,
  Wrench,
  Database,
  ShieldOff,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Indirect prompt injection, end to end.
 *
 * Mirrors the anonymised fintech-chatbot finding in content/services.ts:
 * a poisoned document in the retrieval corpus drives the agent's retrieval
 * tool into returning another tenant's data. Each step carries the guardrail
 * that should have stopped it — which is the part clients actually buy.
 */

interface Step {
  icon: LucideIcon;
  actor: string;
  title: string;
  detail: string;
  owasp: string;
  guardrail: string;
  stopped: boolean;
}

const STEPS: Step[] = [
  {
    icon: FileWarning,
    actor: "Attacker",
    title: "Poison the corpus",
    detail:
      "A support article — submitted through a public form and auto-ingested — carries instructions addressed to the model, not the reader.",
    owasp: "LLM04 · Data & Model Poisoning",
    guardrail: "Ingest-time content sanitisation and provenance tagging on the corpus",
    stopped: false,
  },
  {
    icon: Search,
    actor: "RAG pipeline",
    title: "Retrieve the payload",
    detail:
      "A benign user question matches the poisoned chunk on embedding similarity. The injected text enters the context window as trusted source material.",
    owasp: "LLM08 · Vector & Embedding Weaknesses",
    guardrail: "Retrieval-time injection classifier plus per-tenant index isolation",
    stopped: false,
  },
  {
    icon: Brain,
    actor: "Model",
    title: "Follow the instruction",
    detail:
      "Nothing in the context distinguishes retrieved data from operator instruction, so the model treats the payload as a directive.",
    owasp: "LLM01 · Prompt Injection",
    guardrail: "Structured context with hard data/instruction separation",
    stopped: false,
  },
  {
    icon: Wrench,
    actor: "Agent",
    title: "Invoke a privileged tool",
    detail:
      "The agent calls its lookup tool with an identifier it was told to use. The tool trusts the agent's caller identity rather than the end user's.",
    owasp: "LLM06 · Excessive Agency",
    guardrail: "Authorisation enforced at the tool boundary, on the user's identity",
    stopped: false,
  },
  {
    icon: Database,
    actor: "Backend",
    title: "Return another tenant's data",
    detail:
      "The record comes back and lands in the model's context — from where it will be summarised straight to the attacker.",
    owasp: "LLM02 · Sensitive Information Disclosure",
    guardrail: "Row-level tenancy checks independent of the calling service",
    stopped: false,
  },
  {
    icon: ShieldCheck,
    actor: "Output guard",
    title: "Where it finally stops",
    detail:
      "An output validator that scores responses for cross-tenant identifiers is the last line — and the only one in this chain that held.",
    owasp: "LLM05 · Improper Output Handling",
    guardrail: "Deployed and verified during the retest window",
    stopped: true,
  },
];

export function PromptInjectionChain() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Indirect prompt injection · chain of custody
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <ShieldOff className="size-3 text-red-300" /> control absent
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3 text-emerald-300" /> control held
          </span>
        </div>
      </div>

      <ol className="relative mt-6">
        <div
          aria-hidden
          className="absolute left-[21px] top-2 bottom-2 w-px bg-gradient-to-b from-red-400/50 via-violet-400/40 to-emerald-400/50"
        />
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const tone = s.stopped
            ? { ring: "ring-emerald-400/40 bg-emerald-400/10", text: "text-emerald-300" }
            : { ring: "ring-violet-400/40 bg-violet-400/10", text: "text-violet-300" };
          return (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, duration: 0.4 }}
              className="relative flex gap-4 pb-7 last:pb-0"
            >
              <div
                className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${tone.ring} ${tone.text}`}
              >
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-bold text-fg">{s.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                    {s.actor}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{s.detail}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] tracking-wider text-fg-faint">
                    {s.owasp}
                  </span>
                </div>
                <div
                  className={`mt-3 flex gap-2 rounded-lg px-3 py-2 text-[12px] leading-relaxed ring-1 ${
                    s.stopped
                      ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/25"
                      : "bg-red-500/10 text-red-200/90 ring-red-400/25"
                  }`}
                >
                  {s.stopped ? (
                    <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <ShieldOff className="mt-0.5 size-4 shrink-0" />
                  )}
                  <span>{s.guardrail}</span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Reconstructed from an anonymised engagement against a customer-facing
        fintech support agent. Every finding we report ships with the reproducer
        prompt and the guardrail above it.
      </p>
    </div>
  );
}
