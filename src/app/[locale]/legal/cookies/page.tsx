import type { Metadata } from "next"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import Policy from "../Policy"
import { cookiesData } from "./data"

const META: Record<Locale, { title: string; description: string }> = {
  en: { title: "Cookie Policy", description: "How Miki Stec (Simplethis s.r.o.) uses cookies and similar tracking technologies." },
  sk: { title: "Zásady používania súborov cookie", description: "Ako Miki Stec (Simplethis s.r.o.) používa súbory cookie a podobné sledovacie technológie." },
  cz: { title: "Zásady používání souborů cookie", description: "Jak Miki Stec (Simplethis s.r.o.) používá soubory cookie a podobné sledovací technologie." },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "en"
  return {
    ...pageMetadata(locale, "/legal/cookies", META[locale]),
    robots: { index: true, follow: true },
  }
}

export default async function Cookies({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: raw } = await params
    const locale = isLocale(raw) ? raw : "en"
    return (

        <Policy data={cookiesData[locale]} />

    )
}
