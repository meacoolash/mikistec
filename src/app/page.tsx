"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pause, Play, Music2, Instagram, Mail, RotateCcw, Youtube } from "lucide-react"
import { useState, useRef } from "react"
import { Barlow_Condensed, Indie_Flower } from 'next/font/google';
import Image from "next/image";



// interface Track {
//   id: number
//   title: string
//   url: string
// }

// const tracks: Track[] = [
//   { id: 1, title: "Track 1", url: "/music/1.mp3" },
//   { id: 2, title: "Track 2", url: "/music/1.mp3" },
//   { id: 3, title: "Track 3", url: "/music/1.mp3" },
// ]


const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: '400',
});

const indieFlower = Indie_Flower({
  subsets: ['latin'],
  weight: '400',
});


export default function Component() {
  // const [isPlaying, setIsPlaying] = useState(false)

  /*  "From Folk to Frequencies",
   // "Soundscapes for Inner Journeys",
   "Stories in Sound",
   "Soundscapes",
   "Expand your consciousness",
   "Music to guide you beyond ordinary perception"
 
   
    */

  const [playing, setPlaying] = useState<number | null>(null)
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({})

  const togglePlay = (trackId: number) => {
    const audio = audioRefs.current[trackId]

    if (!audio) return

    if (playing === trackId) {
      audio.pause()
      setPlaying(null)
    } else {
      // Pause any currently playing audio
      if (playing !== null && audioRefs.current[playing]) {
        audioRefs.current[playing]?.pause()
      }
      audio.play()
      setPlaying(trackId)
    }
  }

  const restartTrack = (trackId: number) => {
    const audio = audioRefs.current[trackId]

    if (!audio) return

    audio.currentTime = 0

    // If the track was playing, continue playing from the beginning
    if (playing === trackId) {
      audio.play()
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center justify-center text-lg font-medium" href="#">
          <Music2 className="h-6 w-6 mr-1 text-purple-300" />
          <span className={`${barlowCondensed.className} text-2xl text-purple-800`}>mikistec</span>

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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-screen">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-900">
                  Song Alchemy for Altered States
                </h1>
                <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                  Soundscapes to expand your consciousness
                </p>
                <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                  Music to guide you beyond ordinary perception
                </p>
                <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                  <strong>Free</strong> to download, free to use.
                </p>



              </div>
              <div className="w-full space-y-12">
                <div className="flex justify-center space-x-2">
                  <p className="text-8xl text-purple-800/60">🎧</p>
                </div>
                <p className={`${indieFlower.className} text-3xl`}>Get comfy. Headphones on. Play.</p>
                {/* <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-900"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button> */}
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
                  A selection of my latest productions
                </p>
              </div>
              <div className="grid w-3/4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg bg-purple-100/50 p-2 transition-all hover:bg-purple-100"
                  >
                    <div className="aspect-square w-full relative rounded-md overflow-hidden">
                      <Image
                        src={`/track-${item}.webp`}
                        alt={`Track ${item}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="p-4 text-purple-900">
                      <div key={item} className="flex items-center gap-4">

                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => togglePlay(item)}
                          aria-label={playing === item ? "Pause" : "Play"}
                        >
                          {playing === item ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={playing !== item}
                          size="icon"
                          onClick={() => restartTrack(item)}
                          aria-label="Restart from beginning"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <div className="">
                          <p className="font-medium">Track {item}</p>
                        </div>
                        <audio ref={(el) => (audioRefs.current[item] = el)} src={`/music/${item}.mp3`} preload="metadata" />
                      </div>

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
                  I&apos;m a music producer and songwriter. <br />
                  Chasing melodies since I could babble, grew up with instruments, played anything with strings, keys, or valves, convinced music could reshape reality.<br />
                  Years as a digital nomad gave me stories, now I shape them into songs in Logic Pro.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">Services</h2>
                <ul className="grid gap-4">
                  <li className="text-purple-800/80">Music Production</li>
                  <li className="text-purple-800/80">Sound Design</li>
                  <li className="text-purple-800/80">Songwriting</li>
                  <li className="text-purple-800/80">Private lessons & help</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Image src={'/profile.jpeg'} alt={'Mikulas Stec profile picture'} width="100" height="100" className="rounded-full shadow-sm shadow-black object-cover" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">
                  Let&apos;s Create Together
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
                    <Youtube className="h-6 w-6" />
                    <span className="sr-only">Youtube</span>
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
        <p className="text-xs text-purple-800/60">© 2025 mikistec All rights reserved.</p>
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

