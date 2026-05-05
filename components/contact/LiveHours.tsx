"use client";

import { useEffect, useState } from "react";

/**
 * Open/closed indicator that respects IST (Asia/Kolkata).
 * Hours: Mon–Sat 09:30–18:30 IST.
 */
export function LiveHours({ tz = "Asia/Kolkata" }: { tz?: "Asia/Kolkata" | "Asia/Dubai" }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-fg-faint font-mono">
        <span className="size-2 rounded-full bg-fg-faint" />
        Loading…
      </span>
    );
  }

  const fmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const minutesNow = hour * 60 + minute;
  const isWeekday = !["Sun"].includes(weekday);
  const open = isWeekday && minutesNow >= 9 * 60 + 30 && minutesNow <= 18 * 60 + 30;

  const timeStr = new Intl.DateTimeFormat("en-IN", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono">
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
            open ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
        <span
          className={`relative inline-flex size-2 rounded-full ${
            open ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
      </span>
      <span className={open ? "text-emerald-300" : "text-amber-300"}>
        {open ? "Open now" : "Closed"}
      </span>
      <span className="text-fg-faint">
        · {timeStr} {tz === "Asia/Kolkata" ? "IST" : "GST"}
      </span>
    </span>
  );
}
