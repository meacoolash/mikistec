import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://mikistec.com";
const SITE_NAME = "Miki Stec";
const TITLE_DEFAULT = "Miki Stec — You're good. Your website should be too.";
const DESCRIPTION =
  "I research your business, write it, build it, and launch it. You just say yes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s — Miki Stec",
  },
  description: DESCRIPTION,
  keywords: [
    "web design",
    "web development",
    "custom website design",
    "freelance web developer",
    "StoryBrand website design",
    "done-for-you website",
  ],
  authors: [{ name: "Miki Stec", url: SITE_URL }],
  creator: "Miki Stec",
  publisher: "Miki Stec",
  alternates: {
    canonical: "/",
  },
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    locale: "en_US",
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

export const viewport: Viewport = {
  themeColor: "#2E58E0",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en",
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
          name: "Website design and development",
          description: DESCRIPTION,
        },
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      jobTitle: "Web Designer & Developer",
      url: SITE_URL,
      image: `${SITE_URL}/miki-portrait.jpg`,
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
