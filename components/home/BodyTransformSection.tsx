"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Flame, TrendingDown, Activity, Sparkles, ArrowRight } from "lucide-react";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const MELT_PARTICLES = [
  { left: "44%", delay: 0, duration: 4.5 },
  { left: "52%", delay: 1.2, duration: 5.2 },
  { left: "48%", delay: 2.1, duration: 4.8 },
  { left: "57%", delay: 0.8, duration: 5.6 },
  { left: "41%", delay: 2.8, duration: 5 },
];

const FEATURES = [
  {
    icon: Flame,
    title: "Targeted Fat Reduction",
    text: "Emsculpt NEO burns stubborn fat while building lean muscle in one session.",
  },
  {
    icon: TrendingDown,
    title: "Medical Weight Loss",
    text: "GLP-1 programs and physician guidance for steady, lasting results.",
  },
  {
    icon: Activity,
    title: "Body Contouring",
    text: "Sculpt and define your waistline, abdomen, and thighs, no downtime.",
  },
];

function FatToSlimLoop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPlay(true);
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[32rem] w-[20rem]">
      {play ? (
        <video
          className="h-full w-full object-contain object-bottom"
          poster="/images/services/fat-to-slim-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label="Animation of body fat decreasing over time"
        >
          <source src="/videos/fat-to-slim.webm" type="video/webm" />
          <source src="/videos/fat-to-slim.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/images/services/fat-to-slim-poster.webp"
          alt="Still frame of a body fat-loss animation"
          fill
          sizes="320px"
          className="object-contain object-bottom"
        />
      )}
    </div>
  );
}

