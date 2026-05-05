"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Phone,
  Mail,
  Globe2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LOCATIONS, type Location } from "./Locations";

export function MapSwitcher() {
  const [activeKey, setActiveKey] = useState(LOCATIONS[0].key);
  const active = LOCATIONS.find((l) => l.key === activeKey) ?? LOCATIONS[0];
  const idx = LOCATIONS.findIndex((l) => l.key === activeKey);
  const prev = LOCATIONS[(idx - 1 + LOCATIONS.length) % LOCATIONS.length];
  const next = LOCATIONS[(idx + 1) % LOCATIONS.length];

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${active.address}, ${active.city}`
  )}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${active.lat},${active.lng}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    active.address + ", " + active.city
  )}&z=${active.zoom}&output=embed`;

  return (
    <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line overflow-hidden">
      {/* TAB STRIP */}
      <div className="border-b border-line/60 px-2 sm:px-3 pt-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          {LOCATIONS.map((loc) => (
            <LocTab
              key={loc.key}
              loc={loc}
              active={loc.key === activeKey}
              onClick={() => setActiveKey(loc.key)}
            />
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="grid lg:grid-cols-12 gap-0">
        {/* MAP */}
        <div className="relative lg:col-span-7 min-h-[420px] lg:min-h-[520px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={active.key}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title={`${active.city} office map`}
              className="absolute inset-0 size-full"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </AnimatePresence>
          {/* Subtle blend overlays */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/10 mix-blend-overlay"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
          />

          {/* Top-left chip */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-bg/85 ring-1 ring-line backdrop-blur-md px-3 py-1.5 text-xs font-mono pointer-events-none">
            <MapPin className="size-3.5 text-neon-cyan" />
            <span className="font-semibold text-fg">
              {active.city}, {active.country}
            </span>
            <span className="text-fg-faint">
              · {active.lat.toFixed(3)}, {active.lng.toFixed(3)}
            </span>
          </div>
          {/* Top-right chip */}
          {active.primary && (
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-neon-cyan/20 ring-1 ring-neon-cyan/40 backdrop-blur-md px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neon-cyan pointer-events-none">
              <Globe2 className="size-3" /> Headquarters
            </div>
          )}
          {/* Bottom action bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-bg via-bg/60 to-transparent">
            <div className="flex flex-wrap items-center justify-between gap-3">
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
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveKey(prev.key)}
                  aria-label={`Previous: ${prev.city}`}
                  className="grid size-8 place-items-center rounded-full bg-bg-2/90 ring-1 ring-line backdrop-blur text-fg-muted hover:text-fg hover:ring-neon-cyan/40 transition-all"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKey(next.key)}
                  aria-label={`Next: ${next.city}`}
                  className="grid size-8 place-items-center rounded-full bg-bg-2/90 ring-1 ring-line backdrop-blur text-fg-muted hover:text-fg hover:ring-neon-cyan/40 transition-all"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INFO PANE */}
        <div className="lg:col-span-5 p-6 sm:p-7 relative">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 size-64 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="relative h-full flex flex-col"
            >
              <div className="flex items-start gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-line text-2xl shrink-0">
                  {active.flag}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-2xl font-black text-fg leading-none">
                    {active.city}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
                    {active.role}
                  </div>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex gap-2.5">
                  <MapPin className="size-4 text-fg-faint shrink-0 mt-0.5" />
                  <div className="text-fg-muted leading-relaxed">
                    {active.address}
                    <div className="text-fg-faint text-xs mt-1">
                      {active.area}
                    </div>
                  </div>
                </li>
                {active.phone && (
                  <li className="flex gap-2.5">
                    <Phone className="size-4 text-fg-faint shrink-0 mt-0.5" />
                    <a
                      href={`tel:${active.phone}`}
                      className="text-fg font-semibold hover:text-neon-cyan transition-colors"
                    >
                      {active.phoneDisplay ?? active.phone}
                    </a>
                  </li>
                )}
                {active.email && (
                  <li className="flex gap-2.5">
                    <Mail className="size-4 text-fg-faint shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${active.email}`}
                      className="text-fg font-semibold hover:text-neon-cyan transition-colors"
                    >
                      {active.email}
                    </a>
                  </li>
                )}
                <li className="text-xs text-fg-muted pt-2 border-t border-line/60">
                  {active.hours}
                </li>
              </ul>

              {active.badges.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {active.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center rounded-full bg-white/[0.04] ring-1 ring-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fg-dim"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Mini selector dots */}
              <div className="mt-auto pt-6 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {LOCATIONS.map((l) => (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => setActiveKey(l.key)}
                      aria-label={`Switch to ${l.city}`}
                      className="group p-1"
                    >
                      <span
                        className={`block transition-all rounded-full ${
                          l.key === activeKey
                            ? "bg-neon-cyan w-6 h-1.5"
                            : "bg-fg-faint/40 size-1.5 group-hover:bg-fg-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-fg-faint">
                  {idx + 1} / {LOCATIONS.length} locations
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LocTab({
  loc,
  active,
  onClick,
}: {
  loc: Location;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-2 rounded-t-xl px-4 py-3 text-left whitespace-nowrap transition-all ${
        active
          ? "bg-bg-2/80 text-fg"
          : "text-fg-muted hover:text-fg hover:bg-white/[0.03]"
      }`}
    >
      {active && (
        <motion.span
          layoutId="loctab-rail"
          className="absolute inset-x-2 -bottom-px h-0.5 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full"
        />
      )}
      <span className="text-base">{loc.flag}</span>
      <div className="min-w-0">
        <div className={`font-display text-sm font-bold leading-none ${active ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>
          {loc.city}
        </div>
        <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-fg-faint">
          {loc.country}
        </div>
      </div>
      {loc.primary && (
        <span className="ml-1 inline-flex items-center rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-1.5 text-[9px] font-bold uppercase tracking-wider text-neon-cyan">
          HQ
        </span>
      )}
    </button>
  );
}
