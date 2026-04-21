import { useEffect, useState } from 'react'

/* Notificaciones push IA · patrón COAXIONIA 6 tipos · solo perfil autónomo.
   Primera a los 3s, visible 3.8s, ciclo 38s. Sin border-left de color (memoria):
   el color semántico vive en el dot de la izquierda. */

const NAVY = '#1C2D44'
const RED = '#C65D4A'
const AMBER = '#D4A574'
const GREEN = '#22A06B'
const ACCENT = '#2E5A8C'

const notifs = [
  { tipo: 1, color: ACCENT, label: 'TU GESTIÓN IA', texto: 'Propuesta Bodegas Iriarte preparada · 28.000 € lista para revisar' },
  { tipo: 2, color: RED, label: 'TU GESTIÓN IA', texto: 'Retraso cobro Digiform detectado · 3er recordatorio enviado automáticamente' },
  { tipo: 3, color: AMBER, label: 'TU GESTIÓN IA', texto: 'Reconfirmada cita mañana 09:00 · Bodegas Iriarte · briefing listo' },
  { tipo: 4, color: GREEN, label: 'TU GESTIÓN IA', texto: 'Post LinkedIn reprogramado · martes 21 a las 08:15 (mejor ventana)' },
  { tipo: 5, color: ACCENT, label: 'TU GESTIÓN IA', texto: 'Mod. 303 1T preparado · 1.683 € listo para revisar y pagar' },
  { tipo: 6, color: RED, label: 'TU GESTIÓN IA', texto: 'Vencimiento IRPF 20 abril · reserva 5.535 € disponible' },
]

const FIRST_DELAY = 3000
const VISIBLE_MS = 3800
const CYCLE_MS = 38000

export default function PushNotifications({ active = true }) {
  const [current, setCurrent] = useState(null)
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    if (!active) return
    let idx = 0
    let hideTimer, nextTimer
    const show = () => {
      setCurrent(notifs[idx % notifs.length])
      setPhase('in')
      hideTimer = setTimeout(() => {
        setPhase('out')
        setTimeout(() => setCurrent(null), 400)
      }, VISIBLE_MS)
      idx += 1
      nextTimer = setTimeout(show, CYCLE_MS)
    }
    const first = setTimeout(show, FIRST_DELAY)
    return () => {
      clearTimeout(first)
      clearTimeout(hideTimer)
      clearTimeout(nextTimer)
    }
  }, [active])

  if (!active || !current) return null

  const animation = phase === 'in' ? 'pushIn .3s ease' : 'pushOut .4s ease forwards'

  return (
    <>
      <style>{`
        @keyframes pushIn { from { opacity:0; transform:translateY(12px);} to { opacity:1; transform:none;} }
        @keyframes pushOut { from { opacity:1; transform:none;} to { opacity:0; transform:translateY(10px);} }
      `}</style>
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          maxWidth: 320,
          background: NAVY,
          color: '#FAF7F2',
          borderRadius: 12,
          padding: '12px 16px 12px 14px',
          boxShadow: '0 8px 32px rgba(14,27,43,0.35)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 11,
          fontFamily: 'var(--sans)',
          animation,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: `${current.color}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={current.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: current.color,
              marginBottom: 3,
            }}
          >
            {current.label}
          </div>
          <div style={{ fontSize: '0.78rem', lineHeight: 1.4, color: 'rgba(250,247,242,0.92)' }}>
            {current.texto}
          </div>
        </div>
      </div>
    </>
  )
}
