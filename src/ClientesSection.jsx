import { useState } from 'react'
import './sections.css'

const thStyle = { textAlign:'left', padding:'8px 12px', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(28,45,68,0.45)' }

export default function ClientesSection() {
  const [vista, setVista] = useState('lista')

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">Tu cartera activa · 8 clientes · Pipeline comercial gestionado por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA detectó oportunidad de upsell en Metalúrgica Goi · NPS 82</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" style={vista==='lista'?{fontWeight:600}:{}} onClick={() => setVista('lista')}>Lista</button>
          <button className="btn-ghost" style={vista==='kanban'?{fontWeight:600}:{}} onClick={() => setVista('kanban')}>Pipeline</button>
          <button className="btn-ghost" onClick={() => alert('Importando CSV…')}>Importar</button>
          <button className="btn-primary" onClick={() => alert('Abriendo nuevo cliente…')}>+ Nuevo cliente</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Clientes activos</div><div className="dia-kpi-val">8</div><div className="dia-kpi-trend up">↑ +2 este mes</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturación media</div><div className="dia-kpi-val">1.425 €</div><div className="dia-kpi-trend up">↑ /mes por cliente</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">NPS promedio</div><div className="dia-kpi-val">78</div><div className="dia-kpi-trend up">↑ Sector: 58</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">En pipeline</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ 1 decide esta semana</div></div>
      </div>

      {/* VISTA LISTA */}
      {vista === 'lista' && (
        <div className="dia-card">
          <div className="dia-card-head">
            <div className="dia-card-ttl">Todos los clientes</div>
            <div className="dia-card-sub">Ordenados por última actividad</div>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem',minWidth:600}}>
              <thead>
                <tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                  <th style={thStyle}>Cliente</th>
                  <th style={thStyle}>Proyecto</th>
                  <th style={thStyle}>Facturación</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>NPS</th>
                  <th style={{padding:'8px 12px'}}></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nombre:'Metalúrgica Goi', contacto:'Mikel Goikoetxea · mikel@metalurgicagoi.eus', proyecto:'Digitalización almacén · F3', facturacion:'2.400 €/mes', pendiente:false, estado:'Activo', estadoColor:'rgba(34,160,107,0.12)', estadoTxt:'#22A06B', nps:82 },
                  { nombre:'Digiform SL', contacto:'Txema García · txema@digiformsl.com', proyecto:'Optimización procesos · M2', facturacion:'1.800 €/mes', pendiente:true, estado:'Activo', estadoColor:'rgba(34,160,107,0.12)', estadoTxt:'#22A06B', nps:74 },
                  { nombre:'Construcciones Mendía', contacto:'Miren Mendía · miren@mendiaconstrucciones.com', proyecto:'Digitalización RRHH · M4', facturacion:'1.200 €/mes', pendiente:false, estado:'Iguala', estadoColor:'rgba(188,212,232,0.3)', estadoTxt:'#2E5A8C', nps:71 },
                  { nombre:'Garapen Consulting', contacto:'Ane Zubiria · ane@garapenconsulting.eus', proyecto:'Estrategia internacional · M1', facturacion:'3.200 €/mes', pendiente:false, estado:'Activo', estadoColor:'rgba(34,160,107,0.12)', estadoTxt:'#22A06B', nps:88 },
                  { nombre:'Innotek Basque', contacto:'Iñaki Lasarte · inaki@innotekbasque.com', proyecto:'Innovación producto · M6', facturacion:'2.100 €/mes', pendiente:false, estado:'Activo', estadoColor:'rgba(34,160,107,0.12)', estadoTxt:'#22A06B', nps:79 },
                  { nombre:'Ikasbi Formación', contacto:'Leire Aginaga · leire@ikasbi.eus', proyecto:'Plataforma e-learning · F1', facturacion:'950 €/mes', pendiente:false, estado:'Activo', estadoColor:'rgba(34,160,107,0.12)', estadoTxt:'#22A06B', nps:65 },
                  { nombre:'Talleres Oñati', contacto:'Joseba Aranburu · joseba@talleresonati.eus', proyecto:'Lean manufacturing · Propuesta', facturacion:'—', pendiente:false, estado:'Propuesta', estadoColor:'rgba(46,90,140,0.1)', estadoTxt:'#2E5A8C', nps:null },
                  { nombre:'Bodegas Iriarte', contacto:'Ana Ruiz · ana@bodegasiriarte.com', proyecto:'Estrategia digital · Negociación', facturacion:'28.000 € (proyecto)', pendiente:false, estado:'Pipeline', estadoColor:'rgba(212,165,116,0.2)', estadoTxt:'#8B5E34', nps:null },
                ].map((c, i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.05)',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.02)'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                    <td style={{padding:'11px 12px'}}><strong>{c.nombre}</strong><br/><span style={{fontSize:'0.71rem',color:'rgba(28,45,68,0.5)'}}>{c.contacto}</span></td>
                    <td style={{padding:'11px 12px',color:'rgba(28,45,68,0.7)'}}>{c.proyecto}</td>
                    <td style={{padding:'11px 12px',fontWeight:600,color:c.pendiente?'#C65D4A':'#1C2D44'}}>{c.facturacion}{c.pendiente && <span style={{fontSize:'0.68rem',fontWeight:400}}> ⚡ pend.</span>}</td>
                    <td style={{padding:'11px 12px'}}><span style={{background:c.estadoColor,color:c.estadoTxt,fontSize:'0.7rem',fontWeight:600,padding:'3px 8px',borderRadius:100}}>{c.estado}</span></td>
                    <td style={{padding:'11px 12px',fontWeight:500,color:'#1C2D44'}}>{c.nps ?? '—'}</td>
                    <td style={{padding:'11px 12px'}}>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}} onClick={e=>{e.stopPropagation();alert('Abriendo ficha…')}}>Ficha →</button>
                        <button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}} onClick={e=>{e.stopPropagation();alert('Nueva factura…')}}>Factura</button>
                        <button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}} onClick={e=>{e.stopPropagation();alert(`Email a ${c.nombre}…`)}}>Email</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA PIPELINE / KANBAN */}
      {vista === 'kanban' && (
        <div className="cl-kanban">

          {/* Propuesta */}
          <div style={{background:'rgba(46,90,140,0.04)',borderRadius:12,padding:14}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#2E5A8C'}}>Propuesta</span>
              <span style={{fontSize:'0.72rem',fontWeight:600,background:'rgba(46,90,140,0.15)',color:'#2E5A8C',padding:'1px 7px',borderRadius:100}}>2</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[{n:'Talleres Oñati',sub:'Joseba Aranburu',val:'8.500 €',tipo:'Lean manufacturing',fecha:'Enviada: 14 abr'},{n:'Tecnalia Research',sub:'Iñigo Madariaga',val:'12.000 €',tipo:'Consultoría I+D',fecha:'Enviada: 10 abr'}].map((c,i)=>(
                <div key={i} style={{background:'#FFFFFF',border:'0.5px solid rgba(46,90,140,0.2)',borderRadius:9,padding:12,cursor:'pointer'}}>
                  <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>{c.n}</div>
                  <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)',marginBottom:6}}>{c.sub}</div>
                  <div style={{fontSize:'0.78rem',fontWeight:600,color:'#2E5A8C',marginBottom:4}}>{c.val}</div>
                  <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.4)'}}>{c.tipo}</div>
                  <div style={{marginTop:8,paddingTop:8,borderTop:'0.5px solid rgba(28,45,68,0.06)',display:'flex',justifyContent:'space-between'}}>
                    <span style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.4)'}}>{c.fecha}</span>
                    <button onClick={()=>alert('Seguimiento')} style={{fontSize:'0.68rem',fontWeight:500,color:'#2E5A8C',background:'none',border:'none',cursor:'pointer',padding:0}}>Seguir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Negociación */}
          <div style={{background:'rgba(212,165,116,0.06)',borderRadius:12,padding:14}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#8B5E34'}}>Negociación</span>
              <span style={{fontSize:'0.72rem',fontWeight:600,background:'rgba(212,165,116,0.25)',color:'#8B5E34',padding:'1px 7px',borderRadius:100}}>1</span>
            </div>
            <div style={{background:'#FFFFFF',border:'0.5px solid rgba(212,165,116,0.3)',borderRadius:9,padding:12,cursor:'pointer',position:'relative'}}>
              <div style={{position:'absolute',top:8,right:8,fontSize:'0.62rem',fontWeight:600,background:'rgba(198,93,74,0.1)',color:'#C65D4A',padding:'1px 6px',borderRadius:100}}>⚡ Decide hoy</div>
              <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Bodegas Iriarte</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)',marginBottom:6}}>Ana Ruiz</div>
              <div style={{fontSize:'0.78rem',fontWeight:600,color:'#D4A574',marginBottom:4}}>28.000 €</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.4)'}}>Estrategia digital</div>
              <div style={{marginTop:8,paddingTop:8,borderTop:'0.5px solid rgba(28,45,68,0.06)',display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.4)'}}>Reunión: mañana 09h</span>
                <button onClick={()=>alert('Abriendo ficha…')} style={{fontSize:'0.68rem',fontWeight:500,color:'#8B5E34',background:'none',border:'none',cursor:'pointer',padding:0}}>Ver ficha</button>
              </div>
            </div>
          </div>

          {/* Activo */}
          <div style={{background:'rgba(34,160,107,0.04)',borderRadius:12,padding:14}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#22A06B'}}>Activo</span>
              <span style={{fontSize:'0.72rem',fontWeight:600,background:'rgba(34,160,107,0.15)',color:'#22A06B',padding:'1px 7px',borderRadius:100}}>5</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[{n:'Garapen Consulting',f:'3.200 €/mes',info:'NPS 88 · M1'},{n:'Metalúrgica Goi',f:'2.400 €/mes',info:'NPS 82 · F3'},{n:'Innotek Basque',f:'2.100 €/mes',info:'NPS 79 · M6'},{n:'Digiform SL',f:'1.800 €/mes',info:'NPS 74 · M2 ⚠️'},{n:'Ikasbi Formación',f:'950 €/mes',info:'NPS 65 · F1'}].map((c,i)=>(
                <div key={i} style={{background:'#FFFFFF',border:'0.5px solid rgba(34,160,107,0.15)',borderRadius:9,padding:12,cursor:'pointer'}}>
                  <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{c.n}</div>
                  <div style={{fontSize:'0.72rem',fontWeight:600,color:'#22A06B'}}>{c.f}</div>
                  <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.4)',marginTop:3}}>{c.info}</div>
                </div>
              ))}
              <div style={{background:'#FFFFFF',border:'0.5px solid rgba(188,212,232,0.4)',borderRadius:9,padding:12,cursor:'pointer'}}>
                <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>Construcciones Mendía</div>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:'#2E5A8C'}}>1.200 €/mes</div>
                <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.4)',marginTop:3}}>Iguala · M4</div>
              </div>
            </div>
          </div>

          {/* Pausado */}
          <div style={{background:'rgba(28,45,68,0.02)',borderRadius:12,padding:14,opacity:0.7}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)'}}>Pausado</span>
              <span style={{fontSize:'0.72rem',fontWeight:600,background:'rgba(28,45,68,0.08)',color:'rgba(28,45,68,0.4)',padding:'1px 7px',borderRadius:100}}>0</span>
            </div>
            <div style={{textAlign:'center',padding:'20px 10px',fontSize:'0.76rem',color:'rgba(28,45,68,0.35)'}}>Sin clientes pausados</div>
          </div>

        </div>
      )}
    </div>
  )
}
