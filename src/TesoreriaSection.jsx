import './sections.css'

const movimientos = [
  {fecha:'18 abr',concepto:'Cobro Metalúrgica Goi · F-2026-035',cat:'Cobro cliente',catBg:'rgba(34,160,107,0.1)',catColor:'#22A06B',importe:'+2.544 €',importeColor:'#22A06B',saldo:'18.420 €'},
  {fecha:'16 abr',concepto:'Claude Pro · suscripción mensual',cat:'Software',catBg:'rgba(46,90,140,0.1)',catColor:'#2E5A8C',importe:'-20 €',importeColor:'#C65D4A',saldo:'15.876 €'},
  {fecha:'12 abr',concepto:'Cobro Garapen Consulting · F-2026-033',cat:'Cobro cliente',catBg:'rgba(34,160,107,0.1)',catColor:'#22A06B',importe:'+3.392 €',importeColor:'#22A06B',saldo:'15.896 €'},
  {fecha:'10 abr',concepto:'Cuota autónomo RETA · abril',cat:'Cuotas SS',catBg:'rgba(198,93,74,0.1)',catColor:'#C65D4A',importe:'-370 €',importeColor:'#C65D4A',saldo:'12.504 €'},
  {fecha:'08 abr',concepto:'Cobro Innotek Basque · F-2026-030',cat:'Cobro cliente',catBg:'rgba(34,160,107,0.1)',catColor:'#22A06B',importe:'+2.226 €',importeColor:'#22A06B',saldo:'12.874 €'},
  {fecha:'05 abr',concepto:'Alquiler despacho · abril',cat:'Alquiler',catBg:'rgba(28,45,68,0.07)',catColor:'rgba(28,45,68,0.6)',importe:'-650 €',importeColor:'#C65D4A',saldo:'10.648 €'},
  {fecha:'01 abr',concepto:'Cobro Construcciones Mendía · F-2026-027',cat:'Cobro cliente',catBg:'rgba(34,160,107,0.1)',catColor:'#22A06B',importe:'+1.272 €',importeColor:'#22A06B',saldo:'11.298 €'},
]

