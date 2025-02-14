import { Navigate, Outlet } from "react-router-dom";
import { useLoggedIn } from "src/stores/token";

export const PublicRoute = () => {
  const isLoggedIn = useLoggedIn();
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
