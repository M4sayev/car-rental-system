import { useAuth } from "@/context/AuthContext/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="auth/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
