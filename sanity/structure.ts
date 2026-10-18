import type { StructureResolver } from "sanity/structure"
import { ASK_SETTINGS_ID } from "./lib/content-model"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll")
    .items([
      S.listItem()
        .title("Arter")
        .schemaType("species")
        .child(S.documentTypeList("species").title("Arter")),
      S.listItem()
        .title("Kategorier")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Kategorier")),
      S.listItem()
        .title("Fråga djuret")
        .id(ASK_SETTINGS_ID)
        .child(S.document().schemaType("askSettings").documentId(ASK_SETTINGS_ID)),
    ])
