/**
 * Server-side whitelist of the forms that post to /api/contact. The browser
 * only sends the key; where the mail goes and how it reads is decided here.
 * `toEnv` falls back to CONTACT_TO when unset.
 */
export const CONTACT_SOURCES = {
  landing: {
    subject: "New inquiry",
    messageLabel: "About their business:",
    toEnv: "CONTACT_TO",
  },
  "return-to-roots": {
    subject: "Return to Roots application",
    messageLabel: "What draws them to the retreat:",
    toEnv: "RETREAT_CONTACT_TO",
  },
} as const

export type ContactSource = keyof typeof CONTACT_SOURCES

export function isContactSource(raw: unknown): raw is ContactSource {
  return typeof raw === "string" && Object.hasOwn(CONTACT_SOURCES, raw)
}
