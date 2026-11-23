"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Gift,
  Lock,
  MapPin,
  Pause,
  Phone,
  Play,
  Plus,
  ScanFace,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  Zap,
} from "lucide-react";
import { telHref } from "@/lib/content/clinics";

import XerfLeadFormModal from "@/components/lp/XerfLeadFormModal";
import GoogleReviewsSection from "@/components/lp/GoogleReviewsSection";
import MapSection from "@/components/layout/MapSection";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE = "+1 725-257-5596";
const CTA_LABEL = "Claim My Free Consultation";
const CTA_SHORT = "Free Consult";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const HERO_BULLETS = [
  "No needles, no numbing, no downtime",
  "Boosts collagen & elastin naturally",
  "Works on face, neck, jawline & body",
  "FDA cleared radiofrequency technology",
];

const STATS = [
  { value: "5.0★", label: "Average patient rating" },
  { value: "500+", label: "Five star reviews" },
  { value: "0", label: "Needles or downtime" },
  { value: "FDA", label: "Cleared technology" },
];

const SYMPTOMS = [
  "You've noticed a softening jawline or \u201cturkey neck\u201d",
  "Your neck or décolletage feels crepey or loose",
  "Fine lines are showing up where skin used to be firm",
  "You want a lifted look without surgery or fillers",
  "You're afraid of looking overfilled or \u201cdone\u201d",
  "You want visible results with zero downtime",
];

const KEY_BENEFITS = [
  "Visible lifting and tightening on face, neck & body",
  "Improved skin tone, texture, and firmness",
  "Reduced fine lines and early wrinkles",
  "Long term collagen and elastin stimulation",
  "Comfortable sessions, no numbing required",
  "Zero downtime, return to your day immediately",
];

const STEPS = [
  {
    title: "Book your free consultation",
    time: "60 SECONDS",
    text: (
      <>
        Reserve your free XERF consultation online or call/text{" "}
        <a
          href={telHref(PHONE)}
          className="font-semibold text-revival-gold underline decoration-revival-gold/40 underline-offset-2 hover:text-revival-gold-light"
        >
          {PHONE}
        </a>
        . Only 10 pricing spots are available.
      </>
    ),
    icon: Phone,
  },
  {
    title: "Aura 3D Facial Analysis",
    time: "IN OFFICE",
    text: "Your visit starts with our advanced Aura 3D Facial Analysis, so we can build a treatment plan customized to your skin.",
    icon: ScanFace,
  },
  {
    title: "Start your XERF plan",
    time: "SAME VISIT",
    text: "Walk out with a personalized XERF protocol and a clear next step toward tighter, firmer skin.",
    icon: Sparkles,
  },
];

const REASONS = [
  {
    icon: Award,
    title: "FDA cleared technology",
    text: "XERF is a next generation, dual frequency radiofrequency platform cleared for skin tightening and rejuvenation.",
  },
  {
    icon: UserCheck,
    title: "Licensed medical providers",
    text: "Your treatment plan is built and delivered by a licensed Las Vegas medical team, not a spa technician.",
  },
  {
    icon: Shield,
    title: "No volume, no \u201cpillow face\u201d",
    text: "XERF works underneath the skin to rebuild your own collagen. Nothing is injected or added. The lift comes from your own structure.",
  },
  {
    icon: Zap,
    title: "Calibrated to your skin",
    text: "Multiple depth and intensity levels let your provider precisely target your unique skin biology for predictable, natural looking results.",
  },
  {
    icon: Lock,
    title: "No pressure, no contracts",
    text: "Free consultation. Transparent pricing for the first 10 patients. You decide when you're ready.",
  },
  {
    icon: Sparkles,
    title: "Aura 3D Facial Analysis included",
    text: "Every consultation starts with an advanced 3D skin analysis, so your plan is built around your actual skin, not guesswork.",
  },
];

