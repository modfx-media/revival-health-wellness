"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type StatsCounterProps = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

/** Animated number that counts up once it scrolls into view. */
export default function StatsCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block font-serif text-4xl font-semibold text-revival-gold md:text-5xl"
      >
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-2 block text-sm uppercase tracking-wider text-revival-charcoal/70">
        {label}
      </span>
    </div>
  );
}
