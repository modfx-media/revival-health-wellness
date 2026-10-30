"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setDone(true);
  }

  return (
    <section className="relative overflow-hidden bg-revival-dark py-14 lg:py-32">
      {/* Background image */}
      <Image
        src="/images/hero/hero-2.png"
        alt="Portrait with gold body paint behind the homepage consultation form"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-revival-dark/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark via-revival-dark/70 to-revival-dark/85" />

      {/* Animated gold mesh */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-revival-gold/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-revival-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="text-tagline text-sm text-revival-gold">
            Subscribe to our email list
          </span>
          <h2 className="mt-5 text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            Begin your revival today
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-revival-cream/80">
            Join our community for wellness insights and exclusive offers, or
            book your free consultation and take the first step toward a more
            vibrant you.
          </p>

          {/* Newsletter */}
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-full border border-revival-gold/40 bg-revival-gold/10 px-6 py-4 text-revival-cream"
            >
              <Check className="h-5 w-5 text-revival-gold" />
              Thank you, you&rsquo;re on the list.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-revival-cream/30 pb-2 focus-within:border-revival-gold"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent py-2 text-revival-cream placeholder:text-revival-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revival-gold text-revival-dark transition-colors hover:bg-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          )}

          <div className="mt-10">
            <a
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-revival-gold px-9 py-4 text-base font-medium text-revival-dark transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_-8px_rgba(201,169,110,0.7)]"
            >
              Book Your Free Consultation
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
