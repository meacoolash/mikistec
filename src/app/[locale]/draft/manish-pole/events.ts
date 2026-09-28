import type { EventItem } from "./content";

/**
 * Date helpers. Everything is read out of the event data — the page never
 * spells out a weekday, a month or a time of its own.
 */

const DAY = 86_400_000;

const utc = (iso: string) => new Date(`${iso}T00:00:00Z`);

const fmt = (date: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(date);

/** Today at midnight UTC — the reference point for "is this still ahead of us". */
const today = (now: Date) =>
  utc(new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(now));

/** A weekly event rolls forward to its next occurrence; everything else stays put. */
export function nextDate(ev: EventItem, now: Date): Date {
  const start = utc(ev.date);
  if (ev.repeats !== "weekly") return start;
  const from = today(now);
  if (start >= from) return start;
  const weeks = Math.ceil((from.getTime() - start.getTime()) / (7 * DAY));
  return new Date(start.getTime() + weeks * 7 * DAY);
}

function isOver(ev: EventItem, now: Date): boolean {
  if (ev.repeats) return false;
  const last = utc(ev.endDate ?? ev.date);
  return last < today(now);
}

/** Published events that have not happened yet, soonest first. */
export function upcoming(events: EventItem[], now: Date): EventItem[] {
  return events
    .filter((e) => e.status === "published" && !isOver(e, now))
    .sort((a, b) => nextDate(a, now).getTime() - nextDate(b, now).getTime());
}

/** "Every Sunday" · "Friday 4 December 2026" · "4 – 5 December 2026" */
export function whenLabel(ev: EventItem, now: Date): string {
  const start = nextDate(ev, now);
  if (ev.repeats === "weekly") return `Every ${fmt(start, { weekday: "long" })}`;
  if (ev.repeats === "monthly") return "Monthly";

  if (!ev.endDate || ev.endDate === ev.date) {
    return fmt(start, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  const end = utc(ev.endDate);
  const sameMonth =
    fmt(start, { month: "long", year: "numeric" }) === fmt(end, { month: "long", year: "numeric" });
  return sameMonth
    ? `${fmt(start, { day: "numeric" })} – ${fmt(end, { day: "numeric", month: "long", year: "numeric" })}`
    : `${fmt(start, { day: "numeric", month: "long" })} – ${fmt(end, { day: "numeric", month: "long", year: "numeric" })}`;
}

/** "9:30 – 10:30", or nothing if the event keeps no clock. */
export function timeLabel(ev: EventItem): string | null {
  if (!ev.start) return null;
  const trim = (t: string) => t.replace(/^0/, "");
  return ev.end ? `${trim(ev.start)} – ${trim(ev.end)}` : trim(ev.start);
}

/** Short machine-readable value for <time dateTime>. */
export function isoDate(ev: EventItem, now: Date): string {
  return nextDate(ev, now).toISOString().slice(0, 10);
}

export const KIND: Record<EventItem["eventType"], string> = {
  session: "Session",
  workshop: "Workshop",
  retreat: "Retreat",
  trek: "Journey",
};
