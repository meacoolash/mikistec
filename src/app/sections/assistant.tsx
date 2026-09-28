"use client"

import { useEffect, useRef, useState } from "react"
import { ASSISTANT_NAME, GREETING, SUGGESTIONS } from "@/lib/assistant"

// Ported from smart-web's chat.tsx; the knowledge lives in src/lib/assistant.ts.

type Msg = { role: "user" | "assistant"; content: string }

function pickSuggestions(asked: string[], n = 3) {
  const pool = SUGGESTIONS.filter((q) => !asked.includes(q))
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}

// Site links the assistant mentions (mikistec.com/#contact, qviks.com/smart-web, /pricing...).
const LINK = /(?:https?:\/\/)?(?:www\.)?(?:mikistec|qviks|joymeseci)\.com(?:\/[^\s,;!?)]*)?|(?<![\w.])\/(?:pricing|coaching|games\/pexeso)\b/g

// Turns those links into anchors. Our own pages stay in the tab (and close the
// chat so the visitor sees where they landed); other sites open in a new one.
function Linkified({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(LINK)) {
    const raw = match[0].replace(/\.+$/, "")
    const start = match.index
    parts.push(text.slice(last, start))
    const internal = raw.startsWith("/") || /mikistec\.com/.test(raw)
    const href = internal
      ? raw.replace(/^(?:https?:\/\/)?(?:www\.)?mikistec\.com/, "") || "/"
      : raw.startsWith("http") ? raw : `https://${raw}`
    parts.push(
      <a
        key={start}
        href={href}
        {...(internal ? { onClick: onNavigate } : { target: "_blank", rel: "noopener noreferrer" })}
        className="font-semibold text-accent underline underline-offset-2"
      >
        {raw}
      </a>,
    )
    last = start + raw.length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

export function Assistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  // Picked on open, not on render, so server and client markup never differ.
  const [suggestions, setSuggestions] = useState<string[]>([])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, suggestions])

  function toggle() {
    if (!open && suggestions.length === 0) setSuggestions(pickSuggestions([]))
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
      // Skip the greeting: it's UI-only, not part of the conversation.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(1) }),
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
      append("Sorry, I couldn't connect. Please try again.")
    } finally {
      setBusy(false)
      setSuggestions(pickSuggestions(history.filter((m) => m.role === "user").map((m) => m.content), 2))
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-4 right-4 z-50 flex h-[28rem] max-h-[70vh] flex-col overflow-hidden rounded-[1.4rem] border-2 border-ink bg-white font-body text-ink shadow-xl sm:left-auto sm:w-96">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
            <span className="font-display text-base font-extrabold">{ASSISTANT_NAME}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-2xl leading-none text-ink/40 hover:text-ink"
            >
              ×
            </button>
          </div>
          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user" ? "self-end bg-accent text-paper" : "self-start bg-paper"
                }`}
              >
                {m.content ? (
                  m.role === "assistant" ? <Linkified text={m.content} onNavigate={() => setOpen(false)} /> : m.content
                ) : (
                  <span className="opacity-60">Typing...</span>
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
              placeholder="Ask a question..."
              maxLength={2000}
              className="flex-1 rounded-md border border-ink/20 bg-transparent px-3 py-2 text-sm placeholder:text-ink/30 focus:border-accent focus:outline-none"
            />
            <button
              disabled={busy}
              className="rounded-md bg-accent px-4 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-4 z-50 rounded-md bg-accent px-5 py-3 font-body text-sm font-semibold tracking-wide text-paper shadow-lg transition-opacity hover:opacity-90"
      >
        {open ? "Close chat" : "Ask my AI assistant"}
      </button>
    </>
  )
}
