"use client";

import { motion } from "framer-motion";
import {
  Syringe,
  Zap,
  ShieldCheck,
  Sparkles,
  Droplet,
  HeartPulse,
  Leaf,
  Sun,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const NUTRIENTS = [
  {
    icon: Zap,
    tag: "B12",
    title: "Energy & focus",
    text: "Supports red-blood-cell production and steady all-day energy without a stimulant crash.",
  },
  {
    icon: Sun,
    tag: "Vitamin D",
    title: "Immunity & mood",
    text: "Corrects the deficiency most Las Vegas patients have and lifts immune resilience.",
  },
  {
    icon: Droplet,
    tag: "Glutathione",
    title: "Detox & glow",
    text: "Master antioxidant — clears oxidative stress and brightens skin from the inside out.",
  },
  {
    icon: Sparkles,
    tag: "Biotin",
    title: "Hair, skin & nails",
    text: "Strengthens keratin production for visibly healthier hair, skin, and nail growth.",
  },
  {
    icon: Leaf,
    tag: "Amino Blend",
    title: "Recovery & lean muscle",
    text: "Fuels tissue repair and muscle recovery — great alongside training or weight loss.",
  },
  {
    icon: HeartPulse,
    tag: "Vitamin C",
    title: "Immune shield",
    text: "High-dose IM delivery for immunity, collagen synthesis, and rapid recovery.",
  },
];

const OUTCOMES = [
  { icon: Zap, label: "Energy" },
  { icon: ShieldCheck, label: "Immunity" },
  { icon: Sparkles, label: "Glow" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function VitaminBoostDetails() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-16 lg:py-24">
      {/* Ambient gold aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.28), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.28), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/[0.04] px-4 py-1.5 text-tagline text-xs text-revival-gold backdrop-blur">
            <Syringe className="h-3.5 w-3.5" />
            Micronutrient Boost
          </span>
          <h2
            className="mt-5 text-white"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
          >
            One quick injection.{" "}
            <span className="bg-gradient-to-r from-[#e8d5b0] via-revival-gold to-[#8a5a2b] bg-clip-text text-transparent">
              Broad-spectrum benefit.
            </span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-revival-cream/70">
            Concentrated vitamins, minerals, and antioxidants absorbed directly
            into your bloodstream — energy, immunity, recovery, and glow all
            at once.
          </p>
        </motion.div>

        {/* Detail infographic */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
          {/* Center visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-revival-gold/20 bg-gradient-to-br from-[#1c150c] to-[#0f0d0a] p-8"
          >
            {/* Concentric rings */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 rounded-full border border-dashed border-revival-gold/25"
            />
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute inset-14 rounded-full border border-revival-gold/15"
            />

            {/* Central syringe/vial illustration */}
            <div className="relative flex flex-col items-center gap-4">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] shadow-[0_20px_60px_rgba(201,169,110,0.35)] ring-4 ring-revival-gold/20"
              >
                <Syringe className="h-14 w-14 text-revival-dark" />
              </motion.div>
              <p className="text-tagline text-[0.65rem] text-revival-gold">
                Direct IM Delivery
              </p>
              <p className="max-w-[220px] text-center text-xs font-light text-revival-cream/60">
                Skips digestion. Bypasses first-pass metabolism. Near-complete
                absorption.
              </p>
            </div>

            {/* Outcome badges */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-around gap-2">
              {OUTCOMES.map((o) => {
                const Icon = o.icon;
                return (
                  <span
                    key={o.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-revival-gold/25 bg-black/40 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.15em] text-revival-cream backdrop-blur-md"
                  >
                    <Icon className="h-3 w-3 text-revival-gold" />
                    {o.label}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Nutrient details grid */}
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {NUTRIENTS.map((n) => {
              const Icon = n.icon;
              return (
                <motion.li
                  key={n.tag}
                  variants={cardVariant}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-revival-gold/40"
                >
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-revival-gold/0 via-revival-gold/0 to-revival-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-revival-gold/15 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-revival-gold">
                          {n.tag}
                        </span>
                        <p className="font-heading text-sm font-medium text-white">
                          {n.title}
                        </p>
                      </div>
                      <p className="mt-1.5 text-xs font-light leading-relaxed text-revival-cream/70">
                        {n.text}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
