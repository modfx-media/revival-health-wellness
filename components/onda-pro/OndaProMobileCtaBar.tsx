"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Sticky mobile-only bottom CTA → #book. Hidden near the form / footer. */
export default function OndaProMobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearTop = window.scrollY < window.innerHeight * 0.45;
      const book = document.getElementById("book");
      let nearBook = false;
      if (book) {
        const rect = book.getBoundingClientRect();
        nearBook = rect.top < window.innerHeight * 0.85;
      }
      setVisible(!nearTop && !nearBook);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="onda-mobile-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <a
            href="#book"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-5 py-3.5 text-sm font-semibold text-revival-dark shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Free Consultation
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
