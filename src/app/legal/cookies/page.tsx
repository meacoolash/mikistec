import type { Metadata } from "next"
import Policy from "../Policy"
import { cookiesData } from "./data"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Miki Stec (Simplethis s.r.o.) uses cookies and similar tracking technologies.",
  alternates: { canonical: "/legal/cookies" },
  robots: { index: true, follow: true },
}

export default function Cookies() {
    return (

        <Policy data={cookiesData} />

    )
}