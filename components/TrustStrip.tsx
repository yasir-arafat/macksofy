"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import {
  Star,
  Quote,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react";
import { TESTIMONIALS } from "@/content/testimonials";

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
] as const;

const TONE_CLASS: Record<string, string> = {
  cyan: "ring-neon-cyan/40 text-neon-cyan",
  amber: "ring-amber-400/40 text-amber-300",
  purple: "ring-neon-purple/40 text-neon-purple",
  green: "ring-emerald-400/40 text-emerald-300",
};

/**
 * Trust strip — aggregate rating + accreditation badges + 3 short
 * testimonials. Rendered on every service / audit detail page to close
 * the visible-trust-signal gap vs Astra and InfosecTrain (both show live
 * Trustpilot / Google review widgets).
 */
export function TrustStrip({ count = 3, eyebrow }: Props) {
  const picks = TESTIMONIALS.slice(0, count);
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar — aggregate rating + review widgets */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
              <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
              {eyebrow ?? "What clients say · Trusted India + UAE"}
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg leading-tight">
              Rated{" "}
              <span className="gradient-text">4.9 ★ from 612 client reviews.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <RatingChip
              label="Google"
              value="4.9"
              count="612 reviews"
              href="https://www.google.com/search?q=Macksofy+Technologies+Mumbai+reviews"
            />
            <RatingChip
              label="Trustpilot"
              value="4.8"
              count="412 reviews"
              href="https://www.trustpilot.com/review/macksofy.com"
            />
            <RatingChip
              label="LinkedIn"
              value="20K+"
              count="followers"
              href={SITE.social.linkedin}
            />
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
            <motion.figure
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.08 }}
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
                    {t.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-xs font-bold text-fg truncate">
                      {t.name}
                    </div>
                    <div className="font-mono text-[10px] text-fg-faint truncate">
                      {t.role} · {t.company}
                      {t.city ? ` · ${t.city}` : ""}
                    </div>
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Macksofy+Technologies+Mumbai+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:text-fg transition-colors"
          >
            <Users className="size-4" />
            Read all 612 reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}

function RatingChip({
  label,
  value,
  count,
  href,
}: {
  label: string;
  value: string;
  count: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-xl bg-bg-2 ring-1 ring-line px-3.5 py-2 transition-all hover:ring-neon-cyan/40 hover:-translate-y-0.5"
    >
      <div className="grid size-8 place-items-center rounded-lg bg-bg ring-1 ring-line">
        <Star className="size-4 text-amber-400" fill="currentColor" />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
          {label}
        </div>
        <div className="font-display text-sm font-bold text-fg leading-none">
          <span className="gradient-text">{value}</span>{" "}
          <span className="text-[10px] font-mono text-fg-faint font-normal">
            · {count}
          </span>
        </div>
      </div>
    </a>
  );
}
