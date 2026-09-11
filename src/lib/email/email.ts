import { Resend } from "resend"

/**
 * Resend sender. Same shape as qviks/src/lib/email/email.ts, minus the
 * DB-backed kill switches and org lookup — mikistec has no database.
 */

let _resend: Resend | null = null

function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

/**
 * Plain-text alternative for an HTML mail. Built ourselves (rather than left
 * to Resend) so link targets survive. Deliberately crude — our bodies are
 * small templates of <p>, <strong> and the odd <a>, not arbitrary documents.
 */
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, label) =>
      `${String(label).replace(/<[^>]+>/g, "").trim()} (${href})`
    )
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev"
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Miki Stec"

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string
  subject: string
  html: string
  replyTo?: string
}) {
  const { data, error } = await getResend().emails.send({
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
    to,
    subject,
    html,
    text: htmlToText(html),
    ...(replyTo ? { replyTo } : {}),
  })

  if (error) {
    throw new Error(`[email] Resend rejected to=${to} subject="${subject}": ${error.message}`)
  }
  return data
}
