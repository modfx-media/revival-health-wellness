"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

type Testimonial = {
  name: string;
  quote: string;
  result?: string;
  location?: string;
};

const WEIGHT_LOSS_TESTIMONIALS: Testimonial[] = [
  {
    name: "Coltyn Simmons",
    result: "In the best shape of my life",
    location: "Las Vegas, NV",
    quote:
      "This was such an easy and powerful way for me to get my health and body on the right path! I started seeing results immediately. I was out of shape and unhealthy, and now I'm in the best shape of my life. I can honestly say they saved my life, thank you from the bottom of my heart!",
  },
  {
    name: "Jessica Dominguez",
    result: "Hit her goal in 3 months",
    location: "Henderson, NV",
    quote:
      "Wanting to lose weight, Revival Health and Wellness helped me achieve my goal in 3 months! The staff is super nice and friendly and they make you feel so comfortable. Ready for a change? You MUST contact them, they'll have the right plan for you.",
  },
  {
    name: "Nura Sadeghian",
    result: "Confidence back after baby",
    location: "Summerlin, NV",
    quote:
      "As a new mom I came in wanting guidance. The provider and staff are absolutely amazing, caring, kind, and genuinely want to help. I started a weight loss program and then got some Botox and filler and I LOVE it all! They're honest and don't sell something that won't benefit you.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function WeightLossTestimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-revival-cream via-revival-warm-white to-revival-cream py-16 lg:py-24">
      {/* Ambient gold aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.18), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-1/4 h-[24rem] w-[24rem] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.16), transparent 70%)",
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
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/70 px-4 py-1.5 text-tagline text-xs text-revival-gold shadow-sm backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-revival-gold" />
            Real Weight Loss Wins
          </span>
          <h2
            className="mt-5 text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
          >
            Patients who reached their goal{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              at Revival
            </span>
          </h2>
          <p className="mt-5 text-lg font-light text-revival-dark/65">
            Real stories from Las Vegas patients on our medically supervised
            weight-loss programs.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {WEIGHT_LOSS_TESTIMONIALS.map((t) => {
            const initials = t.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2);
            return (
              <motion.article
                key={t.name}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-revival-gold/40 hover:shadow-xl"
              >
                <Quote
                  className="absolute right-6 top-6 h-8 w-8 text-revival-gold/20 transition-colors duration-300 group-hover:text-revival-gold/40"
                  aria-hidden
                />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-revival-gold text-revival-gold"
                    />
                  ))}
                </div>
                {t.result && (
                  <p className="mt-3 font-heading text-lg font-medium text-revival-dark">
                    {t.result}
                  </p>
                )}
                <p className="mt-3 flex-1 font-light leading-relaxed text-revival-dark/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-revival-dark/5 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] font-heading text-base font-medium text-white shadow-md">
                    {initials}
                  </span>
                  <div>
                    <p className="font-medium text-revival-dark">{t.name}</p>
                    <p className="text-xs font-light text-revival-gold">
                      {t.location ? `${t.location} · ` : ""}Verified Google Review
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Google reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-revival-gold/25 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur">
            <span className="font-heading text-2xl font-medium text-revival-dark">
              {REVIEWS.rating.toFixed(1)}
            </span>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-revival-gold text-revival-gold"
                />
              ))}
            </span>
            <span className="text-sm font-light text-revival-dark/70">
              from {REVIEWS.count}+ reviews
            </span>
          </div>
          <a
            href={REVIEWS.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-6 py-3 text-sm font-medium text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Read all Google reviews
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
