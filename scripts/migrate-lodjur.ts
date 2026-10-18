/**
 * Migrates the Lodjur pilot, the six categories, and an empty askSettings
 * document. It does not migrate any other species.
 *
 * Dry-run is the default. Pass --write to publish to staging.
 * Production is refused unless both --dataset production and
 * --confirm write-production-dataset are present.
 *
 *   node --env-file=.env.local --experimental-strip-types scripts/migrate-lodjur.ts
 *   node --env-file=.env.local --experimental-strip-types scripts/migrate-lodjur.ts --write
 *   node --env-file=.env.local --experimental-strip-types scripts/migrate-lodjur.ts --write --preview-draft
 */
import { createReadStream } from "node:fs"
import { access } from "node:fs/promises"
import path from "node:path"
import { createClient, type SanityClient } from "@sanity/client"
import { species as archiveSpecies } from "../design/lib/species-data.ts"
import { speciesPagesData } from "../design/lib/species-pages-data.ts"
import {
  ASK_SETTINGS_ID,
  CATEGORY_IDS,
  CATEGORY_TITLE_SV,
  categoryDocumentId,
  speciesDocumentId,
  SECTION_IDS,
  type CategoryId,
  type ModuleRelevance,
  type SectionId,
} from "../sanity/lib/content-model.ts"

const LODJUR_SLUG = "lodjur"
const LEGACY_VARIANT_KEY = "lodjur-v2"
const PRODUCTION_CONFIRMATION = "write-production-dataset"
const ASSET_SOURCE_NAME = "naturinfo-design"
const SPECIES_SOUND_PATH = "/audio/what-does-the-lynx-say.mp3"
const SPECIES_SOUND_LABEL_SV = "Så här låter lodjuret"
const PREVIEW_DRAFT_SENTENCE =
  "[Utkast] Den här meningen finns bara i utkastet, så att förhandsvisning kan jämföras med den publicerade sidan."

type Lang = "sv" | "en" | "de"

type Locale<T> = Record<Lang, T>

type Page = {
  id: string
  scientificName: string
  category: Locale<string>
  names: Locale<string>
  meta: Locale<{ title: string; description: string }>
  quickFacts: Locale<{ label: string; value: string }[]>
  content: Locale<{
    heroSubtitle?: string
    intro: string
    quote?: string
    detailsGrid?: {
      heading: string
      body: string
      image: string
      alt: string
      caption: string
    }[]
  }>
  media: {
    heroImage: { url: string; alt: Locale<string> }
    detailImage?: { url: string; alt: Locale<string> }
    galleryImages: { src: string; alt: string; video?: string }[]
    audio: Locale<{ title: string; url: string }>
  }
  tracksSigns?: {
    items: {
      image: string
      alt: string
      label: Locale<string>
      description: Locale<string>
    }[]
  }
  interactive: Locale<{
    title: string
    intro: string
    presetQuestions: string[]
  }>
  chatSystemPrompt?: string
  avatarImage?: string
  chatAvatarAlt?: string
  relatedSpecies?: { slug: string }[]
}

type LocaleFields = { _type: "localeString" | "localeText"; sv: string; en: string; de: string }

type PlannedAsset = {
  key: string
  legacyPath: string
  kind: "image" | "video" | "documentary_audio" | "species_sound"
  alt: LocaleFields
  caption: LocaleFields
  tags: Set<string>
  workflow: "public" | "hidden"
  roles: Set<string>
  sanityId?: string
}

const pages = speciesPagesData as Record<string, Page>

const LABEL_TO_CATEGORY: Record<string, CategoryId> = {
  Däggdjur: "mammals",
  Fågel: "birds",
  Fåglar: "birds",
  Fisk: "fish",
  Fiskar: "fish",
  Svamp: "fungi",
  Svampar: "fungi",
  Träd: "trees",
  Växt: "plants_and_berries",
  Växter: "plants_and_berries",
  Bär: "plants_and_berries",
  "Växter & Bär": "plants_and_berries",
}

