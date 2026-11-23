"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Percent,
  Wallet,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const CHERRY_PAGE = "/cherry/";
const CHERRY_APPLY = "https://pay.withcherry.com/revivalhw";

const PERKS = [
  {
    icon: ShieldCheck,
    title: "No hard credit check",
    text: "Checking your eligibility won't impact your credit score.",
  },
  {
    icon: Zap,
    title: "60-second approvals",
    text: "Get a decision in about a minute — apply from your phone.",
  },
  {
    icon: Percent,
    title: "0% APR options",
    text: "Qualified plans with no interest, so more of every dollar goes to your care.",
  },
  {
    icon: Wallet,
    title: "Up to $50,000",
    text: "Cover everything from injectables to full transformation plans.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function FinancingSection() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-16 lg:py-24">
      {/* Animated gold aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-0 h-96 w-96 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.3), transparent 70%)",
          }}
          animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.3), transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-center lg:gap-16">
          {/* Left: intro + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/[0.04] px-4 py-1.5 text-tagline text-xs text-revival-gold backdrop-blur">
              <Wallet className="h-3.5 w-3.5" />
              Patient Financing Offered
            </span>
            <h2
              className="mt-5 text-white"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              Care today,{" "}
              <span className="bg-gradient-to-r from-[#e8d5b0] via-revival-gold to-[#8a5a2b] bg-clip-text text-transparent">
                pay over time
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-revival-cream/70 lg:mx-0">
              Your goals shouldn&apos;t wait. Through our financing partner{" "}
              <span className="text-revival-gold">Cherry</span>, you can split
              treatments into simple monthly payments — with fast approvals and
              flexible plans built around your budget.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={CHERRY_PAGE}
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-7 py-3.5 text-sm font-medium text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover/btn:translate-x-full" />
                <span className="relative">Explore Financing Options</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <a
                href={CHERRY_APPLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group/apply inline-flex items-center gap-2 rounded-full border border-revival-gold/40 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-revival-gold hover:bg-white/[0.08] hover:scale-105"
              >
                Apply with Cherry
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/apply:translate-x-1" />
              </a>
            </div>
            <p className="mt-4 text-xs font-light text-revival-cream/45 lg:text-left">
              Subject to approval. Financing terms provided by Cherry.
            </p>
          </motion.div>

          {/* Right: perks grid */}
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <motion.li
                  key={perk.title}
                  variants={item}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-revival-gold/40"
                >
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-revival-gold/0 via-revival-gold/0 to-revival-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 font-heading text-lg font-medium text-white">
                    {perk.title}
                  </h3>
                  <p className="relative mt-2 text-sm font-light leading-relaxed text-revival-cream/70">
                    {perk.text}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
