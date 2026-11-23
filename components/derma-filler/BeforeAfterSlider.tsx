"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GripVertical } from "lucide-react";

const BEFORE = "/images/derma-filler/before-after/after-hd.png";
const AFTER = "/images/derma-filler/before-after/before-hd.png";

/**
 * Clean before/after comparison slider.
 * - Auto-plays a one-time sweep on first view.
 * - Drag the gold handle (or use arrow keys) to reveal the after image.
 * - Images render at their natural aspect ratio with no cropping.
 */
export default function BeforeAfterSlider() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });

  // 100 = fully showing before; 0 = fully showing after.
  const [pos, setPos] = useState(100);
  const [autoDone, setAutoDone] = useState(false);
  const dragging = useRef(false);

  // Autoplay a sweep on first view that finishes on the fully-after state
  // so visitors clearly see the "after" once the animation settles.
  useEffect(() => {
    if (!inView || autoDone) return;
    const seq: Array<[number, number]> = [
      [100, 800], // hold on before
      [0, 1600], // sweep to fully after
      [50, 900], // settle back to the middle
    ];
    let cancelled = false;
    let idx = 0;
    let start = performance.now();
    let from = pos;
    const tick = (now: number) => {
      if (cancelled) return;
      const [to, dur] = seq[idx];
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setPos(from + (to - from) * eased);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        idx += 1;
        if (idx < seq.length) {
          from = to;
          start = now;
          requestAnimationFrame(tick);
        } else {
          setAutoDone(true);
        }
      }
    };
    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const updateFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, raw)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setAutoDone(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setAutoDone(true);
      setPos((p) => Math.max(0, p - 3));
    }
    if (e.key === "ArrowRight") {
      setAutoDone(true);
      setPos((p) => Math.min(100, p + 3));
    }
  };

  return (
    <div
      ref={wrapRef}
      className="group relative mx-auto w-full max-w-[520px] select-none overflow-hidden rounded-[1.5rem] bg-revival-warm-white shadow-[0_30px_70px_-25px_rgba(0,0,0,0.25)] ring-1 ring-revival-gold/20 touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label="Before and after dermal filler comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(100 - pos)}
      aria-valuetext={`${Math.round(100 - pos)}% after`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* AFTER (base layer) */}
      <Image
        src={AFTER}
        alt="After dermal filler treatment"
        width={1040}
        height={1512}
        priority
        sizes="(min-width: 1024px) 520px, 100vw"
        className="pointer-events-none block h-auto w-full"
      />

      {/* BEFORE (masked layer on top; reveals as pos decreases) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={BEFORE}
          alt="Before dermal filler treatment"
          width={1037}
          height={1516}
          priority
          sizes="(min-width: 1024px) 520px, 100vw"
          className="block h-auto w-full"
        />
      </div>

      {/* Corner labels — fade at extremes so the visible image reads as a single, uncluttered photo. */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-tagline text-[0.6rem] text-white backdrop-blur-md transition-opacity duration-200"
        style={{ opacity: pos <= 2 ? 0 : 1 }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full border border-revival-gold/40 bg-revival-gold/90 px-3 py-1.5 text-tagline text-[0.6rem] text-revival-dark backdrop-blur-md transition-opacity duration-200"
        style={{ opacity: pos >= 98 ? 0 : 1 }}
      >
        After
      </span>

      {/* Vertical divider — hidden at extremes so only one image shows. */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/85 shadow-[0_0_20px_rgba(0,0,0,0.35)] transition-opacity duration-200"
        style={{
          left: `calc(${pos}% - 1px)`,
          opacity: pos <= 2 || pos >= 98 ? 0 : 1,
        }}
      />

      {/* Drag handle — same fade at extremes. */}
      <motion.span
        aria-hidden
        animate={{ scale: dragging.current ? 0.95 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-revival-dark shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-4 ring-revival-gold/40 transition-opacity duration-200"
        style={{
          left: `${pos}%`,
          opacity: pos <= 2 || pos >= 98 ? 0 : 1,
        }}
      >
        <GripVertical className="h-5 w-5" />
      </motion.span>
    </div>
  );
}
