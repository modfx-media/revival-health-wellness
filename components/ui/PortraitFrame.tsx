"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export type PortraitFrameProps = {
  /** When provided, renders an <Image> that fills the frame. */
  src?: string;
  alt?: string;
  /**
   * When true, the image uses object-cover (fills the frame, may crop). Default
   * is object-contain so the full image is visible with letterbox space.
   */
  cover?: boolean;
  /**
   * Optional right offset to shift the image inside the frame - matches the
   * provider portrait treatment (subject weighted to the left).
   */
  objectPosition?: string;
  /** Aspect ratio class applied to the inner card. Defaults to 4/5. */
  aspect?: string;
  /** Two-item bottom badge row (e.g. category + status). */
  badges?: [{ label: string }, { label: string; pulse?: boolean }];
  /** Show the rotating dashed ring around the frame. */
  ring?: boolean;
  /** Additional className for the outer wrapper. */
  className?: string;
  /**
   * Render arbitrary content inside the frame instead of an image (used for
   * the motion graphic on service pages).
   */
  children?: React.ReactNode;
  /**
   * Padding around the child/image inside the dark card. Defaults to a small
   * amount so images (with object-contain) have breathing room.
   */
  innerPadding?: string;
  /** Image sizing hint for next/image. */
  sizes?: string;
};

/**
 * Shared "provider portrait" style frame - dark card with a gold gradient
 * border wrapper, optional rotating dashed ring, subtle top-fade overlay,
 * and optional two-badge row along the bottom. Used for both photography and
 * motion graphics so the visual treatment stays consistent across the site.
 */
export default function PortraitFrame({
  src,
  alt = "",
  cover = false,
  objectPosition,
  aspect = "aspect-[4/5]",
  badges,
  ring = true,
  className = "",
  children,
  innerPadding = "p-4 sm:p-6",
  sizes = "(max-width: 1024px) 100vw, 45vw",
}: PortraitFrameProps) {
  return (
    <div className={`relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none ${className}`}>
      {ring && (
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -inset-6 rounded-[2.5rem] border border-dashed border-revival-gold/30"
        />
      )}

      {/* Gold gradient border wrapper */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-revival-gold via-revival-gold/40 to-transparent p-[1.5px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)]">
        <div
          className={`relative ${aspect} overflow-hidden rounded-[1.9rem] bg-revival-dark`}
        >
          {src ? (
            <>
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className={cover ? "object-cover" : "object-contain"}
                style={{
                  objectPosition: objectPosition || undefined,
                  padding: cover ? undefined : "1rem",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-transparent to-transparent" />

              {/* Ambient motion graph: rotating gold sparkle top-right + pulse bottom-left */}
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute right-4 top-4 z-10 h-8 w-8 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
              >
                <svg viewBox="0 0 40 40" className="h-full w-full text-revival-gold/80" fill="currentColor">
                  <path d="M20 3 L22.3 17.7 L37 20 L22.3 22.3 L20 37 L17.7 22.3 L3 20 L17.7 17.7 Z" />
                </svg>
              </motion.span>

              <span
                aria-hidden
                className="pointer-events-none absolute bottom-5 left-5 z-10 flex h-3 w-3 sm:h-3.5 sm:w-3.5"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold/70" />
                <span className="relative inline-flex h-full w-full rounded-full bg-revival-gold" />
              </span>
            </>
          ) : (
            <div className={`relative flex h-full w-full items-center justify-center ${innerPadding}`}>
              {children}
            </div>
          )}

          {badges ? (
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-center justify-between rounded-full border border-white/15 bg-revival-dark/70 px-4 py-2 backdrop-blur-md">
              <span className="text-tagline text-[0.6rem] text-revival-gold">
                {badges[0].label}
              </span>
              <span className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.15em] text-white">
                {badges[1].pulse !== false && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-revival-gold" />
                  </span>
                )}
                {badges[1].label}
              </span>
            </div>
          ) : null}

          {/* Inset ring for extra polish */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}

/** Convenience wrapper: animated entry on scroll. */
export function AnimatedPortraitFrame(props: PortraitFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <PortraitFrame {...props} />
    </motion.div>
  );
}
