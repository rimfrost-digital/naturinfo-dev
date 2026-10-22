import Link from "next/link"
import { ArrowLeft, Beef, Leaf, MapPin, Moon, PawPrint, Ruler, Scale } from "lucide-react"
import { AskSpeciesDemo } from "@/components/ask-species-demo"
import { DeferredVideo } from "@/components/deferred-video"
import { GuideAudioPlayer } from "@/components/guide-audio-player"
import { SpeciesImage } from "@/components/species-image"
import { SpeciesSoundButton } from "@/components/species-sound-button"
import { contentLevelLabel } from "@/lib/content-level-label"
import { paragraphs } from "@/sanity/lib/species-page"
import type { PublicImage, SpeciesSection, SpeciesView } from "@/sanity/lib/types"

const contentImageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
const galleryImageSizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
const factIcons = [Scale, Beef, PawPrint, MapPin, Ruler, Leaf, Moon]

export function SpeciesArticle({ page }: { page: SpeciesView }) {
  const heroImage = page.sections.find(
    (section): section is Extract<SpeciesSection, { id: "hero" }> =>
      section.id === "hero" && !section.gap && Boolean(section.image),
  )?.image
  const facts =
    page.sections.find(
      (section): section is Extract<SpeciesSection, { id: "quick_facts" }> =>
        section.id === "quick_facts" && !section.gap,
    )?.facts ?? []
  const cards =
    page.sections
      .find(
        (section): section is Extract<SpeciesSection, { id: "deep_dive" }> =>
          section.id === "deep_dive" && !section.gap,
      )
      ?.cards.map((card) => ({ label: card.heading, value: card.body })) ?? []

  return (
    <article className="bg-paper">
      {page.preview ? <PreviewBanner slug={page.slug} /> : null}
      {page.sections.map((section) => (
        <SectionView
          key={section.id}
          section={section}
          preview={page.preview}
          page={page}
          heroImage={heroImage ?? null}
          facts={facts}
          cards={cards}
        />
      ))}
      <section className="bg-forest">
        <div className="mx-auto flex max-w-6xl justify-center px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/artsida"
            className="rounded-full border border-paper px-8 py-3 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-paper hover:text-forest"
          >
            Alla arter
          </Link>
        </div>
      </section>
    </article>
  )
}

function PreviewBanner({ slug }: { slug: string }) {
  return (
    <p className="bg-brass/15 px-5 py-3 text-center text-sm text-ink">
      Förhandsvisning av utkast. Den publicerade sidan är oförändrad.{" "}
      <a className="underline" href={`/api/disable-draft?slug=${slug}`}>
        Visa publicerad sida
      </a>
    </p>
  )
}

