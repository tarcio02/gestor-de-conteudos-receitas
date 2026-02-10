export type Recipe = {
  id: string
  title: string
  slug: string
  category: string
  image_url: string
  ingredients: string
  steps: string
  published: boolean
  featured: boolean
  updated_at: string
}

export type RecipesResponse = { data: Recipe[] }
