import FormsSpree from "./formspree"
import { Player } from "./player"

export const Work = () => {
    return (
        <section id="work" className="w-full py-12 md:py-24 lg:py-32 bg-white/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">Works</h2>
                        <p className="max-w-[900px] text-purple-800/80">
                            A selection of my latest productions
                        </p>
                    </div>
                    <Player></Player>
                    <div className="pt-16">
                        <FormsSpree type='subscribe-ms' />
                    </div>
                </div>


            </div>




        </section>
    )
}