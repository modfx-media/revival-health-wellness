"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SIGNATURE } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SignatureSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-revival-dark py-14 lg:py-32">
      {/* Ambiance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.16), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Interactive image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <Image
                src={SIGNATURE.image}
                alt={`${SIGNATURE.title} ${SIGNATURE.titleAccent}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-revival-dark/40 via-transparent to-transparent" />

              {/* Hotspots */}
              {SIGNATURE.hotspots.map((spot, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={spot.label}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    style={{ top: spot.top, left: spot.left }}
                    className="group/spot absolute -translate-x-1/2 -translate-y-1/2"
                    aria-label={spot.label}
                  >
                    {/* Always-visible label pill */}
                    <motion.span
                      initial={false}
                      animate={{
                        scale: isActive ? 1.06 : 1,
                        y: isActive ? -2 : 0,
                      }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={`absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-lg backdrop-blur transition-colors ${
                        isActive
                          ? "bg-revival-gold text-revival-dark"
                          : "bg-white/95 text-revival-dark"
                      }`}
                    >
                      {spot.label}
                      <span
                        className={`absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 ${
                          isActive ? "bg-revival-gold" : "bg-white/95"
                        }`}
                      />
                    </motion.span>

                    {/* Connector line */}
                    <span className="absolute bottom-full left-1/2 h-2.5 w-px -translate-x-1/2 bg-white/70" />

                    {/* Pulsing dot */}
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-revival-gold/60"
                        animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: i * 0.3,
                        }}
                      />
                      <span
                        className={`relative rounded-full border-2 border-white shadow-[0_0_14px_3px_rgba(201,169,110,0.8)] transition-all duration-300 ${
                          isActive
                            ? "h-5 w-5 bg-revival-gold"
                            : "h-4 w-4 bg-revival-gold"
                        }`}
                      >
                        <span className="absolute inset-[3px] rounded-full bg-white/90" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 text-tagline text-xs text-revival-gold">
              <Sparkles className="h-3.5 w-3.5" />
              {SIGNATURE.eyebrow}
            </span>
            <h2
              className="mt-5 font-heading font-medium uppercase leading-[1.08] tracking-wide text-white"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
            >
              {SIGNATURE.title}{" "}
              <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
                {SIGNATURE.titleAccent}
              </span>
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-revival-cream/75">
              {SIGNATURE.body}
            </p>
            <a
              href={SIGNATURE.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-8 py-3.5 text-tagline text-xs text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {SIGNATURE.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-12"
        >
          {SIGNATURE.features.map((feature, i) => (
            <div key={feature} className="flex items-center gap-3">
              {i > 0 && (
                <span className="hidden text-revival-gold/40 sm:inline">✦</span>
              )}
              <span className="text-tagline text-xs text-revival-cream/70">
                {feature}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
