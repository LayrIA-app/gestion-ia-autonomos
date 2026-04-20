import { useState } from 'react'
import './sections.css'

const diasMes = [
  {n:null},{n:null},{n:1},{n:2,post:'educativo',postTxt:'Educativo'},{n:3},{n:4},{n:5},
  {n:6},{n:7,post:'educativo',postTxt:'Educativo'},{n:8},{n:9,post:'caso',postTxt:'Caso real'},{n:10},{n:11},{n:12,post:'personal',postTxt:'Personal'},
  {n:13},{n:14,post:'educativo',postTxt:'Educativo'},{n:15},{n:16,post:'caso',postTxt:'Caso real'},{n:17,today:true},{n:18},{n:19},
  {n:20},{n:21,post:'educativo',postTxt:'Educativo'},{n:22},{n:23,post:'promo',postTxt:'Promo'},{n:24},{n:25},{n:26},
  {n:27,post:'personal',postTxt:'Personal'},{n:28,post:'educativo',postTxt:'Educativo'},{n:29},{n:30,post:'caso',postTxt:'Caso real'},{n:null},{n:null},{n:null},
]

const postColors = {educativo:'#2E5A8C',caso:'#22A06B',personal:'#D4A574',promo:'#C65D4A'}
const postBgs = {educativo:'rgba(46,90,140,0.12)',caso:'rgba(34,160,107,0.12)',personal:'rgba(212,165,116,0.2)',promo:'rgba(198,93,74,0.12)'}

const posts = [
  {tipo:'educativo',titulo:'3 errores al digitalizar una pyme',estado:'Listo para publicar',fecha:'Lun 21 · 09:00',likes:'Est. 45-70 👍'},
  {tipo:'caso',titulo:'Cómo reduje el tiempo de reporting de una empresa',estado:'Borrador IA',fecha:'Mié 23 · 08:30',likes:'Est. 80-120 👍'},
  {tipo:'personal',titulo:'Lo que aprendí en 5 años como consultor independiente',estado:'Idea aprobada',fecha:'Sáb 27 · 11:00',likes:'Est. 100-150 👍'},
]

