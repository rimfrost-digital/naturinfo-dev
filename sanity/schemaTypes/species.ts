import { defineArrayMember, defineField, defineType } from "sanity"
import { LEVELS, SECTION_CMS_NAME, SECTION_IDS } from "../lib/content-model"

const translationState = [
  { value: "missing", title: "Saknas" },
  { value: "migrated", title: "Migrerad" },
  { value: "in_review", title: "Under granskning" },
  { value: "approved", title: "Godkänd" },
]

function assetKeyField() {
  return defineField({
    name: "assetKey",
    title: "Tillgångsnyckel",
    type: "string",
    description: "Nyckel i artens bibliotek. Filen laddas inte upp igen.",
    validation: (rule) => rule.required(),
  })
}

export const species = defineType({
  name: "species",
  title: "Art",
  type: "document",
  groups: [
    { name: "identity", title: "Identitet", default: true },
    { name: "text", title: "Text" },
    { name: "facts", title: "Fakta" },
    { name: "media", title: "Mediabibliotek" },
    { name: "roles", title: "Roller" },
    { name: "sections", title: "Sektioner" },
    { name: "ask", title: "Fråga djuret" },
    { name: "editorial", title: "Redaktion" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      group: "identity",
      description: "Permanent adress /art/[slug]. Översätts inte.",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "slug",
        }),
    }),
    defineField({
      name: "scientificName",
      title: "Vetenskapligt namn",
      type: "string",
      group: "identity",
      description: "Lämna tomt när källorna inte är överens. Kandidaterna hör hemma i källanteckningar.",
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedLevel",
      title: "Publicerad nivå",
      type: "string",
      group: "identity",
      description: "Lagrat värde för märket. Visningsnamn och ikon bestäms inte här.",
      options: {
        list: LEVELS.map((value) => ({ value, title: value })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "commonName",
      title: "Namn",
      type: "localeString",
      group: "identity",
      validation: (rule) =>
        rule.custom((value) => {
          const name = value as { sv?: string } | undefined
          return name?.sv?.trim() ? true : "Svenskt artnamn krävs"
        }),
    }),
    defineField({
      name: "metaDescription",
      title: "Sidbeskrivning",
      type: "localeText",
      group: "text",
    }),
    defineField({
      name: "introduction",
      title: "Introduktion",
      type: "localeText",
      group: "text",
    }),
    defineField({
      name: "quote",
      title: "Citat",
      type: "localeText",
      group: "text",
    }),
    defineField({
      name: "quickFacts",
      title: "Snabbfakta",
      type: "array",
      group: "facts",
      of: [
        defineArrayMember({
          name: "quickFact",
          title: "Fakta",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etikett", type: "localeString" }),
            defineField({ name: "value", title: "Värde", type: "localeString" }),
          ],
          preview: {
            select: { title: "label.sv", subtitle: "value.sv" },
          },
        }),
      ],
    }),
    defineField({
      name: "deepDive",
      title: "Fördjupning",
      type: "array",
      group: "facts",
      of: [
        defineArrayMember({
          name: "deepDiveCard",
          title: "Kort",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Rubrik", type: "localeString" }),
            defineField({ name: "body", title: "Text", type: "localeText" }),
            defineField({ name: "caption", title: "Bildtext", type: "localeString" }),
            defineField({
              name: "imageKey",
              title: "Bildnyckel",
              type: "string",
              description: "Nyckel i biblioteket. Samma fil kan användas i galleriet.",
            }),
          ],
          preview: {
            select: { title: "heading.sv", subtitle: "imageKey" },
          },
        }),
      ],
    }),
    defineField({
      name: "assets",
      title: "Bibliotek",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "speciesAsset" })],
      validation: (rule) =>
        rule.custom((assets) => {
          if (!Array.isArray(assets)) return true
          const keys = assets
            .map((asset) => (asset as { key?: string }).key)
            .filter((key): key is string => Boolean(key))
          const duplicate = keys.find((key, index) => keys.indexOf(key) !== index)
          return duplicate ? `Nyckeln ${duplicate} används mer än en gång` : true
        }),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "string",
      group: "roles",
      description: "Nyckel till primärbilden.",
    }),
    defineField({
      name: "cardImage",
      title: "Kortbild",
      type: "string",
      group: "roles",
      description: "Valfri. Tom betyder att hero används.",
    }),
    defineField({
      name: "gallery",
      title: "Bildgalleri",
      type: "array",
      group: "roles",
      of: [
        defineArrayMember({
          name: "galleryItem",
          type: "object",
          fields: [assetKeyField()],
          preview: { select: { title: "assetKey" } },
        }),
      ],
    }),
    defineField({
      name: "localGallery",
      title: "Bilder från närområdet",
      type: "array",
      group: "roles",
      description: "Tomt, eller not_produced, betyder att sektionen inte visas publikt.",
      of: [
        defineArrayMember({
          name: "localGalleryItem",
          type: "object",
          fields: [assetKeyField()],
          preview: { select: { title: "assetKey" } },
        }),
      ],
    }),
    defineField({
      name: "videos",
      title: "Video",
      type: "array",
      group: "roles",
      of: [
        defineArrayMember({
          name: "videoItem",
          type: "object",
          fields: [
            assetKeyField(),
            defineField({ name: "title", title: "Titel", type: "localeString" }),
            defineField({
              name: "primary",
              title: "Primär",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "title.sv", subtitle: "assetKey", primary: "primary" },
            prepare({ title, subtitle, primary }) {
              return {
                title: title || subtitle || "Video",
                subtitle: primary ? "Primär" : subtitle,
              }
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.custom((videos) => {
          if (!Array.isArray(videos)) return true
          const primaryCount = videos.filter(
            (video) => (video as { primary?: boolean }).primary,
          ).length
          return primaryCount > 1 ? "Bara en video kan vara primär" : true
        }),
    }),
    defineField({
      name: "documentary",
      title: "Dokumentär",
      type: "object",
      group: "roles",
      fields: [
        defineField({
          name: "script",
          title: "Manus eller transkript",
          type: "localeText",
          description: "Inte sidans brödtext. Lämna tomt när ett manus saknas.",
        }),
        defineField({
          name: "audio",
          title: "Ljud per språk",
          type: "object",
          options: { columns: 3 },
          fields: [
            defineField({ name: "sv", title: "Svenska, nyckel", type: "string" }),
            defineField({ name: "en", title: "Engelska, nyckel", type: "string" }),
            defineField({ name: "de", title: "Tyska, nyckel", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "speciesSound",
      title: "Artens ljud",
      type: "object",
      group: "roles",
      fields: [
        defineField({ name: "assetKey", title: "Tillgångsnyckel", type: "string" }),
        defineField({ name: "label", title: "Etikett", type: "localeString" }),
      ],
    }),
    defineField({
      name: "relatedSpecies",
      title: "Relaterade arter",
      type: "array",
      group: "roles",
      of: [defineArrayMember({ type: "reference", to: [{ type: "species" }] })],
    }),
    defineField({
      name: "sectionSettings",
      title: "Sektioner",
      type: "array",
      group: "sections",
      description: "Enda styrningen av ordning och synlighet. Innehållet ligger i fälten ovan.",
      of: [
        defineArrayMember({
          name: "sectionSetting",
          type: "object",
          fields: [
            defineField({
              name: "sectionId",
              title: "Sektion",
              type: "string",
              options: {
                list: SECTION_IDS.map((id) => ({
                  value: id,
                  title: SECTION_CMS_NAME[id],
                })),
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "publicHeading",
              title: "Publik rubrik",
              type: "localeString",
              description: "Valfri. CMS-namnet används när fältet är tomt.",
            }),
            defineField({
              name: "relevance",
              title: "Relevans",
              type: "string",
              options: {
                list: [
                  { value: "produced", title: "Producerad" },
                  { value: "not_produced", title: "Inte producerad" },
                  { value: "not_relevant", title: "Inte relevant" },
                ],
                layout: "radio",
              },
              initialValue: "not_produced",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "hidden",
              title: "Dold",
              type: "boolean",
              description: "Döljer sektionen utan att radera innehållet. Gäller över nivån.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { sectionId: "sectionId", relevance: "relevance", hidden: "hidden" },
            prepare({ sectionId, relevance, hidden }) {
              const name =
                SECTION_CMS_NAME[sectionId as keyof typeof SECTION_CMS_NAME] ?? sectionId
              return {
                title: name,
                subtitle: hidden ? `${relevance}, dold` : relevance,
              }
            },
          },
        }),
      ],
      initialValue: () =>
        SECTION_IDS.map((sectionId) => ({
          _key: sectionId,
          sectionId,
          relevance: "not_produced",
          hidden: false,
        })),
    }),
    defineField({
      name: "ask",
      title: "Fråga djuret",
      type: "object",
      group: "ask",
      fields: [
        defineField({ name: "title", title: "Titel", type: "localeString" }),
        defineField({ name: "intro", title: "Inledning", type: "localeText" }),
        defineField({
          name: "presetQuestions",
          title: "Förvalda frågor",
          type: "array",
          of: [
            defineArrayMember({
              name: "presetQuestion",
              type: "object",
              fields: [defineField({ name: "question", title: "Fråga", type: "localeString" })],
              preview: { select: { title: "question.sv" } },
            }),
          ],
        }),
        defineField({
          name: "supplement",
          title: "Arttillägg",
          type: "text",
          rows: 6,
          description:
            "Valfritt tillägg till den delade masterprompten. Tomt för de flesta arter. Inte en egen full prompt.",
        }),
        defineField({
          name: "personaNote",
          title: "Personlighet",
          type: "text",
          rows: 3,
          description: "Valfri kort anteckning. Personligheten ska vara återhållen.",
        }),
        defineField({
          name: "legacyPrompt",
          title: "Importerad prompt",
          type: "text",
          rows: 8,
          description: "Behålls för jämförelse. Skickas inte till modellen.",
        }),
      ],
    }),
    defineField({
      name: "editorialStatus",
      title: "Redaktionell status",
      type: "string",
      group: "editorial",
      options: {
        list: [
          { value: "production_ready", title: "Produktionsklar" },
          { value: "internal_revision", title: "Intern revision" },
          { value: "customer_revision", title: "Kundrevision" },
          { value: "done", title: "Klar" },
        ],
      },
    }),
    defineField({
      name: "reviewedAt",
      title: "Granskad",
      type: "datetime",
      group: "editorial",
    }),
    defineField({
      name: "sourceNotes",
      title: "Källanteckningar",
      type: "text",
      rows: 8,
      group: "editorial",
    }),
    defineField({
      name: "translationStatus",
      title: "Översättningsstatus",
      type: "object",
      group: "editorial",
      options: { columns: 2 },
      fields: [
        defineField({
          name: "en",
          title: "Engelska",
          type: "string",
          options: { list: translationState },
          initialValue: "missing",
        }),
        defineField({
          name: "de",
          title: "Tyska",
          type: "string",
          options: { list: translationState },
          initialValue: "missing",
        }),
      ],
    }),
    defineField({
      name: "homepagePriority",
      title: "Prioritet, startsida",
      type: "number",
      group: "editorial",
      description: "Tom betyder att arten inte är utvald på startsidan.",
    }),
    defineField({
      name: "archivePriority",
      title: "Prioritet, arkiv",
      type: "number",
      group: "editorial",
    }),
    defineField({
      name: "legacyRelatedSlugs",
      title: "Äldre relaterade slugs",
      type: "array",
      group: "editorial",
      description: "Slugs från prototypen. Blir referenser först när de arterna finns.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "legacyVariants",
      title: "Äldre varianter",
      type: "array",
      group: "editorial",
      description: "Icke-publika importer. Får inte skriva över mastertexten eller få en egen adress.",
      of: [
        defineArrayMember({
          name: "legacyVariant",
          type: "object",
          fields: [
            defineField({
              name: "variantKey",
              title: "Nyckel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "commonName", title: "Namn", type: "localeString" }),
            defineField({ name: "introduction", title: "Introduktion", type: "localeText" }),
            defineField({ name: "quote", title: "Citat", type: "localeText" }),
            defineField({
              name: "metaDescription",
              title: "Sidbeskrivning",
              type: "localeText",
            }),
            defineField({
              name: "heroSubtitle",
              title: "Hero-underrubrik",
              type: "localeString",
            }),
            defineField({
              name: "quickFacts",
              title: "Snabbfakta",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "legacyQuickFact",
                  fields: [
                    defineField({ name: "label", title: "Etikett", type: "localeString" }),
                    defineField({ name: "value", title: "Värde", type: "localeString" }),
                  ],
                }),
              ],
            }),
            defineField({
              name: "legacyPrompt",
              title: "Importerad prompt",
              type: "text",
              rows: 6,
            }),
            defineField({
              name: "legacyRelatedSlugs",
              title: "Relaterade slugs",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "variantKey" } },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "commonName.sv",
      subtitle: "scientificName",
      level: "publishedLevel",
    },
    prepare({ title, subtitle, level }) {
      return {
        title: title || "Art",
        subtitle: [subtitle, level].filter(Boolean).join(" · "),
      }
    },
  },
})
