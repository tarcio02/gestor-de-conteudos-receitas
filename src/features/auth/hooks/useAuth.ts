import { useState } from 'react'
import { authApi } from '../api/auth.api'
import { authStorage } from '../../../shared/storage/authStorage'
import type { LoginInput } from '../model/auth.types'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(data: LoginInput) {
    setLoading(true)
    setError(null)
    try {
      const res = await authApi.login(data)
      authStorage.setToken(res.token)
      return res
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // aqui você pode usar HttpError depois para mensagens melhores
      setError(e?.message ?? 'Erro ao fazer login')
      throw e
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    authStorage.clear()
  }

  return { login, logout, loading, error }
}
