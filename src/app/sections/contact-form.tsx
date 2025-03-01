import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm, ValidationError } from '@formspree/react';

export const ContactForm = () => {

    const [state, handleSubmit] = useForm("xldgqdnz");
    if (state.succeeded) {
        return (
            <div className="text-purple-800 m-16">
                <p>Thanks for message!</p>
            </div>
        );
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* <Input className="bg-white" placeholder="Your Name" /> */}
            <Input
                className="bg-white"
                placeholder="Your Email"
                type="email"
                id="email"
                name="email"
            />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-white px-3 py-2 text-sm"
                placeholder="Your Message"
                id="message"
                name="message"
            />
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <Button
                className="w-full bg-purple-200 text-purple-900 hover:bg-purple-300"
                type="submit"
                disabled={state.submitting}>Send Message
            </Button>
        </form>
    )
}