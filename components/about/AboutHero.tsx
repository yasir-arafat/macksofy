"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { AuroraBackground } from "@/components/visuals/AuroraBackground";
import { SpotlightCursor } from "@/components/visuals/SpotlightCursor";
import {
  ScanLines,
  Vignette,
  FilmGrain,
  SweepLine,
} from "@/components/visuals/CinematicEffects";
import { Counter } from "@/components/motion/Counter";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const HEADLINE_LINE_1 = ["The", "team", "that", "does", "the", "work,"];
const HEADLINE_LINE_2 = ["teaches", "the", "work."];

const STATS = [
  { value: 11, suffix: "+", label: "Years" },
  { value: 20000, suffix: "+", label: "Trained" },
  { value: 250, suffix: "+", label: "Enterprises" },
  { value: 5, suffix: "", label: "Countries" },
];

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[88vh] flex flex-col">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <AuroraBackground />
      <ParticleBackground density={90} />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={700} intensity="strong" />
      <GlowOrb className="bottom-0 right-1/4" color="purple" size={500} />
      <SpotlightCursor color="rgba(168,85,247,0.15)" size={520} />
      <SweepLine color="#a855f7" duration={6} delay={1.5} />
      <ScanLines />
      <FilmGrain opacity={0.05} />
      <Vignette />

      <Container className="relative flex-1 flex flex-col justify-center pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="mb-8">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center w-full">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative inline-flex items-center gap-2 rounded-full bg-neon-purple/10 ring-1 ring-neon-purple/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-neon-purple">
                <Sparkles className="size-3" />
                Founded {SITE.founded} · Mumbai BKC · India + UAE
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-balance leading-[0.92]">
              <span className="block">
                {HEADLINE_LINE_1.map((w, i) => (
                  <RevealWord key={i} delay={0.15 + i * 0.06}>
                    {w}
                  </RevealWord>
                ))}
              </span>
              <span className="block mt-1">
                {HEADLINE_LINE_2.map((w, i) => (
                  <RevealWord key={i} delay={0.5 + i * 0.07} gradient>
                    {w}
                  </RevealWord>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted text-pretty"
            >
              Macksofy Technologies is a CERT-In empanelled cybersecurity firm
              headquartered in Bandra Kurla Complex, Mumbai — with an advanced
              training division authorised by EC-Council, OffSec and CompTIA. We
              have launched 20,000+ careers and run engagements across India and
              the UAE since 2014.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple h-12 px-6 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)] transition-shadow"
              >
                Talk to a senior consultant
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/clients"
                className="inline-flex items-center gap-2 rounded-full border-2 border-neon-cyan h-12 px-5 text-sm font-bold text-neon-cyan hover:bg-neon-cyan hover:text-bg transition-colors"
              >
                See our clients
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 px-3 text-sm font-semibold text-fg-muted hover:text-neon-cyan transition-colors"
              >
                <Phone className="size-4" />
                {SITE.phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <CertInBadge size="sm" />
              <span className="font-mono text-xs text-fg-faint">
                ISO 27001 · EC-Council ATC · CompTIA Partner
              </span>
            </motion.div>
          </div>

          {/* Right column: meta-stats + manifesto teaser card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-4"
          >
            <div className="rounded-3xl glass-strong p-5 sm:p-6 glow-blend relative overflow-hidden">
              <SweepLine color="#00e5ff" duration={6} delay={2} />
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
                Macksofy by the numbers
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-xl bg-bg-1/60 ring-1 ring-line/60 p-3">
                    <div className="font-display text-2xl font-black gradient-text leading-none tabular-nums">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-line/60 grid gap-2 text-xs">
                {[
                  ["Founded", "2014 · Mumbai BKC"],
                  ["Founders", "Yasir Mansuri · Mansoori family"],
                  ["Discipline", "Offence · Defence · Audit · Train"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-2">
                    <span className="text-fg-faint font-mono text-[10px] uppercase tracking-wider">
                      {k}
                    </span>
                    <span className="text-fg font-semibold text-right truncate">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function RevealWord({
  children,
  delay,
  gradient = false,
}: {
  children: React.ReactNode;
  delay: number;
  gradient?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "inline-block mr-2.5 sm:mr-3 lg:mr-4",
          gradient && "gradient-text"
        )}
      >
        {children}
      </motion.span>
    </span>
  );
}
