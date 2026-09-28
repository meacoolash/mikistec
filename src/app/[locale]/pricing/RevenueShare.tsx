"use client"

import { useState } from "react"
import Link, { useLocale } from "@/lib/i18n-client"
import type { Locale } from "@/lib/i18n"

const en = {
  trigger: "or revenue share",
  close: "Close",
  title: "Launching something?",
  body: "For selected projects, I can work on a revenue-share basis instead of a fixed price.",
  cta: "Let's talk",
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    trigger: "alebo podiel z tržieb",
    close: "Zavrieť",
    title: "Spúšťate niečo nové?",
    body: "Pri vybraných projektoch môžem namiesto fixnej ceny pracovať za podiel z tržieb.",
    cta: "Poďme sa porozprávať",
  },
  cz: {
    trigger: "nebo podíl z tržeb",
    close: "Zavřít",
    title: "Spouštíte něco nového?",
    body: "U vybraných projektů můžu místo fixní ceny pracovat za podíl z tržeb.",
    cta: "Pojďme si promluvit",
  },
}

export function RevenueShare({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const t = COPY[useLocale()]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`underline decoration-1 underline-offset-4 hover:opacity-80 ${className}`}
      >
        {t.trigger}
      </button>
      {open && (
        <span
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/10 px-6 backdrop-blur-sm"
        >
          <span
            onClick={(e) => e.stopPropagation()}
            className="relative block w-full max-w-sm animate-[pop-in_0.2s_ease-out] border-2 border-[#FFD75E] bg-paper p-7 text-center font-body font-normal leading-normal tracking-normal shadow-xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="absolute right-2 top-2 text-2xl leading-none text-ink/40 hover:text-ink"
            >
              ×
            </button>
            <span className="block font-display text-lg font-black leading-tight text-ink">
              {t.title}
            </span>
            <span className="mt-2 block text-sm font-normal text-ink/70">
              {t.body}
            </span>
            <Link
              href="/?path=build#contact"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              {t.cta} <span aria-hidden="true">→</span>
            </Link>
          </span>
        </span>
      )}
    </>
  )
}
