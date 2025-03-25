import { Routes, Route } from "react-router";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route index path="/" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
};

export default AppRouter;
