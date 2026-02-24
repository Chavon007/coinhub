import { useState, useEffect } from "react";

function useCoinInsight(coinId, ticker) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coinInsight, setCoinInsight] = useState(null);

  useEffect(() => {
    if (!coinId || !ticker) return;

    const getCoinInsight = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://localhost:4000/api/coininsight/${coinId}/${ticker}`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch insight");
        }

        setCoinInsight(data.insight);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    getCoinInsight();
  }, [coinId, ticker]);
  return { loading, error, coinInsight };
}
export default useCoinInsight;
