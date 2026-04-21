# Gestión IA Autónomos

Producto COAXIONIA sector **Autónomos**. React + Vite · desplegado en Vercel.

Demo en vivo: **https://gestion-ia-autonomos.vercel.app**

---

## Fases

| Fase | Estado | Qué hace |
|---|---|---|
| **Fase 1** · Demo visual | ✅ Completa | 18 secciones autónomo + portal cliente · responsive 360-1920 · 0 botones muertos · push IA · campana alertas · countdown Mod. 303 |
| **Fase 2** · Backend real | ⚙️ Código listo · pendiente activar env vars | Supabase (auth + BD + realtime) · Claude Opus 4.7 (IA proactiva) · Resend (emails reales) · jsPDF (facturas descargables) |
| **Fase 3** · Integraciones | 📋 Pendiente | Stripe/Redsys · Google Calendar · WhatsApp Business · Holded · Verifactu |

La app **funciona sin env vars en modo Fase 1** (datos mock). Al añadir las env vars en Vercel, las piezas correspondientes de Fase 2 se activan automáticamente (graceful degradation).

---

## Arranque local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. La app arranca en modo Fase 1.

Para activar Fase 2 en local:

```bash
cp .env.example .env.local
# edita .env.local con las claves reales
npm run dev
```

---

## Activar Fase 2 en producción · paso a paso

### 1 · Supabase (auth + base de datos)

1. Crear proyecto en `https://supabase.com/dashboard` (región `eu-west-1`).
2. En **Settings → API**, copiar `Project URL` y `anon public` key.
3. En **SQL Editor**, pegar el contenido de `supabase/schema.sql` y pulsar **Run**. Esto crea las 11 tablas, RLS policies y habilita realtime en `mensajes`.
4. En Vercel → **Settings → Environment Variables** añadir:
   - `VITE_SUPABASE_URL` = el Project URL
   - `VITE_SUPABASE_ANON_KEY` = la anon public key
5. En **Authentication → Users → Add user** crear el autónomo demo:
   - Email: `iker@arrietaconsultores.com` · password: una contraseña segura
   - Metadata `{"nombre":"Iker Arrieta","role":"autonomo"}`
6. Crear el cliente demo:
   - Email: `ana@bodegasiriarte.com`
   - Metadata `{"nombre":"Ana Ruiz","role":"cliente"}`
7. Redeploy en Vercel. El login ya funciona con email+password reales y la sesión persiste.

### 2 · Claude API (IA proactiva)

1. Cuenta en `https://console.anthropic.com`.
2. Crear API key en **API Keys → Create Key**.
3. Vercel → añadir env var:
   - `ANTHROPIC_API_KEY` = la API key completa (empieza por `sk-ant-api03-…`)
4. Redeploy. Los endpoints `/api/ai/insight` y `/api/ai/draft-email` empiezan a devolver texto generado por Claude Opus 4.7.

### 3 · Resend (emails reales)

1. Cuenta en `https://resend.com`.
2. Verificar dominio `arrietaconsultores.com` en **Domains → Add Domain** (añadir los 3-4 registros DNS que Resend da, esperar ~10 min a que pase a *Verified*).
3. Crear API key en **API Keys**.
4. Vercel → añadir env vars:
   - `RESEND_API_KEY` = la key (empieza por `re_…`)
   - `RESEND_FROM_EMAIL` = `noreply@arrietaconsultores.com`
5. Redeploy. Los botones "Enviar factura", "Enviar recordatorio", "Enviar propuesta" envían emails reales desde `noreply@arrietaconsultores.com`.

### 4 · Verificación

Tras cada activación:

1. `https://gestion-ia-autonomos.vercel.app/login` · login con `iker@arrietaconsultores.com` + password → debe entrar y mostrar el AppShell.
2. Ir a **Facturas emitidas** → pulsar **PDF** en cualquier factura → descarga PDF con plantilla navy/cream real.
3. Pulsar **Revisar y enviar →** en factura F-2026-043 → botón **Enviar factura →** → toast "Factura enviada a mikel@metalurgicagoi.eus" real.
4. Ir a **Ventas** → **Ver draft** en cobro vencido Digiform → botón **Enviar recordatorio →** → email real enviado.

Si falta alguna env var, el botón correspondiente muestra un toast `info` diciendo qué pieza de Fase 2 requiere configuración. La app sigue funcionando en modo mock para el resto.

---

## Arquitectura

```
src/
  App.jsx                        # AppShell + LoginScreen + RoleScreen + Toaster
  InicioSection.jsx              # 18 secciones perfil autónomo
  …SnapshotsSection.jsx
  cliente/ClienteShell.jsx       # Portal cliente (Ana Ruiz · Bodegas Iriarte)
  components/
    Toast.jsx                    # showToast() global + <Toaster />
    PushNotifications.jsx        # 6 toasts IA cada 38s (solo autónomo)
    BellAlerts.jsx               # Campana topbar con 7 alertas
    AnimatedProgress.jsx         # Barra 0→X cubic-bezier 1200ms
    Countdown.jsx                # HH:MM:SS vivo para Mod. 303
  contexts/
    AuthContext.jsx              # useAuth() · Fase 1 fake o Fase 2 Supabase real
  hooks/
    useData.js                   # useTable / useMensajes · Fase 1 mock · Fase 2 Supabase + realtime
  lib/
    env.js                       # Detect hasSupabase
    supabase.js                  # Cliente Supabase singleton
    api.js                       # Wrappers fetch → /api/*
api/
  ai/insight.js                  # POST · Claude · IA proactiva por sección
  ai/draft-email.js              # POST · Claude · redactar email cliente
  email/send.js                  # POST · Resend · enviar email real
  pdf/invoice.js                 # POST · jsPDF · descargar factura PDF
supabase/
  schema.sql                     # 11 tablas + RLS + realtime publication
```

Cada pieza de Fase 2 revisa su env var al arranque del endpoint. Si falta → `503` con `{ error, phase: 1 }`. El wrapper `src/lib/api.js` lo detecta y muestra toast `info` sin romper el flujo.

---

## Reglas COAXIONIA cumplidas

Este producto cumple las 9 reglas obligatorias del `SISTEMA_FRANQUICIA.md`:

1. ✅ Sin bordes laterales de color acento (solo borders neutros)
2. ✅ Tipografía móvil +15% a 768px y +20% a 480px
3. ✅ Responsive 360-1920 sin overflow horizontal
4. ✅ Badge rojo pulsante Comunicación al haber mensajes sin leer (realtime Fase 2)
5. ✅ Topbar móvil con hamburguesa, buscador oculto, user-info oculto
6. ✅ Login sin columna decorativa en móvil
7. ✅ Canales IA proactivos (VOZ + WhatsApp + Email, sin chat reactivo)
8. ✅ Shells multirol con mismo patrón CSS (AppShell + ClienteShell)
9. ✅ Toast global + 0 botones muertos

Script de verificación pre-push (REGLA 9) devuelve `Dead: 0 · Stubs: 0`.

---

## Comandos

```bash
npm run dev       # arranque local
npm run build     # build producción
npm run lint      # eslint
npx vercel --prod # deploy manual (normal: push a main auto-despliega)
```

---

## Repo y deploy

- Repo: `LayrIA-app/gestion-ia-autonomos`
- Deploy: `https://gestion-ia-autonomos.vercel.app`
- Owner Vercel: `coaxionia`
- Branch producción: `main` (auto-deploy en cada push)
