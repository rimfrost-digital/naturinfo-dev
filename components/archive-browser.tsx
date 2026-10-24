"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QrCode, Search } from "lucide-react";
import { contentLevelLabel, publicCardLevelBadge } from "@/lib/content-level-label";
import { customerPreviewSpeciesSlugs } from "@/lib/customer-preview/species";
import {
  categoryFilters,
  categoryLabels,
  previewContentLevel,
  species as allSpecies,
  type CategoryKey,
  type Species,
} from "@/lib/catalogue-data";

export type PublishedCatalogueEntry = {
  slug: string;
  levelLabel: string;
};

export function ArchiveBrowser({ published }: { published: PublishedCatalogueEntry | null }) {
  const requestedCategory = useSearchParams().get("kategori");
  const initialCategory: CategoryKey | "alla" = categoryFilters.some(
    (category) => category.key === requestedCategory,
  )
    ? (requestedCategory as CategoryKey)
    : "alla";

  return <ArchiveFilters key={initialCategory} initialCategory={initialCategory} published={published} />;
}

function ArchiveFilters({
  initialCategory,
  published,
}: {
  initialCategory: CategoryKey | "alla";
  published: PublishedCatalogueEntry | null;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryKey | "alla">(initialCategory);
  const [level, setLevel] = useState<(typeof levelFilters)[number]["key"]>("alla");

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("sv");
    return allSpecies.filter((species) => {
      const matchesCategory = active === "alla" || species.category === active;
      const matchesLevel = level === "alla" || catalogueLevelLabel(species, published) === level;
      const matchesQuery =
        q === "" ||
        species.name.toLocaleLowerCase("sv").includes(q) ||
        species.latin.toLocaleLowerCase("sv").includes(q);
      return matchesCategory && matchesLevel && matchesQuery;
    });
  }, [query, active, level, published]);

  return (
    <div className="bg-paper">
      <div className="sticky top-16 z-30 border-b border-moss/40 bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-moss"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Sök på svenskt eller latinskt namn..."
              aria-label="Sök art"
              className="w-full rounded-full border border-moss/40 bg-white py-3 pr-4 pl-12 font-sans text-forest outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categoryFilters.map((category) => {
              const isActive = active === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActive(category.key)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-1.5 font-sans text-sm transition ${
                    isActive
                      ? "border-forest bg-forest text-paper"
                      : "border-moss bg-transparent text-moss hover:bg-moss/10"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {levelFilters.map((option) => {
              const isActive = level === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setLevel(option.key)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-1.5 font-sans text-sm transition ${
                    isActive
                      ? "border-forest bg-forest text-paper"
                      : "border-moss bg-transparent text-moss hover:bg-moss/10"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-sans text-sm text-moss">Visar {filtered.length} arter</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {filtered.length === 0 ? (
          <p className="py-20 text-center font-serif text-2xl text-forest">Inga arter matchade din sökning.</p>
        ) : (
          <>
            <div className="mb-12 flex items-center gap-5 rounded-xl bg-brass p-6 md:p-8">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-white md:size-20">
                <QrCode className="size-10 text-black md:size-12" aria-hidden="true" />
              </div>
              <p className="font-sans text-base leading-relaxed text-forest-deep md:text-lg">
                Ute i naturen? Skanna QR-koden på våra fysiska skyltar längs Kustvägen för att läsa mer om arten
                direkt i din telefon.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {filtered.map((species) => (
                <SpeciesCard key={species.slug} species={species} published={published} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const levelFilters = [
  { key: "alla", label: "Alla nivåer" },
  { key: "FULL", label: "FULL" },
  { key: "RICH", label: "RICH" },
  { key: "CORE", label: "CORE" },
] as const;

function catalogueLevelLabel(species: Species, published: PublishedCatalogueEntry | null) {
  if (published?.slug === species.slug) return published.levelLabel;
  const preview = previewContentLevel[species.slug];
  return preview ? contentLevelLabel(preview) : null;
}

function SpeciesCard({
  species,
  published,
}: {
  species: Species;
  published: PublishedCatalogueEntry | null;
}) {
  const migrated = published?.slug === species.slug;
  const hasPage = migrated || customerPreviewSpeciesSlugs.has(species.slug);
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={species.image}
          alt={`${species.name} (${species.latin})`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover${hasPage ? " transition duration-500 group-hover:scale-105" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 left-3 rounded bg-brass px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-forest-deep uppercase">
          {categoryLabels[species.category]}
        </span>
        {publicCardLevelBadge(catalogueLevelLabel(species, published)) ? (
          <span className="absolute top-3 right-3 rounded bg-paper px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-forest-deep">
            {publicCardLevelBadge(catalogueLevelLabel(species, published))}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-serif text-2xl leading-tight text-paper">{species.name}</h3>
        <p className="font-sans text-sm text-moss italic">{species.latin}</p>
      </div>
    </>
  );

  if (!hasPage) {
    return <article className="flex flex-col overflow-hidden rounded-xl bg-forest-deep shadow-sm">{body}</article>;
  }

  return (
    <Link
      href={`/art/${species.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-forest-deep shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {body}
    </Link>
  );
}
