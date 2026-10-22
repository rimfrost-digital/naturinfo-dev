import { cacheLife, cacheTag } from "next/cache"
import { draftMode } from "next/headers"
import {
  levelAllowsSection,
  SECTION_CMS_NAME,
  SECTION_IDS,
  type ContentLevel,
  type SectionId,
} from "./content-model"
import { speciesPageQuery } from "./queries"
import { serverClient } from "./server-client"
import type {
  LocaleValue,
  PublicImage,
  SpeciesAssetResult,
  SpeciesQueryResult,
  SpeciesSection,
  SpeciesView,
} from "./types"

const LEVELS = new Set<ContentLevel>(["core", "rich", "full"])

function swedish(value: LocaleValue | null | undefined): string {
  return value?.sv?.trim() ?? ""
}

function paragraphs(value: string): string[] {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value)
}

function assetMap(assets: SpeciesAssetResult[] | null): Map<string, SpeciesAssetResult> {
  const map = new Map<string, SpeciesAssetResult>()
  for (const asset of assets ?? []) {
    if (asset.key && asset.workflow === "public") {
      map.set(asset.key, asset)
    }
  }
  return map
}

function publicImage(
  assets: Map<string, SpeciesAssetResult>,
  key: string | null | undefined,
  captionOverride?: string | null,
): PublicImage | null {
  if (!key) return null
  const asset = assets.get(key)
  if (!asset?.imageUrl || asset.kind !== "image") return null
  const width = asset.imageWidth ?? 1600
  const height = asset.imageHeight ?? 1067
  return {
    url: asset.imageUrl,
    alt: swedish(asset.alt),
    caption: captionOverride?.trim() || swedish(asset.caption) || null,
    credit: asset.showCredit ? swedish(asset.credit) || null : null,
    width,
    height,
  }
}

function publicFile(
  assets: Map<string, SpeciesAssetResult>,
  key: string | null | undefined,
): string | null {
  if (!key) return null
  const asset = assets.get(key)
  return asset?.fileUrl ?? null
}

function videoStill(asset: SpeciesAssetResult | undefined): PublicImage | null {
  if (!asset?.imageUrl || asset.kind === "image") return null
  return {
    url: asset.imageUrl,
    alt: swedish(asset.alt),
    caption: swedish(asset.caption) || null,
    credit: asset.showCredit ? swedish(asset.credit) || null : null,
    width: asset.imageWidth ?? 1600,
    height: asset.imageHeight ?? 900,
  }
}

/**
 * Poster for a species video. Use a still already stored on the video asset
 * when one exists. Otherwise use an existing species image: hero, card,
 * gallery, then deep dive. Do not request the video file to create a frame.
 */
function speciesVideoPoster(
  species: SpeciesQueryResult,
  assets: Map<string, SpeciesAssetResult>,
  videoAsset: SpeciesAssetResult | undefined,
): PublicImage | null {
  const galleryKey = species.gallery?.find((item) => item.assetKey)?.assetKey
  const deepDiveKey = species.deepDive?.find((card) => card.imageKey)?.imageKey
  return (
    videoStill(videoAsset) ??
    publicImage(assets, species.hero) ??
    publicImage(assets, species.cardImage) ??
    publicImage(assets, galleryKey) ??
    publicImage(assets, deepDiveKey)
  )
}

function heading(
  sectionId: SectionId,
  publicHeading: LocaleValue | null,
): string {
  return swedish(publicHeading) || SECTION_CMS_NAME[sectionId]
}

export function toSpeciesView(
  species: SpeciesQueryResult,
  preview: boolean,
): SpeciesView | null {
  if (!species.slug || !LEVELS.has(species.publishedLevel)) return null

  const assets = assetMap(species.assets)
  const settings = new Map(
    (species.sectionSettings ?? [])
      .filter((setting) => setting.sectionId && isSectionId(setting.sectionId))
      .map((setting) => [setting.sectionId, setting]),
  )
  const order = [
    ...(species.sectionSettings ?? [])
      .map((setting) => setting.sectionId)
      .filter(isSectionId),
    ...SECTION_IDS.filter((sectionId) => !settings.has(sectionId)),
  ]

  const sections: SpeciesSection[] = []
  for (const sectionId of order) {
    const setting = settings.get(sectionId)
    const relevance = setting?.relevance ?? "not_produced"
    const hidden = setting?.hidden === true
    if (hidden || relevance === "not_relevant") continue
    const allowed = levelAllowsSection(species.publishedLevel, sectionId)
    if (!preview && !allowed) continue
    const showGap = preview && (relevance === "not_produced" || !allowed)
    if (relevance !== "produced" && !showGap) continue
    const sectionHeading = heading(sectionId, setting?.publicHeading ?? null)
    const section = buildSection(sectionId, sectionHeading, species, assets, showGap && relevance !== "produced")
    if (section) sections.push(section)
  }

  return {
    slug: species.slug,
    title: swedish(species.commonName) || species.slug,
    scientificName: species.scientificName?.trim() || null,
    categoryTitle: swedish(species.categoryTitle) || null,
    publishedLevel: species.publishedLevel,
    description: swedish(species.metaDescription) || null,
    preview,
    sections,
  }
}

