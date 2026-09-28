"use client"

import Link, { useLocale } from "@/lib/i18n-client"
import type { Locale } from "@/lib/i18n"
import { useCallback, useEffect, useRef, useState } from "react"

type ElementType =
  | "headline"
  | "text"
  | "image"
  | "button"
  | "form"
  | "testimonials"
  | "popup"
  | "newsletter"
  | "social"

const SIDEBAR_ITEMS: ElementType[] = [
  "headline",
  "text",
  "image",
  "button",
  "form",
  "testimonials",
  "popup",
  "newsletter",
  "social",
]

type Placed = {
  id: number
  type: ElementType
  xPct: number
  yPct: number
  rotation: number
  controls: number
}

type Toast = { id: number; title: string; body: string }

const REVEAL_AFTER_MS = 23000
const REVEAL_AFTER_COUNT = 9

const THRESHOLDS: { count?: number; ms?: number }[] = [
  { count: 3 },
  { count: 5 },
  { ms: 12000 },
  { count: 7 },
  { ms: 18000 },
]

const en = {
  labels: {
    headline: "Headline",
    text: "Text",
    image: "Image",
    button: "Button",
    form: "Contact form",
    testimonials: "Testimonials",
    popup: "Popup",
    newsletter: "Newsletter",
    social: "Social icons",
  } as Record<ElementType, string>,
  /* One per THRESHOLDS entry, same order. */
  toasts: [
    {
      title: "Quick one.",
      body: "Centered, or aligned left? Pick one, you can change it later. (You won’t.)",
    },
    {
      title: "Font pairing.",
      body: "Serif and sans, or just sans? Bold headline, or a subtle one? Both are correct.",
    },
    {
      title: "Heads up.",
      body: "That layout just broke on mobile. Might be worth a separate pass.",
    },
    {
      title: "Almost forgot.",
      body: "Meta title, meta description, alt text: SEO doesn’t write itself.",
    },
    {
      title: "One more thing.",
      body: "Domain, DNS, hosting, SSL. Sort those now, or later?",
    },
  ],
  clickHere: "Click here",
  testimonialQuote: "This changed everything.",
  popupBlock: "10% off, sign up now",
  remove: "Remove",
  onPage: (n: number) => `${n} on the page`,
  empty: "Drag a block onto the page, or just tap one.",
  close: "Close",
  popupTitle: "Wait! Before you go...",
  popupBody: "Join the newsletter for 10% off your next headline.",
  popupDismiss: "No thanks, continue building",
  stillDiy: "Still want to do it yourself?",
  orI: "Or I can just ",
  doItForYou: "do it for you.",
  youCan: "You can do it yourself. You just don't have to.",
  buildForMe: "Build it for me",
  playAgain: "Play again",
  dismiss: "Dismiss",
}

type Copy = typeof en

