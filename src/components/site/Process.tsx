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
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven development process"
          subtitle="A transparent, milestone-driven workflow that keeps you informed at every stage."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-elegant">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-flag text-primary-foreground shadow-glow-red">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Step {i + 1}
                </div>
                <h3 className="mt-1 text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}