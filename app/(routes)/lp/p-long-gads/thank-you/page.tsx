import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import ThankYouContent from "@/components/lp/ThankYouContent";
import MapSection from "@/components/layout/MapSection";

const PHONE = "(725) 334-7214";
const ADS_ID = "AW-18297295288";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description: "Thank you for requesting your free P-Long\u00ae consultation.",
  path: "/lp/p-long-gads/thank-you/",
  noIndex: true,
});

export default function PLongGadsThankYouPage() {
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
      {/* Event snippet for ED Submit lead form conversion - fires on load since
          reaching this page means the lead form was just submitted. */}
      <Script id="gtag-lead-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
              'send_to': '${ADS_ID}/HBbtCLKwo8ocELij6pRE',
              'value': 1.0,
              'currency': 'USD'
          });
        `}
      </Script>
      <LPHeader phone={PHONE} trackCallConversion />
      <ThankYouContent phone={PHONE} trackCallConversion />
      <MapSection hidePhone />
      <LPFooter phone={PHONE} trackCallConversion />
    </>
  );
}
