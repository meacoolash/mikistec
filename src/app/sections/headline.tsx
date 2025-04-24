import { Indie_Flower } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const indieFlower = Indie_Flower({
    subsets: ['latin'],
    weight: '400',
});

export const Headline = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-screen">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-12 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-900">
                            Song Alchemy <span className="italic">...in progress</span>
                        </h1>

                        {/* <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                            Album coming soon, stay tuned
                        </p> */}
                        {/* <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                            Music to guide you beyond ordinary perception
                        </p> */}
                        {/*  <p className="mx-auto max-w-[700px] text-purple-800/80 md:text-xl">
                            <strong>Free</strong> to download, free to use.
                        </p> */}
                    </div>
                    <div className="w-full space-y-12">
                        <div className="flex justify-center space-x-2">
                            <Image src={'/headphones.jpeg'} alt={'Miki Stec Music Production'} width="120" height="120" className="rounded-full object-cover" />
                            {/* <p className="text-9xl text-purple-800/60">🎧</p> */}
                        </div>
                        <p className={`${indieFlower.className} text-3xl`}>Get comfy. Headphones on. <Link href={'#work'} className="underline underline-offset-8">Play ►</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}