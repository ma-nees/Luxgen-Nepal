import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms - LuxGen Nepal" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold text-secondary shadow-sm transition-colors hover:bg-muted hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          These terms explain how visitors and clients may use LuxGen Nepal's website, login flow,
          consultation form, and digital service request features.
        </p>

        <div className="mt-8 grid gap-4 text-sm leading-relaxed text-muted-foreground">
          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Use of the Website</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Provide accurate information when submitting a consultation request.</li>
              <li>Use the website only for lawful business or project inquiries.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Consultations</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Free consultations are provided for project discovery.</li>
              <li>Pricing, timeline, and scope are estimates until confirmed in writing.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Account Access</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Google login may be used to confirm identity before form submission.</li>
              <li>Admin features are restricted to approved LuxGen accounts only.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Content and Changes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>LuxGen Nepal may update website content, service details, and terms.</li>
              <li>Continued website use means you accept the latest version.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
