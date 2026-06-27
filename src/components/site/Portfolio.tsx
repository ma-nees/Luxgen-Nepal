import { useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { defaultSiteContent, useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const INITIAL_VISIBLE = 6;
const defaultImageById = new Map(
  defaultSiteContent.portfolioProjects.map((project) => [project.id, project.image]),
);

function ImageWithPlaceholder({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export function Portfolio() {
  const [showAll, setShowAll] = useState(false);
  const {
    content: { portfolioProjects },
  } = useSiteContent();

  const visibleProjects = showAll ? portfolioProjects : portfolioProjects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="portfolio" className="bg-muted py-10 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Work that delivers results"
          subtitle="A selection of products we've built for startups, businesses, schools, and NGOs."
        />
        <div className="scrollbar-none -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-auto sm:mt-14 sm:grid sm:max-w-6xl sm:snap-none sm:grid-cols-2 sm:items-stretch sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-3">
          {visibleProjects.map((p, i) => {
            const imageSrc = p.image || defaultImageById.get(p.id);

            return (
              <Reveal
                key={p.id ?? p.title}
                delay={i * 60}
                className="flex w-[60vw] min-w-[13rem] max-w-[15.5rem] shrink-0 snap-start sm:h-full sm:w-auto sm:min-w-0 sm:max-w-none sm:flex-1 sm:flex-col"
              >
                <article className="group flex h-[19rem] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-elegant hover:ring-primary/10 sm:h-[28rem] sm:rounded-3xl lg:h-[29rem] xl:h-[28rem]">
                  <div className={`relative shrink-0 overflow-hidden ${p.grad} p-2.5 sm:p-4`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl">
                      {imageSrc && (
                        <ImageWithPlaceholder src={imageSrc} alt={`${p.title} project preview`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                      <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
                      <span className="absolute bottom-3 left-3 z-10 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur sm:bottom-4 sm:left-4">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col p-3.5 sm:p-6 lg:p-6">
                    <h3
                      className="flex items-start justify-between gap-3 overflow-hidden text-base font-bold text-foreground sm:text-lg lg:text-xl xl:text-lg"
                      style={{
                        WebkitLineClamp: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {p.title}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p
                      className="mt-2 overflow-hidden text-sm font-medium text-secondary"
                      style={{
                        WebkitLineClamp: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {p.result}
                    </p>
                    {(p.githubUrl || p.liveUrl) && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-3 sm:pt-5">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${p.title} GitHub repository`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                          >
                            <Github className="h-3.5 w-3.5" />
                            GitHub
                          </a>
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${p.title} live website`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-flag px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow-red transition-transform hover:scale-105"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {portfolioProjects.length > INITIAL_VISIBLE && (
          <div className="mt-5 flex justify-center sm:mt-8">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
              aria-expanded={showAll}
            >
              {showAll ? "View less" : `View more (${portfolioProjects.length - INITIAL_VISIBLE})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
