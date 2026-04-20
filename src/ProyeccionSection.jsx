import { useState } from 'react'
import './sections.css'

const escenarios = [
  {id:'actual', label:'Ritmo actual', val:186400, pct:'72%', color:'rgba(250,247,242,0.5)', barColor:'rgba(250,247,242,0.5)', dark:true},
  {id:'cliente', label:'+1 cliente iguala/mes', val:214800, pct:'83%', color:'#22A06B', barColor:'#22A06B', dark:false},
  {id:'tarifa', label:'Subida tarifa +15%', val:202400, pct:'78%', color:'#2E5A8C', barColor:'#2E5A8C', dark:false},
  {id:'pierde', label:'Pierde 2 clientes', val:148200, pct:'57%', color:'#C65D4A', barColor:'#C65D4A', dark:false, warn:true},
]

const meses = [
  {m:'Ene', real:14200, proy:null},
  {m:'Feb', real:13800, proy:null},
  {m:'Mar', real:15600, proy:null},
  {m:'Abr', real:11400, proy:null},
  {m:'May', real:null, proy:15200},
  {m:'Jun', real:null, proy:15800},
  {m:'Jul', real:null, proy:16200},
  {m:'Ago', real:null, proy:12800},
  {m:'Sep', real:null, proy:16400},
  {m:'Oct', real:null, proy:17600},
  {m:'Nov', real:null, proy:18200},
  {m:'Dic', real:null, proy:19200},
]

const alertas = [
  {ico:'green',titulo:'Tesorería positiva hasta agosto',desc:'Sin riesgo de liquidez en los próximos 4 meses.'},
  {ico:'warn',titulo:'Cuello de tesorería en septiembre',desc:'Pico de gastos (IRPF 3T) sin cobros previstos. Anticipar facturación.'},
  {ico:'blue',titulo:'Momento óptimo para subir tarifa',desc:'Con 8 clientes activos y NPS 78, tienes margen para revisar precios en 3T.'},
]

const maxVal = Math.max(...meses.map(m => m.real || m.proy || 0))

