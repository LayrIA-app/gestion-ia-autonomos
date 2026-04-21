import { useEffect, useRef, useState } from 'react'

/* Campana de alertas IA · topbar autónomo · patrón StratIA.
   Datos verbatim de la demo HTML. Al pulsar: mark-read + navegar + cerrar. */

const initialAlerts = [
  { id: 'a1', seccion: 'impuestos',           unread: true,  titulo: '⚡ Impuestos · vencen en 3 días',            meta: 'Mod. 303 + 130 + 111 · Total 3.326 € · Vence 20 de abril', time: 'Hace 1 hora' },
  { id: 'a2', seccion: 'facturas',            unread: true,  titulo: 'Factura F-2026-043 · lista para enviar',       meta: 'Metalúrgica Goi · 2.904 € · IA la tiene preparada',        time: 'Hace 20 min' },
  { id: 'a3', seccion: 'ventas',              unread: true,  titulo: 'Cobro vencido · Digiform SL',                  meta: 'F-2026-038 · 12 días de retraso · 2.178 € · 3er recordatorio', time: 'Hace 2 horas' },
  { id: 'a4', seccion: 'propuestas',          unread: true,  titulo: 'Propuesta Bodegas Iriarte · revisar hoy',      meta: 'Reunión mañana 09:00h · 28.000 € · IA tiene el borrador listo', time: 'Hace 34 min' },
  { id: 'a5', seccion: 'agenda',              unread: false, titulo: 'Reunión hoy · Bodegas Iriarte 09:00h',         meta: 'Presencial DoN · IA preparó el briefing completo',         time: 'Hoy' },
  { id: 'a6', seccion: 'facturas-recibidas',  unread: false, titulo: 'Nueva factura recibida · Bodegas Iriarte',     meta: 'Subida por portal cliente · 847 € · pendiente confirmar',  time: 'Ayer' },
  { id: 'a7', seccion: 'redes',               unread: false, titulo: 'Post LinkedIn aprobado por IA',                meta: 'Listo para publicar el martes · 847 impresiones estimadas', time: 'Ayer' },
]

export default function BellAlerts({ onNavigate }) {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  const unreadCount = alerts.filter((a) => a.unread).length

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!panelRef.current) return
      if (panelRef.current.contains(e.target)) return
      if (btnRef.current && btnRef.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function markRead(id) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, unread: false } : a)))
  }

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })))
  }

  function handleClick(a) {
    markRead(a.id)
    setOpen(false)
    if (onNavigate) onNavigate(a.seccion)
  }

  return (
    <>
      <button
        ref={btnRef}
        className="tb-action"
        title="Notificaciones"
        onClick={() => setOpen((v) => !v)}
        style={{ position: 'relative', padding: 0 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && <span className="tb-badge">{unreadCount}</span>}
      </button>

      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: 68,
            right: 16,
            width: 340,
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: 480,
            overflowY: 'auto',
            background: '#FFFFFF',
            border: '0.5px solid rgba(28,45,68,0.12)',
            borderRadius: 14,
            boxShadow: '0 8px 32px rgba(28,45,68,0.15)',
            zIndex: 7000,
            animation: 'bellSlide .2s ease',
          }}
        >
          <style>{`@keyframes bellSlide { from { opacity:0; transform:translateY(-6px);} to { opacity:1; transform:none;} }`}</style>
          <div
            style={{
              padding: '16px 18px 12px',
              borderBottom: '0.5px solid rgba(28,45,68,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: '#FFFFFF',
              zIndex: 2,
            }}
          >
            <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 500, color: '#1C2D44' }}>
              Notificaciones
            </span>
            <button
              onClick={markAllRead}
              style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                color: '#2E5A8C',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
              }}
            >
              Marcar todas leídas
            </button>
          </div>

          <div>
            {alerts.map((a) => (
              <div
                key={a.id}
                onClick={() => handleClick(a)}
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: '12px 18px',
                  borderBottom: '0.5px solid rgba(28,45,68,0.05)',
                  cursor: 'pointer',
                  background: a.unread ? 'rgba(188,212,232,0.08)' : 'transparent',
                  opacity: a.unread ? 1 : 0.6,
                  transition: 'background .15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(28,45,68,0.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = a.unread ? 'rgba(188,212,232,0.08)' : 'transparent')}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: a.unread ? '#C65D4A' : 'rgba(28,45,68,0.15)',
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1C2D44', marginBottom: 2 }}>
                    {a.titulo}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(28,45,68,0.6)', lineHeight: 1.4, marginBottom: 3 }}>
                    {a.meta}
                  </div>
                  <div style={{ fontSize: '0.66rem', color: 'rgba(28,45,68,0.4)' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
