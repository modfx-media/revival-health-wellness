"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Clock, Pause, Play, ShieldCheck, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAT_BADGES = [
  {
    Icon: Sparkles,
    label: "Radiant Lift",
    sub: "Exclusive protocol",
    position: "left-[-2.5rem] top-8 sm:left-[-3.5rem]",
    delay: 0.15,
  },
  {
    Icon: Clock,
    label: "60–90 min",
    sub: "Complete session",
    position: "right-[-2.5rem] top-1/3 sm:right-[-3.5rem]",
    delay: 0.3,
  },
  {
    Icon: ShieldCheck,
    label: "FDA-cleared",
    sub: "No needles · no downtime",
    position: "left-[-2.5rem] bottom-10 sm:left-[-3.5rem]",
    delay: 0.45,
  },
];

export default function EveresseVideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-revival-dark py-14 sm:py-20 lg:py-28"
    >
      {/* Ambient gold orbs with parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
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
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
            y: orbY,
          }}
          className="absolute -right-24 bottom-4 h-[22rem] w-[22rem] rounded-full blur-[140px]"
          animate={{ x: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
        {/* Left - editorial copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
              Double Depth Collagen Meets Laser Resurfacing
            </span>
          </div>
          <h2
            className="font-heading font-light leading-[1.05] text-white"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.15rem)",
              letterSpacing: "-0.01em",
            }}
          >
            {"EVERESSE + CoolPeel®"}
          </h2>
          <p className="mt-6 border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.65] text-revival-cream/90 sm:text-xl">
            Two powerful technologies, one complete transformation. Choose
            CoolPeel for laser resurfacing, Everesse RF for skin tightening and
            facial contouring, or combine both in our exclusive{" "}
            <span className="italic text-revival-gold">Radiant Lift</span>{" "}
            protocol for comprehensive rejuvenation.
          </p>

          {/* Inline stats - micro motion graph */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { value: "2", unit: "techs", label: "Everesse RF + CoolPeel" },
              { value: "1", unit: "session", label: "Full Radiant Lift" },
              { value: "6–18", unit: "months", label: "Results duration" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.08,
                  ease: EASE,
                }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
              >
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="font-heading text-3xl font-light leading-none text-white sm:text-4xl"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-revival-gold">
                    {s.unit}
                  </span>
                </div>
                <p className="mt-2 text-[0.72rem] leading-snug text-white/70">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - contained video with custom play button + floating stat badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="relative aspect-[9/16] max-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_120px_-32px_rgba(0,0,0,0.6)]">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              src="/images/everesse-rf/everesse-video.mp4"
              muted
              loop
              playsInline
              poster="/images/everesse-rf/EVERESSE-4-896x896-1.webp"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Subtle gradient overlay only when paused - helps play button visibility */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-transparent to-transparent"
              animate={{ opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            />

            {/* Custom play / pause button overlay */}
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
            >
              <motion.span
                aria-hidden
                animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.9 : 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-[0_20px_60px_-12px_rgba(201,169,110,0.6)] sm:h-24 sm:w-24"
              >
                {/* Pulse ring */}
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-revival-gold/40"
                />
                <Play
                  className="relative h-8 w-8 translate-x-0.5 fill-current sm:h-9 sm:w-9"
                  strokeWidth={0}
                />
              </motion.span>

              {/* Pause icon overlay (visible only while playing on hover) */}
              <motion.span
                aria-hidden
                animate={{ opacity: isPlaying ? 0 : 0 }}
                whileHover={{ opacity: isPlaying ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-revival-dark shadow-lg">
                  <Pause className="h-6 w-6" strokeWidth={2.5} />
                </span>
              </motion.span>
            </button>
          </div>

          {/* Floating stat badges around the video - the motion graph */}
          {STAT_BADGES.map((b) => (
            <motion.div
              key={b.label}
              style={{ y: badgeY }}
              initial={{ opacity: 0, x: b.position.includes("right") ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: b.delay }}
              className={`absolute ${b.position} hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-revival-dark/90 px-4 py-3 shadow-2xl backdrop-blur sm:flex`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold/20 text-revival-gold">
                <b.Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-gold/90">
                  {b.sub}
                </p>
                <p className="text-sm font-semibold text-white">{b.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
