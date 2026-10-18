import { defineQuery } from "next-sanity"

/**
 * Public species projection. Editorial fields stay out of the result.
 * Workflow, relevance, and hidden are included so the server can filter
 * them before anything is rendered.
 */
export const speciesPageQuery = defineQuery(`
  *[_type == "species" && slug == $slug][0]{
    slug,
    scientificName,
    publishedLevel,
    "categoryTitle": category->title,
    commonName,
    metaDescription,
    introduction,
    quote,
    hero,
    cardImage,
    gallery[]{ assetKey },
    localGallery[]{ assetKey },
    videos[]{ assetKey, title, primary },
    speciesSound{ assetKey, label },
    documentary{
      script,
      audio
    },
    quickFacts[]{ label, value },
    deepDive[]{ heading, body, caption, imageKey },
    ask{
      title,
      intro,
      presetQuestions[]{ question }
    },
    sectionSettings[]{
      sectionId,
      publicHeading,
      relevance,
      hidden
    },
    assets[]{
      key,
      kind,
      alt,
      caption,
      workflow,
      showCredit,
      credit,
      "imageUrl": image.asset->url,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "fileUrl": file.asset->url
    }
  }
`)
