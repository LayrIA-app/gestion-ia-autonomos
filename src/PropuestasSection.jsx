import './sections.css'

export default function PropuestasSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Propuestas</h1>
          <p className="page-subtitle">Constructor de propuestas con IA · Pipeline de ventas · Historial completo.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA completó el 80% del borrador para Digiform · revisión pendiente</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Plantillas</button>
          <button className="btn-primary">+ Nueva propuesta</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">En preparación</div><div className="dia-kpi-val">2</div><div className="dia-kpi-trend warn">⚡ 1 urgente</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Enviadas · mes</div><div className="dia-kpi-val">2</div><div className="dia-kpi-trend up">↑ vs 1 mes ant.</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tasa conversión</div><div className="dia-kpi-val">62%</div><div className="dia-kpi-trend up">↑ Sector: 41%</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Valor pipeline</div><div className="dia-kpi-val">54.500 €</div><div className="dia-kpi-trend up">↑ potencial</div></div>
      </div>

      {/* Pipeline visual */}
      <div className="dia-card" style={{marginBottom:14}}>
        <div className="dia-card-head"><div className="dia-card-ttl">Pipeline de propuestas</div><div className="dia-card-sub">Estado de cada propuesta en tiempo real</div></div>
        <div className="prop-pipeline">

          {/* Borrador */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Borrador</div>
            <div style={{cursor:'pointer',padding:12,background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.1)',borderRadius:8,marginBottom:8}} onMouseEnter={e=>e.currentTarget.style.borderColor='#2E5A8C'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(28,45,68,0.1)'}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Digiform SL</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:6}}>Ampliación proyecto · 8.500 €</div>
              <div style={{fontSize:'0.68rem',color:'#2E5A8C',fontWeight:600}}>✦ IA completada al 80%</div>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <button className="btn-ghost" style={{flex:1,padding:4,fontSize:'0.68rem',textAlign:'center'}}>Ver draft</button>
                <button style={{flex:1,padding:4,background:'#1C2D44',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Enviar</button>
              </div>
            </div>
          </div>

          {/* Enviada */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Enviada · Pendiente</div>
            <div style={{cursor:'pointer',padding:12,background:'#FFFFFF',border:'0.5px solid rgba(198,93,74,0.3)',borderRadius:8}} onMouseEnter={e=>e.currentTarget.style.borderColor='#C65D4A'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(198,93,74,0.3)'}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Bodegas Iriarte</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>Estrategia digital · 28.000 €</div>
              <div style={{fontSize:'0.68rem',color:'#C65D4A',fontWeight:600}}>⚡ Reunión mañana 09:00h</div>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <button className="btn-ghost" style={{flex:1,padding:4,fontSize:'0.68rem',textAlign:'center'}}>Editar</button>
                <button style={{flex:1,padding:4,background:'#C65D4A',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Seguir</button>
              </div>
            </div>
          </div>

          {/* Aceptada */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Aceptada ✓</div>
            <div style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(34,160,107,0.2)',borderRadius:8,marginBottom:8}}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Garapen Consulting</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>Optimización procesos · 12.000 €</div>
              <div style={{fontSize:'0.68rem',color:'#22A06B',fontWeight:600}}>✓ Firmada · Inicio 1 mayo</div>
              <button style={{width:'100%',marginTop:8,padding:4,background:'rgba(34,160,107,0.1)',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',fontWeight:600,color:'#22A06B',cursor:'pointer'}}>Ver en Proyectos →</button>
            </div>
            <div style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(34,160,107,0.2)',borderRadius:8}}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Innotek Basque</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>Consultoría digital · 9.600 €</div>
              <div style={{fontSize:'0.68rem',color:'#22A06B',fontWeight:600}}>✓ Firmada · En curso</div>
            </div>
          </div>

          {/* Perdida */}
          <div style={{background:'rgba(28,45,68,0.03)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:10}}>Perdida · Archivada</div>
            <div style={{padding:12,background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:8,opacity:0.6}}>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Construcciones Unión</div>
              <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:4}}>Web corporativa · 4.200 €</div>
              <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.45)'}}>Motivo: precio · Mar 2026</div>
              <button style={{width:'100%',marginTop:8,padding:4,background:'transparent',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.68rem',color:'rgba(28,45,68,0.5)',cursor:'pointer'}}>¿Por qué se perdió? IA</button>
            </div>
          </div>

        </div>
      </div>

      {/* Progreso objetivo */}
      <div className="dia-card" style={{marginBottom:14}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>Progreso objetivo mensual · Abril 2026</div>
          <div style={{fontSize:'0.84rem',fontWeight:600,color:'#2E5A8C'}}>11.400 € / 18.000 € <span style={{fontWeight:400,color:'rgba(28,45,68,0.5)'}}>63%</span></div>
        </div>
        <div style={{height:10,background:'rgba(28,45,68,0.08)',borderRadius:5,overflow:'hidden',marginBottom:8}}>
          <div style={{width:'63%',height:'100%',background:'linear-gradient(90deg,#2E5A8C,#BCD4E8)',borderRadius:5}}></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'rgba(28,45,68,0.45)'}}>
          <span>Con Bodegas Iriarte confirmada llegarías a 19.200 € ↑</span>
          <span>Faltan 12 días del mes</span>
        </div>
      </div>

      <div className="dia-grid">

        {/* Cobros urgentes */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Cobros urgentes</div><div className="dia-card-sub">La IA gestiona los recordatorios</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {nombre:'Digiform SL · F-2026-038', importe:'2.178 €', desc:'Vencida hace 12 días · 3er recordatorio pendiente'},
              {nombre:'Metalúrgica Goi · F-2026-035', importe:'2.904 €', desc:'Vencida hace 18 días · IA sugiere llamar directamente'},
            ].map((c,i) => (
              <div key={i} style={{padding:12,background:'rgba(198,93,74,0.05)',borderRadius:10,border:'0.5px solid rgba(198,93,74,0.15)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>{c.nombre}</div>
                  <div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#C65D4A'}}>{c.importe}</div>
                </div>
                <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:8}}>{c.desc}</div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn-ghost" style={{flex:1,padding:5,fontSize:'0.72rem'}}>Ver draft IA</button>
                  <button style={{flex:1,padding:5,background:'#C65D4A',border:'none',borderRadius:7,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Enviar ahora</button>
                </div>
              </div>
            ))}
            <div style={{padding:10,background:'rgba(28,45,68,0.03)',borderRadius:8,textAlign:'center'}}>
              <div style={{fontSize:'0.78rem',fontWeight:600,color:'#1C2D44'}}>Total pendiente</div>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:500,color:'#C65D4A'}}>5.082 €</div>
            </div>
          </div>
        </div>

        {/* IA análisis comercial */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Análisis comercial</div></div>
          <div className="ins-list" style={{gap:9}}>
            <div className="ins-item">
              <div className="ins-ico" style={{background:'rgba(46,90,140,0.1)'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E5A8C" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
              <div className="ins-body"><div className="ins-title">Metalúrgica Goi · cliente ancla</div><div className="ins-desc">Genera el 42% de tu facturación. Diversifica: ningún cliente debería superar el 30%.</div></div>
            </div>
            <div className="ins-item">
              <div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
              <div className="ins-body"><div className="ins-title">Abril: ritmo por encima del objetivo</div><div className="ins-desc">63% del objetivo a día 18. Si confirma Bodegas Iriarte, cerrarías abril en 19.200€ (+7%).</div></div>
            </div>
            <div className="ins-item">
              <div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
              <div className="ins-body"><div className="ins-title">5.082 € pendientes de cobro</div><div className="ins-desc">Envía recordatorio a Digiform esta tarde. Están en mayo — pueden llegar a olvidarlo.</div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
