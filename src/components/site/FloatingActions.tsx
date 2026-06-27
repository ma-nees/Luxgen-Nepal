import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5 sm:gap-3">
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-elegant transition-transform hover:scale-110 sm:h-14 sm:w-14"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
      <a
        href="https://wa.me/918423323060?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-flag text-primary-foreground shadow-glow-red transition-transform hover:scale-110 sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
