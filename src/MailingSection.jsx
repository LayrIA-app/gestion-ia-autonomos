import { useState } from 'react'
import Modal from './Modal'
import './sections.css'

const listas = [
  {ico:'⭐',nombre:'VIP · Top 10 clientes',desc:'Clientes con iguala o proyectos > 8.000 €',n:12,cBg:'rgba(212,165,116,0.15)',cColor:'#8B5E34'},
  {ico:'👤',nombre:'Clientes activos',desc:'Con proyecto en curso o cerrado < 6 meses',n:68,cBg:'rgba(46,90,140,0.1)',cColor:'#2E5A8C'},
  {ico:'✅',nombre:'Leads y potenciales',desc:'Recibieron propuesta sin cerrar aún',n:142,cBg:'rgba(34,160,107,0.1)',cColor:'#22A06B'},
  {ico:'🕐',nombre:'Antiguos clientes',desc:'Sin actividad > 12 meses · a reactivar',n:54,cBg:'rgba(28,45,68,0.07)',cColor:'rgba(28,45,68,0.6)'},
  {ico:'📧',nombre:'Newsletter general',desc:'Suscriptores web · formulario LinkedIn',n:571,cBg:'rgba(188,212,232,0.2)',cColor:'#2E5A8C'},
]

const campanas = [
  {nombre:'Informativo',freq:'Mensual',desc:'Novedades del negocio, nuevos servicios, cambios de equipo.',proximo:'5 de mayo',enviados:12,pct:'85%'},
  {nombre:'Actualidad del sector',freq:'Bi-semanal',desc:'Análisis de noticias y tendencias. Te posiciona como experto.',proximo:'21 de abril',enviados:8,pct:'72%'},
  {nombre:'Promocional',freq:'Puntual',desc:'Ofertas, nuevos servicios, fin de año fiscal.',proximo:'28 de abril',enviados:2,pct:'91%'},
  {nombre:'Campaña temática',freq:'Según calendario',desc:'Black Friday, rentrée, cierre fiscal.',proximo:'Junio · Planes 2S',enviados:4,pct:'68%'},
  {nombre:'Mix completo',freq:'Mensual',desc:'Resumen curado con novedades + sector + CTA a tus servicios.',proximo:'15 de mayo',enviados:9,pct:'79%'},
]

function ModalEnviarEmail({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={560} title="Aprobar y programar envío" subtitle="Actualidad del sector · Martes 21 de abril · 08:15 · 142 destinatarios">
      <div className="dm-field"><div className="dm-label">Lista de destinatarios</div><select className="dm-select"><option>Leads y potenciales · 142 contactos</option><option>Clientes activos · 68 contactos</option><option>Newsletter general · 571 contactos</option></select></div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Fecha de envío</div><input className="dm-input" type="date" defaultValue="2026-04-21"/></div>
        <div className="dm-field"><div className="dm-label">Hora</div><input className="dm-input" type="time" defaultValue="08:15"/></div>
      </div>
      <div className="dm-field"><div className="dm-label">Asunto seleccionado (A/B ganador)</div><input className="dm-input" defaultValue="Una cosa que aprendí esta semana trabajando con clientes"/></div>
      <div style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#22A06B',marginBottom:4}}>✦ IA enviará en el momento de mayor apertura según el comportamiento de tu lista.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-ghost">Solo guardar</button>
        <button className="dm-btn-primary">Programar envío →</button>
      </div>
    </Modal>
  )
}

function ModalNuevaCampaña({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Nueva campaña · IA" subtitle="La IA redactará el email completo basándose en tu contexto">
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Tipo</div><select className="dm-select"><option>Informativo</option><option>Actualidad del sector</option><option>Promocional</option><option>Temática</option><option>Mix completo</option></select></div>
        <div className="dm-field"><div className="dm-label">Lista</div><select className="dm-select"><option>Newsletter general</option><option>Clientes activos</option><option>Leads y potenciales</option><option>VIP</option></select></div>
      </div>
      <div className="dm-field"><div className="dm-label">Objetivo de la campaña</div><textarea className="dm-textarea" placeholder="Ej: Presentar el nuevo servicio de auditoría IA, recordar a los leads el cierre fiscal de abril..."/></div>
      <div className="dm-field"><div className="dm-label">Tono</div><select className="dm-select"><option>Cercano y directo (tu estilo habitual)</option><option>Más formal</option><option>Urgencia / acción</option></select></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">✦ Generar campaña con IA</button>
      </div>
    </Modal>
  )
}

