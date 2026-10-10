import Image from "next/image";

import { isLocalMediaURL } from "@/lib/cms/media-url";

export default function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src || isLocalMediaURL(src)) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-revival-charcoal via-revival-dark to-revival-gold/30"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
