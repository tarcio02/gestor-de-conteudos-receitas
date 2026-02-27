import { useState } from 'react'
import { authApi } from '../api/auth.api'
import type { SignupInput } from '../model/auth.types'

export function useSignup() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signup(data: SignupInput) {
    setLoading(true)
    setError(null)

    try {
      return await authApi.signup(data)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro ao criar cadastro'
      setError(message)
      throw e
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading, error }
}
