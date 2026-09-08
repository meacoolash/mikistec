import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 border-t border-ink/10">
            <p className="text-xs text-ink/50">© {new Date().getFullYear()} Miki Stec. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4 text-ink/50" href="/legal/privacy">
                    Privacy Policy
                </Link>
                <Link className="text-xs hover:underline underline-offset-4 text-ink/50" href="/legal/terms">
                    Terms of Service
                </Link>
                <Link className="text-xs hover:underline underline-offset-4 text-ink/50" href="/legal/cookies">
                    Cookie policy
                </Link>
            </nav>
        </footer>
    )
}
