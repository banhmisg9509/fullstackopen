import { Navigate, Outlet } from "react-router-dom";
import { useLoggedIn } from "src/stores/token";

export const ProtectedRoute = () => {
  const isLoggedIn = useLoggedIn();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
