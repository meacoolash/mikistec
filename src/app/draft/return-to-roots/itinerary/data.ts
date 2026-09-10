export type Slot = {
  time: string;
  title: string;
  body?: string;
  sub?: { time: string; text: string }[];
};

export type Day = {
  id: string;
  n: string;
  meta: string;
  title: string;
  summary: string;
  slots: Slot[];
};

export const DAYS: Day[] = [
  {
    id: "day-1",
    n: "01",
    meta: "Thu · 15 Oct",
    title: "Grounding & settling",
    summary: "Arrive, drop the journey, and meet the circle you will spend the week with.",
    slots: [
      {
        time: "14:00 – 16:00",
        title: "Arrival & check-in",
        body: "A grounding ginger-tulsi tea on arrival, then your room and a walk around the grounds. Nothing is asked of you today.",
      },
      {
        time: "16:30 – 18:00",
        title: "Opening circle & body-mapping",
        body: "Intentions and community agreements, then a gentle somatic exercise mapping where the journey — and the months before it — are being held in the body.",
      },
      {
        time: "18:30 – 20:00",
        title: "Welcome feast",
        body: "A warm, grounding, Vata-balancing Ayurvedic dinner.",
      },
      {
        time: "20:30 – 21:30",
        title: "Yoga Nidra",
        body: "Guided psychic sleep to settle the nervous system and invite deep rest on the first night.",
      },
    ],
  },
  {
    id: "day-2",
    n: "02",
    meta: "Fri · 16 Oct",
    title: "Nature & somatic release",
    summary: "A silent morning in the forest, a long open afternoon, and movement that lets things go.",
    slots: [
      {
        time: "07:00 – 10:30",
        title: "Somatic forest hike",
        body: "A guided walk in silence using somatic tracking and sensory awareness — sight, sound and touch connected directly to a calming nervous system.",
      },
      {
        time: "10:30 – 11:30",
        title: "Hearty brunch",
        body: "A nourishing meal to restore energy after the walk.",
      },
      {
        time: "12:00 – 13:30",
        title: "Ayurveda teachings",
        body: "The three doshas — Vata, Pitta and Kapha — and what your own body-mind constitution actually asks for.",
      },
      {
        time: "13:30 – 16:30",
        title: "Open afternoon",
        body: "Three hours with nothing in them. Journal, swim, sleep, or sit under a tree.",
      },
      {
        time: "16:30 – 18:00",
        title: "Somatic session",
        body: "Therapeutic shaking mechanics and authentic movement, letting held emotional energy move through and out.",
      },
      { time: "18:30 – 20:00", title: "Dinner" },
      {
        time: "20:30 – 21:30",
        title: "Pranayama & integration",
        body: "Gentle breath awareness and a guided meditation to close the day in stillness.",
      },
    ],
  },
  {
    id: "day-3",
    n: "03",
    meta: "Sat · 17 Oct",
    title: "Kathmandu & sacred spaces",
    summary: "One full day in the city — living ritual, old streets, and a circle to land it afterwards.",
    slots: [
      {
        time: "07:30 – 08:30",
        title: "Vipassana",
        body: "Silent mindfulness practice before the day opens.",
      },
      {
        time: "10:00 – 15:30",
        title: "Kathmandu excursion",
        sub: [
          { time: "10:00", text: "Travel into central Kathmandu." },
          {
            time: "11:00",
            text: "A mindful walking tour of Boudhanath Stupa or Swayambhunath — living ritual rather than a monument.",
          },
          { time: "14:00", text: "Traditional Newari or organic local lunch before heading back." },
        ],
      },
      {
        time: "16:30 – 18:00",
        title: "Ayurveda & re-centering",
        body: "A decompression circle on Dinacharya — daily rituals for keeping balance in busy, over-stimulating places.",
      },
      {
        time: "18:30 – 20:30",
        title: "Celebratory dinner",
        body: "A rich, warming Ayurvedic feast built around the autumn harvest.",
      },
    ],
  },
  {
    id: "day-4",
    n: "04",
    meta: "Sun · 18 Oct",
    title: "Celebration & photoshoot",
    summary: "Heart-opening practice, traditional dress, a real photographer, and a long last evening.",
    slots: [
      {
        time: "10:00 – 11:30",
        title: "Metta & boundary work",
        body: "Loving-kindness meditation paired with gentle heart-opening somatic boundary practice.",
      },
      { time: "11:30 – 13:00", title: "Lunch" },
      {
        time: "13:00 – 15:30",
        title: "Traditional dress",
        body: "Being adorned in Nepali attire — saris, kurtas and ethnic garments — with local assistants.",
      },
      {
        time: "15:30 – 18:00",
        title: "Farewell photoshoot",
        body: "A professional group and individual shoot in the landscape of the venue.",
      },
      {
        time: "18:30 – 21:30",
        title: "Farewell feast & closing circle",
        body: "A festive dinner, then storytelling, open-mic reflections and shared takeaways — still in your cultural dress.",
      },
    ],
  },
  {
    id: "day-5",
    n: "05",
    meta: "Mon · 19 Oct",
    title: "Re-entry & embodiment",
    summary: "Building the version of this week that survives your ordinary Tuesday.",
    slots: [
      { time: "07:30 – 09:30", title: "Packing & check-out" },
      {
        time: "09:30 – 11:30",
        title: "Closing circle — your Home Sanctuary",
        body: "Practical planning for how Ayurvedic habits and brief somatic check-ins survive a busy schedule back home. A final group blessing.",
      },
      { time: "11:30", title: "Departure", body: "Final farewells." },
    ],
  },
];
