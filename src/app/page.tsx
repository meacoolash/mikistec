"use client"

import { Header } from "./sections/header"
import { Headline } from "./sections/headline"
import { Work } from "./sections/work"
import { About } from "./sections/about"
import { Contact } from "./sections/contact"
import { Footer } from "./sections/footer"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      <Header />
      <main className="flex-1">
        <Headline />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

