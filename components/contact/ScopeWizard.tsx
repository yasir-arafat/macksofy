"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug,
  ShieldCheck,
  GraduationCap,
  Crosshair,
  Cloud,
  AlertCircle,
  Zap,
  Calendar,
  Building2,
  Hospital,
  Banknote,
  Server,
  Globe,
  Briefcase,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

interface Choice {
  key: string;
  label: string;
  icon: typeof Bug;
  desc?: string;
}

const SERVICES: Choice[] = [
  { key: "Penetration Testing", label: "Pentest", icon: Bug, desc: "Network / app / mobile" },
  { key: "VAPT", label: "VAPT", icon: Crosshair, desc: "Annual + retest" },
  { key: "CERT-In Audit", label: "CERT-In Audit", icon: ShieldCheck, desc: "Regulator-format" },
  { key: "Red Teaming", label: "Red Team", icon: Zap, desc: "TTP-led adversary sim" },
  { key: "Cloud Security", label: "Cloud", icon: Cloud, desc: "AWS · Azure · GCP" },
  { key: "Training (OSCP/CEH)", label: "Training", icon: GraduationCap, desc: "OSCP · CEH · SOC" },
];

const URGENCY: Choice[] = [
  { key: "Urgent · regulator deadline", label: "This week", icon: AlertCircle, desc: "Regulator deadline" },
  { key: "Within 30 days", label: "This month", icon: Zap, desc: "30-day window" },
  { key: "Within a quarter", label: "This quarter", icon: Calendar, desc: "Planning ahead" },
  { key: "Exploring options", label: "Exploring", icon: Globe, desc: "Discovery phase" },
];

const INDUSTRY: Choice[] = [
  { key: "BFSI", label: "BFSI", icon: Banknote, desc: "Bank · NBFC · broker" },
  { key: "SaaS / B2B", label: "SaaS", icon: Server, desc: "Product / platform" },
  { key: "Healthcare", label: "Healthcare", icon: Hospital, desc: "Hospitals · health-tech" },
  { key: "Government / PSU", label: "Government", icon: Building2, desc: "PSU · municipal" },
  { key: "E-commerce", label: "E-commerce", icon: Globe, desc: "Marketplace · D2C" },
  { key: "Other / Multiple", label: "Other", icon: Briefcase, desc: "Tell us in the form" },
];

interface State {
  service: string;
  urgency: string;
  industry: string;
}

const EMPTY: State = { service: "", urgency: "", industry: "" };

