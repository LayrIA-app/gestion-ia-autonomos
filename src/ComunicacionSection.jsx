import './sections.css'

const emailIco = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const waIco = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.29-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.933 0-3.742-.516-5.296-1.415l-.38-.225-3.737.885.944-3.638-.247-.396A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>

export default function ComunicacionSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Comunicación</h1>
          <p className="page-subtitle">Bandeja unificada · Email + WhatsApp + Portal cliente · Drafts preparados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA ha redactado 3 drafts · detectadas 5 tareas en conversaciones</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => alert('Abriendo configuración de canales…')}>Canales</button>
          <button className="btn-primary" onClick={() => alert('Redactando nuevo mensaje con IA…')}>+ Nuevo mensaje</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Sin leer · hoy</div><div className="dia-kpi-val">4</div><div className="dia-kpi-trend warn">⚡ 2 requieren respuesta</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Drafts IA listos</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">✓ Revisados y listos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tareas extraídas</div><div className="dia-kpi-val">5</div><div className="dia-kpi-trend up">Detectadas en conversaciones</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Ratio aceptación drafts</div><div className="dia-kpi-val">87%</div><div className="dia-kpi-trend up">↑ IA aprende tu estilo</div></div>
      </div>

      <div className="com-grid">

        {/* Bandeja unificada */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Bandeja unificada</div><div className="dia-card-sub">4 sin leer · Email + WhatsApp</div></div>
          <div>

            {/* Mensaje 1 */}
            <div className="com-msg unread">
              <div className="com-msg-ico email">{emailIco}</div>
              <div className="com-msg-body">
                <div className="com-msg-head"><span className="com-msg-from">Ana Ruiz · Metalúrgica Goi</span><span className="com-msg-time">10:12</span></div>
                <div className="com-msg-subject">Re: Confirmación videollamada hoy 12h</div>
                <div className="com-msg-preview">Perfecto Iker, confirmo la videollamada para las 12h. Te mando el link de Google Meet. Estoy preparando las dudas sobre el proceso del almacén…</div>
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <span className="dia-agenda-badge ia">IA: respuesta draft lista</span>
                  <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={() => alert('Abriendo draft IA para Ana…')}>Ver draft →</button>
                </div>
              </div>
            </div>

            {/* Mensaje 2 */}
            <div className="com-msg unread">
              <div className="com-msg-ico whatsapp">{waIco}</div>
              <div className="com-msg-body">
                <div className="com-msg-head"><span className="com-msg-from">Txema García · Digiform SL</span><span className="com-msg-time">09:58</span></div>
                <div className="com-msg-subject">WhatsApp · Gracias por la llamada</div>
                <div className="com-msg-preview">Iker, genial la llamada. Como te dije, nos encaja el planteamiento. Mándame cuando puedas el resumen y miramos fechas para empezar en mayo.</div>
                <div style={{marginTop:8}}>
                  <span className="dia-agenda-badge ia">IA: resumen de llamada generado</span>
                  <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem',marginLeft:6}} onClick={() => alert('Abriendo draft para Txema…')}>Ver draft →</button>
                </div>
              </div>
            </div>

            {/* Mensaje 3 */}
            <div className="com-msg unread">
              <div className="com-msg-ico email">{emailIco}</div>
              <div className="com-msg-body">
                <div className="com-msg-head"><span className="com-msg-from">Bankinter · Notificación</span><span className="com-msg-time">08:30</span></div>
                <div className="com-msg-subject">Cobro recibido · 2.400 €</div>
                <div className="com-msg-preview">Transferencia de METALÚRGICA GOI SL. Concepto: Factura F-2026-039.</div>
                <div style={{marginTop:8}}><span className="dia-task-badge" style={{background:'rgba(34,160,107,0.12)',color:'#22A06B',fontSize:'0.65rem',padding:'2px 7px',borderRadius:100}}>✓ IA: factura marcada como cobrada</span></div>
              </div>
            </div>

            {/* Mensaje 4 */}
            <div className="com-msg unread">
              <div className="com-msg-ico" style={{background:'rgba(198,93,74,0.1)',color:'#C65D4A'}}>{emailIco}</div>
              <div className="com-msg-body">
                <div className="com-msg-head"><span className="com-msg-from">Portal · Bodegas Iriarte</span><span className="com-msg-time">08:15</span></div>
                <div className="com-msg-subject">Ana Ruiz ha subido una factura de proveedor</div>
                <div className="com-msg-preview">847 € · pendiente de confirmar · subida desde el portal cliente.</div>
                <div style={{marginTop:8}}>
                  <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={() => alert('Yendo a Facturas recibidas…')}>Ver en Facturas recibidas →</button>
                </div>
              </div>
            </div>

            {/* Mensaje 5 leído */}
            <div className="com-msg">
              <div className="com-msg-ico email" style={{opacity:0.4}}>{emailIco}</div>
              <div className="com-msg-body" style={{opacity:0.55}}>
                <div className="com-msg-head"><span className="com-msg-from">Google Workspace</span><span className="com-msg-time">Ayer</span></div>
                <div className="com-msg-subject">Resumen de actividad de tu cuenta</div>
                <div className="com-msg-preview">Tu almacenamiento está al 67% de capacidad…</div>
              </div>
            </div>

          </div>
        </div>

        {/* Panel derecho */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>

          {/* Drafts */}
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA ha preparado</div><div className="dia-card-sub">Drafts listos para enviar</div></div>
            <div className="dia-tasks">
              <div className="dia-task" style={{cursor:'pointer'}}>
                <div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div>
                <div className="dia-task-body"><div className="dia-task-title">Respuesta a Ana Ruiz</div><div className="dia-task-meta">Confirma videollamada + adjunta agenda</div></div>
                <span className="dia-task-badge ia">Ver →</span>
              </div>
              <div className="dia-task" style={{cursor:'pointer'}}>
                <div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div>
                <div className="dia-task-body"><div className="dia-task-title">Resumen llamada Txema</div><div className="dia-task-meta">3 puntos acordados + próximos pasos</div></div>
                <span className="dia-task-badge ia">Ver →</span>
              </div>
              <div className="dia-task" style={{cursor:'pointer'}}>
                <div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div>
                <div className="dia-task-body"><div className="dia-task-title">Recordatorio cobro F-038</div><div className="dia-task-meta">Email amable · Vencida 12 días</div></div>
                <span className="dia-task-badge warn">Ver →</span>
              </div>
            </div>
          </div>

          {/* Tareas extraídas */}
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Tareas extraídas por IA</div><div className="dia-card-sub">Detectadas en conversaciones y emails</div></div>
            <div className="dia-tasks">
              {['Enviar resumen a Txema (WhatsApp)','Proponer fechas mayo a Digiform','Preparar agenda · videollamada Ana Ruiz','Confirmar factura recibida Bodegas'].map((t,i) => (
                <div key={i} className="dia-task"><div className="dia-task-check"></div><div className="dia-task-body"><div className="dia-task-title">{t}</div></div></div>
              ))}
            </div>
          </div>

          {/* Canales activos */}
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Canales activos</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',background:'rgba(34,160,107,0.05)',borderRadius:8}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:'50%',background:'#22A06B'}}></div><span style={{fontSize:'0.8rem',fontWeight:500,color:'#1C2D44'}}>Email · iker@arrietaconsultores.com</span></div>
                <span style={{fontSize:'0.7rem',color:'#22A06B',fontWeight:600}}>Activo</span>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',background:'rgba(34,160,107,0.05)',borderRadius:8}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:'50%',background:'#22A06B'}}></div><span style={{fontSize:'0.8rem',fontWeight:500,color:'#1C2D44'}}>WhatsApp Business · +34 688 123 456</span></div>
                <span style={{fontSize:'0.7rem',color:'#22A06B',fontWeight:600}}>Activo</span>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',background:'rgba(28,45,68,0.03)',borderRadius:8}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:'50%',background:'rgba(28,45,68,0.2)'}}></div><span style={{fontSize:'0.8rem',color:'rgba(28,45,68,0.5)'}}>Voz IA · número dedicado</span></div>
                <button onClick={() => alert('Activando canal de voz…')} style={{fontSize:'0.7rem',padding:'3px 8px',background:'transparent',border:'0.5px solid rgba(28,45,68,0.2)',borderRadius:5,cursor:'pointer',fontFamily:'var(--sans)',color:'rgba(28,45,68,0.5)'}}>Activar</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
