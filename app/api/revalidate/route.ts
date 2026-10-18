import { revalidateTag } from "next/cache"
import { parseBody } from "next-sanity/webhook"
import { NextResponse, type NextRequest } from "next/server"

type WebhookDocument = {
  _id?: string
  _type?: string
  slug?: string
}

/**
 * Published content is cached with tags and refreshed when Sanity calls this
 * route. `{ expire: 0 }` is the Next.js 16 immediate tag expiry. Draft
 * documents are ignored because draft mode reads them without this cache.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured" }, { status: 500 })
  }

  const configuredDataset =
    process.env.SANITY_API_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET
  const dataset = new URL(request.url).searchParams.get("dataset")
  if (!dataset || dataset !== configuredDataset) {
    return NextResponse.json({ revalidated: false, reason: "dataset mismatch" }, { status: 409 })
  }

  const { isValidSignature, body } = await parseBody<WebhookDocument>(request, secret)
  if (isValidSignature !== true || !body?._type) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  if (body._id?.startsWith("drafts.")) {
    return NextResponse.json({ revalidated: false, reason: "draft" })
  }

  const tags = tagsFor(body)
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 })
  }

  return NextResponse.json({ revalidated: true, tags })
}

function tagsFor(body: WebhookDocument): string[] {
  if (body._type === "species") {
    const slug =
      body.slug ||
      body._id?.replace(/^drafts\./, "").replace(/^species\./, "") ||
      ""
    return slug ? ["species", `species:${slug}`] : ["species"]
  }
  if (body._type === "category") return ["species", "category"]
  return []
}
