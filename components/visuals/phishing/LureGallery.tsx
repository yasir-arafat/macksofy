"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import {
  Mail,
  Eye,
  Receipt,
  Smartphone,
  Landmark,
  Briefcase,
  FileText,
  Building,
  type LucideIcon,
} from "lucide-react";

/**
 * The India-context lure library, as templates rather than screenshots.
 *
 * Every pretext here maps to a real Indian institution employees transact with
 * (GSTN, UPI, EPFO, CBDT, exchange circulars, vendor invoices) — the point the
 * page makes is that international template libraries do not carry these.
 * Sender domains shown are deliberately non-routable examples.
 */

type Tier = "Easy" | "Medium" | "Hard" | "Spear";

interface Lure {
  id: string;
  icon: LucideIcon;
  pretext: string;
  audience: string;
  tier: Tier;
  from: string;
  subject: string;
  tell: string;
  accent: string;
}

const LURES: Lure[] = [
  {
    id: "gst",
    icon: Receipt,
    pretext: "GST refund credit",
    audience: "Finance & accounts",
    tier: "Medium",
    from: "refunds@gstn-portal-in.example",
    subject: "Refund of ₹2,14,860 credited — confirm bank account by 5 PM",
    tell: "The real portal never asks you to re-confirm bank details by email, and the domain is a lookalike, not gst.gov.in.",
    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  },
  {
    id: "upi",
    icon: Smartphone,
    pretext: "UPI mandate alert",
    audience: "All staff",
    tier: "Easy",
    from: "alerts@upi-secure.example",
    subject: "AutoPay mandate of ₹49,999 activated — cancel now",
    tell: "Urgency plus a large number. Real mandate alerts land in the payment app, not as an email with a cancel link.",
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
  },
  {
    id: "epfo",
    icon: Landmark,
    pretext: "EPFO / payroll portal",
    audience: "All staff",
    tier: "Medium",
    from: "no-reply@epfo-member.example",
    subject: "UAN KYC incomplete — account frozen from Monday",
    tell: "A consequence with a deadline, and a login page on a domain that is not epfindia.gov.in.",
    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  },
  {
    id: "bec",
    icon: Briefcase,
    pretext: "Vendor invoice BEC",
    audience: "Accounts payable",
    tier: "Hard",
    from: "accounts@<real-vendor-lookalike>.example",
    subject: "Re: PO 4500219 — updated bank details for this quarter",
    tell: "Threaded onto a genuine-looking PO reference. Bank-detail changes need out-of-band voice confirmation, always.",
    accent: "text-red-300 ring-red-400/40 bg-red-400/10",
  },
  {
    id: "it",
    icon: FileText,
    pretext: "Internal IT / MFA fatigue",
    audience: "Engineering",
    tier: "Hard",
    from: "it-helpdesk@<your-domain-lookalike>.example",
    subject: "Re-enrol your authenticator before the migration window closes",
    tell: "Engineering teams click this one most. The giveaway is an OAuth consent screen requesting more scope than a re-enrolment needs.",
    accent: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
  },
  {
    id: "exec",
    icon: Building,
    pretext: "Regulator / exchange notice",
    audience: "Exec & compliance",
    tier: "Spear",
    from: "compliance@<exchange-lookalike>.example",
    subject: "Clarification sought — disclosure under Regulation 30",
    tell: "OSINT-built and addressed to a named officer. Runs only under separate written authorisation, results CISO-only.",
    accent: "text-pink-300 ring-pink-400/40 bg-pink-400/10",
  },
];

const TIER_STYLE: Record<Tier, string> = {
  Easy: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  Medium: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  Hard: "bg-orange-500/10 text-orange-300 ring-orange-500/30",
  Spear: "bg-red-500/10 text-red-300 ring-red-400/30",
};

export function LureGallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Lure library · India context
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          Tap a card for the tell
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LURES.map((l, i) => {
          const Icon = l.icon;
          const isOpen = open === l.id;
          return (
            <Reveal as="button" y={10} delay={i * 0.06} duration={0.32} margin="-40px"
              key={l.id}
              type="button"
              onClick={() => setOpen(isOpen ? null : l.id)}
              aria-expanded={isOpen}
              className="rounded-xl bg-white/[0.02] p-4 text-left ring-1 ring-line/60 transition-colors hover:ring-amber-400/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${l.accent}`}>
                  <Icon className="size-[18px]" />
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider ring-1 ${TIER_STYLE[l.tier]}`}
                >
                  {l.tier}
                </span>
              </div>

              <div className="mt-3 font-display text-sm font-bold leading-tight text-fg">
                {l.pretext}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                {l.audience}
              </div>

              <div className="mt-3 rounded-lg bg-black/30 p-2.5 ring-1 ring-line/50">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-fg-faint">
                  <Mail className="size-3" />
                  <span className="truncate">{l.from}</span>
                </div>
                <div className="mt-1.5 text-[12px] leading-snug text-fg-muted">{l.subject}</div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-[12px] leading-relaxed text-amber-100/90 ring-1 ring-amber-400/25">
                      <Eye className="mt-0.5 size-4 shrink-0" />
                      <span>{l.tell}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Sender domains above are non-routable examples. Live campaigns use
        registered lookalikes agreed with you in scoping, and pretexts rotate each
        quarter so staff cannot pattern-match the programme instead of the threat.
      </p>
    </div>
  );
}
