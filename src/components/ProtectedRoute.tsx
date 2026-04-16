import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/token";

const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;