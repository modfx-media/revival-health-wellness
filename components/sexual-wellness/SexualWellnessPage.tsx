"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Flame,
  FlaskConical,
  Handshake,
  Heart,
  MapPin,
  Pause,
  Phone,
  Pill,
  Play,
  Shield,
  Sparkles,
  Star,
  Syringe,
  Target,
  Timer,
  User,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ZENOTI } from "@/lib/content/home";
import type { SWIcon, SWPage, SWSection } from "@/lib/content/sexual-wellness";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const ICONS: Record<SWIcon, LucideIcon> = {
  heart: Heart,
  wave: Waves,
  pill: Pill,
  syringe: Syringe,
  chair: Activity,
  shield: Shield,
  sparkles: Sparkles,
  target: Target,
  timer: Timer,
  activity: Activity,
  flame: Flame,
  handshake: Handshake,
  flask: FlaskConical,
  star: Star,
  user: User,
  check: CheckCircle2,
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════ */

function SectionTag({
  index,
  children,
  tone = "dark",
}: {
  index?: number;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="flex items-center gap-3">
      <span
        className={
          "inline-flex h-px w-8 " +
          (light ? "bg-revival-gold/70" : "bg-revival-gold")
        }
      />
      <span
        className={
          "text-tagline text-[0.68rem] " +
          (light ? "text-revival-gold" : "text-revival-gold")
        }
      >
        {typeof index === "number"
          ? `${String(index).padStart(2, "0")} · `
          : null}
        {children}
      </span>
    </div>
  );
}

function EditorialHeading({
  children,
  tone = "dark",
  size = "md",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const scale =
    size === "lg"
      ? "text-[2.5rem] sm:text-5xl lg:text-[4rem]"
      : size === "sm"
      ? "text-3xl sm:text-4xl"
      : "text-[2.25rem] sm:text-[2.75rem] lg:text-5xl";
  return (
    <h2
      className={
        `mt-4 font-heading leading-[1.05] tracking-[-0.015em] ${scale} ` +
        (tone === "dark" ? "text-revival-dark" : "text-white")
      }
    >
      {children}
    </h2>
  );
}

/** Magnetic-feeling primary button. */
function GoldCTA({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};
  return (
    <a
      href={href}
      {...props}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_14px_36px_-14px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.04]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

/** Section-boundary sparkle line. */
function GoldDivider({ tone = "cream" }: { tone?: "cream" | "dark" }) {
  const bg = tone === "dark" ? "bg-revival-dark" : "bg-revival-warm-white";
  return (
    <div className={`relative ${bg} py-6`}>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-revival-gold/50 to-transparent" />
        <Sparkles className="h-4 w-4 text-revival-gold" />
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-revival-gold/50 to-transparent" />
      </div>
    </div>
  );
}

/** Count-up number that runs when scrolled into view. */
function CountUp({ value }: { value: string }) {
  // Extract the leading number from strings like "100%", "3x", "9–12 mo", "Zero".
  const match = value.match(/^(\d+(?:\.\d+)?)/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? value.slice(match[0].length) : value;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || numeric === null) return;
    const dur = 1500;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * numeric));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  if (numeric === null) {
    return <span ref={ref}>{value}</span>;
  }
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VALUE STRIP  - thin editorial band right under the hero
   ═══════════════════════════════════════════════════════════════════════ */

function ValueStrip({ data }: { data: SWPage }) {
  const chips = [
    { Icon: Shield, label: "Physician-Led" },
    { Icon: Sparkles, label: "Concierge Care" },
    { Icon: MapPin, label: "2 Las Vegas Locations" },
    { Icon: Phone, label: "(702) 963-1154" },
  ];
  return (
    <section className="relative overflow-hidden bg-revival-dark py-5 text-revival-warm-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-y-0 left-1/4 h-full w-64 bg-gradient-to-r from-transparent via-revival-gold/25 to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.72rem] font-medium uppercase tracking-[0.14em]">
          {chips.map((c) => (
            <li
              key={c.label}
              className="inline-flex items-center gap-2 text-revival-warm-white/80"
            >
              <c.Icon className="h-3.5 w-3.5 text-revival-gold" />
              {c.label}
            </li>
          ))}
        </ul>
        <a
          href={ZENOTI}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:text-revival-gold-light"
        >
          Book {data.eyebrow.split("·")[0].trim()}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OVERVIEW  - editorial split with layered offset card + numbered tag
   ═══════════════════════════════════════════════════════════════════════ */

function OverviewSection({
  section,
  index,
}: {
  section: Extract<SWSection, { kind: "overview" }>;
  index: number;
}) {
  const flip = section.side === "right";
  const bg = index % 2 === 0 ? "bg-revival-warm-white" : "bg-revival-cream";

  return (
    <section className={`relative overflow-hidden ${bg} py-14 sm:py-20 lg:py-24`}>
      {/* subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C9A96E 1px, transparent 1px), linear-gradient(to bottom, #C9A96E 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />

      <div
        className={
          "relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:gap-24 lg:px-8 " +
          (flip
            ? "lg:grid-cols-[1fr_1.05fr]"
            : "lg:grid-cols-[1.05fr_1fr]")
        }
      >
        {/* Copy */}
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={flip ? "lg:order-2" : ""}
        >
          <motion.div variants={fadeLeft}>
            <SectionTag index={index + 1}>
              {section.eyebrow ?? "Overview"}
            </SectionTag>
          </motion.div>
          <motion.div variants={fadeUp}>
            <EditorialHeading>{section.heading}</EditorialHeading>
          </motion.div>
          {section.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg font-light leading-relaxed text-revival-charcoal/80"
            >
              {p}
            </motion.p>
          ))}
          {section.bullets ? (
            <motion.ul
              variants={fadeContainer}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {section.bullets.map((b) => (
                <motion.li
                  key={b}
                  variants={fadeUp}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-revival-gold" />
                  <span className="text-revival-charcoal/85">{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          ) : null}
        </motion.div>

        {/* Layered image */}
        {section.image ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className={
              "relative " + (flip ? "lg:order-1" : "")
            }
          >
            {/* offset accent square */}
            <span
              aria-hidden
              className={
                "absolute top-6 hidden aspect-square w-40 rounded-3xl bg-gradient-to-br from-revival-gold/30 to-revival-gold/5 lg:block " +
                (flip ? "left-6" : "right-6")
              }
            />
            {/* index badge */}
            <span className="absolute -top-5 left-6 z-10 inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-revival-gold shadow-lg">
              <Sparkles className="h-3 w-3" />
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.imageContain ? (
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_50px_120px_-32px_rgba(15,15,15,0.35)]">
                <Image
                  src={section.image}
                  alt={section.imageAlt ?? section.heading}
                  width={section.imageWidth ?? 1200}
                  height={section.imageHeight ?? 982}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="h-auto w-full object-contain"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_50px_120px_-32px_rgba(15,15,15,0.35)]">
                <Image
                  src={section.image}
                  alt={section.imageAlt ?? section.heading}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-revival-dark/25 via-transparent to-transparent" />
              </div>
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS  - full-width billboard with count-up
   ═══════════════════════════════════════════════════════════════════════ */

function StatsSection({
  section,
}: {
  section: Extract<SWSection, { kind: "stats" }>;
}) {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-20 text-revival-warm-white lg:py-24">
      {/* animated gold orbs */}
      <motion.span
        aria-hidden
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-revival-gold/20 blur-[150px]"
      />
      <motion.span
        aria-hidden
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#8a5a2b]/25 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(section.eyebrow || section.heading) && (
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-3xl text-center"
          >
            {section.eyebrow ? (
              <motion.div variants={fadeUp} className="flex justify-center">
                <SectionTag tone="light">{section.eyebrow}</SectionTag>
              </motion.div>
            ) : null}
            {section.heading ? (
              <motion.div variants={fadeUp}>
                <EditorialHeading tone="light">
                  {section.heading}
                </EditorialHeading>
              </motion.div>
            ) : null}
          </motion.div>
        )}

        <motion.dl
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={
            "grid gap-px overflow-hidden rounded-3xl bg-revival-gold/20 " +
            (section.heading ? "mt-14 " : "mt-0 ") +
            (section.items.length === 2
              ? "sm:grid-cols-2"
              : section.items.length >= 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-3")
          }
        >
          {section.items.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="relative overflow-hidden bg-revival-dark px-8 py-14 text-center transition-colors hover:bg-revival-charcoal"
            >
              <dt className="relative font-heading text-6xl text-revival-gold tracking-[-0.03em] sm:text-7xl lg:text-[5.5rem]">
                <CountUp value={s.value} />
              </dt>
              <dd className="relative mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-revival-warm-white">
                {s.label}
              </dd>
              {s.sub ? (
                <p className="relative mx-auto mt-2 max-w-[16rem] text-xs font-light text-revival-warm-white/55">
                  {s.sub}
                </p>
              ) : null}
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROCESS  - vertical scroll-drawn timeline
   ═══════════════════════════════════════════════════════════════════════ */

function ProcessSection({
  section,
}: {
  section: Extract<SWSection, { kind: "process" }>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 65%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl"
        >
          {section.eyebrow ? (
            <motion.div variants={fadeLeft}>
              <SectionTag>{section.eyebrow}</SectionTag>
            </motion.div>
          ) : null}
          <motion.div variants={fadeUp}>
            <EditorialHeading>{section.heading}</EditorialHeading>
          </motion.div>
          {section.intro ? (
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg font-light text-revival-charcoal/75"
            >
              {section.intro}
            </motion.p>
          ) : null}
        </motion.div>

        <div
          ref={wrapRef}
          className="relative mt-16 pl-10 sm:pl-14 lg:mx-auto lg:max-w-4xl"
        >
          {/* Static rail */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-4 bottom-4 w-px bg-revival-gold/15 sm:left-6"
          />
          {/* Scroll-drawn overlay */}
          <motion.span
            aria-hidden
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-4 top-4 w-px origin-top bg-gradient-to-b from-revival-gold to-revival-gold/40 sm:left-6"
          />

          <motion.ol
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            {section.steps.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <motion.li
                  key={s.title}
                  variants={fadeUp}
                  className="relative"
                >
                  {/* Node */}
                  <span className="absolute -left-10 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-revival-gold/40 bg-white shadow-[0_0_0_5px_rgba(201,169,110,0.08)] sm:-left-14 sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 text-revival-gold sm:h-5 sm:w-5" />
                  </span>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-revival-gold">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl text-revival-dark sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-revival-charcoal/75">
                    {s.text}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES  - equal-height card row with numbered indices + gold accent bar
   ═══════════════════════════════════════════════════════════════════════ */

function FeaturesSection({
  section,
}: {
  section: Extract<SWSection, { kind: "features" }>;
}) {
  const tone = section.tone ?? "cream";
  const isDark = tone === "dark";
  const bg =
    tone === "dark"
      ? "bg-revival-dark text-revival-warm-white"
      : tone === "light"
      ? "bg-white"
      : "bg-revival-cream";
  const cardBg = isDark
    ? "border-revival-gold/20 bg-white/[0.04] hover:border-revival-gold/60"
    : "border-revival-gold/15 bg-white hover:border-revival-gold/50 hover:shadow-[0_24px_60px_-30px_rgba(15,15,15,0.25)]";

  const cols =
    section.items.length === 2
      ? "sm:grid-cols-2"
      : section.items.length === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : section.items.length >= 6
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4"; // 4 or 5 items

  return (
    <section className={`relative overflow-hidden py-14 sm:py-20 lg:py-24 ${bg}`}>
      {/* soft radial glow */}
      <span
        aria-hidden
        className={
          "pointer-events-none absolute -right-40 top-16 h-96 w-96 rounded-full blur-[140px] " +
          (isDark ? "bg-revival-gold/15" : "bg-revival-gold/10")
        }
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            {section.eyebrow ? (
              <motion.div variants={fadeLeft}>
                <SectionTag tone={isDark ? "light" : "dark"}>
                  {section.eyebrow}
                </SectionTag>
              </motion.div>
            ) : null}
            <motion.div variants={fadeUp}>
              <EditorialHeading tone={isDark ? "light" : "dark"}>
                {section.heading}
              </EditorialHeading>
            </motion.div>
          </div>
          {section.intro ? (
            <motion.p
              variants={fadeUp}
              className={
                "max-w-md text-base font-light leading-relaxed " +
                (isDark
                  ? "text-revival-warm-white/70"
                  : "text-revival-charcoal/75")
              }
            >
              {section.intro}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={"mt-14 grid grid-cols-1 gap-5 " + cols}
        >
          {section.items.map((it, i) => {
            const Icon = ICONS[it.icon];
            return (
              <motion.article
                key={it.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 shadow-sm transition-[border-color,box-shadow,background-color] duration-500 " +
                  cardBg
                }
              >
                {/* Radial spotlight on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-px opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(201,169,110,0.28), transparent 70%)",
                  }}
                />

                {/* Header row: icon tile + index badge */}
                <div className="relative flex items-start justify-between">
                  <motion.span
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className={
                      "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors " +
                      (isDark
                        ? "bg-revival-gold/15 text-revival-gold group-hover:bg-revival-gold/30"
                        : "bg-gradient-to-br from-revival-gold/25 to-revival-gold/5 text-revival-gold group-hover:from-revival-gold/40")
                    }
                  >
                    <Icon className="h-6 w-6" />
                  </motion.span>
                  <span
                    className={
                      "font-heading text-3xl leading-none tracking-[-0.02em] " +
                      (isDark
                        ? "text-revival-warm-white/25"
                        : "text-revival-charcoal/20")
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={
                    "relative mt-8 font-heading text-xl tracking-[-0.01em] sm:text-[1.375rem] " +
                    (isDark ? "text-white" : "text-revival-dark")
                  }
                >
                  {it.title}
                </h3>
                <p
                  className={
                    "relative mt-3 flex-1 text-sm font-light leading-relaxed " +
                    (isDark
                      ? "text-revival-warm-white/70"
                      : "text-revival-charcoal/75")
                  }
                >
                  {it.text}
                </p>

                {/* Animated bottom accent - draws from left on hover */}
                <span
                  aria-hidden
                  className="relative mt-6 block h-px w-full overflow-hidden bg-revival-gold/15"
                >
                  <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-revival-gold to-revival-gold-light transition-[width] duration-700 group-hover:w-full" />
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BULLETS  - 2-column checklist card with corner accent
   ═══════════════════════════════════════════════════════════════════════ */

function BulletsSection({
  section,
}: {
  section: Extract<SWSection, { kind: "bullets" }>;
}) {
  return (
    <section className="relative bg-revival-warm-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          {section.eyebrow ? (
            <motion.div variants={fadeUp} className="flex justify-center">
              <SectionTag>{section.eyebrow}</SectionTag>
            </motion.div>
          ) : null}
          <motion.div variants={fadeUp}>
            <EditorialHeading>{section.heading}</EditorialHeading>
          </motion.div>
          {section.intro ? (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-lg font-light text-revival-charcoal/75"
            >
              {section.intro}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mt-14 rounded-[2rem] border border-revival-gold/20 bg-white/80 p-8 shadow-xl backdrop-blur-sm sm:p-12"
        >
          {/* corner sparkle */}
          <span className="absolute -top-4 left-8 inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-revival-gold shadow">
            <Sparkles className="h-3 w-3" />
            What&apos;s included
          </span>

          <motion.ul
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={
              "grid gap-x-10 gap-y-4 " +
              (section.columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1")
            }
          >
            {section.items.map((it) => (
              <motion.li
                key={it}
                variants={fadeUp}
                className="group flex items-start gap-3 border-b border-revival-gold/10 pb-3 last:border-0"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold transition-colors group-hover:bg-revival-gold group-hover:text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-revival-charcoal/90 leading-relaxed">
                  {it}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUOTE  - asymmetric editorial testimonial
   ═══════════════════════════════════════════════════════════════════════ */

function QuoteSection({
  section,
}: {
  section: Extract<SWSection, { kind: "quote" }>;
}) {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        {section.image ? (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl bg-revival-gold/20"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src={section.image}
                alt={section.heading || section.attribution || "Revival Health and Wellness"}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        ) : null}

        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {section.eyebrow ? (
            <motion.div variants={fadeLeft}>
              <SectionTag>{section.eyebrow}</SectionTag>
            </motion.div>
          ) : null}
          {section.heading ? (
            <motion.div variants={fadeUp}>
              <EditorialHeading size="sm">{section.heading}</EditorialHeading>
            </motion.div>
          ) : null}

          {/* Huge opening quotation mark */}
          <motion.span
            variants={fadeUp}
            aria-hidden
            className="mt-6 block font-heading text-[5rem] leading-none text-revival-gold"
          >
            &ldquo;
          </motion.span>

          <motion.blockquote
            variants={fadeUp}
            className="-mt-6 font-heading text-2xl leading-[1.3] italic text-revival-dark sm:text-3xl lg:text-[2rem]"
          >
            {section.quote}
          </motion.blockquote>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-3"
          >
            <span className="flex gap-0.5 text-revival-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-revival-gold" />
              ))}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-revival-charcoal/60">
              {section.attribution}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WARNING  - struck-through comparison + Revival "yes" card
   ═══════════════════════════════════════════════════════════════════════ */

function WarningSection({
  section,
}: {
  section: Extract<SWSection, { kind: "warning" }>;
}) {
  return (
    <section className="relative bg-revival-warm-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          {section.eyebrow ? (
            <motion.div variants={fadeUp} className="flex justify-center">
              <SectionTag>{section.eyebrow}</SectionTag>
            </motion.div>
          ) : null}
          <motion.div variants={fadeUp}>
            <EditorialHeading>{section.heading}</EditorialHeading>
          </motion.div>
          {section.intro ? (
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg font-light text-revival-charcoal/75"
            >
              {section.intro}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {section.items.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-red-500/25 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1"
            >
              {/* diagonal strike */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent 0 12px, rgba(239,68,68,0.06) 12px 14px)",
                }}
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <X className="h-5 w-5" />
              </span>
              <h3 className="relative mt-5 font-heading text-lg text-revival-dark line-through decoration-red-500/50 decoration-2 underline-offset-4">
                {it.title}
              </h3>
              <p className="relative mt-3 text-sm font-light leading-relaxed text-revival-charcoal/75">
                {it.text}
              </p>
            </motion.div>
          ))}

          {/* Revival positive card - completes the 4-up grid */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-revival-gold/40 bg-revival-dark p-7 text-revival-warm-white shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-revival-gold/25 blur-3xl"
            />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-revival-gold text-revival-dark">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <h3 className="relative mt-5 font-heading text-lg text-revival-gold">
              The Revival Way
            </h3>
            <p className="relative mt-3 text-sm font-light leading-relaxed text-revival-warm-white/80">
              Clinically-proven, non-surgical protocols with real, safe results
              - designed and delivered by our medical team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OPTIONS  - luxury lifestyle cards with image top
   ═══════════════════════════════════════════════════════════════════════ */

function OptionsSection({
  section,
}: {
  section: Extract<SWSection, { kind: "options" }>;
}) {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          {section.eyebrow ? (
            <motion.div variants={fadeUp} className="flex justify-center">
              <SectionTag>{section.eyebrow}</SectionTag>
            </motion.div>
          ) : null}
          <motion.div variants={fadeUp}>
            <EditorialHeading>{section.heading}</EditorialHeading>
          </motion.div>
          {section.intro ? (
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg font-light text-revival-charcoal/75"
            >
              {section.intro}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={
            "mt-14 grid gap-6 " +
            (section.items.length === 2
              ? "sm:grid-cols-2"
              : section.items.length === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-3")
          }
        >
          {section.items.map((it, i) => (
            <motion.div key={it.title} variants={fadeUp}>
              <Link
                href={it.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-revival-gold/15 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  {it.image ? (
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-revival-gold-light/60 to-revival-gold/20" />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-revival-dark/10 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal shadow">
                    Option {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-lg transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-2xl text-revival-dark tracking-[-0.01em]">
                    {it.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    {it.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-revival-gold">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RELATED TREATMENTS  - horizontal scroll snap carousel
   ═══════════════════════════════════════════════════════════════════════ */

function RelatedTreatments({
  slugs,
  contentMap,
}: {
  slugs: string[];
  contentMap: Record<string, SWPage>;
}) {
  const items = slugs.map((s) => contentMap[s]).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <motion.div variants={fadeLeft}>
              <SectionTag>Continue exploring</SectionTag>
            </motion.div>
            <motion.div variants={fadeUp}>
              <EditorialHeading size="sm">
                More{" "}
                <span className="italic text-revival-gold">Revival care</span>{" "}
                for you
              </EditorialHeading>
            </motion.div>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/sexual-wellness/"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:text-revival-dark"
            >
              All sexual wellness
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Horizontal scroll carousel on mobile, grid on desktop */}
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {items.slice(0, 6).map((r) => (
            <motion.div
              key={r.slug}
              variants={fadeUp}
              className="w-[85%] shrink-0 snap-start sm:w-auto"
            >
              <Link
                href={`/${r.slug}/`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-revival-gold/15 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={r.gallery[0]}
                    alt={r.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 85vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/50 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal shadow">
                    {r.category === "men"
                      ? "For Men"
                      : r.category === "women"
                      ? "For Women"
                      : "Sexual Wellness"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl text-revival-dark">
                    {r.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    {r.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-revival-gold">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL CTA  - dark hero-esque closer
   ═══════════════════════════════════════════════════════════════════════ */

const TEAM_PORTRAITS = [
  {
    src: "/images/about/team/sanaz-salmani.png",
    alt: "Sanaz Salmani, Clinic Director at Revival Health and Wellness",
  },
  {
    src: "/images/about/team/radford-raquedan.png",
    alt: "Radford Raquedan, Nurse Practitioner at Revival Health and Wellness",
  },
  {
    src: "/images/about/team/carola-villasenor.png",
    alt: "Carola Villasenor, Lead Medical Assistant at Revival Health and Wellness",
  },
] as const;

function FinalCta({
  title,
  subtitle,
  image,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-revival-dark py-20 text-revival-warm-white lg:py-24"
    >
      {/* dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(#C9A96E 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.span
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-revival-gold/20 blur-[160px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <motion.div
          variants={fadeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeLeft}>
            <SectionTag tone="light">Book your visit</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading text-[2.5rem] leading-[1.05] tracking-[-0.015em] text-white sm:text-5xl lg:text-[4rem]"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg font-light text-revival-warm-white/75"
          >
            {subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <GoldCTA href={ZENOTI} external>
              Book Free Consultation
            </GoldCTA>
            <a
              href="tel:7029631154"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-revival-warm-white transition-colors hover:border-revival-gold/60 hover:text-revival-gold"
            >
              <Phone className="h-4 w-4" />
              (702) 963-1154
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {TEAM_PORTRAITS.map((person, i) => (
                <span
                  key={person.src}
                  className="relative inline-block h-9 w-9 overflow-hidden rounded-full border-2 border-revival-dark"
                  style={{ zIndex: 3 - i }}
                >
                  <Image src={person.src} alt={person.alt} fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="text-sm font-light text-revival-warm-white/70">
              A licensed Revival provider will meet with you personally.
            </p>
          </motion.div>
        </motion.div>

        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_50px_120px_-32px_rgba(201,169,110,0.35)]"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VIDEO  - click-to-load YouTube facade (loads iframe only after user clicks)
   ═══════════════════════════════════════════════════════════════════════ */

function VideoSection({
  section,
}: {
  section: Extract<SWSection, { kind: "video" }>;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLocal = !!section.src;
  const poster =
    section.poster ??
    (section.videoId
      ? `https://i.ytimg.com/vi/${section.videoId}/maxresdefault.jpg`
      : undefined);
  const embedSrc = section.videoId
    ? `https://www.youtube.com/embed/${section.videoId}?autoplay=1&rel=0&modestbranding=1${
        section.start ? `&start=${section.start}` : ""
      }`
    : "";

  const toggleLocal = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section className="relative overflow-hidden bg-revival-dark py-20 text-revival-warm-white lg:py-24">
      {/* animated gold ambience */}
      <motion.span
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-revival-gold/20 blur-[160px]"
      />
      <motion.span
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#8a5a2b]/25 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(section.eyebrow || section.heading || section.intro) && (
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto max-w-3xl text-center"
          >
            {section.eyebrow ? (
              <motion.div variants={fadeUp} className="flex justify-center">
                <SectionTag tone="light">{section.eyebrow}</SectionTag>
              </motion.div>
            ) : null}
            {section.heading ? (
              <motion.div variants={fadeUp}>
                <EditorialHeading tone="light" size="sm">
                  {section.heading}
                </EditorialHeading>
              </motion.div>
            ) : null}
            {section.intro ? (
              <motion.p
                variants={fadeUp}
                className="mt-5 text-base font-light leading-relaxed text-revival-warm-white/70 sm:text-lg"
              >
                {section.intro}
              </motion.p>
            ) : null}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-12"
        >
          {/* Framed player */}
          <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_50px_120px_-32px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-video w-full">
              {isLocal ? (
                <div
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                  onClick={toggleLocal}
                >
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={section.src}
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
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 transition-opacity duration-300 group-hover:from-black/50"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full ring-2 ring-white/60 opacity-70 transition-transform duration-1000 group-hover:animate-ping"
                          />
                          <Play
                            className="ml-1 h-8 w-8 fill-revival-dark text-revival-dark sm:h-10 sm:w-10"
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
                        toggleLocal();
                      }}
                      aria-label="Pause video"
                      className="absolute bottom-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-revival-gold hover:bg-black/70 group-hover:opacity-100"
                    >
                      <Pause className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ) : playing ? (
                <iframe
                  src={embedSrc}
                  title={section.heading ?? "Video"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play video"
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  {/* Poster (plain img so we don't need next.config remotePatterns for ytimg) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster}
                    alt={section.caption ?? section.heading ?? "Video poster"}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      // Fall back to hqdefault if maxresdefault isn't available.
                      const img = e.currentTarget;
                      const hq = `https://i.ytimg.com/vi/${section.videoId}/hqdefault.jpg`;
                      if (img.src !== hq) img.src = hq;
                    }}
                  />
                  {/* Dark gradient overlay */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 transition-opacity duration-300 group-hover:from-black/50" />

                  {/* Center play button */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full ring-2 ring-white/60 opacity-70 transition-transform duration-1000 group-hover:animate-ping"
                      />
                      <Play
                        className="ml-1 h-8 w-8 fill-revival-dark text-revival-dark sm:h-10 sm:w-10"
                        strokeWidth={0}
                      />
                    </span>
                  </span>

                  {/* Corner "Watch" chip */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-revival-gold/95 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-revival-dark shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-dark/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-revival-dark" />
                    </span>
                    Watch
                  </span>
                </button>
              )}
            </div>
          </div>

          {section.caption ? (
            <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-revival-warm-white/60">
              {section.caption}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MARQUEE BAND  - cycling treatment names between hub → grid
   ═══════════════════════════════════════════════════════════════════════ */

function MarqueeBand({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const track = [...items, ...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-revival-gold/15 bg-revival-cream py-6">
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-10 whitespace-nowrap"
      >
        {track.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-6 font-heading text-2xl italic tracking-[-0.01em] text-revival-charcoal/70 sm:text-3xl"
          >
            {label}
            <Sparkles className="h-4 w-4 text-revival-gold" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPOSER
   ═══════════════════════════════════════════════════════════════════════ */

export default function SexualWellnessPage({
  data,
  contentMap,
}: {
  data: SWPage;
  contentMap: Record<string, SWPage>;
}) {
  const { titleNode } = data;

  // Marquee content drawn from related treatments' titles.
  const marqueeItems = (data.relatedSlugs ?? [])
    .map((s) => contentMap[s]?.title)
    .filter(Boolean) as string[];

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        breadcrumbs={data.breadcrumbs}
        title={
          titleNode ? (
            <>
              {titleNode.pre ? <>{titleNode.pre} </> : null}
              <span className="relative inline-block italic text-revival-gold">
                {titleNode.accent}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
                />
              </span>
              {titleNode.post ? <> {titleNode.post}</> : null}
            </>
          ) : (
            data.title
          )
        }
        description={data.description}
        gallery={data.gallery}
        galleryAlts={data.galleryAlts}
      />

      <ValueStrip data={data} />

      {marqueeItems.length >= 2 ? <MarqueeBand items={marqueeItems} /> : null}

      {data.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} index={i} />
      ))}

      {data.ctaTitle && data.ctaBeforeRelated ? (
        <FinalCta
          title={data.ctaTitle}
          subtitle={data.ctaSubtitle ?? ""}
          image={data.gallery[data.gallery.length - 1]}
          imageAlt={
            data.galleryAlts?.[data.gallery.length - 1] ??
            `${data.title} at Revival Health and Wellness`
          }
        />
      ) : null}

      {data.relatedSlugs && data.relatedSlugs.length > 0 ? (
        <>
          <GoldDivider />
          <RelatedTreatments
            slugs={data.relatedSlugs}
            contentMap={contentMap}
          />
        </>
      ) : null}

      {data.ctaTitle && !data.ctaBeforeRelated ? (
        <FinalCta
          title={data.ctaTitle}
          subtitle={data.ctaSubtitle ?? ""}
          image={data.gallery[data.gallery.length - 1]}
          imageAlt={
            data.galleryAlts?.[data.gallery.length - 1] ??
            `${data.title} at Revival Health and Wellness`
          }
        />
      ) : null}
    </>
  );
}

function SectionRenderer({
  section,
  index,
}: {
  section: SWSection;
  index: number;
}) {
  switch (section.kind) {
    case "overview":
      return <OverviewSection section={section} index={index} />;
    case "stats":
      return <StatsSection section={section} />;
    case "process":
      return <ProcessSection section={section} />;
    case "features":
      return <FeaturesSection section={section} />;
    case "bullets":
      return <BulletsSection section={section} />;
    case "quote":
      return <QuoteSection section={section} />;
    case "warning":
      return <WarningSection section={section} />;
    case "options":
      return <OptionsSection section={section} />;
    case "video":
      return <VideoSection section={section} />;
    case "faq":
      return <FaqSection section={section} />;
  }
}

function FaqSection({
  section,
}: {
  section: Extract<SWSection, { kind: "faq" }>;
}) {
  return (
    <section className="bg-revival-warm-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {section.eyebrow ? (
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold">
            {section.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-heading text-3xl text-revival-dark sm:text-4xl">
          {section.heading}
        </h2>
        {section.intro ? (
          <p className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/80">
            {section.intro}
          </p>
        ) : null}
        <div className="mt-8 divide-y divide-revival-gold/15 border-y border-revival-gold/15">
          {section.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer list-none font-heading text-xl text-revival-dark">
                {item.question}
              </summary>
              <p className="mt-3 text-base font-light leading-relaxed text-revival-charcoal/80">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// keep AnimatePresence import used (future accordion hover reveals could use it)
void AnimatePresence;
