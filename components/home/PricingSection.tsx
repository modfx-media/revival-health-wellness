"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PRICING, ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-revival-charcoal py-14 lg:py-32">
      {/* Ambiance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-0 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.14), transparent 70%)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-tagline text-xs text-revival-gold">
            {PRICING.eyebrow}
          </span>
          <h2
            className="mt-4 font-heading font-medium uppercase tracking-wide text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {PRICING.title}{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              {PRICING.titleAccent}
            </span>
          </h2>
          <p className="mt-4 font-heading text-base italic text-revival-cream/70">
            {PRICING.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {PRICING.cards.map((c) => (
            <motion.div
              key={c.title}
              variants={card}
              className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-revival-dark sm:grid-cols-[0.8fr_1.2fr]"
            >
              {/* Image */}
              <div className="relative hidden min-h-[300px] sm:block">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 1024px) 40vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-revival-dark/60" />
              </div>

              {/* List */}
              <div className="flex flex-col p-7 lg:p-9">
                <h3 className="font-heading text-2xl font-medium uppercase tracking-wide text-white">
                  {c.title}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {c.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-4 border-b border-white/5 pb-3.5 last:border-0"
                    >
                      <span className="flex items-center gap-2.5 text-sm font-light text-revival-cream/85">
                        <Check className="h-4 w-4 shrink-0 text-revival-gold" />
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={c.href}
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-tagline text-xs text-revival-cream transition-colors hover:text-revival-gold"
                >
                  View More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 text-center"
        >
          <a
            href={ZENOTI}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-9 py-4 text-tagline text-xs text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Book Your Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
