import { useCallback, useEffect, useState } from 'react'
import { authApi } from '../api/auth.api'
import type { AuthUser } from '../model/auth.types'

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    setLoading(true)

    try {
      const data = await authApi.getUser()
      setUser(data)
      return data
    } catch (error) {
      console.error('Erro ao buscar usuario:', error)
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  return { user, loading, refreshUser }
}
