/* eslint-disable react/prop-types */

import { useEffect, useContext, useState, createContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL_Local;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    console.log(userData);

    if (token && userData) {
      setUser(userData);
    }

    setLoading(false);
  }, []);

  const signup = async (newUser) => {
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("error to signup ", error);
      throw error;
    }
  };

  const login = async (loginUser) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await response.json();

    

      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      return data;
    } catch (error) {
      console.error("failed to login", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    loading,
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be in AuthProvider");
  }
  return context;
};
