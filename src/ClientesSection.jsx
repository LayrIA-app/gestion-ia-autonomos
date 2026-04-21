import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import './sections.css'

/* 8 clientes · datos verbatim de la demo HTML (líneas 4873-4963). Cartera activa de Iker. */
const clientes = [
  {id:'metalurgica',   nombre:'Metalúrgica Goi',       contacto:'Mikel Goikoetxea', sector:'Industria · Metalurgia',  estado:'Activo',           eColor:'#22A06B',eBg:'rgba(34,160,107,0.12)', facturado:'2.400 €/mes', proyecto:'Digitalización almacén · F3',    inicio:'Feb 2025',   nps:82, iniciales:'MG', iColor:'#22A06B', iBg:'rgba(34,160,107,0.12)', email:'mikel@metalurgicagoi.eus',       tel:'+34 943 210 450', cif:'B-48291034', direccion:'Pol. Ind. Ugaldeguren, 12 · Zamudio',     empleados:'85', facturacion_anual:'12M €'},
  {id:'digiform',      nombre:'Digiform SL',           contacto:'Txema García',     sector:'Formación · Digital',     estado:'Activo',           eColor:'#22A06B',eBg:'rgba(34,160,107,0.12)', facturado:'1.800 €/mes', proyecto:'Optimización procesos · M2',     inicio:'Nov 2025',   nps:74, iniciales:'D',  iColor:'#2E5A8C', iBg:'rgba(46,90,140,0.12)',  email:'txema@digiformsl.com',           tel:'+34 944 123 456', cif:'B-48391045', direccion:'Gran Vía, 45 · Bilbao',                   empleados:'12', facturacion_anual:'2.4M €', alerta:'⚡ pend.'},
  {id:'mendia',        nombre:'Construcciones Mendía', contacto:'Miren Mendía',     sector:'Construcción · Reforma',  estado:'Iguala',           eColor:'#2E5A8C',eBg:'rgba(188,212,232,0.3)', facturado:'1.200 €/mes', proyecto:'Digitalización RRHH · M4',       inicio:'Ene 2026',   nps:71, iniciales:'CM', iColor:'#2E5A8C', iBg:'rgba(46,90,140,0.1)',   email:'miren@mendiaconstrucciones.com', tel:'+34 944 567 890', cif:'B-48567890', direccion:'Avda. Lehendakari Aguirre, 22 · Bilbao',  empleados:'34', facturacion_anual:'5.1M €'},
  {id:'garapen',       nombre:'Garapen Consulting',    contacto:'Ane Zubiria',      sector:'Consultoría · RRHH',      estado:'Activo',           eColor:'#22A06B',eBg:'rgba(34,160,107,0.12)', facturado:'3.200 €/mes', proyecto:'Estrategia internacional · M1',  inicio:'Mar 2026',   nps:88, iniciales:'GC', iColor:'#8B5E34', iBg:'rgba(212,165,116,0.15)',email:'ane@garapenconsulting.eus',      tel:'+34 943 345 678', cif:'B-20345678', direccion:'Zubieta 4 · San Sebastián',               empleados:'15', facturacion_anual:'1.8M €'},
  {id:'innotek',       nombre:'Innotek Basque',        contacto:'Gorka Etxeberria', sector:'Tecnología · I+D',        estado:'Activo',           eColor:'#22A06B',eBg:'rgba(34,160,107,0.12)', facturado:'2.100 €/mes', proyecto:'Transformación ágil · M6',       inicio:'Oct 2025',   nps:79, iniciales:'IB', iColor:'#2E5A8C', iBg:'rgba(46,90,140,0.1)',   email:'gorka@innotek.eus',              tel:'+34 946 234 567', cif:'A-48234567', direccion:'Parque Tecnológico, 123 · Zamudio',       empleados:'42', facturacion_anual:'6.8M €'},
  {id:'bodegas',       nombre:'Bodegas Iriarte',       contacto:'Ana Ruiz',         sector:'Agroalimentario · Vino',  estado:'En negociación',   eColor:'#8B5E34',eBg:'rgba(212,165,116,0.2)', facturado:'28.000 € potencial', proyecto:'Estrategia digital · propuesta', inicio:'Mar 2026',   nps:null, iniciales:'BI', iColor:'#C65D4A', iBg:'rgba(198,93,74,0.1)',   email:'ana@bodegasiriarte.com',         tel:'+34 945 678 901', cif:'A-01234567', direccion:'Ctra. Laguardia, km 3 · Álava',           empleados:'28', facturacion_anual:'4.2M €', destacado:true},
  {id:'onati',         nombre:'Talleres Oñati',        contacto:'Joseba Aranburu',  sector:'Industria · Mecanizado',  estado:'Propuesta enviada',eColor:'#2E5A8C',eBg:'rgba(188,212,232,0.25)',facturado:'8.500 € potencial',  proyecto:'Lean manufacturing · auditoría', inicio:'Abr 2026',   nps:null, iniciales:'TO', iColor:'#2E5A8C', iBg:'rgba(46,90,140,0.1)',   email:'joseba@tallerasonati.com',       tel:'+34 943 780 123', cif:'B-20780123', direccion:'Pol. Ind. Muxoa · Oñati',                 empleados:'22', facturacion_anual:'3.2M €', destacado:true},
  {id:'arquia',        nombre:'Arquia Arquitectura',   contacto:'Leire Otxoa',      sector:'Servicios · Arquitectura',estado:'Lead',             eColor:'rgba(28,45,68,0.5)',eBg:'rgba(28,45,68,0.06)',facturado:'Por definir',     proyecto:'Digitalización estudio · lead',  inicio:'Abr 2026',   nps:null, iniciales:'AA', iColor:'rgba(28,45,68,0.6)', iBg:'rgba(28,45,68,0.06)', email:'leire@arquia.eus',                tel:'+34 944 901 234', cif:'B-48901234', direccion:'Henao 45 · Bilbao',                       empleados:'8',  facturacion_anual:'0.9M €'},
]

