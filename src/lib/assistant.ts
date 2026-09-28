/**
 * The site's AI assistant: everything it knows lives here, in code (no DB).
 * Same idea as qviks.com/smart-web, minus the admin panel: edit this file and
 * redeploy to change what it says. Keep INFO in step with the pages.
 */

export const ASSISTANT_NAME = "Miki's AI assistant"

export const GREETING = "Hi! AI here, answering in Miki's voice. What would you like to know?"

export const INFO = `
Miki Stec builds websites that sell, for small businesses and solo practitioners. Tagline: "You're good. Your website should be too."
He researches the business, writes it, builds it and launches it. The client just says yes.

About Miki
- 25+ years across software architecture, graphic design, photography and marketing.
- Builds around proven frameworks like Donald Miller's StoryBrand: clear message, clear structure, clear action.
- Founder of QVIKS (qviks.com), an all-in-one platform for managing clients, payments and scheduling.
- Works with AI agents every day, on his own businesses first.

Two ways to work with Miki (details on /pricing)
1. Have me build it: from €990, or revenue share.
   - Includes: research of your business, positioning & structure, copywriting, design, mobile & responsive details, SEO & technical setup, analytics, testing & refinement, deployment.
   - "A good website isn't one prompt." The real work is in the details between "it works" and "it's ready".
   - Revenue share: for selected projects that are launching something, Miki can work on a revenue-share basis instead of a fixed price. This is decided case by case; the visitor should get in touch.
2. Build it yourself (1:1 coaching): from €390.
   - 1:1 sessions with Miki, 3 sessions included in the price.
   - Your AI development setup, Miki's ready-made instructions for your AI, build on your own laptop, work on your own business.
   - Websites, tools and simple agents (e.g. research, emails, social posts). Learn how to continue without Miki.
   - For people who can't code: you describe what you want in plain language, the agent writes the code.
   - Tools: whatever fits you, mostly Claude and Claude Code plus tools you already use. Miki doesn't sell software.
   - More on /coaching.

How it works
1. I research you first: Instagram, LinkedIn, Google, wherever the business shows up. Then Miki builds a real, working first draft. You don't need to send anything (optionally you can).
2. Refine and go live: adjust together, then go live. Miki takes care of the domain too. Nothing to learn, nothing to manage.
3. Grow: CRM, email marketing, payments, booking, automation. The website is ready to connect when needed, with the tools you already have or with QVIKS.

Make it smart (upgrade to a website)
- AI chatbot, lead capture, mini CRM. The website becomes a small system for the business.
- Live demo: qviks.com/smart-web. The price is not listed; the visitor should ask Miki.

Also included / possible: speed, SEO, analytics, an AI chatbot, integrations, tools, simple games and interactive elements.
Play the memory game at /games/pexeso: beat it in under 15 moves and get a simple custom game built into your own website, free.

After launch: real support from a real person. When you need help, you get Miki, not a bot. He answers fast.

Recent work
- joymeseci.com: personal website for Joy Sevinç Meşeci, a somatic therapist.
- joymeseci.com/return-to-roots: landing page for her five-day retreat in Nepal.
- qviks.com/smart-web: smart website demo (chatbot, lead capture, mini CRM).
- qviks.com: Miki's own SaaS product.
Joy said: "Miki made the whole process incredibly easy for me. With very little effort on my side, he created something that truly feels like me and reflects who I am and what I do."

Contact: the form at the bottom of the homepage (mikistec.com/#contact). Choose "Build it for me", "Coach me" or "Not sure yet". Miki replies within a day or two.
`.trim()

export const SUGGESTIONS = [
  "How much does a website cost?",
  "What's included for €990?",
  "How does revenue share work?",
  "What do I need to send you?",
  "How does the coaching work?",
  "I can't code. Is coaching for me?",
  "What is Make it smart?",
  "Can you add a chatbot to my site?",
  "What happens after launch?",
  "Who have you built for?",
  "How do I get started?",
]
