"use client";

import { useState, useEffect, useContext, createContext } from "react";

const AIinsightContext = createContext(null);

function AIinsightProvider({ children }) {
  const [news, setNews] = useState([]);

  const getNewsInsight = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/news-insight", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Fialed to get news");
      }
      const data = await res.json();
      if (data.success && data.newsInsight) {
        setNews(data.newsInsight);
        return data.newsInsight;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    getNewsInsight();
  }, []);

  return (
    <AIinsightContext.Provider value={{ news, getNewsInsight }}>
      {children}
    </AIinsightContext.Provider>
  );
}

export default AIinsightProvider;

export const useAiInsight = () => useContext(AIinsightContext);
