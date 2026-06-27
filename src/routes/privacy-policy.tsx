import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{ title: "Privacy Policy - LuxGen Nepal" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
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
        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This policy describes how LuxGen Nepal handles information submitted through the website,
          Google login, and consultation form.
        </p>

        <div className="mt-8 grid gap-4 text-sm leading-relaxed text-muted-foreground">
          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">
              Information We Collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Name, email address, phone number, and company name.</li>
              <li>Selected service, budget range, and project details.</li>
              <li>Google account email when you choose to login.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">
              How We Use Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Respond to consultation requests and project inquiries.</li>
              <li>Understand service needs and improve LuxGen Nepal offerings.</li>
              <li>Protect admin-only website features from misuse.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Google Login</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Google login verifies the account submitting a consultation request.</li>
              <li>Firebase will handle authentication through Google's secure sign-in flow.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-background p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-foreground">Data Sharing</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>We do not sell personal information.</li>
              <li>Information is shared only when needed to deliver requested services.</li>
              <li>Information may be used to comply with law or protect the website.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
