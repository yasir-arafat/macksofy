"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Mail, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OfficeLocation {
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  role: string;
  primary?: boolean;
  address: string;
  area: string;
  lat: number;
  lng: number;
  zoom: number;
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  hoursLabel: string;
  tz: "Asia/Kolkata" | "Asia/Dubai" | "Asia/Muscat";
  badges: string[];
}

export function OfficeMap({
  loc,
  index,
}: {
  loc: OfficeLocation;
  index: number;
}) {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${loc.address}, ${loc.city}`
  )}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    loc.address + ", " + loc.city
  )}&z=${loc.zoom}&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl ring-1 transition-all",
        loc.primary
          ? "ring-neon-cyan/30 shadow-[0_0_40px_-10px_rgba(0,229,255,0.3)]"
          : "ring-line hover:ring-neon-cyan/20"
      )}
    >
      {loc.primary && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-neon-cyan/[0.06] via-transparent to-neon-purple/[0.06] pointer-events-none"
        />
      )}

      <div className="relative grid lg:grid-cols-12 gap-0 bg-bg-1/60 backdrop-blur-sm">
        {/* MAP SIDE */}
        <div
          className={cn(
            "relative lg:col-span-7 overflow-hidden",
            loc.primary ? "min-h-[340px]" : "min-h-[260px]"
          )}
        >
          <iframe
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full"
            title={`Macksofy ${loc.city} office map`}
          />
          {/* Subtle dark blend for theme consistency without inverting label text */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/10 mix-blend-overlay"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
          />
          {/* Marker chip */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-bg/80 ring-1 ring-line backdrop-blur-md px-3 py-1.5 text-xs font-mono text-fg pointer-events-none">
            <MapPin className="size-3.5 text-neon-cyan" />
            <span className="font-semibold">
              {loc.city}, {loc.country}
            </span>
            <span className="text-fg-faint">· {loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}</span>
          </div>
          {loc.primary && (
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-neon-cyan/20 ring-1 ring-neon-cyan/40 backdrop-blur-md px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neon-cyan pointer-events-none">
              <Globe2 className="size-3" /> Headquarters
            </div>
          )}
          {/* Bottom gradient + actions */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-bg via-bg/50 to-transparent">
            <div className="flex flex-wrap gap-2">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-bg-2/90 ring-1 ring-line backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-fg hover:text-neon-cyan hover:ring-neon-cyan/40 transition-colors"
              >
                <MapPin className="size-3.5" /> Open in Maps
              </a>
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-neon-cyan/20 ring-1 ring-neon-cyan/40 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
              >
                <Navigation className="size-3.5" /> Directions
              </a>
            </div>
          </div>
        </div>

        {/* INFO SIDE */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col">
          <div className="flex items-start gap-3">
            <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-line text-2xl shrink-0">
              {loc.flag}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-2xl font-black text-fg leading-none">
                {loc.city}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
                {loc.role}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex gap-2.5">
              <MapPin className="size-4 text-fg-faint shrink-0 mt-0.5" />
              <div className="text-fg-muted leading-relaxed">
                {loc.address}
                <div className="text-fg-faint text-xs mt-1">{loc.area}</div>
              </div>
            </div>
            {loc.phone && (
              <div className="flex gap-2.5">
                <Phone className="size-4 text-fg-faint shrink-0 mt-0.5" />
                <a
                  href={`tel:${loc.phone}`}
                  className="text-fg font-semibold hover:text-neon-cyan transition-colors"
                >
                  {loc.phoneDisplay ?? loc.phone}
                </a>
              </div>
            )}
            {loc.email && (
              <div className="flex gap-2.5">
                <Mail className="size-4 text-fg-faint shrink-0 mt-0.5" />
                <a
                  href={`mailto:${loc.email}`}
                  className="text-fg font-semibold hover:text-neon-cyan transition-colors"
                >
                  {loc.email}
                </a>
              </div>
            )}
            <div className="text-xs text-fg-muted pt-1 border-t border-line/60">
              {loc.hoursLabel}
            </div>
          </div>

          {loc.badges.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {loc.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-full bg-white/[0.04] ring-1 ring-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fg-dim"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
