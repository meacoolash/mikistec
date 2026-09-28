import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { COPY } from "./copy"
import { AboutView } from "./AboutView"

type Props = { params: Promise<{ locale: string }> }

async function getLocale(params: Props["params"]): Promise<Locale> {
  const { locale } = await params
  return isLocale(locale) ? locale : "en"
}

export async function generateMetadata({ params }: Props) {
  const locale = await getLocale(params)
  const t = COPY[locale]
  return pageMetadata(locale, "/about", { title: t.metaTitle, description: t.metaDescription })
}

export default function AboutPage() {
  return <AboutView />
}
