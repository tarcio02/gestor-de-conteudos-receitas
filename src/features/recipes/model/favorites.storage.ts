const KEY = 'favorite_recipe_ids'

export function getFavoriteIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id)
}

export function toggleFavorite(id: string): string[] {
  const current = new Set(getFavoriteIds())
  if (current.has(id)) current.delete(id)
  else current.add(id)

  const next = Array.from(current)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}
