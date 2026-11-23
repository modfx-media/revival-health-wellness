"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  Phone,
  Sparkles,
  Star,
  UserCheck,
} from "lucide-react";
import { telHref } from "@/lib/content/clinics";
import { reportPhoneClickConversion } from "@/lib/adsConversion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULT_PHONE = "+1 725-334-7214";
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
    text: "We'll find a same-week appointment time that works for your schedule.",
  },
  {
    icon: Sparkles,
    title: "Meet your provider",
    text: "Your free, confidential consultation covers your goals and a personalized P-Long\u00ae plan.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I was skeptical, but the free consultation had zero pressure. Six months later, my length is up nearly an inch and my confidence is back for the first time in years.",
    author: "Michael R.",
    initials: "MR",
    city: "Las Vegas, NV",
    tag: "Length gain",
  },
  {
    quote:
      "I looked at surgery. Once I heard the risks, I found Revival's P-Long protocol. No scalpel, no downtime, and real, measurable results. Best decision I've made.",
    author: "Jason T.",
    initials: "JT",
    city: "Henderson, NV",
    tag: "Non-surgical",
  },
  {
    quote:
      "The team treated me like family. Private, professional, and honest about what to expect. My girth improved and so did my erections. Worth every second.",
    author: "David L.",
    initials: "DL",
    city: "Summerlin, NV",
    tag: "Girth & performance",
  },
];

/** Thank-you page shown after the P-Long lead form is submitted. */
export default function ThankYouContent({
  phone = DEFAULT_PHONE,
  trackCallConversion = false,
}: {
  phone?: string;
  trackCallConversion?: boolean;
} = {}) {
  const onCallClick = trackCallConversion
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        reportPhoneClickConversion(phone);
      }
    : undefined;

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
            Your request for a free, confidential P-Long&reg; consultation has{" "}
            been received. Here&apos;s what happens next.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.3 },
              },
            }}
            className="mt-12 grid grid-cols-1 gap-5 text-left sm:grid-cols-3"
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
                <step.icon className="h-6 w-6 text-revival-gold" />
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
              Need to reach us sooner? Call us directly:
            </p>
            <a
              href={telHref(phone)}
              onClick={onCallClick}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-revival-gold/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-gold transition-colors hover:bg-revival-gold/10"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-tagline text-xs text-revival-gold">
              Real Stories
            </span>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl">
              Real stories from real Las Vegas patients.
            </h2>
            <p className="mt-4 text-sm font-light text-revival-charcoal/70">
              While you wait for our call, here&apos;s what other men have
              experienced after their own free consultation.
            </p>
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
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <motion.figure
                key={t.author}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="flex h-full flex-col rounded-[1.5rem] border border-revival-gold/15 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-revival-gold text-revival-gold"
                      />
                    ))}
                  </span>
                  <span className="rounded-full bg-revival-gold/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-revival-gold">
                    {t.tag}
                  </span>
                </div>
                <blockquote className="mt-4 flex-1 text-sm font-light italic leading-relaxed text-revival-charcoal/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-revival-gold/15 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light font-heading text-sm font-semibold text-revival-dark">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-revival-dark">
                      {t.author}
                    </p>
                    <p className="text-[0.7rem] uppercase tracking-[0.14em] text-revival-charcoal/60">
                      {t.city}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ PROVIDER PROFILE ═══════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-revival-gold/15 bg-revival-warm-white p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-revival-gold/20 bg-white"
            >
              <Image
                src="/images/about/team/radford-raquedan.png"
                alt="Radford Raquedan, Nurse Practitioner at Revival Health & Wellness"
                fill
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="object-cover object-top"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-dark shadow">
                <UserCheck className="mr-1 inline h-3 w-3 text-revival-gold" />
                3,400+ patients helped
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="text-tagline text-xs text-revival-gold"
              >
                Meet Your Provider
              </motion.span>
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="mt-3 font-heading text-3xl text-revival-dark sm:text-4xl"
              >
                Radford Raquedan,{" "}
                <span className="text-revival-gold">NP</span>
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="mt-4 text-sm font-light leading-relaxed text-revival-charcoal/75"
              >
                Radford has dedicated over a decade to men&rsquo;s health,
                specializing in hormone optimization, sexual wellness, and
                regenerative therapies. At your free consultation, his goal is
                simple:{" "}
                <span className="font-semibold text-revival-dark">
                  listen, understand your goals, and design a real plan.
                </span>
              </motion.p>
              <motion.ul
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-2"
              >
                {[
                  "10+ yrs clinical practice",
                  "Nurse Practitioner (NP)",
                  "P-Long\u00ae certified provider",
                  "Hormone optimization expert",
                  "Sexual wellness focus",
                  "Discreet, judgement-free care",
                ].map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 text-sm text-revival-charcoal/80"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-revival-gold" />
                    {c}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="mt-7 grid grid-cols-3 gap-4 border-t border-revival-gold/15 pt-6"
              >
                {[
                  { v: "10+", l: "Years" },
                  { v: "3.4k+", l: "Patients" },
                  { v: "4.9\u2605", l: "Rated" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="font-heading text-2xl text-revival-dark">
                      {s.v}
                    </p>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/60">
                      {s.l}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
