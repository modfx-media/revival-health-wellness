"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, Star, MapPin, ChevronDown } from "lucide-react";
import { ZENOTI, HERO } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

type Crumb = { label: string; href?: string };

type PrimaryCta = { label: string; href: string; external?: boolean };

export type PageHeroProps = {
  eyebrow: string;
  /** Title with an optional italic gold accent word. */
  title: React.ReactNode;
  /** Sub-title paragraph shown under the H1. */
  description?: string;
  /** Breadcrumb trail rendered above the eyebrow. */
  breadcrumbs?: Crumb[];
  /** Cinematic background gallery images (looped slideshow). Defaults to the homepage set. */
  gallery?: string[];
  /** Descriptive alt text aligned with `gallery`. Falls back to a clinic alt. */
  galleryAlts?: string[];
  /** Primary CTA (defaults to booking). */
  primary?: PrimaryCta;
  /** Optional secondary CTA. */
  secondary?: PrimaryCta;
  /** Small badge line under the CTAs. Defaults to reviews + locations. */
  showTrustBar?: boolean;
  /** Rotating micro-words under the trust bar. Defaults to HERO.words. */
  words?: string[];
  /** Compact layout hides trust bar & words, reduces padding. */
  compact?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  gallery = HERO.gallery,
  galleryAlts,
  primary = { label: "Book Your Free Consultation", href: ZENOTI, external: true },
  secondary,
  showTrustBar = true,
  words = HERO.words,
  compact = false,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (gallery.length < 2) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % gallery.length),
      5500,
    );
    return () => clearInterval(t);
  }, [gallery.length]);

  return (
    <section
      ref={ref}
      className={
        "relative flex items-center overflow-hidden bg-revival-dark " +
        (compact
          ? "min-h-[60svh] py-0"
          : "py-0 lg:min-h-[86svh]")
      }
    >
      {/* ── Cinematic background slideshow ─────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.6, ease: EASE },
              scale: { duration: 7, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={gallery[active]}
              alt={
                galleryAlts?.[active] ||
                galleryAlts?.[0] ||
                "Revival Health and Wellness clinic in Las Vegas"
              }
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Left-weighted dark gradient for legibility */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-gradient-to-r from-revival-dark via-revival-dark/85 to-revival-dark/30"
      />
      {/* Vertical top/bottom fades */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-revival-dark/70 via-transparent to-revival-dark" />
      {/* Warm gold tint */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_40%,rgba(201,169,110,0.18),transparent_60%)]" />

      {/* Animated gold ambiance orbs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          aria-hidden
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-10 h-[36rem] w-[36rem] rounded-full bg-revival-gold/20 blur-[150px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[#8a5a2b]/25 blur-[150px]"
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div
        className={
          "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 " +
          (compact
            ? "pb-16 pt-[112px] lg:pb-24 lg:pt-[140px]"
            : "pb-20 pt-[112px] lg:pb-32 lg:pt-[168px]")
        }
      >
        <motion.div
          style={{ y: contentY }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              variants={item}
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-light text-revival-cream/70 lg:justify-start"
            >
              {breadcrumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 && <span className="text-revival-gold/60">/</span>}
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-revival-gold"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-revival-gold">{c.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          <motion.span
            variants={item}
            className="text-tagline inline-flex items-center gap-2.5 rounded-full border border-revival-gold/30 bg-white/[0.06] px-4 py-1.5 text-xs text-revival-gold backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
            style={{
              fontSize: compact
                ? "clamp(2.25rem, 4.2vw, 4rem)"
                : "clamp(2.6rem, 5vw, 4.75rem)",
              lineHeight: 1.08,
            }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={item}
              className="mx-auto mt-7 max-w-2xl text-lg font-light leading-relaxed text-revival-cream/90 lg:mx-0"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href={primary.href}
              {...(primary.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-base font-medium text-revival-dark shadow-[0_8px_30px_-8px_rgba(201,169,110,0.6)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">{primary.label}</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {secondary && (
              <Link
                href={secondary.href}
                {...(secondary.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.04] px-8 py-4 text-base font-light text-white backdrop-blur-md transition-colors duration-300 hover:border-revival-gold hover:text-revival-gold"
              >
                {secondary.label}
              </Link>
            )}
          </motion.div>

          {showTrustBar && !compact && (
            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start"
            >
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
                  Rated 5 star by 500+
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-light text-revival-cream/80">
                <MapPin className="h-4 w-4 text-revival-gold" />2 Las Vegas
                Locations
              </span>
            </motion.div>
          )}

          {words && words.length > 0 && !compact && (
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-tagline text-xs text-revival-gold/90 lg:justify-start"
            >
              {words.map((w, i) => (
                <span key={w} className="flex items-center gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-revival-gold/50"
                    />
                  )}
                  {w}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-[0.65rem] uppercase tracking-[0.3em] text-revival-cream/60"
          >
            Scroll
            <ChevronDown className="h-4 w-4 text-revival-gold" />
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
