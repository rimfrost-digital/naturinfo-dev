import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip">
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-forest"
      >
        Hoppa till innehållet
      </a>
      <SiteHeader />
      <div id="innehall" className="flex flex-1 flex-col">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
