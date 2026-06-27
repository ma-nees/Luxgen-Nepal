import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase text-secondary sm:px-4 sm:py-1.5 sm:text-xs">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-xl font-bold leading-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 hidden text-sm leading-relaxed text-muted-foreground sm:block sm:text-base md:mt-4 md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
