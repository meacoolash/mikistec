"use client"

import { useState } from "react"
import type { ContactSource } from "@/lib/contact-sources"

/**
 * Client side of /api/contact. Reads the form's named fields (`name`, `email`,
 * `message`, plus the `hp_url` honeypot from <Honeypot />) and posts them as JSON.
 */
export function useContactForm(source: ContactSource) {
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    const fields = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, source }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setError(
          res.status === 429
            ? "Too many tries. Please wait a minute and send again."
            : data.error && res.status === 400
              ? data.error
              : "Could not send. Please try again in a moment."
        )
        return
      }
      setSucceeded(true)
    } catch {
      setError("Could not send. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return { submitting, succeeded, error, handleSubmit }
}

/** Hidden field real people never see; bots fill it in and get silently dropped. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="hp_url"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      // inline, not Tailwind: some drafts style with their own CSS
      style={{ position: "absolute", left: -9999, width: 0, height: 0, opacity: 0 }}
    />
  )
}
