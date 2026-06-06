import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

const services = [
  "Website Development",
  "Mobile App Development",
  "UI/UX Design",
  "Software Development",
  "Cloud Solutions",
  "E-Commerce",
  "AI & Automation",
  "Other",
];
const budgets = ["< Rs. 50k", "Rs. 50k – 2L", "Rs. 2L – 5L", "Rs. 5L+", "Not sure yet"];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! We'll get back to you within 24 hours.");
    }, 800);
  };

  return (
    <section id="contact" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
            Contact
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Let's build something <span className="text-gradient-flag">great together</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell us about your project and get a free consultation. We typically
            respond within 24 hours.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@luxgennepal.com" },
              { icon: Phone, label: "Phone", value: "+977 1 4000 000" },
              { icon: MapPin, label: "Office", value: "Kathmandu, Nepal" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground shadow-glow-red">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  <div className="font-semibold text-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-soft">
            <iframe
              title="LuxGen Nepal office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=85.28%2C27.66%2C85.37%2C27.74&layer=mapnik&marker=27.7,85.33"
              className="h-56 w-full"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-7 shadow-elegant md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Full name" className={inputClass} />
              <input required type="email" name="email" placeholder="Email" className={inputClass} />
              <input name="phone" placeholder="Phone" className={inputClass} />
              <input name="company" placeholder="Company name" className={inputClass} />
              <select required name="service" defaultValue="" className={inputClass}>
                <option value="" disabled>Service needed</option>
                {services.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select required name="budget" defaultValue="" className={inputClass}>
                <option value="" disabled>Budget range</option>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <textarea
              required
              name="details"
              rows={4}
              placeholder="Project details"
              className={`mt-4 ${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-flag px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-red transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <Send className="h-4 w-4" />}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}