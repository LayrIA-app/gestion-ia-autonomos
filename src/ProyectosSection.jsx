import { useState } from 'react'
import Modal from './Modal'
import './sections.css'

function ModalNuevoProyecto({ open, onClose }) {
  const [dur, setDur] = useState('6 meses')
  const [cliente, setCliente] = useState('Metalúrgica Goi')
  const [tipo, setTipo] = useState('Consultoría estratégica')
  return (
    <Modal open={open} onClose={onClose} title="+ Nuevo proyecto" subtitle="La IA estructura las fases y tareas automáticamente">
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Cliente</div>
          <select className="dm-select" value={cliente} onChange={e => setCliente(e.target.value)}><option>Metalúrgica Goi</option><option>Digiform SL</option><option>Garapen Consulting</option><option>Innotek Basque</option><option>Nuevo cliente</option></select>
        </div>
        <div className="dm-field"><div className="dm-label">Tipo de proyecto</div>
          <select className="dm-select" value={tipo} onChange={e => setTipo(e.target.value)}><option>Consultoría estratégica</option><option>Implementación tecnológica</option><option>Formación</option><option>Auditoría</option><option>Retainer mensual</option></select>
        </div>
      </div>
      <div className="dm-field"><div className="dm-label">Nombre del proyecto</div><input className="dm-input" type="text" placeholder="Ej: Digitalización comercial 2026"/></div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Fecha inicio</div><input className="dm-input" type="date" defaultValue="2026-05-01"/></div>
        <div className="dm-field"><div className="dm-label">Duración estimada</div>
          <select className="dm-select" value={dur} onChange={e => setDur(e.target.value)}>
            <option>1 mes</option><option>3 meses</option><option>6 meses</option><option>9 meses</option><option>12 meses</option>
          </select>
        </div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Horas presupuestadas</div><input className="dm-input" type="number" placeholder="120"/></div>
        <div className="dm-field"><div className="dm-label">Tarifa hora</div><input className="dm-input" type="text" placeholder="100 €/h"/></div>
      </div>
      <div className="dm-field"><div className="dm-label">Descripción para la IA</div><textarea className="dm-textarea" placeholder="Describe el proyecto — la IA creará las fases y tareas automáticamente..."/></div>
      <div style={{padding:10,background:'rgba(46,90,140,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#2E5A8C',marginBottom:4}}>✦ La IA generará fases, hitos y tareas basándose en proyectos similares.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">✦ Crear proyecto con IA</button>
      </div>
    </Modal>
  )
}

function ModalRegistrarHoras({ open, onClose, cliente }) {
  return (
    <Modal open={open} onClose={onClose} title="Registrar horas" subtitle={cliente||'Proyecto'}>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Fecha</div><input className="dm-input" type="date" defaultValue="2026-04-18"/></div>
        <div className="dm-field"><div className="dm-label">Horas trabajadas</div><input className="dm-input" type="number" placeholder="2.5" step="0.5"/></div>
      </div>
      <div className="dm-field"><div className="dm-label">Tarea / Concepto</div><input className="dm-input" type="text" placeholder="Ej: Configurar módulo WMS · reunión cliente..."/></div>
      <div className="dm-field"><div className="dm-label">Notas adicionales</div><textarea className="dm-textarea" placeholder="Observaciones, incidencias, próximos pasos..."/></div>
      <div style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#22A06B',marginBottom:4}}>✓ IA calculará automáticamente el importe facturable y actualizará la rentabilidad del proyecto.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">Registrar horas</button>
      </div>
    </Modal>
  )
}

function ModalDetalleProyecto({ open, onClose, proyecto }) {
  if (!proyecto) return null
  return (
    <Modal open={open} onClose={onClose} maxWidth={560} title={proyecto.titulo} subtitle={proyecto.periodo}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:14}}>
        <div className="dm-info-box" style={{textAlign:'center'}}><div className="dm-info-lbl">Horas</div><div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:500,color:'#1C2D44'}}>{proyecto.horas}</div><div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)'}}>de {proyecto.horasTotal}</div></div>
        <div className="dm-info-box" style={{textAlign:'center'}}><div className="dm-info-lbl">Rentabilidad</div><div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:500,color:'#1C2D44'}}>{proyecto.tarifa}</div></div>
        <div className="dm-info-box" style={{textAlign:'center'}}><div className="dm-info-lbl">Margen</div><div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:500,color:'#22A06B'}}>{proyecto.margen}</div></div>
      </div>
      <div className="dm-info-box" style={{marginBottom:10}}>
        <div className="dm-info-lbl">Fases</div>
        {proyecto.fases.map((f,i) => <div key={i} style={{fontSize:'0.82rem',color:f.startsWith('✓')?'rgba(28,45,68,0.5)':f.startsWith('→')?'#2E5A8C':'rgba(28,45,68,0.4)',padding:'3px 0',textDecoration:f.startsWith('✓')?'line-through':'none'}}>{f}</div>)}
      </div>
      <div className="dm-info-box">
        <div className="dm-info-lbl">Progreso horas</div>
        <div style={{height:8,background:'rgba(28,45,68,0.08)',borderRadius:4,overflow:'hidden',margin:'6px 0'}}>
          <div style={{width:proyecto.pct,height:'100%',background:proyecto.barColor,borderRadius:4}}></div>
        </div>
        <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{proyecto.pct} consumido</div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-primary">+ Registrar horas</button>
      </div>
    </Modal>
  )
}

