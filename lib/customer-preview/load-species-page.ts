import { draftMode } from "next/headers"
import { serverClient } from "@/sanity/lib/server-client"
import { loadSpeciesPage } from "@/sanity/lib/species-page"
import type { SpeciesView } from "@/sanity/lib/types"
import { customerPreviewSpeciesPage, customerPreviewSpeciesSlugs } from "./species"

/**
 * Customer-preview fallback. Not the production content architecture.
 *
 * Lodjur and every other Sanity species still load through `loadSpeciesPage`.
 * A preview view is used only when this slug has no species document in Sanity.
 * A published document or an unpublished draft blocks the fallback.
 */
export async function loadSpeciesPageOrCustomerPreview(slug: string): Promise<SpeciesView | null> {
  const fromSanity = await loadSpeciesPage(slug)
  if (fromSanity) return fromSanity
  if (!customerPreviewSpeciesSlugs.has(slug)) return null
  if (await sanityContainsSpecies(slug)) return null
  return customerPreviewSpeciesPage(slug)
}

async function sanityContainsSpecies(slug: string): Promise<boolean> {
  const preview = (await draftMode()).isEnabled
  const perspective = preview ? "drafts" : "published"
  const visibleId = await serverClient(perspective).fetch<string | null>(speciesIdQuery, { slug })
  if (visibleId) return true
  if (perspective === "drafts") return false
  const draftId = await serverClient("drafts").fetch<string | null>(speciesIdQuery, { slug })
  return Boolean(draftId)
}

const speciesIdQuery = `*[_type == "species" && slug == $slug][0]._id`
