# Context: retreat-niche outreach

Facts only — no plan/strategy here by design, so other AI models can propose
strategy from a clean, unbiased context. See conversation/journal for prior draft
decisions if needed.

## mikistec

Miki Stec's personal landing page/offer: he researches a small business, builds a
real working draft website for it, and pitches "you just say yes." One-time project
fee. This is the front door / lead capture. Currently live, but the price/offer
section is commented out in the code — no price is shown to visitors right now.

## qviks

A separate, already-built multi-tenant SaaS product: CRM + booking + billing for
independent service businesses (coaches, therapists, small studios). Five pillars:
Clients, Sales, Planning, Money, Smart. Modular — start with Clients + Planning, add
Money when ready. Self-signup is deferred; today the superadmin provisions each
tenant manually.

## The funnel (as currently pitched, not yet formally operated)

mikistec landing copy already mentions, post-launch: "Grow with me — CRM, email
marketing, payments, booking, automation" — a reference to qviks, but there is no
defined moment or process where a mikistec client is actually offered qviks.

## "Avatar" (qviks feature — this is what "avatar" refers to)

A qviks-specific term, not a general AI term. `lead_avatars` table + a CLI-assisted
script (`scripts/source-leads.ts`): an avatar is a short criteria description (e.g.
"yoga retreat organizers, Europe, English"). A human runs a Claude session against
that criteria to research and find matching real businesses online; results get
added to qviks' CRM as prospects for manual review. Deliberately human-in-the-loop —
"the app on prod never calls AI at runtime." Known gap: relevance scores on sourced
leads are not yet independently verified/cited.

## Current state

- mikistec live, no visible price.
- No active outreach of any kind.
- No defined qviks upsell moment for a closed mikistec client.
- No lead pipeline beyond a plain Formspree inbox.
- No avatar has been created for mikistec's own prospecting yet.
