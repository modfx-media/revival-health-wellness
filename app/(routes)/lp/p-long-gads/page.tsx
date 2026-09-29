import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import PLongLanding from "@/components/lp/PLongLanding";

const PHONE = "(702) 903-1168";
const ADS_ID = "AW-18297295288";
const FORM_ID = "BrLJnySJNxjzMUWlSrsB";
const FORM_NAME = "🟢 Google Mens ED/ pshot/ gainswave Wellness 25-08-25";

// Ads-only landing page for Google Ads campaigns - intentionally excluded from
// app/sitemap.ts and marked noindex so it never competes with the organic
// /p-long/ service page in search.
export const metadata: Metadata = buildMetadata({
  title: "P-Long\u00ae Protocol: Free Consultation",
  description:
    "Increase length and girth by up to a full inch, no surgery, no fillers. The first clinically proven P-Long\u00ae protocol. Book your free, confidential consultation.",
  path: "/lp/p-long-gads/",
  noIndex: true,
});

export default function PLongGadsLandingPage() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
          gtag('config', '${ADS_ID}/fBeGCMamo8ocELij6pRE', {
            'phone_conversion_number': '${PHONE}'
          });
        `}
      </Script>
      {/* Event snippet for ED Click to call conversion */}
      <Script id="gtag-report-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': '${ADS_ID}/FRHdCMmmo8ocELij6pRE',
                'value': 10.0,
                'currency': 'USD',
                'event_callback': callback
            });
            return false;
          }
        `}
      </Script>
      <LPHeader phone={PHONE} trackCallConversion />
      <PLongLanding
        thankYouPath="/lp/p-long-gads/thank-you/"
        phone={PHONE}
        trackCallConversion
        formId={FORM_ID}
        formName={FORM_NAME}
      />
      <LPFooter phone={PHONE} trackCallConversion />
    </>
  );
}
