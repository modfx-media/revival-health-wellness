"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the vertical scroll offset and whether the page has scrolled past a
 * threshold (default 80px). Used to collapse the header into a sticky,
 * blurred bar on scroll.
 */
export function useScrollPosition(threshold = 80) {
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrolled(y > threshold);
      frame = 0;
    };

    const onScroll = () => {
      // Throttle to one update per animation frame.
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return { scrollY, scrolled };
}
