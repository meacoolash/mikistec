import type { Metadata } from "next"
import Policy from "../Policy"
import { privacyPolicyData } from "./data"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Miki Stec (Simplethis s.r.o.) collects, uses, and protects your personal data.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: true, follow: true },
}

export default function Privacy() {
    return (

        <Policy data={privacyPolicyData} />

    )
}