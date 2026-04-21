import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import { sendEmail, downloadInvoicePdf } from './lib/api'
import './sections.css'

const th = {padding:'10px 12px',textAlign:'left',fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}
const thr = {...th,textAlign:'right'}

const facturas = [
  {num:'F-2026-043',cliente:'Metalúrgica Goi',concepto:'Retainer mayo 2026',fecha:'18 abr 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'rgba(46,90,140,0.04)',estadoTxt:'✦ IA lista',estadoBg:'rgba(46,90,140,0.12)',estadoColor:'#2E5A8C',accion:'enviar',email:'mikel@metalurgicagoi.eus'},
  {num:'F-2026-041',cliente:'Digiform SL',concepto:'Consultoría abril 2026',fecha:'17 abr 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'rgba(198,93,74,0.02)',estadoTxt:'⚡ Vencida',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',accion:'recordar',email:'txema@digiformsl.com'},
  {num:'F-2026-038',cliente:'Digiform SL',concepto:'Consultoría marzo 2026',fecha:'09 abr 2026',base:'1.800 €',iva:'378 €',total:'1.908 €',bg:'rgba(198,93,74,0.02)',estadoTxt:'⚡ Vencida',estadoBg:'rgba(198,93,74,0.1)',estadoColor:'#C65D4A',accion:'recordar',email:'txema@digiformsl.com'},
  {num:'F-2026-035',cliente:'Metalúrgica Goi',concepto:'Retainer abril 2026',fecha:'01 abr 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',accion:'pdf'},
  {num:'F-2026-031',cliente:'Metalúrgica Goi',concepto:'Consultoría marzo 2026',fecha:'15 mar 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',accion:'pdf'},
  {num:'F-2026-028',cliente:'Metalúrgica Goi',concepto:'Consultoría febrero 2026',fecha:'01 mar 2026',base:'2.400 €',iva:'504 €',total:'2.544 €',bg:'',estadoTxt:'Cobrada ✓',estadoBg:'rgba(34,160,107,0.12)',estadoColor:'#22A06B',accion:'pdf'},
]

function ModalNuevaFactura({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="+ Nueva factura · IA" subtitle="La IA genera la factura completa — tú editas cualquier campo">
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Cliente</div><select className="dm-select"><option>Metalúrgica Goi</option><option>Digiform SL</option><option>Bodegas Iriarte</option><option>Construcciones Mendía</option></select></div>
        <div className="dm-field"><div className="dm-label">Tipo</div><select className="dm-select"><option>Retainer mensual</option><option>Proyecto cerrado</option><option>Horas trabajadas</option><option>Gastos</option></select></div>
      </div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Fecha emisión</div><input className="dm-input" type="date" defaultValue="2026-04-18"/></div>
        <div className="dm-field"><div className="dm-label">Fecha vencimiento</div><input className="dm-input" type="date" defaultValue="2026-05-18"/></div>
      </div>
      <div className="dm-field"><div className="dm-label">Concepto</div><input className="dm-input" type="text" placeholder="Ej: Retainer mayo 2026 · Consultoría digital"/></div>
      <div className="dm-row">
        <div className="dm-field"><div className="dm-label">Base imponible</div><input className="dm-input" type="text" placeholder="2.400,00 €"/></div>
        <div className="dm-field"><div className="dm-label">IVA</div><select className="dm-select"><option>21%</option><option>10%</option><option>4%</option><option>0% (exento)</option></select></div>
      </div>
      <div style={{padding:10,background:'rgba(46,90,140,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#2E5A8C',marginBottom:4}}>✦ IA aplicará automáticamente el IRPF (15%) y calculará el total neto.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Factura generada por IA · lista para enviar','ok'); onClose() }}>✦ Generar factura</button>
      </div>
    </Modal>
  )
}

function ModalRevisarEnviar({ open, onClose, factura }) {
  if (!factura) return null
  return (
    <Modal open={open} onClose={onClose} title={`Revisar y enviar · ${factura.num}`} subtitle={`${factura.cliente} · ${factura.total}`}>
      <div className="dm-field"><div className="dm-label">Enviar a</div><input className="dm-input" defaultValue={factura.email}/></div>
      <div className="dm-field"><div className="dm-label">Asunto</div><input className="dm-input" defaultValue={`Factura ${factura.num} · Arrieta Consultores`}/></div>
      <div className="dm-field"><div className="dm-label">Mensaje</div><textarea className="dm-textarea" defaultValue={`Hola,\n\nAdjunto la factura ${factura.num} por importe de ${factura.total} con vencimiento a 30 días.\n\nQuedo a tu disposición.\n\nIker Arrieta`}/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-ghost" onClick={async () => {
          const r = await downloadInvoicePdf({
            numero: factura.num, cliente: factura.cliente, concepto: factura.concepto,
            fecha: factura.fecha, base: factura.base, iva: factura.iva,
            irpf: (Number(String(factura.base).replace(/[^\d]/g,'')) * 0.15).toFixed(0),
            total: factura.total,
          })
          if (r.ok) { showToast('PDF descargado · '+factura.num,'ok'); onClose() }
        }}>Solo descargar PDF</button>
        <button className="dm-btn-primary" onClick={async () => {
          const r = await sendEmail({
            to: factura.email,
            subject: `Factura ${factura.num} · Arrieta Consultores`,
            html: `<p>Hola,</p><p>Adjunto la factura <strong>${factura.num}</strong> por importe de <strong>${factura.total}</strong> con vencimiento a 30 días.</p><p>Quedo a tu disposición.</p><p>Iker Arrieta</p>`,
          })
          if (r.ok) { showToast('Factura '+factura.num+' enviada a '+factura.email,'ok'); onClose() }
          else if (r.phase1) onClose()
        }}>Enviar factura →</button>
      </div>
    </Modal>
  )
}