/* Pipeline kanban · 5 columnas verbatim de la demo HTML (líneas 4972-5069). */
const kanban = [
  {col:'Lead',             titleColor:'rgba(28,45,68,0.5)', color:'rgba(28,45,68,0.04)',   border:'rgba(28,45,68,0.08)',   items:[
    {nombre:'Arquia Arquitectura', sub:'Leire Otxoa',      meta:'Digitalización estudio',     footer:'Lead captado: 2 abr'},
  ]},
  {col:'Propuesta',        titleColor:'#2E5A8C',            color:'rgba(46,90,140,0.04)',  border:'rgba(46,90,140,0.15)',  items:[
    {nombre:'Talleres Oñati',      sub:'Joseba Aranburu',  meta:'Lean manufacturing',         val:'8.500 €',  valColor:'#2E5A8C', footer:'Enviada: 14 abr'},
  ]},
  {col:'Negociación',      titleColor:'#8B5E34',            color:'rgba(212,165,116,0.06)', border:'rgba(212,165,116,0.3)', items:[
    {nombre:'Bodegas Iriarte',     sub:'Ana Ruiz',         meta:'Estrategia digital',         val:'28.000 €', valColor:'#D4A574', footer:'Reunión: mañana 09h', urgent:'⚡ Decide hoy'},
  ]},
  {col:'Activo',           titleColor:'#22A06B',            color:'rgba(34,160,107,0.04)', border:'rgba(34,160,107,0.15)', items:[
    {nombre:'Garapen Consulting',  val:'3.200 €/mes',      valColor:'#22A06B', meta:'NPS 88 · M1'},
    {nombre:'Metalúrgica Goi',     val:'2.400 €/mes',      valColor:'#22A06B', meta:'NPS 82 · F3'},
    {nombre:'Innotek Basque',      val:'2.100 €/mes',      valColor:'#22A06B', meta:'NPS 79 · M6'},
    {nombre:'Digiform SL',         val:'1.800 €/mes',      valColor:'#22A06B', meta:'NPS 74 · M2 ⚠️'},
    {nombre:'Construcciones Mendía', val:'1.200 €/mes',    valColor:'#2E5A8C', meta:'Iguala · M4'},
  ]},
  {col:'Pausado',          titleColor:'rgba(28,45,68,0.4)', color:'rgba(28,45,68,0.02)',   border:'rgba(28,45,68,0.06)',   empty:true, items:[]},
]

