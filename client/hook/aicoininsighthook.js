import { useState, useEffect, useCallback } from "react";

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

        const insight = (data.insights || []).filter((c) => c?.price?.coin);
        setCoinInsight(insight);

        const defaultCoin = insight.find(
          (c) => c.price.coin.toLowerCase() === "ethereum",
        );

        if (defaultCoin) setSelectedCoin(defaultCoin);
        else if (insight.length > 0) setSelectedCoin(insight[0]);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    getCoinInsight();
  }, []);

  const selectCoin = useCallback(
    (coinIdOrName) => {
      if (!coinInsight.length) return;
      const coin = coinInsight.find(
        (c) => c.price.coin.toLowerCase() === coinIdOrName.toLowerCase(),
      );

      if (coin) setSelectedCoin(coin);
    },
    [coinInsight],
  );

  return { loading, error, selectedCoin, selectCoin };
}
export default useAllCoinInsight;
