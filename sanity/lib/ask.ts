import type { LocaleValue } from "./types"

/**
 * Assembles the Ask the Species request from the one shared master prompt,
 * the species' approved public fields, and an optional supplement.
 * The imported legacy prompt is intentionally not an input.
 * An empty master prompt is not replaced with generated copy.
 */
export function buildAskRequest(input: {
  masterPrompt: string | null
  supplement: string | null
  personaNote: string | null
  species: {
    commonName: string
    introduction: string
    quickFacts: { label: string; value: string }[]
    deepDive: { heading: string; body: string }[]
  }
}):
  | { ready: false; reason: string }
  | { ready: true; system: string; context: string } {
  const masterPrompt = input.masterPrompt?.trim() ?? ""
  if (!masterPrompt) {
    return {
      ready: false,
      reason: "The shared master prompt is empty and has not been editorially approved.",
    }
  }

  const additions = [input.supplement, input.personaNote]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean)

  const facts = input.species.quickFacts
    .filter((fact) => fact.label.trim() && fact.value.trim())
    .map((fact) => `${fact.label}: ${fact.value}`)
  const cards = input.species.deepDive
    .filter((card) => card.heading.trim() || card.body.trim())
    .map((card) => `${card.heading}\n${card.body}`.trim())

  const context = [
    `Art: ${input.species.commonName}`,
    input.species.introduction.trim(),
    facts.length ? `Snabbfakta:\n${facts.join("\n")}` : "",
    cards.length ? `Fördjupning:\n${cards.join("\n\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n")

  return {
    ready: true,
    system: [masterPrompt, ...additions].join("\n\n"),
    context,
  }
}

export function localeText(value: LocaleValue | null | undefined): string {
  const swedish = value?.sv?.trim()
  if (swedish) return swedish
  return ""
}
