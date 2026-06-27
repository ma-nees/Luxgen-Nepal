import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";

export function Footer() {
  const {
    content: { companyLinks, footerGroups },
  } = useSiteContent();

  const socialLinks = [
    { label: "LinkedIn", href: companyLinks.linkedinUrl, Icon: Linkedin },
    { label: "Facebook", href: companyLinks.facebookUrl, Icon: Facebook },
    { label: "Instagram", href: companyLinks.instagramUrl, Icon: Instagram },
    { label: "GitHub", href: companyLinks.githubUrl, Icon: Github },
  ].filter((link) => link.href);

  return (
    <footer className="bg-nepal-slate text-background">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <img
              src="/luxgen-logo.png"
              alt="LuxGen Nepal"
              className="h-12 w-auto max-w-[150px] rounded-md bg-white object-contain sm:h-16 sm:max-w-[180px]"
            />
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-sm">
              From the Himalayas to the World — building the future, one digital solution at a time.
            </p>
            <p className="mt-3 text-xs font-semibold text-white sm:mt-4 sm:text-sm">
              Proudly Made in Nepal
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/60 sm:text-xs">
              Serving: Nepal • India • USA • UK • Australia • Middle East
            </p>
            <div className="mt-4 flex gap-2.5 sm:mt-5 sm:gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LuxGen Nepal ${label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-gradient-flag sm:h-9 sm:w-9"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-bold uppercase text-white sm:text-sm">{g.title}</h4>
              <ul className="mt-2.5 space-y-1.5 sm:mt-4 sm:space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.href || "#"}
                      className="text-xs leading-snug text-white/70 transition-colors hover:text-white sm:text-sm"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-center text-xs text-white/60 sm:mt-12 sm:flex-row sm:gap-3 sm:pt-6 sm:text-left sm:text-sm">
          <p>© {new Date().getFullYear()} LuxGen Nepal. All rights reserved.</p>
          <p>Built with passion in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
