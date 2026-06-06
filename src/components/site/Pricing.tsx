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
    features: ["Multi-page website", "CMS integration", "SEO optimization", "Analytics setup", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored software for serious scale.",
    features: ["Custom software", "Cloud infrastructure", "Dedicated support", "Advanced security", "SLA guarantee"],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent, flexible pricing"
          subtitle="Premium quality at prices that make sense — choose a starting point and scale as you grow."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5",
                  p.featured
                    ? "border-transparent bg-gradient-flag text-primary-foreground shadow-elegant"
                    : "border-border bg-card",
                )}
              >
                {p.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary">
                    Most Popular
                  </span>
                )}
                <h3 className={cn("text-lg font-bold", p.featured ? "text-primary-foreground" : "text-foreground")}>
                  {p.name}
                </h3>
                <div className={cn("mt-3 text-4xl font-extrabold", p.featured ? "text-primary-foreground" : "text-foreground")}>
                  {p.price}
                </div>
                <p className={cn("mt-2 text-sm", p.featured ? "text-primary-foreground/85" : "text-muted-foreground")}>
                  {p.desc}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          p.featured ? "bg-background/90 text-primary" : "bg-secondary text-secondary-foreground",
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={p.featured ? "text-primary-foreground" : "text-foreground/85"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]",
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