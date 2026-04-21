import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import './sections.css'

const colores = {
  terracotta:{bg:'rgba(198,93,74,0.08)',border:'rgba(198,93,74,0.25)',hora:'#C65D4A'},
  azul:{bg:'rgba(46,90,140,0.06)',border:'rgba(46,90,140,0.15)',hora:'#2E5A8C'},
  verde:{bg:'rgba(34,160,107,0.06)',border:'rgba(34,160,107,0.12)',hora:'#22A06B'},
  mostaza:{bg:'rgba(212,165,116,0.08)',border:'transparent',hora:'#8B5E34'},
  gris:{bg:'rgba(28,45,68,0.03)',border:'transparent',hora:'rgba(28,45,68,0.35)'},
  alerta:{bg:'rgba(28,45,68,0.03)',border:'transparent',hora:'rgba(28,45,68,0.4)'},
}

/* Eventos mensuales abril 2026 — día, tipo, etiqueta. Coincide con HTML demo. */
const eventosMes = {
  2: { tipo: 'reunion', label: 'Reunión' },
  7: { tipo: 'visita', label: 'Visita' },
  9: { tipo: 'reunion', label: 'Llamada' },
  10: { tipo: 'personal', label: 'Formación' },
  14: { tipo: 'visita', label: 'Visita' },
  16: { tipo: 'reunion', label: 'Propuesta' },
  17: { tipo: 'today', label: 'Meet 12h' },
  18: { tipo: 'reunion', label: 'Reunión' },
  22: { tipo: 'personal', label: 'Networking' },
  23: { tipo: 'reunion', label: 'Llamada' },
  28: { tipo: 'visita', label: 'Visita' },
  29: { tipo: 'reunion', label: 'Cierre' },
}

/* 1 abril 2026 es miércoles → 2 huecos vacíos antes. Mes de 30 días. */
const padInicio = 2
const diasMes = 30

/* Agenda de hoy (17 abril) — mismos datos que Inicio tab Hoy */
const agendaHoy = [
  { hora: '09:00', titulo: 'Llamada Txema García · Digiform SL',     meta: 'Revisión avance 1T · 45 min · ✓ Completada',                   past: true },
  { hora: '10:30', titulo: 'Propuesta Bodegas Iriarte',               meta: 'Preparar antes de la reunión de mañana · En curso',            now: true,  badge: 'IA: borrador listo para revisar →' },
  { hora: '12:00', titulo: 'Videollamada · Ana Ruiz · Metalúrgica Goi', meta: 'Kick-off proyecto digitalización · Google Meet' },
  { hora: '16:00', titulo: 'Bloque IA · Revisar emails + mailing',     meta: 'Tiempo libre detectado por IA para tareas de gestión',          badge: 'Sugerido por IA' },
  { hora: '18:00', titulo: 'Cierre de día',                            meta: 'Revisar tareas completadas · Preparar mañana' },
]

const diasSemana = [
  {dia:'Lun 18',citas:[
    {hora:'09:00',dur:'60min',cliente:'Bodegas Iriarte',tema:'Propuesta estrategia',tipo:'terracotta',lugar:'Presencial DoN',urgente:true,contacto:'Ana Ruiz',briefing:'IA tiene: historial cliente, propuesta 28.000€, ROI estimado, 3 objeciones frecuentes.'},
    {hora:'15:00',dur:'30min',cliente:'Revisión propuestas',tema:'Bloque IA · interno',tipo:'azul'},
  ]},
  {dia:'Mar 19',citas:[
    {hora:'10:00',dur:'45min',cliente:'Digiform SL',tema:'Kick-off mayo',tipo:'azul',lugar:'Google Meet',contacto:'Txema García',briefing:'IA tiene: contrato firmado, hitos mayo, pendientes de WhatsApp.'},
  ]},
  {dia:'Mié 20',citas:[
    {hora:'09:00',dur:'90min',cliente:'Metalúrgica Goi',tema:'Revisión fase 3 CRM',tipo:'verde',lugar:'Presencial Donostia',contacto:'Mikel Iturrioz',briefing:'IA tiene: avance CRM 65%, tareas pendientes fase 3, próximos hitos.'},
    {hora:'—',cliente:'Pagar 303+130+111',tema:'3.326 € · AEAT',tipo:'alerta'},
  ]},
  {dia:'Jue 21',citas:[
    {hora:'11:00',dur:'60min',cliente:'Garapen Consulting',tema:'Planificación Q2',tipo:'azul',lugar:'Teams',contacto:'Ane Etxebarria',briefing:'IA tiene: objetivos Q2, análisis competencia, propuesta de servicios Q2.'},
  ]},
  {dia:'Vie 22',citas:[
    {hora:'10:00',dur:'30min',cliente:'Innotek Basque',tema:'Seguimiento semanal',tipo:'mostaza',lugar:'Llamada'},
    {hora:'14:00',cliente:'Facturas + admin',tema:'Bloque trabajo',tipo:'gris'},
  ]},
]

