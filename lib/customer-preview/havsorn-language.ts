import type { SpeciesView } from "@/sanity/lib/types"
import { customerPreviewSpeciesPage } from "./species"

/**
 * Havsörn-only customer-preview language demonstration.
 * Not a localisation framework. English and German are the migrated,
 * unreviewed prototype texts. Swedish stays the default and the fallback.
 */

export type HavsornPreviewLang = "sv" | "en" | "de"

export type HavsornUiLabels = {
  allSpecies: string
  introduction: string
  quickFacts: string
  documentary: string
  deepDive: string
  gallery: string
  video: string
  askTitle: string
  listen: string
  pause: string
  playGuide: string
  pauseGuide: string
  playVideo: string
  enlarge: string
  enlarged: string
  close: string
  previous: string
  next: string
  previousImage: string
  nextImage: string
  language: string
}

export type HavsornAskPreview = {
  greeting: string
  unknownReply: string
  kicker: string
  companionNote: string
  placeholder: string
  questionLabel: string
  documentaryNote: string
}

type CardCopy = { heading: string; body: string; caption: string; alt: string }

const COPY = {
  en: {
    title: "White-tailed Eagle",
    category: "Birds",
    description:
      "Discover the White-tailed Eagle along Kustvägen. Facts on wingspan, nesting habits, hunting, and top locations for eagle watching.",
    heroAlt: "White-tailed Eagle perched proudly on a pine branch looking over the sea",
    intro:
      "An encounter with the White-tailed Eagle is an awe-inspiring moment. With a wingspan reaching nearly two and a half meters, Northern Europe's largest bird of prey is an unforgettable sight soaring above Kustvägen.\n\nFollowing decades of decline due to environmental toxins, the species has made a remarkable recovery and stands today as a proud symbol of a healthy coastal ecosystem.",
    quote:
      "Watching the White-tailed Eagle circle above the open sea is a vivid reminder of coasts restored to their full glory.",
    facts: [
      { label: "Wingspan", value: "200–245 cm" },
      { label: "Weight", value: "3.5–7.0 kg" },
      { label: "Diet", value: "Fish & waterfowl" },
      { label: "Nesting", value: "Old pines & spruces" },
    ],
    cards: [
      {
        heading: "Characteristics & Flight",
        body: "Adult eagles feature broad, plank-like wings, a pale yellow-brown head, and a stark white tail. Juveniles are darker with mottled plumage. Their flight is marked by slow, heavy wingbeats alternating with effortless gliding.",
        caption: "In the air, the eagle is recognizable by its broad, rectangular wing shape.",
        alt: "White-tailed eagle soaring with spread wings against a clear blue sky",
      },
      {
        heading: "Habitat & Nesting",
        body: "They thrive in undisturbed coastal areas, archipelagos, and large lakes. Nests are massive structures of sticks built high in mature trees, reused and expanded year after year until weighing hundreds of kilograms.",
        caption: "Nests grow larger every year and can eventually weigh several hundred kilograms.",
        alt: "Large eagle nest atop an old pine tree",
      },
      {
        heading: "Hunting & Diet",
        body: "Primary food sources include fish and waterfowl. The eagle snatches prey directly from the water's surface or steals catches from other birds. Carrion forms a key part of their winter diet.",
        caption: "Wind-swept islands along Kustvägen offer ideal lookouts for hunting.",
        alt: "Coastal archipelago landscape where the eagle hunts",
      },
    ] satisfies CardCopy[],
    ask: {
      title: "Talk to the Eagle",
      intro: "Ask the White-tailed Eagle a question to learn more about its coastal life!",
      questions: ["How large is your nest?", "What is your favorite food?", "How fast can you fly?"],
    },
    preview: {
      greeting: "Hi! I'm the White-tailed Eagle. What would you like to know?",
      unknownReply: "There is not enough information about that in the project source material.",
      kicker: "Talk to Nature",
      companionNote:
        "A playful guide for children – answers are created by a digital white-tailed eagle companion.",
      placeholder: "Type your question here...",
      questionLabel: "Type your question to the White-tailed Eagle",
      documentaryNote: "Narration is in Swedish.",
    } satisfies HavsornAskPreview,
  },
  de: {
    title: "Seeadler",
    category: "Vögel",
    description:
      "Erfahren Sie alles über den Seeadler entlang des Kustvägen. Fakten zu Spannweite, Lebensraum, Jagd und Beobachtungstipps.",
    heroAlt: "Seeadler sitzt stolz auf einem Kiefernast mit Blick über das Meer",
    intro:
      "Eine Begegnung mit dem Seeadler ist ein unvergesslicher Augenblick. Mit einer Spannweite von fast zweieinhalb Metern ist Nordeuropas größter Greifvogel ein majestätischer Anblick über den Küsten des Kustvägen.\n\nNach Jahrzehnten der Bedrohung hat sich der Bestand heute hervorragend erholt und der Seeadler gilt wieder als stolzes Symbol einer intakten Küstennatur.",
    quote: "Der Anblick des Seeadlers über dem Meer erinnert daran, wie kraftvoll sich unsere Küsten erholt haben.",
    facts: [
      { label: "Spannweite", value: "200–245 cm" },
      { label: "Gewicht", value: "3,5–7,0 kg" },
      { label: "Nahrung", value: "Fische & Wasservögel" },
      { label: "Nistplatz", value: "Alte Kiefern & Fichten" },
    ],
    cards: [
      {
        heading: "Merkmale & Flug",
        body: "Ausgewachsene Seeadler haben breite, brettartige Flügel, einen hellen gelbbraunen Kopf und einen reinweißen Schwanz. Der Flug ist geprägt von langsamen, kräftigen Flügelschlägen und langem Gleiten.",
        caption: "Im Flug ist der Seeadler an seinen breiten, rechteckigen Flügeln leicht zu erkennen.",
        alt: "Seeadler im Flug mit ausgebreiteten Flügeln vor blauem Himmel",
      },
      {
        heading: "Lebensraum & Brut",
        body: "Seeadler bevorzugen ungestörte Küsten- und Schärengebiete sowie große Seen. Ihre riesigen Horste bauen sie in alten Bäumen und nutzen sie über viele Jahre hinweg, bis sie hunderte Kilo wiegen.",
        caption: "Horste werden jährlich erweitert und können mehrere hundert Kilogramm wiegen.",
        alt: "Großer Seeadlerhorst in der Krone einer alten Kiefer",
      },
      {
        heading: "Jagd & Nahrung",
        body: "Fische und Wasservögel bilden die Hauptnahrung. Der Seeadler greift seine Beute oft direkt von der Wasseroberfläche. Im Winter spielt Aas eine wichtige Rolle im Speiseplan.",
        caption: "Die windgepeitschten Inseln des Kustvägen bieten ideale Aussichtspunkte für die Jagd.",
        alt: "Schärenlandschaft an der Küste, in der der Seeadler jagt",
      },
    ] satisfies CardCopy[],
    ask: {
      title: "Sprich mit dem Seeadler",
      intro: "Stelle dem Seeadler eine Frage und erfahre mehr über sein Leben an der Küste!",
      questions: ["Wie groß ist dein Nest?", "Was frisst du am liebsten?", "Wie schnell fliegst du?"],
    },
    preview: {
      greeting: "Hallo! Ich bin der Seeadler. Was möchtest du wissen?",
      unknownReply: "Dazu enthält das Quellenmaterial des Projekts nicht genügend Informationen.",
      kicker: "Mit der Natur sprechen",
      companionNote:
        "Ein spielerischer Guide für Kinder – Antworten werden von einem digitalen Seeadler-Begleiter erstellt.",
      placeholder: "Schreib deine Frage hier...",
      questionLabel: "Schreib deine Frage an den Seeadler",
      documentaryNote: "Die Erzählung ist auf Schwedisch.",
    } satisfies HavsornAskPreview,
  },
} as const

