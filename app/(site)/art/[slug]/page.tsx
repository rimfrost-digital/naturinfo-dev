import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { HavsornLanguageSwitch } from "@/components/havsorn-language-switch"
import {
  havsornAskPreview,
  havsornPreviewLang,
  havsornUiLabels,
  isHavsornCustomerPreview,
  localizeHavsornPreview,
} from "@/lib/customer-preview/havsorn-language"
import { loadSpeciesPageOrCustomerPreview } from "@/lib/customer-preview/load-species-page"
import type { SpeciesView } from "@/sanity/lib/types"
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

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string | string[] }>
}) {
  const { slug } = await params
  const page = await loadSpeciesPageOrCustomerPreview(slug)
  if (!page) notFound()
  if (!isHavsornCustomerPreview(page)) return <SpeciesArticle page={page} />
  return (
    <Suspense fallback={<HavsornArticle page={page} lang="sv" />}>
      <HavsornFromRequest page={page} searchParams={searchParams} />
    </Suspense>
  )
}

async function HavsornFromRequest({
  page,
  searchParams,
}: {
  page: SpeciesView
  searchParams: Promise<{ lang?: string | string[] }>
}) {
  const { lang } = await searchParams
  return <HavsornArticle page={page} lang={havsornPreviewLang(lang)} />
}

function HavsornArticle({ page, lang }: { page: SpeciesView; lang: "sv" | "en" | "de" }) {
  const askPreview = havsornAskPreview(lang)
  return (
    <SpeciesArticle
      page={localizeHavsornPreview(page, lang)}
      languageControl={<HavsornLanguageSwitch active={lang} />}
      documentaryNote={askPreview?.documentaryNote ?? null}
      askPreview={askPreview}
      uiLabels={havsornUiLabels(lang)}
    />
  )
}
