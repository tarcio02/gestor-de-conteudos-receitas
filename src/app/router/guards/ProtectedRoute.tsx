import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../../../features/auth/services/authSession'
import { ROUTES } from '../../../constants/routes'

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate replace to={ROUTES.login} />
  }

  return <Outlet />
}
