import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import './sections.css'

const metricas = [
  {nombre:'Facturación anual',tuyo:'136.800 €',p25:'48.000 €',mediana:'82.000 €',p75:'124.000 €',badge:'P78',badgeColor:'#22A06B',badgeBg:'rgba(34,160,107,0.12)',pct:78,barColor:'#22A06B'},
  {nombre:'Tarifa media por hora',tuyo:'94 €/h',p25:'35 €/h',mediana:'58 €/h',p75:'82 €/h',badge:'P74',badgeColor:'#22A06B',badgeBg:'rgba(34,160,107,0.12)',pct:74,barColor:'#22A06B'},
  {nombre:'Margen neto',tuyo:'68%',p25:'28%',mediana:'42%',p75:'58%',badge:'P82',badgeColor:'#22A06B',badgeBg:'rgba(34,160,107,0.12)',pct:82,barColor:'#22A06B'},
  {nombre:'Tasa conversión propuestas',tuyo:'62%',p25:'28%',mediana:'41%',p75:'58%',badge:'P79',badgeColor:'#22A06B',badgeBg:'rgba(34,160,107,0.12)',pct:79,barColor:'#22A06B'},
  {nombre:'Días cobro medio',tuyo:'42 días',p25:'18 días',mediana:'31 días',p75:'55 días',badge:'P44',badgeColor:'#8B5E34',badgeBg:'rgba(212,165,116,0.15)',pct:44,barColor:'#D4A574'},
  {nombre:'Horas facturables/semana',tuyo:'28h',p25:'22h',mediana:'32h',p75:'38h',badge:'P35',badgeColor:'#C65D4A',badgeBg:'rgba(198,93,74,0.1)',pct:35,barColor:'#C65D4A'},
  {nombre:'NPS clientes',tuyo:'78',p25:'42',mediana:'58',p75:'72',badge:'P88',badgeColor:'#22A06B',badgeBg:'rgba(34,160,107,0.12)',pct:88,barColor:'#22A06B'},
]

function ModalRecomendaciones({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={540} title="Recomendaciones IA · Benchmark" subtitle="Basadas en tu posición relativa al sector">
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:14}}>
        <div className="dm-info-box" style={{background:'rgba(198,93,74,0.05)',border:'0.5px solid rgba(198,93,74,0.15)'}}>
          <div className="dm-info-lbl" style={{color:'#C65D4A'}}>⚡ Prioridad 1 — Horas facturables (P35)</div>
          <div className="dm-info-val">Estás 6h/semana por debajo de la mediana. Reducir carga administrativa no facturable añadiría ~32.000€ anuales sin cambiar precios. Usa la IA para automatizar reporting, emails y preparación de reuniones.</div>
        </div>
        <div className="dm-info-box" style={{background:'rgba(212,165,116,0.06)'}}>
          <div className="dm-info-lbl" style={{color:'#8B5E34'}}>⚠ Prioridad 2 — Días de cobro (P44)</div>
          <div className="dm-info-val">Cobras a 42 días de media, 11 días más que la mediana. Activa los recordatorios automáticos de la IA y pasa a facturación anticipada en los nuevos clientes.</div>
        </div>
        <div className="dm-info-box" style={{background:'rgba(34,160,107,0.05)'}}>
          <div className="dm-info-lbl" style={{color:'#22A06B'}}>✓ Mantener — NPS y Margen (P88 · P82)</div>
          <div className="dm-info-val">Destacas en satisfacción de clientes y margen. Momento óptimo para aumentar tarifas un 10-15% en los próximos contratos sin perder clientes.</div>
        </div>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cerrar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Plan de acción creado · 3 prioridades asignadas','ok'); onClose() }}>Crear plan de acción →</button>
      </div>
    </Modal>
  )
}

