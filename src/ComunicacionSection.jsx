import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import { sendEmail } from './lib/api'
import './sections.css'

const emailIco = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const waIco = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.29-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.933 0-3.742-.516-5.296-1.415l-.38-.225-3.737.885.944-3.638-.247-.396A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>

const drafts = {
  ana: {para:'Ana Ruiz <ana@metalurgicagoi.eus>', asunto:'Re: Confirmación videollamada hoy 12h', cuerpo:'Hola Ana,\n\nPerfecto, confirmo la videollamada para las 12h. Aquí tienes el link de Google Meet:\nhttps://meet.google.com/xyz-abc-def\n\nAgenda prevista:\n1. Revisión avance fase 3 (15 min)\n2. Dudas módulo WMS entradas (20 min)\n3. Próximos pasos (10 min)\n\nHasta ahora,\nIker'},
  txema: {para:'Txema García <txema@digiformsl.com>', asunto:'Resumen llamada + próximos pasos', cuerpo:'Hola Txema,\n\nTe mando el resumen de la llamada de hoy:\n\n✓ El planteamiento encaja con vuestras necesidades\n✓ Empezamos en mayo — semana del 5\n✓ Precio: 1.800 €/mes · 6 meses\n\nPróximos pasos:\n— Yo envío el contrato esta semana\n— Confirmas disponibilidad semana del 5\n\nUn abrazo,\nIker'},
  cobro: {para:'Txema García <txema@digiformsl.com>', asunto:'Recordatorio pago F-2026-038', cuerpo:'Hola Txema,\n\nTe escribo en relación a la factura F-2026-038 (1.908 €) vencida hace 12 días.\n\nSi ya la has tramitado, ignora este mensaje. Si tienes algún inconveniente, dime y lo resolvemos.\n\nQuedo a tu disposición,\nIker'},
}

function ModalDraft({ open, onClose, tipo }) {
  const d = drafts[tipo]
  if (!d) return null
  return (
    <Modal open={open} onClose={onClose} title="Draft IA · Revisar y enviar" subtitle="Redactado por la IA · edita cualquier campo antes de enviar">
      <div className="dm-field"><div className="dm-label">Para</div><input className="dm-input" defaultValue={d.para}/></div>
      <div className="dm-field"><div className="dm-label">Asunto</div><input className="dm-input" defaultValue={d.asunto}/></div>
      <div className="dm-field"><div className="dm-label">Cuerpo</div><textarea className="dm-textarea" style={{minHeight:160}} defaultValue={d.cuerpo}/></div>
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Descartar</button>
        <button className="dm-btn-ghost" onClick={() => { showToast('Borrador guardado','ok'); onClose() }}>Guardar borrador</button>
        <button className="dm-btn-primary" onClick={async () => {
          const to = d.para.split('<')[1]?.replace('>','') || d.para
          const r = await sendEmail({
            to, subject: d.asunto,
            text: d.cuerpo,
            html: d.cuerpo.split('\n').map(l => `<p>${l}</p>`).join(''),
          })
          if (r.ok) { showToast('Email enviado a '+to,'ok'); onClose() }
          else if (r.phase1) onClose()
        }}>Enviar ahora →</button>
      </div>
    </Modal>
  )
}

