import { createClient, type SanityClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "../env"

function readToken(): string {
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    throw new Error("Missing environment variable: SANITY_API_READ_TOKEN")
  }
  return token
}

export function serverClient(perspective: "published" | "drafts"): SanityClient {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: readToken(),
    perspective,
  })
}
