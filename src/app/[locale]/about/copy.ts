import type { Locale } from "@/lib/i18n"

export const CHAPTER_IDS = [
  "birth",
  "childhood",
  "school",
  "flash",
  "systems",
  "photo",
  "visual",
  "direction",
  "corporate",
  "nomad",
  "beyond",
  "now",
] as const
export type ChapterId = (typeof CHAPTER_IDS)[number]

type Chapter = { years: string; title: string; body: string[] }

const en = {
  metaTitle: "About",
  metaDescription: "Art, music, photography, websites, enterprise software, a sailboat in the Caribbean and AI. The long version of Miki Stec, since 1981.",
  eyebrow: "About me",
  title: "I've been making things since 1981.",
  intro: "Drawing, music, photography, websites, software for big companies, and now AI.",
  stats: [
    { n: "23", label: "years building websites" },
    { n: "~1,000", label: "people photographed" },
    { n: "200", label: "photography graduates" },
    { n: "2", label: "photo studios" },
    { n: "5", label: "global corporations" },
  ],
  statsNote: "I won and kept all these clients mainly because I had good websites and my own systems that helped me run the business.",
  scrollHint: "Scroll through the years",
  chapters: {
    birth: {
      years: "1981",
      title: "Hello, world.",
      body: [
      ],
    },
    childhood: {
      years: "1985–1995",
      title: "Crayons, a guitar and a Commodore",
      body: [
        "As a kid I drew all the time and played musical instruments.",
        "Around 1990 I first got my hands on a computer and wrote my first lines in BASIC. Since then I've loved both technology and creative work.",
      ],
    },
    school: {
      years: "1997–2004",
      title: "Screwdrivers and a master's degree",
      body: [
        "At 16 I was assembling and setting up Windows 95 computers for customers (and vacuuming a lot of dust out of them).",
        "Then came five years at the Technical University of Košice, crowned with a master's degree.",
      ],
    },
    flash: {
      years: "2003",
      title: "My first website. In Flash.",
      body: [
        "It was animated, playful and full of sound.",
        "I've been building websites ever since. The technologies changed, the websites stayed.",
      ],
    },
    systems: {
      years: "2004–2010",
      title: "Big systems, big clients",
      body: [
        "I worked on Slovakia's tax information system with millions of records. Then I spent four years at Allianz working on insurance databases, calculators and user interface design.",
      ],
    },
    photo: {
      years: "2010–2015",
      title: "Photographer. Two studios. A thousand faces.",
      body: [
        "For a few years, the camera became my main tool.",
        "Under the name Talking Pictures I ran two photo studios, photographed about a thousand people, and around 200 people went through my photography courses.",
        "I also exhibited my work, for example at my solo show Pure Beauty in 2014.",
      ],
    },
    visual: {
      years: "2010–2015",
      title: "I did everything a small business needs",
      body: [
        "Alongside photography I made posters, price lists, flyers, logos, CD booklets, e-shops and whole websites for local businesses. Sometimes even interiors.",
        "Looking good wasn't enough. It also had to help the business sell.",
      ],
    },
    direction: {
      years: "2015–2016",
      title: "Back to software, all in",
      body: [
        "In 2015 I decided to focus on modern web development. JavaScript, Angular and later React.",
        "In 2016 I flew to London for The Business Show with a badge that read “NICK STEC — ENTREPRENEUR”.",
        "Today it makes me smile.",
      ],
    },
    corporate: {
      years: "2017–2026",
      title: "Software for big companies",
      body: [
        "As a front-end and full-stack developer I worked on projects for Caterpillar, Swiss Re, UNIQA, VARDEN and Škoda.",
        "We built sales tools, natural-hazard maps, insurance calculators, healthcare booking and a large logistics platform.",
        "Working in big teams taught me to do things properly: security, code review, testing, deadlines and ownership of the result.",
        "I bring the same to smaller projects today.",
      ],
    },
    nomad: {
      years: "After COVID",
      title: "A laptop, a backpack and a boat",
      body: [
        "When the world opened up again, I took my work with me.",
        "I bought a sailboat in the Caribbean and started living as a digital nomad. I worked from all kinds of places, from the Caribbean and New York to Asia.",
        "I could do it because my work and my business ran online.",
      ],
    },
    beyond: {
      years: "Always",
      title: "Music, curiosity and old books",
      body: [
        "Outside work, I'm still curious about far too many things.",
      ],
    },
    now: {
      years: "Today",
      title: "Today I use all of this on your project.",
      body: [
        "I research your business, write the words, design and build the website and, if needed, add AI, a CRM or automation.",
        "Or I'll teach you how.",
      ],
    },
  } satisfies Record<ChapterId, Chapter>,
  corporateClients: ["Caterpillar", "Swiss Re", "UNIQA", "VARDEN", "Škoda", "Allianz"],
  flashCaption: "The real 2003 Flash site",
  beyond: [
    { title: "Music", body: "Keys, guitar and other instruments, recording and the odd live gig." },
    { title: "Curiosity", body: "When something grabs me, I go deep. For example, I dug into Chinese characters to understand the Tao Te Ching better." },
    { title: "Mind", body: "I read philosophy and psychology and practise qi gong and yoga. The longer I run a business, the more I see that understanding people matters as much as understanding technology." },
  ],
  taoQuote: "A journey of a thousand miles begins with a single step.",
  taoSource: "Tao Te Ching",
  whyTitle: "So, who am I?",
  why: [
    { title: "Artist", body: "Years of photography, drawing and design. I know how things should look and feel." },
    { title: "Developer", body: "23 years building websites and software. I've worked for the biggest companies and bring the same professionalism to your project." },
    { title: "Entrepreneur", body: "I've run my own businesses and sold my own work. I know a pretty website isn't enough. It has to bring you customers." },
  ],
  finalTitle: "So, shall we make something?",
  cta: "YES",
  finalAlt: "See pricing",
}

