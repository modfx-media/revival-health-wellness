"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  Phone,
  ScanFace,
  Sparkles,
} from "lucide-react";
import { telHref } from "@/lib/content/clinics";
import GoogleReviewsSection from "@/components/lp/GoogleReviewsSection";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE = "+1 725-257-5596";
const BOOKING_URL =
  "https://revivalhealth.zenoti.com/webstoreNew/services/2227b344-503a-4b8c-bdcf-314448f38e2f";

const NEXT_STEPS = [
  {
    icon: Phone,
    title: "We'll call you shortly",
    text: "A member of our medical team will reach out within 1 business day to confirm your details.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule your visit",
    text: "We'll find an appointment time that works for your schedule at our Summerlin/NW location.",
  },
  {
    icon: ScanFace,
    title: "Aura 3D Facial Analysis",
    text: "Your free consultation starts with an advanced Aura 3D Facial Analysis, so your XERF plan is built around your own skin.",
  },
];

const KEY_BENEFITS = [
  "No needles, no numbing, no downtime",
  "Boosts collagen & elastin naturally",
  "FDA-cleared radiofrequency technology",
  "No volume added - no \u201cpillow face\u201d",
];

/** Thank-you page shown after the XERF offer lead form is submitted. */
export default function XerfThankYouContent() {
  return (
    <>
      {/* ═══════════════════════ CONFIRMATION HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-revival-dark py-20 lg:py-28">
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-revival-gold/15 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-revival-gold/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-revival-gold/10"
          >
            <CheckCircle2 className="h-10 w-10 text-revival-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-7 font-heading text-3xl text-white sm:text-4xl"
          >
            You&apos;re all set, thank you!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-4 text-lg font-light leading-relaxed text-revival-cream/75"
          >
            Your request for a free XERF consultation and Aura 3D Facial
            Analysis has been received. Here&apos;s what happens next.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.3 },
              },
            }}
            className="mt-12 grid grid-cols-1 gap-5 text-center sm:grid-cols-3 lg:text-left"
          >
            {NEXT_STEPS.map((step) => (
              <motion.div
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="rounded-2xl border border-revival-gold/20 bg-white/[0.03] p-6"
              >
                <step.icon className="mx-auto h-6 w-6 text-revival-gold lg:mx-0" />
                <h3 className="mt-4 font-heading text-lg text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-cream/70">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="mt-12"
          >
            <p className="text-sm text-revival-cream/60">
              Want to lock in your visit right now?
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform hover:scale-[1.04]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book My Appointment Now
            </a>
            <p className="mt-6 text-sm text-revival-cream/60">
              Need to reach us sooner? Call or text us directly:
            </p>
            <a
              href={telHref(PHONE)}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-revival-gold/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-gold transition-colors hover:bg-revival-gold/10"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ WHILE YOU WAIT ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-tagline text-xs text-revival-gold">
              While You Wait
            </span>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl">
              A quick reminder of what XERF delivers.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {KEY_BENEFITS.map((b) => (
              <motion.div
                key={b}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="flex items-start justify-center gap-3 rounded-2xl border border-revival-gold/15 bg-white px-5 py-4 lg:justify-start"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-revival-gold" />
                <p className="text-sm font-light leading-relaxed text-revival-charcoal/80">
                  {b}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GoogleReviewsSection limit={3} treatment="XERF" />
    </>
  );
}
