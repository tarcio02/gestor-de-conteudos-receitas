import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../../pages/not-found/NotFoundPage'
import { getProtectedRoutes } from './ProtectedRoutes'
import { getPublicRoutes } from './PublicRoutes'

export function AppRouter() {
  return (
    <Routes>
      {getPublicRoutes()}
      {getProtectedRoutes()}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
