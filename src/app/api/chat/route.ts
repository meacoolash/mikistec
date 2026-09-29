import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import { checkRateLimit } from "@/lib/rate-limit-check"
import { INFO } from "@/lib/assistant"
import { sendEmail } from "@/lib/email/email"
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n"

/**
 * POST /api/chat — the site assistant. Streams plain text back. Ported from
 * smart-web's /api/chat, but the knowledge lives in src/lib/assistant.ts and
 * the limits are the in-memory ones the contact form uses (no DB, no logging).
 */

export const runtime = "nodejs"

const MODEL = "gpt-4.1-mini"
const MAX_TURNS = 20
const MAX_CHARS = 2000
// History comes from the client, so cap the whole payload, not just each message.
const MAX_TOTAL_CHARS = 8000

const ALLOWED_ORIGIN = /^https?:\/\/(localhost(:\d+)?|(www\.)?mikistec\.com)$/i

const PAGE_LANGUAGE: Record<Locale, string> = { en: "English", sk: "Slovak", cz: "Czech" }

// On /sk and /cz the page decides: short questions look alike in Slovak and
// Czech, so guessing from the message kept answering Czech visitors in Slovak.
function languageRule(locale: Locale) {
  if (locale === "en") {
    return `The visitor is on the English version of the site, so reply in English by default. Switch only if the visitor's latest message is clearly written in another language (also without diacritics): Slovak → Slovak, Czech → Czech, any other Slavic language → Slovak. Never reply in Slovak or Czech to a message written in English.`
  }
  const lang = PAGE_LANGUAGE[locale]
  return `The visitor is on the ${lang} version of the site. Always reply in ${lang}, even if the message looks like another Slavic language or has no diacritics. Only if the latest message is clearly written in English, reply in English.`
}

function system(locale: Locale) {
  return `You are the AI assistant on Miki Stec's website (mikistec.com) and you answer in Miki's voice: first person, as Miki ("I build...", "You don't need to send me anything"). Never call Miki "he" or "Miki". The info below is written about Miki in the third person; turn it into first person. Miki is a man, so use masculine forms in Slovak and Czech. Address the visitor formally (vykanie: "vy" in Slovak and Czech).

Keep it short: usually one sentence, two at most. Plain text, no markdown. Get straight to the answer, no filler, no closing pleasantries.

Links: never show a bare URL. Write every link as [label](url) with a short natural label in the reply's language. For pages on this site, always write the plain unprefixed path (/pricing, /coaching, /#contact, /#work, /games/pexeso), never /sk/... or /cz/...; the chat moves them into the visitor's language. Examples:
- English: [contact form](/#contact), [pricing](/pricing), [coaching](/coaching)
- Slovak: [kontaktný formulár](/#contact), [cenník](/pricing), [konzultácie](/coaching)
- Czech: [kontaktní formulář](/#contact), [ceník](/pricing), [koučink](/coaching)
- External: [demo](https://sites.qviks.com/smart-demo), [QVIKS](https://www.qviks.com)
The chat shows only the label, linked.

Only point to the contact form when it helps (the visitor wants to start, or you can't answer), and keep it short, e.g. "Just drop me a line via the [contact form](/#contact)."

If asked whether you are a bot or a real person, say honestly that you're an AI answering for Miki, and that Miki personally reads everything sent through the contact form.

${languageRule(locale)}
Today is ${new Date().toISOString().slice(0, 10)}; use it for anything about age or how long ago something was. Miki is ${new Date().getFullYear() - 1981} this year.
Local terms: "Make it smart" is "Smart web" in Slovak and Czech; revenue share is "podiel z tržieb" / "podíl z tržeb"; coaching is "konzultácie" (Slovak) / "koučink" (Czech); write prices as "990 €" in Slovak and Czech. Contact form choices: "Build it for me" is "Vytvorte mi web" (Slovak) / "Vytvořte mi web" (Czech); "Coach me" is "Chcem konzultácie" (Slovak) / "Chci konzultace" (Czech); "Not sure yet" is "Ešte neviem" / "Ještě nevím".

Only use the information below. Never fill gaps with plausible guesses: no invented numbers, durations, dates, prices, timelines, availability, tools, clients or promises. If a detail is not in the info, don't describe it at all, not even vaguely ("usually a few weeks", "no fixed limit", "reliable servers" are all guesses). Say that you'll answer that personally and point to the contact form. Examples of things NOT in the info unless listed below: how long a normal website takes, hosting, number of revisions, weekend availability. Politely decline topics unrelated to this work.

<info>
${INFO}
</info>`
}

