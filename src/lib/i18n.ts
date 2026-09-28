import type { Metadata } from "next"

/**
 * Site languages. English lives at the root (/pricing), the others under a
 * prefix (/sk/pricing, /cz/pricing). src/middleware.ts maps the unprefixed
 * paths onto the [locale] segment and picks the language from the browser.
 */
export const LOCALES = ["en", "sk", "cz"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "en"

export const SITE_URL = "https://mikistec.com"

/** ISO code for <html lang> and hreflang ("cz" is the country, Czech is "cs"). */
export const HTML_LANG: Record<Locale, string> = { en: "en", sk: "sk", cz: "cs" }
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", sk: "sk_SK", cz: "cs_CZ" }
export const LOCALE_LABEL: Record<Locale, string> = { en: "EN", sk: "SK", cz: "CZ" }

export function isLocale(raw: unknown): raw is Locale {
  return typeof raw === "string" && (LOCALES as readonly string[]).includes(raw)
}

/** "/pricing" in the given language: "/pricing", "/sk/pricing", "/cz/pricing". Leaves external links alone. */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/api/")) return path
  if (locale === DEFAULT_LOCALE) return path
  return path === "/" ? `/${locale}` : path.startsWith("/#") ? `/${locale}${path.slice(1)}` : `/${locale}${path}`
}

/** "/sk/pricing" → "/pricing", so pages can compare paths regardless of language. */
export function stripLocale(path: string): string {
  const [, first, ...rest] = path.split("/")
  if (!isLocale(first)) return path
  return `/${rest.join("/")}`
}

/** canonical + hreflang alternates for a page, given its unprefixed path. */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [HTML_LANG[l], localePath(l, path)]),
  )
  languages["x-default"] = path
  return { canonical: localePath(locale, path), languages }
}

/** Title, description, canonical, hreflang and matching OG/Twitter tags for one page. */
export function pageMetadata(
  locale: Locale,
  path: string,
  { title, description }: { title?: string; description: string },
): Metadata {
  const full = title ? `${title} | Miki Stec` : undefined
  return {
    ...(title && { title }),
    description,
    alternates: alternates(locale, path),
    openGraph: {
      ...(full && { title: full }),
      description,
      url: localePath(locale, path),
      locale: OG_LOCALE[locale],
    },
    twitter: { ...(full && { title: full }), description },
  }
}