export default function RedesSection() {
  const [tab, setTab] = useState('conexiones')

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Redes sociales</h1>
          <p className="page-subtitle">Plan de contenidos, calendario editorial y proyección de ROI — gestionados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA preparó el post de LinkedIn · listo para aprobar y publicar</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Biblioteca</button>
          <button className="btn-primary">Generar posts</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-scroll-wrap">
        <div className="tab-bar">
          {[{id:'conexiones',l:'Conexiones'},{id:'plan',l:'Plan IA'},{id:'calendario',l:'Calendario'},{id:'roi',l:'ROI'},{id:'posts',l:'Posts'}].map(t => (
            <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={() => setTab(t.id)}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* TAB: Conexiones */}
      {tab === 'conexiones' && (
        <div className="rs-grid">
          {/* LinkedIn activo */}
          <div className="rs-net">
            <div className="rs-net-status"><span className="dot"></span>ACTIVA</div>
            <div className="rs-net-ico linkedin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <div className="rs-net-name">LinkedIn</div>
            <div className="rs-net-handle">@iker-arrieta</div>
            <div className="rs-net-stats">
              <div className="rs-net-stat"><strong>1.847</strong>Seguidores</div>
              <div className="rs-net-stat"><strong>4.2%</strong>Engagement</div>
            </div>
          </div>
          {/* Premium locked */}
          {[{ico:'📷',nombre:'Instagram'},{ico:'𝕏',nombre:'X · Twitter'},{ico:'♪',nombre:'TikTok'}].map((r,i) => (
            <div key={i} className="rs-net locked">
              <div className="rs-net-lock"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Premium</div>
              <div className="rs-net-ico" style={{fontSize:'1.4rem'}}>{r.ico}</div>
              <div className="rs-net-name">{r.nombre}</div>
              <div className="rs-net-handle">Conexión disponible</div>
              <div className="rs-net-stats"><div className="rs-net-stat" style={{opacity:0.5}}><strong>—</strong>Sin activar</div></div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: Plan IA */}
      {tab === 'plan' && (
        <div style={{background:'#1C2D44',borderRadius:14,padding:24}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:20}}>
            <div style={{width:36,height:36,borderRadius:8,background:'rgba(250,247,242,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BCD4E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>
            </div>
            <div>
              <div style={{fontSize:'0.9rem',fontWeight:600,color:'#FAF7F2',marginBottom:6}}>Plan de contenidos generado para Arrieta Consultores · Abril 2026</div>
              <div style={{fontSize:'0.78rem',color:'rgba(250,247,242,0.65)',lineHeight:1.5}}>He analizado tu brief, tu sector y tu audiencia en LinkedIn. Plan optimizado para pymes 10-50 empleados del sector servicios, que es donde tienes mayor engagement histórico.</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
            {[
              {lbl:'Frecuencia óptima',val:'3 posts/semana — tu audiencia satura con 4+ y pierde alcance con 2-'},
              {lbl:'Horarios con más engagement',val:'Martes y jueves · 8:00-9:30h — momento de revisión diaria de CEOs pymes'},
              {lbl:'Mix editorial',val:'40% educativo · 30% casos · 20% personal · 10% promo'},
            ].map((r,i) => (
              <div key={i} style={{padding:'10px 14px',background:'rgba(250,247,242,0.06)',borderRadius:9}}>
                <div style={{fontSize:'0.7rem',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:'#BCD4E8',marginBottom:4}}>{r.lbl}</div>
                <div style={{fontSize:'0.8rem',color:'rgba(250,247,242,0.8)'}}>{r.val}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button style={{flex:1,padding:'9px 16px',background:'transparent',border:'0.5px solid rgba(250,247,242,0.25)',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',color:'rgba(250,247,242,0.7)',cursor:'pointer'}}>Ver argumentación completa</button>
            <button style={{flex:1,padding:'9px 16px',background:'#BCD4E8',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',cursor:'pointer'}}>Regenerar plan con IA</button>
          </div>
        </div>
      )}

      {/* TAB: Calendario */}
      {tab === 'calendario' && (
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Calendario editorial · Abril 2026</div><div className="dia-card-sub">13 posts programados</div></div>
          <div className="rs-cal">
            {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => (
              <div key={d} className="rs-cal-head">{d}</div>
            ))}
            {diasMes.map((d,i) => (
              <div key={i} className={`rs-cal-day${d.today?' today':''}${!d.n?' empty':''}`}>
                {d.n && <span className="rs-cal-num">{d.n}</span>}
                {d.post && (
                  <span style={{display:'block',fontSize:'0.6rem',fontWeight:600,padding:'2px 4px',borderRadius:4,background:postBgs[d.post],color:postColors[d.post],marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.postTxt}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ROI */}
      {tab === 'roi' && (
        <div className="dia-grid">
          <div className="dia-card" style={{gridColumn:'1/-1'}}>
            <div className="dia-card-head"><div className="dia-card-ttl">ROI de contenido · Abril 2026</div><div className="dia-card-sub">Impacto estimado de tu actividad en LinkedIn</div></div>
            <div className="dia-kpis" style={{marginBottom:16}}>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Alcance mensual</div><div className="dia-kpi-val">12.400</div><div className="dia-kpi-trend up">↑ 18% vs marzo</div></div>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Engagement rate</div><div className="dia-kpi-val">4.2%</div><div className="dia-kpi-trend up">↑ Sector: 2.1%</div></div>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Leads generados</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">Digiform · Bodegas · 1 frío</div></div>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Valor est. pipeline</div><div className="dia-kpi-val">36.500 €</div><div className="dia-kpi-trend up">atribuible a RRSS</div></div>
            </div>
          </div>
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA · Análisis de contenido</div></div>
            <div className="ins-list" style={{gap:9}}>
              <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Posts de caso real: 3x más engagement</div><div className="ins-desc">Tu post sobre Metalúrgica Goi tuvo 312 interacciones. Sigue con este formato.</div></div></div>
              <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Publicar en fin de semana baja el alcance</div><div className="ins-desc">Tus posts del sábado tienen un 40% menos de alcance. Muéve los posts al martes o jueves.</div></div></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Posts */}
      {tab === 'posts' && (
        <div className="dia-grid">
          {posts.map((p,i) => (
            <div key={i} className="dia-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:'0.7rem',fontWeight:600,padding:'3px 8px',borderRadius:100,background:postBgs[p.tipo],color:postColors[p.tipo]}}>{p.tipo}</span>
                <span style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{p.fecha}</span>
              </div>
              <div style={{fontSize:'0.9rem',fontWeight:500,color:'#1C2D44',marginBottom:8,lineHeight:1.4}}>{p.titulo}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{p.estado}</span>
                <span style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{p.likes}</span>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn-ghost" style={{flex:1,padding:'6px',fontSize:'0.76rem'}}>Editar</button>
                <button style={{flex:1,padding:'6px',background:'#1C2D44',border:'none',borderRadius:8,fontFamily:'var(--sans)',fontSize:'0.76rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Aprobar →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
