"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Gift, BadgePercent } from "lucide-react";
import { PLAN_OFFER, ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function PlanOfferSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#15100a] via-[#0f0f0f] to-[#15100a] py-14 lg:py-32">
      {/* Animated gold mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-0 h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.30), transparent 70%)",
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.30), transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* faint grid */}
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy + perks */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-revival-gold/40 bg-revival-gold/10 px-4 py-1.5 text-tagline text-xs text-revival-gold backdrop-blur"
            >
              <Gift className="h-3.5 w-3.5" />
              {PLAN_OFFER.eyebrow}
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-5 text-white"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.08 }}
            >
              Not sure which treatment is{" "}
              <span className="bg-gradient-to-r from-[#e8d5b0] via-revival-gold to-[#8a5a2b] bg-clip-text text-transparent">
                right for you?
              </span>
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-md font-light leading-relaxed text-revival-cream/75"
            >
              {PLAN_OFFER.body}
            </motion.p>

            <motion.ul variants={container} className="mt-8 space-y-4">
              {PLAN_OFFER.perks.map((perk) => (
                <motion.li
                  key={perk}
                  variants={item}
                  className="flex items-center gap-3 text-revival-cream"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-md">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="font-light">{perk}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-10">
              <a
                href={ZENOTI}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-revival-gold px-9 py-4 text-base font-medium text-revival-dark transition-all duration-300 hover:bg-white hover:shadow-[0_0_45px_-8px_rgba(201,169,110,0.8)]"
              >
                {PLAN_OFFER.cta}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* Offer card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/30 bg-gradient-to-br from-white/10 to-white/[0.03] p-8 text-center shadow-2xl backdrop-blur-md">
              {/* shimmering top mesh */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-revival-gold/30 blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-white shadow-xl">
                <BadgePercent className="h-8 w-8" />
              </span>
              <p className="relative mt-6 font-heading text-7xl font-semibold leading-none text-white">
                20%
              </p>
              <p className="relative mt-2 text-tagline text-sm text-revival-gold">
                Off Certificate
              </p>
              <p className="relative mt-4 text-sm font-light leading-relaxed text-revival-cream/70">
                Applied toward your first treatment when you book a complimentary
                consultation.
              </p>
              <div className="relative mt-6 border-t border-dashed border-revival-gold/30 pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-revival-cream/50">
                  Revival Health &amp; Wellness · Las Vegas
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
