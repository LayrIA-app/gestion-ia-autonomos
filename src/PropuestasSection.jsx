import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import './sections.css'

function ModalNuevaPropuesta({ open, onClose }) {
  const [tipo, setTipo] = useState('consultoría')
  return (
    <Modal open={open} onClose={onClose} title="Nueva propuesta · IA" subtitle="La IA generará una propuesta profesional completa lista para enviar">
      <div className="dm-field">
        <div className="dm-label">Tipo de propuesta</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:6}}>
          {['Consultoría','Retainer','Proyecto','Auditoría'].map(t => (
            <div key={t} onClick={() => setTipo(t.toLowerCase())} style={{padding:'10px 14px',borderRadius:9,border:`0.5px solid ${tipo===t.toLowerCase()?'#1C2D44':'rgba(28,45,68,0.15)'}`,background:tipo===t.toLowerCase()?'rgba(28,45,68,0.05)':'transparent',cursor:'pointer',fontSize:'0.84rem',fontWeight:tipo===t.toLowerCase()?600:400,color:'#1C2D44',textAlign:'center'}}>{t}</div>
          ))}
        </div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Cliente</div><select className="dm-select"><option>Bodegas Iriarte</option><option>Digiform SL</option><option>Nuevo cliente...</option></select></div>
        <div className="dm-field"><div className="dm-label">Duración</div><select className="dm-select"><option>1 mes</option><option>3 meses</option><option>6 meses</option><option>12 meses</option></select></div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Importe estimado</div><input className="dm-input" type="text" placeholder="28.000 €"/></div>
        <div className="dm-field"><div className="dm-label">Fecha entrega</div><input className="dm-input" type="date" defaultValue="2026-04-25"/></div>
      </div>
      <div className="dm-field"><div className="dm-label">Contexto para la IA</div><textarea className="dm-textarea" placeholder="Describe brevemente qué necesita el cliente..."/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Propuesta generada · revisa el borrador','ok'); onClose() }}>✦ Generar propuesta con IA</button>
      </div>
    </Modal>
  )
}

function ModalVerDraft({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Draft propuesta · Digiform SL" subtitle="IA completada al 80% · Revisa y edita antes de enviar">
      <div className="dm-info-box" style={{background:'rgba(46,90,140,0.05)'}}>
        <div className="dm-info-lbl">Resumen ejecutivo</div>
        <div className="dm-info-val">Ampliación del proyecto de optimización de procesos. Objetivo: reducir tiempos de reporting un 40% adicional mediante automatización IA.</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
        <div className="dm-info-box"><div className="dm-info-lbl">Importe</div><div className="dm-info-val" style={{fontFamily:'var(--serif)',fontSize:'1.1rem'}}>8.500 €</div></div>
        <div className="dm-info-box"><div className="dm-info-lbl">Duración</div><div className="dm-info-val">3 meses · Retainer</div></div>
      </div>
      <div className="dm-info-box" style={{marginBottom:10}}>
        <div className="dm-info-lbl">Servicios incluidos</div>
        <div className="dm-info-val">• Automatización flujo de reporting<br/>• 3 sesiones de trabajo presenciales<br/>• Soporte IA continuo · 2h/semana<br/>• Documentación y formación equipo</div>
      </div>
      <div style={{padding:10,background:'rgba(46,90,140,0.08)',borderRadius:8,fontSize:'0.78rem',color:'#2E5A8C',marginBottom:14}}>✦ IA sugiere: Añadir caso de éxito de Metalúrgica Goi para reforzar credibilidad.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-ghost" onClick={() => { showToast('Editor de propuesta abierto','info'); onClose() }}>Editar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Propuesta enviada a Digiform SL','ok'); onClose() }}>Enviar a Digiform →</button>
      </div>
    </Modal>
  )
}

function ModalSeguimiento({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Seguimiento · Bodegas Iriarte" subtitle="Propuesta 28.000 € · Enviada hace 3 días">
      <div className="dm-info-box" style={{background:'rgba(198,93,74,0.05)',marginBottom:10}}>
        <div className="dm-info-lbl" style={{color:'#C65D4A'}}>⚡ Reunión mañana 09:00h</div>
        <div className="dm-info-val">Bodegas Iriarte · Presencial DoN · Contacto: Ana Ruiz</div>
      </div>
      <div className="dm-field"><div className="dm-label">Estado del seguimiento</div>
        <select className="dm-select"><option>Enviada · pendiente respuesta</option><option>En revisión por el cliente</option><option>Negociando condiciones</option><option>Ganada ✓</option><option>Perdida</option></select>
      </div>
      <div className="dm-field"><div className="dm-label">Próxima acción</div><input className="dm-input" defaultValue="Reunión presencial mañana 09:00h DoN"/></div>
      <div className="dm-field"><div className="dm-label">Notas</div><textarea className="dm-textarea" placeholder="Observaciones, objeciones, acuerdos..."/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Seguimiento guardado','ok'); onClose() }}>Guardar seguimiento</button>
      </div>
    </Modal>
  )
}