function buildSection(
  sectionId: SectionId,
  sectionHeading: string,
  species: SpeciesQueryResult,
  assets: Map<string, SpeciesAssetResult>,
  gap: boolean,
): SpeciesSection | null {
  if (gap) {
    return emptyGap(sectionId, sectionHeading)
  }

  switch (sectionId) {
    case "hero": {
      const image = publicImage(assets, species.hero)
      return image ? { id: sectionId, heading: sectionHeading, image, gap: false } : null
    }
    case "introduction": {
      const body = swedish(species.introduction)
      const quote = swedish(species.quote) || null
      if (!body && !quote) return null
      return { id: sectionId, heading: sectionHeading, body, quote, gap: false }
    }
    case "quick_facts": {
      const facts = (species.quickFacts ?? [])
        .map((fact) => ({ label: swedish(fact.label), value: swedish(fact.value) }))
        .filter((fact) => fact.label && fact.value)
      return facts.length
        ? { id: sectionId, heading: sectionHeading, facts, gap: false }
        : null
    }
    case "deep_dive": {
      const cards = (species.deepDive ?? [])
        .map((card) => ({
          heading: swedish(card.heading),
          body: swedish(card.body),
          caption: swedish(card.caption) || null,
          image: publicImage(assets, card.imageKey, swedish(card.caption) || null),
        }))
        .filter((card) => card.heading || card.body || card.image)
      return cards.length
        ? { id: sectionId, heading: sectionHeading, cards, gap: false }
        : null
    }
    case "gallery":
    case "local_gallery": {
      const keys = (sectionId === "gallery" ? species.gallery : species.localGallery) ?? []
      const images = keys
        .map((item) => publicImage(assets, item.assetKey))
        .filter((image): image is PublicImage => image !== null)
      return images.length
        ? { id: sectionId, heading: sectionHeading, images, gap: false }
        : null
    }
    case "video": {
      const videos = [...(species.videos ?? [])]
        .sort((a, b) => Number(b.primary) - Number(a.primary))
        .map((video) => {
          const url = publicFile(assets, video.assetKey)
          if (!url) return null
          const videoAsset = video.assetKey ? assets.get(video.assetKey) : undefined
          return {
            url,
            title: swedish(video.title) || null,
            poster: speciesVideoPoster(species, assets, videoAsset),
          }
        })
        .filter((video): video is { url: string; title: string | null; poster: PublicImage | null } => video !== null)
      return videos.length
        ? { id: sectionId, heading: sectionHeading, videos, gap: false }
        : null
    }
    case "documentary": {
      const audioUrl = publicFile(assets, species.documentary?.audio?.sv)
      const script = swedish(species.documentary?.script) || null
      if (!audioUrl && !script) return null
      return {
        id: sectionId,
        heading: sectionHeading,
        audioUrl,
        script,
        scriptMissing: !script,
        gap: false,
      }
    }
    case "species_sound": {
      const audioUrl = publicFile(assets, species.speciesSound?.assetKey)
      if (!audioUrl) return null
      return {
        id: sectionId,
        heading: sectionHeading,
        label: swedish(species.speciesSound?.label) || null,
        audioUrl,
        gap: false,
      }
    }
    case "ask_species": {
      const title = swedish(species.ask?.title) || null
      const intro = swedish(species.ask?.intro) || null
      const questions = (species.ask?.presetQuestions ?? [])
        .map((item) => swedish(item.question))
        .filter(Boolean)
      if (!title && !intro && questions.length === 0) return null
      return { id: sectionId, heading: sectionHeading, title, intro, questions, gap: false }
    }
  }
}

function emptyGap(sectionId: SectionId, sectionHeading: string): SpeciesSection {
  switch (sectionId) {
    case "hero":
      return { id: sectionId, heading: sectionHeading, image: null, gap: true }
    case "introduction":
      return { id: sectionId, heading: sectionHeading, body: "", quote: null, gap: true }
    case "quick_facts":
      return { id: sectionId, heading: sectionHeading, facts: [], gap: true }
    case "deep_dive":
      return { id: sectionId, heading: sectionHeading, cards: [], gap: true }
    case "gallery":
    case "local_gallery":
      return { id: sectionId, heading: sectionHeading, images: [], gap: true }
    case "video":
      return { id: sectionId, heading: sectionHeading, videos: [], gap: true }
    case "documentary":
      return {
        id: sectionId,
        heading: sectionHeading,
        audioUrl: null,
        script: null,
        scriptMissing: true,
        gap: true,
      }
    case "species_sound":
      return { id: sectionId, heading: sectionHeading, label: null, audioUrl: null, gap: true }
    case "ask_species":
      return {
        id: sectionId,
        heading: sectionHeading,
        title: null,
        intro: null,
        questions: [],
        gap: true,
      }
  }
}

async function fetchSpecies(
  slug: string,
  perspective: "published" | "drafts",
): Promise<SpeciesQueryResult | null> {
  const result = await serverClient(perspective).fetch<SpeciesQueryResult | null>(
    speciesPageQuery,
    { slug },
  )
  return result
}

async function fetchPublishedSpecies(slug: string): Promise<SpeciesQueryResult | null> {
  "use cache"
  cacheLife("hours")
  cacheTag("species", `species:${slug}`)
  return fetchSpecies(slug, "published")
}

export async function loadSpeciesPage(slug: string): Promise<SpeciesView | null> {
  const preview = (await draftMode()).isEnabled
  const species = preview
    ? await fetchSpecies(slug, "drafts")
    : await fetchPublishedSpecies(slug)
  if (!species) return null
  return toSpeciesView(species, preview)
}

export { paragraphs }
