import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Portfolio } from "@/components/site/Portfolio";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/portfolio-test")({
  head: () => ({
    meta: [{ title: "Portfolio test — LuxGen" }],
  }),
  component: PortfolioTest,
});

function PortfolioTest() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Portfolio />
        </div>
      </main>
      <Footer />
    </div>
  );
}
