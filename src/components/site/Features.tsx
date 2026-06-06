import {
  BadgeDollarSign,
  Clock,
  Sparkles,
  LifeBuoy,
  ShieldCheck,
  MessagesSquare,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    desc: "Premium solutions delivered within reasonable, transparent budgets.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Projects shipped according to agreed timelines, every time.",
  },
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    desc: "Beautiful, intuitive experiences crafted around your users.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Support",
    desc: "Reliable post-launch support and proactive maintenance.",
  },
  {
    icon: ShieldCheck,
    title: "Global Quality Standards",
    desc: "Best practices, clean code, and modern technologies.",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    desc: "Regular updates and clear, honest project management.",
  },
];

export function Features() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why teams trust LuxGen Nepal"
          subtitle="Everything you need from a long-term technology partner — quality, reliability, and a price that makes sense."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground shadow-glow-red transition-transform group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}