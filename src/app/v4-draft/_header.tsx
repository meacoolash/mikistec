import Link from "next/link"

/* The live header plus a "Learn AI" link. Kept local so the live site is untouched. */
export const Header = () => {
    return (
        <header className="px-6 h-20 flex items-center justify-between">
            <Link className="text-[17px] font-medium tracking-tight text-ink/70 hover:text-ink" href="/v4-draft">
                Miki Stec
            </Link>
            <nav className="flex items-center gap-3">
                {/* Menu with a one-item dropdown, like matteoc.com: hover or focus opens it, the item is a link. */}
                <span className="group relative">
                    <Link
                        className="px-3 text-[17px] font-medium text-ink/80 transition-colors hover:text-ink"
                        href="/v4-draft/learn"
                    >
                        Coaching
                    </Link>
                    <span className="invisible absolute right-0 top-full z-50 w-64 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <Link
                            href="/v4-draft/learn"
                            className="block bg-paper px-5 py-4 text-left text-base leading-relaxed text-ink transition-colors hover:text-accent"
                        >
                            Learn to build your own website and AI agents, one-on-one <span aria-hidden="true">→</span>
                        </Link>
                    </span>
                </span>
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
