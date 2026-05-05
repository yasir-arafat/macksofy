"use client";

import { motion } from "framer-motion";
import { MapPin, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCATIONS = [
  {
    city: "Mumbai",
    country: "India",
    role: "Global Headquarters",
    address: "308, Building 11, SRA Commercial Tower, BKC, Bandra East",
    note: "Bandra Kurla Complex · 5 min from BKC Metro",
    flag: "🇮🇳",
    primary: true,
  },
  {
    city: "Hyderabad",
    country: "India",
    role: "Regional Hub · South India",
    address: "HITEC City — service delivery for Telangana & Andhra Pradesh",
    note: "Telangana, Karnataka, Tamil Nadu & Kerala engagements",
    flag: "🇮🇳",
  },
  {
    city: "Dubai",
    country: "UAE",
    role: "Regional Hub · GCC",
    address: "Business Bay — UAE service delivery",
    note: "BFSI, government and enterprise across Dubai, Abu Dhabi, Sharjah",
    flag: "🇦🇪",
  },
  {
    city: "Muscat",
    country: "Oman",
    role: "Engagement Site",
    address: "Service delivery to Omani government and enterprise clients",
    note: "Cybersecurity training and consulting engagements",
    flag: "🇴🇲",
  },
  {
    city: "Toronto",
    country: "Canada",
    role: "Engagement Site",
    address: "North America consulting and pen-testing partnerships",
    note: "Cross-border consulting and pentest engagements",
    flag: "🇨🇦",
  },
];

export function LocationsShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LOCATIONS.map((loc, i) => (
        <motion.div
          key={loc.city}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.45 }}
          className={cn(
            "group relative rounded-2xl overflow-hidden lift",
            loc.primary ? "gradient-border glow-cyan sm:col-span-2 lg:col-span-1" : "glass"
          )}
        >
          {loc.primary && (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/15 via-transparent to-neon-purple/10" />
          )}
          <div className="relative p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-bg-2 ring-1 ring-line text-2xl">
                  {loc.flag}
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-fg">
                    {loc.city}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                    {loc.country}
                  </div>
                </div>
              </div>
              {loc.primary && (
                <span className="inline-flex items-center gap-1 rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
                  <Globe2 className="size-3" /> HQ
                </span>
              )}
            </div>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
              {loc.role}
            </div>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              <MapPin className="inline size-3.5 text-fg-faint mr-1 -mt-0.5" />
              {loc.address}
            </p>
            <p className="mt-2 text-xs text-fg-faint leading-relaxed">{loc.note}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
