"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pause, Play, Music2, Instagram, Twitter, Mail } from "lucide-react"
import { useState } from "react"

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center justify-center text-lg font-medium" href="#">
          <Music2 className="h-6 w-6 mr-2 text-purple-400" />
          <span className="text-purple-900">echo.waves</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-purple-900" href="#work">
            Work
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-purple-900" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-purple-900" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-900">
                  Creating Soundscapes & Emotions
                </h1>
                <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                  Music producer and songwriter crafting atmospheric melodies and ambient soundscapes
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-900"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                </div>
                <p className="text-xs text-purple-800/60">Preview Latest Release</p>
              </div>
            </div>
          </div>
        </section>
        <section id="work" className="w-full py-12 md:py-24 lg:py-32 bg-white/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">Recent Works</h2>
                <p className="max-w-[900px] text-purple-800/80">
                  A selection of my latest productions and collaborations
                </p>
              </div>
              <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg bg-purple-100/50 p-2 transition-all hover:bg-purple-100"
                  >
                    <div className="aspect-square w-full rounded-md bg-purple-50" />
                    <div className="p-4">
                      <h3 className="font-medium text-purple-900">Track Title {item}</h3>
                      <p className="text-sm text-purple-800/60">Ambient • 3:45</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">About Me</h2>
                <p className="text-purple-800/80">
                  I'm a music producer and songwriter specializing in ambient and electronic music. With over a decade
                  of experience in sound design and production, I create immersive soundscapes that tell stories and
                  evoke emotions.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">Services</h2>
                <ul className="grid gap-4">
                  <li className="text-purple-800/80">Music Production</li>
                  <li className="text-purple-800/80">Sound Design</li>
                  <li className="text-purple-800/80">Mixing & Mastering</li>
                  <li className="text-purple-800/80">Songwriting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">
                  Let's Create Together
                </h2>
                <p className="max-w-[600px] text-purple-800/80">
                  Get in touch for collaborations, commissions, or just to say hello
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4">
                <form className="space-y-4">
                  <Input className="bg-white" placeholder="Your Name" />
                  <Input className="bg-white" placeholder="Your Email" type="email" />
                  <Input className="bg-white" placeholder="Subject" />
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2 text-sm"
                    placeholder="Your Message"
                  />
                  <Button className="w-full bg-purple-200 text-purple-900 hover:bg-purple-300">Send Message</Button>
                </form>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-purple-800/60 hover:text-purple-900">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-purple-800/60 hover:text-purple-900">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-purple-800/60 hover:text-purple-900">
                    <Mail className="h-6 w-6" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-purple-100">
        <p className="text-xs text-purple-800/60">© 2024 echo.waves. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-purple-800/60" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-purple-800/60" href="#">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}

