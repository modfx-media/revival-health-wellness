"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Short on-brand tagline per service. */
const TAGLINES: Record<string, string> = {
  "Medical Weight Loss": "Look & feel healthier",
  "Hormone Therapy": "Restore your balance",
  "Sexual Wellness": "Reignite confidence",
  Aesthetics: "Natural radiance",
  "IV Hydration": "Replenish & glow",
  "Body Contouring": "Sculpt & define",
};

/** Bento spans, first card is the tall feature. Row-span applies at every
 * breakpoint (not just lg) because the featured card's blurb + "Learn more"
 * are always visible and need more vertical room than a single 230px row. */
const SPANS = [
  "row-span-2 lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "sm:col-span-1 lg:col-span-2",
  "sm:col-span-1 lg:col-span-2",
  "sm:col-span-2 lg:col-span-2",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 lg:py-32">
      {/* Soft gold ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.28), transparent 70%)",
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[-10rem] bottom-0 h-[28rem] w-[28rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.22), transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/70 px-4 py-1.5 text-tagline text-xs text-revival-gold shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Our Services
          </motion.span>
          <h2
            className="mt-5 text-revival-dark"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
          >
            Comprehensive care,{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              tailored to you
            </span>
          </h2>
          <p className="mt-5 text-lg font-light text-revival-dark/65">
            From medical weight loss to aesthetics, every treatment is designed
            around your goals and delivered with luxury-level care.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid auto-rows-[230px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6"
        >
          {SERVICES.map((service, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={service.name}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`group relative ${SPANS[i] ?? "lg:col-span-2"}`}
              >
                {/* Gold gradient glow border on hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#e8d5b0] via-revival-gold to-[#8a5a2b] opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

                <Link
                  href={service.href}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-revival-dark ring-1 ring-black/5"
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />

                  {/* Warm gold wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-revival-gold/15 to-[#8a5a2b]/25 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95" />

                  {/* Tag pill */}
                  <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8a5a2b] to-revival-gold px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white shadow-lg backdrop-blur">
                      <span className="font-semibold tabular-nums text-revival-gold-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {TAGLINES[service.name] ?? "Discover more"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-auto p-6 lg:p-7">
                    <div className="flex items-end justify-between gap-4">
                      <h3
                        className={`font-heading font-medium leading-tight text-white ${
                          featured ? "text-3xl lg:text-[2rem]" : "text-2xl"
                        }`}
                      >
                        {service.name}
                      </h3>
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-lg transition-all duration-300 group-hover:scale-110"
                        style={{ boxShadow: "0 10px 30px rgba(201,169,110,0.5)" }}
                      >
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                      </span>
                    </div>

                    {/* Animated gold underline */}
                    <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
                      <span className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-revival-gold to-[#e8d5b0] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </div>

                    <p
                      className={`overflow-hidden text-sm font-light leading-relaxed text-revival-cream/90 transition-all duration-500 ${
                        featured
                          ? "mt-3 max-h-40 opacity-100"
                          : "mt-0 max-h-0 opacity-0 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100"
                      }`}
                    >
                      {service.blurb}
                    </p>

                    {/* Learn more affordance - reveals on hover */}
                    <span
                      className={`flex items-center gap-1.5 overflow-hidden text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-revival-gold opacity-0 transition-all duration-500 ${
                        featured
                          ? "mt-3 max-h-6 opacity-100"
                          : "mt-0 max-h-0 group-hover:mt-4 group-hover:max-h-6 group-hover:opacity-100"
                      }`}
                    >
                      Learn more
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
