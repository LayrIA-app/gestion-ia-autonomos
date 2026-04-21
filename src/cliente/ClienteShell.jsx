import { useState, useRef, useEffect } from 'react'
import { showToast } from '../components/Toast'
import { downloadInvoicePdf } from '../lib/api'
import '../sections.css'

const notificaciones = [
  {titulo:'F-005 · Vence el 1 de junio',meta:'Próxima factura · 2.904 € · Te avisamos con 2 semanas de antelación',time:'Hoy',unread:true,sec:'facturas'},
  {titulo:'Propuesta pendiente de tu revisión',meta:'Digitalización comercial · 12.400 € · Válida hasta el 30 de abril',time:'Hace 2 días',unread:true,sec:'propuestas'},
  {titulo:'Reunión confirmada · 18 abril 09:00h',meta:'Iker ha confirmado la reunión presencial en DoN',time:'Ayer',unread:false,sec:'proyecto'},
  {titulo:'Fase 2 completada ✓',meta:'Diseño de roadmap y KPIs · Entregable disponible',time:'Hace 3 días',unread:false,sec:'proyecto'},
  {titulo:'F-004 cobrada · gracias',meta:'2.904 € · Mayo 2026 · Recibida correctamente',time:'Hace 5 días',unread:false,sec:'facturas'},
]

const facturas = [
  {num:'F-005',concepto:'Digitalización comercial · Junio 2026',fecha:'1 jun 2026',importe:'2.904 €',estado:'Próxima',eBg:'rgba(46,90,140,0.1)',eColor:'#2E5A8C'},
  {num:'F-004',concepto:'Digitalización comercial · Mayo 2026',fecha:'1 may 2026',importe:'2.904 €',estado:'Pagada ✓',eBg:'rgba(34,160,107,0.1)',eColor:'#22A06B'},
  {num:'F-003',concepto:'Digitalización comercial · Abril 2026',fecha:'1 abr 2026',importe:'2.904 €',estado:'Pagada ✓',eBg:'rgba(34,160,107,0.1)',eColor:'#22A06B'},
  {num:'F-002',concepto:'Digitalización comercial · Marzo 2026',fecha:'1 mar 2026',importe:'1.452 €',estado:'Pagada ✓',eBg:'rgba(34,160,107,0.1)',eColor:'#22A06B'},
]

const mensajesIniciales = [
  {de:'iker',txt:'Hola Ana, ya tenemos el CRM configurado con vuestros distribuidores principales. La semana que viene te enseño el panel de seguimiento.',hora:'Ayer · 16:30'},
  {de:'ana',txt:'Perfecto Iker, y respecto a la propuesta de formación del equipo ¿cuándo empezaríamos?',hora:'Ayer · 17:12'},
  {de:'iker',txt:'Lo antes posible. Propongo la semana del 28 — así os doy tiempo a revisar el manual antes.',hora:'Ayer · 17:45'},
  {de:'ana',txt:'Genial, lo hablo con el equipo y te confirmo. Por cierto, ¿has recibido la factura de materiales que subí al portal?',hora:'Hoy · 09:21'},
  {de:'iker',txt:'Sí, ya la tengo. La proceso esta semana. ¡Gracias!',hora:'Hoy · 09:35'},
]

