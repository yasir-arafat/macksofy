"use client";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Brain,
  BrainCircuit,
  Bug,
  Building,
  CalendarClock,
  ClipboardCheck,
  Cloud,
  Code2,
  Combine,
  CreditCard,
  Crosshair,
  Database,
  Factory,
  FileBadge,
  FileScan,
  Fish,
  Globe,
  Heart,
  Landmark,
  Lock,
  Microscope,
  Network,
  Radar,
  Receipt,
  ScanSearch,
  ShieldCheck,
  Skull,
  Smartphone,
  TrendingUp,
  UserCog,
  Users,
  Webhook,
  Wifi,
} from "lucide-react";

/**
 * Resolves the `iconName` strings produced by lib/nav-index.ts into icon
 * components on the client.
 *
 * Why a map instead of passing the component down: the nav index is computed
 * in a Server Component so the 575 KB of content modules stay out of the
 * client bundle (see lib/nav-index.ts). React components can't cross the RSC
 * boundary, so the icon travels as a name and is resolved here.
 *
 * This map must cover every `iconName` used in content/services.ts and
 * content/audits.ts. An unknown name degrades to ShieldCheck rather than
 * throwing, so a new content entry can never blank out the nav.
 */

/**
 * Courses have no per-course icon; they all use the graduation cap. Lucide v1
 * doesn't always ship GraduationCap, so this is the same inline fallback the
 * Header used before icons moved to name-based resolution.
 */
function GraduationCap({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 1.5 9 1.5 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Brain,
  BrainCircuit,
  Bug,
  Building,
  CalendarClock,
  ClipboardCheck,
  Cloud,
  Code2,
  Combine,
  CreditCard,
  Crosshair,
  Database,
  Factory,
  FileBadge,
  FileScan,
  Fish,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Lock,
  Microscope,
  Network,
  Radar,
  Receipt,
  ScanSearch,
  ShieldCheck,
  Skull,
  Smartphone,
  TrendingUp,
  UserCog,
  Users,
  Webhook,
  Wifi,
};

export function NavIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? ShieldCheck;
  return <Icon className={className} />;
}
