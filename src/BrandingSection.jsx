import { useState } from 'react'
import Modal from './Modal'
import { showToast } from './components/Toast'
import './sections.css'

const colores = [
  {hex:'#1C2D44',nombre:'Navy principal',desc:'#1C2D44 · Confianza · Autoridad'},
  {hex:'#2E5A8C',nombre:'Azul secundario',desc:'#2E5A8C · Digital · Progreso'},
  {hex:'#D4A574',nombre:'Mostaza acento',desc:'#D4A574 · Calidez · Premium'},
  {hex:'#FAF7F2',nombre:'Crema fondo',desc:'#FAF7F2 · Limpieza · Espacio',border:true},
]

const vozItems = [
  {titulo:'✓ Directo y sin rodeos',desc:'Va al grano. No usa jerga corporativa innecesaria.'},
  {titulo:'✓ Cercano pero profesional',desc:'Tutea al cliente. Transmite experiencia sin distancia.'},
  {titulo:'✓ Orientado a resultados',desc:'Siempre conecta la acción con el beneficio concreto.'},
]

function ModalEditarIdentidad({ open, onClose }) {
  const [tab, setTab] = useState('paleta')
  return (
    <Modal open={open} onClose={onClose} maxWidth={560} title="Editar identidad visual" subtitle="Arrieta Consultores · Los cambios se aplican a todos los documentos">
      <div style={{display:'flex',gap:8,marginBottom:16,borderBottom:'1px solid rgba(28,45,68,0.08)',paddingBottom:12}}>
        {[{id:'paleta',l:'Paleta'},{id:'tipografia',l:'Tipografía'},{id:'logo',l:'Logo'},{id:'voz',l:'Voz'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{padding:'5px 12px',background:tab===t.id?'#1C2D44':'transparent',border:tab===t.id?'none':'0.5px solid rgba(28,45,68,0.15)',borderRadius:7,fontFamily:'var(--sans)',fontSize:'0.76rem',fontWeight:tab===t.id?600:400,color:tab===t.id?'#FAF7F2':'rgba(28,45,68,0.6)',cursor:'pointer'}}>{t.l}</button>
        ))}
      </div>
      {tab==='paleta' && (
        <div>
          {colores.map((c,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
              <div style={{width:40,height:40,borderRadius:9,background:c.hex,flexShrink:0,border:c.border?'0.5px solid rgba(28,45,68,0.1)':undefined}}></div>
              <div style={{flex:1}}><div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{c.nombre}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{c.desc}</div></div>
              <input type="color" defaultValue={c.hex} style={{width:32,height:32,borderRadius:6,border:'none',cursor:'pointer'}}/>
            </div>
          ))}
        </div>
      )}
      {tab==='tipografia' && (
        <div>
          <div className="dm-field"><div className="dm-label">Tipografía de títulos</div><select className="dm-select"><option>Fraunces (actual)</option><option>Playfair Display</option><option>Merriweather</option></select></div>
          <div className="dm-field"><div className="dm-label">Tipografía de cuerpo</div><select className="dm-select"><option>DM Sans (actual)</option><option>Inter</option><option>Nunito</option></select></div>
        </div>
      )}
      {tab==='logo' && (
        <div>
          <div style={{border:'2px dashed rgba(28,45,68,0.15)',borderRadius:12,padding:28,textAlign:'center',marginBottom:12,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#1C2D44'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(28,45,68,0.15)'}>
            <div style={{fontSize:'1.8rem',marginBottom:6}}>🖼️</div>
            <div style={{fontSize:'0.84rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Subir nuevo logo</div>
            <div style={{fontSize:'0.74rem',color:'rgba(28,45,68,0.5)'}}>SVG, PNG transparente · mín. 400px</div>
          </div>
        </div>
      )}
      {tab==='voz' && (
        <div>
          <div className="dm-field"><div className="dm-label">Tono de comunicación</div><select className="dm-select"><option>Cercano y directo (actual)</option><option>Formal y técnico</option><option>Inspiracional</option></select></div>
          <div className="dm-field"><div className="dm-label">Palabras clave de marca</div><input className="dm-input" defaultValue="resultados, claridad, experiencia, confianza"/></div>
          <div className="dm-field"><div className="dm-label">Palabras a evitar</div><input className="dm-input" defaultValue="sinergias, innovar, disruptivo, ecosistema"/></div>
        </div>
      )}
      <div className="dm-actions">
        <button className="dm-btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="dm-btn-primary" onClick={() => { showToast('Identidad actualizada','ok'); onClose() }}>Guardar cambios</button>
      </div>
    </Modal>
  )
}

export default function BrandingSection() {
  const [editarOpen, setEditarOpen] = useState(false)

  return (
    <div>
      <ModalEditarIdentidad open={editarOpen} onClose={() => setEditarOpen(false)} />

      <div className="page-header">
        <div>
          <h1 className="page-title">Branding · Identidad visual</h1>
          <p className="page-subtitle">Paleta, tipografía, logo y voz de marca · La IA garantiza coherencia en todos los canales.</p>
          <div className="ia-bar"><div className="ia-bar-dot"></div><span className="ia-bar-txt">✦ IA detecta incoherencia: el logo no aparece en las facturas emitidas</span></div>
        </div>
        <div className="page-actions">
          <button className="btn-ghost" onClick={() => setEditarOpen(true)}>Editar identidad</button>
          <button className="btn-primary" onClick={() => showToast('Descargando kit de marca · ZIP con logos, paleta y tipografía','ok')}>Descargar kit de marca</button>
        </div>
      </div>

      {/* Score */}
      <div style={{background:'#1C2D44',borderRadius:14,padding:'20px 28px',marginBottom:18,display:'flex',alignItems:'center',gap:24,flexWrap:'wrap'}}>
        <div style={{textAlign:'center',flexShrink:0}}>
          <div style={{fontFamily:'var(--serif)',fontSize:'2.4rem',fontWeight:500,color:'#FAF7F2'}}>87</div>
          <div style={{fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#BCD4E8'}}>Score coherencia</div>
        </div>
        <div style={{width:1,height:50,background:'rgba(250,247,242,0.15)',flexShrink:0}}></div>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontSize:'0.86rem',fontWeight:500,color:'#FAF7F2',marginBottom:4}}>✦ IA · Tu identidad transmite confianza y modernidad</div>
          <div style={{fontSize:'0.76rem',color:'rgba(250,247,242,0.6)'}}>Fraunces + DM Sans comunica autoridad con calidez — ideal para tu target pyme premium.</div>
        </div>
        <button onClick={() => setEditarOpen(true)} style={{padding:'9px 18px',background:'#BCD4E8',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>Editar identidad →</button>
      </div>

      <div className="dia-grid">
        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Paleta de colores</div><div className="dia-card-sub">Colores primarios y secundarios</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {colores.map((c,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:44,height:44,borderRadius:10,background:c.hex,flexShrink:0,border:c.border?'0.5px solid rgba(28,45,68,0.1)':undefined}}></div>
                <div><div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44'}}>{c.nombre}</div><div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>{c.desc}</div></div>
              </div>
            ))}
            <button className="btn-ghost" style={{width:'100%',marginTop:4}} onClick={() => setEditarOpen(true)}>Editar paleta</button>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Tipografía</div><div className="dia-card-sub">Fuentes primaria y secundaria</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{padding:14,background:'rgba(28,45,68,0.03)',borderRadius:10}}>
              <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:6}}>Títulos</div>
              <div style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>Fraunces</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>Serif · Autoridad · Carácter · Para títulos y destacados</div>
            </div>
            <div style={{padding:14,background:'rgba(28,45,68,0.03)',borderRadius:10}}>
              <div style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(28,45,68,0.4)',marginBottom:6}}>Cuerpo de texto</div>
              <div style={{fontFamily:'var(--sans)',fontSize:'1.2rem',fontWeight:400,color:'#1C2D44',marginBottom:3}}>DM Sans</div>
              <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)'}}>Sans-serif · Legibilidad · Modernidad · Para texto largo</div>
            </div>
            <button className="btn-ghost" style={{width:'100%'}} onClick={() => setEditarOpen(true)}>Editar tipografía</button>
          </div>
        </div>

        <div className="dia-card" style={{gridColumn:'1/-1'}}>
          <div className="dia-card-head"><div className="dia-card-ttl">Logos y assets de marca</div><div className="dia-card-sub">Versiones del logo para cada contexto</div></div>
          <div className="brand-logos-grid">
            {[{bg:'#1C2D44',stroke:'#BCD4E8',nombre:'Logo principal',desc:'Fondo oscuro · Versión principal',radius:14},{bg:'#FAF7F2',stroke:'#1C2D44',nombre:'Logo claro',desc:'Fondo blanco · Para documentos',border:true,radius:14},{bg:'#1C2D44',stroke:'#BCD4E8',nombre:'Avatar circular',desc:'Perfil · RRSS · Favicon',radius:'50%'}].map((l,i) => (
              <div key={i} style={{padding:20,background:'rgba(28,45,68,0.04)',borderRadius:10,textAlign:'center'}}>
                <div style={{width:64,height:64,borderRadius:l.radius,background:l.bg,border:l.border?'0.5px solid rgba(28,45,68,0.1)':undefined,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}>
                  <svg width="28" height="28" viewBox="0 0 60 60" fill="none"><path d="M15 42L25 20L32 32L45 42" stroke={l.stroke} strokeWidth="3" strokeLinecap="round"/></svg>
                </div>
                <div style={{fontSize:'0.82rem',fontWeight:500,color:'#1C2D44',marginBottom:3}}>{l.nombre}</div>
                <div style={{fontSize:'0.72rem',color:'rgba(28,45,68,0.5)',marginBottom:10}}>{l.desc}</div>
                <button className="btn-ghost" style={{width:'100%',fontSize:'0.72rem',padding:5}} onClick={() => showToast('Descargando '+l.nombre+' · PNG + SVG','ok')}>Descargar</button>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:10,marginTop:16,flexWrap:'wrap'}}>
            <button className="btn-ghost" style={{flex:1}} onClick={() => setEditarOpen(true)}>Subir nuevo logo</button>
            <button style={{flex:1,padding:9,background:'#1C2D44',border:'none',borderRadius:9,fontFamily:'var(--sans)',fontSize:'0.82rem',fontWeight:500,color:'#FAF7F2',cursor:'pointer'}} onClick={() => showToast('Descargando kit completo · ZIP 4.8 MB','ok')}>Descargar kit completo →</button>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">Voz y tono de marca</div><div className="dia-card-sub">Cómo comunica Iker · Guía IA</div></div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {vozItems.map((v,i) => (
              <div key={i} style={{padding:10,background:'rgba(34,160,107,0.06)',borderRadius:8}}>
                <div style={{fontSize:'0.78rem',fontWeight:600,color:'#1C2D44',marginBottom:3}}>{v.titulo}</div>
                <div style={{fontSize:'0.73rem',color:'rgba(28,45,68,0.6)'}}>{v.desc}</div>
              </div>
            ))}
            <button className="btn-ghost" style={{width:'100%',marginTop:4}} onClick={() => setEditarOpen(true)}>Editar guía de voz</button>
          </div>
        </div>

        <div className="dia-card">
          <div className="dia-card-head"><div className="dia-card-ttl">IA · Coherencia de marca</div></div>
          <div className="ins-list" style={{gap:9}}>
            <div className="ins-item"><div className="ins-ico green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div className="ins-body"><div className="ins-title">Score 87/100 · Muy coherente</div><div className="ins-desc">Tu paleta y tipografía son consistentes en propuestas, facturas y LinkedIn.</div></div></div>
            <div className="ins-item"><div className="ins-ico blue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ins-body"><div className="ins-title">Añade el logo a las facturas</div><div className="ins-desc">Tus facturas no incluyen el logo. Sube el PNG en "Editar identidad".</div></div></div>
            <div className="ins-item"><div className="ins-ico warn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div className="ins-body"><div className="ins-title">Instagram sin conectar</div><div className="ins-desc">Conecta Instagram para que la IA publique con tu paleta automáticamente.</div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
