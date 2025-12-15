import { createContext, useContext, useState, useEffect } from "react";
import * as jwt from 'jwt-decode';
import { parseJwtUser } from "../utils/jwtUtils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt.jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser(parseJwtUser(token));
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