const UI_LABELS: Record<HavsornPreviewLang, HavsornUiLabels> = {
  sv: {
    allSpecies: "Alla arter",
    introduction: "Introduktion",
    quickFacts: "Snabbfakta",
    documentary: "Lyssna på dokumentären",
    deepDive: "Fördjupning",
    gallery: "Bildgalleri",
    video: "Video",
    askTitle: "Fråga havsörnen",
    listen: "Lyssna på havsörnen",
    pause: "Pausa",
    playGuide: "Spela upp guiden",
    pauseGuide: "Pausa guiden",
    playVideo: "Spela upp video",
    enlarge: "Förstora",
    enlarged: "Förstorad bild",
    close: "Stäng",
    previous: "Föregående",
    next: "Nästa",
    previousImage: "Föregående bild",
    nextImage: "Nästa bild",
    language: "Språk",
  },
  en: {
    allSpecies: "All species",
    introduction: "Introduction",
    quickFacts: "Quick facts",
    documentary: "Listen to the documentary",
    deepDive: "In depth",
    gallery: "Image gallery",
    video: "Video",
    askTitle: "Talk to the Eagle",
    listen: "Listen to the White-tailed Eagle",
    pause: "Pause",
    playGuide: "Play the guide",
    pauseGuide: "Pause the guide",
    playVideo: "Play video",
    enlarge: "Enlarge",
    enlarged: "Enlarged image",
    close: "Close",
    previous: "Previous",
    next: "Next",
    previousImage: "Previous image",
    nextImage: "Next image",
    language: "Language",
  },
  de: {
    allSpecies: "Alle Arten",
    introduction: "Einführung",
    quickFacts: "Kurzfakten",
    documentary: "Dokumentation anhören",
    deepDive: "Vertiefung",
    gallery: "Bildergalerie",
    video: "Video",
    askTitle: "Sprich mit dem Seeadler",
    listen: "Seeadler anhören",
    pause: "Pause",
    playGuide: "Guide abspielen",
    pauseGuide: "Guide pausieren",
    playVideo: "Video abspielen",
    enlarge: "Vergrößern",
    enlarged: "Vergrößertes Bild",
    close: "Schließen",
    previous: "Zurück",
    next: "Weiter",
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
    language: "Sprache",
  },
}

