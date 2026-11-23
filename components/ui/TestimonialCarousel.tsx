"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  detail?: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Revival completely changed how I feel in my own body. The team is attentive, professional, and genuinely caring.",
    name: "Jordan M.",
    detail: "Weight Loss Program",
  },
  {
    quote:
      "Hormone therapy gave me my energy back. I finally feel like myself again after years of feeling off.",
    name: "Alexis R.",
    detail: "Hormone Therapy",
  },
  {
    quote:
      "Discreet, knowledgeable, and effective. I couldn't recommend their sexual wellness services more highly.",
    name: "Chris T.",
    detail: "Sexual Wellness",
  },
];

export default function TestimonialCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const go = (dir: number) => setIndex((prev) => (prev + dir + count) % count);
  const active = testimonials[index];

  return (
    <div className="relative mx-auto max-w-2xl text-center">
      <Quote className="mx-auto h-10 w-10 text-revival-gold" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <p className="text-xl leading-relaxed text-revival-dark md:text-2xl">
            “{active.quote}”
          </p>
          <footer className="mt-6">
            <span className="block font-medium text-revival-dark">
              {active.name}
            </span>
            {active.detail ? (
              <span className="text-sm text-revival-charcoal/70">
                {active.detail}
              </span>
            ) : null}
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-revival-gold/40 text-revival-gold transition-colors hover:bg-revival-gold/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "h-2 w-6 rounded-full bg-revival-gold transition-all"
                  : "h-2 w-2 rounded-full bg-revival-gold/30 transition-all"
              }
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-revival-gold/40 text-revival-gold transition-colors hover:bg-revival-gold/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
