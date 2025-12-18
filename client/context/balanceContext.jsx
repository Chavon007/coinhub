"use client";
import { useState, useEffect, useContext, createContext } from "react";

const BalanceContext = createContext();

function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState(null);

  const totalBalance = async () => {
    try {
      const totalBalance = await fetch(
        "http://localhost:4000/api/total-balance",
        {
          credentials: "include",
        }
      );
      const data = await totalBalance.json();

      if (!totalBalance.ok) {
        throw new Error(data.message);
      }
      setBalance(data.totalAmount ?? 0);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const portfolioChange = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/portfolio-change", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch portfolio change");
      }
      setPortfolio(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    totalBalance();
    portfolioChange();
  }, []);
  return (
    <BalanceContext.Provider
      value={{ balance, portfolio, totalBalance, portfolioChange }}
    >
      {children}
    </BalanceContext.Provider>
  );
}
export default BalanceProvider;

export const useBalance = () => useContext(BalanceContext);
