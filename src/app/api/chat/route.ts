import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import { checkRateLimit } from "@/lib/rate-limit-check"
import { INFO } from "@/lib/assistant"
import { sendEmail } from "@/lib/email/email"

/**
 * POST /api/chat — the site assistant. Streams plain text back. Ported from
 * smart-web's /api/chat, but the knowledge lives in src/lib/assistant.ts and
 * the limits are the in-memory ones the contact form uses (no DB, no logging).
 */

export const runtime = "nodejs"

const MODEL = "gpt-4o-mini"
const MAX_TURNS = 20
const MAX_CHARS = 2000
// History comes from the client, so cap the whole payload, not just each message.
const MAX_TOTAL_CHARS = 8000

const ALLOWED_ORIGIN = /^https?:\/\/(localhost(:\d+)?|(www\.)?mikistec\.com)$/i

const SYSTEM = `You are the AI assistant on Miki Stec's website (mikistec.com) and you answer in Miki's voice: first person, as Miki ("I build...", "You don't need to send me anything"). Never call Miki "he" or "Miki". The info below is written about Miki in the third person; turn it into first person.

Keep it short: usually one sentence, two at most. Plain text, no markdown. Get straight to the answer, no filler, no closing pleasantries.

Links: never show a bare URL. Write every link as [label](url) with a short natural label in the reply's language, e.g. [contact form](/#contact) or [formulár](/#contact), [pricing](/pricing), [coaching](/coaching), [demo](https://www.qviks.com/smart-web), [QVIKS](https://www.qviks.com). The chat shows only the label, linked.

Only point to the contact form when it helps (the visitor wants to start, or you can't answer), and keep it short, e.g. "Just drop me a line via the [contact form](/#contact)."

If asked whether you are a bot or a real person, say honestly that you're an AI answering for Miki, and that Miki personally reads everything sent through the contact form.

Reply only in Slovak or English, never in any other language. If the visitor's latest message is in Slovak or any other Slavic language (Czech, Croatian, Serbian, Polish...), also when written without diacritics, reply in Slovak. Otherwise reply in English.

Only use the information below. If something is not covered, say you're not sure and point to the contact form. Do not invent prices, dates or promises. Politely decline topics unrelated to this work.

<info>
${INFO}
</info>`

// What the visitor sees when OpenAI is down, out of credit or the key is missing.
const DOWN_REPLY = "I'm taking a break right now. Drop me a line via the [contact form](/#contact) and I'll get back to you."

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
  if (!process.env.OPENAI_API_KEY) {
    await alertDown("chýba OPENAI_API_KEY")
    return new Response(DOWN_REPLY, { status: 503 })
  }

  // Browsers always send Origin on a fetch POST; plain curl scripts usually don't.
  if (!ALLOWED_ORIGIN.test(req.headers.get("origin") ?? "")) return new Response("Forbidden", { status: 403 })

  const limited =
    checkRateLimit(req, { limit: 30, window: 60 * 60_000, prefix: "chat-hour" }) ??
    checkRateLimit(req, { limit: 150, window: 24 * 60 * 60_000, prefix: "chat-day" })
  if (limited) {
    return new Response(
      "You've sent a lot of messages in a short time. Drop me a line via the [contact form](/#contact) and I'll get back to you.",
      { status: 429, headers: { "Cache-Control": "no-store" } },
    )
  }

  const body = (await req.json().catch(() => null)) as { messages?: ChatMessage[] } | null
  const history: ChatMessage[] = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))

  let total = history.reduce((n, m) => n + m.content.length, 0)
  while (history.length > 1 && total > MAX_TOTAL_CHARS) total -= history.shift()!.content.length

  if (history.at(-1)?.role !== "user") return new Response("Bad request", { status: 400 })

  const messages: ChatCompletionMessageParam[] = [{ role: "system", content: SYSTEM }, ...history]

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
        controller.enqueue(encoder.encode(sent ? "\n\nSorry, I got cut off. Please try again." : DOWN_REPLY))
        // Awaited before close so the serverless function isn't frozen mid-send.
        await alertDown(describe(err))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } })
}
