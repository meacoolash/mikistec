"use client"

import { useEffect, useRef, useState } from "react"
import { ASSISTANT_NAME, GREETING, SUGGESTIONS } from "@/lib/assistant"
import { localePath, stripLocale, type Locale } from "@/lib/i18n"
import { useLocale } from "@/lib/i18n-client"

// Ported from smart-web's chat.tsx; the knowledge lives in src/lib/assistant.ts.

type Msg = { role: "user" | "assistant"; content: string }

const COPY = {
  en: {
    open: "Ask my AI assistant",
    close: "Close chat",
    placeholder: "Ask a question...",
    send: "Send",
    typing: "Typing...",
    offline: "Sorry, I couldn't connect. Please try again.",
  },
  sk: {
    open: "Opýtajte sa môjho AI asistenta",
    close: "Zavrieť chat",
    placeholder: "Opýtajte sa...",
    send: "Poslať",
    typing: "Píšem...",
    offline: "Prepáčte, nepodarilo sa pripojiť. Skúste to prosím znova.",
  },
  cz: {
    open: "Zeptejte se mého AI asistenta",
    close: "Zavřít chat",
    placeholder: "Zeptejte se...",
    send: "Odeslat",
    typing: "Píšu...",
    offline: "Promiňte, nepodařilo se připojit. Zkuste to prosím znovu.",
  },
} satisfies Record<Locale, Record<string, string>>

function pickSuggestions(locale: Locale, asked: string[], n = 3) {
  const pool = SUGGESTIONS[locale].filter((q) => !asked.includes(q))
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}

// Links in replies: [label](url) as the prompt asks for, plus bare site URLs
// (mikistec.com/#contact, qviks.com/smart-web, /pricing...) as a fallback.
// The model writes unprefixed paths; Linkified moves them into the page's language
// (stripping a prefix first, in case the model adds one anyway).
const LINK =
  /\[([^\]\n]+)\]\(([^)\s]+)\)|(?:https?:\/\/)?(?:www\.)?(?:mikistec|qviks|joymeseci)\.com(?:\/[^\s,;!?)]*)?|(?<![\w.])\/(?:pricing|coaching|games\/pexeso)\b/g

// Turns those links into anchors. Our own pages stay in the tab (and close the
// chat so the visitor sees where they landed); other sites open in a new one.
function Linkified({ text, locale, onNavigate }: { text: string; locale: Locale; onNavigate: () => void }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(LINK)) {
    const [whole, label, url] = match
    const raw = url ? whole : whole.replace(/\.+$/, "")
    const target = url ?? raw
    const start = match.index
    parts.push(text.slice(last, start))
    const internal = target.startsWith("/") || /^(?:https?:\/\/)?(?:www\.)?mikistec\.com/.test(target)
    const href = internal
      ? localePath(locale, stripLocale(target.replace(/^(?:https?:\/\/)?(?:www\.)?mikistec\.com/, "") || "/"))
      : target.startsWith("http") ? target : `https://${target}`
    parts.push(
      <a
        key={start}
        href={href}
        {...(internal ? { onClick: onNavigate } : { target: "_blank", rel: "noopener noreferrer" })}
        className="font-semibold text-accent underline underline-offset-2"
      >
        {label ?? raw}
      </a>,
    )
    last = start + raw.length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

export function Assistant() {
  const locale = useLocale()
  const t = COPY[locale]
  const [open, setOpen] = useState(false)
  // The greeting is UI-only (rendered below), not part of the conversation.
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  // Picked on open, not on render, so server and client markup never differ.
  const [suggestions, setSuggestions] = useState<string[]>([])
  // Phone launcher visibility: pages with a #how section reveal it once that section scrolls into view.
  const [reached, setReached] = useState(false)
  useEffect(() => {
    const how = document.getElementById("how")
    if (!how) {
      setReached(true)
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) {
        setReached(true)
        io.disconnect()
      }
    })
    io.observe(how)
    return () => io.disconnect()
  }, [])

  // Hide the launcher while the footer is on screen, so it doesn't cover the footer links.
  const launcherRef = useRef<HTMLButtonElement>(null)
  const [atFooter, setAtFooter] = useState(false)
  useEffect(() => {
    const footer = launcherRef.current?.closest("footer")
    if (!footer) return
    const io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, suggestions])

  function toggle() {
    if (!open && suggestions.length === 0) setSuggestions(pickSuggestions(locale, []))
    setOpen((o) => !o)
  }

  async function send(raw: string) {
    const text = raw.trim()
    if (!text || busy) return

    const history: Msg[] = [...messages, { role: "user", content: text }]
    setMessages([...history, { role: "assistant", content: "" }])
    setInput("")
    setBusy(true)

    const append = (chunk: string) =>
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        next[next.length - 1] = { ...last, content: last.content + chunk }
        return next
      })

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, locale }),
      })
      if (!res.body) throw new Error("no body")
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        append(decoder.decode(value, { stream: true }))
      }
    } catch {
      append(t.offline)
    } finally {
      setBusy(false)
      setSuggestions(pickSuggestions(locale, history.filter((m) => m.role === "user").map((m) => m.content), 2))
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-4 right-4 z-50 flex h-[28rem] max-h-[70vh] flex-col overflow-hidden rounded-[1.4rem] border-2 border-ink bg-white font-body text-ink shadow-xl sm:left-auto sm:w-96">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
            <span className="font-display text-base font-extrabold">{ASSISTANT_NAME[locale]}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="text-2xl leading-none text-ink/40 hover:text-ink"
            >
              ×
            </button>
          </div>
          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            <div className="max-w-[85%] self-start whitespace-pre-wrap rounded-2xl bg-paper px-3 py-2 text-sm">
              {GREETING[locale]}
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user" ? "self-end bg-accent text-paper" : "self-start bg-paper"
                }`}
              >
                {m.content ? (
                  m.role === "assistant" ? <Linkified text={m.content} locale={locale} onNavigate={() => setOpen(false)} /> : m.content
                ) : (
                  <span className="opacity-60">{t.typing}</span>
                )}
              </div>
            ))}
            {!busy && suggestions.length > 0 && (
              <div className="flex flex-col items-end gap-2 pt-1">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-2xl border border-accent px-3 py-1.5 text-left text-sm text-accent transition-colors hover:bg-accent/5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex gap-2 border-t border-ink/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              maxLength={2000}
              className="flex-1 rounded-md border border-ink/20 bg-transparent px-3 py-2 text-sm placeholder:text-ink/30 focus:border-accent focus:outline-none"
            />
            <button
              disabled={busy}
              className="rounded-md bg-accent px-4 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {t.send}
            </button>
          </form>
        </div>
      )}
      {/* Phones: a round icon, and on the homepage only once "How it works" is reached. Hidden at the footer. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-label={open ? t.close : t.open}
        className={`fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent font-body text-sm font-semibold tracking-wide text-paper shadow-lg transition-opacity hover:opacity-90 sm:h-auto sm:w-auto sm:rounded-md sm:px-5 sm:py-3 ${
          reached || open ? "" : "max-sm:hidden"
        } ${atFooter && !open ? "hidden" : ""}`}
      >
        <span className="hidden sm:inline">{open ? t.close : t.open}</span>
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          // Sparkles: the same four-point star as the homepage sparkles, one big and one small.
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 sm:hidden" fill="currentColor">
            <path transform="translate(1 5) scale(0.75)" d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            <path transform="translate(14 1) scale(0.38)" d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
          </svg>
        )}
      </button>
    </>
  )
}
