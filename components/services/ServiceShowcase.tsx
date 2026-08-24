"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { SERVICES, type Service } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";

type Tone = "offensive" | "defensive" | "managed";

const TONE = {
  offensive: {
    eyebrowColor: "cyan" as const,
    iconRing: "ring-neon-cyan/30",
    iconText: "text-neon-cyan",
    titleHover: "group-hover:text-neon-cyan",
    arrowHover: "group-hover:text-neon-cyan",
    countText: "text-neon-cyan",
    chipBorder: "ring-neon-cyan/30",
    glow: "rgba(0, 229, 255, 0.18)",
    pattern: "rgba(0, 229, 255, 0.42)",
    fromGrad: "from-neon-cyan/40",
    accentVia: "via-neon-cyan",
    label: "Attack-side",
  },
  defensive: {
    eyebrowColor: "purple" as const,
    iconRing: "ring-neon-purple/30",
    iconText: "text-neon-purple",
    titleHover: "group-hover:text-neon-purple",
    arrowHover: "group-hover:text-neon-purple",
    countText: "text-neon-purple",
    chipBorder: "ring-neon-purple/30",
    glow: "rgba(168, 85, 247, 0.18)",
    pattern: "rgba(168, 85, 247, 0.42)",
    fromGrad: "from-neon-purple/40",
    accentVia: "via-neon-purple",
    label: "Defence-side",
  },
  managed: {
    eyebrowColor: "green" as const,
    iconRing: "ring-neon-green/30",
    iconText: "text-neon-green",
    titleHover: "group-hover:text-neon-green",
    arrowHover: "group-hover:text-neon-green",
    countText: "text-neon-green",
    chipBorder: "ring-neon-green/30",
    glow: "rgba(0, 255, 157, 0.18)",
    pattern: "rgba(0, 255, 157, 0.42)",
    fromGrad: "from-neon-green/40",
    accentVia: "via-neon-green",
    label: "Operate-side",
  },
} as const;

interface Props {
  tone: Tone;
  eyebrow: string;
  title: React.ReactNode;
  kicker?: string;
  /** Slugs of the services to render. Looked up against SERVICES on the client. */
  serviceSlugs: string[];
}

export function ServiceShowcase({
  tone,
  eyebrow,
  title,
  kicker,
  serviceSlugs,
}: Props) {
  const cfg = TONE[tone];
  const services = serviceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
  return (
    <div className="relative isolate">
      <BackdropPattern tone={tone} />

      {/* Header */}
      <div className="relative grid gap-8 lg:grid-cols-12 items-end">
        <div className="lg:col-span-8">
          <Eyebrow color={cfg.eyebrowColor}>{eyebrow}</Eyebrow>
          <Reveal as="h2" y={16} duration={0.6} margin="-80px"
            className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]"
          >
            {title}
          </Reveal>
          {kicker && (
            <Reveal as="p" y={12} delay={0.1} duration={0.6} margin="-80px"
              className="mt-5 max-w-xl text-fg-muted text-pretty"
            >
              {kicker}
            </Reveal>
          )}
        </div>
        <div className="lg:col-span-4 flex lg:justify-end">
          <SectionOrnament tone={tone} count={services.length} />
        </div>
      </div>

      {/* Cards */}
      <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i + 1} tone={tone} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  tone,
}: {
  service: Service;
  index: number;
  tone: Tone;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const cfg = TONE[tone];
  const Icon = service.icon;

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty("--spot-x", `${x}%`);
    card.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <Reveal as="div" y={24} delay={0.05 + index * 0.07} duration={0.55} margin="-40px"
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        ref={ref}
        href={`/services/${service.slug}`}
        onMouseMove={handleMouseMove}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 ring-1 ring-line transition-colors hover:ring-line-strong"
        style={
          {
            backgroundImage: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), ${cfg.glow}, transparent 45%)`,
          } as React.CSSProperties
        }
      >
        {/* Index watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-black leading-none tracking-tighter text-fg/[0.04]"
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* Top row: icon + arrow */}
        <div className="relative z-10 flex items-start justify-between">
          <motion.div
            whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
            transition={{ duration: 0.5 }}
            className={`grid size-14 place-items-center rounded-xl bg-bg-2 ring-1 ${cfg.iconRing} ${cfg.iconText}`}
          >
            <Icon className="size-6" />
          </motion.div>
          <ArrowUpRight
            className={`size-5 text-fg-faint transition-all duration-300 ${cfg.arrowHover} group-hover:rotate-12 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
          />
        </div>

        {/* Title + description */}
        <h3
          className={`relative z-10 mt-6 font-display text-xl font-bold text-fg transition-colors ${cfg.titleHover}`}
        >
          {service.title}
        </h3>
        <p className="relative z-10 mt-2 text-sm text-fg-muted line-clamp-3 text-pretty">
          {service.hero.description}
        </p>

        {/* Industry chips */}
        <div className="relative z-10 mt-auto pt-6 flex flex-wrap gap-1.5">
          {service.industriesServed.slice(0, 3).map((industry) => (
            <span
              key={industry}
              className={`rounded-full bg-white/[0.04] ring-1 ring-line px-2.5 py-0.5 text-[10px] font-semibold text-fg-faint transition-colors group-hover:${cfg.chipBorder.replace("ring-", "ring-")}`}
            >
              {industry}
            </span>
          ))}
        </div>

        {/* Bottom accent line */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-6 bottom-0 h-px translate-y-px bg-gradient-to-r from-transparent ${cfg.accentVia} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-90`}
        />

        {/* Top corner glow */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60 bg-gradient-to-br ${cfg.fromGrad} to-transparent`}
        />
      </Link>
    </Reveal>
  );
}

