import { useState, useRef, useEffect } from 'react'
import './sections.css'

const accionesRapidas = [
  '📄 Redactar propuesta para un cliente nuevo',
  '🧾 Generar factura para Metalúrgica Goi',
  '📊 Resumen de esta semana',
  '📧 Responder email de Ana Ruiz',
  '💰 ¿Cuánto voy a pagar de IRPF este trimestre?',
  '📅 ¿Qué tengo pendiente hoy?',
]

const contexto = [
  'Tu brief de negocio (92%)',
  '8 clientes activos',
  'Facturas y cobros 2026',
  'Agenda y tareas de hoy',
  'Plan de mailing activo',
  'Posts programados',
]

const respuestasDemo = {
  'resumen': 'En abril llevas **11.400 €** facturados sobre un objetivo de **18.000 €** — vas al 63%, justo por encima de lo esperado para día 18 del mes.\n\nTe faltan **6.600 €** para el objetivo. Con la propuesta de Bodegas Iriarte (reunión mañana) y el proyecto de Metalúrgica Goi, podrías cerrar el mes en **17.200-19.400 €**. 🎯',
  'irpf': 'Este trimestre (1T 2026) tienes que pagar:\n\n• **Mod. 303** (IVA): 1.683 €\n• **Mod. 130** (IRPF): 218 €\n• **Mod. 111** (Retenciones): 1.425 €\n\n**Total: 3.326 €** · Vence el 20 de abril — en 3 días. ¿Quieres que prepare el pago?',
  'pendiente': 'Hoy tienes:\n\n⚡ **Urgente:** Revisar propuesta Bodegas Iriarte antes de las 09:00h\n⚡ **Reunión:** Bodegas Iriarte · 09:00 · Presencial DoN\n📧 **Pendiente:** Enviar resumen llamada a Txema (Digiform)\n📄 **IA lista:** Recordatorio cobro F-2026-038 (2.178 €)\n\n¿Te preparo alguno de estos?',
  'factura': 'Claro. He preparado la factura F-2026-043 para Metalúrgica Goi:\n\n• Concepto: Retainer mayo 2026\n• Base: 2.400 €\n• IVA 21%: 504 €\n• **Total: 2.904 €**\n\nLa tienes lista en la sección de Facturas. ¿La reviso y envío directamente a mikel@metalurgicagoi.eus?',
  'propuesta': 'Para crear una propuesta necesito saber:\n\n1. **¿Para qué cliente?**\n2. **¿Tipo de servicio?** (consultoría, retainer, proyecto)\n3. **¿Duración y presupuesto aproximado?**\n\nCon eso genero la propuesta completa en tu estilo habitual.',
  'default': 'Entendido. Déjame revisar tu información actualizada y te preparo una respuesta. ¿Hay algún detalle adicional que quieras añadir?',
}

function getResp(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('factura') || lower.includes('metalúrgica') || lower.includes('generar')) return respuestasDemo.factura
  if (lower.includes('irpf') || lower.includes('trimestre') || lower.includes('pagar')) return respuestasDemo.irpf
  if (lower.includes('pendiente') || lower.includes('hoy') || lower.includes('agenda')) return respuestasDemo.pendiente
  if (lower.includes('resumen') || lower.includes('semana') || lower.includes('facturado')) return respuestasDemo.resumen
  if (lower.includes('propuesta') || lower.includes('redactar')) return respuestasDemo.propuesta
  return respuestasDemo.default
}

function ChatMsg({ msg }) {
  return (
    <div className={`chat-msg ${msg.tipo}`}>
      {msg.tipo === 'ia' && (
        <div className="chat-msg-ava ia">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>
        </div>
      )}
      <div className="chat-msg-body">
        <div className="chat-msg-txt" style={{whiteSpace:'pre-line'}}
          dangerouslySetInnerHTML={{__html: msg.texto
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>')
          }}
        />
        <div className="chat-msg-time">{msg.hora}</div>
      </div>
      {msg.tipo === 'user' && <div className="chat-msg-ava user">IK</div>}
    </div>
  )
}

