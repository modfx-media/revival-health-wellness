"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Gift,
  Handshake,
  HeartPulse,
  Lock,
  Minus,
  Phone,
  Play,
  Plus,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  TrendingDown,
  UserCheck,
  X,
} from "lucide-react";
import { telHref } from "@/lib/content/clinics";
import { reportPhoneClickConversion } from "@/lib/adsConversion";
import LeadFormModal from "@/components/lp/LeadFormModal";
import MapSection from "@/components/layout/MapSection";

const EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULT_PHONE = "+1 725-334-7214";
const YOUTUBE_ID = "ZiuqW8CYkuA";
const CTA_LABEL = "Claim My Free Consultation";
const CTA_SHORT = "Claim Free Consult";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const HERO_BULLETS = [
  "Increase length up to 1 inch",
  "Increase girth up to 0.5 inch",
  "No surgery, no fillers",
  "Discreet & confidential",
];

const OFFER_ITEMS = [
  "Provider Consultation",
  "Physical Evaluation",
  "Personalized Protocol Plan",
];
const OFFER_TOTAL = "$500";
const OFFER_PRICE = "FREE";


const STATS = [
  { value: "12+", label: "Years serving Las Vegas men" },
  { value: "3,400+", label: "Patients treated" },
  { value: "4.9/5", label: "Average patient rating" },
  { value: "100%", label: "Reported length gain in study" },
];

const SYMPTOMS = [
  "You want more length without surgery or fillers",
  "You've tried pills or pumps with no lasting result",
  "You're avoiding intimacy because of confidence",
  "You've been quoted thousands for risky procedures",
  "You want a clinically proven, drug-free protocol",
  "You want results that improve over months, not fade in weeks",
];

const INCLUDED = [
  {
    icon: Stethoscope,
    title: "Provider Consultation",
    price: "$250",
    text: "A one-on-one, confidential sit-down with our medical team to review your goals, history, and questions. No pressure, no judgement.",
    image: "/images/sexual-wellness/p-long/sex-therapy-wellness.jpg",
  },
  {
    icon: ClipboardList,
    title: "Physical Evaluation",
    price: "$150",
    text: "A discreet, thorough evaluation to confirm you're a candidate for the P-Long® Protocol and identify anything that could impact your results.",
    image: "/images/sexual-wellness/p-long/condition-header-penis-enlargement.jpg",
  },
  {
    icon: Syringe,
    title: "Personalized Protocol Plan",
    price: "$100",
    text: "A tailored 6-month P-Long® plan with realistic expectations, exact treatment cadence, and transparent pricing. Walk out with a real path forward.",
    image: "/images/lp-images/Sovereign-Toronto-Penis-Enlargement-1.webp",
  },
];

const PATHS = [
  {
    title: "Doing nothing",
    tag: "Confidence keeps sinking",
    icon: TrendingDown,
    points: [
      "Insecurity grows every year",
      "Intimacy issues compound",
      "Relationships take the hit",
    ],
    highlight: false,
  },
  {
    title: "Surgery or fillers",
    tag: "Risky & often shortens",
    icon: X,
    points: [
      "$10K–$20K+ out of pocket",
      "Infection, scar tissue, downtime",
      "Results fade in 1–2 years",
    ],
    highlight: false,
  },
  {
    title: "P-Long® Protocol",
    tag: "Clinically proven & drug-free",
    icon: CheckCircle2,
    points: [
      "Free consultation, zero risk",
      "Up to 1 inch of natural length",
      "Long-term results, no surgery",
    ],
    highlight: true,
  },
];

const STEPS = [
  {
    title: "Book your consultation",
    time: "60 SECONDS",
    text: "Reserve your free, confidential P-Long® consultation online or by phone. Same-week appointments almost always available.",
    icon: Calendar,
  },
  {
    title: "Meet with our medical team",
    time: "45 MINUTES",
    text: "Sit down with a Revival provider to review your goals, health history, and candidacy for the P-Long® Protocol. No pressure, no obligation.",
    icon: Handshake,
  },
  {
    title: "Start your protocol",
    time: "SAME WEEK",
    text: "Get a personalized 6-month P-Long® plan with clear pricing and start your journey with expert medical supervision.",
    icon: Sparkles,
  },
];

