import type { Metadata } from "next"
import type { CSSProperties } from "react"

export const metadata: Metadata = {
  title: "Return to Roots — Come home to yourself",
  description: "5 days in Kathmandu, Nepal. October 15–19, 2026.",
  robots: { index: false, follow: false },
}

const accentOverride = { "--accent": "16 74% 46%" } as CSSProperties

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div style={accentOverride}>{children}</div>
}
