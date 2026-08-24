"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import {
  Award,
  ShieldCheck,
  Quote,
  GraduationCap,
  Briefcase,
} from "lucide-react";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { Eyebrow } from "@/components/ui/SectionTitle";

const CREDENTIALS = [
  { label: "OSCP", body: "OffSec Certified Professional" },
  { label: "CEH", body: "EC-Council Certified Ethical Hacker" },
  { label: "CHFI", body: "Computer Hacking Forensic Investigator" },
  { label: "ISO 27001 LA", body: "ISO 27001:2022 Lead Auditor" },
  { label: "CEI", body: "EC-Council Circle of Excellence" },
  { label: "MeitY", body: "CERT-In Empanelled Auditor" },
];

const ACHIEVEMENTS = [
  "10+ years leading offensive + defensive engagements across BFSI, government and SaaS",
  "Trained thousands of cybersecurity professionals across India and the UAE",
  "Recognized at CSI Cyber Security Awards 2025 — Women in Cybersecurity",
  "Speaker at NISS, Intel summits and government cybersecurity conferences",
  "Active responsible-disclosure researcher — Google VRP Hall of Fame",
];

export function FounderSpotlight() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 items-start">
      {/* AVATAR + identity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-5"
      >
        <div className="relative">
          {/* glow halo */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 blur-2xl opacity-70" />

          <div className="relative rounded-3xl gradient-border overflow-hidden">
            {/* Avatar block — initials monogram with rich gradient */}
            <div className="relative aspect-[5/6] flex items-center justify-center bg-gradient-to-br from-bg-2 via-bg-1 to-bg overflow-hidden">
              <div className="absolute inset-0 bg-grid-strong opacity-40" />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative font-display text-[12rem] font-black gradient-text leading-none"
              >
                M
              </motion.div>
              {/* corner badge */}
              <div className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-bg ring-2 ring-neon-cyan/40 glow-cyan">
                <ShieldCheck className="size-6 text-neon-cyan" />
              </div>
              {/* Bottom name plate */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-bg via-bg/90 to-transparent">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
                  Founder & Principal Consultant
                </div>
                <div className="mt-1 font-display text-2xl font-black text-fg">
                  Macksofy Leadership
                </div>
                <div className="text-sm text-fg-muted">10+ years · Mumbai BKC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {CREDENTIALS.map((c) => (
            <div
              key={c.label}
              title={c.body}
              className="inline-flex items-center gap-1.5 rounded-md glass px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-neon-cyan"
            >
              <Award className="size-3" />
              {c.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* BIO + achievements */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-7"
      >
        <Eyebrow color="purple">Founder Spotlight</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
          The team that does the work,{" "}
          <span className="gradient-text">teaches the work.</span>
        </h2>

        {/* Pull quote */}
        <blockquote className="mt-7 relative rounded-2xl glass p-6 sm:p-7">
          <Quote className="absolute -top-3 left-6 size-7 text-neon-cyan/40 bg-bg p-1 rounded" />
          <p className="font-display text-lg sm:text-xl text-fg leading-relaxed text-balance">
            &ldquo;Indian regulators expect rigour. Our customers expect honesty. The
            best way to honour both is to make sure every consultant on this team
            is also good enough to sit the certification exam they teach.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-fg-muted">
            — Macksofy Leadership
          </footer>
        </blockquote>

        <div className="mt-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan mb-3">
            <Briefcase className="inline size-3 mr-1.5 -mt-0.5" />
            Career snapshot
          </div>
          <ul className="space-y-3">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex gap-3 text-sm"
              >
                <GraduationCap className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                <span className="text-fg-muted leading-relaxed">{a}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-fg-muted hover:text-neon-cyan ring-1 ring-transparent hover:ring-neon-cyan/40 transition-[color,background-color,border-color,box-shadow]"
          >
            <LinkedinIcon className="size-4" /> Connect on LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  );
}
