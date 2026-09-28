"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useLocale } from "@/lib/i18n-client"
import { HTML_LANG, LOCALES, LOCALE_LABEL, stripLocale, type Locale } from "@/lib/i18n"

const NAME: Record<Locale, string> = { en: "English", sk: "Slovenčina", cz: "Čeština" }
const ARIA: Record<Locale, string> = { en: "Language", sk: "Jazyk", cz: "Jazyk" }

/* EN links go to /en/... on purpose: the middleware remembers the pick and
   redirects to the unprefixed URL. Plain <a>: switching reloads the whole page. */
function useHref() {
    const path = stripLocale(usePathname())
    return (l: Locale) => `/${l}${path === "/" ? "" : path}`
}

/** Inline EN · SK · CZ, for the footer. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
    const locale = useLocale()
    const href = useHref()
    return (
        <nav aria-label={ARIA[locale]} className={`flex gap-3 text-xs ${className}`}>
            {LOCALES.map((l) => (
                <a
                    key={l}
                    href={href(l)}
                    hrefLang={HTML_LANG[l]}
                    aria-current={l === locale ? "true" : undefined}
                    className={l === locale ? "font-semibold text-ink" : "text-ink/50 hover:text-ink"}
                >
                    {LOCALE_LABEL[l]}
                </a>
            ))}
        </nav>
    )
}

/** Compact "SK ▾" dropdown, for the header. */
export function LanguageMenu() {
    const locale = useLocale()
    const href = useHref()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const close = (e: MouseEvent | KeyboardEvent) => {
            if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", close)
        document.addEventListener("keydown", close)
        return () => {
            document.removeEventListener("mousedown", close)
            document.removeEventListener("keydown", close)
        }
    }, [open])

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={`${ARIA[locale]}: ${NAME[locale]}`}
                className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-2 text-[13px] sm:text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
            >
                {LOCALE_LABEL[locale]}
                <span aria-hidden="true" className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
            </button>
            {open && (
                <ul className="absolute right-0 top-full z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border-2 border-ink bg-white py-1 text-sm shadow-lg">
                    {LOCALES.map((l) => (
                        <li key={l}>
                            <a
                                href={href(l)}
                                hrefLang={HTML_LANG[l]}
                                lang={HTML_LANG[l]}
                                aria-current={l === locale ? "true" : undefined}
                                className={`flex items-center justify-between gap-4 px-4 py-2 transition-colors hover:bg-paper ${
                                    l === locale ? "font-semibold text-ink" : "text-ink/70 hover:text-ink"
                                }`}
                            >
                                {NAME[l]}
                                <span className="text-xs text-ink/40">{LOCALE_LABEL[l]}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
