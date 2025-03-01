import { Music2 } from "lucide-react"
import { Barlow_Condensed } from "next/font/google";
import Link from "next/link"

const barlowCondensed = Barlow_Condensed({
    subsets: ['latin'],
    weight: '400',
});

interface HeaderProps {
    hideNav?: boolean,
}

export const Header = ({ hideNav }: HeaderProps) => {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
            <Link className="flex items-center justify-center text-lg font-medium" href="/">
                <Music2 className="h-6 w-6 mr-1 text-purple-300" />
                <span className={`${barlowCondensed.className} text-2xl text-purple-800`}>mikistec</span>
            </Link>
            {!hideNav && (
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
            )}
        </header>

    )
}