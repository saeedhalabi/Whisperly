import { useNavigate } from "react-router";
import { navItemClasses } from "../utils/navbarUtils";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between p-5">
      <h1 className="text-black text-sm sm:text-base mt-3">
        Whisper<span className="text-indigo-500">ly</span>
      </h1>
      <div>
        <ul className="flex gap-3 items-center text-sm sm:text-base cursor-pointer mt-2">
          <li className={navItemClasses()} onClick={() => navigate("/sign-in")}>
            Sign In
          </li>
          <li className={navItemClasses()} onClick={() => navigate("/")}>
            Sign Up
          </li>
          <li className="text-black">Log out</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
