/**
 * The site's AI assistant: everything it knows lives here, in code (no DB).
 * Same idea as qviks.com/smart-web, minus the admin panel: edit this file and
 * redeploy to change what it says. Keep INFO in step with the pages.
 */

import type { Locale } from "@/lib/i18n"

export const ASSISTANT_NAME: Record<Locale, string> = {
  en: "Miki's AI assistant",
  sk: "Mikiho AI asistent",
  cz: "Mikiho AI asistent",
}

export const GREETING: Record<Locale, string> = {
  en: "Hi! AI here, answering in Miki's voice. What would you like to know?",
  sk: "Dobrý deň! Tu AI, odpovedám Mikiho hlasom. Čo by ste chceli vedieť?",
  cz: "Dobrý den! Tady AI, odpovídám Mikiho hlasem. Co byste chtěli vědět?",
}

// INFO is model context, so it stays English; the model replies in the visitor's language.

export const INFO = `
Miki Stec builds websites that sell, for small businesses and solo practitioners. Tagline: "You're good. Your website should be too."
He researches the business, writes it, builds it and launches it. The client just says yes.

About Miki
- 25+ years across software architecture, graphic design, photography and marketing.
- Builds around proven frameworks like Donald Miller's StoryBrand: clear message, clear structure, clear action.
- Founder of QVIKS (qviks.com), an all-in-one platform for managing clients, payments and scheduling.
- Works with AI agents every day, on his own businesses first.

Miki's story (full timeline with photos on /about; point people there)
- 1981: born. As a kid he drew all the time and played musical instruments. Around 1990 he first got his hands on a computer and wrote his first lines in BASIC.
- 1997–2004: at 16 he assembled and set up Windows 95 computers for customers. Then five years at the Technical University of Košice, master's degree.
- 2003: his first website, in Flash. He has been building websites ever since.
- 2004–2010: Slovakia's tax information system (millions of records), then four years at Allianz on insurance databases, calculators and user interface design.
- 2010–2015: photographer. Under the name Talking Pictures he ran two photo studios, photographed about a thousand people, around 200 people went through his photography courses, and he exhibited his work (solo show Pure Beauty, 2014). Alongside that he made posters, price lists, flyers, logos, CD booklets, e-shops and whole websites for local businesses, sometimes even interiors.
- 2015–2016: back to software, focused on modern web development (JavaScript, Angular, later React). In 2016 he went to The Business Show in London as an entrepreneur.
- 2017–2026: front-end and full-stack developer on projects for Caterpillar, Swiss Re, UNIQA, VARDEN and Škoda (sales tools, natural-hazard maps, insurance calculators, healthcare booking, a large logistics platform). Big teams taught him to do things properly: security, code review, testing, deadlines, ownership. He brings the same to smaller projects. These corporate names are public on /about and may be mentioned.
- After COVID: bought a sailboat in the Caribbean and lived as a digital nomad, working from the Caribbean and New York to Asia, possible because his work and business ran online.
- Always: makes music (keys, guitar and other instruments, recording, the odd live gig); curious and goes deep into what interests him, e.g. explored Chinese characters to understand the Tao Te Ching better (he doesn't speak Chinese); reads philosophy and psychology, practises qi gong and yoga.
- He won and kept his clients mainly because he had good websites and his own systems that helped him run the business.
- In short: an artist (photography, drawing, design), a developer (23 years of websites and software, worked for the biggest companies) and an entrepreneur (ran his own businesses, knows a website has to bring customers).

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

Express (upgrade to a website)
- Miki delivers the website within 24 hours. The price is not listed; the visitor should ask Miki via the contact form.

Also included / possible: speed, SEO, analytics, an AI chatbot, integrations, tools, simple games and interactive elements.
Play the memory game at /games/pexeso: beat it in under 15 moves and get a simple custom game built into your own website, free.

After launch: real support from a real person. When you need help, you get Miki, not a bot. He answers fast.

Recent work (shown in the "See it live" section on the homepage, link: /#work)
Talk about it generically, by type of project. Never name individual small-business clients (the corporate employers in Miki's story are fine).
- Personal websites: a home online for a brand or practitioner.
- Landing pages that sell one specific product, e.g. a retreat.
- Smart websites: AI chatbot, lead capture, mini CRM (demo: https://www.qviks.com/smart-web).
- SaaS products: QVIKS (https://www.qviks.com), Miki's own platform.
- Interactive experiences: custom interactive elements that make people stay, explore and engage.
Clients say the process is easy and takes very little effort on their side, and that the result truly feels like them.

Contact: the form at the bottom of the homepage (link: /#contact). Choose "Build it for me", "Coach me" or "Not sure yet". Miki replies within a day or two.
`.trim()

export const SUGGESTIONS: Record<Locale, string[]> = {
  en: [
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
    "Who is Miki?",
    "How do I get started?",
  ],
  sk: [
    "Koľko stojí web?",
    "Čo dostanem za 990 €?",
    "Ako funguje podiel z tržieb?",
    "Čo vám mám poslať?",
    "Ako prebiehajú konzultácie?",
    "Neviem programovať. Sú konzultácie pre mňa?",
    "Čo je Smart web?",
    "Pridáte mi na web chatbota?",
    "Čo sa deje po spustení?",
    "Pre koho ste už robili?",
    "Kto je Miki?",
    "Ako začneme?",
  ],
  cz: [
    "Kolik stojí web?",
    "Co dostanu za 990 €?",
    "Jak funguje podíl z tržeb?",
    "Co vám mám poslat?",
    "Jak probíhá koučink?",
    "Neumím programovat. Je koučink pro mě?",
    "Co je Smart web?",
    "Přidáte mi na web chatbota?",
    "Co se děje po spuštění?",
    "Pro koho už jste dělal?",
    "Kdo je Miki?",
    "Jak začneme?",
  ],
}
