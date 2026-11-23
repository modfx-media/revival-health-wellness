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
  Sparkles,
  Star,
  Timer,
  UserCheck,
  Users,
  VenusAndMars,
  Zap,
} from "lucide-react";
import { telHref } from "@/lib/content/clinics";
import { TEAM } from "@/components/about/AboutSections";
import EmsellaLeadFormModal from "@/components/lp/EmsellaLeadFormModal";
import GoogleReviewsSection from "@/components/lp/GoogleReviewsSection";
import MapSection from "@/components/layout/MapSection";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE = "(702) 553-1754";
const CTA_LABEL = "Claim My Free Consult + $97 Demo";
const CTA_SHORT = "$97 Demo";
const PROVIDER = TEAM.find((m) => m.name === "Radford Raquedan")!;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const HERO_BULLETS = [
  "FDA cleared HIFEM\u00ae technology",
  "Fully clothed, zero downtime",
  "For men & women",
  "30 minutes per session",
];

const STATS = [
  { value: "11,000", label: "Contractions per session" },
  { value: "64%", label: "Avg. incontinence improvement" },
  { value: "0", label: "Downtime" },
  { value: "FDA", label: "Cleared technology" },
];

const KEY_BENEFITS = [
  "Noninvasive, no surgery, no medication",
  "95% patient satisfaction",
  "Fully clothed, comfortable sessions",
  "Zero downtime, return to your day immediately",
  "FDA cleared HIFEM\u00ae technology",
  "Effective for both men and women",
];

const FOR_WOMEN_POINTS = [
  "Improves urinary incontinence",
  "Supports pelvic floor strength & tone",
  "Enhances intimate wellness & confidence",
  "Non-invasive, quick & convenient",
];

const FOR_MEN_POINTS = [
  "Improves urinary incontinence",
  "Supports sexual health & performance",
  "Strengthens pelvic floor muscles",
  "Non-invasive, quick & convenient",
];

const STEPS = [
  {
    title: "Book your free consultation",
    time: "60 SECONDS",
    text: (
      <>
        Reserve your free consultation and $97 Emsella demo session online or
        call/text{" "}
        <a
          href={telHref(PHONE)}
          className="font-semibold text-revival-gold underline decoration-revival-gold/40 underline-offset-2 hover:text-revival-gold-light"
        >
          {PHONE}
        </a>
        . Spots are limited this month.
      </>
    ),
    icon: Phone,
  },
  {
    title: "Try your $97 demo session",
    time: "IN OFFICE",
    text: "Experience a real Emsella session in the chair, fully clothed, about 30 minutes, zero downtime.",
    icon: Timer,
  },
  {
    title: "Start your personalized plan",
    time: "SAME VISIT",
    text: "Most patients complete six sessions, twice weekly, for full results tailored to your goals.",
    icon: Sparkles,
  },
];

const REASONS = [
  {
    icon: Award,
    title: "FDA cleared technology",
    text: "Emsella uses High Intensity Focused Electromagnetic (HIFEM\u00ae) technology, cleared for pelvic floor strengthening in both men and women.",
  },
  {
    icon: UserCheck,
    title: "Licensed medical providers",
    text: "Your treatment plan is built and delivered by a licensed Las Vegas medical team, not a spa technician.",
  },
  {
    icon: VenusAndMars,
    title: "Built for men and women",
    text: "One device, two protocols: incontinence relief and pelvic floor restoration for women, erectile function support for men.",
  },
  {
    icon: Zap,
    title: "11,000 contractions per session",
    text: "Each 30 minute session delivers the equivalent of thousands of Kegel exercises, far more than you could ever do on your own.",
  },
  {
    icon: Lock,
    title: "No pressure, no contracts",
    text: "Free consultation plus a $97 demo session. Transparent pricing, no obligation. You decide when you're ready.",
  },
  {
    icon: Sparkles,
    title: "Pairs with other therapies",
    text: "Emsella pairs powerfully with GAINSWave\u2122, the O-Shot\u00ae, TriMix, and the Priapus Shot\u00ae for even more complete results.",
  },
];

