"use client"

import { usePathname } from "next/navigation"
import Link, { useLocale } from "@/lib/i18n-client"
import { stripLocale } from "@/lib/i18n"
import { LanguageMenu } from "./language-switcher"

interface HeaderProps {
    hideNav?: boolean,
}

const COPY = {
    en: {
        build: "I build",
        buildBubble: "I research your business, write it, build it, and launch it. You just say yes.",
        coach: "You build",
        coachBubble: "I coach you to build your own website and AI agents, one-on-one.",
        pricing: "Pricing",
        cta: "YES",
    },
    sk: {
        build: "Postavím",
        buildBubble: "Preskúmam vaše podnikanie, napíšem texty, vytvorím web a spustím ho. Vy len poviete áno.",
        coach: "Naučím",
        coachBubble: "Naučím vás postaviť si vlastný web a AI agentov, individuálne.",
        pricing: "Cenník",
        cta: "ÁNO",
    },
    cz: {
        build: "Postavím",
        buildBubble: "Prozkoumám vaše podnikání, napíšu texty, vytvořím web a spustím ho. Vy jen řeknete ano.",
        coach: "Naučím",
        coachBubble: "Naučím vás postavit si vlastní web a AI agenty, individuálně.",
        pricing: "Ceník",
        cta: "ANO",
    },
}

const ITEM = "px-2 sm:px-3 text-[15px] sm:text-[17px] font-medium transition-colors underline-offset-8 decoration-2 decoration-accent"
const IDLE = "text-ink/70 hover:text-ink"
const ACTIVE = "text-ink underline"

/* Menu item with a comic speech bubble on hover or keyboard focus; the bubble is a link too. */
function WithBubble({ href, label, className, current, children }: {
    href: string,
    label: string,
    className: string,
    current?: "page",
    children: React.ReactNode,
}) {
    return (
        <span className="group relative">
            <Link className={className} href={href} aria-current={current}>
                {label}
            </Link>
            <span className="invisible absolute left-1/2 top-full z-50 w-[min(15rem,calc(100vw_-_2rem))] -translate-x-1/2 pt-4 opacity-0 transition-opacity group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100 group-hover:visible group-hover:opacity-100">
                <Link
                    href={href}
                    className="relative block rounded-[1.4rem] border-2 border-ink bg-white px-5 py-4 text-center text-base leading-snug text-ink transition-colors hover:text-accent"
                >
                    <span
                        aria-hidden="true"
                        className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-ink bg-white"
                    />
                    {children} <span aria-hidden="true">→</span>
                </Link>
            </span>
        </span>
    )
}

export const Header = ({ hideNav }: HeaderProps) => {
    const t = COPY[useLocale()]
    const path = stripLocale(usePathname())
    const cls = (href: string) => `${ITEM} ${path === href ? ACTIVE : IDLE}`
    const current = (href: string) => (path === href ? "page" : undefined)

    return (
        // Sticky on large desktops only; bg-inherit takes the page's own background (paper or white).
        <header className="relative lg:sticky lg:top-0 z-40 lg:bg-inherit px-4 sm:px-6 h-20 flex items-center justify-between">
            <Link className="hidden sm:inline text-[17px] font-medium tracking-tight text-ink/70 hover:text-ink" href="/">
                Miki Stec
            </Link>
            {!hideNav && (
                <nav className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end sm:gap-3">
                    <WithBubble href="/" label={t.build} className={cls("/")} current={current("/")}>
                        {t.buildBubble}
                    </WithBubble>
                    <WithBubble href="/coaching" label={t.coach} className={cls("/coaching")} current={current("/coaching")}>
                        {t.coachBubble}
                    </WithBubble>
                    <Link className={cls("/pricing")} href="/pricing" aria-current={current("/pricing")}>
                        {t.pricing}
                    </Link>
                    <Link
                        className="ml-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-3 sm:px-4 py-2 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
                        href="/#contact"
                    >
                        {t.cta} <span aria-hidden="true" className="hidden min-[400px]:inline">→</span>
                    </Link>
                    <LanguageMenu />
                </nav>
            )}
            {hideNav && <div className="ml-auto"><LanguageMenu /></div>}
        </header>
    )
}
