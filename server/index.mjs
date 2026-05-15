import cors from 'cors';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import {
  contactAckHtml,
  demoConfirmationHtml,
  isEmailConfigured,
  sendTransactionalEmail,
  waitlistConfirmationHtml,
} from './mail.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

const emptyStore = () => ({
  waitlist: [],
  demoReservations: [],
  contact: [],
});

async function readStore() {
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

async function writeStore(store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function isValidEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const app = express();
/** Railway sets PORT; API_PORT is for local dev next to Vite. */
const PORT = Number(process.env.PORT || process.env.API_PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '64kb' }));

app.get('/', (_req, res) => {
  res.type('text/plain').send('Anza API — GET /api/health for status');
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'anza-api',
    email: isEmailConfigured() ? 'configured' : 'off',
    adminExport: Boolean(process.env.ADMIN_TOKEN?.trim()),
  });
});

/** Bearer ADMIN_TOKEN — read all leads from disk (for owners only). */
app.get('/api/admin/registrations', async (req, res) => {
  const expected = process.env.ADMIN_TOKEN?.trim();
  if (!expected) {
    return res.status(503).json({
      message: 'Set ADMIN_TOKEN on the server to enable this endpoint.',
    });
  }
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (token !== expected) {
    return res.status(401).json({
      message: 'Unauthorized. Send header: Authorization: Bearer <ADMIN_TOKEN>',
    });
  }
  try {
    const store = await readStore();
    return res.json(store);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not read store' });
  }
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const {
      audience,
      email,
      keepUpdated = false,
      fullName = '',
      instagram = '',
      tiktok = '',
      facebook = '',
      whatsapp = '',
    } = req.body || {};

    if (audience !== 'creadores' && audience !== 'marcas') {
      return res.status(400).json({ message: 'audience must be creadores or marcas' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'valid email is required' });
    }
    const ig = String(instagram || '').trim();
    const tt = String(tiktok || '').trim();
    if (!ig && !tt) {
      return res.status(400).json({ message: 'instagram or tiktok is required' });
    }

    const record = {
      id: randomUUID(),
      audience,
      email: String(email).trim(),
      keepUpdated: Boolean(keepUpdated),
      fullName: String(fullName || '').trim(),
      instagram: ig,
      tiktok: tt,
      facebook: String(facebook || '').trim(),
      whatsapp: String(whatsapp || '').trim(),
      createdAt: new Date().toISOString(),
    };

    const store = await readStore();
    store.waitlist.push(record);
    await writeStore(store);

    sendTransactionalEmail({
      to: record.email,
      subject: 'Lista de espera — Anza',
      html: waitlistConfirmationHtml({
        fullName: record.fullName,
        email: record.email,
        audience: record.audience,
      }),
      text: `Gracias por unirte a la lista de espera de Anza (${record.audience}).`,
    }).catch(err => console.error('[email] waitlist', err));

    return res.status(201).json({ ok: true, id: record.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not save waitlist entry' });
  }
});

app.post('/api/demo', async (req, res) => {
  try {
    const { name, email, dayIso, time } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: 'name is required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'valid email is required' });
    }
    if (!dayIso || !time) {
      return res.status(400).json({ message: 'dayIso and time are required' });
    }

    const record = {
      id: randomUUID(),
      name: String(name).trim(),
      email: String(email).trim(),
      dayIso: String(dayIso),
      time: String(time),
      createdAt: new Date().toISOString(),
    };

    const store = await readStore();
    store.demoReservations.push(record);
    await writeStore(store);

    sendTransactionalEmail({
      to: record.email,
      subject: 'Demo reservada — Anza',
      html: demoConfirmationHtml({
        name: record.name,
        email: record.email,
        dayIso: record.dayIso,
        time: record.time,
      }),
      text: `Hola ${record.name}, confirmamos tu demo Anza el ${record.dayIso} a las ${record.time}.`,
    }).catch(err => console.error('[email] demo', err));

    return res.status(201).json({ ok: true, id: record.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not save demo reservation' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company = '' } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: 'name is required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'valid email is required' });
    }

    const record = {
      id: randomUUID(),
      name: String(name).trim(),
      email: String(email).trim(),
      company: String(company || '').trim(),
      createdAt: new Date().toISOString(),
    };

    const store = await readStore();
    store.contact.push(record);
    await writeStore(store);

    sendTransactionalEmail({
      to: record.email,
      subject: 'Recibimos tu mensaje — Anza',
      html: contactAckHtml({ name: record.name }),
      text: `Hola ${record.name}, recibimos tu mensaje en Anza.`,
    }).catch(err => console.error('[email] contact', err));

    return res.status(201).json({ ok: true, id: record.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not save contact message' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Anza API listening on port ${PORT}`);
});
