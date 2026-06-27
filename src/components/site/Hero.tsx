import { MapPin, Zap, Gem, Handshake, Globe, ArrowRight, FolderGit2 } from "lucide-react";
import heroBg from "@/assets/img/himalaya-hero-v2.png";
// import heroBg from "@/assets/img/himalaya-hero.png";
const badges = [
  { icon: MapPin, label: "Proudly Built in Nepal" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Gem, label: "Premium Quality" },
  { icon: Handshake, label: "Customer First" },
  { icon: Globe, label: "Serving Global Clients" },
];

const WHATSAPP_LINK =
  "https://wa.me/9779811115861?text=Hi%20LuxGen%20Nepal%2C%20I%20want%20a%20free%20consultation.";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-sky pt-14 pb-10 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left */}
        <div className="relative z-10 animate-fade-in rounded-3xl bg-transparent p-4 shadow-none sm:rounded-none sm:p-0">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-secondary sm:px-4">
            <span className="h-2 w-2 rounded-full bg-primary" />
            From the Himalayas to the World
          </span>

          <h1 className="mt-5 max-w-3xl font-display text-xl font-extrabold leading-[1.14] text-foreground sm:mt-6 sm:text-5xl md:text-6xl">
            Affordable IT Solutions with{" "}
            <span className="text-gradient-flag">Global Standards</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-foreground/90 [text-shadow:0_1px_2px_rgb(255_255_255/0.85)] sm:mt-6 md:text-lg">
            LuxGen Nepal helps startups, businesses, educational institutions, NGOs, and enterprises
            build exceptional digital products through modern technology, outstanding UI/UX, and
            reliable project delivery.
          </p>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-flag px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-red transition-transform hover:scale-105 sm:w-auto sm:px-6"
            >
              Get Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto sm:px-6"
            >
              <FolderGit2 className="h-4 w-4 text-secondary" />
              View Portfolio
            </a>
          </div>

          <ul className="mt-8 hidden flex-wrap gap-2 sm:flex">
            {badges.map((b) => (
              <li
                key={b.label}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/80 sm:px-3.5"
              >
                <b.icon className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right (hidden on small screens to reduce clutter) */}
        <div className="relative z-10 hidden md:flex justify-center md:justify-end">
          <div className="animate-float glass relative w-full max-w-sm rounded-3xl p-3 shadow-elegant sm:p-6">
            <div className="rounded-2xl bg-background/40 p-5 text-center sm:p-6">
              <p className="font-display text-base font-bold text-foreground sm:text-lg">
                Proudly Made in Nepal
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Nepalese talent. Global development standards.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center sm:gap-3">
              {[
                { v: "50+", l: "Projects" },
                { v: "7+", l: "Countries" },
                { v: "98%", l: "Satisfaction" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-background/50 px-1 py-2.5">
                  <div className="font-display text-base font-bold text-secondary">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* mountains */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        className="hero-bg pointer-events-none absolute inset-0 z-0 h-full w-full max-w-none select-none object-cover object-[center_bottom] opacity-60 sm:object-[center_70%] sm:opacity-80 lg:object-center lg:opacity-90"
      />
    </section>
  );
}
