"use client";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  //signup
  const signup = async (data) => {
    try {
      const res = await fetch("", {
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
      setUser(result.user);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // login api
  const login = async (data) => {
    try {
      const res = await fetch("", {
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
  return (
    <AuthContext.Provider value={{ user, signup, login }}>
      {" "}
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