function BackdropPattern({ tone }: { tone: Tone }) {
  const color = TONE[tone].pattern;
  if (tone === "offensive") {
    return (
      <svg
        className="pointer-events-none absolute -inset-x-8 -top-12 h-[420px] opacity-[0.18] sm:opacity-[0.22]"
        aria-hidden
        preserveAspectRatio="none"
        viewBox="0 0 1200 420"
      >
        {/* Horizontal scan dashes */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * 40 + 6}
            x2="1200"
            y2={i * 40 + 6}
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="2 8"
          />
        ))}
        {/* Reticle top right */}
        <g transform="translate(1080, 110)" stroke={color} strokeWidth="1" fill="none">
          <circle r="48" />
          <circle r="28" />
          <line x1="-62" y1="0" x2="-38" y2="0" />
          <line x1="38" y1="0" x2="62" y2="0" />
          <line x1="0" y1="-62" x2="0" y2="-38" />
          <line x1="0" y1="38" x2="0" y2="62" />
        </g>
        {/* Diagonal accent */}
        <line
          x1="0"
          y1="380"
          x2="900"
          y2="80"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="3 10"
        />
      </svg>
    );
  }
  // defensive
  return (
    <svg
      className="pointer-events-none absolute -inset-x-8 -top-12 h-[420px] opacity-[0.16] sm:opacity-[0.22]"
      aria-hidden
      preserveAspectRatio="none"
      viewBox="0 0 1200 420"
    >
      <defs>
        <pattern
          id="hex-shield"
          width="56"
          height="48"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          <polygon
            points="28,2 52,16 52,40 28,54 4,40 4,16"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-shield)" />
      {/* Pulse rings top-left */}
      <g transform="translate(150, 150)" stroke={color} fill="none" strokeWidth="1">
        <circle r="30" opacity="0.7" />
        <circle r="56" opacity="0.45" />
        <circle r="86" opacity="0.25" />
      </g>
    </svg>
  );
}

function SectionOrnament({ tone, count }: { tone: Tone; count: number }) {
  const cfg = TONE[tone];
  return (
    <div className="flex items-center gap-5">
      <motion.div
        animate={
          tone === "offensive"
            ? { rotate: 360 }
            : { scale: [1, 1.04, 1], opacity: [0.95, 1, 0.95] }
        }
        transition={{
          duration: tone === "offensive" ? 28 : 3,
          repeat: Infinity,
          ease: tone === "offensive" ? "linear" : "easeInOut",
        }}
        className={`grid size-24 place-items-center rounded-full bg-bg-1 ring-1 ${cfg.iconRing} backdrop-blur-sm`}
      >
        {tone === "offensive" ? (
          <svg
            viewBox="0 0 80 80"
            className={`size-12 ${cfg.iconText}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="40" cy="40" r="30" opacity="0.7" />
            <circle cx="40" cy="40" r="18" opacity="0.85" />
            <circle cx="40" cy="40" r="3" fill="currentColor" />
            <line x1="6" y1="40" x2="22" y2="40" />
            <line x1="58" y1="40" x2="74" y2="40" />
            <line x1="40" y1="6" x2="40" y2="22" />
            <line x1="40" y1="58" x2="40" y2="74" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 80 80"
            className={`size-12 ${cfg.iconText}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M40 8 L66 18 L66 42 Q66 60 40 72 Q14 60 14 42 L14 18 Z" />
            <path
              d="M28 41 L36 49 L52 33"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}
      </motion.div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
          {cfg.label}
        </div>
        <div
          className={`mt-1 font-display text-5xl font-black leading-none ${cfg.countText}`}
        >
          {String(count).padStart(2, "0")}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
          {count === 1 ? "service" : "services"}
        </div>
      </div>
    </div>
  );
}
