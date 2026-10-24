import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { QuizClient } from "@/components/quiz-client";
import { contentLevelLabel, publicCardLevelBadge } from "@/lib/content-level-label";
import { previewContentLevel, species } from "@/lib/catalogue-data";
import { customerPreviewSpeciesSlugs } from "@/lib/customer-preview/species";

const categories = [
  { title: "Däggdjur", image: "/images/categories/mammals.webp", alt: "Rådjur i morgonljus i en barrskog", key: "daggdjur" },
  { title: "Fåglar", image: "/images/categories/birds.webp", alt: "Rödhake på en lavbevuxen gren", key: "faglar" },
  { title: "Fiskar", image: "/images/categories/fish.webp", alt: "Fisk i grunt, solbelyst vatten", key: "fiskar" },
  { title: "Svampar", image: "/images/categories/fungi.webp", alt: "Gula svampar på mossig skogsmark", key: "svampar" },
  { title: "Träd", image: "/images/categories/trees.webp", alt: "Tallskog i motljus", key: "trad" },
  { title: "Växter & Bär", image: "/images/categories/plants.webp", alt: "Blåbär och lingon i en skogsbacke", key: "vaxter" },
];

function featuredSpecies(title: string) {
  return species.find((item) => item.name === title);
}

function featuredLevel(title: string) {
  const match = featuredSpecies(title);
  const level = match ? previewContentLevel[match.slug] : undefined;
  return publicCardLevelBadge(level ? contentLevelLabel(level) : null);
}

function featuredHref(title: string) {
  const match = featuredSpecies(title);
  if (!match || !customerPreviewSpeciesSlugs.has(match.slug)) return null;
  return `/art/${match.slug}`;
}

const featuredCardClass =
  "relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-paper/10";

const featured = [
  { title: "Älg", image: "/images/featured/alg.webp", category: "Däggdjur" },
  { title: "Havsörn", image: "/images/featured/havsorn.webp", category: "Fåglar" },
  { title: "Gädda", image: "/images/featured/gadda.webp", category: "Fiskar" },
  { title: "Kantarell", image: "/images/featured/kantarell.webp", category: "Svampar" },
  { title: "Tall", image: "/images/featured/tall.webp", category: "Träd" },
  { title: "Lingon", image: "/images/featured/lingon.webp", category: "Växter & Bär" },
];

export default function HomePage() {
  return (
    <main className="bg-paper">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/home-hero.webp"
          alt="Älg i en dimhöljd nordisk skog i morgonljuset"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[center_88%]"
        />
        <div className="absolute inset-0 bg-forest-deep/15" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/25 to-forest-deep/65"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <p className="mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-brass">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Hälsingland &amp; Västernorrland
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-balance text-white sm:text-6xl lg:text-7xl">
            Upptäck naturen längs Kustvägen
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80">
            Utforska djur, fåglar, fiskar, svampar, träd och växter i Hälsingland och Västernorrland.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#kategorier"
              className="rounded-full bg-brass px-8 py-3.5 text-sm font-medium tracking-wide text-forest-deep transition-colors hover:bg-[#c9a566]"
            >
              Utforska naturguiden
            </a>
            <a
              href="#karta"
              className="rounded-full border border-white/70 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white/10"
            >
              Visa kartan
            </a>
          </div>
        </div>
      </section>

      <section id="kategorier" className="scroll-mt-24 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-balance text-forest sm:text-5xl">
            Upptäck våra kategorier
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/artsida?kategori=${category.key}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent"
                  aria-hidden="true"
                />
                <h3 className="absolute bottom-5 left-5 right-5 font-serif text-2xl font-medium text-white sm:text-3xl">
                  {category.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="utvalda" className="bg-forest-deep py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-balance text-paper sm:text-5xl">
            Utvalda arter
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-pretty text-paper/60">
            Sex arter från skog, sjö och kust — utforska var och en på nära håll.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => {
              const href = featuredHref(item.title);
              const card = (
                <>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#12180F] via-[#12180F]/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute top-3 left-3 rounded bg-brass px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-forest-deep uppercase">
                    {item.category}
                  </span>
                  {featuredLevel(item.title) ? (
                    <span className="absolute top-3 right-3 rounded bg-paper px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-forest-deep">
                      {featuredLevel(item.title)}
                    </span>
                  ) : null}
                  <div className="relative p-6">
                    <h3 className="font-serif text-3xl font-medium leading-tight text-paper">{item.title}</h3>
                    <span className="mt-4 block h-px w-12 bg-brass" aria-hidden="true" />
                  </div>
                </>
              );
              if (!href) {
                return (
                  <article key={item.title} className={featuredCardClass}>
                    {card}
                  </article>
                );
              }
              return (
                <Link key={item.title} href={href} className={featuredCardClass}>
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-forest">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-6 py-20 sm:px-12 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-xl">
              <h2 className="font-serif text-3xl font-semibold text-balance text-paper sm:text-5xl">
                Din guide till naturen
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-paper/80">
                Kustvägen Naturguide är en digital förlängning av naturen själv. Skanna QR-koderna på våra
                informationsskyltar ute i landskapet och kom närmare djuren och växterna som lever här. Vi bjuder
                in till äkthet, lugn och upptäckarglädje i norra Sveriges vackra kustlandskap.
              </p>
            </div>
          </div>
          <div className="relative h-full min-h-[320px]">
            <Image
              src="/images/about-forest-path.webp"
              alt="Mossbelagd skogsstig genom en dimhöljd nordisk skog"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="quiz" className="scroll-mt-24 bg-paper">
        <QuizClient />
      </section>

      <section id="karta" className="scroll-mt-24 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/map-coastline.webp"
              alt="Flygvy över en nordisk kustlinje med skog och hav"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-forest/75" aria-hidden="true" />
            <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-28">
              <h2 className="font-serif text-3xl font-semibold text-balance text-white sm:text-5xl">
                Hitta våra naturplatser
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
                Utforska var våra fysiska skyltar är utplacerade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