const COPY: Record<Locale, Copy> = {
  en,
  sk: {
    labels: {
      headline: "Nadpis",
      text: "Text",
      image: "Obrázok",
      button: "Tlačidlo",
      form: "Kontaktný formulár",
      testimonials: "Referencie",
      popup: "Popup",
      newsletter: "Newsletter",
      social: "Sociálne siete",
    },
    toasts: [
      {
        title: "Len rýchlo.",
        body: "Na stred, alebo doľava? Vyberte si, neskôr to môžete zmeniť. (Nezmeníte.)",
      },
      {
        title: "Kombinácia písma.",
        body: "Pätkové a bezpätkové, alebo len bezpätkové? Výrazný nadpis, alebo decentný? Obe možnosti sú správne.",
      },
      {
        title: "Pozor.",
        body: "Rozloženie sa práve rozpadlo na mobile. Možno by to chcelo samostatné kolo.",
      },
      {
        title: "Skoro som zabudol.",
        body: "Meta titulok, meta popis, alt texty: SEO sa samo nenapíše.",
      },
      {
        title: "Ešte jedna vec.",
        body: "Doména, DNS, hosting, SSL. Vyriešite to teraz, alebo neskôr?",
      },
    ],
    clickHere: "Kliknite sem",
    testimonialQuote: "Toto zmenilo všetko.",
    popupBlock: "10 % zľava, prihláste sa",
    remove: "Odstrániť",
    onPage: (n: number) => `Na stránke: ${n}`,
    empty: "Potiahnite blok na stránku, alebo naň len ťuknite.",
    close: "Zavrieť",
    popupTitle: "Počkajte! Kým odídete...",
    popupBody: "Prihláste sa na newsletter a získajte 10 % zľavu na ďalší nadpis.",
    popupDismiss: "Nie, ďakujem, staviam ďalej",
    stillDiy: "Stále to chcete robiť sami?",
    orI: "Alebo to ",
    doItForYou: "urobím za vás.",
    youCan: "Zvládnete to aj sami. Len nemusíte.",
    buildForMe: "Postavte mi ho",
    playAgain: "Hrať znova",
    dismiss: "Zavrieť",
  },
  cz: {
    labels: {
      headline: "Nadpis",
      text: "Text",
      image: "Obrázek",
      button: "Tlačítko",
      form: "Kontaktní formulář",
      testimonials: "Reference",
      popup: "Popup",
      newsletter: "Newsletter",
      social: "Sociální sítě",
    },
    toasts: [
      {
        title: "Jen rychle.",
        body: "Na střed, nebo doleva? Vyberte si, později to můžete změnit. (Nezměníte.)",
      },
      {
        title: "Kombinace písma.",
        body: "Patkové a bezpatkové, nebo jen bezpatkové? Výrazný nadpis, nebo decentní? Obojí je správně.",
      },
      {
        title: "Pozor.",
        body: "Rozvržení se právě rozpadlo na mobilu. Možná by to chtělo samostatné kolo.",
      },
      {
        title: "Skoro jsem zapomněl.",
        body: "Meta titulek, meta popis, alt texty: SEO se samo nenapíše.",
      },
      {
        title: "Ještě jedna věc.",
        body: "Doména, DNS, hosting, SSL. Vyřešíte to teď, nebo později?",
      },
    ],
    clickHere: "Klikněte sem",
    testimonialQuote: "Tohle změnilo všechno.",
    popupBlock: "Sleva 10 %, přihlaste se",
    remove: "Odstranit",
    onPage: (n: number) => `Na stránce: ${n}`,
    empty: "Přetáhněte blok na stránku, nebo na něj jen ťukněte.",
    close: "Zavřít",
    popupTitle: "Počkejte! Než odejdete...",
    popupBody: "Přihlaste se k newsletteru a získejte 10% slevu na další nadpis.",
    popupDismiss: "Ne, děkuji, stavím dál",
    stillDiy: "Pořád to chcete dělat sami?",
    orI: "Nebo to ",
    doItForYou: "udělám za vás.",
    youCan: "Zvládnete to i sami. Jen nemusíte.",
    buildForMe: "Postavte mi ho",
    playAgain: "Hrát znovu",
    dismiss: "Zavřít",
  },
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function ItemIcon({ type }: { type: ElementType }) {
  const common = "h-4 w-4 shrink-0 stroke-current"
  switch (type) {
    case "headline":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <path d="M4 6h16M4 12h9" strokeLinecap="round" />
        </svg>
      )
    case "text":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <path d="M4 5h16M4 10h16M4 15h10" strokeLinecap="round" />
        </svg>
      )
    case "image":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
          <circle cx="9" cy="10" r="1.4" />
          <path d="M4.5 17l4.5-4.5 3 3 4-4 4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "button":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="8" width="17" height="8" rx="1" />
          <path d="M8 12h8" strokeLinecap="round" />
        </svg>
      )
    case "form":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
          <path d="M7 8h10M7 12h10M7 16h6" strokeLinecap="round" />
        </svg>
      )
    case "testimonials":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <path
            d="M7 8c-2 0-3 1.5-3 3.5S5 15 7 15M7 8v4c0 2-1 3-2 3.3M17 8c-2 0-3 1.5-3 3.5s1 3.5 3 3.5M17 8v4c0 2-1 3-2 3.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "popup":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
          <path d="M13.5 6.5l3 3m0-3l-3 3" strokeLinecap="round" />
        </svg>
      )
    case "newsletter":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
          <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "social":
      return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={common}>
          <circle cx="6" cy="12" r="2.2" />
          <circle cx="12" cy="7" r="2.2" />
          <circle cx="18" cy="12" r="2.2" />
        </svg>
      )
  }
}