export default function TesoreriaSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tesorería</h1>
          <p className="page-subtitle">Flujo de caja real y proyectado · La IA anticipa problemas de liquidez.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA proyecta tensión de tesorería en septiembre · anticipa facturación</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Exportar</button>
          <button className="btn-primary">+ Movimiento</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Saldo actual</div><div className="dia-kpi-val">18.420 €</div><div className="dia-kpi-trend up">✓ Saludable</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Entradas · abril</div><div className="dia-kpi-val">9.600 €</div><div className="dia-kpi-trend up">cobros recibidos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Salidas · abril</div><div className="dia-kpi-val">3.840 €</div><div className="dia-kpi-trend up">gastos del mes</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Previsión fin de mes</div><div className="dia-kpi-val">24.180 €</div><div className="dia-kpi-trend up">↑ si cobras todo</div></div>
      </div>

      <div className="dia-grid">

        {/* Flujo de caja 3 meses */}
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Flujo de caja · próximos 3 meses</div><div className="dia-card-sub">Proyección IA · entradas y salidas previstas</div></div>
          <div className="tesoreria-meses">
            {[
              {label:'Abril · real',color:'#22A06B',bg:'rgba(34,160,107,0.04)',border:'rgba(34,160,107,0.15)',borderStyle:'solid',entradas:'+9.600 €',salidas:'-3.840 €',neto:'+5.760 €',netoColor:'#22A06B'},
              {label:'Mayo · proyectado',color:'#2E5A8C',bg:'rgba(46,90,140,0.04)',border:'rgba(46,90,140,0.2)',borderStyle:'dashed',entradas:'+11.400 €',salidas:'-4.100 €',neto:'+7.300 €',netoColor:'#22A06B'},
              {label:'Junio · proyectado',color:'#8B5E34',bg:'rgba(212,165,116,0.06)',border:'rgba(212,165,116,0.3)',borderStyle:'dashed',entradas:'+9.600 €',salidas:'-8.900 €',neto:'+700 €',netoColor:'#D4A574'},
            ].map((m,i) => (
              <div key={i} style={{background:m.bg,borderRadius:10,padding:14,border:`0.5px ${m.borderStyle} ${m.border}`}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:m.color,marginBottom:8}}>{m.label}</div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>Entradas</span><span style={{fontSize:'0.82rem',fontWeight:500,color:'#22A06B'}}>{m.entradas}</span></div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>Salidas</span><span style={{fontSize:'0.82rem',fontWeight:500,color:'#C65D4A'}}>{m.salidas}</span></div>
                <div style={{height:1,background:'rgba(28,45,68,0.08)',marginBottom:8}}></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontSize:'0.8rem',fontWeight:600,color:'#1C2D44'}}>Neto</span><span style={{fontSize:'0.9rem',fontWeight:600,color:m.netoColor}}>{m.neto}</span></div>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(198,93,74,0.06)',border:'0.5px solid rgba(198,93,74,0.2)',borderRadius:8,padding:'10px 14px',fontSize:'0.78rem',color:'#C65D4A',marginTop:16}}>
            ⚠ <strong>Alerta IA:</strong> En junio hay pago de IRPF 2T (~6.800 €) + gastos recurrentes. Saldo neto muy ajustado. Considera anticipar factura de Metalúrgica Goi.
          </div>
        </div>

        {/* Movimientos recientes */}
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Movimientos recientes</div><div className="dia-card-sub">Abril 2026 · sincronizado con cuenta bancaria</div></div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.83rem',minWidth:600}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                {['Fecha','Concepto','Categoría','Importe','Saldo'].map((h,i) => (
                  <th key={i} style={{padding:'8px 12px',textAlign:i>=3?'right':'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {movimientos.map((m,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.05)'}}>
                    <td style={{padding:'10px 12px',color:'rgba(28,45,68,0.55)'}}>{m.fecha}</td>
                    <td style={{padding:'10px 12px',fontWeight:500,color:'#1C2D44'}}>{m.concepto}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:m.catBg,color:m.catColor,fontWeight:600}}>{m.cat}</span></td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontWeight:600,color:m.importeColor}}>{m.importe}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontWeight:500,color:'#1C2D44'}}>{m.saldo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cobros pendientes */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Cobros pendientes</div><div className="dia-card-sub">Facturas emitidas sin cobrar</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[{f:'Digiform SL · F-2026-041',d:'Vencida hace 8 días',v:'2.544 €'},{f:'Digiform SL · F-2026-038',d:'Vencida hace 12 días',v:'1.908 €'}].map((c,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10,background:'rgba(198,93,74,0.05)',borderRadius:8,border:'0.5px solid rgba(198,93,74,0.15)'}}>
                <div><div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{c.f}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{c.d}</div></div>
                <div style={{textAlign:'right'}}><div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#C65D4A'}}>{c.v}</div><button style={{fontSize:'0.68rem',fontWeight:500,color:'#C65D4A',background:'none',border:'none',cursor:'pointer',padding:0,textDecoration:'underline'}}>Recordar</button></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:'0.5px solid rgba(28,45,68,0.06)',display:'flex',justifyContent:'space-between'}}>
            <span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.5)'}}>Total pendiente</span>
            <span style={{fontSize:'0.86rem',fontWeight:600,color:'#C65D4A'}}>4.452 €</span>
          </div>
        </div>

        {/* IA insight */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Salud financiera</div></div>
          <div className="ins-list" style={{gap:9}}>
            <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Saldo saludable · 18.420 €</div><div className="ins-desc">Cubre 4.8 meses de gastos fijos. Por encima de la reserva recomendada (3 meses).</div></div></div>
            <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Junio: mes ajustado</div><div className="ins-desc">IRPF 2T + gastos = 8.900 €. Solo entran 9.600 €. Cobrar Digiform esta semana.</div></div></div>
            <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Patrón estacional detectado</div><div className="ins-desc">Agosto y diciembre son meses bajos históricamente. Planifica facturación por adelantado.</div></div></div>
          </div>
        </div>

      </div>
    </div>
  )
}
