import Link from "next/link";
import type { NavIndex } from "@/lib/nav-index";
import { CITIES } from "@/content/cities";
import { TOPIC_HUBS } from "@/content/topicHubs";

/**
 * Server-rendered navigation links for crawler discovery.
 *
 * The interactive Header is a Client Component whose mega-menu items only
 * appear in the DOM on hover/click (behind AnimatePresence). Googlebot
 * receives the initial server HTML where those links are absent — so
 * service, training, audit, location and blog-category pages are only
 * discoverable through in-body links and the footer.
 *
 * This component renders every key internal link as plain <a> tags in a
 * visually-hidden <nav>. It ships in the server HTML of every page,
 * giving crawlers a complete site map without any JS execution.
 */
export function CrawlNav({ nav }: { nav: NavIndex }) {
  return (
    <nav
      aria-label="Site map"
      className="sr-only"
    >
      <ul>
        {/* Services */}
        {nav.mega.services.map((s) => (
          <li key={s.href}>
            <Link href={s.href}>{s.title}</Link>
          </li>
        ))}

        {/* Training */}
        {nav.mega.training.map((c) => (
          <li key={c.href}>
            <Link href={c.href}>{c.title}</Link>
          </li>
        ))}

        {/* Audit / Compliance */}
        {nav.mega.audit.map((a) => (
          <li key={a.href}>
            <Link href={a.href}>{a.title}</Link>
          </li>
        ))}

        {/* City hub pages */}
        {CITIES.map((city) => (
          <li key={city.slug}>
            <Link href={`/locations/${city.slug}`}>
              {city.name}
            </Link>
          </li>
        ))}

        {/* Topic hubs */}
        {TOPIC_HUBS.map((hub) => (
          <li key={hub.slug}>
            <Link href={`/blog/category/${hub.slug}`}>{hub.title}</Link>
          </li>
        ))}

        {/* Key static pages */}
        <li><Link href="/about">About</Link></li>
        <li><Link href="/clients">Clients</Link></li>
        <li><Link href="/case-studies">Case Studies</Link></li>
        <li><Link href="/industries">Industries</Link></li>
        <li><Link href="/resources">Resources</Link></li>
        <li><Link href="/glossary">Glossary</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/training">Training</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/locations">Locations</Link></li>
      </ul>
    </nav>
  );
}
