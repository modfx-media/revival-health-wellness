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
import {
  CheckCircle2,
  Droplet,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function CountUp({
  to,
  suffix = "",
  duration = 1.5,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rendered = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  if (inView) animate(mv, to, { duration, ease: EASE });
  return <motion.span ref={ref}>{rendered}</motion.span>;
}

const HIGHLIGHTS = [
  "Physician-led hair loss consultations",
  "Autologous PRP - uses your own growth factors",
  "Personalized dosing and follow-up plan",
  "FDA-approved oral finasteride option",
];

const STATS = [
  { value: 90, suffix: "%", label: "of patients see visible improvement" },
  { value: 3, suffix: "–6", label: "sessions for full PRP protocol" },
  { value: 100, suffix: "%", label: "natural - no synthetics, no dyes" },
];

export default function HairIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28"
    >
      {/* Ambient orbs */}
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
        {/* Left: parallax portrait image with floating badges */}
        <motion.div style={{ y: imgY }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.3)]">
            <Image
              src="/images/hair/PRP-HAIR.jpg"
              alt="A patient receiving PRP hair restoration at Revival Health & Wellness"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              quality={92}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-revival-dark/25 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="absolute -left-4 top-8 flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold">
              <Droplet className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-charcoal/60">
                Autologous PRP
              </p>
              <p className="text-sm font-semibold text-revival-dark">
                Your own growth factors
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-white/50 bg-revival-dark px-4 py-3 text-revival-warm-white shadow-2xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold text-revival-dark">
              <Leaf className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-gold">
                Natural regrowth
              </p>
              <p className="text-sm font-semibold">Physician-led</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: rich copy + highlights + animated stats */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
              Our Hair Services
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
            Comprehensive hair services for your{" "}
            <span className="italic text-revival-gold">wellness journey</span>
          </h2>

          <p className="mt-6 border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.65] text-revival-charcoal/90 sm:text-xl">
            Revival Health and Wellness is here to help you with your medical
            hair care needs. Our team pairs advanced regenerative therapies
            with clinically proven medications to help you slow thinning,
            strengthen existing hair, and restore density naturally.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm text-revival-charcoal/85 shadow-sm ring-1 ring-revival-gold/15"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="pt-0.5">{h}</span>
              </motion.li>
            ))}
          </ul>

          {/* Animated stat trio */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s, i) => {
              const Icons = [Sparkles, Droplet, ShieldCheck];
              const Icon = Icons[i] ?? Sparkles;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.08,
                    ease: EASE,
                  }}
                  className="relative overflow-hidden rounded-2xl border border-revival-gold/20 bg-white/90 p-4 shadow-sm backdrop-blur"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-revival-gold/60 to-transparent"
                  />
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-revival-gold/15 text-revival-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="mt-3">
                    <span
                      className="font-heading text-3xl font-light leading-none text-revival-dark sm:text-4xl"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      <CountUp to={s.value} suffix={s.suffix} />
                    </span>
                  </div>
                  <p className="mt-2 text-[0.72rem] leading-snug text-revival-charcoal/70">
                    {s.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