const FAQS = [
  {
    q: "What is XERF?",
    a: "XERF is a noninvasive skin tightening, lifting, and rejuvenation platform used on both the face and body. It stimulates the skin's own collagen and elastin production to firm, lift, and smooth over time, without incisions, injections, or downtime.",
  },
  {
    q: "What can XERF treat?",
    a: "XERF is used for skin laxity and early signs of aging, including a soft jawline, neck crepiness (\u201cturkey neck\u201d), loose skin on the abdomen or arms, fine lines, and general loss of firmness.",
  },
  {
    q: "Does XERF hurt?",
    a: "No. Sessions are comfortable, and patients typically describe a warm, relaxing sensation. No numbing cream is required and there's no post treatment soreness.",
  },
  {
    q: "Is there any downtime?",
    a: "None. XERF is a lunch break treatment. You can return to work, exercise, and normal skincare immediately afterward.",
  },
  {
    q: "How is this different from filler?",
    a: "Filler adds volume. XERF adds none. It heats the deep support layers of your skin so your own collagen rebuilds, tightening and lifting from your own structure instead of filling you up.",
  },
  {
    q: "How do I claim the offer?",
    a: "This offer, a free consultation plus a complimentary Aura 3D Facial Analysis, is limited to the first 10 patients. Click any \u201cClaim My Free Consultation\u201d button on this page or call/text " +
      PHONE +
      " to reserve your spot before it's gone.",
  },
];

