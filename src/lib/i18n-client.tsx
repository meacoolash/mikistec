"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
import { ComponentProps } from "react"
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n"

/** The current page's language, from the [locale] route segment. */
export function useLocale(): Locale {
  const { locale } = useParams<{ locale?: string }>()
  return isLocale(locale) ? locale : DEFAULT_LOCALE
}

/** next/link that keeps the visitor in their language: href="/pricing" becomes /sk/pricing on the Slovak site. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale()
  return <NextLink href={typeof href === "string" ? localePath(locale, href) : href} {...props} />
}
