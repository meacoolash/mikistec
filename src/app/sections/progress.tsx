import { Chilanka } from "next/font/google";

const indieFlower = Chilanka({
    subsets: ['latin'],
    weight: '400',
});

export const Progress = () => {
    return (

        <div className={`${indieFlower.className} bg-white md:m-16 m-6 shadow-xl transform md:rotate-2 text-center md:p-16 p-6 max-w-[900px] space-y-6`}>
            <h2 className="text-2xl font-bold tracking-wide sm:text-3xl">Behind the Scenes</h2>
            <p className="text-xl">
                If you&apos;re on the indie path too, maybe we can team up! A buddy is never a bad thing—whether it&apos;s sharing know-how, equipment, or just giving feedback. Let&apos;s create something amazing together! I&apos;ve spent my whole life in music, and since 2003, I&apos;ve been diving deep into DAWS and computers. Recently, I&apos;ve been exploring the latest tools, hardware, and sound libraries. I&apos;ve got quite a lot to offer.
            </p>
            <p className="text-2xl font-bold mt-2">Indie is never really Indie</p>
        </div>


    )
}
