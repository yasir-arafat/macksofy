"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Menu,
  Phone,
  X,
  ChevronDown,
  Building2,
  Trophy,
  Users,
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Calendar,
  CornerDownLeft,
  BookOpenText,
  Library,
  Newspaper,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import {
  AUDITS,
  AUDIT_CATEGORIES,
  auditsByCategory,
  type Audit,
  type AuditCategory,
} from "@/content/audits";

/* ──────────────────────────────────────────────────────────────
   Nav model
   ────────────────────────────────────────────────────────────── */
type DropdownItem = {
  label: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavItem = {
  label: string;
  href: string;
  mega?: "services" | "training" | "audit";
  dropdown?: DropdownItem[];
};

const ABOUT_DROPDOWN: DropdownItem[] = [
  {
    label: "About Us",
    href: "/about",
    description: "Founded 2014 · Mumbai HQ · India + UAE delivery",
    icon: Building2,
  },
  {
    label: "Our Clients",
    href: "/clients",
    description: "250+ enterprises trust Macksofy",
    icon: Users,
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Anonymised long-form engagement stories",
    icon: BookOpenText,
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Whitepapers, checklists, cheat sheets, brochures",
    icon: Library,
  },
  {
    label: "Awards & Recognition",
    href: "/awards",
    description: "CSI 2025 · Google VRP · EC-Council CEI",
    icon: Trophy,
  },
  {
    label: "Press & Media",
    href: "/press",
    description: "Mid-day · ABP · CNN News 18 · Entrepreneur features",
    icon: Newspaper,
  },
];

// Logo serves as Home — we drop the "Home" item to free up nav width.
const NAV: NavItem[] = [
  { label: "Security Assessment", href: "/services", mega: "services" },
  { label: "Training", href: "/training", mega: "training" },
  { label: "Security Compliance", href: "/audit", mega: "audit" },
  { label: "About", href: "/about", dropdown: ABOUT_DROPDOWN },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ──────────────────────────────────────────────────────────────
   Header
   ────────────────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [annDismissed, setAnnDismissed] = useState(false);
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number; show: boolean }>({
    left: 0,
    width: 0,
    show: false,
  });
  const [menuLeft, setMenuLeft] = useState(0);

  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const openItemMenu = (href: string) => {
    cancelClose();
    setOpenMenu(href);
  };

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(false);
  };

  // Track header height as a CSS variable so <main> can offset correctly
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [annDismissed]);

  // Restore announcement dismissal — runs once after mount, hydration-safe.
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnnDismissed(sessionStorage.getItem("mks_ann_2025") === "1");
    }
  }, []);

  // Backdrop blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd+K to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((s) => !s);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sliding indicator pill — only when an item is actively hovered/focused
  useEffect(() => {
    if (!hovered || !navRef.current) {
      setPill((p) => ({ ...p, show: false }));
      return;
    }
    const el = itemRefs.current.get(hovered);
    if (!el) {
      setPill((p) => ({ ...p, show: false }));
      return;
    }
    const itemRect = el.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setPill({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      show: true,
    });
  }, [hovered]);

  // Position the centralized dropdown panel under the active item, clamped
  // so a wide panel (e.g. Audit's 1180 px grid) can't slip off the viewport.
  useEffect(() => {
    if (!openMenu || !headerRef.current) return;
    const el = itemRefs.current.get(openMenu);
    if (!el) return;
    const update = () => {
      const headerRect = headerRef.current!.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      const center = itemRect.left + itemRect.width / 2 - headerRect.left;

      // Estimate panel width by menu type (must stay under 94vw).
      const navItem = NAV.find((n) => n.href === openMenu);
      const isAudit = navItem?.mega === "audit";
      const isServices = navItem?.mega === "services";
      const isMega = !!navItem?.mega;
      const designedWidth = isAudit || isServices ? 1180 : isMega ? 860 : 320;
      const cappedWidth = Math.min(designedWidth, headerRect.width * 0.94);
      const halfWidth = cappedWidth / 2;
      const padding = 12;

      const minLeft = halfWidth + padding;
      const maxLeft = headerRect.width - halfWidth - padding;
      const clamped = Math.max(minLeft, Math.min(center, maxLeft));

      setMenuLeft(clamped);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [openMenu]);

  // Cleanup hover-close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const dismissAnnouncement = () => {
    setAnnDismissed(true);
    if (typeof window !== "undefined")
      sessionStorage.setItem("mks_ann_2025", "1");
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-bg/85 backdrop-blur-xl border-b border-line shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-bg/40 backdrop-blur-md"
      )}
    >
      {/* ANNOUNCEMENT BAR */}
      <AnimatePresence>
        {!annDismissed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative isolate overflow-hidden border-b border-line"
          >
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,229,255,0.10), rgba(168,85,247,0.10), rgba(252,211,77,0.10), rgba(0,229,255,0.10))",
                backgroundSize: "300% 100%",
              }}
              aria-hidden
            />
            <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8 py-2 text-xs">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-300" />
              </span>
              <Link
                href="/awards"
                onClick={closeAll}
                className="flex items-center gap-2 min-w-0 flex-1 text-fg/90 hover:text-neon-cyan transition-colors"
              >
                <span className="font-mono uppercase tracking-[0.18em] text-amber-300/90 hidden sm:inline shrink-0">
                  CSI 2025
                </span>
                <span className="text-fg-muted truncate">
                  <span className="hidden md:inline">Recognized at the </span>
                  CSI Cyber Security Awards 2025 — Women in Cyber + Outstanding Training
                </span>
                <ArrowRight className="size-3 shrink-0 text-neon-cyan" />
              </Link>
              <button
                onClick={dismissAnnouncement}
                aria-label="Dismiss announcement"
                className="grid size-6 place-items-center rounded text-fg-muted hover:text-fg hover:bg-white/5 shrink-0"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center gap-4 lg:gap-6 xl:gap-8">
        {/* LOGO */}
        <Link
          href="/"
          onClick={closeAll}
          className="group relative flex items-center shrink-0 mr-1"
          aria-label="Macksofy Technologies — Home"
        >
          <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/30 to-neon-purple/0 opacity-0 blur-xl group-hover:opacity-100 transition-opacity" />
          <Image
            src="/logo.png"
            alt="Macksofy Technologies"
            width={140}
            height={40}
            priority
            className="relative h-8 lg:h-9 w-auto transition-transform group-hover:scale-105"
          />
        </Link>

        {/* DESKTOP NAV — centered, takes remaining space, FULL bar height */}
        <nav
          ref={navRef}
          onMouseLeave={() => setHovered(null)}
          className="relative hidden lg:flex items-stretch justify-center flex-1 min-w-0 mx-auto h-full"
        >
          {/* Sliding indicator pill — sits behind text via z-0 */}
          <AnimatePresence>
            {pill.show && (
              <motion.div
                aria-hidden
                initial={false}
                animate={{ left: pill.left, width: pill.width, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.6,
                }}
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-white/[0.07] ring-1 ring-white/10 z-0"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex items-stretch h-full">
            {NAV.map((item) => {
              const hasMenu = !!item.mega || !!item.dropdown;
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href)) ||
                (!!item.dropdown &&
                  item.dropdown.some(
                    (d) => pathname === d.href || pathname.startsWith(d.href)
                  ));

              return (
                <div
                  key={item.href}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => {
                    if (hasMenu) openItemMenu(item.href);
                    else cancelClose();
                    setHovered(item.href);
                  }}
                  onMouseLeave={() => {
                    if (hasMenu) scheduleClose();
                  }}
                >
                  <Link
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.href, el);
                      else itemRefs.current.delete(item.href);
                    }}
                    href={item.href}
                    onClick={closeAll}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "relative flex items-center gap-1 px-2 xl:px-3 h-9 text-[13px] font-semibold rounded-full transition-colors whitespace-nowrap",
                      active ? "text-neon-cyan" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform duration-300",
                          openMenu === item.href && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                </div>
              );
            })}
          </div>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-1.5 xl:gap-2 shrink-0 ml-auto">
          {/* Search trigger — icon-only (lg) → pill (xl+) */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search (Cmd+K)"
            className="hidden lg:inline-flex xl:hidden grid size-9 place-items-center rounded-full border border-line bg-bg/40 backdrop-blur text-fg-muted hover:text-fg hover:border-neon-cyan/40 transition-colors"
          >
            <Search className="size-4" />
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search (Cmd+K)"
            className="hidden xl:inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 backdrop-blur px-3 h-9 text-xs text-fg-muted hover:text-fg hover:border-neon-cyan/40 transition-colors"
          >
            <Search className="size-3.5" />
            <span>Search</span>
            <kbd className="ml-1 inline-flex items-center gap-0.5 rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-fg-faint">
              <Command className="size-2.5" />K
            </kbd>
          </button>

          {/* Phone — hidden by default; new long nav labels left no room.
              Re-enable at an ultrawide breakpoint if/when you widen max-w-7xl. */}
          <a
            href={`tel:${SITE.phone}`}
            className="hidden items-center gap-2 rounded-full px-3 h-9 text-sm font-semibold text-fg-muted hover:text-neon-cyan transition-colors"
            aria-label={`Call ${SITE.phoneDisplay}`}
          >
            <Phone className="size-4" /> {SITE.phoneDisplay}
          </a>

          {/* Premium CTA */}
          <Link
            href="/contact"
            onClick={closeAll}
            className="btn-shine relative hidden md:inline-flex items-center gap-1.5 xl:gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-3 xl:px-5 h-9 text-[13px] font-bold text-white whitespace-nowrap shadow-[0_0_24px_rgba(0,229,255,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.5)] transition-shadow"
          >
            Book Consultation
            <ArrowRight className="size-3.5" />
          </Link>

          {/* Mobile trigger — only below lg */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden grid size-10 place-items-center rounded-lg text-fg hover:bg-white/5"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* SCROLL PROGRESS — gradient bar at bottom of header */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="origin-left h-px bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"
      />

      {/* CENTRALIZED DROPDOWN PANEL — sits below the entire header (announcement + main bar) */}
      <AnimatePresence>
        {openMenu &&
          (() => {
            const item = NAV.find((n) => n.href === openMenu);
            if (!item || (!item.mega && !item.dropdown)) return null;
            const isMega = !!item.mega;
            return (
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                  mass: 0.55,
                }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                style={{ left: `${menuLeft}px` }}
                className="absolute top-full mt-2 -translate-x-1/2 z-50"
              >
                {/* Hover bridge: invisible padding above the panel covers the gap */}
                <div className="pt-2">
                  {isMega ? (
                    <div className="menu-surface p-6">
                      <MegaMenu type={item.mega!} onClose={closeAll} />
                    </div>
                  ) : (
                    <div className="menu-surface w-80 p-2.5">
                      <ul className="grid gap-1">
                        {item.dropdown!.map((d, di) => {
                          const subActive =
                            pathname === d.href ||
                            (d.href !== "/" && pathname.startsWith(d.href));
                          return (
                            <motion.li
                              key={d.href}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.04 + di * 0.05 }}
                            >
                              <Link
                                href={d.href}
                                onClick={closeAll}
                                className={cn(
                                  "group relative flex items-start gap-3 rounded-xl px-3 py-3 transition-all overflow-hidden",
                                  subActive
                                    ? "bg-white/[0.06]"
                                    : "hover:bg-white/[0.06]"
                                )}
                              >
                                <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div
                                  className={cn(
                                    "grid size-10 place-items-center rounded-lg ring-1 transition-all shrink-0",
                                    subActive
                                      ? "bg-neon-cyan/15 ring-neon-cyan/40 text-neon-cyan"
                                      : "bg-bg-2 ring-line text-fg-muted group-hover:text-neon-cyan group-hover:ring-neon-cyan/40 group-hover:bg-neon-cyan/10 group-hover:rotate-[-4deg] group-hover:scale-110"
                                  )}
                                >
                                  <d.icon className="size-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div
                                    className={cn(
                                      "text-sm font-bold transition-colors",
                                      subActive
                                        ? "text-neon-cyan"
                                        : "text-fg group-hover:text-neon-cyan"
                                    )}
                                  >
                                    {d.label}
                                  </div>
                                  <div className="text-[11.5px] text-fg-dim leading-snug mt-0.5">
                                    {d.description}
                                  </div>
                                </div>
                                <ArrowRight className="size-3.5 text-fg-faint group-hover:text-neon-cyan opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all mt-3" />
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-50 bg-bg lg:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-neon-cyan/20 blur-[120px] pointer-events-none" />

            <div className="relative flex items-center justify-between px-5 h-16 border-b border-line">
              <Link
                href="/"
                onClick={closeAll}
                className="font-display font-bold text-lg text-fg"
              >
                Macksofy
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid size-10 place-items-center rounded-lg hover:bg-white/5 text-fg"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="relative flex flex-col p-5 gap-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-semibold text-fg hover:bg-white/5"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-4 text-fg-faint" />
                  </Link>
                  {item.dropdown && (
                    <ul className="mt-1 ml-4 mb-2 grid gap-1 border-l border-line pl-4">
                      {item.dropdown
                        .filter((d) => d.href !== item.href)
                        .map((d) => (
                          <li key={d.href}>
                            <Link
                              href={d.href}
                              onClick={closeAll}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-fg-muted hover:text-neon-cyan hover:bg-white/5"
                            >
                              <d.icon className="size-4" />
                              {d.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 grid gap-3"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line h-12 px-5 text-sm font-semibold text-fg-muted hover:text-fg hover:border-neon-cyan/40 transition-colors"
                >
                  <Search className="size-4" /> Search…
                </button>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neon-cyan h-12 px-5 text-sm font-bold text-neon-cyan hover:bg-neon-cyan hover:text-bg transition-colors"
                >
                  <Phone className="size-4" /> Call {SITE.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple h-12 px-5 text-sm font-bold text-white"
                >
                  Book Consultation <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cmd+K SEARCH PALETTE */}
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────
   COMMAND PALETTE — Cmd/Ctrl+K
   ────────────────────────────────────────────────────────────── */
function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  type Entry = {
    label: string;
    href: string;
    group: string;
    keywords?: string;
  };
  const ENTRIES: Entry[] = [
    { label: "Home", href: "/", group: "Pages" },
    { label: "About Us", href: "/about", group: "Pages" },
    { label: "Our Clients", href: "/clients", group: "Pages" },
    {
      label: "Case Studies",
      href: "/case-studies",
      group: "Pages",
      keywords: "engagements references pentest red team dfir",
    },
    {
      label: "Resources",
      href: "/resources",
      group: "Pages",
      keywords: "whitepaper checklist cheat sheet brochure cscrf rbi cert-in",
    },
    {
      label: "Awards & Recognition",
      href: "/awards",
      group: "Pages",
      keywords: "csi google ec-council",
    },
    { label: "Blog", href: "/blog", group: "Pages" },
    { label: "Contact", href: "/contact", group: "Pages" },
    { label: "All Services", href: "/services", group: "Services" },
    { label: "All Training", href: "/training", group: "Training" },
    { label: "All Audit & Compliance", href: "/audit", group: "Audit" },
    ...SERVICES.map((s) => ({
      label: s.shortTitle,
      href: `/services/${s.slug}`,
      group: "Services",
      keywords: s.title,
    })),
    ...COURSES.map((c) => ({
      label: c.shortTitle,
      href: `/training/${c.slug}`,
      group: "Training",
      keywords: `${c.title} ${c.code} ${c.vendor}`,
    })),
    ...AUDITS.map((a) => ({
      label: a.shortTitle,
      href: `/audit/${a.slug}`,
      group: "Audit",
      keywords: a.title,
    })),
  ];

  const filtered = query
    ? ENTRIES.filter((e) =>
        `${e.label} ${e.keywords ?? ""} ${e.group}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : ENTRIES;

  const grouped: Record<string, Entry[]> = {};
  filtered.forEach((e) => {
    grouped[e.group] = grouped[e.group] ? [...grouped[e.group], e] : [e];
  });

  // Reset palette query when the dialog closes (next mount starts blank).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-[10%] z-50 w-[92vw] max-w-2xl -translate-x-1/2 rounded-2xl glass-strong shadow-2xl overflow-hidden glow-blend"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 h-14">
              <Search className="size-4 text-fg-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, training, audits…"
                className="flex-1 bg-transparent text-fg placeholder:text-fg-faint focus:outline-none text-sm"
              />
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded px-1.5 py-0.5 font-mono text-[10px] text-fg-muted hover:text-fg hover:bg-white/5"
              >
                ESC
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {Object.keys(grouped).length === 0 && (
                <div className="px-3 py-12 text-center text-sm text-fg-muted">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
              {Object.entries(grouped).map(([group, entries]) => (
                <div key={group} className="py-2">
                  <div className="px-3 mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                    {group}
                  </div>
                  <ul className="grid gap-0.5">
                    {entries.slice(0, 8).map((e) => (
                      <li key={e.href}>
                        <Link
                          href={e.href}
                          onClick={onClose}
                          className="group flex items-center justify-between px-3 py-2 rounded-lg text-sm text-fg-muted hover:bg-white/5 hover:text-neon-cyan"
                        >
                          <span>{e.label}</span>
                          <CornerDownLeft className="size-3 text-fg-faint opacity-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-line bg-bg-1/60 px-4 py-2.5 flex items-center justify-between text-[10px] font-mono text-fg-faint">
              <span>
                <kbd className="rounded bg-white/5 px-1.5 py-0.5">↑↓</kbd> Navigate ·{" "}
                <kbd className="rounded bg-white/5 px-1.5 py-0.5">↵</kbd> Open
              </span>
              <span>
                <kbd className="rounded bg-white/5 px-1.5 py-0.5">⌘ K</kbd> Toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────
   MEGA MENU — interactive 3-pane (items · live preview · footer)
   ────────────────────────────────────────────────────────────── */

interface MegaItem {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  badge?: string;
  badgeTone?: "cyan" | "purple" | "amber" | "green";
  icon: React.ComponentType<{ className?: string }>;
  bullets?: string[];
  group?: string;
}

function buildMegaItems(type: "services" | "training" | "audit"): MegaItem[] {
  if (type === "services") {
    return SERVICES.map((s) => ({
      slug: s.slug,
      href: `/services/${s.slug}`,
      title: s.shortTitle,
      tagline: s.hero.tagline,
      badge: s.popular ? "Popular" : undefined,
      badgeTone: s.popular ? "cyan" : undefined,
      icon: s.icon,
      bullets: s.businessImpact?.slice(0, 3),
      group: s.category,
    }));
  }
  if (type === "training") {
    return COURSES.filter((c) => c.popular)
      .slice(0, 8)
      .map((c) => ({
        slug: c.slug,
        href: `/training/${c.slug}`,
        title: c.shortTitle,
        tagline: c.hero.tagline,
        badge: c.vendor,
        badgeTone:
          c.vendor === "OffSec"
            ? "purple"
            : c.vendor === "EC-Council"
            ? "cyan"
            : c.vendor === "CompTIA"
            ? "amber"
            : "green",
        icon: GraduationCapIcon,
        bullets: c.outcomes?.slice(0, 3),
      }));
  }
  return AUDITS.map((a) => ({
    slug: a.slug,
    href: `/audit/${a.slug}`,
    title: a.shortTitle,
    tagline: a.hero.tagline,
    badge: a.authority ? "Authority" : undefined,
    badgeTone: a.authority ? "amber" : undefined,
    icon: a.icon,
    bullets: a.applicability?.slice(0, 3),
  }));
}

const MEGA_HEADER = {
  services: {
    eyebrow: "Security Assessment",
    title: "From assumed-breach pentests to red teams",
    description:
      "Manual exploitation, OSCP/OSWE/OSEP-led teams, CERT-In format reports.",
    cta: { label: "View all assessments", href: "/services" },
    stat: { value: "200+", label: "Engagements / yr" },
  },
  training: {
    eyebrow: "Training & Certifications",
    title: "Career-grade tracks with mentor support",
    description:
      "EC-Council Accredited Training Center. 20,000+ professionals trained.",
    cta: { label: "View all 22 courses", href: "/training" },
    stat: { value: "22", label: "Active courses" },
  },
  audit: {
    eyebrow: "Security Compliance",
    title: "CERT-In empanelled, regulator-ready",
    description:
      "RBI · SEBI · UIDAI · ISO 27001 · SOC 2 · PCI-DSS · UAE NESA / DESC.",
    cta: { label: "View all frameworks", href: "/audit" },
    stat: { value: "11+", label: "Years auditing" },
  },
} as const;

function MegaMenu({
  type,
  onClose,
}: {
  type: "services" | "training" | "audit";
  onClose: () => void;
}) {
  const header = MEGA_HEADER[type];

  // Audit gets a dedicated wide grid layout — 21 items grouped by category,
  // all clickable, no preview pane.
  if (type === "audit") {
    return <AuditMegaGrid header={header} onClose={onClose} />;
  }

  return <ListPreviewMegaMenu type={type} onClose={onClose} header={header} />;
}

function ListPreviewMegaMenu({
  type,
  onClose,
  header,
}: {
  type: "services" | "training";
  onClose: () => void;
  header: (typeof MEGA_HEADER)[keyof typeof MEGA_HEADER];
}) {
  const items = buildMegaItems(type);
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");
  const active = items.find((i) => i.slug === activeSlug) ?? items[0];

  const hasGroups = items.some((it) => !!it.group);
  const wide = type === "services" && hasGroups;

  const groupOrder: string[] = [];
  const groupMap = new Map<string, MegaItem[]>();
  for (const it of items) {
    const g = it.group ?? "Other";
    if (!groupMap.has(g)) {
      groupMap.set(g, []);
      groupOrder.push(g);
    }
    groupMap.get(g)!.push(it);
  }
  const groupTone: Record<string, { dot: string; text: string }> = {
    Offensive: { dot: "bg-red-400", text: "text-red-300" },
    Defensive: { dot: "bg-emerald-400", text: "text-emerald-300" },
    "Compliance Adjacent": { dot: "bg-amber-400", text: "text-amber-300" },
  };
  const groupCol: Record<string, string> = {
    Offensive: "col-span-12 sm:col-span-6 lg:col-span-4",
    Defensive: "col-span-12 sm:col-span-6 lg:col-span-3",
    "Compliance Adjacent": "col-span-12 sm:col-span-6 lg:col-span-3",
  };

  const preview = (
    <AnimatePresence mode="wait">
      <motion.div
        key={active?.slug ?? "empty"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full rounded-xl bg-gradient-to-br from-neon-cyan/[0.05] to-neon-purple/[0.05] ring-1 ring-white/[0.08] p-5 flex flex-col"
      >
        {active && (
          <>
            <div className="flex items-start gap-3">
              <div className="grid size-12 place-items-center rounded-xl bg-bg ring-1 ring-neon-cyan/40 text-neon-cyan shadow-[0_0_24px_rgba(0,229,255,0.25)]">
                <active.icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                {active.badge && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full ring-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      badgeClass(active.badgeTone)
                    )}
                  >
                    {active.badge}
                  </span>
                )}
                <div className="mt-1 font-display text-base font-bold text-fg leading-tight">
                  {active.title}
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-fg-muted leading-relaxed">
              {active.tagline}
            </p>
            {active.bullets && active.bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {active.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                    className="flex gap-2 text-[11.5px] text-fg-dim leading-snug"
                  >
                    <span className="mt-1 size-1 shrink-0 rounded-full bg-neon-cyan" />
                    <span className="line-clamp-2">{b}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            <Link
              href={active.href}
              onClick={onClose}
              className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-neon-cyan hover:gap-2.5 transition-all"
            >
              Open page <ArrowRight className="size-3.5" />
            </Link>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );

  let runningIndex = 0;

  return (
    <div
      className={cn(
        wide
          ? "w-[1180px] max-w-[min(1180px,94vw)]"
          : "w-[860px] max-w-[90vw]"
      )}
    >
      {/* HEADER STRIP */}
      <div className="flex items-end justify-between gap-6 mb-4 pb-4 border-b border-white/10">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
            <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
            {header.eyebrow}
          </div>
          <div className="mt-2 font-display text-lg font-bold text-fg leading-tight">
            {header.title}
          </div>
          <div className="mt-1 text-xs text-fg-dim">
            {header.description}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl font-black gradient-text leading-none">
            {header.stat.value}
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-faint">
            {header.stat.label}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-12 gap-5">
        {wide ? (
          <>
            {groupOrder.map((g) => {
              const groupItems = groupMap.get(g)!;
              const tone = groupTone[g] ?? {
                dot: "bg-neon-cyan",
                text: "text-neon-cyan",
              };
              const colCls = groupCol[g] ?? "col-span-12 sm:col-span-6 lg:col-span-3";
              return (
                <div key={g} className={colCls}>
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] font-bold mb-2",
                      tone.text
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full animate-pulse",
                        tone.dot
                      )}
                    />
                    {g}
                    <span className="text-fg-faint font-mono">
                      · {groupItems.length}
                    </span>
                  </div>
                  <ul className="grid gap-1">
                    {groupItems.map((it) => {
                      const idx = runningIndex++;
                      return (
                        <MegaItemRow
                          key={it.slug}
                          item={it}
                          index={idx}
                          active={it.slug === activeSlug}
                          onHover={() => setActiveSlug(it.slug)}
                          onClose={onClose}
                        />
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <div className="col-span-12 lg:col-span-5">{preview}</div>
          </>
        ) : (
          <>
            <div className="col-span-7">
              <ul className="grid gap-1">
                {items.map((it, i) => (
                  <MegaItemRow
                    key={it.slug}
                    item={it}
                    index={i}
                    active={it.slug === activeSlug}
                    onHover={() => setActiveSlug(it.slug)}
                    onClose={onClose}
                  />
                ))}
              </ul>
            </div>
            <div className="col-span-5">{preview}</div>
          </>
        )}
      </div>

      {/* FOOTER STRIP */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] text-fg-faint">
          <Sparkles className="size-3.5 text-neon-cyan" />
          <span>
            {type === "services" && "All engagements include free 30-day retest."}
            {type === "training" && "Mentor support until you pass — no extra fee."}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full px-3 h-8 text-xs font-semibold text-fg-muted hover:text-neon-cyan hover:bg-white/5 transition-colors"
          >
            <Calendar className="size-3.5" /> Book consult
          </Link>
          <Link
            href={header.cta.href}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-3.5 h-8 text-xs font-bold text-white shadow-[0_0_18px_rgba(0,229,255,0.35)] hover:shadow-[0_0_28px_rgba(168,85,247,0.5)] transition-shadow"
          >
            {header.cta.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   AUDIT MEGA GRID — 4-column grouped layout, all items clickable
   ────────────────────────────────────────────────────────────── */

const CATEGORY_TONE: Record<
  AuditCategory,
  { dot: string; text: string; ring: string }
> = {
  Foundational: {
    dot: "bg-neon-cyan",
    text: "text-neon-cyan",
    ring: "ring-neon-cyan/30",
  },
  "Indian Regulatory": {
    dot: "bg-amber-300",
    text: "text-amber-300",
    ring: "ring-amber-300/30",
  },
  "International Standard": {
    dot: "bg-neon-purple",
    text: "text-neon-purple",
    ring: "ring-neon-purple/30",
  },
  "Industry & Privacy": {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    ring: "ring-emerald-400/30",
  },
  "GCC Regulatory": {
    dot: "bg-neon-cyan",
    text: "text-neon-cyan",
    ring: "ring-neon-cyan/30",
  },
};

function AuditMegaGrid({
  header,
  onClose,
}: {
  header: (typeof MEGA_HEADER)[keyof typeof MEGA_HEADER];
  onClose: () => void;
}) {
  return (
    <div className="w-[1180px] max-w-[min(1180px,94vw)]">
      {/* HEADER STRIP */}
      <div className="flex items-end justify-between gap-6 mb-5 pb-4 border-b border-white/10">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
            <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
            {header.eyebrow}
          </div>
          <div className="mt-2 font-display text-lg font-bold text-fg leading-tight">
            {header.title}
          </div>
          <div className="mt-1 text-xs text-fg-dim">{header.description}</div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl font-black gradient-text leading-none">
            {AUDITS.length}
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-faint">
            Compliance frameworks
          </div>
        </div>
      </div>

      {/* 4-COLUMN CATEGORY GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {AUDIT_CATEGORIES.map((cat, ci) => {
          const items = auditsByCategory(cat);
          if (items.length === 0) return null;
          const tone = CATEGORY_TONE[cat];
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 + ci * 0.05, duration: 0.25 }}
              className="flex flex-col"
            >
              {/* Category header */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] font-bold mb-2",
                  tone.text
                )}
              >
                <span
                  className={cn("size-1.5 rounded-full animate-pulse", tone.dot)}
                />
                {cat}
                <span className="text-fg-faint font-mono">
                  · {items.length}
                </span>
              </div>

              {/* Items */}
              <ul className="grid gap-1">
                {items.map((a, ai) => (
                  <AuditMegaItem
                    key={a.slug}
                    audit={a}
                    tone={tone}
                    index={ci * 7 + ai}
                    onClose={onClose}
                  />
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER STRIP */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] text-fg-faint">
          <Sparkles className="size-3.5 text-neon-cyan" />
          <span>
            Reports formatted for regulator submission · CERT-In empanelled ·
            free 30-day retest
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full px-3 h-8 text-xs font-semibold text-fg-muted hover:text-neon-cyan hover:bg-white/5 transition-colors"
          >
            <Calendar className="size-3.5" /> Book consult
          </Link>
          <Link
            href={header.cta.href}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-3.5 h-8 text-xs font-bold text-white shadow-[0_0_18px_rgba(0,229,255,0.35)] hover:shadow-[0_0_28px_rgba(168,85,247,0.5)] transition-shadow"
          >
            {header.cta.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function AuditMegaItem({
  audit,
  tone,
  index,
  onClose,
}: {
  audit: Audit;
  tone: { dot: string; text: string; ring: string };
  index: number;
  onClose: () => void;
}) {
  const Icon = audit.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.012, duration: 0.2 }}
    >
      <Link
        href={`/audit/${audit.slug}`}
        onClick={onClose}
        className="group relative flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-all overflow-hidden"
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-y-1 left-0 w-0.5 rounded-r-full bg-gradient-to-b from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity"
          )}
        />
        <div
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg bg-bg-2 ring-1 transition-all",
            tone.ring,
            tone.text,
            "group-hover:ring-neon-cyan/40 group-hover:bg-neon-cyan/10 group-hover:scale-110"
          )}
        >
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <div className="text-[12.5px] font-bold text-fg group-hover:text-neon-cyan transition-colors truncate leading-tight">
              {audit.shortTitle}
            </div>
            {audit.authority && (
              <span className="inline-flex items-center rounded-full bg-amber-500/15 ring-1 ring-amber-500/40 px-1.5 text-[8px] font-bold uppercase tracking-wider text-amber-300 leading-tight">
                Auth
              </span>
            )}
          </div>
          <div className="mt-0.5 text-[10.5px] text-fg-dim leading-snug line-clamp-2">
            {audit.hero.tagline}
          </div>
        </div>
        <ArrowRight className="size-3 shrink-0 text-fg-faint opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neon-cyan transition-all mt-2" />
      </Link>
    </motion.li>
  );
}

function MegaItemRow({
  item,
  index,
  active,
  onHover,
  onClose,
}: {
  item: MegaItem;
  index: number;
  active: boolean;
  onHover: () => void;
  onClose: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 + index * 0.025, duration: 0.2 }}
    >
      <Link
        href={item.href}
        onClick={onClose}
        onMouseEnter={onHover}
        onFocus={onHover}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all overflow-hidden",
          active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-y-1 left-0 w-0.5 rounded-r-full bg-gradient-to-b from-neon-cyan to-neon-purple transition-opacity",
            active ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "grid size-9 place-items-center rounded-lg ring-1 transition-all shrink-0",
            active
              ? "bg-neon-cyan/15 ring-neon-cyan/40 text-neon-cyan"
              : "bg-bg-2 ring-line text-fg-muted group-hover:text-neon-cyan group-hover:ring-neon-cyan/30"
          )}
        >
          <item.icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "text-[13px] font-semibold transition-colors truncate",
                active ? "text-neon-cyan" : "text-fg group-hover:text-neon-cyan"
              )}
            >
              {item.title}
            </div>
            {item.badge && (
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full ring-1 px-1.5 text-[9px] font-bold uppercase tracking-wider",
                  badgeClass(item.badgeTone)
                )}
              >
                {item.badge}
              </span>
            )}
          </div>
          <div className="text-[11px] text-fg-dim leading-snug truncate">
            {item.tagline}
          </div>
        </div>
        <ArrowRight
          className={cn(
            "size-3.5 shrink-0 transition-all",
            active
              ? "opacity-100 translate-x-0 text-neon-cyan"
              : "opacity-0 -translate-x-2 text-fg-faint group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neon-cyan"
          )}
        />
      </Link>
    </motion.li>
  );
}

function badgeClass(tone?: "cyan" | "purple" | "amber" | "green") {
  switch (tone) {
    case "purple":
      return "bg-neon-purple/15 ring-neon-purple/40 text-neon-purple";
    case "amber":
      return "bg-amber-500/15 ring-amber-500/40 text-amber-300";
    case "green":
      return "bg-emerald-500/15 ring-emerald-500/40 text-emerald-300";
    case "cyan":
    default:
      return "bg-neon-cyan/15 ring-neon-cyan/40 text-neon-cyan";
  }
}

// Lucide v1 doesn't always ship GraduationCap; use a tiny inline fallback
function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 1.5 9 1.5 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}