const proyectos = [
  {
    titulo:'Metalúrgica Goi · Digitalización almacén',periodo:'Mes 2 de 6 · Feb 2026 – Ago 2026',
    estado:'En plazo ✓',estadoColor:'rgba(34,160,107,0.12)',estadoTxt:'#22A06B',
    iconoBg:'rgba(34,160,107,0.12)',iconoStroke:'#22A06B',
    horas:'48h',horasTotal:'120h',pct:'40%',barColor:'#22A06B',tarifa:'100 €/h',margen:'72%',
    fases:['✓ Diagnóstico inicial','→ Implantación WMS · En curso','○ Formación equipo','○ Cierre y entrega'],
    tareas:[{l:'Configurar módulo de entradas de almacén',f:'Mié 19',done:false,urgent:false},{l:'Reunión kick-off fase 2 con Mikel',f:'Hecho',done:true},{l:'Documentar flujo actual de picking',f:'Jue 20',done:false}],
  },
  {
    titulo:'Digiform SL · Optimización procesos',periodo:'Mes 5 de 6 · Nov 2025 – May 2026',
    estado:'Últimas semanas',estadoColor:'rgba(46,90,140,0.1)',estadoTxt:'#2E5A8C',
    iconoBg:'rgba(46,90,140,0.1)',iconoStroke:'#2E5A8C',
    horas:'82h',horasTotal:'100h',pct:'82%',barColor:'#2E5A8C',tarifa:'88 €/h',margen:'58%',
    fases:['✓ Análisis procesos','✓ Rediseño flujos','✓ Implementación','→ Seguimiento y cierre · En curso'],
    tareas:[{l:'Revisar KPIs con Txema',f:'Hoy',done:false},{l:'Preparar informe cierre mes 5',f:'Vie 22',done:false},{l:'Propuesta ampliación proyecto',f:'May 2',done:false}],
  },
  {
    titulo:'Construcciones Mendía · RRHH digital',periodo:'Mes 3 de 3 · Feb 2026 – 23 abr 2026',
    estado:'⚡ Entrega en 5 días',estadoColor:'rgba(198,93,74,0.1)',estadoTxt:'#C65D4A',
    iconoBg:'rgba(198,93,74,0.1)',iconoStroke:'#C65D4A',
    horas:'68h',horasTotal:'72h',pct:'94%',barColor:'#C65D4A',tarifa:'106 €/h',margen:'74%',
    fases:['✓ Mapa de procesos RRHH','✓ Implementación software','→ Entrega y formación final · Urgente'],
    tareas:[{l:'Preparar documentación de entrega',f:'⚡ Hoy',done:false,urgent:true},{l:'Sesión de formación con Miren Mendía',f:'Lun 21',done:false},{l:'Emitir factura final del proyecto',f:'Mié 23',done:false}],
  },
]

