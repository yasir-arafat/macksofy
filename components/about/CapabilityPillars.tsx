"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crosshair,
  Shield,
  GraduationCap,
  Microscope,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    key: "offensive",
    label: "Offensive Security",
    desc:
      "Penetration testing, red teaming, web/API/cloud assessments by OSCP/OSWE/OSEP-certified consultants.",
    href: "/services",
    bullets: ["Pentest · VAPT", "Red team operations", "Web · API · Cloud"],
    icon: Crosshair,
    accent: "from-neon-cyan to-neon-blue",
    text: "text-neon-cyan",
  },
  {
    key: "defensive",
    label: "Defensive Engineering",
    desc:
      "SOC engineering on Wazuh + ELK + Splunk, MDR services, DFIR and threat intelligence programs.",
    href: "/services/soc-setup-siem",
    bullets: ["SOC + SIEM build", "DFIR · Malware analysis", "Threat intelligence"],
    icon: Shield,
    accent: "from-neon-blue to-neon-purple",
    text: "text-neon-blue",
  },
  {
    key: "audit",
    label: "Audit & Compliance",
    desc:
      "CERT-In empanelled audits accepted by SEBI, RBI, UIDAI. ISO 27001 implementation, PCI-DSS, NESA UAE.",
    href: "/audit",
    bullets: ["CERT-In · RBI · SEBI", "ISO 27001 · PCI-DSS", "UAE NESA · DESC"],
    icon: Microscope,
    accent: "from-neon-purple to-neon-pink",
    text: "text-neon-purple",
  },
  {
    key: "training",
    label: "Cybersecurity Training",
    desc:
      "EC-Council, OffSec, CompTIA authorized programs plus Macksofy career tracks. Mentor until you pass.",
    href: "/training",
    bullets: ["CEH · OSCP · CSA · CHFI", "OffSec OSWE · OSEP · OSED", "Corporate training"],
    icon: GraduationCap,
    accent: "from-amber-300 to-neon-pink",
    text: "text-amber-300",
  },
];

export function CapabilityPillars() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PILLARS.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onMouseEnter={() => setHovered(p.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link href={p.href} className="group block h-full">
              <div className="relative h-full rounded-2xl glass p-6 overflow-hidden lift">
                <div
                  className={cn(
                    "absolute -top-20 -right-20 size-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 bg-gradient-to-br",
                    p.accent,
                    hovered === p.key && "opacity-30"
                  )}
                />
                <div className="relative">
                  <div
                    className={cn(
                      "inline-grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-line transition-all duration-300",
                      hovered === p.key ? cn("scale-110 ring-2", p.text.replace("text-", "ring-")) : ""
                    )}
                  >
                    <Icon className={cn("size-6", p.text)} />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-fg group-hover:text-neon-cyan transition-colors">
                    {p.label}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>

                  <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-xs font-mono text-fg-muted"
                      >
                        <span className={cn("mt-1 size-1 shrink-0 rounded-full", p.text.replace("text-", "bg-"))} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className={cn("mt-5 inline-flex items-center gap-1 text-xs font-semibold", p.text)}>
                    Explore <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-12" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