function BlockContent({ type, t }: { type: ElementType; t: Copy }) {
  switch (type) {
    case "headline":
      return <div className="h-3 w-3/4 bg-ink/70" />
    case "text":
      return (
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-full bg-ink/20" />
          <div className="h-1.5 w-5/6 bg-ink/20" />
          <div className="h-1.5 w-2/3 bg-ink/20" />
        </div>
      )
    case "image":
      return (
        <div className="flex h-16 w-full items-center justify-center border border-dashed border-ink/25 text-ink/25">
          <ItemIcon type="image" />
        </div>
      )
    case "button":
      return (
        <div className="inline-block bg-accent px-3 py-1.5 text-[10px] font-semibold text-paper">
          {t.clickHere}
        </div>
      )
    case "form":
      return (
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-full border border-ink/20" />
          <div className="h-4 w-full border border-ink/20" />
          <div className="h-4 w-1/2 bg-ink/70" />
        </div>
      )
    case "testimonials":
      return (
        <div className="text-[10px] italic leading-relaxed text-ink/50">
          &ldquo;{t.testimonialQuote}&rdquo;
          <div className="mt-1.5 h-1.5 w-1/3 bg-ink/20" />
        </div>
      )
    case "popup":
      return (
        <div className="border border-ink/20 px-2 py-1.5 text-center text-[10px] leading-snug text-ink/60">
          {t.popupBlock}
        </div>
      )
    case "newsletter":
      return (
        <div className="flex gap-1">
          <div className="h-4 flex-1 border border-ink/20" />
          <div className="h-4 w-8 bg-ink/70" />
        </div>
      )
    case "social":
      return (
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-ink/40" />
          <span className="h-3 w-3 rounded-full bg-ink/40" />
          <span className="h-3 w-3 rounded-full bg-ink/40" />
        </div>
      )
  }
}

function PlacedBlock({ el, onRemove, t }: { el: Placed; onRemove: () => void; t: Copy }) {
  return (
    <div
      className="absolute w-36 animate-[pop-in_0.25s_ease-out] sm:w-40"
      style={{
        left: `${el.xPct}%`,
        top: `${el.yPct}%`,
        transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
      }}
    >
      {el.controls > 0 && (
        <div className="mb-1 flex flex-wrap gap-1">
          {Array.from({ length: el.controls }).map((_, i) => (
            <span key={i} className="h-3 w-3 border border-ink/20 bg-paper" />
          ))}
        </div>
      )}
      <div className="group relative border border-ink/15 bg-paper p-3 shadow-sm">
        <button
          type="button"
          onClick={onRemove}
          aria-label={t.remove}
          className="absolute -right-2 -top-2 hidden h-5 w-5 items-center justify-center rounded-full border border-ink/20 bg-paper text-[10px] leading-none text-ink/50 hover:text-ink group-hover:flex"
        >
          ×
        </button>
        <BlockContent type={el.type} t={t} />
      </div>
    </div>
  )
}

