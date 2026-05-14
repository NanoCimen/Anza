import cors from 'cors';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

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
const PORT = Number(process.env.API_PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'anza-api' });
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

    const record = {
      id: randomUUID(),
      audience,
      email: String(email).trim(),
      keepUpdated: Boolean(keepUpdated),
      fullName: String(fullName || '').trim(),
      instagram: String(instagram || '').trim(),
      tiktok: String(tiktok || '').trim(),
      facebook: String(facebook || '').trim(),
      whatsapp: String(whatsapp || '').trim(),
      createdAt: new Date().toISOString(),
    };

    const store = await readStore();
    store.waitlist.push(record);
    await writeStore(store);

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

    return res.status(201).json({ ok: true, id: record.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not save contact message' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.listen(PORT, () => {
  console.log(`Anza API listening on http://localhost:${PORT}`);
});
