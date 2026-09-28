import Link from "next/link"

/* The live header plus a Coaching link (hidden on the coaching page itself). Kept local so the live site is untouched. */
export const Header = ({ hideCoaching = false }: { hideCoaching?: boolean }) => {
    return (
        <header className="relative px-6 h-20 flex items-center justify-between">
            <Link className="text-[17px] font-medium tracking-tight text-ink/70 hover:text-ink" href="/v4-draft">
                Miki Stec
            </Link>
            <nav className="flex items-center gap-3">
                {!hideCoaching && (
                <>
                {/* Menu with a one-item dropdown, like matteoc.com: hover or focus opens it, the item is a link. */}
                <span className="group relative">
                    <Link
                        className="px-3 text-[17px] font-medium text-ink/80 transition-colors hover:text-ink"
                        href="/v4-draft/learn"
                    >
                        Coaching
                    </Link>
                    {/* Comic speech bubble, centred under the word, tail pointing up at it. */}
                    <span className="invisible absolute left-1/2 top-full z-50 w-[min(15rem,calc(100vw_-_2rem))] -translate-x-1/2 pt-4 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <Link
                            href="/v4-draft/learn"
                            className="relative block rounded-[1.4rem] border-2 border-ink bg-white px-5 py-4 text-center text-base leading-snug text-ink transition-colors hover:text-accent"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-ink bg-white"
                            />
                            Learn to build your own website and AI agents, one-on-one <span aria-hidden="true">→</span>
                        </Link>
                    </span>
                </span>
                </>
                )}
                <Link
                    className="px-3 text-[17px] font-medium text-ink/80 transition-colors hover:text-ink"
                    href="/games/pexeso"
                >
                    Fun
                </Link>
                <Link
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
                    href="/v4-draft#contact"
                >
                    YES <span aria-hidden="true">→</span>
                </Link>
            </nav>
        </header>
    )
}