function log(message: string): void {
  console.log(`[lodjur] ${message}`)
}

function warn(message: string): void {
  console.warn(`[lodjur] warning: ${message}`)
}

function fail(message: string): never {
  console.error(`[lodjur] error: ${message}`)
  process.exit(1)
}

function readArgs(argv: string[]) {
  let dataset = "staging"
  let write = false
  let previewDraft = false
  let confirm = ""
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === "--write") write = true
    else if (arg === "--preview-draft") previewDraft = true
    else if (arg === "--dataset") {
      dataset = argv[index + 1] ?? ""
      index += 1
    } else if (arg === "--confirm") {
      confirm = argv[index + 1] ?? ""
      index += 1
    } else {
      fail(`Unknown argument: ${arg}`)
    }
  }
  return { dataset, write, previewDraft, confirm }
}

function assertDataset(dataset: string, confirm: string): void {
  if (dataset === "production") {
    if (confirm !== PRODUCTION_CONFIRMATION) {
      fail(
        `Refusing to target the production dataset. Re-run with --dataset production --confirm ${PRODUCTION_CONFIRMATION} if that is intentional.`,
      )
    }
    return
  }
  if (dataset !== "staging") {
    fail("The dataset must be staging, or production with an explicit confirmation.")
  }
}

function locale(
  type: LocaleFields["_type"],
  sv = "",
  en = "",
  de = "",
): LocaleFields {
  return { _type: type, sv, en, de }
}

function assetKey(legacyPath: string): string {
  const base = path.basename(legacyPath, path.extname(legacyPath))
  const folded = base
    .replaceAll("å", "a")
    .replaceAll("ä", "a")
    .replaceAll("ö", "o")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return folded || "asset"
}

