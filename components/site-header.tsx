"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Startsida" },
  { href: "/artsida", label: "Artsida" },
  { href: "/#quiz", label: "Quiz" },
  { href: "/om-oss", label: "Om oss" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-paper/90 backdrop-blur-md">
      <nav aria-label="Huvudmeny" className="relative mx-auto flex max-w-6xl items-center px-6 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Leaf className="h-5 w-5 text-moss" aria-hidden="true" />
          <span className="font-serif text-xl font-semibold tracking-tight text-forest">Natur Info</span>
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink link={link} active={isActive(pathname, link.href)} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="ml-auto rounded-full p-2 text-forest transition-colors hover:bg-forest/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobilmeny"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Stäng menyn" : "Öppna menyn"}</span>
        </button>
      </nav>

      {open ? (
        <ul id="mobilmeny" className="flex flex-col gap-1 border-t border-forest/10 px-6 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink link={link} active={isActive(pathname, link.href)} onNavigate={() => setOpen(false)} />
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}

function NavLink({
  link,
  active,
  onNavigate,
}: {
  link: (typeof links)[number];
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`block rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
        active ? "bg-forest text-paper" : "text-forest hover:bg-forest/10"
      }`}
    >
      {link.label}
    </Link>
  );
}
