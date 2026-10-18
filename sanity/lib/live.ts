// The published site uses tag revalidation from /api/revalidate.
// This live client is the Studio scaffold and is not mounted in the app layout.
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
});
