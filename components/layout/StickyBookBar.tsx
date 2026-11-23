"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Phone, X, ArrowRight } from "lucide-react";
import { CTA } from "@/components/layout/nav";

const PHONE = "(702) 963-1154";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function StickyBookBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after the user scrolls past the hero (~60vh) so it doesn't fight it.
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Flag <body> while this bar is on screen so other bottom-fixed widgets
  // (accessibility trigger/back-to-top, third-party chat bubble) can lift
  // themselves clear of it instead of stacking on top of each other.
  useEffect(() => {
    const shouldFlag = visible && !overFooter && !dismissed;
    document.body.classList.toggle("rvw-sticky-bar-visible", shouldFlag);
    return () => {
      document.body.classList.remove("rvw-sticky-bar-visible");
    };
  }, [visible, overFooter, dismissed]);

  // Ads landing pages (/lp/*) have their own dedicated CTA/form - don't
  // stack the site-wide booking bar on top of it.
  if (dismissed || pathname?.startsWith("/lp")) return null;

  return (
    <AnimatePresence>
      {visible && !overFooter ? (
        <motion.div
          key="sticky-book"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 hidden px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] xl:block sm:px-6 sm:pb-5"
        >
          <div className="pointer-events-auto mx-auto flex max-w-4xl items-center gap-2 rounded-full border border-revival-gold/25 bg-revival-dark/95 py-2 pl-3 pr-2 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:gap-4 sm:py-2.5 sm:pl-5">
            <span className="relative hidden h-2 w-2 sm:inline-flex">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-revival-gold" />
            </span>

            <div className="min-w-0 flex-1 text-left">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-revival-gold sm:text-xs">
                Now Booking
              </p>
              <p className="truncate text-sm font-light text-revival-cream/90 sm:text-base">
                Free consultation-same-week appointments available
              </p>
            </div>

            <a
              href={`tel:${PHONE.replace(/[^\d]/g, "")}`}
              aria-label={`Call ${PHONE}`}
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-3 text-sm font-medium text-revival-cream transition-colors hover:border-revival-gold hover:text-revival-gold sm:px-4"
            >
              <Phone className="h-4 w-4 text-revival-gold" />
              <span className="hidden sm:inline">{PHONE}</span>
            </a>

            <a
              href={CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-4 text-sm font-semibold text-revival-dark shadow-[0_8px_24px_-8px_rgba(201,169,110,0.7)] transition-transform hover:scale-[1.03] sm:px-5"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <CalendarCheck className="relative h-4 w-4" />
              <span className="relative">Book Now</span>
              <ArrowRight className="relative hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:block" />
            </a>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss booking banner"
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-revival-cream/50 transition-colors hover:bg-white/5 hover:text-revival-cream sm:inline-flex"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
