import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  requiredRole: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated || auth.userRole !== requiredRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
