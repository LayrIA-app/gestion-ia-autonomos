import { useState, useEffect } from 'react'
import './index.css'
import InicioSection from './InicioSection'
import AgendaSection from './AgendaSection'
import ComunicacionSection from './ComunicacionSection'
import ClientesSection from './ClientesSection'
import PropuestasSection from './PropuestasSection'
import VentasSection from './VentasSection'
import ProyectosSection from './ProyectosSection'
import FacturasSection from './FacturasSection'
import FacturasRecibidasSection from './FacturasRecibidasSection'
import GastosSection from './GastosSection'
import TesoreriaSection from './TesoreriaSection'
import ImpuestosSection from './ImpuestosSection'
import BrandingSection from './BrandingSection'
import RedesSection from './RedesSection'
import MailingSection from './MailingSection'

const phrases = [
  'Genera tu factura en 10 segundos',
  'Prepara el 303 sin gestoría',
  'Cobra antes con recordatorios automáticos',
  'Gestiona clientes desde el móvil',
]

/* ══ PORTADA ══ */
function RoleScreen({ onSelectRole }) {
  const [counter, setCounter] = useState(0)
  const [twText, setTwText] = useState('')
  useEffect(() => {
    const target = 1847; let current = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => { current = Math.min(current + step, target); setCounter(current); if (current >= target) clearInterval(timer) }, 30)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, deleting = false, timeout
    function tick() {
      const phrase = phrases[phraseIdx]
      if (!deleting) { charIdx++; setTwText(phrase.slice(0, charIdx)); if (charIdx === phrase.length) { deleting = true; timeout = setTimeout(tick, 1800); return } }
      else { charIdx--; setTwText(phrase.slice(0, charIdx)); if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length } }
      timeout = setTimeout(tick, deleting ? 40 : 70)
    }
    timeout = setTimeout(tick, 600)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <div id="roleScreen">
      <div className="rs-split"></div><div className="rs-fbg"></div>
      <div className="rs-inner">
        <div className="rs-logo-wrap">
          <div className="rs-logo-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 18L10 6L14 14L20 18" stroke="#FAF7F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="6" r="1.5" fill="#BCD4E8"/><circle cx="14" cy="14" r="1.5" fill="#BCD4E8"/><circle cx="20" cy="18" r="1.5" fill="#BCD4E8"/></svg></div>
          <div className="rs-logo-text">Tu gestión <em>IA</em></div>
        </div>
        <div className="rs-tagline">Administración inteligente para cualquier autónomo</div>
        <div style={{display:'flex',gap:'20px',margin:'10px 0 14px',justifyContent:'center',flexWrap:'wrap'}}>
          {['Facturas e impuestos automáticos','Clientes y cobros en un panel','Sin contable ni gestoría','Portal para que tu cliente vea todo'].map(t => (
            <div key={t} style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'0.76rem',color:'rgba(28,45,68,0.65)'}}><span style={{color:'#22A06B',fontWeight:700}}>✓</span> {t}</div>
          ))}
        </div>
        <h1 className="rs-subtitle">Selecciona cómo vas a entrar</h1>
        <div className="rs-tw-wrap"><span className="rs-tw-text">{twText}</span><span className="rs-tw-cursor">|</span></div>
        <div className="rs-counter-row"><div className="rs-counter-dot"></div><div className="rs-counter-txt"><span className="rs-counter-num">{counter.toLocaleString('es-ES')}</span> tareas resueltas hoy por la IA</div></div>
        <div className="rs-canales">
          <div className="rs-canal"><div className="rs-canal-ico" style={{background:'#1C2D44'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg></div><span className="rs-canal-lbl" style={{color:'#1C2D44'}}>VOZ IA</span></div>
          <div className="rs-canal"><div className="rs-canal-ico" style={{background:'#25D366'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><span className="rs-canal-lbl" style={{color:'#25D366'}}>WHATSAPP</span></div>
          <div className="rs-canal"><div className="rs-canal-ico" style={{background:'#2E5A8C'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><span className="rs-canal-lbl" style={{color:'#2E5A8C'}}>EMAIL</span></div>
        </div>
        <div className="rs-canal-sub">La IA atiende todos tus canales en tiempo real</div>
        <div className="rs-cards">
          <div className="rs-card rs-card-autonomo" onClick={() => onSelectRole('autonomo')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-autonomo"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#BCD4E8"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="#BCD4E8"/><circle cx="18" cy="7" r="2.5" fill="#FAF7F2"/><path d="M16.5 7l1 1 2-2" stroke="#1C2D44" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></div>
              <div className="rs-cn-dark">Autónomo</div>
              <div className="rs-cd-dark">Facturas, clientes, impuestos y marca — todo en un panel. Para cualquier autónomo.</div>
            </div>
            <div className="rs-cta-1">Entrar →</div>
          </div>
          <div className="rs-card rs-card-cliente" onClick={() => onSelectRole('cliente')}>
            <div className="rs-card-body">
              <div className="rs-card-ico rs-ico-cliente"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="#1C2D44" strokeWidth="1.8" fill="none"/><path d="M4 9h16" stroke="#1C2D44" strokeWidth="1.5"/><rect x="7" y="12" width="5" height="2.5" rx="1" fill="#1C2D44"/><rect x="14" y="12" width="3" height="2.5" rx="1" fill="#1C2D44" opacity="0.5"/><circle cx="18" cy="16" r="1" fill="#1C2D44"/></svg></div>
              <div className="rs-cn-light">Cliente</div>
              <div className="rs-cd-light">Accede a tus facturas, presupuestos y pagos con tu profesional de confianza.</div>
            </div>
            <div className="rs-cta-2">Entrar →</div>
          </div>
        </div>
      </div>
      <div className="rs-footer"><div className="rs-footer-txt">COAXIONIA</div><div className="rs-footer-dot"></div><div className="rs-footer-txt">IA Adaptativa · 4ª Generación</div></div>
    </div>
  )
}

/* ══ LOGIN ══ */
function LoginScreen({ role, onLogin, onBack }) {
  const isAutonomo = role === 'autonomo'
  return (
    <div id="loginScreen">
      <div className="login-wrap">
        <div className="login-left">
          <div className="ll-split"></div><div className="ll-fbg"></div>
          <div className="ll-inner">
            <div className="ll-logo"><div className="ll-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 18L10 6L14 14L20 18" stroke="#1C2D44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="6" r="1.5" fill="#2E5A8C"/><circle cx="14" cy="14" r="1.5" fill="#2E5A8C"/><circle cx="20" cy="18" r="1.5" fill="#2E5A8C"/></svg></div><div className="ll-logo-text">Tu gestión <em>IA</em></div></div>
            <div className="ll-role-pill">{isAutonomo ? 'Perfil Autónomo' : 'Portal Cliente'}</div>
            <h1>{isAutonomo ? <>Tu negocio,<br/><em>ordenado.</em></> : <>Tu portal,<br/><em>siempre listo.</em></>}</h1>
            <p>{isAutonomo ? 'Factura, agenda, impuestos y clientes — gestionados por una IA que aprende contigo y te devuelve horas cada semana.' : 'Consulta facturas, propuestas y pagos con tu profesional de confianza. Todo en un solo lugar.'}</p>
            <div className="ll-feats">
              {(isAutonomo ? ['Facturación automática con seguimiento de cobros','Simulador fiscal en tiempo real (IRPF · IVA · cuota)','Agenda, videollamadas e informes conversacionales','CRM sencillo con benchmark sectorial'] : ['Facturas y propuestas siempre disponibles','Aprueba presupuestos con un clic','Pagos seguros desde el portal','Comunicación directa con tu profesional']).map(f => (
                <div key={f} className="ll-feat"><div className="ll-feat-dot"><svg viewBox="0 0 24 24" fill="none" stroke="#BCD4E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>{f}</div>
              ))}
            </div>
          </div>
          <div className="ll-brand">COAXIONIA · IA Adaptativa 4ª Generación</div>
        </div>
        <div className="login-right">
          <div className="lr-eyebrow">Acceso seguro</div>
          <div className="lr-title">Acceder · <em>{isAutonomo ? 'Autónomo' : 'Cliente'}</em></div>
          <div className="lr-welcome">Introduce tus datos para entrar al panel. La IA ya tiene listo lo que necesitas revisar hoy.</div>
          <label className="lf-label">Correo electrónico</label>
          <input className="lf-input" type="email" placeholder="nombre@tuemail.com"/>
          <label className="lf-label">Contraseña</label>
          <input className="lf-input" type="password" placeholder="••••••••"/>
          <div className="lf-row"><label className="lf-remember"><input type="checkbox" defaultChecked/>Mantener sesión iniciada</label><button className="lf-forgot">¿Olvidaste la contraseña?</button></div>
          <button className="login-btn" onClick={onLogin}>Acceder al panel</button>
          <div className="lr-divider">o continúa con</div>
          <div className="lr-sso">
            <button className="lr-sso-btn"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Google</button>
            <button className="lr-sso-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="#1C2D44"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/></svg>Apple</button>
          </div>
          <button className="back-link" onClick={onBack}>← Cambiar perfil</button>
          <div className="lr-kpis">
            {isAutonomo ? (<><div className="lr-kpi"><div className="lr-kpi-num">12h</div><div className="lr-kpi-lbl">AHORRADAS / MES</div></div><div className="lr-kpi"><div className="lr-kpi-num">94%</div><div className="lr-kpi-lbl">COBROS EN PLAZO</div></div><div className="lr-kpi"><div className="lr-kpi-num">0</div><div className="lr-kpi-lbl">ERRORES FISCALES</div></div></>) : (<><div className="lr-kpi"><div className="lr-kpi-num">24h</div><div className="lr-kpi-lbl">DISPONIBLE</div></div><div className="lr-kpi"><div className="lr-kpi-num">100%</div><div className="lr-kpi-lbl">DOCUMENTOS</div></div><div className="lr-kpi"><div className="lr-kpi-num">0</div><div className="lr-kpi-lbl">ESPERAS</div></div></>)}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══ APPSHELL ══ */
const navGroups = [
  { id:'dia', label:'Mi día a día', items:[{id:'inicio',label:'Inicio',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>},{id:'agenda',label:'Agenda',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>},{id:'comunicacion',label:'Comunicación',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}]},
  { id:'clientes', label:'Clientes', items:[{id:'clientes',label:'Clientes',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}]},
  { id:'ventas', label:'Ventas', items:[{id:'propuestas',label:'Propuestas',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z"/></svg>},{id:'ventas',label:'Ventas',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>},{id:'proyectos',label:'Proyectos',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}]},
  { id:'admin', label:'Admin & Fiscal', items:[{id:'facturas',label:'Facturas emitidas',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>},{id:'facturas-recibidas',label:'Facturas recibidas',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>},{id:'gastos',label:'Gastos',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>},{id:'tesoreria',label:'Tesorería',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>},{id:'impuestos',label:'Impuestos',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 7l8 10"/><path d="M9 12h3"/><path d="M13 17h3"/></svg>}]},
  { id:'marca', label:'Marca', items:[{id:'branding',label:'Branding',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.8 0 1.5-.7 1.5-1.5 0-.4-.2-.7-.4-1-.3-.3-.4-.7-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10z"/></svg>},{id:'redes',label:'Redes sociales',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>},{id:'mailing',label:'Mailing',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}]},
  { id:'premium', label:'Premium', items:[{id:'proyeccion',label:'Proyección',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>},{id:'benchmark',label:'Benchmark',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>},{id:'asistente',label:'Canales IA',icon:<svg className="sb-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>}]},
]

function AppShell({ onLogout }) {
  const [activeSection, setActiveSection] = useState('inicio')
  const [openGroups, setOpenGroups] = useState({ dia: true })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function toggleGroup(id) { setOpenGroups(prev => ({ ...prev, [id]: !prev[id] })) }
  function goTo(id) { setActiveSection(id); setSidebarOpen(false) }

  const allItems = navGroups.flatMap(g => g.items)

  return (
    <>
      <div className={`sidebar-overlay${sidebarOpen?' open':''}`} onClick={() => setSidebarOpen(false)}></div>
      <div id="appShell">
        <div className="topbar">
          <button className="tb-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}><svg viewBox="0 0 24 24" fill="none" stroke="#1C2D44" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg></button>
          <div className="tb-logo"><div className="tb-logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 18L10 6L14 14L20 18" stroke="#FAF7F2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="6" r="1.5" fill="#BCD4E8"/><circle cx="14" cy="14" r="1.5" fill="#BCD4E8"/><circle cx="20" cy="18" r="1.5" fill="#BCD4E8"/></svg></div><div className="tb-logo-text">Tu gestión <em>IA</em></div></div>
          <div className="tb-search"><span className="tb-search-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span><input placeholder="Buscar clientes, facturas, tareas…"/></div>
          <div className="tb-right">
            <div className="tb-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span className="tb-badge">4</span></div>
            <div className="tb-user" onClick={onLogout} title="Salir"><div className="tb-user-avatar">IK</div><div className="tb-user-info"><span className="tb-user-name">Iker Arrieta</span><span className="tb-user-role">Autónomo · Consultor · <span style={{color:'#2E5A8C'}}>Salir</span></span></div></div>
          </div>
        </div>
        <div className="app-body">
          <aside className={`sidebar${sidebarOpen?' open':''}`}>
            <div className="sb-user-header"><div className="sb-avatar">IK</div><div className="sb-info"><span className="sb-name">Iker Arrieta</span><span className="sb-role">Autónomo · Consultor</span></div></div>
            {navGroups.map(group => (
              <div key={group.id} className={`sb-section${openGroups[group.id]?' open':''}`}>
                <div className="sb-section-title" onClick={() => toggleGroup(group.id)}>{group.label}</div>
                <div className="sb-section-items">
                  {group.items.map(item => (
                    <div key={item.id} className={`sb-item${activeSection===item.id?' active':''}`} onClick={() => goTo(item.id)}>
                      {item.icon}<span className="sb-item-label">{item.label}</span><span className="sb-ia-badge">IA</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{padding:'12px 16px',borderTop:'0.5px solid rgba(28,45,68,0.08)',marginTop:'auto'}}>
              <div onClick={onLogout} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:8,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(198,93,74,0.06)'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(198,93,74,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span style={{fontSize:'0.8rem',color:'rgba(198,93,74,0.8)',fontWeight:500}}>Salir</span>
              </div>
            </div>
          </aside>
          <main className="content">
            {/* INICIO — contenido completo */}
            <div className={`section-panel${activeSection==='inicio'?' active':''}`}>
              <InicioSection />
            </div>
            {/* AGENDA */}
            <div className={`section-panel${activeSection==='agenda'?' active':''}`}>
              <AgendaSection />
            </div>
            {/* COMUNICACION */}
            <div className={`section-panel${activeSection==='comunicacion'?' active':''}`}>
              <ComunicacionSection />
            </div>
            {/* CLIENTES */}
            <div className={`section-panel${activeSection==='clientes'?' active':''}`}>
              <ClientesSection />
            </div>
            {/* PROPUESTAS */}
            <div className={`section-panel${activeSection==='propuestas'?' active':''}`}>
              <PropuestasSection />
            </div>
            {/* VENTAS */}
            <div className={`section-panel${activeSection==='ventas'?' active':''}`}>
              <VentasSection />
            </div>
            {/* PROYECTOS */}
            <div className={`section-panel${activeSection==='proyectos'?' active':''}`}>
              <ProyectosSection />
            </div>
            {/* FACTURAS EMITIDAS */}
            <div className={`section-panel${activeSection==='facturas'?' active':''}`}>
              <FacturasSection />
            </div>
            {/* FACTURAS RECIBIDAS */}
            <div className={`section-panel${activeSection==='facturas-recibidas'?' active':''}`}>
              <FacturasRecibidasSection />
            </div>
            {/* GASTOS */}
            <div className={`section-panel${activeSection==='gastos'?' active':''}`}>
              <GastosSection />
            </div>
            {/* TESORERIA */}
            <div className={`section-panel${activeSection==='tesoreria'?' active':''}`}>
              <TesoreriaSection />
            </div>
            {/* IMPUESTOS */}
            <div className={`section-panel${activeSection==='impuestos'?' active':''}`}>
              <ImpuestosSection />
            </div>
            {/* BRANDING */}
            <div className={`section-panel${activeSection==='branding'?' active':''}`}>
              <BrandingSection />
            </div>
            {/* REDES */}
            <div className={`section-panel${activeSection==='redes'?' active':''}`}>
              <RedesSection />
            </div>
            {/* MAILING */}
            <div className={`section-panel${activeSection==='mailing'?' active':''}`}>
              <MailingSection />
            </div>
            {/* RESTO */}
            {allItems.filter(i => !['inicio','agenda','comunicacion','clientes','propuestas','ventas','proyectos','facturas','facturas-recibidas','gastos','tesoreria','impuestos','branding','redes','mailing'].includes(i.id)).map(item => (
              <div key={item.id} className={`section-panel${activeSection===item.id?' active':''}`}>
                <div className="page-header">
                  <div>
                    <h1 className="page-title">{item.label}</h1>
                    <p className="page-subtitle">Próximo paso · La IA está preparando esta sección.</p>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  )
}

/* ══ APP ══ */
export default function App() {
  const [screen, setScreen] = useState('role')
  const [role, setRole] = useState(null)
  function handleSelectRole(r) { setRole(r); setScreen('login') }
  if (screen === 'role') return <RoleScreen onSelectRole={handleSelectRole} />
  if (screen === 'login') return <LoginScreen role={role} onLogin={() => setScreen('app')} onBack={() => setScreen('role')} />
  return <AppShell onLogout={() => setScreen('role')} />
}
