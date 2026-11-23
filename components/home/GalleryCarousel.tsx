"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIDEO_SRC = "/videos/inside-revival.mp4";
const POSTER_SRC = "/images/home/inside-revival-poster.png";

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Private treatment suites",
    text: "Discreet, spa-quality rooms designed for total comfort.",
  },
  {
    icon: ShieldCheck,
    title: "Physician-led care",
    text: "Every plan is guided by our expert medical team.",
  },
  {
    icon: Heart,
    title: "Warm hospitality",
    text: "Concierge service from your first hello to follow-ups.",
  },
  {
    icon: MapPin,
    title: "Two Vegas locations",
    text: "Southwest & Northwest — full menu at both clinics.",
  },
];

const LOCATIONS = [
  {
    name: "Southwest",
    address: "7220 S. Cimarron Rd, Suite 140, Las Vegas, NV 89113",
  },
  {
    name: "Northwest",
    address: "2585 Box Canyon Dr, Suite 150, Las Vegas, NV 89117",
  },
];

export default function GalleryCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  const handlePlayToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      // First interaction: unmute so the visitor gets full sound
      if (!started) {
        v.muted = false;
        setMuted(false);
        setStarted(true);
      }
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 lg:py-32">
      {/* Animated gold ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-1/4 h-[26rem] w-[26rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.18), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: header + copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center lg:text-left"
          >
            <h2
              className="text-revival-dark"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              Inside{" "}
              <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text text-transparent">
                Revival Health &amp; Wellness
              </span>
            </h2>
            <p className="mt-5 text-lg font-light text-revival-dark/65">
              Step inside our Las Vegas locations, designed for comfort,
              privacy, and a true luxury experience.
            </p>
            <p className="mt-4 text-base font-light text-revival-dark/55">
              Take a quick studio tour and meet the team behind every treatment
              — from our aesthetics suites to hormone and wellness care.
            </p>

            {/* Feature highlights */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => {
                const Icon = h.icon;
                return (
                  <li
                    key={h.title}
                    className="group flex items-start gap-3 rounded-2xl border border-revival-gold/15 bg-white/60 p-4 text-left shadow-sm backdrop-blur-sm transition-colors duration-300 hover:border-revival-gold/40 hover:bg-white/80"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-sm font-medium text-revival-dark">
                        {h.title}
                      </p>
                      <p className="mt-0.5 text-xs font-light text-revival-dark/60">
                        {h.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Locations quick view */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.name}
                  className="rounded-2xl border border-revival-dark/8 bg-revival-dark px-4 py-3 text-left shadow-sm"
                >
                  <p className="text-tagline text-[0.6rem] text-revival-gold">
                    {loc.name}
                  </p>
                  <p className="mt-1 text-xs font-light leading-relaxed text-revival-cream/80">
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={ZENOTI}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-[#8a5a2b] px-7 py-3.5 text-sm font-medium text-revival-dark shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover/btn:translate-x-full" />
                <span className="relative">Book Your Visit</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
              <Link
                href="/contact-us/"
                className="group/dir inline-flex items-center gap-2 rounded-full border border-revival-dark/15 bg-white/60 px-6 py-3.5 text-sm font-medium text-revival-dark backdrop-blur-sm transition-all duration-300 hover:border-revival-gold hover:bg-white"
              >
                Get Directions
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/dir:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right: video showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto"
          >
            {/* Rotating dashed accent */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] border border-dashed border-revival-gold/25"
            />

            {/* Gold gradient frame */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-revival-gold via-revival-gold/40 to-transparent p-[1.5px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.45)]">
              <div
                onClick={handlePlayToggle}
                className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[1.9rem] bg-revival-dark"
              >
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  playsInline
                  muted={muted}
                  preload="metadata"
                  onEnded={() => setPlaying(false)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  className="h-full w-full object-cover"
                />

                {/* Scrim (visible when idle, fades when playing) */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40 transition-opacity duration-500 ${
                    playing ? "opacity-0 group-hover:opacity-60" : "opacity-100"
                  }`}
                />

                {/* Center Play / Pause button */}
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                  }`}
                >
                  <motion.span
                    aria-hidden
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-[0_10px_40px_rgba(201,169,110,0.55)] ring-1 ring-white/20 sm:h-24 sm:w-24"
                  >
                    {playing ? (
                      <Pause className="h-8 w-8 sm:h-10 sm:w-10" />
                    ) : (
                      <Play className="ml-1 h-8 w-8 sm:h-10 sm:w-10" />
                    )}
                  </motion.span>
                </div>

                {/* Persistent play/pause toggle (bottom-left) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayToggle();
                  }}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:border-revival-gold hover:bg-black/70"
                >
                  {playing ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5" />
                  )}
                </button>

                {/* Mute toggle (bottom-right) */}
                <button
                  type="button"
                  onClick={handleMuteToggle}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className={`absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:border-revival-gold hover:bg-black/70 ${
                    started ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>

                {/* Corner label */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-tagline text-[0.6rem] text-revival-gold backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-revival-gold" />
                  </span>
                  Studio Tour
                </span>

                {/* Ring highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
