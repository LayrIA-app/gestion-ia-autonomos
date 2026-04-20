import { useState } from 'react'
import './sections.css'

const modelos1T = [
  {num:'303',desc:'IVA trimestral',origen:'Facturas emitidas − IVA soportado gastos',importe:'1.683 €',estado:'⚡ Pagar',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',bg:'rgba(198,93,74,0.03)',dark:true},
  {num:'130',desc:'IRPF fraccionado (autónomos)',origen:'20% de los rendimientos netos 1T',importe:'218 €',estado:'⚡ Pagar',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',bg:'rgba(198,93,74,0.03)',dark:true},
  {num:'111',desc:'Retenciones IRPF (si tienes empleados/profesionales)',origen:'Retenciones aplicadas en facturas',importe:'1.425 €',estado:'⚡ Pagar',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',bg:'rgba(198,93,74,0.03)',dark:true},
  {num:'390',desc:'Resumen anual IVA · solo Diciembre',origen:'Compila los 4 trimestres 303',importe:'—',estado:'Dic 2026',estadoBg:'rgba(28,45,68,0.07)',estadoColor:'rgba(28,45,68,0.5)',bg:''},
]

export default function ImpuestosSection() {
  const [tabT, setTabT] = useState('t1')
  const [simVal, setSimVal] = useState(45000)

  const simIva = Math.round(simVal * 0.063)
  const simIrpf = Math.round(simVal * 0.03)
  const simRet = Math.round(simVal * 0.03)
  const simTotal = simIva + simIrpf + simRet

  const thS = {padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}
  const thC = {...thS,textAlign:'center'}
  const thR = {...thS,textAlign:'right'}

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Impuestos · Centro fiscal</h1>
          <p className="page-subtitle">Todos tus modelos, calculados con tus facturas y gastos reales · Nada se presenta sin tu confirmación.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA tiene listos Mod. 303 + 130 + 111 · 3.326€ · vencen en 3 días</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">📖 Guía modelos</button>
          <button className="btn-ghost">Declaración Renta</button>
          <button className="btn-primary">Preparar declaración →</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">A pagar · 1T (total)</div><div className="dia-kpi-val">3.326 €</div><div className="dia-kpi-trend warn">⚡ Vence 20 abr</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Reserva fiscal recomendada</div><div className="dia-kpi-val">5.535 €</div><div className="dia-kpi-trend up">2T · IA calculado</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IRPF anual estimado</div><div className="dia-kpi-val">~32.000 €</div><div className="dia-kpi-trend up">tipo efectivo ~21%</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Gastos deducibles · 1T</div><div className="dia-kpi-val">3.240 €</div><div className="dia-kpi-trend up">↑ 81% del total</div></div>
      </div>

      {/* Alerta vencimiento */}
      <div style={{background:'rgba(198,93,74,0.06)',border:'0.5px solid rgba(198,93,74,0.25)',borderRadius:12,padding:'14px 20px',marginBottom:18,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C65D4A" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div>
            <div style={{fontSize:'0.88rem',fontWeight:600,color:'#C65D4A'}}>⚡ Vencen el 20 de abril · en 3 días</div>
            <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginTop:1}}>Mod. 303 (1.683 €) + Mod. 130 (218 €) + Mod. 111 (1.425 €) = 3.326 € · La IA los tiene preparados</div>
          </div>
        </div>
        <button style={{padding:'9px 18px',background:'#C65D4A',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:600,color:'#FAF7F2',cursor:'pointer',whiteSpace:'nowrap'}}>Pagar todo ahora →</button>
      </div>

      <div className="dia-grid">

        {/* Calendario fiscal */}
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Calendario fiscal 2026 · Iker Arrieta</div><div className="dia-card-sub">Todos los modelos obligatorios · importes calculados con tus datos reales</div></div>

          {/* Tabs trimestres */}
          <div style={{display:'flex',gap:8,marginBottom:16,borderBottom:'1px solid rgba(28,45,68,0.08)',paddingBottom:12,flexWrap:'wrap'}}>
            {[{id:'t1',label:'1T · Urgente'},{id:'t2',label:'2T · Julio'},{id:'t3',label:'3T · Octubre'},{id:'t4',label:'4T + Anuales'}].map(t => (
              <button key={t.id} onClick={()=>setTabT(t.id)} style={{padding:'6px 14px',background:tabT===t.id?'#1C2D44':'transparent',border:tabT===t.id?'none':'0.5px solid rgba(28,45,68,0.15)',borderRadius:7,fontFamily:'var(--sans)',fontSize:'0.78rem',fontWeight:tabT===t.id?600:400,color:tabT===t.id?'#FAF7F2':'rgba(28,45,68,0.6)',cursor:'pointer'}}>{t.label}</button>
            ))}
          </div>

          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={thS}>Modelo</th><th style={thS}>Qué es</th><th style={thS}>Origen del dato</th>
                <th style={thR}>Importe</th><th style={thC}>Estado</th><th style={{padding:'8px 12px'}}></th>
              </tr></thead>
              <tbody>
                {tabT === 't1' && modelos1T.map((m,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:m.bg}}>
                    <td style={{padding:'11px 12px'}}><span style={{fontWeight:600,color:'#1C2D44'}}>{m.num}</span><div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.45)'}}>{m.desc}</div></td>
                    <td style={{padding:'11px 12px',fontSize:'0.8rem',color:'rgba(28,45,68,0.7)'}}>{m.desc}</td>
                    <td style={{padding:'11px 12px',fontSize:'0.76rem',color:'rgba(28,45,68,0.6)'}}>{m.origen}</td>
                    <td style={{padding:'11px 12px',textAlign:'right',fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:m.dark?'#C65D4A':'#1C2D44'}}>{m.importe}</td>
                    <td style={{padding:'11px 12px',textAlign:'center'}}><span style={{fontSize:'0.7rem',fontWeight:600,padding:'3px 8px',borderRadius:100,background:m.estadoBg,color:m.estadoColor}}>{m.estado}</span></td>
                    <td style={{padding:'11px 12px'}}>{m.dark && <button style={{padding:'4px 10px',background:'#C65D4A',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Pagar →</button>}</td>
                  </tr>
                ))}
                {tabT === 't2' && (
                  <tr style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:'rgba(46,90,140,0.03)'}}>
                    <td style={{padding:'11px 12px'}} colSpan={6}><span style={{fontSize:'0.84rem',color:'rgba(28,45,68,0.6)'}}>Vencimiento: julio 2026 · La IA calculará los importes cuando cierres el 2T</span></td>
                  </tr>
                )}
                {(tabT === 't3' || tabT === 't4') && (
                  <tr style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)'}}>
                    <td style={{padding:'11px 12px'}} colSpan={6}><span style={{fontSize:'0.84rem',color:'rgba(28,45,68,0.6)'}}>Pendiente · La IA lo calculará automáticamente cuando llegue el trimestre</span></td>
                  </tr>
                )}
                <tr style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:'rgba(46,90,140,0.04)'}}>
                  <td style={{padding:'10px 12px'}}><strong>100 · RENTA</strong></td>
                  <td style={{padding:'10px 12px',fontSize:'0.8rem',color:'rgba(28,45,68,0.7)'}}>Declaración anual IRPF · liquida o devuelve lo pagado a cuenta durante el año</td>
                  <td style={{padding:'10px 12px',fontSize:'0.76rem',color:'rgba(28,45,68,0.6)'}}>Ingresos − gastos deducibles anuales</td>
                  <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'var(--serif)',fontSize:'1rem',color:'#1C2D44'}}>~19.691 €</td>
                  <td style={{padding:'10px 12px',textAlign:'center',fontSize:'0.76rem'}}>Abr–Jun 2027</td>
                  <td style={{padding:'10px 12px'}}><button style={{padding:'4px 10px',background:'#2E5A8C',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Simular →</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Simulador */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Simulador fiscal · 2T 2026</div><div className="dia-card-sub">Ajusta la facturación y ve cuánto reservar</div></div>
          <div style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.78rem',color:'rgba(28,45,68,0.6)',marginBottom:6}}>
              <span>Facturación prevista 2T</span>
              <span style={{fontWeight:500,color:'#1C2D44'}}>{simVal.toLocaleString('es-ES')} €</span>
            </div>
            <input type="range" min="10000" max="100000" step="1000" value={simVal} onChange={e=>setSimVal(Number(e.target.value))} style={{width:'100%',accentColor:'#1C2D44'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {[
              {label:'Mod. 303 · IVA neto',val:simIva},
              {label:'Mod. 130 · IRPF fraccionado',val:simIrpf},
              {label:'Mod. 111 · Retenciones',val:simRet},
            ].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',background:'rgba(28,45,68,0.03)',borderRadius:7}}>
                <span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>{r.label}</span>
                <span style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{r.val.toLocaleString('es-ES')} €</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',padding:10,background:'#1C2D44',borderRadius:8}}>
              <span style={{fontSize:'0.84rem',fontWeight:600,color:'#FAF7F2'}}>Total a reservar 2T</span>
              <span style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#FAF7F2'}}>{simTotal.toLocaleString('es-ES')} €</span>
            </div>
            <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.45)',textAlign:'center',marginTop:4}}>Reserva en cuenta separada · No tocar hasta julio</div>
          </div>
        </div>

        {/* Renta + IA */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="dia-card" style={{background:'rgba(46,90,140,0.04)',border:'0.5px solid rgba(46,90,140,0.15)'}}>
            <div className="dia-card-head"><div className="dia-card-ttl">Mod. 100 · Declaración de la Renta 2026</div><div className="dia-card-sub">Plazo: abril–junio 2027</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
              {[
                {l:'Ingresos estimados 2026',v:'~136.800 €',vc:'#1C2D44'},
                {l:'Gastos deducibles estimados',v:'-38.880 €',vc:'#22A06B'},
                {l:'Rendimiento neto estimado',v:'97.920 €',vc:'#1C2D44'},
              ].map((r,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>{r.l}</span>
                  <span style={{fontSize:'0.82rem',fontWeight:500,color:r.vc}}>{r.v}</span>
                </div>
              ))}
              <div style={{height:1,background:'rgba(28,45,68,0.08)'}}></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>IRPF bruto estimado (~21%)</span><span style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>~20.563 €</span></div>
              <div style={{display:'flex',justifyContent:'space-between',padding:8,background:'#2E5A8C',borderRadius:7}}>
                <span style={{fontSize:'0.8rem',fontWeight:600,color:'#FAF7F2'}}>A pagar en Renta 2027 (estimado)</span>
                <span style={{fontFamily:'var(--serif)',fontSize:'0.95rem',fontWeight:500,color:'#FAF7F2'}}>~19.691 €</span>
              </div>
            </div>
            <button style={{width:'100%',padding:9,background:'#2E5A8C',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Ver simulación completa Renta →</button>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA · Planificación fiscal</div></div>
            <div className="ins-list" style={{gap:8}}>
              <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">3 modelos vencen en 3 días · 3.326 €</div><div className="ins-desc">Comprueba saldo en Kutxabank antes de domiciliar.</div></div></div>
              <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Mod. 347 · 2 clientes a declarar</div><div className="ins-desc">Metalúrgica Goi (28.500€) y Garapen Consulting (9.600€) superan los 3.005€ anuales.</div></div></div>
              <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Tipo efectivo estimado: 21%</div><div className="ins-desc">Por debajo de la media de tu sector (24%). Gastos bien optimizados.</div></div></div>
              <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Renta 2027 · reserva ~20.000 €</div><div className="ins-desc">Empieza a apartar mensualmente. Con tu ritmo actual: ~1.666 €/mes.</div></div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
