import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = localStorage.getItem("isLoggedIn") === "true";
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
    localStorage.setItem("isLoggedIn", !isAuthenticated);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        toggleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
