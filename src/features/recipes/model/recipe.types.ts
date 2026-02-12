export type Recipe = {
  id: string
  title: string
  description: string
  time: number
  slug: string
  category: string
  image_url: string
  ingredients: string
  steps: string
  published: boolean
  featured: boolean
  coupon: boolean
  code_coupon: string
  created_at?: string
  updated_at?: string
}

export type RecipesResponse = { data: Recipe[] }
