import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const ContactForm = () => {
    return (
        <form className="space-y-4">
            <Input className="bg-white" placeholder="Your Name" />
            <Input className="bg-white" placeholder="Your Email" type="email" />
            <Input className="bg-white" placeholder="Subject" />
            <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2 text-sm"
                placeholder="Your Message"
            />
            <Button className="w-full bg-purple-200 text-purple-900 hover:bg-purple-300">Send Message</Button>
        </form>
    )
}