import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (localStorage persistence)
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("devboard-user");
      const savedAuth = localStorage.getItem("devboard-auth");

      if (savedUser && savedAuth === "true") {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/4"
      );
      const userData = response.data;

      // Add status message field to user data
      userData.statusMessage = "Ready to code!";

      setUser(userData);
      setIsAuthenticated(true);

      // Save to localStorage for persistence
      localStorage.setItem("devboard-user", JSON.stringify(userData));
      localStorage.setItem("devboard-auth", "true");

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Failed to login" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("devboard-user");
    localStorage.removeItem("devboard-auth");
  };

  const updateUserStatus = (newStatus) => {
    if (user) {
      const updatedUser = {
        ...user,
        statusMessage: newStatus,
      };
      setUser(updatedUser);
      localStorage.setItem("devboard-user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUserStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
