"use client";

import { useState, useEffect } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import { useBalance } from "@/context/balanceContext";
import useSwap from "../hook/swaphook";

const availableCoin = [
  { value: "ethereum", symbol: "ETH" },
  { value: "bitcoin", symbol: "BTC" },
  { value: "solana", symbol: "SOL" },
  { value: "ripple", symbol: "XRP" },
];

function Swap() {
  const { getEachBalance } = useBalance();
  const { handleSwap, loading, error, success } = useSwap();

  const [fromCoin, setFromCoin] = useState("ethereum");
  const [toCoin, setToCoin] = useState("bitcoin");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [coinBalance, setCoinBalance] = useState([]);

  // Fetch balances
  const fetchBalances = async () => {
    try {
      const data = await getEachBalance();
      setCoinBalance(data.balanceCoin || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getCoinBalance = (coinName) => {
    const balance = coinBalance.find((b) => b.coin === coinName);
    return balance ? balance.amount : 0;
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  // Simple conversion preview (1:1 mock)
  useEffect(() => {
    if (!fromAmount) return setToAmount("");
    setToAmount(fromAmount);
  }, [fromAmount]);

  // Validation
  const validateSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      alert("Enter valid amount");
      return false;
    }

    const balance = getCoinBalance(fromCoin);
    if (Number(fromAmount) > balance) {
      alert("Insufficient balance");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSwap()) return;

    try {
      await handleSwap({
        fromCoin,
        toCoin,
        amount: fromAmount,
      });

      await fetchBalances();
      setFromAmount("");
      setToAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className=" w-[40%] mx-auto p-6 rounded-3xl shadow  bg-surface  border border-gray-600 flex flex-col  h-[80vh]"
      onSubmit={handleSubmit}
    >
      <h3 className="flex justify-between items-center">
        <span className="text-base font-orbitron font-bold text-accent-green">
          Swap
        </span>{" "}
        <span className="flex justify-between gap-2 items-center  p-2 w-20">
          <span className="bg-background p-2 rounded-2xl">
            <LuRefreshCw className="text-text-secondary text-base font-bold" />
          </span>{" "}
          <span className="bg-background p-2 rounded-2xl">
            <VscSettings className="text-text-secondary text-base font-bold" />
          </span>
        </span>
      </h3>

      {/* FROM */}
      <div>
        <p>Balance: {getCoinBalance(fromCoin).toFixed(6)}</p>

        <input
          type="number"
          placeholder="0.0"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
        />

        <select
          value={fromCoin}
          onChange={(e) => {
            const value = e.target.value;
            setFromCoin(value);
            if (value === toCoin) setToCoin("bitcoin");
          }}
        >
          {availableCoin.map((c) => (
            <option key={c.value} value={c.value}>
              {c.symbol}
            </option>
          ))}
        </select>
      </div>

      {/* TO */}
      <div>
        <p>Balance: {getCoinBalance(toCoin).toFixed(6)}</p>

        <input type="number" value={toAmount} readOnly />

        <select value={toCoin} onChange={(e) => setToCoin(e.target.value)}>
          {availableCoin.map((c) => (
            <option key={c.value} value={c.value}>
              {c.symbol}
            </option>
          ))}
        </select>
      </div>

      {/* STATUS */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button type="submit" disabled={loading || !fromAmount}>
        {loading ? "Swapping..." : "Swap"}
      </button>
    </form>
  );
}

export default Swap;
