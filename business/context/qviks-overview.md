# qviks overview

Source of truth lives in the qviks repo itself: `../qviks/_doc/qviks.md`,
`architecture.md`, `features.md`, `todo.md`. This is a condensed pointer for
business-side context — re-read the source docs before relying on details here, they
will drift.

## What it is

A multi-tenant CRM for independent service businesses — coaches, therapists, small
studios. Primary persona: someone running a solo practice, mostly online, dozens of
clients, currently juggling spreadsheets, WhatsApp, manual bank transfers, and missed
follow-ups. The villain is chaos, not a competing tool.

**Promise:** *Less administration. More clients. Your practice, finally.*

## Five pillars (modular — start with Clients + Planning, add Money when ready)

| Pillar | Covers |
|---|---|
| Clients | Profiles, history, notes, tags, custom fields |
| Sales | Leads, pipeline, AI-assisted prospecting |
| Planning | Calendar, availability, bookings |
| Money | Products, subscriptions, payments (Stripe + manual bank transfer w/ EPC QR) |
| Smart | AI, automations, notifications |

## Differentiators

- EPC QR payments — client scans from their banking app, pays instantly (EU-native,
  most US-built tools ignore this).
- Public booking page, no login required.
- White-label: each tenant gets a subdomain (or custom domain), own logo/colors/landing.
- Multi-language: EN / FR / SK.
- GDPR-compliant by design.
- Onboarding wizard with live app miniatures, not a PDF.

## Tenant structure

- **Superadmin** — platform owner (Miki), manages tenants and their admins.
- **Admin** — the business owner (e.g. the coach) — has contacts, clients, products,
  calendar, billing.
- **Client** — end user of that business — books sessions, sees own billing only.

Shared DB, every table scoped by `orgId`.

## Stage

Most of the product is live. Self-signup is deferred — today the superadmin
provisions each tenant manually, which matters for the sales motion: onboarding a new
qviks client is currently a manual, white-glove step, not a self-serve signup flow.
Gaps tracked in `../qviks/_doc/todo.md`.

## Why this matters for mikistec's funnel

Every mikistec website client is pre-qualified for qviks: already trusts Miki,
already fits the "solo service business" persona, already has the new site live as
the natural moment to introduce "and here's how you run the business day-to-day."
The manual-provisioning stage of qviks is actually a fit for a small, high-touch
funnel rather than a launch-to-thousands motion — consistent with "a few clients at a
time, done well" rather than needing volume from day one.
