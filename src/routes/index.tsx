import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Features } from "@/components/site/Features";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { Portfolio } from "@/components/site/Portfolio";
import { NepalPresence } from "@/components/site/NepalPresence";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LuxGen Nepal — Affordable IT Solutions with Global Standards" },
      {
        name: "description",
        content:
          "LuxGen Nepal builds premium websites, mobile apps, and software. Proudly built in Nepal, serving clients globally with on-time delivery and global quality standards.",
      },
      { property: "og:title", content: "LuxGen Nepal — From the Himalayas to the World" },
      {
        property: "og:description",
        content:
          "Premium IT services from Nepal: web & mobile development, UI/UX, cloud, and digital transformation for startups and enterprises worldwide.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <Features />
        <Services />
        <Process />
        <About />
        <Stats />
        <Portfolio />
        <NepalPresence />
        <Pricing />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" richColors />
    </div>
  );
}
