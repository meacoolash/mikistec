/**
 * Everything editable on this page lives here.
 *
 * EVENTS is shaped like a QVIKS `events` row (eventType, title, date, start,
 * end, description, imageUrl, isSpecial, status) plus three fields the landing
 * page needs — `location`, `note` and `repeats`. Swapping this constant for a
 * fetch from QVIKS should be the only change needed: the page itself holds no
 * dates, no weekdays and no event copy.
 */

export type EventStatus = "published" | "coming_soon" | "draft" | "closed" | "cancelled";

export type EventItem = {
  id: string;
  eventType: "session" | "workshop" | "retreat" | "trek";
  title: string;
  /** YYYY-MM-DD — for a repeating event, the next occurrence. */
  date: string;
  /** YYYY-MM-DD, only for things that run over several days. */
  endDate?: string;
  /** HH:MM, 24h. Optional for multi-day events. */
  start?: string;
  end?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  /** Free line under the event — price, donation, certificate, anything. */
  note?: string;
  /** "weekly" renders as "Every Tuesday", etc. Left out = a one-off date. */
  repeats?: "weekly" | "monthly";
  isSpecial?: boolean;
  status: EventStatus;
};

export const PROFILE = {
  name: "Manish Pole",
  location: "Ubud, Bali",
  disciplines: "Yoga · Wisdom · Meditation",
  since: "Teaching since 2003",
  quote: "Meditation is about becoming friends with yourself.",
  heroImage: "/draft/manish-pole/teaching-portrait.jpg",
  email: "manish@awaken-wellness.co",
  school: "Awaken School",
  headline: ["Ancient wisdom,", "taught without the mystique."],
  intro: [
    "Manish came to yoga as a copywriter with a mind that would not settle, then spent seven years living and training with the Himalayan yogi Bharat Thakur. He built Total Yoga into a school on four continents, and now teaches from Bali as co-founder of the Awaken School — bringing together the old texts and current meditation science, in plain language.",
    "He believes the inner journey is best walked with a mentor rather than a doctrine — which is why most of what he offers starts with a room, a cushion and an hour.",
  ],
};

export const FACTS = [
  { n: "2003", l: "Teaching since" },
  { n: "22+", l: "Years training teachers" },
  { n: "6", l: "Countries the school reached" },
];

export const TEACHES = [
  {
    h: "Breath",
    p: "Classical pranayama — the oldest, most reliable way to change the state you are in.",
  },
  {
    h: "Body",
    p: "Classical yoga and yogic detox practices, taught as preparation for sitting rather than as performance.",
  },
  {
    h: "Mind",
    p: "Vipassana and the classical meditations, with the wisdom behind them — Yoga Sutras, not vague spirituality.",
  },
  {
    h: "Heart",
    p: "Dynamic and active meditations, journaling, art, laughter. Catharsis first, stillness after.",
  },
];

export const PATH = [
  {
    y: "2002",
    t: "Graduated in psychology, literature and journalism. Copywriting in an ad agency, and burning out on deadlines.",
  },
  {
    y: "2003–2010",
    t: "Lived, trained and taught with the Himalayan yogi Bharat Thakur — seven years of practice rather than theory.",
  },
  {
    y: "2010–2020",
    t: "Co-founded and led Total Yoga: Pune to India, the USA, the UK, the UAE, Singapore and New Zealand. Over a hundred teachers trained.",
  },
  {
    y: "2020–2023",
    t: "Founded 21st Century Yoga, taking the school online. Author of 21st Century Yogi.",
  },
  {
    y: "2023 —",
    t: "Co-founded the Awaken School with Rana Abihayla — Dubai, Bali and India. Led the main meditation event at Dubai Expo 2020; coaches leaders and Olympic athletes.",
  },
];

export const GALLERY = [
  {
    src: "/draft/manish-pole/teaching-wide.jpg",
    alt: "Manish Pole laughing while teaching a seated circle",
  },
  {
    src: "/draft/manish-pole/manish-rana.jpg",
    alt: "Manish Pole and Rana Abihayla, co-founders of the Awaken School",
  },
  {
    src: "/draft/manish-pole/practice.jpg",
    alt: "A student sitting in practice, hands at the heart",
  },
];

export const VOICES = [
  {
    q: "A very genuine experience, no gimmicks, a complete focus on exploring yoga at its fullest. I gained a much deeper understanding of the philosophy and history of yoga, and how to apply that to my life.",
    n: "Ash Bowcock",
    c: "United Kingdom",
  },
  {
    q: "Here I am closing 20 years with Manish Pole — my yoga teacher, coach and a friend. He connects yoga philosophy with the practice, which gives context and reasoning to what we are doing.",
    n: "Upma Koul",
    c: "United Arab Emirates",
  },
];

/** Replace with the QVIKS feed. Order does not matter — the page sorts by date. */
export const EVENTS: EventItem[] = [
  {
    id: "dhyana-sunday",
    eventType: "session",
    title: "dhyāna — a meditation community",
    date: "2026-09-13",
    start: "09:30",
    end: "10:30",
    repeats: "weekly",
    location: "Sayuri Healing Food, Ubud",
    description:
      "One hour together: breath, body, mind and heart, in that order. An open community practice rather than a class — beginners are the point, not the exception.",
    imageUrl: "/draft/manish-pole/poster-dhyana.jpg",
    isSpecial: true,
    status: "published",
  },
  {
    id: "rebirth-dec-2026",
    eventType: "retreat",
    title: "Re:Birth — two days of silence",
    date: "2026-12-04",
    endDate: "2026-12-05",
    location: "The Yogi's Garden, Payangan, Bali",
    description:
      "Detox kriyas, classical yoga, Vipassana, yoga nidra, a bonfire and 1:1 coaching. You leave able to sit for an hour on your own.",
    note: "From IDR 5.9 million · 20h Yoga Alliance CE",
    status: "published",
  },
  {
    id: "ebc-2027",
    eventType: "trek",
    title: "Everest Base Camp — the meditative ascent",
    date: "2027-05-01",
    endDate: "2027-05-15",
    location: "Kathmandu, Nepal",
    description:
      "Fifteen days walked as a practice. The group trains together for months before the first step.",
    status: "published",
  },
];
