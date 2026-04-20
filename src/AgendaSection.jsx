import './sections.css'

export default function AgendaSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Agenda</h1>
          <p className="page-subtitle">Reuniones, tareas y compromisos · La IA prioriza y prepara cada cita automáticamente.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA ha preparado el briefing de las 3 reuniones de esta semana</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => alert('Sincronizando con Google Calendar…')}>Sincronizar</button>
          <button className="btn-primary" onClick={() => alert('Abriendo nueva cita…')}>+ Nueva cita</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Hoy · citas</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ 1 urgente</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Esta semana</div><div className="dia-kpi-val">8</div><div className="dia-kpi-trend up">2 con clientes nuevos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Horas reuniones · mes</div><div className="dia-kpi-val">14h</div><div className="dia-kpi-trend up">↓ 18% vs mes anterior</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Próxima factura</div><div className="dia-kpi-val">1 mayo</div><div className="dia-kpi-trend up">Metalúrgica Goi</div></div>
      </div>

      <div className="dia-grid">

        {/* Vista semanal — full width */}
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head">
            <div className="dia-card-ttl">Semana del 18 al 24 de abril 2026</div>
            <div className="dia-card-sub">Vista semanal · IA prepara cada reunión</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,overflowX:'auto'}}>

            {/* Lunes */}
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8,textAlign:'center'}}>Lun 18</div>
              <div style={{cursor:'pointer',padding:10,background:'rgba(198,93,74,0.08)',border:'0.5px solid rgba(198,93,74,0.25)',borderRadius:8,marginBottom:6}} onMouseEnter={e=>e.currentTarget.style.background='rgba(198,93,74,0.14)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(198,93,74,0.08)'}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'#C65D4A',marginBottom:2}}>09:00 · 60min</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>Bodegas Iriarte</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.55)'}}>Propuesta estrategia</div>
                <div style={{fontSize:'0.65rem',color:'#C65D4A',fontWeight:600,marginTop:4}}>⚡ Hoy · Presencial DoN</div>
              </div>
              <div style={{padding:10,background:'rgba(46,90,140,0.06)',borderRadius:8,marginBottom:6}}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'#2E5A8C',marginBottom:2}}>15:00 · 30min</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44'}}>Revisión propuestas</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)'}}>Bloque IA · interno</div>
              </div>
            </div>

            {/* Martes */}
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8,textAlign:'center'}}>Mar 19</div>
              <div style={{cursor:'pointer',padding:10,background:'rgba(46,90,140,0.06)',border:'0.5px solid rgba(46,90,140,0.15)',borderRadius:8,marginBottom:6}} onMouseEnter={e=>e.currentTarget.style.background='rgba(46,90,140,0.12)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(46,90,140,0.06)'}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'#2E5A8C',marginBottom:2}}>10:00 · 45min</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>Digiform SL</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.55)'}}>Kick-off mayo</div>
                <div style={{fontSize:'0.65rem',color:'#2E5A8C',fontWeight:600,marginTop:4}}>Google Meet</div>
              </div>
            </div>

            {/* Miércoles */}
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8,textAlign:'center'}}>Mié 20</div>
              <div style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8,marginBottom:6}}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'#22A06B',marginBottom:2}}>09:00 · 90min</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>Metalúrgica Goi</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.55)'}}>Revisión fase 3 CRM</div>
                <div style={{fontSize:'0.65rem',color:'#22A06B',fontWeight:600,marginTop:4}}>Presencial Donostia</div>
              </div>
              <div style={{padding:10,background:'rgba(28,45,68,0.03)',borderRadius:8}}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'rgba(28,45,68,0.4)',marginBottom:2}}>⚡ Vence hoy</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#C65D4A'}}>Pagar 303+130+111</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)'}}>3.326 € · AEAT</div>
              </div>
            </div>

            {/* Jueves */}
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8,textAlign:'center'}}>Jue 21</div>
              <div style={{cursor:'pointer',padding:10,background:'rgba(46,90,140,0.06)',border:'0.5px solid rgba(46,90,140,0.15)',borderRadius:8}} onMouseEnter={e=>e.currentTarget.style.background='rgba(46,90,140,0.12)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(46,90,140,0.06)'}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'#2E5A8C',marginBottom:2}}>11:00 · 60min</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>Garapen Consulting</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.55)'}}>Planificación Q2</div>
                <div style={{fontSize:'0.65rem',color:'#2E5A8C',fontWeight:600,marginTop:4}}>Teams</div>
              </div>
            </div>

            {/* Viernes */}
            <div>
              <div style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8,textAlign:'center'}}>Vie 22</div>
              <div style={{padding:10,background:'rgba(212,165,116,0.08)',borderRadius:8,marginBottom:6}}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'#8B5E34',marginBottom:2}}>10:00 · 30min</div>
                <div style={{fontSize:'0.78rem',fontWeight:500,color:'#1C2D44'}}>Innotek Basque</div>
                <div style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.55)'}}>Seguimiento semanal</div>
              </div>
              <div style={{padding:10,background:'rgba(28,45,68,0.03)',borderRadius:8}}>
                <div style={{fontSize:'0.68rem',fontWeight:600,color:'rgba(28,45,68,0.35)',marginBottom:2}}>14:00 · Bloque</div>
                <div style={{fontSize:'0.78rem',fontWeight:400,color:'rgba(28,45,68,0.5)'}}>Facturas + admin</div>
              </div>
            </div>

          </div>
        </div>

        {/* Preparación IA */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Preparación de reuniones</div><div className="dia-card-sub">Briefings automáticos antes de cada cita</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              {titulo:'Hoy 09:00 · Bodegas Iriarte', desc:'IA tiene: historial cliente, propuesta 28.000€, ROI estimado, 3 objeciones frecuentes.', color:'rgba(198,93,74,0.05)', borde:'rgba(198,93,74,0.2)', txtColor:'#C65D4A'},
              {titulo:'Mar 19 · Digiform SL', desc:'IA tiene: contrato firmado, hitos mayo, pendientes de WhatsApp.', color:'rgba(46,90,140,0.04)', borde:'rgba(46,90,140,0.12)', txtColor:'#2E5A8C'},
              {titulo:'Mié 20 · Metalúrgica Goi', desc:'IA tiene: avance CRM 65%, tareas pendientes fase 3, próximos hitos.', color:'rgba(34,160,107,0.04)', borde:'rgba(34,160,107,0.12)', txtColor:'#22A06B'},
            ].map((r,i) => (
              <div key={i} style={{cursor:'pointer',padding:12,background:r.color,border:`0.5px solid ${r.borde}`,borderRadius:10}} onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:'0.82rem',fontWeight:600,color:'#1C2D44'}}>{r.titulo}</span>
                  <span style={{fontSize:'0.7rem',fontWeight:600,color:r.txtColor}}>Preparar →</span>
                </div>
                <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.6)'}}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tareas semana */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Tareas · Esta semana</div><div className="dia-card-sub">Detectadas por IA en conversaciones y emails</div></div>
          <div className="dia-tasks">
            {[
              {t:'Revisar propuesta Bodegas Iriarte', m:'Ajustar ROI · Antes de las 09:00h de hoy', badge:'warn', bl:'Urgente'},
              {t:'Pagar Mod. 303 + 130 + 111', m:'3.326 € · Vence miércoles 20', badge:'warn', bl:'3 días'},
              {t:'Enviar resumen llamada a Txema', m:'Digiform · WhatsApp de hoy', badge:'ia', bl:'IA lista'},
              {t:'Reclamar F-2026-035 Metalúrgica Goi', m:'Vencida 18 días · 2.904 €', badge:'warn', bl:'Urgente'},
              {t:'Preparar agenda Garapen · Jueves 11:00h', m:'Planificación Q2 · 60 min', badge:'ia', bl:'IA lista'},
              {t:'Publicar post LinkedIn · martes', m:'IA lo tiene preparado · sobre CRM pymes', badge:'ia', bl:'IA lista'},
            ].map((task,i) => (
              <div key={i} className="dia-task">
                <div className="dia-task-check"></div>
                <div className="dia-task-body"><div className="dia-task-title">{task.t}</div><div className="dia-task-meta">{task.m}</div></div>
                <span className={`dia-task-badge ${task.badge}`}>{task.bl}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
