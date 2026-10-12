"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ChevronDown, ExternalLink, CalendarCheck } from "lucide-react";
import { PRIMARY_NAV, CTA } from "./nav";
import { cn } from "@/lib/utils";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: LUXURY_EASE, when: "beforeChildren" },
  },
  exit: { x: "100%", transition: { duration: 0.3, ease: LUXURY_EASE } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: LUXURY_EASE },
  },
};

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrolled?: boolean;
};

export default function MobileMenu({
  open,
  onOpenChange,
  scrolled = false,
}: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => onOpenChange(false);

  const overlay = (
    <AnimatePresence>
      {open ? (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-in panel */}
          <motion.aside
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[100] block w-full overflow-y-auto overscroll-contain bg-revival-dark px-6 pb-10 pt-6 text-revival-warm-white [touch-action:pan-y] sm:w-[88%] sm:max-w-sm"
          >
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={close}
                  className="flex items-center"
                  aria-label="Revival Health & Wellness home"
                >
                  <Image
                    src="/images/brand/revival-logo-mobile.png"
                    alt="Revival Health & Wellness"
                    width={221}
                    height={300}
                    className="h-16 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-revival-warm-white transition-colors hover:text-revival-gold"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.nav
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                {PRIMARY_NAV.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="border-b border-revival-warm-white/10"
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((prev) =>
                              prev === item.label ? null : item.label,
                            )
                          }
                          className="flex w-full items-center justify-between py-4 text-left font-heading text-lg text-revival-warm-white"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-revival-gold transition-transform",
                              expanded === item.label && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.label ? (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: LUXURY_EASE }}
                              className="overflow-hidden pb-2 pl-4"
                            >
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    target={child.external ? "_blank" : undefined}
                                    rel={
                                      child.external
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    onClick={close}
                                    className="flex items-center gap-1.5 py-2 text-sm font-medium text-revival-warm-white/90 transition-colors hover:text-revival-gold"
                                  >
                                    {child.label}
                                    {child.external ? (
                                      <ExternalLink className="h-3 w-3" />
                                    ) : null}
                                  </Link>
                                  {child.children?.length ? (
                                    <ul className="mb-1 ml-3 border-l border-revival-warm-white/10 pl-3">
                                      {child.children.map((leaf) => (
                                        <li key={leaf.href}>
                                          <Link
                                            href={leaf.href}
                                            onClick={close}
                                            className="block py-1.5 text-[0.8rem] font-light text-revival-warm-white/60 transition-colors hover:text-revival-gold"
                                          >
                                            {leaf.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </li>
                              ))}

                              {/* Persistent Book Appointment CTA inside every dropdown */}
                              <li className="mt-2 pt-2">
                                <a
                                  href={CTA.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={close}
                                  className="group flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-revival-gold to-revival-gold-light px-3 py-2.5 text-sm font-semibold text-revival-dark shadow-[0_6px_16px_-6px_rgba(201,169,110,0.55)]"
                                >
                                  <span className="flex items-center gap-2">
                                    <CalendarCheck className="h-4 w-4" />
                                    Book Appointment
                                  </span>
                                </a>
                              </li>
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </>
                    ) : item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="flex items-center gap-1.5 py-4 font-heading text-lg text-revival-warm-white transition-colors hover:text-revival-gold"
                      >
                        {item.label}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-4 font-heading text-lg text-revival-warm-white transition-colors hover:text-revival-gold"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              {/* CTA */}
              <a
                href={CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-revival-gold px-6 py-3.5 text-sm font-medium text-revival-dark transition-transform duration-200 hover:scale-105 hover:bg-revival-gold-light"
              >
                {CTA.label}
              </a>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-revival-warm-white transition-colors hover:text-revival-gold",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
