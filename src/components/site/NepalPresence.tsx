import { Building2, Globe2, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const cities = [
  { name: "SiddrathNagar", note: "Head Office" },
  { name: "Pokhara", note: "Branch" },
  { name: "Biratnagar", note: "Branch" },
  { name: "Bharatpur", note: "Branch" },
];

export function NepalPresence() {
  return (
    <section className="relative overflow-hidden bg-muted py-10 sm:py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-48 bg-gradient-to-b from-background to-transparent sm:block"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Presence"
          title="Rooted in Nepal, serving the world"
          subtitle="Proudly serving businesses across Nepal and around the globe."
          className="lg:max-w-3xl"
        />
        <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="lg:col-start-1 lg:h-full">
            <div className="grid h-full grid-cols-2 gap-3 rounded-3xl border border-border bg-background/70 p-3 shadow-soft sm:gap-4 sm:p-5">
              {cities.map((c) => (
                <div
                  key={c.name}
                  className="group flex items-start gap-2 rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant sm:gap-3 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground shadow-glow-red sm:h-11 sm:w-11">
                    {c.note === "Head Office" ? (
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-foreground sm:text-base">{c.name}</div>
                    <div className="text-xs font-medium text-muted-foreground sm:text-sm">
                      {c.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-start-2 lg:h-full">
            <div className="relative flex h-full min-h-40 flex-col justify-center overflow-hidden rounded-2xl bg-gradient-sunset p-3 text-primary-foreground shadow-elegant sm:min-h-72 sm:rounded-3xl sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.35),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.22),transparent_30%)]"
                aria-hidden="true"
              />
              <Globe2 className="relative h-6 w-6 sm:h-10 sm:w-10" />
              <h3 className="relative mt-2 text-base font-bold sm:mt-4 sm:text-3xl">
                Serving clients globally
              </h3>
              <p className="relative mt-1.5 break-words text-xs leading-snug text-primary-foreground/85 sm:mt-2 sm:text-base">
                Nepal - India - USA - UK - Australia - Middle East
              </p>
              <div className="relative mt-3 grid grid-cols-3 gap-1.5 sm:mt-7 sm:gap-2">
                {["7+ Countries", "30+ Clients", "50+ Projects"].map((b) => (
                  <span
                    key={b}
                    className="rounded-xl bg-background/20 px-2 py-1.5 text-center text-[10px] font-semibold backdrop-blur sm:rounded-2xl sm:px-3.5 sm:py-3 sm:text-sm"
                  >
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