export default function ComunicacionSection({ onNavigate }) {
  const [draft, setDraft] = useState(null)

  return (
    <div>
      <ModalDraft open={!!draft} onClose={() => setDraft(null)} tipo={draft} />

      <div className="page-header">
        <div>
          {onNavigate && (
            <button
              className="btn-ghost"
              onClick={() => onNavigate('inicio')}
              style={{ padding: '6px 12px', fontSize: '0.76rem', marginBottom: 10 }}
            >
              ← Volver a Inicio
            </button>
          )}
          <h1 className="page-title">Comunicación</h1>
          <p className="page-subtitle">Bandeja unificada · Email + WhatsApp + Portal cliente · Drafts preparados por IA.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA ha redactado 3 drafts · detectadas 5 tareas en conversaciones</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => onNavigate?.('asistente')}>Canales</button>
          <button className="btn-primary" onClick={() => showToast('Nuevo mensaje · compositor abierto','info')}>+ Nuevo mensaje</button>
        </div>
      </div>

      <div className="dia-kpis" style={{marginBottom:18}}>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Sin leer · hoy</div><div className="dia-kpi-val">4</div><div className="dia-kpi-trend warn">⚡ 2 requieren respuesta</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Drafts IA listos</div><div className="dia-kpi-val">3</div><div className="dia-kpi-trend up">✓ Revisados y listos</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Tareas extraídas</div><div className="dia-kpi-val">5</div><div className="dia-kpi-trend up">Detectadas en conversaciones</div></div>
        <div className="dia-kpi"><div className="dia-kpi-lbl">Ratio aceptación drafts</div><div className="dia-kpi-val">87%</div><div className="dia-kpi-trend up">↑ IA aprende tu estilo</div></div>
      </div>

      <div className="com-grid">
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Bandeja unificada</div><div className="dia-card-sub">4 sin leer · Email + WhatsApp</div></div>

          <div className="com-msg unread">
            <div className="com-msg-ico email">{emailIco}</div>
            <div className="com-msg-body">
              <div className="com-msg-head"><span className="com-msg-from">Ana Ruiz · Metalúrgica Goi</span><span className="com-msg-time">10:12</span></div>
              <div className="com-msg-subject">Re: Confirmación videollamada hoy 12h</div>
              <div className="com-msg-preview">Perfecto Iker, confirmo la videollamada para las 12h. Te mando el link de Google Meet…</div>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <span className="dia-agenda-badge ia">IA: respuesta draft lista</span>
                <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem'}} onClick={() => setDraft('ana')}>Ver draft →</button>
              </div>
            </div>
          </div>

          <div className="com-msg unread">
            <div className="com-msg-ico whatsapp">{waIco}</div>
            <div className="com-msg-body">
              <div className="com-msg-head"><span className="com-msg-from">Txema García · Digiform SL</span><span className="com-msg-time">09:58</span></div>
              <div className="com-msg-subject">WhatsApp · Gracias por la llamada</div>
              <div className="com-msg-preview">Iker, genial la llamada. Mándame el resumen y miramos fechas para empezar en mayo.</div>
              <div style={{marginTop:8}}>
                <span className="dia-agenda-badge ia">IA: resumen de llamada generado</span>
                <button className="btn-ghost" style={{padding:'4px 10px',fontSize:'0.72rem',marginLeft:6}} onClick={() => setDraft('txema')}>Ver draft →</button>
              </div>
            </div>
          </div>

          <div className="com-msg unread">
            <div className="com-msg-ico email">{emailIco}</div>
            <div className="com-msg-body">
              <div className="com-msg-head"><span className="com-msg-from">Bankinter · Notificación</span><span className="com-msg-time">08:30</span></div>
              <div className="com-msg-subject">Cobro recibido · 2.400 €</div>
              <div className="com-msg-preview">Transferencia de METALÚRGICA GOI SL. Concepto: Factura F-2026-039.</div>
              <div style={{marginTop:8}}><span className="dia-task-badge" style={{background:'rgba(34,160,107,0.12)',color:'#22A06B',fontSize:'0.65rem',padding:'2px 7px',borderRadius:100}}>✓ IA: factura marcada como cobrada</span></div>
            </div>
          </div>

          <div className="com-msg unread">
            <div className="com-msg-ico" style={{background:'rgba(198,93,74,0.1)',color:'#C65D4A'}}>{emailIco}</div>
            <div className="com-msg-body">
              <div className="com-msg-head"><span className="com-msg-from">Portal · Bodegas Iriarte</span><span className="com-msg-time">08:15</span></div>
              <div className="com-msg-subject">Ana Ruiz ha subido una factura de proveedor</div>
              <div className="com-msg-preview">847 € · pendiente de confirmar · subida desde el portal cliente.</div>
            </div>
          </div>

          <div className="com-msg">
            <div className="com-msg-ico email" style={{opacity:0.4}}>{emailIco}</div>
            <div className="com-msg-body" style={{opacity:0.55}}>
              <div className="com-msg-head"><span className="com-msg-from">Google Workspace</span><span className="com-msg-time">Ayer</span></div>
              <div className="com-msg-subject">Resumen de actividad de tu cuenta</div>
              <div className="com-msg-preview">Tu almacenamiento está al 67% de capacidad…</div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">IA ha preparado</div><div className="dia-card-sub">Drafts listos para enviar</div></div>
            <div className="dia-tasks">
              {[{k:'ana',t:'Respuesta a Ana Ruiz',m:'Confirma videollamada + adjunta agenda',w:false},{k:'txema',t:'Resumen llamada Txema',m:'3 puntos acordados + próximos pasos',w:false},{k:'cobro',t:'Recordatorio cobro F-038',m:'Email amable · Vencida 12 días',w:true}].map((d,i) => (
                <div key={i} className="dia-task" style={{cursor:'pointer'}} onClick={() => setDraft(d.k)}>
                  <div className="dia-task-check" style={{background:'rgba(188,212,232,0.3)',borderColor:'#BCD4E8'}}></div>
                  <div className="dia-task-body"><div className="dia-task-title">{d.t}</div><div className="dia-task-meta">{d.m}</div></div>
                  <span className={`dia-task-badge ${d.w?'warn':'ia'}`}>Ver →</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Tareas extraídas por IA</div><div className="dia-card-sub">Detectadas en conversaciones y emails</div></div>
            <div className="dia-tasks">
              {['Enviar resumen a Txema (WhatsApp)','Proponer fechas mayo a Digiform','Preparar agenda · videollamada Ana Ruiz','Confirmar factura recibida Bodegas'].map((t,i) => (
                <div key={i} className="dia-task"><div className="dia-task-check"></div><div className="dia-task-body"><div className="dia-task-title">{t}</div></div></div>
              ))}
            </div>
          </div>

          <div className="dia-card">
            <div className="dia-card-head"><div className="dia-card-ttl">Canales activos</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[{label:'Email · iker@arrietaconsultores.com',active:true},{label:'WhatsApp Business · +34 688 123 456',active:true},{label:'Voz IA · número dedicado',active:false}].map((c,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',background:c.active?'rgba(34,160,107,0.05)':'rgba(28,45,68,0.03)',borderRadius:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:'50%',background:c.active?'#22A06B':'rgba(28,45,68,0.2)'}}></div><span style={{fontSize:'0.8rem',fontWeight:c.active?500:400,color:c.active?'#1C2D44':'rgba(28,45,68,0.5)'}}>{c.label}</span></div>
                  {c.active ? <span style={{fontSize:'0.7rem',color:'#22A06B',fontWeight:600}}>Activo</span> : <button style={{fontSize:'0.7rem',padding:'3px 8px',background:'transparent',border:'0.5px solid rgba(28,45,68,0.2)',borderRadius:5,cursor:'pointer',fontFamily:'var(--sans)',color:'rgba(28,45,68,0.5)'}} onClick={() => showToast('Voz IA · activable en plan avanzado','info')}>Activar</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
