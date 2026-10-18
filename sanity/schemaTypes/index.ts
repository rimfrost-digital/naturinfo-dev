import type { SchemaTypeDefinition } from "sanity"
import { askSettings } from "./askSettings"
import { category } from "./category"
import { localeString, localeText } from "./locale"
import { provenance, speciesAsset } from "./objects/speciesAsset"
import { species } from "./species"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    provenance,
    speciesAsset,
    category,
    askSettings,
    species,
  ],
}
