import './index.css'

export default function Modal({ open, onClose, title, subtitle, children, maxWidth = 520 }) {
  if (!open) return null
  return (
    <div className="demo-overlay" onClick={onClose}>
      <div className="demo-modal" style={{maxWidth}} onClick={e => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        {title && <div className="dm-title">{title}</div>}
        {subtitle && <div className="dm-sub">{subtitle}</div>}
        {children}
      </div>
    </div>
  )
}
