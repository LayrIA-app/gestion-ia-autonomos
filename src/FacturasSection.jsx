import './sections.css'

const th = {padding:'10px 12px',textAlign:'left',fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}
const thr = {...th,textAlign:'right'}

const facturas = [
  {num:'F-2026-043',cliente:'Metalúrgica Goi',concepto:'Retainer mayo 2026',fecha:'18 abr 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'rgba(46,90,140,0.04)',estadoTxt:'✦ IA lista',estadoBg:'rgba(46,90,140,0.12)',estadoColor:'#2E5A8C',acciones:['Editar','Revisar y enviar →']},
  {num:'F-2026-041',cliente:'Digiform SL',concepto:'Consultoría abril 2026',fecha:'17 abr 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'rgba(198,93,74,0.02)',estadoTxt:'⚡ Vencida',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',acciones:['Editar','Recordar']},
  {num:'F-2026-038',cliente:'Digiform SL',concepto:'Consultoría marzo 2026',fecha:'09 abr 2026',base:'1.800 €',iva:'378 €',total:'1.908 €',bg:'rgba(198,93,74,0.02)',estadoTxt:'⚡ Vencida',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',acciones:['Editar','Recordar']},
  {num:'F-2026-035',cliente:'Metalúrgica Goi',concepto:'Retainer abril 2026',fecha:'01 abr 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',acciones:['PDF','Reenviar']},
  {num:'F-2026-031',cliente:'Metalúrgica Goi',concepto:'Consultoría marzo 2026',fecha:'15 mar 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',acciones:['PDF']},
  {num:'F-2026-028',cliente:'Metalúrgica Goi',concepto:'Consultoría febrero 2026',fecha:'01 mar 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',acciones:['PDF']},
  {num:'F-2026-018',cliente:'Metalúrgica Goi',concepto:'Consultoría enero 2026',fecha:'01 feb 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',acciones:['PDF']},
]

export default function FacturasSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Facturas emitidas</h1>
          <p className="page-subtitle">Facturación de Arrieta Consultores · IVA, IRPF y cobros gestionados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA tiene lista F-2026-043 para Metalúrgica Goi · pendiente envío</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Exportar</button>
          <button className="btn-primary">+ Nueva factura</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturado · abril</div><div className="dia-kpi-val">11.400 €</div><div className="dia-kpi-trend up">↑ 12% vs media</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Pendiente cobro</div><div className="dia-kpi-val">4.200 €</div><div className="dia-kpi-trend warn">⚡ 2 vencidas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IVA repercutido · 1T</div><div className="dia-kpi-val">1.995 €</div><div className="dia-kpi-trend up">A ingresar abr.</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IRPF retenido · 1T</div><div className="dia-kpi-val">1.425 €</div><div className="dia-kpi-trend up">✓ Al día</div></div>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Historial de facturas</div><div className="dia-card-sub">Ordenadas por fecha · 2026</div></div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.84rem',minWidth:700}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={th}>Nº Factura</th><th style={th}>Cliente</th><th style={th}>Concepto</th><th style={th}>Fecha</th>
                <th style={thr}>Base</th><th style={thr}>IVA</th><th style={thr}>Total</th><th style={th}>Estado</th><th style={{padding:'10px 12px'}}></th>
              </tr></thead>
              <tbody>
                {facturas.map((f,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:f.bg}}>
                    <td style={{padding:12,fontWeight:500,color:'#1C2D44'}}>{f.num}</td>
                    <td style={{padding:12,color:'rgba(28,45,68,0.7)'}}>{f.cliente}</td>
                    <td style={{padding:12,color:'rgba(28,45,68,0.7)'}}>{f.concepto}</td>
                    <td style={{padding:12,color:'rgba(28,45,68,0.55)'}}>{f.fecha}</td>
                    <td style={{padding:12,textAlign:'right',fontWeight:500,color:'#1C2D44'}}>{f.base}</td>
                    <td style={{padding:12,textAlign:'right',color:'rgba(28,45,68,0.6)'}}>{f.iva}</td>
                    <td style={{padding:12,textAlign:'right',fontWeight:600,color:'#1C2D44'}}>{f.total}</td>
                    <td style={{padding:12}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:100,background:f.estadoBg,color:f.estadoColor}}>{f.estadoTxt}</span></td>
                    <td style={{padding:12}}><div style={{display:'flex',gap:6}}>{f.acciones.map((a,j) => <button key={j} className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}}>{a}</button>)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Resumen fiscal 1T 2026</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {l:'IVA repercutido (21%)',s:'Sobre base de 9.500 €',v:'1.995 €',bg:'rgba(188,212,232,0.15)',dark:false},
              {l:'IVA soportado (gastos)',s:'Facturas de proveedores',v:'312 €',bg:'rgba(212,165,116,0.1)',dark:false},
              {l:'A ingresar modelo 303',s:'Vence 20 de abril',v:'1.683 €',bg:'#1C2D44',dark:true},
              {l:'IRPF retenido (15%)',s:'Modelo 130',v:'218 €',bg:'rgba(28,45,68,0.04)',dark:false},
            ].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:10,background:r.bg,borderRadius:8}}>
                <div><div style={{fontSize:'0.78rem',fontWeight:500,color:r.dark?'#FAF7F2':'#1C2D44'}}>{r.l}</div><div style={{fontSize:'0.72rem',color:r.dark?'rgba(250,247,242,0.55)':'rgba(28,45,68,0.5)'}}>{r.s}</div></div>
                <div style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:500,color:r.dark?'#FAF7F2':'#1C2D44'}}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Análisis de facturación</div></div>
          <div className="ins-list" style={{gap:10}}>
            <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Digiform SL · 4.200 € pendientes</div><div className="ins-desc">2 facturas vencidas. Enviar recordatorio esta semana.</div></div></div>
            <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Próxima factura · Mayo 2026</div><div className="ins-desc">Metalúrgica Goi · 2.400 € · Vence el 1 de mayo.</div></div></div>
            <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Ritmo de facturación</div><div className="ins-desc">Abril: 11.400 € · 12% por encima de tu media mensual.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