function ModalFichaCliente({ open, onClose, cliente }) {
  if (!cliente) return null
  return (
    <Modal open={open} onClose={onClose} maxWidth={560}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
        <div style={{width:48,height:48,borderRadius:12,background:cliente.iBg,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:600,color:cliente.iColor,flexShrink:0}}>{cliente.iniciales}</div>
        <div><div className="dm-title" style={{marginBottom:2}}>{cliente.nombre}</div><div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.55)'}}>{cliente.sector}</div></div>
        <span style={{marginLeft:'auto',fontSize:'0.72rem',fontWeight:600,padding:'4px 10px',borderRadius:100,background:cliente.eBg,color:cliente.eColor}}>{cliente.estado}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        <div className="dm-info-box"><div className="dm-info-lbl">Contacto principal</div><div className="dm-info-val"><strong>{cliente.contacto}</strong><br/>{cliente.email}<br/>{cliente.tel}</div></div>
        <div className="dm-info-box"><div className="dm-info-lbl">Empresa</div><div className="dm-info-val">{cliente.empleados} empleados<br/>{cliente.facturacion_anual} facturación<br/>{cliente.cif}</div></div>
        <div className="dm-info-box"><div className="dm-info-lbl">Proyecto actual</div><div className="dm-info-val">{cliente.proyecto}<br/>Inicio: {cliente.inicio}</div></div>
        <div className="dm-info-box"><div className="dm-info-lbl">Facturado total</div><div className="dm-info-val" style={{fontFamily:'var(--serif)',fontSize:'1.1rem',color:'#1C2D44'}}>{cliente.facturado}</div></div>
      </div>
      <div className="dm-info-box" style={{background:'rgba(28,45,68,0.02)',marginBottom:14}}>
        <div className="dm-info-lbl">Dirección</div>
        <div className="dm-info-val">{cliente.direccion}</div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-ghost" onClick={() => { showToast('Nueva propuesta para '+cliente.nombre+' · IA lo prepara','info'); onClose() }}>Nueva propuesta</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Abriendo proyecto de '+cliente.nombre,'info'); onClose() }}>Ir al proyecto →</button>
      </div>
    </Modal>
  )
}

function ModalNuevoCliente({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Nuevo cliente" subtitle="La IA enriquecerá el perfil automáticamente">
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Nombre empresa</div><input className="dm-input" type="text" placeholder="Empresa SL"/></div>
        <div className="dm-field"><div className="dm-label">Sector</div><input className="dm-input" type="text" placeholder="Industria · Tech..."/></div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Contacto principal</div><input className="dm-input" type="text" placeholder="Nombre y apellidos"/></div>
        <div className="dm-field"><div className="dm-label">Email</div><input className="dm-input" type="email" placeholder="contacto@empresa.com"/></div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Teléfono</div><input className="dm-input" type="tel" placeholder="+34 600 000 000"/></div>
        <div className="dm-field"><div className="dm-label">Estado inicial</div><select className="dm-select"><option>Lead frío</option><option>Propuesta enviada</option><option>Negociación</option><option>Cliente activo</option></select></div>
      </div>
      <div className="dm-field"><div className="dm-label">Notas</div><textarea className="dm-textarea" placeholder="Contexto del cliente, cómo llegó, necesidades..."/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Cliente creado · IA enriquecerá el perfil','ok'); onClose() }}>✦ Crear cliente</button>
      </div>
    </Modal>
  )
}

function ModalImportCSV({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Importar clientes" subtitle="Sube un CSV y la IA detecta duplicados automáticamente">
      <div className="dm-field">
        <div style={{border:'1.5px dashed rgba(28,45,68,0.2)',borderRadius:10,padding:24,textAlign:'center',background:'rgba(28,45,68,0.02)',cursor:'pointer',marginBottom:4}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.05)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(28,45,68,0.02)'}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E5A8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:8}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Arrastra tu CSV aquí o haz clic para subir</div>
          <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>Columnas: Nombre, Email, Teléfono, Empresa, Sector</div>
        </div>
      </div>
      <div style={{padding:10,background:'rgba(46,90,140,0.06)',borderRadius:8,marginBottom:14}}>
        <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#2E5A8C',marginBottom:4}}>IA · Detectará automáticamente</div>
        <div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.7)'}}>Duplicados · Datos incompletos · Formato de columnas · Enriquecimiento con LinkedIn</div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={onClose}>Importar →</button>
      </div>
    </Modal>
  )
}

