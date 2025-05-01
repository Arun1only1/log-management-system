import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/constants";
import { useAuthenticate } from "@/hooks/use-authenticate";

const PrivateRoute = () => {
  const isAuthenticated = useAuthenticate();

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;
