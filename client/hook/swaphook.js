import { useState, useCallback } from "react";

function useSwap() {
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);

  const clearStatus = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);

  // Called on every input change (debounced by the component)
  // No DB writes — just returns the live rate + estimated output
  const fetchPreview = useCallback(async ({ fromCoin, toCoin, fromAmount }) => {
    if (!fromAmount || Number(fromAmount) <= 0 || fromCoin === toCoin) {
      setPreview(null);
      return;
    }

    setPreviewLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:4000/api/swap-preview?fromCoin=${fromCoin}&toCoin=${toCoin}&fromAmount=${fromAmount}`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch preview");

      setPreview({
        toAmount: data.toAmount,
        exchangeRate: data.exchangeRate,
        priceImpact: data.priceImpact ?? null,
      });
    } catch (err) {
      setPreview(null);
      setError(err.message || "Could not load rate preview");
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  // Called only on form submit
  const handleSwap = useCallback(
    async ({ fromCoin, toCoin, fromAmount, slippage }) => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const res = await fetch(`http://localhost:4000/api/swap`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromCoin,
            toCoin,
            fromAmount: Number(fromAmount),
            slippageTolerance: slippage,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Swap failed");

        setSuccess(
          `Swapped successfully — received ${data.data?.to_amount?.toFixed(6)} ${toCoin}`,
        );
        setPreview(null);
        return data;
      } catch (err) {
        setError(err.message || "Failed to complete swap");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    error,
    success,
    loading,
    previewLoading,
    preview,
    fetchPreview,
    handleSwap,
    clearStatus,
  };
}

export default useSwap;
