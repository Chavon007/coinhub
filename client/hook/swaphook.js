import { useState } from "react";

function useSwap() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSwap = async ({ fromCoin, toCoin, amount }) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:4000/api/swap", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fromCoin,
          toCoin,
          fromAmount: Number(amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Swap failed");
      }
      setSuccess("Swap successful");
      return data;
    } catch (err) {
      setError(err.message || "Failed to Swap");
    } finally {
      setLoading(false);
    }
  };

  return { error, success, loading, handleSwap };
}

export default useSwap;
