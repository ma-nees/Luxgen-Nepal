import { useEffect, useState } from "react";
import { Menu, UserCircle, X } from "lucide-react";
import { useGoogleAuth } from "@/lib/google-auth";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_LINK =
  "https://wa.me/9779811115861?text=Hi%20LuxGen%20Nepal%2C%20I%20want%20a%20free%20consultation.";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useGoogleAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft" : "glass/70",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center">
          <img
            src="/luxgen-logo.png"
            alt="LuxGen Nepal"
            className="h-10 w-auto max-w-[140px] object-contain"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-secondary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/login"
            aria-label={user ? `Signed in as ${user.email}` : "Login"}
            title={user ? user.email : "Login"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/75 text-foreground/80 transition-colors hover:bg-muted hover:text-secondary"
          >
            <UserCircle className="h-5 w-5" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg bg-gradient-flag px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow-red transition-transform hover:scale-105 sm:inline-block"
          >
            Get Free Consultation
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/80 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-secondary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-secondary"
              >
                <UserCircle className="h-4 w-4" />
                {user ? user.email : "Login"}
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-gradient-flag px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Get Free Consultation
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
