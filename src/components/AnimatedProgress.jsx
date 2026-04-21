import { useEffect, useRef, useState } from 'react'

export default function AnimatedProgress({
  value,
  color = '#1C2D44',
  accent,
  height = 6,
  delay = 0,
  className = '',
  style = {},
}) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const t = setTimeout(() => setWidth(value), delay + 50)
          obs.disconnect()
          return () => clearTimeout(t)
        }
      })
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, delay])

  const fill = accent ? `linear-gradient(90deg, ${color}, ${accent})` : color

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height,
        background: 'rgba(28,45,68,0.06)',
        borderRadius: height / 2,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: `${Math.min(Math.max(width, 0), 100)}%`,
          height: '100%',
          background: fill,
          borderRadius: height / 2,
          transition: 'width 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  )
}
