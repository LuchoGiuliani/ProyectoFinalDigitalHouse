"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => { 
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");   
    if (savedToken) {
      setToken(savedToken);
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setUser(parsedUser);
        }
      } catch (e) {
        console.error("Error parsing saved user:", e);
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData); 
    setToken(token);
    // Guardar token en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null); 
    setToken(null);
    // Eliminar token de localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => {
    return !!token; 
  };

  const value = useMemo(() => ({ user, setUser, token, setToken, isAuthenticated,login, logout, email, setEmail, password,setPassword }), [user, token, email, password]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
