"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { APPROACH } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ApproachSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-revival-warm-white py-14 lg:py-32"
    >
      {/* Animated gold ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.25), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.2), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Parallax image collage */}
        <div className="relative h-[480px] sm:h-[580px]">
          {/* Rotating dashed ring */}
          <motion.div
            aria-hidden
            style={{ rotate: ringRotate }}
            className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-revival-gold/30"
          />

          {/* Team image */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-4 overflow-hidden rounded-3xl bg-revival-warm-white shadow-2xl ring-1 ring-black/5"
          >
            <Image
              src={APPROACH.images[0]}
              alt="Personalized care at Revival Health and Wellness"
              fill
              sizes="(max-width: 1024px) 90vw, 600px"
              quality={100}
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-revival-gold/15 to-transparent mix-blend-soft-light" />
          </motion.div>

          {/* Floating glass stat badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="absolute -left-3 bottom-10 z-10 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-heading text-lg font-semibold text-revival-dark">
                30+ Treatments
              </p>
              <p className="text-xs text-revival-dark/60">
                Personalized to you
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/60 px-4 py-1.5 text-tagline text-xs text-revival-gold shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {APPROACH.eyebrow}
          </span>
          <h2
            className="mt-5 text-revival-dark"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
          >
            A synergistic,{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              multi-pronged
            </span>{" "}
            approach
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-revival-dark/70">
            {APPROACH.body}
          </p>

          <ul className="mt-10 space-y-4">
            {APPROACH.points.map((point, i) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.12 * i }}
                whileHover={{ x: 6 }}
                className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-revival-gold/20 hover:bg-white/60 hover:shadow-md"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-medium text-revival-dark">
                    {point.title}
                  </h3>
                  <p className="mt-1 font-light text-revival-dark/65">
                    {point.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