function ModalRecordatorio({ open, onClose, factura }) {
  if (!factura) return null
  return (
    <Modal open={open} onClose={onClose} title="Recordatorio de cobro · IA" subtitle={`${factura.num} · ${factura.cliente} · ${factura.total}`}>
      <div style={{padding:10,background:'rgba(198,93,74,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#C65D4A',marginBottom:14}}>⚡ Factura vencida · IA ha preparado un email amable y firme.</div>
      <div className="dm-field"><div className="dm-label">Para</div><input className="dm-input" defaultValue={factura.email}/></div>
      <div className="dm-field"><div className="dm-label">Asunto</div><input className="dm-input" defaultValue={`Recordatorio pago ${factura.num}`}/></div>
      <div className="dm-field"><div className="dm-label">Mensaje IA</div><textarea className="dm-textarea" style={{minHeight:140}} defaultValue={`Hola,\n\nTe escribo en relación a la factura ${factura.num} (${factura.total}) que venció hace unos días.\n\nSi ya la has tramitado, ignora este mensaje. Si tienes algún inconveniente, dime y lo resolvemos.\n\nQuedo a tu disposición,\nIker`}/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={async () => {
          const r = await sendEmail({
            to: factura.email,
            subject: `Recordatorio pago ${factura.num}`,
            html: `<p>Hola,</p><p>Te escribo en relación a la factura <strong>${factura.num}</strong> (${factura.total}) que venció hace unos días.</p><p>Si ya la has tramitado, ignora este mensaje. Si tienes algún inconveniente, dime y lo resolvemos.</p><p>Quedo a tu disposición,<br/>Iker</p>`,
          })
          if (r.ok) { showToast('Recordatorio enviado a '+factura.email,'ok'); onClose() }
          else if (r.phase1) onClose()
        }}>Enviar recordatorio →</button>
      </div>
    </Modal>
  )
}

