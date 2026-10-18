import { defineField, defineType } from "sanity"

const localeFields = [
  defineField({
    name: "sv",
    title: "Svenska",
    type: "string",
    description: "Auktoritativ text. Lämna tom om svenska saknas. Kopiera inte ett annat språk hit.",
  }),
  defineField({
    name: "en",
    title: "Engelska",
    type: "string",
    description: "Valfri översättning. Tom betyder att översättning saknas.",
  }),
  defineField({
    name: "de",
    title: "Tyska",
    type: "string",
    description: "Valfri översättning. Tom betyder att översättning saknas.",
  }),
]

export const localeString = defineType({
  name: "localeString",
  title: "Lokaliserad sträng",
  type: "object",
  options: { columns: 3 },
  fields: localeFields,
})

export const localeText = defineType({
  name: "localeText",
  title: "Lokaliserad text",
  type: "object",
  options: { columns: 3 },
  fields: localeFields.map((field) => ({
    ...field,
    type: "text",
    rows: 6,
  })),
})
