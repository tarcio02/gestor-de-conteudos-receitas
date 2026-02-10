import { http } from '../../../shared/api/Http'
import type { RecipesResponse } from '../model/recipe.types'

export const recipesApi = {
  listPublic() {
    return http<RecipesResponse>('/recipes')
  },
}
