import './sections.css'

function Proyecto({ color, stroke, titulo, periodo, estado, estadoColor, estadoTxt, fases, horas, horasTotal, horasPct, horasBar, rentabilidad, facturacion, margen, tareas }) {
  return (
    <div className="dia-card" style={{marginBottom:14}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14,flexWrap:'wrap',gap:10}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:40,height:40,borderRadius:10,background:color,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#1C2D44'}}>{titulo}</div>
            <div style={{fontSize:'0.74rem',color:'rgba(28,45,68,0.5)',marginTop:2}}>{periodo}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          <span style={{fontSize:'0.72rem',fontWeight:600,padding:'4px 10px',borderRadius:100,background:estadoColor,color:estadoTxt}}>{estado}</span>
          <button className="btn-ghost" style={{padding:'5px 10px',fontSize:'0.74rem'}}>+ Horas</button>
          <button className="btn-ghost" style={{padding:'5px 10px',fontSize:'0.74rem'}}>Ver detalle</button>
        </div>
      </div>

      <div className="proy-grid">
        {/* Fases */}
        <div>
          <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Fases</div>
          <div style={{display:'flex',flexDirection:'column',gap:5}}>
            {fases.map((f,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:10,height:10,borderRadius:'50%',background:f.color,flexShrink:0}}></div>
                <span style={{fontSize:'0.78rem',color:f.txtColor,fontWeight:f.bold?500:400,textDecoration:f.done?'line-through':'none'}}>{f.label}</span>
                {f.badge && <span style={{fontSize:'0.68rem',fontWeight:600,color:f.badgeColor,marginLeft:'auto'}}>{f.badge}</span>}
              </div>
            ))}
          </div>
        </div>
        {/* Time tracking */}
        <div>
          <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Time tracking</div>
          <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>{horas}</div>
          <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)',marginBottom:6}}>de {horasTotal} presupuestadas</div>
          <div style={{height:5,background:'rgba(28,45,68,0.08)',borderRadius:3,overflow:'hidden'}}>
            <div style={{width:horasPct,height:'100%',background:horasBar,borderRadius:3}}></div>
          </div>
          <div style={{fontSize:'0.68rem',color:horasBar==='#C65D4A'?'#C65D4A':'rgba(28,45,68,0.45)',marginTop:3}}>{horas} / {horasTotal}</div>
        </div>
        {/* Rentabilidad */}
        <div>
          <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Rentabilidad</div>
          <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{rentabilidad}</div>
          <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)',marginBottom:6}}>{facturacion}</div>
          <div style={{fontSize:'0.78rem',fontWeight:500,color:'#22A06B'}}>Margen: {margen}</div>
        </div>
      </div>

      {/* Tareas */}
      <div style={{marginTop:12,paddingTop:12,borderTop:'0.5px solid rgba(28,45,68,0.06)'}}>
        <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:8}}>Tareas activas</div>
        <div style={{display:'flex',flexDirection:'column',gap:5}}>
          {tareas.map((t,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
              <input type="checkbox" defaultChecked={t.done} style={{accentColor:'#1C2D44'}} readOnly/>
              <span style={{fontSize:'0.78rem',color:t.color||'#1C2D44',fontWeight:t.bold?500:400,textDecoration:t.done?'line-through':'none',flex:1}}>{t.label}</span>
              <span style={{fontSize:'0.68rem',color:t.dateColor||'rgba(28,45,68,0.4)',fontWeight:t.dateBold?600:400}}>{t.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProyectosSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Proyectos</h1>
          <p className="page-subtitle">Time tracking, fases, rentabilidad y estado de cada proyecto activo.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA alerta: Construcciones Mendía entrega en 5 días · revisar horas</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">Exportar</button>
          <button className="btn-primary">+ Nuevo proyecto</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Proyectos activos</div><div className="dia-kpi-val">4</div><div className="dia-kpi-trend up">en ejecución</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Horas facturables · sem</div><div className="dia-kpi-val">28h</div><div className="dia-kpi-trend warn">↓ Objetivo: 34h</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Rentabilidad media</div><div className="dia-kpi-val">94 €/h</div><div className="dia-kpi-trend up">↑ P74 sector</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Margen neto</div><div className="dia-kpi-val">68%</div><div className="dia-kpi-trend up">↑ muy saludable</div></div>
      </div>

      {/* Proyecto 1: Metalúrgica Goi */}
      <Proyecto
        color="rgba(34,160,107,0.12)" stroke="#22A06B"
        titulo="Metalúrgica Goi · Digitalización almacén"
        periodo="Mes 2 de 6 · Inicio: Feb 2026 · Cierre previsto: Ago 2026"
        estado="En plazo ✓" estadoColor="rgba(34,160,107,0.12)" estadoTxt="#22A06B"
        fases={[
          {color:'#22A06B',label:'1. Diagnóstico inicial',txtColor:'rgba(28,45,68,0.6)',done:true,badge:'✓',badgeColor:'#22A06B'},
          {color:'#2E5A8C',label:'2. Implantación WMS',txtColor:'#1C2D44',bold:true,badge:'En curso',badgeColor:'#2E5A8C'},
          {color:'rgba(28,45,68,0.15)',label:'3. Formación equipo',txtColor:'rgba(28,45,68,0.4)'},
          {color:'rgba(28,45,68,0.15)',label:'4. Cierre y entrega',txtColor:'rgba(28,45,68,0.4)'},
        ]}
        horas="48h" horasTotal="120h" horasPct="40%" horasBar="#22A06B"
        rentabilidad="100 €/h" facturacion="2.400 €/mes · 6 meses" margen="72%"
        tareas={[
          {label:'Configurar módulo de entradas de almacén',date:'Mié 19'},
          {label:'Reunión kick-off fase 2 con Mikel',done:true,color:'rgba(28,45,68,0.5)',date:'Hecho',dateColor:'#22A06B'},
          {label:'Documentar flujo actual de picking',date:'Jue 20'},
        ]}
      />

      {/* Proyecto 2: Digiform SL */}
      <Proyecto
        color="rgba(46,90,140,0.1)" stroke="#2E5A8C"
        titulo="Digiform SL · Optimización procesos"
        periodo="Mes 5 de 6 · Inicio: Nov 2025 · Cierre previsto: May 2026"
        estado="Últimas semanas" estadoColor="rgba(46,90,140,0.1)" estadoTxt="#2E5A8C"
        fases={[
          {color:'#22A06B',label:'1. Análisis procesos',txtColor:'rgba(28,45,68,0.6)',done:true,badge:'✓',badgeColor:'#22A06B'},
          {color:'#22A06B',label:'2. Rediseño flujos',txtColor:'rgba(28,45,68,0.6)',done:true,badge:'✓',badgeColor:'#22A06B'},
          {color:'#22A06B',label:'3. Implementación',txtColor:'rgba(28,45,68,0.6)',done:true,badge:'✓',badgeColor:'#22A06B'},
          {color:'#2E5A8C',label:'4. Seguimiento y cierre',txtColor:'#1C2D44',bold:true,badge:'En curso',badgeColor:'#2E5A8C'},
        ]}
        horas="82h" horasTotal="100h" horasPct="82%" horasBar="#2E5A8C"
        rentabilidad="88 €/h" facturacion="1.800 €/mes · 6 meses" margen="58%"
        tareas={[
          {label:'Revisar KPIs con Txema',date:'Hoy'},
          {label:'Preparar informe cierre mes 5',date:'Vie 22'},
          {label:'Propuesta ampliación proyecto',date:'May 2'},
        ]}
      />

      {/* Proyecto 3: Construcciones Mendía */}
      <Proyecto
        color="rgba(198,93,74,0.1)" stroke="#C65D4A"
        titulo="Construcciones Mendía · RRHH digital"
        periodo="Mes 3 de 3 · Inicio: Feb 2026 · Cierre previsto: 23 abr 2026"
        estado="⚡ Entrega en 5 días" estadoColor="rgba(198,93,74,0.1)" estadoTxt="#C65D4A"
        fases={[
          {color:'#22A06B',label:'1. Mapa de procesos RRHH',txtColor:'rgba(28,45,68,0.6)',done:true,badge:'✓',badgeColor:'#22A06B'},
          {color:'#22A06B',label:'2. Implementación software',txtColor:'rgba(28,45,68,0.6)',done:true,badge:'✓',badgeColor:'#22A06B'},
          {color:'#C65D4A',label:'3. Entrega y formación final',txtColor:'#1C2D44',bold:true,badge:'Urgente',badgeColor:'#C65D4A'},
        ]}
        horas="68h" horasTotal="72h" horasPct="94%" horasBar="#C65D4A"
        rentabilidad="106 €/h" facturacion="1.200 €/mes · iguala" margen="74%"
        tareas={[
          {label:'Preparar documentación de entrega',color:'#C65D4A',bold:true,date:'⚡ Hoy',dateColor:'#C65D4A',dateBold:true},
          {label:'Sesión de formación con Miren Mendía',date:'Lun 21'},
          {label:'Emitir factura final del proyecto',date:'Mié 23'},
        ]}
      />

      {/* IA insight oscuro */}
      <div className="dia-card" style={{background:'#1C2D44'}}>
        <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'#BCD4E8',marginBottom:8}}>✦ IA · Análisis de proyectos</div>
        <div className="proy-ia-grid">
          {[
            {titulo:'⚡ Mendía: cierre en riesgo', desc:'Entrega en 5 días y 94% horas consumidas. Considera facturar horas extra si superas las 72h.'},
            {titulo:'📊 Digiform: rentabilidad baja', desc:'58% de margen vs 68% de media. Proyecto con más horas de las previstas. Revisar tarifa en el siguiente.'},
            {titulo:'✓ Metalúrgica: ritmo ideal', desc:'40% horas en mes 2. Margen del 72%. Momento ideal para proponer ampliación de alcance.'},
          ].map((item,i) => (
            <div key={i} style={{background:'rgba(250,247,242,0.06)',borderRadius:9,padding:12}}>
              <div style={{fontSize:'0.78rem',fontWeight:500,color:'#FAF7F2',marginBottom:4}}>{item.titulo}</div>
              <div style={{fontSize:'0.72rem',color:'rgba(250,247,242,0.6)',lineHeight:1.5}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
