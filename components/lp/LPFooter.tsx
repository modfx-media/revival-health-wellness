"use client";

import Link from "next/link";
import { telHref } from "@/lib/content/clinics";
import { reportPhoneClickConversion } from "@/lib/adsConversion";

const DEFAULT_LP_PHONE = "+1 725-334-7214";

/**
 * Minimal ad-compliance footer for /lp/* landing pages: business identity,
 * NAP, and required legal links only - no full sitemap (keeps the page a
 * single conversion funnel).
 */
export default function LPFooter({
  phone = DEFAULT_LP_PHONE,
  trackCallConversion = false,
}: {
  phone?: string;
  trackCallConversion?: boolean;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-revival-gold/15 bg-revival-dark py-8 text-revival-cream/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-center text-xs sm:px-6">
        <p className="font-heading text-sm text-revival-cream">
          Revival Health &amp; Wellness
        </p>
        <p>
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
            className="hover:text-revival-gold"
          >
            {phone}
          </a>
        </p>
        <p className="text-revival-cream/50">
          &copy; {year}{" "}
          Revival Health &amp; Wellness. All rights reserved. Results vary by individual.
        </p>
        <p>
          <Link href="/privacy-policy/" className="hover:text-revival-gold">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
