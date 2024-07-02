/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  const login = (email, nama_pegawai, nip, id_pegawai) => {
    setIsAuthenticated(true);
    setUserType({ email, nama_pegawai , nip, id_pegawai });
    console.log('Login function called:', email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
