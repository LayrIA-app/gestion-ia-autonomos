import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabase } from './env'

/* Cliente Supabase singleton. Si no hay env vars, null · los hooks/componentes
   que dependan de él deben comprobar hasSupabase y hacer fallback a mock. */
export const supabase = hasSupabase
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null

export { hasSupabase }
