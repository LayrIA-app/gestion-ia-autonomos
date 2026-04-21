/* Detecta qué piezas de Fase 2 están habilitadas según env vars presentes.
   Si falta una env var, esa pieza queda en modo Fase 1 (mock) con graceful degradation. */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

/* Server-only (no VITE_ prefix) · no accesibles desde el cliente.
   Las comprobamos desde los API routes, no desde el browser. */
export const hasAnthropic = false // se comprueba en cada /api/ai/* route
export const hasResend = false    // se comprueba en cada /api/email/* route

export const phase = hasSupabase ? 2 : 1