const mensajesIniciales = [
  {tipo:'ia', texto:'Hola Iker 👋 Soy tu asistente IA. Conozco tu negocio, tus clientes y tu gestión. Puedo redactar, calcular, resumir y ejecutar acciones por ti. ¿En qué te ayudo hoy?', hora:'Ahora'},
  {tipo:'user', texto:'¿Cuánto llevo facturado este mes y cuánto me falta para el objetivo?', hora:'10:23'},
  {tipo:'ia', texto:'En abril llevas **11.400 €** facturados sobre un objetivo de **18.000 €** — vas al 63%, justo por encima de lo esperado para día 17 del mes (56%).\n\nTe faltan **6.600 €** para el objetivo. Con la propuesta de Bodegas Iriarte (reunión mañana) y el proyecto de Metalúrgica Goi que arranca el viernes, podrías cerrar el mes en **17.200-19.400 €** si ambas se concretan. 🎯', hora:'10:23'},
]

export default function AsistenteSection() {
  const [mensajes, setMensajes] = useState(mensajesIniciales)
  const [input, setInput] = useState('')
  const [escribiendo, setEscribiendo] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, escribiendo])

  const ahora = () => new Date().toLocaleTimeString('es-ES', {hour:'2-digit',minute:'2-digit'})

  const enviar = (texto) => {
    const msg = texto || input.trim()
    if (!msg) return
    setInput('')

    const userMsg = {tipo:'user', texto: msg.replace(/^[📄🧾📊📧💰📅]\s/,''), hora: ahora()}
    setMensajes(prev => [...prev, userMsg])
    setEscribiendo(true)

    setTimeout(() => {
      setEscribiendo(false)
      setMensajes(prev => [...prev, {tipo:'ia', texto: getResp(msg), hora: ahora()}])
    }, 1200)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Canales IA</h1>
          <p className="page-subtitle">Tu asistente conversacional. Pídele que redacte, facture, analice o resuma.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA lista · conoce tu negocio, clientes, facturas y agenda</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Historial</button>
          <button className="btn-primary" onClick={() => setMensajes(mensajesIniciales)}>+ Nueva conversación</button>
        </div>
      </div>

      <div className="chat-layout">

        {/* Sidebar */}
        <div className="chat-sidebar">
          <div className="dia-card" style={{padding:14}}>
            <div style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginBottom:10}}>Acciones rápidas</div>
            <div className="chat-actions">
              {accionesRapidas.map((a,i) => (
                <button key={i} className="chat-action" onClick={() => enviar(a)}>{a}</button>
              ))}
            </div>
          </div>
          <div className="dia-card" style={{padding:14,marginTop:12}}>
            <div style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginBottom:10}}>La IA conoce</div>
            <div className="chat-context">
              {contexto.map((c,i) => (
                <div key={i} className="chat-ctx-item"><span className="chat-ctx-dot"></span>{c}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Área de chat */}
        <div className="chat-main">
          <div className="chat-messages">
            {mensajes.map((m,i) => <ChatMsg key={i} msg={m} />)}
            {escribiendo && (
              <div className="chat-msg ia">
                <div className="chat-msg-ava ia">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>
                </div>
                <div className="chat-msg-body">
                  <div className="chat-typing"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
          <div className="chat-input-wrap">
            <div className="chat-input-box">
              <input
                className="chat-input"
                type="text"
                placeholder="Pídeme lo que necesites… redactar, calcular, resumir, ejecutar"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && enviar()}
              />
              <button className="chat-send" onClick={() => enviar()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <div className="chat-disclaimer">La IA actúa sobre tu negocio real. Revisa siempre antes de enviar.</div>
          </div>
        </div>

      </div>
    </div>
  )
}
