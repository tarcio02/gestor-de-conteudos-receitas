import { useState } from 'react'
import { authApi } from '../api/auth.api'
import type { LoginInput } from '../model/auth.types'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(data: LoginInput) {
    setLoading(true)
    setError(null)

    try {
      return await authApi.login(data)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro ao fazer login'
      setError(message)
      throw e
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    authApi.logout()
  }

  return { login, logout, loading, error }
}