export function havsornUiLabels(lang: HavsornPreviewLang): HavsornUiLabels {
  return UI_LABELS[lang]
}

export function havsornPreviewLang(value: string | string[] | undefined): HavsornPreviewLang {
  const lang = Array.isArray(value) ? value[0] : value
  return lang === "en" || lang === "de" ? lang : "sv"
}

export function isHavsornCustomerPreview(page: SpeciesView) {
  const source = customerPreviewSpeciesPage("havsorn")
  if (!source || page.slug !== "havsorn") return false
  return page.title === source.title && page.description === source.description
}

export function havsornAskPreview(lang: HavsornPreviewLang): HavsornAskPreview | null {
  if (lang === "sv") return null
  return COPY[lang].preview
}

export function localizeHavsornPreview(page: SpeciesView, lang: HavsornPreviewLang): SpeciesView {
  if (page.slug !== "havsorn") return page
  const labels = havsornUiLabels(lang)
  if (lang === "sv") return applyHavsornUiLabels(structuredClone(page), labels)
  const text = COPY[lang]
  const next: SpeciesView = structuredClone(page)
  next.title = text.title
  next.categoryTitle = text.category
  next.description = text.description
  next.sections = next.sections.map((section) => {
    if (section.gap) return section
    if (section.id === "hero" && section.image) {
      return { ...section, image: { ...section.image, alt: text.heroAlt } }
    }
    if (section.id === "introduction") {
      return { ...section, body: text.intro, quote: text.quote }
    }
    if (section.id === "quick_facts") {
      return { ...section, facts: text.facts.map((fact) => ({ ...fact })) }
    }
    if (section.id === "deep_dive") {
      return {
        ...section,
        cards: section.cards.map((card, index) => {
          const translated = text.cards[index]
          if (!translated) return card
          return {
            ...card,
            heading: translated.heading,
            body: translated.body,
            caption: translated.caption,
            image: card.image
              ? { ...card.image, alt: translated.alt, caption: translated.caption }
              : card.image,
          }
        }),
      }
    }
    if (section.id === "ask_species") {
      return {
        ...section,
        title: text.ask.title,
        intro: text.ask.intro,
        questions: [...text.ask.questions],
      }
    }
    return section
  })
  return applyHavsornUiLabels(next, labels)
}

function applyHavsornUiLabels(page: SpeciesView, labels: HavsornUiLabels): SpeciesView {
  page.sections = page.sections.map((section) => {
    if (section.gap) return section
    switch (section.id) {
      case "introduction":
        return { ...section, heading: labels.introduction }
      case "quick_facts":
        return { ...section, heading: labels.quickFacts }
      case "documentary":
        return { ...section, heading: labels.documentary }
      case "deep_dive":
        return { ...section, heading: labels.deepDive }
      case "gallery":
      case "local_gallery":
        return { ...section, heading: labels.gallery }
      case "video":
        return { ...section, heading: labels.video }
      case "ask_species":
        return { ...section, title: labels.askTitle }
      case "species_sound":
        return { ...section, label: labels.listen }
      default:
        return section
    }
  })
  return page
}
