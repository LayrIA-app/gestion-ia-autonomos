import { useEffect, useState } from 'react'

export default function Countdown({ target, className = '', style = {}, compact = false }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const targetMs = target instanceof Date ? target.getTime() : new Date(target).getTime()
  const diff = targetMs - now

  const baseStyle = {
    fontVariantNumeric: 'tabular-nums',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    fontWeight: 600,
    letterSpacing: '0.02em',
    ...style,
  }

  if (diff <= 0) {
    return (
      <span className={className} style={{ ...baseStyle, color: '#C65D4A' }}>
        VENCIDO
      </span>
    )
  }

  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const pad = (n) => String(n).padStart(2, '0')

  if (compact) {
    return (
      <span className={className} style={baseStyle}>
        {d > 0 ? `${d}d ` : ''}{pad(h)}:{pad(m)}:{pad(s)}
      </span>
    )
  }

  return (
    <span className={className} style={baseStyle}>
      {d > 0 ? `${d}d ` : ''}{pad(h)}h {pad(m)}m {pad(s)}s
    </span>
  )
}
