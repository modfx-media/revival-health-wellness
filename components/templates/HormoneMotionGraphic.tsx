"use client";

import { motion } from "framer-motion";
import { Activity, Heart, Zap, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Molecule chips positioned around the hub. Each floats and pulses in place. */
const ORBITS = [
  { label: "HGH", top: "6%", left: "50%", tx: "-50%", ty: "0%", delay: 0 },
  { label: "IGF-1", top: "50%", left: "94%", tx: "-100%", ty: "-50%", delay: 0.15 },
  { label: "Cortisol", top: "94%", left: "50%", tx: "-50%", ty: "-100%", delay: 0.3 },
  { label: "Insulin", top: "50%", left: "6%", tx: "0%", ty: "-50%", delay: 0.45 },
];

const WAVES = [0, 1, 2];

/**
 * Decorative motion graphic used on hormone service pages. Renders a central
 * "hormone hub" with molecule chips at each compass point, rotating dashed
 * rings, concentric pulse waves, and floating gold sparks.
 */
export default function HormoneMotionGraphic() {
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center"
      aria-hidden
    >
      {/* Soft radial ambiance behind the graphic */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(201,169,110,0.22), transparent 65%)",
        }}
      />

      {/* Outer counter-rotating dashed ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-dashed border-revival-gold/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-revival-gold/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* Concentric pulse waves radiating outward */}
      {WAVES.map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-revival-gold/40"
          style={{ width: "48%", height: "48%" }}
          animate={{
            scale: [1, 1.9],
            opacity: [0.55, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Molecule chips (compass points around the hub) */}
      {ORBITS.map((o, i) => (
        <motion.div
          key={o.label}
          className="absolute"
          style={{
            top: o.top,
            left: o.left,
            transform: `translate(${o.tx}, ${o.ty})`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + o.delay, ease: EASE }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-revival-gold" />
            {o.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Small floating gold sparks */}
      {[
        { top: "18%", left: "22%", delay: 0 },
        { top: "28%", left: "78%", delay: 0.8 },
        { top: "72%", left: "18%", delay: 1.6 },
        { top: "76%", left: "80%", delay: 2.4 },
      ].map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-revival-gold"
          style={{
            top: s.top,
            left: s.left,
            boxShadow: "0 0 12px 3px rgba(201,169,110,0.55)",
          }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central hub */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 flex h-[38%] w-[38%] items-center justify-center rounded-full bg-gradient-to-br from-revival-dark to-revival-charcoal shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
      >
        <span className="absolute inset-2 rounded-full ring-1 ring-revival-gold/30" />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,169,110,0.35), transparent 65%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-col items-center gap-1 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark shadow-[0_10px_24px_-8px_rgba(201,169,110,0.75)]">
            <Activity className="h-6 w-6" />
          </div>
          <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-revival-gold">
            Hormone Balance
          </span>
        </div>
      </motion.div>

      {/* Corner mini badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-revival-dark shadow-sm backdrop-blur"
      >
        <Heart className="h-3.5 w-3.5 text-revival-gold" />
        Vitality
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-revival-dark shadow-sm backdrop-blur"
      >
        <Zap className="h-3.5 w-3.5 text-revival-gold" />
        Energy
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
        className="absolute bottom-8 right-6 flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-revival-dark shadow-sm backdrop-blur"
      >
        <Sparkles className="h-3.5 w-3.5 text-revival-gold" />
        Recovery
      </motion.div>
    </div>
  );
}
