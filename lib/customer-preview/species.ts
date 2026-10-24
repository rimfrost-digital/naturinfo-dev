import type { PublicImage, SpeciesView } from "@/sanity/lib/types"

/**
 * TEMPORARY customer-preview species pages.
 *
 * This is not the production content architecture and it is not Sanity data.
 * Swedish copy is taken from design/lib/species-pages-data.ts.
 * `publishedLevel` is the locked classification in docs/naturinfo/SPECIES-AUDIT.md.
 * It is not inferred from modules or media.
 *
 * Delete a species from this file when that species is loaded from Sanity.
 * The loader must not use these views when Sanity already has the slug.
 */

const IMAGE = { width: 1024, height: 1024 } as const

function image(url: string, alt: string, caption: string | null = null): PublicImage {
  return { url, alt, caption, credit: null, width: IMAGE.width, height: IMAGE.height }
}

const hero = image(
  "/images/preview/havsorn-hero.webp",
  "Havsörn sitter stolt på en tallgren med blicken riktad över havet",
)

const havsorn: SpeciesView = {
  slug: "havsorn",
  title: "Havsörn",
  scientificName: "Haliaeetus albicilla",
  categoryTitle: "Fåglar",
  publishedLevel: "full",
  description:
    "Lär dig allt om havsörnen längs Kustvägen. Fakta om vingspann, boplats, jakt och var du har bäst chans att få se Nordeuropas största rovfågel.",
  // Public page, not a Sanity draft preview. Draft mode keeps its own banner.
  preview: false,
  sections: [
    { id: "hero", heading: "Hero", image: hero, gap: false },
    {
      id: "introduction",
      heading: "Introduktion",
      body: "Ett möte med havsörnen är en mäktig upplevelse. Med ett vingspann på närmare två och en halv meter är den Nordeuropas största rovfågel och en oslagbar syn när den seglar över Kustvägens havsband och insjöar.\n\nEfter årtionden av hot från miljögifter har arten gjort en fantastisk återhämtning och är idag en stolt karaktärsfågel och symbol för en välmående kustmiljö.",
      quote:
        "Att se havsörnen kretsa över havsbandet är en påminnelse om kuster som återfått sin fulla kraft.",
      gap: false,
    },
    {
      id: "quick_facts",
      heading: "Snabbfakta",
      facts: [
        { label: "Vingspann", value: "200–245 cm" },
        { label: "Vikt", value: "3,5–7,0 kg" },
        { label: "Föda", value: "Fisk & sjöfågel" },
        { label: "Boplats", value: "Gamla tallar & granar" },
      ],
      gap: false,
    },
    {
      id: "documentary",
      heading: "Lyssna på dokumentären",
      audioUrl: "/audio/preview/havsorn-guide-sv.mp3",
      script: null,
      scriptMissing: true,
      gap: false,
    },
    {
      id: "deep_dive",
      heading: "Fördjupning",
      cards: [
        {
          heading: "Kännetecken & Flykt",
          body: "En fullvuxen havsörn har breda, nästan rektangulära vingar med spretande handpennor, ljust gulbrunt huvud och en kritvit stjärt. Ungfåglar är mörkare med fläckig fjäderdräkt. Flykten kännetecknas av tunga, långsamma vingtag varvade med rak glidflykt.",
          caption: "I luften känns havsörnen igen på sina breda, planka-liknande vingar.",
          image: image(
            "/images/preview/havsorn-flykt.webp",
            "Havsörn i flykt med utbredda vingar mot en klarblå sky",
            "I luften känns havsörnen igen på sina breda, planka-liknande vingar.",
          ),
        },
        {
          heading: "Livsmiljö & Häckning",
          body: "Havsörnen trivs i orörda kust- och skärgårdsområden samt vid stora fiskrika sjöar. De bygger gigantiska risbon i gamla tallar eller granar som kan väga flera hundra kilo och återanvänds år efter år.",
          caption: "Boet byggs ut varje år och kan till slut bli flera meter djupt.",
          image: image(
            "/images/preview/havsorn-bo.webp",
            "Stort havsörnsbo i toppen av en gammal tall",
            "Boet byggs ut varje år och kan till slut bli flera meter djupt.",
          ),
        },
        {
          heading: "Jakt & Föda",
          body: "Huvudfödan består av fisk och sjöfågel. Havsörnen slår ofta sitt byte direkt i vattenytan eller stjäl fångst från andra fåglar. Under vintern utgör slaktavfall och as en viktig del av dieten.",
          caption: "Kustvägens vindpinade öar erbjuder perfekta utsiktsplatser för jakt.",
          image: image(
            "/images/preview/havsorn-miljo.webp",
            "Kustlandskap där havsörnen söker sin föda",
            "Kustvägens vindpinade öar erbjuder perfekta utsiktsplatser för jakt.",
          ),
        },
      ],
      gap: false,
    },
    {
      id: "gallery",
      heading: "Bildgalleri",
      images: [
        image("/images/preview/havsorn-hero.webp", "Havsörn på en tallgren vid havet"),
        image("/images/preview/havsorn-flykt.webp", "Havsörn i flykt med utbredda vingar"),
        image("/images/preview/havsorn-bo.webp", "Stort havsörnsbo i toppen av en gammal tall"),
        image("/images/preview/havsorn-miljo.webp", "Kustlandskap där havsörnen söker sin föda"),
      ],
      gap: false,
    },
    {
      id: "video",
      heading: "Video",
      videos: [
        {
          url: "/video/preview/havsorn.mp4",
          title: null,
          poster: hero,
        },
      ],
      gap: false,
    },
    {
      id: "species_sound",
      heading: "Artens ljud",
      label: "Så här låter djuret",
      audioUrl: "/audio/preview/havsorn-ljud.mp3",
      gap: false,
    },
    {
      id: "ask_species",
      heading: "Fråga djuret",
      title: "Fråga havsörnen",
      intro: "Ställ en fråga till havsörnen och lär dig mer om dess liv längs kusten!",
      questions: ["Hur stort är ditt bo?", "Vad äter du helst?", "Hur snabbt flyger du?"],
      gap: false,
    },
  ],
}

