import React, { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  // Check if the user is authenticated, otherwise redirect to /unauthorized
  if (!auth?.isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
