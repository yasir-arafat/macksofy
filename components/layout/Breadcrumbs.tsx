import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-fg-faint">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-neon-cyan">
            <Home className="size-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 text-fg-faint" />
              {last ? (
                <span className="font-semibold text-fg">{c.name}</span>
              ) : (
                <Link href={c.href} className="hover:text-neon-cyan">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
