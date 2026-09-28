import type { Locale } from "@/lib/i18n"

// Homepage copy. sk/cz are typed against en, so a missing key fails typecheck.
const en = {
  cta: "YES",
  close: "Close",
  qviksAbout:
    "An all-in-one solution for managing clients, payments and scheduling. Another business of mine, fully integrated with your new website.",
  visitQviks: "Visit QVIKS",

  heroEyebrow: "Websites that sell",
  heroBefore: "You're ",
  heroWord: "good",
  heroAfter: ". Your website should be too.",
  heroSub: "I research your business, write it, build it, and launch it. You just say",
  heroYes: "yes",

  learnQuestion: "Wanna build it yourself?",
  learnLink: "1:1 coaching",

  whyEyebrow: "Why me",
  whyTitle: "I build things that sell.",
  years: "25+ years across software architecture, graphic design, photography, and",
  yearsGold: "marketing.",
  frameworksBefore: "I build around proven frameworks like Donald Miller's",
  frameworksAfter: ".",
  clear: "Clear message, clear structure, clear action.",
  founder: "I am founder of",
  aiDaily: "I work with AI agents every day, on my own businesses first.",

  simplicity: "I give you simplicity.",
  extras: "+ Speed, SEO, analytics, an AI chatbot, integrations, tools, games,",
  extrasMore: "and much more.",
  nothingToLearn: "Nothing to learn.",
  unlessYouWant: "Unless you want to",

  howEyebrow: "How it works",
  howTitle: "Easy.",
  step1Title: "I research you first",
  step1:
    "Instagram, LinkedIn, Google, wherever your business already shows up. Then I build a real, working first draft from what I find. You don't need to send me anything. Optionally, you can.",
  step2Title: "Refine and go live",
  step2:
    "We adjust it together, then we go live. I take care of the domain too. Nothing to learn. Nothing for you to manage.",
  step3Title: "Grow",
  step3:
    "CRM, email marketing, payments, booking, automation — your website is ready to connect when you need it. Use the tools you already have or continue with",

  workEyebrow: "Recent work",
  workTitle: "See it live.",
  work: [
    {
      title: "Personal website",
      note: "Somatic therapy, reparenting, yin yoga. Warm, quiet, one clear next step.",
    },
    {
      title: "Retreat landing page",
      note: "Five days in Nepal. Itinerary, venue, guides, price and sign-up on one page.",
    },
    {
      title: "Smart website",
      note: "AI chatbot, lead capture and a mini CRM. Every enquiry lands in a dashboard.",
    },
    {
      title: "SaaS product",
      note: "My own platform for client-based businesses. Clients, payments and scheduling in one place.",
    },
    {
      title: "Interactive experiences",
      note: "Custom interactive elements that make people stay, explore and engage.",
    },
  ],
  // Joy's own words. Never invent a client quote.
  testimonialQuote:
    "Miki made the whole process incredibly easy for me. With very little effort on my side, he created something that truly feels like me and reflects who I am and what I do." as
      | string
      | null,
  testimonialRole: "Somatic therapist",

  smartEyebrow: "Need more than a website?",
  smartTitle: "Make it smart",
  smartFeatures: "AI chatbot · Lead capture · Mini CRM",
  smartBody: "Your website can become a small system for your business.",
  smartDemo: "See demo",

  // null hides the Express card for a language.
  express: {
    eyebrow: "In a hurry?",
    title: "Express",
    features: "Your website within 24 hours",
    body: "When it can't wait. A finished website, delivered within a day.",
    cta: "Get in touch",
  } as { eyebrow: string; title: string; features: string; body: string; cta: string } | null,

  supportEyebrow: "After launch",
  supportTitle: "Real support. From a real person.",
  supportBefore:
    "I'll set up an AI chatbot for your customers. But when you need help, you don't get a bot. You get ",
  supportGold: "me.",
  supportAfter: " I answer fast and sort out whatever comes up.",

  paths: { build: "Build it for me", learn: "Coach me", unsure: "Not sure yet" },
  success: "Got it. I'll get back to you within a day or two.",
  play: "While you wait, play",
  contactEyebrow: "Let's talk",
  contactTitle: "Tell me about your business.",
  wantLegend: "What do you want?",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Email",
  emailPlaceholder: "you@yourbusiness.com",
  businessLabel: "Tell me about your business",
  businessPlaceholder: "e.g. bakery in Paris @mysweetdonut",
}