// What the visitor sees when OpenAI is down, out of credit or the key is missing.
const DOWN_REPLY: Record<Locale, string> = {
  en: "I'm taking a break right now. Drop me a line via the [contact form](/#contact) and I'll get back to you.",
  sk: "Práve mám pauzu. Napíšte mi cez [kontaktný formulár](/#contact) a ozvem sa vám.",
  cz: "Právě mám pauzu. Napište mi přes [kontaktní formulář](/#contact) a ozvu se vám.",
}

const RATE_LIMITED: Record<Locale, string> = {
  en: "You've sent a lot of messages in a short time. Drop me a line via the [contact form](/#contact) and I'll get back to you.",
  sk: "Za krátky čas ste poslali veľa správ. Napíšte mi cez [kontaktný formulár](/#contact) a ozvem sa vám.",
  cz: "Za krátkou dobu jste poslali hodně zpráv. Napište mi přes [kontaktní formulář](/#contact) a ozvu se vám.",
}

const CUT_OFF: Record<Locale, string> = {
  en: "\n\nSorry, I got cut off. Please try again.",
  sk: "\n\nPrepáčte, prerušilo ma to. Skúste to prosím znova.",
  cz: "\n\nPromiňte, přerušilo mě to. Zkuste to prosím znovu.",
}

// At most one alert mail per hour per warm instance, so an outage doesn't flood the inbox.
const ALERT_EVERY_MS = 60 * 60_000
let lastAlertAt = 0

async function alertDown(reason: string) {
  const to = process.env.CONTACT_TO
  if (!to || Date.now() - lastAlertAt < ALERT_EVERY_MS) return
  lastAlertAt = Date.now()
  try {
    await sendEmail({
      to,
      subject: `AI asistent na mikistec.com nefunguje: ${reason.slice(0, 80)}`,
      html:
        `<p>OpenAI odmietol požiadavku z chatu na mikistec.com. Návštevníci teraz vidia hlášku s odkazom na kontaktný formulár.</p>` +
        `<p><strong>Dôvod:</strong> ${reason.replace(/[<>&]/g, "")}</p>` +
        `<p>Kredit a limity: <a href="https://platform.openai.com/settings/organization/billing/overview">platform.openai.com</a>. ` +
        `Ďalší mail najskôr o hodinu, ak to bude stále nefunkčné.</p>`,
    })
  } catch (err) {
    console.error("[chat alert]", err)
  }
}

// OpenAI errors carry a code like "insufficient_quota" or "invalid_api_key".
function describe(err: unknown) {
  const e = err as { status?: number; code?: string | null; message?: string }
  return [e.code, e.status, e.message].filter(Boolean).join(" · ") || String(err)
}

type ChatMessage = { role: "user" | "assistant"; content: string }

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { messages?: ChatMessage[]; locale?: unknown } | null
  const locale: Locale = isLocale(body?.locale) ? body.locale : DEFAULT_LOCALE

  if (!process.env.OPENAI_API_KEY) {
    await alertDown("chýba OPENAI_API_KEY")
    return new Response(DOWN_REPLY[locale], { status: 503 })
  }

  // Browsers always send Origin on a fetch POST; plain curl scripts usually don't.
  if (!ALLOWED_ORIGIN.test(req.headers.get("origin") ?? "")) return new Response("Forbidden", { status: 403 })

  const limited =
    checkRateLimit(req, { limit: 30, window: 60 * 60_000, prefix: "chat-hour" }) ??
    checkRateLimit(req, { limit: 150, window: 24 * 60 * 60_000, prefix: "chat-day" })
  if (limited) {
    return new Response(RATE_LIMITED[locale], { status: 429, headers: { "Cache-Control": "no-store" } })
  }

  const history: ChatMessage[] = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))

  let total = history.reduce((n, m) => n + m.content.length, 0)
  while (history.length > 1 && total > MAX_TOTAL_CHARS) total -= history.shift()!.content.length

  if (history.at(-1)?.role !== "user") return new Response("Bad request", { status: 400 })

  // The language reminder goes last too: a small model follows the latest instruction best.
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: system(locale) },
    ...history,
    ...(locale === "en" ? [] : [{ role: "system" as const, content: languageRule(locale) }]),
  ]

  const client = new OpenAI()
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      let sent = false
      try {
        const stream = await client.chat.completions.create({ model: MODEL, max_tokens: 600, stream: true, messages })
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content
          if (text) {
            sent = true
            controller.enqueue(encoder.encode(text))
          }
        }
      } catch (err) {
        console.error("[chat]", err)
        controller.enqueue(encoder.encode(sent ? CUT_OFF[locale] : DOWN_REPLY[locale]))
        // Awaited before close so the serverless function isn't frozen mid-send.
        await alertDown(describe(err))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } })
}
