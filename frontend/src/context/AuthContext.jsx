/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { useEffect, useContext, useState, createContext } from "react";
import api from "../services/clientAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await api.post("/signup", newUser);

      const data = await response.data;

      return data;
    } catch (error) {
      console.error('Error to signup ', error)
      setError(error?.response?.data?.error || 'Something went wrong')
    }
  };

  const login = async (loginUser) => {
    try {
      const response = await api.post("/login", loginUser);

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      return data;
    } catch (error) {
      console.error("failed to login", error);
      setError(error?.response?.data?.error || 'Something went wrong')
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
    error,
    setError
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
