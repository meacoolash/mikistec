import { ImageResponse } from "next/og"
import { isLocale, type Locale } from "@/lib/i18n"

export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = "image/png"
export const ogImageAlt = "Miki Stec | You're good. Your website should be too."

const INK = "#14161A"
const PAPER = "#F6F5F3"
const ACCENT = "#2E58E0"

const LOGO_TEXT = "Miki Stec"

const COPY: Record<Locale, { eyebrow: string; headline: string; body: string }> = {
  en: {
    eyebrow: "Websites that sell",
    headline: "You're good. Your website should be too.",
    body: "I research your business, write it, build it, and launch it. You just say yes.",
  },
  sk: {
    eyebrow: "Weby, ktoré predávajú",
    headline: "Ste dobrí. Váš web by mal byť tiež.",
    body: "Preskúmam vaše podnikanie, napíšem texty, vytvorím web a spustím ho. Vy len poviete áno.",
  },
  cz: {
    eyebrow: "Weby, které prodávají",
    headline: "Jste dobří. Váš web by měl být taky.",
    body: "Prozkoumám vaše podnikání, napíšu texty, vytvořím web a spustím ho. Vy jen řeknete ano.",
  },
}

// Google's css2 endpoint serves woff2 to modern browsers, but satori only
// understands ttf/otf/woff — an old-browser user agent makes it fall back
// to a woff/ttf src we can actually pass to ImageResponse.
async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(
    text
  )}`

  const css = await (
    await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
      },
    })
  ).text()

  const match = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype|woff)'\)/)
  if (!match) throw new Error(`Could not resolve font file for ${family} ${weight}`)

  const fontResponse = await fetch(match[1])
  return fontResponse.arrayBuffer()
}

function SparkleMark({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "flex" }}
    >
      <path
        d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
        fill={color}
      />
    </svg>
  )
}

/** Default export for [locale]/opengraph-image and twitter-image; params is a Promise in Next 15. */
export async function renderOgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = COPY[isLocale(locale) ? locale : "en"]
  // The eyebrow is uppercased by CSS, so its font subset needs the capitals (incl. diacritics) too.
  const eyebrowText = t.eyebrow + t.eyebrow.toUpperCase()

  const [archivoBlack, plexMedium, plexSemibold, plexRegular] = await Promise.all([
    loadGoogleFont("Archivo", 900, t.headline),
    loadGoogleFont("IBM+Plex+Sans", 500, LOGO_TEXT),
    loadGoogleFont("IBM+Plex+Sans", 600, eyebrowText),
    loadGoogleFont("IBM+Plex+Sans", 400, t.body),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 80,
            display: "flex",
            color: "rgba(20,22,26,0.6)",
            fontSize: 24,
            fontFamily: "IBM Plex Sans",
            fontWeight: 500,
          }}
        >
          {LOGO_TEXT}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: ACCENT,
            fontSize: 20,
            fontFamily: "IBM Plex Sans",
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          <SparkleMark color={ACCENT} size={18} />
          <span style={{ display: "flex" }}>{t.eyebrow}</span>
          <SparkleMark color={ACCENT} size={18} />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 72,
            fontFamily: "Archivo",
            fontWeight: 900,
            color: INK,
            textAlign: "center",
            lineHeight: 0.98,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {t.headline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            fontFamily: "IBM Plex Sans",
            fontWeight: 400,
            color: "rgba(20,22,26,0.7)",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          {t.body}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Archivo", data: archivoBlack, weight: 900, style: "normal" },
        { name: "IBM Plex Sans", data: plexMedium, weight: 500, style: "normal" },
        { name: "IBM Plex Sans", data: plexSemibold, weight: 600, style: "normal" },
        { name: "IBM Plex Sans", data: plexRegular, weight: 400, style: "normal" },
      ],
    }
  )
}
