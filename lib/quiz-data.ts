// Quiz data for Kustvägen Naturguide

export type QuizOption = {
  label: string
  image: string
  imageAlt: string
}

export type TextQuestion = {
  id: string
  type: "text"
  category: string
  question: string
  options: QuizOption[]
  correctIndex: number
  explanation: string
}

export type ImageChoiceQuestion = {
  id: string
  type: "image-choice"
  category: string
  question: string
  options: {
    label: string
    image: string
    alt: string
    revealLabel: string
  }[]
  correctIndex: number
  explanation: string
}

export type Question = TextQuestion | ImageChoiceQuestion

export type Quiz = {
  id: "easy" | "challenge"
  title: string
  description: string
  estimatedTime: string
  questionCount: number
  questions: Question[]
}

// ---------------------------------------------------------------------------
// Easy quiz — Lilla naturquizet (5 questions)
// ---------------------------------------------------------------------------

const easyQuestions: Question[] = [
  {
    id: "easy-1",
    type: "text",
    category: "Däggdjur",
    question: "Vilket djur ser vargen mest ut som?",
    options: [
      { label: "Hund",     image: "/images/preview/sp-dog.webp",      imageAlt: "En hund sitter ute" },
      { label: "Elefant",  image: "/images/preview/sp-elephant.webp",  imageAlt: "Elefanter i naturen" },
      { label: "Kanin",    image: "/images/preview/sp-hare.webp",      imageAlt: "En hare i naturen" },
    ],
    correctIndex: 0,
    explanation:
      "Vargen är stamfader till hunden och kommunicerar på liknande sätt genom att bland annat skälla, morra, gny och yla.",
  },
  {
    id: "easy-2",
    type: "text",
    category: "Däggdjur",
    question: "Vilket djur kallas ofta för skogens konung?",
    options: [
      { label: "Räv",     image: "/images/preview/rodrav-hero.webp",    imageAlt: "En rödräv i naturen" },
      { label: "Älg",     image: "/images/preview/species-moose.webp",  imageAlt: "En älg i skogen" },
      { label: "Ekorre",  image: "/images/preview/sp-squirrel.webp",    imageAlt: "En ekorre på en gren" },
    ],
    correctIndex: 1,
    explanation: "Älgen kallas skogens konung och är det största djuret i skogen.",
  },
  {
    id: "easy-3",
    type: "text",
    category: "Däggdjur",
    question: "Vilket djur rullar ihop sig till en taggig boll när det blir skrämt?",
    options: [
      { label: "Bäver",    image: "/images/preview/sp-beaver.webp",   imageAlt: "En bäver vid vatten" },
      { label: "Rådjur",   image: "/images/preview/sp-roedeer.webp",  imageAlt: "Ett rådjur på en äng" },
      { label: "Igelkott", image: "/images/preview/sp-hedgehog.webp", imageAlt: "En igelkott i gräset" },
    ],
    correctIndex: 2,
    explanation: "Igelkotten har ungefär 5 000–7 000 taggar och rullar ofta ihop sig för att skydda sig.",
  },
  {
    id: "easy-4",
    type: "text",
    category: "Svampar",
    question: "Vilken svamp brukar kallas för skogens guld?",
    options: [
      { label: "Röd flugsvamp", image: "/images/preview/sp-flugsvamp.webp",       imageAlt: "En röd flugsvamp med vita prickar" },
      { label: "Kantarell",     image: "/images/preview/species-chanterelle.webp", imageAlt: "Gula kantareller i skogen" },
      { label: "Fnöskticka",    image: "/images/preview/sp-tinderbracket.webp",    imageAlt: "Fnöskticka på ett träd" },
    ],
    correctIndex: 1,
    explanation: "Kantarellen kallas skogens guld och är en mycket omtyckt matsvamp.",
  },
  {
    id: "easy-5",
    type: "text",
    category: "Växter och bär",
    question: "Vilket av dessa bär är rött och surt?",
    options: [
      { label: "Hjortron", image: "/images/preview/sp-cloudberry.webp",    imageAlt: "Gula hjortron på kärr" },
      { label: "Blåbär",   image: "/images/preview/species-blueberry.webp", imageAlt: "Blåbär på ris" },
      { label: "Lingon",   image: "/images/preview/sp-lingon.webp",         imageAlt: "Röda lingonbär på ris" },
    ],
    correctIndex: 2,
    explanation: "Lingon är röda och sura bär som vanligtvis mognar under augusti och september.",
  },
]

// ---------------------------------------------------------------------------
// Challenge quiz — Naturutmaningen (10 questions)
// ---------------------------------------------------------------------------