export default function MailingSection() {
  const [tab, setTab] = useState('listas')
  const [enviarOpen, setEnviarOpen] = useState(false)
  const [nuevaOpen, setNuevaOpen] = useState(false)

  return (
    <div>
      <ModalEnviarEmail open={enviarOpen} onClose={() => setEnviarOpen(false)} />
      <ModalNuevaCampaña open={nuevaOpen} onClose={() => setNuevaOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Mailing</h1>
          <p className="page-subtitle">Email marketing con IA · Listas segmentadas, campañas automáticas y análisis de apertura.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA preparó el próximo envío · listo para revisar · 142 destinatarios</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => setNuevaOpen(true)}>Importar contactos</button>
          <button className="btn-primary" onClick={() => setNuevaOpen(true)}>+ Nueva campaña</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Contactos totales</div><div className="dia-kpi-val">847</div><div className="dia-kpi-trend up">5 listas activas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tasa apertura media</div><div className="dia-kpi-val">38%</div><div className="dia-kpi-trend up">↑ Sector: 22%</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Emails enviados · mes</div><div className="dia-kpi-val">1.240</div><div className="dia-kpi-trend up">3 campañas activas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Leads generados · email</div><div className="dia-kpi-val">2</div><div className="dia-kpi-trend up">este mes</div></div>
      </div>

      <div className="tab-scroll-wrap">
        <div className="tab-bar">
          {[{id:'listas',l:'Listas'},{id:'campanas',l:'Tipos de campaña'},{id:'proximo',l:'Próximo envío'},{id:'stats',l:'Estadísticas'}].map(t => (
            <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={() => setTab(t.id)}>{t.l}</button>
          ))}
        </div>
      </div>

      {tab === 'listas' && (
        <div className="dia-card">
          <div className="dia-card-head">
            <div><div className="dia-card-ttl">Listas de contactos</div><div className="dia-card-sub">Segmentadas automáticamente por la IA</div></div>
            <span style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontWeight:600,color:'#1C2D44'}}>847 <span style={{fontSize:'0.7rem',fontFamily:'var(--sans)',fontWeight:500,color:'rgba(28,45,68,0.5)',letterSpacing:'0.08em'}}>CONTACTOS</span></span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {listas.map((l,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 14px',background:'rgba(28,45,68,0.02)',borderRadius:10,border:'0.5px solid rgba(28,45,68,0.06)'}}>
                <div style={{width:40,height:40,borderRadius:10,background:l.cBg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>{l.ico}</div>
                <div style={{flex:1}}><div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>{l.nombre}</div><div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)'}}>{l.desc}</div></div>
                <div style={{textAlign:'right',flexShrink:0}}><div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',fontWeight:500,color:'#1C2D44'}}>{l.n}</div><div style={{fontSize:'0.65rem',color:'rgba(28,45,68,0.45)'}}>contactos</div></div>
                <button className="btn-ghost" style={{padding:'5px 10px',fontSize:'0.72rem'}} onClick={() => setEnviarOpen(true)}>Enviar →</button>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,paddingTop:16,borderTop:'0.5px dashed rgba(28,45,68,0.12)',display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
            <span style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginRight:4}}>Añadir contactos:</span>
            <button className="btn-ghost" style={{fontSize:'0.76rem',padding:'5px 12px'}}>↑ Subir CSV</button>
            <button className="btn-ghost" style={{fontSize:'0.76rem',padding:'5px 12px'}}>Importar de CRM</button>
            <button className="btn-ghost" style={{fontSize:'0.76rem',padding:'5px 12px'}}>+ Añadir uno a uno</button>
          </div>
        </div>
      )}

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

      {tab === 'proximo' && (
        <div className="dia-grid">
          <div className="dia-card" style={{gridColumn:'1/-1'}}>
            <div className="dia-card-head"><div className="dia-card-ttl">Próximo envío · Actualidad del sector</div><div className="dia-card-sub">Martes 21 de abril · 08:15 · 142 destinatarios</div></div>
            <div style={{padding:16,background:'rgba(28,45,68,0.03)',borderRadius:10,marginBottom:14}}>
              <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginBottom:4}}><strong style={{color:'#1C2D44'}}>Para:</strong> Leads y potenciales · 142 destinatarios</div>
              <div style={{fontSize:'0.76rem',marginBottom:12}}><strong style={{color:'#1C2D44'}}>Asunto (ganador A/B):</strong> <span style={{color:'#2E5A8C',fontWeight:500}}>Una cosa que aprendí esta semana trabajando con clientes</span></div>
              <div style={{padding:16,background:'#FFFFFF',borderRadius:8,border:'0.5px solid rgba(28,45,68,0.08)'}}>
                <div style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:500,color:'#1C2D44',marginBottom:10,lineHeight:1.3}}>Cómo dejé de trabajar<br/><em>con los clientes equivocados.</em></div>
                <div style={{fontSize:'0.82rem',color:'rgba(28,45,68,0.7)',lineHeight:1.6}}>
                  <p style={{marginBottom:8}}>Hola,</p>
                  <p style={{marginBottom:8}}>Hace unos años aceptaba cualquier proyecto que llegara. Eso me costó meses de trabajo mal pagado y noches sin dormir pensando en si ibas a cobrar.</p>
                  <p>Si estás en un momento parecido y quieres hablarlo, puedo hacer hueco esta semana.</p>
                </div>
                <div style={{marginTop:14,textAlign:'center'}}><button style={{padding:'10px 24px',background:'#1C2D44',border:'none',borderRadius:8,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Hablamos →</button></div>
              </div>
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <button className="btn-ghost" style={{flex:1}}>Editar email</button>
              <button style={{flex:1,padding:'9px 18px',background:'#22A06B',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}} onClick={() => setEnviarOpen(true)}>Aprobar y programar →</button>
            </div>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Optimización IA · A/B asunto</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {[{t:'Una cosa que aprendí esta semana',r:'48%',w:true},{t:'Cómo dejé de trabajar con los clientes equivocados',r:'41%'},{t:'Lo que cambió cuando empecé a elegir clientes',r:'37%'}].map((o,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',background:o.w?'rgba(34,160,107,0.08)':'rgba(28,45,68,0.03)',borderRadius:7,border:o.w?'0.5px solid rgba(34,160,107,0.2)':'none'}}>
                  <span style={{fontSize:'0.76rem',color:'#1C2D44',flex:1,marginRight:8}}>{o.t}</span>
                  <span style={{fontSize:'0.76rem',fontWeight:600,color:o.w?'#22A06B':'rgba(28,45,68,0.5)'}}>{o.r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Modo de envío</div></div>
            {[{m:'Manual',d:'La IA prepara. Tú revisas y envías.',active:false},{m:'Revisión',d:'La IA prepara todo. Tú das OK.',active:true},{m:'Automático',d:'La IA prepara y envía sola.',active:false}].map((mo,i) => (
              <div key={i} style={{padding:'10px 12px',background:mo.active?'rgba(34,160,107,0.06)':'rgba(28,45,68,0.02)',border:`0.5px solid ${mo.active?'rgba(34,160,107,0.2)':'rgba(28,45,68,0.08)'}`,borderRadius:8,cursor:'pointer',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${mo.active?'#22A06B':'rgba(28,45,68,0.2)'}`,background:mo.active?'#22A06B':'transparent',flexShrink:0}}></div>
                  <div><div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{mo.m}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)'}}>{mo.d}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
        </div>
      )}
    </div>
  )
}