type Copy = typeof en

const sk: Copy = {
  metaTitle: "O mne",
  metaDescription: "Umenie, hudba, fotografia, weby, softvér pre korporácie, plachetnica v Karibiku a AI. Dlhá verzia príbehu Mikiho Šteca, od roku 1981.",
  eyebrow: "O mne",
  title: "Tvorím od roku 1981.",
  intro: "Kreslenie, hudba, fotografia, weby, softvér pre veľké firmy a dnes AI.",
  stats: [
    { n: "23", label: "rokov tvorím weby" },
    { n: "~1 000", label: "nafotených ľudí" },
    { n: "200", label: "absolventov kurzov fotenia" },
    { n: "2", label: "fotoateliéry" },
    { n: "5", label: "svetových korporácií" },
  ],
  statsNote: "Všetkých týchto klientov som získal a udržal najmä vďaka tomu, že som mal dobré weby a vlastné systémy, ktoré mi pomáhali s podnikaním.",
  scrollHint: "Prejdite si roky",
  chapters: {
    birth: {
      years: "1981",
      title: "Ahoj, svet.",
      body: [
      ],
    },
    childhood: {
      years: "1985–1995",
      title: "Pastelky, gitara a Commodore",
      body: [
        "Ako dieťa som stále kreslil a hral na hudobné nástroje.",
        "Okolo roku 1990 som sa prvýkrát dostal k počítaču a napísal prvé riadky v BASICu. Odvtedy ma bavia technológie aj tvorivé veci.",
      ],
    },
    school: {
      years: "1997–2004",
      title: "Skrutkovač a inžiniersky titul",
      body: [
        "Ako 16-ročný som zákazníkom skladal a nastavoval počítače s Windows 95 (a vysával z nich kopu prachu).",
        "Potom prišlo päť rokov na Technickej univerzite v Košiciach, zavŕšených inžinierskym titulom.",
      ],
    },
    flash: {
      years: "2003",
      title: "Môj prvý web. Vo Flashi.",
      body: [
        "Bol animovaný, hravý a plný zvukov.",
        "Odvtedy robím weby. Technológie sa menili, weby zostali.",
      ],
    },
    systems: {
      years: "2004–2010",
      title: "Veľké systémy, veľkí klienti",
      body: [
        "Pracoval som na daňovom informačnom systéme Slovenska s miliónmi záznamov. Potom som štyri roky pracoval v Allianz na poistných databázach, kalkulačkách a návrhu používateľských rozhraní.",
      ],
    },
    photo: {
      years: "2010–2015",
      title: "Fotograf. Dva ateliéry. Tisíc tvárí.",
      body: [
        "Na pár rokov sa mojím hlavným pracovným nástrojom stal fotoaparát.",
        "Pod značkou Talking Pictures som viedol dva fotoateliéry, nafotil približne tisíc ľudí a mojimi kurzami fotografie prešlo okolo 200 ľudí.",
        "Svoju tvorbu som aj vystavoval, napríklad na samostatnej výstave Pure Beauty v roku 2014.",
      ],
    },
    visual: {
      years: "2010–2015",
      title: "Robil som všetko, čo malá firma potrebuje",
      body: [
        "Popri fotografii som pre miestne firmy robil plagáty, cenníky, letáky, logá, CD booklety, e-shopy aj celé weby. Občas dokonca interiér.",
        "Nestačilo, aby veci dobre vyzerali. Museli firme aj pomáhať predávať.",
      ],
    },
    direction: {
      years: "2015–2016",
      title: "Späť naplno k softvéru",
      body: [
        "V roku 2015 som sa rozhodol sústrediť na moderný vývoj webov. JavaScript, Angular a neskôr React.",
        "V roku 2016 som letel do Londýna na The Business Show s visačkou „NICK STEC — ENTREPRENEUR“.",
        "Dnes je to skôr úsmevná spomienka.",
      ],
    },
    corporate: {
      years: "2017–2026",
      title: "Softvér pre veľké firmy",
      body: [
        "Ako front-end a full-stack vývojár som pracoval na projektoch pre Caterpillar, Swiss Re, UNIQA, VARDEN a Škodu.",
        "Robili sme predajné nástroje, mapy prírodných rizík, kalkulačky poistenia, zdravotnícke rezervácie aj veľkú logistickú platformu.",
        "Práca vo veľkých tímoch ma naučila robiť veci poriadne: bezpečnosť, code review, testovanie, termíny a zodpovednosť za výsledok.",
        "To isté dnes prinášam aj do menších projektov.",
      ],
    },
    nomad: {
      years: "Po covide",
      title: "Notebook, batoh a loď",
      body: [
        "Keď sa svet znova otvoril, zobral som prácu so sebou.",
        "Kúpil som si plachetnicu v Karibiku a začal žiť ako digitálny nomád. Pracoval som z rôznych miest od Karibiku a New Yorku až po Áziu.",
        "Mohol som to robiť preto, že moja práca aj podnikanie fungovali online.",
      ],
    },
    beyond: {
      years: "Vždy",
      title: "Hudba, zvedavosť a staré knihy",
      body: [
        "Mimo práce ma stále zaujíma príliš veľa vecí.",
      ],
    },
    now: {
      years: "Dnes",
      title: "Toto všetko dnes využívam pri vašom projekte.",
      body: [
        "Preskúmam vaše podnikanie, napíšem texty, navrhnem a postavím web a podľa potreby pridám AI, CRM alebo automatizáciu.",
        "Alebo vás to naučím.",
      ],
    },
  },
  corporateClients: ["Caterpillar", "Swiss Re", "UNIQA", "VARDEN", "Škoda", "Allianz"],
  flashCaption: "Skutočný Flash web z roku 2003",
  beyond: [
    { title: "Hudba", body: "Klávesy, gitara a iné nástroje, nahrávanie a občas živé hranie." },
    { title: "Zvedavosť", body: "Keď ma niečo zaujme, idem do hĺbky. Napríklad som skúmal čínske znaky, aby som lepšie pochopil Tao Te Ťing." },
    { title: "Myseľ", body: "Čítam filozofiu a psychológiu, cvičím čchi-kung a jogu. Čím dlhšie podnikám, tým viac vidím, že rozumieť ľuďom je rovnako dôležité ako rozumieť technológiám." },
  ],
  taoQuote: "Cesta dlhá tisíc míľ začína prvým krokom.",
  taoSource: "Tao Te Ťing",
  whyTitle: "Kto teda som",
  why: [
    { title: "Umelec", body: "Roky fotografie, kreslenia a dizajnu. Viem, ako má vec vyzerať a pôsobiť." },
    { title: "Developer", body: "23 rokov tvorím weby a softvér. Robil som aj pre najväčšie firmy a rovnakú profesionalitu prinášam do vašich projektov." },
    { title: "Podnikateľ", body: "Viedol som vlastné firmy a predával vlastnú prácu. Viem, že pekný web nestačí. Musí vám prinášať zákazníkov." },
  ],
  finalTitle: "Tak čo, vytvoríme niečo?",
  cta: "ÁNO",
  finalAlt: "Pozrieť cenník",
}

