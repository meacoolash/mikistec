import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"

const serif = Fraunces({
  variable: "--font-rt-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
})

const sans = Inter({
  variable: "--font-rt-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Return to Roots — Reparenting, Ayurveda & Somatic Retreat",
  description:
    "A 4-night, 5-day retreat in Kathmandu, Nepal. October 15–19, 2026. Reconnect, heal, nourish, belong.",
  robots: { index: false, follow: false },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${serif.variable} ${sans.variable}`}
      style={{ fontFamily: "var(--font-rt-sans)" }}
    >
      {children}
    </div>
  )
}
