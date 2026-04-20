import { useState } from 'react'
import './sections.css'

const listas = [
  {ico:'⭐',nombre:'VIP · Top 10 clientes',desc:'Clientes con iguala o proyectos > 8.000 €',n:12,cBg:'rgba(212,165,116,0.15)',cColor:'#8B5E34'},
  {ico:'👤',nombre:'Clientes activos',desc:'Con proyecto en curso o cerrado < 6 meses',n:68,cBg:'rgba(46,90,140,0.1)',cColor:'#2E5A8C'},
  {ico:'✅',nombre:'Leads y potenciales',desc:'Recibieron propuesta sin cerrar aún',n:142,cBg:'rgba(34,160,107,0.1)',cColor:'#22A06B'},
  {ico:'🕐',nombre:'Antiguos clientes',desc:'Sin actividad > 12 meses · a reactivar',n:54,cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)'},
  {ico:'📧',nombre:'Newsletter general',desc:'Suscriptores web · formulario LinkedIn',n:571,cBg:'rgba(188,212,232,0.2)',cColor:'#2E5A8C'},
]

const campanas = [
  {nombre:'Informativo',freq:'Mensual',desc:'Novedades del negocio, nuevos servicios, cambios de equipo, hitos alcanzados.',proximo:'5 de mayo',enviados:12,pct:'85%'},
  {nombre:'Actualidad del sector',freq:'Bi-semanal',desc:'Análisis de noticias y tendencias de tu sector. Te posiciona como experto.',proximo:'21 de abril',enviados:8,pct:'72%'},
  {nombre:'Promocional',freq:'Puntual',desc:'Ofertas, nuevos servicios, fin de año fiscal. Se activa según tu calendario comercial.',proximo:'28 de abril',enviados:2,pct:'91%'},
  {nombre:'Campaña temática',freq:'Según calendario',desc:'Black Friday, rentrée, cierre fiscal. La IA adapta según eventos del sector.',proximo:'Junio · Planes 2S',enviados:4,pct:'68%'},
  {nombre:'Mix completo',freq:'Mensual',desc:'Resumen curado con un poco de todo: novedades + sector + CTA a tus servicios.',proximo:'15 de mayo',enviados:9,pct:'79%'},
]

