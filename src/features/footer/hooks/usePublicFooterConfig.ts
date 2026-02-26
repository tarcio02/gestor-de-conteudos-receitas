import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { footerApi } from '../api'
import type { FooterConfig } from '../model/footer.types'

export function usePublicFooterConfig() {
  const [data, setData] = useState<FooterConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user_id } = useParams()

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const response = await footerApi.getPublicConfig(user_id ?? '')
        if (alive) setData(response.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Erro ao carregar configuracao do footer')
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
