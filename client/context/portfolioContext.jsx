"use client";

import { useState, useEffect, createContext, useContext } from "react";

const portfolioContext = createContext();

function PortfolioProvider({ children }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  const getPortfolio = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/portfolio", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Can't fetch portfolio");

      setPortfolio(data);
      setSuccess("Portfolio fetched successfully");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <portfolioContext.Provider
      value={{ portfolio, error, loading, success, getPortfolio }}
    >
      {children}
    </portfolioContext.Provider>
  );
}

export default PortfolioProvider;

export const usePortfolio = () => useContext(portfolioContext);
