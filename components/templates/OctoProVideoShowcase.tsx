"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIDEOS = [
  {
    src: "/videos/octopro-onda-1.mp4",
    poster: "/videos/octopro-onda-1-poster.jpg",
    label: "A session in progress",
  },
  {
    src: "/videos/octopro-onda-2.mp4",
    poster: "/videos/octopro-onda-2-poster.jpg",
    label: "The ONDA Pro device",
  },
];

function PortraitVideo({ src, poster, label }: (typeof VIDEOS)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div
        onClick={toggle}
        className="group relative aspect-[9/16] max-h-[560px] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_120px_-32px_rgba(0,0,0,0.6)]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {!playing && (
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 transition-opacity duration-300 group-hover:from-black/45"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-[0_20px_60px_-12px_rgba(201,169,110,0.6)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-revival-gold/40"
                />
                <Play
                  className="relative ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8"
                  strokeWidth={0}
                />
              </span>
            </span>
          </>
        )}

        {playing && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            aria-label="Pause video"
            className="absolute bottom-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-revival-gold hover:bg-black/70 group-hover:opacity-100"
          >
            <Pause className="h-5 w-5" />
          </button>
        )}
      </div>
      <p className="mt-4 text-center text-sm font-light text-revival-cream/70">
        {label}
      </p>
    </div>
  );
}

export function OctoProVideoShowcase() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-14 sm:py-20 lg:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
              See it in action
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60" />
          </div>
          <h2 className="font-heading text-3xl leading-[1.1] tracking-[-0.015em] text-white sm:text-4xl lg:text-[2.75rem]">
            Watch ONDA Pro in action
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-cream/75 sm:text-lg">
            A closer look at the ONDA Pro device and what a real
            treatment session looks like at Revival.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2"
        >
          {VIDEOS.map((v) => (
            <PortraitVideo key={v.src} {...v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
