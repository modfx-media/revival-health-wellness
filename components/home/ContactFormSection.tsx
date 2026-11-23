"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Phone, Mail, Send, ShieldCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactFormSection() {
  return (
    <section
      id="ask-us"
      className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-28"
    >
      {/* ambiance */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-[26rem] w-[26rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(138,90,43,0.18), transparent 70%)",
        }}
        animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        {/* Left: copy + trust points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/70 px-4 py-1.5 text-tagline text-xs text-revival-gold shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Ask Us Anything
          </span>
          <h2
            className="mt-5 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)" }}
          >
            Have a question?{" "}
            <span className="bg-gradient-to-r from-[#8a5a2b] via-revival-gold to-[#e8d5b0] bg-clip-text italic text-transparent">
              We&apos;ll answer.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-revival-charcoal/85">
            Tell us a little about what you&apos;re hoping to work on, and a
            member of our medical team will reach out with next steps.
            Consultations are always complimentary.
          </p>

          <ul className="mt-8 space-y-3.5 text-sm">
            {[
              { icon: ShieldCheck, text: "100% confidential-no obligation" },
              { icon: CheckCircle2, text: "Response from a real provider within 1 business day" },
              { icon: Sparkles, text: "Personalized recommendations based on your goals" },
            ].map((row) => (
              <li key={row.text} className="flex items-start gap-3 text-revival-charcoal/85">
                <row.icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-revival-gold" />
                {row.text}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="tel:7029631154"
              className="inline-flex items-center gap-2 text-sm font-medium text-revival-dark transition-colors hover:text-revival-gold"
            >
              <Phone className="h-4 w-4 text-revival-gold" />
              (702) 963-1154
            </a>
            <span aria-hidden className="hidden h-4 w-px bg-revival-dark/15 sm:block" />
            <a
              href="mailto:Southwest@revivalhealthandwellnessgroup.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-revival-dark transition-colors hover:text-revival-gold"
            >
              <Mail className="h-4 w-4 text-revival-gold" />
              Southwest@revivalhealthandwellnessgroup.com
            </a>
          </div>
        </motion.div>

        {/* Right: embedded lead form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="relative"
        >
          {/* soft gradient frame */}
          <div className="rounded-[2rem] bg-gradient-to-br from-revival-gold/50 via-revival-gold/15 to-transparent p-[1.5px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.35)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-white">
              {/* ambient corner glows */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-revival-gold/10 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#8a5a2b]/10 blur-3xl"
              />

              {/* shimmer sweep */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-revival-gold to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />

              {/* card header */}
              <div className="relative flex items-center gap-3 px-6 pb-5 pt-7 sm:px-8 sm:pt-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-revival-gold-light shadow-[0_8px_20px_-6px_rgba(201,169,110,0.6)]">
                  <Send className="h-5 w-5 text-revival-dark" />
                </span>
                <div>
                  <p className="font-heading text-lg text-revival-dark">
                    Send us a message
                  </p>
                  <p className="text-xs font-light text-revival-charcoal/60">
                    We typically reply within 1 business day
                  </p>
                </div>
              </div>
              <div className="relative mx-6 h-px bg-gradient-to-r from-revival-gold/25 via-revival-gold/5 to-transparent sm:mx-8" />

              <div
                className="relative px-3 pb-3 pt-2 sm:px-4 sm:pb-4"
                style={{ minHeight: 872 }}
              >
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/5kiu25uwOWyGHXpsQZE5"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 872,
                    border: "none",
                    borderRadius: "16px",
                  }}
                  id="inline-5kiu25uwOWyGHXpsQZE5"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Website Contact Us Form"
                  data-height="872"
                  data-layout-iframe-id="inline-5kiu25uwOWyGHXpsQZE5"
                  data-form-id="5kiu25uwOWyGHXpsQZE5"
                  title="Website Contact Us Form"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </section>
  );
}
