import Anthropic from '@anthropic-ai/sdk'

/* POST /api/ai/draft-email
   Body: { tipo: 'recordatorio_cobro'|'respuesta_cliente'|'propuesta'|'resumen_llamada', a, contexto }
   Returns: { asunto, cuerpo } · email redactado por IA listo para revisar. */

const PROMPTS = {
  recordatorio_cobro: 'Redacta un email amable pero firme de recordatorio de pago de factura vencida. Tono cercano, directo, español. Sin excusas. Ofrece resolver dudas si hay algún problema.',
  respuesta_cliente: 'Redacta una respuesta al cliente. Tono cercano y profesional. Español. Directo, sin relleno.',
  propuesta: 'Redacta un email que acompaña el envío de una propuesta comercial. Breve (5 líneas), profesional, con llamada a la acción clara para revisar el PDF adjunto.',
  resumen_llamada: 'Redacta un email con resumen de una llamada comercial: 3-4 bullets de lo acordado y próximos pasos concretos.',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return res.status(503).json({
    error: 'ANTHROPIC_API_KEY no configurada.',
    phase: 1,
  })

  const { tipo = 'respuesta_cliente', a = 'cliente', contexto = {} } = req.body || {}
  const system = PROMPTS[tipo] || PROMPTS.respuesta_cliente

  try {
    const client = new Anthropic({ apiKey: key })
    const msg = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 500,
      system: system + '\n\nDevuelve JSON estricto: { "asunto": "…", "cuerpo": "…" }',
      messages: [{
        role: 'user',
        content: `Para: ${a}\nContexto: ${JSON.stringify(contexto)}\n\nResponde solo con el JSON.`
      }],
    })
    const raw = msg.content?.[0]?.text?.trim() || '{}'
    const clean = raw.replace(/^```json\s*|\s*```$/g, '')
    try {
      const parsed = JSON.parse(clean)
      return res.status(200).json(parsed)
    } catch {
      return res.status(200).json({ asunto: '(revisar asunto)', cuerpo: clean })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Fallo Claude' })
  }
}
