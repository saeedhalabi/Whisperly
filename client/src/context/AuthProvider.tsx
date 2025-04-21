import { useState, useEffect, ReactNode } from "react";
import AuthContext from "./AuthContext";

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if the token exists
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      setIsAuthenticated(!!storedToken);
    };

    checkAuth(); // Run once when the component mounts

    // Listen for changes to the token in localStorage
    window.addEventListener("tokenChange", checkAuth);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("tokenChange", checkAuth);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
