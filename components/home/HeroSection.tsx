"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, ChevronDown, Star, Sparkles, MapPin } from "lucide-react";
import { HERO, ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function HeroSection({
  reviewRating = 5,
  reviewCount = 500,
  reviewsUrl,
}: {
  reviewRating?: number;
  reviewCount?: number;
  reviewsUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // Auto-cycling background image (cinematic slideshow)
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % HERO.gallery.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  // Mouse-driven 3D tilt for the showcase card
  const showcaseRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  function handleTilt(e: React.MouseEvent<HTMLDivElement>) {
    const el = showcaseRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 14);
    tiltX.set(-py * 14);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <section
      ref={ref}
      className="relative flex items-center overflow-hidden bg-revival-dark py-0 lg:min-h-[100svh]"
    >
      {/* ── Full-bleed cinematic background slideshow ──────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: EASE },
              scale: { duration: 6.5, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={HERO.gallery[active]}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Readability overlays ───────────────────────────────────────── */}
      {/* Left-weighted dark gradient so copy stays legible */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-gradient-to-r from-revival-dark via-revival-dark/85 to-revival-dark/30"
      />
      {/* Top & bottom vertical fades */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-revival-dark/70 via-transparent to-revival-dark" />
      {/* Warm gold tint */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,169,110,0.18),transparent_60%)]" />

      {/* Animated gold ambiance orbs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-10 h-[40rem] w-[40rem] rounded-full bg-revival-gold/20 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full bg-[#8a5a2b]/25 blur-[150px]"
        />
      </div>

      {/* Floating gold sparks (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {SPARKS.map((s, i) => (
          <Spark key={i} {...s} />
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 pt-[68px] sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:py-28">
        <motion.div
          style={{ y: contentY }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <motion.span
            variants={item}
            className="text-tagline inline-flex items-center gap-2.5 rounded-full border border-revival-gold/30 bg-white/[0.06] px-4 py-1.5 text-xs text-revival-gold backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.25rem)", lineHeight: 1.08 }}
          >
            Take the first step towards a{" "}
            <span className="relative inline-block italic text-revival-gold">
              vibrant
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.9, ease: EASE }}
                className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            future
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-lg text-lg font-light leading-relaxed text-revival-cream/90 lg:mx-0"
          >
            {HERO.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-base font-medium text-revival-dark shadow-[0_8px_30px_-8px_rgba(201,169,110,0.6)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Book Your Free Consultation</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/about-us/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.04] px-8 py-4 text-base font-light text-white backdrop-blur-md transition-colors duration-300 hover:border-revival-gold hover:text-revival-gold"
            >
              Discover Our Story
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start"
          >
            {reviewsUrl ? (
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors duration-300 hover:text-revival-gold"
              >
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-revival-gold text-revival-gold"
                    />
                  ))}
                </span>
                <span className="text-sm font-light text-revival-cream/80">
                  Rated {reviewRating.toFixed(1)} star by {reviewCount}+
                </span>
              </a>
            ) : (
              <div className="flex items-center gap-2">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-revival-gold text-revival-gold"
                    />
                  ))}
                </span>
                <span className="text-sm font-light text-revival-cream/80">
                  Rated {reviewRating.toFixed(1)} star by {reviewCount}+
                </span>
              </div>
            )}
            <span className="inline-flex items-center gap-2 text-sm font-light text-revival-cream/80">
              <MapPin className="h-4 w-4 text-revival-gold" />2 Las Vegas
              Locations
            </span>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-tagline text-xs text-revival-gold/90 lg:justify-start"
          >
            {HERO.words.map((w, i) => (
              <span key={w} className="flex items-center gap-4">
                {i > 0 && <Dot />}
                {w}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Modern visual showcase (over the background) ──────────────── */}
        <div
          ref={showcaseRef}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          className="relative mx-auto h-[30rem] w-full max-w-[24rem] overflow-hidden lg:mx-0 lg:h-[40rem] lg:max-w-none lg:overflow-visible"
          style={{ perspective: 1400 }}
        >
          {/* Soft layered glow behind everything */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-6 top-1/2 h-[28rem] w-[24rem] -translate-y-1/2 rounded-[3.5rem] bg-revival-gold/20 blur-[100px]"
          />

          {/* Counter-rotating dashed rings (desktop only) */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute right-0 top-1/2 hidden h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-dashed border-revival-gold/15 lg:block"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -right-4 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full opacity-70 lg:block"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(201,169,110,0.6) 55deg, transparent 120deg, transparent 245deg, rgba(232,213,176,0.45) 305deg, transparent 360deg)",
              maskImage:
                "radial-gradient(circle, transparent 62%, black 63%, black 64%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 62%, black 63%, black 64%, transparent 65%)",
            }}
          />

          {/* Orbiting particle accents (desktop only) */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{
                duration: 18 + i * 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute right-0 top-1/2 hidden h-[32rem] w-[32rem] -translate-y-1/2 lg:block"
              style={{ rotate: i * 120 }}
            >
              <span
                className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-revival-gold"
                style={{
                  boxShadow: "0 0 16px 3px rgba(201,169,110,0.7)",
                }}
              />
            </motion.div>
          ))}

          {/* 3D tilt stage */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="absolute inset-0"
          >
            {/* Secondary overlapping image card (depth, back layer) */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: -7 }}
              transition={{ delay: 0.55, duration: 1, ease: EASE }}
              style={{ transform: "translateZ(40px)" }}
              className="absolute left-0 top-1/2 h-[17rem] w-[12.5rem] -translate-y-[68%] overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl"
            >
              <Image
                src="/images/services/aesthetics-2.jpg"
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </motion.div>

            {/* Main featured image card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: EASE }}
              style={{ transform: "translateZ(90px)" }}
              className="absolute right-2 top-1/2 h-[30rem] w-[21.5rem] -translate-y-1/2"
            >
              {/* Gradient border wrapper */}
              <div className="relative h-full w-full rounded-[2.5rem] bg-gradient-to-br from-revival-gold/80 via-revival-gold/15 to-transparent p-[1.5px] shadow-[0_30px_70px_-18px_rgba(0,0,0,0.75)]">
                <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-revival-dark">
                  {/* Click anywhere on the card to visit the active service */}
                  <Link
                    href={SHOWCASE_HREFS[active % SHOWCASE_HREFS.length]}
                    aria-label={`Explore ${SHOWCASE_LABELS[active % SHOWCASE_LABELS.length]}`}
                    className="absolute inset-0 z-30"
                  />
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.12 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{
                        opacity: { duration: 1.1, ease: EASE },
                        scale: { duration: 6, ease: "easeOut" },
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={SHOWCASE[active % SHOWCASE.length]}
                        alt="Revival treatment showcase"
                        fill
                        sizes="344px"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Readability gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-revival-dark/85 via-transparent to-revival-dark/20" />
                  <div className="absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/10" />

                  {/* Animated diagonal shine sweep */}
                  <motion.div
                    aria-hidden
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 -inset-x-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  />

                  {/* Top glass category chip */}
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-revival-dark/40 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-revival-gold" />
                      Revival
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-revival-dark/40 px-3 py-1.5 text-[0.6rem] font-medium text-white backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-revival-gold" />
                      </span>
                      Now Booking
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="absolute inset-x-6 bottom-14">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <p className="text-[0.6rem] font-light uppercase tracking-[0.25em] text-revival-gold">
                          Signature Service
                        </p>
                        <p className="mt-1 font-heading text-xl font-medium text-white drop-shadow">
                          {SHOWCASE_LABELS[active % SHOWCASE_LABELS.length]}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Progress dots */}
                  <div className="absolute bottom-6 left-6 flex gap-1.5">
                    {SHOWCASE.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === active % SHOWCASE.length
                            ? "w-7 bg-revival-gold"
                            : "w-1.5 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive thumbnail filmstrip */}
            <div
              style={{ transform: "translateZ(120px)" }}
              className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col gap-2.5 lg:-right-5"
            >
              {SHOWCASE.map((src, i) => {
                const isActive = i === active % SHOWCASE.length;
                return (
                  <Link
                    key={src}
                    href={SHOWCASE_HREFS[i]}
                    onClick={(e) => {
                      // First click: just switch active slide. Second click on the
                      // already-active thumb navigates.
                      if (!isActive) {
                        e.preventDefault();
                        setActive(i);
                      }
                    }}
                    aria-label={SHOWCASE_LABELS[i]}
                    className={`relative h-12 w-12 overflow-hidden rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-revival-gold shadow-[0_0_16px_-2px_rgba(201,169,110,0.7)]"
                        : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Floating "30+ Treatments" glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { delay: 1, duration: 0.7, ease: EASE },
              scale: { delay: 1, duration: 0.7, ease: EASE },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
            }}
            className="absolute -left-2 top-12 z-20 hidden items-center gap-3 rounded-2xl border border-revival-gold/25 bg-revival-charcoal/70 px-4 py-3 shadow-xl backdrop-blur-xl lg:flex"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-revival-gold/15">
              <Sparkles className="h-5 w-5 text-revival-gold" />
            </span>
            <div className="leading-tight">
              <p className="font-heading text-xl font-semibold text-white">
                30+
              </p>
              <p className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-revival-cream/65">
                Treatments
              </p>
            </div>
          </motion.div>

          {/* Floating "5.0 Rating" glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, 12, 0] }}
            transition={{
              opacity: { delay: 1.2, duration: 0.7, ease: EASE },
              scale: { delay: 1.2, duration: 0.7, ease: EASE },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
            }}
            className="absolute bottom-10 left-1 z-20 hidden items-center gap-3 rounded-2xl border border-revival-gold/25 bg-revival-charcoal/70 px-4 py-3 shadow-xl backdrop-blur-xl lg:flex"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-revival-gold/15">
              <Star className="h-5 w-5 fill-revival-gold text-revival-gold" />
            </span>
            <div className="leading-tight">
              <p className="font-heading text-xl font-semibold text-white">
                {reviewRating.toFixed(1)}
              </p>
              <p className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-revival-cream/65">
                {reviewCount}+ Reviews
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-revival-dark to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-revival-gold"
        >
          <span className="text-tagline text-[10px]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Floating gold sparks ──────────────────────────────────────────────── */

const SHOWCASE = [
  "/images/services/aesthetics-and-injectables.jpeg",
  "/images/services/body-contouring.webp",
  "/images/services/prp-rejuvenation.jpeg",
  "/images/services/medical-weight-loss.jpeg",
];

const SHOWCASE_LABELS = [
  "Aesthetics & Injectables",
  "Body Contouring",
  "PRP & Skin Rejuvenation",
  "Medical Weight Loss",
];

const SHOWCASE_HREFS = [
  "/aesthetics/",
  "/body-contouring/",
  "/prp-hair-restoration/",
  "/weight-loss/",
];

const SPARKS = [
  { left: "12%", top: "26%", size: 6, delay: 0, duration: 7 },
  { left: "28%", top: "70%", size: 4, delay: 1.5, duration: 9 },
  { left: "46%", top: "16%", size: 5, delay: 0.8, duration: 8 },
  { left: "60%", top: "72%", size: 4, delay: 2, duration: 10 },
  { left: "78%", top: "30%", size: 6, delay: 1, duration: 7.5 },
];

function Spark({
  left,
  top,
  size,
  delay,
  duration,
}: {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute z-[2] rounded-full bg-revival-gold shadow-[0_0_12px_2px_rgba(201,169,110,0.6)]"
      style={{ left, top, width: size, height: size }}
      animate={{ y: [0, -24, 0], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-revival-gold/60" aria-hidden />;
}
