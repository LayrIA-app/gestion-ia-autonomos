import { useState } from 'react'
import Modal from './Modal'
import './sections.css'

const clientes = [
  {id:'metalurgica',nombre:'Metalúrgica Goi',contacto:'Mikel Goikoetxea',sector:'Industria · Metalurgia',estado:'Activo',eColor:'#22A06B',eBg:'rgba(34,160,107,0.1)',facturado:'12.000 €',proyecto:'Digitalización almacén',inicio:'Feb 2025',iniciales:'MG',iColor:'#22A06B',iBg:'rgba(34,160,107,0.12)',email:'mikel@metalurgicagoi.eus',tel:'+34 943 210 450',cif:'B-48291034',direccion:'Pol. Ind. Ugaldeguren, 12 · Zamudio',empleados:'85',facturacion_anual:'12M €'},
  {id:'digiform',nombre:'Digiform SL',contacto:'Txema García',sector:'Formación · Digital',estado:'Activo',eColor:'#22A06B',eBg:'rgba(34,160,107,0.1)',facturado:'9.000 €',proyecto:'Optimización procesos',inicio:'Nov 2025',iniciales:'D',iColor:'#2E5A8C',iBg:'rgba(46,90,140,0.12)',email:'txema@digiformsl.com',tel:'+34 944 123 456',cif:'B-48391045',direccion:'Gran Vía, 45 · Bilbao',empleados:'12',facturacion_anual:'2.4M €'},
  {id:'bodegas',nombre:'Bodegas Iriarte',contacto:'Ana Ruiz',sector:'Agroalimentario · Vino',estado:'Propuesta',eColor:'#C65D4A',eBg:'rgba(198,93,74,0.1)',facturado:'—',proyecto:'Estrategia digital',inicio:'Mar 2026',iniciales:'BI',iColor:'#C65D4A',iBg:'rgba(198,93,74,0.1)',email:'ana@bodegasiriarte.com',tel:'+34 945 678 901',cif:'A-01234567',direccion:'Ctra. Laguardia, km 3 · Álava',empleados:'28',facturacion_anual:'4.2M €'},
  {id:'garapen',nombre:'Garapen Consulting',contacto:'Ane Etxebarria',sector:'Consultoría · RRHH',estado:'Activo',eColor:'#22A06B',eBg:'rgba(34,160,107,0.1)',facturado:'6.000 €',proyecto:'Planificación Q2',inicio:'Ene 2026',iniciales:'GC',iColor:'#8B5E34',iBg:'rgba(212,165,116,0.15)',email:'ane@garapenconsulting.eus',tel:'+34 943 345 678',cif:'B-20345678',direccion:'Zubieta 4 · San Sebastián',empleados:'15',facturacion_anual:'1.8M €'},
  {id:'innotek',nombre:'Innotek Basque',contacto:'Iker Mendoza',sector:'Tecnología · I+D',estado:'Activo',eColor:'#22A06B',eBg:'rgba(34,160,107,0.1)',facturado:'4.800 €',proyecto:'Consultoría digital',inicio:'Oct 2025',iniciales:'IB',iColor:'#2E5A8C',iBg:'rgba(46,90,140,0.1)',email:'iker@innotekbasque.eus',tel:'+34 946 234 567',cif:'A-48234567',direccion:'Parque Tecnológico, 123 · Zamudio',empleados:'42',facturacion_anual:'6.8M €'},
]

const kanban = [
  {col:'Lead frío',color:'rgba(28,45,68,0.04)',border:'rgba(28,45,68,0.08)',items:[{nombre:'Construcciones Mendía',val:'7.200 €',sub:'Contacto inicial'},{nombre:'Agintech SL',val:'?',sub:'LinkedIn · frío'}]},
  {col:'Propuesta enviada',color:'rgba(46,90,140,0.04)',border:'rgba(46,90,140,0.15)',items:[{nombre:'Bodegas Iriarte',val:'28.000 €',sub:'Reunión mañana ⚡',urgent:true}]},
  {col:'Negociación',color:'rgba(212,165,116,0.06)',border:'rgba(212,165,116,0.2)',items:[{nombre:'Digiform SL',val:'8.500 €',sub:'Ampliación retainer'}]},
  {col:'Cliente activo',color:'rgba(34,160,107,0.04)',border:'rgba(34,160,107,0.15)',items:[{nombre:'Metalúrgica Goi',val:'2.400/mes',sub:'Mes 3/6 ✓'},{nombre:'Garapen Consulting',val:'2.000/mes',sub:'Mes 2/6 ✓'},{nombre:'Innotek Basque',val:'1.600/mes',sub:'Mes 4/6 ✓'}]},
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
        <button className="dm-btn-ghost">Nueva propuesta</button>
        <button className="dm-btn-primary">Ir al proyecto →</button>
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
        <button className="dm-btn-primary">✦ Crear cliente</button>
      </div>
    </Modal>
  )
}

