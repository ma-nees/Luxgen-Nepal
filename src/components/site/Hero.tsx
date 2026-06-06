import {
  MapPin,
  Zap,
  Gem,
  Handshake,
  Globe,
  ArrowRight,
  FolderGit2,
} from "lucide-react";
import heroBg from "@/assets/himalaya-hero.jpg";

const badges = [
  { icon: MapPin, label: "Proudly Built in Nepal" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Gem, label: "Premium Quality" },
  { icon: Handshake, label: "Customer First" },
  { icon: Globe, label: "Serving Global Clients" },
];

const FLAG_GIF =
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhp8Tmdtl-RZ_-JLc-y9y88jsCZhaDW-TKuEGDlxGFDVLaUsHVQv_Og-7yX9vEoJtF8LGHbNqvYZFFeXCbuOCWuoP11RqfZLWsY8eOZW9eJL2NNpdw8BHJ7NvCeK3pxPCCnYoBEX43g-PY/s1600-e90-rw/Flag_of_Nepal.gif";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-sky pt-28 pb-20 md:pt-36 md:pb-28">
      {/* accent lighting */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left */}
        <div className="relative z-10 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold text-secondary backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            From the Himalayas to the World
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Affordable IT Solutions with{" "}
            <span className="text-gradient-flag">Global Standards</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            LuxGen Nepal helps startups, businesses, educational institutions, NGOs,
            and enterprises build exceptional digital products through modern
            technology, outstanding UI/UX, and reliable project delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-flag px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-red transition-transform hover:scale-105"
            >
              Get Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <FolderGit2 className="h-4 w-4 text-secondary" />
              View Portfolio
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
              >
                <b.icon className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="animate-float glass relative w-full max-w-sm rounded-3xl p-6 shadow-elegant">
            <div className="overflow-hidden rounded-2xl bg-background/40 p-6">
              <img
                src={FLAG_GIF}
                alt="Flag of Nepal waving"
                className="mx-auto h-48 w-auto object-contain drop-shadow-xl"
                width={320}
                height={260}
              />
            </div>
            <div className="mt-5 text-center">
              <p className="text-lg font-bold text-foreground">Proudly Made in Nepal</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Nepalese talent. Global development standards.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { v: "50+", l: "Projects" },
                { v: "7+", l: "Countries" },
                { v: "98%", l: "Satisfaction" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-background/50 py-2.5">
                  <div className="text-base font-bold text-secondary">{s.v}</div>
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
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 w-full select-none opacity-90 [mask-image:linear-gradient(to_top,black,transparent_85%)]"
      />
    </section>
  );
}