import { useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    quote:
      "LuxGen Nepal delivered our platform ahead of schedule with incredible attention to detail. Communication was flawless throughout.",
    name: "Aarav Sharma",
    role: "Startup Founder, Kathmandu",
  },
  {
    quote:
      "World-class quality at a fraction of what we paid agencies abroad. They truly feel like part of our team.",
    name: "Emily Carter",
    role: "Product Lead, London",
  },
  {
    quote:
      "The UI/UX work transformed our product. Our users love the new experience and engagement is up significantly.",
    name: "Bishal Thapa",
    role: "Business Owner, Pokhara",
  },
  {
    quote:
      "Reliable, transparent, and genuinely talented. LuxGen Nepal is now our default technology partner.",
    name: "Daniel Okafor",
    role: "CEO, Lagos",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  const t = testimonials[i];

  return (
    <section className="bg-muted py-10 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by clients worldwide"
          subtitle="From Nepal to across the globe  here's what partners say about working with us."
        />
        <div className="mt-7 rounded-2xl border border-border bg-card p-4 shadow-elegant sm:mt-12 sm:rounded-3xl sm:p-8 md:p-12">
          <Quote className="h-6 w-6 text-primary/30 sm:h-10 sm:w-10" />
          <p className="mt-2.5 font-display text-sm font-medium leading-relaxed text-foreground sm:mt-4 sm:text-xl md:text-2xl">
            "{t.quote}"
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div>
              <div className="font-display text-sm font-bold text-foreground sm:text-base">
                {t.name}
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">{t.role}</div>
              <div className="mt-1 flex gap-0.5 text-primary sm:mt-1.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setI((p) => (p - 1 + count) % count)}
                aria-label="Previous testimonial"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:bg-muted sm:h-10 sm:w-10"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => setI((p) => (p + 1) % count)}
                aria-label="Next testimonial"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:bg-muted sm:h-10 sm:w-10"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-1.5 sm:mt-6 sm:gap-2">
            {testimonials.map((_, d) => (
              <button
                key={d}
                aria-label={`Go to testimonial ${d + 1}`}
                onClick={() => setI(d)}
                className={`h-2 rounded-full transition-all ${d === i ? "w-6 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
