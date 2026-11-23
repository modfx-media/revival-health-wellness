"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MARQUEE } from "@/lib/content/home";

/**
 * Elegant single-row marquee, large serif service names separated by gold
 * star accents, drifting infinitely across a refined dark band.
 */
export default function MarqueeStrip() {
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <section className="relative overflow-hidden border-y border-revival-gold/15 bg-revival-dark py-7">
      {/* soft animated gold glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.14), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-revival-dark to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-revival-dark to-transparent sm:w-40" />

      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={`${item.href}-${i}`}
            className="flex items-center whitespace-nowrap"
          >
            <Link
              href={item.href}
              className="font-heading text-xl font-normal tracking-wide text-revival-cream/85 transition-colors duration-300 hover:text-revival-gold md:text-2xl"
            >
              {item.label}
            </Link>
            <Star />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function Star() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mx-8 h-3.5 w-3.5 shrink-0 text-revival-gold/70 md:mx-10"
      fill="currentColor"
    >
      <path d="M12 0c.5 5.8 4.2 9.5 12 12-7.8 2.5-11.5 6.2-12 12-.5-5.8-4.2-9.5-12-12 7.8-2.5 11.5-6.2 12-12z" />
    </svg>
  );
}
