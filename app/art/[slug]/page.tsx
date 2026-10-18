import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { SpeciesArticle } from "./species-article"
import { loadSpeciesPage } from "@/sanity/lib/species-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await loadSpeciesPage(slug)
  if (!page) return { title: "Art" }
  return {
    title: page.title,
    description: page.description ?? undefined,
  }
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-3xl px-6 py-16">Laddar art…</main>}>
      <SpeciesRoute params={params} />
    </Suspense>
  )
}

async function SpeciesRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await loadSpeciesPage(slug)
  if (!page) notFound()
  return <SpeciesArticle page={page} />
}
