import type { RecipesResponse } from '../model/recipe.types'

const TSV_URL = import.meta.env.VITE_API_RECIPES

function parseTSV(tsv: string) {
  const rows = tsv
    .split('\n')
    .map((r) => r.replace(/\r$/, '')) // remove \r do Windows
    .filter(Boolean)

  const headers = rows[0].split('\t')

  return rows.slice(1).map((row) => {
    const values = row.split('\t')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}

    headers.forEach((h, i) => {
      obj[h.trim()] = values[i] ?? ''
    })

    return obj
  })
}

export const recipesApi = {
  async listPublic(userId: string): Promise<RecipesResponse> {
    // Adicionando o parâmetro userId
    if (!TSV_URL) throw new Error('VITE_API_RECIPES não configurado')

    const res = await fetch(TSV_URL)
    const tsv = await res.text()
    const normalizedUserId = String(userId ?? '').trim()

    const data = parseTSV(tsv)
      .filter((r) => String(r.published).trim().toUpperCase() === 'TRUE') // Filtra receitas publicadas
      .filter((r) => String(r.user_id ?? '').trim() === normalizedUserId) // Filtro para o user_id
      .map((r) => ({
        id: String(r.id ?? ''),
        title: String(r.title ?? ''),
        description: String(r.description),
        time: Number(r.time),
        slug: String(r.slug ?? ''),
        category: String(r.category ?? ''),
        image_url: String(r.image_url ?? ''),
        ingredients: String(r.ingredients ?? ''),
        steps: String(r.steps ?? ''),
        published: true,
        featured: String(r.featured).trim().toUpperCase() === 'TRUE',
        coupon: String(r.coupon).trim().toLocaleUpperCase() === 'TRUE',
        code_coupon: String(r.code_coupon),
        created_at: String(r.created_at ?? ''),
        updated_at: String(r.updated_at ?? ''),
      }))

    return { data }
  },
}
