"use client";

import { useState, useEffect, createContext, useContext } from "react";

const transactionsContext = createContext();

function TransactionsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createTransaction = async (transactionData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(transactionData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new error(data.message || "Cant start transction now");
      }
      setSuccess("Transaction successful");
      return data.transaction;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <transactionsContext.Provider
      value={{ error, loading, success, createTransaction }}
    >
      {children}
    </transactionsContext.Provider>
  );
}

export default TransactionsProvider;

export const useTransaction = () => useContext(transactionsContext);
