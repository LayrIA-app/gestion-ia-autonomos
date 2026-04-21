# Gestión IA Autónomos

Producto COAXIONIA sector **Autónomos**. React + Vite · desplegado en Vercel.

Demo en vivo: **https://gestion-ia-autonomos.vercel.app**

---

## Fases

| Fase | Estado | Qué hace |
|---|---|---|
| **Fase 1** · Demo visual | ✅ Completa | 18 secciones autónomo + portal cliente · responsive 360-1920 · 0 botones muertos · push IA · campana alertas · countdown Mod. 303 |
| **Fase 2** · Backend real | ⚙️ Código listo · pendiente activar env vars | Supabase (auth + BD + realtime) · Claude Opus 4.7 (IA proactiva) · Resend (emails reales) · jsPDF (facturas descargables) |
| **Fase 3** · Integraciones | ⚙️ Stripe listo · resto pendiente | **Stripe · pago con tarjeta** (código listo) · Google Calendar · WhatsApp Business · Holded · Verifactu |

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

---

## Activar Fase 3 · Stripe · paso a paso

**Qué hace:** cuando Ana Ruiz (cliente) entra al portal y ve la factura F-005 con estado "Próxima", pulsa **Pagar con tarjeta** → se redirige a Stripe Checkout → paga con su tarjeta → Stripe redirige de vuelta a la app con toast de confirmación → el webhook marca automáticamente `facturas_emitidas.estado='cobrada'` en Supabase y añade un movimiento a `tesoreria_movimientos` del autónomo.

### 1 · Crear cuenta Stripe (Test mode inicialmente)

1. `https://dashboard.stripe.com/register` · cuenta gratuita
2. Asegurarte que estás en **Test mode** (toggle arriba-derecha) para pruebas · cuando pases a producción cambias a Live mode
3. **Developers → API keys** · copia la `Secret key` (empieza por `sk_test_…`)

### 2 · Configurar el webhook

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://gestion-ia-autonomos.vercel.app/api/stripe/webhook`
3. Events to send: marca **`checkout.session.completed`**
4. **Add endpoint** → copia el `Signing secret` (empieza por `whsec_…`)

### 3 · Supabase service_role key (para el webhook)

El webhook se ejecuta server-side sin sesión de usuario, así que necesita bypass RLS:

1. Supabase Dashboard → **Settings → API**
2. Copia la `service_role` key (empieza por `sb_secret_…`) · **NUNCA la expongas al cliente**

### 4 · Añadir env vars en Vercel

```
! vercel env add STRIPE_SECRET_KEY production --value "sk_test_..." --yes
! vercel env add STRIPE_WEBHOOK_SECRET production --value "whsec_..." --yes
! vercel env add SUPABASE_SERVICE_ROLE_KEY production --value "sb_secret_..." --yes
```

### 5 · Redeploy y probar

```
! git commit --allow-empty -m "redeploy · Fase 3 Stripe activo" && git push
```

Esperar ~60s, entrar como Ana Ruiz al portal cliente, ir a **Mis facturas**, pulsar **Pagar con tarjeta →** en F-005. En Test mode, usa la tarjeta `4242 4242 4242 4242` con cualquier CVC y fecha futura. Stripe completa el pago y redirige a la app con el toast "Pago completado".

### 6 · Verificar el webhook

En Stripe Dashboard → **Developers → Webhooks → [tu endpoint] → Events**: verás `checkout.session.completed` con status `200`. En Supabase Table Editor → `facturas_emitidas`: la fila con `numero='F-005'` tendrá `estado='cobrada'` y `cobrada_at` con timestamp. Y `tesoreria_movimientos` tendrá un nuevo ingreso.

### Tarjetas de test útiles

| Tarjeta | Resultado |
|---|---|
| `4242 4242 4242 4242` | Pago OK |
| `4000 0000 0000 0002` | Rechazo genérico |
| `4000 0000 0000 9995` | Fondos insuficientes |
| `4000 0025 0000 3155` | Requiere 3D Secure · OK tras auth |

CVC cualquiera (ej. `123`), fecha futura (ej. `12/30`), ZIP cualquiera.

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
  stripe/create-checkout.js      # POST · Stripe · crear sesión de Checkout
  stripe/webhook.js              # POST · Stripe · verifica firma + marca factura cobrada
supabase/
  schema.sql                     # 11 tablas + RLS + realtime publication
vercel.json                      # SPA rewrite · /(.*) → /index.html excepto /api/
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
