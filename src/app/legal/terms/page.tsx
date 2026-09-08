import type { Metadata } from "next"
import Policy from "../Policy"
import { termsAndConditionsData } from "./data"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms that govern your use of the Miki Stec (Simplethis s.r.o.) website and services.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
}

export default function Terms() {
    return (

        <Policy data={termsAndConditionsData} />

    )
}