const kantarellHero = image(
  "/images/preview/kantarell-hero.webp",
  "En vacker, guldgul kantarell som växer i grön mossa",
)

const kantarell: SpeciesView = {
  slug: "kantarell",
  title: "Kantarell",
  scientificName: "Cantharellus cibarius",
  categoryTitle: "Svampar",
  publishedLevel: "rich",
  description:
    "Lär dig allt om kantarellen, skogens guld. Fakta om kännetecken, bästa växtplatserna längs Kustvägen och klassisk svensk svamptradition.",
  // Public page, not a Sanity draft preview. Draft mode keeps its own banner.
  preview: false,
  sections: [
    { id: "hero", heading: "Hero", image: kantarellHero, gap: false },
    {
      id: "introduction",
      heading: "Introduktion",
      body: "Få saker väcker lika mycket glädje under sensommaren som att upptäcka en gul fläck i mossan. Kantarellen, ofta kallad skogens guld, är en av Kustvägens mest älskade och eftertraktade svampar.\n\nTack vare Kustvägens djupa skogar och fuktiga kustklimat erbjuds perfekta förutsättningar för denna läckra matsvamp, som i århundraden varit en höjdpunkt i den lokala matkulturen.",
      quote:
        "Att hitta sitt eget hemliga kantarellställe är som att hitta en gömd skatt djupt inne i skogen.",
      gap: false,
    },
    {
      id: "quick_facts",
      heading: "Snabbfakta",
      facts: [
        { label: "Hattbredd", value: "3–10 cm" },
        { label: "Färg", value: "Äggul till blekgul" },
        { label: "Säsong", value: "Juli – Oktober" },
        { label: "Växtplats", value: "Löv- och barrskog" },
      ],
      gap: false,
    },
    {
      id: "deep_dive",
      heading: "Fördjupning",
      cards: [
        {
          heading: "Kännetecken & Utseende",
          body: "Kantarellen är lätt att känna igen på sin jämnt äggula färg och trattlika form. Ett av de viktigaste kännetecknen är att den har grenade åsar, inte skivor, som löper långt ner på foten. Köttet är vitt till blekgult och har en mild, fruktig doft som ofta liknas vid aprikos.",
          caption: "Notera de grenade åsarna som löper ner längs foten.",
          image: image(
            "/images/preview/kantarell-detalj.webp",
            "Närbild på kantarellens åsar under hatten",
            "Notera de grenade åsarna som löper ner längs foten.",
          ),
        },
        {
          heading: "Växtplats & Säsong",
          body: "Kantarellen lever i symbios med träd, särskilt björk, gran och tall, och trivs bäst i blandskogar. Den återkommer ofta till samma plats år efter år. Säsongen börjar vanligtvis i juli, efter rejäla sommarregn, och kan sträcka sig ända in i oktober.",
          caption: "Kantareller växer ofta i grupper, så hittar du en finns det ofta fler i närheten.",
          image: image(
            "/images/preview/kantarell-miljo.webp",
            "Ett kluster av kantareller i en fuktig granskogsmiljö",
            "Kantareller växer ofta i grupper, så hittar du en finns det ofta fler i närheten.",
          ),
        },
        {
          heading: "Matkultur & Tradition",
          body: "I svensk matkultur är kantarellen en delikatess. Den klassiska smörstekta kantarellmackan är en älskad tradition efter en lyckad skogspromenad. Svampen är också en fantastisk smaksättare i såser, soppor och vilträtter längs Kustvägens gästgiverier.",
          caption: "En lyckad svamptur resulterar ofta i en korg fylld med skogens guld.",
          image: image(
            "/images/preview/kantarell-mat.webp",
            "En flätad korg fylld med nyplockade, rensade kantareller",
            "En lyckad svamptur resulterar ofta i en korg fylld med skogens guld.",
          ),
        },
      ],
      gap: false,
    },
    {
      id: "gallery",
      heading: "Bildgalleri",
      images: [
        image(
          "/images/preview/kantarell-hero.webp",
          "En vacker, guldgul kantarell som växer i grön mossa",
        ),
        image("/images/preview/kantarell-detalj.webp", "Närbild på kantarellens åsar under hatten"),
        image(
          "/images/preview/kantarell-miljo.webp",
          "Ett kluster av kantareller i en fuktig granskogsmiljö",
        ),
        image(
          "/images/preview/kantarell-mat.webp",
          "En flätad korg fylld med nyplockade, rensade kantareller",
        ),
      ],
      gap: false,
    },
    {
      id: "video",
      heading: "Video",
      videos: [
        {
          url: "/video/preview/kantarell.mp4",
          title: null,
          poster: kantarellHero,
        },
      ],
      gap: false,
    },
    {
      id: "ask_species",
      heading: "Fråga djuret",
      title: "Fråga kantarellen",
      intro: "Ställ en fråga till kantarellen och lär dig mer om hur du hittar den!",
      questions: [
        "Var gömmer du dig bäst?",
        "Kan jag blanda ihop dig med en giftig svamp?",
        "När är bästa tiden att leta efter dig?",
      ],
      gap: false,
    },
  ],
}

