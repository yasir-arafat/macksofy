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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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
    setMobileExpanded(null);
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
      const isTraining = navItem?.mega === "training";
      const isMega = !!navItem?.mega;
      const designedWidth =
        isAudit || isServices || isTraining ? 1380 : isMega ? 860 : 320;
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

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close drawer + dropdowns when the route changes (handles in-app navigation)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  // Close drawer when viewport grows past the lg breakpoint
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mql.matches) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
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
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-lg text-fg hover:bg-white/5 active:bg-white/10 cursor-pointer select-none"
          >
            <Menu className="size-6 pointer-events-none" aria-hidden="true" />
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
                    <div className="menu-surface p-6 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain">
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
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{ height: "100dvh" }}
            className="fixed inset-0 z-50 bg-bg lg:hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-neon-cyan/20 blur-[120px] pointer-events-none" />

            <div className="relative flex items-center justify-between px-5 h-16 border-b border-line shrink-0">
              <Link
                href="/"
                onClick={closeAll}
                className="font-display font-bold text-lg text-fg"
              >
                Macksofy
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                className="inline-flex items-center justify-center size-10 rounded-lg hover:bg-white/5 active:bg-white/10 text-fg cursor-pointer select-none"
              >
                <X className="size-6 pointer-events-none" aria-hidden="true" />
              </button>
            </div>
            <nav className="relative flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-6">
              <ul className="grid gap-1">
                {NAV.map((item, i) => {
                  const hasMobileMenu = !!item.mega || !!item.dropdown;
                  const expanded = mobileExpanded === item.href;
                  const active =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.03 }}
                    >
                      {hasMobileMenu ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpanded(expanded ? null : item.href)
                            }
                            aria-expanded={expanded}
                            aria-controls={`mobile-panel-${item.href}`}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors",
                              expanded || active
                                ? "bg-white/5 text-fg"
                                : "text-fg hover:bg-white/5"
                            )}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                "size-4 text-fg-muted transition-transform duration-200",
                                expanded && "rotate-180 text-neon-cyan"
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                key="panel"
                                id={`mobile-panel-${item.href}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pt-1 pb-2 pl-3">
                                  <Link
                                    href={item.href}
                                    onClick={closeAll}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[12px] font-mono uppercase tracking-[0.16em] text-neon-cyan hover:bg-neon-cyan/5"
                                  >
                                    View all {item.label}
                                    <ArrowRight className="size-3.5" />
                                  </Link>
                                  {item.mega ? (
                                    <MobileMegaList
                                      type={item.mega}
                                      onClose={closeAll}
                                      pathname={pathname}
                                    />
                                  ) : (
                                    <ul className="mt-1 grid gap-0.5 border-l border-line/60 ml-3 pl-3">
                                      {item.dropdown!.map((d) => {
                                        const subActive =
                                          pathname === d.href ||
                                          (d.href !== "/" &&
                                            pathname.startsWith(d.href));
                                        return (
                                          <li key={d.href}>
                                            <Link
                                              href={d.href}
                                              onClick={closeAll}
                                              className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px]",
                                                subActive
                                                  ? "text-neon-cyan bg-white/5"
                                                  : "text-fg-muted hover:text-neon-cyan hover:bg-white/5"
                                              )}
                                            >
                                              <d.icon className="size-4 shrink-0" />
                                              <span className="min-w-0 truncate">
                                                {d.label}
                                              </span>
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className={cn(
                            "flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors",
                            active
                              ? "text-neon-cyan bg-white/5"
                              : "text-fg hover:bg-white/5"
                          )}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="size-4 text-fg-faint" />
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid gap-2.5"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line h-11 px-5 text-[13px] font-semibold text-fg-muted hover:text-fg hover:border-neon-cyan/40 transition-colors"
                >
                  <Search className="size-4" /> Search…
                </button>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neon-cyan h-11 px-5 text-[13px] font-bold text-neon-cyan hover:bg-neon-cyan hover:text-bg transition-colors"
                >
                  <Phone className="size-4" /> Call {SITE.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple h-11 px-5 text-[13px] font-bold text-white"
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
    const vendorRank: Record<string, number> = {
      OffSec: 0,
      "EC-Council": 1,
      CompTIA: 2,
      Macksofy: 3,
    };
    return [...COURSES]
      .sort((a, b) => {
        const ra = vendorRank[a.vendor] ?? 99;
        const rb = vendorRank[b.vendor] ?? 99;
        if (ra !== rb) return ra - rb;
        if (a.popular !== b.popular) return a.popular ? -1 : 1;
        return 0;
      })
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
        group: c.vendor,
      }));
  }
  const catRank: Record<string, number> = {
    Foundational: 0,
    "Indian Regulatory": 1,
    "International Standard": 2,
    "Industry & Privacy": 3,
    "GCC Regulatory": 4,
  };
  return [...AUDITS]
    .sort((a, b) => {
      const ra = catRank[a.category] ?? 99;
      const rb = catRank[b.category] ?? 99;
      return ra - rb;
    })
    .map((a) => ({
      slug: a.slug,
      href: `/audit/${a.slug}`,
      title: a.shortTitle,
      tagline: a.hero.tagline,
      badge: a.authority ? "Authority" : undefined,
      badgeTone: a.authority ? "amber" : undefined,
      icon: a.icon,
      bullets: a.applicability?.slice(0, 3),
      group: a.category,
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
  return <ListPreviewMegaMenu type={type} onClose={onClose} header={header} />;
}

/* ──────────────────────────────────────────────────────────────
   MOBILE MEGA LIST — grouped sub-items inside the mobile drawer
   ────────────────────────────────────────────────────────────── */
function MobileMegaList({
  type,
  onClose,
  pathname,
}: {
  type: "services" | "training" | "audit";
  onClose: () => void;
  pathname: string;
}) {
  const items = buildMegaItems(type);
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
  const groupTone: Record<string, string> = {
    Offensive: "text-red-300",
    Defensive: "text-emerald-300",
    "Compliance Adjacent": "text-amber-300",
    OffSec: "text-neon-purple",
    "EC-Council": "text-neon-cyan",
    CompTIA: "text-amber-300",
    Macksofy: "text-emerald-300",
    Foundational: "text-neon-cyan",
    "Indian Regulatory": "text-amber-300",
    "International Standard": "text-neon-purple",
    "Industry & Privacy": "text-emerald-300",
    "GCC Regulatory": "text-sky-300",
  };

  return (
    <div className="mt-1 ml-3 pl-3 border-l border-line/60 grid gap-3">
      {groupOrder.map((g) => {
        const groupItems = groupMap.get(g)!;
        const tone = groupTone[g] ?? "text-neon-cyan";
        return (
          <div key={g}>
            <div
              className={cn(
                "px-2 mb-1 font-mono text-[10px] uppercase tracking-[0.18em] font-bold flex items-center gap-2",
                tone
              )}
            >
              <span>{g}</span>
              <span className="text-fg-faint font-mono">· {groupItems.length}</span>
            </div>
            <ul className="grid gap-0.5">
              {groupItems.map((it) => {
                const subActive =
                  pathname === it.href ||
                  (it.href !== "/" && pathname.startsWith(it.href));
                return (
                  <li key={it.slug}>
                    <Link
                      href={it.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2.5 px-2 py-2 rounded-lg text-[13px] leading-tight",
                        subActive
                          ? "bg-white/5 text-neon-cyan"
                          : "text-fg-muted hover:text-neon-cyan hover:bg-white/5"
                      )}
                    >
                      <it.icon className="size-3.5 shrink-0" />
                      <span className="min-w-0 flex-1 truncate font-medium">
                        {it.title}
                      </span>
                      {it.badge && (
                        <span
                          className={cn(
                            "shrink-0 rounded-full ring-1 px-1.5 text-[8px] font-bold uppercase tracking-wider",
                            badgeClass(it.badgeTone)
                          )}
                        >
                          {it.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function ListPreviewMegaMenu({
  type,
  onClose,
  header,
}: {
  type: "services" | "training" | "audit";
  onClose: () => void;
  header: (typeof MEGA_HEADER)[keyof typeof MEGA_HEADER];
}) {
  const items = buildMegaItems(type);
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");
  const active = items.find((i) => i.slug === activeSlug) ?? items[0];

  const hasGroups = items.some((it) => !!it.group);
  const wide = hasGroups;
  const usePreview = type === "services" || type === "audit";

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
    OffSec: { dot: "bg-neon-purple", text: "text-neon-purple" },
    "EC-Council": { dot: "bg-neon-cyan", text: "text-neon-cyan" },
    CompTIA: { dot: "bg-amber-400", text: "text-amber-300" },
    Macksofy: { dot: "bg-emerald-400", text: "text-emerald-300" },
    Foundational: { dot: "bg-neon-cyan", text: "text-neon-cyan" },
    "Indian Regulatory": { dot: "bg-amber-300", text: "text-amber-300" },
    "International Standard": { dot: "bg-neon-purple", text: "text-neon-purple" },
    "Industry & Privacy": { dot: "bg-emerald-400", text: "text-emerald-300" },
    "GCC Regulatory": { dot: "bg-sky-400", text: "text-sky-300" },
  };
  const groupCol: Record<string, string> = {
    Offensive: "col-span-12 sm:col-span-6 lg:col-span-4",
    Defensive: "col-span-12 sm:col-span-6 lg:col-span-3",
    "Compliance Adjacent": "col-span-12 sm:col-span-6 lg:col-span-3",
    OffSec: "col-span-12 sm:col-span-6 lg:col-span-3",
    "EC-Council": "col-span-12 sm:col-span-6 lg:col-span-3",
    CompTIA: "col-span-12 sm:col-span-6 lg:col-span-3",
    Macksofy: "col-span-12 sm:col-span-6 lg:col-span-3",
    Foundational: "col-span-12 sm:col-span-6 lg:col-span-3",
    "Indian Regulatory": "col-span-12 sm:col-span-6 lg:col-span-3",
    "International Standard": "col-span-12 sm:col-span-6 lg:col-span-3",
    "Industry & Privacy": "col-span-12 sm:col-span-6 lg:col-span-3",
    "GCC Regulatory": "col-span-12 sm:col-span-6 lg:col-span-3",
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
          ? "w-[1380px] max-w-[min(1380px,96vw)]"
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
      {(() => {
        if (!wide) {
          return (
            <div className="grid grid-cols-12 gap-5">
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
            </div>
          );
        }

        const MAX_VISIBLE = type === "audit" ? 8 : Infinity;
        const compact = type === "audit";

        const groupBlocks = groupOrder.map((g) => {
          const groupItems = groupMap.get(g)!;
          const visible = groupItems.slice(0, MAX_VISIBLE);
          const overflowCount = groupItems.length - visible.length;
          const tone = groupTone[g] ?? {
            dot: "bg-neon-cyan",
            text: "text-neon-cyan",
          };
          return (
            <div key={g} className="min-w-0 flex flex-col">
              <div
                className={cn(
                  "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em] font-bold mb-2",
                  tone.text
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full animate-pulse shrink-0",
                    tone.dot
                  )}
                />
                <span className="break-words">{g}</span>
                <span className="text-fg-faint font-mono shrink-0">
                  · {groupItems.length}
                </span>
              </div>
              <ul className={cn("grid", compact ? "gap-0.5" : "gap-1")}>
                {visible.map((it) => {
                  const idx = runningIndex++;
                  return (
                    <MegaItemRow
                      key={it.slug}
                      item={it}
                      index={idx}
                      active={it.slug === activeSlug}
                      onHover={() => setActiveSlug(it.slug)}
                      onClose={onClose}
                      compact={compact}
                    />
                  );
                })}
              </ul>
              {overflowCount > 0 && (
                <Link
                  href={header.cta.href}
                  onClick={onClose}
                  className={cn(
                    "mt-2 inline-flex items-center gap-1 px-3 text-[11px] font-semibold hover:gap-1.5 transition-all",
                    tone.text
                  )}
                >
                  +{overflowCount} more <ArrowRight className="size-3" />
                </Link>
              )}
            </div>
          );
        });

        if (usePreview) {
          // Audit: 5 groups won't fit alongside a preview as 5 separate
          // columns. Pair smaller groups into stacked columns so each
          // visual column has comfortable width.
          if (type === "audit") {
            const auditColumns: { groups: string[]; colSpan: string }[] = [
              {
                groups: ["Foundational", "Indian Regulatory"],
                colSpan: "lg:col-span-3",
              },
              {
                groups: ["International Standard", "Industry & Privacy"],
                colSpan: "lg:col-span-2",
              },
              { groups: ["GCC Regulatory"], colSpan: "lg:col-span-2" },
            ];
            return (
              <div className="grid grid-cols-12 gap-5">
                {auditColumns.map((col, ci) => (
                  <div
                    key={ci}
                    className={cn(
                      "col-span-12 sm:col-span-6 flex flex-col gap-5",
                      col.colSpan
                    )}
                  >
                    {col.groups.map((g) => {
                      const idx = groupOrder.indexOf(g);
                      return idx >= 0 ? (
                        <div key={g}>{groupBlocks[idx]}</div>
                      ) : null;
                    })}
                  </div>
                ))}
                <div className="col-span-12 lg:col-span-5">{preview}</div>
              </div>
            );
          }
          // Services: explicit col-spans on the 12-col grid + preview pane
          return (
            <div className="grid grid-cols-12 gap-5">
              {groupOrder.map((g, i) => (
                <div
                  key={g}
                  className={
                    groupCol[g] ?? "col-span-12 sm:col-span-6 lg:col-span-3"
                  }
                >
                  {groupBlocks[i]}
                </div>
              ))}
              <div className="col-span-12 lg:col-span-5">{preview}</div>
            </div>
          );
        }

        // Training / audit: each group gets its own column. Use a grid
        // sized to the number of groups so nothing wraps onto a 2nd row.
        const lgCols =
          groupOrder.length === 5
            ? "lg:grid-cols-5"
            : groupOrder.length === 4
            ? "lg:grid-cols-4"
            : groupOrder.length === 3
            ? "lg:grid-cols-3"
            : "lg:grid-cols-2";
        return (
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-5",
              lgCols
            )}
          >
            {groupBlocks}
          </div>
        );
      })()}

      {/* FOOTER STRIP */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] text-fg-faint">
          <Sparkles className="size-3.5 text-neon-cyan" />
          <span>
            {type === "services" && "All engagements include free 30-day retest."}
            {type === "training" && "Mentor support until you pass — no extra fee."}
            {type === "audit" && "CERT-In empanelled · 11+ years auditing experience."}
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

function MegaItemRow({
  item,
  index,
  active,
  onHover,
  onClose,
  compact = false,
}: {
  item: MegaItem;
  index: number;
  active: boolean;
  onHover: () => void;
  onClose: () => void;
  compact?: boolean;
}) {
  // Cap per-item animation delay so wide menus with many rows finish
  // staggering in under ~0.5s (otherwise late items animate on top of
  // their settled neighbours).
  const delay = Math.min(0.04 + index * 0.02, 0.5);

  if (compact) {
    // Audit-style row: single-line, title + optional badge, no tagline,
    // no boxed icon. Eliminates any possibility of multi-line description
    // overlap and reads cleanly in narrow 5-column layout.
    return (
      <motion.li
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.18 }}
      >
        <Link
          href={item.href}
          onClick={onClose}
          onMouseEnter={onHover}
          onFocus={onHover}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors",
            active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
          )}
        >
          <item.icon
            className={cn(
              "size-3.5 shrink-0 transition-colors",
              active ? "text-neon-cyan" : "text-fg-faint group-hover:text-neon-cyan"
            )}
          />
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-[12px] font-semibold leading-tight transition-colors",
              active ? "text-neon-cyan" : "text-fg group-hover:text-neon-cyan"
            )}
          >
            {item.title}
          </span>
          {item.badge && (
            <span
              className={cn(
                "shrink-0 rounded-full ring-1 px-1.5 text-[8px] font-bold uppercase tracking-wider",
                badgeClass(item.badgeTone)
              )}
            >
              {item.badge}
            </span>
          )}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.18 }}
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
