import { useEffect, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import contactPattern from "@/assets/img/nepali-contact-pattern.png";
import {
  addContactSubmission,
  updateContactSubmissionEmailStatus,
} from "@/lib/contact-submissions";
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
const budgets = ["< Rs. 50k", "Rs. 50k - 2L", "Rs. 2L - 5L", "Rs. 5L+", "Not sure yet"];

const inputClass =
  "w-full rounded-xl border border-border bg-background/95 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 sm:px-4 sm:py-3";
const selectClass = `${inputClass} cursor-pointer appearance-none pr-12`;

const CONTACT_DRAFT_STORAGE_KEY = "luxgen-contact-form-draft";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SUBMIT_TIMEOUT_MS = 15000;

type ContactFormDraft = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  details: string;
};

const emptyContactDraft: ContactFormDraft = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  details: "",
};

function readContactDraft() {
  if (typeof window === "undefined") return emptyContactDraft;

  try {
    const raw = window.localStorage.getItem(CONTACT_DRAFT_STORAGE_KEY);
    return raw
      ? { ...emptyContactDraft, ...(JSON.parse(raw) as Partial<ContactFormDraft>) }
      : emptyContactDraft;
  } catch {
    return emptyContactDraft;
  }
}

function saveContactDraft(draft: ContactFormDraft) {
  window.localStorage.setItem(CONTACT_DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

function withTimeout<T>(promise: Promise<T>, message: string) {
  return new Promise<T>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(message)), SUBMIT_TIMEOUT_MS);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => window.clearTimeout(timeout));
  });
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ContactFormDraft>(emptyContactDraft);

  useEffect(() => {
    setDraft(readContactDraft());
  }, []);

  const updateDraft = (patch: Partial<ContactFormDraft>) => {
    setDraft((current) => {
      const next = { ...current, ...patch };
      saveContactDraft(next);
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let savedSubmissionId = "";

    try {
      const submission = await withTimeout(
        addContactSubmission({
          ...draft,
          accountEmail: draft.email,
        }),
        "Saving the message took too long.",
      );
      savedSubmissionId = submission.id;

      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("Missing EmailJS environment variables.");
      }

      const submittedAt = new Date().toLocaleString();

      await withTimeout(
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: draft.name,
            email: draft.email,
            reply_to: draft.email,
            from_email: draft.email,
            phone: draft.phone || "Not provided",
            company: draft.company || "Not provided",
            service: draft.service,
            budget: draft.budget,
            details: draft.details,
            message: draft.details,
            time: submittedAt,
            submitted_at: submittedAt,
          },
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          },
        ),
        "Sending the email took too long.",
      );

      await withTimeout(
        updateContactSubmissionEmailStatus(submission.id, "sent"),
        "Updating the email status took too long.",
      ).catch((error) => {
        console.warn("Message email sent, but Firestore emailStatus was not updated.", error);
      });

      setDraft(emptyContactDraft);
      window.localStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY);
      toast.success("Thanks! We'll get back to you within 24 hours.");
    } catch (error) {
      console.error("Contact form submission failed", error);

      if (savedSubmissionId) {
        await withTimeout(
          updateContactSubmissionEmailStatus(savedSubmissionId, "failed"),
          "Updating the email status took too long.",
        ).catch(() => undefined);
        toast.error("Your message was saved, but the email notification failed.");
      } else {
        toast.error("Could not save your message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-background py-10 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold uppercase text-secondary">
            Contact
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Let's build something <span className="text-gradient-flag">great together</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Tell us about your project and get a free consultation. We avilable respond within 24/7
            hours.
          </p>

          <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            {[
              { icon: Mail, label: "Email", value: "luxgen.stup@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 8423323060,+977 9811115861" },
              {
                icon: MapPin,
                label: "Office",
                value: "SiddrathNagar Head Office, Rupandehi, Nepal",
              },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3 sm:items-center sm:gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground shadow-glow-red sm:h-11 sm:w-11">
                  <c.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="break-words font-semibold text-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border shadow-soft sm:block">
            <iframe
              title="LuxGen Nepal office location"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6617.014121100159!2d83.45184065573481!3d27.503345714098153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssiddrathnagarnepal!5e1!3m2!1sen!2sin!4v1780748675175!5m2!1sen!2sin"
              className="h-56 w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-4 shadow-elegant sm:rounded-3xl sm:p-7 md:p-8">
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${contactPattern})` }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 bg-card/25" aria-hidden="true" />

            <form onSubmit={onSubmit}>
              <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-4">
                <input
                  required
                  name="name"
                  placeholder="Full name"
                  value={draft.name}
                  onChange={(event) => updateDraft({ name: event.target.value })}
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={draft.email}
                  onChange={(event) => updateDraft({ email: event.target.value })}
                  className={inputClass}
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={draft.phone}
                  onChange={(event) => updateDraft({ phone: event.target.value })}
                  className={inputClass}
                />
                <input
                  name="company"
                  placeholder="Company name"
                  value={draft.company}
                  onChange={(event) => updateDraft({ company: event.target.value })}
                  className={inputClass}
                />
                <div className="relative">
                  <select
                    required
                    name="service"
                    value={draft.service}
                    onChange={(event) => updateDraft({ service: event.target.value })}
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Service needed
                    </option>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="relative">
                  <select
                    required
                    name="budget"
                    value={draft.budget}
                    onChange={(event) => updateDraft({ budget: event.target.value })}
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Budget range
                    </option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <textarea
                required
                name="details"
                rows={4}
                placeholder="Project details"
                value={draft.details}
                onChange={(event) => updateDraft({ details: event.target.value })}
                className={`relative mt-3 h-24 ${inputClass} resize-none sm:mt-4 sm:h-auto`}
              />
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-flag px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow-red transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5 sm:px-6 sm:py-3.5"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
