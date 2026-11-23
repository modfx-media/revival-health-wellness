"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselImage = {
  src: string;
  alt: string;
};

export default function ImageCarousel({
  images,
}: {
  images: CarouselImage[];
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  if (count === 0) return null;

  const go = (dir: number) => setIndex((prev) => (prev + dir + count) % count);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-revival-gold/10">
      <div className="relative aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Previous image"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-revival-cream/90 text-revival-dark shadow transition hover:bg-revival-cream"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-revival-cream/90 text-revival-dark shadow transition hover:bg-revival-cream"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
