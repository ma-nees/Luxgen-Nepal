import { Github, Linkedin, Sparkles, Twitter } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Team() {
  const {
    content: { team },
  } = useSiteContent();
  const teamGridWidth =
    team.length <= 1
      ? "sm:max-w-xs"
      : team.length === 2
        ? "sm:max-w-xl"
        : team.length === 3
          ? "sm:max-w-3xl"
          : "sm:max-w-5xl";

  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-56 bg-gradient-to-b from-muted to-background sm:block"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Team"
          title="The people behind LuxGen Nepal"
          subtitle="A passionate team of Nepalese designers, engineers, and strategists."
          className="lg:max-w-3xl"
        />
        <div className="mx-auto mt-4 hidden max-w-xl items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow-soft backdrop-blur sm:flex">
          <Sparkles className="h-4 w-4 text-primary" />
          Design sense, engineering discipline, and direct founder-led delivery.
        </div>

        <div
          className={cn(
            "scrollbar-none -mx-4 mt-7 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 sm:hidden",
          )}
        >
          {team.map((m, i) => (
            <Reveal
              key={m.id}
              delay={i * 60}
              className="flex w-[46vw] min-w-[9.75rem] max-w-[11.5rem] shrink-0 snap-start"
            >
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>

        <div
          className={cn(
            "mx-auto mt-10 hidden flex-wrap justify-center gap-4 sm:flex lg:gap-5",
            teamGridWidth,
          )}
        >
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 60} className="flex w-56 lg:w-60">
              <TeamCard member={m} compactDesktop />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type TeamMember = ReturnType<typeof useSiteContent>["content"]["team"][number];

function TeamCard({
  member: m,
  compactDesktop = false,
}: {
  member: TeamMember;
  compactDesktop?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-border bg-card p-3 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-elegant sm:p-4",
        compactDesktop && "sm:min-h-[204px] sm:p-4 lg:min-h-[216px] lg:p-5",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/10 to-transparent"
        aria-hidden="true"
      />
      {m.photo ? (
        <img
          src={m.photo}
          alt={m.name}
          className={cn(
            "relative mx-auto h-12 w-12 rounded-full border-4 border-background object-cover shadow-glow-red sm:h-16 sm:w-16",
            compactDesktop && "sm:h-16 sm:w-16 lg:h-20 lg:w-20",
          )}
        />
      ) : (
        <div
          className={cn(
            "relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-gradient-flag text-base font-bold text-primary-foreground shadow-glow-red sm:h-16 sm:w-16 sm:text-lg",
            compactDesktop && "sm:h-16 sm:w-16 sm:text-lg lg:h-20 lg:w-20",
          )}
        >
          {initials(m.name)}
        </div>
      )}
      <h3 className="mt-2 font-display text-sm font-bold text-foreground sm:mt-3 sm:text-base lg:text-lg">
        {m.name}
      </h3>
      <p className="mt-1 text-xs font-medium text-secondary sm:text-sm">{m.role}</p>
      {(m.linkedinUrl || m.githubUrl || m.twitterUrl) && (
        <div className="mt-3 flex justify-center gap-1.5 sm:mt-4 sm:gap-2">
          {m.linkedinUrl && (
            <a
              href={m.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${m.name} LinkedIn`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:bg-gradient-flag hover:text-primary-foreground sm:h-8 sm:w-8"
            >
              <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          )}
          {m.githubUrl && (
            <a
              href={m.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${m.name} GitHub`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:bg-gradient-flag hover:text-primary-foreground sm:h-8 sm:w-8"
            >
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          )}
          {m.twitterUrl && (
            <a
              href={m.twitterUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${m.name} Twitter`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:bg-gradient-flag hover:text-primary-foreground sm:h-8 sm:w-8"
            >
              <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
