"use client"

import { useState } from "react"
import Link from "next/link"

export function RevenueShare({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`underline decoration-1 underline-offset-4 hover:opacity-80 ${className}`}
      >
        or revenue share
      </button>
      {open && (
        <span
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/10 px-6 backdrop-blur-sm"
        >
          <span
            onClick={(e) => e.stopPropagation()}
            className="relative block w-full max-w-sm animate-[pop-in_0.2s_ease-out] border-2 border-[#FFD75E] bg-paper p-7 text-center font-body font-normal leading-normal tracking-normal shadow-xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-2 top-2 text-2xl leading-none text-ink/40 hover:text-ink"
            >
              ×
            </button>
            <span className="block font-display text-lg font-black leading-tight text-ink">
              Launching something?
            </span>
            <span className="mt-2 block text-sm font-normal text-ink/70">
              For selected projects, I can work on a revenue-share basis instead of a fixed price.
            </span>
            <Link
              href="/?path=build#contact"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Let&apos;s talk <span aria-hidden="true">→</span>
            </Link>
          </span>
        </span>
      )}
    </>
  )
}