export default function ClientesSection() {
  const [fichaCliente, setFichaCliente] = useState(null)
  const [nuevoCliente, setNuevoCliente] = useState(false)

  return (
    <div>
      <ModalFichaCliente open={!!fichaCliente} onClose={() => setFichaCliente(null)} cliente={fichaCliente} />
      <ModalNuevoCliente open={nuevoCliente} onClose={() => setNuevoCliente(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">CRM de clientes activos · Pipeline de ventas · Historial completo.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA detecta oportunidad: Innotek lleva 3 meses sin propuesta de ampliación</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Exportar</button>
          <button className="btn-primary" onClick={() => setNuevoCliente(true)}>+ Nuevo cliente</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Clientes activos</div><div className="dia-kpi-val">5</div><div className="dia-kpi-trend up">↑ 2 este trimestre</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturación mensual</div><div className="dia-kpi-val">9.600 €</div><div className="dia-kpi-trend up">↑ retainers activos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Pipeline activo</div><div className="dia-kpi-val">39.700 €</div><div className="dia-kpi-trend up">en negociación</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">NPS medio</div><div className="dia-kpi-val">78</div><div className="dia-kpi-trend up">↑ excelente</div></div>
      </div>

      {/* Tabla clientes */}
      <div className="dia-card" style={{marginBottom:14}}>
        <div className="dia-card-head"><div className="dia-card-ttl">Clientes activos</div><div className="dia-card-sub">Pulsa en cualquier fila para ver la ficha completa</div></div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.84rem',minWidth:600}}>
            <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
              {['Cliente','Contacto','Sector','Proyecto actual','Facturado','Estado',''].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',textAlign:'left',fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {clientes.map((c,i) => (
                <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',cursor:'pointer',transition:'background .15s'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.02)'} onMouseLeave={e=>e.currentTarget.style.background=''} onClick={() => setFichaCliente(c)}>
                  <td style={{padding:12}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:32,height:32,borderRadius:8,background:c.iBg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:700,color:c.iColor,flexShrink:0}}>{c.iniciales}</div>
                      <span style={{fontWeight:500,color:'#1C2D44'}}>{c.nombre}</span>
                    </div>
                  </td>
                  <td style={{padding:12,color:'rgba(28,45,68,0.7)'}}>{c.contacto}</td>
                  <td style={{padding:12,color:'rgba(28,45,68,0.6)',fontSize:'0.8rem'}}>{c.sector}</td>
                  <td style={{padding:12,color:'rgba(28,45,68,0.7)'}}>{c.proyecto}</td>
                  <td style={{padding:12,fontWeight:500,color:'#1C2D44'}}>{c.facturado}</td>
                  <td style={{padding:12}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:100,background:c.eBg,color:c.eColor}}>{c.estado}</span></td>
                  <td style={{padding:12}}><button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={e=>{e.stopPropagation();setFichaCliente(c)}}>Ver ficha →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pipeline kanban */}
      <div className="dia-card">
        <div className="dia-card-head"><div className="dia-card-ttl">Pipeline de ventas</div><div className="dia-card-sub">Estado de cada oportunidad</div></div>
        <div className="cl-kanban">
          {kanban.map((col,i) => (
            <div key={i} style={{background:col.color,border:`0.5px solid ${col.border}`,borderRadius:10,padding:14}}>
              <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>{col.col}</div>
              {col.items.map((item,j) => (
                <div key={j} style={{padding:10,background:'#FFFFFF',borderRadius:8,marginBottom:8,border:`0.5px solid ${item.urgent?'rgba(198,93,74,0.3)':'rgba(28,45,68,0.08)'}`,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(28,45,68,0.1)'} onMouseLeave={e=>e.currentTarget.style.boxShadow=''}>
                  <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>{item.nombre}</div>
                  <div style={{fontSize:'0.73rem',color:item.urgent?'#C65D4A':'rgba(28,45,68,0.55)'}}>{item.sub}</div>
                  {item.val !== '?' && <div style={{fontFamily:'var(--serif)',fontSize:'0.9rem',fontWeight:500,color:'#1C2D44',marginTop:4}}>{item.val}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
