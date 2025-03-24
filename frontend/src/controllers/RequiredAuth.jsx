import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function RequiredAuth({ children }) {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  if (auth.isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ toRedirect: pathname }} replace />;
}

export default RequiredAuth;
