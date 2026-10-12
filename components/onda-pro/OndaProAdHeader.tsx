import Image from "next/image";

/** Logo-only chrome for the ONDA Pro ad landing page. Not linked. */
export default function OndaProAdHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-revival-gold/15 bg-revival-dark/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
        <span
          className="flex items-center gap-2.5"
          aria-label="Revival Health & Wellness"
        >
          <Image
            src="/images/brand/revival-logo-mobile.png"
            alt="Revival Health & Wellness"
            width={221}
            height={300}
            priority
            className="h-10 w-auto object-contain"
          />
        </span>
      </div>
    </header>
  );
}
