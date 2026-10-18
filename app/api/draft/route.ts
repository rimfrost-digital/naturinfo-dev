import { draftMode } from "next/headers"
import { NextResponse } from "next/server"
import { timingSafeEqual } from "node:crypto"

function secretMatches(provided: string, expected: string): boolean {
  const left = Buffer.from(provided)
  const right = Buffer.from(expected)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export async function GET(request: Request) {
  const expected = process.env.SANITY_PREVIEW_SECRET
  if (!expected) {
    return NextResponse.json({ error: "Preview is not configured" }, { status: 500 })
  }

  const url = new URL(request.url)
  const secret = url.searchParams.get("secret") ?? ""
  const slug = url.searchParams.get("slug") ?? ""
  if (!secretMatches(secret, expected) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "Invalid preview request" }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  return NextResponse.redirect(new URL(`/art/${slug}`, request.url))
}
