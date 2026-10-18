import { defineField, defineType } from "sanity"
import { ASSET_WORKFLOWS } from "../../lib/content-model"

export const provenance = defineType({
  name: "assetProvenance",
  title: "Proveniens",
  type: "object",
  description: "Intern historik. Lämna fält tomma när källan inte är känd. Hitta inte på ett modellnamn.",
  fields: [
    defineField({ name: "provider", title: "Verktyg", type: "string" }),
    defineField({ name: "model", title: "Modell", type: "string" }),
    defineField({ name: "createdAt", title: "Skapad", type: "datetime" }),
    defineField({ name: "prompt", title: "Prompt", type: "text", rows: 4 }),
    defineField({ name: "promptVersion", title: "Promptversion", type: "string" }),
    defineField({ name: "reviewNote", title: "Granskningsanteckning", type: "text", rows: 3 }),
  ],
})

export const speciesAsset = defineType({
  name: "speciesAsset",
  title: "Tillgång",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Nyckel",
      type: "string",
      description: "Stabil nyckel. Samma fil väljs i flera roller genom den här nyckeln.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Typ",
      type: "string",
      options: {
        list: [
          { value: "image", title: "Bild" },
          { value: "video", title: "Video" },
          { value: "documentary_audio", title: "Dokumentärljud" },
          { value: "species_sound", title: "Artens ljud" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Bildfil",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.kind !== "image",
    }),
    defineField({
      name: "file",
      title: "Fil",
      type: "file",
      hidden: ({ parent }) => parent?.kind === "image" || !parent?.kind,
    }),
    defineField({ name: "alt", title: "Alt-text", type: "localeString" }),
    defineField({ name: "caption", title: "Bildtext", type: "localeString" }),
    defineField({
      name: "tags",
      title: "Taggar",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "workflow",
      title: "Status",
      type: "string",
      options: {
        list: ASSET_WORKFLOWS.map((value) => ({ value, title: value })),
        layout: "radio",
      },
      initialValue: "hidden",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "localPhotographer",
      title: "Lokal fotograf",
      type: "boolean",
      description: "Sätts bara från en känd källa eller kredit. Aldrig från filnamnet.",
      initialValue: false,
    }),
    defineField({
      name: "showCredit",
      title: "Visa kredit publikt",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "credit",
      title: "Kredit",
      type: "localeString",
      description: "Publik bara när Visa kredit är på.",
    }),
    defineField({ name: "rightsNote", title: "Rättigheter", type: "text", rows: 3 }),
    defineField({ name: "provenance", title: "Proveniens", type: "assetProvenance" }),
    defineField({
      name: "legacyPath",
      title: "Ursprunglig sökväg",
      type: "string",
      description: "Intern sökväg från prototypen, till exempel /images/lynx-hero.png.",
    }),
  ],
  preview: {
    select: {
      title: "key",
      subtitle: "workflow",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return { title: title || "Tillgång", subtitle, media }
    },
  },
})
