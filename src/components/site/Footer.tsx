import { Linkedin, Facebook, Instagram, Github, Mountain } from "lucide-react";

const groups = [
  { title: "Services", links: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Solutions", "AI & Automation"] },
  { title: "Company", links: ["About", "Portfolio", "Pricing", "Blog", "Contact"] },
  { title: "Topics", links: ["Web Development", "Cloud Computing", "UI/UX Design", "Startup Growth", "Tech Trends"] },
];

export function Footer() {
  return (
    <footer className="bg-nepal-slate text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground">
                <Mountain className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-white">LuxGen Nepal</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              From the Himalayas to the World — building the future, one digital
              solution at a time.
            </p>
            <p className="mt-4 text-sm font-semibold text-white">Proudly Made in Nepal</p>
            <p className="mt-1 text-xs text-white/60">
              Serving: Nepal • India • USA • UK • Australia • Middle East
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Facebook, Instagram, Github].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-gradient-flag"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">{g.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} LuxGen Nepal. All rights reserved.</p>
          <p>Built with passion in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}