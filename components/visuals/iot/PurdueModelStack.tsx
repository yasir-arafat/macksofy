"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import {
  Building2,
  Shield,
  ServerCog,
  Cpu,
  Factory,
  ArrowDown,
} from "lucide-react";

interface Layer {
  num: string;
  name: string;
  scope: string;
  examples: string;
  icon: typeof Building2;
  accent: string;
  pivot: string;
}

const LAYERS: Layer[] = [
  {
    num: "L5/L4",
    name: "Enterprise zone",
    scope: "Corp IT · ERP · email · Active Directory",
    examples: "M365 · SAP · AD DCs · file shares",
    icon: Building2,
    accent: "ring-sky-400/40 bg-sky-400/8 text-sky-300",
    pivot: "Phishing → user → cached domain creds",
  },
  {
    num: "L3.5",
    name: "Industrial DMZ",
    scope: "Jump hosts · historian replicas · patch + AV servers",
    examples: "Jump · WSUS · vendor RDP gateway",
    icon: Shield,
    accent: "ring-violet-400/40 bg-violet-400/10 text-violet-300",
    pivot: "Vendor remote-support VPN, weak MFA, shared account",
  },
  {
    num: "L3",
    name: "Operations / manufacturing",
    scope: "Historians · MES · engineering workstations · plant AD",
    examples: "OSIsoft PI · Wonderware · Step 7 EWS",
    icon: ServerCog,
    accent: "ring-amber-400/40 bg-amber-400/10 text-amber-300",
    pivot: "EWS with cached PLC project → logic modification capability",
  },
  {
    num: "L2 / L1",
    name: "Supervisory + control",
    scope: "HMIs · SCADA servers · PLCs · RTUs · safety logic",
    examples: "WinCC · iFIX · Siemens S7 · Allen-Bradley · GE Mark VIe",
    icon: Cpu,
    accent: "ring-orange-400/40 bg-orange-400/10 text-orange-300",
    pivot: "Unauthenticated Modbus/S7 write · firmware downgrade",
  },
  {
    num: "L0",
    name: "Process / physical",
    scope: "Sensors · actuators · transmitters · valves · drives",
    examples: "4-20 mA loops · HART · Profibus · 802.15.4",
    icon: Factory,
    accent: "ring-red-400/40 bg-red-400/10 text-red-300",
    pivot: "Manipulated setpoint → physical process incident",
  },
];

export function PurdueModelStack() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="space-y-3">
        {LAYERS.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <Reveal as="div" y={0} delay={i * 0.1} duration={0.45}
              key={layer.num}
              className={`relative rounded-2xl ring-1 ${layer.accent} backdrop-blur-sm overflow-hidden`}
            >
              <div className="grid grid-cols-12 gap-3 px-4 py-3.5 sm:px-5">
                <div className="col-span-3 sm:col-span-2 flex flex-col items-start gap-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
                    {layer.num}
                  </div>
                  <div className={`grid size-9 place-items-center rounded-lg ring-1 ${layer.accent}`}>
                    <Icon className="size-4" />
                  </div>
                </div>
                <div className="col-span-9 sm:col-span-10 min-w-0">
                  <div className="font-display text-sm font-bold text-fg leading-tight">
                    {layer.name}
                  </div>
                  <div className="mt-1 text-[12px] text-fg-muted leading-snug">
                    {layer.scope}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                    {layer.examples}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                className="absolute inset-x-4 bottom-0 h-px bg-current opacity-30"
              />
            </Reveal>
          );
        })}
      </div>

      {/* attack flow rail — right side */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 hidden sm:flex flex-col items-center gap-2"
        style={{ right: "-2.25rem" }}
      >
        <Reveal as="div" y={0} delay={1.0} duration={0.4}
          className="font-mono text-[9px] uppercase tracking-[0.18em] text-red-300 -rotate-90 origin-center whitespace-nowrap translate-y-12"
        >
          IT → OT pivot
        </Reveal>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 1.4, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="w-px flex-1 bg-gradient-to-b from-sky-400/60 via-amber-400/60 to-red-400/70"
        />
        <Reveal as="div" y={-8} delay={2.4} duration={0.4}
          className="grid size-6 place-items-center rounded-full ring-1 ring-red-400/60 bg-red-500/15 text-red-300"
        >
          <ArrowDown className="size-3.5" />
        </Reveal>
      </div>
    </div>
  );
}
