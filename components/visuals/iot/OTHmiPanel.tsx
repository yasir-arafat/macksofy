"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Gauge as GaugeIcon, Activity, Cpu } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface Gauge {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  safeMax: number;
  danger?: boolean;
}

const GAUGES: Gauge[] = [
  {
    label: "Pressure",
    unit: "kPa",
    value: 612,
    min: 0,
    max: 800,
    safeMax: 650,
  },
  {
    label: "Temperature",
    unit: "°C",
    value: 287,
    min: 0,
    max: 320,
    safeMax: 260,
    danger: true,
  },
  {
    label: "Flow",
    unit: "L/min",
    value: 142,
    min: 0,
    max: 220,
    safeMax: 200,
  },
];

const ALARMS = [
  {
    t: "10:42:18",
    asset: "PLC-04 · S7-300",
    code: "OT-MOD-001",
    msg: "Unauthenticated write to DB10.DBW0 from EWS-12 outside change window",
    sev: "crit",
  },
  {
    t: "10:42:17",
    asset: "HMI-02 · WinCC",
    code: "OT-AUTH-014",
    msg: "Default supervisor account · last password change > 1100 days",
    sev: "high",
  },
  {
    t: "10:42:11",
    asset: "RTU-19 · IEC-104",
    code: "OT-NET-022",
    msg: "ASDU spoof simulation accepted — no Secure-Auth handshake observed",
    sev: "crit",
  },
  {
    t: "10:41:58",
    asset: "BMS-Gw1 · BACnet",
    code: "OT-BAC-007",
    msg: "Broadcast write-property from guest VLAN 412 → setpoint 22→34 °C",
    sev: "high",
  },
  {
    t: "10:41:42",
    asset: "Vendor-RDP",
    code: "OT-DMZ-003",
    msg: "Always-on tunnel · shared account · no MFA, no session recording",
    sev: "high",
  },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 180) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

function GaugeRing({ g }: { g: Gauge }) {
  const reduce = useReducedMotion();
  const pct = Math.min(1, (g.value - g.min) / (g.max - g.min));
  const startDeg = 0;
  const endDeg = 180;
  const valueDeg = startDeg + (endDeg - startDeg) * pct;
  const safeDeg = startDeg + (endDeg - startDeg) * ((g.safeMax - g.min) / (g.max - g.min));
  const over = g.value > g.safeMax;
  return (
    <div className="relative">
      <svg viewBox="0 0 120 70" className="w-full h-auto">
        {/* base track */}
        <path
          d={arcPath(60, 60, 48, startDeg, endDeg)}
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* safe zone */}
        <path
          d={arcPath(60, 60, 48, startDeg, safeDeg)}
          fill="none"
          stroke="rgba(56,189,248,0.28)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* danger zone */}
        <path
          d={arcPath(60, 60, 48, safeDeg, endDeg)}
          fill="none"
          stroke="rgba(248,113,113,0.30)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* value arc */}
        <motion.path
          d={arcPath(60, 60, 48, startDeg, valueDeg)}
          fill="none"
          stroke={over ? "rgba(248,113,113,0.95)" : "rgba(56,189,248,0.95)"}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, ease: "easeOut" }}
        />
        {/* needle */}
        <motion.line
          x1="60"
          y1="60"
          x2={polarToCartesian(60, 60, 44, valueDeg).x}
          y2={polarToCartesian(60, 60, 44, valueDeg).y}
          stroke={over ? "#fca5a5" : "#7dd3fc"}
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ rotate: -90, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : 0.6, duration: reduce ? 0 : 0.5 }}
          style={{ transformOrigin: "60px 60px" }}
        />
        <circle cx="60" cy="60" r="3" fill={over ? "#f87171" : "#38bdf8"} />
      </svg>
      <div className="-mt-3 text-center">
        <div className={`font-display text-2xl font-black tabular-nums ${over ? "text-red-300" : "text-fg"}`}>
          {g.value}
          <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
            {g.unit}
          </span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint mt-1">
          {g.label}
        </div>
      </div>
    </div>
  );
}

const SEV_BAR: Record<string, string> = {
  crit: "bg-red-500",
  high: "bg-amber-400",
};

export function OTHmiPanel() {
  return (
    <div className="relative rounded-2xl ring-1 ring-line bg-bg-1/40 backdrop-blur-sm overflow-hidden">
      {/* header strip */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-line/60 bg-bg-2/60">
        <div className="flex items-center gap-2 min-w-0">
          <div className="grid size-7 place-items-center rounded-md ring-1 ring-amber-400/40 bg-amber-400/10 text-amber-300">
            <Cpu className="size-3.5" />
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted truncate">
            HMI · station-04 · live
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400/70" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-300">
            5 active alarms
          </span>
        </div>
      </div>

      {/* gauges */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 px-4 pt-5 pb-3">
        {GAUGES.map((g) => (
          <GaugeRing key={g.label} g={g} />
        ))}
      </div>

      {/* scan sweep */}
      <div aria-hidden className="relative h-1 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent"
          initial={{ x: "-50%" }}
          animate={{ x: "350%" }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* alarms */}
      <div className="px-4 py-3 space-y-1.5">
        <div className="flex items-center gap-2 mb-1.5">
          <AlertTriangle className="size-3.5 text-amber-300" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            Findings stream
          </span>
        </div>
        {ALARMS.map((a, i) => (
          <Reveal as="div" y={0} delay={0.15 + i * 0.1} duration={0.35}
            key={a.code}
            className="flex items-start gap-2 text-[12px] leading-tight"
          >
            <span className={`mt-1 inline-block size-1.5 rounded-full ${SEV_BAR[a.sev]}`} />
            <span className="font-mono text-[10px] text-fg-faint tabular-nums shrink-0 mt-0.5">
              {a.t}
            </span>
            <span className="font-mono text-[10px] text-violet-300 shrink-0 mt-0.5">
              {a.code}
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[10px] text-fg-muted truncate">
                {a.asset}
              </div>
              <div className="text-fg-muted">{a.msg}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* footer strip */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-line/60 bg-bg-2/40 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
        <div className="flex items-center gap-1.5">
          <Activity className="size-3" /> 7 nodes · 312 tags
        </div>
        <div className="flex items-center gap-1.5">
          <GaugeIcon className="size-3" /> IEC-62443 SL2 baseline
        </div>
      </div>
    </div>
  );
}
