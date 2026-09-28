import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { HTML_LANG, LOCALES, OG_LOCALE, SITE_URL, alternates, isLocale, type Locale } from "@/lib/i18n";
import "../globals.css";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["800", "900"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const SITE_NAME = "Miki Stec";

const COPY = {
  en: {
    title: "Miki Stec | You're good. Your website should be too.",
    description: "I research your business, write it, build it, and launch it. You just say yes.",
    keywords: [
      "web design",
      "web development",
      "custom website design",
      "freelance web developer",
      "StoryBrand website design",
      "done-for-you website",
    ],
    service: "Website design and development",
    jobTitle: "Web Designer & Developer",
  },
  sk: {
    title: "Miki Stec | Ste dobrí. Váš web by mal byť tiež.",
    description: "Preskúmam vaše podnikanie, napíšem texty, vytvorím web a spustím ho. Vy len poviete áno.",
    keywords: [
      "tvorba webových stránok",
      "webdizajn",
      "web na mieru",
      "freelance webový vývojár",
      "StoryBrand web",
      "web na kľúč",
    ],
    service: "Návrh a tvorba webových stránok",
    jobTitle: "Webdizajnér a vývojár",
  },
  cz: {
    title: "Miki Stec | Jste dobří. Váš web by měl být taky.",
    description: "Prozkoumám vaše podnikání, napíšu texty, vytvořím web a spustím ho. Vy jen řeknete ano.",
    keywords: [
      "tvorba webových stránek",
      "webdesign",
      "web na míru",
      "freelance webový vývojář",
      "StoryBrand web",
      "web na klíč",
    ],
    service: "Návrh a tvorba webových stránek",
    jobTitle: "Webdesignér a vývojář",
  },
} satisfies Record<Locale, unknown>;

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const { title: TITLE_DEFAULT, description: DESCRIPTION, keywords } = COPY[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: TITLE_DEFAULT,
      template: "%s | Miki Stec",
    },
    description: DESCRIPTION,
    keywords,
    authors: [{ name: "Miki Stec", url: SITE_URL }],
    creator: "Miki Stec",
    publisher: "Miki Stec",
    alternates: alternates(locale, "/"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: alternates(locale, "/")?.canonical as string,
      siteName: SITE_NAME,
      title: TITLE_DEFAULT,
      description: DESCRIPTION,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE_DEFAULT,
      description: DESCRIPTION,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-icon",
    },
    category: "business",
  };
}

export const viewport: Viewport = {
  themeColor: "#2E58E0",
  colorScheme: "light",
};

function jsonLd(locale: Locale) {
  const { description: DESCRIPTION, service, jobTitle } = COPY[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: LOCALES.map((l) => HTML_LANG[l]),
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        legalName: "Simplethis s.r.o.",
        url: SITE_URL,
        image: `${SITE_URL}/miki-portrait.jpg`,
        logo: `${SITE_URL}/android-chrome-192x192.png`,
        description: DESCRIPTION,
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "SK" },
        founder: { "@id": `${SITE_URL}/#person` },
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
            description: DESCRIPTION,
          },
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle,
        url: SITE_URL,
        image: `${SITE_URL}/miki-portrait.jpg`,
        worksFor: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={HTML_LANG[locale]} className="scroll-smooth">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
        />
        {children}
      </body>
    </html>
  );
}
