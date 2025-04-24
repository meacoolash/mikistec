import { Progress } from "./progress"

export const About = () => {
    return (
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-10 px-10 md:gap-16 md:grid-cols-2">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">About Me</h2>
                        <p className="text-purple-800/80">
                            Chasing melodies since I could babble, grew up with instruments, played anything with strings, keys, or valves, convinced music could reshape reality.<br />
                            Years as a digital nomad gave me stories, now I shape them into songs.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">Collaborations & Possibilities</h2>
                        <ul className="grid">
                            <li className="text-purple-800/80">Music Production</li>
                            <li className="text-purple-800/80">Songwriting</li>
                            <li className="text-purple-800/80">Private lessons & help</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-16">
                <Progress />
            </div>
        </section>
    )
}