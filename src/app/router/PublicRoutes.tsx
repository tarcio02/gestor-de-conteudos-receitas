import { Route } from 'react-router-dom'
import { LoginPage } from '../../pages/auth/LoginPage'
import { SignupPage } from '../../pages/auth/SignupPage'
import Home from '../../pages/Home'
import { ROUTES } from '../../constants/routes'

export function getPublicRoutes() {
  return (
    <>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.recipes} element={<Home />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signup} element={<SignupPage />} />
    </>
  )
}
