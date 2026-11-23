"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeartPulse, Zap, Scale, type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type IconKey = "heartPulse" | "zap" | "scale";

const ICONS: Record<IconKey, LucideIcon> = {
  heartPulse: HeartPulse,
  zap: Zap,
  scale: Scale,
};

type Pillar = {
  title: string;
  text: string;
  icon: IconKey;
};

const PILLARS: Pillar[] = [
  {
    title: "Women's Hormone Therapy",
    text: "Personalized care that eases menopause symptoms, stabilizes mood, and restores energy, sleep, and libido.",
    icon: "heartPulse",
  },
  {
    title: "Men's Hormone Therapy",
    text: "Bio-identical testosterone therapy to rebuild strength, focus, drive, and confidence at any age.",
    icon: "zap",
  },
  {
    title: "Growth Hormone Optimization",
    text: "Restore lean muscle, recovery, and metabolism by correcting adult growth hormone deficiency.",
    icon: "scale",
  },
];

export default function HormoneStagesShowcase() {
  return (
    <section className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-28">
      {/* Ambient gold aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.16), transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.14), transparent 70%)",
          }}
          animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          {/* Left: header + pillar cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center lg:text-left"
            >
              <div className="mb-5 inline-flex items-center gap-3 text-tagline text-xs text-revival-gold">
                <span className="h-px w-8 bg-revival-gold/50" />
                Three Focused Programs
                <span className="h-px w-8 bg-revival-gold/50" />
              </div>
              <h2
                className="font-heading font-medium leading-tight text-revival-dark"
                style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
              >
                A hormone plan for{" "}
                <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
                  every stage
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-revival-charcoal/75 sm:text-lg lg:mx-0">
                Whether you&apos;re navigating perimenopause, feeling the
                effects of low testosterone, or looking to reclaim recovery and
                vitality, we have a dedicated program.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4">
              {PILLARS.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                    whileHover={{ y: -3 }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-revival-gold/15 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/40 hover:shadow-[0_25px_60px_-25px_rgba(15,15,15,0.35)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-revival-gold via-revival-gold/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-revival-dark text-revival-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-heading text-lg font-medium leading-tight text-revival-dark sm:text-xl">
                            {p.title}
                          </h3>
                          <span
                            aria-hidden
                            className="font-heading text-2xl italic leading-none text-revival-gold/50 sm:text-3xl"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/75">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto"
          >
            {/* Rotating dashed ring */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] border border-dashed border-revival-gold/30"
            />

            {/* Gold gradient frame */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-revival-gold via-revival-gold/40 to-transparent p-[1.5px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.9rem] bg-revival-dark">
                <Image
                  src="/images/hormone/hormone-stages.jpeg"
                  alt="Women of every stage of life, thriving with personalized hormone therapy"
                  fill
                  sizes="(max-width: 1024px) 85vw, 460px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-revival-dark/45 via-transparent to-transparent" />

                {/* Floating stage badge */}
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-full border border-white/15 bg-revival-dark/70 px-4 py-2 backdrop-blur-md">
                  <span className="text-tagline text-[0.6rem] text-revival-gold">
                    Every Stage
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white">
                    Balanced &amp; Thriving
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
