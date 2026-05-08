import { CheckCircle2, Info, AlertTriangle, Lightbulb } from "lucide-react";
import type { ResourceBlock } from "@/content/resources";

const CALLOUT_ICON = {
  info: Info,
  warn: AlertTriangle,
  tip: Lightbulb,
} as const;

const CALLOUT_TONE = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    title: "text-blue-900",
    body: "text-blue-900/80",
    iconBg: "bg-blue-100",
    iconFg: "text-blue-700",
  },
  warn: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "text-amber-900",
    body: "text-amber-900/80",
    iconBg: "bg-amber-100",
    iconFg: "text-amber-700",
  },
  tip: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    title: "text-emerald-900",
    body: "text-emerald-900/80",
    iconBg: "bg-emerald-100",
    iconFg: "text-emerald-700",
  },
} as const;

export function ResourceContent({ blocks }: { blocks: ResourceBlock[] }) {
  return (
    <div className="prose prose-slate max-w-none print:prose-sm">
      {blocks.map((b, i) => {
        if (b.type === "para") {
          return <p key={i}>{b.text}</p>;
        }
        if (b.type === "heading") {
          const level = b.level ?? 2;
          if (level === 3) return <h3 key={i}>{b.text}</h3>;
          return <h2 key={i}>{b.text}</h2>;
        }
        if (b.type === "list") {
          return (
            <ul key={i}>
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "checklist") {
          return (
            <ul key={i} className="not-prose space-y-3 my-6 print:my-4">
              {b.items.map((it, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 print:break-inside-avoid"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 text-[15px] leading-snug">
                      {it.item}
                    </div>
                    {it.sub && (
                      <div className="mt-1 text-sm text-slate-600 leading-snug">
                        {it.sub}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "callout") {
          const Icon = CALLOUT_ICON[b.tone];
          const tone = CALLOUT_TONE[b.tone];
          return (
            <div
              key={i}
              className={`not-prose my-6 print:my-4 rounded-xl border ${tone.bg} ${tone.border} p-5 flex gap-4 print:break-inside-avoid`}
            >
              <div
                className={`grid size-10 shrink-0 place-items-center rounded-lg ${tone.iconBg} ${tone.iconFg}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className={`font-bold text-[15px] ${tone.title}`}>
                  {b.title}
                </div>
                <p className={`mt-1 text-sm leading-relaxed ${tone.body}`}>
                  {b.body}
                </p>
              </div>
            </div>
          );
        }
        if (b.type === "table") {
          return (
            <div key={i} className="not-prose my-6 print:my-4 overflow-x-auto print:overflow-visible">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    {b.head.map((h, j) => (
                      <th
                        key={j}
                        className="border border-slate-300 px-3 py-2 text-left font-bold text-slate-900"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j} className="even:bg-slate-50 print:break-inside-avoid">
                      {row.map((cell, k) => (
                        <td
                          key={k}
                          className="border border-slate-200 px-3 py-2 align-top text-slate-800"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (b.type === "stats") {
          return (
            <div
              key={i}
              className="not-prose my-6 print:my-4 grid gap-3 sm:grid-cols-3 print:grid-cols-3 print:break-inside-avoid"
            >
              {b.items.map((s, j) => (
                <div
                  key={j}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
                >
                  <div className="font-display text-3xl font-black text-slate-900 leading-none">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs font-mono uppercase tracking-wider text-slate-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
