import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from 'src/stores'

export const PublicRoute = () => {
  const user = useAppSelector((state) => state.user)
  return !user ? <Outlet /> : <Navigate to="/" />
}
