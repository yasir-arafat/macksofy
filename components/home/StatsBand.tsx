import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/motion/Counter";

const STATS = [
  { value: 20000, suffix: "+", label: "Professionals trained" },
  { value: 500, suffix: "+", label: "Pentests delivered" },
  { value: 50, suffix: "+", label: "Audits per year" },
  { value: 11, suffix: "+", label: "Years in business" },
];

export function StatsBand() {
  return (
    <section className="relative border-y border-line bg-bg-1">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display text-3xl font-black sm:text-4xl gradient-text">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
