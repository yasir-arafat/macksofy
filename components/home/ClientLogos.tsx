import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ClientsMarquee } from "@/components/clients/ClientsMarquee";
import { CLIENTS } from "@/content/clients";

export function ClientLogos() {
  return (
    <section className="py-16 border-y border-line bg-bg-1">
      <Container className="mb-8">
        <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-fg-faint">
          Trusted by Indian + UAE enterprises · Authorized by industry bodies
        </p>
      </Container>

      <ClientsMarquee />

      <Container className="mt-8 text-center">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:gap-3 transition-all"
        >
          See all {CLIENTS.length}+ clients <ArrowRight className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
