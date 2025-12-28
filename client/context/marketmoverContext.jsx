"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

const MarketMoverContext = createContext();

function MarketMoverProvider({ children }) {
  const [movers, setMover] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMarketMover = useCallback(async () => {
    if (loading) return movers;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  });
  useEffect(() => {
    getMarketMover();

    const interval = setInterval(getMarketMover, 3 * 60 * 1000);
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
