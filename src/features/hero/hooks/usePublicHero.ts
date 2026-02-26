import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { heroApi } from '../api'
import type { HeroSlide } from '../model/hero.types'

export function usePublicHero() {
  const [data, setData] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user_id } = useParams()

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const response = await heroApi.listPublic(user_id ?? '')
        if (alive) setData(response.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Erro ao carregar hero')
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
