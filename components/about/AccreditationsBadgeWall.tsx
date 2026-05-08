"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { VENDOR_LOGOS } from "@/content/vendorLogos";
import { ACCREDITATION_LOGOS } from "@/content/accreditationLogos";

interface BadgeItem {
  key: string;
  src: string;
  alt: string;
  label: string;
  /** Sub-line under the label (e.g. "Govt of India · MeitY"). */
  sub: string;
}

const ITEMS: BadgeItem[] = [
  ...ACCREDITATION_LOGOS.map((a) => ({
    key: a.key,
    src: a.src,
    alt: a.alt,
    label: a.label,
    sub: a.body,
  })),
  ...VENDOR_LOGOS.map((v) => ({
    key: v.vendor,
    src: v.src,
    alt: v.alt,
    label: v.label,
    sub: v.vendor,
  })),
];

export function AccreditationsBadgeWall() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      {ITEMS.map((it, i) => (
        <motion.div
          key={it.key}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="group rounded-2xl glass p-5 lift"
        >
          <div className="relative aspect-[1024/699] overflow-hidden rounded-xl bg-white">
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(max-width:768px) 50vw, 320px"
              className="object-contain p-4"
            />
          </div>
          <div className="mt-3 text-center">
            <div className="font-display text-sm font-bold text-fg">
              {it.label}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint mt-0.5">
              {it.sub}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
