/** Shared server helpers: email/handle normalization and a tiny rate limiter. */

export function isValidEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

/**
 * Normalize a social handle to a bare username (no @, no URL, no query string).
 * Accepts "@user", "user", or a full profile URL and returns "user".
 * Returns '' for empty/invalid input.
 */
export function normalizeHandle(raw) {
  let s = String(raw || '').trim();
  if (!s) return '';
  // Strip a profile URL down to its last path segment.
  if (/^https?:\/\//i.test(s) || s.includes('/')) {
    s = s.split(/[?#]/)[0]; // drop query / hash
    const parts = s.split('/').filter(Boolean);
    s = parts[parts.length - 1] || '';
  }
  s = s.replace(/^@+/, '').trim().toLowerCase();
  // Usernames on IG/TikTok: letters, numbers, period, underscore.
  if (!/^[a-z0-9._]{1,30}$/.test(s)) return '';
  return s;
}

/**
 * Fixed-window in-memory rate limiter. Fine for a single Express instance
 * (Railway/Render). Returns true when the request is allowed.
 */
export function createRateLimiter({ windowMs = 60_000, max = 8 } = {}) {
  const hits = new Map(); // key -> { count, resetAt }
  return function allow(key) {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    entry.count += 1;
    if (hits.size > 5000) {
      // opportunistic cleanup so the map can't grow unbounded
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return entry.count <= max;
  };
}
