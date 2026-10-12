"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Premium sticky ad-LP header: larger logo (not linked) + gold Book CTA to #book.
 * Shrinks slightly on scroll. No nav or outbound links.
 */
export default function OndaProAdHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-revival-gold/20 bg-revival-dark/95 backdrop-blur-xl transition-[padding,box-shadow] duration-300",
        scrolled
          ? "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.65)]"
          : "shadow-none",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-[64px] sm:h-[72px]" : "h-[76px] sm:h-[88px]",
        )}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span
            className="flex shrink-0 items-center"
            aria-label="Revival Health & Wellness"
          >
            <Image
              src="/images/brand/revival-logo-mobile.png"
              alt="Revival Health & Wellness"
              width={221}
              height={300}
              priority
              className={cn(
                "w-auto object-contain transition-[height] duration-300",
                scrolled
                  ? "h-11 sm:h-14"
                  : "h-11 sm:h-16 lg:h-[4.5rem]",
              )}
            />
          </span>
          <span className="hidden rounded-full border border-revival-gold/30 bg-white/[0.04] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-revival-gold sm:inline-flex lg:text-[0.65rem]">
            Limited Time New Patient Offer
          </span>
        </div>

        <a
          href="#book"
          className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-4 py-2.5 text-xs font-semibold text-revival-dark shadow-[0_10px_28px_-10px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03] sm:px-6 sm:py-3 sm:text-sm"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <CalendarCheck className="relative h-4 w-4" />
          <span className="relative hidden sm:inline">Book Free Consultation</span>
          <span className="relative sm:hidden">Book Free</span>
          <ArrowRight className="relative hidden h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:block" />
        </a>
      </div>
    </header>
  );
}
