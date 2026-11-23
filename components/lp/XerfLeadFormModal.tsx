"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { X } from "lucide-react";

const FORM_ID = "Oc5ZI4djsuJ2T4G3QFZW";
const FORM_NAME = "\uD83D\uDD35 VERCEL Facebook Xerf LP";

/**
 * Popup dialog wrapping the LeadConnector (GoHighLevel) embedded lead
 * form for the XERF ads landing page. Rendered via a portal to
 * document.body so `position: fixed` isn't constrained by any animated
 * (transformed) ancestor in the page tree — same approach as
 * components/lp/LeadFormModal.tsx (P-Long).
 *
 * On a successful form submission (detected via the LeadConnector iframe's
 * postMessage events), the user is routed to the XERF thank-you page.
 */
export default function XerfLeadFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      const origin = e.origin || "";
      const trusted =
        origin.includes("leadconnectorhq.com") ||
        origin.includes("msgsndr.com");
      if (!trusted) return;

      const raw =
        typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      const s = raw.toLowerCase();

      const isFormEvent = s.includes("form") || s.includes("submit");
      const isSuccess =
        s.includes("success") ||
        s.includes("submitted") ||
        s.includes("complete");

      if (isFormEvent && isSuccess) {
        onClose();
        router.push("/lp/xerf-offer/thank-you/");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, onClose, router]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Free XERF consultation request form"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[100] flex min-h-full items-center justify-center overflow-y-auto p-4 py-10 transition-opacity duration-300 ease-out sm:p-6 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
          className="fixed inset-0 bg-revival-dark/85 backdrop-blur-sm"
        />

        <div
          className={`relative z-10 my-auto w-full max-w-lg transition-all duration-300 ease-out ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.97]"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label="Close form"
            className="absolute -top-3 -right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold text-revival-dark shadow-lg transition-transform duration-200 hover:scale-105"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="overflow-hidden rounded-[1.75rem] border border-revival-gold/25 bg-revival-dark shadow-[0_28px_70px_-30px_rgba(0,0,0,0.6)]">
            <div className="px-6 pt-6 sm:px-8 sm:pt-7">
              <p className="text-tagline text-xs text-revival-gold">
                Free Consultation
              </p>
              <h3 className="mt-2 font-heading text-2xl text-white">
                Claim your free XERF consultation
              </h3>
              <p className="mt-2 text-sm font-light text-revival-cream/70">
                Tell us how to reach you - a member of our medical team will
                follow up to schedule your free consultation and Aura 3D
                Facial Analysis.
              </p>
            </div>
            <div className="px-3 pb-4 pt-3 sm:px-4" style={{ minHeight: 402 }}>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 402,
                  border: "none",
                  borderRadius: 12,
                  background: "#fff",
                }}
                id={`inline-${FORM_ID}`}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={FORM_NAME}
                data-height="402"
                data-layout-iframe-id={`inline-${FORM_ID}`}
                data-form-id={FORM_ID}
                title={FORM_NAME}
              />
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>,
    document.body,
  );
}
