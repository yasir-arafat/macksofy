"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Terminal } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { Typewriter } from "@/components/motion/Typewriter";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const TYPEWRITER_PHRASES = [
  "ethical hacking labs",
  "OSCP-certified pen-testers",
  "CERT-In empanelled audits",
  "24×7 SOC operations",
  "real-world red teams",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <ParticleBackground density={120} />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={700} intensity="strong" />
      <GlowOrb className="bottom-0 right-1/4" color="purple" size={500} />
      <GlowOrb className="top-1/3 -left-20" color="blue" size={400} intensity="soft" />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Eyebrow>CERT-In Empanelled · India + UAE Engagements</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl text-balance leading-[0.95]"
            >
              Securing businesses.
              <br />
              <span className="gradient-text">Training cyber warriors.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
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
                className="inline-flex items-center gap-2 px-3 text-sm font-semibold text-fg-muted hover:text-neon-cyan"
              >
                <Phone className="size-4" />
                {SITE.phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 max-w-xl"
            >
              {[
                ["20K+", "Learners trained"],
                ["250+", "Enterprise clients"],
                ["11+ yrs", "In business"],
                ["5", "Countries served"],
              ].map(([n, l]) => (
                <div key={l} className="border-l border-neon-cyan/40 pl-3">
                  <div className="font-display text-2xl font-black gradient-text">{n}</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-fg-faint">
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <LiveOpsPanel />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

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
    <div className="relative rounded-3xl glass-strong p-6 shadow-2xl glow-blend">
      <div className="absolute -top-3 left-6 rounded-md bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neon-cyan ring-1 ring-line">
        {"// live · macksofy ops"}
      </div>
      <div className="flex items-center justify-between mb-4 mt-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-fg-muted">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          Engagements active
        </div>
        <Terminal className="size-5 text-neon-cyan" />
      </div>
      <div className="space-y-2 font-mono text-sm">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
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
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan hover:gap-2 transition-all"
        >
          All services <ArrowRight className="size-4" />
        </Link>
        <span className="font-mono text-[10px] text-fg-faint">live · auto-refresh</span>
      </div>
    </div>
  );
}
