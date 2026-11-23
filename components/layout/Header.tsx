"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Phone,
  ArrowRight,
  Mail,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import {
  PRIMARY_NAV,
  CTA,
  type NavItem,
  type NavLeaf,
} from "./nav";
import { useScrollPosition } from "@/lib/useScrollPosition";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "Southwest@revivalhealthandwellnessgroup.com";

const LOCATIONS = [
  { label: "Henderson / SW", phone: "(702) 963-1154" },
  { label: "Summerlin / NW", phone: "(702) 725-1588" },
] as const;

/** Primary desktop phone (used for the icon-only nav pill — tel: link). */
const PRIMARY_PHONE = LOCATIONS[0].phone;

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/RevivalHealthAndWellness",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/revival.healthandwellness/",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@revival.lv",
    Icon: TikTokIcon,
  },
];

export default function Header() {
  const { scrolled } = useScrollPosition(40);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Grace period before closing a dropdown so the cursor can travel
  // from the trigger to a (potentially detached) panel without it shutting.
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      setHovered(null);
    }, 220);
  };
  useEffect(() => () => cancelClose(), []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace(/\/$/, ""));

  // Ads landing pages (/lp/*) render their own minimal, distraction-free
  // chrome (see components/lp/LPHeader.tsx) instead of the full site nav.
  if (pathname?.startsWith("/lp")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Top utility bar: email · location · socials (collapses on scroll) ── */}
      <AnimatePresence initial={false}>
        {!scrolled ? (
          <motion.div
            key="utility-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            className="relative overflow-hidden bg-revival-dark text-revival-warm-white"
          >
            {/* drifting gold glow */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -top-10 left-1/4 h-24 w-64 rounded-full bg-revival-gold/15 blur-3xl"
              animate={{ x: [0, 120, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative mx-auto flex h-10 max-w-7xl flex-nowrap items-center justify-between gap-4 whitespace-nowrap px-4 sm:px-6 lg:gap-6 lg:px-8">
              {/* Left: email */}
              <div className="flex items-center gap-5 whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.1em] lg:text-[0.7rem] lg:tracking-[0.12em]">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-2 whitespace-nowrap text-revival-warm-white/75 transition-colors hover:text-revival-gold"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-revival-gold" />
                  <span className="hidden xl:inline">{EMAIL}</span>
                  <span className="xl:hidden">Email Us</span>
                </a>
              </div>

              {/* Center: dual-location phone chips */}
              <ul className="hidden items-center gap-3 whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.08em] md:flex lg:gap-5 lg:text-[0.7rem] lg:tracking-[0.12em]">
                {LOCATIONS.map((loc) => (
                  <li key={loc.phone} className="whitespace-nowrap">
                    <a
                      href={`tel:${loc.phone.replace(/[^\d]/g, "")}`}
                      className="group inline-flex items-center gap-2 whitespace-nowrap text-revival-warm-white/85 transition-colors hover:text-revival-gold"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-revival-gold" />
                      <span className="whitespace-nowrap text-revival-warm-white/55">
                        {loc.label}
                      </span>
                      <span className="whitespace-nowrap tracking-[0.06em] text-revival-warm-white/90 group-hover:text-revival-gold lg:tracking-[0.08em]">
                        {loc.phone}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right: socials + book pill */}
              <div className="flex items-center gap-3 whitespace-nowrap lg:gap-4">
                <span className="hidden whitespace-nowrap text-[0.68rem] uppercase tracking-[0.22em] text-revival-warm-white/45 xl:inline">
                  Follow
                </span>
                <ul className="flex items-center gap-1.5">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="group flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-revival-warm-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-revival-gold/50 hover:text-revival-gold"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden
                  className="hidden h-4 w-px bg-white/10 sm:block"
                />
                <Link
                  href="/contact-us/"
                  className="hidden items-center gap-1.5 whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.1em] text-revival-warm-white/75 transition-colors hover:text-revival-gold sm:inline-flex lg:text-[0.7rem] lg:tracking-[0.12em]"
                >
                  <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-revival-gold" />
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Blended separator: fades from transparent → subtle gold → transparent */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-revival-gold/25 to-transparent"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── Main unified navigation bar ─────────────────────────────────── */}
      <div
        className={cn(
          "relative transition-colors duration-500",
          scrolled
            ? "bg-revival-dark/90 backdrop-blur-xl"
            : "bg-gradient-to-b from-revival-dark/85 via-revival-dark/55 to-transparent backdrop-blur-md",
        )}
      >
        {/* Soft fade at bottom edge blends the nav into the hero */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-b from-revival-dark/40 to-transparent"
        />

        <div
          className={cn(
            "mx-auto max-w-7xl px-4 transition-all duration-500 sm:px-6 lg:px-8",
            scrolled ? "py-2" : "py-3",
          )}
        >
          {/* Single row: logo · centered nav · phone (+ mobile trigger). */}
          <div className="flex items-center gap-6">
            {/* Logo (wordmark is baked into the artwork) */}
            <Link
              href="/"
              className="group flex shrink-0 items-center"
              aria-label="Revival Health & Wellness home"
            >
              <motion.span
                className="relative block"
                whileHover={{ rotate: 8, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
              >
                <Image
                  src="/images/brand/revival-logo-mobile.png"
                  alt="Revival Health & Wellness"
                  width={221}
                  height={300}
                  priority
                  className={cn(
                    "w-auto object-contain transition-all duration-500",
                    scrolled ? "h-12" : "h-16 sm:h-[4.5rem]",
                  )}
                />
              </motion.span>
            </Link>

            {/* Center: unified primary nav */}
            <nav
              className="hidden flex-1 flex-wrap items-center justify-center xl:flex"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {PRIMARY_NAV.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  scrolled={scrolled}
                  active={isActive(item.href)}
                  open={openMenu === item.label}
                  hovered={hovered === item.label}
                  onOpen={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                    setHovered(item.label);
                  }}
                  onPanelHover={cancelClose}
                  onPanelLeave={scheduleClose}
                />
              ))}
            </nav>

            {/* Right: icon phone + Book Now + mobile trigger */}
            <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:ml-0 xl:gap-2">
              <a
                href={`tel:${PRIMARY_PHONE.replace(/[^\d]/g, "")}`}
                aria-label={`Call ${PRIMARY_PHONE}`}
                title={PRIMARY_PHONE}
                className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-revival-gold transition-colors hover:border-revival-gold/50 hover:bg-white/[0.04] xl:h-10 xl:w-10"
              >
                <span
                  aria-hidden
                  className="absolute right-1 top-1 flex h-1.5 w-1.5 xl:right-1.5 xl:top-1.5 xl:h-2 xl:w-2"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival-gold/60" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-revival-gold" />
                </span>
                <Phone className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              </a>

              <Link
                href={CTA.href}
                {...(CTA.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-3.5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-revival-dark shadow-[0_10px_28px_-10px_rgba(201,169,110,0.65)] transition-transform duration-300 hover:scale-[1.03] xl:px-5 xl:py-2.5 xl:text-[0.72rem] xl:tracking-[0.12em]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <CalendarCheck className="relative h-3 w-3 xl:h-3.5 xl:w-3.5" />
                <span className="relative">Book Now</span>
                <ArrowRight className="relative hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 xl:block" />
              </Link>

              <div className="xl:hidden">
                <MobileMenu
                  open={mobileOpen}
                  onOpenChange={setMobileOpen}
                  scrolled={scrolled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Desktop nav item with sliding highlight + mega-menu dropdown ───────── */

function DesktopNavItem({
  item,
  scrolled,
  active,
  open,
  hovered,
  secondary = false,
  onOpen,
  onPanelHover,
  onPanelLeave,
}: {
  item: NavItem;
  scrolled: boolean;
  active: boolean;
  open: boolean;
  hovered: boolean;
  secondary?: boolean;
  onOpen: () => void;
  onPanelHover?: () => void;
  onPanelLeave?: () => void;
}) {
  // Header now always sits over a dark backdrop (translucent on hero,
  // solid-blur on scroll), so nav text stays warm-white in both states.
  void scrolled;
  const baseColor = "text-revival-warm-white/90";

  const sizing = "px-3.5 py-2 text-[0.8rem] font-semibold tracking-[0.04em] font-sans";

  /* Shared sliding gold pill that animates between items on hover. */
  const Highlight = () =>
    hovered ? (
      <motion.span
        layoutId="nav-highlight"
        aria-hidden
        className="absolute inset-0 z-0 rounded-full bg-revival-gold/12 ring-1 ring-revival-gold/20"
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
    ) : null;

  // Leaf item (no dropdown).
  if (!item.children) {
    const inner = (
      <>
        <Highlight />
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {item.label}
          {item.external ? (
            <ExternalLink className="h-3 w-3 opacity-60" />
          ) : null}
        </span>
        <Underline show={active} />
      </>
    );

    const className = cn(
      "group relative inline-flex items-center transition-colors hover:text-revival-gold",
      sizing,
      baseColor,
    );

    return item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onOpen}
        className={className}
      >
        {inner}
      </a>
    ) : (
      <Link href={item.href} onMouseEnter={onOpen} className={className}>
        {inner}
      </Link>
    );
  }

  const grouped = item.children.some((c) => c.children && c.children.length);
  const wide = grouped || item.children.length > 6;

  // For grouped mega-menus, count the on-screen columns so the grid
  // keeps every category on a single row.
  const groupedCols = grouped
    ? (item.children.some((c) => !c.children?.length) ? 1 : 0) +
      item.children.filter((c) => c.children?.length).length
    : 0;

  // Grouped panels break out of the nav-item box and re-anchor to the
  // viewport so they stay centered and never overflow on small laptops.
  const triggerRef = useRef<HTMLDivElement>(null);
  const [panelTop, setPanelTop] = useState(0);
  useEffect(() => {
    if (!grouped || !open) return;
    const measure = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (r) setPanelTop(r.bottom);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [grouped, open, scrolled]);

  return (
    <div ref={triggerRef} className="relative" onMouseEnter={onOpen}>
      <Link
        href={item.href}
        className={cn(
          "group relative inline-flex items-center gap-1 transition-colors hover:text-revival-gold",
          sizing,
          baseColor,
        )}
      >
        <Highlight />
        <span className="relative z-10 inline-flex items-center gap-1">
          {item.label}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              open && "rotate-180 text-revival-gold",
            )}
          />
        </span>
        <Underline show={active || open} />
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.24, ease: LUXURY_EASE }}
            onMouseEnter={onPanelHover}
            onMouseLeave={onPanelLeave}
            className={cn(
              grouped
                ? "fixed left-1/2 z-50 -translate-x-1/2 pt-2"
                : cn(
                    "absolute top-full pt-4",
                    item.label === "Aesthetics" ? "right-0" : "left-0",
                  ),
              !grouped && (wide ? "w-[34rem]" : "w-72"),
            )}
            style={
              grouped
                ? {
                    top: panelTop,
                    // Roughly 15rem per column + container padding, clamped to viewport.
                    width: `min(${groupedCols * 15 + 2}rem, calc(100vw - 2rem))`,
                  }
                : undefined
            }
          >
            <div className="overflow-hidden rounded-2xl border border-revival-gold/15 bg-revival-charcoal/95 p-4 shadow-2xl backdrop-blur-xl">
              <span
                aria-hidden
                className="mb-2 block h-px bg-gradient-to-r from-transparent via-revival-gold/60 to-transparent"
              />
              {grouped ? (
                <MegaMenu item={item} cols={groupedCols} />
              ) : (
                <ul
                  className={cn(
                    "gap-0.5",
                    wide ? "grid grid-cols-2" : "flex flex-col",
                  )}
                >
                  {item.children.map((child, i) => (
                    <motion.li
                      key={child.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.04 + i * 0.025,
                        duration: 0.3,
                        ease: LUXURY_EASE,
                      }}
                    >
                      <DropdownLink child={child} />
                    </motion.li>
                  ))}
                </ul>
              )}

              <DropdownBookCta />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ── Grouped mega-menu (Sexual Wellness, Aesthetics) ───────────────────── */

function MegaMenu({ item, cols }: { item: NavItem; cols: number }) {
  const children = item.children ?? [];
  const standalone = children.filter((c) => !c.children?.length);
  const groups = children.filter((c) => c.children?.length);

  return (
    <div
      className="grid gap-x-6 gap-y-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {standalone.length ? (
        <div className="flex flex-col">
          <p className="px-3 pb-1.5 text-tagline text-[0.65rem] text-revival-gold">
            {item.label}
          </p>
          {standalone.map((child) => (
            <DropdownLink key={child.href} child={child} />
          ))}
        </div>
      ) : null}

      {groups.map((group) => (
        <div key={group.href} className="flex flex-col">
          <Link
            href={group.href}
            className="px-3 pb-1.5 text-tagline text-[0.65rem] text-revival-gold transition-colors hover:text-revival-gold-light"
          >
            {group.label}
          </Link>
          {group.children?.map((leaf) => (
            <DropdownLink key={leaf.href} child={leaf} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Persistent "Book Appointment" CTA appended to every dropdown ─────── */

function DropdownBookCta() {
  return (
    <div className="mt-3 border-t border-revival-gold/15 pt-3">
      <a
        href={CTA.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-revival-gold to-revival-gold-light px-3.5 py-2.5 text-sm font-semibold text-revival-dark shadow-[0_6px_20px_-6px_rgba(201,169,110,0.6)] transition-transform hover:scale-[1.01]"
      >
        <span className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4" />
          Book Appointment
        </span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

/* ── Single dropdown link row ──────────────────────────────────────────── */

function DropdownLink({ child }: { child: NavLeaf }) {
  return (
    <Link
      href={child.href}
      target={child.external ? "_blank" : undefined}
      rel={child.external ? "noopener noreferrer" : undefined}
      className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-sm font-light text-revival-warm-white/85 transition-colors hover:bg-revival-gold/10 hover:text-revival-gold"
    >
      <span className="flex items-center gap-2">
        <span className="h-1 w-1 shrink-0 rounded-full bg-revival-gold/40 transition-all duration-300 group-hover/item:w-3 group-hover/item:bg-revival-gold" />
        {child.label}
      </span>
      {child.external ? (
        <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
      ) : (
        <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
      )}
    </Link>
  );
}

/* ── Active / hover gold underline indicator ───────────────────────────── */

function Underline({ show }: { show: boolean }) {
  return (
    <span className="pointer-events-none absolute inset-x-3 bottom-1 z-10 h-px overflow-hidden">
      <span
        className={cn(
          "block h-full origin-left bg-gradient-to-r from-revival-gold to-revival-gold-light transition-transform duration-300",
          show ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </span>
  );
}

/* ── Brand social icons ────────────────────────────────────────────────── */

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1={17.5} y1={6.5} x2={17.51} y2={6.5} />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 5.5a4.5 4.5 0 0 0 4 2.3v3a7.5 7.5 0 0 1-4-1.2v5.9a5.5 5.5 0 1 1-5.5-5.5c.28 0 .55.02.82.06v3.1a2.5 2.5 0 1 0 1.68 2.36V2.5h3a4.5 4.5 0 0 0 0 .02z" />
    </svg>
  );
}
