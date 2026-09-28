import type { Metadata } from "next"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import Policy from "../Policy"
import { privacyPolicyData } from "./data"

const META: Record<Locale, { title: string; description: string }> = {
  en: { title: "Privacy Policy", description: "How Miki Stec (Simplethis s.r.o.) collects, uses, and protects your personal data." },
  sk: { title: "Zásady ochrany osobných údajov", description: "Ako Miki Stec (Simplethis s.r.o.) získava, používa a chráni vaše osobné údaje." },
  cz: { title: "Zásady ochrany osobních údajů", description: "Jak Miki Stec (Simplethis s.r.o.) získává, používá a chrání vaše osobní údaje." },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "en"
  return {
    ...pageMetadata(locale, "/legal/privacy", META[locale]),
    robots: { index: true, follow: true },
  }
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: raw } = await params
    const locale = isLocale(raw) ? raw : "en"
    return (

        <Policy data={privacyPolicyData[locale]} />

    )
}
