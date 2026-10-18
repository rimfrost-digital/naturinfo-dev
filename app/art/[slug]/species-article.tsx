import Image from "next/image"
import Link from "next/link"
import { paragraphs } from "@/sanity/lib/species-page"
import type { PublicImage, SpeciesSection, SpeciesView } from "@/sanity/lib/types"

export function SpeciesArticle({ page }: { page: SpeciesView }) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12">
      {page.preview ? (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Förhandsvisning av utkast. Den publicerade sidan är oförändrad.{" "}
          <a className="underline" href={`/api/disable-draft?slug=${page.slug}`}>
            Visa publicerad sida
          </a>
        </p>
      ) : null}
      <header className="flex flex-col gap-2">
        <p className="text-sm text-zinc-500">
          <Link className="underline" href="/">
            Naturinfo
          </Link>
          {page.categoryTitle ? ` · ${page.categoryTitle}` : null}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1>
        {page.scientificName ? (
          <p className="text-lg italic text-zinc-600">{page.scientificName}</p>
        ) : null}
        <p className="text-sm uppercase tracking-wide text-zinc-500">{page.publishedLevel}</p>
      </header>
      {page.sections.map((section) => (
        <SectionView key={section.id} section={section} preview={page.preview} />
      ))}
    </main>
  )
}

function SectionView({
  section,
  preview,
}: {
  section: SpeciesSection
  preview: boolean
}) {
  if (section.gap) {
    return (
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{section.heading}</h2>
        <p className="text-zinc-600">Inte producerad ännu.</p>
      </section>
    )
  }

  switch (section.id) {
    case "hero":
      return section.image ? (
        <figure className="flex flex-col gap-2">
          <SpeciesImage image={section.image} priority />
          {section.image.caption ? <figcaption>{section.image.caption}</figcaption> : null}
          {section.image.credit ? (
            <figcaption className="text-sm text-zinc-500">{section.image.credit}</figcaption>
          ) : null}
        </figure>
      ) : null
    case "introduction":
      return (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {paragraphs(section.body).map((paragraph) => (
            <p key={paragraph} className="text-lg leading-8">
              {paragraph}
            </p>
          ))}
          {section.quote ? (
            <blockquote className="border-l-2 border-zinc-300 pl-4 text-xl italic">
              {section.quote}
            </blockquote>
          ) : null}
        </section>
      )
    case "quick_facts":
      return (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          <dl className="grid gap-3">
            {section.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[10rem_1fr] gap-3">
                <dt className="font-medium">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )
    case "deep_dive":
      return (
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {section.cards.map((card) => (
            <article key={card.heading || card.body} className="flex flex-col gap-3">
              {card.image ? <SpeciesImage image={card.image} /> : null}
              {card.heading ? <h3 className="text-xl font-semibold">{card.heading}</h3> : null}
              {paragraphs(card.body).map((paragraph) => (
                <p key={paragraph} className="leading-7">
                  {paragraph}
                </p>
              ))}
              {card.caption ? <p className="text-sm text-zinc-600">{card.caption}</p> : null}
            </article>
          ))}
        </section>
      )
    case "gallery":
    case "local_gallery":
      return (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          <ul className="grid gap-4">
            {section.images.map((image) => (
              <li key={image.url}>
                <figure className="flex flex-col gap-2">
                  <SpeciesImage image={image} />
                  {image.caption ? <figcaption className="text-sm">{image.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )
    case "video":
      return (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {section.videos.map((video) => (
            <figure key={video.url} className="flex flex-col gap-2">
              <video className="w-full" controls preload="metadata" src={video.url} />
              {video.title ? <figcaption>{video.title}</figcaption> : null}
            </figure>
          ))}
        </section>
      )
    case "documentary":
      return (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {section.audioUrl ? <audio controls preload="metadata" src={section.audioUrl} /> : null}
          {section.script
            ? paragraphs(section.script).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            : null}
          {preview && section.scriptMissing ? (
            <p className="text-sm text-zinc-600">Manus eller transkript saknas.</p>
          ) : null}
        </section>
      )
    case "species_sound":
      return (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {section.label ? <p>{section.label}</p> : null}
          {section.audioUrl ? <audio controls preload="metadata" src={section.audioUrl} /> : null}
        </section>
      )
    case "ask_species":
      return (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          {section.title && section.title !== section.heading ? (
            <p className="text-lg font-medium">{section.title}</p>
          ) : null}
          {section.intro ? <p className="leading-7">{section.intro}</p> : null}
          {section.questions.length ? (
            <ul className="list-disc pl-5">
              {section.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          ) : null}
        </section>
      )
  }
}

function SpeciesImage({ image, priority = false }: { image: PublicImage; priority?: boolean }) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      className="h-auto w-full rounded-md"
    />
  )
}
