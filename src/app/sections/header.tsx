import Link from "next/link"

interface HeaderProps {
    hideNav?: boolean,
}

export const Header = ({ hideNav }: HeaderProps) => {
    return (
        <header className="px-6 h-16 flex items-center justify-between border-b border-ink/10">
            <Link className="font-display text-lg font-black tracking-tight text-ink" href="/">
                Miki Stec
            </Link>
            {!hideNav && (
                <Link className="text-sm text-ink/70 hover:text-ink" href="/#contact">
                    Let&apos;s sell
                </Link>
            )}
        </header>
    )
}
