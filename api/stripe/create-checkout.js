import Stripe from 'stripe'

/* POST /api/stripe/create-checkout
   Body: { numero, concepto, total, emailCliente, origin }
   Returns: { url, sessionId } · URL de Stripe Checkout a la que redirigir al cliente.
   Fase 3: solo activo si STRIPE_SECRET_KEY está configurada en Vercel. */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return res.status(503).json({
    error: 'STRIPE_SECRET_KEY no configurada. Añade la clave en Vercel para activar cobros con tarjeta.',
    phase: 2,
  })

  const {
    numero = 'F-TMP',
    concepto = 'Servicios',
    total = 0,
    emailCliente,
    origin,
  } = req.body || {}

  /* Parse importe robustamente: acepta "2.904 €", "2904.00", number puro. */
  const amountEur = typeof total === 'number'
    ? total
    : Number(String(total).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')) || 0

  if (amountEur <= 0) return res.status(400).json({ error: 'Importe no válido' })

  const amountCents = Math.round(amountEur * 100)
  const returnOrigin = origin || 'https://gestion-ia-autonomos.vercel.app'

  try {
    const stripe = new Stripe(key)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: emailCliente,
      client_reference_id: numero,
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Factura ${numero}`,
            description: concepto.slice(0, 500),
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      }],
      metadata: { numero, concepto: concepto.slice(0, 500) },
      success_url: `${returnOrigin}/?payment=success&invoice=${encodeURIComponent(numero)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnOrigin}/?payment=cancelled&invoice=${encodeURIComponent(numero)}`,
    })
    return res.status(200).json({ url: session.url, sessionId: session.id })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Fallo Stripe' })
  }
}
