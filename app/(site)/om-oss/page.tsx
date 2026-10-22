import Image from "next/image";
import { Leaf } from "lucide-react";

export default function OmOssPage() {
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
            Om oss
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-paper/80 md:text-lg">
            Berättelsen bakom Natur Info kommer snart.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-8">
        <Leaf className="mx-auto h-8 w-8 text-moss" aria-hidden="true" />
        <h2 className="mt-6 font-serif text-2xl font-semibold text-forest sm:text-3xl">Vi förbereder denna sida</h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink/70">
          Här kommer du snart att kunna läsa mer om projektet Natur Info, samarbetet med Kustvägen och teamet
          bakom naturguiden. Kom tillbaka snart!
        </p>
      </section>
    </main>
  );
}
