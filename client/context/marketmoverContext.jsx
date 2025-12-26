"use client";

import { useEffect, useState, createContext, useContext } from "react";

const MarketMoverContext = createContext();

function MarketMoverProvider({ children }) {
  const [movers, setMover] = useState([]);

  const getMarketMover = async () => {
    try {
      const getMover = await fetch(
        "http://localhost:4000/api/get-market-movers",
        {
          credentials: "include",
        }
      );
      if (!getMover.ok) throw new Error();
      const data = await getMover.json();
      setMover(data.movers);
      return data.movers;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    getMarketMover();

    const interval = setInterval(getMarketMover, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <MarketMoverContext.Provider value={{ movers, getMarketMover }}>
      {children}
    </MarketMoverContext.Provider>
  );
}

export default MarketMoverProvider;

export const useMarket = () => useContext(MarketMoverContext);
