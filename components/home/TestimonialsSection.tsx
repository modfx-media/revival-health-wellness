"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { TESTIMONIALS, REVIEWS, ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function TestimonialsSection({
  rating = REVIEWS.rating,
  reviewCount = REVIEWS.count,
  reviewsUrl = REVIEWS.url,
}: {
  rating?: number;
  reviewCount?: number;
  reviewsUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-revival-cream via-revival-warm-white to-revival-cream py-14 lg:py-32">
      {/* Animated gold ambiance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.2), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-1/4 h-[26rem] w-[26rem] rounded-full blur-[140px]"
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
            What Our Patients Say
          </span>
          <h2
            className="mt-5 text-revival-dark"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
          >
            Loved by{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
              hundreds of patients
            </span>
          </h2>
          <p className="mt-5 text-lg font-light text-revival-dark/65">
            Real stories from real people across our two Las Vegas locations.
          </p>
        </motion.div>

        {/* Testimonial card grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => {
            const initials = t.name
              .split(" ")
              .map((p) => p[0])
              .join("");
            return (
              <motion.article
                key={t.name}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative flex h-full flex-col rounded-3xl border border-white/60 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-revival-gold/40 hover:shadow-xl"
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
                <p className="mt-4 flex-1 font-light leading-relaxed text-revival-dark/75">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-revival-dark/5 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] font-heading text-base font-medium text-white shadow-md">
                    {initials}
                  </span>
                  <div>
                    <p className="font-medium text-revival-dark">{t.name}</p>
                    {t.treatment && (
                      <p className="text-xs font-light text-revival-gold">
                        {t.treatment}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Integrated Google reviews bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-revival-gold/20 bg-revival-dark px-8 py-10 shadow-2xl"
        >
          {/* Animated gold mesh */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute -left-16 top-0 h-72 w-72 rounded-full blur-[110px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.35), transparent 70%)",
              }}
              animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -right-16 bottom-0 h-72 w-72 rounded-full blur-[110px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(138,90,43,0.4), transparent 70%)",
              }}
              animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read our ${reviewCount}+ Google reviews (rated ${rating.toFixed(1)} out of 5)`}
              className="group/reviews flex items-center gap-5 rounded-2xl outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-revival-gold focus-visible:ring-offset-2 focus-visible:ring-offset-revival-dark"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg"
              >
                <GoogleLogo />
              </motion.div>
              <div>
                <p className="text-tagline text-xs text-revival-gold">
                  {REVIEWS.badge}
                </p>
                <div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
                  <span className="font-heading text-4xl font-medium text-white">
                    {rating.toFixed(1)}
                  </span>
                  <span className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, ease: EASE }}
                      >
                        <Star className="h-5 w-5 fill-revival-gold text-revival-gold" />
                      </motion.span>
                    ))}
                  </span>
                </div>
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-light text-revival-cream/60 transition-colors duration-300 group-hover/reviews:text-revival-gold">
                  Read our {reviewCount}+ Google reviews
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/reviews:translate-x-1" />
                </p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`See all ${reviewCount}+ Google reviews for Revival Health & Wellness`}
                className="group/gbtn relative inline-flex items-center gap-2 rounded-full border border-revival-gold/40 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-revival-gold hover:bg-white/10 hover:scale-105"
              >
                <GoogleLogo className="h-4 w-4" />
                <span>See Google Reviews</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/gbtn:translate-x-1" />
              </a>

              <a
                href={ZENOTI}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-7 py-3.5 text-sm font-medium text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover/btn:translate-x-full" />
                <span className="relative">Book Your Free Consultation</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GoogleLogo({ className = "h-9 w-9 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
