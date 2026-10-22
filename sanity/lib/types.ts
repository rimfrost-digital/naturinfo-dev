import type { ContentLevel, ModuleRelevance, SectionId } from "./content-model"

export type LocaleValue = {
  sv?: string | null
  en?: string | null
  de?: string | null
}

export type SpeciesAssetResult = {
  key: string | null
  kind: string | null
  alt: LocaleValue | null
  caption: LocaleValue | null
  workflow: string | null
  showCredit: boolean | null
  credit: LocaleValue | null
  imageUrl: string | null
  imageWidth: number | null
  imageHeight: number | null
  fileUrl: string | null
}

export type SpeciesQueryResult = {
  slug: string
  scientificName: string | null
  publishedLevel: ContentLevel
  categoryTitle: LocaleValue | null
  commonName: LocaleValue | null
  metaDescription: LocaleValue | null
  introduction: LocaleValue | null
  quote: LocaleValue | null
  hero: string | null
  cardImage: string | null
  gallery: { assetKey: string | null }[] | null
  localGallery: { assetKey: string | null }[] | null
  videos: {
    assetKey: string | null
    title: LocaleValue | null
    primary: boolean | null
  }[] | null
  speciesSound: {
    assetKey: string | null
    label: LocaleValue | null
  } | null
  documentary: {
    script: LocaleValue | null
    audio: LocaleValue | null
  } | null
  quickFacts: { label: LocaleValue | null; value: LocaleValue | null }[] | null
  deepDive: {
    heading: LocaleValue | null
    body: LocaleValue | null
    caption: LocaleValue | null
    imageKey: string | null
  }[] | null
  ask: {
    title: LocaleValue | null
    intro: LocaleValue | null
    presetQuestions: { question: LocaleValue | null }[] | null
  } | null
  sectionSettings: {
    sectionId: SectionId
    publicHeading: LocaleValue | null
    relevance: ModuleRelevance | null
    hidden: boolean | null
  }[] | null
  assets: SpeciesAssetResult[] | null
}

export type PublicImage = {
  url: string
  alt: string
  caption: string | null
  credit: string | null
  width: number
  height: number
}

export type PublicMedia = {
  url: string
  title: string | null
  poster: PublicImage | null
}

export type SpeciesSection =
  | { id: "hero"; heading: string; image: PublicImage | null; gap: boolean }
  | {
      id: "introduction"
      heading: string
      body: string
      quote: string | null
      gap: boolean
    }
  | {
      id: "quick_facts"
      heading: string
      facts: { label: string; value: string }[]
      gap: boolean
    }
  | {
      id: "deep_dive"
      heading: string
      cards: {
        heading: string
        body: string
        caption: string | null
        image: PublicImage | null
      }[]
      gap: boolean
    }
  | { id: "gallery"; heading: string; images: PublicImage[]; gap: boolean }
  | { id: "local_gallery"; heading: string; images: PublicImage[]; gap: boolean }
  | { id: "video"; heading: string; videos: PublicMedia[]; gap: boolean }
  | {
      id: "documentary"
      heading: string
      audioUrl: string | null
      script: string | null
      scriptMissing: boolean
      gap: boolean
    }
  | {
      id: "species_sound"
      heading: string
      label: string | null
      audioUrl: string | null
      gap: boolean
    }
  | {
      id: "ask_species"
      heading: string
      title: string | null
      intro: string | null
      questions: string[]
      gap: boolean
    }

export type SpeciesView = {
  slug: string
  title: string
  scientificName: string | null
  categoryTitle: string | null
  publishedLevel: ContentLevel
  description: string | null
  preview: boolean
  sections: SpeciesSection[]
}
