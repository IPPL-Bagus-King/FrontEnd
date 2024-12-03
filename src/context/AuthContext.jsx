import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp > now) {
          setIsAuthenticated(true);
          setUser(decoded);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false); // Selesai memulihkan data
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
