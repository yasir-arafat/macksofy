"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Crosshair,
  Search,
  Bug,
  Lock,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phase {
  num: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  activities: string[];
  tools: string[];
  deliverable: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Tailwind classes for the active accent color used in stepper + glow */
  accent: {
    text: string;       // text-...
    bg: string;         // bg-...
    bgFrom: string;     // gradient from
    bgTo: string;       // gradient to
    ring: string;       // ring-...
    glow: string;       // shadow-...
  };
}

const PHASES: Phase[] = [
  {
    num: "01",
    title: "Scoping & Pre-engagement",
    subtitle: "Mutual NDA · Rules of Engagement · Crown-jewel identification",
    duration: "Day 1–2",
    description:
      "Every Macksofy engagement begins with a tight scoping call. We agree on assets in/out of scope, define the Rules of Engagement, identify your crown jewels, and align on success metrics before a single packet leaves our infrastructure.",
    activities: [
      "Mutual NDA + authorization letter",
      "Asset inventory + scope freeze",
      "Crown-jewel and high-impact target identification",
      "Communications and emergency-contact protocol",
    ],
    tools: ["Engagement Letter", "Authorization Doc", "Risk Register", "Slack/Teams bridge"],
    deliverable: "Signed scope document + authorization letter",
    icon: Crosshair,
    accent: {
      text: "text-neon-cyan",
      bg: "bg-neon-cyan",
      bgFrom: "from-neon-cyan/20",
      bgTo: "to-neon-cyan/0",
      ring: "ring-neon-cyan",
      glow: "shadow-[0_0_60px_rgba(0,229,255,0.45)]",
    },
  },
  {
    num: "02",
    title: "Reconnaissance & Threat Modeling",
    subtitle: "OSINT · ASN mapping · Attack-surface decomposition",
    duration: "Day 3–4",
    description:
      "Active and passive reconnaissance to map your true attack surface — including assets your IT team has forgotten about. Threat modeling that profiles the actual adversaries your industry faces.",
    activities: [
      "Active + passive recon (OSINT)",
      "Subdomain enumeration + ASN/IP range mapping",
      "Service + version fingerprinting",
      "STRIDE / PASTA threat decomposition",
    ],
    tools: ["theHarvester", "Maltego", "Shodan", "Censys", "Amass", "Nmap"],
    deliverable: "Attack-surface map + prioritized attacker profile",
    icon: Search,
    accent: {
      text: "text-neon-blue",
      bg: "bg-neon-blue",
      bgFrom: "from-neon-blue/20",
      bgTo: "to-neon-blue/0",
      ring: "ring-neon-blue",
      glow: "shadow-[0_0_60px_rgba(77,124,255,0.45)]",
    },
  },
  {
    num: "03",
    title: "Exploitation",
    subtitle: "Manual + tooled · Web · Network · AD · Cloud",
    duration: "Week 1–2",
    description:
      "Where most reports stop, we begin. Manual exploitation of every High/Critical finding — chained where possible — to demonstrate real business impact. We don't ship Nessus reports.",
    activities: [
      "OWASP Top 10 + business-logic exploitation",
      "Buffer overflows, deserialization, RCE chains",
      "Cloud privilege escalation (IAM, Lambda, K8s RBAC)",
      "Active Directory attack paths via BloodHound",
    ],
    tools: ["Burp Suite Pro", "Metasploit", "BloodHound", "CrackMapExec", "Impacket", "Custom payloads"],
    deliverable: "Validated proof-of-concept exploits with reproduction steps",
    icon: Bug,
    accent: {
      text: "text-neon-purple",
      bg: "bg-neon-purple",
      bgFrom: "from-neon-purple/20",
      bgTo: "to-neon-purple/0",
      ring: "ring-neon-purple",
      glow: "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
    },
  },
  {
    num: "04",
    title: "Post-Exploitation",
    subtitle: "Privilege escalation · Lateral movement · Persistence",
    duration: "Week 2",
    description:
      "Foothold to full compromise. We pivot, escalate and persist exactly the way a determined APT would — within the rules of engagement — to map the worst-case impact across your environment.",
    activities: [
      "Linux + Windows privilege escalation",
      "Kerberos delegation + golden/silver tickets",
      "Lateral movement: WinRM, WMI, PsExec, smbexec",
      "Sensitive data access demonstration (no exfiltration)",
    ],
    tools: ["Mimikatz", "Rubeus", "Cobalt Strike", "ligolo-ng", "Empire / Covenant"],
    deliverable: "Compromise narrative · MITRE ATT&CK heatmap",
    icon: Lock,
    accent: {
      text: "text-neon-pink",
      bg: "bg-neon-pink",
      bgFrom: "from-neon-pink/20",
      bgTo: "to-neon-pink/0",
      ring: "ring-neon-pink",
      glow: "shadow-[0_0_60px_rgba(236,72,153,0.45)]",
    },
  },
  {
    num: "05",
    title: "Reporting",
    subtitle: "Board-ready · Developer-friendly · Regulator-format",
    duration: "Week 3",
    description:
      "Executive summary your board can read in 5 minutes. Technical detail your engineers can fix in days. Regulator-format sections (CERT-In, RBI, SEBI) that your auditor accepts on the first read — no rework.",
    activities: [
      "Executive summary (2–3 pages, board-ready)",
      "Per-finding CVSS 3.1 + business risk + PoC",
      "Developer-friendly remediation guidance",
      "MITRE ATT&CK technique mapping",
    ],
    tools: ["Custom reporting templates", "Dradis", "AttackForge", "PlexTrac"],
    deliverable: "Final report + sanitized executive deck",
    icon: FileText,
    accent: {
      text: "text-amber-300",
      bg: "bg-amber-300",
      bgFrom: "from-amber-300/20",
      bgTo: "to-amber-300/0",
      ring: "ring-amber-300",
      glow: "shadow-[0_0_60px_rgba(252,211,77,0.45)]",
    },
  },
  {
    num: "06",
    title: "Retest & Sign-off",
    subtitle: "Free retest · Compliance letter · Purple-team handoff",
    duration: "Within 30 days",
    description:
      "Once you remediate, we re-test every High/Critical finding free of charge. On closure we issue an auditor-acceptable letter — and where helpful, run a purple-team session so your blue team learns from the engagement.",
    activities: [
      "Free retest within 30 days of fix submission",
      "Final closure letter / Macksofy attestation",
      "Compliance-ready (CERT-In · ISO 27001 · SOC 2 · PCI-DSS)",
      "Optional purple-team workshop with your defenders",
    ],
    tools: ["Engagement Closure Letter", "Compliance Attestation", "Purple-team playbook"],
    deliverable: "Auditor-acceptable closure letter + handoff artifacts",
    icon: CheckCircle2,
    accent: {
      text: "text-neon-green",
      bg: "bg-neon-green",
      bgFrom: "from-neon-green/20",
      bgTo: "to-neon-green/0",
      ring: "ring-neon-green",
      glow: "shadow-[0_0_60px_rgba(0,255,157,0.45)]",
    },
  },
];