const TIMELINE = [
  {
    when: "Visit 1",
    tag: "TODAY",
    text: "Free consultation, evaluation, and a personalized P-Long® plan tailored to your goals. Walk out knowing your exact next step.",
  },
  {
    when: "Month 1–2",
    tag: "MOMENTUM",
    text: "Begin your protocol under expert medical supervision. Early tissue response builds the foundation for growth.",
  },
  {
    when: "Month 3–4",
    tag: "PROGRESS",
    text: "Most men report measurable length gain. Confidence starts to return and intimate performance improves.",
  },
  {
    when: "Month 6",
    tag: "RESULTS",
    text: "Full protocol complete. In the clinical study, 100% of men reported length gain, averaging nearly a full inch.",
  },
];

const REASONS = [
  {
    icon: Award,
    title: "Only clinically proven protocol",
    text: "P-Long® is the first and only non-surgical, clinically studied protocol shown to increase length and girth.",
  },
  {
    icon: UserCheck,
    title: "Board-experienced providers",
    text: "Your protocol is directed by licensed medical providers, not techs, not spas.",
  },
  {
    icon: Shield,
    title: "Discreet & confidential",
    text: "Private rooms, unmarked billing, and providers who treat you with respect, always.",
  },
  {
    icon: HeartPulse,
    title: "Root-cause approach",
    text: "We don’t just chase size. We also screen for hormonal and vascular issues that hold men back.",
  },
  {
    icon: Lock,
    title: "No pressure, no contracts",
    text: "Free consultation. Transparent pricing. You decide when you’re ready. We’re not going anywhere.",
  },
  {
    icon: Sparkles,
    title: "Whole-man wellness",
    text: "Hormone therapy, sexual wellness, and regenerative care under one Las Vegas roof.",
  },
];

