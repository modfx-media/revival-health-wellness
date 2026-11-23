"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Navigation } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Location = {
  name: string;
  address: string;
  phone: string;
  /** Full address used to build a cross-platform directions URL. */
  directionsAddress: string;
  embed: string;
};

const LOCATIONS: Location[] = [
  {
    name: "Henderson / Southwest",
    address: "7220 S. Cimarron Road, Suite #140, Las Vegas, NV 89113",
    phone: "(702) 963-1154",
    directionsAddress:
      "7220 S Cimarron Road Suite 140, Las Vegas, NV 89113",
    embed:
      "https://www.google.com/maps?q=7220+S+Cimarron+Road+Suite+140+Las+Vegas+NV+89113&output=embed",
  },
  {
    name: "Summerlin / Northwest",
    address: "2585 Box Canyon Drive, Suite #150, Las Vegas, NV 89128",
    phone: "(702) 725-1588",
    directionsAddress:
      "2585 Box Canyon Drive Suite 150, Las Vegas, NV 89128",
    embed:
      "https://www.google.com/maps?q=2585+Box+Canyon+Drive+Suite+150+Las+Vegas+NV+89128&output=embed",
  },
];

/**
 * Universal directions URL. On iOS/Android this launches Google Maps (or the
 * device's default map app via OS handoff); on desktop it opens Google Maps
 * with a pre-filled route from the user's current location.
 */
function directionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

type MapSectionProps = {
  /** Dark/black background variant (used on the /lp/* ad landing pages). */
  dark?: boolean;
  /** Restrict to a single location (e.g. a treatment only offered at one clinic). */
  only?: "henderson-sw" | "summerlin-nw";
  /** Hide the per-location phone number (used on /lp/* ad landing pages, which have their own CTA phone number). */
  hidePhone?: boolean;
};

export default function MapSection({ dark = false, only, hidePhone = false }: MapSectionProps) {
  const locations = only
    ? LOCATIONS.filter((l) =>
        only === "summerlin-nw" ? l.name.includes("Summerlin") : l.name.includes("Henderson")
      )
    : LOCATIONS;
  const [active, setActive] = useState(0);
  const loc = locations[active];

  return (
    <section
      className={`relative overflow-hidden py-14 lg:py-16 ${
        dark ? "bg-revival-dark" : "bg-revival-warm-white"
      }`}
    >
      {/* drifting gold ambiance */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: heading + location switcher */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col justify-center"
          >
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full border border-revival-gold/30 px-4 py-1.5 text-tagline text-xs text-revival-gold shadow-sm backdrop-blur ${
                dark ? "bg-white/5" : "bg-white/70"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              Visit Us
            </span>
            <h2
              className={dark ? "mt-4 text-white" : "mt-4 text-revival-dark"}
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1 }}
            >
              {only ? (
                <>
                  Visit our{" "}
                  <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
                    {loc.name}
                  </span>{" "}
                  location
                </>
              ) : (
                <>
                  Two Las Vegas{" "}
                  <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
                    locations
                  </span>
                </>
              )}
            </h2>

            <div className="mt-6 space-y-3">
              {locations.map((l, i) => {
                const selected = i === active;
                return (
                  <button
                    key={l.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-300 ${
                      selected
                        ? dark
                          ? "border-revival-gold/40 bg-white/[0.06] shadow-lg"
                          : "border-revival-gold/40 bg-white shadow-lg"
                        : dark
                          ? "border-white/10 bg-white/[0.03] hover:border-revival-gold/30 hover:bg-white/[0.06]"
                          : "border-revival-dark/10 bg-white/50 hover:border-revival-gold/30 hover:bg-white/80"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="map-active"
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-revival-gold to-[#8a5a2b]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        selected
                          ? "bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-white"
                          : "bg-revival-gold/10 text-revival-gold"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-heading text-base font-medium ${
                          dark ? "text-white" : "text-revival-dark"
                        }`}
                      >
                        {l.name}
                      </span>
                      <span
                        className={`mt-0.5 block text-sm font-light leading-snug ${
                          dark ? "text-revival-cream/70" : "text-revival-dark/60"
                        }`}
                      >
                        {l.address}
                      </span>
                      {hidePhone ? null : (
                        <a
                          href={`tel:${l.phone.replace(/[^\d]/g, "")}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-revival-gold transition-colors hover:text-[#8a5a2b]"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {l.phone}
                        </a>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <a
              href={directionsUrl(loc.directionsAddress)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get directions to ${loc.name} in your map app`}
              className={`group mt-5 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                dark
                  ? "bg-gradient-to-r from-revival-gold to-revival-gold-light text-revival-dark hover:scale-[1.02]"
                  : "bg-revival-dark text-revival-warm-white hover:bg-revival-charcoal"
              }`}
            >
              <Navigation
                className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-45 ${
                  dark ? "text-revival-dark" : "text-revival-gold"
                }`}
              />
              Get Directions
            </a>
          </motion.div>

          {/* Right: animated map frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative min-h-[280px] overflow-hidden rounded-3xl border border-revival-gold/20 shadow-2xl ring-1 ring-black/5 lg:min-h-0"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-inset ring-white/10"
            />
            <AnimatePresence mode="wait">
              <motion.iframe
                key={active}
                title={`Map of ${loc.name}`}
                src={loc.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 h-full w-full grayscale-[0.2] [filter:sepia(0.12)_grayscale(0.2)]"
              />
            </AnimatePresence>

            {/* Floating Get Directions button overlaid on the map */}
            <a
              href={directionsUrl(loc.directionsAddress)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get directions to ${loc.name} in your map app`}
              className="group absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-semibold text-revival-dark shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] ring-1 ring-revival-gold/25 backdrop-blur-md transition-transform hover:scale-[1.03]"
            >
              <Navigation className="h-4 w-4 text-revival-gold transition-transform duration-300 group-hover:rotate-45" />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