const briefings = [
  {titulo:'Hoy 09:00 · Bodegas Iriarte',desc:'IA tiene: historial cliente, propuesta 28.000€, ROI estimado, 3 objeciones frecuentes.',color:'rgba(198,93,74,0.05)',borde:'rgba(198,93,74,0.2)',txtColor:'#C65D4A',contacto:'Ana Ruiz',cliente:'Bodegas Iriarte',tema:'Propuesta estrategia digital',briefing:'IA tiene: historial cliente, propuesta 28.000€, ROI estimado, 3 objeciones frecuentes.'},
  {titulo:'Mar 19 · Digiform SL',desc:'IA tiene: contrato firmado, hitos mayo, pendientes de WhatsApp.',color:'rgba(46,90,140,0.04)',borde:'rgba(46,90,140,0.12)',txtColor:'#2E5A8C',contacto:'Txema García',cliente:'Digiform SL',tema:'Kick-off proyecto mayo',briefing:'IA tiene: contrato firmado, hitos mayo, pendientes de WhatsApp.'},
  {titulo:'Mié 20 · Metalúrgica Goi',desc:'IA tiene: avance CRM 65%, tareas pendientes fase 3, próximos hitos.',color:'rgba(34,160,107,0.04)',borde:'rgba(34,160,107,0.12)',txtColor:'#22A06B',contacto:'Mikel Iturrioz',cliente:'Metalúrgica Goi',tema:'Revisión fase 3 CRM',briefing:'IA tiene: avance CRM 65%, tareas pendientes fase 3, próximos hitos.'},
]

const tareas = [
  {t:'Revisar propuesta Bodegas Iriarte',m:'Ajustar ROI · Antes de las 09:00h de hoy',badge:'warn',bl:'Urgente'},
  {t:'Pagar Mod. 303 + 130 + 111',m:'3.326 € · Vence miércoles 20',badge:'warn',bl:'3 días'},
  {t:'Enviar resumen llamada a Txema',m:'Digiform · WhatsApp de hoy',badge:'ia',bl:'IA lista'},
  {t:'Reclamar F-2026-035 Metalúrgica Goi',m:'Vencida 18 días · 2.904 €',badge:'warn',bl:'Urgente'},
  {t:'Preparar agenda Garapen · Jueves 11:00h',m:'Planificación Q2 · 60 min',badge:'ia',bl:'IA lista'},
  {t:'Publicar post LinkedIn · martes',m:'IA lo tiene preparado · sobre CRM pymes',badge:'ia',bl:'IA lista'},
]

