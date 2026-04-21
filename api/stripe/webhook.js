import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

/* POST /api/stripe/webhook
   Recibe eventos de Stripe. Verifica la firma con STRIPE_WEBHOOK_SECRET.
   Al recibir checkout.session.completed, marca la factura como cobrada en Supabase
   usando SUPABASE_SERVICE_ROLE_KEY (bypass RLS · runs server-side sin usuario auth).

   Config: bodyParser:false · Stripe exige el raw body para verificar la firma. */

export const config = {
  api: { bodyParser: false },
}

async function getRawBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const secret = process.env.STRIPE_SECRET_KEY
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !whSecret) return res.status(503).json({
    error: 'STRIPE_SECRET_KEY o STRIPE_WEBHOOK_SECRET no configuradas.',
    phase: 2,
  })

  const signature = req.headers['stripe-signature']
  if (!signature) return res.status(400).json({ error: 'Falta Stripe-Signature header' })

  let event
  try {
    const rawBody = await getRawBody(req)
    const stripe = new Stripe(secret)
    event = stripe.webhooks.constructEvent(rawBody, signature, whSecret)
  } catch (err) {
    return res.status(400).json({ error: `Firma inválida: ${err.message}` })
  }

  /* Solo procesamos el evento de pago completado. Otros eventos se ignoran (200 OK). */
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const numero = session.metadata?.numero || session.client_reference_id
    await updateFacturaCobrada(numero, session.id, session.amount_total)
  }

  return res.status(200).json({ received: true, type: event.type })
}

async function updateFacturaCobrada(numero, sessionId, amountCents) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey || !numero) return

  try {
    const sb = createClient(url, serviceKey, { auth: { persistSession: false } })
    await sb.from('facturas_emitidas')
      .update({ estado: 'cobrada', cobrada_at: new Date().toISOString() })
      .eq('numero', numero)

    /* Audit trail: añadir movimiento a tesorería del autónomo dueño de la factura. */
    const { data: factura } = await sb.from('facturas_emitidas')
      .select('owner_id, total, cliente_id').eq('numero', numero).maybeSingle()
    if (factura) {
      await sb.from('tesoreria_movimientos').insert({
        owner_id: factura.owner_id,
        categoria: 'Cobro cliente (Stripe)',
        concepto: `${numero} · ${sessionId}`,
        entrada: amountCents ? amountCents / 100 : factura.total,
      })
    }
  } catch (err) {
    console.error('Webhook update failed:', err.message)
  }
}
