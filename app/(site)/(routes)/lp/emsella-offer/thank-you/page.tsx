import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import EmsellaThankYouContent from "@/components/lp/EmsellaThankYouContent";
import MapSection from "@/components/layout/MapSection";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "Thank You",
  description: "Thank you for requesting your free Emsella consultation.",
  path: "/lp/emsella-offer/thank-you/",
  noIndex: true,
});
  return cmsPageMetadata(fallback);
}

export default function EmsellaOfferThankYouPage() {
  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2318684221899070');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2318684221899070&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
      <Script id="meta-pixel-lead" strategy="afterInteractive">
        {`fbq('track', 'Lead');`}
      </Script>
      <LPHeader phone="+1 702-553-1754" />
      <EmsellaThankYouContent />
      <MapSection hidePhone />
      <LPFooter phone="+1 702-553-1754" />
    </>
  );
}
