"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { SpeciesImage } from "@/components/species-image";
import type { PublicImage } from "@/sanity/lib/types";

export function DeferredVideo({
  src,
  title,
  poster,
  playLabel = "Spela upp video",
}: {
  src: string;
  title: string | null;
  poster: PublicImage | null;
  playLabel?: string;
}) {
  const [active, setActive] = useState(false);
  const label = title ? `${playLabel}: ${title}` : playLabel;

  if (!active) {
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        aria-label={label}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-forest-deep"
      >
        {poster ? (
          <SpeciesImage
            image={{ ...poster, alt: "" }}
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            quality={70}
            className="object-cover"
          />
        ) : null}
        <span className="absolute inset-0 bg-forest-deep/40 transition-colors group-hover:bg-forest-deep/25" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brass text-forest-deep shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </span>
        <span className="absolute bottom-4 left-4 rounded-md bg-forest-deep/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-paper">
          Video
        </span>
      </button>
    );
  }

  return (
    <video
      className="aspect-video w-full rounded-2xl bg-forest-deep object-cover"
      controls
      autoPlay
      playsInline
      preload="metadata"
      src={src}
      aria-label={title ?? "Video"}
    />
  );
}
