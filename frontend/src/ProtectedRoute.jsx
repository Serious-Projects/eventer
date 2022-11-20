import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./context/AuthContext";

function ProtectedRoute({ ...routeProps }) {
   const hasToken = useAuthStore((state) => state.token);

   return !!hasToken ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute;