export default function BenchmarkSection() {
  const [recOpen, setRecOpen] = useState(false)

  const thS = {padding:'10px 14px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}
  const thC = {...thS,textAlign:'center'}

  return (
    <div>
      <ModalRecomendaciones open={recOpen} onClose={() => setRecOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Benchmark sectorial</h1>
          <p className="page-subtitle">Compárate con otros autónomos de tu sector. Datos anónimos · Tu actividad · España.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA detecta P35 en horas facturables · mayor oportunidad de mejora</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => showToast('Comparativa cambiada · sector servicios a empresas','info')}>Cambiar sector</button>
          <button className="btn-primary" onClick={() => setRecOpen(true)}>Ver recomendaciones</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:20}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturación · Percentil</div><div className="dia-kpi-val">P78</div><div className="dia-kpi-trend up">↑ Top 22% del sector</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tarifa · Percentil</div><div className="dia-kpi-val">P74</div><div className="dia-kpi-trend up">↑ 94€/h vs 58€/h mediana</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Horas facturables</div><div className="dia-kpi-val">P35</div><div className="dia-kpi-trend warn">↓ Margen de mejora</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">NPS clientes</div><div className="dia-kpi-val">P88</div><div className="dia-kpi-trend up">↑ Excelente</div></div>
      </div>

      <div className="dia-card" style={{marginBottom:16}}>
        <div className="dia-card-head">
          <div>
            <div className="dia-card-ttl">Comparativa sector · Consultoría y servicios profesionales</div>
            <div className="dia-card-sub">Datos anónimos de 1.240 autónomos · España · 2025-2026</div>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:650}}>
            <thead>
              <tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={thS}>Métrica</th>
                <th style={{...thC,color:'#1C2D44',fontWeight:700}}>Tú</th>
                <th style={thC}>P25</th>
                <th style={thC}>Mediana</th>
                <th style={thC}>P75</th>
                <th style={{...thC,minWidth:150}}>Tu posición</th>
              </tr>
            </thead>
            <tbody>
              {metricas.map((m,i) => (
                <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:i%2===0?'rgba(28,45,68,0.01)':'transparent'}}>
                  <td style={{padding:'12px 14px',fontWeight:500,color:'#1C2D44'}}>{m.nombre}</td>
                  <td style={{padding:'12px 14px',textAlign:'center',fontWeight:700,color:'#1C2D44'}}>{m.tuyo}</td>
                  <td style={{padding:'12px 14px',textAlign:'center',color:'rgba(28,45,68,0.55)'}}>{m.p25}</td>
                  <td style={{padding:'12px 14px',textAlign:'center',color:'rgba(28,45,68,0.7)'}}>{m.mediana}</td>
                  <td style={{padding:'12px 14px',textAlign:'center',color:'rgba(28,45,68,0.55)'}}>{m.p75}</td>
                  <td style={{padding:'12px 14px',minWidth:150}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                      <span style={{fontSize:'0.72rem',fontWeight:700,padding:'2px 7px',borderRadius:100,background:m.badgeBg,color:m.badgeColor}}>{m.badge}</span>
                    </div>
                    <div style={{height:5,background:'rgba(28,45,68,0.08)',borderRadius:3,overflow:'hidden'}}>
                      <div style={{width:`${m.pct}%`,height:'100%',background:m.barColor,borderRadius:3}}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insight principal */}
        <div style={{marginTop:16,padding:'12px 16px',background:'rgba(46,90,140,0.05)',borderRadius:10,border:'0.5px solid rgba(46,90,140,0.15)',display:'flex',alignItems:'flex-start',gap:12}}>
          <div className="ins-ico blue" style={{width:28,height:28,borderRadius:7,flexShrink:0}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Mayor oportunidad de mejora: horas facturables</div>
            <div style={{fontSize:'0.74rem',color:'rgba(28,45,68,0.6)'}}>Estás en el P35 de horas facturables. Subir de 28h a 34h/semana añadiría ~32.000 € anuales sin cambiar precios. La IA sugiere revisar carga no facturable.</div>
          </div>
        </div>
      </div>

      <div className="dia-grid">
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Puntos fuertes</div><div className="dia-card-sub">Donde destacas sobre el sector</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[{m:'NPS clientes',v:'P88',d:'Satisfacción muy por encima del sector. Base sólida para pedir referidos.'},{m:'Margen neto',v:'P82',d:'68% vs 42% de mediana. Estructura de costes muy eficiente.'},{m:'Tasa conversión',v:'P79',d:'62% vs 41% de mediana. Tus propuestas conectan bien con el cliente.'}].map((p,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',background:'rgba(34,160,107,0.04)',borderRadius:9,border:'0.5px solid rgba(34,160,107,0.12)'}}>
                <span style={{fontSize:'0.8rem',fontWeight:700,padding:'4px 8px',borderRadius:8,background:'rgba(34,160,107,0.12)',color:'#22A06B',flexShrink:0}}>{p.v}</span>
                <div><div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{p.m}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.6)'}}>{p.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Áreas de mejora</div><div className="dia-card-sub">Donde el sector te supera</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[{m:'Horas facturables',v:'P35',d:'6h/sem por debajo de la mediana. Reducir carga administrativa añadiría ~32.000€/año.',color:'#C65D4A',bg:'rgba(198,93,74,0.1)'},{m:'Días de cobro',v:'P44',d:'42 días vs 31 de mediana. Activa recordatorios automáticos de la IA.',color:'#8B5E34',bg:'rgba(212,165,116,0.15)'}].map((p,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',background:'rgba(198,93,74,0.03)',borderRadius:9,border:'0.5px solid rgba(198,93,74,0.1)'}}>
                <span style={{fontSize:'0.8rem',fontWeight:700,padding:'4px 8px',borderRadius:8,background:p.bg,color:p.color,flexShrink:0}}>{p.v}</span>
                <div><div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{p.m}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.6)'}}>{p.d}</div></div>
              </div>
            ))}
            <button className="btn-ghost" style={{width:'100%',marginTop:4}} onClick={() => setRecOpen(true)}>Ver plan de mejora IA →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
