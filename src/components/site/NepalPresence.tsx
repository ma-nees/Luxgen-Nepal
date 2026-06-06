import { MapPin, Globe2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const cities = [
  { name: "Kathmandu", note: "Head Office" },
  { name: "Pokhara", note: "Branch" },
  { name: "Biratnagar", note: "Branch" },
  { name: "Bharatpur", note: "Branch" },
];

export function NepalPresence() {
  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Presence"
          title="Rooted in Nepal, serving the world"
          subtitle="Proudly serving businesses across Nepal and around the globe."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.map((c) => (
                <div
                  key={c.name}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-bold text-foreground">{c.name}</div>
                    <div className="text-sm text-muted-foreground">{c.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center rounded-3xl bg-gradient-sunset p-8 text-primary-foreground shadow-elegant">
              <Globe2 className="h-10 w-10" />
              <h3 className="mt-4 text-2xl font-bold">Serving clients globally</h3>
              <p className="mt-2 text-primary-foreground/85">
                Nepal • India • USA • UK • Australia • Middle East
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["7+ Countries", "30+ Clients", "50+ Projects"].map((b) => (
                  <span key={b} className="rounded-full bg-background/20 px-3.5 py-1.5 text-sm font-semibold">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}