// // src/contexts/AuthContext.js

// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../api/apiClient';
// import { useTheme } from './ThemeContext';

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { setTheme } = useTheme();

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         setTheme('light');
//       }
//     } catch (error) {
//       console.error("Failed to parse user from localStorage", error);
//       localStorage.removeItem('user');
//       setTheme('light');
//     }
//     setLoading(false);
//   }, [setTheme]);

//   const login = async (email, password) => {
//     const response = await apiClient.post('/auth/login', { email, password });
//     const userData = response.data.data;
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//     navigate('/dashboard');
//   };
  
//   const register = async (name, email, password) => {
//     const response = await apiClient.post('/auth/register', { name, email, password });
//     const userData = response.data.data;
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//     navigate('/dashboard');
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     setTheme('light');
//     navigate('/');
//   };

//   const updateUser = async (formData) => {
//     const response = await apiClient.put('/user/profile', formData);
//     const updatedUserData = response.data.data;
//     setUser(updatedUserData);
//     localStorage.setItem('user', JSON.stringify(updatedUserData));
//     return updatedUserData;
//   };

//   // NEW FUNCTION: Updates only the planner in the context and local storage
//   const updateUserPlannerContext = (plannerData) => {
//     const updatedUser = { ...user, planner: plannerData };
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     isAuthenticated: !!user,
//     loading,
//     login,
//     register,
//     logout,
//     updateUser,
//     updateUserPlannerContext, // Expose the new function
//   };

//   return (
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   );
// }

// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useTheme } from './ThemeContext';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setTheme('light');
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
      setTheme('light');
    }
    setLoading(false);
  }, [setTheme]);

  const login = async (email, password) => {
    // **UPDATED WITH ERROR HANDLING**
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const userData = response.data.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      // Re-throw the error so the calling component (e.g., LoginPage) can catch it
      // and display an error message to the user.
      throw error.response?.data || new Error("An unknown error occurred");
    }
  };
  
  const register = async (name, email, password) => {
    // **UPDATED WITH ERROR HANDLING**
    try {
      const response = await apiClient.post('/auth/register', { name, email, password });
      const userData = response.data.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      // Re-throw the error so the calling component (e.g., RegisterPage) can catch it
      // and display an error message (e.g., "This email is already taken").
      throw error.response?.data || new Error("An unknown error occurred");
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setTheme('light');
    navigate('/');
  };

  const updateUser = async (formData) => {
    // It's good practice to add error handling here too
    try {
      const response = await apiClient.put('/user/profile', formData);
      const updatedUserData = response.data.data;
      setUser(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      return updatedUserData;
    } catch (error) {
      console.error("Update user failed:", error.response?.data || error.message);
      throw error.response?.data || new Error("An unknown error occurred");
    }
  };

  const updateUserPlannerContext = (plannerData) => {
    if (!user) return; // Prevent errors if user is logged out
    const updatedUser = { ...user, planner: plannerData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateUser,
    updateUserPlannerContext,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};