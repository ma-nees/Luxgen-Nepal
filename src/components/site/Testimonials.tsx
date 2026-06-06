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
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by clients worldwide"
          subtitle="From Nepal to across the globe — here's what partners say about working with us."
        />
        <div className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12">
          <Quote className="h-10 w-10 text-primary/30" />
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            "{t.quote}"
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="font-bold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
              <div className="mt-1.5 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setI((p) => (p - 1 + count) % count)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setI((p) => (p + 1) % count)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
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