"use client";

import Script from "next/script";

/** Loads the third-party knock-knock chat widget site-wide, including all /lp/* landing pages. */
export default function ChatWidgetLoader() {
  return (
    <Script id="knock-knock-widget" strategy="afterInteractive">
      {`window.company_id = '6a44d224fb43c2761cd335f0';
var newScript = document.createElement('script');
newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
document.getElementsByTagName('HEAD')[0].appendChild(newScript);`}
    </Script>
  );
}
