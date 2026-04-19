import { useState, useEffect } from 'react'
import './index.css'

const phrases = [
  'Genera tu factura en 10 segundos',
  'Prepara el 303 sin gestoría',
  'Cobra antes con recordatorios automáticos',
  'Gestiona clientes desde el móvil',
]

/* ══════════════════════════════════════════════════
   PORTADA
   ══════════════════════════════════════════════════ */
function RoleScreen({ onSelectRole }) {
  const [counter, setCounter] = useState(0)
  const [twText, setTwText] = useState('')

  useEffect(() => {
    const target = 1847
    let current = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCounter(current)
      if (current >= target) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, deleting = false, timeout
    function tick() {
      const phrase = phrases[phraseIdx]
      if (!deleting) {
        charIdx++
        setTwText(phrase.slice(0, charIdx))
        if (charIdx === phrase.length) { deleting = true; timeout = setTimeout(tick, 1800); return }
      } else {
        charIdx--
        setTwText(phrase.slice(0, charIdx))
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length }
      }
      timeout = setTimeout(tick, deleting ? 40 : 70)
    }
    timeout = setTimeout(tick, 600)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div id="roleScreen">
      <div className="rs-split"></div>
      <div className="rs-fbg"></div>
      <div className="rs-inner">

        <div className="rs-logo-wrap">
          <div className="rs-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 18L10 6L14 14L20 18" stroke="#FAF7F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="6" r="1.5" fill="#BCD4E8"/>
              <circle cx="14" cy="14" r="1.5" fill="#BCD4E8"/>
              <circle cx="20" cy="18" r="1.5" fill="#BCD4E8"/>
            </svg>
          </div>
          <div className="rs-logo-text">Tu gestión <em>IA</em></div>
        </div>

        <div className="rs-tagline">Administración inteligente para cualquier autónomo</div>

        <div style={{display:'flex',gap:'20px',margin:'10px 0 14px',justifyContent:'center',flexWrap:'wrap'}}>
          {['Facturas e impuestos automáticos','Clientes y cobros en un panel','Sin contable ni gestoría','Portal para que tu cliente vea todo'].map(t => (
            <div key={t} style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'0.76rem',color:'rgba(28,45,68,0.65)'}}>
              <span style={{color:'#22A06B',fontWeight:700}}>✓</span> {t}
            </div>
          ))}
        </div>

        <h1 className="rs-subtitle">Selecciona cómo vas a entrar</h1>

        <div className="rs-tw-wrap">
          <span className="rs-tw-text">{twText}</span>
          <span className="rs-tw-cursor">|</span>
        </div>

        <div className="rs-counter-row">
          <div className="rs-counter-dot"></div>
          <div className="rs-counter-txt">
            <span className="rs-counter-num">{counter.toLocaleString('es-ES')}</span> tareas resueltas hoy por la IA
          </div>
        </div>

        <div className="rs-canales">
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#1C2D44'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#1C2D44'}}>VOZ IA</span>
          </div>
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#25D366'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#25D366'}}>WHATSAPP</span>
          </div>
          <div className="rs-canal">
            <div className="rs-canal-ico" style={{background:'#2E5A8C'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <span className="rs-canal-lbl" style={{color:'#2E5A8C'}}>EMAIL</span>
          </div>
        </div>
        <div className="rs-canal-sub">La IA atiende todos tus canales en tiempo real</div>

        <div className="rs-cards">
          <div className="rs-card rs-card-autonomo" onClick={() => onSelectRole('autonomo')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-autonomo">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="#BCD4E8"/>
                  <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="#BCD4E8"/>
                  <circle cx="18" cy="7" r="2.5" fill="#FAF7F2"/>
                  <path d="M16.5 7l1 1 2-2" stroke="#1C2D44" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="rs-cn-dark">Autónomo</div>
              <div className="rs-cd-dark">Facturas, clientes, impuestos y marca — todo en un panel. Para cualquier autónomo.</div>
            </div>
            <div className="rs-cta-1">Entrar →</div>
          </div>

          <div className="rs-card rs-card-cliente" onClick={() => onSelectRole('cliente')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-cliente">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="14" rx="2" stroke="#1C2D44" strokeWidth="1.8" fill="none"/>
                  <path d="M4 9h16" stroke="#1C2D44" strokeWidth="1.5"/>
                  <rect x="7" y="12" width="5" height="2.5" rx="1" fill="#1C2D44"/>
                  <rect x="14" y="12" width="3" height="2.5" rx="1" fill="#1C2D44" opacity="0.5"/>
                  <circle cx="18" cy="16" r="1" fill="#1C2D44"/>
                </svg>
              </div>
              <div className="rs-cn-light">Cliente</div>
              <div className="rs-cd-light">Accede a tus facturas, presupuestos y pagos con tu profesional de confianza.</div>
            </div>
            <div className="rs-cta-2">Entrar →</div>
          </div>
        </div>
      </div>

      <div className="rs-footer">
        <div className="rs-footer-txt">COAXIONIA</div>
        <div className="rs-footer-dot"></div>
        <div className="rs-footer-txt">IA Adaptativa · 4ª Generación</div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   LOGIN
   ══════════════════════════════════════════════════ */
function LoginScreen({ role, onLogin, onBack }) {
  const isAutonomo = role === 'autonomo'

  return (
    <div id="loginScreen">
      <div className="login-wrap">

        {/* Panel izquierdo decorativo */}
        <div className="login-left">
          <div className="ll-split"></div>
          <div className="ll-fbg"></div>
          <div className="ll-inner">
            <div className="ll-logo">
              <div className="ll-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 18L10 6L14 14L20 18" stroke="#1C2D44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="6" r="1.5" fill="#2E5A8C"/>
                  <circle cx="14" cy="14" r="1.5" fill="#2E5A8C"/>
                  <circle cx="20" cy="18" r="1.5" fill="#2E5A8C"/>
                </svg>
              </div>
              <div className="ll-logo-text">Tu gestión <em>IA</em></div>
            </div>

            <div className="ll-role-pill">{isAutonomo ? 'Perfil Autónomo' : 'Portal Cliente'}</div>
            <h1>{isAutonomo ? <>Tu negocio,<br/><em>ordenado.</em></> : <>Tu portal,<br/><em>siempre listo.</em></>}</h1>
            <p>{isAutonomo
              ? 'Factura, agenda, impuestos y clientes — gestionados por una IA que aprende contigo y te devuelve horas cada semana.'
              : 'Consulta facturas, propuestas y pagos con tu profesional de confianza. Todo en un solo lugar.'
            }</p>

            <div className="ll-feats">
              {(isAutonomo
                ? ['Facturación automática con seguimiento de cobros','Simulador fiscal en tiempo real (IRPF · IVA · cuota)','Agenda, videollamadas e informes conversacionales','CRM sencillo con benchmark sectorial']
                : ['Facturas y propuestas siempre disponibles','Aprueba presupuestos con un clic','Pagos seguros desde el portal','Comunicación directa con tu profesional']
              ).map(f => (
                <div key={f} className="ll-feat">
                  <div className="ll-feat-dot">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#BCD4E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="ll-brand">COAXIONIA · IA Adaptativa 4ª Generación</div>
        </div>

        {/* Panel derecho · formulario */}
        <div className="login-right">
          <div className="lr-eyebrow">Acceso seguro</div>
          <div className="lr-title">Acceder · <em>{isAutonomo ? 'Autónomo' : 'Cliente'}</em></div>
          <div className="lr-welcome">Introduce tus datos para entrar al panel. La IA ya tiene listo lo que necesitas revisar hoy.</div>

          <label className="lf-label">Correo electrónico</label>
          <input className="lf-input" type="email" placeholder="nombre@tuemail.com"/>

          <label className="lf-label">Contraseña</label>
          <input className="lf-input" type="password" placeholder="••••••••"/>

          <div className="lf-row">
            <label className="lf-remember">
              <input type="checkbox" defaultChecked/>
              Mantener sesión iniciada
            </label>
            <button className="lf-forgot">¿Olvidaste la contraseña?</button>
          </div>

          <button className="login-btn" onClick={onLogin}>Acceder al panel</button>

          <div className="lr-divider">o continúa con</div>

          <div className="lr-sso">
            <button className="lr-sso-btn">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="lr-sso-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1C2D44"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/></svg>
              Apple
            </button>
          </div>

          <button className="back-link" onClick={onBack}>← Cambiar perfil</button>

          <div className="lr-kpis">
            {isAutonomo ? (
              <>
                <div className="lr-kpi"><div className="lr-kpi-num">12h</div><div className="lr-kpi-lbl">AHORRADAS / MES</div></div>
                <div className="lr-kpi"><div className="lr-kpi-num">94%</div><div className="lr-kpi-lbl">COBROS EN PLAZO</div></div>
                <div className="lr-kpi"><div className="lr-kpi-num">0</div><div className="lr-kpi-lbl">ERRORES FISCALES</div></div>
              </>
            ) : (
              <>
                <div className="lr-kpi"><div className="lr-kpi-num">24h</div><div className="lr-kpi-lbl">DISPONIBLE</div></div>
                <div className="lr-kpi"><div className="lr-kpi-num">100%</div><div className="lr-kpi-lbl">DOCUMENTOS</div></div>
                <div className="lr-kpi"><div className="lr-kpi-num">0</div><div className="lr-kpi-lbl">ESPERAS</div></div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   APP PRINCIPAL
   ══════════════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState('role') // 'role' | 'login-autonomo' | 'login-cliente' | 'app'
  const [role, setRole] = useState(null)

  function handleSelectRole(r) {
    setRole(r)
    setScreen('login')
  }

  if (screen === 'role') return <RoleScreen onSelectRole={handleSelectRole} />
  if (screen === 'login') return <LoginScreen role={role} onLogin={() => setScreen('app')} onBack={() => setScreen('role')} />

  // Placeholder AppShell — próximo paso
  return (
    <div style={{height:'100vh',background:'var(--cream)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--sans)'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontFamily:'var(--serif)',fontSize:'1.8rem',color:'var(--navy)',marginBottom:8}}>Panel cargando…</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>Próximo paso: AppShell completo</p>
      </div>
    </div>
  )
}
