"use client";

import { useEffect } from "react";

/**
 * Lazy-loads the vanilla accessibility toolbar (public/accessibility/*)
 * after the page has finished its initial paint. The toolbar renders its
 * own DOM, so this component intentionally returns null.
 */
export default function AccessibilityToolbarLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Guard against React Strict Mode / route changes double-mounting.
    // The script itself is also idempotent via window.__revivalA11yLoaded.
    const CSS_ID = "revival-a11y-css";
    const JS_ID = "revival-a11y-js";

    const mount = () => {
      if (!document.getElementById(CSS_ID)) {
        const link = document.createElement("link");
        link.id = CSS_ID;
        link.rel = "stylesheet";
        link.href = "/accessibility/toolbar.css";
        document.head.appendChild(link);
      }
      if (!document.getElementById(JS_ID)) {
        const script = document.createElement("script");
        script.id = JS_ID;
        script.src = "/accessibility/toolbar.js";
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    // Wait for the page to be idle so the toolbar never competes with LCP.
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
    if (typeof idle === "function") {
      idle(mount);
    } else {
      window.setTimeout(mount, 1200);
    }
  }, []);

  return null;
}
