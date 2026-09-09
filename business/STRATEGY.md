# Strategy: consistent revenue

Living doc — revised as we learn. History of *why* things changed belongs in the
journal, not here; this file should always read as "what we currently believe."

**v1 — 2026-09-09.** Based on what's actually in the repos today. Numbers (leads,
close rate, current client count) aren't known yet — first journal entries should
fill those in so this plan can get sharper.

## Decisions confirmed so far (2026-09-09)

- **stec.sk stays separate, not linked from mikistec.** It's a corporate job-search
  CV, different audience/signal than "hire my agency." See
  `context/stec-overview.md`.
- **Personal-brand content on mikistec (photography, design, history) is deferred,
  not dropped.** Focus stays on the three priorities below until there's a working
  offer → outreach → close loop. See `notes/backlog-ideas.md`.
- **Own-CRM setup (priority 3 below) is confirmed as this week's work.** Start
  manual/lightweight (create the tenant, log leads by hand) — no Formspree→qviks
  automation yet, that's premature before there's volume to justify it.
- Offer/pricing decision (priority 1) — still open, user's call.

## Current state, as built

- mikistec landing page is live: one-page offer, StoryBrand-framed, portrait +
  25-years-experience credibility, Formspree contact form as the only capture point.
- **The offer/price section is commented out** (`src/app/page.tsx`, section 5 —
  previously "One page. One price. €990."). Right now a visitor sees no price and no
  concrete package before the contact form — they're asked to say "yes" to something
  undefined.
- The pitch implies proactive, researched outreach ("I research your business...
  Instagram, LinkedIn, Google... I build a real, working first draft") more than pure
  inbound — that's a strong, differentiated angle (show the work before asking for
  the sale) but it isn't systematized anywhere yet: no target list, no cadence, no
  tracking of who's been approached.
- No CRM on our own leads — Formspree submissions go to an inbox, not a pipeline.
- No formal handoff from "site launched" to "here's qviks" — it's mentioned in the
  landing copy ("Grow with me: CRM, email marketing, payments, booking, automation")
  but there's no process, no timing, no offer defined for it.

## Where the leaks are

1. **No visible offer → weak/vague leads.** People who'd say yes to a clear €X
   package don't get the chance to; people who do fill in the form may be
   price-shopping blind, wasting calls.
2. **Outreach isn't a system.** "I research your business first" is a great hook but
   only compounds if it happens on a schedule against a real list, not ad hoc.
3. **No pipeline visibility.** Without a CRM on our own leads, "consistent" is
   unmeasurable — no way to see conversion rate or where things stall.
4. **The recurring engine (qviks) has no defined entry point.** The one-time build is
   capped revenue per client; qviks is where repeat/compounding revenue comes from,
   and today nothing forces that conversation to happen.

## The system (three parts, in priority order)

### 1. Make the offer sayable again
Decide: bring back a clear flat price (the commented-out €990 one-pager, or an
updated number), or replace it with a clear starting price + "book a call" CTA.
Ambiguous pricing is the fastest fix available and costs nothing to ship. This is a
landing-page copy/content decision for the user to make — not something to
silently change in code without confirming the number and packaging first.

### 2. Turn the outreach hook into a weekly cadence
Since the pitch is "I already researched you and built you something," the business
runs on: pick N target businesses/week → research → build the draft → reach out with
the finished draft as the opener, not a cold pitch. Track this in the journal
(targets picked, drafts built, outreach sent, replies) so the volume becomes visible
and repeatable instead of bursty.

### 3. Run leads through qviks itself, and define the upsell moment
Set up a qviks tenant for the business (or use an existing one) and put mikistec's
own leads into its `prospects`/`pipeline` — see
`context/qviks-overview.md`. Define the upsell moment explicitly: e.g. "at
launch, every client gets a qviks demo tenant pre-loaded with their new site's
branding" — a concrete trigger, not a vague mention in the footer of a sales call.

**Confirmed as a this-week priority** — even without a firm number on current lead
volume, having zero pipeline visibility is itself the problem, and setting it up
doesn't depend on the pricing decision. Keep it lightweight to start: one tenant,
manually log leads as they come in (from Formspree, memory, wherever). Don't build
an automated Formspree→qviks integration yet — that's solving a volume problem we
don't have data on yet. Automate once manual logging becomes the bottleneck, not
before.

## This week's priorities

1. Decide the offer/price and either restore or rewrite the offer section on the
   landing page.
2. Pick this week's outreach target list (how many, what kind of business) and log it
   in the journal.
3. Stand up the qviks pipeline for the business's own leads (even just moving
   existing Formspree submissions in manually).

## Metrics to track in the journal

Leads in, drafts built, outreach sent, replies, calls booked, proposals sent, closed,
qviks upsells offered, qviks upsells closed. Doesn't need to be everything every day —
whatever moved.
