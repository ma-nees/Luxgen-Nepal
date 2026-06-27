import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 7, suffix: "+", label: "Countries Served" },
  { value: 24, suffix: "/7", label: "Support" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="font-display text-2xl font-extrabold text-primary-foreground sm:text-5xl"
    >
      {n}
      <span>{suffix}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-gradient-flag py-5 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-5 gap-2 px-3 text-center sm:grid-cols-3 sm:gap-4 sm:px-6 md:grid-cols-5 md:gap-8 lg:px-8">
        {stats.map((s) => (
          <div key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <div className="mt-1 text-[10px] font-medium leading-tight text-primary-foreground/80 sm:mt-2 sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
