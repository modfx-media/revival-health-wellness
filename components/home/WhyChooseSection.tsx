"use client";

import { motion } from "framer-motion";
import { Target, Stethoscope, HeartHandshake, Sparkles } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = [Target, Stethoscope, HeartHandshake];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 lg:py-32">
      {/* Animated gold ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-1/4 h-[26rem] w-[26rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.18), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/70 px-4 py-1.5 text-tagline text-xs text-revival-gold shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {WHY_CHOOSE.eyebrow}
          </span>
          <h2
            className="mt-5 text-revival-dark"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
          >
            Care built entirely{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              around you
            </span>
          </h2>
        </motion.div>

        {/* Reason cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {WHY_CHOOSE.reasons.map((reason, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={reason.title}
                variants={card}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative flex flex-col rounded-3xl border border-revival-dark/10 bg-white/70 p-8 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-revival-gold/40 hover:shadow-xl"
              >
                {/* number watermark */}
                <span className="pointer-events-none absolute right-6 top-4 font-heading text-6xl font-semibold text-revival-gold/10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="relative mt-6 font-heading text-xl font-medium text-revival-dark">
                  {reason.title}
                </h3>
                <p className="relative mt-3 font-light leading-relaxed text-revival-dark/65">
                  {reason.text}
                </p>

                {/* animated gold underline */}
                <div className="relative mt-6 h-px w-full overflow-hidden bg-revival-dark/5">
                  <span className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-revival-gold to-[#e8d5b0] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
