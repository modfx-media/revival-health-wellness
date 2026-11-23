"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Gift,
  Handshake,
  HeartPulse,
  Phone,
  Play,
  Ruler,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Timer,
  X,
} from "lucide-react";
import { CLINICS, telHref } from "@/lib/content/clinics";
import LeadFormModal from "@/components/lp/LeadFormModal";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE = CLINICS[0].phones[0];
const YOUTUBE_ID = "ZiuqW8CYkuA";
const CTA_LABEL = "Claim My Free Consultation";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Stats pulled from the P-Long clinical study, matching /p-long/'s content.
const STATS = [
  { value: "100%", label: "Reported increased length", sub: "avg. ~1 inch" },
  { value: "0%", label: "Negative side effects", sub: "in study participants" },
  { value: "32", label: "Patients improved", sub: "erectile function reported" },
];

const FEATURES = [
  {
    icon: Target,
    title: "Increase Length",
    text: "Patients can expect to increase length by almost one full inch.",
  },
  {
    icon: Ruler,
    title: "Increase Girth",
    text: "P-Long patients can expect to increase girth by up to half an inch.",
  },
  {
    icon: Shield,
    title: "Safe & Surgery-Free",
    text: "Enjoy long-term results without painful, risky, or expensive surgeries.",
  },
];

const ALTERNATIVES = [
  {
    title: "Penuma Surgical\u00ae Implant",
    text: "Dozens of men have had their permanent implants removed due to infection, pain, or dissatisfaction \u2014 which shortens length.",
  },
  {
    title: "Suspensory Ligament Division",
    text: "This surgery changes the angle of the manhood, which results in scar tissue formation that shrinks it.",
  },
  {
    title: "Cosmetic Dermal Fillers",
    text: "Temporary, expensive, don't increase length, and results only last 1\u20132 years \u2014 often with a lumpy, uneven finish.",
  },
];

const STEPS = [
  {
    title: "Schedule",
    text: "Book your free, confidential consultation with our experienced medical team.",
    icon: Timer,
  },
  {
    title: "Consult",
    text: "Meet with a Revival provider for a detailed evaluation and personalized plan.",
    icon: Handshake,
  },
  {
    title: "Revive",
    text: "Begin your customized P-Long\u00ae protocol under expert medical care.",
    icon: Sparkles,
  },
];

const COMMITMENT = [
  "Individualized attention in a comfortable, supportive environment",
  "Clinical expertise paired with a compassionate approach",
  "Root-cause identification, not just symptom management",
  "Ongoing support through your entire treatment journey",
];

function OfferBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-revival-gold/30 bg-revival-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-revival-gold ${className}`}
    >
      <Gift className="h-3 w-3" />
      Free Consultation
    </span>
  );
}

export default function PLongLanding() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <>
      {/* ═══════════════════════ OFFER BAR ═══════════════════════ */}
      <div className="sticky top-16 z-40 overflow-hidden border-b border-revival-gold/20 bg-gradient-to-r from-revival-gold to-revival-gold-light py-2 text-revival-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-center text-xs font-semibold uppercase tracking-[0.06em] sm:text-sm">
          <Gift className="h-3.5 w-3.5 shrink-0" />
          Limited-Time Offer: Free, Confidential Consultation
          <span className="hidden sm:inline">&mdash; No Obligation</span>
          <button
            type="button"
            onClick={openModal}
            className="ml-1 underline decoration-2 underline-offset-2 hover:no-underline"
          >
            Claim yours &rarr;
          </button>
        </div>
      </div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-revival-dark py-14 lg:py-20">
        <motion.div
          aria-hidden
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-revival-gold/15 blur-[160px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#8a5a2b]/20 blur-[150px]"
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/5 px-4 py-1.5 text-tagline text-xs text-revival-gold">
                <Sparkles className="h-3.5 w-3.5" />
                P-Long® Protocol
              </span>
              <OfferBadge />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-heading leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.4rem, 4.6vw, 3.75rem)" }}
            >
              Increase the length &amp; girth of your manhood by a{" "}
              <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
                full inch
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg font-light leading-relaxed text-revival-cream/80"
            >
              The first and only clinically proven protocol to naturally
              increase the size of your manhood — no surgery, no cosmetic
              fillers, no negative side effects.
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {["Discreet & Confidential", "FDA-Approved Fillers", "Performed by Experts"].map(
                (b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm font-medium text-revival-cream/90"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-revival-gold" />
                    {b}
                  </li>
                ),
              )}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openModal}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.04]"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <a
                href={telHref(PHONE)}
                className="inline-flex items-center gap-2 text-sm font-medium text-revival-cream/90 transition-colors hover:text-revival-gold"
              >
                <Phone className="h-4 w-4 text-revival-gold" />
                {PHONE}
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2 text-xs text-revival-cream/60">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-revival-gold text-revival-gold" />
                ))}
              </span>
              Trusted by men across Las Vegas
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
              {videoPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="How the P-Long Protocol works"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setVideoPlaying(true)}
                  aria-label="Play video: How the P-Long Protocol works"
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  <Image
                    src="/images/sexual-wellness/p-long/p-long-hero.jpg"
                    alt="P-Long protocol at Revival Health & Wellness"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/75 via-revival-dark/10 to-transparent transition-opacity duration-300 group-hover:from-revival-dark/60" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full ring-2 ring-white/60 opacity-70 transition-transform duration-1000 group-hover:animate-ping"
                      />
                      <Play className="ml-1 h-8 w-8 fill-revival-dark text-revival-dark" strokeWidth={0} />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90">
                    <Play className="h-3 w-3 fill-white" strokeWidth={0} />
                    Watch: How the Protocol Works
                  </span>
                </button>
              )}
            </div>
            <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-revival-gold/25 bg-revival-dark/95 p-4 shadow-2xl backdrop-blur sm:w-[75%]">
              <div className="flex items-center justify-between gap-3 text-center">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-heading text-xl text-revival-gold sm:text-2xl">{s.value}</p>
                    <p className="text-[0.6rem] uppercase tracking-[0.06em] text-revival-cream/60 sm:text-[0.65rem]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              What You Get
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl"
            >
              No longer will you have to attempt risky or artificial
              therapies — with the unfortunate results they too often
              produce.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-medium text-revival-gold">
              Every plan starts with a free, no-obligation consultation to
              review your goals.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group rounded-2xl border border-revival-gold/20 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-revival-gold/10 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-6 w-6 text-revival-gold" />
                </span>
                <h3 className="mt-5 font-heading text-xl text-revival-dark">{f.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/75">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 text-center"
          >
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full border border-revival-gold/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-revival-dark transition-colors hover:border-revival-gold hover:bg-revival-gold/10"
            >
              <Gift className="h-4 w-4 text-revival-gold" />
              {CTA_LABEL}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIAL ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-revival-gold/20 bg-white/[0.03] p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-revival-gold/25 lg:mx-0">
              <Image
                src="/images/sexual-wellness/p-long/p-long-younger-men-feat.jpg"
                alt="P-Long patient at Revival Health & Wellness"
                fill
                sizes="(max-width: 1024px) 80vw, 24vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-revival-gold text-revival-gold" />
                ))}
              </span>
              <p className="mt-6 font-heading text-xl italic leading-relaxed text-white sm:text-2xl">
                &ldquo;I had struggled with confidence about my size for years
                but didn&apos;t want to risk surgery or medication. When I
                discovered the P-Long Protocol at Revival Health, I was
                impressed by the science and clinical results behind it.
                After completing the program, I noticed real improvements —
                not just in length and girth, but in my overall sexual
                performance and confidence.&rdquo;
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-revival-gold">
                — Michael R.
              </p>
              <button
                type="button"
                onClick={openModal}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-revival-cream/90 underline decoration-revival-gold/50 underline-offset-4 transition-colors hover:text-revival-gold"
              >
                Ready for your own results? Claim your free consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ ABOUT REVIVAL ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2rem] border border-revival-gold/20 shadow-xl lg:order-2"
            >
              <Image
                src="/images/sexual-wellness/p-long/sex-therapy-wellness.jpg"
                alt="Revival Health & Wellness — expert men's health care"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="order-1 lg:order-1"
            >
              <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
                About Revival Health &amp; Wellness
              </motion.span>
              <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl">
                Increase girth. Boost confidence. No scalpels, no stitches.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-base font-light leading-relaxed text-revival-charcoal/75">
                Revival Health &amp; Wellness helps men optimize their health
                for peak performance — physically, mentally, and emotionally.
                Our expert team delivers personalized care designed to boost
                energy, enhance confidence, and support long-term wellness.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/75">
                With experience in hormone optimization, sexual wellness, and
                regenerative therapies, our providers focus on identifying
                the root causes of men&apos;s health concerns and developing
                tailored treatment plans designed for real, lasting results.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-7">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-revival-dark px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-revival-gold transition-colors hover:bg-revival-charcoal"
                >
                  <Gift className="h-4 w-4" />
                  Schedule My Free Consultation
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY NOT ALTERNATIVES ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Why Not The Alternatives?
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl text-white sm:text-4xl">
              The drawbacks of surgery &amp; fillers
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light leading-relaxed text-revival-cream/70">
              Are you willing to invest thousands of dollars in procedures
              that may actually shorten your manhood? Many enlargement
              procedures result in infection, scar tissue, and outcomes that
              leave men worse than before.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {ALTERNATIVES.map((a) => (
              <motion.div
                key={a.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <X className="h-6 w-6 text-red-400/80" />
                <h3 className="mt-4 font-heading text-lg text-white">{a.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-cream/70">
                  {a.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ PROCESS ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Your Journey
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl text-revival-dark sm:text-4xl">
              Find your path to better performance
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {STEPS.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-revival-gold/10">
                  <s.icon className="h-7 w-7 text-revival-gold" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-heading text-xl text-revival-dark">{s.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/75">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ COMMITMENT ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Our Commitment to Men&apos;s Health &amp; Vitality
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl text-white sm:text-4xl">
              Every man deserves to feel confident, energized, and in
              control of his health.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light leading-relaxed text-revival-cream/70">
              Through innovative therapies and a patient-first philosophy,
              our mission is simple: to help men regain confidence, improve
              performance, and live healthier, more fulfilling lives.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
          >
            {COMMITMENT.map((item) => (
              <motion.div key={item} variants={fadeUp} className="flex items-start gap-3">
                <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-revival-gold" />
                <p className="text-sm font-light leading-relaxed text-revival-cream/85">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 text-center"
          >
            <button
              type="button"
              onClick={openModal}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.04]"
            >
              {CTA_LABEL}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FINAL OFFER / CTA BANNER ═══════════════════════ */}
      <section className="relative overflow-hidden bg-revival-dark py-16 lg:py-24">
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-revival-gold/15 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#8a5a2b]/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        >
          <OfferBadge className="mx-auto" />
          <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Add an inch in length — without surgery.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg">
            The P-Long Protocol is the first and only clinically proven,
            non-surgical approach. Book your free, confidential
            consultation today — no obligation, no pressure.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={openModal}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_18px_46px_-16px_rgba(201,169,110,0.75)] transition-transform duration-300 hover:scale-[1.04]"
            >
              {CTA_LABEL}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <a
              href={telHref(PHONE)}
              className="inline-flex items-center gap-2 text-sm font-medium text-revival-cream/90 transition-colors hover:text-revival-gold"
            >
              <Phone className="h-4 w-4 text-revival-gold" />
              Or call {PHONE}
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-revival-cream/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-revival-gold" />
              100% confidential
            </span>
            <span className="flex items-center gap-1.5">
              <Gift className="h-4 w-4 text-revival-gold" />
              Free consultation
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-revival-gold" />
              FDA-approved protocol
            </span>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════ STICKY MOBILE CTA ═══════════════════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-revival-gold/25 bg-revival-dark/95 p-3 backdrop-blur-xl lg:hidden">
        <a
          href={telHref(PHONE)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-revival-gold"
          aria-label={`Call ${PHONE}`}
        >
          <Phone className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={openModal}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light text-sm font-semibold uppercase tracking-[0.08em] text-revival-dark"
        >
          {CTA_LABEL}
        </button>
      </div>
      {/* Spacer so the sticky bar never covers content on mobile */}
      <div className="h-20 lg:hidden" aria-hidden />

      <LeadFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
