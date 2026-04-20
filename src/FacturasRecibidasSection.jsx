import { useState } from 'react'
import Modal from './Modal'
import './sections.css'

const th = {padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}

const canales = [
  {ico:'📧',label:'Email reenvío',sub:'gastos.iker@coaxionia.app',badge:'Activo · 8 docs',active:true},
  {ico:'📷',label:'Foto / OCR',sub:'App móvil o web',badge:'Activo · 3 docs',active:true},
  {ico:'👤',label:'Portal Cliente',sub:'Tu cliente sube directamente',badge:'Activo · 1 doc',active:true},
  {ico:'🔗',label:'Integración contable',sub:'Holded, Contasimple…',badge:null,active:false},
]

const recibidas = [
  {prov:'Bodegas Iriarte',sub:'cliente · portal',concepto:'Factura materiales reunión',canal:'👤 Portal',cBg:'rgba(46,90,140,0.1)',cColor:'#2E5A8C',fecha:'18 abr',imp:'847,00 €',iva:'21%',ded:'Pendiente',dBg:'rgba(212,165,116,0.15)',dColor:'#8B5E34',est:'⚡ Confirmar',eBg:'rgba(198,93,74,0.1)',eColor:'#C65D4A',bg:'rgba(46,90,140,0.04)',pendiente:true},
  {prov:'Notion',sub:'proveedor',concepto:'Suscripción anual',canal:'📧 Email',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'12 abr',imp:'96,00 €',iva:'21% · 20€',ded:'100%',dBg:'rgba(34,160,107,0.1)',dColor:'#22A06B',est:'✓ Procesada',eBg:'rgba(34,160,107,0.12)',eColor:'#22A06B',bg:''},
  {prov:'Amazon Business',sub:'proveedor',concepto:'Material oficina',canal:'📧 Email',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'08 abr',imp:'124,30 €',iva:'21% · 26€',ded:'100%',dBg:'rgba(34,160,107,0.1)',dColor:'#22A06B',est:'✓ Procesada',eBg:'rgba(34,160,107,0.12)',eColor:'#22A06B',bg:''},
  {prov:'Gasolinera BP',sub:'ticket',concepto:'Desplazamiento cliente',canal:'📷 OCR',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'05 abr',imp:'68,40 €',iva:'21% · 14€',ded:'50%',dBg:'rgba(212,165,116,0.15)',dColor:'#8B5E34',est:'✓ Procesada',eBg:'rgba(34,160,107,0.12)',eColor:'#22A06B',bg:''},
]

function ModalConfirmarFactura({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirmar factura recibida" subtitle="Bodegas Iriarte · Portal cliente · 847,00 €">
      <div className="dm-info-box" style={{background:'rgba(46,90,140,0.05)',marginBottom:10}}>
        <div className="dm-info-lbl">Detectado por la IA</div>
        <div className="dm-info-val">Factura de materiales para reunión · Subida por Ana Ruiz desde el portal cliente.</div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Proveedor / Emisor</div><input className="dm-input" defaultValue="Bodegas Iriarte"/></div>
        <div className="dm-field"><div className="dm-label">Importe total</div><input className="dm-input" defaultValue="847,00 €"/></div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">IVA</div><select className="dm-select"><option>21%</option><option>10%</option><option>4%</option></select></div>
        <div className="dm-field"><div className="dm-label">Deducibilidad</div><select className="dm-select"><option>100% deducible</option><option>50% deducible</option><option>No deducible</option></select></div>
      </div>
      <div className="dm-field"><div className="dm-label">Categoría</div>
        <select className="dm-select"><option>Material reunión cliente</option><option>Transporte</option><option>Material oficina</option><option>Software</option><option>Formación</option><option>Otros</option></select>
      </div>
      <div style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#22A06B',marginBottom:4}}>✓ Al confirmar, la IA actualizará automáticamente el IVA soportado y los gastos deducibles.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">Confirmar factura ✓</button>
      </div>
    </Modal>
  )
}

function ModalEmailReenvio({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="📧 Subir facturas por email" subtitle="Reenvía cualquier factura de proveedor a esta dirección — la IA la procesa en segundos">
      <div style={{background:'#1C2D44',borderRadius:12,padding:20,textAlign:'center',marginBottom:14}}>
        <div style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'#BCD4E8',marginBottom:8}}>Tu dirección de ingesta</div>
        <div style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:500,color:'#FAF7F2',marginBottom:6}}>gastos.iker@coaxionia.app</div>
        <div style={{fontSize:'0.74rem',color:'rgba(250,247,242,0.55)'}}>Reenvía desde cualquier email · La IA extrae y clasifica automáticamente</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
        {[
          {t:'Facturas de proveedores (PDF, imagen)',d:'Extrae: importe, fecha, proveedor, IVA, deducibilidad'},
          {t:'Tickets de compra escaneados',d:'Adjunta la foto del ticket como imagen o PDF'},
          {t:'Confirmaciones de compra online',d:'Amazon, El Corte Inglés, proveedores habituales'},
        ].map((item,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8}}>
            <span style={{fontSize:'1rem',flexShrink:0}}>✓</span>
            <div>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{item.t}</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)'}}>{item.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-primary" onClick={onClose}>Copiar dirección →</button>
      </div>
    </Modal>
  )
}

