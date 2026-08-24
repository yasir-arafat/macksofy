"use client";

import Link from "next/link";
import {
  Star,
  Quote,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react";
import { TESTIMONIALS } from "@/content/testimonials";
import { Reveal } from "@/components/motion/Reveal";

interface Props {
  /** Optional cap on testimonials displayed (default 3). */
  count?: number;
  /** Optional override for the eyebrow line. */
  eyebrow?: string;
}

const ACCREDITATIONS = [
  { label: "CERT-In Empanelled", sub: "Govt of India · MeitY", icon: ShieldCheck, tone: "cyan" },
  { label: "EC-Council ATC", sub: "Authorized Training", icon: Award, tone: "amber" },
  { label: "ISO 27001 Certified", sub: "Info Security Mgmt", icon: ShieldCheck, tone: "green" },
  { label: "CompTIA Authorized Partner", sub: "Training Delivery", icon: Award, tone: "purple" },
] as const;

const TONE_CLASS: Record<string, string> = {
  cyan: "ring-neon-cyan/40 text-neon-cyan",
  amber: "ring-amber-400/40 text-amber-300",
  purple: "ring-neon-purple/40 text-neon-purple",
  green: "ring-emerald-400/40 text-emerald-300",
};

/**
 * Trust strip — accreditation badges + 3 short client testimonials.
 * Rendered on every service / audit detail page.
 *
 * The aggregate-rating bar this component used to open with ("4.9 from 612
 * client reviews", plus Google / Trustpilot / LinkedIn chips) was REMOVED: the
 * figures were hardcoded, unsourced, contradicted each other (612 vs 412) and
 * linked to a Google *search* rather than a Business Profile. Do not reinstate
 * a rating without wiring it to a real review-provider feed — the same rule
 * lib/schema.ts already applies to aggregateRating in structured data.
 *
 * Testimonials are attributed by role + sector only. See content/testimonials.ts.
 */
export function TrustStrip({ count = 3, eyebrow }: Props) {
  const picks = TESTIMONIALS.slice(0, count);
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar — accreditation headline */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
              <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
              {eyebrow ?? "What clients say · Trusted India + UAE"}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg leading-tight">
              Empanelled by CERT-In.{" "}
              <span className="gradient-text">Accredited by EC-Council.</span>
            </h2>
          </div>
        </div>

        {/* Accreditation row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {ACCREDITATIONS.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                className={`flex items-center gap-3 rounded-xl bg-bg-2/40 ring-1 ${TONE_CLASS[a.tone]} p-3 ring-1`}
              >
                <Icon className="size-5 shrink-0" />
                <div className="min-w-0">
                  <div className="font-display text-xs font-bold text-fg leading-tight">
                    {a.label}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                    {a.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid gap-4 lg:grid-cols-3">
          {picks.map((t, i) => (
            <Reveal as="figure" y={16} delay={0.05 + i * 0.08} duration={0.45} margin="-10%"
              key={`${t.role}-${t.company}-${i}`}
              className="rounded-2xl glass p-6 relative overflow-hidden flex flex-col"
            >
              <div
                aria-hidden
                className="absolute -top-8 -right-8 size-32 rounded-full bg-neon-cyan/5 blur-2xl pointer-events-none"
              />
              <div className="relative">
                <Quote className="size-5 text-neon-cyan/70" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="size-3.5 text-amber-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-fg leading-relaxed italic font-display flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-line/60 flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-full bg-bg-2 ring-1 ring-line text-neon-cyan font-display font-bold text-sm">
                    {t.company
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-xs font-bold text-fg truncate">
                      {t.role}
                    </div>
                    <div className="font-mono text-[10px] text-fg-faint truncate">
                      {t.company}
                      {t.city ? ` · ${t.city}` : ""}
                    </div>
                  </div>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/clients"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:text-fg transition-colors"
          >
            <Users className="size-4" />
            See the clients we work with →
          </Link>
        </div>
      </div>
    </section>
  );
}
