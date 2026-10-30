"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import HormoneMotionGraphic from "./HormoneMotionGraphic";
import { AnimatedPortraitFrame } from "@/components/ui/PortraitFrame";
import {
  Activity,
  ArrowRight,
  Award,
  Battery,
  Bone,
  Brain,
  CheckCircle2,
  Compass,
  Droplet,
  Dumbbell,
  Flame,
  HandHeart,
  Heart,
  HeartPulse,
  Leaf,
  Moon,
  Pause,
  Pill,
  Play,
  Scale,
  ShieldCheck,
  Smile,
  Sparkles,
  Syringe,
  Target,
  Timer,
  Users,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Icon registry - pages send a string key; the map resolves it on the client.
// ─────────────────────────────────────────────────────────────────────────────

const ICONS = {
  activity: Activity,
  award: Award,
  battery: Battery,
  bone: Bone,
  brain: Brain,
  compass: Compass,
  droplet: Droplet,
  dumbbell: Dumbbell,
  flame: Flame,
  handHeart: HandHeart,
  heart: Heart,
  heartPulse: HeartPulse,
  leaf: Leaf,
  moon: Moon,
  pill: Pill,
  scale: Scale,
  shieldCheck: ShieldCheck,
  smile: Smile,
  sparkles: Sparkles,
  syringe: Syringe,
  target: Target,
  timer: Timer,
  users: Users,
  utensils: Utensils,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

// ─────────────────────────────────────────────────────────────────────────────
// Public API types (shape unchanged - dozens of pages consume these)
// ─────────────────────────────────────────────────────────────────────────────

export type OverviewSection = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  /** Frame aspect for the image - default portrait 4:5. Use "landscape" for wide banner images (2:1 or wider) and "square" for 1:1 sources. */
  imageAspect?: "portrait" | "landscape" | "square";
  /**
   * Escape hatch for sources whose ratio doesn't fit the 3 preset buckets -
   * a literal Tailwind aspect class (e.g. "aspect-[1230/816]") matching the
   * image's native ratio exactly, so there's zero crop and zero letterboxing.
   * Takes precedence over `imageAspect` when set.
   */
  imageAspectClass?: string;
  /** When true, renders the image with object-contain so the full source is visible (no cropping). Defaults to cover. */
  imageContain?: boolean;
  bullets?: string[];
  imageAlt?: string;
};

export type PillarBlock = {
  title: string;
  text: string;
  icon: IconKey;
};

export type FAQ = { question: string; answer: string };

type Tone = "light" | "dark" | "cream";

/** Map imageAspect → Tailwind aspect class. Default is portrait 4/5. */
function aspectClass(v?: "portrait" | "landscape" | "square"): string {
  switch (v) {
    case "landscape":
      return "aspect-[5/3]";
    case "square":
      return "aspect-square";
    case "portrait":
    default:
      return "aspect-[4/5]";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Editorial primitives
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Two blurred gold radial orbs that drift slowly and translate on page scroll
 * to give each section a subtle "living background" feel.
 */
function AmbientOrbs({
  tone = "light",
  parallax,
}: {
  tone?: Tone;
  parallax?: MotionValue<string>;
}) {
  const color =
    tone === "dark" ? "rgba(201,169,110,0.22)" : "rgba(201,169,110,0.16)";
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          y: parallax,
        }}
        className="absolute -left-24 top-4 h-[26rem] w-[26rem] rounded-full blur-[140px]"
        animate={{ x: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          y: parallax,
        }}
        className="absolute -right-24 bottom-4 h-[22rem] w-[22rem] rounded-full blur-[140px]"
        animate={{ x: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

/** Editorial eyebrow: uppercase gold label flanked by thin gold hairlines. */
function EditorialEyebrow({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
        {children}
      </span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
    </div>
  );
}

/** Editorial heading with generous serif type. */
function EditorialHeading({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const color = tone === "dark" ? "text-white" : "text-revival-dark";
  return (
    <h2
      className={`font-heading font-light leading-[1.05] ${color} ${className}`}
      style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
    >
      {children}
    </h2>
  );
}

/**
 * Wraps its child with a scroll-linked Y translation so framed images and
 * motion graphics drift subtly with the page.
 */
function ParallaxFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OverviewBlock - editorial 2-col with lead-paragraph rule, parallax image.
// ─────────────────────────────────────────────────────────────────────────────

export function OverviewBlock({
  section,
  reverse = false,
  tone = "light",
  stickyImage = false,
}: {
  section: OverviewSection;
  reverse?: boolean;
  tone?: Tone;
  /** Sticks the image column while the copy column scrolls past. */
  stickyImage?: boolean;
}) {
  const bg =
    tone === "dark"
      ? "bg-revival-dark text-white"
      : tone === "cream"
        ? "bg-revival-cream"
        : "bg-revival-warm-white";
  const bodyColor =
    tone === "dark" ? "text-revival-cream/85" : "text-revival-charcoal/80";

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-clip ${bg} py-14 sm:py-20 lg:py-28`}
    >
      <AmbientOrbs tone={tone} parallax={orbY} />

      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:gap-20 lg:px-8 ${
          stickyImage ? "items-start" : "items-center"
        } ${section.image ? "lg:grid-cols-[0.95fr_1.05fr]" : ""}`}
      >
        {section.image &&
          (stickyImage ? (
            <div
              className={`lg:sticky lg:top-24 lg:self-start ${
                reverse ? "lg:order-2" : ""
              }`}
            >
              <AnimatedPortraitFrame
                src={section.image}
                alt={section.imageAlt || section.heading}
                aspect={section.imageAspectClass ?? aspectClass(section.imageAspect)}
                cover={!section.imageContain}
              />
            </div>
          ) : (
            <ParallaxFrame className={reverse ? "lg:order-2" : ""}>
              <AnimatedPortraitFrame
                src={section.image}
                alt={section.imageAlt || section.heading}
                aspect={section.imageAspectClass ?? aspectClass(section.imageAspect)}
                cover={!section.imageContain}
              />
            </ParallaxFrame>
          ))}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-xl lg:max-w-none"
        >
          {section.eyebrow && (
            <div className="mb-6">
              <EditorialEyebrow>{section.eyebrow}</EditorialEyebrow>
            </div>
          )}

          <EditorialHeading tone={tone}>{section.heading}</EditorialHeading>

          <div className="mt-8 space-y-6">
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? `relative border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.7] sm:text-xl sm:leading-[1.65] ${
                        tone === "dark"
                          ? "text-revival-cream/95"
                          : "text-revival-charcoal/90"
                      }`
                    : `text-base font-light leading-relaxed sm:text-lg ${bodyColor}`
                }
              >
                {p}
              </p>
            ))}
          </div>

          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {section.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
                  className={`flex items-start gap-3 text-sm sm:text-[0.95rem] ${bodyColor}`}
                >
                  <span
                    aria-hidden
                    className="mt-1 font-heading text-xs italic text-revival-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PillarsGrid - magazine cards with serif numerals & gold-hairline hover.
// ─────────────────────────────────────────────────────────────────────────────

export function PillarsGrid({
  eyebrow,
  heading,
  intro,
  pillars,
  tone = "light",
  image,
  imageAlt,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  pillars: PillarBlock[];
  tone?: Tone;
  /** Optional photo shown alongside the cards on large screens (right side). */
  image?: string;
  imageAlt?: string;
}) {
  const bg =
    tone === "dark"
      ? "bg-revival-dark text-white"
      : tone === "cream"
        ? "bg-revival-cream"
        : "bg-revival-warm-white";
  const cardBg =
    tone === "dark"
      ? "bg-white/[0.04] border-white/10 hover:border-revival-gold/40 hover:bg-white/[0.06]"
      : "bg-white border-revival-gold/15 hover:border-revival-gold/40";
  const bodyColor =
    tone === "dark" ? "text-revival-cream/75" : "text-revival-charcoal/75";
  const titleColor = tone === "dark" ? "text-white" : "text-revival-dark";

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-clip ${bg} py-14 sm:py-20 lg:py-28`}
    >
      <AmbientOrbs tone={tone} parallax={orbY} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <div className="mb-6">
              <EditorialEyebrow align="center">{eyebrow}</EditorialEyebrow>
            </div>
          )}
          <EditorialHeading tone={tone} className="text-center">
            {heading}
          </EditorialHeading>
          {intro && (
            <p
              className={`mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed sm:text-lg ${bodyColor}`}
            >
              {intro}
            </p>
          )}
        </div>

        <div
          className={`mt-16 ${image ? "lg:grid lg:grid-cols-5 lg:items-stretch lg:gap-8" : ""}`}
        >
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7 ${
              image ? "lg:col-span-3 lg:grid-cols-1" : "lg:grid-cols-3"
            }`}
          >
            {pillars.map((p, i) => {
              const Icon = ICONS[p.icon];
              return (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                  className={`group relative overflow-hidden rounded-[1.75rem] border p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-30px_rgba(15,15,15,0.35)] ${cardBg}`}
                >
                  {/* Gold hairline reveal on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-revival-gold via-revival-gold/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        tone === "dark"
                          ? "bg-revival-gold text-revival-dark"
                          : "bg-revival-dark text-revival-gold"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      aria-hidden
                      className="font-heading text-3xl italic leading-none text-revival-gold/50 sm:text-4xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={`mt-6 font-heading text-xl leading-tight sm:text-2xl ${titleColor}`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`mt-3 text-[0.95rem] font-light leading-relaxed ${bodyColor}`}
                  >
                    {p.text}
                  </p>
                </motion.article>
              );
            })}
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative mt-8 lg:col-span-2 lg:mt-0"
            >
              <div className="relative h-72 w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgba(15,15,15,0.35)] sm:h-96 lg:h-full lg:min-h-[520px]">
                <Image
                  src={image}
                  alt={imageAlt ?? heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-t ${
                    tone === "dark" ? "from-revival-dark/60" : "from-black/30"
                  } via-transparent to-transparent`}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VideoShowcase - self-hosted mp4 with a custom play/pause overlay.
// ─────────────────────────────────────────────────────────────────────────────

export function VideoShowcase({
  eyebrow,
  heading,
  intro,
  src,
  poster,
  tone = "dark",
  aspect = "video",
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** Path to a self-hosted mp4 under /public, e.g. "/videos/emsella-2.mp4". */
  src: string;
  /** Poster image shown before playback starts. */
  poster?: string;
  tone?: Tone;
  /** "video" (16:9, full-width) or "portrait" (9:16, constrained width) for phone-recorded clips. */
  aspect?: "video" | "portrait";
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPortrait = aspect === "portrait";

  const bg =
    tone === "dark"
      ? "bg-revival-dark text-white"
      : tone === "cream"
        ? "bg-revival-cream"
        : "bg-revival-warm-white";
  const bodyColor =
    tone === "dark" ? "text-revival-cream/75" : "text-revival-charcoal/75";

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section className={`relative overflow-hidden ${bg} py-14 sm:py-20 lg:py-28`}>
      <AmbientOrbs tone={tone} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <div className="mb-6">
              <EditorialEyebrow align="center">{eyebrow}</EditorialEyebrow>
            </div>
          )}
          <EditorialHeading tone={tone} className="text-center">
            {heading}
          </EditorialHeading>
          {intro && (
            <p
              className={`mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed sm:text-lg ${bodyColor}`}
            >
              {intro}
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`relative mt-12 overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_50px_120px_-32px_rgba(0,0,0,0.5)] ${
            isPortrait ? "mx-auto max-w-xs sm:max-w-sm" : ""
          }`}
        >
          <div
            className={`group relative w-full cursor-pointer ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}
            onClick={toggle}
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
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-[0_20px_60px_-12px_rgba(201,169,110,0.6)] transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full bg-revival-gold/40"
                    />
                    <Play
                      className="relative ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9"
                      strokeWidth={0}
                    />
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
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BenefitsList - editorial two-column list with parallax image / motion graphic.
// ─────────────────────────────────────────────────────────────────────────────

export function BenefitsList({
  eyebrow,
  heading,
  items,
  image,
  imageAspect,
  imageContain = false,
  motionGraphic = false,
  stickyImage = false,
  imageSize = "default",
  footer,
}: {
  eyebrow?: string;
  heading: string;
  items: string[];
  image?: string;
  imageAspect?: "portrait" | "landscape" | "square";
  /** When true, renders the image with object-contain so the full source is visible (no cropping). */
  imageContain?: boolean;
  motionGraphic?: boolean;
  /** Sticks the image column while the benefit chips column scrolls past. */
  stickyImage?: boolean;
  /** "small" narrows the image column and caps its width, giving more room to the chips. */
  imageSize?: "default" | "small";
  /** Optional closing paragraph rendered beneath the chip grid. */
  footer?: string;
}) {
  const hasVisual = Boolean(image) || motionGraphic;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-clip bg-revival-cream py-14 sm:py-20 lg:py-28"
    >
      <AmbientOrbs tone="cream" parallax={orbY} />

      <div
        className={
          "mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-4 sm:px-6 lg:gap-20 lg:px-8 " +
          (hasVisual
            ? imageSize === "small"
              ? "lg:grid-cols-[minmax(0,320px)_1fr]"
              : "lg:grid-cols-[1.05fr_0.95fr]"
            : "")
        }
      >
        {image ? (
          stickyImage ? (
            <div
              className={`lg:sticky lg:top-24 lg:order-1 lg:self-start ${
                imageSize === "small" ? "lg:max-w-xs" : ""
              }`}
            >
              <AnimatedPortraitFrame
                src={image}
                aspect={aspectClass(imageAspect)}
                cover={!imageContain}
              />
            </div>
          ) : (
            <ParallaxFrame
              className={`lg:order-1 ${imageSize === "small" ? "lg:max-w-xs" : ""}`}
            >
              <AnimatedPortraitFrame
                src={image}
                aspect={aspectClass(imageAspect)}
                cover={!imageContain}
              />
            </ParallaxFrame>
          )
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={image ? "lg:order-2" : "lg:order-1"}
        >
          {eyebrow && (
            <div className="mb-6">
              <EditorialEyebrow>{eyebrow}</EditorialEyebrow>
            </div>
          )}
          <EditorialHeading>{heading}</EditorialHeading>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <motion.li
                key={it}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: EASE }}
                className="group flex items-start gap-3 rounded-2xl bg-white px-4 py-4 text-sm text-revival-charcoal/85 shadow-sm ring-1 ring-revival-gold/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-revival-gold/30"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="pt-0.5">{it}</span>
              </motion.li>
            ))}
          </ul>

          {footer ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-8 border-l-2 border-revival-gold/40 pl-5 text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg"
            >
              {footer}
            </motion.p>
          ) : null}
        </motion.div>

        {motionGraphic && !image ? (
          <ParallaxFrame className="lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <HormoneMotionGraphic />
            </motion.div>
          </ParallaxFrame>
        ) : null}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQSection - editorial accordion with serif numerals & hairline dividers.
// ─────────────────────────────────────────────────────────────────────────────

export function FAQSection({
  faqs,
  image,
  imageAlt,
}: {
  faqs: FAQ[];
  image?: string;
  imageAlt?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  const faqList = (
    <div className="mt-14 space-y-2">
      {faqs.map((f, i) => (
        <details
          key={f.question}
          className="group rounded-2xl border border-revival-gold/15 bg-white px-6 py-5 shadow-sm transition-all duration-300 open:border-revival-gold/40 open:shadow-md sm:px-7 sm:py-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
            <div className="flex items-baseline gap-4">
              <span
                aria-hidden
                className="font-heading text-lg italic text-revival-gold/70 sm:text-xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-base leading-snug text-revival-dark sm:text-lg">
                {f.question}
              </span>
            </div>
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold transition-transform duration-300 group-open:rotate-45"
            >
              <span className="text-xl leading-none">+</span>
            </span>
          </summary>
          <p className="mt-5 border-t border-revival-gold/10 pt-5 text-sm font-light leading-relaxed text-revival-charcoal/80 sm:text-base sm:leading-[1.75]">
            {f.answer}
          </p>
        </details>
      ))}
    </div>
  );

  if (image) {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-28"
      >
        <AmbientOrbs parallax={orbY} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <EditorialEyebrow>Frequently Asked</EditorialEyebrow>
              <EditorialHeading className="mt-6">
                Common questions, straight answers
              </EditorialHeading>
              {faqList}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-revival-gold/15 lg:sticky lg:top-28"
            >
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-28"
    >
      <AmbientOrbs parallax={orbY} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6">
            <EditorialEyebrow align="center">Frequently Asked</EditorialEyebrow>
          </div>
          <EditorialHeading className="text-center">
            Common questions, straight answers
          </EditorialHeading>
        </div>

        {faqList}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RelatedServices - magazine cards with numeral index & gold-hairline hover.
// ─────────────────────────────────────────────────────────────────────────────

export function RelatedServices({
  items,
}: {
  items: { label: string; href: string; blurb: string }[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-clip bg-revival-cream py-14 sm:py-20 lg:py-28"
    >
      <AmbientOrbs tone="cream" parallax={orbY} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6">
            <EditorialEyebrow align="center">Explore</EditorialEyebrow>
          </div>
          <EditorialHeading className="text-center">
            Related services
          </EditorialHeading>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-7">
          {items.map((it, i) => (
            <motion.div
              key={it.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            >
              <Link
                href={it.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-revival-gold/50 hover:shadow-[0_30px_80px_-30px_rgba(15,15,15,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-revival-gold via-revival-gold/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <span
                    aria-hidden
                    className="font-heading text-3xl italic leading-none text-revival-gold/50 sm:text-4xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-xl leading-tight text-revival-dark sm:text-2xl">
                  {it.label}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-revival-charcoal/75">
                  {it.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
