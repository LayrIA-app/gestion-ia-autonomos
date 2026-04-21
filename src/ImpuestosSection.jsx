import { useState } from 'react'
import Modal from './Modal'
import Countdown from './components/Countdown'
import './sections.css'

/* Vencimiento 1T 2026: 20 abril a las 23:59:59 — countdown vivo hasta esa hora. */
const VENCIMIENTO_1T = new Date(2026, 3, 20, 23, 59, 59)

const thS = {padding:'8px 12px',textAlign:'left',fontSize:'0.65rem',fontWeight:600,textTransform:'uppercase',color:'rgba(28,45,68,0.45)'}

const modelosFiscales = [
  {mod:'303',freq:'Trimestral',pago:'Sí',desc:'IVA trimestral. Diferencia entre el IVA que cobras a clientes (repercutido) y el que pagas en tus gastos (soportado). Si cobras más del que pagas, ingresas la diferencia.'},
  {mod:'130',freq:'Trimestral',pago:'Sí (bajo si tienes retenciones)',desc:'Pago fraccionado IRPF. 20% de tu rendimiento neto (ingresos − gastos) menos las retenciones del 15% que ya te practican tus clientes.'},
  {mod:'111',freq:'Trimestral',pago:'Sí',desc:'Retenciones IRPF practicadas. Las retenciones del 15% que tus clientes te descuentan en factura las recaudan pero las ingresas tú en Hacienda.'},
  {mod:'115',freq:'Trimestral',pago:'Sí',desc:'Retenciones por alquiler de local. Solo si tienes oficina o local alquilado: retienes el 19% del alquiler y lo ingresas a Hacienda.'},
  {mod:'349',freq:'Trimestral',pago:'No',desc:'Operaciones intracomunitarias. Solo si facturas a empresas de la UE sin IVA. Informativo.'},
  {mod:'390',freq:'Anual (enero)',pago:'No',desc:'Resumen anual IVA. Recapitulación de todos los 303 del año. Solo informativo, no implica pago adicional.'},
  {mod:'190',freq:'Anual (enero)',pago:'No',desc:'Resumen anual retenciones. Recapitulación de todos los 111 del año.'},
  {mod:'100',freq:'Anual (abr–jun)',pago:'Según resultado',desc:'Declaración de la Renta IRPF. Ingresos anuales − gastos deducibles − mínimo personal = base liquidable × tipo = cuota a pagar o devolver.'},
]

function ModalLeyendaFiscal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={560} title="📖 Guía de modelos fiscales · Autónomos España" subtitle="Qué es cada modelo, cuándo se presenta y si implica pago">
      <div style={{display:'flex',flexDirection:'column',gap:8,maxHeight:420,overflowY:'auto',marginBottom:14}}>
        {modelosFiscales.map((m,i) => (
          <div key={i} style={{padding:12,background:'rgba(28,45,68,0.03)',borderRadius:9,border:'0.5px solid rgba(28,45,68,0.07)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:5}}>
              <span style={{fontWeight:700,fontSize:'0.9rem',color:'#1C2D44',minWidth:30}}>Mod. {m.mod}</span>
              <span style={{fontSize:'0.7rem',padding:'2px 7px',borderRadius:100,background:m.pago==='No'?'rgba(34,160,107,0.1)':'rgba(198,93,74,0.1)',color:m.pago==='No'?'#22A06B':'#C65D4A',fontWeight:600}}>{m.pago==='No'?'Sin pago':'Con pago'}</span>
              <span style={{fontSize:'0.7rem',color:'rgba(28,45,68,0.5)',marginLeft:'auto'}}>{m.freq}</span>
            </div>
            <div style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.7)',lineHeight:1.5}}>{m.desc}</div>
          </div>
        ))}
      </div>
      <div className="dm-actions">
        <button className="dm-btn-primary" onClick={onClose}>Entendido</button>
      </div>
    </Modal>
  )
}