const cz: Copy = {
  metaTitle: "O mně",
  metaDescription: "Umění, hudba, fotografie, weby, software pro korporace, plachetnice v Karibiku a AI. Dlouhá verze příběhu Mikiho Šteca, od roku 1981.",
  eyebrow: "O mně",
  title: "Tvořím od roku 1981.",
  intro: "Kreslení, hudba, fotografie, weby, software pro velké firmy a dnes AI.",
  stats: [
    { n: "23", label: "let tvořím weby" },
    { n: "~1 000", label: "nafocených lidí" },
    { n: "200", label: "absolventů kurzů focení" },
    { n: "2", label: "fotoateliéry" },
    { n: "5", label: "světových korporací" },
  ],
  statsNote: "Všechny tyto klienty jsem získal a udržel hlavně díky tomu, že jsem měl dobré weby a vlastní systémy, které mi pomáhaly s podnikáním.",
  scrollHint: "Projděte si roky",
  chapters: {
    birth: {
      years: "1981",
      title: "Ahoj, světe.",
      body: [
      ],
    },
    childhood: {
      years: "1985–1995",
      title: "Pastelky, kytara a Commodore",
      body: [
        "Jako dítě jsem pořád kreslil a hrál na hudební nástroje.",
        "Kolem roku 1990 jsem se poprvé dostal k počítači a napsal první řádky v BASICu. Od té doby mě baví technologie i tvořivé věci.",
      ],
    },
    school: {
      years: "1997–2004",
      title: "Šroubovák a inženýrský titul",
      body: [
        "Jako šestnáctiletý jsem zákazníkům skládal a nastavoval počítače s Windows 95 (a vysával z nich spoustu prachu).",
        "Pak přišlo pět let na Technické univerzitě v Košicích, završených inženýrským titulem.",
      ],
    },
    flash: {
      years: "2003",
      title: "Můj první web. Ve Flashi.",
      body: [
        "Byl animovaný, hravý a plný zvuků.",
        "Od té doby dělám weby. Technologie se měnily, weby zůstaly.",
      ],
    },
    systems: {
      years: "2004–2010",
      title: "Velké systémy, velcí klienti",
      body: [
        "Pracoval jsem na daňovém informačním systému Slovenska s miliony záznamů. Pak jsem čtyři roky pracoval v Allianz na pojistných databázích, kalkulačkách a návrhu uživatelských rozhraní.",
      ],
    },
    photo: {
      years: "2010–2015",
      title: "Fotograf. Dva ateliéry. Tisíc tváří.",
      body: [
        "Na pár let se mým hlavním pracovním nástrojem stal fotoaparát.",
        "Pod značkou Talking Pictures jsem vedl dva fotoateliéry, nafotil přibližně tisíc lidí a mými kurzy fotografie prošlo kolem 200 lidí.",
        "Svou tvorbu jsem i vystavoval, například na samostatné výstavě Pure Beauty v roce 2014.",
      ],
    },
    visual: {
      years: "2010–2015",
      title: "Dělal jsem všechno, co malá firma potřebuje",
      body: [
        "Vedle fotografie jsem pro místní firmy dělal plakáty, ceníky, letáky, loga, CD booklety, e-shopy i celé weby. Občas dokonce interiér.",
        "Nestačilo, aby věci dobře vypadaly. Musely firmě i pomáhat prodávat.",
      ],
    },
    direction: {
      years: "2015–2016",
      title: "Zpátky naplno k softwaru",
      body: [
        "V roce 2015 jsem se rozhodl soustředit na moderní vývoj webů. JavaScript, Angular a později React.",
        "V roce 2016 jsem letěl do Londýna na The Business Show s visačkou „NICK STEC — ENTREPRENEUR“.",
        "Dnes je to spíš úsměvná vzpomínka.",
      ],
    },
    corporate: {
      years: "2017–2026",
      title: "Software pro velké firmy",
      body: [
        "Jako front-end a full-stack vývojář jsem pracoval na projektech pro Caterpillar, Swiss Re, UNIQA, VARDEN a Škodu.",
        "Dělali jsme prodejní nástroje, mapy přírodních rizik, kalkulačky pojištění, zdravotnické rezervace i velkou logistickou platformu.",
        "Práce ve velkých týmech mě naučila dělat věci pořádně: bezpečnost, code review, testování, termíny a odpovědnost za výsledek.",
        "Totéž dnes přináším i do menších projektů.",
      ],
    },
    nomad: {
      years: "Po covidu",
      title: "Notebook, batoh a loď",
      body: [
        "Když se svět znovu otevřel, vzal jsem práci s sebou.",
        "Koupil jsem si plachetnici v Karibiku a začal žít jako digitální nomád. Pracoval jsem z různých míst od Karibiku a New Yorku až po Asii.",
        "Mohl jsem to dělat proto, že moje práce i podnikání fungovaly online.",
      ],
    },
    beyond: {
      years: "Vždy",
      title: "Hudba, zvědavost a staré knihy",
      body: [
        "Mimo práci mě pořád zajímá až příliš mnoho věcí.",
      ],
    },
    now: {
      years: "Dnes",
      title: "Tohle všechno dnes využívám u vašeho projektu.",
      body: [
        "Prozkoumám vaše podnikání, napíšu texty, navrhnu a postavím web a podle potřeby přidám AI, CRM nebo automatizaci.",
        "Nebo vás to naučím.",
      ],
    },
  },
  corporateClients: ["Caterpillar", "Swiss Re", "UNIQA", "VARDEN", "Škoda", "Allianz"],
  flashCaption: "Skutečný Flash web z roku 2003",
  beyond: [
    { title: "Hudba", body: "Klávesy, kytara a jiné nástroje, nahrávání a občas živé hraní." },
    { title: "Zvědavost", body: "Když mě něco zaujme, jdu do hloubky. Například jsem zkoumal čínské znaky, abych lépe pochopil Tao Te Ťing." },
    { title: "Mysl", body: "Čtu filozofii a psychologii, cvičím čchi-kung a jógu. Čím déle podnikám, tím víc vidím, že rozumět lidem je stejně důležité jako rozumět technologiím." },
  ],
  taoQuote: "Cesta dlouhá tisíc mil začíná prvním krokem.",
  taoSource: "Tao Te Ťing",
  whyTitle: "Kdo tedy jsem",
  why: [
    { title: "Umělec", body: "Roky fotografie, kreslení a designu. Vím, jak má věc vypadat a působit." },
    { title: "Vývojář", body: "23 let tvořím weby a software. Dělal jsem i pro největší firmy a stejnou profesionalitu přináším do vašich projektů." },
    { title: "Podnikatel", body: "Vedl jsem vlastní firmy a prodával vlastní práci. Vím, že hezký web nestačí. Musí vám přinášet zákazníky." },
  ],
  finalTitle: "Tak co, vytvoříme něco?",
  cta: "ANO",
  finalAlt: "Zobrazit ceník",
}

export const COPY: Record<Locale, Copy> = { en, sk, cz }
