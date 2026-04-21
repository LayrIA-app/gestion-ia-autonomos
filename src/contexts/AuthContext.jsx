import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'

/* Contexto de auth unificado para Fase 1 (fake) y Fase 2 (Supabase real).
   - Fase 2 (hasSupabase=true): auth real, sesión persistida, profile en BD
   - Fase 1 (hasSupabase=false): auth fake · role via setFakeUser() desde RoleScreen
   Ambos modos exponen la misma shape de contexto: { user, profile, loading, signIn, signOut, role } */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)        // { id, email } Supabase.User o fake
  const [profile, setProfile] = useState(null)  // row de public.profiles o fake
  const [loading, setLoading] = useState(true)
  const [fakeRole, setFakeRole] = useState(null) // 'autonomo' | 'cliente' en modo Fase 1

  useEffect(() => {
    if (!hasSupabase) {
      setLoading(false)
      return
    }
    // Fase 2: leer sesión actual + subscribirse a cambios
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) await loadProfile(u.id)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) await loadProfile(u.id)
      else setProfile(null)
    })
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  async function loadProfile(uid) {
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).single()
    setProfile(data)
  }

  async function signIn(email, password) {
    if (!hasSupabase) {
      // Fase 1 · accept anything, no real auth
      setUser({ id: 'fake-' + Date.now(), email })
      return { error: null }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error && data.user) await loadProfile(data.user.id)
    return { error }
  }

  async function signOut() {
    if (hasSupabase) await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setFakeRole(null)
  }

  /* Fase 1: la RoleScreen fija el rol antes del login */
  function setFakeUserRole(r) { setFakeRole(r) }

  /* role final: en Fase 2 viene del profile.role; en Fase 1 del fakeRole */
  const role = hasSupabase ? (profile?.role ?? null) : fakeRole

  const value = { user, profile, role, loading, signIn, signOut, setFakeUserRole, hasSupabase }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
