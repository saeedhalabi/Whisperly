import { Routes, Route } from "react-router";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import Homepage from "../pages/Homepage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />

      <Route path="/home-page" element={<Homepage />} />
    </Routes>
  );
};

export default AppRouter;
