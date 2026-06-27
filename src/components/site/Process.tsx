import { Search, ClipboardList, PenTool, Code2, TestTube2, Rocket, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  { icon: Search, title: "Discovery", desc: "Understand goals, users, and scope." },
  { icon: ClipboardList, title: "Planning", desc: "Roadmap, milestones, and architecture." },
  { icon: PenTool, title: "UI/UX Design", desc: "Wireframes to polished prototypes." },
  { icon: Code2, title: "Development", desc: "Clean, scalable, well-tested code." },
  { icon: TestTube2, title: "Testing", desc: "QA across devices and edge cases." },
  { icon: Rocket, title: "Deployment", desc: "Smooth, secure go-live." },
  { icon: Wrench, title: "Maintenance", desc: "Ongoing support and improvements." },
];

export function Process() {
  return (
    <section className="bg-background py-10 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven development process"
          subtitle="A transparent, milestone-driven workflow that keeps you informed at every stage."
        />
        <div className="mt-8 sm:mt-14">
          <div className="-mx-4 sm:mx-0">
            <div
              className="scrollbar-none flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4 xl:grid-cols-7"
              role="list"
              aria-label="How we work carousel"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {steps.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={i * 60}
                  className="flex w-[52vw] max-w-[12.5rem] shrink-0 snap-start sm:w-auto sm:max-w-none sm:snap-auto"
                >
                  <div className="flex h-[136px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 text-center shadow-soft transition-all hover:shadow-elegant sm:h-auto sm:min-h-0 sm:p-5 sm:hover:-translate-y-1.5">
                    <span className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-flag text-primary-foreground shadow-glow-red sm:h-12 sm:w-12">
                      <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <div className="mt-2 text-[10px] font-bold uppercase text-primary sm:mt-3 sm:text-xs">
                      Step {i + 1}
                    </div>
                    <h3 className="mt-1 font-display text-[13px] font-bold text-foreground sm:text-base">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 overflow-hidden text-xs leading-relaxed text-muted-foreground">
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
