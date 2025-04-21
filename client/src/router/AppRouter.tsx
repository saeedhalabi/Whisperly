import { Routes, Route, Navigate } from "react-router";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import Homepage from "../pages/Homepage";
import Unauthorized from "../pages/Unauthorized";

const AppRouter: React.FC = () => {
  // Check if token is in localStorage
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route index path="/" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />

      {/* Protected Route - Only render Homepage if there's a token */}
      <Route
        path="/home-page"
        element={token ? <Homepage /> : <Navigate to="/sign-in" replace />}
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRouter;
