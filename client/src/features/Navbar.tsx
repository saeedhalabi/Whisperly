import { useNavigate } from "react-router";
import { navItemClasses } from "../utils/navbarUtils";
import { logout } from "../services/api";
const Navbar = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const handleSubmit = async () => {
    try {
      await logout();
      localStorage.removeItem("userEmail");
      navigate("/sign-in");
    } catch (error: any) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex justify-between p-4">
      <h1 className="text-black mt-3 text-base">
        Whisper<span className="text-indigo-500">ly</span>
      </h1>
      <div>
        <ul className="flex lg:gap-3 sm:gap-0 items-center text-base sm:text-sm cursor-pointer mt-2 text-font">
          {userEmail && (
            <li className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full shadow-sm mr-4 hidden sm:block">
              Logged in as:{" "}
              <span className="font-medium text-indigo-500">{userEmail}</span>
            </li>
          )}

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
