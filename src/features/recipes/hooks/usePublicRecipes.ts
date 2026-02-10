import { useEffect, useState } from 'react'
import { recipesApi } from '../api/recipes.api'
import type { Recipe } from '../model/recipe.types'

export function usePublicRecipes() {
  const [data, setData] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const res = await recipesApi.listPublic()
        if (alive) setData(res.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Erro ao carregar receitas')
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