const AUTO_MS = 7000;

export function EngagementPhases() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const lastTickRef = useRef<number>(0);

  // Auto-advance with progress tick.
  // setState inside the effect is required for the rAF tick loop.
  useEffect(() => {
    if (paused || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    lastTickRef.current = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const dt = now - lastTickRef.current;
      lastTickRef.current = now;
      setProgress((p) => {
        const next = p + (dt / AUTO_MS) * 100;
        if (next >= 100) {
          setActive((a) => (a + 1) % PHASES.length);
          return 0;
        }
        return next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, reduce]);

  const goto = (i: number) => {
    setActive(((i % PHASES.length) + PHASES.length) % PHASES.length);
    setProgress(0);
  };
  const next = () => goto(active + 1);
  const prev = () => goto(active - 1);

  const phase = PHASES[active];
  const Icon = phase.icon;

  return (
    <div
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stepper */}
      <div className="relative mb-10 hidden md:block">
        {/* Connector line */}
        <div className="absolute top-7 left-8 right-8 h-px bg-line" aria-hidden />
        <div
          className="absolute top-7 left-8 h-px bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-green transition-[width] duration-500"
          style={{
            width: `calc((100% - 64px) * ${active / (PHASES.length - 1)})`,
          }}
          aria-hidden
        />

        <ol className="relative grid grid-cols-6 gap-4 lg:gap-6">
          {PHASES.map((p, i) => {
            const isActive = i === active;
            const isPast = i < active;
            const PIcon = p.icon;
            return (
              <li key={p.num} className="flex flex-col items-center text-center">
                <button
                  onClick={() => goto(i)}
                  aria-label={`Phase ${p.num}: ${p.title}`}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "relative grid size-14 place-items-center rounded-full transition-all duration-300 ring-2 ring-offset-2 ring-offset-bg-1",
                    isActive
                      ? cn(
                          "bg-bg-2 scale-110 ring-current",
                          p.accent.text,
                          p.accent.glow
                        )
                      : isPast
                        ? "bg-bg-2 ring-neon-cyan/60 text-neon-cyan"
                        : "bg-bg-2 ring-line text-fg-faint hover:ring-line-strong hover:text-fg-muted"
                  )}
                >
                  <PIcon
                    className={cn(
                      "relative size-5 transition-colors",
                      isActive && "drop-shadow-[0_0_6px_currentColor]"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "mt-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-fg" : "text-fg-faint"
                  )}
                >
                  Phase {p.num}
                </div>
                <div
                  className={cn(
                    "mt-1.5 text-xs leading-tight transition-colors line-clamp-2 min-h-[2.2em]",
                    isActive ? p.accent.text : "text-fg-muted"
                  )}
                >
                  {p.title.split(" & ")[0]}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile dot indicator */}
      <div className="md:hidden flex justify-center gap-1.5 mb-6">
        {PHASES.map((p, i) => (
          <button
            key={i}
            onClick={() => goto(i)}
            aria-label={`Go to phase ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? cn("w-8", p.accent.bg) : "w-1.5 bg-line"
            )}
          />
        ))}
      </div>

      {/* Slide panel */}
      <div className="relative rounded-3xl glass-strong overflow-hidden">
        {/* Animated accent gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-700",
            phase.accent.bgFrom,
            phase.accent.bgTo
          )}
          aria-hidden
        />
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />

        {/*
          Every phase's activities stay in the DOM. This rendered only
          PHASES[active], so 20 of its 24 activities were missing from the
          server HTML on the HOMEPAGE and /services/vapt. Inactive panels use
          `hidden` and carry NO display utility class — a Tailwind
          `grid`/`flex`/`block` would override `[hidden] { display: none }`
          and stack every phase visible at once.
        */}
        {PHASES.map((ph, pi) => {
          const isActive = pi === active;
          return (
            <div
              key={ph.title}
              hidden={!isActive}
              className={
                isActive
                  ? "relative grid gap-10 lg:grid-cols-12 p-8 sm:p-10 lg:p-12"
                  : undefined
              }
            >
            {/* Left column: icon + meta */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={cn(
                    "relative grid size-16 place-items-center rounded-2xl bg-bg-2 ring-2",
                    ph.accent.ring,
                    ph.accent.glow
                  )}
                >
                  <Icon className={cn("size-8", ph.accent.text)} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                    Phase {ph.num}
                  </div>
                  <div className={cn("font-mono text-xs uppercase tracking-wider", ph.accent.text)}>
                    {ph.duration}
                  </div>
                </div>
              </div>

              <h3 className="font-display text-3xl font-black text-fg leading-tight text-balance">
                {ph.title}
              </h3>
              <p className={cn("mt-2 font-mono text-xs uppercase tracking-wider", ph.accent.text)}>
                {ph.subtitle}
              </p>

              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                {ph.description}
              </p>
            </div>

            {/* Right column: activities + tools + deliverable */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint mb-3">
                  Key activities
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {ph.activities.map((a, i) => (
                    <motion.li
                      key={a}
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <CheckCircle2 className={cn("size-4 shrink-0 mt-0.5", ph.accent.text)} />
                      <span className="text-fg-muted leading-relaxed">{a}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint mb-3">
                  Tools / artifacts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ph.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] rounded-md bg-white/5 ring-1 ring-line px-2 py-1 text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={cn("rounded-xl border p-4", "border-line/60 bg-bg/50")}>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                  Deliverable
                </div>
                <div className={cn("mt-1.5 font-display text-base font-bold", ph.accent.text)}>
                  {ph.deliverable}
                </div>
              </div>
            </div>
                      </div>
          );
        })}

        {/* Progress bar */}
        {!reduce && (
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-line/60">
            <div
              className={cn("h-full transition-[width] duration-100 linear", phase.accent.bg)}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous phase"
          className="grid size-11 place-items-center rounded-full glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:text-neon-cyan transition-[color,background-color,border-color,box-shadow]"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play" : "Pause"}
          className="grid size-11 place-items-center rounded-full glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:text-neon-cyan transition-[color,background-color,border-color,box-shadow]"
        >
          {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
        </button>
        <button
          onClick={next}
          aria-label="Next phase"
          className="grid size-11 place-items-center rounded-full glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:text-neon-cyan transition-[color,background-color,border-color,box-shadow]"
        >
          <ChevronRight className="size-5" />
        </button>
        <span className="ml-3 font-mono text-xs text-fg-faint">
          {String(active + 1).padStart(2, "0")} <span className="text-fg-muted/50">/</span>{" "}
          {String(PHASES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
