import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  useEffect(() => {
    
    console.log(user)
    if (user) {
      
      setUser(JSON.parse(user));
    }  else {
      setUser(null);
    }  }, []);
  
    
  const login = (userData) => {
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
