import { Instagram, Mail, Youtube } from "lucide-react"
import Link from "next/link"

export const Social = () => {
    return (
        <div className="flex justify-center space-x-4">
            <Link href="#" className="text-purple-800/60 hover:text-purple-900">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-purple-800/60 hover:text-purple-900">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Youtube</span>
            </Link>
            <Link href="#" className="text-purple-800/60 hover:text-purple-900">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
            </Link>
        </div>
    )
}