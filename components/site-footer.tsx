"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BedDouble, Compass, Leaf, ShoppingBag, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

const KUSTVAGEN_URL = "https://www.xn--kustvgen-4za.se/";

const highlights = [
  {
    icon: BedDouble,
    label: "Boende",
    description: "Campingar, stugor, hotell och vandrarhem vid havet.",
  },
  {
    icon: ShoppingBag,
    label: "Shopping",
    description: "Konst, hantverk, hem & trädgård och loppisar.",
  },
  {
    icon: UtensilsCrossed,
    label: "Mat & dryck",
    description: "Restauranger, vägkrogar och mysiga caféer.",
  },
  {
    icon: Compass,
    label: "Se & göra",
    description: "Trolska Skogen, sandstränder och äventyr för hela familjen.",
  },
];

const footerLinks = [
  { href: "/", label: "Startsida" },
  { href: "/artsida", label: "Artsida" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/#quiz", label: "Quiz" },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/art" || pathname.startsWith("/art/")) return null;

  return (
    <>
      <section className="bg-paper pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-forest">
            <Image
              src="/images/kustvagen-coast.webp"
              alt="Sommarkväll längs Kustvägen med rött fiskeläge vid havet"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-forest/80" aria-hidden="true" />
            <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-paper/70">
                I samarbete med Kustvägen
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold text-balance text-paper sm:text-5xl">
                Upptäck mer längs Kustvägen
              </h2>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-paper/80">
                Naturen är bara början. När du utforskat djuren och växterna, ta vägen längs kusten genom
                Hälsingland och Medelpad — här väntar boende, shopping, god mat och upplevelser för hela
                familjen.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-paper/10 p-5 ring-1 ring-paper/15 backdrop-blur-sm"
                    >
                      <Icon className="h-6 w-6 text-paper" aria-hidden="true" />
                      <h3 className="mt-4 font-serif text-xl font-semibold text-paper">{item.label}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-paper/75">{item.description}</p>
                    </div>
                  );
                })}
              </div>
              <a
                href={KUSTVAGEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-8 py-3.5 text-sm font-medium tracking-wide text-forest transition-colors hover:bg-white"
              >
                Besök Kustvägen
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-forest">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-moss" aria-hidden="true" />
                <span className="font-serif text-xl font-semibold tracking-tight text-paper">Natur Info</span>
              </div>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-paper/70">
                Din digitala guide till djur, fåglar, fiskar, svampar, träd och växter i Hälsingland och
                Västernorrland. Skanna QR-koderna ute i naturen och kom närmare.
              </p>
            </div>

            <nav aria-label="Sidfot" className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-paper/60">Utforska</h2>
              <ul className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-paper/80 transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-paper/60">Partner</h2>
              <a
                href={KUSTVAGEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-paper/80 transition-colors hover:text-paper"
              >
                Kustvägen
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-paper/60">© 2026 Natur Info. Alla rättigheter förbehållna.</p>
            <p className="text-xs text-paper/60">Ett projekt i samarbete med Kustvägen.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
