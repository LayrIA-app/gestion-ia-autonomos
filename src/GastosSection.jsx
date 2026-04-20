import './sections.css'

const gastos = [
  {concepto:'Claude Pro · Suscripción',cat:'Software',catBg:'rgba(46,90,140,0.1)',catColor:'#2E5A8C',fecha:'15 abr',importe:'20,00 €',deducible:'100% ✓',dedColor:'#22A06B'},
  {concepto:'Notion · Suscripción anual',cat:'Software',catBg:'rgba(46,90,140,0.1)',catColor:'#2E5A8C',fecha:'12 abr',importe:'96,00 €',deducible:'100% ✓',dedColor:'#22A06B'},
  {concepto:'Comida con Mikel Goikoetxea',cat:'Comida trabajo',catBg:'rgba(212,165,116,0.2)',catColor:'#8B5E34',fecha:'10 abr',importe:'63,40 €',deducible:'100% ✓',dedColor:'#22A06B'},
  {concepto:'Desplazamiento Bilbao · tren',cat:'Transporte',catBg:'rgba(188,212,232,0.3)',catColor:'#2E5A8C',fecha:'08 abr',importe:'24,80 €',deducible:'100% ✓',dedColor:'#22A06B'},
  {concepto:'Material oficina · papelería',cat:'Material',catBg:'rgba(28,45,68,0.07)',catColor:'rgba(28,45,68,0.6)',fecha:'05 abr',importe:'38,50 €',deducible:'100% ✓',dedColor:'#22A06B'},
  {concepto:'Gasolina · visitas clientes',cat:'Transporte',catBg:'rgba(188,212,232,0.3)',catColor:'#2E5A8C',fecha:'03 abr',importe:'54,20 €',deducible:'50%',dedColor:'#D4A574'},
  {concepto:'Curso IA aplicada a consultoría',cat:'Formación',catBg:'rgba(34,160,107,0.1)',catColor:'#22A06B',fecha:'01 abr',importe:'297,00 €',deducible:'100% ✓',dedColor:'#22A06B'},
]

const tickets = [
  {ico:'#C65D4A',icoEl:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,concepto:'Ticket restaurante · 47,20 €',desc:'Hoy · IA detecta: Comida de trabajo · 100% deducible · Con cliente Mikel Goikoetxea',cat:'Comida de trabajo'},
  {ico:'#D4A574',icoEl:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,concepto:'Gasolinera · 68,40 €',desc:'Ayer · IA detecta: Transporte · 50% deducible · Desplazamiento cliente San Sebastián',cat:'Transporte'},
  {ico:'#2E5A8C',icoEl:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,concepto:'Apple iCloud Storage · 2,99 €',desc:'16 abr · IA detecta: Software/Suscripción · 100% deducible · Almacenamiento documentos trabajo',cat:'Software'},
]

export default function GastosSection() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gastos</h1>
          <p className="page-subtitle">Todos tus gastos, tickets y su deducibilidad fiscal — gestionados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA procesó 3 tickets OCR · 68,40€ deducible pendiente de confirmar</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost">📷 Subir ticket</button>
          <button className="btn-ghost">Exportar</button>
          <button className="btn-primary">+ Nuevo gasto</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Gastos · abril</div><div className="dia-kpi-val">3.840 €</div><div className="dia-kpi-trend up">↓ -8% vs marzo</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Deducibles</div><div className="dia-kpi-val">3.120 €</div><div className="dia-kpi-trend up">81% del total</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tickets pendientes</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend warn">⚡ sin clasificar</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Ahorro fiscal est.</div><div className="dia-kpi-val">749 €</div><div className="dia-kpi-trend up">este trimestre</div></div>
      </div>

      <div className="dia-grid">

        {/* Tickets OCR pendientes */}
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head">
            <div><div className="dia-card-ttl">Tickets pendientes · la IA sugiere clasificación</div><div className="dia-card-sub">Confirma o edita — se añaden automáticamente al libro de gastos</div></div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {tickets.map((t,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:14,background:'rgba(198,93,74,0.04)',border:'0.5px solid rgba(198,93,74,0.15)',borderRadius:10,flexWrap:'wrap'}}>
                <div style={{width:38,height:38,borderRadius:9,background:t.ico,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{t.icoEl}</div>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{fontSize:'0.86rem',fontWeight:500,color:'#1C2D44'}}>{t.concepto}</div>
                  <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)'}} dangerouslySetInnerHTML={{__html:t.desc.replace(t.cat,`<strong>${t.cat}</strong>`)}}></div>
                </div>
                <select style={{fontSize:'0.76rem',padding:'5px 8px',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:7,fontFamily:'var(--sans)',color:'#1C2D44',background:'#FFFFFF'}}>
                  {['Comida de trabajo','Transporte','Material oficina','Software','Formación','Otros'].map(o => <option key={o} selected={o===t.cat}>{o}</option>)}
                </select>
                <button style={{padding:'7px 14px',background:'#1C2D44',border:'none',borderRadius:8,fontFamily:'var(--sans)',fontSize:'0.78rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer',whiteSpace:'nowrap'}}>Confirmar ✓</button>
              </div>
            ))}
          </div>
        </div>

        {/* Historial */}
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Historial de gastos · abril 2026</div><div className="dia-card-sub">Ordenados por fecha</div></div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.83rem',minWidth:600}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={{padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>Concepto</th>
                <th style={{padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>Categoría</th>
                <th style={{padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>Fecha</th>
                <th style={{padding:'8px 12px',textAlign:'right',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>Importe</th>
                <th style={{padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>Deducible</th>
                <th style={{padding:'8px 12px'}}></th>
              </tr></thead>
              <tbody>
                {gastos.map((g,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.05)'}}>
                    <td style={{padding:'10px 12px',fontWeight:500,color:'#1C2D44'}}>{g.concepto}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:100,background:g.catBg,color:g.catColor,fontWeight:600}}>{g.cat}</span></td>
                    <td style={{padding:'10px 12px',color:'rgba(28,45,68,0.55)'}}>{g.fecha}</td>
                    <td style={{padding:'10px 12px',textAlign:'right',fontWeight:500,color:'#1C2D44'}}>{g.importe}</td>
                    <td style={{padding:'10px 12px'}}><span style={{fontSize:'0.72rem',fontWeight:600,color:g.dedColor}}>{g.deducible}</span></td>
                    <td style={{padding:'10px 12px'}}><button className="btn-ghost" style={{padding:'3px 8px',fontSize:'0.7rem'}}>Editar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
