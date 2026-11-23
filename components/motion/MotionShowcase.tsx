"use client";

import { motion } from "framer-motion";
import OrbitMotionGraphic, {
  type OrbitMotionGraphicProps,
} from "./OrbitMotionGraphic";
import PortraitFrame from "@/components/ui/PortraitFrame";

const EASE = [0.22, 1, 0.36, 1] as const;

export type MotionShowcaseProps = OrbitMotionGraphicProps & {
  eyebrow?: string;
  heading: string;
  body?: string;
  /** Swap between light / dark / cream sections to fit the surrounding page. */
  tone?: "light" | "dark" | "cream";
  /** Put the graphic on the left instead of the right. */
  reverse?: boolean;
};

/**
 * Section wrapper that pairs a copy column with the reusable
 * OrbitMotionGraphic, wrapped in the shared PortraitFrame so the graphic
 * matches the site's dark-card + gold-border image treatment.
 */
export default function MotionShowcase({
  eyebrow,
  heading,
  body,
  tone = "dark",
  reverse = false,
  ...graphicProps
}: MotionShowcaseProps) {
  const bg =
    tone === "dark"
      ? "bg-revival-dark text-white"
      : tone === "cream"
        ? "bg-revival-cream"
        : "bg-revival-warm-white";
  const textColor =
    tone === "dark" ? "text-revival-cream/80" : "text-revival-charcoal/80";
  const headingColor = tone === "dark" ? "text-white" : "text-revival-dark";

  return (
    <section className={`relative overflow-hidden ${bg} py-16 lg:py-24`}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-20 top-10 h-[24rem] w-[24rem] rounded-full blur-[140px]"
          style={{
            background:
              tone === "dark"
                ? "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)"
                : "radial-gradient(circle, rgba(201,169,110,0.18), transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={reverse ? "lg:order-2" : "lg:order-1"}
        >
          {eyebrow && (
            <span className="text-tagline text-xs text-revival-gold">
              {eyebrow}
            </span>
          )}
          <h2
            className={`mt-3 font-heading font-medium leading-[1.1] ${headingColor}`}
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
          >
            {heading}
          </h2>
          {body && (
            <p
              className={`mt-6 max-w-xl text-base font-light leading-relaxed sm:text-lg ${textColor}`}
            >
              {body}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={reverse ? "lg:order-1" : "lg:order-2"}
        >
          <PortraitFrame aspect="aspect-square" innerPadding="p-2 sm:p-4">
            <OrbitMotionGraphic {...graphicProps} />
          </PortraitFrame>
        </motion.div>
      </div>
    </section>
  );
}
