import FormsSpree from "./formspree"
import { Player } from "./player"

export const Work = () => {
    return (
        <section id="work" className="w-full py-12 md:py-24 lg:py-32 bg-white/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="space-y-4 mb-6">
                        <h2 className=" text-center text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900"> Sneak peek</h2>
                        <p className="max-w-[900px] text-purple-800/80 text-center italic">
                            A selection of some unmastered mixes
                        </p>
                        <p className="max-w-[900px] text-purple-800/80">
                            These are some initial experiments after my return to production. I&apos;ve been shaking off the rust and getting back into the flow, but I didn&apos;t have a proper mic or warmed-up vocal cords at the time, so they&apos;re more like audio demos with no singing yet.
                            <br></br>The first track, <span className="italic font-bold">however</span>, is probably going on the album as is. It&apos;s all about how having too many options can be paralyzing—sometimes, you just have to choose one and go with it.
                        </p>
                    </div>
                    <Player></Player>
                    <div className="pt-16">
                        <FormsSpree type='subscribe-ms' />
                    </div>
                </div>
            </div>
            {/* <div className="flex justify-center pt-16">
                <Progress />
            </div> */}
        </section>
    )
}