import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const projects = [
  { title: "Everest SaaS Platform", category: "SaaS Platform", result: "3x faster onboarding", grad: "bg-gradient-flag" },
  { title: "Annapurna Commerce", category: "E-Commerce Store", result: "+58% conversions", grad: "bg-gradient-sunset" },
  { title: "Sagarmatha School System", category: "School Management", result: "12k+ students managed", grad: "bg-gradient-flag" },
  { title: "Kumari Mobile Banking", category: "Mobile Application", result: "4.8★ app rating", grad: "bg-gradient-sunset" },
  { title: "Helping Hands NGO", category: "NGO Platform", result: "2x donor engagement", grad: "bg-gradient-flag" },
  { title: "Lumbini Enterprise Suite", category: "Enterprise Software", result: "40% ops savings", grad: "bg-gradient-sunset" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Work that delivers results"
          subtitle="A selection of products we've built for startups, businesses, schools, and NGOs."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant">
                <div className={`relative flex h-44 items-end overflow-hidden ${p.grad} p-5`}>
                  <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
                  <span className="relative rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="flex items-center justify-between text-lg font-bold text-foreground">
                    {p.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm font-medium text-secondary">{p.result}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}