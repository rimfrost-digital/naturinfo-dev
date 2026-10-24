import Link from "next/link"
import { havsornUiLabels, type HavsornPreviewLang } from "@/lib/customer-preview/havsorn-language"

const OPTIONS: { id: HavsornPreviewLang; href: string; label: string }[] = [
  { id: "sv", href: "/art/havsorn", label: "SV" },
  { id: "en", href: "/art/havsorn?lang=en", label: "EN" },
  { id: "de", href: "/art/havsorn?lang=de", label: "DE" },
]

export function HavsornLanguageSwitch({ active }: { active: HavsornPreviewLang }) {
  return (
    <div
      role="group"
      aria-label={havsornUiLabels(active).language}
      className="flex shrink-0 rounded-full bg-forest-deep/30 p-1 backdrop-blur-md"
    >
      {OPTIONS.map((option) => {
        const selected = option.id === active
        return (
          <Link
            key={option.id}
            href={option.href}
            scroll={false}
            aria-current={selected ? "true" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-medium tracking-wide ${
              selected ? "bg-paper text-forest-deep" : "text-paper hover:bg-forest-deep/40"
            }`}
          >
            {option.label}
          </Link>
        )
      })}
    </div>
  )
}
