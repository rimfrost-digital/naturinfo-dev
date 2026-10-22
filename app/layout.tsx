import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Natur Info — Upptäck naturen längs Kustvägen",
    template: "%s — Natur Info",
  },
  description:
    "Utforska djur, fåglar, fiskar, svampar, träd och växter i Hälsingland och Västernorrland.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