export const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    cta: "ÁNO",
    close: "Zavrieť",
    qviksAbout:
      "Všetko v jednom na správu klientov, platieb a rezervácií. Ďalší z mojich projektov, plne prepojený s vaším novým webom.",
    visitQviks: "Navštíviť QVIKS",

    heroEyebrow: "Weby, ktoré predávajú",
    heroBefore: "Ste ",
    heroWord: "dobrí",
    heroAfter: ". Váš web by mal byť tiež.",
    heroSub: "Preskúmam vaše podnikanie, napíšem texty, vytvorím web a spustím ho. Vy len poviete",
    heroYes: "áno",

    learnQuestion: "Chcete si ho vytvoriť sami?",
    learnLink: "1:1 koučing",

    whyEyebrow: "Prečo ja",
    whyTitle: "Tvorím veci, ktoré predávajú.",
    years: "25+ rokov skúseností so softvérovou architektúrou, grafickým dizajnom, fotografiou a",
    yearsGold: "marketingom.",
    frameworksBefore: "Pracujem s overenými princípmi, ako je napríklad",
    frameworksAfter: " od Donalda Millera.",
    clear: "Jasné posolstvo. Jasná štruktúra. Jasný ďalší krok.",
    founder: "Som zakladateľom",
    aiDaily: "S AI agentmi pracujem každý deň na vlastných projektoch.",

    simplicity: "Dávam vám jednoduchosť.",
    extras: "+ Rýchlosť, SEO, analytika, AI chatbot, integrácie, nástroje, hry",
    extrasMore: "a omnoho viac.",
    nothingToLearn: "Nemusíte sa nič učiť.",
    unlessYouWant: "Len ak chcete",

    howEyebrow: "Ako to funguje",
    howTitle: "Jednoducho.",
    step1Title: "Najskôr si vás preskúmam",
    step1:
      "Instagram, LinkedIn, Google — všade, kde už vaše podnikanie žije. Z toho, čo nájdem, vytvorím prvú reálnu a funkčnú verziu webu. Nemusíte mi nič pripravovať. Samozrejme, ak chcete, môžete.",
    step2Title: "Doladíme a spustíme",
    step2:
      "Spoločne web doladíme a spustíme. Postarám sa aj o doménu. Nemusíte sa nič učiť. Nemusíte nič spravovať.",
    step3Title: "Rastieme ďalej",
    step3:
      "CRM, e-mail marketing, platby, rezervácie, automatizácia — váš web je pripravený rozširovať sa podľa toho, čo budete potrebovať. Použite nástroje, ktoré už máte, alebo pokračujte s",

    workEyebrow: "Moja práca",
    workTitle: "Pozrite si live projekty.",
    work: [
      {
        title: "Osobný web",
        note: "Somatická terapia, reparenting a yin joga. Príjemný, pokojný web s jedným jasným ďalším krokom.",
      },
      {
        title: "Landing page pre retreat",
        note: "Päť dní v Nepále. Program, miesto, sprievodcovia, cena aj registrácia na jednej stránke.",
      },
      {
        title: "Smart web",
        note: "AI chatbot, získavanie kontaktov a mini CRM. Každý nový záujemca skončí priamo vo vašom prehľade.",
      },
      {
        title: "SaaS produkt",
        note: "Moja vlastná platforma pre podnikanie založené na práci s klientmi. Klienti, platby a rezervácie na jednom mieste.",
      },
      {
        title: "Interaktívne zážitky",
        note: "Interaktívne prvky na mieru, ktoré ľudí prinútia zostať, objavovať a zapojiť sa.",
      },
    ],
    testimonialQuote:
      "Miki mi celý proces neuveriteľne zjednodušil. Z mojej strany to vyžadovalo minimum úsilia a vytvoril niečo, čo naozaj pôsobí ako ja a vystihuje, kto som a čo robím.",
    testimonialRole: "Somatická terapeutka",

    smartEyebrow: "Potrebujete viac než len web?",
    smartTitle: "Smart web",
    smartFeatures: "AI chatbot · Získavanie kontaktov · Mini CRM",
    smartBody: "Váš web sa môže stať malým systémom pre vaše podnikanie.",
    smartDemo: "Pozrieť demo",

    express: {
      eyebrow: "Ponáhľate sa?",
      title: "Express",
      features: "Web do 24 hodín",
      body: "Keď to nemôže čakať. Hotový web vám dodám do 24 hodín.",
      cta: "Napíšte mi",
    },

    supportEyebrow: "Po spustení",
    supportTitle: "Skutočná podpora. Od skutočného človeka.",
    supportBefore:
      "Vašim zákazníkom nastavím AI chatbota. Ale keď budete potrebovať pomoc vy, nedostanete robota. Dostanete ",
    supportGold: "mňa.",
    supportAfter: " Odpovedám rýchlo a vyriešim, čo bude treba.",

    paths: { build: "Vytvorte mi web", learn: "Chcem konzultácie", unsure: "Ešte neviem" },
    success: "Mám to. Ozvem sa vám do dňa-dvoch.",
    play: "Kým čakáte, zahrajte si",
    contactEyebrow: "Poďme sa porozprávať",
    contactTitle: "Povedzte mi o svojom podnikaní.",
    wantLegend: "Čo potrebujete?",
    nameLabel: "Meno",
    namePlaceholder: "Vaše meno",
    emailLabel: "E-mail",
    emailPlaceholder: "vy@vasafirma.sk",
    businessLabel: "Povedzte mi o svojom podnikaní",
    businessPlaceholder: "napr. pekáreň v Košiciach @mojapekaren",
  },
  cz: {
    cta: "ANO",
    close: "Zavřít",
    qviksAbout:
      "Vše v jednom pro správu klientů, plateb a rezervací. Další z mých projektů, plně propojený s vaším novým webem.",
    visitQviks: "Navštívit QVIKS",

    heroEyebrow: "Weby, které prodávají",
    heroBefore: "Jste ",
    heroWord: "dobří",
    heroAfter: ". Váš web by měl být taky.",
    heroSub: "Prozkoumám vaše podnikání, napíšu texty, vytvořím web a spustím ho. Vy jen řeknete",
    heroYes: "ano",

    learnQuestion: "Chcete si ho vytvořit sami?",
    learnLink: "1:1 koučink",

    whyEyebrow: "Proč já",
    whyTitle: "Tvořím věci, které prodávají.",
    years: "25+ let zkušeností se softwarovou architekturou, grafickým designem, fotografií a",
    yearsGold: "marketingem.",
    frameworksBefore: "Pracuji s ověřenými principy, jako je například",
    frameworksAfter: " od Donalda Millera.",
    clear: "Jasné sdělení. Jasná struktura. Jasný další krok.",
    founder: "Jsem zakladatelem",
    aiDaily: "S AI agenty pracuji každý den na vlastních projektech.",

    simplicity: "Dávám vám jednoduchost.",
    extras: "+ Rychlost, SEO, analytika, AI chatbot, integrace, nástroje, hry",
    extrasMore: "a mnohem víc.",
    nothingToLearn: "Nemusíte se nic učit.",
    unlessYouWant: "Jen pokud chcete",

    howEyebrow: "Jak to funguje",
    howTitle: "Jednoduše.",
    step1Title: "Nejdřív si vás prozkoumám",
    step1:
      "Instagram, LinkedIn, Google — všude, kde už vaše podnikání žije. Z toho, co najdu, vytvořím první skutečnou a funkční verzi webu. Nemusíte mi nic připravovat. Samozřejmě, pokud chcete, můžete.",
    step2Title: "Doladíme a spustíme",
    step2:
      "Společně web doladíme a spustíme. Postarám se i o doménu. Nemusíte se nic učit. Nemusíte nic spravovat.",
    step3Title: "Rosteme dál",
    step3:
      "CRM, e-mailový marketing, platby, rezervace, automatizace — váš web je připravený rozšiřovat se podle toho, co budete potřebovat. Použijte nástroje, které už máte, nebo pokračujte s",

    workEyebrow: "Moje práce",
    workTitle: "Podívejte se na live projekty.",
    work: [
      {
        title: "Osobní web",
        note: "Somatická terapie, reparenting a jin jóga. Příjemný, klidný web s jedním jasným dalším krokem.",
      },
      {
        title: "Landing page pro retreat",
        note: "Pět dní v Nepálu. Program, místo, průvodci, cena i registrace na jedné stránce.",
      },
      {
        title: "Smart web",
        note: "AI chatbot, získávání kontaktů a mini CRM. Každý nový zájemce skončí přímo ve vašem přehledu.",
      },
      {
        title: "SaaS produkt",
        note: "Moje vlastní platforma pro podnikání založené na práci s klienty. Klienti, platby a rezervace na jednom místě.",
      },
      {
        title: "Interaktivní zážitky",
        note: "Interaktivní prvky na míru, díky kterým lidé zůstanou, objevují a zapojí se.",
      },
    ],
    testimonialQuote:
      "Miki mi celý proces neuvěřitelně zjednodušil. Z mé strany to vyžadovalo minimum úsilí a vytvořil něco, co opravdu působí jako já a vystihuje, kdo jsem a co dělám.",
    testimonialRole: "Somatická terapeutka",

    smartEyebrow: "Potřebujete víc než jen web?",
    smartTitle: "Smart web",
    smartFeatures: "AI chatbot · Získávání kontaktů · Mini CRM",
    smartBody: "Váš web se může stát malým systémem pro vaše podnikání.",
    smartDemo: "Podívat se na demo",

    express: {
      eyebrow: "Spěcháte?",
      title: "Express",
      features: "Web do 24 hodin",
      body: "Když to nemůže čekat. Hotový web vám dodám do 24 hodin.",
      cta: "Napište mi",
    },

    supportEyebrow: "Po spuštění",
    supportTitle: "Skutečná podpora. Od skutečného člověka.",
    supportBefore:
      "Vašim zákazníkům nastavím AI chatbota. Ale když budete potřebovat pomoc vy, nedostanete robota. Dostanete ",
    supportGold: "mě.",
    supportAfter: " Odpovídám rychle a vyřeším, co bude potřeba.",

    paths: { build: "Vytvořte mi web", learn: "Chci konzultace", unsure: "Ještě nevím" },
    success: "Mám to. Ozvu se vám do dne nebo dvou.",
    play: "Zatímco čekáte, zahrajte si",
    contactEyebrow: "Pojďme si promluvit",
    contactTitle: "Řekněte mi o svém podnikání.",
    wantLegend: "Co potřebujete?",
    nameLabel: "Jméno",
    namePlaceholder: "Vaše jméno",
    emailLabel: "E-mail",
    emailPlaceholder: "vy@vasefirma.cz",
    businessLabel: "Řekněte mi o svém podnikání",
    businessPlaceholder: "např. pekárna v Brně @mojepekarna",
  },
}
