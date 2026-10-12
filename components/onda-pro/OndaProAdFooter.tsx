import Image from "next/image";
import { CalendarCheck, ArrowRight, MapPin } from "lucide-react";

/**
 * Substantial link-free ad-LP footer: logo, brand line, two location columns,
 * gold #book CTA, copyright + non-promissory disclaimer.
 */
export default function OndaProAdFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-revival-gold/20 bg-revival-dark text-revival-cream">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-revival-gold/10 blur-[120px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8a5a2b]/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <span aria-label="Revival Health & Wellness">
            <Image
              src="/images/brand/revival-logo-mobile.png"
              alt="Revival Health & Wellness"
              width={221}
              height={300}
              className="mx-auto h-16 w-auto object-contain sm:h-20"
            />
          </span>
          <p className="mt-5 max-w-xl font-heading text-xl text-revival-cream sm:text-2xl">
            Revival Health &amp; Wellness
          </p>
          <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-revival-cream/70 sm:text-base">
            Physician-led aesthetics and body contouring in Las Vegas.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2 sm:gap-8">
          <div className="rounded-2xl border border-revival-gold/15 bg-white/[0.03] px-5 py-5 text-left sm:px-6">
            <p className="text-tagline text-[0.6rem] text-revival-gold">
              Southwest
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm font-light leading-relaxed text-revival-cream/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
              7220 S. Cimarron Rd., Suite 140, Las Vegas, NV 89113
            </p>
          </div>
          <div className="rounded-2xl border border-revival-gold/15 bg-white/[0.03] px-5 py-5 text-left sm:px-6">
            <p className="text-tagline text-[0.6rem] text-revival-gold">
              Northwest
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm font-light leading-relaxed text-revival-cream/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
              2585 Box Canyon Dr., Suite 150, Las Vegas, NV 89128
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#book"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-7 py-3.5 text-sm font-semibold text-revival-dark shadow-[0_12px_32px_-12px_rgba(201,169,110,0.7)] transition-transform duration-300 hover:scale-[1.03] sm:px-8 sm:text-base"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <CalendarCheck className="relative h-4 w-4" />
            <span className="relative">Book Your FREE Consultation</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mx-auto mt-12 max-w-2xl border-t border-revival-gold/15 pt-8 text-center">
          <p className="text-xs font-light text-revival-cream/45">
            &copy; {year} Revival Health &amp; Wellness. All rights reserved.
          </p>
          <p className="mt-2 text-xs font-light leading-relaxed text-revival-cream/40">
            Individual results vary. Consultation required to determine
            candidacy.
          </p>
        </div>
      </div>
    </footer>
  );
}
