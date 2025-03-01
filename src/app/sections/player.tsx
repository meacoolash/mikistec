import React, { useRef, useState } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Pause, Play, RotateCcw } from 'lucide-react';

export const Player = () => {
    const [playing, setPlaying] = useState<number | null>(null)
    const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({})

    const togglePlay = (trackId: number) => {
        const audio = audioRefs.current[trackId]
        if (!audio) return

        if (playing === trackId) {
            audio.pause()
            setPlaying(null)
        } else {
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
        if (playing === trackId) {
            audio.play()
        }
    }

    return (
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
                            <audio ref={(el) => { audioRefs.current[item] = el }} src={`/music/${item}.mp3`} preload="metadata" />
                        </div>

                    </div>
                </div>
            ))}
        </div>

    )
}