export default function BodyTransformSection() {
  // 0 = before (fat) · 1 = after (lean)
  const progress = useMotionValue(0);
  const [pct, setPct] = useState(0);

  // Slimming glow that warms to brand gold as fat is burned.
  const glow = useTransform(
    progress,
    [0, 1],
    [
      "drop-shadow(0 18px 30px rgba(0,0,0,0.5))",
      "drop-shadow(0 0 28px rgba(201,169,110,0.6)) drop-shadow(0 18px 30px rgba(0,0,0,0.5))",
    ],
  );

  const dragging = useRef(false);

  // Auto play loop until the user interacts.
  useEffect(() => {
    const controls = animate(progress, [0, 1, 0], {
      duration: 9,
      ease: "easeInOut",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    const unsub = progress.on("change", (v) => setPct(v));
    return () => unsub();
  }, [progress]);

  const bodyFat = (32 - pct * 14).toFixed(1);
  const weight = Math.round(224 - pct * 47);
  const muscle = Math.round(31 + pct * 14);

  return (
    <section className="relative overflow-hidden bg-revival-dark py-14 lg:py-32">
      {/* Animated gold ambiance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.26), transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* ── 3D body stage ─────────────────────────────────────────── */}
        <div
          className="relative mx-auto flex h-[34rem] w-full max-w-md items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {/* Rotating platform disc */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{ transformStyle: "preserve-3d", transform: "rotateX(72deg)" }}
          >
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="h-64 w-64 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(201,169,110,0.55), transparent 55%, rgba(232,213,176,0.4), transparent)",
                maskImage:
                  "radial-gradient(circle, transparent 56%, black 58%, black 72%, transparent 74%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 56%, black 58%, black 72%, transparent 74%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border border-revival-gold/15"
            />
          </div>

          {/* Soft glow behind body */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 h-[24rem] w-[18rem] -translate-y-1/2 rounded-full bg-revival-gold/15 blur-[80px]"
          />

          {/* Counter-rotating accent rings */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute h-[26rem] w-[26rem] rounded-full border border-dashed border-revival-gold/15"
          />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{
                duration: 16 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[26rem] w-[26rem]"
              style={{ rotate: i * 120 }}
            >
              <span
                className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-revival-gold"
                style={{ boxShadow: "0 0 16px 3px rgba(201,169,110,0.7)" }}
              />
            </motion.div>
          ))}

          {/* Melting-fat particles (more visible while in "before" state) */}
          {MELT_PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute top-1/2 h-1.5 w-1.5 rounded-full bg-revival-gold/80"
              style={{ left: p.left }}
              animate={{
                y: [0, 120],
                opacity: [0, 0.9, 0],
                scale: [1, 0.4],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeIn",
              }}
            />
          ))}

          {/* Animated fat → slim loop. Poster is the lightweight stand-in;
              the video itself loads only once the graphic is near the viewport. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ filter: glow }}
            className="relative z-10"
          >
            <FatToSlimLoop />
            {/* warm gold tint to match the palette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-revival-gold/10 via-transparent to-[#8a5a2b]/15 mix-blend-overlay" />
          </motion.div>

          {/* Floating "live metric" glass chips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
            className="absolute left-0 top-12 z-20 rounded-2xl border border-revival-gold/25 bg-revival-charcoal/70 px-4 py-3 shadow-xl backdrop-blur-xl"
          >
            <p className="text-[0.55rem] font-light uppercase tracking-[0.2em] text-revival-cream/60">
              Body Fat
            </p>
            <p className="font-heading text-2xl font-semibold text-revival-gold">
              {bodyFat}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
            className="absolute right-0 top-1/3 z-20 rounded-2xl border border-revival-gold/25 bg-revival-charcoal/70 px-4 py-3 text-right shadow-xl backdrop-blur-xl"
          >
            <p className="text-[0.55rem] font-light uppercase tracking-[0.2em] text-revival-cream/60">
              Weight
            </p>
            <p className="font-heading text-2xl font-semibold text-white">
              {weight}
              <span className="ml-1 text-xs font-light text-revival-cream/60">
                lbs
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-2xl border border-revival-gold/25 bg-revival-charcoal/70 px-4 py-2.5 text-center shadow-xl backdrop-blur-xl"
          >
            <p className="text-[0.55rem] font-light uppercase tracking-[0.2em] text-revival-cream/60">
              Lean Muscle
            </p>
            <p className="font-heading text-xl font-semibold text-revival-gold">
              {muscle}%
            </p>
          </motion.div>
        </div>

        {/* ── Copy + interactive control ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/5 px-4 py-1.5 text-tagline text-xs text-revival-gold backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Transformation
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-5 text-white"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
          >
            Watch fat melt into{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              lean, defined strength
            </span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-5 max-w-lg font-light leading-relaxed text-revival-cream/75"
          >
            Drag the slider to preview your journey. Our medical weight-loss and
            body-contouring programs reduce stubborn fat while building lean
            muscle, for a stronger, more confident you.
          </motion.p>

          {/* Before / After slider */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-8 max-w-md"
          >
            <div className="mb-2 flex justify-between text-tagline text-[0.65rem]">
              <span className="text-[#c98a4b]">Before</span>
              <span className="text-revival-gold">After</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={0}
              aria-label="Transformation progress"
              onPointerDown={() => {
                dragging.current = true;
              }}
              onChange={(e) => {
                progress.stop();
                progress.set(Number(e.target.value) / 100);
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] accent-revival-gold [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-revival-dark [&::-webkit-slider-thumb]:bg-revival-gold [&::-webkit-slider-thumb]:shadow-[0_0_12px_2px_rgba(201,169,110,0.7)]"
            />
          </motion.div>

          {/* Feature list */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-9 grid gap-4 sm:grid-cols-1"
          >
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-lg">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-base font-medium text-white">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-sm font-light leading-relaxed text-revival-cream/65">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.a
            href={ZENOTI}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-base font-medium text-revival-dark shadow-[0_8px_30px_-8px_rgba(201,169,110,0.6)] transition-transform duration-300 hover:scale-[1.03]"
          >
            Start Your Transformation
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
