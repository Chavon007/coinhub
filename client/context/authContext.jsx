"use client";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //signup
  const signup = async (data) => {
    try {
      const res = await fetch("http://localhost:4000/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Signup failed");
      }
      localStorage.setItem("pendingUserId", result.userId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // login api
  const login = async (data) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }
      setUser(result.user);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // verify otgp after creating an account

  const verifyOtp = async (otp) => {
    const userId = localStorage.getItem("pendingUserId");
    try {
      const res = await fetch("http://localhost:4000/api/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          otp,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Can't verify account now");
      }
      localStorage.removeItem("pendingUserId");
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return (
    <AuthContext.Provider value={{ user, signup, login, verifyOtp }}>
      {" "}
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
