"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { VENDOR_LOGOS } from "@/content/vendorLogos";
import { ACCREDITATION_LOGOS } from "@/content/accreditationLogos";
import { Reveal } from "@/components/motion/Reveal";

interface BadgeItem {
  key: string;
  src: string;
  alt: string;
  label: string;
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
        <Reveal
          as="div"
          y={0}
          delay={i * 0.06}
          duration={0.4}
          key={it.key}
          className="group rounded-2xl glass p-5 lift"
        >
          <div className="relative aspect-[1024/699] overflow-hidden rounded-xl bg-white">
            {it.src ? (
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width:768px) 50vw, 320px"
                className="object-contain p-4"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                <ShieldCheck className="size-10 text-emerald-600" />
                <span className="text-[10px] font-semibold leading-tight text-gray-700">
                  {it.alt}
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <div className="font-display text-sm font-bold text-fg">
              {it.label}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint mt-0.5">
              {it.sub}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
