"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import type { PricingPackage } from "@/content/pricing";
import { Reveal } from "@/components/motion/Reveal";

interface Props {
  pkg: PricingPackage;
  /** Used to prefill the contact form's interest field. */
  contactInterest: string;
  /** Optional eyebrow override. */
  eyebrow?: string;
}

function fmtRange(from: number, to?: number, starts?: boolean): string {
  const f = (n: number) =>
    n >= 100 ? `₹${(n / 100).toFixed(1)}cr` : `₹${n}L`;
  if (starts) return `Starts at ${f(from)}`;
  if (to) return `${f(from)}–${f(to)}`;
  return f(from);
}

/**
 * Three-tier transparent pricing strip rendered on every service / audit
 * detail page. Closes a major SEO + conversion gap vs Astra and InfosecTrain
 * which both publish indicative prices.
 */
export function PricingTiers({
  pkg,
  contactInterest,
  eyebrow = "Indicative pricing · INR",
}: Props) {
  const tiers = [
    { ...pkg.starter, key: "starter" },
    { ...pkg.standard, key: "standard" },
    { ...pkg.enterprise, key: "enterprise" },
  ];

  return (
    <section className="py-20 bg-bg-1 border-y border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
              <Sparkles className="size-3" />
              {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Transparent tiers.{" "}
              <span className="gradient-text">No surprises at quote time.</span>
            </h2>
            <p className="mt-3 text-fg-muted text-pretty">
              Indicative price ranges based on typical Indian engagements. Final
              fixed-price quote within 72 hours of the discovery call.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 px-3 py-1.5 text-xs font-mono text-emerald-300">
            <ShieldCheck className="size-3.5" />
            Free 30-day retest · CERT-In format reports
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal as="div" y={16} delay={0.05 + i * 0.08} duration={0.45} margin="-10%"
              key={t.key}
              className={`relative rounded-3xl p-6 sm:p-7 ring-1 transition-all overflow-hidden ${
                t.popular
                  ? "bg-gradient-to-br from-neon-cyan/[0.08] to-neon-purple/[0.08] ring-neon-cyan/40 shadow-[0_0_40px_-12px_rgba(0,229,255,0.4)]"
                  : "bg-bg-2/60 ring-line hover:ring-white/20"
              }`}
            >
              {t.popular && (
                <div
                  aria-hidden
                  className="absolute -top-px left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-b-full bg-neon-cyan/20 ring-1 ring-neon-cyan/40 px-3 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-neon-cyan"
                >
                  Most-asked
                </div>
              )}

              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint font-bold">
                Tier {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-xl font-black text-fg leading-tight">
                {t.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                <span
                  className={`font-display text-4xl sm:text-5xl font-black leading-none tracking-tighter tabular-nums ${
                    t.popular ? "gradient-text" : "text-fg"
                  }`}
                >
                  {fmtRange(t.fromINR, t.toINR, t.starts)}
                </span>
              </div>
              <div className="mt-2 text-xs text-fg-muted leading-snug">
                {t.bestFor}
              </div>

              <ul className="mt-5 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`size-4 shrink-0 mt-0.5 ${
                        t.popular ? "text-neon-cyan" : "text-emerald-400"
                      }`}
                      strokeWidth={3}
                    />
                    <span className="text-fg-muted leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?interest=${encodeURIComponent(contactInterest)}#enquiry`}
                className={`mt-6 inline-flex items-center justify-between w-full gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                  t.popular
                    ? "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-white shadow-[0_0_24px_-8px_rgba(0,229,255,0.55)] hover:shadow-[0_0_36px_-6px_rgba(168,85,247,0.55)]"
                    : "bg-bg ring-1 ring-line text-fg-muted hover:text-fg hover:ring-neon-cyan/40"
                }`}
              >
                Request a fixed-price quote
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          ))}
        </div>

        {pkg.notes && (
          <p className="mt-6 text-xs text-fg-faint max-w-3xl leading-relaxed">
            <span className="font-mono uppercase tracking-wider">Note · </span>
            {pkg.notes}
          </p>
        )}
      </div>
    </section>
  );
}
