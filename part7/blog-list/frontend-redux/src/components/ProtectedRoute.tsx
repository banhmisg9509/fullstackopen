import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from 'src/stores'

export const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.user)
  return user ? <Outlet /> : <Navigate to="/login" />
}
