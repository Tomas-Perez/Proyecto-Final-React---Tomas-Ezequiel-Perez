import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      }
    }
  }, [token]);

const login = (username, password) => {
    
    let rolAsignado = 'user'; // Por defecto es cliente

    if (password === '1234') {
      rolAsignado = 'admin';
    }

    const userData = { 
      name: username, 
      role: rolAsignado
    };
    
    const fakeToken = "token-seguro-" + Date.now();
    
    setToken(fakeToken);
    setUser(userData);
    
    localStorage.setItem('authToken', fakeToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const isAuthenticated = !!token; 

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);