function SeccionProyecto({ onNavigate }) {
  const fases = [
    {label:'Diagnóstico inicial',done:true},
    {label:'Diseño de roadmap y KPIs',done:true},
    {label:'Implantación CRM fase 1',done:false,active:true},
    {label:'Formación del equipo',done:false},
    {label:'Cierre y entrega final',done:false},
  ]
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24,flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontFamily:'var(--serif)',fontSize:'1.8rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Mi proyecto con Iker</h1>
          <p style={{fontSize:'0.86rem',color:'rgba(28,45,68,0.55)'}}>Digitalización comercial · Arrieta Consultores · Contrato Feb–Ago 2026</p>
        </div>
        <button onClick={() => onNavigate('mensajes')} style={{padding:'9px 18px',background:'#1C2D44',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Contactar con Iker →</button>
      </div>

      <div className="cs-grid-4" style={{marginBottom:20}}>
        {[{l:'Inversión total',v:'14.400 €',c:'#1C2D44',sub:'6 meses · 2.400 €/mes'},{l:'Pagado hasta hoy',v:'9.360 €',c:'#22A06B',sub:'4 facturas · IVA incluido'},{l:'Pendiente de pago',v:'5.040 €',c:'#D4A574',sub:'2 facturas restantes'},{l:'ROI estimado',v:'+35%',c:'#2E5A8C',sub:'Eficiencia comercial'}].map((k,i) => (
          <div key={i} style={{background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:12,padding:18,minWidth:120}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginBottom:8}}>{k.l}</div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontWeight:500,color:k.c,marginBottom:4}}>{k.v}</div>
            <div style={{fontSize:'0.74rem',color:'rgba(28,45,68,0.5)'}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="dia-grid">
        <div style={{background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:14,padding:20}}>
          <div style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginBottom:14}}>Fases del proyecto</div>
          {fases.map((f,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
              <div style={{width:24,height:24,borderRadius:'50%',background:f.done?'#22A06B':f.active?'#2E5A8C':'rgba(28,45,68,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {f.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                {f.active && <div style={{width:8,height:8,borderRadius:'50%',background:'#FAF7F2'}}></div>}
              </div>
              <span style={{fontSize:'0.84rem',color:f.done?'rgba(28,45,68,0.5)':f.active?'#1C2D44':'rgba(28,45,68,0.4)',fontWeight:f.active?500:400,textDecoration:f.done?'line-through':'none'}}>{f.label}</span>
              {f.active && <span style={{fontSize:'0.68rem',fontWeight:600,padding:'2px 7px',borderRadius:100,background:'rgba(46,90,140,0.1)',color:'#2E5A8C',marginLeft:'auto'}}>En curso</span>}
            </div>
          ))}
          <div style={{marginTop:12,height:6,background:'rgba(28,45,68,0.08)',borderRadius:3,overflow:'hidden'}}>
            <div style={{width:'40%',height:'100%',background:'#2E5A8C',borderRadius:3}}></div>
          </div>
          <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.45)',marginTop:4}}>40% completado</div>
        </div>

        <div style={{background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:14,padding:20}}>
          <div style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginBottom:14}}>Próximas citas</div>
          {[{d:'Mié 20 abr · 09:00',t:'Revisión CRM fase 1',l:'Presencial · DoN',c:'#22A06B'},{d:'Lun 28 abr · 10:00',t:'Formación equipo comercial',l:'Vuestras oficinas',c:'#2E5A8C'},{d:'Mar 6 may · 11:00',t:'Entrega documentación fase 3',l:'Google Meet',c:'#2E5A8C'}].map((c,i) => (
            <div key={i} style={{padding:12,background:'rgba(28,45,68,0.03)',borderRadius:10,marginBottom:8}}>
              <div style={{fontSize:'0.72rem',fontWeight:600,color:c.c,marginBottom:3}}>{c.d}</div>
              <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{c.t}</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{c.l}</div>
            </div>
          ))}
          <button onClick={() => onNavigate('mensajes')} style={{width:'100%',marginTop:8,padding:'9px',background:'transparent',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',color:'rgba(28,45,68,0.7)',cursor:'pointer'}}>Contactar con Iker →</button>
        </div>
      </div>
    </div>
  )
}

function SeccionFacturas() {
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontFamily:'var(--serif)',fontSize:'1.8rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Mis facturas</h1>
        <p style={{fontSize:'0.86rem',color:'rgba(28,45,68,0.55)'}}>Historial de facturación con Arrieta Consultores</p>
      </div>
      <div className="cs-grid-3" style={{marginBottom:24}}>
        {[{v:'6.000 €',l:'Total facturado',bg:'#FFFFFF',vc:'#1C2D44',lc:'rgba(28,45,68,0.45)'},{v:'4.200 €',l:'Pagado',bg:'rgba(34,160,107,0.08)',vc:'#22A06B',lc:'#22A06B'},{v:'1.800 €',l:'Pendiente',bg:'rgba(198,93,74,0.08)',vc:'#C65D4A',lc:'#C65D4A'}].map((k,i) => (
          <div key={i} style={{background:k.bg,border:`0.5px solid ${k.vc === '#1C2D44' ? 'rgba(28,45,68,0.08)' : k.vc+'33'}`,borderRadius:14,padding:18,textAlign:'center',minWidth:90}}>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontWeight:500,color:k.vc}}>{k.v}</div>
            <div style={{fontSize:'0.7rem',fontWeight:600,letterSpacing:'0.07em',textTransform:'uppercase',color:k.lc,marginTop:4}}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:14,overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.84rem',minWidth:500}}>
            <thead><tr style={{background:'rgba(28,45,68,0.03)',borderBottom:'1px solid rgba(28,45,68,0.08)'}}>
              {['Factura','Concepto','Fecha','Importe','Estado',''].map((h,i) => (
                <th key={i} style={{padding:'12px 18px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {facturas.map((f,i) => (
                <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)'}}>
                  <td style={{padding:'12px 18px',fontWeight:600,color:'#1C2D44'}}>{f.num}</td>
                  <td style={{padding:'12px 18px',color:'rgba(28,45,68,0.7)'}}>{f.concepto}</td>
                  <td style={{padding:'12px 18px',color:'rgba(28,45,68,0.55)'}}>{f.fecha}</td>
                  <td style={{padding:'12px 18px',fontWeight:500,color:'#1C2D44'}}>{f.importe}</td>
                  <td style={{padding:'12px 18px'}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:100,background:f.eBg,color:f.eColor}}>{f.estado}</span></td>
                  <td style={{padding:'12px 18px'}}><button style={{padding:'4px 10px',background:'transparent',border:'0.5px solid rgba(28,45,68,0.15)',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',color:'rgba(28,45,68,0.6)',cursor:'pointer'}} onClick={async () => {
                    const importeNum = Number(String(f.importe).replace(/[^\d,]/g,'').replace(',','.')) || 0
                    const base = (importeNum / 1.21).toFixed(2)
                    const iva = (importeNum - base).toFixed(2)
                    const r = await downloadInvoicePdf({
                      numero: f.num, cliente: 'Bodegas Iriarte', concepto: f.concepto,
                      fecha: f.fecha, base, iva, irpf: (base*0.15).toFixed(2), total: f.importe,
                    })
                    if (r.ok) showToast('PDF '+f.num+' descargado','ok')
                  }}>PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SeccionPropuestas() {
  const [aceptada, setAceptada] = useState(false)
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontFamily:'var(--serif)',fontSize:'1.8rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Propuestas</h1>
        <p style={{fontSize:'0.86rem',color:'rgba(28,45,68,0.55)'}}>Documentos enviados por Arrieta Consultores</p>
      </div>
      <div style={{background:'#FFFFFF',border:`0.5px solid ${aceptada?'rgba(34,160,107,0.3)':'rgba(28,45,68,0.08)'}`,borderRadius:14,padding:24,marginBottom:16}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16,flexWrap:'wrap',gap:10}}>
          <div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Digitalización comercial · Bodegas Iriarte</div>
            <div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.5)'}}>Enviada el 15 de abril · Válida hasta 30 de abril</div>
          </div>
          <span style={{fontSize:'0.72rem',fontWeight:600,padding:'4px 12px',borderRadius:100,background:aceptada?'rgba(34,160,107,0.1)':'rgba(212,165,116,0.2)',color:aceptada?'#22A06B':'#8B5E34',whiteSpace:'nowrap'}}>{aceptada?'Aceptada ✓':'Pendiente revisión'}</span>
        </div>
        <div className="cs-grid-3" style={{gap:12,marginBottom:18}}>
          {[{v:'12.400 €',l:'Inversión total',bg:'rgba(188,212,232,0.15)',c:'#1C2D44'},{v:'6 meses',l:'Duración',bg:'rgba(188,212,232,0.15)',c:'#1C2D44'},{v:'+35%',l:'ROI estimado',bg:'rgba(34,160,107,0.08)',c:'#22A06B'}].map((k,i) => (
            <div key={i} style={{background:k.bg,borderRadius:10,padding:14,textAlign:'center',minWidth:80}}>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:500,color:k.c}}>{k.v}</div>
              <div style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.07em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginTop:2}}>{k.l}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:'0.84rem',color:'rgba(28,45,68,0.7)',lineHeight:1.6,marginBottom:16}}>
          Propuesta de digitalización del área comercial de Bodegas Iriarte. Incluye implementación de CRM, formación del equipo comercial, automatización de seguimiento de distribuidores y panel de KPIs en tiempo real.
        </div>
        {!aceptada ? (
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button style={{flex:1,padding:'10px',background:'transparent',border:'0.5px solid rgba(28,45,68,0.2)',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',color:'rgba(28,45,68,0.6)',cursor:'pointer'}} onClick={() => showToast('Cambios solicitados · Iker los recibirá en su panel','info')}>Solicitar cambios</button>
            <button onClick={() => setAceptada(true)} style={{flex:1,padding:'10px',background:'#22A06B',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Aceptar propuesta ✓</button>
          </div>
        ) : (
          <div style={{padding:12,background:'rgba(34,160,107,0.08)',borderRadius:9,fontSize:'0.84rem',color:'#22A06B',fontWeight:500,textAlign:'center'}}>✓ Propuesta aceptada — Iker recibirá una notificación</div>
        )}
      </div>
    </div>
  )
}

function SeccionMensajes() {
  const [msgs, setMsgs] = useState(mensajesIniciales)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}) }, [msgs])

  const send = () => {
    const txt = input.trim()
    if (!txt) return
    setInput('')
    setMsgs(prev => [...prev, {de:'ana',txt,hora:'Ahora'}])
    setTimeout(() => setMsgs(prev => [...prev, {de:'iker',txt:'Recibido, te respondo en breve. 👍',hora:'Ahora'}]), 1200)
  }

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontFamily:'var(--serif)',fontSize:'1.8rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Mensajes</h1>
        <p style={{fontSize:'0.86rem',color:'rgba(28,45,68,0.55)'}}>Conversación con Iker Arrieta</p>
      </div>
      <div style={{background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.08)',borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'column',height:520}}>
        <div style={{padding:'14px 18px',borderBottom:'0.5px solid rgba(28,45,68,0.08)',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:'#1C2D44',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.78rem',fontWeight:600,color:'#FAF7F2',flexShrink:0}}>IK</div>
          <div><div style={{fontSize:'0.86rem',fontWeight:500,color:'#1C2D44'}}>Iker Arrieta</div><div style={{fontSize:'0.72rem',color:'#22A06B'}}>● En línea</div></div>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:18,display:'flex',flexDirection:'column',gap:14}}>
          {msgs.map((m,i) => (
            <div key={i} style={{display:'flex',gap:10,alignItems:'flex-end',flexDirection:m.de==='iker'?'row':'row-reverse'}}>
              <div style={{width:30,height:30,borderRadius:'50%',background:m.de==='iker'?'#1C2D44':'#BCD4E8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:600,color:m.de==='iker'?'#FAF7F2':'#1C2D44',flexShrink:0}}>{m.de==='iker'?'IK':'AR'}</div>
              <div style={{maxWidth:'70%'}}>
                <div style={{background:m.de==='iker'?'rgba(28,45,68,0.06)':'#1C2D44',borderRadius:m.de==='iker'?'12px 12px 12px 2px':'12px 12px 2px 12px',padding:'12px 14px',fontSize:'0.84rem',color:m.de==='iker'?'#1C2D44':'#FAF7F2',lineHeight:1.55}}>{m.txt}</div>
                <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.4)',marginTop:4,textAlign:m.de==='iker'?'left':'right'}}>{m.hora}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div style={{padding:14,borderTop:'0.5px solid rgba(28,45,68,0.08)',display:'flex',gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Escribe un mensaje..." style={{flex:1,padding:'10px 14px',background:'rgba(28,45,68,0.04)',border:'0.5px solid rgba(28,45,68,0.12)',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.84rem',color:'#1C2D44',outline:'none'}}/>
          <button onClick={send} style={{width:40,height:40,borderRadius:9,background:'#1C2D44',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function SeccionSubir() {
  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:500,color:'#1C2D44',marginBottom:6}}>Subir documentos a Iker</h2>
        <p style={{fontSize:'0.84rem',color:'rgba(28,45,68,0.6)'}}>Sube tus facturas, contratos o cualquier documento directamente al expediente de tu proyecto.</p>
      </div>
      <div style={{border:'2px dashed rgba(28,45,68,0.2)',borderRadius:14,padding:36,textAlign:'center',background:'rgba(28,45,68,0.02)',marginBottom:20,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.05)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(28,45,68,0.02)'}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2E5A8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:12}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <div style={{fontSize:'1rem',fontWeight:500,color:'#1C2D44',marginBottom:6}}>Arrastra tus documentos aquí</div>
        <div style={{fontSize:'0.8rem',color:'rgba(28,45,68,0.5)',marginBottom:12}}>PDF, imagen, Excel · máx 20MB por archivo</div>
        <div style={{display:'inline-block',padding:'8px 20px',background:'#1C2D44',borderRadius:8,fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2'}}>Seleccionar archivos</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
        {[{ico:'📄',t:'Factura de proveedor',d:'Facturas que necesitas que Iker gestione'},{ico:'📑',t:'Contrato o acuerdo',d:'Documentos a firmar o revisar'},{ico:'🖼️',t:'Albarán o ticket',d:'Gastos del proyecto a reembolsar'},{ico:'📊',t:'Otros documentos',d:'Cualquier otro archivo del proyecto'}].map((c,i) => (
          <div key={i} style={{padding:16,background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.1)',borderRadius:12,display:'flex',alignItems:'center',gap:12,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.03)'} onMouseLeave={e=>e.currentTarget.style.background='#FFFFFF'}>
            <div style={{fontSize:'1.4rem',flexShrink:0}}>{c.ico}</div>
            <div><div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44',marginBottom:2}}>{c.t}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)'}}>{c.d}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const nav = [
  {id:'proyecto',label:'Mi proyecto',ico:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,badge:'IA'},
  {id:'facturas',label:'Facturas',ico:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>},
  {id:'propuestas',label:'Propuestas',ico:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,notif:1},
  {id:'mensajes',label:'Mensajes',ico:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>},
  {id:'subir',label:'Subir docs',ico:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>},
]

export default function ClienteShell({ onLogout }) {
  const [seccion, setSeccion] = useState('proyecto')
  const [notifOpen, setNotifOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const goTo = (s) => { setSeccion(s); setSidebarOpen(false) }

  return (
    <div style={{position:'fixed',inset:0,background:'#FAF7F2',display:'flex',flexDirection:'column',zIndex:10}}>
      {/* Overlay drawer móvil */}
      <div className={`cl-overlay${sidebarOpen?' open':''}`} onClick={() => setSidebarOpen(false)}></div>

      {/* Topbar */}
      <div className="cl-topbar">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="cl-hamburger" onClick={() => setSidebarOpen(v => !v)} aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1C2D44" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
          </button>
          <div style={{width:32,height:32,borderRadius:9,background:'#1C2D44',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="#BCD4E8"/></svg>
          </div>
          <span className="cl-logo-text" style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:500,color:'#1C2D44'}}>Tu gestión <em style={{color:'#2E5A8C',fontStyle:'italic'}}>IA</em></span>
        </div>
        <div className="cl-topbar-right">
          {/* Buscador del portal cliente (HTML demo línea 7760) */}
          <div style={{position:'relative'}} className="cl-search-wrap">
            <input
              type="text"
              placeholder="Buscar en mi portal…"
              style={{padding:'7px 14px 7px 34px',background:'rgba(28,45,68,0.05)',border:'0.5px solid rgba(28,45,68,0.12)',borderRadius:8,fontFamily:'var(--sans)',fontSize:'0.8rem',color:'#1C2D44',outline:'none',width:220}}
            />
            <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',opacity:0.35,pointerEvents:'none'}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C2D44" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <div className="cl-user-info" style={{textAlign:'right'}}>
            <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>Ana Ruiz</div>
            <div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.5)'}}>Cliente · Bodegas Iriarte · <span onClick={onLogout} style={{cursor:'pointer',color:'#2E5A8C',fontWeight:500}}>Cambiar perfil</span></div>
          </div>
          {/* Campana */}
          <div style={{position:'relative'}}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{position:'relative',width:36,height:36,borderRadius:'50%',background:'rgba(28,45,68,0.06)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C2D44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span style={{position:'absolute',top:4,right:4,width:8,height:8,borderRadius:'50%',background:'#C65D4A',border:'1.5px solid #FFFFFF'}}></span>
            </button>
            {notifOpen && (
              <div style={{position:'absolute',top:'calc(100% + 10px)',right:0,width:320,background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.12)',borderRadius:14,boxShadow:'0 8px 32px rgba(28,45,68,0.15)',zIndex:100}}>
                <div style={{padding:'14px 18px 10px',borderBottom:'0.5px solid rgba(28,45,68,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontFamily:'var(--serif)',fontSize:'0.95rem',fontWeight:500,color:'#1C2D44'}}>Notificaciones</span>
                  <button onClick={() => setNotifOpen(false)} style={{fontSize:'0.72rem',color:'#2E5A8C',background:'none',border:'none',cursor:'pointer',fontFamily:'var(--sans)'}}>Cerrar</button>
                </div>
                {notificaciones.map((n,i) => (
                  <div key={i} onClick={() => {setSeccion(n.sec);setNotifOpen(false)}} style={{display:'flex',gap:10,padding:'12px 16px',cursor:'pointer',background:n.unread?'rgba(46,90,140,0.03)':'transparent',borderBottom:'0.5px solid rgba(28,45,68,0.04)'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.03)'} onMouseLeave={e=>e.currentTarget.style.background=n.unread?'rgba(46,90,140,0.03)':'transparent'}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:n.unread?'#2E5A8C':'transparent',border:n.unread?'none':'1.5px solid rgba(28,45,68,0.2)',flexShrink:0,marginTop:5}}></div>
                    <div><div style={{fontSize:'0.82rem',fontWeight:n.unread?500:400,color:'#1C2D44',marginBottom:2}}>{n.titulo}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)',marginBottom:2}}>{n.meta}</div><div style={{fontSize:'0.68rem',color:'rgba(28,45,68,0.4)'}}>{n.time}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{width:36,height:36,borderRadius:'50%',background:'#1C2D44',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',fontWeight:600,color:'#FAF7F2'}}>AR</div>
        </div>
      </div>

      {/* Body */}
      <div className="cl-body">
        {/* Sidebar nav · drawer en móvil */}
        <aside className={`cl-sidebar${sidebarOpen?' open':''}`}>
          <div className="cl-user-header">
            <div style={{width:40,height:40,borderRadius:'50%',background:'#1C2D44',color:'#FAF7F2',fontSize:'0.9rem',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>AR</div>
            <div style={{display:'flex',flexDirection:'column',lineHeight:1.3,minWidth:0}}>
              <span style={{fontSize:'0.9rem',fontWeight:500,color:'#1C2D44'}}>Ana Ruiz</span>
              <span style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.55)'}}>Cliente · Bodegas Iriarte</span>
            </div>
          </div>
          {nav.map(n => (
            <div key={n.id} onClick={() => goTo(n.id)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',cursor:'pointer',borderRadius:8,background:seccion===n.id?'rgba(28,45,68,0.06)':'transparent',transition:'background .15s'}}>
              <span style={{color:seccion===n.id?'#1C2D44':'rgba(28,45,68,0.5)',display:'flex',flexShrink:0}}>{n.ico}</span>
              <span style={{fontSize:'0.84rem',fontWeight:seccion===n.id?500:400,color:seccion===n.id?'#1C2D44':'rgba(28,45,68,0.6)',flex:1,minWidth:0}}>{n.label}</span>
              {n.badge && <span style={{fontSize:'0.6rem',fontWeight:600,padding:'2px 5px',borderRadius:4,background:'rgba(46,90,140,0.12)',color:'#2E5A8C'}}>{n.badge}</span>}
              {n.notif && <span style={{fontSize:'0.6rem',fontWeight:700,padding:'2px 6px',borderRadius:100,background:'#C65D4A',color:'#FFFFFF'}}>{n.notif}</span>}
            </div>
          ))}
          <div style={{marginTop:'auto',paddingTop:16,borderTop:'0.5px solid rgba(28,45,68,0.08)'}}>
            <div onClick={onLogout} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',cursor:'pointer',borderRadius:8}} onMouseEnter={e=>e.currentTarget.style.background='rgba(28,45,68,0.04)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(28,45,68,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span style={{fontSize:'0.82rem',color:'rgba(28,45,68,0.5)'}}>Cerrar sesión</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="cl-content">
          {seccion === 'proyecto' && <SeccionProyecto onNavigate={goTo}/>}
          {seccion === 'facturas' && <SeccionFacturas/>}
          {seccion === 'propuestas' && <SeccionPropuestas/>}
          {seccion === 'mensajes' && <SeccionMensajes/>}
          {seccion === 'subir' && <SeccionSubir/>}
        </main>
      </div>
    </div>
  )
}
