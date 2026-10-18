export const LEVELS = ["core", "rich", "full"] as const

export type ContentLevel = (typeof LEVELS)[number]

export const SECTION_IDS = [
  "hero",
  "introduction",
  "quick_facts",
  "deep_dive",
  "gallery",
  "local_gallery",
  "video",
  "documentary",
  "species_sound",
  "ask_species",
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export const SECTION_CMS_NAME: Record<SectionId, string> = {
  hero: "Hero",
  introduction: "Introduktion",
  quick_facts: "Snabbfakta",
  deep_dive: "Fördjupning",
  gallery: "Bildgalleri",
  local_gallery: "Bilder från närområdet",
  video: "Video",
  documentary: "Lyssna på dokumentären",
  species_sound: "Artens ljud",
  ask_species: "Fråga djuret",
}

/** `any` is shown at every published level once the section is produced. */
export const SECTION_MIN_LEVEL: Record<SectionId, ContentLevel | "any"> = {
  hero: "core",
  introduction: "core",
  quick_facts: "core",
  deep_dive: "rich",
  gallery: "rich",
  local_gallery: "any",
  video: "rich",
  documentary: "full",
  species_sound: "full",
  ask_species: "full",
}

const LEVEL_RANK: Record<ContentLevel, number> = {
  core: 1,
  rich: 2,
  full: 3,
}

export function levelAllowsSection(
  publishedLevel: ContentLevel,
  sectionId: SectionId,
): boolean {
  const minimum = SECTION_MIN_LEVEL[sectionId]
  if (minimum === "any") return true
  return LEVEL_RANK[publishedLevel] >= LEVEL_RANK[minimum]
}

export const CATEGORY_IDS = [
  "mammals",
  "birds",
  "fish",
  "fungi",
  "trees",
  "plants_and_berries",
] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export const CATEGORY_TITLE_SV: Record<CategoryId, string> = {
  mammals: "Däggdjur",
  birds: "Fåglar",
  fish: "Fiskar",
  fungi: "Svampar",
  trees: "Träd",
  plants_and_berries: "Växter & Bär",
}

export const ASSET_WORKFLOWS = ["public", "hidden", "archive", "rejected"] as const

export const MODULE_RELEVANCE = ["produced", "not_produced", "not_relevant"] as const

export type ModuleRelevance = (typeof MODULE_RELEVANCE)[number]

export function categoryDocumentId(id: CategoryId): string {
  return `category.${id}`
}

export function speciesDocumentId(slug: string): string {
  return `species.${slug}`
}

export const ASK_SETTINGS_ID = "askSettings"
