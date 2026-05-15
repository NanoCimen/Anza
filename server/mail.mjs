/**
 * Transactional email via Resend (https://resend.com/docs/api-reference/emails/send-email).
 * Set RESEND_API_KEY + RESEND_FROM on Railway. FROM must be a verified sender/domain in Resend.
 */

function fromAddress() {
  return (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim() && fromAddress());
}

/**
 * @param {{ to: string; subject: string; html: string; text?: string }} opts
 * @returns {Promise<{ id?: string; skipped?: boolean }>}
 */
export async function sendTransactionalEmail({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = fromAddress();
  if (!apiKey || !from) {
    console.warn('[email] Missing RESEND_API_KEY or RESEND_FROM — skip send');
    return { skipped: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(text ? { text } : {}),
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('[email] Resend error', res.status, body);
    throw new Error(body.message || `Resend HTTP ${res.status}`);
  }
  return body;
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function waitlistConfirmationHtml({ fullName, email, audience }) {
  const name = fullName?.trim() || 'Hola';
  const label = audience === 'creadores' ? 'creadores' : 'marcas';
  return `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:520px;">
  <p>${esc(name)},</p>
  <p>Gracias por unirte a la lista de espera de <strong>Anza</strong> (${esc(label)}). Te avisaremos cuando haya novedades.</p>
  <p style="color:#555;font-size:14px;">Si no solicitaste esto, puedes ignorar este correo.</p>
</body></html>`;
}

export function demoConfirmationHtml({ name, email, dayIso, time }) {
  let when = `${esc(dayIso)} — ${esc(time)}`;
  try {
    const d = new Date(dayIso);
    if (!Number.isNaN(d.getTime())) {
      const datePart = d.toLocaleDateString('es', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      });
      when = `${esc(datePart)} — ${esc(time)}`;
    }
  } catch {
    /* keep fallback */
  }
  return `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:520px;">
  <p>${esc(name)},</p>
  <p>Confirmamos tu <strong>cita con Anza</strong>.</p>
  <p><strong>Fecha y hora:</strong> ${when}</p>
  <p>Te escribiremos a <strong>${esc(email)}</strong> si necesitamos algún ajuste.</p>
  <p style="color:#555;font-size:14px;">Si no reservaste una demo, ignora este mensaje.</p>
</body></html>`;
}

export function contactAckHtml({ name }) {
  return `
<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:520px;">
  <p>${esc(name)},</p>
  <p>Recibimos tu mensaje en <strong>Anza</strong>. Te responderemos pronto.</p>
</body></html>`;
}