const FAQS = [
  {
    q: "What is Emsella?",
    a: "Emsella is an FDA cleared, noninvasive treatment that uses High Intensity Focused Electromagnetic (HIFEM\u00ae) technology to deliver thousands of Kegel like muscle contractions in a single session, strengthening the pelvic floor for both men and women.",
  },
  {
    q: "Is Emsella for men or women?",
    a: "Both. Emsella is FDA approved for men and women. For women, it's used to treat stress and urge urinary incontinence and restore pelvic floor strength (including postpartum). For men, it strengthens the pelvic floor muscles that support erectile function and sexual performance.",
  },
  {
    q: "Does it hurt?",
    a: "No. You'll feel a series of strong, rhythmic muscle contractions, similar to an intense workout for your pelvic floor. There's no pain, no needles, and no numbing required.",
  },
  {
    q: "Is there any downtime?",
    a: "None. You remain fully clothed for the entire session and can return to your normal activities immediately afterward.",
  },
  {
    q: "How many sessions will I need?",
    a: "Most patients complete a course of six sessions, twice weekly. Some notice improvement after just a few sessions, depending on severity.",
  },
  {
    q: "How do I claim the $97 offer?",
    a: `This offer, a free consultation plus a $97 Emsella demo session, is available for a limited time. Click any "${CTA_LABEL}" button on this page or call/text ${PHONE} to reserve your spot.`,
  },
];

