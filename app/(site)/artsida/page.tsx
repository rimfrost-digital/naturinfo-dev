import { Suspense } from "react";
import Image from "next/image";
import { ArchiveBrowser } from "@/components/archive-browser";
import { contentLevelLabel } from "@/lib/content-level-label";
import { loadSpeciesPage } from "@/sanity/lib/species-page";

export const instant = false;

export default async function ArtsidaPage() {
  const migrated = await loadSpeciesPage("lodjur");
  const published = migrated
    ? { slug: migrated.slug, levelLabel: contentLevelLabel(migrated.publishedLevel) }
    : null;

  return (
    <main className="bg-paper">
      <section className="relative flex h-[35vh] min-h-[280px] items-center justify-center overflow-hidden">
        <Image
          src="/images/archive-hero.webp"
          alt="Dimhöljd nordisk sjö i gryningen"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/55" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-serif text-4xl font-semibold text-balance text-paper sm:text-5xl md:text-6xl">
            Utforska naturguiden
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-paper/80 md:text-lg">
            Sök och filtrera bland Kustvägens rika djur- och växtliv.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="min-h-[50vh] bg-paper" />}>
        <ArchiveBrowser published={published} />
      </Suspense>
    </main>
  );
}
