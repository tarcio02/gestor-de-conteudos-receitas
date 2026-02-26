import { useEffect, useState } from 'react'
import { stylesConfigApi } from '../api'
import type { StylesConfig } from '../model/stylesConfig.types'

function resolveUserIdFromPath(): string {
  if (typeof window === 'undefined') return ''

  const segment = window.location.pathname.split('/').filter(Boolean)[0] ?? ''

  if (!segment || segment === 'login' || segment === 'admin' || segment === 'recipes') return ''
  return segment
}

export function usePublicStylesConfig() {
  const [data, setData] = useState<StylesConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const response = await stylesConfigApi.getPublicConfig(resolveUserIdFromPath())
        if (alive) setData(response.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Erro ao carregar configuracao de estilos')
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  return { data, loading, error }
}
