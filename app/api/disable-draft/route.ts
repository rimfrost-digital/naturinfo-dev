import { draftMode } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()
  const slug = new URL(request.url).searchParams.get("slug")
  const path = slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? `/art/${slug}` : "/"
  return NextResponse.redirect(new URL(path, request.url))
}