export default function MailingSection() {
  const [tab, setTab] = useState('listas')

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mailing</h1>
          <p className="page-subtitle">Email marketing con IA · Listas segmentadas, campañas automáticas y análisis de apertura.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA preparó el próximo envío · listo para revisar · 142 destinatarios</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Importar contactos</button>
          <button className="btn-primary">+ Nueva campaña</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Contactos totales</div><div className="dia-kpi-val">847</div><div className="dia-kpi-trend up">5 listas activas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tasa apertura media</div><div className="dia-kpi-val">38%</div><div className="dia-kpi-trend up">↑ Sector: 22%</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Emails enviados · mes</div><div className="dia-kpi-val">1.240</div><div className="dia-kpi-trend up">3 campañas activas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Leads generados · email</div><div className="dia-kpi-val">2</div><div className="dia-kpi-trend up">este mes</div></div>
      </div>

      {/* Tabs */}
      <div className="tab-scroll-wrap">
        <div className="tab-bar">
          {[{id:'listas',l:'Listas'},{id:'campanas',l:'Tipos de campaña'},{id:'proximo',l:'Próximo envío'},{id:'stats',l:'Estadísticas'}].map(t => (
            <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={() => setTab(t.id)}>{t.l}</button>
          ))}
        </div>
      </div>

      {/* TAB: Listas */}
      {tab === 'listas' && (
        <div className="dia-card">
          <div className="dia-card-head">
            <div><div className="dia-card-ttl">Listas de contactos</div><div className="dia-card-sub">Segmentadas automáticamente por la IA</div></div>
            <span style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontWeight:600,color:'#1C2D44'}}>847 <span style={{fontSize:'0.7rem',fontFamily:'var(--sans)',fontWeight:500,color:'rgba(28,45,68,0.5)',letterSpacing:'0.08em'}}>CONTACTOS TOTALES</span></span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {listas.map((l,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 14px',background:'rgba(28,45,68,0.02)',borderRadius:10,border:'0.5px solid rgba(28,45,68,0.06)'}}>
                <div style={{width:40,height:40,borderRadius:10,background:l.cBg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>{l.ico}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>{l.nombre}</div>
                  <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)'}}>{l.desc}</div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',fontWeight:500,color:'#1C2D44'}}>{l.n}</div>
                  <div style={{fontSize:'0.65rem',color:'rgba(28,45,68,0.45)'}}>contactos</div>
                </div>
                <button className="btn-ghost" style={{padding:'5px 10px',fontSize:'0.72rem'}}>Enviar →</button>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,paddingTop:16,borderTop:'0.5px dashed rgba(28,45,68,0.12)',display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
            <span style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginRight:4}}>Añadir contactos:</span>
            <button className="btn-ghost" style={{fontSize:'0.76rem',padding:'5px 12px'}}>↑ Subir CSV / Excel</button>
            <button className="btn-ghost" style={{fontSize:'0.76rem',padding:'5px 12px'}}>Importar de CRM</button>
            <button className="btn-ghost" style={{fontSize:'0.76rem',padding:'5px 12px'}}>+ Añadir uno a uno</button>
          </div>
        </div>
      )}

      {/* TAB: Campañas */}
      {tab === 'campanas' && (
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Tipos de campaña</div><div className="dia-card-sub">Plantillas preparadas por IA según tu sector</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {campanas.map((c,i) => (
              <div key={i} style={{padding:14,background:'rgba(28,45,68,0.02)',borderRadius:10,border:'0.5px solid rgba(28,45,68,0.06)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
                  <div style={{fontSize:'0.86rem',fontWeight:600,color:'#1C2D44'}}>{c.nombre}</div>
                  <span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:'rgba(28,45,68,0.07)',color:'rgba(28,45,68,0.6)',fontWeight:500}}>{c.freq}</span>
                </div>
                <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginBottom:10}}>{c.desc}</div>
                <div style={{height:4,background:'rgba(28,45,68,0.08)',borderRadius:2,overflow:'hidden',marginBottom:8}}>
                  <div style={{width:c.pct,height:'100%',background:'#2E5A8C',borderRadius:2}}></div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>
                  <span>Próximo envío · <strong style={{color:'#1C2D44'}}>{c.proximo}</strong></span>
                  <span>{c.enviados} enviados</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Próximo envío */}
      {tab === 'proximo' && (
        <div className="dia-grid">
          <div className="dia-card" style={{gridColumn:'1/-1'}}>
            <div className="dia-card-head"><div className="dia-card-ttl">Próximo envío · Actualidad del sector</div><div className="dia-card-sub">Martes 21 de abril · 08:15 · 142 destinatarios</div></div>
            <div style={{padding:16,background:'rgba(28,45,68,0.03)',borderRadius:10,marginBottom:14}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:'0.76rem',color:'rgba(28,45,68,0.6)'}}>
                <span><strong style={{color:'#1C2D44'}}>De:</strong> Iker Arrieta &lt;iker@arrietaconsultores.com&gt;</span>
              </div>
              <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginBottom:4}}><strong style={{color:'#1C2D44'}}>Para:</strong> Leads y potenciales · 142 destinatarios</div>
              <div style={{fontSize:'0.76rem',marginBottom:12}}><strong style={{color:'#1C2D44'}}>Asunto:</strong> <span style={{color:'#2E5A8C',fontWeight:500}}>Una cosa que aprendí esta semana trabajando con clientes</span></div>
              <div style={{padding:16,background:'#FFFFFF',borderRadius:8,border:'0.5px solid rgba(28,45,68,0.08)'}}>
                <div style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:500,color:'#1C2D44',marginBottom:10,lineHeight:1.3}}>Cómo dejé de trabajar<br/><em>con los clientes equivocados.</em></div>
                <div style={{fontSize:'0.82rem',color:'rgba(28,45,68,0.7)',lineHeight:1.6}}>
                  <p style={{marginBottom:8}}>Hola,</p>
                  <p style={{marginBottom:8}}>Hace unos años aceptaba cualquier proyecto que llegara. Eso me costó varios meses de trabajo mal pagado, clientes que no valoran lo que haces y noches dando vueltas a si ibas a cobrar.</p>
                  <p style={{marginBottom:8}}>Con el tiempo aprendí a elegir. No porque me lo pudiera permitir, sino porque sin eso el negocio no funciona.</p>
                  <p>Si estás en un momento parecido y quieres hablarlo, puedo hacer hueco esta semana.</p>
                </div>
                <div style={{marginTop:14,textAlign:'center'}}><button style={{padding:'10px 24px',background:'#1C2D44',border:'none',borderRadius:8,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Hablamos →</button></div>
              </div>
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button className="btn-ghost" style={{flex:1}}>Editar email</button>
              <button style={{flex:1,padding:'9px 18px',background:'#22A06B',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Aprobar y programar →</button>
            </div>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Optimización IA</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <div style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:'rgba(28,45,68,0.5)',marginBottom:3}}>Hora óptima</div>
                <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>Martes 21 · 08:15</div>
                <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)'}}>Tus leads abren el 58% más en esta franja</div>
              </div>
              <div style={{padding:10,background:'rgba(28,45,68,0.03)',borderRadius:8}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:'rgba(28,45,68,0.5)',marginBottom:6}}>A/B asunto · 3 variantes</div>
                {[{t:'Una cosa que aprendí esta semana',r:'48%',winner:true},{t:'Cómo dejé de trabajar con los clientes equivocados',r:'41%'},{t:'Lo que cambió cuando empecé a elegir clientes',r:'37%'}].map((o,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 8px',background:o.winner?'rgba(34,160,107,0.08)':'transparent',borderRadius:6,marginBottom:4}}>
                    <span style={{fontSize:'0.73rem',color:'#1C2D44',flex:1,marginRight:8}}>{o.t}</span>
                    <span style={{fontSize:'0.73rem',fontWeight:600,color:o.winner?'#22A06B':'rgba(28,45,68,0.5)'}}>{o.r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Modo de envío</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[{m:'Manual',d:'La IA prepara. Tú revisas y envías.'},{m:'Revisión',d:'La IA prepara todo. Tú das OK.',active:true},{m:'Automático',d:'La IA prepara y envía sola.'}].map((mo,i) => (
                <div key={i} style={{padding:'10px 12px',background:mo.active?'rgba(34,160,107,0.06)':'rgba(28,45,68,0.02)',border:`0.5px solid ${mo.active?'rgba(34,160,107,0.2)':'rgba(28,45,68,0.08)'}`,borderRadius:8,cursor:'pointer'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${mo.active?'#22A06B':'rgba(28,45,68,0.2)'}`,background:mo.active?'#22A06B':'transparent',flexShrink:0}}></div>
                    <div>
                      <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{mo.m}</div>
                      <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)'}}>{mo.d}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Estadísticas */}
      {tab === 'stats' && (
        <div className="dia-grid">
          <div className="dia-card" style={{gridColumn:'1/-1'}}>
            <div className="dia-card-head"><div className="dia-card-ttl">Estadísticas · últimos 30 días</div></div>
            <div className="dia-kpis" style={{marginBottom:0}}>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Emails enviados</div><div className="dia-kpi-val">1.240</div><div className="dia-kpi-trend up">3 campañas</div></div>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Tasa apertura</div><div className="dia-kpi-val">38.2%</div><div className="dia-kpi-trend up">↑ Media sector 22%</div></div>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Clics en CTA</div><div className="dia-kpi-val">8.4%</div><div className="dia-kpi-trend up">↑ Media sector 3.1%</div></div>
              <div className="dia-kpi"><div className="dia-kpi-lbl">Bajas este mes</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">0.3% · muy bajo</div></div>
            </div>
          </div>
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA · Recomendaciones</div></div>
            <div className="ins-list" style={{gap:9}}>
              <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Asuntos cortos funcionan mejor</div><div className="ins-desc">Tus emails con asunto de menos de 8 palabras tienen un 42% más de apertura.</div></div></div>
              <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Reactivar 54 antiguos clientes</div><div className="ins-desc">Tienes 54 contactos sin actividad. Una campaña de reactivación puede generar 2-3 proyectos.</div></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
