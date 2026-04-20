import { useState } from 'react'
import Modal from './Modal'
import './sections.css'

const cats = ['Comida de trabajo','Transporte','Material oficina','Software','Formación','Otros']

const ticketsData = [
  {icoColor:'#C65D4A',concepto:'Ticket restaurante · 47,20 €',desc:'Hoy · IA detecta: Comida de trabajo · 100% deducible · Con cliente Mikel Goikoetxea',catInicial:'Comida de trabajo'},
  {icoColor:'#D4A574',concepto:'Gasolinera · 68,40 €',desc:'Ayer · IA detecta: Transporte · 50% deducible · Desplazamiento cliente San Sebastián',catInicial:'Transporte'},
  {icoColor:'#2E5A8C',concepto:'Apple iCloud Storage · 2,99 €',desc:'16 abr · IA detecta: Software/Suscripción · 100% deducible',catInicial:'Software'},
]

const gastosData = [
  {concepto:'Claude Pro · Suscripción',cat:'Software',cBg:'rgba(46,90,140,0.1)',cColor:'#2E5A8C',fecha:'15 abr',imp:'20,00 €',ded:'100% ✓',dColor:'#22A06B'},
  {concepto:'Notion · Suscripción anual',cat:'Software',cBg:'rgba(46,90,140,0.1)',cColor:'#2E5A8C',fecha:'12 abr',imp:'96,00 €',ded:'100% ✓',dColor:'#22A06B'},
  {concepto:'Comida con Mikel Goikoetxea',cat:'Comida trabajo',cBg:'rgba(212,165,116,0.2)',cColor:'#8B5E34',fecha:'10 abr',imp:'63,40 €',ded:'100% ✓',dColor:'#22A06B'},
  {concepto:'Desplazamiento Bilbao · tren',cat:'Transporte',cBg:'rgba(188,212,232,0.3)',cColor:'#2E5A8C',fecha:'08 abr',imp:'24,80 €',ded:'100% ✓',dColor:'#22A06B'},
  {concepto:'Material oficina · papelería',cat:'Material',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'05 abr',imp:'38,50 €',ded:'100% ✓',dColor:'#22A06B'},
  {concepto:'Gasolina · visitas clientes',cat:'Transporte',cBg:'rgba(188,212,232,0.3)',cColor:'#2E5A8C',fecha:'03 abr',imp:'54,20 €',ded:'50%',dColor:'#D4A574'},
  {concepto:'Curso IA aplicada a consultoría',cat:'Formación',cBg:'rgba(34,160,107,0.1)',cColor:'#22A06B',fecha:'01 abr',imp:'297,00 €',ded:'100% ✓',dColor:'#22A06B'},
]

function ModalNuevoGasto({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Nuevo gasto" subtitle="La IA clasificará automáticamente y calculará la deducibilidad">
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Concepto</div><input className="dm-input" type="text" placeholder="Ej: Comida de trabajo · Material..."/></div>
        <div className="dm-field"><div className="dm-label">Importe</div><input className="dm-input" type="text" placeholder="0,00 €"/></div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Fecha</div><input className="dm-input" type="date" defaultValue="2026-04-18"/></div>
        <div className="dm-field"><div className="dm-label">Categoría</div><select className="dm-select">{cats.map(c => <option key={c}>{c}</option>)}</select></div>
      </div>
      <div className="dm-field"><div className="dm-label">Deducibilidad</div>
        <select className="dm-select"><option>100% deducible</option><option>50% deducible</option><option>No deducible</option></select>
      </div>
      <div className="dm-field"><div className="dm-label">Notas</div><textarea className="dm-textarea" placeholder="Con qué cliente, para qué proyecto..."/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">✦ Añadir gasto</button>
      </div>
    </Modal>
  )
}

