import { Check, MountainSnow } from "lucide-react";
import { Reveal } from "./Reveal";
import pattern from "@/assets/nepal-pattern.jpg";

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
    <section id="about" className="relative overflow-hidden bg-muted py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
            About LuxGen Nepal
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Empowering Nepal's <span className="text-gradient-flag">digital future</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            LuxGen Nepal is a Nepal-based technology company helping businesses
            transform ideas into powerful digital products. We combine Nepalese
            talent, innovation, and global development standards to deliver
            solutions that are affordable, scalable, and impactful.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our vision is to become Nepal's most trusted technology partner —
            delivering world-class digital solutions for local and global businesses.
          </p>

          <h3 className="mt-8 text-lg font-bold text-foreground">Why build with a Nepal-based team?</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r} className="flex items-center gap-2.5 text-sm font-medium text-foreground/85">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elegant">
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
              <blockquote className="mt-6 text-xl font-semibold leading-relaxed text-foreground">
                "From the Himalayas to the World — building digital success stories,
                one project at a time."
              </blockquote>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { v: "Affordable", l: "Pricing that fits" },
                  { v: "Scalable", l: "Built to grow" },
                  { v: "Reliable", l: "On-time delivery" },
                  { v: "Human", l: "Centered design" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl border border-border bg-background/70 p-4">
                    <div className="text-lg font-bold text-secondary">{s.v}</div>
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