import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { loadSpeciesPageOrCustomerPreview } from "@/lib/customer-preview/load-species-page"
import { SpeciesArticle } from "./species-article"

// Cache Components would stop the build if draft mode were read inside a
// prerendered shell. A blocking route lets a missing slug render the not-found page.
export const instant = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await loadSpeciesPageOrCustomerPreview(slug)
  if (!page) return { title: "Art" }
  return {
    title: page.title,
    description: page.description ?? undefined,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await loadSpeciesPageOrCustomerPreview(slug)
  if (!page) notFound()
  return <SpeciesArticle page={page} />
}