function VideoCard({
  src,
  poster,
  aspect = "aspect-video",
  className = "",
}: {
  src: string;
  poster: string;
  aspect?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div className={`mx-auto w-full ${className}`}>
      <div
        onClick={toggle}
        className={`group relative ${aspect} cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_40px_120px_-32px_rgba(0,0,0,0.6)]`}
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

function OfferBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-revival-gold/40 bg-revival-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold ${className}`}
    >
      <Gift className="h-3 w-3" />
      Free Consult &middot; $97 Demo Session
    </span>
  );
}

export default function EmsellaOfferLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openModal = () => setModalOpen(true);

  return (
    <>
      {/* ═══════════════════════ OFFER BAR ═══════════════════════ */}
      <div className="sticky top-16 z-40 overflow-hidden border-b border-revival-gold/25 bg-gradient-to-r from-revival-gold to-revival-gold-light py-2 text-revival-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-center text-xs font-semibold uppercase tracking-[0.08em] sm:text-sm">
          <Gift className="h-3.5 w-3.5 shrink-0" />
          Free Consultation + $97 Emsella Demo Session
          <span className="hidden sm:inline">For men &amp; women</span>
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

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-6 lg:px-8">
          {/* mobile order-1 / desktop col-1 row-1: heading copy */}
          <div className="order-1 text-center lg:order-none lg:col-start-1 lg:row-start-1 lg:text-left">
            <div className="lp-reveal" style={{ "--reveal-delay": "0ms" } as React.CSSProperties}>
              <OfferBadge />
            </div>

            <h1
              className="lp-reveal mt-5 font-heading leading-[1.03] text-white"
              style={{
                fontSize: "clamp(2.4rem, 4.6vw, 3.75rem)",
                ["--reveal-delay" as string]: "100ms",
              }}
            >
              Stop the leaks. Strengthen your pelvic floor,{" "}
              <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
                for men &amp; women, also great for sexual wellness!
              </span>
            </h1>

            <p
              className="lp-reveal mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg lg:mx-0"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              Emsella is the FDA cleared, noninvasive HIFEM® chair now
              available at Revival Health and Wellness. It delivers 11,000
              Kegel like contractions in a single 30 minute session,
              strengthening the pelvic floor to treat incontinence in women
              and support erectile function in men, with{" "}
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

          {/* mobile order-2 / desktop col-2 spanning both rows: video + offer card */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <VideoCard
                src="/videos/emsella-2.mp4"
                poster="/videos/emsella-2-poster.jpg"
              />
              <p className="mt-4 animate-pulse text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-gold">
                Watch An Emsella Session
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              className="relative mt-8"
            >
              <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-revival-gold/30 bg-revival-gold/10 px-5 py-4 text-center lg:justify-start lg:text-left">
                <span className="font-heading text-5xl leading-none text-white sm:text-6xl">
                  <span className="bg-gradient-to-b from-white to-revival-gold-light bg-clip-text text-transparent">
                    $97
                  </span>
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-revival-cream/90">
                    <span className="mr-2 text-revival-cream/40 line-through">$250 value</span>
                    Consultation &amp; Demo Session
                  </p>
                  <p className="mt-1 text-xs text-revival-gold">
                    Limited time &middot; free consultation + $97 Emsella demo session
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* mobile order-3 / desktop col-1 row-2: CTA buttons + disclaimer */}
          <div className="order-3 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:text-left">
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
              *$97 demo session offer available for a limited time. New patients only.
            </p>
          </div>
        </div>

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
            <Users className="h-3.5 w-3.5 text-revival-gold" />
            For men &amp; women
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

      {/* ═══════════════════════ FOR WOMEN / FOR MEN ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="text-center lg:text-left">
            <span
              className="lp-reveal text-tagline text-xs text-revival-gold"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            >
              One Chair. Built For Both.
            </span>
            <h2
              className="lp-reveal mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl"
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            >
              Emsella works differently for women and men. Here&apos;s how.
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div
                className="lp-reveal"
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <h3 className="font-heading text-lg text-revival-gold">Emsella for Women</h3>
                <ul className="mt-4 space-y-3">
                  {FOR_WOMEN_POINTS.map((p) => (
                    <li
                      key={p}
                      className="flex items-start justify-center gap-2 text-sm text-revival-cream/85 lg:justify-start"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="lp-reveal"
                style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
              >
                <h3 className="font-heading text-lg text-revival-gold">Emsella for Men</h3>
                <ul className="mt-4 space-y-3">
                  {FOR_MEN_POINTS.map((p) => (
                    <li
                      key={p}
                      className="flex items-start justify-center gap-2 text-sm text-revival-cream/85 lg:justify-start"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="lp-reveal mt-10"
              style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className="lp-reveal relative mx-auto w-full max-w-sm lg:mx-0"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/sexual-wellness/emsella-offer/emsella-for-both-2.png"
                  alt="Emsella HIFEM treatment for women and men at Revival Health & Wellness"
                  fill
                  sizes="(min-width: 1024px) 28vw, 80vw"
                  className="object-cover"
                />
              </div>
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
                src="/images/sexual-wellness/emsella/emsella-chair-equipment.jpg"
                alt="Emsella HIFEM chair equipment"
                width={1200}
                height={800}
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
              Key Benefits of Emsella
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Rebuild pelvic floor strength without surgery or downtime.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base font-light leading-relaxed text-revival-charcoal/80">
              One chair, one 30 minute session, thousands of contractions.
              Emsella is calibrated for your goals, whether that&apos;s
              stopping leaks or supporting sexual performance.
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
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS + VIDEO ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center lg:text-left"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              How Emsella Works
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              HIFEM® technology: thousands of contractions, zero effort.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base font-light leading-relaxed text-revival-cream/75"
            >
              Emsella uses High Intensity Focused Electromagnetic (HIFEM®)
              technology to induce thousands of Kegel like pelvic floor
              muscle contractions in a single session, retraining and
              strengthening muscles that regular exercise can&apos;t reach on
              its own.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base font-light leading-relaxed text-revival-cream/75"
            >
              You stay fully clothed and seated in the chair for the entire
              session. There&apos;s no pain, no numbing, and no downtime,
              just walk in, sit down, and let the chair do the work.
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

          <div
            className="lp-reveal relative mx-auto w-full max-w-sm lg:mx-0"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/sexual-wellness/emsella-offer/emsella-how-it-works.png"
                  alt="How the Emsella HIFEM chair works at Revival Health & Wellness"
                  fill
                  sizes="(min-width: 1024px) 28vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
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
              Three simple steps to a stronger pelvic floor.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-revival-charcoal/70">
              No high pressure sales pitch. No mystery fees. Just a clear path
              from &ldquo;I&rsquo;m interested&rdquo; to real results.
            </motion.p>
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

      {/* ═══════════════════════ MEET THE TEAM ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <div
            className="lp-reveal relative mx-auto w-full max-w-xs lg:max-w-none"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-white/[0.03] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src={PROVIDER.image}
                alt={`${PROVIDER.name}, ${PROVIDER.role} at Revival Health & Wellness`}
                width={650}
                height={723}
                sizes="(min-width: 1024px) 35vw, 80vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <span
              className="lp-reveal text-tagline text-xs text-revival-gold"
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            >
              Meet The Team
            </span>
            <h2
              className="lp-reveal mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
              {PROVIDER.name}, {PROVIDER.role}
            </h2>
            <p
              className="lp-reveal mt-5 text-base font-light leading-relaxed text-revival-cream/75"
              style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            >
              {PROVIDER.bio}
            </p>
            <div
              className="lp-reveal mt-8"
              style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Book Your Consultation With {PROVIDER.name.split(" ")[0]}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviewsSection bgClassName="bg-revival-warm-white" treatment="Emsella" />

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
              Limited Time
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl font-heading text-3xl leading-tight text-white sm:text-4xl"
            >
              The $97 demo session offer won&apos;t last.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-revival-cream/75"
            >
              Your free consultation and $97 Emsella demo session come with
              zero obligation, just a real, fully clothed session in the
              chair to see how it feels.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.75)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Claim My $97 Demo
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
      <MapSection dark hidePhone />

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
          <OfferBadge className="mx-auto" />
          <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Stronger pelvic floor.{" "}
            <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
              For men &amp; women, also great for sexual wellness!
            </span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg">
            A free consultation plus a $97 Emsella demo session, for a
            limited time. No needles, no medication, no downtime.
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
              Henderson/SW &amp; Summerlin/NW
            </span>
            <span>*$97 demo session offer available for a limited time.</span>
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

      <EmsellaLeadFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
