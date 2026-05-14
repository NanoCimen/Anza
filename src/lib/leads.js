/**
 * Waitlist, demo, and contact submissions via REST API.
 * In dev, Vite proxies `/api` to the Express server (`npm run dev:full`).
 * In production, set `VITE_API_URL` to your API origin (no trailing slash).
 */

function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  if (base) return `${base}${path.startsWith('/') ? path : `/${path}`}`;
  return path;
}

async function postJson(path, body) {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function saveWaitlistLead({
  audience,
  email,
  keepUpdated = false,
  fullName = '',
  instagram = '',
  tiktok = '',
  facebook = '',
  whatsapp = '',
}) {
  return postJson('/api/waitlist', {
    audience,
    email,
    keepUpdated,
    fullName,
    instagram,
    tiktok,
    facebook,
    whatsapp,
  });
}

export async function saveDemoReservation({ name, email, dayIso, time }) {
  return postJson('/api/demo', { name, email, dayIso, time });
}

export async function saveContactMessage({ name, email, company = '' }) {
  return postJson('/api/contact', { name, email, company });
}
