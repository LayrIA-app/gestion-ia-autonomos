/* Wrappers de fetch() hacia los API routes de Vercel.
   Cada wrapper maneja el 503 de "pieza Fase 2 no configurada" mostrando un toast info. */
import { showToast } from '../components/Toast'

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res
}

async function postJson(url, body) {
  const res = await post(url, body)
  const json = await res.json().catch(() => ({}))
  if (res.status === 503) {
    showToast(json.error || 'Esta acción requiere configuración Fase 2', 'info')
    return { ok: false, phase1: true, error: json.error }
  }
  if (!res.ok) {
    showToast(json.error || 'Error del servidor', 'error')
    return { ok: false, error: json.error }
  }
  return { ok: true, data: json }
}

export async function aiInsight(section, context = {}) {
  return postJson('/api/ai/insight', { section, context })
}

export async function aiDraftEmail(tipo, a, contexto = {}) {
  return postJson('/api/ai/draft-email', { tipo, a, contexto })
}

export async function sendEmail({ to, subject, html, text, attachments }) {
  return postJson('/api/email/send', { to, subject, html, text, attachments })
}

export async function downloadInvoicePdf(factura) {
  const res = await post('/api/pdf/invoice', factura)
  if (res.status === 503) {
    showToast('PDF requiere configuración Fase 2', 'info')
    return { ok: false, phase1: true }
  }
  if (!res.ok) {
    showToast('No se pudo generar el PDF', 'error')
    return { ok: false }
  }
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (factura.numero || 'factura') + '.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  return { ok: true }
}
