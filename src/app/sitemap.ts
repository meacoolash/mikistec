import type { MetadataRoute } from "next"
import { HTML_LANG, LOCALES, SITE_URL, localePath } from "@/lib/i18n"

const PAGES: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/coaching", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/games", changeFrequency: "monthly", priority: 0.4 },
  { path: "/games/pexeso", changeFrequency: "yearly", priority: 0.3 },
  { path: "/games/stack", changeFrequency: "yearly", priority: 0.3 },
  { path: "/games/builder", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.1 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.1 },
  { path: "/legal/cookies", changeFrequency: "yearly", priority: 0.1 },
]

// Every page in every language, each entry listing its translations (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (locale: (typeof LOCALES)[number], path: string) => `${SITE_URL}${localePath(locale, path)}`

  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: url(locale, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], url(l, path)])) },
    })),
  )
}
