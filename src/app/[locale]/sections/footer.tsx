"use client"

import Link, { useLocale } from "@/lib/i18n-client"
import { Assistant } from "./assistant"
import { LanguageSwitcher } from "./language-switcher"

const COPY = {
    en: { rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie policy" },
    sk: { rights: "Všetky práva vyhradené.", privacy: "Ochrana súkromia", terms: "Obchodné podmienky", cookies: "Cookies" },
    cz: { rights: "Všechna práva vyhrazena.", privacy: "Ochrana soukromí", terms: "Obchodní podmínky", cookies: "Cookies" },
}

export const Footer = () => {
    const t = COPY[useLocale()]
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 border-t border-ink/10">
            <p className="text-xs text-ink/50">© {new Date().getFullYear()} Miki Stec. {t.rights}</p>
            <LanguageSwitcher className="sm:ml-6" />
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4 text-ink/50" href="/legal/privacy">
                    {t.privacy}
                </Link>
                <Link className="text-xs hover:underline underline-offset-4 text-ink/50" href="/legal/terms">
                    {t.terms}
                </Link>
                <Link className="text-xs hover:underline underline-offset-4 text-ink/50" href="/legal/cookies">
                    {t.cookies}
                </Link>
            </nav>
            <Assistant />
        </footer>
    )
}
