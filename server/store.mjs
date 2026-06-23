/**
 * Lead storage. Uses Supabase (PostgREST) when SUPABASE_URL +
 * SUPABASE_SERVICE_ROLE_KEY are set; otherwise falls back to a local JSON file
 * so `npm run dev:full` works with no external services.
 *
 * Supabase is the durable store for production — the JSON file lives on the
 * server's (often ephemeral) disk and will not survive a redeploy.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim().replace(/\/$/, '');
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

/* ---------------------------------------------------------------- Supabase */

async function supabaseRequest(method, pathAndQuery, { body, prefer } = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${pathAndQuery}`, {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || data?.hint || `Supabase HTTP ${res.status}`;
    throw new Error(message);
  }
  return data;
}

/**
 * Upsert a waitlist row keyed on (email, audience) so repeated signups update
 * the existing row instead of creating duplicates.
 */
async function supabaseUpsertWaitlist(record) {
  const rows = await supabaseRequest(
    'POST',
    '/waitlist?on_conflict=email,audience',
    { body: record, prefer: 'resolution=merge-duplicates,return=representation' },
  );
  return Array.isArray(rows) ? rows[0] : rows;
}

async function supabaseInsert(table, record) {
  const rows = await supabaseRequest('POST', `/${table}`, {
    body: record,
    prefer: 'return=representation',
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

/* -------------------------------------------------------------- JSON file */

const emptyStore = () => ({ waitlist: [], demoReservations: [], contact: [] });

async function readJsonStore() {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      waitlist: Array.isArray(parsed.waitlist) ? parsed.waitlist : [],
      demoReservations: Array.isArray(parsed.demoReservations) ? parsed.demoReservations : [],
      contact: Array.isArray(parsed.contact) ? parsed.contact : [],
    };
  } catch {
    return emptyStore();
  }
}

async function writeJsonStore(store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

/** Dedupe waitlist by (email, audience) in the JSON fallback too. */
async function jsonUpsertWaitlist(record) {
  const store = await readJsonStore();
  const idx = store.waitlist.findIndex(
    r => r.email === record.email && r.audience === record.audience,
  );
  if (idx >= 0) {
    store.waitlist[idx] = { ...store.waitlist[idx], ...record };
  } else {
    store.waitlist.push(record);
  }
  await writeJsonStore(store);
  return record;
}

async function jsonInsert(key, record) {
  const store = await readJsonStore();
  store[key].push(record);
  await writeJsonStore(store);
  return record;
}

/* --------------------------------------------------------------- Public API */

export async function addWaitlistLead(record) {
  if (isSupabaseConfigured()) return supabaseUpsertWaitlist(record);
  return jsonUpsertWaitlist(record);
}

export async function addDemoReservation(record) {
  if (isSupabaseConfigured()) return supabaseInsert('demo_reservations', record);
  return jsonInsert('demoReservations', record);
}

export async function addContactMessage(record) {
  if (isSupabaseConfigured()) return supabaseInsert('contact_messages', record);
  return jsonInsert('contact', record);
}

/** Admin export — reads every table / the whole JSON file. */
export async function readAllLeads() {
  if (isSupabaseConfigured()) {
    const [waitlist, demoReservations, contact] = await Promise.all([
      supabaseRequest('GET', '/waitlist?select=*&order=created_at.desc'),
      supabaseRequest('GET', '/demo_reservations?select=*&order=created_at.desc'),
      supabaseRequest('GET', '/contact_messages?select=*&order=created_at.desc'),
    ]);
    return { waitlist, demoReservations, contact };
  }
  return readJsonStore();
}
