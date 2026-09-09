# Business module

This folder is not part of the mikistec website. It's the operating layer for the
business behind it: journal, notes, and context — kept in this repo (versioned,
backed up, close to the code it's driving decisions about) but completely separate
from the Next.js app in `src/`. Nothing here is imported by the app, built, or deployed.

Not a Claude memory store — this is plain markdown the user reads and writes directly.
Claude's own cross-session memory (preferences, recurring feedback) stays in its
separate memory system and is not duplicated here.

## Structure

- `context/` — living reference docs: what each project is, how they connect, who the
  business is for. Read these to get oriented; update them when the shape of the
  business changes, not for day-to-day logging.
- `journal/` — one file per entry (`YYYY-MM-DD.md`), append-only log of what happened,
  decisions, numbers, blockers. See `journal/README.md` for the format.
- `notes/` — undated, running lists: offer/pricing ideas, objections heard, copy
  swipe, experiments to try. See `notes/README.md`.
- `STRATEGY.md` — the current plan for consistent revenue. Living doc, revised as we
  learn — not a log, the log is the journal.

## The three projects

- **mikistec** (this repo) — Miki's personal landing page/offer: custom-built
  websites for small businesses. The front door.
- **qviks** (`../qviks`) — the SaaS product mikistec sells clients into: CRM +
  booking + billing for independent service businesses. The recurring engine.
- **stec** (`../project-resume`, live at stec.sk) — Miki's personal CV/portfolio.
  Credibility anchor behind the mikistec offer.

Full detail in `context/overview.md`, `context/qviks-overview.md`, `context/stec-overview.md`.
