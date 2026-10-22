import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-24 sm:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-moss">Natur Info</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold text-balance text-forest sm:text-6xl">
        Sidan finns inte
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
        Den här adressen finns inte i naturguiden. Okända artnamn leder inte vidare till ett annat
        artporträtt.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-deep"
      >
        Till startsidan
      </Link>
    </main>
  );
}