export default function FacturasSection() {
  const [modal, setModal] = useState(null) // {tipo, factura}

  return (
    <div>
      {modal?.tipo==='nueva' && <ModalNuevaFactura open onClose={() => setModal(null)} />}
      {modal?.tipo==='enviar' && <ModalRevisarEnviar open onClose={() => setModal(null)} factura={modal.factura} />}
      {modal?.tipo==='recordar' && <ModalRecordatorio open onClose={() => setModal(null)} factura={modal.factura} />}

      <div className="page-header">
        <div>
          <h1 className="page-title">Facturas emitidas</h1>
          <p className="page-subtitle">Facturación de Arrieta Consultores · IVA, IRPF y cobros gestionados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA tiene lista F-2026-043 para Metalúrgica Goi · pendiente envío</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => showToast('Exportando historial · CSV disponible en Fase 2','info')}>Exportar</button>
          <button className="btn-primary" onClick={() => setModal({tipo:'nueva'})}>+ Nueva factura</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Facturado · abril</div><div className="dia-kpi-val">11.400 €</div><div className="dia-kpi-trend up">↑ 12% vs media</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Pendiente cobro</div><div className="dia-kpi-val">4.200 €</div><div className="dia-kpi-trend warn">⚡ 2 vencidas</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IVA repercutido · 1T</div><div className="dia-kpi-val">1.995 €</div><div className="dia-kpi-trend up">A ingresar abr.</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IRPF retenido · 1T</div><div className="dia-kpi-val">1.425 €</div><div className="dia-kpi-trend up">✓ Al día</div></div>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Historial de facturas</div><div className="dia-card-sub">Ordenadas por fecha · 2026</div></div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.84rem',minWidth:700}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={th}>Nº Factura</th><th style={th}>Cliente</th><th style={th}>Concepto</th><th style={th}>Fecha</th>
                <th style={thr}>Base</th><th style={thr}>IVA</th><th style={thr}>Total</th><th style={th}>Estado</th><th style={{padding:'10px 12px'}}></th>
              </tr></thead>
              <tbody>
                {facturas.map((f,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:f.bg}}>
                    <td style={{padding:12,fontWeight:500,color:'#1C2D44'}}>{f.num}</td>
                    <td style={{padding:12,color:'rgba(28,45,68,0.7)'}}>{f.cliente}</td>
                    <td style={{padding:12,color:'rgba(28,45,68,0.7)'}}>{f.concepto}</td>
                    <td style={{padding:12,color:'rgba(28,45,68,0.55)'}}>{f.fecha}</td>
                    <td style={{padding:12,textAlign:'right',fontWeight:500,color:'#1C2D44'}}>{f.base}</td>
                    <td style={{padding:12,textAlign:'right',color:'rgba(28,45,68,0.6)'}}>{f.iva}</td>
                    <td style={{padding:12,textAlign:'right',fontWeight:600,color:'#1C2D44'}}>{f.total}</td>
                    <td style={{padding:12}}><span style={{fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:100,background:f.estadoBg,color:f.estadoColor}}>{f.estadoTxt}</span></td>
                    <td style={{padding:12}}>
                      <div style={{display:'flex',gap:6}}>
                        {f.accion === 'enviar' && <>
                          <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={() => setModal({tipo:'nueva'})}>Editar</button>
                          <button style={{padding:'4px 10px',background:'#1C2D44',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}} onClick={() => setModal({tipo:'enviar',factura:f})}>Revisar y enviar →</button>
                        </>}
                        {f.accion === 'recordar' && <>
                          <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={() => setModal({tipo:'nueva'})}>Editar</button>
                          <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={() => setModal({tipo:'recordar',factura:f})}>Recordar</button>
                        </>}
                        {f.accion === 'pdf' && <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={async () => {
                          const r = await downloadInvoicePdf({
                            numero: f.num, cliente: f.cliente, concepto: f.concepto, fecha: f.fecha,
                            base: f.base, iva: f.iva,
                            irpf: (Number(String(f.base).replace(/[^\d]/g,'')) * 0.15).toFixed(0),
                            total: f.total,
                          })
                          if (r.ok) showToast('PDF de '+f.num+' descargado','ok')
                        }}>PDF</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Resumen fiscal 1T 2026</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[{l:'IVA repercutido (21%)',s:'Sobre base de 9.500 €',v:'1.995 €',bg:'rgba(188,212,232,0.15)',dark:false},{l:'IVA soportado (gastos)',s:'Facturas de proveedores',v:'312 €',bg:'rgba(212,165,116,0.1)',dark:false},{l:'A ingresar modelo 303',s:'Vence 20 de abril',v:'1.683 €',bg:'#1C2D44',dark:true},{l:'IRPF retenido (15%)',s:'Modelo 130',v:'218 €',bg:'rgba(28,45,68,0.04)',dark:false}].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:10,background:r.bg,borderRadius:8}}>
                <div><div style={{fontSize:'0.78rem',fontWeight:500,color:r.dark?'#FAF7F2':'#1C2D44'}}>{r.l}</div><div style={{fontSize:'0.72rem',color:r.dark?'rgba(250,247,242,0.55)':'rgba(28,45,68,0.5)'}}>{r.s}</div></div>
                <div style={{fontFamily:'var(--serif)',fontSize:'1.1rem',fontWeight:500,color:r.dark?'#FAF7F2':'#1C2D44'}}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Análisis de facturación</div></div>
          <div className="ins-list" style={{gap:10}}>
            <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Digiform SL · 4.200 € pendientes</div><div className="ins-desc">2 facturas vencidas. Enviar recordatorio esta semana.</div></div></div>
            <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Próxima factura · Mayo 2026</div><div className="ins-desc">Metalúrgica Goi · 2.400 € · Vence el 1 de mayo.</div></div></div>
            <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Ritmo de facturación</div><div className="ins-desc">Abril: 11.400 € · 12% por encima de tu media mensual.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
