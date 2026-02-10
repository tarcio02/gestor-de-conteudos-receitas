import { Navigate, Route } from 'react-router-dom'
import { LoginPage } from '../../pages/auth/LoginPage'
import { RecipesPage } from '../../pages/recipes/RecipesPage'
import { ROUTES } from '../../constants/routes'

export function getPublicRoutes() {
  return (
    <>
      <Route path={ROUTES.home} element={<Navigate replace to={ROUTES.recipes} />} />
      <Route path={ROUTES.recipes} element={<RecipesPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
    </>
  )
}
