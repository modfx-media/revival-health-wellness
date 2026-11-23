"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
} from "framer-motion";
import { CheckCircle2, Clock, Sparkles, Target, Zap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Animated numeric counter - counts up from 0 → `to` when scrolled into view.
 * Supports optional suffix (e.g. "months") and format hook for ranges like "2–3".
 */
function CountUp({
  to,
  format,
  duration = 1.5,
}: {
  to: number;
  format?: (v: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rendered = useTransform(mv, (v) =>
    format ? format(v) : Math.round(v).toString(),
  );

  if (inView) {
    animate(mv, to, { duration, ease: EASE });
  }

  return <motion.span ref={ref}>{rendered}</motion.span>;
}

const STATS = [
  {
    Icon: Zap,
    value: 3, // count up to 3, render as "2–3"
    format: (v: number) => {
      const rounded = Math.round(v);
      if (rounded <= 1) return "0";
      if (rounded === 2) return "2";
      return "2–3";
    },
    unit: "days",
    label: "to first visible results",
  },
  {
    Icon: Clock,
    value: 4,
    unit: "months",
    label: "average results duration",
  },
  {
    Icon: Sparkles,
    value: 4,
    unit: "zones",
    label: "commonly treated areas",
  },
];

export default function DysportEffectiveSection({
  image,
  zones,
}: {
  image: string;
  zones: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28"
    >
      {/* Dual ambient gold orbs with scroll parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.16), transparent 70%)",
            y: orbY,
          }}
          className="absolute -left-24 top-4 h-[26rem] w-[26rem] rounded-full blur-[140px]"
          animate={{ x: [0, 30, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.16), transparent 70%)",
            y: orbY,
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

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
        {/* Left: parallax image */}
        <motion.div style={{ y: imgY }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.3)]">
            <Image
              src={image}
              alt="Dysport treatment target areas - face illustration"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              quality={92}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/20 via-transparent to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="absolute -left-4 top-8 flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold">
              <Target className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-charcoal/60">
                FDA-approved
              </p>
              <p className="text-sm font-semibold text-revival-dark">
                Precision zones
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: content stack */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
              What is Dysport?
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
          </div>

          <h2
            className="font-heading font-light leading-[1.05] text-revival-dark"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.15rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Especially effective for{" "}
            <span className="italic text-revival-gold">dynamic wrinkles</span>
          </h2>

          <p className="mt-6 border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.65] text-revival-charcoal/90 sm:text-xl">
            Dysport temporarily relaxes targeted facial muscles to reduce
            wrinkles formed by repeated facial expressions - frowning,
            squinting, and smiling. Faster-acting than some other neurotoxins,
            with results in as little as 2–3 days and lasting up to 4 months.
          </p>

          {/* Zone chips */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {zones.map((z, i) => (
              <motion.li
                key={z}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm text-revival-charcoal/85 shadow-sm ring-1 ring-revival-gold/15"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="pt-0.5">{z}</span>
              </motion.li>
            ))}
          </ul>

          {/* Animated stat trio */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
                className="relative overflow-hidden rounded-2xl border border-revival-gold/20 bg-white/90 p-4 shadow-sm backdrop-blur"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-revival-gold/60 to-transparent"
                />
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-revival-gold/15 text-revival-gold">
                  <s.Icon className="h-4 w-4" />
                </span>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span
                    className="font-heading text-3xl font-light leading-none text-revival-dark sm:text-4xl"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    <CountUp to={s.value} format={s.format} />
                  </span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-revival-charcoal/60">
                    {s.unit}
                  </span>
                </div>
                <p className="mt-2 text-[0.72rem] leading-snug text-revival-charcoal/70">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
