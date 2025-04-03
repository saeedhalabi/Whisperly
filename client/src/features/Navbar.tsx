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
    <nav className="flex justify-between p-4">
      <h1 className="text-black mt-3 text-sm">
        Whisper<span className="text-indigo-500">ly</span>
      </h1>
      <div>
        <ul className="flex lg:gap-3 sm:gap-0 items-center text-base sm:text-sm cursor-pointer mt-2 text-font">
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