const tallHero = image(
  "/images/preview/tall-hero.webp",
  "Ståtlig tall på ett klipputsprång vid kusten",
)

const tallPoster = image("/images/preview/tall-video-poster.webp", "Tallskog längs Kustvägen")

const tall: SpeciesView = {
  slug: "tall",
  title: "Tall",
  scientificName: "Pinus sylvestris",
  categoryTitle: "Träd",
  publishedLevel: "rich",
  description: "Lär känna tallen, kustens vindpinade överlevare.",
  // Public page, not a Sanity draft preview. Draft mode keeps its own banner.
  preview: false,
  sections: [
    { id: "hero", heading: "Hero", image: tallHero, gap: false },
    {
      id: "introduction",
      heading: "Introduktion",
      body: "Tallen är ett av Sveriges mest karaktäristiska och anpassningsbara barrträd. Som ung växer den konformat, men med åldern bildar den en plattare, paraplyliknande krona. Barken nedtill på äldre träd formas till grov, pansarliknande skorpbark ('sköldbark') som skyddar mot brand, medan den övre stammen har en lysande kopparröd färg. Barrarna sitter två och två och sitter kvar i 3 till 8 år beroende på klimat.\n\nLängs Kustvägen möter du tallen i dess mest dramatiska former. På karga klippor och hällmarker tvingas den klamra sig fast med ett djupgående pålrotsystem eller genom att söka sig ner i bergsskrevor. Vindarna formar träden till låga, vridna 'martallar'. Tallen tål extrem torka och saltstänk bättre än granen och spelar en avgörande roll för att binda sand och jord vid kusten.\n\nTallen är en nyckelart i nordiska ekosystem. Gamla tallar och stående död tallved (torrakor) ger boplats och föda åt hundratals arter av svampar, lavar, insekter och fåglar.",
      quote: "Tallen har stått emot kustens stormar i århundraden.",
      gap: false,
    },
    {
      id: "quick_facts",
      heading: "Snabbfakta",
      facts: [
        { label: "Vetenskapligt namn", value: "Pinus sylvestris" },
        { label: "Höjd", value: "15 – 35 meter" },
        { label: "Maxålder", value: "Upp till 500–600 år" },
        { label: "Kännetecken", value: "Rödbrun skorpbark, barr i par, rundad krona som äldre" },
      ],
      gap: false,
    },
    {
      id: "gallery",
      heading: "Bildgalleri",
      images: [
        tallPoster,
        image("/images/preview/tall-hero.webp", "Gammal tall med karaktäristisk rödbrun skorpbark"),
        image("/images/preview/tall-bark.webp", "Närbild på tallbarr i par"),
        image("/images/preview/tall-kotte.webp", "Närbild på grön och brun tallkotte"),
        image("/images/preview/tall-hallmark.webp", "Vriden tall på kustklippa"),
      ],
      gap: false,
    },
    {
      id: "video",
      heading: "Video",
      videos: [
        {
          url: "/video/preview/tall-kustvagen.mp4",
          title: null,
          poster: tallPoster,
        },
      ],
      gap: false,
    },
    {
      id: "ask_species",
      heading: "Fråga djuret",
      title: "Fråga tallen",
      intro:
        "Jag har stått emot kustens stormar i århundraden. Fråga mig om hur jag överlever torka, hur gammal jag kan bli eller vilka djur som bor i min krona!",
      questions: [
        "Hur kan du växa direkt på nakna berget?",
        "Hur gamla kan martallar bli?",
        "Vad är skillnaden på tall och gran?",
      ],
      gap: false,
    },
  ],
}

/** Slugs that have a temporary preview page. Not a list of Sanity documents. */
export const customerPreviewSpeciesSlugs: ReadonlySet<string> = new Set(["havsorn", "kantarell", "tall"])

const customerPreviewSpecies: Record<string, SpeciesView> = {
  havsorn,
  kantarell,
  tall,
}

export function customerPreviewSpeciesPage(slug: string): SpeciesView | null {
  return customerPreviewSpecies[slug] ?? null
}
