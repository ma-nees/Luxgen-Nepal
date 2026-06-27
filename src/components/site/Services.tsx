import {
  Globe,
  Smartphone,
  Palette,
  Code2,
  Cloud,
  Lightbulb,
  ShoppingCart,
  Bot,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Fast, responsive, SEO-ready websites that convert.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native & cross-platform apps for iOS and Android.",
  },
  { icon: Palette, title: "UI/UX Design", desc: "Research-driven interfaces and design systems." },
  {
    icon: Code2,
    title: "Software Development",
    desc: "Custom platforms tailored to your workflows.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Scalable, secure cloud infrastructure & DevOps.",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    desc: "Strategy and guidance for digital transformation.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    desc: "High-converting online stores and marketplaces.",
  },
  { icon: Bot, title: "AI & Automation", desc: "Smart workflows and AI-powered product features." },
];

export function Services() {
  return (
    <section id="services" className="bg-muted py-10 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-end digital solutions"
          subtitle="From the first wireframe to global launch and beyond, we cover the full product lifecycle."
        />
        <div className="mt-8 sm:mt-14">
          <div className="-mx-4 sm:mx-0">
            <div
              className="scrollbar-none flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4"
              role="list"
              aria-label="Services carousel"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {services.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={i * 50}
                  className="flex w-[56vw] min-w-[11rem] max-w-[13.25rem] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:snap-auto"
                >
                  <div className="group relative flex min-h-[124px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elegant sm:min-h-0 sm:p-6">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-secondary transition-colors group-hover:bg-gradient-flag group-hover:text-primary-foreground sm:h-12 sm:w-12">
                      <s.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </span>
                    <h3 className="mt-2.5 flex items-center justify-between gap-2 font-display text-[13px] font-bold text-foreground sm:mt-5 sm:gap-3 sm:text-base">
                      {s.title}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
