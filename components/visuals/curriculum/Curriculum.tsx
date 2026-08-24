"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Layout,
  ListOrdered,
  Search,
  Sparkles,
  X,
} from "lucide-react";

export interface CurriculumModule {
  module: string;
  durationHours?: number;
  topics: string[];
}

interface Props {
  slug: string;
  modules: CurriculumModule[];
  courseShortTitle?: string;
  duration?: string;
}

type View = "split" | "track";

const TONE = {
  ring: "ring-neon-cyan/40",
  text: "text-neon-cyan",
  bg: "bg-neon-cyan",
  bgSoft: "bg-neon-cyan/10",
  glow: "shadow-[0_0_24px_rgba(0,229,255,0.35)]",
  hex: "#00e5ff",
};

/* ============================================================ */
/*  Slug → default view                                          */
/* ============================================================ */
const SLUG_VIEW: Record<string, View> = {
  oscp: "track",
  "osep": "track",
  "oswe": "track",
  "osed": "track",
  cpent: "track",
  ceh: "split",
  "ceh-practical": "split",
  chfi: "split",
  "osda": "split",
  "soc-analyst": "track",
  "web-application-security": "track",
  "corporate-training": "split",
};

export function Curriculum({
  slug,
  modules,
  courseShortTitle,
  duration,
}: Props) {
  const defaultView: View = SLUG_VIEW[slug] ?? "split";
  const [view, setView] = useState<View>(defaultView);
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("");

  const totalHoursFromModules = useMemo(
    () => modules.reduce((s, m) => s + (m.durationHours ?? 0), 0),
    [modules]
  );
  const parsedDurationHours = useMemo(() => {
    const m = (duration ?? "").match(/(\d+)\s*hours?/i);
    return m ? parseInt(m[1], 10) : 0;
  }, [duration]);
  // Trust the explicit course duration when module-level hours are missing
  // or smaller (e.g., only a Capstone has durationHours).
  const totalHours = Math.max(totalHoursFromModules, parsedDurationHours);

  const totalTopics = useMemo(
    () => modules.reduce((s, m) => s + m.topics.length, 0),
    [modules]
  );

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return modules.map((m, i) => ({ ...m, idx: i }));
    return modules
      .map((m, i) => ({ ...m, idx: i }))
      .filter(
        (m) =>
          m.module.toLowerCase().includes(q) ||
          m.topics.some((t) => t.toLowerCase().includes(q))
      );
  }, [modules, filter]);

  const go = (delta: number) => {
    setActive((v) => Math.max(0, Math.min(modules.length - 1, v + delta)));
  };

  return (
    <div className="space-y-6">
      {/* HEADER STATS BAR */}
      <div className="rounded-2xl bg-bg-2/40 ring-1 ring-line p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 min-w-0">
            <Stat
              icon={Layers}
              label="Modules"
              value={String(modules.length)}
            />
            {totalHours > 0 && (
              <Stat icon={Clock} label="Hours" value={String(totalHours)} />
            )}
            <Stat
              icon={ListOrdered}
              label="Topics"
              value={String(totalTopics)}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setView("split")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                view === "split"
                  ? `${TONE.bgSoft} ring-1 ${TONE.ring} ${TONE.text}`
                  : "bg-bg-2 ring-1 ring-line text-fg-muted hover:text-fg"
              }`}
              aria-label="Split view"
            >
              <Layout className="size-3.5" />
              Split
            </button>
            <button
              type="button"
              onClick={() => setView("track")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                view === "track"
                  ? `${TONE.bgSoft} ring-1 ${TONE.ring} ${TONE.text}`
                  : "bg-bg-2 ring-1 ring-line text-fg-muted hover:text-fg"
              }`}
              aria-label="Track view"
            >
              <BookOpen className="size-3.5" />
              Track
            </button>
          </div>
        </div>

        {/* Filter input */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-fg-faint" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search modules and topics…"
            className="w-full rounded-xl bg-bg-1 border border-line pl-10 pr-9 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30 transition-colors"
          />
          {filter && (
            <button
              type="button"
              onClick={() => setFilter("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid size-7 place-items-center rounded-md text-fg-faint hover:text-fg hover:bg-white/5"
            >
              <X className="size-4" />
            </button>
          )}
          {filter && (
            <div className="mt-2 font-mono text-[10px] text-fg-faint">
              {filtered.length} match{filtered.length === 1 ? "" : "es"} for
              &ldquo;{filter}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* BODY — view-dependent */}
      <AnimatePresence mode="wait" initial={false}>
        {view === "split" ? (
          <motion.div
            key="split"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <SplitView
              modules={filtered}
              total={modules.length}
              active={active}
              setActive={setActive}
              go={go}
              courseShortTitle={courseShortTitle}
            />
          </motion.div>
        ) : (
          <motion.div
            key="track"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <TrackView
              modules={filtered}
              total={modules.length}
              active={active}
              setActive={setActive}
              duration={duration}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================ */
/*  Stat helper                                                  */
/* ============================================================ */
function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid size-9 place-items-center rounded-lg ${TONE.bgSoft} ring-1 ${TONE.ring} ${TONE.text}`}
      >
        <Icon className="size-4" />
      </div>
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-fg-faint">
          {label}
        </div>
        <div className={`font-display text-lg font-black ${TONE.text} leading-none`}>
          {value}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  SPLIT VIEW — sidebar + detail                                */
/* ============================================================ */
function SplitView({
  modules,
  total,
  active,
  setActive,
  go,
  courseShortTitle,
}: {
  modules: (CurriculumModule & { idx: number })[];
  total: number;
  active: number;
  setActive: (i: number) => void;
  go: (delta: number) => void;
  courseShortTitle?: string;
}) {
  if (modules.length === 0) {
    return <EmptyState />;
  }

  // active is index into ORIGINAL modules; need to find item in filtered
  const activeItem =
    modules.find((m) => m.idx === active) ?? modules[0];

  return (
    <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line overflow-hidden grid lg:grid-cols-12 min-h-[520px]">
      {/* SIDEBAR */}
      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-line bg-bg-1/40 max-h-[640px] lg:overflow-y-auto">
        <ol>
          {modules.map((mod) => {
            const isActive = activeItem.idx === mod.idx;
            return (
              <li key={mod.idx}>
                <button
                  type="button"
                  onClick={() => setActive(mod.idx)}
                  className={`group relative w-full flex items-start gap-3 px-4 py-3 text-left border-b border-line/40 last:border-b-0 transition-all ${
                    isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="curr-rail"
                      className={`absolute left-0 inset-y-2 w-1 rounded-r-full ${TONE.bg}`}
                    />
                  )}
                  <div
                    className={`grid size-8 shrink-0 place-items-center rounded-lg transition-all ${
                      isActive
                        ? `${TONE.bgSoft} ${TONE.text} ring-1 ${TONE.ring}`
                        : "bg-bg ring-1 ring-line text-fg-muted group-hover:text-fg"
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold">
                      {String(mod.idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-display text-[13px] font-bold leading-tight transition-colors line-clamp-2 ${
                        isActive ? TONE.text : "text-fg"
                      }`}
                    >
                      {mod.module}
                    </div>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-fg-faint">
                      {mod.durationHours && (
                        <>
                          <span>{mod.durationHours}h</span>
                          <span>·</span>
                        </>
                      )}
                      <span>{mod.topics.length} topics</span>
                    </div>
                  </div>
                  {isActive && (
                    <ArrowRight
                      className={`size-3.5 ${TONE.text} shrink-0 mt-2`}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* DETAIL */}
      <div className="lg:col-span-8 p-6 sm:p-7 relative">
        <div
          aria-hidden
          className={`absolute -top-20 -right-20 size-72 rounded-full ${TONE.bgSoft} blur-3xl pointer-events-none`}
        />
        {/* Every module's topics are rendered here, not just the active one.
            Previously this mounted only `activeItem`, so 788 of the site's 872
            curriculum topic strings never reached the server-rendered HTML
            (CEH shipped 4 of 74, OSCP 3 of 82). Inactive panels are hidden with
            CSS, which keeps the full syllabus crawlable and the content
            single-sourced — no duplicate "SEO copy" block. */}
        {modules.map((mod) => {
          const isShown = mod.idx === activeItem.idx;
          return (
            <div
              key={mod.idx}
              hidden={!isShown}
              className={`relative h-full ${isShown ? "flex flex-col" : ""}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${TONE.text}`}
                  >
                    Module {String(mod.idx + 1).padStart(2, "0")} / {total}
                    {courseShortTitle ? ` · ${courseShortTitle}` : ""}
                  </div>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg leading-tight">
                    {mod.module}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {mod.durationHours && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full ${TONE.bgSoft} ring-1 ${TONE.ring} px-2.5 py-1 font-mono text-[10px] font-bold ${TONE.text}`}
                    >
                      <Clock className="size-3" /> {mod.durationHours}h
                    </span>
                  )}
                </div>
              </div>

              {/* Topics list */}
              <ul className="mt-6 grid gap-2 sm:grid-cols-2 flex-1">
                {mod.topics.map((t, i) => (
                  <li
                    key={t}
                    className="flex gap-3 rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-3"
                  >
                    <div
                      className={`grid size-6 shrink-0 place-items-center rounded-md ${TONE.bgSoft} ring-1 ${TONE.ring}`}
                    >
                      <span className={`font-mono text-[10px] font-bold ${TONE.text}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-fg-muted leading-snug pt-0.5">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Nav */}
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={mod.idx === 0}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-muted hover:text-fg disabled:opacity-30 transition-colors"
                >
                  <ArrowLeft className="size-3.5" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={mod.idx === total - 1}
                  className={`inline-flex items-center gap-1.5 rounded-full ${TONE.bgSoft} ring-1 ${TONE.ring} px-3 py-1.5 text-xs font-bold ${TONE.text} hover:opacity-90 disabled:opacity-30 transition-opacity`}
                >
                  Next module <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  TRACK VIEW — vertical timeline                               */
/* ============================================================ */
function TrackView({
  modules,
  total,
  active,
  setActive,
  duration,
}: {
  modules: (CurriculumModule & { idx: number })[];
  total: number;
  active: number;
  setActive: (i: number) => void;
  duration?: string;
}) {
  // Track which modules are expanded (default first one open)
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([0]));
  const toggleExpand = (idx: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  if (modules.length === 0) return <EmptyState />;

  return (
    <div className="relative">
      {/* Animated rail */}
      <span
        aria-hidden
        className="absolute left-6 top-2 bottom-2 w-px bg-line lg:left-8"
      />
      <motion.span
        aria-hidden
        className="absolute left-6 top-2 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent lg:left-8"
        initial={{ height: "0%" }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <ol className="relative space-y-4">
        {modules.map((mod) => {
          const isExpanded = expanded.has(mod.idx);
          const isActive = active === mod.idx;
          return (
            <Reveal as="li" y={12} delay={0.04} duration={0.4} margin="-10%"
              key={mod.idx}
              className="relative pl-14 lg:pl-20"
              onMouseEnter={() => setActive(mod.idx)}
            >
              {/* Station marker */}
              <button
                type="button"
                onClick={() => {
                  setActive(mod.idx);
                  toggleExpand(mod.idx);
                }}
                aria-label={`Toggle module ${mod.idx + 1}`}
                className={`absolute left-2 lg:left-4 top-2 grid size-9 place-items-center rounded-full bg-bg ring-2 transition-all z-10 ${
                  isActive
                    ? `${TONE.ring} ${TONE.bgSoft} ${TONE.text} ${TONE.glow}`
                    : "ring-line text-fg-muted hover:ring-white/30"
                }`}
              >
                <span className="font-mono text-[11px] font-bold">
                  {String(mod.idx + 1).padStart(2, "0")}
                </span>
              </button>

              <div
                className={`rounded-2xl bg-bg-2/60 ring-1 transition-all ${
                  isActive
                    ? `${TONE.ring} ${TONE.glow}`
                    : "ring-line"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(mod.idx)}
                  className="w-full flex items-start gap-3 p-5 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-mono text-[10px] uppercase tracking-wider font-bold ${TONE.text}`}>
                        Module {String(mod.idx + 1).padStart(2, "0")}
                      </span>
                      {mod.durationHours && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-fg-faint">
                          <Clock className="size-3" /> {mod.durationHours}h
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-fg-faint">
                        · {mod.topics.length} topics
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold text-fg leading-tight">
                      {mod.module}
                    </h3>
                  </div>
                  <ArrowRight
                    className={`size-4 text-fg-faint transition-transform mt-2 shrink-0 ${
                      isExpanded ? "rotate-90 text-neon-cyan" : ""
                    }`}
                  />
                </button>
                {/* Always rendered, collapsed with CSS grid-rows rather than
                    unmounted. The old AnimatePresence mounted topics only when
                    a module was expanded (default: the first one), so the rest
                    of every syllabus was absent from the server HTML. The
                    0fr/1fr grid trick keeps the height animation while leaving
                    all topics in the DOM for crawlers and for in-page search. */}
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isExpanded
                      ? "grid-rows-[1fr] border-t border-line/60"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="p-5 pt-4">
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {mod.topics.map((t) => (
                          <li
                            key={t}
                            className="flex gap-2 text-sm text-fg-muted leading-snug"
                          >
                            <span
                              className={`mt-1.5 size-1 shrink-0 rounded-full ${TONE.bg}`}
                            />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>

      {/* End cap */}
      <div className="relative mt-6 ml-2 lg:ml-4">
        <div
          className={`inline-flex items-center gap-2 rounded-full bg-bg-2 ring-1 ring-line px-4 py-2`}
        >
          <CheckCircle2 className={`size-4 ${TONE.text}`} />
          <span className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${TONE.text}`}>
            {total} modules · {duration ?? "course complete"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Empty state                                                  */
/* ============================================================ */
function EmptyState() {
  return (
    <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line p-10 text-center">
      <div className="font-display text-base font-bold text-fg">No matches</div>
      <p className="mt-2 text-sm text-fg-muted">
        Try a different search term — the curriculum has plenty more.
      </p>
    </div>
  );
}
