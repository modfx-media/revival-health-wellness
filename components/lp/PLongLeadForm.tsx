"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, User, Mail, Phone } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
};

const EMPTY: FormState = { name: "", phone: "", email: "" };

/**
 * Lead-capture form for the P-Long ads landing page.
 *
 * UI-only for now (no backend/CRM wired up yet) — on valid submit it
 * simulates a brief send delay, then routes to the dedicated thank-you page.
 */
export default function PLongLeadForm({ id }: { id?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(v: FormState): Partial<FormState> {
    const next: Partial<FormState> = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!/^[\d\s()+-]{7,}$/.test(v.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
      next.email = "Please enter a valid email.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // TODO: wire to CRM/webhook. For now this is UI-only per client request.
    window.setTimeout(() => {
      router.push("/lp/p-long/thank-you/");
    }, 700);
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="relative space-y-4 rounded-[1.75rem] border border-revival-gold/25 bg-revival-dark/60 p-6 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8"
    >
      <div>
        <p className="text-tagline text-xs text-revival-gold">Free Consultation</p>
        <h3 className="mt-2 font-heading text-2xl text-white">
          Claim your P-Long® consultation
        </h3>
        <p className="mt-2 text-sm font-light text-revival-cream/70">
          Tell us how to reach you - a member of our medical team will follow
          up to schedule your free, confidential consultation.
        </p>
      </div>

      <Field
        icon={User}
        label="Full name"
        value={values.name}
        error={errors.name}
        onChange={(v) => setValues((s) => ({ ...s, name: v }))}
        type="text"
        autoComplete="name"
        placeholder="John Smith"
      />
      <Field
        icon={Phone}
        label="Phone number"
        value={values.phone}
        error={errors.phone}
        onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
        type="tel"
        autoComplete="tel"
        placeholder="(702) 555-0123"
      />
      <Field
        icon={Mail}
        label="Email address"
        value={values.email}
        error={errors.email}
        onChange={(v) => setValues((s) => ({ ...s, email: v }))}
        type="email"
        autoComplete="email"
        placeholder="you@email.com"
      />

      <motion.button
        type="submit"
        disabled={submitting}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="group relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Get My Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </motion.button>

      <p className="flex items-center justify-center gap-1.5 text-center text-[0.7rem] text-revival-cream/50">
        <Lock className="h-3 w-3" />
        100% confidential. No obligation.
      </p>
    </form>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  error,
  onChange,
  type,
  autoComplete,
  placeholder,
}: {
  icon: typeof User;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type: string;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-revival-cream/60">
        {label}
      </span>
      <span className="relative flex items-center">
        <Icon className="pointer-events-none absolute left-4 h-4 w-4 text-revival-gold/70" />
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white placeholder:text-revival-cream/30 outline-none transition-colors focus:border-revival-gold"
        />
      </span>
      {error ? <span className="mt-1.5 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
