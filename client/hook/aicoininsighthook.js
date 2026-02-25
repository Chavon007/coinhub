import { useState, useEffect } from "react";

function useAllCoinInsight(coinId, ticker) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coinInsight, setCoinInsight] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const getCoinInsight = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:4000/api/coininsight/all`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch insight");
        }

        setCoinInsight(data.insight);
        if (data.insight.length > 0) setSelectedCoin(data.insight[0]);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    getCoinInsight();
  }, []);

  const selectCoin = (coinIdOrName) => {
    const coin = coinInsight.find(
      (c) => c.price.coin === coinIdOrName || c.coinId === coinIdOrName,
    );

    if (coin) setSelectedCoin(coin);
  };

  return { loading, error, selectedCoin, selectCoin };
}
export default useAllCoinInsight;
