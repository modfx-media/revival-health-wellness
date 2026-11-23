"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  FlaskConical,
  Route,
  LineChart,
  HeartPulse,
  Pill,
  Syringe,
  Droplets,
  Play,
  Pause,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import PortraitFrame from "@/components/ui/PortraitFrame";
import WeightLossMotionGraphic from "./WeightLossMotionGraphic";
import WeightLossTestimonials from "./WeightLossTestimonials";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

// Palette per spec (used alongside existing gold tokens).
const BG_DARK = "#1a1208";
const BG_DARKER = "#241a0c";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const APPROACH_STEPS = [
  {
    title: "One-on-one expert consultation",
    text: "A personalized, one-on-one consultation with our experts.",
    icon: ClipboardList,
  },
  {
    title: "Comprehensive lab panel",
    text: "Comprehensive blood panels and in-depth professional evaluations.",
    icon: FlaskConical,
  },
  {
    title: "Custom weight-loss plan",
    text: "A custom weight loss plan crafted to help you lose weight and maintain your results.",
    icon: Route,
  },
  {
    title: "Ongoing support",
    text: "Ongoing support throughout your journey, including educational resources and expert advice.",
    icon: HeartPulse,
  },
  {
    title: "Weekly progress tracking",
    text: "Weekly body composition to analyze and monitor real progress, tracking changes in muscle, water, and fat levels.",
    icon: LineChart,
  },
];

const CANDIDATES = [
  "Have a BMI of 30 or higher",
  "Have struggled with other weight loss methods",
  "Are at risk for health issues related to their weight",
  "Have genetic or medical conditions that make weight management more challenging",
];

const STATS = [
  { value: 500, suffix: "+", label: "Patients served" },
  { value: 16, suffix: " lbs", label: "Average weight loss" },
  { value: 12, suffix: " weeks", label: "Typical program" },
  { value: 98, suffix: "%", label: "Would recommend" },
];

const OPTIONS = [
  {
    title: "GLP-1",
    href: "/glp-1/",
    icon: Pill,
    blurb:
      "Take control of your weight and health with our GLP-1 Therapy. This advanced treatment helps regulate appetite, improve blood sugar control, and support long-term weight management.",
  },
  {
    title: "Phentermine",
    href: "/phentermine/",
    icon: Syringe,
    blurb:
      "Jumpstart your weight loss journey with Phentermine, a clinically proven prescription that helps suppress appetite and boost energy levels.",
  },
  {
    title: "Vitamin Injections",
    href: "/vitamin-injections/",
    icon: Droplets,
    blurb:
      "Re-energize your body and boost overall wellness with our Vitamin Injections. Packed with essential nutrients, these injections help improve energy, strengthen immunity, enhance metabolism.",
  },
];

const DISCLAIMER =
  "* All patients have the option to obtain a prescription for the Brand Name medications listed on this page to be called in at the pharmacy of their choice. Please note a prescription for the Brand Name medications does not guarantee that your insurance will cover this medication. All patients will be charged a monthly concierge management fee for this service. We provide compounded GLP-1 medication. We do not sell or dispense brand-name medications such as Ozempic®, Wegovy®, or Mounjaro®. Our compounded medications are prepared by licensed compounding pharmacies in compliance with all applicable regulations. If you have any questions about our treatments, please contact us for more information.";

// ─────────────────────────────────────────────────────────────────────────────
// Shared motion helpers
// ─────────────────────────────────────────────────────────────────────────────

const fadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SectionEyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <span
      className={`text-tagline inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs text-revival-gold backdrop-blur ${
        isLight
          ? "border-revival-gold/40 bg-white/70"
          : "border-revival-gold/25 bg-white/[0.03]"
      }`}
    >
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
      className={`mt-5 font-heading font-light leading-[1.1] ${
        tone === "light" ? "text-revival-dark" : "text-white/90"
      }`}
      style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}
    >
      {children}
    </h2>
  );
}

