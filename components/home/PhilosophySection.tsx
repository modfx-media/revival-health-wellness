"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GripVertical } from "lucide-react";
import { PHILOSOPHY } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PhilosophySection() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section className="relative overflow-hidden bg-revival-dark py-14 lg:py-32">
      {/* Animated ambiance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-[32rem] w-[32rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.25), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.18), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="text-tagline text-xs text-revival-gold">
              {PHILOSOPHY.eyebrow}
            </span>
            <h2
              className="mt-5 font-heading font-medium uppercase leading-[1.05] tracking-wide text-white"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              {PHILOSOPHY.titleLines.map((line, i) => (
                <span
                  key={i}
                  className={
                    line.accent
                      ? "bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent"
                      : "text-white"
                  }
                >
                  {line.text}{" "}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-revival-cream/75">
              {PHILOSOPHY.body}
            </p>
            <Link
              href={PHILOSOPHY.cta.href}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-8 py-3.5 text-tagline text-xs text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {PHILOSOPHY.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Before / After comparison */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <div
              ref={containerRef}
              className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[2rem] ring-1 ring-white/10"
              onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
              onMouseUp={() => (dragging.current = false)}
              onMouseLeave={() => (dragging.current = false)}
              onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
            >
              {/* After (full) */}
              <Image
                src={PHILOSOPHY.after}
                alt="After treatment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Before (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <Image
                  src={PHILOSOPHY.before}
                  alt="Before treatment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] uppercase tracking-widest text-white backdrop-blur">
                  Before
                </span>
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-revival-gold/90 px-3 py-1 text-[11px] uppercase tracking-widest text-revival-dark">
                After
              </span>

              {/* Divider + handle */}
              <div
                className="absolute inset-y-0 z-10 w-0.5 bg-white/90"
                style={{ left: `${pos}%` }}
              >
                <button
                  type="button"
                  aria-label="Drag to compare"
                  onMouseDown={() => (dragging.current = true)}
                  onTouchStart={() => (dragging.current = true)}
                  className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-revival-dark shadow-xl ring-4 ring-white/30"
                >
                  <GripVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 lg:grid-cols-4"
        >
          {PHILOSOPHY.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-medium text-white lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-tagline text-xs text-revival-cream/60">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
