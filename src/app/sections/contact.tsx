import { ContactForm } from "./contact-form"
import { ProfilePic } from "./profile-pic"

export const Contact = () => {
    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <ProfilePic />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-purple-900">
                            Let&apos;s Create Together
                        </h2>
                        <p className="max-w-[600px] text-purple-800/80">
                            Get in touch for collaborations, commissions, or just to say hello
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-4">
                        <ContactForm />
                        {/* <Social /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}