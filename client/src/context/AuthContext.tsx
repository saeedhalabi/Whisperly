import { createContext } from "react";

import { isAuth } from "../types/auth.types";

const AuthContext = createContext<isAuth | null>(null);

export default AuthContext;
