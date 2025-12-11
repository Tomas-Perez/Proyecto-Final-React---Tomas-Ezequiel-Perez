import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // (null = no logueado)
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Guardamos los datos del usuario
  };

  const logout = () => {
    setUser(null); // Volvemos a null
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);