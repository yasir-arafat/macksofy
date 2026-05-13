"use client";

import { motion } from "framer-motion";
import {
  Radio,
  Plug,
  Zap,
  Wifi,
  Antenna,
  Cable,
  Network,
  Activity,
} from "lucide-react";

type Sev = "crit" | "high" | "med";

interface Protocol {
  name: string;
  zone: string;
  icon: typeof Radio;
  sev: Sev;
  weakness: string;
  port?: string;
}

const PROTOCOLS: Protocol[] = [
  {
    name: "Modbus TCP",
    zone: "Field · L1/L2",
    icon: Plug,
    sev: "high",
    weakness: "Unauthenticated function-code writes",
    port: "502",
  },
  {
    name: "S7Comm",
    zone: "Field · Siemens",
    icon: Cable,
    sev: "crit",
    weakness: "Plaintext stop/start CPU + program upload",
    port: "102",
  },
  {
    name: "DNP3",
    zone: "Utility telemetry",
    icon: Activity,
    sev: "high",
    weakness: "Secure Auth often disabled · replay",
    port: "20000",
  },
  {
    name: "IEC 60870-5-104",
    zone: "Power · SCADA",
    icon: Zap,
    sev: "crit",
    weakness: "No authentication · spoofable ASDU",
    port: "2404",
  },
  {
    name: "IEC 61850 GOOSE",
    zone: "Substation L1",
    icon: Network,
    sev: "crit",
    weakness: "Multicast L2 · trip-command spoofing",
  },
  {
    name: "Profinet",
    zone: "Field · L1/L2",
    icon: Cable,
    sev: "high",
    weakness: "DCP discovery + unauthenticated writes",
  },
  {
    name: "BACnet/IP",
    zone: "BMS · HVAC",
    icon: Antenna,
    sev: "high",
    weakness: "Broadcast write-property · setpoint manip",
    port: "47808",
  },
  {
    name: "OPC UA",
    zone: "L2/L3 broker",
    icon: Network,
    sev: "med",
    weakness: "Cert pinning skipped · self-signed trust",
    port: "4840",
  },
  {
    name: "MQTT",
    zone: "IoT broker",
    icon: Wifi,
    sev: "med",
    weakness: "Wildcards + missing ACLs · anon publish",
    port: "1883",
  },
  {
    name: "LoRaWAN",
    zone: "IoT field RF",
    icon: Radio,
    sev: "med",
    weakness: "AppKey reuse · downlink injection",
  },
  {
    name: "Zigbee 3.0",
    zone: "IoT mesh",
    icon: Radio,
    sev: "med",
    weakness: "Touchlink commissioning + key leakage",
  },
  {
    name: "HART-IP",
    zone: "Process L0/L1",
    icon: Plug,
    sev: "med",
    weakness: "Instrument config + calibration spoof",
    port: "5094",
  },
];

const SEV_STYLES: Record<Sev, { ring: string; pill: string; meter: string; bar: string }> = {
  crit: {
    ring: "ring-red-400/40 hover:ring-red-400/70",
    pill: "bg-red-500/15 text-red-300 ring-1 ring-red-400/40",
    meter: "text-red-300",
    bar: "from-red-500 to-red-400",
  },
  high: {
    ring: "ring-amber-400/40 hover:ring-amber-400/70",
    pill: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/40",
    meter: "text-amber-300",
    bar: "from-amber-500 to-amber-300",
  },
  med: {
    ring: "ring-sky-400/30 hover:ring-sky-400/60",
    pill: "bg-sky-400/10 text-sky-300 ring-1 ring-sky-400/30",
    meter: "text-sky-300",
    bar: "from-sky-500 to-sky-300",
  },
};

const SEV_WIDTH: Record<Sev, string> = {
  crit: "92%",
  high: "70%",
  med: "48%",
};

export function ICSProtocolGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {PROTOCOLS.map((p, i) => {
        const Icon = p.icon;
        const s = SEV_STYLES[p.sev];
        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (i % 6) * 0.06 + Math.floor(i / 6) * 0.18, duration: 0.4 }}
            className={`group relative rounded-xl ring-1 ${s.ring} bg-bg-1/40 backdrop-blur-sm p-4 transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`grid size-9 place-items-center rounded-lg ring-1 ${s.ring} ${s.meter}`}>
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold text-fg leading-tight truncate">
                    {p.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint mt-0.5 truncate">
                    {p.zone}
                  </div>
                </div>
              </div>
              <span className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${s.pill}`}>
                {p.sev}
              </span>
            </div>

            <p className="mt-3 text-[12px] text-fg-muted leading-snug">
              {p.weakness}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-bg-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: SEV_WIDTH[p.sev] }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.06 + Math.floor(i / 6) * 0.18 + 0.25, duration: 0.7, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
                />
              </div>
              {p.port && (
                <span className="font-mono text-[10px] text-fg-faint">:{p.port}</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
