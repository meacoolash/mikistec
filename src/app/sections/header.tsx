import Link from "next/link"

interface HeaderProps {
    hideNav?: boolean,
    hidePlay?: boolean,
    playLabel?: string,
    playHref?: string,
}

export const Header = ({ hideNav, hidePlay, playLabel = "PLAY", playHref = "/games/pexeso" }: HeaderProps) => {
    return (
        <header className="px-6 h-16 flex items-center justify-between">
            <Link className="text-sm font-medium tracking-tight text-ink/60 hover:text-ink" href="/">
                Miki Stec
            </Link>
            {!hideNav && (
                <nav className="flex items-center gap-2">
                    {!hidePlay && (
                        <Link
                            className="inline-flex items-center justify-center rounded-md border border-ink/20 px-3 py-1.5 text-xs font-semibold tracking-wide text-ink/70 transition-colors hover:border-ink/40 hover:text-ink"
                            href={playHref}
                        >
                            {playLabel}
                        </Link>
                    )}
                    <Link
                        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
                        href="/#contact"
                    >
                        YES <span aria-hidden="true">→</span>
                    </Link>
                </nav>
            )}
        </header>
    )
}
