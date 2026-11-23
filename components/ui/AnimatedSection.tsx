"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Motion variant to animate with. Defaults to `fadeInUp`. */
  variants?: Variants;
  /** Extra delay (seconds) before the reveal begins. */
  delay?: number;
  /** Fraction of the element that must be visible to trigger (0–1). */
  amount?: number;
  /** Only animate the first time it enters the viewport. */
  once?: boolean;
  as?: "section" | "div" | "article" | "header" | "footer" | "ul";
};

/**
 * Reusable scroll-triggered wrapper. Uses Framer Motion's `useInView` to play
 * the chosen variant once the element crosses a 0.15 visibility threshold.
 */
export default function AnimatedSection({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  amount = 0.15,
  once = true,
  as = "section",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount });
  const MotionTag = motion[as] as typeof motion.section;

  // Apply an optional delay without discarding the variant's own easing/duration.
  const resolved: Variants = delay
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...(typeof variants.visible === "object" &&
            "transition" in variants.visible
              ? variants.visible.transition
              : {}),
            delay,
          },
        },
      }
    : variants;

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={resolved}
    >
      {children}
    </MotionTag>
  );
}
