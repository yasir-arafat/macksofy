"use client";

import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Which attacks apply to which kind of SSID.
 *
 * Techniques are the published, named attack classes carried in the methodology
 * in content/services.ts — handshake capture and offline cracking, WPA3 SAE
 * (Dragonblood-class), WPS Pixie-Dust, rogue RADIUS against 802.1X, evil twin,
 * Karma auto-connect and post-association pivot. Applicability is a property of
 * the technology, not a client result.
 */

type Applies = "yes" | "cond" | "no";

interface Technique {
  name: string;
  phase: string;
  cells: Record<string, Applies>;
}

const COLUMNS = ["WPA2-PSK", "WPA3-SAE", "802.1X EAP", "Open guest", "IoT / BMS"];

const TECHNIQUES: Technique[] = [
  {
    name: "4-way handshake capture → offline crack",
    phase: "WPA2",
    cells: { "WPA2-PSK": "yes", "WPA3-SAE": "no", "802.1X EAP": "no", "Open guest": "no", "IoT / BMS": "yes" },
  },
  {
    name: "SAE / Dragonblood-class downgrade & side-channel",
    phase: "WPA3",
    cells: { "WPA2-PSK": "no", "WPA3-SAE": "yes", "802.1X EAP": "cond", "Open guest": "no", "IoT / BMS": "cond" },
  },
  {
    name: "WPS Pixie-Dust",
    phase: "WPA2",
    cells: { "WPA2-PSK": "cond", "WPA3-SAE": "no", "802.1X EAP": "no", "Open guest": "no", "IoT / BMS": "cond" },
  },
  {
    name: "Rogue RADIUS credential capture (hostapd-wpe)",
    phase: "802.1X",
    cells: { "WPA2-PSK": "no", "WPA3-SAE": "no", "802.1X EAP": "yes", "Open guest": "no", "IoT / BMS": "cond" },
  },
  {
    name: "Certificate-validation bypass on the supplicant",
    phase: "802.1X",
    cells: { "WPA2-PSK": "no", "WPA3-SAE": "no", "802.1X EAP": "yes", "Open guest": "no", "IoT / BMS": "cond" },
  },
  {
    name: "Evil-twin AP impersonation",
    phase: "Client",
    cells: { "WPA2-PSK": "yes", "WPA3-SAE": "cond", "802.1X EAP": "yes", "Open guest": "yes", "IoT / BMS": "yes" },
  },
  {
    name: "Karma-style auto-connect abuse",
    phase: "Client",
    cells: { "WPA2-PSK": "yes", "WPA3-SAE": "cond", "802.1X EAP": "cond", "Open guest": "yes", "IoT / BMS": "yes" },
  },
  {
    name: "Captive-portal credential phishing",
    phase: "Client",
    cells: { "WPA2-PSK": "no", "WPA3-SAE": "no", "802.1X EAP": "no", "Open guest": "yes", "IoT / BMS": "no" },
  },
  {
    name: "Post-association pivot to wired VLANs",
    phase: "Lateral",
    cells: { "WPA2-PSK": "yes", "WPA3-SAE": "yes", "802.1X EAP": "yes", "Open guest": "yes", "IoT / BMS": "yes" },
  },
];

const CELL: Record<Applies, string> = {
  yes: "bg-cyan-400/15 text-cyan-200 ring-cyan-400/30",
  cond: "bg-amber-400/12 text-amber-200/80 ring-amber-400/25",
  no: "bg-white/[0.02] text-fg-faint ring-line/40",
};

const PHASE_TONE: Record<string, string> = {
  WPA2: "text-cyan-300",
  WPA3: "text-violet-300",
  "802.1X": "text-amber-300",
  Client: "text-pink-300",
  Lateral: "text-emerald-300",
};

export function SsidAttackMatrix() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Technique applicability by SSID type
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-[38%] pb-2 text-left font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-fg-faint">
                Technique
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c}
                  className="pb-2 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-fg-faint"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TECHNIQUES.map((t, ri) => (
              <tr key={t.name}>
                <td className="py-1 pr-3">
                  <div className="text-[12px] leading-snug text-fg-muted">{t.name}</div>
                  <div
                    className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${PHASE_TONE[t.phase]}`}
                  >
                    {t.phase}
                  </div>
                </td>
                {COLUMNS.map((c, ci) => {
                  const v = t.cells[c];
                  return (
                    <td key={c}>
                      <Reveal as="div" y={0} delay={ri * 0.04 + ci * 0.02} duration={0.26}
                        className={`grid h-9 place-items-center rounded-lg ring-1 ${CELL[v]}`}
                      >
                        {v === "yes" ? (
                          <Check className="size-3.5" />
                        ) : v === "cond" ? (
                          <span className="font-mono text-[10px]">~</span>
                        ) : (
                          <Minus className="size-3 opacity-40" />
                        )}
                      </Reveal>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className={`size-2.5 rounded ring-1 ${CELL.yes}`} /> in scope
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`size-2.5 rounded ring-1 ${CELL.cond}`} /> depends on configuration
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`size-2.5 rounded ring-1 ${CELL.no}`} /> not applicable
        </span>
      </div>

      <p className="mt-4 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Note the bottom row. Whichever SSID gives way, the finding that matters is
        what it reaches on the wired side — which is why segmentation validation is
        part of every wireless engagement rather than a separate quote.
      </p>
    </div>
  );
}
