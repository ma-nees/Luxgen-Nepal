const logos = ["Sherpa Labs", "Yeti Tech", "Pashupati Bank", "Lotus EdTech", "Gurkha Media", "Himal Foods", "Newa Studio", "Tara Energy"];

export function ClientLogos() {
  const row = [...logos, ...logos];
  return (
    <section className="border-y border-border bg-background py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Trusted by teams in Nepal and around the world
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 px-5">
          {row.map((name, i) => (
            <span key={i} className="whitespace-nowrap text-lg font-bold text-foreground/40">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}