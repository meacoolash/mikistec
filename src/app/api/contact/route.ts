import { NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit-check"
import { sanitizeText, validateEmail, escapeHtml } from "@/lib/validation"
import { sendEmail } from "@/lib/email/email"
import { CONTACT_SOURCES, isContactSource } from "@/lib/contact-sources"

/**
 * POST /api/contact — every form on the site (landing contact, Return to Roots
 * applications). Mails the submission to the inbox for its source, with the
 * visitor as reply-to so answering is one click. Same guards as qviks's
 * /api/apply: rate limit, origin gate, honeypot.
 */

function safeOrigin(url: string): string | null {
  try {
    const u = new URL(url)
    return `${u.protocol}//${u.host}`
  } catch {
    return null
  }
}

// Forms only legitimately fire from the site itself or local dev. Direct API
// hits from anywhere else are silently dropped.
const ALLOWED_ORIGINS = new Set([
  "https://mikistec.com",
  "https://www.mikistec.com",
  "http://localhost:3000",
])

export async function POST(req: Request) {
  const limited = checkRateLimit(req, { limit: 2, window: 60_000, prefix: "contact" })
  if (limited) return limited

  // Origin/Referer enforcement — silently ack so bots don't learn the gate exists.
  const origin = req.headers.get("origin")
  const referer = req.headers.get("referer")
  const sourceOrigin = origin || (referer ? safeOrigin(referer) : null)
  if (!sourceOrigin || !ALLOWED_ORIGINS.has(sourceOrigin)) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  try {
    const body = await req.json()

    // Honeypot — hidden form field; humans never fill it, bots do.
    if (typeof body.hp_url === "string" && body.hp_url.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 201 })
    }

    const sourceKey: unknown = body.source
    if (!isContactSource(sourceKey)) {
      return NextResponse.json({ error: "Unknown form." }, { status: 400 })
    }
    const source = CONTACT_SOURCES[sourceKey]

    const email = validateEmail(body.email)
    const name = sanitizeText(body.name, 120)
    if (!email || !name) {
      return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 })
    }
    const message = sanitizeText(body.message, 2000)

    const to = process.env[source.toEnv] || process.env.CONTACT_TO
    if (!to) {
      console.error(`[contact] neither ${source.toEnv} nor CONTACT_TO is set; submission from ${email} dropped`)
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }

    // Visitor-typed text lands in an HTML mail — escape it; pre-wrap keeps their line breaks.
    const messageBlock = message
      ? `<p style="margin:18px 0 6px"><strong>${escapeHtml(source.messageLabel)}</strong></p>` +
        `<div style="white-space:pre-wrap;padding:12px 14px;border-left:3px solid #d4d4d8;background:#fafafa;border-radius:4px">${escapeHtml(message)}</div>`
      : ""

    // Awaited, not after-response: the mail is the only record of the lead, so a
    // failure must reach the visitor as an error they can retry.
    await sendEmail({
      to,
      replyTo: email,
      subject: `${source.subject}: ${name}`,
      html:
        `<p><strong>Name:</strong> ${escapeHtml(name)}<br>` +
        `<strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` +
        messageBlock,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error("[contact] error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