function PortraitVideoCard({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        onClick={toggle}
        className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_120px_-32px_rgba(0,0,0,0.6)]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {!playing && (
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 transition-opacity duration-300 group-hover:from-black/45"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-[0_20px_60px_-12px_rgba(201,169,110,0.6)] transition-transform duration-300 group-hover:scale-110">
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-revival-gold/40"
                />
                <Play className="relative ml-1 h-7 w-7 fill-current" strokeWidth={0} />
              </span>
            </span>
          </>
        )}

        {playing && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            aria-label="Pause video"
            className="absolute bottom-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-revival-gold hover:bg-black/70 group-hover:opacity-100"
          >
            <Pause className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function XerfOfferLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openModal = () => setModalOpen(true);

  return (
    <>
      {/* ═══════════════════════ OFFER BAR ═══════════════════════ */}
      <div className="sticky top-16 z-40 overflow-hidden border-b border-revival-gold/25 bg-gradient-to-r from-revival-gold to-revival-gold-light py-2 text-revival-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-center text-xs font-semibold uppercase tracking-[0.08em] sm:text-sm">
          <Gift className="h-3.5 w-3.5 shrink-0" />
          First 10 Patients Only
          <span className="hidden sm:inline">Claim your free consultation</span>
          <button
            type="button"
            onClick={openModal}
            className="ml-1 cursor-pointer underline decoration-2 underline-offset-2 hover:no-underline"
          >
            Book now &rarr;
          </button>
        </div>
      </div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-revival-dark py-12 lg:py-16">
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]"
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto_auto] lg:gap-x-12 lg:gap-y-6 lg:px-8">
          {/* LEFT: Copy, uses plain CSS keyframe `.lp-reveal` reveal instead
              of framer-motion variants, which have proven unreliable in
              this stack (see globals.css for details).
              mobile order-1 / desktop col-1 row-1 */}
          <div className="order-1 text-center lg:order-none lg:col-start-1 lg:row-start-1 lg:text-left">
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.4 }}
              className="relative mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-center shadow-[0_25px_60px_-10px_rgba(201,169,110,0.85)] ring-4 ring-revival-dark sm:h-24 sm:w-24 lg:mx-0"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-revival-gold/40" />
              <span className="relative font-heading text-xl leading-none text-revival-dark sm:text-2xl">
                First 10
              </span>
              <span className="relative mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-revival-dark/80">
                Patients
              </span>
            </motion.div>

            <h1
              className="lp-reveal mt-5 font-heading leading-[1.03] text-white"
              style={{
                fontSize: "clamp(2.4rem, 4.6vw, 3.75rem)",
                ["--reveal-delay" as string]: "100ms",
              }}
            >
              Lift, firm & tighten,{" "}
              <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
                no needles, no downtime.
              </span>
            </h1>

            <p
              className="lp-reveal mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg lg:mx-0"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              XERF is the FDA cleared, noninvasive skin tightening treatment
              now available at Revival Health and Wellness. It stimulates your
              body's own collagen and elastin at multiple skin depths for a
              firmer, smoother, more lifted look, with{" "}
              <span className="font-semibold text-revival-gold">zero downtime</span>.
            </p>

            <ul
              className="lp-reveal mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
              style={{ ["--reveal-delay" as string]: "300ms" }}
            >
              {HERO_BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-revival-cream/90 lg:justify-start"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-revival-gold" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Video. mobile order-2 / desktop col-2 spanning all rows */}
          <div className="relative order-2 flex flex-col items-center gap-8 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px]"
            >
              <PortraitVideoCard
                src="/videos/xerf-offer-symptoms.mp4"
                poster="/videos/xerf-offer-symptoms-poster.jpg"
              />
            </motion.div>
          </div>

          {/* mobile order-3 / desktop col-1 row-2: offer card */}
          <div
            className="lp-reveal order-3 mt-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-revival-gold/30 bg-revival-gold/10 px-5 py-4 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:mt-0 lg:justify-start lg:text-left"
            style={{ ["--reveal-delay" as string]: "350ms" }}
          >
            <span className="font-heading text-5xl leading-none text-white sm:text-6xl">
              <span className="bg-gradient-to-b from-white to-revival-gold-light bg-clip-text text-transparent">
                FREE
              </span>
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-revival-cream/90">
                Consultation &amp; Aura 3D Analysis
              </p>
              <p className="mt-1 text-xs text-revival-gold">
                First 10 patients only &middot; personalized XERF treatment plan included
              </p>
            </div>
          </div>

          {/* mobile order-4 / desktop col-1 row-3: CTA buttons + disclaimer */}
          <div className="order-4 text-center lg:order-none lg:col-start-1 lg:row-start-3 lg:text-left">
            <div
              className="lp-reveal flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{ ["--reveal-delay" as string]: "400ms" }}
            >
              <button
                type="button"
                onClick={openModal}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
              >
                <Gift className="h-4 w-4" />
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <a
                href={telHref(PHONE)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-revival-cream/90 transition-colors hover:border-revival-gold hover:text-revival-gold"
              >
                <Phone className="h-4 w-4 text-revival-gold" />
                {PHONE}
              </a>
            </div>

            <p
              className="lp-reveal mt-4 text-xs text-revival-cream/50"
              style={{ ["--reveal-delay" as string]: "500ms" }}
            >
              *Pricing limited to the first 10 patients. New patients only.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="relative mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-[0.7rem] uppercase tracking-[0.14em] text-revival-cream/60 sm:text-xs"
        >
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-revival-gold text-revival-gold" />
            5.0 / 5 patient rating
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-revival-gold" />
            FDA cleared technology
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-revival-gold" />
            No needles &middot; no downtime
          </span>
          <span className="flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5 text-revival-gold" />
            Licensed medical providers
          </span>
        </motion.div>
      </section>

      {/* ═══════════════════════ BIG STATS ═══════════════════════ */}
      <section className="bg-revival-warm-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-4xl text-revival-dark sm:text-5xl">
                <span className="bg-gradient-to-b from-revival-dark to-revival-charcoal bg-clip-text text-transparent">
                  {s.value}
                </span>
              </p>
              <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/70 sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ SYMPTOMS ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="lp-reveal font-heading text-3xl leading-tight text-white sm:text-4xl"
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            >
              Recognize any of these? You&rsquo;re exactly who XERF was made for.
            </h2>
            <div
              className="lp-reveal mt-6"
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Book Your Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {SYMPTOMS.map((item, i) => (
              <div
                key={item}
                className="lp-reveal flex items-start justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center"
                style={{ "--reveal-delay": `${150 + i * 60}ms` } as React.CSSProperties}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-revival-gold" />
                <p className="text-sm font-light leading-relaxed text-revival-cream/85">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SEE XERF IN ACTION ═══════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="lp-reveal text-tagline text-xs text-revival-gold"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            >
              Real Treatment Footage
            </span>
            <h2
              className="lp-reveal mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl"
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            >
              See XERF in action, inside our treatment room.
            </h2>
            <p
              className="lp-reveal mt-5 text-base font-light leading-relaxed text-revival-charcoal/80"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
              No actors, no stock footage: real XERF sessions filmed inside
              our Las Vegas clinic.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-10 sm:grid-cols-2">
            <div
              className="lp-reveal"
              style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
            >
              <PortraitVideoCard
                src="/videos/xerf-offer-treatment-1.mp4"
                poster="/videos/xerf-offer-treatment-1-poster.jpg"
              />
              <p className="mt-4 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal/60">
                Nonsurgical Lift
              </p>
            </div>
            <div
              className="lp-reveal"
              style={{ "--reveal-delay": "350ms" } as React.CSSProperties}
            >
              <PortraitVideoCard
                src="/videos/xerf-offer-treatment-2.mp4"
                poster="/videos/xerf-offer-treatment-2-poster.jpg"
              />
              <p className="mt-4 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal/60">
                Inside The Treatment Room
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KEY BENEFITS + DEVICE ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/15 bg-gradient-to-br from-revival-cream to-revival-warm-white p-4 shadow-[0_50px_120px_-32px_rgba(15,15,15,0.25)]">
              <Image
                src="/images/xerf/Xerf-Device-Front-No-arm-plus-logo-on-screen-1.png"
                alt="XERF skin tightening device"
                width={1183}
                height={1920}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full rounded-2xl object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 text-center lg:order-2 lg:text-left"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Key Benefits of XERF
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Lift, firm, and rejuvenate, without needles or downtime.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base font-light leading-relaxed text-revival-charcoal/80">
              One versatile platform, calibrated to your treatment zone: face,
              neck, décolletage, or body. Every session is comfortable, quick,
              and downtime free.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-2">
              {KEY_BENEFITS.map((b, i) => (
                <li
                  key={b}
                  className="flex items-start justify-center gap-3 text-sm text-revival-charcoal/80 sm:text-[0.95rem] lg:justify-start"
                >
                  <span
                    aria-hidden
                    className="mt-1 font-heading text-xs italic text-revival-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Claim My Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div
              variants={fadeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center lg:text-left"
            >
              <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
                How XERF Works
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                No volume added. No pillow face. Just your own skin, firmer.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 text-base font-light leading-relaxed text-revival-cream/75"
              >
                XERF is needle free radiofrequency that works underneath the
                skin, heating the deep support layers so your own collagen
                rebuilds. No volume is added. The lift comes from your own
                structure, not from filling you up.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-base font-light leading-relaxed text-revival-cream/75"
              >
                This state of the art device offers different depth and
                intensity levels, so it can be precisely calibrated to your
                unique skin biology for predictable results, reduced
                unnecessary thermal stress, and gradual, natural looking
                tightening over time.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  Start My Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
            >
              <Image
                src="/images/xerf/B-XERF.jpeg"
                alt="XERF device console"
                width={762}
                height={800}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ BEFORE / AFTER ═══════════════════════ */}
      <section className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-12 text-center"
          >
            <p className="text-tagline text-[0.7rem] text-revival-gold">
              REAL RESULTS · BEFORE &amp; AFTER
            </p>
            <h2 className="mt-3 font-heading text-3xl italic text-revival-dark sm:text-4xl lg:text-[2.75rem]">
              Visible lift. Firmer skin. Same you, only better.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              Real Revival patients through a series of XERF sessions, photographed in clinic, unedited.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
          >
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white shadow-xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/xerf/xerf-before-after.jpg"
                  alt="XERF treatment before and after comparison"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-revival-gold/15 bg-revival-warm-white px-4 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal">
                XERF · Before &amp; After
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white shadow-xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/xerf/xerf-before-after-2.png"
                  alt="XERF treatment before and after comparison, patient two"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-revival-gold/15 bg-revival-warm-white px-4 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal">
                XERF · Before &amp; After
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS: STEPS ═══════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Getting Started
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Three simple steps to tighter, firmer skin.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="relative rounded-[1.5rem] border border-revival-gold/15 bg-revival-warm-white p-7 text-center lg:text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light font-heading text-lg font-semibold text-revival-dark">
                    {i + 1}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/70">
                    <Clock className="h-3 w-3 text-revival-gold" />
                    {s.time}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl text-revival-dark">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/75">
                  {s.text}
                </p>
                <s.icon className="absolute bottom-6 right-6 h-6 w-6 text-revival-gold/40" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ WHY REVIVAL / 6 REASONS ═══════════════════════ */}
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
              Why Revival
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Six reasons Las Vegas patients trust us with this.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {REASONS.map((r) => (
              <motion.div
                key={r.title}
                variants={fadeUp}
                className="rounded-[1.25rem] border border-revival-gold/15 bg-white p-6 text-center transition-shadow duration-300 hover:shadow-md lg:text-left"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-revival-gold/10">
                  <r.icon className="h-5 w-5 text-revival-gold" />
                </span>
                <h3 className="mt-4 font-heading text-lg text-revival-dark">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/75">
                  {r.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GoogleReviewsSection treatment="XERF" />

      {/* ═══════════════════════ LIMITED SPOTS ═══════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-revival-dark p-8 text-center sm:p-12"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Limited Spots
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl font-heading text-3xl leading-tight text-white sm:text-4xl"
            >
              Pricing is capped at the first 10 patients.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-revival-cream/75"
            >
              Once those spots are filled, this prelaunch pricing goes away.
              Your free consultation and Aura 3D Facial Analysis take about 45
              minutes and come with zero obligation.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.75)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Claim My Spot: Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Good To Know
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Your questions, answered.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-revival-charcoal/70">
              Still have questions? Call or text us at{" "}
              <a
                href={telHref(PHONE)}
                className="font-semibold text-revival-dark underline decoration-revival-gold/60 underline-offset-4 hover:text-revival-gold"
              >
                {PHONE}
              </a>
              .
            </motion.p>
          </motion.div>

          <div className="mt-10 divide-y divide-revival-gold/15 rounded-2xl border border-revival-gold/15 bg-revival-warm-white">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/60 sm:px-6"
                  >
                    <span className="font-heading text-base text-revival-dark sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-revival-gold/40 text-revival-gold transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="px-5 pb-5 text-sm font-light leading-relaxed text-revival-charcoal/75 sm:px-6">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MAP / LOCATIONS ═══════════════════════ */}
      <MapSection dark only="summerlin-nw" hidePhone />

      {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
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
          <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Your skin, lifted.{" "}
            <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
              Naturally.
            </span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg">
            A free consultation plus a complimentary Aura 3D Facial Analysis,
            limited to the first 10 patients. No
            needles, no numbing, no downtime.
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
              Or call/text {PHONE}
            </a>
          </div>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-revival-cream/50">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              Summerlin/NW
            </span>
            <span>*Pricing limited to the first 10 patients.</span>
          </p>
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
          {CTA_SHORT}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {/* Spacer so the sticky bar never covers content on mobile */}
      <div className="h-20 lg:hidden" aria-hidden />

      <XerfLeadFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
