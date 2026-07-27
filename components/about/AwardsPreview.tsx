import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { featuredAwards } from "@/content/awards";

export function AwardsPreview() {
  const featured = featuredAwards();
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {featured.map((a) => (
          <Link
            key={a.slug}
            href="/awards"
            className="group flex flex-col rounded-2xl glass overflow-hidden ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
          >
            <div className="relative aspect-[6/5] bg-white overflow-hidden">
              <Image
                src={a.image}
                alt={`${a.title} — ${a.body}`}
                fill
                sizes="(max-width:768px) 100vw, 350px"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="amber">
                  <Sparkles className="size-3" /> {a.year}
                </Badge>
              </div>
            </div>
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
                {a.body}
              </div>
              <h3 className="mt-2 font-display text-base font-bold text-fg group-hover:text-neon-cyan leading-tight">
                {a.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/awards"
          className="inline-flex items-center gap-2 font-semibold text-neon-cyan hover:gap-3 transition-all"
        >
          See all 9 awards & recognitions <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
