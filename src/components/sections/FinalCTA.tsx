import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import vendingMachine from "@/assets/vending-machine.webp";

const LOCATION_TYPES = [
  "Office / Corporate",
  "Gym / Fitness Centre",
  "University / School",
  "Airport / Transport Hub",
  "Hospital / Healthcare",
  "Hotel / Hospitality",
  "Retail / Shopping",
  "Other",
];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  locationType: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  locationType: "",
  message: "",
};

function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.company.trim()) next.company = "Company is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.locationType) next.locationType = "Please select a location type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Simulate async submission
    setTimeout(() => setStatus("sent"), 1800);
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display font-bold text-2xl text-foreground">Message received!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setStatus("idle"); }}
          className="mt-2 text-xs text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name + Company */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.name}>
          <input
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="Company" required error={errors.company}>
          <input
            type="text"
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputCls(!!errors.company)}
          />
        </Field>
      </div>

      {/* Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            placeholder="jane@acme.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls(!!errors.email)}
          />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input
            type="tel"
            placeholder="+1 555 000 0000"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls(false)}
          />
        </Field>
      </div>

      {/* Location type */}
      <Field label="Location Type" required error={errors.locationType}>
        <select
          value={form.locationType}
          onChange={(e) => set("locationType", e.target.value)}
          className={selectCls(!!errors.locationType)}
        >
          <option value="" disabled>Select your space…</option>
          {LOCATION_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Message / Notes" error={errors.message}>
        <textarea
          rows={4}
          placeholder="Tell us about your space, number of employees, or anything else…"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputCls(false)} resize-none`}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium glow-orange hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-foreground/80">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  [
    "w-full rounded-xl px-4 py-2.5 text-sm bg-background/60 border text-foreground placeholder:text-muted-foreground/60",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
    hasError ? "border-destructive/70" : "border-border hover:border-primary/40",
  ].join(" ");

const selectCls = (hasError: boolean) =>
  [
    inputCls(hasError),
    "appearance-none cursor-pointer",
  ].join(" ");

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-hero px-5 sm:px-6 md:px-10 py-24 sm:py-32"
    >
      <div className="absolute inset-0 grain" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* animated glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[160px] pointer-events-none"
      />

      {/* Background machine */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
        whileInView={{ scale: 1, opacity: 0.12, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-sm md:max-w-lg pointer-events-none"
      >
        <img src={vendingMachine} alt="" className="w-full" loading="lazy" decoding="async" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — headline */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.4em] text-primary uppercase"
            >
              The Future Starts Here
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.0] text-gradient"
            >
              The future of{" "}
              <span className="text-gradient-orange">smart vending</span>{" "}
              starts here.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Deploy a SnackUP machine in your space and turn every break into
              a premium experience. Fill in the form and we'll be in touch
              within one business day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 flex flex-col gap-3 items-center lg:items-start text-sm text-muted-foreground"
            >
              {[
                { label: "Email", value: "Info@snackupvending.com" },
                // { label: "Sales", value: "sales@snackup.vending" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground/70">{label}:</span>
                  <a
                    href={`mailto:${value}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6">
              <h3 className="font-display font-bold text-xl text-foreground">Get in touch</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Fields marked <span className="text-primary">*</span> are required.
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer / Copyright */}
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground/60">
          <p className="tracking-[0.3em] uppercase">
            SNACKUP VENDING &bull; <br /> SNACK MORE &bull; LIVE MORE
          </p>
          <p className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} SnackUP Vending. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:Info@snackupvending.com" className="hover:text-muted-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a href="mailto:Info@snackupvending.com" className="hover:text-muted-foreground transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
