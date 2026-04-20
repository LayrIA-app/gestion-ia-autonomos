import './sections.css'

const th = {padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}
const thr = {...th,textAlign:'right'}

const canales = [
  {ico:'📧',label:'Email reenvío',sub:'gastos.iker@coaxionia.app',badge:'Activo · 8 docs',active:true},
  {ico:'📷',label:'Foto / OCR',sub:'App móvil o web',badge:'Activo · 3 docs',active:true},
  {ico:'👤',label:'Portal Cliente',sub:'Tu cliente sube directamente',badge:'Activo · 1 doc',active:true},
  {ico:'🔗',label:'Integración contable',sub:'Holded, Contasimple…',badge:null,active:false},
]

const recibidas = [
  {prov:'Bodegas Iriarte',sub:'cliente · portal',concepto:'Factura materiales reunión',canal:'👤 Portal',cBg:'rgba(46,90,140,0.1)',cColor:'#2E5A8C',fecha:'18 abr',imp:'847,00 €',iva:'21%',ded:'Pendiente',dBg:'rgba(212,165,116,0.15)',dColor:'#8B5E34',est:'⚡ Confirmar',eBg:'rgba(198,93,74,0.1)',eColor:'#C65D4A',bg:'rgba(46,90,140,0.04)'},
  {prov:'Notion',sub:'proveedor',concepto:'Suscripción anual',canal:'📧 Email',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'12 abr',imp:'96,00 €',iva:'21% · 20€',ded:'100%',dBg:'rgba(34,160,107,0.1)',dColor:'#22A06B',est:'✓ Procesada',eBg:'rgba(34,160,107,0.12)',eColor:'#22A06B',bg:''},
  {prov:'Amazon Business',sub:'proveedor',concepto:'Material oficina',canal:'📧 Email',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'08 abr',imp:'124,30 €',iva:'21% · 26€',ded:'100%',dBg:'rgba(34,160,107,0.1)',dColor:'#22A06B',est:'✓ Procesada',eBg:'rgba(34,160,107,0.12)',eColor:'#22A06B',bg:''},
  {prov:'Gasolinera BP',sub:'ticket',concepto:'Desplazamiento cliente',canal:'📷 OCR',cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)',fecha:'05 abr',imp:'68,40 €',iva:'21% · 14€',ded:'50%',dBg:'rgba(212,165,116,0.15)',dColor:'#8B5E34',est:'✓ Procesada',eBg:'rgba(34,160,107,0.12)',eColor:'#22A06B',bg:''},
]

export default function FacturasRecibidasSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Facturas recibidas</h1>
          <p className="page-subtitle">Facturas de proveedores · Todos los canales · Alimentan automáticamente tus gastos deducibles e impuestos.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA clasificó 3 facturas recibidas · 1 pendiente de confirmar</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">📷 Foto ticket</button>
          <button className="btn-ghost">📧 Email</button>
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
              {c.badge
                ? <span style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 8px',borderRadius:100,background:'rgba(34,160,107,0.12)',color:'#22A06B'}}>{c.badge}</span>
                : <button style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 8px',borderRadius:100,background:'rgba(46,90,140,0.1)',color:'#2E5A8C',border:'none',cursor:'pointer'}}>Conectar →</button>
              }
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
                <th style={th}>Fecha</th><th style={thr}>Importe</th><th style={thr}>IVA</th>
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
                    <td style={{padding:'10px 12px'}}><button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}}>Ver</button></td>
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
