"use client";

import Image, { type ImageLoaderProps } from "next/image";
import type { PublicImage } from "@/sanity/lib/types";

function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}

function imageLoader(src: string) {
  // Sanity CDN keeps the approved CDN loader. Local customer-preview files
  // are optimized by Next with the same width, quality, and format behaviour.
  return src.startsWith("/") ? undefined : sanityImageLoader;
}

type SpeciesImageProps = {
  image: PublicImage;
  sizes: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
  className?: string;
  fill?: boolean;
};

export function SpeciesImage({
  image,
  sizes,
  priority = false,
  fetchPriority,
  quality = 75,
  className,
  fill = false,
}: SpeciesImageProps) {
  const loader = imageLoader(image.url);

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={image.alt}
        fill
        {...(loader ? { loader } : {})}
        sizes={sizes}
        quality={quality}
        priority={priority}
        fetchPriority={fetchPriority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      {...(loader ? { loader } : {})}
      sizes={sizes}
      quality={quality}
      priority={priority}
      fetchPriority={fetchPriority}
      className={className}
    />
  );
}
