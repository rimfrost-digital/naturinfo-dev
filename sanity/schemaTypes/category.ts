import { defineField, defineType } from "sanity"
import { CATEGORY_IDS, CATEGORY_TITLE_SV } from "../lib/content-model"

export const category = defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Id",
      type: "string",
      options: {
        list: CATEGORY_IDS.map((id) => ({
          value: id,
          title: `${id} (${CATEGORY_TITLE_SV[id]})`,
        })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Namn",
      type: "localeString",
      validation: (rule) =>
        rule.custom((value) => {
          const title = value as { sv?: string } | undefined
          return title?.sv?.trim() ? true : "Svenskt kategorinamn krävs"
        }),
    }),
    defineField({
      name: "sortOrder",
      title: "Sortering",
      type: "number",
      description: "Ordning i arkivfiltret.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  preview: {
    select: { title: "title.sv", subtitle: "id" },
  },
})