function ProyectoCard({ p, onHoras, onDetalle }) {
  return (
    <div className="dia-card" style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14,flexWrap:'wrap',gap:10}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:p.iconoBg,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={p.iconoStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#1C2D44'}}>{p.titulo}</div>
            <div style={{fontSize:'0.74rem',color:'rgba(28,45,68,0.5)',marginTop:2}}>{p.periodo}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          <span style={{fontSize:'0.72rem',fontWeight:600,padding:'4px 10px',borderRadius:100,background:p.estadoColor,color:p.estadoTxt}}>{p.estado}</span>
          <button className="btn-ghost" style={{padding:'5px 10px',fontSize:'0.74rem'}} onClick={() => onHoras(p.titulo)}>+ Horas</button>
          <button className="btn-ghost" style={{padding:'5px 10px',fontSize:'0.74rem'}} onClick={() => onDetalle(p)}>Ver detalle</button>
        </div>
      </div>

      <div className="proy-grid">
        <div>
          <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Fases</div>
          {p.fases.map((f,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:f.startsWith('✓')?'#22A06B':f.startsWith('→')?p.iconoStroke:'rgba(28,45,68,0.15)',flexShrink:0}}></div>
              <span style={{fontSize:'0.78rem',color:f.startsWith('✓')?'rgba(28,45,68,0.6)':f.startsWith('→')?'#1C2D44':'rgba(28,45,68,0.4)',fontWeight:f.startsWith('→')?500:400,textDecoration:f.startsWith('✓')?'line-through':'none'}}>{f.replace('✓ ','').replace('→ ','').replace('○ ','')}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Time tracking</div>
          <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>{p.horas}</div>
          <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)',marginBottom:6}}>de {p.horasTotal} presupuestadas</div>
          <div style={{height:5,background:'rgba(28,45,68,0.08)',borderRadius:3,overflow:'hidden'}}>
            <div style={{width:p.pct,height:'100%',background:p.barColor,borderRadius:3}}></div>
          </div>
          <div style={{fontSize:'0.68rem',color:p.barColor==='#C65D4A'?'#C65D4A':'rgba(28,45,68,0.45)',marginTop:3}}>{p.pct} consumido</div>
        </div>
        <div>
          <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Rentabilidad</div>
          <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{p.tarifa}</div>
          <div style={{fontSize:'0.78rem',fontWeight:500,color:'#22A06B'}}>Margen: {p.margen}</div>
        </div>
      </div>

      <div style={{marginTop:12,paddingTop:12,borderTop:'0.5px solid rgba(28,45,68,0.06)'}}>
        <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Tareas activas</div>
        {p.tareas.map((t,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
            <input type="checkbox" defaultChecked={t.done} readOnly style={{accentColor:'#1C2D44'}}/>
            <span style={{fontSize:'0.78rem',color:t.urgent?'#C65D4A':t.done?'rgba(28,45,68,0.5)':'#1C2D44',fontWeight:t.urgent?500:400,textDecoration:t.done?'line-through':'none',flex:1}}>{t.l}</span>
            <span style={{fontSize:'0.68rem',color:t.urgent?'#C65D4A':'rgba(28,45,68,0.4)',fontWeight:t.urgent?600:400}}>{t.f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProyectosSection() {
  const [horasCliente, setHorasCliente] = useState(null)
  const [detalleProyecto, setDetalleProyecto] = useState(null)
  const [nuevoProyectoOpen, setNuevoProyectoOpen] = useState(false)

  return (
    <div>
      <ModalRegistrarHoras open={!!horasCliente} onClose={() => setHorasCliente(null)} cliente={horasCliente} />
      <ModalDetalleProyecto open={!!detalleProyecto} onClose={() => setDetalleProyecto(null)} proyecto={detalleProyecto} />
      <ModalNuevoProyecto open={nuevoProyectoOpen} onClose={() => setNuevoProyectoOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Proyectos</h1>
          <p className="page-subtitle">Time tracking, fases, rentabilidad y estado de cada proyecto activo.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA alerta: Construcciones Mendía entrega en 5 días · revisar horas</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Exportar</button>
          <button className="btn-primary" onClick={() => setNuevoProyectoOpen(true)}>+ Nuevo proyecto</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Proyectos activos</div><div className="dia-kpi-val">4</div><div className="dia-kpi-trend up">en ejecución</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Horas facturables · sem</div><div className="dia-kpi-val">28h</div><div className="dia-kpi-trend warn">↓ Objetivo: 34h</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Rentabilidad media</div><div className="dia-kpi-val">94 €/h</div><div className="dia-kpi-trend up">↑ P74 sector</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Margen neto</div><div className="dia-kpi-val">68%</div><div className="dia-kpi-trend up">↑ muy saludable</div></div>
      </div>

      {proyectos.map((p,i) => (
        <ProyectoCard key={i} p={p} onHoras={setHorasCliente} onDetalle={setDetalleProyecto} />
      ))}

      <div className="dia-card" style={{background:'#1C2D44'}}>
        <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'#BCD4E8',marginBottom:8}}>✦ IA · Análisis de proyectos</div>
        <div className="proy-ia-grid">
          {[{t:'⚡ Mendía: cierre en riesgo',d:'Entrega en 5 días y 94% horas consumidas. Considera facturar horas extra si superas las 72h.'},{t:'📊 Digiform: rentabilidad baja',d:'58% de margen vs 68% de media. Proyecto con más horas de las previstas. Revisar tarifa en el siguiente.'},{t:'✓ Metalúrgica: ritmo ideal',d:'40% horas en mes 2. Margen del 72%. Momento ideal para proponer ampliación de alcance.'}].map((item,i) => (
            <div key={i} style={{background:'rgba(250,247,242,0.06)',borderRadius:9,padding:12}}>
              <div style={{fontSize:'0.78rem',fontWeight:500,color:'#FAF7F2',marginBottom:4}}>{item.t}</div>
              <div style={{fontSize:'0.72rem',color:'rgba(250,247,242,0.6)',lineHeight:1.5}}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
