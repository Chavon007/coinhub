"use client";
import { useState, useEffect, useContext, createContext } from "react";

const BalanceContext = createContext();

function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(0);

  const totalBalance = async () => {
    try {
      const totalBalance = await fetch("", {
        credentials: "include",
      });
      const data = await totalBalance.json();

      if (!totalBalance.ok) {
        throw new Error(data.message);
      }
      setBalance(data.totalAmount);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    totalBalance();
  }, []);
  return (
    <BalanceContext.Provider value={{ balance, totalBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}
export default BalanceProvider;

export const useBalance = () => useContext(BalanceContext);
