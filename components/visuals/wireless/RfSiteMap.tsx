"use client";

import { motion } from "framer-motion";
import { Wifi, WifiOff, Car, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Why wireless is tested on site: the coverage does not stop at the wall.
 *
 * Cross-section of a multi-floor office with the three SSID classes, the
 * employee-installed rogue AP, and the attacker position outside the building.
 * Illustrative of the engagement shape described in content/services.ts (12-floor
 * BFSI HQ, evil-twin capture, car-park VPN reach) — not a specific client site.
 */

const FLOORS = [
  {
    name: "Floor 12 · Executive",
    ssids: ["CORP-SEC", "GUEST"],
    flag: null as null | string,
  },
  {
    name: "Floor 8 · Finance",
    ssids: ["CORP-SEC", "GUEST"],
    flag: null,
  },
  {
    name: "Floor 5 · Boardroom",
    ssids: ["CORP-SEC", "GUEST", "AV-BRIDGE"],
    flag: "Employee-installed AP bridging to the wired finance VLAN — not in any inventory",
  },
  {
    name: "Floor 2 · Operations",
    ssids: ["CORP-SEC", "GUEST", "IOT-BMS"],
    flag: null,
  },
  {
    name: "Ground · Reception",
    ssids: ["GUEST"],
    flag: null,
  },
];

const SSID_STYLE: Record<string, string> = {
  "CORP-SEC": "bg-cyan-400/15 text-cyan-200 ring-cyan-400/30",
  GUEST: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/30",
  "IOT-BMS": "bg-amber-400/15 text-amber-200 ring-amber-400/30",
  "AV-BRIDGE": "bg-red-400/15 text-red-200 ring-red-400/30",
};

export function RfSiteMap() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Site cross-section · where the signal actually goes
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          {Object.keys(SSID_STYLE).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className={`size-2.5 rounded ring-1 ${SSID_STYLE[s]}`} />
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        {/* the building */}
        <div className="lg:col-span-8 space-y-2">
          {FLOORS.map((f, i) => (
            <Reveal as="div" y={0} delay={i * 0.08} duration={0.34} margin="-40px"
              key={f.name}
              className={`rounded-xl p-3.5 ring-1 ${
                f.flag ? "bg-red-500/[0.07] ring-red-400/30" : "bg-white/[0.02] ring-line/60"
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Wifi className={`size-4 shrink-0 ${f.flag ? "text-red-300" : "text-cyan-300"}`} />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-dim">
                  {f.name}
                </span>
                <div className="ml-auto flex flex-wrap gap-1.5">
                  {f.ssids.map((s) => (
                    <span
                      key={s}
                      className={`rounded-full px-2 py-0.5 font-mono text-[9.5px] tracking-wider ring-1 ${SSID_STYLE[s]}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {f.flag && (
                <p className="mt-2 flex gap-2 text-[11.5px] leading-relaxed text-red-200/90">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                  {f.flag}
                </p>
              )}
            </Reveal>
          ))}

          {/* the perimeter */}
          <Reveal as="div" y={0} delay={0.45}
            className="relative mt-4 overflow-hidden rounded-xl bg-black/30 p-4 ring-1 ring-violet-400/30"
          >
            {[0, 1, 2].map((r) => (
              <motion.span
                key={r}
                aria-hidden
                initial={{ opacity: 0.35, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.6 }}
                transition={{ duration: 3, repeat: Infinity, delay: r * 1 }}
                className="pointer-events-none absolute left-6 top-1/2 size-16 -translate-y-1/2 rounded-full border border-violet-400/40"
              />
            ))}
            <div className="relative flex items-center gap-3">
              <Car className="size-5 shrink-0 text-violet-300" />
              <div>
                <div className="font-display text-[13px] font-bold text-fg">
                  Car park, 40 m from reception
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-fg-muted">
                  Corporate SSID is comfortably readable here. This is where the
                  evil-twin runs from, and where a captured certificate would have
                  reached the VPN.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* what the survey produces */}
        <div className="lg:col-span-4">
          <div className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
              The survey produces
            </div>
            <ul className="mt-3 space-y-2.5">
              {[
                "Floor-by-floor coverage and risk heat map",
                "Rogue AP inventory, employee- and attacker-installed",
                "Per-SSID authentication and segmentation findings",
                "Wired-side blast radius from each cracked SSID",
                "Bluetooth / BLE surface, where scoped",
              ].map((d) => (
                <li key={d} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
                  <span className="mt-0.5 shrink-0 text-cyan-300/70">▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-[11.5px] leading-relaxed text-amber-100/90 ring-1 ring-amber-400/25">
              <WifiOff className="mt-0.5 size-3.5 shrink-0" />
              Deauth and evil-twin tests are scheduled outside business hours.
              Passive survey and offline cracking have zero impact.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