function BodyCopy({
  children,
  className = "",
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "light" ? "text-revival-charcoal/75" : "text-white/60";
  return (
    <p
      className={`mt-6 max-w-3xl text-base font-light leading-relaxed sm:text-lg ${color} ${className}`}
    >
      {children}
    </p>
  );
}

function CountUp({
  target,
  suffix = "",
  duration = 1.6,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, mv, target, duration]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/** Self-hosted portrait mp4 (STYKU body scan) with a custom play/pause overlay. */
function BodyScanVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div
      className="group relative mx-auto aspect-[9/16] w-full max-w-xs cursor-pointer overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_50px_120px_-32px_rgba(0,0,0,0.5)] sm:max-w-sm"
      onClick={toggle}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/styku.mp4"
        poster="/videos/styku-poster.jpg"
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
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-[0_20px_60px_-12px_rgba(201,169,110,0.6)] transition-transform duration-300 group-hover:scale-110">
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-revival-gold/40"
              />
              <Play className="relative ml-1 h-8 w-8 fill-current" strokeWidth={0} />
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
  );
}

/**
 * Numbered vertical timeline with a gold gradient stroke that draws itself as
 * the section enters the viewport (Framer Motion pathLength). Each row fades
 * up on scroll.
 */
function ApproachTimeline({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const railColor = tone === "light" ? "bg-revival-gold/15" : "bg-white/10";

  return (
    <div ref={ref} className="relative">
      {/* Static rail */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-[27px] top-4 bottom-4 w-px sm:left-[31px] ${railColor}`}
      />
      {/* Animated gold draw */}
      <motion.span
        aria-hidden
        style={{ scaleY: pathLength, originY: 0 }}
        className="pointer-events-none absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-revival-gold via-revival-gold-light to-revival-gold/0 sm:left-[31px]"
      />

      <ul className="space-y-6">
        {APPROACH_STEPS.map((s, i) => (
          <TimelineRow key={s.title} step={s} index={i} tone={tone} />
        ))}
      </ul>
    </div>
  );
}

function TimelineRow({
  step,
  index,
  tone = "dark",
}: {
  step: (typeof APPROACH_STEPS)[number];
  index: number;
  tone?: "dark" | "light";
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.li
      ref={rowRef}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="relative flex items-start gap-5 sm:gap-6"
    >
      <div className="relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-revival-gold/30 shadow-[0_10px_28px_-14px_rgba(201,169,110,0.55)] sm:h-[62px] sm:w-[62px]">
        <span className="absolute inset-1 rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light" />
        <Icon className="relative h-5 w-5 text-revival-dark sm:h-6 sm:w-6" />
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-revival-dark text-[0.65rem] font-semibold text-revival-gold ring-1 ring-revival-gold/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0 flex-1 pt-2">
        <h3
          className={`font-heading text-lg font-medium sm:text-xl ${
            tone === "light" ? "text-revival-dark" : "text-white/90"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`mt-2 max-w-2xl text-sm font-light leading-relaxed sm:text-base ${
            tone === "light" ? "text-revival-charcoal/75" : "text-white/60"
          }`}
        >
          {step.text}
        </p>
      </div>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page content
// ─────────────────────────────────────────────────────────────────────────────

export default function WeightLossPageContent() {
  return (
    <>
      {/* Hero - uses weight-loss imagery that appears elsewhere on the page. */}
      <PageHero
        eyebrow="Medical Weight Loss"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Weight Loss" }]}
        title={
          <>
            <span className="relative inline-block">
              Weight Loss
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="A scientific, personalized plan built around your body-GLP-1, phentermine, and vitamin injections with ongoing medical support in Summerlin and Henderson."
        primary={{
          label: "Book Your Free Consultation",
          href: ZENOTI,
          external: true,
        }}
        gallery={[
          "/images/page-banners/weight-loss-banner-1.jpg",
          "/images/page-banners/weight-loss-banner-2.jpg",
          "/images/page-banners/weight-loss-banner-3.jpg",
        ]}
        compact
      />

      {/* ── SECTION 1: Achieve your weight loss goals ─────────────────────── */}
      <motion.section
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24"
      >
        <AmbientOrbs light />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
          <div>
            <motion.div variants={fadeUp}>
              <SectionEyebrow tone="light">Your Plan, Your Body</SectionEyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}
            >
              Achieve your{" "}
              <span className="italic bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#c9a96e] bg-clip-text text-transparent">
                weight loss goals
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/75 sm:text-lg"
            >
              At Revival Health and Wellness, we understand that achieving your
              ideal weight requires a plan that&apos;s as unique as you are.
              That&apos;s why we take a scientific approach to weight loss,
              focusing on your body&apos;s specific needs. With a step-by-step
              guide tailored just for you, we&apos;ll help you reach your goals
              and maintain them for the long term.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <a
                href={ZENOTI}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_10px_30px_-8px_rgba(201,169,110,0.7)] transition-transform hover:scale-[1.03]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Book Your Free Consultation</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <WeightLossMotionGraphic />
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 2: How does medical weight loss work? ────────────────── */}
      <motion.section
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24"
      >
        <AmbientOrbs faint light />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <div>
            <motion.div variants={fadeUp}>
              <SectionEyebrow tone="light">The Science</SectionEyebrow>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Heading tone="light">How does medical weight loss work?</Heading>
            </motion.div>
            <motion.div variants={fadeUp}>
              <BodyCopy tone="light">
                Your body evolves over time, requiring different approaches to
                maintain a healthy weight. While many think they know how to
                lose weight, relying on calorie counting and exercise alone
                often proves unsustainable. To achieve lasting success,
                it&apos;s crucial to craft a plan that aligns with your unique
                habits, limitations, and lifestyle.
              </BodyCopy>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <PortraitFrame
              src="/images/weight-loss/weight-loss-hero.png"
              alt="Medical weight loss consultation at Revival Health & Wellness"
              aspect="aspect-[4/5]"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 2b: Video showcase ─────────────────────────────────── */}
      <section className="relative overflow-clip bg-revival-dark py-14 sm:py-20 lg:py-28">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-tagline text-[0.7rem] text-revival-gold">
              SEE IT IN ACTION
            </p>
            <h2 className="mt-3 font-heading text-3xl italic text-revival-warm-white sm:text-4xl lg:text-[2.75rem]">
              Watch how our medical weight-loss program works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-light text-revival-warm-white/70">
              A behind-the-scenes look at the science, the process, and the
              real transformations our patients experience at Revival.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_50px_120px_-32px_rgba(201,169,110,0.35)]">
            <div className="relative pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/bM3oJ3KsgxI?start=5&rel=0&modestbranding=1"
                title="Medical weight loss at Revival Health & Wellness"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: You can lose weight and stay healthy ─────────────── */}
      <motion.section
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden bg-revival-cream py-16 lg:py-24"
      >
        <AmbientOrbs light />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}>
            <SectionEyebrow tone="light">Health First</SectionEyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading tone="light">You can lose weight and stay healthy</Heading>
          </motion.div>
          <motion.div variants={fadeUp}>
            <BodyCopy tone="light">
              To kickstart your weight loss journey, it&apos;s crucial to
              recognize that lasting success starts with improving your overall
              health. Rather than chasing a lower number on the scale, the
              focus should be on building a strong foundation of well-being. At
              Revival Health and Wellness, we delve into your unique health
              profile to identify the root causes that may have prevented you
              from losing weight effectively. Our goal is to help you achieve
              optimal health first, which naturally leads to sustainable weight
              loss that lasts.
            </BodyCopy>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 4: Stat bar ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-y border-revival-gold/10 py-14"
        style={{ backgroundColor: BG_DARKER }}
      >
        <AmbientOrbs faint />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-2 top-0 h-full w-px bg-gradient-to-b from-revival-gold/60 via-revival-gold/10 to-transparent"
                />
                <p className="font-heading text-4xl font-medium text-revival-gold sm:text-5xl">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-tagline text-xs text-white/60">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Our approach (numbered timeline) ──────────────────── */}
      <motion.section
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24"
      >
        <AmbientOrbs light />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
          <motion.div variants={fadeUp}>
            <PortraitFrame
              src="/images/weight-loss/weight-loss-approach-consultation.png"
              alt="Smiling woman celebrating weight-loss results, giving a thumbs up in jeans that are now too big"
              aspect="aspect-[3/4]"
              cover
            />
          </motion.div>

          <div>
            <motion.div variants={fadeUp}>
              <SectionEyebrow tone="light">Our Process</SectionEyebrow>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Heading tone="light">Our approach to medical weight loss</Heading>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-12">
              <ApproachTimeline tone="light" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 5b: STYKU body-scan video ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-revival-cream py-16 lg:py-24">
        <AmbientOrbs light />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <BodyScanVideo />

          <div>
            <SectionEyebrow tone="light">Track Real Results</SectionEyebrow>
            <Heading tone="light">STYKU 3D body scanning technology</Heading>
            <BodyCopy tone="light">
              Every visit includes a STYKU body scan, so you can see
              measurable changes in muscle, water, and fat-not just the
              number on the scale. It&apos;s how we turn &quot;weekly progress
              tracking&quot; into real, visual proof that your plan is
              working.
            </BodyCopy>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Good Candidates (animated checklist) ──────────────── */}
      <motion.section
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden bg-revival-cream py-16 lg:py-24"
      >
        <AmbientOrbs faint light />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}>
            <SectionEyebrow tone="light">Who It&apos;s For</SectionEyebrow>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Heading tone="light">Good candidates for medical weight loss</Heading>
          </motion.div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {CANDIDATES.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="flex items-start gap-4 rounded-2xl border border-revival-gold/20 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-md"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1 + 0.15,
                    ease: EASE,
                  }}
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark shadow-[0_6px_18px_-6px_rgba(201,169,110,0.7)]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </motion.span>
                <span className="text-sm font-light leading-relaxed text-revival-charcoal/85 sm:text-base">
                  {c}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── SECTION 7: Options for Weight Loss (glassmorphism cards) ─────── */}
      <motion.section
        variants={fadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden py-16 lg:py-28"
        style={{ backgroundColor: BG_DARK }}
      >
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center">
            <SectionEyebrow>Treatment Menu</SectionEyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-5 max-w-3xl text-center font-heading font-light uppercase tracking-[0.1em] text-white/90"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}
          >
            Options for Weight Loss
          </motion.h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.title}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-revival-gold/20 bg-white/5 p-8 backdrop-blur-md transition-colors duration-500 hover:border-revival-gold/60"
                style={{
                  boxShadow:
                    "0 10px 40px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                {/* Hover gold glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,169,110,0.35), transparent 60%)",
                  }}
                />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark shadow-[0_10px_24px_-8px_rgba(201,169,110,0.7)]">
                    <opt.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-6 block text-tagline text-[0.65rem] text-revival-gold">
                    Option {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-light text-white/95">
                    {opt.title}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-white/60">
                    {opt.blurb}
                  </p>
                  <Link
                    href={opt.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold transition-colors hover:text-revival-gold-light"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 7.5: Patient testimonials ──────────────────────────────── */}
      <WeightLossTestimonials />

      {/* ── SECTION 8: Disclaimer ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-revival-warm-white py-14">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-xs font-light leading-relaxed text-revival-charcoal/65 sm:text-sm"
          >
            {DISCLAIMER}
          </motion.p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ambient background orbs used across every dark section
// ─────────────────────────────────────────────────────────────────────────────

function AmbientOrbs({
  faint = false,
  light = false,
}: {
  faint?: boolean;
  light?: boolean;
}) {
  const strong = faint ? (light ? 0.1 : 0.14) : (light ? 0.16 : 0.22);
  const weak = faint ? (light ? 0.08 : 0.1) : (light ? 0.12 : 0.18);
  const goldRgb = "201,169,110";
  const secondaryRgb = light ? "232,213,176" : "138,90,43";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -left-32 top-8 h-[28rem] w-[28rem] rounded-full blur-[140px]"
        style={{
          background: `radial-gradient(circle, rgba(${goldRgb},${strong}), transparent 70%)`,
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full blur-[140px]"
        style={{
          background: `radial-gradient(circle, rgba(${secondaryRgb},${weak}), transparent 70%)`,
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
