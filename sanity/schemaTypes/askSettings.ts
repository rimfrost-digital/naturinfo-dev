import { defineField, defineType } from "sanity"
import { ASK_SETTINGS_ID } from "../lib/content-model"

export const askSettings = defineType({
  name: "askSettings",
  title: "Fråga djuret",
  type: "document",
  fields: [
    defineField({
      name: "masterPrompt",
      title: "Delad masterprompt",
      type: "text",
      rows: 16,
      description:
        "En prompt för hela sajten: röst, säkerhet, geografisk ram och att svaret ska ges som arten. Arten bär inte en egen kopia. Lämna tom tills texten är redaktionellt godkänd. Modellen ska också få artens godkända fält, och kan få ett kort artillägg från artdokumentet.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Delad masterprompt", subtitle: ASK_SETTINGS_ID }
    },
  },
})
