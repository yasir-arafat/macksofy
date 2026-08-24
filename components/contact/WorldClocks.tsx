"use client";

import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import { LOCATIONS } from "./Locations";
import { Reveal } from "@/components/motion/Reveal";

interface ClockState {
  time: string;
  weekday: string;
  open: boolean;
  utcOffset: string;
}

function evalLocation(now: Date, tz: string, hours: string): ClockState {
  const fmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const minutesNow = hour * 60 + minute;

  // Naive parse of "Mon–Sat · 9:30–18:30"
  // Extract working days + open / close minutes.
  const lower = hours.toLowerCase();
  const isWorkingDay =
    (lower.includes("mon") && /mon/.test(weekday.toLowerCase())) ||
    (lower.includes("tue") && /tue/.test(weekday.toLowerCase())) ||
    (lower.includes("wed") && /wed/.test(weekday.toLowerCase())) ||
    (lower.includes("thu") && /thu/.test(weekday.toLowerCase())) ||
    (lower.includes("fri") && /fri/.test(weekday.toLowerCase())) ||
    (lower.includes("sat") && /sat/.test(weekday.toLowerCase())) ||
    (lower.includes("sun") && /sun/.test(weekday.toLowerCase()));

  // Default 9–18 if parse fails.
  let openMin = 9 * 60 + 30;
  let closeMin = 18 * 60 + 30;
  const m = hours.match(/(\d{1,2}):?(\d{0,2})\s*[–-]\s*(\d{1,2}):?(\d{0,2})/);
  if (m) {
    openMin = Number(m[1]) * 60 + Number(m[2] || 0);
    closeMin = Number(m[3]) * 60 + Number(m[4] || 0);
  }

  const open = isWorkingDay && minutesNow >= openMin && minutesNow <= closeMin;

  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  // GMT offset
  const offsetFmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  });
  const offsetParts = offsetFmt.formatToParts(now);
  const utcOffset =
    offsetParts.find((p) => p.type === "timeZoneName")?.value ?? "";

  return { time, weekday, open, utcOffset };
}

export function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line p-5 sm:p-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-20 -right-20 size-72 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none"
      />
      <div className="relative flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="inline-flex items-center gap-2 text-neon-cyan">
          <Globe2 className="size-4" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
            World clocks · live
          </span>
        </div>
        <span className="font-mono text-[10px] text-fg-faint">
          We follow the sun across {LOCATIONS.length} cities
        </span>
      </div>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {LOCATIONS.map((loc, i) => {
          const state = now
            ? evalLocation(now, loc.tz, loc.hours)
            : { time: "--:--", weekday: "", open: false, utcOffset: "" };
          return (
            <Reveal as="div" y={8} delay={i * 0.05}
              key={loc.key}
              className={`relative rounded-2xl p-4 ring-1 transition-all ${
                loc.primary
                  ? "bg-gradient-to-br from-neon-cyan/[0.08] to-neon-purple/[0.05] ring-neon-cyan/30 shadow-[0_0_24px_-12px_rgba(0,229,255,0.45)]"
                  : "bg-bg-1/60 ring-line/60 hover:ring-white/15"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-2xl">{loc.flag}</div>
                <span
                  className={`relative inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                    state.open
                      ? "bg-emerald-500/15 ring-1 ring-emerald-500/40 text-emerald-300"
                      : "bg-amber-500/10 ring-1 ring-amber-500/30 text-amber-300/90"
                  }`}
                >
                  <span className="relative flex size-1.5">
                    {state.open && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    )}
                    <span
                      className={`relative inline-flex size-1.5 rounded-full ${
                        state.open ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                  </span>
                  {state.open ? "Open" : "Closed"}
                </span>
              </div>
              <div className="mt-3">
                <div className="font-display text-2xl font-black text-fg leading-none tabular-nums">
                  {state.time}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                  {loc.city} · {state.utcOffset}
                </div>
              </div>
              <div className="mt-2 text-[10px] text-fg-dim">{loc.role}</div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
