/**
 * Input validation utilities for API routes.
 * Subset of qviks/src/lib/validation.ts (+ EMAIL_REGEX from its form-validate.ts).
 */

export const EMAIL_REGEX = /^[^\s@<>'"`]+@[^\s@<>'"`]+\.[^\s@<>'"`]{2,}$/
export const TEXT_DEFAULT_MAX = 255

/** Validate and normalize an email address. Returns null if invalid. */
export function validateEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null
  const email = raw.toLowerCase().trim()
  if (!email || !EMAIL_REGEX.test(email)) return null
  return email
}

/** Clamp a string to max length, trimming whitespace. */
export function sanitizeText(raw: unknown, maxLength = TEXT_DEFAULT_MAX): string {
  if (typeof raw !== "string") return ""
  return raw.trim().slice(0, maxLength)
}

/** Escape HTML entities to prevent injection when interpolating user input into an HTML template. */
export function escapeHtml(raw: unknown): string {
  if (raw === null || raw === undefined) return ""
  return String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
