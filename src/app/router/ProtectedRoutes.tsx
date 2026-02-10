import { Route } from 'react-router-dom'
import { ProtectedRoute } from './guards/ProtectedRoute'
import { AdminDashboardPage } from '../../pages/admin/AdminDashboardPage'
import { ROUTES } from '../../constants/routes'

export function getProtectedRoutes() {
  return (
    <Route element={<ProtectedRoute />}>
      <Route path={ROUTES.admin} element={<AdminDashboardPage />} />
    </Route>
  )
}