function ModalPreparacionFiscal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Preparar declaración trimestral" subtitle="1T 2026 · Modelos 303 (IVA) y 130 (IRPF)">
      <div style={{padding:12,background:'rgba(46,90,140,0.06)',borderRadius:9,marginBottom:14}}>
        <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#2E5A8C',marginBottom:5}}>IA · Resumen fiscal 1T</div>
        <div style={{fontSize:'0.82rem',color:'#1C2D44'}}>IVA repercutido: <strong>1.995 €</strong> · IVA soportado: <strong>312 €</strong> · A ingresar modelo 303: <strong style={{color:'#C65D4A'}}>1.683 €</strong>. Pago fraccionado modelo 130: <strong style={{color:'#C65D4A'}}>218 €</strong>.</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        {[{mod:'Modelo 303 · IVA',v:'1.683 €'},{mod:'Modelo 130 · IRPF',v:'218 €'}].map((r,i) => (
          <div key={i} style={{background:'#FFFFFF',border:'0.5px solid rgba(28,45,68,0.1)',borderRadius:10,padding:14}}>
            <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.45)',marginBottom:5}}>{r.mod}</div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.4rem',fontWeight:500,color:'#C65D4A'}}>{r.v}</div>
            <div style={{fontSize:'0.74rem',color:'rgba(28,45,68,0.55)'}}>Vence 20 de abril</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
        {['Facturas emitidas 1T revisadas (12)','Facturas recibidas 1T revisadas (8)','Gastos deducibles verificados (3.240 €)','IVA soportado comprobado (312 €)'].map((t,i) => (
          <label key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.82rem',color:'#1C2D44',cursor:'pointer'}}>
            <input type="checkbox" defaultChecked={i<2} style={{accentColor:'#1C2D44'}}/>{t}
          </label>
        ))}
      </div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary">Generar borrador y pagar →</button>
      </div>
    </Modal>
  )
}

const modelos1T = [
  {num:'303',desc:'IVA trimestral',origen:'Facturas emitidas − IVA soportado gastos',imp:'1.683 €',eBg:'rgba(198,93,74,0.1)',eColor:'#C65D4A',estado:'⚡ Pagar',bg:'rgba(198,93,74,0.03)',impColor:'#C65D4A'},
  {num:'130',desc:'IRPF fraccionado autónomos',origen:'20% de los rendimientos netos 1T',imp:'218 €',eBg:'rgba(198,93,74,0.1)',eColor:'#C65D4A',estado:'⚡ Pagar',bg:'rgba(198,93,74,0.03)',impColor:'#C65D4A'},
  {num:'111',desc:'Retenciones IRPF',origen:'Retenciones aplicadas en facturas',imp:'1.425 €',eBg:'rgba(198,93,74,0.1)',eColor:'#C65D4A',estado:'⚡ Pagar',bg:'rgba(198,93,74,0.03)',impColor:'#C65D4A'},
  {num:'390',desc:'Resumen anual IVA · solo Diciembre',origen:'Compila los 4 trimestres 303',imp:'—',eBg:'rgba(28,45,68,0.07)',eColor:'rgba(28,45,68,0.5)',estado:'Dic 2026',bg:'',impColor:'#1C2D44'},
]

function ModalPago({ open, onClose, modelo }) {
  if (!modelo) return null
  return (
    <Modal open={open} onClose={onClose} title={`Pagar Modelo ${modelo.num}`} subtitle={`${modelo.desc} · ${modelo.imp}`}>
      <div className="dm-info-box" style={{background:'rgba(198,93,74,0.05)',marginBottom:10}}>
        <div className="dm-info-lbl">Importe a pagar</div>
        <div style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontWeight:500,color:'#C65D4A'}}>{modelo.imp}</div>
        <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.55)',marginTop:4}}>Vence el 20 de abril de 2026</div>
      </div>
      <div className="dm-field"><div className="dm-label">Cuenta origen</div>
        <select className="dm-select"><option>Kutxabank · **** 4521 (saldo: 18.420 €)</option><option>Otra cuenta...</option></select>
      </div>
      <div className="dm-field"><div className="dm-label">Forma de pago</div>
        <select className="dm-select"><option>Domiciliación bancaria</option><option>Transferencia</option><option>Pago en AEAT sede electrónica</option></select>
      </div>
      <div style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8,fontSize:'0.78rem',color:'#22A06B',marginBottom:4}}>✓ Tras pagar, la IA marcará el modelo como pagado y actualizará tu tesorería automáticamente.</div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-danger">Pagar {modelo.imp} →</button>
      </div>
    </Modal>
  )
}

