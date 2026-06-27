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
    <section className="bg-background py-10 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why teams trust LuxGen Nepal"
          subtitle="Everything you need from a long-term technology partner — quality, reliability, and a price that makes sense."
        />
        <div className="mt-8 sm:mt-14">
          <div className="-mx-4 sm:mx-0">
            <div
              className="scrollbar-none flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3"
              role="list"
              aria-label="Why choose us carousel"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {features.map((f, i) => (
                <Reveal
                  key={f.title}
                  delay={i * 70}
                  className="flex w-[56vw] min-w-[11rem] max-w-[13.25rem] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:snap-auto"
                >
                  <div className="group flex min-h-[124px] w-full flex-col rounded-2xl border border-border bg-card p-3 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant sm:min-h-0 sm:p-7">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground shadow-glow-red transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                      <f.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </span>
                    <h3 className="mt-2.5 font-display text-[13px] font-bold text-foreground sm:mt-5 sm:text-lg">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {f.desc}
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
