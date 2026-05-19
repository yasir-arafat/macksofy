"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Terminal, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import dynamic from "next/dynamic";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { AuroraBackground } from "@/components/visuals/AuroraBackground";
import { SpotlightCursor } from "@/components/visuals/SpotlightCursor";

const HeroThreeScene = dynamic(
  () => import("@/components/visuals/HeroThreeScene").then((m) => m.HeroThreeScene),
  { ssr: false }
);

/**
 * Three.js + 220-particle WebGL is meaningful eye-candy on desktop but a
 * main-thread tax on mid-range mobile (Indian + UAE buyer reality). Bail
 * out under 768px or on coarse-pointer devices. Saves ~600-900ms LCP.
 */
function useDesktopOnly(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setOk(mq.matches);
    const handler = (e: MediaQueryListEvent) => setOk(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return ok;
}
import {
  ScanLines,
  Vignette,
  FilmGrain,
  ScrollPrompt,
  SweepLine,
} from "@/components/visuals/CinematicEffects";
import { Typewriter } from "@/components/motion/Typewriter";
import { Counter } from "@/components/motion/Counter";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const TYPEWRITER_PHRASES = [
  "ethical hacking labs",
  "OSCP-certified pen-testers",
  "CERT-In empanelled audits",
  "24×7 SOC operations",
  "real-world red teams",
];

const HEADLINE_LINE_1 = ["Securing", "businesses."];
const HEADLINE_LINE_2 = ["Training", "cyber", "warriors."];

const HERO_REVEAL = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const desktop = useDesktopOnly();
  return (
    <section className="relative isolate overflow-hidden min-h-[92vh] flex flex-col">
      {/* CINEMATIC BACKDROP STACK — heavy WebGL + cursor-follow only on desktop */}
      {desktop && <HeroThreeScene />}
      <div className="absolute inset-0 bg-grid opacity-20 mix-blend-screen pointer-events-none" />
      <AuroraBackground />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={700} intensity="strong" />
      <GlowOrb className="bottom-0 right-1/4" color="purple" size={500} />
      {desktop && (
        <GlowOrb className="top-1/3 -left-20" color="blue" size={400} intensity="soft" />
      )}
      {desktop && <SpotlightCursor color="rgba(0,229,255,0.18)" size={520} />}
      <SweepLine color="#00e5ff" duration={5} delay={2} />
      <ScanLines />
      <FilmGrain opacity={0.06} />
      <Vignette />

      {/* TICKER STRIP */}
      <CinematicTicker />

      <Container className="relative flex-1 flex items-center pt-20 pb-32 sm:pt-24 sm:pb-36 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center w-full">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative inline-flex items-center gap-2 rounded-full bg-neon-cyan/10 ring-1 ring-neon-cyan/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-neon-cyan">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-neon-cyan" />
                </span>
                CERT-In Empanelled · India + UAE
                <Sparkles className="size-3" />
              </span>
            </motion.div>

            {/* Word-by-word headline reveal */}
            <h1 className="mt-7 font-display text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-balance leading-[0.92]">
              <span className="block">
                {HEADLINE_LINE_1.map((w, i) => (
                  <RevealWord key={i} delay={0.15 + i * 0.08}>
                    {w}
                  </RevealWord>
                ))}
              </span>
              <span className="block mt-1">
                {HEADLINE_LINE_2.map((w, i) => (
                  <RevealWord key={i} delay={0.35 + i * 0.08} gradient>
                    {w}
                  </RevealWord>
                ))}
              </span>
            </h1>

            <motion.div
              initial={HERO_REVEAL.initial}
              animate={HERO_REVEAL.animate}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted text-pretty"
            >
              CERT-In empanelled cybersecurity consulting firm with an advanced training
              division. We deliver{" "}
              <span className="text-neon-cyan font-semibold">
                <Typewriter phrases={TYPEWRITER_PHRASES} />
              </span>
              <br />
              for India&rsquo;s top BFSI, fintech and government clients.
            </motion.div>

            <motion.div
              initial={HERO_REVEAL.initial}
              animate={HERO_REVEAL.animate}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <LinkButton href="/contact" size="lg" withArrow>
                Book Consultation
              </LinkButton>
              <LinkButton href="/training" variant="outline" size="lg">
                Enroll Now
              </LinkButton>
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
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 max-w-xl"
            >
              {[
                { value: 20000, suffix: "+", label: "Learners trained" },
                { value: 250, suffix: "+", label: "Enterprise clients" },
                { value: 11, suffix: "+ yrs", label: "In business" },
                { value: 5, suffix: "", label: "Countries served" },
              ].map((s) => (
                <div key={s.label} className="border-l border-neon-cyan/40 pl-3">
                  <div className="font-display text-2xl font-black gradient-text">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-fg-faint">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <LiveOpsPanel />
          </motion.div>
        </div>
      </Container>

      <ScrollPrompt />
    </section>
  );
}

/* ============================================================ */
/*  Word-by-word reveal helper                                   */
/* ============================================================ */

function RevealWord({
  children,
  delay,
  gradient = false,
}: {
  children: React.ReactNode;
  delay: number;
  gradient?: boolean;
}) {
  // SSR ships the H1 visible (opacity 1, y 0) so crawlers, no-JS users
  // and the LCP measurement see the headline immediately. Once the
  // client hydrates we still animate the entrance via whileInView.
  return (
    <motion.span
      initial={false}
      whileInView={{ y: [24, 0], opacity: [0, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "inline-block mr-3 lg:mr-4 leading-[1.1] pb-[0.12em]",
        gradient && "gradient-text"
      )}
    >
      {children}
    </motion.span>
  );
}

/* ============================================================ */
/*  Cinematic ticker — strip across the top of the hero          */
/* ============================================================ */

const TICKER_ITEMS = [
  "CERT-In Empanelled",
  "EC-Council ATC",
  "ISO 27001 Certified",
  "20,000+ professionals trained",
  "200+ engagements / yr",
  "Mumbai · Dubai · Hyderabad · Muscat · Toronto",
];

function CinematicTicker() {
  // Duplicate for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative z-10 overflow-hidden border-b border-line/30 bg-bg/40 backdrop-blur-md">
      <div className="flex h-9 items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex shrink-0 gap-10 pr-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint"
        >
          {items.map((it, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="size-1 rounded-full bg-neon-cyan" />
              {it}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Live ops panel — boots up like a terminal                    */
/* ============================================================ */

function LiveOpsPanel() {
  const items = [
    { tag: "PEN", text: "Web pentest · 23 findings · 4 critical", color: "from-neon-cyan/30 to-neon-cyan/10 text-neon-cyan" },
    { tag: "RED", text: "DA in 4h · CrowdStrike bypass", color: "from-red-500/30 to-red-500/10 text-red-300" },
    { tag: "AUDIT", text: "RBI SAR submitted · 12 working days", color: "from-emerald-500/30 to-emerald-500/10 text-emerald-300" },
    { tag: "MDR", text: "12.4K events/sec · 0 P1 incidents", color: "from-cyan-500/30 to-cyan-500/10 text-cyan-300" },
    { tag: "ISO", text: "27001 certified · zero findings stage 2", color: "from-violet-500/30 to-violet-500/10 text-violet-300" },
    { tag: "OSCP", text: "Cohort 47 · 17/18 passed", color: "from-amber-500/30 to-amber-500/10 text-amber-300" },
  ];
  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] opacity-50 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent, rgba(0,229,255,0.18), transparent 30%, rgba(168,85,247,0.18), transparent 70%)",
          filter: "blur(28px)",
        }}
      />
      <div className="absolute -top-3 left-10 z-10 rounded-md bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neon-cyan ring-1 ring-line">
        {"// live · macksofy ops"}
      </div>
      <div className="relative rounded-3xl glass-strong p-6 shadow-2xl glow-blend overflow-hidden">
        {/* Sweep highlight inside card */}
        <SweepLine color="#00e5ff" duration={6} delay={1} />

        <div className="flex items-center justify-between mb-4 mt-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-fg-muted">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Engagements active
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-fg-faint">
              <Counter value={12400} suffix=" eps" />
            </span>
            <Terminal className="size-5 text-neon-cyan" />
          </div>
        </div>
        <div className="space-y-2 font-mono text-sm">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3 rounded-lg border border-line bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.05] transition-colors"
            >
              <span
                className={cn(
                  "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r ring-1 ring-current/20",
                  it.color
                )}
              >
                {it.tag}
              </span>
              <span className="text-fg-muted truncate">{it.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-5 flex items-center justify-between border-t border-line pt-4"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan hover:gap-2 transition-all"
          >
            All assessments <ArrowRight className="size-4" />
          </Link>
          <span className="font-mono text-[10px] text-fg-faint inline-flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            live · auto-refresh
          </span>
        </motion.div>
      </div>
    </div>
  );
}
