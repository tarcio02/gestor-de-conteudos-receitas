import type { Recipe } from './recipe.types'
import { groupRecipesByCategory } from './groupRecipesByCategory'

export type Section =
  | { kind: 'favorites'; title: string; recipes: Recipe[] }
  | { kind: 'featured'; title: string; recipes: Recipe[] }
  | { kind: 'category'; title: string; recipes: Recipe[] }

type Options = {
  favoriteIds: string[]
}

function sortByUpdatedAtDesc(a: Recipe, b: Recipe) {
  return (b.updated_at || '').localeCompare(a.updated_at || '')
}

export function buildHomeSections(recipes: Recipe[], opts: Options): Section[] {
  const favoriteSet = new Set(opts.favoriteIds)

  // 1) Favoritas
  const favorites = recipes.filter((r) => favoriteSet.has(r.id)).sort(sortByUpdatedAtDesc)

  // 2) Destaques (sem duplicar favoritas)
  const featured = recipes
    .filter((r) => r.featured && !favoriteSet.has(r.id))
    .sort(sortByUpdatedAtDesc)

  // 3) Restante (sem favoritas e sem destaque)
  const excludedIds = new Set([...favorites.map((r) => r.id), ...featured.map((r) => r.id)])
  const rest = recipes.filter((r) => !excludedIds.has(r.id))

  // 4) Categorias (reutilizando o agrupador genérico)
  const categorySections: Section[] = groupRecipesByCategory(rest).map((sec) => ({
    kind: 'category',
    title: sec.category,
    recipes: sec.recipes.sort(sortByUpdatedAtDesc),
  }))

  // 5) Ordem final: Favoritas → Destaques → Categorias
  const sections: Section[] = []
  if (favorites.length) sections.push({ kind: 'favorites', title: 'Favoritas', recipes: favorites })
  if (featured.length) sections.push({ kind: 'featured', title: 'Destaques', recipes: featured })
  sections.push(...categorySections)

  return sections
}
