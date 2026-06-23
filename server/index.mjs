import cors from 'cors';
import express from 'express';
import { randomUUID } from 'node:crypto';
import {
  contactAckHtml,
  demoConfirmationHtml,
  isEmailConfigured,
  sendTransactionalEmail,
  waitlistConfirmationHtml,
  teamSignupNotificationHtml,
} from './mail.mjs';
import {
  addContactMessage,
  addDemoReservation,
  addWaitlistLead,
  isSupabaseConfigured,
  readAllLeads,
} from './store.mjs';
import { createRateLimiter, isValidEmail, normalizeHandle } from './util.mjs';

const app = express();
/** Railway sets PORT; API_PORT is for local dev next to Vite. */
const PORT = Number(process.env.PORT || process.env.API_PORT) || 3001;
/** Address notified when a new lead comes in (optional). */
const TEAM_NOTIFY_TO = (process.env.TEAM_NOTIFY_TO || '').trim();

app.set('trust proxy', 1); // so req.ip reflects the real client behind a proxy
app.use(cors({ origin: true }));
app.use(express.json({ limit: '64kb' }));

const allowSubmit = createRateLimiter({ windowMs: 60_000, max: 8 });

/** Rate-limit + honeypot guard for the public write endpoints. */
function guardSubmission(req, res) {
  // Honeypot: a hidden field real users never fill. Pretend success for bots.
  if (req.body && String(req.body.company_website || '').trim()) {
    res.status(201).json({ ok: true });
    return false;
  }
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  if (!allowSubmit(key)) {
    res.status(429).json({ message: 'Too many requests. Please try again shortly.' });
    return false;
  }
  return true;
}

app.get('/', (_req, res) => {
  res.type('text/plain').send('Anza API — GET /api/health for status');
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'anza-api',
    storage: isSupabaseConfigured() ? 'supabase' : 'json-file',
    email: isEmailConfigured() ? 'configured' : 'off',
    teamNotify: Boolean(TEAM_NOTIFY_TO),
    adminExport: Boolean(process.env.ADMIN_TOKEN?.trim()),
  });
});

/** Bearer ADMIN_TOKEN — read all leads (for owners only). */
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
    return res.json(await readAllLeads());
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not read store' });
  }
});

app.post('/api/waitlist', async (req, res) => {
  if (!guardSubmission(req, res)) return;
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
    const ig = normalizeHandle(instagram);
    const tt = normalizeHandle(tiktok);
    if (!ig && !tt) {
      return res.status(400).json({ message: 'instagram or tiktok is required' });
    }

    const record = {
      id: randomUUID(),
      audience,
      email: String(email).trim().toLowerCase(),
      keep_updated: Boolean(keepUpdated),
      full_name: String(fullName || '').trim(),
      instagram: ig,
      tiktok: tt,
      facebook: String(facebook || '').trim(),
      whatsapp: String(whatsapp || '').trim(),
      created_at: new Date().toISOString(),
    };

    const saved = await addWaitlistLead(record);

    sendTransactionalEmail({
      to: record.email,
      subject: 'Lista de espera — Anza',
      html: waitlistConfirmationHtml({
        fullName: record.full_name,
        email: record.email,
        audience: record.audience,
      }),
      text: `Gracias por unirte a la lista de espera de Anza (${record.audience}).`,
    }).catch(err => console.error('[email] waitlist', err));

    if (TEAM_NOTIFY_TO) {
      sendTransactionalEmail({
        to: TEAM_NOTIFY_TO,
        subject: `Nuevo registro (${record.audience}) — Anza`,
        html: teamSignupNotificationHtml(record),
        text: `Nuevo registro: ${record.email} (${record.audience})`,
      }).catch(err => console.error('[email] team-notify', err));
    }

    return res.status(201).json({ ok: true, id: saved?.id || record.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not save waitlist entry' });
  }
});

app.post('/api/demo', async (req, res) => {
  if (!guardSubmission(req, res)) return;
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
      email: String(email).trim().toLowerCase(),
      day_iso: String(dayIso),
      time: String(time),
      created_at: new Date().toISOString(),
    };

    const saved = await addDemoReservation(record);

    sendTransactionalEmail({
      to: record.email,
      subject: 'Demo reservada — Anza',
      html: demoConfirmationHtml({
        name: record.name,
        email: record.email,
        dayIso: record.day_iso,
        time: record.time,
      }),
      text: `Hola ${record.name}, confirmamos tu demo Anza el ${record.day_iso} a las ${record.time}.`,
    }).catch(err => console.error('[email] demo', err));

    return res.status(201).json({ ok: true, id: saved?.id || record.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'could not save demo reservation' });
  }
});

app.post('/api/contact', async (req, res) => {
  if (!guardSubmission(req, res)) return;
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
      email: String(email).trim().toLowerCase(),
      company: String(company || '').trim(),
      created_at: new Date().toISOString(),
    };

    const saved = await addContactMessage(record);

    sendTransactionalEmail({
      to: record.email,
      subject: 'Recibimos tu mensaje — Anza',
      html: contactAckHtml({ name: record.name }),
      text: `Hola ${record.name}, recibimos tu mensaje en Anza.`,
    }).catch(err => console.error('[email] contact', err));

    return res.status(201).json({ ok: true, id: saved?.id || record.id });
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
