import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n"

/**
 * English pages live at the root (/pricing) but render from app/[locale], so
 * unprefixed paths are rewritten to /en/... . /en/... redirects back to the root.
 *
 * Language pick: the first visit follows the browser (Accept-Language), after
 * that the cookie remembers whichever language the visitor last opened, so a
 * Slovak browser can still switch to English and stay there.
 */

const COOKIE = "NEXT_LOCALE"
const YEAR = 60 * 60 * 24 * 365

/** Best match from Accept-Language, e.g. "sk-SK,sk;q=0.9,en;q=0.8" → "sk". */
function fromBrowser(header: string | null): Locale {
  const ranked = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().toLowerCase().split(";q=")
      return { lang: tag.split("-")[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { lang } of ranked) {
    if (lang === "sk") return "sk"
    if (lang === "cs") return "cz"
    if (lang === "en") return "en"
  }
  return DEFAULT_LOCALE
}

function remember(res: NextResponse, locale: Locale) {
  res.cookies.set(COOKIE, locale, { maxAge: YEAR, path: "/", sameSite: "lax" })
  return res
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const first = pathname.split("/")[1]

  if (first === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/"
    // The language switcher links to /en/... so this is also how English gets picked.
    return remember(NextResponse.redirect(url, 307), DEFAULT_LOCALE)
  }

  if (isLocale(first)) {
    const res = NextResponse.next()
    return req.cookies.get(COOKIE)?.value === first ? res : remember(res, first)
  }

  const saved = req.cookies.get(COOKIE)?.value
  const locale = isLocale(saved) ? saved : fromBrowser(req.headers.get("accept-language"))

  if (locale !== DEFAULT_LOCALE) {
    const url = req.nextUrl.clone()
    url.pathname = localePath(locale, pathname)
    const res = NextResponse.redirect(url, 307)
    // Vary so caches don't hand a Slovak redirect to an English browser.
    res.headers.set("Vary", "Accept-Language, Cookie")
    return saved ? res : remember(res, locale)
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`
  url.search = search
  const res = NextResponse.rewrite(url)
  return saved ? res : remember(res, DEFAULT_LOCALE)
}

export const config = {
  // Everything except API routes, Next internals, files with an extension
  // (images, favicon, sitemap.xml, robots.txt, manifest) and generated icons/OG images.
  matcher: ["/((?!api|_next|.*opengraph-image|.*twitter-image|apple-icon|icon-512|.*\\..*).*)"],
}
