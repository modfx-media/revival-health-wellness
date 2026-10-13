"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Wraps <main>. Ads landing pages (/lp/*) render their own minimal chrome
 * (see components/lp/LPHeader.tsx) instead of the fixed site <Header/>, so
 * they don't need the top padding reserved for it.
 */
export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/lp");

  return (
    <main
      className={cn(
        "flex-1",
        isLandingPage ? "bg-revival-cream" : "bg-revival-dark pt-[96px] xl:pt-[150px]",
      )}
    >
      {children}
    </main>
  );
}
