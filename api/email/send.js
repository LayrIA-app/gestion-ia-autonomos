import { Resend } from 'resend'

/* POST /api/email/send
   Body: { to, subject, html, attachments? }
   Returns: { id, accepted } · email enviado via Resend desde RESEND_FROM_EMAIL. */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || 'noreply@arrietaconsultores.com'

  if (!key) return res.status(503).json({
    error: 'RESEND_API_KEY no configurada. Añádela en Vercel para enviar emails reales.',
    phase: 1,
  })

  const { to, subject, html, text, attachments } = req.body || {}
  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({ error: 'Faltan campos: to, subject, html/text' })
  }

  try {
    const resend = new Resend(key)
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || `<pre>${text}</pre>`,
      attachments,
    })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ id: data?.id, accepted: Array.isArray(to) ? to : [to] })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Fallo Resend' })
  }
}