const challengeQuestions: Question[] = [
  {
    id: "challenge-1",
    type: "image-choice",
    category: "Djurspår",
    question: "Vilket av dessa spår kommer från en varg?",
    options: [
      {
        label: "Spår A",
        image: "/images/preview/sp-moosetracks.webp",
        alt: "Spår från en älg",
        revealLabel: "Älgspår",
      },
      {
        label: "Spår B",
        image: "/images/preview/sp-wolftracks.webp",
        alt: "Spår från en varg",
        revealLabel: "Vargspår",
      },
      {
        label: "Spår C",
        image: "/images/preview/sp-lynxtracks.webp",
        alt: "Spår från ett lodjur",
        revealLabel: "Lodjursspår",
      },
    ],
    correctIndex: 1,
    explanation:
      "Spår B visar spåret från en varg. Jämför formen med de andra spåren och försök komma ihåg det till nästa gång du är ute i naturen.",
  },
  {
    id: "challenge-2",
    type: "text",
    category: "Däggdjur",
    question: "Vilket djur har stora, platta tassar som fungerar ungefär som snöskor?",
    options: [
      { label: "Räv",   image: "/images/preview/rodrav-hero.webp",    imageAlt: "En rödräv" },
      { label: "Järv",  image: "/images/preview/sp-wolverine.webp",   imageAlt: "En järv i snölandskap" },
      { label: "Utter", image: "/images/preview/sp-otter.webp",       imageAlt: "En utter vid vatten" },
    ],
    correctIndex: 1,
    explanation:
      "Järvens stora och platta tassar fungerar som snöskor och gör att den lätt kan ta sig fram över snön.",
  },
  {
    id: "challenge-3",
    type: "text",
    category: "Däggdjur",
    question:
      "Vilket djur använder sin breda, platta svans för att styra i vattnet och varna genom att plaska?",
    options: [
      { label: "Bäver",  image: "/images/preview/sp-beaver.webp", imageAlt: "En bäver vid vatten" },
      { label: "Gråsäl", image: "/images/preview/sp-seal.webp",   imageAlt: "En gråsäl" },
      { label: "Mink",   image: "/images/preview/sp-mink.webp",   imageAlt: "En mink" },
    ],
    correctIndex: 0,
    explanation:
      "Bävern använder den breda svansen för att styra i vattnet och plaskar hårt med den när den anar fara.",
  },
  {
    id: "challenge-4",
    type: "text",
    category: "Fåglar",
    question: "Vilken fågels bo kan väga omkring 500 kilo?",
    options: [
      { label: "Tjäder",   image: "/images/preview/sp-capercaillie.webp", imageAlt: "En tjäder i skogen" },
      { label: "Bofink",   image: "/images/preview/sp-chaffinch.webp",    imageAlt: "En bofink på en gren" },
      { label: "Havsörn",  image: "/images/preview/species-eagle.webp",   imageAlt: "En havsörn" },
    ],
    correctIndex: 2,
    explanation:
      "Havsörnens stora och tunga bo kan väga omkring 500 kilo och byggs därför i mycket gamla och kraftiga träd.",
  },
  {
    id: "challenge-5",
    type: "text",
    category: "Fiskar",
    question:
      "Vilken fisk föds i rinnande vatten, vandrar ut i Östersjön och återvänder till sin födelseplats för att lägga rom?",
    options: [
      { label: "Abborre", image: "/images/preview/sp-perch.webp",  imageAlt: "En abborre" },
      { label: "Lax",     image: "/images/preview/sp-salmon.webp", imageAlt: "En lax" },
      { label: "Lake",    image: "/images/preview/sp-burbot.webp", imageAlt: "En lake" },
    ],
    correctIndex: 1,
    explanation:
      "Den baltiska laxen föds i älvar och åar, växer till sig i Östersjön och återvänder sedan till platsen där den föddes.",
  },
  {
    id: "challenge-6",
    type: "text",
    category: "Fiskar",
    question: "I vilket hav leker ålen?",
    options: [
      { label: "Bottenhavet",   image: "/images/preview/sp-bottenhavet.webp",   imageAlt: "Östersjöns kust" },
      { label: "Sargassohavet", image: "/images/preview/sp-sargasso.webp",      imageAlt: "Sargassohavet med tång" },
      { label: "Medelhavet",    image: "/images/preview/sp-mediterranean.webp", imageAlt: "Medelhavet" },
    ],
    correctIndex: 1,
    explanation:
      "Den vuxna ålen vandrar till Sargassohavet för att leka. De små glasålarna följer sedan Golfströmmen tillbaka mot våra vatten.",
  },
  {
    id: "challenge-7",
    type: "text",
    category: "Svampar",
    question: "Vilken svamp kallas också för karljohanssvamp?",
    options: [
      { label: "Stensopp",  image: "/images/preview/sp-porcini.webp",      imageAlt: "En stensopp i skogen" },
      { label: "Smörsopp",  image: "/images/preview/sp-smörsopp.webp",     imageAlt: "Smörsopp i skogen" },
      { label: "Fårticka",  image: "/images/preview/sp-fårticka.webp",     imageAlt: "Fårticka vid ett träd" },
    ],
    correctIndex: 0,
    explanation:
      "Stensoppen kallas ofta karljohanssvamp. Namnet förknippas med kung Karl XIV Johan, som tog med sig sina franska matvanor till Sverige.",
  },
  {
    id: "challenge-8",
    type: "text",
    category: "Svampar och träd",
    question:
      "Vad kallas samarbetet där svampar hjälper träd att ta upp näring och får kolföreningar tillbaka?",
    options: [
      { label: "Pollinering", image: "/images/preview/sp-pollination.webp",   imageAlt: "Ett bi pollinerar en blomma" },
      { label: "Mykorrhiza",  image: "/images/preview/sp-mykorrhiza.webp",    imageAlt: "Svampnätverk i marken" },
      { label: "Fotosyntes",  image: "/images/preview/sp-photosynthesis.webp", imageAlt: "Solljus genom trädkronor" },
    ],
    correctIndex: 1,
    explanation:
      "Mykorrhiza är ett samarbete mellan svampar och träd. Svampen hjälper trädet att ta upp näringsämnen, medan trädet ger svampen kolföreningar.",
  },
  {
    id: "challenge-9",
    type: "text",
    category: "Träd",
    question: "Vilket träd har ett ytligt rotsystem och faller därför lättare vid storm?",
    options: [
      { label: "Rönn", image: "/images/preview/sp-rowan.webp",     imageAlt: "En rönn med röda bär" },
      { label: "Gran", image: "/images/preview/sp-gran.webp",      imageAlt: "En gran" },
      { label: "Tall", image: "/images/preview/sp-pine-tree.webp", imageAlt: "En tall i solljus" },
    ],
    correctIndex: 1,
    explanation:
      "Granen har ett ytligt rotsystem och är därför mer känslig för att falla när det stormar.",
  },
  {
    id: "challenge-10",
    type: "text",
    category: "Växter och bär",
    question:
      "Vilken växt kan klara temperaturer ner mot minus 40 grader, även om blommorna är känsliga för frost?",
    options: [
      { label: "Smultron", image: "/images/preview/sp-strawberry.webp", imageAlt: "Smultron på skogsmark" },
      { label: "Hjortron", image: "/images/preview/sp-cloudberry.webp", imageAlt: "Gula hjortron på kärr" },
      { label: "Hallon",   image: "/images/preview/sp-raspberry.webp",  imageAlt: "Röda hallon på buske" },
    ],
    correctIndex: 1,
    explanation:
      "Hjortronplantan är mycket köldtålig och kan klara temperaturer ner mot minus 40 grader, men blommorna kan skadas av frost.",
  },
]