function SectionView({
  section,
  preview,
  page,
  heroImage,
  facts,
  cards,
}: {
  section: SpeciesSection
  preview: boolean
  page: SpeciesView
  heroImage: PublicImage | null
  facts: { label: string; value: string }[]
  cards: { label: string; value: string }[]
}) {
  if (section.gap) {
    if (!preview) return null
    return (
      <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <h2 className="font-serif text-3xl font-semibold text-forest">{section.heading}</h2>
        <p className="mt-2 text-sm text-moss">Inte producerad ännu.</p>
      </section>
    )
  }

  switch (section.id) {
    case "hero":
      return section.image ? <Hero page={page} image={section.image} label={section.heading} /> : null
    case "introduction":
      return (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
            <h2 className="max-w-3xl font-serif text-4xl font-semibold text-balance text-forest sm:text-5xl">
              {section.heading}
            </h2>
            {paragraphs(section.body).map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-3xl leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
            {section.quote ? (
              <blockquote className="mt-8 max-w-3xl border-l-4 border-brass pl-6">
                <p className="font-serif text-lg italic leading-relaxed text-moss">
                  &ldquo;{section.quote}&rdquo;
                </p>
              </blockquote>
            ) : null}
          </div>
        </section>
      )
    case "quick_facts":
      return (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-forest">{section.heading}</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {section.facts.map((fact, index) => {
                const Icon = factIcons[index % factIcons.length]
                return (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-3 rounded-2xl border border-moss/40 bg-transparent p-5"
                  >
                    <Icon className="h-7 w-7 text-moss" strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium tracking-[0.15em] text-moss uppercase">{fact.label}</p>
                      <p className="mt-1 font-serif text-lg font-medium leading-snug text-ink">{fact.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )
    case "deep_dive":
      return (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="mb-8 font-serif text-4xl font-semibold text-forest sm:text-5xl">{section.heading}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((card, index) => (
                <article key={`${card.heading}-${index}`} className="flex flex-col">
                  {card.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <SpeciesImage
                        image={card.image}
                        fill
                        sizes={contentImageSizes}
                        quality={70}
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  {card.heading ? (
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-forest">{card.heading}</h3>
                  ) : null}
                  {paragraphs(card.body).map((paragraph) => (
                    <p key={paragraph} className="mt-3 leading-relaxed text-ink">
                      {paragraph}
                    </p>
                  ))}
                  {card.caption ? (
                    <p className="mt-3 text-sm italic leading-relaxed text-moss">{card.caption}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      )
    case "gallery":
    case "local_gallery":
      return (
        <section className="bg-forest-deep">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="mb-8 font-serif text-4xl font-semibold text-paper">{section.heading}</h2>
            <Gallery images={section.images} />
          </div>
        </section>
      )
    case "video":
      return (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="mb-8 font-serif text-4xl font-semibold text-forest">{section.heading}</h2>
            <div className="grid gap-8">
              {section.videos.map((video) => (
                <figure key={video.url}>
                  <DeferredVideo src={video.url} title={video.title} poster={video.poster} />
                  {video.title ? (
                    <figcaption className="mt-3 text-sm text-moss">{video.title}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )
    case "documentary":
      return (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-forest">{section.heading}</h2>
            {section.audioUrl ? <GuideAudioPlayer src={section.audioUrl} title={section.heading} /> : null}
            {section.script
              ? paragraphs(section.script).map((paragraph) => (
                  <p key={paragraph} className="mt-6 max-w-3xl leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))
              : null}
            {preview && section.scriptMissing ? (
              <p className="mt-4 text-sm text-moss">Manus eller transkript saknas.</p>
            ) : null}
          </div>
        </section>
      )
    case "species_sound":
      return (
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-forest">{section.heading}</h2>
            {section.audioUrl ? (
              <SpeciesSoundButton src={section.audioUrl} label={section.label ?? section.heading} />
            ) : null}
          </div>
        </section>
      )
    case "ask_species":
      return (
        <AskSpeciesDemo
          title={section.title || section.heading}
          intro={section.intro}
          questions={section.questions}
          speciesName={page.title}
          avatar={heroImage}
          facts={facts}
          cards={cards}
        />
      )
  }
}

function Hero({ page, image, label }: { page: SpeciesView; image: PublicImage; label: string }) {
  return (
    <section aria-label={label}>
      <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl px-5 py-5 sm:px-8">
          <Link
            href="/artsida"
            className="flex items-center gap-2 rounded-full bg-forest-deep/30 px-4 py-2 text-sm font-medium text-paper backdrop-blur-md transition-colors hover:bg-forest-deep/50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alla arter
          </Link>
        </div>
      </div>
      <SpeciesImage
        image={image}
        fill
        priority
        fetchPriority="high"
        quality={72}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {page.categoryTitle ? (
              <span className="inline-block rounded-md bg-brass px-3 py-1 text-xs font-semibold tracking-[0.18em] text-forest-deep uppercase">
                {page.categoryTitle}
              </span>
            ) : null}
            <span className="inline-block rounded-md border border-paper/80 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper">
              {contentLevelLabel(page.publishedLevel)}
            </span>
          </div>
          <h1 className="mt-4 font-serif text-6xl font-semibold leading-none text-paper sm:text-7xl md:text-8xl">
            {page.title}
          </h1>
          {page.scientificName ? (
            <p className="mt-2 font-sans text-xl text-brass italic sm:text-2xl">{page.scientificName}</p>
          ) : null}
        </div>
      </div>
      </div>
      {image.caption || image.credit ? (
        <p className="mx-auto max-w-6xl px-5 pt-4 text-sm text-moss sm:px-8">
          {[image.caption, image.credit].filter(Boolean).join(" ")}
        </p>
      ) : null}
    </section>
  )
}

function Gallery({ images }: { images: PublicImage[] }) {
  return (
    <ul className="columns-2 gap-4 lg:columns-3">
      {images.map((image, index) => (
        <li key={`${image.url}-${index}`} className="mb-4 break-inside-avoid">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <SpeciesImage image={image} fill sizes={galleryImageSizes} quality={70} className="object-cover" />
          </div>
          {image.caption || image.credit ? (
            <p className="px-1 py-3 text-sm leading-relaxed text-paper/75">
              {[image.caption, image.credit].filter(Boolean).join(" ")}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
