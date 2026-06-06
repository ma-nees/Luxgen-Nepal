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
  { icon: Globe, title: "Website Development", desc: "Fast, responsive, SEO-ready websites that convert." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native & cross-platform apps for iOS and Android." },
  { icon: Palette, title: "UI/UX Design", desc: "Research-driven interfaces and design systems." },
  { icon: Code2, title: "Software Development", desc: "Custom platforms tailored to your workflows." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Scalable, secure cloud infrastructure & DevOps." },
  { icon: Lightbulb, title: "IT Consulting", desc: "Strategy and guidance for digital transformation." },
  { icon: ShoppingCart, title: "E-Commerce Development", desc: "High-converting online stores and marketplaces." },
  { icon: Bot, title: "AI & Automation", desc: "Smart workflows and AI-powered product features." },
];

export function Services() {
  return (
    <section id="services" className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-end digital solutions"
          subtitle="From the first wireframe to global launch and beyond, we cover the full product lifecycle."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elegant">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-secondary transition-colors group-hover:bg-gradient-flag group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 flex items-center justify-between text-base font-bold text-foreground">
                  {s.title}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}