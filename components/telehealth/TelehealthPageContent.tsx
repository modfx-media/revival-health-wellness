"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Pill,
  Play,
  Shield,
  ShieldCheck,
  Signal,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  Timer,
  UserCircle2,
  Video,
  Wifi,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

// ─── Shared bits ────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-tagline inline-flex items-center gap-2 rounded-full border border-revival-gold/25 bg-white/[0.03] px-3.5 py-1.5 text-xs text-revival-gold backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Heading({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <h2
      className={
        "mt-5 font-heading text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-6xl " +
        (tone === "dark" ? "text-revival-dark" : "text-white")
      }
    >
      {children}
    </h2>
  );
}

// ─── 1) Split intro - headline + stats + framed image with floating badges ──

function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
      {/* soft gold ambience */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-revival-gold/15 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-revival-gold/10 blur-[160px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-8">
        {/* Left: copy */}
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Concierge care, virtual visits</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading>
              Real medical care.{" "}
              <span className="italic text-revival-gold">Zero drive time.</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg font-light leading-relaxed text-revival-charcoal/80"
          >
            Meet a licensed Revival provider by secure video from anywhere in
            Nevada. Weight loss, hormone therapy, sexual wellness, and
            follow-up visits-delivered from your living room with the same
            personalized attention you&apos;d get in-clinic.
          </motion.p>

          {/* Stat trio */}
          <motion.dl
            variants={fadeUp}
            className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-revival-gold/20 rounded-2xl border border-revival-gold/20 bg-white/60 p-5 backdrop-blur-sm"
          >
            {[
              { value: "15 min", label: "Avg visit" },
              { value: "48 hr", label: "Booking window" },
              { value: "100%", label: "HIPAA-secure" },
            ].map((s) => (
              <div key={s.label} className="px-3 text-center">
                <dt className="font-heading text-2xl text-revival-gold sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-revival-charcoal/60">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <a
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-dark shadow-[0_10px_28px_-10px_rgba(201,169,110,0.6)] transition-transform hover:scale-[1.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Book Your Virtual Consultation</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/quiz/"
              className="inline-flex items-center gap-2 rounded-full border border-revival-dark/15 bg-white/60 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-charcoal backdrop-blur transition-colors hover:border-revival-gold/50 hover:text-revival-gold"
            >
              Take the Quiz
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: framed hero image with floating badges */}
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <motion.div
            variants={fadeUp}
            className="relative aspect-[3/2] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.35)]"
          >
            <Image
              src="/images/page-banners/telehealth-banner-1.jpeg"
              alt="Patient meeting with a Revival provider by secure video from home"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              quality={90}
              priority
            />
            {/* subtle warm gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-revival-dark/40 via-transparent to-transparent" />
          </motion.div>

          {/* Floating "live call" badge */}
          <motion.div
            variants={fadeUp}
            className="absolute -left-5 top-8 flex items-center gap-2.5 rounded-2xl border border-white/50 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-charcoal/60">
                Live now
              </p>
              <p className="text-sm font-semibold text-revival-dark">
                Video visit · 15:24
              </p>
            </div>
          </motion.div>

          {/* Floating provider chip */}
          <motion.div
            variants={fadeUp}
            className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl border border-white/50 bg-revival-dark px-4 py-3 text-revival-warm-white shadow-2xl"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-revival-gold">
              <Image
                src="/images/about/team/sanaz-salmani.png"
                alt="Sanaz Salmani, provider"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-gold">
                Provider
              </p>
              <p className="text-sm font-semibold">Sanaz Salmani</p>
            </div>
          </motion.div>

          {/* Trust chip */}
          <motion.div
            variants={fadeUp}
            className="absolute -right-4 top-24 hidden items-center gap-2 rounded-full border border-revival-gold/25 bg-white/90 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-revival-charcoal shadow-lg backdrop-blur sm:flex"
          >
            <ShieldCheck className="h-4 w-4 text-revival-gold" />
            HIPAA-Secure
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2) How it works - 4-step process with connecting rail ─────────────────

const STEPS = [
  {
    n: "01",
    title: "Book online",
    text: "Pick a time that fits your schedule. Instant confirmation-no phone tag, no forms to print.",
    Icon: CalendarCheck,
  },
  {
    n: "02",
    title: "Meet on video",
    text: "Join a secure link. Your provider reviews your goals, history, and any concerns face-to-face.",
    Icon: Video,
  },
  {
    n: "03",
    title: "Labs & Rx",
    text: "If needed, we order labs at a facility near you and route prescriptions to your preferred pharmacy.",
    Icon: FlaskConical,
  },
  {
    n: "04",
    title: "Follow-up",
    text: "Check-ins by video, phone, or message so we can adjust your plan as your body responds.",
    Icon: MessageSquare,
  },
];

function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-20 text-revival-warm-white lg:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,110,0.15),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>How it works</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading tone="light">
              Four steps from{" "}
              <span className="italic text-revival-gold">click</span> to care
            </Heading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg font-light text-revival-warm-white/70"
          >
            The full Revival experience-minus the commute, the waiting room,
            and the paper forms.
          </motion.p>
        </motion.div>

        {/* Connecting rail */}
        <div className="relative mt-16">
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-revival-gold/30 to-transparent lg:block"
          />

          <motion.ol
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {STEPS.map((s) => (
              <motion.li
                key={s.n}
                variants={fadeUp}
                className="group relative"
              >
                {/* Icon circle */}
                <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-revival-gold/40 bg-revival-dark shadow-[0_0_0_6px_rgba(201,169,110,0.06)] transition-transform duration-500 group-hover:-translate-y-1">
                  <s.Icon className="h-7 w-7 text-revival-gold" />
                </div>
                <p className="mt-5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-revival-gold">
                  Step {s.n}
                </p>
                <h3 className="mt-1 text-center font-heading text-2xl text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-center text-sm font-light leading-relaxed text-revival-warm-white/70">
                  {s.text}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

// ─── 3) Device mockup - laptop frame with a "video call" screen ────────────

function DeviceMockupSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
        {/* Left: copy */}
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>What a visit looks like</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading>
              A face-to-face visit,{" "}
              <span className="italic text-revival-gold">on your couch</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg font-light leading-relaxed text-revival-charcoal/80"
          >
            No app to download. No forms to sign twice. Just click your secure
            link, and you&apos;re face-to-face with a Revival provider who has
            already reviewed your intake and lab history.
          </motion.p>

          <motion.ul
            variants={fadeContainer}
            className="mt-8 space-y-4"
          >
            {[
              {
                Icon: Video,
                text: "Encrypted, HIPAA-compliant video-no third-party sign-ins",
              },
              {
                Icon: Signal,
                text: "Works on any phone, tablet, or laptop",
              },
              {
                Icon: ClipboardList,
                text: "Provider already has your intake, labs, and history",
              },
              {
                Icon: Pill,
                text: "Prescriptions sent to your pharmacy before you hang up",
              },
            ].map((f) => (
              <motion.li
                key={f.text}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-revival-gold/30 bg-white text-revival-gold">
                  <f.Icon className="h-4 w-4" />
                </span>
                <span className="pt-1.5 text-revival-charcoal/85">
                  {f.text}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: laptop mockup */}
        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* Laptop bezel */}
            <div className="relative rounded-[1.5rem] border border-revival-dark/10 bg-gradient-to-b from-white to-revival-cream p-3 shadow-[0_50px_120px_-40px_rgba(15,15,15,0.4)]">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-revival-dark">
                <Image
                  src="/images/page-banners/telehealth-banner-2.jpg"
                  alt="Video visit interface with a Revival provider"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  quality={90}
                />
                {/* UI overlay: call controls */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-gradient-to-t from-revival-dark/85 to-transparent p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                    <Video className="h-4 w-4" />
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                    <Play className="h-4 w-4 rotate-90" />
                  </span>
                </div>
                {/* Top-left status pill */}
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-revival-dark/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live · Encrypted
                </div>
                {/* Self-view thumbnail */}
                <div className="absolute right-3 top-3 hidden h-16 w-24 overflow-hidden rounded-lg border-2 border-white/60 shadow-lg sm:block">
                  <Image
                    src="/images/page-banners/telehealth-banner-3.jpg"
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Laptop base */}
            <div className="mx-auto mt-1 h-2.5 w-[92%] rounded-b-[1.5rem] bg-gradient-to-b from-revival-charcoal/20 to-transparent" />
          </motion.div>

          {/* Floating review card - sits below the laptop, not on top of it */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mx-auto mt-6 hidden max-w-[280px] rounded-2xl border border-revival-gold/25 bg-white/95 p-4 shadow-xl backdrop-blur sm:block lg:absolute lg:mx-0 lg:mt-0 lg:right-[-72px] lg:bottom-[-56px] lg:max-w-[240px]"
          >
            <div className="flex items-center gap-2 text-revival-gold">
              <Star className="h-4 w-4 fill-revival-gold" />
              <Star className="h-4 w-4 fill-revival-gold" />
              <Star className="h-4 w-4 fill-revival-gold" />
              <Star className="h-4 w-4 fill-revival-gold" />
              <Star className="h-4 w-4 fill-revival-gold" />
            </div>
            <p className="mt-2 text-sm font-light italic leading-relaxed text-revival-charcoal/80">
              &ldquo;My provider called in my prescription before I even hung
              up. It felt exactly like being in the clinic.&rdquo;
            </p>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/50">
              - Revival Patient
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 4) What we treat - icon grid ──────────────────────────────────────────

const TREATABLE = [
  {
    Icon: HeartPulse,
    title: "Weight Loss Consultations",
    text: "New GLP-1, Phentermine, and vitamin injection programs.",
    href: "/weight-loss/",
  },
  {
    Icon: Stethoscope,
    title: "Hormone Therapy Reviews",
    text: "HRT check-ins, dose adjustments, and lab result reviews.",
    href: "/hormone-therapy/",
  },
  {
    Icon: Shield,
    title: "Sexual Wellness",
    text: "Discreet consultations for ED, low libido, and ongoing therapy.",
    href: "/sexual-wellness/",
  },
  {
    Icon: Pill,
    title: "Refills & Rx Adjustments",
    text: "Fine-tune your existing plan without an in-clinic visit.",
    href: "/contact-us/",
  },
  {
    Icon: FlaskConical,
    title: "Lab Result Reviews",
    text: "Review your bloodwork with a provider and update the plan.",
    href: "/contact-us/",
  },
  {
    Icon: UserCircle2,
    title: "Educational Visits",
    text: "Learn about a treatment before booking your first in-clinic session.",
    href: "/contact-us/",
  },
];

function TreatableGridSection() {
  return (
    <section className="relative bg-revival-cream py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>What we treat virtually</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading>
              Most Revival care,{" "}
              <span className="italic text-revival-gold">delivered online</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg font-light text-revival-charcoal/75"
          >
            Some treatments still need an in-clinic visit-we&apos;ll always
            tell you which is which. Everything below is fair game for a
            virtual first appointment.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TREATABLE.map((t) => (
            <motion.div key={t.title} variants={fadeUp}>
              <Link
                href={t.href}
                className="group relative flex h-full flex-col rounded-3xl border border-revival-gold/15 bg-white/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/40 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold/20 to-revival-gold/5 text-revival-gold">
                  <t.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-heading text-xl text-revival-dark">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-revival-charcoal/75">
                  {t.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 5) Trust bar - HIPAA / licensed / secure ──────────────────────────────

// ─── Feature callout - Revival branded telehealth image ────────────────────

function FeatureSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Telehealth Care</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading>
              Concierge-level care,{" "}
              <span className="italic text-revival-gold">delivered virtually</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-revival-charcoal/75"
          >
            Meet your Revival provider from home, work, or wherever life takes
            you. Same physician-led plans for weight loss, hormone therapy, and
            sexual wellness - with labs, prescriptions, and follow-ups handled
            without a single trip to the clinic.
          </motion.p>
          <motion.ul
            variants={fadeUp}
            className="mt-8 grid grid-cols-1 gap-3 text-sm text-revival-charcoal/80 sm:grid-cols-2"
          >
            {[
              { Icon: Video, label: "Secure HD video visits" },
              { Icon: ClipboardList, label: "Personalized care plans" },
              { Icon: Pill, label: "Prescriptions shipped to you" },
              { Icon: HeartPulse, label: "Ongoing progress tracking" },
            ].map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-revival-gold" />
                {label}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Link
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-revival-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-revival-charcoal"
            >
              Book a virtual visit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quiz/"
              className="inline-flex items-center gap-2 rounded-full border border-revival-dark/15 bg-white px-6 py-3 text-sm font-semibold text-revival-dark transition hover:border-revival-gold hover:text-revival-gold"
            >
              Take the Quiz
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] shadow-[0_50px_120px_-32px_rgba(201,169,110,0.35)]"
        >
          <Image
            src="/images/telehealth/telehealth-feature.png"
            alt="Revival Health & Wellness telehealth care"
            width={1402}
            height={1122}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full object-cover"
            quality={95}
          />
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { Icon: Lock, label: "HIPAA-compliant video" },
    { Icon: ShieldCheck, label: "Licensed Nevada providers" },
    { Icon: Wifi, label: "Any device, any network" },
    { Icon: Smartphone, label: "No app to install" },
    { Icon: Timer, label: "Same-week appointments" },
  ];
  return (
    <section className="border-y border-revival-gold/20 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-8 sm:px-6 lg:px-8">
        {items.map((i) => (
          <span
            key={i.label}
            className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/70"
          >
            <i.Icon className="h-4 w-4 text-revival-gold" />
            {i.label}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── 6) Providers - meet the team ──────────────────────────────────────────

const PROVIDERS = [
  {
    name: "Sanaz Salmani",
    role: "Nurse Practitioner",
    img: "/images/about/team/sanaz-salmani.png",
  },
  {
    name: "Radford Raquedan",
    role: "Nurse Practitioner",
    img: "/images/about/team/radford-raquedan.png",
  },
  {
    name: "Carola Villasenor",
    role: "Medical Team",
    img: "/images/about/team/carola-villasenor.png",
  },
  {
    name: "Daesja Johnson",
    role: "Medical Team",
    img: "/images/about/team/daesja-johnson.png",
  },
];

function ProvidersSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <motion.div variants={fadeUp}>
              <Eyebrow>You&apos;ll always see a real provider</Eyebrow>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Heading>
                Meet the Revival{" "}
                <span className="italic text-revival-gold">medical team</span>
              </Heading>
            </motion.div>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/about-us/"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:text-revival-dark"
            >
              Full team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8"
        >
          {PROVIDERS.map((p) => (
            <motion.figure
              key={p.name}
              variants={fadeUp}
              className="group text-center"
            >
              <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-3xl bg-revival-cream shadow-lg">
                <Image
                  src={p.img}
                  alt={`${p.name}, ${p.role}`}
                  fill
                  sizes="(min-width: 640px) 22vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/50 via-transparent to-transparent" />
              </div>
              <figcaption className="mt-4">
                <p className="font-heading text-lg text-revival-dark">
                  {p.name}
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-revival-gold">
                  {p.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 7) FAQ ────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is telehealth?",
    a: "Telehealth is a secure video visit with a licensed Revival provider. You get the same personalized care you'd receive in-clinic, just from the comfort of home.",
  },
  {
    q: "Which services can I do virtually?",
    a: "Weight-loss consultations, hormone therapy reviews, sexual wellness consultations, medication adjustments, and follow-up visits are all available online.",
  },
  {
    q: "Can I be prescribed medication over telehealth?",
    a: "Yes-when clinically appropriate and after a proper evaluation. Some prescriptions require baseline labs, which we order from a lab near you.",
  },
  {
    q: "Do you accept insurance for telehealth?",
    a: "Revival is a cash-pay concierge clinic. We provide superbills you can submit to your insurance for potential reimbursement.",
  },
  {
    q: "Is my visit private?",
    a: "Absolutely. All video visits use HIPAA-compliant secure video, and your records are protected under the same privacy standards as an in-clinic visit.",
  },
  {
    q: "What if I need an in-person exam?",
    a: "We'll always tell you when a treatment requires an in-clinic visit. Booking a virtual visit is often the fastest path to figuring out the right next step.",
  },
];

function FAQSection() {
  return (
    <section className="bg-revival-cream py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Frequently asked</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading>Telehealth, explained</Heading>
          </motion.div>
        </motion.div>

        <motion.dl
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 space-y-4"
        >
          {FAQS.map((f) => (
            <motion.details
              key={f.q}
              variants={fadeUp}
              className="group rounded-2xl border border-revival-gold/20 bg-white/70 p-5 backdrop-blur transition-colors hover:border-revival-gold/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-heading text-lg text-revival-dark">
                  {f.q}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-revival-gold/30 bg-white text-revival-gold transition-transform duration-300 group-open:rotate-45">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="mt-4 text-revival-charcoal/80">{f.a}</p>
            </motion.details>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

// ─── 8) Final split CTA ────────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-20 text-revival-warm-white lg:py-24">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-revival-gold/15 blur-[160px]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Book your visit</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading text-4xl leading-[1.05] tracking-[-0.01em] text-white sm:text-5xl lg:text-6xl"
          >
            Meet a provider{" "}
            <span className="italic text-revival-gold">this week.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg font-light text-revival-warm-white/75"
          >
            Free virtual consultations from anywhere in Nevada. No commitment.
            No commute. Just a real conversation about your health with a
            licensed Revival provider.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-dark shadow-[0_10px_28px_-10px_rgba(201,169,110,0.6)] transition-transform hover:scale-[1.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Book Virtual Visit</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:7029631154"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-revival-warm-white transition-colors hover:border-revival-gold/60 hover:text-revival-gold"
            >
              Call (702) 963-1154
            </a>
          </motion.div>

          {/* Quick contact chips */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4 text-sm text-revival-warm-white/70"
          >
            <li className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-revival-gold" />
              Southwest@revivalhealthandwellnessgroup.com
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-revival-gold" />
              Two Las Vegas Locations
            </li>
          </motion.ul>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_50px_120px_-32px_rgba(201,169,110,0.35)]"
        >
          <Image
            src="/images/page-banners/telehealth-banner-4.jpg"
            alt="A Revival provider connecting with a patient by secure video"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            quality={90}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/70 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function TelehealthPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Telehealth"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Telehealth" }]}
        title={
          <>
            <span className="relative inline-block">
              Telehealth
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            from the comfort of home
          </>
        }
        description="Meet a Revival provider by secure video. Same personalized care-weight loss, hormone therapy, sexual wellness-minus the drive."
        gallery={[
          "/images/page-banners/telehealth-banner-1.jpeg",
          "/images/page-banners/telehealth-banner-2.jpg",
          "/images/page-banners/telehealth-banner-3.jpg",
          "/images/page-banners/telehealth-banner-4.jpg",
        ]}
      />

      <IntroSection />
      <TrustBar />
      <FeatureSection />
      <HowItWorksSection />
      <DeviceMockupSection />
      <TreatableGridSection />
      <ProvidersSection />
      <FAQSection />
      <FinalCta />
    </>
  );
}
