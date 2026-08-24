"use client";

import {
  Trophy,
  Building2,
  Award as AwardIcon,
  Globe2,
  Users,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

const REASONS = [
  {
    icon: Trophy,
    title: "Excellence in execution",
    body: "From a CEH classroom to a SEBI System Audit Report — we ship work we are proud to put our name on. Every engagement gets a senior consultant on it; nothing is delegated to juniors-only teams.",
    accent: "text-amber-300",
  },
  {
    icon: ShieldCheck,
    title: "CERT-In Empanelled · Regulator-ready",
    body: "Macksofy is empanelled by the Indian Computer Emergency Response Team under MeitY. Our audit reports are accepted by SEBI, RBI, UIDAI and IRDAI — on the first read, with zero rework.",
    accent: "text-neon-cyan",
  },
  {
    icon: Building2,
    title: "Built in India, for the world",
    body: "We are a Mumbai company with global reach. Indian cybersecurity expertise, delivered at world-class standards. UAE delivery from Dubai. Engagements across India, UAE, Oman and Canada.",
    accent: "text-neon-blue",
  },
  {
    icon: AwardIcon,
    title: "Mentor until you pass / pass audit",
    body: "Our trainers stay with you after the course ends. Our consultants stay with you after the report ships. Free pentest retests within 30 days. Free OSCP mentorship until you clear.",
    accent: "text-neon-purple",
  },
  {
    icon: Globe2,
    title: "Vendor-true · Authorized partner",
    body: "EC-Council ATC. CompTIA Authorized. Mile2 Partner. Real vouchers, official labs, no proxies — verified directly with each vendor.",
    accent: "text-neon-pink",
  },
  {
    icon: Users,
    title: "11 years · thousands of alumni · 250+ enterprises",
    body: "Since 2014: thousands of professionals trained, hundreds of pen-tests delivered, 30+ regulated audits per year. Trusted by HSBC, PwC, Verizon, Maharashtra Police, Tata Group and 30+ RBI-regulated co-op banks.",
    accent: "text-neon-green",
  },
];

export function WhyMacksofyDetailed() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {REASONS.map((r, i) => {
        const Icon = r.icon;
        return (
          <Reveal
            as="div"
            y={16}
            delay={i * 0.06}
            duration={0.45}
            key={r.title}
            className="rounded-2xl glass p-6 h-full lift"
          >
            <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-line">
              <Icon className={cn("size-6", r.accent)} />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-fg">
              {r.title}
            </h3>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">
              {r.body}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}