// ---------------------------------------------------------------------------
// Result texts
// ---------------------------------------------------------------------------

export type ResultText = { title: string; text: string }

export function getEasyResultText(score: number): ResultText {
  if (score === 5) return { title: "Full pott!", text: "Du hade rätt på alla frågor. Du är en riktig naturmästare!" }
  if (score >= 3) return { title: "Riktigt bra!", text: "Du har bra koll på djur, svampar och bär." }
  return { title: "Bra försök!", text: "Gör quizet en gång till och se hur mycket du kommer ihåg." }
}

export function getChallengeResultText(score: number): ResultText {
  if (score >= 9) return { title: "Naturmästare", text: "Imponerande! Du har riktigt bra kunskaper om naturen längs Kustvägen." }
  if (score >= 7) return { title: "Naturproffs", text: "Mycket bra resultat. Du kan redan mycket om arter och naturens samband." }
  if (score >= 4) return { title: "Nyfiken naturspanare", text: "Bra jobbat! Du är på god väg och har lärt dig flera nya saker." }
  return { title: "Bra början", text: "Naturen är full av saker att upptäcka. Testa igen och se om du kan slå ditt resultat." }
}

// ---------------------------------------------------------------------------
// Exported quizzes
// ---------------------------------------------------------------------------

export const quizzes: Quiz[] = [
  {
    id: "easy",
    title: "Lilla naturquizet",
    description: "Ett enkelt och roligt quiz för barn som vill upptäcka djuren och naturen.",
    estimatedTime: "Cirka 2 minuter",
    questionCount: 5,
    questions: easyQuestions,
  },
  {
    id: "challenge",
    title: "Naturutmaningen",
    description: "Lite klurigare frågor om djurspår, arter, livsmiljöer och naturens samband.",
    estimatedTime: "Cirka 5 minuter",
    questionCount: 10,
    questions: challengeQuestions,
  },
]