const CONCERNS = [
  {
    label: "Wanting more length",
    image: "/images/lp-images/more-length.webp",
  },
  {
    label: "Wanting more girth",
    image: "/images/sexual-wellness/p-long/condition-header-penis-enlargement.jpg",
  },
  {
    label: "Erection strength",
    image: "/images/sexual-wellness/sw-man-confident.jpg",
  },
  {
    label: "Confidence in the bedroom",
    image: "/images/lp-images/confidence-in-bedroom.avif",
  },
  {
    label: "Post-Peyronie’s concerns",
    image: "/images/sexual-wellness/sw-medical-vial.jpg",
  },
  {
    label: "Age-related decline",
    image: "/images/lp-images/age-related-decline.avif",
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

const CREDENTIALS = [
  { title: "Licensed medical providers", sub: "Nevada board-experienced team" },
  { title: "P-Long® certified", sub: "Trained on the clinical protocol" },
  { title: "FDA-approved technology", sub: "Where applicable to your plan" },
  { title: "4.9★ patient rating", sub: "Across verified reviews" },
];

const buildFaqs = (phone: string) => [
  {
    q: "Is the consultation really free?",
    a: "Yes. There is zero cost and zero obligation. Your free consultation includes a private sit-down with our medical team, a physical evaluation, and a personalized protocol plan, a $500 value at no charge for new patients.",
  },
  {
    q: "How much length and girth can I expect?",
    a: "In the P-Long® clinical study, 100% of men reported increased length, averaging nearly a full inch. Girth improvements of up to half an inch are also commonly reported. Individual results vary and your provider will set realistic expectations at your consultation.",
  },
  {
    q: "Is P-Long® surgery?",
    a: "No. P-Long® is the first and only non-surgical, clinically proven protocol. There are no scalpels, no permanent implants, and no long recovery.",
  },
  {
    q: "How long does the protocol take?",
    a: "The full P-Long® protocol is 6 months. Most patients begin noticing changes within the first 3 months, with full results measured at the 6-month mark.",
  },
  {
    q: "How discreet is the process?",
    a: "Extremely. Private treatment rooms, discreet billing descriptors, and providers who understand the sensitive nature of men’s health. Nothing is shared with anyone without your consent.",
  },
  {
    q: "How do I get started?",
    a: "Click any “Claim My Free Consultation” button on this page or call " +
      phone +
      ". A member of our medical team will reach out to schedule a time that works for you.",
  },
];

function OfferBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-revival-gold/40 bg-revival-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold ${className}`}
    >
      <Gift className="h-3 w-3" />
      Limited Time • New Patients Only
    </span>
  );
}

export default function PLongLanding({
  thankYouPath,
  phone = DEFAULT_PHONE,
  trackCallConversion = false,
  formId,
  formName,
}: {
  thankYouPath?: string;
  phone?: string;
  trackCallConversion?: boolean;
  formId?: string;
  formName?: string;
} = {}) {
  const faqs = buildFaqs(phone);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Flag <body> so globals.css can lift the accessibility trigger and chat
  // widget clear of this page's fixed mobile CTA bar (see globals.css).
  useEffect(() => {
    document.body.classList.add("rvw-plong-cta-visible");
    return () => {
      document.body.classList.remove("rvw-plong-cta-visible");
    };
  }, []);

  const openModal = () => setModalOpen(true);
  const onCallClick = trackCallConversion
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        reportPhoneClickConversion(phone);
      }
    : undefined;

  return (
    <>
      {/* ═══════════════════════ OFFER BAR ═══════════════════════ */}
      <div className="sticky top-16 z-40 overflow-hidden border-b border-revival-gold/25 bg-gradient-to-r from-revival-gold to-revival-gold-light py-2 text-revival-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-center text-xs font-semibold uppercase tracking-[0.08em] sm:text-sm">
          <Gift className="h-3.5 w-3.5 shrink-0" />
          Limited Time &middot; New Patients Only
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
        {/* Hero background photo (subtle, behind the ambient blur blobs).
            Uses a plain CSS background-image on a decorative div rather than
            next/image, because <Image fill priority> has proven to interfere
            with framer-motion mount timing in this Next 16 + React 19 +
            Turbopack stack. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/images/lp-images/hero-bg.webp')" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-revival-dark/60 via-revival-dark/40 to-revival-dark/70"
        />
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

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
          {/* LEFT: Copy, uses plain CSS keyframe `.lp-reveal` reveal instead
              of framer-motion variants, which have proven unreliable in
              this stack (see globals.css for details). */}
          <div>
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
              Add up to a{" "}
              <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
                full inch
              </span>{" "}
              without surgery.
            </h1>

            <p
              className="lp-reveal mt-5 max-w-xl text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              A complete P-Long<sup>&reg;</sup> new-patient visit: private
              provider consultation, physical evaluation, and a personalized
              protocol plan designed to give you a clear, medically
              guided path to more length and girth. A{" "}
              <span className="font-semibold text-revival-gold">$500 value</span>{" "}
              for <span className="font-semibold text-revival-gold">FREE</span>.
            </p>

            <ul
              className="lp-reveal mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
              style={{ ["--reveal-delay" as string]: "300ms" }}
            >
              {HERO_BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm font-medium text-revival-cream/90"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-revival-gold" />
                  {b}
                </li>
              ))}
            </ul>

            <div
              className="lp-reveal mt-8 flex flex-wrap items-center gap-3"
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
                href={telHref(phone)}
                onClick={onCallClick}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-revival-cream/90 transition-colors hover:border-revival-gold hover:text-revival-gold"
              >
                <Phone className="h-4 w-4 text-revival-gold" />
                {phone}
              </a>
            </div>

            <p
              className="lp-reveal mt-4 text-xs text-revival-cream/50"
              style={{ ["--reveal-delay" as string]: "500ms" }}
            >
              *Some restrictions apply. New patients only.
            </p>
          </div>

          {/* RIGHT: Offer card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-gradient-to-br from-revival-charcoal via-revival-dark to-black p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-revival-gold/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-revival-gold/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-revival-gold/40 bg-revival-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  <Sparkles className="h-3 w-3" />
                  P-Long&reg; Special
                </span>
                <span className="rounded-full bg-revival-gold/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  Save 100%
                </span>
              </div>

              <div className="relative mt-6 text-center">
                <p className="font-heading text-[3.5rem] leading-none text-white sm:text-[4.5rem]">
                  <span className="bg-gradient-to-b from-white to-revival-gold-light bg-clip-text text-transparent">
                    {OFFER_PRICE}
                  </span>
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-revival-cream/85">
                  Complete new-patient visit
                </p>
                <p className="mt-1 text-xs text-revival-cream/55">
                  Regular value{" "}
                  <span className="line-through">{OFFER_TOTAL}</span>
                </p>
              </div>

              <ul className="relative mt-6 space-y-3 border-y border-white/10 py-5">
                {OFFER_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-revival-cream/85"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-revival-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={openModal}
                className="group relative mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.75)] transition-transform duration-300 hover:scale-[1.02]"
              >
                Book My Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.14em] text-revival-cream/50">
                Limited appointments &middot; Book today
              </p>
            </div>
          </motion.div>
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
            4.9 / 5 patient rating
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-revival-gold" />
            Licensed medical providers
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-revival-gold" />
            100% confidential
          </span>
          <span className="flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5 text-revival-gold" />
            3,400+ patients served
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

      {/* ═══════════════════════ RESULTS / VIDEO ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <motion.div
              variants={fadeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
                Watch Your Results
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                Most patients see measurable growth by month 3, with peak
                results at month 6.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 text-base font-light leading-relaxed text-revival-cream/75"
              >
                We track your progress at every visit: objective
                measurements, not just “how do you feel?” The average
                patient reports nearly a full inch of length gain by the end of
                the 6-month protocol.
              </motion.p>
              <motion.ul variants={fadeUp} className="mt-6 space-y-3">
                {[
                  "Objective measurements, tracked visit by visit",
                  "Girth and erection quality re-assessed monthly",
                  "Protocol adjusted to your real progress",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-revival-cream/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                    {item}
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="mt-8">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  Start Your Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
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
                      src="/images/lp-images/p-long-video-thumbnail.png"
                      alt="P-Long protocol at Revival Health & Wellness"
                      fill
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
                        <Play
                          className="ml-1 h-8 w-8 fill-revival-dark text-revival-dark"
                          strokeWidth={0}
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90">
                      <Play className="h-3 w-3 fill-white" strokeWidth={0} />
                      Watch: How the Protocol Works
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SYMPTOMS ═══════════════════════ */}
      <section className="bg-revival-dark py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
              Built For You If…
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl"
            >
              If any of these sound like you, this visit was built for you.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {SYMPTOMS.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-revival-gold" />
                <p className="text-sm font-light leading-relaxed text-revival-cream/85">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ WHAT'S INCLUDED ═══════════════════════ */}
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
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              A complete new-patient visit. Nothing left out.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-medium text-revival-charcoal/70">
              Three essentials to understand your goals and start your protocol,
              bundled into one risk-free new-patient visit.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {INCLUDED.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-revival-gold/15 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">
                    <f.icon className="h-5 w-5 text-revival-gold" />
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-revival-dark shadow-sm">
                    {f.price}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl text-revival-dark">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    {f.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-revival-dark p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-tagline text-xs text-revival-gold">
                  Watch The Savings
                </p>
                <h3 className="mt-2 font-heading text-2xl text-white sm:text-3xl">
                  $500 of care for free.
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-revival-cream/70">
                  A $500 savings on the most important visit you can make for
                  your confidence. Your first one.
                </p>
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  Lock In My Free Visit
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: "Regular value",
                    value: "$500",
                    width: "100%",
                    color: "from-white/40 to-white/70",
                  },
                  {
                    label: "Your price today",
                    value: "FREE",
                    width: "0%",
                    color: "from-revival-gold/40 to-revival-gold",
                  },
                  {
                    label: "You save",
                    value: "$500",
                    width: "100%",
                    color: "from-revival-gold to-revival-gold-light",
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-revival-cream/70">
                      <span>{row.label}</span>
                      <span className="text-revival-gold">{row.value}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                        style={{ width: row.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ COMPARE PATHS ═══════════════════════ */}
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
              Compare Your Options
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Three paths. One that actually solves the problem.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {PATHS.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className={`relative overflow-hidden rounded-[1.5rem] border p-7 ${
                  p.highlight
                    ? "border-revival-gold/50 bg-gradient-to-br from-revival-dark to-revival-charcoal text-white shadow-[0_30px_80px_-30px_rgba(201,169,110,0.5)]"
                    : "border-revival-gold/15 bg-white text-revival-dark"
                }`}
              >
                {p.highlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-dark">
                    Best Path
                  </span>
                )}
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    p.highlight ? "bg-revival-gold/20" : "bg-revival-gold/10"
                  }`}
                >
                  <p.icon
                    className={`h-6 w-6 ${p.highlight ? "text-revival-gold" : "text-revival-gold"}`}
                  />
                </span>
                <h3 className="mt-5 font-heading text-xl">{p.title}</h3>
                <p
                  className={`mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                    p.highlight ? "text-revival-gold" : "text-revival-charcoal/60"
                  }`}
                >
                  {p.tag}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className={`flex items-start gap-2 text-sm font-light leading-relaxed ${
                        p.highlight ? "text-revival-cream/85" : "text-revival-charcoal/75"
                      }`}
                    >
                      {p.highlight ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-revival-charcoal/40" />
                      )}
                      {pt}
                    </li>
                  ))}
                </ul>
                {p.highlight && (
                  <button
                    type="button"
                    onClick={openModal}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-revival-dark transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Choose This Path
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
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
              How It Works
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Three simple steps to results.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-revival-charcoal/70">
              No high-pressure sales pitch. No mystery fees. Just a clear path
              from “I’m interested” to “I feel like me again.”
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
                className="relative rounded-[1.5rem] border border-revival-gold/15 bg-revival-warm-white p-7"
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

      {/* ═══════════════════════ PROVIDER / FOUNDER ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-revival-gold/15 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-revival-gold/20 bg-revival-warm-white"
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
              variants={fadeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
                Meet Your Provider
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-3 font-heading text-3xl text-revival-dark sm:text-4xl"
              >
                Radford Raquedan,{" "}
                <span className="text-revival-gold">NP</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-sm font-light leading-relaxed text-revival-charcoal/75">
                Radford has dedicated over a decade to men’s health,
                specializing in hormone optimization, sexual wellness, and
                regenerative therapies. At Revival, his goal at your free
                consultation is simple:{" "}
                <span className="font-semibold text-revival-dark">
                  listen, understand your goals, and design a real plan.
                </span>
              </motion.p>
              <motion.ul
                variants={fadeUp}
                className="mt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-2"
              >
                {[
                  "10+ yrs clinical practice",
                  "Nurse Practitioner (NP)",
                  "P-Long® certified provider",
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

              <motion.div variants={fadeUp} className="mt-7 grid grid-cols-3 gap-4 border-t border-revival-gold/15 pt-6">
                {[
                  { v: "10+", l: "Years" },
                  { v: "3.4k+", l: "Patients" },
                  { v: "4.9★", l: "Rated" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="font-heading text-2xl text-revival-dark">{s.v}</p>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/60">
                      {s.l}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-revival-dark px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:bg-revival-charcoal"
                >
                  Meet Your Provider
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={telHref(phone)}
                  onClick={onCallClick}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-revival-charcoal/70 transition-colors hover:text-revival-gold"
                >
                  <Phone className="h-4 w-4 text-revival-gold" />
                  {phone}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TIMELINE ═══════════════════════ */}
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
              Your Growth Roadmap
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl"
            >
              What to expect after your free consultation.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-revival-cream/70">
              Care is personalized to you, but here’s the typical arc most
              patients experience.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative mx-auto mt-12 max-w-3xl"
          >
            <div
              aria-hidden
              className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-revival-gold via-revival-gold/40 to-transparent sm:block sm:left-6"
            />
            <div className="space-y-5">
              {TIMELINE.map((t) => (
                <motion.div
                  key={t.when}
                  variants={fadeUp}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:pl-16"
                >
                  <span className="absolute left-4 top-5 hidden h-4 w-4 rounded-full border-2 border-revival-gold bg-revival-dark sm:left-4 sm:block" />
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-lg text-white">{t.when}</h3>
                    <span className="rounded-full bg-revival-gold/15 px-3 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                      {t.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-light leading-relaxed text-revival-cream/75">
                    {t.text}
                  </p>
                </motion.div>
              ))}
            </div>
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
              Six reasons Las Vegas men trust us with this.
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
                className="rounded-[1.25rem] border border-revival-gold/15 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
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

      {/* ═══════════════════════ ABOUT P-LONG PROTOCOL ═══════════════════════ */}
      <section className="bg-revival-warm-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
              <div className="p-8 sm:p-10 lg:p-12">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-revival-gold/30 bg-revival-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  <Sparkles className="h-3 w-3" />
                  About The Protocol
                </span>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl">
                  Curious about the P-Long<sup>&reg;</sup> Protocol?
                </h2>
                <p className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/75">
                  P-Long<sup>&reg;</sup> is the first and only clinically proven,
                  non-surgical protocol to naturally increase length and girth.
                  Learn how it works, what the study showed, and what real
                  patients have experienced.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-revival-charcoal/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-revival-gold" />
                    Drug-free, surgery-free
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-revival-gold" />
                    Stimulates your body’s own tissue growth
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-revival-gold" />
                    Results measured, not promised
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={openModal}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-revival-dark px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:bg-revival-charcoal"
                >
                  Learn About P-Long<sup>&reg;</sup>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="relative min-h-[280px] lg:min-h-[400px]">
                {/* Plain CSS background-image (not next/image) — matches the
                    hero's approach. next/image's lazy-loaded <img> inside this
                    whileInView-animated card has proven unreliable to actually
                    load/paint in this stack; a CSS background always renders. */}
                <div
                  aria-hidden
                  role="img"
                  aria-label="P-Long Protocol at Revival Health & Wellness"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/lp-images/about-photo.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur">
                    <p className="text-tagline text-[0.6rem] text-revival-gold">
                      Clinically Studied
                    </p>
                    <p className="mt-1 font-heading text-lg text-revival-dark">
                      100% length gain reported
                    </p>
                    <p className="text-xs text-revival-charcoal/60">
                      0% negative side effects in study participants
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ COMMON CONCERNS ═══════════════════════ */}
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
              Use Your Free Consult For
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.75rem]"
            >
              Common concerns we address.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-revival-charcoal/70">
              Whether it’s size, performance, or confidence, this
              visit gives us the information to help you.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {CONCERNS.map((c) => (
              <motion.div
                key={c.label}
                variants={fadeUp}
                className="group overflow-hidden rounded-2xl border border-revival-gold/15 bg-revival-warm-white"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-revival-dark/70 via-revival-dark/10 to-transparent" />
                </div>
                <p className="p-3 text-center text-xs font-semibold text-revival-dark">
                  {c.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center"
          >
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
            >
              See If We Can Help: Free Consult
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-revival-charcoal/60">
              <Star className="h-4 w-4 fill-revival-gold text-revival-gold" />
              4.9 / 5 average &middot; 500+ reviews
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
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
              Real Stories
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Real stories from real Las Vegas patients.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-revival-cream/70">
              These visits started with the same free consultation you’re
              looking at now.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <motion.figure
                key={t.author}
                variants={fadeUp}
                className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
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
                <blockquote className="mt-4 flex-1 text-sm font-light italic leading-relaxed text-revival-cream/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light font-heading text-sm font-semibold text-revival-dark">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-[0.7rem] uppercase tracking-[0.14em] text-revival-cream/60">
                      {t.city}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 text-center"
          >
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Start My Story: Free Consult
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FILLS UP FAST + CREDENTIALS ═══════════════════════ */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT: Fills Up Fast copy + CTA */}
            <motion.div
              variants={fadeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
                Limited Spots
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl lg:text-[2.5rem]"
              >
                This offer fills up fast.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/75">
                We intentionally cap the number of free new-patient
                consultations per week so every patient gets unrushed,
                one-on-one time. Once this week&rsquo;s spots are taken,
                you&rsquo;ll have to wait, or pay $500 next time.
              </motion.p>
              <motion.ul
                variants={fadeUp}
                className="mt-6 grid grid-cols-1 gap-3 text-sm text-revival-charcoal/80 sm:grid-cols-2"
              >
                {[
                  "Same-week appointments usually available",
                  "Online booking takes about 60 seconds",
                  "No long-term contracts, ever",
                  "100% confidential process",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-left">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                    {item}
                  </li>
                ))}
              </motion.ul>
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

            {/* RIGHT: Credentials */}
            <motion.div
              variants={fadeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-[1.75rem] border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8"
            >
              <motion.span variants={fadeUp} className="text-tagline text-xs text-revival-gold">
                Trusted & Recognized
              </motion.span>
              <motion.h3
                variants={fadeUp}
                className="mt-3 font-heading text-2xl leading-tight text-revival-dark sm:text-3xl"
              >
                Credentials Las Vegas men rely on.
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-3 text-sm font-light leading-relaxed text-revival-charcoal/70">
                Award-winning care backed by clinical training and advanced
                medical protocols, so you know you&rsquo;re in expert
                hands from your very first visit.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {CREDENTIALS.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-revival-gold/15 bg-revival-warm-white p-5 text-center"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-revival-gold/10">
                      <ShieldCheck className="h-5 w-5 text-revival-gold" />
                    </span>
                    <p className="mt-3 font-heading text-sm text-revival-dark sm:text-base">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[0.7rem] leading-relaxed text-revival-charcoal/60">
                      {c.sub}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
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
              Everything you need to know before you claim your free
              consultation. Still have questions? Call us at{" "}
              <a
                href={telHref(phone)}
                onClick={onCallClick}
                className="font-semibold text-revival-dark underline decoration-revival-gold/60 underline-offset-4 hover:text-revival-gold"
              >
                {phone}
              </a>
              .
            </motion.p>
          </motion.div>

          <div className="mt-10 divide-y divide-revival-gold/15 rounded-2xl border border-revival-gold/15 bg-revival-warm-white">
            {faqs.map((f, i) => {
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
            Stop wondering.{" "}
            <span className="bg-gradient-to-r from-revival-gold to-revival-gold-light bg-clip-text italic text-transparent">
              Start growing today.
            </span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg">
            A complete new-patient visit: consultation, physical evaluation, and
            a personalized P-Long<sup>&reg;</sup> protocol plan. Everything you
            need to make an informed decision. Spots this week are limited.
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
              href={telHref(phone)}
              onClick={onCallClick}
              className="inline-flex items-center gap-2 text-sm font-medium text-revival-cream/90 transition-colors hover:text-revival-gold"
            >
              <Phone className="h-4 w-4 text-revival-gold" />
              Or call {phone}
            </a>
          </div>

          <p className="mt-8 text-xs text-revival-cream/50">
            *Some restrictions apply. New patients only. Cannot be combined with
            other offers.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════ STICKY MOBILE CTA ═══════════════════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-revival-gold/25 bg-revival-dark/95 p-3 backdrop-blur-xl lg:hidden">
        <a
          href={telHref(phone)}
          onClick={onCallClick}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-revival-gold"
          aria-label={`Call ${phone}`}
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

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        thankYouPath={thankYouPath}
        formId={formId}
        formName={formName}
      />
    </>
  );
}
