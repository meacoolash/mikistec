"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
      <span aria-hidden="true">✦</span>
      {children}
      <span aria-hidden="true">✦</span>
    </p>
  )
}

export function GoldText({
  children,
  as = "p",
  size = "text-2xl",
}: {
  children: React.ReactNode
  as?: "p" | "span"
  size?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [shine, setShine] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShine(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const className = `text-gold font-display ${size} font-black leading-tight tracking-tight ${
    shine ? "text-gold-shine" : ""
  }`

  const Tag = as
  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement & HTMLSpanElement>} className={className}>
      {children}
    </Tag>
  )
}

export function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (reducedMotion) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function CTAButton({
  href = "#apply",
  variant = "solid",
  className = "",
  children = "I'm in",
}: {
  href?: string
  variant?: "solid" | "invert"
  className?: string
  children?: React.ReactNode
}) {
  const styles = variant === "invert" ? "bg-ink text-paper" : "bg-accent text-paper"
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 ${styles} ${className}`}
    >
      {children} <span aria-hidden="true">→</span>
    </Link>
  )
}

export function Nav() {
  return (
    <header className="px-6 h-16 flex items-center justify-between">
      <Link className="text-sm font-medium tracking-tight text-ink/60 hover:text-ink" href="/draft/return-to-roots-bold">
        Return to Roots
      </Link>
      <CTAButton className="!px-4 !py-1.5 text-xs">I&apos;m in</CTAButton>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 border-t border-ink/10">
      <p className="text-xs text-ink/50">Return to Roots — Kathmandu, Nepal · Oct 15–19, 2026</p>
      <a
        href="https://mikistec.com"
        target="_blank"
        rel="noopener noreferrer"
        className="sm:ml-auto text-xs text-ink/40 hover:text-ink/70"
      >
        Website draft by Miki Stec →
      </a>
    </footer>
  )
}
