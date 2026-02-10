import type { Recipe } from './recipe.types'

export type CategorySection = {
  category: string
  recipes: Recipe[]
}

export function groupRecipesByCategory(recipes: Recipe[]): CategorySection[] {
  const map = new Map<string, Recipe[]>()

  for (const r of recipes) {
    const key = (r.category || 'Sem categoria').trim()
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(r)
  }

  // Ordena receitas dentro da categoria (opcional)
  for (const [cat, list] of map.entries()) {
    list.sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))
    map.set(cat, list)
  }

  // Ordena categorias alfabeticamente (opcional)
  const sections: CategorySection[] = Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, list]) => ({ category, recipes: list }))

  return sections
}
