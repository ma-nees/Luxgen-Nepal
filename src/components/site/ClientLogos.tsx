const logos = [
  "Everest Digital",
  "Annapurna Cloud",
  "Lumbini Ventures",
  "Khumbu Commerce",
  "Mustang Mobility",
  "Bagmati Fintech",
  "Janakpur Health",
  "Pokhara Learning",
  "Koshi Logistics",
  "Karnali Foods",
  "Sagarmatha Media",
  "Patan Studio",
];

export function ClientLogos() {
  return (
    <section className="border-y border-border bg-background py-6 sm:py-10">
      <p className="mb-4 text-center text-[11px] font-semibold uppercase text-muted-foreground sm:mb-6 sm:text-xs">
        Trusted by teams in Nepal and around the world
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee px-5">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center gap-7 pr-7 sm:gap-10 sm:pr-10"
              aria-hidden={group === 1}
            >
              {logos.map((name) => (
                <span
                  key={`${group}-${name}`}
                  className="whitespace-nowrap font-display text-sm font-bold text-foreground/40 sm:text-lg"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
