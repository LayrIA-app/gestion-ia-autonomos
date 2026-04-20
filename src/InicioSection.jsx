import { useState } from 'react'
import './sections.css'

function showToast(msg) { alert(msg) }

export default function InicioSection() {
  const [activeTab, setActiveTab] = useState('hoy')
  const [collapseToasts, setCollapseToasts] = useState(true)
  const [collapseTareasExtraidas, setCollapseTareasExtraidas] = useState(false)
  const [collapseResumen, setCollapseResumen] = useState(true)
  const [collapseProgreso, setCollapseProgreso] = useState(true)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Buenos días, Iker ☀</h1>
          <p className="page-subtitle">Vas un 12% por encima de tu media de abril. Buen ritmo.</p>
          <div className="ia-bar">
            <div className="ia-bar-dot"></div>
            <span className="ia-bar-txt">✦ IA preparando tu día · revisando cobros pendientes y agenda de hoy</span>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => showToast('Exportando resumen del mes…')}>Exportar mes</button>
          <button className="btn-primary" onClick={() => showToast('Abriendo nueva tarea…')}>+ Nueva tarea</button>
        </div>
      </div>

      {/* PESTAÑAS */}
      <div className="tab-scroll-wrap">
        <div className="tab-bar">
          <button className={`tab-btn${activeTab==='hoy'?' active':''}`} onClick={() => setActiveTab('hoy')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Hoy
          </button>
          <button className={`tab-btn${activeTab==='agenda'?' active':''}`} onClick={() => setActiveTab('agenda')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Agenda
          </button>
          <button className={`tab-btn${activeTab==='comunicacion'?' active':''}`} onClick={() => setActiveTab('comunicacion')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Comunicación <span className="tab-badge">4</span>
          </button>
          <button className={`tab-btn${activeTab==='insights'?' active':''}`} onClick={() => setActiveTab('insights')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            IA Insights
          </button>
        </div>
      </div>

      {/* ── TAB: HOY ── */}
      <div className={`tab-panel${activeTab==='hoy'?' active':''}`}>
        <div className="dia-kpis">
          <div className="dia-kpi">
            <div className="dia-kpi-lbl">Facturación mes</div>
            <div className="dia-kpi-val">11.400 €</div>
            <div className="dia-kpi-trend up">↑ 12% vs media abril</div>
            <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,22 13,18 26,20 39,12 52,8 65,10 80,4" stroke="#22A06B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,22 13,18 26,20 39,12 52,8 65,10 80,4 80,28 0,28" fill="rgba(34,160,107,0.08)"/></svg>
          </div>
          <div className="dia-kpi">
            <div className="dia-kpi-lbl">Clientes activos</div>
            <div className="dia-kpi-val">8</div>
            <div className="dia-kpi-trend up">↑ 2 nuevos este mes</div>
            <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,24 13,22 26,20 39,18 52,16 65,14 80,10" stroke="#2E5A8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,24 13,22 26,20 39,18 52,16 65,14 80,10 80,28 0,28" fill="rgba(46,90,140,0.08)"/></svg>
          </div>
          <div className="dia-kpi">
            <div className="dia-kpi-lbl">Propuestas en curso</div>
            <div className="dia-kpi-val">3</div>
            <div className="dia-kpi-trend warn">⚡ 1 vence en 2 días</div>
            <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,20 13,22 26,16 39,18 52,12 65,14 80,10" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,20 13,22 26,16 39,18 52,12 65,14 80,10 80,28 0,28" fill="rgba(212,165,116,0.08)"/></svg>
          </div>
          <div className="dia-kpi">
            <div className="dia-kpi-lbl">Cobros pendientes</div>
            <div className="dia-kpi-val">4.200 €</div>
            <div className="dia-kpi-trend warn">⚡ 2 facturas vencidas</div>
            <svg className="dia-sparkline" viewBox="0 0 80 28" fill="none"><polyline points="0,14 13,18 26,20 39,16 52,22 65,20 80,24" stroke="#C65D4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polygon points="0,14 13,18 26,20 39,16 52,22 65,20 80,24 80,28 0,28" fill="rgba(198,93,74,0.08)"/></svg>
          </div>
        </div>

        <div className="dia-grid-agenda">
          {/* Agenda del día */}
          <div className="dia-card">
            <div className="dia-card-head">
              <div className="dia-card-ttl">Agenda de hoy</div>
              <div className="dia-card-sub">Jueves 17 de abril</div>
            </div>
            <div className="dia-agenda">
              <div className="dia-agenda-item past">
                <div className="dia-agenda-time">09:00</div>
                <div className="dia-agenda-dot past"></div>
                <div className="dia-agenda-body">
                  <div className="dia-agenda-title">Llamada Txema García · Digiform SL</div>
                  <div className="dia-agenda-meta">Revisión avance 1T · 45 min · ✓ Completada</div>
                </div>
              </div>
              <div className="dia-agenda-item now">
                <div className="dia-agenda-time">10:30</div>
                <div className="dia-agenda-dot now"></div>
                <div className="dia-agenda-body">
                  <div className="dia-agenda-title">Propuesta Bodegas Iriarte</div>
                  <div className="dia-agenda-meta">Preparar antes de la reunión de mañana · En curso</div>
                  <div className="dia-agenda-badge ia">IA: borrador listo para revisar →</div>
                </div>
              </div>
              <div className="dia-agenda-item">
                <div className="dia-agenda-time">12:00</div>
                <div className="dia-agenda-dot"></div>
                <div className="dia-agenda-body">
                  <div className="dia-agenda-title">Videollamada · Ana Ruiz · Metalúrgica Goi</div>
                  <div className="dia-agenda-meta">Kick-off proyecto digitalización · Google Meet</div>
                </div>
              </div>
              <div className="dia-agenda-item">
                <div className="dia-agenda-time">16:00</div>
                <div className="dia-agenda-dot"></div>
                <div className="dia-agenda-body">
                  <div className="dia-agenda-title">Bloque IA · Revisar emails + mailing</div>
                  <div className="dia-agenda-meta">Tiempo libre detectado por IA para tareas de gestión</div>
                  <div className="dia-agenda-badge">Sugerido por IA</div>
                </div>
              </div>
              <div className="dia-agenda-item">
                <div className="dia-agenda-time">18:00</div>
                <div className="dia-agenda-dot"></div>
                <div className="dia-agenda-body">
                  <div className="dia-agenda-title">Cierre de día</div>
                  <div className="dia-agenda-meta">Revisar tareas completadas · Preparar mañana</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tareas + Toasts */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="dia-card">
              <div className="dia-card-head">
                <div className="dia-card-ttl">Tareas para hoy</div>
                <div className="dia-card-sub">3 de 7 completadas</div>
              </div>
              <div className="dia-tasks">
                <div className="dia-task done">
                  <div className="dia-task-check done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <div className="dia-task-body"><div className="dia-task-title">Enviar factura F-2026-041 a Digiform</div><div className="dia-task-meta">Completada · 09:45</div></div>
                </div>
                <div className="dia-task done">
                  <div className="dia-task-check done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <div className="dia-task-body"><div className="dia-task-title">Llamada de seguimiento Txema García</div><div className="dia-task-meta">Completada · 09:52</div></div>
                </div>
                <div className="dia-task done">
                  <div className="dia-task-check done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <div className="dia-task-body"><div className="dia-task-title">Aprobar post LinkedIn (Educativo)</div><div className="dia-task-meta">Completada · 10:05</div></div>
                </div>
                <div className="dia-task urgent">
                  <div className="dia-task-check"></div>
                  <div className="dia-task-body"><div className="dia-task-title">Revisar propuesta Bodegas Iriarte</div><div className="dia-task-meta urgent-lbl">⚡ Urgente · Reunión mañana 09:00</div></div>
                  <span className="dia-task-badge ia">IA lista</span>
                </div>
                <div className="dia-task">
                  <div className="dia-task-check"></div>
                  <div className="dia-task-body"><div className="dia-task-title">Responder email Ana Ruiz (Metalúrgica Goi)</div><div className="dia-task-meta">Antes de la videollamada de las 12:00</div></div>
                  <span className="dia-task-badge ia">IA draft</span>
                </div>
                <div className="dia-task">
                  <div className="dia-task-check"></div>
                  <div className="dia-task-body"><div className="dia-task-title">Registrar gastos semana (3 pendientes)</div><div className="dia-task-meta">OCR listo · Solo confirmar</div></div>
                </div>
                <div className="dia-task">
                  <div className="dia-task-check"></div>
                  <div className="dia-task-body"><div className="dia-task-title">Reclamar cobro F-2026-038 (vencida)</div><div className="dia-task-meta">Venció hace 8 días · 1.800 €</div></div>
                  <span className="dia-task-badge warn">⚡ Vencida</span>
                </div>
              </div>
            </div>

            <div className="dia-card">
              <div className={`collapse-block${collapseToasts?' open':''}`}>
                <div className="collapse-trigger" onClick={() => setCollapseToasts(!collapseToasts)}>
                  <span className="collapse-trigger-lbl">IA trabajando ahora · Actividad en tiempo real</span>
                  <div className="collapse-trigger-ico"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                </div>
                <div className="collapse-body">
                  <div className="collapse-body-inner">
                    <div className="dia-toasts">
                      <div className="dia-toast done">
                        <div className="dia-toast-dot done"></div>
                        <div className="dia-toast-body"><div className="dia-toast-txt">Email de seguimiento a Bodegas Iriarte generado</div><div className="dia-toast-time">Hace 12 min</div></div>
                        <button className="dia-toast-btn" onClick={() => showToast('Detalle')}>Ver</button>
                      </div>
                      <div className="dia-toast done">
                        <div className="dia-toast-dot done"></div>
                        <div className="dia-toast-body"><div className="dia-toast-txt">Post LinkedIn del martes 21 preparado y listo</div><div className="dia-toast-time">Hace 34 min</div></div>
                        <button className="dia-toast-btn" onClick={() => showToast('Revisando…')}>Revisar</button>
                      </div>
                      <div className="dia-toast active">
                        <div className="dia-toast-dot active"></div>
                        <div className="dia-toast-body"><div className="dia-toast-txt">Generando propuesta Bodegas Iriarte…</div><div className="dia-toast-time">En progreso · ~2 min</div></div>
                        <div className="dia-toast-progress"><div className="dia-toast-progress-fill" style={{width:'65%'}}></div></div>
                      </div>
                      <div className="dia-toast pending">
                        <div className="dia-toast-dot pending"></div>
                        <div className="dia-toast-body"><div className="dia-toast-txt">Newsletter de mayo · En cola para las 16:00</div><div className="dia-toast-time">Programado</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB: AGENDA ── */}
      <div className={`tab-panel${activeTab==='agenda'?' active':''}`}>
        <div className="dia-kpis">
          <div className="dia-kpi"><div className="dia-kpi-lbl">Reuniones hoy</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">↑ Día completo</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Próxima cita</div><div className="dia-kpi-val">12:00</div><div className="dia-kpi-trend up">Videollamada Ana</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Esta semana</div><div className="dia-kpi-val">8</div><div className="dia-kpi-trend up">Reuniones totales</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Briefings IA</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">Preparados automáticamente</div></div>
        </div>
        <div className="dia-card" style={{marginBottom:16}}>
          <div className="dia-card-head">
            <div className="dia-card-ttl">Agenda · Semana 14–20 abril</div>
            <div className="dia-card-sub">IA ha preparado el briefing de las 3 reuniones de esta semana</div>
          </div>
          <div className="dia-agenda">
            <div className="dia-agenda-item past"><div className="dia-agenda-time">Lun</div><div className="dia-agenda-dot past"></div><div className="dia-agenda-body"><div className="dia-agenda-title">Revisión mensual Construcciones Mendía</div><div className="dia-agenda-meta">Reunión presencial · 2h · ✓ Completada</div></div></div>
            <div className="dia-agenda-item past"><div className="dia-agenda-time">Mar</div><div className="dia-agenda-dot past"></div><div className="dia-agenda-body"><div className="dia-agenda-title">Prospección · Bodegas Iriarte</div><div className="dia-agenda-meta">Primera toma de contacto · 1h · ✓ Completada</div></div></div>
            <div className="dia-agenda-item now"><div className="dia-agenda-time">Hoy</div><div className="dia-agenda-dot now"></div><div className="dia-agenda-body"><div className="dia-agenda-title">Videollamada Ana Ruiz · Metalúrgica Goi</div><div className="dia-agenda-meta">12:00 · Kick-off digitalización · Google Meet</div><div className="dia-agenda-badge ia">IA: briefing preparado →</div></div></div>
            <div className="dia-agenda-item"><div className="dia-agenda-time">Vie</div><div className="dia-agenda-dot"></div><div className="dia-agenda-body"><div className="dia-agenda-title">Reunión propuesta · Bodegas Iriarte</div><div className="dia-agenda-meta">09:00 · Presentar propuesta · 1.5h</div><div className="dia-agenda-badge ia">IA: propuesta en preparación →</div></div></div>
          </div>
        </div>
      </div>

      {/* ── TAB: COMUNICACIÓN ── */}
      <div className={`tab-panel${activeTab==='comunicacion'?' active':''}`}>
        <div className="dia-kpis">
          <div className="dia-kpi"><div className="dia-kpi-lbl">Mensajes sin leer</div><div className="dia-kpi-val">4</div><div className="dia-kpi-trend warn">⚡ Requieren respuesta</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Drafts IA listos</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">↑ Listos para enviar</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Tiempo respuesta</div><div className="dia-kpi-val">1.8h</div><div className="dia-kpi-trend up">↓ 34% vs semana pasada</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Tareas extraídas</div><div className="dia-kpi-val">5</div><div className="dia-kpi-trend up">Detectadas en conversaciones</div></div>
        </div>
        <div className="dia-grid">
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Bandeja unificada</div><div className="dia-card-sub">Email + WhatsApp · Hoy</div></div>
            <div className="dia-tasks">
              <div className="dia-task"><div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div><div className="dia-task-body"><div className="dia-task-title">Ana Ruiz · Metalúrgica Goi</div><div className="dia-task-meta">Re: Kick-off hoy — ¿a qué hora nos conectamos?</div></div><span className="dia-task-badge ia">Draft →</span></div>
              <div className="dia-task"><div className="dia-task-check" style={{background:'rgba(37,211,102,0.15)',borderColor:'#25D366'}}></div><div className="dia-task-body"><div className="dia-task-title">Txema García · WhatsApp</div><div className="dia-task-meta">Genial la llamada. Mándame el resumen y miramos mayo.</div></div><span className="dia-task-badge ia">Draft →</span></div>
              <div className="dia-task"><div className="dia-task-check" style={{background:'rgba(28,45,68,0.06)',borderColor:'rgba(28,45,68,0.15)'}}></div><div className="dia-task-body"><div className="dia-task-title">Bankinter · Cobro recibido 2.400 €</div><div className="dia-task-meta">Transferencia de Metalúrgica Goi · F-2026-039</div></div><span className="dia-task-badge" style={{background:'rgba(34,160,107,0.12)',color:'#22A06B'}}>✓ Registrado</span></div>
            </div>
          </div>
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA ha preparado</div><div className="dia-card-sub">Drafts listos para enviar</div></div>
            <div className="dia-tasks">
              <div className="dia-task"><div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div><div className="dia-task-body"><div className="dia-task-title">Respuesta a Ana Ruiz</div><div className="dia-task-meta">Confirma videollamada + adjunta agenda</div></div><span className="dia-task-badge ia">Ver →</span></div>
              <div className="dia-task"><div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div><div className="dia-task-body"><div className="dia-task-title">Resumen llamada para Txema</div><div className="dia-task-meta">3 puntos acordados + próximos pasos</div></div><span className="dia-task-badge ia">Ver →</span></div>
              <div className="dia-task"><div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div><div className="dia-task-body"><div className="dia-task-title">Recordatorio cobro F-038</div><div className="dia-task-meta">Email amable · Vencida 8 días</div></div><span className="dia-task-badge warn">Ver →</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB: IA INSIGHTS ── */}
      <div className={`tab-panel${activeTab==='insights'?' active':''}`}>
        <div className="dia-kpis" style={{marginBottom:18}}>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Horas ahorradas · semana</div><div className="dia-kpi-val">11.4h</div><div className="dia-kpi-trend up">↑ vs 8.2h semana pasada</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Tareas completadas IA</div><div className="dia-kpi-val">23</div><div className="dia-kpi-trend up">Emails, posts, propuestas</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Ratio aceptación drafts</div><div className="dia-kpi-val">87%</div><div className="dia-kpi-trend up">↑ IA aprende tu estilo</div></div>
          <div className="dia-kpi"><div className="dia-kpi-lbl">Alertas activas</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ Requieren atención</div></div>
        </div>

        <div className="dia-grid">
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Sugerencias IA · Esta semana</div><div className="dia-card-sub">Basadas en tu actividad y datos del negocio</div></div>
            <div className="ins-list">
              <div className="ins-item">
                <div className="ins-ico green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg></div>
                <div className="ins-body"><div className="ins-title">Digiform SL tiene alta probabilidad de cierre</div><div className="ins-desc">Txema ha respondido en menos de 2h en las últimas 3 comunicaciones. Señal de compra. Proponer fecha de firma esta semana.</div></div>
                <button className="btn-primary" style={{padding:'6px 12px',fontSize:'0.72rem',whiteSpace:'nowrap'}} onClick={() => showToast('Acción IA en curso')}>Actuar</button>
              </div>
              <div className="ins-item">
                <div className="ins-ico warn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
                <div className="ins-body"><div className="ins-title">Pico de trabajo en 3 semanas — ajustar agenda</div><div className="ins-desc">Si cierras Digiform y Bodegas Iriarte esta semana, tendrás 3 proyectos activos en mayo. La IA sugiere bloquear los viernes para gestión interna.</div></div>
                <button className="btn-ghost" style={{padding:'6px 12px',fontSize:'0.72rem',whiteSpace:'nowrap'}} onClick={() => showToast('Abriendo plan')}>Ver plan</button>
              </div>
              <div className="ins-item">
                <div className="ins-ico blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
                <div className="ins-body"><div className="ins-title">Tu LinkedIn tiene más alcance los martes 8:30h</div><div className="ins-desc">En las últimas 4 semanas, los posts publicados ese horario tienen 2.3x más impresiones que el resto. El próximo post está programado para ese slot.</div></div>
              </div>
              <div className="ins-item">
                <div className="ins-ico red"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                <div className="ins-body"><div className="ins-title">2 facturas vencidas — riesgo de tesorería</div><div className="ins-desc">F-2026-038 (1.800 €, 8 días) y F-2026-035 (2.400 €, 14 días) están sin cobrar. La IA ha preparado emails de reclamación para enviar con un clic.</div></div>
                <button className="btn-primary" style={{padding:'6px 12px',fontSize:'0.72rem',whiteSpace:'nowrap',background:'#C65D4A'}} onClick={() => showToast('Enviando reclamación…')}>Reclamar</button>
              </div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,alignItems:'start'}}>
            <div className="dia-card">
              <div className={`collapse-block${collapseResumen?' open':''}`}>
                <div className="collapse-trigger" onClick={() => setCollapseResumen(!collapseResumen)}>
                  <span className="collapse-trigger-lbl">Resumen semana · 14-17 abril</span>
                  <div className="collapse-trigger-ico"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                </div>
                <div className="collapse-body">
                  <div className="collapse-body-inner">
                    <div className="ins-summary">
                      <div className="ins-sum-row"><span className="ins-sum-lbl">Emails gestionados</span><span className="ins-sum-val">38 <span style={{color:'#22A06B',fontSize:'0.72rem'}}>↑</span></span></div>
                      <div className="ins-sum-row"><span className="ins-sum-lbl">Reuniones</span><span className="ins-sum-val">5</span></div>
                      <div className="ins-sum-row"><span className="ins-sum-lbl">Propuestas enviadas</span><span className="ins-sum-val">2</span></div>
                      <div className="ins-sum-row"><span className="ins-sum-lbl">Facturas emitidas</span><span className="ins-sum-val">3</span></div>
                      <div className="ins-sum-row"><span className="ins-sum-lbl">Cobros recibidos</span><span className="ins-sum-val">6.200 €</span></div>
                      <div className="ins-sum-row"><span className="ins-sum-lbl">Posts publicados</span><span className="ins-sum-val">2</span></div>
                      <div className="ins-sum-row warn"><span className="ins-sum-lbl">Facturas vencidas</span><span className="ins-sum-val warn">2 · 4.200 €</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dia-card">
              <div className={`collapse-block${collapseProgreso?' open':''}`}>
                <div className="collapse-trigger" onClick={() => setCollapseProgreso(!collapseProgreso)}>
                  <span className="collapse-trigger-lbl">Progreso mes · Día 17 de 30</span>
                  <div className="collapse-trigger-ico"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                </div>
                <div className="collapse-body">
                  <div className="collapse-body-inner">
                    <div className="ins-progress-list">
                      <div className="ins-prog"><div className="ins-prog-lbl">Facturación <span>11.400 / 18.000 €</span></div><div className="ins-prog-bar"><div className="ins-prog-fill" style={{width:'63%',background:'#22A06B'}}></div></div><div className="ins-prog-pct">63%</div></div>
                      <div className="ins-prog"><div className="ins-prog-lbl">Clientes contactados <span>8 / 12</span></div><div className="ins-prog-bar"><div className="ins-prog-fill" style={{width:'67%',background:'#2E5A8C'}}></div></div><div className="ins-prog-pct">67%</div></div>
                      <div className="ins-prog"><div className="ins-prog-lbl">Propuestas enviadas <span>2 / 4</span></div><div className="ins-prog-bar"><div className="ins-prog-fill" style={{width:'50%',background:'#D4A574'}}></div></div><div className="ins-prog-pct">50%</div></div>
                      <div className="ins-prog"><div className="ins-prog-lbl">Posts publicados <span>6 / 13</span></div><div className="ins-prog-bar"><div className="ins-prog-fill" style={{width:'46%',background:'#BCD4E8'}}></div></div><div className="ins-prog-pct">46%</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
