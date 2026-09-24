/*
 * Every word on /v2-draft lives here. The markup in page.tsx never holds copy.
 * No prices, dates or testimonials yet: none are confirmed, so none are shown.
 */

export const HERO = {
  eyebrow: "AI agents & websites that sell",
  title: "Everyone around you is building with AI. Are you?",
  lead:
    "I'm Miki. I research your business, write it, build it, and launch it. You just say yes. Or I teach you to build your own website and your own AI agents, from FOMO to shipping.",
  cta: "Get me started",
};

export const STRIP = {
  title: "Feeling left behind is a signal, not a verdict",
  body: "Two ways out. Pick the one that fits your week.",
  learn: "Teach me",
  build: "Build it for me",
};

export const PROBLEM = {
  title: "The problem is not mastering AI.\nYou need to know what's possible for you.",
  paragraphs: [
    "Your feed is full of people with agents that write, research, answer email and ship websites overnight. Every week there's a new tool you're told you're already late for.",
    "So you bookmark the threads. You watch half a tutorial that assumes you code. You open a chat window, type something, get something generic back, and close it.",
    "The gap between you and them isn't talent. It isn't a computer science degree. It's one afternoon of doing it next to someone who already does it every day.",
    "I've built software for 25+ years, and I build with AI agents every day. This page included.",
  ],
  primary: "Show me the two ways",
  secondary: "Let's talk",
};

export type Path = {
  n: string;
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  tone: "blue" | "ink" | "sand";
};

export const PATHS: Path[] = [
  {
    n: "01",
    id: "learn",
    label: "Learn it",
    title: "Build it yourself, with me next to you",
    body:
      "One-on-one sessions, on your laptop, on your business. We set up your AI tools, build your website together, then your first agents. You leave owning it and knowing how it works.",
    points: [
      "Your own website, built and live",
      "An agent that researches for you",
      "An agent that drafts your emails and posts",
      "The habit: how to hand work to an agent",
    ],
    cta: "Teach me",
    tone: "blue",
  },
  {
    n: "02",
    id: "build",
    label: "Done for you",
    title: "You say yes. I build it.",
    body:
      "No time to learn right now? I research your business, write it, build it and launch it. Instagram, LinkedIn, Google: wherever you already show up. You don't need to send me anything.",
    points: [
      "Researched first draft, built for real",
      "Copywriting included",
      "Domain and launch taken care of",
      "Nothing to learn, nothing to manage",
    ],
    cta: "Build it for me",
    tone: "ink",
  },
];

export const GROW = {
  label: "Then grow",
  body:
    "CRM, payments, booking, email: your website is ready to connect when you need it. Use the tools you already have, or continue with QVIKS, another business of mine.",
  link: { label: "Visit QVIKS", href: "https://qviks.com" },
};

export const STEPS = [
  {
    n: "01",
    title: "A short call",
    body: "You tell me what you do and where you're stuck. I tell you honestly which path makes sense.",
  },
  {
    n: "02",
    title: "Pick your path",
    body: "Learn it yourself with me, or have me build it. You can start with one and switch later.",
  },
  {
    n: "03",
    title: "Ship something real",
    body: "Not slides, not theory. A live website, a working agent. Something you can point at.",
  },
];

export const ABOUT = {
  title: "Why me",
  facts: [
    "25+ years across software architecture, graphic design, photography and marketing.",
    "I build around proven frameworks like Donald Miller's StoryBrand. Clear message, clear structure, clear action.",
    "Founder of QVIKS: clients, payments and scheduling for small service businesses.",
    "I work with AI agents every day, on my own businesses first.",
  ],
};

export const FAQ = [
  {
    q: "I can't code. Is this for me?",
    a: "Yes. That's exactly who it's for. You'll describe what you want in plain language; the agent writes the code. My job is to show you how to steer it and how to check its work.",
  },
  {
    q: "Can't I just learn this from YouTube?",
    a: "You can, and you've probably tried. Tutorials are generic and go stale in weeks. We work on your business, with the tools that work today.",
  },
  {
    q: "Which tools do we use?",
    a: "Whatever fits you. Mostly Claude and Claude Code, plus the tools you already use. I don't sell software, so I've no reason to push one.",
  },
  {
    q: "How much does it cost?",
    a: "Depends on the path and how far you want to go. Tell me what you need and I'll send you one clear number, no tiers, no \"starting at\".",
  },
];

export const CONTACT = {
  title: "Stop watching. Start building.",
  lead: "Tell me a bit about you. I'll get back within a day or two.",
  choices: [
    { value: "learn", label: "Teach me" },
    { value: "build", label: "Build it for me" },
    { value: "unsure", label: "Not sure yet" },
  ],
  submit: "Send",
  disabledNote: "Draft: the form is switched off on this preview.",
};
