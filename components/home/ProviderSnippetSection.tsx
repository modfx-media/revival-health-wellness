"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Dumbbell,
  HeartPulse,
  Quote,
} from "lucide-react";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const CREDENTIALS = [
  { icon: Award, label: "Certified Personal Trainer" },
  { icon: HeartPulse, label: "20+ Years Luxury Care" },
  { icon: Dumbbell, label: "Pro Natural Bodybuilder" },
];

export default function ProviderSnippetSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-28">
      {/* soft cream-to-gold ambiance to contrast the dark sections above/below */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-revival-dark/25 via-revival-dark/5 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-revival-dark/25 via-revival-dark/5 to-transparent"
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 top-10 h-[32rem] w-[32rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.30), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.18), transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          {/* rotating dashed ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-[2.5rem] border border-dashed border-revival-gold/35"
          />
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-revival-gold via-revival-gold/40 to-transparent p-[1.5px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.9rem] bg-revival-dark">
              <Image
                src="/images/about/team/sanaz-homepage.png"
                alt="Sanaz Salmani, Clinic Director at Revival Health & Wellness"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-full border border-white/15 bg-revival-dark/70 px-4 py-2 backdrop-blur-md">
                <span className="text-tagline text-[0.6rem] text-revival-gold">
                  Clinic Director
                </span>
                <span className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.15em] text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-revival-gold" />
                  </span>
                  Now Consulting
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          <h2
            className="mt-6 font-heading font-medium leading-[1.08] text-revival-dark"
            style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)" }}
          >
            Sanaz{" "}
            <span className="italic bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#c9a96e] bg-clip-text text-transparent">
              Salmani
            </span>
          </h2>
          <p className="mt-2 text-tagline text-xs text-revival-gold">
            Clinic Director · Certified Personal Trainer · Pro Natural Bodybuilder
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-revival-gold/20 bg-white/70 p-5 shadow-sm backdrop-blur">
            <Quote className="mt-1 h-5 w-5 shrink-0 text-revival-gold" />
            <p className="text-base font-light italic leading-relaxed text-revival-charcoal/85">
              &ldquo;Every patient here is treated like family. My job is to
              make sure you feel supported, seen, and set up to actually reach
              your goals-not just start.&rdquo;
            </p>
          </div>

          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-revival-charcoal/80">
            Sanaz brings over two decades of luxury customer service experience
            to Revival Health &amp; Wellness. A certified personal trainer and
            pro-card natural bodybuilder, she pairs deep fitness expertise with
            a genuine, family-first approach to concierge medical care.
          </p>

          <ul className="mt-7 flex flex-wrap gap-3">
            {CREDENTIALS.map((c) => (
              <li
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/80 px-3.5 py-1.5 text-xs font-light text-revival-charcoal/85 shadow-sm backdrop-blur"
              >
                <c.icon className="h-3.5 w-3.5 text-revival-gold" />
                {c.label}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold text-revival-dark shadow-[0_10px_30px_-8px_rgba(201,169,110,0.7)] transition-transform hover:scale-[1.03]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Book with Sanaz</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/about-us/#team"
              className="inline-flex items-center gap-2 rounded-full border border-revival-dark/15 bg-white/60 px-7 py-3.5 text-sm font-light text-revival-dark backdrop-blur transition-colors hover:border-revival-gold hover:text-revival-gold"
            >
              Meet the full team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