function ModalBriefing({ open, onClose, datos }) {
  if (!datos) return null
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
        <div style={{width:36,height:36,borderRadius:9,background:'#1C2D44',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BCD4E8" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div><div className="dm-title" style={{marginBottom:0}}>Briefing IA · {datos.cliente}</div><div className="dm-sub" style={{marginBottom:0}}>{datos.tema}</div></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:14}}>
        <div className="dm-info-box"><div className="dm-info-lbl">Contacto</div><div className="dm-info-val"><strong>{datos.contacto}</strong> · {datos.cliente}<br/>Relación: cliente activo desde feb 2026 · Proyecto en curso 65% avance · NPS 78</div></div>
        <div className="dm-info-box" style={{background:'rgba(46,90,140,0.05)'}}><div className="dm-info-lbl">Preparado por la IA</div><div className="dm-info-val">{datos.briefing}</div></div>
        <div className="dm-info-box" style={{background:'rgba(34,160,107,0.05)'}}><div className="dm-info-lbl">Objetivo de la reunión</div><div className="dm-info-val">Revisar avance del proyecto, resolver dudas y confirmar próximos hitos.</div></div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Briefing completo de '+datos.cliente+' abierto','info'); onClose() }}>Abrir briefing completo →</button>
      </div>
    </Modal>
  )
}

function ModalNuevaCita({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Nueva cita" subtitle="La IA prepara el briefing automáticamente">
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Cliente</div>
          <select className="dm-select"><option>Metalúrgica Goi</option><option>Digiform SL</option><option>Bodegas Iriarte</option><option>Garapen Consulting</option><option>Otro...</option></select>
        </div>
        <div className="dm-field"><div className="dm-label">Tipo</div>
          <select className="dm-select"><option>Presencial</option><option>Google Meet</option><option>Teams</option><option>Llamada</option></select>
        </div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Fecha</div><input className="dm-input" type="date" defaultValue="2026-04-22"/></div>
        <div className="dm-field"><div className="dm-label">Hora</div><input className="dm-input" type="time" defaultValue="10:00"/></div>
      </div>
      <div className="dm-field"><div className="dm-label">Asunto / Tema</div><input className="dm-input" type="text" placeholder="Ej: Revisión fase 3 · kick-off..."/></div>
      <div className="dm-field"><div className="dm-label">Notas para la IA</div><textarea className="dm-textarea" placeholder="La IA usará estas notas para preparar el briefing..."/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Cita creada · briefing IA en preparación','ok'); onClose() }}>✦ Crear cita y briefing IA</button>
      </div>
    </Modal>
  )
}

export default function AgendaSection() {
  const [briefingDatos, setBriefingDatos] = useState(null)
  const [nuevaCita, setNuevaCita] = useState(false)
  const [checkeds, setCheckeds] = useState({})
  const [vista, setVista] = useState('mes') // 'mes' | 'semana' | 'dia' — HTML demo default: mes

  return (
    <div>
      <ModalBriefing open={!!briefingDatos} onClose={() => setBriefingDatos(null)} datos={briefingDatos} />
      <ModalNuevaCita open={nuevaCita} onClose={() => setNuevaCita(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Agenda</h1>
          <p className="page-subtitle">Reuniones, tareas y compromisos · La IA prioriza y prepara cada cita automáticamente.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA ha preparado el briefing de las 3 reuniones de esta semana</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => showToast('Sincronización con Google Calendar · Fase 2','info')}>Sincronizar</button>
          <button className="btn-primary" onClick={() => setNuevaCita(true)}>+ Nueva cita</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Hoy · citas</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ 1 urgente</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Esta semana</div><div className="dia-kpi-val">8</div><div className="dia-kpi-trend up">2 con clientes nuevos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Horas reuniones · mes</div><div className="dia-kpi-val">14h</div><div className="dia-kpi-trend up">↓ 18% vs mes anterior</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Próxima factura</div><div className="dia-kpi-val">1 mayo</div><div className="dia-kpi-trend up">Metalúrgica Goi</div></div>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head" style={{marginBottom:16}}>
            <div>
              <div className="dia-card-ttl">Agenda</div>
              <div className="dia-card-sub">Abril 2026 · 18 eventos este mes</div>
            </div>
            <div style={{display:'flex',gap:4,padding:3,background:'#FAF7F2',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:9}}>
              {[['mes','Mes'],['semana','Semana'],['dia','Día']].map(([k,l]) => (
                <button key={k} onClick={() => setVista(k)} style={{padding:'6px 14px',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.76rem',fontWeight:500,cursor:'pointer',background:vista===k?'#FFFFFF':'transparent',color:vista===k?'#1C2D44':'rgba(28,45,68,0.55)',boxShadow:vista===k?'0 1px 3px rgba(28,45,68,0.1)':'none',transition:'all .15s'}}>{l}</button>
              ))}
            </div>
          </div>

          {vista === 'mes' && (
            <div>
              <div className="rs-cal">
                {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => (
                  <div key={d} className="rs-cal-head">{d}</div>
                ))}
                {Array.from({length:padInicio}, (_,i) => <div key={`e${i}`} className="rs-cal-day empty"></div>)}
                {Array.from({length:diasMes}, (_,i) => {
                  const d = i + 1
                  const ev = eventosMes[d]
                  const today = d === 17
                  const tipoBg = {
                    reunion: {bg:'#2E5A8C',color:'#fff'},
                    visita:  {bg:'rgba(188,212,232,0.5)',color:'#1C2D44'},
                    personal:{bg:'rgba(188,212,232,0.25)',color:'#1C2D44'},
                    today:   {bg:'#1C2D44',color:'#FAF7F2'},
                  }
                  const pill = ev ? tipoBg[ev.tipo] : null
                  return (
                    <div key={d} className={`rs-cal-day${today?' today':''}`}>
                      <span className="rs-cal-num">{d}</span>
                      {ev && pill && (
                        <span style={{display:'block',marginTop:4,padding:'1px 5px',borderRadius:4,fontSize:'0.6rem',fontWeight:600,background:pill.bg,color:pill.color,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{ev.label}</span>
                      )}
                    </div>
                  )
                })}
              </div>
              <div style={{display:'flex',gap:14,marginTop:14,flexWrap:'wrap'}}>
                {[
                  {c:'#2E5A8C',l:'Reunión/Llamada'},
                  {c:'rgba(188,212,232,0.7)',l:'Visita cliente'},
                  {c:'rgba(188,212,232,0.35)',l:'Formación/Red.'},
                  {c:'#1C2D44',l:'Hoy'},
                ].map((it,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.72rem',color:'rgba(28,45,68,0.6)'}}>
                    <span style={{width:10,height:10,borderRadius:'50%',background:it.c,flexShrink:0}}></span>
                    {it.l}
                  </div>
                ))}
              </div>
            </div>
          )}

          {vista === 'semana' && (
            <>
              <div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)',marginBottom:12}}>
                Semana del 18 al 24 de abril · pulsa cualquier cita para ver el briefing IA
              </div>
              <div className="ag-week-grid">
                {diasSemana.map((dia,i) => (
                  <div key={i}>
                    <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8,textAlign:'center'}}>{dia.dia}</div>
                    {dia.citas.map((cita,j) => {
                      const c = colores[cita.tipo]||colores.gris
                      return (
                        <div key={j} onClick={() => cita.contacto && setBriefingDatos(cita)} style={{cursor:cita.contacto?'pointer':'default',padding:10,background:c.bg,border:`0.5px solid ${c.border}`,borderRadius:8,marginBottom:6}} onMouseEnter={e=>{if(cita.contacto)e.currentTarget.style.opacity='0.8'}} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                          {cita.hora && <div style={{fontSize:'0.68rem',fontWeight:600,color:c.hora,marginBottom:2}}>{cita.hora}{cita.dur?' · '+cita.dur:''}</div>}
                          <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{cita.cliente}</div>
                          <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.55)'}}>{cita.tema}</div>
                          {cita.urgente && <div style={{fontSize:'0.65rem',color:'#C65D4A',fontWeight:600,marginTop:4}}>⚡ Hoy · {cita.lugar}</div>}
                          {cita.lugar && !cita.urgente && <div style={{fontSize:'0.65rem',color:c.hora,fontWeight:600,marginTop:4}}>{cita.lugar}</div>}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </>
          )}

          {vista === 'dia' && (
            <>
              <div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)',marginBottom:12}}>
                Jueves 17 de abril · 5 bloques en el día
              </div>
              <div className="dia-agenda">
                {agendaHoy.map((ev,i) => (
                  <div key={i} className={`dia-agenda-item${ev.past?' past':''}`}>
                    <div className="dia-agenda-time">{ev.hora}</div>
                    <div className={`dia-agenda-dot${ev.now?' now':''}`}></div>
                    <div className="dia-agenda-body" style={{gridColumn:3}}>
                      <div className="dia-agenda-title">{ev.titulo}</div>
                      <div className="dia-agenda-meta">{ev.meta}</div>
                      {ev.badge && <div className={`dia-agenda-badge${ev.badge.startsWith('IA')?' ia':''}`}>{ev.badge}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Preparación de reuniones</div><div className="dia-card-sub">Briefings automáticos antes de cada cita</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {briefings.map((r,i) => (
              <div key={i} onClick={() => setBriefingDatos(r)} style={{cursor:'pointer',padding:12,background:r.color,border:`0.5px solid ${r.borde}`,borderRadius:10}} onMouseEnter={e=>e.currentTarget.style.opacity='0.8'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:'0.82rem',fontWeight:600,color:'#1C2D44'}}>{r.titulo}</span>
                  <span style={{fontSize:'0.7rem',fontWeight:600,color:r.txtColor}}>Preparar →</span>
                </div>
                <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.6)'}}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Tareas · Esta semana</div><div className="dia-card-sub">Detectadas por IA en conversaciones y emails</div></div>
          <div className="dia-tasks">
            {tareas.map((task,i) => (
              <div key={i} className="dia-task">
                <div className="dia-task-check" style={{cursor:'pointer',background:checkeds[i]?'rgba(34,160,107,0.15)':'',borderColor:checkeds[i]?'#22A06B':''}} onClick={() => setCheckeds(p => ({...p,[i]:!p[i]}))}></div>
                <div className="dia-task-body" style={{opacity:checkeds[i]?0.4:1}}><div className="dia-task-title" style={{textDecoration:checkeds[i]?'line-through':'none'}}>{task.t}</div><div className="dia-task-meta">{task.m}</div></div>
                {!checkeds[i] && <span className={`dia-task-badge ${task.badge}`}>{task.bl}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
