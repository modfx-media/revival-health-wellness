"use client";

import { usePathname } from "next/navigation";
import { isAdLanding } from "@/lib/isAdLanding";
import { cn } from "@/lib/utils";

/**
 * Wraps <main>. Ads landing pages render their own minimal chrome instead of
 * the fixed site <Header/>, so they don't need the top padding reserved for it.
 */
export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = isAdLanding(pathname);

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
