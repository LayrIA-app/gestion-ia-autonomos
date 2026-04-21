import './sections.css'

/* Canales IA · vista proactiva.
   La IA atiende VOZ · WhatsApp · Email 24/7, clasifica, responde lo rutinario
   y sube al panel lo que requiere tu revisión. Sin input: la IA actúa sola. */

const accionesRapidas = [
  { label: '📄 Redactar propuesta para un cliente nuevo', to: 'propuestas' },
  { label: '🧾 Generar factura para Metalúrgica Goi',     to: 'facturas' },
  { label: '📊 Resumen de esta semana',                   to: 'inicio' },
  { label: '📧 Responder email de Ana Ruiz',              to: 'comunicacion' },
  { label: '💰 ¿Cuánto voy a pagar de IRPF este trimestre?', to: 'impuestos' },
  { label: '📅 ¿Qué tengo pendiente hoy?',                to: 'inicio' },
]

const contexto = [
  'Tu brief de negocio (92%)',
  '8 clientes activos',
  'Facturas y cobros 2026',
  'Agenda y tareas de hoy',
  'Plan de mailing activo',
  'Posts programados',
]

const canales = [
  {
    id: 'voz',
    color: '#FF6B2B',
    nombre: 'VOZ IA',
    estadoLabel: 'Próximamente',
    estadoDot: '#D4A574',
    descripcion: 'Atiende llamadas con voz natural — transcribe, categoriza y responde lo rutinario. Cuando no estés disponible, filtra y deja solo lo importante.',
    kpis: null,
    acciones: [
      { hora: '—', titulo: 'Gestionará consultas de disponibilidad de agenda',    detalle: 'Reserva huecos · confirma citas · envía ubicación' },
      { hora: '—', titulo: 'Responderá queries de estado de proyecto',              detalle: 'Consulta CRM y entrega estado actualizado en tiempo real' },
      { hora: '—', titulo: 'Filtrará llamadas cuando estés reunido',                detalle: 'Toma mensaje estructurado · escala lo urgente por WhatsApp' },
    ],
    ctaLabel: 'Activar VOZ IA',
    locked: true,
  },
  {
    id: 'whatsapp',
    color: '#25D366',
    nombre: 'WhatsApp',
    estadoLabel: 'Activo',
    estadoDot: '#22A06B',
    descripcion: 'Tu número de negocio. La IA lee, responde lo que puede con tu tono y te escala solo lo que requiere tu criterio.',
    kpis: [
      { v: '14', l: 'conversaciones 24h' },
      { v: '9',  l: 'resueltas por IA' },
      { v: '5',  l: 'requieren revisión' },
    ],
    acciones: [
      { hora: 'Hace 32 min', titulo: 'Mikel (Metalúrgica Goi) — confirmación recepción F-2026-043', detalle: 'IA confirmó la factura y programó recordatorio de cobro en 25 días' },
      { hora: 'Hace 2 h',    titulo: 'Ana Ruiz (Bodegas Iriarte) — reunión mañana',                 detalle: 'IA propuso 3 slots en tu agenda y ella eligió 09:00 presencial DoN' },
      { hora: 'Ayer 18:20',  titulo: 'Txema (Digiform) — estado F-2026-038',                        detalle: 'IA respondió con detalle del retraso y confirmó pago en 5 días laborables' },
    ],
    ctaLabel: 'Ver conversaciones →',
    ctaTo: 'comunicacion',
  },
  {
    id: 'email',
    color: '#378ADD',
    nombre: 'Email',
    estadoLabel: 'Activo',
    estadoDot: '#22A06B',
    descripcion: 'Tu bandeja. La IA clasifica, etiqueta, extrae adjuntos a su sitio (facturas → Facturas recibidas) y prepara borradores cuando hace falta responder.',
    kpis: [
      { v: '47', l: 'emails gestionados' },
      { v: '38', l: 'clasificados por IA' },
      { v: '9',  l: 'borradores listos' },
    ],
    acciones: [
      { hora: 'Hace 18 min', titulo: 'Bodegas Iriarte — factura adjunta detectada',           detalle: 'IA subió la factura de 847 € a Facturas recibidas · pendiente confirmar' },
      { hora: 'Hace 1 h',    titulo: 'Newsletter — 3 borradores preparados',                  detalle: 'Próximo envío martes 21 a las 08:15 · A/B de asuntos listo para revisar' },
      { hora: 'Hace 3 h',    titulo: 'Mikel (Metalúrgica) — confirmación llamada',            detalle: 'IA respondió con resumen de decisiones acordadas y próximos pasos' },
    ],
    ctaLabel: 'Ver bandeja →',
    ctaTo: 'comunicacion',
  },
]

