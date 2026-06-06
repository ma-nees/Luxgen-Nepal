import { Linkedin, Github, Twitter } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const team = [
  { name: "Sandesh Adhikari", role: "Founder & CEO", initials: "SA" },
  { name: "Pratik Gurung", role: "Lead Developer", initials: "PG" },
  { name: "Niharika Rai", role: "UI/UX Designer", initials: "NR" },
  { name: "Rojan Karki", role: "Project Manager", initials: "RK" },
  { name: "Aarati Shrestha", role: "Marketing Lead", initials: "AS" },
];

export function Team() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Team"
          title="The people behind LuxGen Nepal"
          subtitle="A passionate team of Nepalese designers, engineers, and strategists."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 60}>
              <div className="group rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-elegant">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-flag text-xl font-bold text-primary-foreground shadow-glow-red">
                  {m.initials}
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                <div className="mt-4 flex justify-center gap-2">
                  {[Linkedin, Twitter, Github].map((Icon, k) => (
                    <span
                      key={k}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:bg-gradient-flag hover:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}