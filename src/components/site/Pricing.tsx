import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Startup",
    price: "Rs. 25k+",
    desc: "Perfect for launching your first online presence.",
    features: ["Landing page", "Responsive design", "Contact form", "Basic SEO"],
    featured: false,
  },
  {
    name: "Business",
    price: "Rs. 75k+",
    desc: "For growing companies that need more.",
    features: [
      "Multi-page website",
      "CMS integration",
      "SEO optimization",
      "Analytics setup",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored software for serious scale.",
    features: [
      "Custom software",
      "Cloud infrastructure",
      "Dedicated support",
      "Advanced security",
      "SLA guarantee",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-background py-10 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent, flexible pricing"
          subtitle="Premium quality at prices that make sense — choose a starting point and scale as you grow."
        />
        <div className="scrollbar-none -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:mx-0 sm:mt-14 sm:grid sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 80}
              className="flex w-[58vw] min-w-[11.5rem] max-w-[13.75rem] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:snap-auto"
            >
              <div
                className={cn(
                  "relative flex h-full min-h-[250px] flex-col rounded-2xl border p-3 shadow-soft transition-all duration-300 hover:-translate-y-1.5 sm:min-h-0 sm:rounded-3xl sm:p-8",
                  p.featured
                    ? "border-transparent bg-gradient-flag text-primary-foreground shadow-elegant"
                    : "border-border bg-card",
                )}
              >
                {p.featured && (
                  <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-bold text-primary sm:right-6 sm:top-6 sm:px-3 sm:py-1 sm:text-xs">
                    Most Popular
                  </span>
                )}
                <h3
                  className={cn(
                    "text-base font-bold sm:text-lg",
                    p.featured ? "text-primary-foreground" : "text-foreground",
                  )}
                >
                  {p.name}
                </h3>
                <div
                  className={cn(
                    "mt-1.5 font-display text-xl font-extrabold sm:mt-3 sm:text-4xl",
                    p.featured ? "text-primary-foreground" : "text-foreground",
                  )}
                >
                  {p.price}
                </div>
                <p
                  className={cn(
                    "mt-1.5 text-xs sm:mt-2 sm:text-sm",
                    p.featured ? "text-primary-foreground/85" : "text-muted-foreground",
                  )}
                >
                  {p.desc}
                </p>
                <ul className="mt-3 flex-1 space-y-1.5 sm:mt-6 sm:space-y-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs font-medium sm:gap-2.5 sm:text-sm"
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full sm:h-5 sm:w-5",
                          p.featured
                            ? "bg-background/90 text-primary"
                            : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </span>
                      <span
                        className={p.featured ? "text-primary-foreground" : "text-foreground/85"}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    "mt-3 inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition-transform hover:scale-[1.03] sm:mt-8 sm:px-5 sm:py-3 sm:text-sm",
                    p.featured
                      ? "bg-background text-primary"
                      : "bg-gradient-flag text-primary-foreground shadow-glow-red",
                  )}
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
