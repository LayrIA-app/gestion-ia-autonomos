import { useEffect, useState } from 'react'

/* Toast global reutilizable · dispatch via CustomEvent desde cualquier sección.
   Uso: import { showToast } from './components/Toast'; showToast('Factura enviada', 'ok') */

const EVENT = 'coaxionia-toast'

export function showToast(msg, type = 'info') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT, {
    detail: { msg, type, id: Date.now() + Math.random() },
  }))
}

const colorOf = (t) => ({
  ok: '#22A06B',
  info: '#2E5A8C',
  warn: '#D4A574',
  error: '#C65D4A',
}[t] || '#2E5A8C')

export function Toaster() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    function onToast(e) {
      const { msg, type, id } = e.detail
      setToasts((prev) => [...prev, { msg, type, id }])
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
    }
    window.addEventListener(EVENT, onToast)
    return () => window.removeEventListener(EVENT, onToast)
  }, [])

  if (toasts.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes toastIn { from { opacity:0; transform:translate(-50%, 12px);} to { opacity:1; transform:translate(-50%, 0);} }
      `}</style>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 32,
          transform: 'translateX(-50%)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: '#1C2D44',
              color: '#FAF7F2',
              borderRadius: 10,
              padding: '10px 16px 10px 14px',
              boxShadow: '0 8px 24px rgba(14,27,43,0.35)',
              fontFamily: 'var(--sans)',
              fontSize: '0.82rem',
              maxWidth: 360,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              animation: 'toastIn .25s ease',
              pointerEvents: 'auto',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: colorOf(t.type), flexShrink: 0 }} />
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </>
  )
}
