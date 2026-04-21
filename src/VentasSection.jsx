import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import { sendEmail } from './lib/api'
import './sections.css'

function ModalRecordatorio({ open, onClose, cobro }) {
  if (!cobro) return null
  return (
    <Modal open={open} onClose={onClose} title="Recordatorio de cobro · IA" subtitle={`${cobro.n} · ${cobro.i}`}>
      <div style={{padding:10,background:'rgba(198,93,74,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#C65D4A',marginBottom:14}}>⚡ Factura vencida hace {cobro.dias} días · IA ha preparado un email amable y firme.</div>
      <div className="dm-field"><div className="dm-label">Para</div><input className="dm-input" defaultValue={cobro.email}/></div>
      <div className="dm-field"><div className="dm-label">Asunto</div><input className="dm-input" defaultValue={`Recordatorio pago ${cobro.factura}`}/></div>
      <div className="dm-field"><div className="dm-label">Mensaje IA</div>
        <textarea className="dm-textarea" style={{minHeight:130}} defaultValue={`Hola ${cobro.contacto},\n\nTe escribo en relación a la factura ${cobro.factura} (${cobro.i}) que venció hace ${cobro.dias} días.\n\nSi ya la has tramitado, ignora este mensaje. Si tienes algún inconveniente, dime y lo resolvemos.\n\nQuedo a tu disposición,\nIker`}/>
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={async () => {
          const r = await sendEmail({
            to: cobro.email,
            subject: `Recordatorio pago ${cobro.factura}`,
            html: `<p>Hola ${cobro.contacto},</p><p>Te escribo en relación a la factura <strong>${cobro.factura}</strong> (${cobro.i}) que venció hace ${cobro.dias} días.</p><p>Si ya la has tramitado, ignora este mensaje. Si tienes algún inconveniente, dime y lo resolvemos.</p><p>Quedo a tu disposición,<br/>Iker</p>`,
          })
          if (r.ok) { showToast('Recordatorio enviado a '+cobro.email,'ok'); onClose() }
          else if (r.phase1) onClose()
        }}>Enviar recordatorio →</button>
      </div>
    </Modal>
  )
}

const cobros = [
  {n:'Digiform SL · F-2026-038',i:'2.178 €',d:'Vencida hace 12 días · 3er recordatorio pendiente',factura:'F-2026-038',dias:12,contacto:'Txema',email:'txema@digiformsl.com'},
  {n:'Metalúrgica Goi · F-2026-035',i:'2.904 €',d:'Vencida hace 18 días · IA sugiere llamar directamente',factura:'F-2026-035',dias:18,contacto:'Mikel',email:'mikel@metalurgicagoi.eus'},
]

export default function VentasSection({ onNavigate }) {
  const [cobroModal, setCobroModal] = useState(null)

  return (
    <div>
      <ModalRecordatorio open={!!cobroModal} onClose={() => setCobroModal(null)} cobro={cobroModal} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Ventas</h1>
          <p className="page-subtitle">Pipeline comercial · Progreso de objetivos y cobros urgentes.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA preparó recordatorio de cobro para F-038 · vencida 12 días</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => showToast('Exportando informe comercial · abril 2026','ok')}>Exportar</button>
          <button className="btn-primary" onClick={() => onNavigate && onNavigate('facturas')}>Ir a Facturas →</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturado · abril</div><div className="dia-kpi-val">11.400 €</div><div className="dia-kpi-trend up">↑ 63% del objetivo</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Cobrado · abril</div><div className="dia-kpi-val">9.600 €</div><div className="dia-kpi-trend up">✓ al día</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Pendiente de cobro</div><div className="dia-kpi-val">4.452 €</div><div className="dia-kpi-trend warn">⚡ 2 vencidas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Objetivo mensual</div><div className="dia-kpi-val">18.000 €</div><div className="dia-kpi-trend up">6.600 € restantes</div></div>
      </div>

      <div className="dia-card" style={{marginBottom:14}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,flexWrap:'wrap',gap:8}}>
          <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>Progreso objetivo mensual · Abril 2026</div>
          <div style={{fontSize:'0.84rem',fontWeight:600,color:'#2E5A8C'}}>11.400 € / 18.000 € <span style={{fontWeight:400,color:'rgba(28,45,68,0.5)'}}>63%</span></div>
        </div>
        <div style={{height:10,background:'rgba(28,45,68,0.08)',borderRadius:5,overflow:'hidden',marginBottom:8}}>
          <div style={{width:'63%',height:'100%',background:'linear-gradient(90deg,#2E5A8C,#BCD4E8)',borderRadius:5}}></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'rgba(28,45,68,0.45)',flexWrap:'wrap',gap:4}}>
          <span>Con Bodegas Iriarte confirmada llegarías a 19.200 € ↑</span>
          <span>Faltan 12 días del mes</span>
        </div>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1',background:'rgba(46,90,140,0.03)',border:'0.5px solid rgba(46,90,140,0.12)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44',marginBottom:4}}>Historial completo de facturas en Admin &amp; Fiscal</div>
              <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.55)'}}>Todas tus facturas emitidas, IVA desglosado, estados y acciones · 2026</div>
            </div>
            <button onClick={() => onNavigate && onNavigate('facturas')} style={{padding:'9px 18px',background:'#1C2D44',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer',whiteSpace:'nowrap'}}>Ver Facturas emitidas →</button>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Cobros urgentes</div><div className="dia-card-sub">La IA gestiona los recordatorios</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {cobros.map((c,i) => (
              <div key={i} style={{padding:12,background:'rgba(198,93,74,0.05)',borderRadius:10,border:'0.5px solid rgba(198,93,74,0.15)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44'}}>{c.n}</div>
                  <div style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#C65D4A'}}>{c.i}</div>
                </div>
                <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.55)',marginBottom:8}}>{c.d}</div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn-ghost" style={{flex:1,padding:5,fontSize:'0.72rem'}} onClick={() => setCobroModal(c)}>Ver draft IA</button>
                  <button onClick={() => setCobroModal(c)} style={{flex:1,padding:5,background:'#C65D4A',border:'none',borderRadius:7,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Enviar ahora</button>
                </div>
              </div>
            ))}
            <div style={{padding:10,background:'rgba(28,45,68,0.03)',borderRadius:8,textAlign:'center'}}>
              <div style={{fontSize:'0.78rem',fontWeight:600,color:'#1C2D44'}}>Total pendiente</div>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.3rem',fontWeight:500,color:'#C65D4A'}}>5.082 €</div>
            </div>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Análisis comercial</div></div>
          <div className="ins-list" style={{gap:9}}>
            <div className="ins-item"><div className="ins-ico" style={{background:'rgba(46,90,140,0.1)'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E5A8C" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div><div className="ins-body"><div className="ins-title">Metalúrgica Goi · cliente ancla</div><div className="ins-desc">Genera el 42% de tu facturación. Diversifica: ningún cliente debería superar el 30%.</div></div></div>
            <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Abril: ritmo por encima del objetivo</div><div className="ins-desc">63% del objetivo a día 18. Si confirma Bodegas Iriarte, cerrarías abril en 19.200€ (+7%).</div></div></div>
            <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">5.082 € pendientes de cobro</div><div className="ins-desc">Envía recordatorio a Digiform esta tarde. Están en mayo — pueden llegar a olvidarlo.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
