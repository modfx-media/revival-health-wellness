"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Star, Users, MapPin, Sparkles } from "lucide-react";
import { STATS } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = [Star, Users, MapPin, Sparkles];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-12 lg:py-16">
      {/* Animated gold aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-20 top-0 h-80 w-80 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.28), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.3), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* subtle gold grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {STATS.map((stat, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-sm transition-colors duration-300 hover:border-revival-gold/40 lg:p-5"
            >
              {/* hover gold glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-revival-gold/0 via-revival-gold/0 to-revival-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-4 w-4" />
              </span>

              <div className="relative mt-3 flex items-baseline justify-center font-heading text-3xl font-medium text-revival-gold lg:text-4xl">
                <Counter value={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <p className="relative mt-2 text-[0.65rem] font-light uppercase tracking-[0.18em] text-revival-cream/70">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => rounded.on("change", setDisplay), [rounded]);

  return <span ref={ref}>{display}</span>;
}
