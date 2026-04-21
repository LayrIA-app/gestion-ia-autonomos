import Anthropic from '@anthropic-ai/sdk'

/* POST /api/ai/insight
   Body: { section: 'inicio' | 'ventas' | 'impuestos' | ..., context: {...} }
   Returns: { text: '…' } con insight proactivo para la barra IA de la sección. */

const SYSTEM_BY_SECTION = {
  inicio: 'Eres la IA de un autónomo consultor (Iker Arrieta). Devuelve 1 frase (máx 18 palabras) proactiva sobre qué está preparando hoy: cobros pendientes, agenda o facturas. En español. Sin saludos ni "hola".',
  ventas: 'Eres la IA de un autónomo consultor. Devuelve 1 frase proactiva sobre cobros vencidos y recordatorios ya enviados. En español. Sin saludos.',
  impuestos: 'Eres la IA fiscal de un autónomo. Devuelve 1 frase sobre modelos que vencen en breve y si ya tienes los borradores preparados. En español. Sin saludos.',
  clientes: 'Eres la IA de CRM. Devuelve 1 frase proactiva sobre oportunidades de upsell detectadas. En español. Sin saludos.',
  proyectos: 'Eres la IA de gestión de proyectos. Devuelve 1 frase sobre riesgos o hitos próximos detectados. En español. Sin saludos.',
  benchmark: 'Eres la IA de benchmark sectorial. Devuelve 1 frase sobre el percentil con mayor oportunidad de mejora. En español. Sin saludos.',
  default: 'Eres la IA de un panel de autónomo. Devuelve 1 frase proactiva sobre algo útil que ya has preparado. En español. Sin saludos.',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return res.status(503).json({
    error: 'ANTHROPIC_API_KEY no configurada. Añádela en Vercel → Settings → Environment Variables para activar IA real.',
    phase: 1,
  })

  const { section = 'default', context = {} } = req.body || {}
  const system = SYSTEM_BY_SECTION[section] || SYSTEM_BY_SECTION.default

  try {
    const client = new Anthropic({ apiKey: key })
    const msg = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 120,
      system,
      messages: [{ role: 'user', content: JSON.stringify(context) }],
    })
    const text = msg.content?.[0]?.text?.trim() || ''
    return res.status(200).json({ text })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Fallo Claude' })
  }
}
