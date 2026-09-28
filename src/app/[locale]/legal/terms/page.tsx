import type { Metadata } from "next"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import Policy from "../Policy"
import { termsAndConditionsData } from "./data"

const META: Record<Locale, { title: string; description: string }> = {
  en: { title: "Terms and Conditions", description: "The terms that govern your use of the Miki Stec (Simplethis s.r.o.) website and services." },
  sk: { title: "Obchodné podmienky", description: "Podmienky, ktorými sa riadi používanie webovej stránky a služieb Miki Stec (Simplethis s.r.o.)." },
  cz: { title: "Obchodní podmínky", description: "Podmínky, kterými se řídí používání webové stránky a služeb Miki Stec (Simplethis s.r.o.)." },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "en"
  return {
    ...pageMetadata(locale, "/legal/terms", META[locale]),
    robots: { index: true, follow: true },
  }
}

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: raw } = await params
    const locale = isLocale(raw) ? raw : "en"
    return (

        <Policy data={termsAndConditionsData[locale]} />

    )
}