function ModalPerdida({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Análisis IA · ¿Por qué se perdió?" subtitle="Construcciones Unión · Web corporativa · 4.200 €">
      <div className="dm-info-box" style={{marginBottom:10}}>
        <div className="dm-info-lbl">Motivo registrado</div>
        <div className="dm-info-val">Precio · Mar 2026</div>
      </div>
      <div className="dm-info-box" style={{background:'rgba(46,90,140,0.05)',marginBottom:10}}>
        <div className="dm-info-lbl">Análisis IA</div>
        <div className="dm-info-val">El precio fue 32% superior al que esperaban. La propuesta no incluía comparativa de ROI ni casos de éxito similares. La IA detecta que propuestas con estos elementos tienen un 45% más de conversión en tu sector.</div>
      </div>
      <div className="dm-info-box" style={{background:'rgba(34,160,107,0.05)'}}>
        <div className="dm-info-lbl">Recomendaciones para próximas</div>
        <div className="dm-info-val">• Incluir siempre ROI estimado con casos reales<br/>• Ofrecer opción modular (básico / completo)<br/>• Añadir testimonial de cliente del mismo sector</div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Recomendaciones aplicadas a la plantilla por defecto','ok'); onClose() }}>Aplicar a siguientes propuestas</button>
      </div>
    </Modal>
  )
}