export default function ClientesSection() {
  const [fichaCliente, setFichaCliente] = useState(null)
  const [nuevoCliente, setNuevoCliente] = useState(false)
  const [importCSVOpen, setImportCSVOpen] = useState(false)

  return (
    <div>
      <ModalFichaCliente open={!!fichaCliente} onClose={() => setFichaCliente(null)} cliente={fichaCliente} />
      <ModalNuevoCliente open={nuevoCliente} onClose={() => setNuevoCliente(false)} />
      <ModalImportCSV open={importCSVOpen} onClose={() => setImportCSVOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">Tu cartera activa · 8 clientes · Pipeline comercial gestionado por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA detectó oportunidad de upsell en Metalúrgica Goi · NPS 82</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => setImportCSVOpen(true)}>Importar</button>
          <button className="btn-primary" onClick={() => setNuevoCliente(true)}>+ Nuevo cliente</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Clientes activos</div><div className="dia-kpi-val">8</div><div className="dia-kpi-trend up">↑ +2 este mes</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturación media</div><div className="dia-kpi-val">1.425 €</div><div className="dia-kpi-trend up">↑ /mes por cliente</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">NPS promedio</div><div className="dia-kpi-val">78</div><div className="dia-kpi-trend up">↑ Sector: 58</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">En pipeline</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ 1 decide esta semana</div></div>
      </div>

      {/* Tabla clientes · 8 filas · ordenados por última actividad */}
      <div className="dia-card" style={{marginBottom:14}}>
        <div className="dia-card-head"><div className="dia-card-ttl">Todos los clientes</div><div className="dia-card-sub">Ordenados por última actividad · pulsa cualquier fila para la ficha</div></div>
        <div className="resp-table-wrap">
          <table className="resp-table" style={{fontSize:'0.82rem'}}>
            <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
              {['Cliente','Proyecto','Facturación','Estado','NPS',''].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {clientes.map((c,i) => (
                <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.05)',cursor:'pointer',background:c.destacado?'rgba(212,165,116,0.03)':c.estado==='Lead'?'rgba(188,212,232,0.04)':'',transition:'background .15s'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.02)'} onMouseLeave={e=>e.currentTarget.style.background=c.destacado?'rgba(212,165,116,0.03)':c.estado==='Lead'?'rgba(188,212,232,0.04)':''} onClick={() => setFichaCliente(c)}>
                  <td style={{padding:'11px 12px'}}>
                    <strong style={{color:'#1C2D44'}}>{c.nombre}</strong>
                    <br/>
                    <span style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)'}}>{c.contacto} · {c.email}</span>
                  </td>
                  <td style={{padding:'11px 12px',color:'rgba(28,45,68,0.7)'}}>{c.proyecto}</td>
                  <td style={{padding:'11px 12px',fontWeight:600,color:c.alerta?'#C65D4A':c.destacado?'#D4A574':'#1C2D44'}}>
                    {c.facturado}
                    {c.alerta && <span style={{fontSize:'0.66rem',fontWeight:400,marginLeft:6}}>{c.alerta}</span>}
                  </td>
                  <td style={{padding:'11px 12px'}}><span style={{fontSize:'0.7rem',fontWeight:600,padding:'3px 8px',borderRadius:100,background:c.eBg,color:c.eColor}}>{c.estado}</span></td>
                  <td style={{padding:'11px 12px',fontWeight:500,color:c.nps?'#1C2D44':'rgba(28,45,68,0.35)'}}>{c.nps || '—'}</td>
                  <td style={{padding:'11px 12px'}}><button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}} onClick={e=>{e.stopPropagation();setFichaCliente(c)}}>Ficha →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pipeline kanban · 5 columnas */}
      <div className="dia-card">
        <div className="dia-card-head"><div className="dia-card-ttl">Pipeline de ventas</div><div className="dia-card-sub">Estado de cada oportunidad</div></div>
        <div className="cl-kanban">
          {kanban.map((col,i) => (
            <div key={i} style={{background:col.color,border:`0.5px solid ${col.border}`,borderRadius:12,padding:14,opacity:col.empty?0.7:1}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <span style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:col.titleColor}}>{col.col}</span>
                <span style={{fontSize:'0.68rem',fontWeight:600,background:col.border,color:col.titleColor,padding:'1px 7px',borderRadius:100}}>{col.items.length}</span>
              </div>
              {col.empty && <div style={{textAlign:'center',padding:'20px 10px',fontSize:'0.74rem',color:'rgba(28,45,68,0.35)'}}>Sin clientes pausados</div>}
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {col.items.map((item,j) => (
                  <div key={j} style={{padding:12,background:'#FFFFFF',border:`0.5px solid ${item.urgent?'rgba(212,165,116,0.3)':col.border}`,borderRadius:9,cursor:'pointer',position:'relative'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(28,45,68,0.1)'} onMouseLeave={e=>e.currentTarget.style.boxShadow=''}>
                    {item.urgent && <div style={{position:'absolute',top:8,right:8,fontSize:'0.6rem',fontWeight:600,background:'rgba(198,93,74,0.1)',color:'#C65D4A',padding:'1px 6px',borderRadius:100}}>{item.urgent}</div>}
                    <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{item.nombre}</div>
                    {item.sub && <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)',marginBottom:item.val?6:4}}>{item.sub}</div>}
                    {item.val && <div style={{fontSize:'0.78rem',fontWeight:600,color:item.valColor,marginBottom:4}}>{item.val}</div>}
                    {item.meta && <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.45)'}}>{item.meta}</div>}
                    {item.footer && <div style={{marginTop:8,paddingTop:8,borderTop:'0.5px solid rgba(28,45,68,0.06)',fontSize:'0.66rem',color:'rgba(28,45,68,0.4)'}}>{item.footer}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