export default function ProyeccionSection() {
  const [escenario, setEscenario] = useState('actual')
  const esc = escenarios.find(e => e.id === escenario)
  const total = esc ? esc.val.toLocaleString('es-ES') : '186.400'

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Proyección</h1>
          <p className="page-subtitle">Así va a evolucionar tu negocio si sigues al ritmo actual. La IA proyecta, tú decides.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA proyecta {total}€ a ritmo actual · simula escenarios a la derecha</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Exportar informe</button>
          <button className="btn-primary">Ver recomendaciones IA</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:20}}>
        <div className="dia-kpi">
          <div className="dia-kpi-lbl">Facturación proyectada · 2026</div>
          <div className="dia-kpi-val">{total} €</div>
          <div className="dia-kpi-trend up">↑ +23% vs 2025</div>
          <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,24 13,20 26,18 39,14 52,10 65,7 80,4" stroke="#22A06B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,24 13,20 26,18 39,14 52,10 65,7 80,4 80,28 0,28" fill="rgba(34,160,107,0.08)"/></svg>
        </div>
        <div className="dia-kpi">
          <div className="dia-kpi-lbl">Clientes proyectados · dic</div>
          <div className="dia-kpi-val">14</div>
          <div className="dia-kpi-trend up">↑ +6 nuevos este año</div>
          <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,22 13,20 26,17 39,15 52,12 65,10 80,8" stroke="#2E5A8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,22 13,20 26,17 39,15 52,12 65,10 80,8 80,28 0,28" fill="rgba(46,90,140,0.08)"/></svg>
        </div>
        <div className="dia-kpi">
          <div className="dia-kpi-lbl">Margen neto estimado</div>
          <div className="dia-kpi-val">68%</div>
          <div className="dia-kpi-trend up">↑ +4pp vs año pasado</div>
          <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,20 13,18 26,16 39,14 52,12 65,11 80,9" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,20 13,18 26,16 39,14 52,12 65,11 80,9 80,28 0,28" fill="rgba(212,165,116,0.08)"/></svg>
        </div>
        <div className="dia-kpi">
          <div className="dia-kpi-lbl">Riesgo impago detectado</div>
          <div className="dia-kpi-val">Bajo</div>
          <div className="dia-kpi-trend up">✓ Tesorería saneada</div>
          <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,16 13,14 26,12 39,10 52,10 65,9 80,8" stroke="#22A06B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,16 13,14 26,12 39,10 52,10 65,9 80,8 80,28 0,28" fill="rgba(34,160,107,0.06)"/></svg>
        </div>
      </div>

      <div className="proy-grid" style={{marginBottom:16}}>

        {/* Gráfico de barras SVG */}
        <div className="dia-card">
          <div className="dia-card-head">
            <div className="dia-card-ttl">Evolución facturación 2026</div>
            <div className="dia-card-sub">Proyección IA · {escenario === 'actual' ? 'ritmo actual' : esc?.label} · {total} €</div>
          </div>
          <div style={{overflowX:'auto'}}>
            <svg viewBox="0 0 600 160" style={{width:'100%',minWidth:320,height:160}}>
              {meses.map((m, i) => {
                const val = m.real || m.proy || 0
                const barH = (val / maxVal) * 120
                const x = i * 50 + 10
                const y = 140 - barH
                const isReal = !!m.real
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={36} height={barH}
                      fill={isReal ? '#1C2D44' : 'rgba(46,90,140,0.25)'}
                      rx={3}
                    />
                    <text x={x+18} y={155} textAnchor="middle" fontSize={9} fill="rgba(28,45,68,0.45)">{m.m}</text>
                    {val > 0 && <text x={x+18} y={y-4} textAnchor="middle" fontSize={8} fill={isReal?'#1C2D44':'#2E5A8C'}>
                      {(val/1000).toFixed(0)}k
                    </text>}
                  </g>
                )
              })}
            </svg>
          </div>
          <div style={{display:'flex',gap:16,marginTop:10,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:12,height:3,background:'#1C2D44',borderRadius:2}}></div><span style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>Real</span></div>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:12,height:3,background:'rgba(46,90,140,0.4)',borderRadius:2}}></div><span style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>Proyección</span></div>
          </div>
        </div>

        {/* Escenarios interactivos */}
        <div className="dia-card" style={{background:'#1C2D44'}}>
          <div className="dia-card-head" style={{marginBottom:14}}>
            <div className="dia-card-ttl" style={{color:'#FAF7F2'}}>Escenarios · ¿Qué pasaría si…?</div>
            <div className="dia-card-sub" style={{color:'rgba(250,247,242,0.5)'}}>Pulsa para simular</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {escenarios.map((e) => (
              <div key={e.id} onClick={() => setEscenario(e.id)} style={{cursor:'pointer',padding:'12px 14px',background:escenario===e.id?'rgba(250,247,242,0.12)':'rgba(250,247,242,0.05)',borderRadius:10,border:`0.5px solid ${escenario===e.id?'rgba(250,247,242,0.25)':'rgba(250,247,242,0.08)'}`,transition:'all .15s'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
                  <span style={{fontSize:'0.8rem',fontWeight:escenario===e.id?600:400,color:e.warn?'#E8897A':'#FAF7F2'}}>{e.label}</span>
                  <span style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:e.warn?'#E8897A':escenario===e.id?'#FAF7F2':'rgba(250,247,242,0.7)'}}>{e.val.toLocaleString('es-ES')} €</span>
                </div>
                <div style={{height:4,background:'rgba(250,247,242,0.1)',borderRadius:2,overflow:'hidden'}}>
                  <div style={{width:e.pct,height:'100%',background:e.warn?'#C65D4A':e.id==='actual'?'rgba(250,247,242,0.4)':e.id==='cliente'?'#22A06B':'#2E5A8C',borderRadius:2,transition:'width .3s'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas predictivas */}
      <div className="dia-card">
        <div className="dia-card-head"><div className="dia-card-ttl">Alertas predictivas</div><div className="dia-card-sub">La IA anticipa riesgos y oportunidades</div></div>
        <div className="alertas-grid">
          {alertas.map((a,i) => (
            <div key={i} className="ins-item" style={{padding:'12px 14px'}}>
              <div className={`ins-ico ${a.ico}`}>
                {a.ico==='green' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                {a.ico==='warn' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                {a.ico==='blue' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
              </div>
              <div className="ins-body"><div className="ins-title" style={{fontSize:'0.78rem'}}>{a.titulo}</div><div className="ins-desc" style={{fontSize:'0.7rem'}}>{a.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
