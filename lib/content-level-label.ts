import type { ContentLevel } from "@/sanity/lib/content-model"

export function contentLevelLabel(level: ContentLevel) {
  switch (level) {
    case "full":
      return "FULL"
    case "rich":
      return "RICH"
    case "core":
      return "CORE"
  }
}

/**
 * CORE is the baseline, so public cards leave it unbadged.
 * A null label is an unclassified draft. Neither is another content level.
 */
export function publicCardLevelBadge(label: string | null): "FULL" | "RICH" | null {
  if (label === "FULL" || label === "RICH") return label
  return null
}
