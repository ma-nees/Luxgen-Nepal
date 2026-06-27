import { Check, MountainSnow } from "lucide-react";
import { Reveal } from "./Reveal";
import pattern from "@/assets/img/nepal-pattern.jpg";

const reasons = [
  "Highly skilled developers",
  "Competitive pricing",
  "Strong English communication",
  "Modern development practices",
  "Fast delivery",
  "Growing technology ecosystem",
  "Global project experience",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-muted py-10 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase text-secondary">
            About LuxGen Nepal
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Empowering Nepal's <span className="text-gradient-flag">digital future</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
            LuxGen Nepal is a Nepal-based technology company helping businesses transform ideas into
            powerful digital products. We combine Nepalese talent, innovation, and global
            development standards to deliver solutions that are affordable, scalable, and impactful.
          </p>
          <p className="mt-4 hidden text-base leading-relaxed text-muted-foreground sm:block">
            Our vision is to become Nepal's most trusted technology partner — delivering world-class
            digital solutions for local and global businesses.
          </p>

          <h3 className="mt-6 text-base font-bold text-foreground sm:mt-8 sm:text-lg">
            Why build with a Nepal-based team?
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
            {reasons.map((r) => (
              <li
                key={r}
                className="flex items-center gap-2 text-xs font-medium text-foreground/85 sm:gap-2.5 sm:text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="relative hidden sm:block">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-elegant sm:p-8">
            <img
              src={pattern}
              alt=""
              aria-hidden="true"
              width={1024}
              height={1024}
              loading="lazy"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07]"
            />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-flag text-primary-foreground shadow-glow-red">
                <MountainSnow className="h-7 w-7" />
              </span>
              <blockquote className="mt-6 font-display text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
                "From the Himalayas to the World — building digital success stories, one project at
                a time."
              </blockquote>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                  { v: "Affordable", l: "Pricing that fits" },
                  { v: "Scalable", l: "Built to grow" },
                  { v: "Reliable", l: "On-time delivery" },
                  { v: "Human", l: "Centered design" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl border border-border bg-background/70 p-4">
                    <div className="font-display text-lg font-bold text-secondary">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
