# Business overview

**Owner:** Miki Stec. **Goal:** consistent revenue, not one-off wins.

## The three pieces and how they connect

```
stec.sk (CV/portfolio)          →  separate: corporate job search, not linked here
                                     (see context/stec-overview.md)

mikistec (this repo)            →  the front door / lead capture
        │  one-time offer: research-driven, custom-built website
        │  landing copy: "I research your business, write it, build it, launch it.
        │  You just say yes." StoryBrand-framed, portrait + personal brand.
        ▼  client says yes, site gets built and launched
        │
        └── upsell: "Grow with me" — CRM, email marketing, payments, booking,
            automation — i.e. qviks
        ▼
qviks (../qviks)                →  the recurring engine
   multi-tenant SaaS: CRM + booking + billing for independent service
   businesses (coaches, therapists, small studios). This is where MRR lives.
```

Two revenue lines, different jobs:

1. **One-time website build** (mikistec) — cash flow now, proves value, low trust
   barrier to say yes to. This is the top of funnel.
2. **Recurring qviks subscription** — the actual compounding business. Every mikistec
   client is a qualified lead for qviks: they already trust Miki, already have the
   website live, already run a small service business that fits qviks' persona
   (solo practice — coach/therapist/studio — juggling spreadsheets and WhatsApp).

"Consistent money" means: consistent flow of (1) *and* a reliable conversion path
from (1) into (2). Right now (1) exists (site is live) but has no visible pricing
(the offer/pricing section on the landing page is currently commented out — see
`src/app/page.tsx`), and (2) has no formal handoff process yet — see `STRATEGY.md`.

## Using qviks on ourselves

qviks has its own CRM/pipeline (`contacts`, `prospects`, `pipeline` under
`../qviks/src/app`) built for exactly this: capturing leads and moving them through a
sales process. There's no reason mikistec's own leads should live only in a Formspree
inbox — running the business's own pipeline inside a qviks tenant is both practical
(one system, not two) and is itself a live demo to show prospective qviks clients.
See `context/qviks-overview.md` and `notes/qviks-upsell.md` (once started).

## Other projects in `../` (not part of this business, noted for orientation)

- `q-landing` — an old standalone qviks marketing site, superseded by
  `qviks/src/app/landing`. Not actively used.
- `q-crm` — empty directory, appears abandoned/placeholder.
- `cashflow`, `nayuun`, `phenicie`, `wolf` — other client/personal projects, unrelated
  to this business line. Out of scope here unless the user says otherwise.

## Personal-brand content on mikistec — deferred, not dropped

Photography, design work, personal history/story on the mikistec landing page: a
real idea, but deliberately not in scope right now. See `notes/backlog-ideas.md`.