function publicFile(legacyPath: string): string {
  return path.join(process.cwd(), "design", "public", legacyPath.replace(/^\//, ""))
}

async function fileExists(legacyPath: string): Promise<boolean> {
  try {
    await access(publicFile(legacyPath))
    return true
  } catch {
    return false
  }
}

function statusCode(error: unknown): number | undefined {
  if (typeof error === "object" && error && "statusCode" in error) {
    const code = (error as { statusCode?: number }).statusCode
    return typeof code === "number" ? code : undefined
  }
  return undefined
}

async function withRetry<T>(label: string, action: () => Promise<T>): Promise<T> {
  let lastError: unknown
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return await action()
    } catch (error) {
      lastError = error
      const code = statusCode(error)
      const retryable = code === undefined || code === 429 || code >= 500
      if (!retryable || attempt === 4) break
      const delay = 500 * 2 ** (attempt - 1)
      warn(`${label} failed (${code ?? "network"}). Retry ${attempt} in ${delay}ms.`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw lastError
}

function contentType(legacyPath: string): string | undefined {
  const types: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
  }
  return types[path.extname(legacyPath).toLowerCase()]
}

class AssetLibrary {
  private readonly byPath = new Map<string, PlannedAsset>()
  private readonly usedKeys = new Set<string>()

  add(input: {
    legacyPath: string
    kind: PlannedAsset["kind"]
    workflow: PlannedAsset["workflow"]
    role: string
    alt?: Partial<Record<Lang, string>>
    caption?: Partial<Record<Lang, string>>
    tags?: string[]
  }): string | null {
    if (!input.legacyPath) return null
    const existing = this.byPath.get(input.legacyPath)
    if (existing) {
      this.fillLocale(existing, input.alt, input.caption)
      for (const tag of input.tags ?? []) existing.tags.add(tag)
      existing.roles.add(input.role)
      if (input.workflow === "public") existing.workflow = "public"
      return existing.key
    }

    let key = assetKey(input.legacyPath)
    if (this.usedKeys.has(key)) {
      key = `${key}-${this.byPath.size + 1}`
    }
    this.usedKeys.add(key)
    const asset: PlannedAsset = {
      key,
      legacyPath: input.legacyPath,
      kind: input.kind,
      workflow: input.workflow,
      alt: locale("localeString", input.alt?.sv, input.alt?.en, input.alt?.de),
      caption: locale(
        "localeString",
        input.caption?.sv,
        input.caption?.en,
        input.caption?.de,
      ),
      tags: new Set(input.tags ?? []),
      roles: new Set([input.role]),
    }
    this.byPath.set(input.legacyPath, asset)
    return key
  }

  private fillLocale(
    asset: PlannedAsset,
    alt: Partial<Record<Lang, string>> | undefined,
    caption: Partial<Record<Lang, string>> | undefined,
  ) {
    this.fillOne(asset, asset.alt, alt)
    this.fillOne(asset, asset.caption, caption)
  }

  private fillOne(
    asset: PlannedAsset,
    target: LocaleFields,
    incoming: Partial<Record<Lang, string>> | undefined,
  ) {
    if (!incoming) return
    for (const lang of ["sv", "en", "de"] as const) {
      const next = incoming[lang]?.trim() ?? ""
      if (!next) continue
      if (!target[lang]) {
        target[lang] = next
        continue
      }
      if (target[lang] !== next) {
        warn(`${asset.legacyPath} already has different ${lang} text. Keeping the first version.`)
      }
    }
  }

  list(): PlannedAsset[] {
    return [...this.byPath.values()]
  }

  keyFor(legacyPath: string): string | null {
    return this.byPath.get(legacyPath)?.key ?? null
  }
}

function tagFromAlt(alt: string | undefined): string[] {
  const text = alt?.toLowerCase() ?? ""
  const tags: string[] = []
  if (text.includes("spår") || text.includes("spar")) tags.push("tracks")
  if (text.includes("spillning")) tags.push("droppings")
  if (text.includes("ung")) tags.push("life-stage")
  return tags
}

function zipLocaleRows<T>(
  rows: Locale<T[]>,
  mapRow: (row: { sv?: T; en?: T; de?: T }, index: number) => Record<string, unknown>,
): Record<string, unknown>[] {
  const count = Math.max(rows.sv.length, rows.en.length, rows.de.length)
  return Array.from({ length: count }, (_, index) =>
    mapRow({ sv: rows.sv[index], en: rows.en[index], de: rows.de[index] }, index),
  )
}

function categoryDocuments(): Record<string, unknown>[] {
  const translations = new Map<CategoryId, { en: Set<string>; de: Set<string> }>()
  for (const id of CATEGORY_IDS) {
    translations.set(id, { en: new Set(), de: new Set() })
  }
  for (const page of Object.values(pages)) {
    const id = LABEL_TO_CATEGORY[page.category.sv]
    if (!id) {
      warn(`Unmapped category label "${page.category.sv}" on ${page.id}.`)
      continue
    }
    const bucket = translations.get(id)
    if (!bucket) continue
    if (page.category.en.trim()) bucket.en.add(page.category.en.trim())
    if (page.category.de.trim()) bucket.de.add(page.category.de.trim())
  }

  return CATEGORY_IDS.map((id, index) => {
    const bucket = translations.get(id)!
    const en = bucket.en.size === 1 ? [...bucket.en][0] : ""
    const de = bucket.de.size === 1 ? [...bucket.de][0] : ""
    if (bucket.en.size > 1) warn(`Category ${id} has conflicting English labels. Leaving English empty.`)
    if (bucket.de.size > 1) warn(`Category ${id} has conflicting German labels. Leaving German empty.`)
    return {
      _id: categoryDocumentId(id),
      _type: "category",
      id,
      title: locale("localeString", CATEGORY_TITLE_SV[id], en, de),
      sortOrder: index + 1,
    }
  })
}

function sourceNotes(master: Page, variant: Page | undefined): string {
  const lines = [
    "Importerad från design/lib/species-pages-data.ts (lodjur) och design/lib/species-data.ts (kortbild).",
    "Engelsk och tysk text är migrerad, inte granskad eller godkänd.",
    "Dokumentär: ljudfilen finns. Manus eller transkript saknas.",
    "Bilder från närområdet är not_produced. Ingen verifierad lokal bild.",
    "Relaterade slugs ligger i legacyRelatedSlugs och är inte referenser ännu.",
  ]
  const subtitle = master.content.sv.heroSubtitle?.trim()
  if (subtitle) {
    lines.push(`Hero-underrubrik sv: ${subtitle}`)
    const en = master.content.en.heroSubtitle?.trim()
    const de = master.content.de.heroSubtitle?.trim()
    if (en) lines.push(`Hero-underrubrik en: ${en}`)
    if (de) lines.push(`Hero-underrubrik de: ${de}`)
  }
  if (variant) {
    lines.push(
      "lodjur-v2 är sparad som legacyVariants. Skillnader i texten skriver inte över mastern.",
    )
    const masterFacts = new Map(master.quickFacts.sv.map((fact) => [fact.label, fact.value]))
    const onlyInVariant = variant.quickFacts.sv
      .filter((fact) => !masterFacts.has(fact.label) || masterFacts.get(fact.label) !== fact.value)
      .map((fact) => fact.label)
    if (onlyInVariant.length) {
      lines.push(`Snabbfakta som skiljer sig eller bara finns i lodjur-v2: ${onlyInVariant.join(", ")}.`)
    }
  }
  lines.push("Bilder utan publik roll: /images/lynx-paw-snow.png, /images/lynx-face.png.")
  return lines.join("\n")
}

function legacyVariant(variant: Page) {
  return {
    _key: LEGACY_VARIANT_KEY,
    _type: "legacyVariant",
    variantKey: LEGACY_VARIANT_KEY,
    commonName: locale("localeString", variant.names.sv, variant.names.en, variant.names.de),
    introduction: locale(
      "localeText",
      variant.content.sv.intro,
      variant.content.en.intro,
      variant.content.de.intro,
    ),
    quote: locale(
      "localeText",
      variant.content.sv.quote,
      variant.content.en.quote,
      variant.content.de.quote,
    ),
    metaDescription: locale(
      "localeText",
      variant.meta.sv.description,
      variant.meta.en.description,
      variant.meta.de.description,
    ),
    heroSubtitle: locale(
      "localeString",
      variant.content.sv.heroSubtitle,
      variant.content.en.heroSubtitle,
      variant.content.de.heroSubtitle,
    ),
    quickFacts: zipLocaleRows(variant.quickFacts, (row, index) => ({
      _key: `legacy-fact-${index + 1}`,
      _type: "legacyQuickFact",
      label: locale("localeString", row.sv?.label, row.en?.label, row.de?.label),
      value: locale("localeString", row.sv?.value, row.en?.value, row.de?.value),
    })),
    legacyPrompt: variant.chatSystemPrompt ?? "",
    legacyRelatedSlugs: (variant.relatedSpecies ?? []).map((item) => item.slug),
  }
}

function sectionSetting(sectionId: SectionId, relevance: ModuleRelevance) {
  return {
    _key: sectionId,
    _type: "sectionSetting",
    sectionId,
    relevance,
    hidden: false,
  }
}

async function buildSpecies(library: AssetLibrary) {
  const master = pages[LODJUR_SLUG]
  const variant = pages[LEGACY_VARIANT_KEY]
  if (!master) fail("Lodjur is missing from the prototype data.")

  const heroKey = library.add({
    legacyPath: master.media.heroImage.url,
    kind: "image",
    workflow: "public",
    role: "hero",
    alt: master.media.heroImage.alt,
  })

  const details = master.content.sv.detailsGrid ?? []
  const deepDive = details.map((card, index) => {
    const en = master.content.en.detailsGrid?.[index]
    const de = master.content.de.detailsGrid?.[index]
    if (en?.image && en.image !== card.image) {
      warn(`Deep-dive image ${index + 1} differs in English. Using the Swedish image.`)
    }
    if (de?.image && de.image !== card.image) {
      warn(`Deep-dive image ${index + 1} differs in German. Using the Swedish image.`)
    }
    const imageKey = library.add({
      legacyPath: card.image,
      kind: "image",
      workflow: "public",
      role: "deep-dive",
      alt: { sv: card.alt, en: en?.alt, de: de?.alt },
      caption: { sv: card.caption, en: en?.caption, de: de?.caption },
    })
    return {
      _key: `deep-dive-${index + 1}`,
      _type: "deepDiveCard",
      heading: locale("localeString", card.heading, en?.heading, de?.heading),
      body: locale("localeText", card.body, en?.body, de?.body),
      caption: locale("localeString", card.caption, en?.caption, de?.caption),
      imageKey,
    }
  })

  const gallery: { _key: string; _type: "galleryItem"; assetKey: string }[] = []
  let videoKey: string | null = null
  for (const item of master.media.galleryImages) {
    if (item.video) {
      videoKey = library.add({
        legacyPath: item.video,
        kind: "video",
        workflow: "public",
        role: "video",
      })
      continue
    }
    const key = library.add({
      legacyPath: item.src,
      kind: "image",
      workflow: "public",
      role: "gallery",
      alt: { sv: item.alt },
    })
    if (key) gallery.push({ _key: key, _type: "galleryItem", assetKey: key })
  }

  for (const [index, item] of (master.tracksSigns?.items ?? []).entries()) {
    const tag = item.label.sv.toLowerCase().includes("spill") ? "droppings" : "tracks"
    const imageKey = library.add({
      legacyPath: item.image,
      kind: "image",
      workflow: "public",
      role: "tracks",
      alt: { sv: item.alt },
      tags: [tag],
    })
    deepDive.push({
      _key: `tracks-${index + 1}`,
      _type: "deepDiveCard",
      heading: locale("localeString", item.label.sv, item.label.en, item.label.de),
      body: locale("localeText", item.description.sv, item.description.en, item.description.de),
      caption: locale("localeString"),
      imageKey,
    })
  }

  const card = archiveSpecies.find((item) => item.slug === LODJUR_SLUG)
  let cardKey: string | null = null
  if (card?.image && card.image !== master.media.heroImage.url) {
    cardKey = library.add({
      legacyPath: card.image,
      kind: "image",
      workflow: "public",
      role: "card",
    })
  }

  if (master.media.detailImage?.url) {
    library.add({
      legacyPath: master.media.detailImage.url,
      kind: "image",
      workflow: "public",
      role: "unassigned",
      alt: master.media.detailImage.alt,
    })
  }
  if (master.avatarImage) {
    library.add({
      legacyPath: master.avatarImage,
      kind: "image",
      workflow: "public",
      role: "unassigned",
      alt: { sv: master.chatAvatarAlt },
    })
  }

  const documentaryKey = library.add({
    legacyPath: master.media.audio.sv.url,
    kind: "documentary_audio",
    workflow: "public",
    role: "documentary",
  })
  const soundKey = library.add({
    legacyPath: SPECIES_SOUND_PATH,
    kind: "species_sound",
    workflow: "public",
    role: "species-sound",
  })

  if (variant) {
    const hiddenImages = [
      variant.media.heroImage.url,
      variant.media.detailImage?.url,
      ...variant.media.galleryImages.map((item) => item.src),
    ]
    for (const legacyPath of hiddenImages) {
      if (!legacyPath) continue
      const alt =
        legacyPath === variant.media.heroImage.url
          ? variant.media.heroImage.alt
          : legacyPath === variant.media.detailImage?.url
            ? variant.media.detailImage.alt
            : { sv: variant.media.galleryImages.find((item) => item.src === legacyPath)?.alt }
      library.add({
        legacyPath,
        kind: "image",
        workflow: "hidden",
        role: "legacy:lodjur-v2",
        alt,
        tags: tagFromAlt(typeof alt.sv === "string" ? alt.sv : undefined),
      })
    }
    if (variant.media.audio.sv.url && variant.media.audio.sv.url !== master.media.audio.sv.url) {
      warn("lodjur-v2 points at a different documentary file. The shared Lodjur file is kept once.")
    }
  }

  const available = new Set<string>()
  for (const asset of library.list()) {
    if (await fileExists(asset.legacyPath)) available.add(asset.legacyPath)
    else warn(`Missing file ${asset.legacyPath}. The asset will be skipped.`)
  }

  const present = (key: string | null, legacyPath: string | undefined) =>
    Boolean(key && legacyPath && available.has(legacyPath))

  const relevance: Record<SectionId, ModuleRelevance> = {
    hero: present(heroKey, master.media.heroImage.url) ? "produced" : "not_produced",
    introduction: master.content.sv.intro.trim() ? "produced" : "not_produced",
    quick_facts: master.quickFacts.sv.some((fact) => fact.label && fact.value)
      ? "produced"
      : "not_produced",
    deep_dive: deepDive.length ? "produced" : "not_produced",
    gallery: gallery.some((item) =>
      library.list().some((asset) => asset.key === item.assetKey && available.has(asset.legacyPath)),
    )
      ? "produced"
      : "not_produced",
    local_gallery: "not_produced",
    video: present(videoKey, master.media.galleryImages.find((item) => item.video)?.video)
      ? "produced"
      : "not_produced",
    documentary: present(documentaryKey, master.media.audio.sv.url) ? "produced" : "not_produced",
    species_sound: present(soundKey, SPECIES_SOUND_PATH) ? "produced" : "not_produced",
    ask_species:
      master.interactive.sv.title.trim() || master.interactive.sv.intro.trim()
        ? "produced"
        : "not_produced",
  }

  const scientificName =
    !variant || variant.scientificName === master.scientificName
      ? master.scientificName
      : ""
  if (!scientificName) {
    warn("Scientific name differs between lodjur and lodjur-v2. Leaving the public field empty.")
  }

  const document = {
    _id: speciesDocumentId(LODJUR_SLUG),
    _type: "species",
    slug: LODJUR_SLUG,
    scientificName,
    category: {
      _type: "reference",
      _ref: categoryDocumentId("mammals"),
    },
    publishedLevel: "full",
    commonName: locale("localeString", master.names.sv, master.names.en, master.names.de),
    metaDescription: locale(
      "localeText",
      master.meta.sv.description,
      master.meta.en.description,
      master.meta.de.description,
    ),
    introduction: locale(
      "localeText",
      master.content.sv.intro,
      master.content.en.intro,
      master.content.de.intro,
    ),
    quote: locale(
      "localeText",
      master.content.sv.quote,
      master.content.en.quote,
      master.content.de.quote,
    ),
    quickFacts: zipLocaleRows(master.quickFacts, (row, index) => ({
      _key: `fact-${index + 1}`,
      _type: "quickFact",
      label: locale("localeString", row.sv?.label, row.en?.label, row.de?.label),
      value: locale("localeString", row.sv?.value, row.en?.value, row.de?.value),
    })),
    deepDive: deepDive
      .map((card) => ({
        ...card,
        imageKey:
          card.imageKey && availableHasKey(library, available, card.imageKey)
            ? card.imageKey
            : undefined,
      }))
      .filter((card) => card.heading.sv || card.body.sv || card.imageKey),
    hero: present(heroKey, master.media.heroImage.url) ? heroKey : undefined,
    cardImage: cardKey && card && available.has(card.image) ? cardKey : undefined,
    gallery: gallery.filter((item) => availableHasKey(library, available, item.assetKey)),
    localGallery: [],
    videos:
      videoKey && relevance.video === "produced"
        ? [
            {
              _key: videoKey,
              _type: "videoItem",
              assetKey: videoKey,
              title: locale("localeString"),
              primary: true,
            },
          ]
        : [],
    documentary: {
      script: locale("localeText"),
      audio: {
        sv: relevance.documentary === "produced" ? documentaryKey : undefined,
      },
    },
    speciesSound: {
      assetKey: relevance.species_sound === "produced" ? soundKey : undefined,
      label: locale("localeString", SPECIES_SOUND_LABEL_SV),
    },
    relatedSpecies: [],
    sectionSettings: SECTION_IDS.map((sectionId) => sectionSetting(sectionId, relevance[sectionId])),
    ask: {
      title: locale(
        "localeString",
        master.interactive.sv.title,
        master.interactive.en.title,
        master.interactive.de.title,
      ),
      intro: locale(
        "localeText",
        master.interactive.sv.intro,
        master.interactive.en.intro,
        master.interactive.de.intro,
      ),
      presetQuestions: zipLocaleRows(
        {
          sv: master.interactive.sv.presetQuestions,
          en: master.interactive.en.presetQuestions,
          de: master.interactive.de.presetQuestions,
        },
        (row, index) => ({
          _key: `question-${index + 1}`,
          _type: "presetQuestion",
          question: locale("localeString", row.sv, row.en, row.de),
        }),
      ),
      legacyPrompt: master.chatSystemPrompt ?? "",
    },
    translationStatus: {
      en: master.content.en.intro.trim() ? "migrated" : "missing",
      de: master.content.de.intro.trim() ? "migrated" : "missing",
    },
    archivePriority: Math.max(
      1,
      archiveSpecies.findIndex((item) => item.slug === LODJUR_SLUG) + 1,
    ),
    legacyRelatedSlugs: (master.relatedSpecies ?? []).map((item) => item.slug),
    legacyVariants: variant ? [legacyVariant(variant)] : [],
    sourceNotes: sourceNotes(master, variant),
  }

  return { document, relevance, available }
}

function availableHasKey(
  library: AssetLibrary,
  available: Set<string>,
  key: string | null,
): boolean {
  if (!key) return false
  return library.list().some((asset) => asset.key === key && available.has(asset.legacyPath))
}

async function uploadAssets(
  client: SanityClient,
  library: AssetLibrary,
  available: Set<string>,
  write: boolean,
): Promise<void> {
  for (const asset of library.list()) {
    if (!available.has(asset.legacyPath)) continue
    if (!write) {
      log(`dry-run asset ${asset.key} ${asset.workflow} ${asset.kind} ${asset.legacyPath}`)
      asset.sanityId = `dry-run.${asset.key}`
      continue
    }
    const existing = await withRetry(`lookup ${asset.legacyPath}`, () =>
      client.fetch<{ _id: string } | null>(
        `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && source.id == $legacyPath][0]{_id}`,
        { legacyPath: asset.legacyPath },
      ),
    )
    if (existing?._id) {
      asset.sanityId = existing._id
      log(`reuse ${asset.key} ${existing._id}`)
      continue
    }
    const uploaded = await withRetry(`upload ${asset.legacyPath}`, () =>
      client.assets.upload(asset.kind === "image" ? "image" : "file", createReadStream(publicFile(asset.legacyPath)), {
        filename: path.basename(asset.legacyPath),
        contentType: contentType(asset.legacyPath),
        label: asset.legacyPath,
        title: asset.key,
        source: {
          id: asset.legacyPath,
          name: ASSET_SOURCE_NAME,
          url: `design/public${asset.legacyPath}`,
        },
      }),
    )
    asset.sanityId = uploaded._id
    log(`upload ${asset.key} ${uploaded._id}`)
  }
}

function assetDocuments(library: AssetLibrary, available: Set<string>) {
  return library
    .list()
    .filter((asset) => available.has(asset.legacyPath) && asset.sanityId)
    .map((asset) => ({
      _key: asset.key,
      _type: "speciesAsset",
      key: asset.key,
      kind: asset.kind,
      workflow: asset.workflow,
      localPhotographer: false,
      showCredit: false,
      alt: asset.alt,
      caption: asset.caption,
      tags: [...asset.tags],
      legacyPath: asset.legacyPath,
      ...(asset.kind === "image"
        ? { image: { _type: "image", asset: { _type: "reference", _ref: asset.sanityId } } }
        : { file: { _type: "file", asset: { _type: "reference", _ref: asset.sanityId } } }),
    }))
}

async function writePreviewDraft(client: SanityClient): Promise<void> {
  const published = await client.getDocument(speciesDocumentId(LODJUR_SLUG))
  if (!published) fail("Cannot create a preview draft because species.lodjur was not published.")
  const introduction = (published.introduction ?? {}) as { sv?: string }
  const draft = {
    ...published,
    _id: `drafts.${speciesDocumentId(LODJUR_SLUG)}`,
    introduction: {
      ...introduction,
      _type: "localeText",
      sv: `${introduction.sv ?? ""}\n\n${PREVIEW_DRAFT_SENTENCE}`,
    },
  }
  delete draft._rev
  delete draft._createdAt
  delete draft._updatedAt
  await withRetry("preview draft", () => client.createOrReplace(draft))
  log("Wrote drafts.species.lodjur with one preview sentence. The published document was not changed.")
}

async function main() {
  const args = readArgs(process.argv.slice(2))
  assertDataset(args.dataset, args.confirm)
  if (args.previewDraft && !args.write) {
    fail("--preview-draft only runs together with --write.")
  }

  const projectId = process.env.SANITY_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) fail("Missing SANITY_API_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID.")
  const envDataset = process.env.SANITY_API_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET
  log(`mode=${args.write ? "write" : "dry-run"} dataset=${args.dataset}`)
  if (envDataset && envDataset !== args.dataset) {
    warn(`Environment dataset is ${envDataset}. This run targets ${args.dataset}.`)
  }

  const library = new AssetLibrary()
  const { document, relevance, available } = await buildSpecies(library)
  const categories = categoryDocuments()
  log(`categories=${categories.map((category) => category._id).join(", ")}`)
  log(
    `sections=${Object.entries(relevance)
      .map(([id, state]) => `${id}:${state}`)
      .join(", ")}`,
  )
  log(`assets=${library.list().length} present=${available.size} missing=${library.list().length - available.size}`)

  if (!args.write) {
    await uploadAssets(null as unknown as SanityClient, library, available, false)
    log("Dry-run finished. No dataset was changed. Re-run with --write to publish to staging.")
    return
  }

  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) fail("Missing SANITY_API_WRITE_TOKEN.")
  const client = createClient({
    projectId,
    dataset: args.dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-17",
    token,
    useCdn: false,
  })

  await uploadAssets(client, library, available, true)
  const species = {
    ...document,
    assets: assetDocuments(library, available),
  }
  await withRetry("commit documents", () =>
    client
      .transaction()
      .createOrReplace(categories[0] as never)
      .createOrReplace(categories[1] as never)
      .createOrReplace(categories[2] as never)
      .createOrReplace(categories[3] as never)
      .createOrReplace(categories[4] as never)
      .createOrReplace(categories[5] as never)
      .createIfNotExists({
        _id: ASK_SETTINGS_ID,
        _type: "askSettings",
        masterPrompt: "",
      })
      .createOrReplace(species as never)
      .commit(),
  )
  log(`Published ${speciesDocumentId(LODJUR_SLUG)} to ${args.dataset}.`)
  log("askSettings was created only if it did not already exist, so an editorial prompt is kept.")
  if (args.previewDraft) await writePreviewDraft(client)
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  fail(message)
})