export default function ImpuestosSection() {
  const [tabT, setTabT] = useState('t1')
  const [simVal, setSimVal] = useState(45000)
  const [modeloPago, setModeloPago] = useState(null)
  const [leyendaOpen, setLeyendaOpen] = useState(false)
  const [preparacionOpen, setPreparacionOpen] = useState(false)

  const simIva = Math.round(simVal * 0.063)
  const simIrpf = Math.round(simVal * 0.03)
  const simRet = Math.round(simVal * 0.03)
  const simTotal = simIva + simIrpf + simRet

  return (
    <div>
      <ModalPago open={!!modeloPago} onClose={() => setModeloPago(null)} modelo={modeloPago} />
      <ModalLeyendaFiscal open={leyendaOpen} onClose={() => setLeyendaOpen(false)} />
      <ModalPreparacionFiscal open={preparacionOpen} onClose={() => setPreparacionOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Impuestos · Centro fiscal</h1>
          <p className="page-subtitle">Todos tus modelos, calculados con tus facturas y gastos reales · Nada se presenta sin tu confirmación.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA tiene listos Mod. 303 + 130 + 111 · 3.326€ · vencen en 3 días</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => setLeyendaOpen(true)}>📖 Guía modelos</button>
          <button className="btn-ghost" onClick={() => setPreparacionOpen(true)}>Declaración Renta</button>
          <button className="btn-primary" onClick={() => setPreparacionOpen(true)}>Preparar declaración →</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">A pagar · 1T (total)</div><div className="dia-kpi-val">3.326 €</div><div className="dia-kpi-trend warn">⚡ Vence 20 abr</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Reserva fiscal recomendada</div><div className="dia-kpi-val">5.535 €</div><div className="dia-kpi-trend up">2T · IA calculado</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">IRPF anual estimado</div><div className="dia-kpi-val">~32.000 €</div><div className="dia-kpi-trend up">tipo efectivo ~21%</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Gastos deducibles · 1T</div><div className="dia-kpi-val">3.240 €</div><div className="dia-kpi-trend up">↑ 81% del total</div></div>
      </div>

      {/* Alerta con countdown HH:MM:SS vivo hasta 20 abril 2026 */}
      <div style={{background:'rgba(198,93,74,0.06)',border:'0.5px solid rgba(198,93,74,0.25)',borderRadius:12,padding:'14px 20px',marginBottom:18,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C65D4A" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div>
            <div style={{fontSize:'0.88rem',fontWeight:600,color:'#C65D4A',display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
              <span>⚡ Vencen el 20 de abril ·</span>
              <span style={{padding:'2px 10px',background:'rgba(198,93,74,0.15)',borderRadius:6,fontSize:'0.78rem'}}>
                <Countdown target={VENCIMIENTO_1T} compact style={{color:'#C65D4A'}} />
              </span>
            </div>
            <div style={{fontSize:'0.76rem',color:'rgba(28,45,68,0.6)',marginTop:3}}>Mod. 303 (1.683 €) + Mod. 130 (218 €) + Mod. 111 (1.425 €) = 3.326 € · La IA los tiene preparados</div>
          </div>
        </div>
        <button onClick={() => setModeloPago({num:'303+130+111',desc:'IVA + IRPF + Retenciones',imp:'3.326 €'})} style={{padding:'9px 18px',background:'#C65D4A',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:600,color:'#FAF7F2',cursor:'pointer',whiteSpace:'nowrap'}}>Pagar todo ahora →</button>
      </div>

      <div className="dia-grid">
        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Calendario fiscal 2026 · Iker Arrieta</div></div>
          <div style={{display:'flex',gap:8,marginBottom:16,borderBottom:'1px solid rgba(28,45,68,0.08)',paddingBottom:12,flexWrap:'wrap'}}>
            {[{id:'t1',l:'1T · Urgente'},{id:'t2',l:'2T · Julio'},{id:'t3',l:'3T · Octubre'},{id:'t4',l:'4T + Anuales'}].map(t => (
              <button key={t.id} onClick={() => setTabT(t.id)} style={{padding:'6px 14px',background:tabT===t.id?'#1C2D44':'transparent',border:tabT===t.id?'none':'0.5px solid rgba(28,45,68,0.15)',borderRadius:7,fontFamily:'var(--sans)',fontSize:'0.78rem',fontWeight:tabT===t.id?600:400,color:tabT===t.id?'#FAF7F2':'rgba(28,45,68,0.6)',cursor:'pointer'}}>{t.l}</button>
            ))}
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
              <thead><tr style={{borderBottom:'1.5px solid rgba(28,45,68,0.08)'}}>
                <th style={thS}>Modelo</th><th style={thS}>Qué es</th><th style={thS}>Origen del dato</th>
                <th style={{...thS,textAlign:'right'}}>Importe</th><th style={{...thS,textAlign:'center'}}>Estado</th><th style={{padding:'8px 12px'}}></th>
              </tr></thead>
              <tbody>
                {tabT==='t1' && modelos1T.map((m,i) => (
                  <tr key={i} style={{borderBottom:'0.5px solid rgba(28,45,68,0.06)',background:m.bg}}>
                    <td style={{padding:'11px 12px'}}><span style={{fontWeight:600,color:'#1C2D44'}}>{m.num}</span></td>
                    <td style={{padding:'11px 12px',fontSize:'0.8rem',color:'rgba(28,45,68,0.7)'}}>{m.desc}</td>
                    <td style={{padding:'11px 12px',fontSize:'0.76rem',color:'rgba(28,45,68,0.6)'}}>{m.origen}</td>
                    <td style={{padding:'11px 12px',textAlign:'right',fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:m.impColor}}>{m.imp}</td>
                    <td style={{padding:'11px 12px',textAlign:'center'}}><span style={{fontSize:'0.7rem',fontWeight:600,padding:'3px 8px',borderRadius:100,background:m.eBg,color:m.eColor}}>{m.estado}</span></td>
                    <td style={{padding:'11px 12px'}}>{m.eColor==='#C65D4A' && <button onClick={() => setModeloPago(m)} style={{padding:'4px 10px',background:'#C65D4A',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Pagar →</button>}</td>
                  </tr>
                ))}
                {tabT!=='t1' && <tr><td colSpan={6} style={{padding:'16px 12px',fontSize:'0.84rem',color:'rgba(28,45,68,0.6)'}}>La IA calculará los importes automáticamente cuando llegue el trimestre.</td></tr>}
                <tr style={{background:'rgba(46,90,140,0.04)'}}>
                  <td style={{padding:'10px 12px'}}><strong>100 · RENTA</strong></td>
                  <td style={{padding:'10px 12px',fontSize:'0.8rem',color:'rgba(28,45,68,0.7)'}}>Declaración anual IRPF</td>
                  <td style={{padding:'10px 12px',fontSize:'0.76rem',color:'rgba(28,45,68,0.6)'}}>Ingresos − gastos deducibles</td>
                  <td style={{padding:'10px 12px',textAlign:'right',fontFamily:'var(--serif)',color:'#1C2D44'}}>~19.691 €</td>
                  <td style={{padding:'10px 12px',textAlign:'center',fontSize:'0.76rem',color:'rgba(28,45,68,0.6)'}}>Abr–Jun 2027</td>
                  <td style={{padding:'10px 12px'}}><button style={{padding:'4px 10px',background:'#2E5A8C',border:'none',borderRadius:6,fontFamily:'var(--sans)',fontSize:'0.72rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Simular →</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Simulador interactivo */}
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Simulador fiscal · 2T 2026</div><div className="dia-card-sub">Ajusta la facturación y ve cuánto reservar</div></div>
          <div style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.78rem',color:'rgba(28,45,68,0.6)',marginBottom:6}}>
              <span>Facturación prevista 2T</span>
              <span style={{fontWeight:500,color:'#1C2D44'}}>{simVal.toLocaleString('es-ES')} €</span>
            </div>
            <input type="range" min="10000" max="100000" step="1000" value={simVal} onChange={e => setSimVal(Number(e.target.value))} style={{width:'100%',accentColor:'#1C2D44'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {[{l:'Mod. 303 · IVA neto',v:simIva},{l:'Mod. 130 · IRPF fraccionado',v:simIrpf},{l:'Mod. 111 · Retenciones',v:simRet}].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',background:'rgba(28,45,68,0.03)',borderRadius:7}}>
                <span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>{r.l}</span>
                <span style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{r.v.toLocaleString('es-ES')} €</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',padding:10,background:'#1C2D44',borderRadius:8}}>
              <span style={{fontSize:'0.84rem',fontWeight:600,color:'#FAF7F2'}}>Total a reservar 2T</span>
              <span style={{fontFamily:'var(--serif)',fontSize:'1rem',fontWeight:500,color:'#FAF7F2'}}>{simTotal.toLocaleString('es-ES')} €</span>
            </div>
            <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.45)',textAlign:'center',marginTop:4}}>Reserva en cuenta separada · No tocar hasta julio</div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="dia-card" style={{background:'rgba(46,90,140,0.04)',border:'0.5px solid rgba(46,90,140,0.15)'}}>
            <div className="dia-card-head"><div className="dia-card-ttl">Mod. 100 · Declaración Renta 2026</div><div className="dia-card-sub">Plazo: abril–junio 2027</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
              {[{l:'Ingresos estimados 2026',v:'~136.800 €',c:'#1C2D44'},{l:'Gastos deducibles estimados',v:'-38.880 €',c:'#22A06B'},{l:'Rendimiento neto estimado',v:'97.920 €',c:'#1C2D44'}].map((r,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between'}}><span style={{fontSize:'0.78rem',color:'rgba(28,45,68,0.6)'}}>{r.l}</span><span style={{fontSize:'0.82rem',fontWeight:500,color:r.c}}>{r.v}</span></div>
              ))}
              <div style={{height:1,background:'rgba(28,45,68,0.08)'}}></div>
              <div style={{display:'flex',justifyContent:'space-between',padding:8,background:'#2E5A8C',borderRadius:7}}>
                <span style={{fontSize:'0.8rem',fontWeight:600,color:'#FAF7F2'}}>A pagar en Renta 2027 (estimado)</span>
                <span style={{fontFamily:'var(--serif)',fontSize:'0.95rem',fontWeight:500,color:'#FAF7F2'}}>~19.691 €</span>
              </div>
            </div>
            <button style={{width:'100%',padding:9,background:'#2E5A8C',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}}>Ver simulación completa Renta →</button>
          </div>
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA · Planificación fiscal</div></div>
            <div className="ins-list" style={{gap:8}}>
              <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">3 modelos vencen en 3 días · 3.326 €</div><div className="ins-desc">Comprueba saldo en Kutxabank antes de domiciliar.</div></div></div>
              <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Tipo efectivo estimado: 21%</div><div className="ins-desc">Por debajo de la media de tu sector (24%). Gastos bien optimizados.</div></div></div>
              <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Renta 2027 · reserva ~20.000 €</div><div className="ins-desc">Empieza a apartar mensualmente. Con tu ritmo actual: ~1.666 €/mes.</div></div></div>
              <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Mod. 347 · 2 clientes a declarar en febrero 2027</div><div className="ins-desc">Metalúrgica Goi (28.500 €) y Garapen Consulting (9.600 €) superan el umbral de 3.005,06 € · La IA prepara el resumen.</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
