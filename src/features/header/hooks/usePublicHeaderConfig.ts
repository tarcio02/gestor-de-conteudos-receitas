import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { headerApi } from '../api'
import type { HeaderConfig } from '../model/header.types'

export function usePublicHeaderConfig() {
  const [data, setData] = useState<HeaderConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user_id } = useParams()

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const response = await headerApi.getPublicConfig(user_id ?? '')
        if (alive) setData(response.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Erro ao carregar configuracao do header')
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [user_id])

  return { data, loading, error }
}