export default function FacturasRecibidasSection() {
  const [confirmarOpen, setConfirmarOpen] = useState(false)
  const [emailReenvioOpen, setEmailReenvioOpen] = useState(false)

  return (
    <div>
      <ModalConfirmarFactura open={confirmarOpen} onClose={() => setConfirmarOpen(false)} />
      <ModalEmailReenvio open={emailReenvioOpen} onClose={() => setEmailReenvioOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Facturas recibidas</h1>
          <p className="page-subtitle">Facturas de proveedores · Todos los canales · Alimentan automáticamente tus gastos deducibles e impuestos.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA clasificó 3 facturas recibidas · 1 pendiente de confirmar</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">📷 Foto ticket</button>
          <button className="btn-ghost" onClick={() => setEmailReenvioOpen(true)}>📧 Email</button>
          <button className="btn-primary">+ Registrar manual</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Recibidas · abril</div><div className="dia-kpi-val">12</div><div className="dia-kpi-trend up">4 canales activos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Pendientes procesar</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ La IA las espera</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IVA soportado · T1</div><div className="dia-kpi-val">312 €</div><div className="dia-kpi-trend up">↓ deducible en 303</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Gasto deducible · T1</div><div className="dia-kpi-val">3.240 €</div><div className="dia-kpi-trend up">↓ deducible en 130</div></div>
      </div>

      <div className="dia-card" style={{marginBottom:14}}>
        <div className="dia-card-head"><div className="dia-card-ttl">Canales de entrada activos</div><div className="dia-card-sub">Por aquí llegan tus facturas a COAXIONIA</div></div>
        <div className="canales-grid">
          {canales.map((c,i) => (
            <div key={i} style={{padding:14,background:c.active?'rgba(34,160,107,0.04)':'rgba(28,45,68,0.03)',border:`0.5px solid ${c.active?'rgba(34,160,107,0.2)':'rgba(28,45,68,0.1)'}`,borderRadius:10,textAlign:'center',opacity:c.active?1:0.7}}>
              <div style={{fontSize:'1.4rem',marginBottom:6}}>{c.ico}</div>
              <div style={{fontSize:'0.8rem',fontWeight:600,color:'#1C2D44',marginBottom:3}}>{c.label}</div>
              <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.5)',marginBottom:8}}>{c.sub}</div>
              {c.badge ? <span style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 8px',borderRadius:100,background:'rgba(34,160,107,0.12)',color:'#22A06B'}}>{c.badge}</span>
                : <button style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 8px',borderRadius:100,background:'rgba(46,90,140,0.1)',color:'#2E5A8C',border:'none',cursor:'pointer'}}>Conectar →</button>}
            </div>
          ))}
        </div>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Facturas recibidas · abril 2026</div><div className="dia-card-sub">La IA las clasifica, extrae el IVA y actualiza tus impuestos automáticamente</div></div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.83rem',minWidth:700}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={th}>Proveedor</th><th style={th}>Concepto</th><th style={th}>Canal</th>
                <th style={th}>Fecha</th><th style={{...th,textAlign:'right'}}>Importe</th><th style={{...th,textAlign:'right'}}>IVA</th>
                <th style={th}>Deducible</th><th style={th}>Estado</th><th style={{padding:'8px 12px'}}></th>
              </tr></thead>
              <tbody>
                {recibidas.map((f,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:f.bg}}>
                    <td style={{padding:'10px 12px'}}><div style={{fontWeight:500,color:'#1C2D44'}}>{f.prov}</div><div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)'}}>{f.sub}</div></td>
                    <td style={{padding:'10px 12px',color:'rgba(28,45,68,0.7)'}}>{f.concepto}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:f.cBg,color:f.cColor,fontWeight:600}}>{f.canal}</span></td>
                    <td style={{padding:'10px 12px',color:'rgba(28,45,68,0.55)'}}>{f.fecha}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontWeight:500,color:'#1C2D44'}}>{f.imp}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',color:'rgba(28,45,68,0.6)'}}>{f.iva}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:f.dBg,color:f.dColor,fontWeight:600}}>{f.ded}</span></td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:f.eBg,color:f.eColor,fontWeight:600}}>{f.est}</span></td>
                    <td style={{padding:'10px 12px'}}>
                      {f.pendiente
                        ? <button style={{padding:'4px 10px',background:'#1C2D44',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}} onClick={() => setConfirmarOpen(true)}>Confirmar ✓</button>
                        : <button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}}>Ver</button>}
                    </td>
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
