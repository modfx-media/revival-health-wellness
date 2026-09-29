"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { telHref } from "@/lib/content/clinics";
import { reportPhoneClickConversion } from "@/lib/adsConversion";

const DEFAULT_PHONE = "+1 725-334-7214";

/**
 * Minimal, distraction-free header for /lp/* ad landing pages. No primary
 * nav, no dropdowns - just the logo (trust) and a one-tap call button, so
 * paid traffic stays focused on the single offer/form below.
 */
export default function LPHeader({
  phone = DEFAULT_PHONE,
  trackCallConversion = false,
}: {
  phone?: string;
  trackCallConversion?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-revival-gold/15 bg-revival-dark/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <span className="flex items-center gap-2.5" aria-label="Revival Health & Wellness">
          <Image
            src="/images/brand/revival-logo-mobile.png"
            alt="Revival Health & Wellness"
            width={221}
            height={300}
            priority
            className="h-10 w-auto object-contain"
          />
        </span>

        <a
          href={telHref(phone)}
          onClick={
            trackCallConversion
              ? (e) => {
                  e.preventDefault();
                  reportPhoneClickConversion(phone);
                }
              : undefined
          }
          className="group inline-flex h-10 items-center gap-2 rounded-full border border-revival-gold/40 px-4 text-sm font-semibold text-revival-cream transition-colors hover:border-revival-gold hover:text-revival-gold"
        >
          <Phone className="h-3.5 w-3.5 text-revival-gold" />
          <span className="hidden sm:inline">{phone}</span>
          <span className="sm:hidden">Call Now</span>
        </a>
      </div>
    </header>
  );
}
