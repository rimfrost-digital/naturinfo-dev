"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { SpeciesImage } from "@/components/species-image"
import type { PublicImage } from "@/sanity/lib/types"

const galleryImageSizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"

export type SpeciesGalleryLabels = {
  enlarge: string
  enlarged: string
  close: string
  previous: string
  next: string
  previousImage: string
  nextImage: string
}

const swedishGalleryLabels: SpeciesGalleryLabels = {
  enlarge: "Förstora",
  enlarged: "Förstorad bild",
  close: "Stäng",
  previous: "Föregående",
  next: "Nästa",
  previousImage: "Föregående bild",
  nextImage: "Nästa bild",
}

export function SpeciesGallery({
  images,
  enlargeable = false,
  labels = null,
}: {
  images: PublicImage[]
  enlargeable?: boolean
  labels?: SpeciesGalleryLabels | null
}) {
  const chrome = labels ?? swedishGalleryLabels
  const [active, setActive] = useState<number | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  function openAt(index: number, trigger: HTMLElement) {
    returnFocus.current = trigger
    setActive(index)
  }

  const close = useCallback(() => {
    setActive(null)
    returnFocus.current?.focus()
    returnFocus.current = null
  }, [])

  return (
    <>
      <ul className="columns-2 gap-4 lg:columns-3">
        {images.map((image, index) => (
          <li key={`${image.url}-${index}`} className="mb-4 break-inside-avoid">
            {enlargeable ? (
              <button
                type="button"
                className="group block w-full cursor-pointer rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                aria-label={
                  image.alt
                    ? `${chrome.enlarge}: ${image.alt}`
                    : labels
                      ? chrome.enlarge
                      : "Förstora bilden"
                }
                onClick={(event) => openAt(index, event.currentTarget)}
              >
                <GalleryFrame image={image} enlargeable />
              </button>
            ) : (
              <GalleryFrame image={image} />
            )}
            {image.caption || image.credit ? (
              <p className="px-1 py-3 text-sm leading-relaxed text-paper/75">
                {[image.caption, image.credit].filter(Boolean).join(" ")}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      {enlargeable && active !== null ? (
        <GalleryLightbox
          images={images}
          index={active}
          labels={chrome}
          onIndex={setActive}
          onClose={close}
        />
      ) : null}
    </>
  )
}

function GalleryFrame({ image, enlargeable = false }: { image: PublicImage; enlargeable?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <SpeciesImage
        image={image}
        fill
        sizes={galleryImageSizes}
        quality={70}
        className={`object-cover${enlargeable ? " transition-transform duration-500 group-hover:scale-105" : ""}`}
      />
    </div>
  )
}

function GalleryLightbox({
  images,
  index,
  labels,
  onIndex,
  onClose,
}: {
  images: PublicImage[]
  index: number
  labels: SpeciesGalleryLabels
  onIndex: (index: number) => void
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const indexRef = useRef(index)
  const image = images[index]
  const multiple = images.length > 1

  useEffect(() => {
    indexRef.current = index
  }, [index])

  function step(direction: -1 | 1) {
    onIndex((indexRef.current + direction + images.length) % images.length)
  }

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (!multiple) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        onIndex((indexRef.current + images.length - 1) % images.length)
        return
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        onIndex((indexRef.current + 1) % images.length)
        return
      }
      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button")
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [images.length, multiple, onClose, onIndex])

  if (!image) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt ? `${labels.enlarged}: ${image.alt}` : labels.enlarged}
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-forest-deep/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        aria-label={labels.close}
        onClick={onClose}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <figure
        className="flex max-h-full w-full max-w-5xl touch-pan-y flex-col items-center"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("button")) return
          swipe.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          const start = swipe.current
          swipe.current = null
          if (!start || !multiple) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
          step(dx < 0 ? 1 : -1)
        }}
      >
        <div className="relative h-[min(60vh,780px,calc(100dvh-10rem))] w-full">
          <SpeciesImage
            key={image.url}
            image={image}
            fill
            sizes="100vw"
            quality={75}
            className="object-contain"
          />
        </div>
        {image.caption || image.credit ? (
          <figcaption className="mt-3 max-h-24 w-full overflow-y-auto text-center text-sm leading-relaxed text-paper/80">
            {image.caption ? <p>{image.caption}</p> : null}
            {image.credit ? <p className={image.caption ? "mt-1 text-paper/60" : undefined}>{image.credit}</p> : null}
          </figcaption>
        ) : null}
        {multiple ? (
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-full bg-paper/15 px-4 text-sm font-medium text-paper transition-colors hover:bg-paper/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              aria-label={labels.previousImage}
              onClick={() => step(-1)}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              {labels.previous}
            </button>
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-full bg-paper/15 px-4 text-sm font-medium text-paper transition-colors hover:bg-paper/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              aria-label={labels.nextImage}
              onClick={() => step(1)}
            >
              {labels.next}
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </figure>
    </div>,
    document.body,
  )
}
