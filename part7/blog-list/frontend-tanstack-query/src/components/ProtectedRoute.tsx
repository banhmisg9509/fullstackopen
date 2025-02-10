import { Navigate, Outlet } from 'react-router'
import { useUser } from 'src/stores/user-jotai'

export const ProtectedRoute = () => {
  const user = useUser()

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