export default function PropuestasSection({ onNavigate }) {
  const [modal, setModal] = useState(null)

  return (
    <div>
      {modal === 'nueva' && <ModalNuevaPropuesta open onClose={() => setModal(null)} />}
      {modal === 'draft' && <ModalVerDraft open onClose={() => setModal(null)} />}
      {modal === 'seguimiento' && <ModalSeguimiento open onClose={() => setModal(null)} />}
      {modal === 'perdida' && <ModalPerdida open onClose={() => setModal(null)} />}

      <div className="page-header">
        <div>
          <h1 className="page-title">Propuestas</h1>
          <p className="page-subtitle">Constructor de propuestas con IA · Pipeline de ventas · Historial completo.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA completó el 80% del borrador para Digiform · revisión pendiente</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => setModal('nueva')}>Plantillas</button>
          <button className="btn-primary" onClick={() => setModal('nueva')}>+ Nueva propuesta</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">En preparación</div><div className="dia-kpi-val">2</div><div className="dia-kpi-trend warn">⚡ 1 urgente</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Enviadas · mes</div><div className="dia-kpi-val">2</div><div className="dia-kpi-trend up">↑ vs 1 mes ant.</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tasa conversión</div><div className="dia-kpi-val">62%</div><div className="dia-kpi-trend up">↑ Sector: 41%</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Valor pipeline</div><div className="dia-kpi-val">54.500 €</div><div className="dia-kpi-trend up">↑ potencial</div></div>
      </div>

      <div className="dia-card" style={{marginBottom:14}}>
        <div className="dia-card-head"><div className="dia-card-ttl">Pipeline de propuestas</div><div className="dia-card-sub">Estado de cada propuesta en tiempo real</div></div>
        <div className="prop-pipeline">

          {/* Borrador */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Borrador</div>
            <div style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.1)',borderRadius:8,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#2E5A8C'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(28,45,68,0.1)'} onClick={() => setModal('draft')}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Digiform SL</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:6}}>Ampliación proyecto · 8.500 €</div>
              <div style={{fontSize:'0.68rem',color:'#2E5A8C',fontWeight:600}}>✦ IA completada al 80%</div>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <button className="btn-ghost" style={{flex:1,padding:4,fontSize:'0.68rem'}} onClick={e=>{e.stopPropagation();setModal('draft')}}>Ver draft</button>
                <button style={{flex:1,padding:4,background:'#1C2D44',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}} onClick={e=>{e.stopPropagation();setModal('draft')}}>Enviar</button>
              </div>
            </div>
          </div>

          {/* Enviada */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Enviada · Pendiente</div>
            <div style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(198,93,74,0.3)',borderRadius:8,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#C65D4A'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(198,93,74,0.3)'}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Bodegas Iriarte</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>Estrategia digital · 28.000 €</div>
              <div style={{fontSize:'0.68rem',color:'#C65D4A',fontWeight:600}}>⚡ Reunión mañana 09:00h</div>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <button className="btn-ghost" style={{flex:1,padding:4,fontSize:'0.68rem'}} onClick={() => setModal('draft')}>Editar</button>
                <button style={{flex:1,padding:4,background:'#C65D4A',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}} onClick={() => setModal('seguimiento')}>Seguir</button>
              </div>
            </div>
          </div>

          {/* Aceptada */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Aceptada ✓</div>
            {[{n:'Garapen Consulting',d:'Optimización procesos · 12.000 €',s:'✓ Firmada · Inicio 1 mayo'},{n:'Innotek Basque',d:'Consultoría digital · 9.600 €',s:'✓ Firmada · En curso'}].map((p,i) => (
              <div key={i} style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(34,160,107,0.2)',borderRadius:8,marginBottom:8}}>
                <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>{p.n}</div>
                <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>{p.d}</div>
                <div style={{fontSize:'0.68rem',color:'#22A06B',fontWeight:600}}>{p.s}</div>
                <button style={{width:'100%',marginTop:8,padding:4,background:'rgba(34,160,107,0.1)',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',fontWeight:600,color:'#22A06B',cursor:'pointer'}} onClick={() => onNavigate && onNavigate('proyectos')}>Ver en Proyectos →</button>
              </div>
            ))}
          </div>

          {/* Perdida */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Perdida · Archivada</div>
            <div style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:8,opacity:0.7}}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Construcciones Unión</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>Web corporativa · 4.200 €</div>
              <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.45)'}}>Motivo: precio · Mar 2026</div>
              <button style={{width:'100%',marginTop:8,padding:4,background:'transparent',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',color:'rgba(28,45,68,0.6)',cursor:'pointer'}} onClick={() => setModal('perdida')}>¿Por qué se perdió? IA</button>
            </div>
          </div>

        </div>
      </div>

      {/* Simulador de precio + Análisis de propuestas IA */}
      <div className="dia-grid">
        <SimuladorPrecio />

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Análisis de propuestas</div></div>
          <div className="ins-list" style={{gap:9}}>
            <div className="ins-item">
              <div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
              <div className="ins-body"><div className="ins-title">Bodegas Iriarte · revisar hoy</div><div className="ins-desc">Reunión mañana 09:00h. La propuesta de 28.000€ está lista pero conviene ajustar el ROI estimado antes de presentar.</div></div>
            </div>
            <div className="ins-item">
              <div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
              <div className="ins-body"><div className="ins-title">Tu tasa de conversión (62%) dobla el sector</div><div className="ins-desc">Media del sector para autónomos: 41%. Las propuestas con casos de éxito específicos convierten un 34% más.</div></div>
            </div>
            <div className="ins-item">
              <div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
              <div className="ins-body"><div className="ins-title">Subir tarifa a 110 €/h · oportunidad</div><div className="ins-desc">Con tu tasa de conversión y NPS 78, tienes margen. +16€/h = +19.200€/año a igual volumen.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Simulador de precio · slider horas → total propuesta, margen 65%, tarifa media 94€/h.
   Datos verbatim de la demo HTML líneas 5160-5177. */
function SimuladorPrecio() {
  const [horas, setHoras] = useState(120)
  const tarifa = 94
  const total = horas * tarifa
  const margen = Math.round(total * 0.65)
  const fmt = (n) => n.toLocaleString('es-ES') + '€'
  return (
    <div className="dia-card">
      <div className="dia-card-head"><div className="dia-card-ttl">Simulador de precio</div><div className="dia-card-sub">Ajusta horas y ve el impacto</div></div>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)',marginBottom:6,display:'flex',justifyContent:'space-between'}}>
          <span>Horas estimadas</span>
          <strong>{horas}h</strong>
        </div>
        <input type="range" min="40" max="300" value={horas} onChange={(e) => setHoras(Number(e.target.value))} style={{width:'100%',accentColor:'#1C2D44'}}/>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',background:'rgba(28,45,68,0.03)',borderRadius:7}}>
          <span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>Tarifa/hora (tu media)</span>
          <span style={{fontSize:'0.82rem',fontWeight:500}}>94 €/h</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',background:'rgba(28,45,68,0.03)',borderRadius:7}}>
          <span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>Margen estimado (65%)</span>
          <span style={{fontSize:'0.82rem',fontWeight:500,color:'#22A06B'}}>{fmt(margen)}</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,background:'#1C2D44',borderRadius:9}}>
          <span style={{fontSize:'0.86rem',fontWeight:600,color:'#FAF7F2'}}>Total propuesta</span>
          <span style={{fontFamily:'var(--serif)',fontSize:'1.2rem',fontWeight:500,color:'#FAF7F2'}}>{fmt(total)}</span>
        </div>
      </div>
      <button style={{width:'100%',marginTop:10,padding:9,background:'transparent',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.8rem',fontWeight:500,color:'#1C2D44',cursor:'pointer'}} onClick={() => showToast('Abriendo constructor de propuesta con '+fmt(total)+' · '+horas+'h','info')}>
        Crear propuesta con este precio →
      </button>
    </div>
  )
}