export function BuildYourOwnWebsiteGame() {
  const t = COPY[useLocale()]
  const canvasRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  const nextToastId = useRef(1)

  const [elements, setElements] = useState<Placed[]>([])
  const [dragType, setDragType] = useState<ElementType | null>(null)
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [firedKeys, setFiredKeys] = useState<Set<string>>(new Set())
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)

  useEffect(() => {
    if (!startedAt || revealed) return
    const t = setInterval(() => setElapsed(Date.now() - startedAt), 200)
    return () => clearInterval(t)
  }, [startedAt, revealed])

  useEffect(() => {
    if (!startedAt || revealed) return
    if (elapsed >= REVEAL_AFTER_MS || elements.length >= REVEAL_AFTER_COUNT) {
      setRevealed(true)
    }
  }, [elapsed, elements.length, startedAt, revealed])

  useEffect(() => {
    if (!startedAt || revealed) return
    THRESHOLDS.forEach((th, i) => {
      const key = `t${i}`
      if (firedKeys.has(key)) return
      const countOk = th.count !== undefined && elements.length >= th.count
      const msOk = th.ms !== undefined && elapsed >= th.ms
      if (countOk || msOk) {
        setFiredKeys((prev) => new Set(prev).add(key))
        setToasts((prev) => [...prev, { id: nextToastId.current++, ...t.toasts[i] }])
      }
    })
  }, [elements.length, elapsed, startedAt, revealed, firedKeys, t])

  const addElement = useCallback(
    (type: ElementType, xPct: number, yPct: number) => {
      if (revealed) return
      const effectiveStart = startedAt ?? Date.now()
      if (!startedAt) setStartedAt(effectiveStart)
      const level = clamp((Date.now() - effectiveStart) / REVEAL_AFTER_MS, 0, 1)
      const jitter = level * 10
      const rotation = (Math.random() - 0.5) * level * 10
      const controls = Math.round(level * 5)
      setElements((prev) => [
        ...prev,
        {
          id: nextId.current++,
          type,
          xPct: clamp(xPct + (Math.random() - 0.5) * jitter, 10, 90),
          yPct: clamp(yPct + (Math.random() - 0.5) * jitter, 12, 88),
          rotation,
          controls,
        },
      ])
      if (type === "popup") setPopupVisible(true)
    },
    [revealed, startedAt]
  )

  const removeElement = (id: number) => setElements((prev) => prev.filter((e) => e.id !== id))

  const resetGame = () => {
    setElements([])
    setToasts([])
    setFiredKeys(new Set())
    setStartedAt(null)
    setElapsed(0)
    setRevealed(false)
    setPopupVisible(false)
  }

  const handleSidebarPointerDown = (e: React.PointerEvent, type: ElementType) => {
    e.preventDefault()
    setDragType(type)
    setDragPos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    if (!dragType) return

    const handleMove = (e: PointerEvent) => setDragPos({ x: e.clientX, y: e.clientY })

    const handleUp = (e: PointerEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      const inCanvas =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (rect && inCanvas) {
        const xPct = ((e.clientX - rect.left) / rect.width) * 100
        const yPct = ((e.clientY - rect.top) / rect.height) * 100
        addElement(dragType, xPct, yPct)
      } else {
        const count = elements.length
        addElement(dragType, 22 + (count % 4) * 20, 20 + Math.floor(count / 4) * 18)
      }
      setDragType(null)
      setDragPos(null)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
    return () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }
  }, [dragType, addElement, elements.length])

  const draggingLabel = dragType ? t.labels[dragType] : undefined

  return (
    <div className="mx-auto max-w-4xl">
      <div className={revealed ? "pointer-events-none blur-[1.5px] opacity-50 transition-all duration-700" : "transition-all duration-700"}>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex gap-2 overflow-x-auto pb-1 md:w-52 md:shrink-0 md:flex-col md:gap-0 md:overflow-visible md:border-r md:border-ink/10 md:pb-0 md:pr-6">
            {SIDEBAR_ITEMS.map((type) => (
              <button
                key={type}
                type="button"
                onPointerDown={(e) => handleSidebarPointerDown(e, type)}
                style={{ touchAction: "none" }}
                className="flex shrink-0 cursor-grab items-center gap-2 whitespace-nowrap border border-ink/15 bg-paper px-3 py-2 text-xs font-medium text-ink/80 transition-colors hover:border-ink/40 hover:text-ink active:cursor-grabbing md:w-full md:justify-start md:border-0 md:border-b md:border-ink/10 md:px-0 md:py-3"
              >
                <ItemIcon type={type} />
                {t.labels[type]}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <div className="flex items-center gap-1.5 border border-b-0 border-ink/15 bg-paper px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="ml-3 text-[11px] text-ink/30">yoursite.com</span>
              <span className="ml-auto text-[11px] text-ink/25">
                {t.onPage(elements.length)}
              </span>
            </div>
            <div
              ref={canvasRef}
              className="relative h-[420px] overflow-hidden border border-ink/15 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.015)_0px,rgba(0,0,0,0.015)_1px,transparent_1px,transparent_10px)] sm:h-[460px]"
            >
              {elements.length === 0 && (
                <p className="absolute inset-0 flex items-center justify-center px-10 text-center text-sm text-ink/30">
                  {t.empty}
                </p>
              )}
              {elements.map((el) => (
                <PlacedBlock key={el.id} el={el} t={t} onRemove={() => removeElement(el.id)} />
              ))}

              {popupVisible && !revealed && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink/10 backdrop-blur-[1px]">
                  <div className="relative w-64 animate-[pop-in_0.25s_ease-out] border border-ink/15 bg-paper p-6 text-center shadow-xl">
                    <button
                      type="button"
                      onClick={() => setPopupVisible(false)}
                      aria-label={t.close}
                      className="absolute right-2 top-2 text-ink/40 hover:text-ink"
                    >
                      ×
                    </button>
                    <p className="font-display text-lg font-black leading-tight">{t.popupTitle}</p>
                    <p className="mt-2 text-xs text-ink/60">
                      {t.popupBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => setPopupVisible(false)}
                      className="mt-4 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-paper transition-opacity hover:opacity-90"
                    >
                      {t.popupDismiss}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {revealed && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-paper/80 px-6 backdrop-blur-sm animate-[pop-in_0.4s_ease-out]">
          <div className="max-w-sm border border-ink/10 bg-paper px-8 py-10 text-center shadow-xl">
            <p className="text-base text-ink/60">{t.stillDiy}</p>
            <p className="mt-2 font-display text-3xl font-black leading-tight tracking-tighter text-ink">
              {t.orI}<span className="text-accent">{t.doItForYou}</span>
            </p>
            <p className="mt-4 text-sm italic text-ink/45">
              {t.youCan}
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              {t.buildForMe} <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={resetGame}
              className="mt-4 block w-full text-xs text-ink/35 underline underline-offset-4 hover:text-ink/60"
            >
              {t.playAgain}
            </button>
          </div>
        </div>
      )}

      {!revealed && toasts.length > 0 && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex w-[calc(100%-2.5rem)] max-w-xs flex-col gap-2 sm:w-auto">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto animate-[pop-in_0.3s_ease-out] border border-ink/15 bg-ink px-4 py-3 text-paper shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold tracking-wide">{toast.title}</p>
                <button
                  type="button"
                  onClick={() => setToasts((prev) => prev.filter((x) => x.id !== toast.id))}
                  aria-label={t.dismiss}
                  className="shrink-0 text-paper/50 hover:text-paper"
                >
                  ×
                </button>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-paper/70">{toast.body}</p>
            </div>
          ))}
        </div>
      )}

      {dragType && dragPos && (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2 border border-ink/20 bg-paper px-3 py-2 text-xs font-medium text-ink shadow-lg"
          style={{ left: dragPos.x, top: dragPos.y, transform: "translate(-50%, -50%)" }}
        >
          <ItemIcon type={dragType} />
          {draggingLabel}
        </div>
      )}
    </div>
  )
}
