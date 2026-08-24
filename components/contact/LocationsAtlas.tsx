"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { LOCATIONS, type Location } from "./Locations";

/**
 * Strategic Atlas — simplified world-map silhouette with all delivery
 * cities pinned at their real geographic coordinates (equirectangular
 * projection). Animated arcs connect Mumbai HQ to every other city.
 */
export function LocationsAtlas() {
  const [hovered, setHovered] = useState<Location | null>(null);
  const active = hovered ?? LOCATIONS[0];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-bg-2/60 to-bg-1/40 ring-1 ring-line p-5 sm:p-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-72 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 size-72 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none"
      />
      <div className="relative grid gap-6 lg:grid-cols-12">
        {/* MAP */}
        <div className="lg:col-span-8 relative">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 text-neon-cyan">
              <MapPin className="size-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                Strategic Atlas · {LOCATIONS.length} cities · 5 countries
              </span>
            </div>
            <span className="font-mono text-[10px] text-fg-faint">
              Hover any pin
            </span>
          </div>

          <WorldMap
            locations={LOCATIONS}
            activeKey={active.key}
            onHover={(loc) => setHovered(loc)}
            onLeave={() => setHovered(null)}
          />
        </div>

        {/* Hover panel */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-bg-2/60 ring-1 ring-line p-5 h-full"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{active.flag}</div>
                <div className="min-w-0">
                  <div className="font-display text-lg font-black text-fg leading-none">
                    {active.city}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-neon-cyan">
                    {active.role}
                  </div>
                </div>
                {active.primary && (
                  <span className="ml-auto inline-flex items-center rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
                    HQ
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-fg-muted leading-relaxed">
                {active.area}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-2">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                    Country
                  </div>
                  <div className="mt-0.5 font-bold text-fg">
                    {active.country}
                  </div>
                </div>
                <div className="rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-2">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                    Hours
                  </div>
                  <div className="mt-0.5 font-bold text-fg truncate">
                    {active.hours}
                  </div>
                </div>
                <div className="rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-2 col-span-2">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                    Coordinates
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-fg tabular-nums">
                    {active.lat.toFixed(3)}° N · {active.lng.toFixed(3)}° E
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Equirectangular projection                                   */
/* ============================================================ */

const VIEW_W = 1000;
const VIEW_H = 500;

function project(lat: number, lng: number): { x: number; y: number } {
  return {
    x: ((lng + 180) / 360) * VIEW_W,
    y: ((90 - lat) / 180) * VIEW_H,
  };
}

/* ============================================================ */
/*  Continent silhouettes (simplified, equirectangular)          */
/* ============================================================ */

const CONTINENTS = {
  // North America: Alaska → Canada → US → Mexico → Central America
  northAmerica: `
    M 24 90 L 60 80 L 120 80 L 180 78 L 230 80 L 268 90
    L 300 105 L 320 130 L 330 155 L 320 178 L 305 195
    L 280 215 L 260 230 L 245 245 L 230 252 L 215 245
    L 195 232 L 180 220 L 175 205 L 178 188 L 170 175
    L 158 168 L 150 158 L 142 145 L 130 138 L 115 128
    L 95 115 L 75 100 Z
  `,
  // Greenland
  greenland: `
    M 308 60 L 340 55 L 360 70 L 365 95 L 350 115 L 325 110 L 312 85 Z
  `,
  // Central America peninsula
  centralAmerica: `
    M 235 235 L 250 240 L 258 252 L 268 268 L 270 282 L 258 290 L 245 280 L 240 265 L 232 250 Z
  `,
  // South America
  southAmerica: `
    M 248 280 L 285 270 L 305 290 L 320 320 L 325 360 L 315 395 L 295 425 L 275 442 L 258 438
    L 248 410 L 240 380 L 240 348 L 245 318 Z
  `,
  // Europe (mainland) + UK
  europe: `
    M 470 90 L 510 82 L 545 80 L 575 88 L 590 102 L 585 122 L 560 138 L 535 145 L 510 142
    L 488 132 L 470 118 L 462 102 Z
  `,
  uk: `
    M 458 95 L 472 92 L 478 105 L 472 118 L 462 116 L 455 105 Z
  `,
  // Scandinavia
  scandinavia: `
    M 502 60 L 530 55 L 545 70 L 540 95 L 522 110 L 510 102 L 500 85 Z
  `,
  // Africa
  africa: `
    M 478 145 L 540 140 L 580 152 L 605 175 L 615 210 L 620 250 L 610 295 L 590 335
    L 565 365 L 540 380 L 515 372 L 495 350 L 485 315 L 478 280 L 472 240 L 470 200
    L 472 170 Z
  `,
  // Madagascar
  madagascar: `
    M 638 318 L 648 315 L 654 332 L 650 358 L 642 365 L 636 348 Z
  `,
  // Middle East (Arabian peninsula)
  middleEast: `
    M 605 168 L 645 162 L 670 175 L 680 198 L 670 220 L 650 235 L 625 235 L 610 220 L 605 195 Z
  `,
  // Asia (mainland — vast, includes China, Russia, India, SE Asia)
  asiaMain: `
    M 590 60 L 660 50 L 740 48 L 820 55 L 880 65 L 920 80 L 935 105 L 920 130 L 890 145
    L 855 152 L 820 158 L 795 168 L 775 180 L 765 200 L 755 215 L 735 220 L 715 215
    L 700 200 L 690 185 L 680 170 L 665 162 L 650 158 L 630 152 L 610 142 L 595 125
    L 588 105 L 588 85 Z
  `,
  // India peninsula
  india: `
    M 685 195 L 720 195 L 735 215 L 730 245 L 715 268 L 700 270 L 690 250 L 685 225 Z
  `,
  // Indochina + Indonesia stretch
  seasia: `
    M 770 215 L 810 220 L 835 235 L 850 252 L 858 275 L 845 290 L 820 295 L 795 285
    L 778 268 L 770 245 Z
  `,
  // Japan
  japan: `
    M 882 165 L 905 158 L 915 178 L 905 198 L 895 195 L 885 180 Z
  `,
  // Philippines
  philippines: `
    M 858 230 L 870 228 L 875 248 L 868 262 L 860 252 Z
  `,
  // Australia
  australia: `
    M 808 320 L 870 315 L 905 322 L 920 340 L 915 360 L 890 372 L 855 372 L 825 365
    L 808 348 Z
  `,
  // New Zealand
  newZealand: `
    M 935 372 L 948 368 L 952 388 L 945 398 L 938 392 Z
  `,
  // Antarctica strip
  antarctica: `
    M 30 470 L 970 470 L 970 498 L 30 498 Z
  `,
} as const;

function WorldMap({
  locations,
  activeKey,
  onHover,
  onLeave,
}: {
  locations: Location[];
  activeKey: string;
  onHover: (loc: Location) => void;
  onLeave: () => void;
}) {
  const hq = locations.find((l) => l.primary) ?? locations[0];

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full h-auto rounded-2xl bg-bg/60 ring-1 ring-line"
      role="img"
    >
      <defs>
        <linearGradient id="atlas-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0a0a18" />
          <stop offset="100%" stopColor="#050510" />
        </linearGradient>
        <radialGradient id="atlas-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="atlas-arc" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
        </linearGradient>
        <pattern
          id="atlas-grid-fine"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
          />
        </pattern>
        <pattern
          id="atlas-grid-coarse"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
          />
        </pattern>
        <filter id="atlas-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={VIEW_W} height={VIEW_H} fill="url(#atlas-bg)" />
      <rect width={VIEW_W} height={VIEW_H} fill="url(#atlas-grid-fine)" />
      <rect width={VIEW_W} height={VIEW_H} fill="url(#atlas-grid-coarse)" />

      {/* Equator + tropics + meridians (subtle reference lines) */}
      <g stroke="rgba(0,229,255,0.08)" strokeDasharray="2 6">
        <line x1="0" y1="250" x2="1000" y2="250" /> {/* Equator */}
        <line x1="0" y1="186" x2="1000" y2="186" /> {/* Tropic of Cancer */}
        <line x1="0" y1="313" x2="1000" y2="313" /> {/* Tropic of Capricorn */}
      </g>
      <g stroke="rgba(0,229,255,0.05)" strokeDasharray="1 8">
        {[0, 250, 500, 750, 1000].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="500" />
        ))}
      </g>

      {/* Continent silhouettes */}
      <g
        fill="rgba(0,229,255,0.06)"
        stroke="rgba(0,229,255,0.32)"
        strokeWidth="0.9"
        strokeLinejoin="round"
        filter="url(#atlas-blur)"
      >
        {Object.values(CONTINENTS).map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 + i * 0.04 }}
          />
        ))}
      </g>

      {/* Connection arcs from HQ to every other city */}
      <g>
        {locations
          .filter((l) => !l.primary)
          .map((loc, i) => {
            const a = project(hq.lat, hq.lng);
            const b = project(loc.lat, loc.lng);
            // Curve: midpoint lifted toward the top of the canvas, with a
            // proportional amount of lift (longer arcs lift more).
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const lift = Math.min(220, dist * 0.45);
            const midX = (a.x + b.x) / 2;
            const midY = Math.min(a.y, b.y) - lift;
            const path = `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
            return (
              <g key={loc.key}>
                {/* Glow underlay */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#atlas-arc)"
                  strokeWidth="6"
                  strokeOpacity="0.18"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.4 + i * 0.18,
                    ease: "easeOut",
                  }}
                />
                {/* Main stroke */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#atlas-arc)"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.45 + i * 0.18,
                    ease: "easeOut",
                  }}
                />
                {/* Travelling spark */}
                <motion.circle
                  r="2.6"
                  fill="#22d3ee"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 3.2,
                    delay: 0.6 + i * 0.4,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    times: [0, 0.1, 0.9, 1],
                  }}
                >
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${0.6 + i * 0.4}s`}
                    path={path}
                  />
                </motion.circle>
              </g>
            );
          })}
      </g>

      {/* Pins */}
      {locations.map((loc, i) => {
        const p = project(loc.lat, loc.lng);
        const isActive = activeKey === loc.key;
        return (
          <g
            key={loc.key}
            transform={`translate(${p.x}, ${p.y})`}
            onMouseEnter={() => onHover(loc)}
            onMouseLeave={onLeave}
            onClick={() => onHover(loc)}
            style={{ cursor: "pointer" }}
          >
            {(isActive || loc.primary) && (
              <circle r="36" fill="url(#atlas-glow)">
                <animate
                  attributeName="r"
                  from="22"
                  to="42"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.7"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <motion.circle
              r={loc.primary ? 10 : 8}
              fill="rgba(8,8,20,0.95)"
              stroke={loc.primary ? "#22d3ee" : "#a855f7"}
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6 + i * 0.1,
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
            />
            <circle
              r={loc.primary ? 4 : 3.5}
              fill={loc.primary ? "#22d3ee" : "#a855f7"}
            />
            <text
              y={loc.primary ? 22 : 19}
              textAnchor="middle"
              fontSize={loc.primary ? 11 : 10}
              fontWeight="700"
              fontFamily="monospace"
              fill={isActive ? "#22d3ee" : "rgba(232,238,247,0.78)"}
              style={{
                paintOrder: "stroke",
                stroke: "rgba(8,8,20,0.85)",
                strokeWidth: 3,
                strokeLinejoin: "round",
              }}
            >
              {loc.city.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