function ModalOCR({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Subir ticket · OCR" subtitle="La IA extraerá automáticamente todos los datos">
      <div style={{border:'2px dashed rgba(28,45,68,0.15)',borderRadius:12,padding:32,textAlign:'center',marginBottom:14,cursor:'pointer',background:'rgba(28,45,68,0.02)'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#1C2D44'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(28,45,68,0.15)'}>
        <div style={{fontSize:'2rem',marginBottom:8}}>📷</div>
        <div style={{fontSize:'0.86rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Arrastra la foto aquí</div>
        <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.5)'}}>o pulsa para seleccionar · JPG, PNG, PDF</div>
      </div>
      <div style={{padding:10,background:'rgba(46,90,140,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#2E5A8C'}}>✦ La IA extrae proveedor, importe, IVA y fecha. Tú solo confirmas.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">Procesar con IA</button>
      </div>
    </Modal>
  )
}

function Ticket({ ticket, onConfirm }) {
  const [cat, setCat] = useState(ticket.catInicial)
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) return (
    <div style={{padding:14,background:'rgba(34,160,107,0.06)',border:'0.5px solid rgba(34,160,107,0.2)',borderRadius:10,display:'flex',alignItems:'center',gap:12}}>
      <div style={{width:38,height:38,borderRadius:9,background:'rgba(34,160,107,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22A06B" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div>
        <div style={{fontSize:'0.86rem',fontWeight:500,color:'#1C2D44'}}>{ticket.concepto}</div>
        <div style={{fontSize:'0.73rem',color:'#22A06B'}}>✓ Confirmado como {cat} · añadido al libro de gastos</div>
      </div>
    </div>
  )

  return (
    <div style={{display:'flex',alignItems:'center',gap:14,padding:14,background:'rgba(198,93,74,0.04)',border:'0.5px solid rgba(198,93,74,0.15)',borderRadius:10,flexWrap:'wrap'}}>
      <div style={{width:38,height:38,borderRadius:9,background:ticket.icoColor,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      </div>
      <div style={{flex:1,minWidth:180}}>
        <div style={{fontSize:'0.86rem',fontWeight:500,color:'#1C2D44'}}>{ticket.concepto}</div>
        <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)'}}>{ticket.desc}</div>
      </div>
      <select value={cat} onChange={e => setCat(e.target.value)} style={{fontSize:'0.76rem',padding:'5px 8px',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:7,fontFamily:'var(--sans)',color:'#1C2D44',background:'#FFFFFF'}}>
        {cats.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button onClick={() => setConfirmed(true)} style={{padding:'7px 14px',background:'#1C2D44',border:'none',borderRadius:8,fontFamily:'var(--sans)',fontSize:'0.78rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer',whiteSpace:'nowrap'}}>Confirmar ✓</button>
    </div>
  )
}

function ModalImportarContable({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="↑ Importar gastos" subtitle="Importa desde tu herramienta de facturación o sube un fichero">
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:14}}>
        {[
          {ico:'H',bg:'#1C2D44',nombre:'Holded',desc:'Importa facturas y gastos automáticamente'},
          {ico:'C',bg:'#2E5A8C',nombre:'Contasimple',desc:'Sincroniza gastos e IVA soportado'},
          {ico:'B',bg:'#22A06B',nombre:'Billin',desc:'Importa desde tu cuenta de Billin'},
          {ico:'F',bg:'#8B5E34',nombre:'Factura Directa',desc:'Conecta y sincroniza automáticamente'},
        ].map((t,i) => (
          <div key={i} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:14,padding:14,background:'rgba(28,45,68,0.03)',border:'0.5px solid rgba(28,45,68,0.1)',borderRadius:10}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.06)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(28,45,68,0.03)'}>
            <div style={{width:36,height:36,borderRadius:9,background:t.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',color:'#FAF7F2',fontWeight:700,flexShrink:0}}>{t.ico}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>{t.nombre}</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{t.desc}</div>
            </div>
            <span style={{fontSize:'0.72rem',color:'#2E5A8C',fontWeight:500}}>Conectar →</span>
          </div>
        ))}
        <div style={{height:1,background:'rgba(28,45,68,0.08)',margin:'4px 0'}}></div>
        <div style={{cursor:'pointer',display:'flex',alignItems:'center',gap:14,padding:14,background:'rgba(28,45,68,0.03)',border:'0.5px solid rgba(28,45,68,0.1)',borderRadius:10}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.06)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(28,45,68,0.03)'}>
          <div style={{width:36,height:36,borderRadius:9,background:'rgba(46,90,140,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E5A8C" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>Subir fichero CSV / Excel</div>
            <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>Exporta desde cualquier herramienta y sube el fichero</div>
          </div>
          <span style={{fontSize:'0.72rem',color:'#2E5A8C',fontWeight:500}}>Subir →</span>
        </div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  )
}

export default function GastosSection() {
  const [nuevoOpen, setNuevoOpen] = useState(false)
  const [ocrOpen, setOcrOpen] = useState(false)
  const [importarOpen, setImportarOpen] = useState(false)

  return (
    <div>
      <ModalNuevoGasto open={nuevoOpen} onClose={() => setNuevoOpen(false)} />
      <ModalOCR open={ocrOpen} onClose={() => setOcrOpen(false)} />
      <ModalImportarContable open={importarOpen} onClose={() => setImportarOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Gastos</h1>
          <p className="page-subtitle">Todos tus gastos, tickets y su deducibilidad fiscal — gestionados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA procesó 3 tickets OCR · 68,40€ deducible pendiente de confirmar</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => setOcrOpen(true)}>📷 Subir ticket</button>
          <button className="btn-ghost" onClick={() => setImportarOpen(true)}>↑ Importar</button>
          <button className="btn-primary" onClick={() => setNuevoOpen(true)}>+ Nuevo gasto</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Gastos · abril</div><div className="dia-kpi-val">3.840 €</div><div className="dia-kpi-trend up">↓ -8% vs marzo</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Deducibles</div><div className="dia-kpi-val">3.120 €</div><div className="dia-kpi-trend up">81% del total</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tickets pendientes</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ sin clasificar</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Ahorro fiscal est.</div><div className="dia-kpi-val">749 €</div><div className="dia-kpi-trend up">este trimestre</div></div>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div><div className="dia-card-ttl">Tickets pendientes · la IA sugiere clasificación</div><div className="dia-card-sub">Confirma o edita — se añaden automáticamente al libro de gastos</div></div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {ticketsData.map((t,i) => <Ticket key={i} ticket={t} />)}
          </div>
        </div>

        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Historial de gastos · abril 2026</div><div className="dia-card-sub">Ordenados por fecha</div></div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.83rem',minWidth:600}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                {['Concepto','Categoría','Fecha','Importe','Deducible',''].map((h,i) => (
                  <th key={i} style={{padding:'8px 12px',textAlign:i===3?'right':'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {gastosData.map((g,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.05)'}}>
                    <td style={{padding:'10px 12px',fontWeight:500,color:'#1C2D44'}}>{g.concepto}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:g.cBg,color:g.cColor,fontWeight:600}}>{g.cat}</span></td>
                    <td style={{padding:'10px 12px',color:'rgba(28,45,68,0.55)'}}>{g.fecha}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontWeight:500,color:'#1C2D44'}}>{g.imp}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.72rem',fontWeight:600,color:g.dColor}}>{g.ded}</span></td>
                    <td style={{padding:'10px 12px'}}><button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}} onClick={() => {}}>Editar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