export function ScopeWizard() {
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<State>(EMPTY);

  const stepDef = step === 1 ? SERVICES : step === 2 ? URGENCY : INDUSTRY;
  const stepValue =
    step === 1 ? state.service : step === 2 ? state.urgency : state.industry;
  const stepKey = step === 1 ? "service" : step === 2 ? "urgency" : "industry";

  const summary = useMemo(() => {
    if (!state.service) return "";
    const parts = [`Looking at: ${state.service}`];
    if (state.urgency) parts.push(`Timeline: ${state.urgency}`);
    if (state.industry) parts.push(`Industry: ${state.industry}`);
    return parts.join(" · ");
  }, [state]);

  const completed = state.service && state.urgency && state.industry;
  const progress = (state.service ? 1 : 0) + (state.urgency ? 1 : 0) + (state.industry ? 1 : 0);

  const choose = (val: string) => {
    setState((s) => ({ ...s, [stepKey]: val }));
    if (step < 3) setStep(((step + 1) as Step));
  };

  const reset = () => {
    setState(EMPTY);
    setStep(1);
  };

  // Build the prefilled form URL.
  const prefillURL = useMemo(() => {
    if (!state.service) return "/contact#enquiry";
    const params = new URLSearchParams({
      interest: state.service,
    });
    return `/contact?${params.toString()}#enquiry`;
  }, [state]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-neon-cyan/[0.05] to-neon-purple/[0.05] ring-1 ring-line p-5 sm:p-7 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-20 -right-20 size-72 rounded-full bg-neon-cyan/8 blur-3xl pointer-events-none"
      />
      <div className="relative">
        {/* HEADER */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-bold text-neon-cyan">
              <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
              Scope wizard · 60 seconds
            </div>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-black text-fg leading-tight">
              Three taps and we know exactly{" "}
              <span className="gradient-text">what you need.</span>
            </h3>
          </div>
          {progress > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-muted hover:text-fg transition-colors"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          )}
        </div>

        {/* STEP DOTS */}
        <div className="mt-5 flex items-center gap-3">
          {[1, 2, 3].map((s) => {
            const isDone = progress >= s;
            const isCurrent = step === s;
            const labels = ["Service", "Urgency", "Industry"];
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s as Step)}
                className="group flex items-center gap-2"
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-[11px] font-mono font-bold transition-all",
                    isDone
                      ? "bg-emerald-500/15 ring-1 ring-emerald-500/40 text-emerald-300"
                      : isCurrent
                      ? "bg-neon-cyan/15 ring-1 ring-neon-cyan/40 text-neon-cyan"
                      : "bg-bg-2 ring-1 ring-line text-fg-faint"
                  )}
                >
                  {isDone ? <Check className="size-3.5" strokeWidth={3} /> : s}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider transition-colors",
                    isCurrent ? "text-neon-cyan font-bold" : "text-fg-faint"
                  )}
                >
                  {labels[s - 1]}
                </span>
                {s < 3 && (
                  <span
                    className={cn(
                      "h-px w-6 ml-1",
                      progress >= s ? "bg-neon-cyan" : "bg-fg-faint/30"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CHOICES */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-fg-faint font-semibold mb-3">
              {step === 1 && "What do you need?"}
              {step === 2 && "How urgent is it?"}
              {step === 3 && "Industry?"}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {stepDef.map((c, ci) => {
                const Icon = c.icon;
                const selected = stepValue === c.key;
                return (
                  <motion.button
                    key={c.key}
                    type="button"
                    onClick={() => choose(c.key)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + ci * 0.04 }}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "group relative flex flex-col items-start gap-2 rounded-xl p-3.5 text-left transition-all ring-1",
                      selected
                        ? "bg-neon-cyan/10 ring-neon-cyan/50 shadow-[0_0_20px_-8px_rgba(0,229,255,0.45)]"
                        : "bg-bg-2/50 ring-line hover:ring-white/20"
                    )}
                  >
                    <div
                      className={cn(
                        "grid size-8 place-items-center rounded-lg ring-1 transition-all shrink-0",
                        selected
                          ? "bg-neon-cyan/20 ring-neon-cyan/50 text-neon-cyan"
                          : "bg-bg ring-line/60 text-fg-muted group-hover:text-fg"
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div
                        className={cn(
                          "font-display text-sm font-bold leading-tight transition-colors",
                          selected ? "text-neon-cyan" : "text-fg"
                        )}
                      >
                        {c.label}
                      </div>
                      {c.desc && (
                        <div className="text-[10px] text-fg-dim leading-snug mt-0.5">
                          {c.desc}
                        </div>
                      )}
                    </div>
                    {selected && (
                      <Check
                        className="absolute top-2 right-2 size-3.5 text-neon-cyan"
                        strokeWidth={3}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SUMMARY + CTA */}
        <div className="mt-6 pt-5 border-t border-line/60">
          {!summary ? (
            <p className="text-xs text-fg-faint">
              Pick a service to start building your scope.
            </p>
          ) : (
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
                  Your scope so far
                </div>
                <p className="mt-1.5 text-sm text-fg leading-relaxed">
                  {summary}
                </p>
              </div>
              {completed ? (
                <Link
                  href={prefillURL}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-4 py-2 text-xs font-bold text-white shadow-[0_0_24px_-8px_rgba(0,229,255,0.6)] hover:shadow-[0_0_32px_-6px_rgba(168,85,247,0.6)] transition-shadow whitespace-nowrap"
                >
                  Open prefilled form
                  <ArrowRight className="size-3.5" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setStep((step < 3 ? step + 1 : 3) as Step)
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-bg-2 ring-1 ring-line px-4 py-2 text-xs font-bold text-fg-muted hover:text-fg transition-colors whitespace-nowrap"
                >
                  Continue
                  <ArrowRight className="size-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
