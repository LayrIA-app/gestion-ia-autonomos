import { useEffect, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

/* Hook genérico: lee una tabla de Supabase si hay env vars,
   sino devuelve el `fallback` (array mock) inmediatamente.
   Patrón de graceful degradation Fase 1 ↔ Fase 2 estándar. */
export function useTable(table, fallback = [], filters = {}) {
  const { user } = useAuth()
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(hasSupabase)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hasSupabase || !user) {
      setData(fallback)
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      let query = supabase.from(table).select('*').eq('owner_id', user.id)
      for (const [k, v] of Object.entries(filters)) query = query.eq(k, v)
      const { data: rows, error: err } = await query.order('created_at', { ascending: false })
      if (cancelled) return
      if (err) {
        setError(err)
        setData(fallback) // graceful: si falla Supabase, mostrar mock
      } else {
        setData(rows?.length ? rows : fallback)
      }
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [table, user?.id, JSON.stringify(filters)])

  return { data, loading, error, isMock: !hasSupabase || !user }
}

/* Mensajes: hook especial porque filtra por to_user_id, no owner_id */
export function useMensajes(fallback = []) {
  const { user } = useAuth()
  const [data, setData] = useState(fallback)
  const [unread, setUnread] = useState(fallback.filter(m => !m.is_read && m.to_user_id === user?.id).length || 1)
  const [loading, setLoading] = useState(hasSupabase)

  useEffect(() => {
    if (!hasSupabase || !user) {
      setData(fallback)
      setUnread(fallback.filter(m => !m.is_read).length || 1) // Fase 1 · simular 1 unread
      setLoading(false)
      return
    }
    let cancelled = false

    async function load() {
      const { data: rows } = await supabase
        .from('mensajes')
        .select('*')
        .eq('to_user_id', user.id)
        .order('enviado_at', { ascending: false })
      if (cancelled) return
      setData(rows || [])
      setUnread((rows || []).filter(m => !m.is_read).length)
      setLoading(false)
    }
    load()

    /* Realtime · REGLA 4 Fase 2 extension */
    const channel = supabase
      .channel('mensajes-' + user.id)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mensajes', filter: `to_user_id=eq.${user.id}` }, () => load())
      .subscribe()

    return () => { cancelled = true; supabase.removeChannel(channel) }
  }, [user?.id])

  async function markRead(ids = null) {
    if (!hasSupabase || !user) {
      setUnread(0) // Fase 1: basta con bajar el contador local
      return
    }
    let query = supabase.from('mensajes').update({ is_read: true }).eq('to_user_id', user.id).eq('is_read', false)
    if (ids?.length) query = query.in('id', ids)
    await query
  }

  return { data, unread, loading, markRead, isMock: !hasSupabase || !user }
}
