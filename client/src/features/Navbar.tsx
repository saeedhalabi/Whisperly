import { useNavigate } from "react-router";
import { navItemClasses } from "../utils/navbarUtils";
import { logout } from "../services/api";
const Navbar = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch (error: any) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex justify-between p-5">
      <h1 className="text-black mt-3">
        Whisper<span className="text-indigo-500">ly</span>
      </h1>
      <div>
        <ul className="flex gap-3 items-center text-base sm:text-base cursor-pointer mt-2">
          <li className={navItemClasses()} onClick={() => navigate("/sign-in")}>
            Sign In
          </li>
          <li className={navItemClasses()} onClick={() => navigate("/")}>
            Sign Up
          </li>
          <li className="text-black" onClick={handleSubmit}>
            Log out
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
