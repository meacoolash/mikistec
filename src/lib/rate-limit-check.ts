import { rateLimit } from "./rate-limit"

/** Mirrors qviks/src/lib/rate-limit-check.ts — keep the two in step. */

interface RateLimitOptions {
  /** Max requests per window (default: 20) */
  limit?: number
  /** Window duration in ms (default: 60 000) */
  window?: number
  /** Optional prefix for the rate-limit key (e.g. "contact") */
  prefix?: string
}

/**
 * Extract client IP from request headers.
 * Works on Vercel (x-forwarded-for) and behind reverse proxies.
 * Returns null when IP cannot be determined so the caller can skip rate-limiting
 * rather than lumping all unidentifiable traffic under a single "unknown" bucket
 * (which would let one attacker DoS every legit anon user).
 */
function getIP(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0].trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp
  return null
}

// Warn once per process if proxy headers are missing — signals misconfigured infra.
let warnedMissingIP = false

/**
 * Check rate limit for an incoming request.
 *
 * @returns A 429 Response if rate-limited, or `null` if the request is allowed.
 */
export function checkRateLimit(request: Request, opts?: RateLimitOptions): Response | null {
  // Bypass for local runs. NEVER set this in production.
  if (process.env.DISABLE_RATE_LIMIT === "1") return null

  const limit = opts?.limit ?? 20
  const windowMs = opts?.window ?? 60_000
  const prefix = opts?.prefix ?? "api"

  const ip = getIP(request)
  if (!ip) {
    // No identifiable client — skip rate-limiting rather than share one bucket.
    if (!warnedMissingIP) {
      warnedMissingIP = true
      console.error(
        "[rate-limit] no x-forwarded-for / x-real-ip header on request — skipping rate limit. " +
          "Check proxy / Vercel config; all anonymous traffic is currently unmetered."
      )
    }
    return null
  }

  const result = rateLimit(`${prefix}:${ip}`, limit, windowMs)

  if (!result.success) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000)
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    )
  }

  return null
}