function CanalCard({ canal, onNavigate }) {
  return (
    <div className="dia-card" style={{ padding: 18, opacity: canal.locked ? 0.92 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `${canal.color}15`,
            color: canal.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontWeight: 700,
            fontSize: '0.82rem',
            letterSpacing: '0.04em',
          }}
        >
          {canal.id === 'voz' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canal.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="2" width="6" height="11" rx="3" />
              <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          )}
          {canal.id === 'whatsapp' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canal.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
          {canal.id === 'email' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canal.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: 500, color: '#1C2D44' }}>
              {canal.nombre}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '2px 9px',
                borderRadius: 100,
                background: `${canal.estadoDot}18`,
                color: canal.estadoDot,
                fontSize: '0.66rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: canal.estadoDot }} />
              {canal.estadoLabel}
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(28,45,68,0.6)', lineHeight: 1.5, marginTop: 4 }}>
            {canal.descripcion}
          </div>
        </div>
      </div>

      {canal.kpis && (
        <div style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: '0.5px solid rgba(28,45,68,0.06)', borderBottom: '0.5px solid rgba(28,45,68,0.06)', marginBottom: 12 }}>
          {canal.kpis.map((k, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500, color: canal.color, lineHeight: 1 }}>
                {k.v}
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(28,45,68,0.55)', marginTop: 4, textTransform: 'uppercase' }}>
                {k.l}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,45,68,0.4)', marginBottom: 10 }}>
        {canal.locked ? 'Qué podrá hacer por ti' : 'Últimas acciones IA · 24h'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        {canal.acciones.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: canal.color, marginTop: 8, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 500, color: '#1C2D44', marginBottom: 2 }}>
                {a.titulo}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(28,45,68,0.55)', lineHeight: 1.45 }}>
                {a.detalle}
              </div>
            </div>
            <div style={{ fontSize: '0.66rem', color: 'rgba(28,45,68,0.4)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 2 }}>
              {a.hora}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => canal.ctaTo && onNavigate?.(canal.ctaTo)}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: canal.locked ? `${canal.color}12` : '#1C2D44',
          color: canal.locked ? canal.color : '#FAF7F2',
          border: canal.locked ? `0.5px solid ${canal.color}33` : 'none',
          borderRadius: 10,
          fontFamily: 'var(--sans)',
          fontSize: '0.82rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all .2s',
        }}
      >
        {canal.ctaLabel}
      </button>
    </div>
  )
}

export default function AsistenteSection({ onNavigate }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Canales IA</h1>
          <p className="page-subtitle">
            Voz, WhatsApp y Email — gestionados en tiempo real por tu IA. Atiende, clasifica, responde lo rutinario y te deja arriba solo lo que requiere tu criterio.
          </p>
          <div className="ia-bar">
            <div className="ia-bar-dot"></div>
            <span className="ia-bar-txt">✦ IA activa en tus 3 canales · 61 interacciones gestionadas hoy sin que hicieras nada</span>
          </div>
        </div>
      </div>

      <div className="chat-layout">
        {/* Sidebar: acciones rápidas + contexto que la IA conoce */}
        <div className="chat-sidebar">
          <div className="dia-card" style={{ padding: 14 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(28,45,68,0.45)', marginBottom: 10 }}>
              Acciones rápidas
            </div>
            <div className="chat-actions">
              {accionesRapidas.map((a, i) => (
                <button
                  key={i}
                  className="chat-action"
                  onClick={() => a.to && onNavigate?.(a.to)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div className="dia-card" style={{ padding: 14, marginTop: 12 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(28,45,68,0.45)', marginBottom: 10 }}>
              La IA conoce
            </div>
            <div className="chat-context">
              {contexto.map((c, i) => (
                <div key={i} className="chat-ctx-item">
                  <span className="chat-ctx-dot"></span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main: 3 canales verticales con resumen proactivo 24h */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          {canales.map((c) => (
            <CanalCard key={c.id} canal={c} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  )
}
